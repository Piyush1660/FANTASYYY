// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { sequelize, User, Scrim, Registration, Result, Payout } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// health
app.get('/', (req, res) => res.json({ ok: true }));

/** Create Scrim (organizer) */
app.post('/api/scrims', async (req, res) => {
  try {
    const { organizerId, title, mode, map, datetime, entryFeeRupees, capacity, teamSize } = req.body;
    if (!organizerId || !title) return res.status(400).json({ error: 'organizerId and title required' });

    const entry_fee_cents = Math.round(Number(entryFeeRupees) * 100);
    const prize_pool_cents = entry_fee_cents * Number(capacity);

    const scrim = await Scrim.create({
      title,
      organizer_id: organizerId,
      mode: mode || 'classic',
      map: map || 'Erangel',
      datetime,
      entry_fee_cents,
      capacity,
      team_size: teamSize,
      status: 'open',
      prize_pool_cents,
      commission_pct: Number(process.env.PLATFORM_COMMISSION_PCT) || 10
    });
    res.json(scrim);
  } catch (err) {
    console.error('create scrim error', err);
    res.status(500).json({ error: 'create scrim failed' });
  }
});

/** List scrims */
app.get('/api/scrims', async (req, res) => {
  try {
    const scrims = await Scrim.findAll({ order: [['createdAt', 'DESC']] });
    res.json(scrims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'list failed' });
  }
});

/** Get single scrim */
app.get('/api/scrims/:id', async (req, res) => {
  try {
    const s = await Scrim.findByPk(req.params.id);
    if (!s) return res.status(404).json({ error: 'not found' });
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'get failed' });
  }
});

/** Create Razorpay order for joining */
app.post('/api/scrims/:id/create-order', async (req, res) => {
  try {
    const scrim = await Scrim.findByPk(req.params.id);
    if (!scrim) return res.status(404).json({ error: 'Scrim not found' });

    const amount = scrim.entry_fee_cents; // in paise
    const options = {
      amount,
      currency: 'INR',
      receipt: `scrim_${scrim.id}_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID, amount });
  } catch (err) {
    console.error('create-order error', err);
    res.status(500).json({ error: 'create-order failed' });
  }
});

/** Verify payment (client posts payment details) */
app.post('/api/payments/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, scrimId, userId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'missing payment fields' });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    const generated_signature = hmac.update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // create registration
    await Registration.create({
      scrim_id: scrimId,
      user_id: userId,
      paid: true,
      payment_provider: 'razorpay',
      payment_id: razorpay_payment_id,
      joined_at: new Date()
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('verify error', err);
    res.status(500).json({ error: 'verify failed' });
  }
});

/** Submit result (organizer/reporter) */
app.post('/api/scrims/:id/results', async (req, res) => {
  try {
    const scrimId = Number(req.params.id);
    const { winnerTeam, evidence, submittedBy } = req.body;
    const result = await Result.create({
      scrim_id: scrimId,
      winner_team: winnerTeam,
      evidence: JSON.stringify(evidence || {}),
      submitted_by: submittedBy,
      verified: false,
      payout_processed: false
    });
    res.json(result);
  } catch (err) {
    console.error('submit result error', err);
    res.status(500).json({ error: 'submit result failed' });
  }
});

/** Admin verifies result & create payout */
app.post('/api/results/:id/verify', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { adminId } = req.body;
    const result = await Result.findByPk(id);
    if (!result) return res.status(404).json({ error: 'result not found' });

    result.verified = true;
    await result.save();

    const scrim = await Scrim.findByPk(result.scrim_id);
    if (!scrim) return res.status(404).json({ error: 'scrim not found' });

    const commission = Math.round(scrim.prize_pool_cents * (scrim.commission_pct / 100));
    const payout_amount = scrim.prize_pool_cents - commission;

    const evidence = JSON.parse(result.evidence || '{}');
    const winnerUserId = evidence.winnerUserId || null;

    if (winnerUserId) {
      await Payout.create({
        user_id: winnerUserId,
        amount_cents: payout_amount,
        status: 'pending'
      });
      result.payout_processed = true;
      await result.save();
    }

    res.json({ ok: true, payoutAmount: payout_amount });
  } catch (err) {
    console.error('verify result error', err);
    res.status(500).json({ error: 'verify failed' });
  }
});

/** List payouts */
app.get('/api/payouts', async (req, res) => {
  try {
    const payouts = await Payout.findAll({ order: [['createdAt', 'DESC']] });
    res.json(payouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'payouts list failed' });
  }
});

/** Process payout (admin action) */
app.post('/api/payouts/:id/process', async (req, res) => {
  try {
    const p = await Payout.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'not found' });
    p.status = 'paid';
    await p.save();
    res.json({ ok: true, payout: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'process payout failed' });
  }
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log('Server listening on', port));
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
