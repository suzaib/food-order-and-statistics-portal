import React, { useEffect, useState } from 'react';
import styles from './History.module.css';
import axios from 'axios';

const VendorHistory = ({brand}) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:5000/api/vendorhistory?brand=${brand}`);
      setOrders(response.data);
      setFilteredOrders(response.data);
    };
    fetchOrders();
  }, []);

  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
    filterOrders(e.target.value, selectedTime);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    filterOrders(selectedVenue, e.target.value);
  };

  const filterOrders = (venue, time) => {
    let filtered = orders;

    if (venue) {
      filtered = filtered.filter(order => order.venue === venue);
    }

    if (time) {
      filtered = filtered.filter(order => order.time === time);
    }

    if (!venue && !time) {
      filtered = orders;
    }

    setFilteredOrders(filtered);
  };

  const venues = [...new Set(orders.map(order => order.venue))];
  const times = [...new Set(orders.map(order => order.time))]; // Assuming time is a string that can be selected

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Order History</h1>

      <div className={styles.filters}>

        <select
          className={styles.select}
          value={selectedVenue}
          onChange={handleVenueChange}
        >
          <option value="">Select Venue</option>
          {venues.map((venue, index) => (
            <option key={index} value={venue}>
              {venue}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selectedTime}
          onChange={handleTimeChange}
        >
          <option value="">Select Time</option>
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Cuisine</th>
            <th>Venue</th>
            <th>Time</th>
            <th>Ordered At</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderid}</td>
              <td>{order.cuisine}</td>
              <td>{order.venue}</td>
              <td>{order.time}</td>
              <td>{order.ordertime}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorHistory;