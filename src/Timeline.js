import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

function Timeline() {
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1); // Set the initial page number
  
    useEffect(() => {
      // Define the API URL with the page parameter
      const apiUrl = `http://challenge.mikigi.com:3099/timeline?page=${page}`;
  
      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setPageData(data.timeline); // Update the state with fetched data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [page]); // The effect runs whenever the 'page' state changes

    function nextPage () {
        if (page < 2) {
            setPage(page+1)
          } else {
            setPage(1)
          }
    }
  
    return (
      <div>
        <ul>
          {pageData.map((item) => (
            <li key={item.id}>
            <div>
              <img src={item.imageUrl} alt={item.title} />
              <p>Title: {item.title}</p>
              <p>Country Count: {item.countryCount}</p>
              <p>Registration Date: {new Date(Number(item.date)).toDateString()}</p>
              <h3>Users:</h3>
              <ul>
                {item.mentions.map((mention) => (
                  <li key={mention.id}>
                    <img src={mention.profileImage} alt={mention.fullname} />
                    <p>Full Name: {mention.fullname}</p>
                    <p>User Name: {mention.userName}</p>
                    <p>Is Following: {mention.isFollowing ? 'Yes' : 'No'}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          ))}
        </ul>
        <Button className='button mb-5'variant="outline-primary" onClick={nextPage} style={{display: "block", margin: "0 auto", width: "200px"}}>Next</Button>
      </div>
    );
  }
  

export default Timeline;