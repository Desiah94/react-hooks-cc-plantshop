import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, toggleStockStatus, updatePlantPrice}) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} toggleStockStatus={toggleStockStatus} updatePlantPrice={updatePlantPrice}/>
      ))}
    </ul>
  );
}

export default PlantList;