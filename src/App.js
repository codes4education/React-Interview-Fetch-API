import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if(!response.ok){
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      }catch(error){
        setError(error.message);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  console.log("data:", data);

  if(loading){
    return <p className="loading">Loading...</p>;
  }

  if(error){
    return <p className="error">Error: {error}</p>
  }



  return ( 
    <div className="App">
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
