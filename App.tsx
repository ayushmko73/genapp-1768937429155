import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100 p-4">
      <Sparkles className="w-16 h-16 text-amber-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-center">Your AI App Awaits</h1>
      <p className="text-zinc-400 text-center max-w-md">
        Describe what you want to build in the chat box on the left, and I'll generate the code for you instantly.
      </p>
    </div>
  );
}