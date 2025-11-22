// src/components/CreateScrim.js
import React, { useState } from 'react';

export default function CreateScrim({ onCreated }) {
  const [title, setTitle] = useState('');
  const [entryFee, setEntryFee] = useState(50);
  const [capacity, setCapacity] = useState(4);
  const [teamSize, setTeamSize] = useState(1);
  const [datetime, setDatetime] = useState('');

  async function submit() {
    const payload = {
      organizerId: 1, // replace with logged-in user id
      title,
      mode: 'classic',
      map: 'Erangel',
      datetime,
      entryFeeRupees: Number(entryFee),
      capacity: Number(capacity),
      teamSize: Number(teamSize)
    };

    const res = await fetch('/api/scrims', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Scrim created');
      onCreated && onCreated(data);
      setTitle('');
    } else {
      alert('Error: ' + (data.error || 'unknown'));
    }
  }

  return (
    <div className="card">
      <h3>Create Paid Scrim</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input type="number" value={entryFee} onChange={e=>setEntryFee(e.target.value)} placeholder="Entry fee (₹)" />
      <input type="number" value={capacity} onChange={e=>setCapacity(e.target.value)} placeholder="Capacity" />
      <input type="number" value={teamSize} onChange={e=>setTeamSize(e.target.value)} placeholder="Team size" />
      <input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} />
      <button className="your-existing-button" onClick={submit}>Create</button>
    </div>
  );
}
