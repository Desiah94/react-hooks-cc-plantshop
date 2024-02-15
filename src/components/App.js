import React, {useState, useEffect} from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then((resp) => resp.json())
    .then((data) => setPlants(data))
  }, []);

  const addPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: {"Content-Type": "Application/JSON"},
    body: JSON.stringify(newPlant),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setPlants([...plants, data]);
    })
  };


  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} addPlant={addPlant} />
    </div>
  );
}

export default App;