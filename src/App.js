import logo from './assets/logo.png'; // Import the image
import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmjtvwcmrbmgmzhvuwnc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tanR2d2NtcmJtZ216aHZ1d25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NTIzMzYsImV4cCI6MjAwODMyODMzNn0.OGOTM3KRBNriQgUUXVDXiy5MPt9m96NUIcqpNEoTmSE';

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [mania, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase.from('mania').select('*');
      if (error) {
        console.error('Supabase fetch error (mania):', error);
        // Handle error or show error notifications
      } else {
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Supabase fetch error (mania):', error);
      // Handle error or show error notifications
    }
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('mania')
        .insert([{ name, reason }]);

      if (error) {
        console.error('Supabase insertion error:', error);
        // Handle error or show error notifications
      } else {
        console.log('Submission saved successfully:', data);
        setName('');
        setReason('');
        fetchSubmissions(); // Fetch updated submissions after successful insert
        // Handle success or show notifications
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error or show error notifications
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>help rename the mania collective</h1>
        <p>Mania is a non-hierarchical collective of people on a mission to continuously create meaningful experiences and art together. Members have excessive enthusiasm for the natural world and human connections. We are on the hunt for a more representative name!</p>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="reason"
          />
          <button type="button" onClick={handleSubmit}>
            submit
          </button>
        </form>
        <div className="submissions">
          <h2>submissions</h2>
          <ul>
            {mania.map((mania) => (
              <li key={mania.id}>
                <strong>{mania.name}</strong>: {mania.reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
