import React from 'react';
import CreateScrim from './components/CreateScrim';
import ScrimList from './components/ScrimList';

function App() {
  return (
    <div className="app">
      <header>XYZ Esports</header>
      <main>
        <CreateScrim />
        <ScrimList />
      </main>
    </div>
  );
}

export default App;
