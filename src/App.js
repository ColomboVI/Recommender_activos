import React from 'react';
import './App.css';
import './assets/css/global.css';

import { LucaMenu } from './components/menu/index';
import { LucaTabla } from './components/tabla/index';

function App() {
  return (
    <div className="App">
      <LucaMenu menuOptions={['User', 'Item']} selectedMenuOption={() => console.log('hola')} />
      <div className="layout">
        <LucaTabla titulo="Usuarios" />
        <LucaTabla titulo="Reultado" />
      </div>
    </div>
  );
}

export default App;
