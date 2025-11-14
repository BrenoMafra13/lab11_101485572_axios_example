import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PersonList from './components/PersonList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar data-bs-theme="dark" className="app__header">
        <Container className="justify-content-center">
          <Navbar.Brand className="fw-semibold text-uppercase tracking-wide">
            User List
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="py-4">
        <PersonList />
      </Container>
    </div>
  );
}

export default App;
