import './App.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

import Navbar from '../Layout/Navbar'
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Router >
        <Routes />
      </Router>
    </div>
  );
}

export default App;
