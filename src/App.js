import logo from './logo.svg';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Map from './components/Map';
import VideoList from './components/VideoList';
import { Typography } from '@material-ui/core';
//import youtube from './components/Youtube';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", backgroundColor: "#EFEFE6" }}>
      <Container>
        <Title>
          <p>Hey!</p>
          <p>Click on any location on the map and select one landmark. </p>
          <p>It will show you Youtube videos related to landmarks near the location!</p>
        </Title>
        <Content>
          <Map onLocationChange={setSelectedLocation}/>
          <VideoList selectedLocation={selectedLocation}/>
        </Content>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 94%;
  margin: 20px;
  background: #E0E0CE;
  border-radius: 10px;
`;
const Content = styled.div`
  // display: grid;
  // grid-template-columns: 55% auto;
  padding: 20px;
`;
const Title = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  text-align: left;
  font-size: 35px;
  font-family: 'Lobster', cursive;
  color: #474747;
  text-shadow: 2px 2px #b8b8b8;
  
  p {
    margin: 0;
  }
`;