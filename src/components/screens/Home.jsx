import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default function Home() {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.elements.name.value.trim();
    if (input) {
      setName(input);
      window.location.href = `/dashboard/${input}`;
    }
  };

  const handleGenerateClick = () => {
    setIsActive(true);
  };

  const handleCancelClick = () => {
    setIsActive(false);
  };

  return (
    <div id='home'>
      <Helmet>
        <title>Adil's AI | Image Generator AI App</title>
      </Helmet>
      
      <div id="main-block">
        <header>
          <h1 className="left"><img src={require('./../assets/logo.png')} alt="favicon" /></h1>
          <ul className="right">
            <li>
              <button onClick={handleGenerateClick}>Generate</button>
            </li>
          </ul>
        </header>

        <section id="hero">
          <section className="wrapper">
            <div className="left">
              <span className='top'>Adil's</span>
              <h1>AI image <br /> <span>Generator</span> App</h1>
              <p>Make your own creative image...</p>
            </div>
            <div className="right">
              <img src={require('./../assets/hero.png')} alt="image" />
            </div>
          </section>
        </section>
      </div>
      <div className={`over ${isActive ? 'active' : ''}`} onClick={handleCancelClick}></div>
      <div className={`form-field ${isActive ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h1>Enter your name and enjoy</h1>
          <input type="text" name="name" placeholder='Enter your name' minLength={3} required />
          <ul>
            <li><button type="button" onClick={handleCancelClick}>Cancel</button></li> {/* Use type="button" to prevent form submission */}
            <li><button type="submit">Submit</button></li>
          </ul>
        </form>
      </div>
    </div>
  );
}
