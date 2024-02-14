import React, { useState } from 'react';

function PlantPage({ plants }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [plantStock, setPlantStock] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Make a POST request to add the new plant
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image,
          price,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to add plant');
      }

      // Reset form fields after successful submission
      setName('');
      setImage('');
      setPrice('');
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const toggleStockStatus = (id) => {
    setPlantStock(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="plant-page">
      <div className='new-plant-form'>
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
      </div>
      <div className="plant-list">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className='cards'>
          {filteredPlants.map((plant) => (
            <li className='card' key={plant.id}>
              <h3>{plant.name}</h3>
              <img src={plant.image} alt={plant.name} />
              <p>Price: ${plant.price}</p>
              <button
                className={plantStock[plant.id] ? 'primary' : ''}
                onClick={() => toggleStockStatus(plant.id)}
              >
                {plantStock[plant.id] ? 'In Stock' : 'Out of Stock'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlantPage;
