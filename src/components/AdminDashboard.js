// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';

export default function AdminDashboard(){
  const [payouts,setPayouts] = useState([]);
  useEffect(()=>fetchPayouts(),[]);
  async function fetchPayouts(){
    const r = await fetch('/api/payouts');
    const data = await r.json();
    setPayouts(data || []);
  }
  async function process(id){
    await fetch(`/api/payouts/${id}/process`, { method:'POST' });
    fetchPayouts();
  }
  return (
    <div>
      <h2>Admin Payouts</h2>
      {payouts.length === 0 && <p>No payouts</p>}
      {payouts.map(p => (
        <div key={p.id} className="payout-row">
          <p>User: {p.user_id} • ₹{(p.amount_cents/100).toFixed(0)} • {p.status}</p>
          {p.status !== 'paid' && <button onClick={()=>process(p.id)}>Mark Paid</button>}
        </div>
      ))}
    </div>
  );
}
