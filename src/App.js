import React from 'react';
import Navbar from './Navbar';
import Form from './Form';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main className="container-fluid">
        <Form />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;