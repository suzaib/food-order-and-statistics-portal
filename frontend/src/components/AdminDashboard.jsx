import React, { useState } from 'react'
import styles from './AdminDashboard.module.css';
import TakeOutOrder from './TakeOutOrder';
import History from './History';
import Statistics from './Statistics';

const AdminDashboard = () => {
  
  const [activeTab,setActiveTab]=useState("TakeOutOrder");
  const handleTabClick=(tab)=>{
    setActiveTab(tab);
  }
  return (
    <div className={styles.container}>
      <ul className={styles.listContainer}>
        <li className={`${styles.listItem} ${activeTab==="History" ? styles.active:""}`} onClick={()=>handleTabClick('History')}>History</li>
        <li className={`${styles.listItem} ${activeTab==="Statistics" ? styles.active:""}`} onClick={()=>handleTabClick("Statistics")}>Statistics</li>
        <li className={`${styles.listItem} ${activeTab==="TakeOutOrder" ? styles.active:""}`} onClick={()=>handleTabClick("TakeOutOrder")}>Take Out Order</li>
      </ul>
      {activeTab==="History" && <History/>}
      {activeTab==="Statistics" && <Statistics/>}
      {activeTab==="TakeOutOrder" && <TakeOutOrder/>}
    </div>
  );
};

export default AdminDashboard