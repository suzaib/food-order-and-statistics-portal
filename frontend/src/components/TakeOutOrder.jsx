import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from "./TakeOutOrder.module.css";
import axios from 'axios';

const TakeOutOrder = () => {

  const [venue,setVenue]=useState("");
  const [time,setTime]=useState("");
  const [brand,setBrand]=useState("");
  const [cuisine,setCuisine]=useState("");
  const [quantity,setQuantity]=useState(1);

  const [orderSuccess,setOrderSuccess]=useState(false);


  //Options for dropdowns
  const places=["OSP","Hockey Court","Gymkhana","H15"];
  const times=["Breakfast","Lunch","Dinner"];
  const brands = [
    "Apsara Ice Cream",
    "Blazing BBQ",
    "EatSnap",
    "Feast at East",
    "Freaky Foods",
    "Frozen Bottle",
    "Gala Vendor",
    "GrubWala",
    "Hunger Foods",
    "Hotdog Harbour",
    "Juice Point",
    "Mad Momos",
    "MGS",
    "PVR",
    "Rolls Mania",
    "Sbarro",
    "Shawarmaji",
    "Sodaterian",
    "Starbucks",
    "Taco Bell",
    "The Appetite Momos",
    "The J",
    "The Yellow Mustard",
    "Taste of Hyderabad",
    "UFO",
    "Wakao Foods",
    "Wow Momos",
    "Zatar",
  ];

  const cuisines={
    "Apsara Ice Cream":["Ice Cream"],
    "Blazing BBQ":["Subs"],
    "EatSnap":["Shawarma"],
    "Feast at East":["Rolls"],
    "Freaky Foods":["Fries"],
    "Frozen Bottle":["Milkshake"],
    "Gala Vendor":["Bowls","Wafer Pav"],
    "GrubWala":["Breakfast"],
    "Hunger Foods":["Burger","Vadapav"],
    "Hotdog Harbour":["Pizza"],
    "Juice Point":["Juice","Sandwich"],
    "Mad Momos":["Momos","Shawarma"],
    "MGS":["Rolls","Sandwich"],
    "PVR":["Popcorn"],
    "Rolls Mania":["Rolls"],
    "Sbarro":["Pizza"],
    "Shawarmaji":["Shawarma"],
    "Sodaterian":["Rolls"],
    "Starbucks":["Coffee"],
    "Taco Bell":["Burritos","Tacos"],
    "The Appetite Momos":["Momos"],
    "The J":["Fries"],
    "The Yellow Mustard":["Biryani"],
    "Taste of Hyderabad":["Biryani"],
    "UFO":["Burger"],
    "Wakao Foods":["Biryani"],
    "Wow Momos":["Bowls","Momos"],
    "Zatar":["Pasta"]
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const currentTime=new Date();
    const hours=String(currentTime.getHours()).padStart(2,'0');
    const minutes=String(currentTime.getMinutes()).padStart(2,'0');
    const seconds=String(currentTime.getSeconds()).padStart(2,'0');
    const orderdate=String(new Date().getDate())
    const formattedTime=hours+minutes+seconds;
    const randNo=Math.floor(Math.random()*100000);
    let orderidStr=String(randNo*Number(formattedTime));
    if(orderidStr.length>7){
      orderidStr=orderidStr.substring(0,7);
    }
    const orderid=Number(orderidStr);
    const ordertime=String(hours+":"+minutes+":"+seconds);
  
    const response=await axios.post("http://localhost:5000/api/placeorder",{orderid,brand,cuisine,venue,time,orderdate,ordertime,quantity});
    const {order}=response.data;
    // setVenue("");
    // setTime("");
    // setBrand("");
    // setCuisine("");
    // setQuantity(1);
    setOrderSuccess(true);
  }

  useEffect(()=>{
    setTimeout(()=>{
      setOrderSuccess(false)
    },5000)
  })
  return (
    <div className={styles.mainContainer}>
      <form onSubmit={(e)=>handleSubmit(e)} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel} htmlFor="venue">Venue</label>
          <select className={styles.dropDown} id="venue" value={venue} onChange={(e)=>setVenue(e.target.value)}>
            <option value="">Select Venue</option>
            {places.map((place,index)=>(
              <option key={index} value={place}>{place}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel} htmlFor="time">Time</label>
          <select className={styles.dropDown} id="time" value={time} onChange={(e)=>setTime(e.target.value)}>
            <option value="">Choose Time</option>
            {times.map((timeOption,index)=>(
              <option key={index} value={timeOption}>{timeOption}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel} htmlFor="brand">Brand</label>
          <select className={styles.dropDown}id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}>
            <option value="">Select Brand</option>
            {brands.map((brandOption,index)=>(
              <option key={index} value={brandOption}>{brandOption}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel} htmlFor="cuisine">Cuisine</label>
          <select className={styles.dropDown} id="cuisine" value={cuisine} onChange={(e)=>setCuisine(e.target.value)} disabled={!brand}>
            <option value="">Select Cuisine</option>
            {brand && cuisines[brand].map((cuisineOption,index)=>(
              <option key={index} value={cuisineOption}>{cuisineOption}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel} htmlFor="quantity">Quantity</label>
          <input className={styles.dropDown} type="number" id="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} min="1" required/>
        </div>
        <button className={styles.submitBtn} type="submit">Submit</button>
      </form>
      {orderSuccess && <div className={`${styles.orderConfirmation} ${styles.below}`}>
                            <h3>Order Taken Out</h3>
                            <h3>See History for Confirmation</h3></div>}
    </div>
  )
}

export default TakeOutOrder