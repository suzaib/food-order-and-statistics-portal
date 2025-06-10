import React, { useState } from 'react'
import styles from './AdminDashboard.module.css';
import VendorHistory from './VendorHistory';
import VendorStatistics from './VendorStatistics';
import { useLocation } from 'react-router-dom';


const VendorDashboard = () => {

  const location=useLocation();
  const brand=location.state?.brand || localStorage.getItem('brand');
  
  const [activeTab,setActiveTab]=useState("History");
  const handleTabClick=(tab)=>{
    setActiveTab(tab);
  }
  return (
    <div className={styles.container}>
      <ul className={styles.listContainer}>
        <li className={`${styles.listItem} ${activeTab==="History" ? styles.active:""}`} onClick={()=>handleTabClick('History')}>History</li>
        <li className={`${styles.listItem} ${activeTab==="Statistics" ? styles.active:""}`} onClick={()=>handleTabClick("Statistics")}>Statistics</li>
      </ul>
      {activeTab==="History" && <VendorHistory brand={brand}/>}
      {activeTab==="Statistics" && <VendorStatistics brand={brand}/>}
    </div>
  );
};

export default VendorDashboard