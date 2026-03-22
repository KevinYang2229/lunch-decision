import React from 'react';
import './VoteForm.css';

function VoteForm({ userId: username, setUserId: setUsername }) {
  return (
    <div className="vote-form glass">
      <div className="form-group">
        <label htmlFor="userId">你的姓名</label>
        <div className="input-wrapper">
          <span className="icon">👤</span>
          <input
            id="userId"
            type="text"
            placeholder="輸入你的姓名 (例如: Kevin)..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <p className="helper-text">在選擇菜色之前，請先輸入你的姓名。</p>
      </div>
    </div>
  );
}

export default VoteForm;
