import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Statistics.module.css';

const Statistics = () => {
  const [orders, setOrders] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedOrderDate, setSelectedOrderDate] = useState(''); // New state for orderdate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history'); // Assuming endpoint to fetch orders
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter orders based on selected criteria
  const filterOrders = () => {

    return orders.filter((order) => {
      return (
        (selectedBrand ? order.brand === selectedBrand : true) &&
        (selectedVenue ? order.venue === selectedVenue : true) &&
        (selectedTime ? order.time === selectedTime : true) &&
        (selectedOrderDate ? order.orderdate == selectedOrderDate : true) // Apply filter for orderdate
      );
    });
  };

  // Helper functions to calculate statistics
  const calculateTotalOrders = (orders) => orders.length;

  const calculateTotalQuantity = (orders) => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };

  const calculateTotalOrdersByVenue = (orders) => {
    const venueCount = {};
    orders.forEach((order) => {
      venueCount[order.venue] = (venueCount[order.venue] || 0) + 1;
    });
    return venueCount;
  };

  const calculateTotalOrdersByTime = (orders) => {
    const timeCount = {};
    orders.forEach((order) => {
      timeCount[order.time] = (timeCount[order.time] || 0) + 1;
    });
    return timeCount;
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const filteredOrders = filterOrders();

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Order Statistics</h1>

      <div className={styles.filters}>
        <label htmlFor="brandSelect" className={styles.filterLabel}>
          Filter by Brand:
        </label>
        <select
          id="brandSelect"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className={styles.select}
        >
          <option value="">All Brands</option>
          {[...new Set(orders.map((order) => order.brand))].map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <label htmlFor="venueSelect" className={styles.filterLabel}>
          Filter by Venue:
        </label>
        <select
          id="venueSelect"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className={styles.select}
        >
          <option value="">All Venues</option>
          {[...new Set(orders.map((order) => order.venue))].map((venue, index) => (
            <option key={index} value={venue}>
              {venue}
            </option>
          ))}
        </select>

        <label htmlFor="timeSelect" className={styles.filterLabel}>
          Filter by Time:
        </label>
        <select
          id="timeSelect"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className={styles.select}
        >
          <option value="">All Times</option>
          {['Breakfast', 'Lunch', 'Dinner'].map((timeOption, index) => (
            <option key={index} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>

        {/* New filter for Order Date */}
        <label htmlFor="orderDateSelect" className={styles.filterLabel}>
          Filter by Order Date:
        </label>
        <select
          id="orderDateSelect"
          value={selectedOrderDate}
          onChange={(e) => setSelectedOrderDate(e.target.value)}
          className={styles.select}
        >
          <option value="">All Dates</option>
          {[22,23,24,25,26,27].map((dateOption, index) => (
            <option key={index} value={dateOption}>
              {dateOption}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.statisticsContainer}>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p>{calculateTotalOrders(filteredOrders)}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Quantity</h3>
          <p>{calculateTotalQuantity(filteredOrders)}</p>
        </div>
      </div>

      <div className={styles.statisticsContainer}>
        <div className={styles.statCard}>
          <h3>Orders by Venue</h3>
          <ul>
            {Object.entries(calculateTotalOrdersByVenue(filteredOrders)).map(
              ([venue, count], index) => (
                <li key={index}>
                  {venue}: {count}
                </li>
              )
            )}
          </ul>
        </div>
        <div className={styles.statCard}>
          <h3>Orders by Time</h3>
          <ul>
            {Object.entries(calculateTotalOrdersByTime(filteredOrders)).map(
              ([time, count], index) => (
                <li key={index}>
                  {time}: {count}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {selectedBrand && (
        <div className={styles.ordersContainer}>
          <h2>Orders for {selectedBrand}</h2>
          <div className={styles.ordersList}>
            {filteredOrders.map((order, index) => (
              <div key={index} className={styles.orderCard}>
                <p><strong>Brand:</strong> {order.brand}</p>
                <p><strong>Cuisine:</strong> {order.cuisine}</p>
                <p><strong>Venue:</strong> {order.venue}</p>
                <p><strong>Time:</strong> {order.time}</p>
                <p><strong>Order Date:</strong> {order.orderdate}</p> {/* Display orderdate */}
                <p><strong>Order Time:</strong>{order.ordertime}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
