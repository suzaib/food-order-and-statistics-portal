import React, { useEffect, useState } from 'react';
import styles from './History.module.css';
import axios from 'axios';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5000/api/history');
      setOrders(response.data);
      setFilteredOrders(response.data);
    };
    fetchOrders();
  }, []);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    filterOrders(e.target.value, selectedVenue, selectedTime);
  };

  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
    filterOrders(selectedBrand, e.target.value, selectedTime);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    filterOrders(selectedBrand, selectedVenue, e.target.value);
  };

  const filterOrders = (brand, venue, time) => {
    let filtered = orders;

    if (brand) {
      filtered = filtered.filter(order => order.brand === brand);
    }

    if (venue) {
      filtered = filtered.filter(order => order.venue === venue);
    }

    if (time) {
      filtered = filtered.filter(order => order.time === time);
    }

    if (!brand && !venue && !time) {
      filtered = orders;
    }

    setFilteredOrders(filtered);
  };

  const brands = [...new Set(orders.map(order => order.brand))];
  const venues = [...new Set(orders.map(order => order.venue))];
  const times = [...new Set(orders.map(order => order.time))]; // Assuming time is a string that can be selected

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Order History</h1>

      <div className={styles.filters}>
        <select
          className={styles.select}
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="">Select Brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

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
            <th>Brand</th>
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
              <td>{order.brand}</td>
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

export default History;
