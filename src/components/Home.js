import '../styles/Home.css';
import React from 'react';
import pic from "./img/fish.jpg";

function Home() {
  return (
    <div className='header'
        style={{ backgroundImage: `url(${pic})`, backgroundSize: 'cover'}}>
        <p><strong>Welcome to NavTask!</strong></p>
    </div>

  );
}
export default Home;