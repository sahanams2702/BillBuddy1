import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </div>
  );
};

const LeftSidebar = ({ handleLogout }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
    
    switch (item) {
      case 'dashboard':
        navigate('/dashboard');
        
      case 'invoices':
        navigate('/upload-invoice');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        
        navigate('/help');
        break;
      

      default:
        break;
    }
  
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
    handleLogout();
    navigate('/home');
  };

  return (
    <div className="sidebar">
      <h1>BILL BUDDY</h1>
      <SidebarItem
        icon="📊"
        label="Dashboard"
        active={activeItem === 'dashboard'}
        onClick={() => handleItemClick('dashboard')}
      />
      <SidebarItem
        icon="📜"
        label="Invoices"
        active={activeItem === 'invoices'}
        onClick={() => handleItemClick('invoices')}
      />
      <SidebarItem
        icon="⚙️"
        label="Settings"
        active={activeItem === 'settings'}
        onClick={() => handleItemClick('settings')}
      />
      <SidebarItem
        icon="❓"
        label="Help"
        active={activeItem === 'help'}
        onClick={() => handleItemClick('help')}
      />
      <SidebarItem
        icon="🚪"
        label="Logout"
        onClick={handleLogoutClick}
      />
    </div>
  );
};

export default LeftSidebar;
