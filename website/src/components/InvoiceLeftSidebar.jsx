import React, { useState, useEffect } from 'react';
import '../styles/Invoice.css';

const SidebarItem = ({ icon, label, active, onClick }) => {
    return (
      <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
      </div>
    );
  };

  const InvoiceLeftSidebar = ({ activeItem, handleItemClick, handleLogout }) => {
    return (
      <div className="Invoicesidebar">
        <h1>BILL BUDDY</h1>
        <SidebarItem
          icon={<i className="fas fa-chart-line"></i>}
          label="Dashboard"
          active={activeItem === 'customerdashboard'}
          onClick={() => handleItemClick('/customerdashboard')}
        />
        
        <SidebarItem
          icon={<i className="fas fa-sign-out-alt"></i>}
          label="Logout"
          onClick={handleLogout}
        />
        </div>
    );
  };
  export default InvoiceLeftSidebar;