// src/components/ScrimList.js
import React, { useEffect, useState } from 'react';
import JoinPaidButton from './JoinPaidButton';

export default function ScrimList() {
  const [scrims, setScrims] = useState([]);
  useEffect(()=>{ fetchScrims(); }, []);

  async function fetchScrims() {
    const r = await fetch('/api/scrims');
    const data = await r.json();
    setScrims(data || []);
  }

  return (
    <div>
      <h2>Open Scrims</h2>
      {scrims.length === 0 && <p>No scrims found.</p>}
      {scrims.map(s => (
        <div key={s.id} className="scrim-card">
          <h3>{s.title}</h3>
          <p>Entry: ₹{(s.entry_fee_cents/100).toFixed(0)} • Capacity: {s.capacity}</p>
          <p>When: {s.datetime ? new Date(s.datetime).toLocaleString() : 'TBA'}</p>
          <p>Status: {s.status}</p>
          <JoinPaidButton scrim={s} />
        </div>
      ))}
    </div>
  );
}
