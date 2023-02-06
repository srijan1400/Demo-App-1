import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [insights, setInsights] = useState(null);

  const handleFileUpload = async (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fetchData = async () => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/api/generate-insights', formData);
      setInsights(data.insights);
    };

    fetchData();
  }, [file]);

  return (
    <div>
      <h1>Insights Generator</h1>
      <input type="file" onChange={handleFileUpload} />
      {insights && (
        <div>
          <h2>Insights:</h2>
          <p>{insights}</p>
        </div>
      )}
      <style jsx>{`
        div {
          margin: 0 auto;
          max-width: 800px;
        }
      `}</style>
    </div>
  );
};

export default Home;
