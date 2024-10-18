// components/Generator.js
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Your Supabase client setup

const Generator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateContent = async () => {
    // Call your AI service here
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setOutput(data.output);
    
    // Save to Supabase
    await supabase.from('generations').insert([{ input, output: data.output }]);
  };

  return (
    <div>
      <h1>Generative UI System</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={generateContent}>Generate</button>
      <div>
        <h2>Output:</h2>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default Generator;
