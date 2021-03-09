import logo from './logo.svg';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Map from './components/Map';
import VideoList from './components/VideoList';
//import youtube from './components/Youtube';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", backgroundColor: "#EFEFE6" }}>
      <Container>
        <Author>Zoey Jung</Author>
        <Title>
          <p className="heyTitle">Hey there!</p>
          <span className="restTitle">Click on any location on the map and select one landmark. <br />
          It will show you a list of Youtube videos related to landmarks near the location!</span>
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
`;
const Content = styled.div`
  padding: 20px;
`;
const Title = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  text-align: left;
  font-family: 'Lobster', cursive;
  color: #474747;
  p {
    margin: 0 0 15px 0;
    font-size: 42px;
  }
  span {
    margin: 0 auto;
    font-size: 25px;
  }
`;

const Author = styled.div`
  float: right;
  font-family: 'Teko', sans-serif;
  color: #626254;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 10px;
  font-size: 15px;
`;