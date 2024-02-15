import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

export default function PlantPage({plants, addPlant}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState(plants);

  useEffect(() => {
    const filtered = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filtered);
  }, [searchQuery, plants]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const updatePlantPrice = (plantId, number) => {
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/JSON"},
      body: JSON.stringify({"price": number }),
    })
    .then((resp) => resp.json())
    .then((updatedPlant) => {
      setFilteredPlants((prevPlants) =>
      prevPlants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
      )
      );
    })
  };
    const deletePlant = (plantId) => {
      fetch(`http://localhost:6001/plants/${plantId}`, {
        method:"DELETE",
      })
      .then((resp) => {
        if (resp.ok) {
          setFilteredPlants((originalPlants) =>
            originalPlants.filter((plant) => plant.id !== plantId)
          );
        } else {
          console.error("Failed to delete plant");
        }
      });
    };



  return (
    <main>
      <NewPlantForm addPlant={addPlant}/>
      <Search onChange={handleSearch}/>
      <PlantList plants={filteredPlants} updatePlantPrice={updatePlantPrice} deletePlant={deletePlant}/>
    </main>
  );
}