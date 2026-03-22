import React, { useState } from 'react';
import VoteForm from '../components/VoteForm';
import MenuList from '../components/MenuList';

function VotePage() {
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleVote = async (menuId) => {
    if (!userId.trim()) {
      setStatus({ type: 'error', message: '投票前請先輸入姓名。' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:5002/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          menuId: menuId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: '投票成功！您的選擇已更新。🎉' });
      } else {
        setStatus({ type: 'error', message: data.error || '投票失敗。' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: '網路錯誤，請稍後再試。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vote-page">
      <VoteForm userId={userId} setUserId={setUserId} />
      
      {status && (
        <div className={`status-banner glass ${status.type}`}>
          {status.message}
        </div>
      )}

      <MenuList onSelect={handleVote} isSubmitting={isSubmitting} />
      
      <style>{`
        .status-banner {
          padding: 1rem 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 500;
          animation: slideIn 0.3s ease-out;
        }
        .status-banner.success {
          border-color: #22c55e;
          color: #4ade80;
          background: rgba(34, 197, 94, 0.1);
        }
        .status-banner.error {
          border-color: #ef4444;
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default VotePage;
