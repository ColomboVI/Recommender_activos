import React from 'react';
import './App.css';
import './assets/css/global.css';

import { LucaMenu } from './components/menu/index';
import { LucaTabla } from './components/tabla/index';

// import { Table } from './components/react-table/index';
import Table from './components/tabla-filter/tabla';

import styled from 'styled-components';

const Styles = styled.div`
  table {
    border-spacing: 0;
    // border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr:nth-child(odd) {
      height: 30px;
      background-color: var(--neutral1);
    }
    thead > tr {
      background-color: white !important;
    }

    tr:hover {
      height: 30px;
      background-color: #ddd;
    }
    ,
    th,
    td {
      margin: 0;
      // padding: 0.5rem;
      height: 30px;
      padding: 8px;
      //border-bottom: 1px solid black;
      //border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const data = [
  { firstName: 'Alex', lastName: 'doe', email: 'alex@email.com', id: 1 },
  { firstName: 'John', lastName: 'smith', email: 'jhon@email.com', id: 2 },
  { firstName: 'Lucas', lastName: 'Fri', email: 'lucas@email.com', id: 3 },
  { firstName: 'Marta', lastName: 'Perez', email: 'marta@email.com', id: 4 },
  { firstName: 'Victor', lastName: 'Garcia', email: 'victor@email.com', id: 5 },
  { firstName: 'jess', lastName: 'martin', email: 'jess@email.com', id: 6 },
  { firstName: 'Roberto', lastName: 'byron', email: 'roberto@email.com', id: 7 },
  { firstName: 'Alfonso', lastName: 'Martinez', email: 'alfonso@email.com', id: 8 },
  { firstName: 'Lucia', lastName: 'Pacheco', email: 'lucia@email.com', id: 9 },
  { firstName: 'Silvia', lastName: 'Nieto', email: 'nieto@email.com', id: 10 },
  { firstName: 'Jose', lastName: 'Tavira', email: 'jose@email.com', id: 11 },
  { firstName: 'Patricia', lastName: 'Segovia', email: 'patricia@email.com', id: 12 },
  { firstName: 'Sandra', lastName: 'Tamayo', email: 'sandra@email.com', id: 13 },
  { firstName: 'Joaquin', lastName: 'Smith', email: 'joaquin@email.com', id: 14 },
  { firstName: 'Jon', lastName: 'Papa', email: 'Jon@email.com', id: 15 },
  { firstName: 'Todd', lastName: 'Motto', email: 'todd@email.com', id: 16 },
  { firstName: 'Ana', lastName: 'Sanz', email: 'ana@email.com', id: 17 },
  { firstName: 'Pedro', lastName: 'Pietro', email: 'pedro@email.com', id: 18 },
];

const columnas = [
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  // },
  {
    Header: 'Nombre',
    accessor: 'firstName',
  },
  {
    Header: 'Apellido',
    accessor: 'lastName',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
];

function App() {
  return (
    <div className="App">
      <LucaMenu menuOptions={['User', 'Item']} selectedMenuOption={() => console.log('hola')} />
      <div className="layout">
        <Styles>
          <Table columns={columnas} data={data} title="Usuarios" />
        </Styles>
        <LucaTabla titulo="Resultados" datos={data} />
        {/* <LucaTabla titulo="Reultado" /> */}
        {/* <Table columns={columns} data={data} /> */}
      </div>
    </div>
  );
}

export default App;
