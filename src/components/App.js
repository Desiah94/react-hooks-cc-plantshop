import React, { useEffect, useState } from 'react';
import Header from './Header';
import PlantPage from './PlantPage';
import PlantCard from './PlantCard'; // Import PlantCard component

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Fetch plant data when the component mounts
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  const markAsSoldOut = async (id) => {
    try {
      // Make a PUT request to mark the plant as sold out
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          soldOut: true,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to mark plant as sold out');
      }

      // Update plants state to reflect the sold out status
      setPlants(prevPlants => prevPlants.map(plant => {
        if (plant.id === id) {
          return { ...plant, soldOut: true };
        }
        return plant;
      }));
    } catch (error) {
      console.error('Error marking plant as sold out:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} />
    </div>
  );
}

export default App;

