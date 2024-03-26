import React, { useRef, useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  const inputRef = useRef(null);
  const [baseUrl, setBaseUrl] = useState('https://image.pollinations.ai/prompt/');
  const [prompt, setPrompt] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null); 
  const [inputValue, setInputValue] = useState('');
  const [loading,setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (finalPrompt) {
      SendImage(finalPrompt);
    }
  }, [finalPrompt]);

  function imageGenerator(e) {
    e.preventDefault(); 
    const userInput = inputRef.current.value.trim();
    setPrompt(userInput);
    
    console.log(userInput)
    
    const joinUrl = baseUrl.concat(userInput);
    
    console.log(joinUrl);
    
    setFinalPrompt(joinUrl);
  }
  
  async function SendImage(promptUrl) {
    try {
      setLoading(true);
      const userBadInput = inputRef.current.value.trim().toLowerCase();
      if (userBadInput.includes('sex') || userBadInput.includes('porn') || userBadInput.includes('fuck')) {
        // Show warning popup and return without processing the image
        alert("Warning: This type of content is not allowed.");
        setLoading(false);
        return;
      }
      
      const response = await fetch(promptUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      const imageElement = WriteImage(imageUrl); 
      setGeneratedImage(imageElement); 
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  }

  function WriteImage(url) {
    return <img src={url} alt="Generated" />;
  }

  return (
    <div id='dash'>
      <Helmet>
        <title>{`${params.name} | Adil's AI Image Generator`}</title>
      </Helmet>

      <section className="wrapper">
        <div className="top">
          <p>Hi {params.name}, type in prompt which type or creative you want!!!</p>
          <p>Create your own creativity and enjoy with our AI platform...</p>
          <p>Thank You.</p>
        </div>
        <div className="middle">
          <div className="image-box">
            {generatedImage}
            <div className="loading">
              <div className={loading?"loading-bar-full":"loading-bar"}></div>
              <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div>
            <form className="input-field" onSubmit={imageGenerator}>
              <input type="text" ref={inputRef} placeholder='Type your image URL...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}