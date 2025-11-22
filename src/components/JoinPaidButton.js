// src/components/JoinPaidButton.js
import React from 'react';

export default function JoinPaidButton({ scrim }) {
  const userId = 1; // Replace with real logged-in user id from auth

  async function handleJoin() {
    try {
      const r = await fetch(`/api/scrims/${scrim.id}/create-order`, { method: 'POST' });
      if (!r.ok) {
        const err = await r.json();
        return alert('Order failed: ' + (err.error || 'unknown'));
      }
      const { orderId, key, amount } = await r.json();

      const options = {
        key,
        amount,
        order_id: orderId,
        name: "XYZ Esports - Paid Scrim",
        description: scrim.title,
        handler: async function(response){
          // verify on backend
          const vr = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              scrimId: scrim.id,
              userId
            })
          });
          if (vr.ok) {
            alert('Payment successful — you joined the scrim!');
            window.location.reload();
          } else {
            const data = await vr.json();
            alert('Verification failed: ' + (data.error || 'unknown'));
          }
        },
        prefill: { name: "Player", email: "player@game.com" }
      };

      const rz = new window.Razorpay(options);
      rz.open();
    } catch (err) {
      console.error('join error', err);
      alert('Join failed');
    }
  }

  return <button className="your-existing-button" onClick={handleJoin}>Join (Pay ₹{(scrim.entry_fee_cents/100)})</button>;
}
