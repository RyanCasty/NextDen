import { useState } from 'react';
import '../styles/financeCoach.css';

function FinanceCoach() {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="coach-info">
          <div className="coach-avatar"></div>
          <div className="coach-details">
            <h3 className="coach-name">Cubby Coach</h3>
            <span className="coach-status">Status: Grumpy!</span>
          </div>
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-title">
          <h1>Hey, what do you want to do today?</h1>
        </div>
      </div>
    </div>
  );
}

export default FinanceCoach;