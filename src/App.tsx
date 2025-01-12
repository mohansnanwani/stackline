import React from 'react';
import Header from './Components/Header.tsx';
import Card from './Components/Card.tsx';
import Table from './Components/Table.tsx';
import Graph from './Components/Graph.tsx';
import './App.css';

function App() {
  const { image, title, subtitle, tags } = require('./data_2021.json')[0];

  return (
    <div className="App">
      <Header />
      <div style={{ paddingTop: '70px', paddingLeft: '20px', display: 'flex', gap: '20px' }}>
        <div style={{ width: '20%' }}>
        <Card width="100%" height="100%" backgroundColor="white">
          <img src={image} alt={title} style={{ width: '70%', height: 'auto' }} />
          <h2 style={{ fontWeight: 'bold' }}>{title}</h2>
          <p style={{ fontSize: '12px', color: 'gray' }}>{subtitle}</p>
          <div
            style={{
              padding: '10px',
              borderTop: '1px solid lightgray',
              borderBottom: '1px solid lightgray',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {tags &&
                tags.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '15px',
                      fontSize: '12px',
                      color: '#555',
                      display: 'inline-block',
                      marginBottom: '5px',
                    }}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </Card>
</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '80%' }}>
          <Card width="100%" height="400px" backgroundColor="white">
            <Graph />
          </Card>

          <Card width="100%" backgroundColor="white">
            <Table />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
