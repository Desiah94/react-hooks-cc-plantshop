import React from 'react';
import PlantCard from './PlantCard'; // Import PlantCard component

function PlantList({ plants, markAsSoldOut }) {
  return (
    <ul className="plant-list">
      {/* Use PlantCard component here */}
      {plants.map(plant => (
        <PlantCard 
          key={plant.id} 
          id={plant.id}
          name={plant.name}
          image={plant.image}
          price={plant.price}
          soldOut={plant.soldOut}
          markAsSoldOut={markAsSoldOut} // Pass markAsSoldOut function
        />
      ))}
    </ul>
  );
}

export default PlantList;
