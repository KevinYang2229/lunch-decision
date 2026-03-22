import React from 'react';

function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="result-display glass animate-pop">
      <div className="trophy">🏆</div>
      <h2 className="winner-label">本日午餐主打</h2>
      <div className="winner-card">
        <h1 className="restaurant-name">{result.menu_name}</h1>
        <span className="category-badge">{result.category}</span>
      </div>
      <p className="congrats-text">
        別再猶豫了，今天就吃這家吧！✨
      </p>

      <style>{`
        .result-display {
          padding: 3rem;
          text-align: center;
          max-width: 500px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .trophy {
          font-size: 4rem;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
        }
        .winner-label {
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-size: 0.9rem;
        }
        .winner-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-md);
          width: 100%;
        }
        .restaurant-name {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
          background: var(--gradient-1); /* Use the global gradient */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .category-badge {
          padding: 0.5rem 1.25rem;
          background: var(--tag-bg);
          color: var(--tag-text);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .congrats-text {
          margin-top: 1rem;
          color: var(--text-secondary);
        }
        .animate-pop {
          animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes pop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default ResultDisplay;
