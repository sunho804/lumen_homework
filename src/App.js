import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Container>
          <Map />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;