import React, { useEffect, useState } from 'react'
import './style.css'

function Featured() {
    const [error, setError] = useState(null);
    const [featuredData, setFeaturedData] = useState([]);
  
    useEffect(() => {
      fetch("http://challenge.mikigi.com:3099/featured", {
        method: "GET",
        headers: {
          "accept": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => setFeaturedData(data.featured))
        .catch(error => {
          setError(error);
        });
    }, []);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    

  return (
    <div className='container'>
        {featuredData.map((item) => (
            <div key={item.id} className='image-wrapper'>
                <img src={item.imageUrl} alt={item.city} className='image' />
                    <div className='image-text'>
                        <p>{item.city}</p>
                        <p>{item.country}</p>
                    </div>
            </div>
      ))}
    </div>
  )
}

export default Featured;