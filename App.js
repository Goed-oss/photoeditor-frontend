import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAIHeal = async () => {
    try {
      const res = await axios.post('https://ai-photoeditor-backend.onrender.com/api/heal', { image });
      setResult(res.data.url);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Photo Editor</h1>
      <input type="file" onChange={handleUpload} />
      {image && <img src={image} alt="Uploaded" width="300" />}
      <br />
      <button onClick={handleAIHeal}>AI Heal</button>
      {result && <img src={result} alt="Healed" width="300" />}
    </div>
  );
}

export default App;
