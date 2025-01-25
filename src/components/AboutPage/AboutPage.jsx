import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
    <div>
      <h1>🍎🍌 Welcome to the Fruit Market App! 🍇🍊</h1>
      <p>
        This app is designed to simulate a dynamic fruit marketplace. Here's how it works:
      </p>
      <ul>
        <li>💰 Start with $100 in cash to buy and sell fruits.</li>
        <li>📉📈 Fruit prices adjust every 5 seconds, fluctuating between $0.01 and $0.50.</li>
        <li>🍓 Prices will never drop below $0.50 or rise above $9.99, so don't worry!</li>
        <li>📊 Track your inventory statistics:
          <ul>
            <li>🍍 The average price you've paid for each fruit type.</li>
            <li>💵 Total cash on hand.</li>
            <li>📈 Potential profit and loss in both dollar amount and percentage.</li>
          </ul>
        </li>
        <li>✨ Try to maximize your gains and become a fruit market entrepreneur!</li>
      </ul>
      <p>🍍 Dive in and have fun managing your fruit empire! 🍓✨</p>
      <button 
        className="start-button" 
        onClick={() => alert('Let’s get started!')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ffcc00',
          border: 'none',
          borderRadius: '10px',
          color: '#333',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        Let’s Get Started!
      </button>
    </div>
  </div>
  );
}

export default AboutPage;
