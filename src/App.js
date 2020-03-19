import React from 'react';
import './App.css';
import { LucaMenu } from './components/menu/index';

function App() {
  return (
    <div className="App">
      <LucaMenu menuOptions={['Userr', 'Item']} selectedMenuOption={() => console.log('hola')} />
    </div>
  );
}

export default App;
