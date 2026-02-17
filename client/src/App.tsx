import { useState } from 'react';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import './index.css';

function App() {
  const [started, setStarted] = useState(false);

  // Simple view switching for now
  return (
    <main className="w-full min-h-screen bg-cyber-dark text-white font-sans selection:bg-cyber-green selection:text-black">
      {!started ? (
        <Hero onStart={() => setStarted(true)} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}

export default App;
