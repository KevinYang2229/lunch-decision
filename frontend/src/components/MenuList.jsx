import React, { useState, useEffect } from 'react';
import './MenuList.css';

function MenuList({ onSelect, isSubmitting }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/menu/today');
        const data = await response.json();
        if (data.success) {
          setMenu(data.menu);
        } else {
          setError('Failed to load menu data');
        }
      } catch (err) {
        setError('Network error, please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="menu-list glass">
        <div className="status-message">✨ 正在搜尋今天的選項...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-list glass">
        <div className="status-message error">❌ {error}</div>
      </div>
    );
  }

  return (
    <div className="menu-list glass">
      <div className="menu-header">
        <h2>今日特色菜單</h2>
        <span className="count">找到 {menu.length} 個選項</span>
      </div>
      
      {menu.length === 0 ? (
        <p className="no-data">今天目前沒有可用的菜單。</p>
      ) : (
        <div className="menu-grid">
          {menu.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="item-info">
                <h3>{item.name}</h3>
                <span className="category-tag">{item.category}</span>
              </div>
              <button 
                className="select-btn"
                disabled={isSubmitting}
                onClick={() => onSelect(item.id)}
              >
                {isSubmitting ? '傳送中...' : '投票'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuList;
