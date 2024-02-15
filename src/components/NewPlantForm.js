import React, { useState } from "react";

function NewPlantForm({addPlant}) {
  const [plantName, setPlantName] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [plantPrice, setPlantPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPlant = {
      name: plantName,
      image: plantImage,
      price: plantPrice,
    };
    addPlant(newPlant);
    setPlantName("");
    setPlantImage("");
    setPlantPrice("");
  };
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={(event) => setPlantName(event.target.value)}/>
        <input type="text" name="image" placeholder="Image URL" onChange={(event) => setPlantImage(event.target.value)}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={(event) => setPlantPrice(event.target.value)}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;