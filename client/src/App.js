import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello there!</h1>
        <a href="/auth/google">Sign In With Google</a>
      </header>
    </div>
  );
}

export default App;
