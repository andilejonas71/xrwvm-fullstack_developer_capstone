// frontend/src/components/Dealers/PostReview.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const fetchDealer = async () => {
    try {
      const response = await fetch(`/djangoapp/dealer/${id}`);
      const data = await response.json();
      if (data.status === 200) {
        setDealer(data.dealer[0]); // Assuming dealer is returned as an array in JSON
      } else {
        console.error("Failed to fetch dealer details");
      }
    } catch (error) {
      console.error("Error fetching dealer details:", error);
    }
  };

  const fetchCarModels = async () => {
    try {
      const response = await fetch(`/djangoapp/get_cars`);
      const data = await response.json();
      if (data.CarModels) {
        setCarmodels(data.CarModels);
      } else {
        console.error("Failed to fetch car models");
      }
    } catch (error) {
      console.error("Error fetching car models:", error);
    }
  };

  useEffect(() => {
    fetchDealer();
    fetchCarModels();
  }, [id]);

  const postReview = async () => {
    const name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    const makeChosen = model.split(" ")[0];
    const modelChosen = model.split(" ")[1];

    const jsonInput = JSON.stringify({
      name: name.includes("null") ? sessionStorage.getItem("username") : name,
      dealership: id,
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: makeChosen,
      car_model: modelChosen,
      car_year: year,
    });

    try {
      const response = await fetch("/djangoapp/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonInput,
      });
      const data = await response.json();
      if (data.status === 200) {
        window.location.href = `/dealer/${id}`;
      } else {
        console.error("Failed to post review");
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
        <div className='input_field'>
          Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='input_field'>
          Car Make
          <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled hidden>Select Car Make and Model</option>
            {carmodels.map((carmodel, index) => (
              <option key={index} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>{carmodel.CarMake} {carmodel.CarModel}</option>
            ))}
          </select>
        </div>

        <div className='input_field'>
          Car Year <input type="number" onChange={(e) => setYear(e.target.value)} max={2023} min={2015} />
        </div>

        <div>
          <button className='postreview' onClick={postReview}>Post Review</button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
