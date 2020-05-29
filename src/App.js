import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './assets/css/global.css';

// import { LucaMenu } from './components/menu/index';
import { LucaTabla } from './components/tabla/index';
import ReactTable from './components/react-table/react-table';

import styled from 'styled-components';
import Navbar from './components/navbar/Navbar';
import Tab from './components/tab/tab';
import Card from './components/card/card';
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
  table {
    width: 100%;
  }
`;

const data = [];
// const data = [
//   { firstName: 'Alex', lastName: 'doe', email: 'alex@email.com', id: 1 },
//   { firstName: 'John', lastName: 'smith', email: 'jhon@email.com', id: 2 },
//   { firstName: 'Lucas', lastName: 'Fri', email: 'lucas@email.com', id: 3 },
//   { firstName: 'Marta', lastName: 'Perez', email: 'marta@email.com', id: 4 },
//   { firstName: 'Victor', lastName: 'Garcia', email: 'victor@email.com', id: 5 },
//   { firstName: 'jess', lastName: 'martin', email: 'jess@email.com', id: 6 },
//   { firstName: 'Roberto', lastName: 'byron', email: 'roberto@email.com', id: 7 },
//   { firstName: 'Alfonso', lastName: 'Martinez', email: 'alfonso@email.com', id: 8 },
//   { firstName: 'Lucia', lastName: 'Pacheco', email: 'lucia@email.com', id: 9 },
//   { firstName: 'Silvia', lastName: 'Nieto', email: 'nieto@email.com', id: 10 },
//   { firstName: 'Jose', lastName: 'Tavira', email: 'jose@email.com', id: 11 },
//   { firstName: 'Patricia', lastName: 'Segovia', email: 'patricia@email.com', id: 12 },
//   { firstName: 'Sandra', lastName: 'Tamayo', email: 'sandra@email.com', id: 13 },
//   { firstName: 'Joaquin', lastName: 'Smith', email: 'joaquin@email.com', id: 14 },
//   { firstName: 'Jon', lastName: 'Papa', email: 'Jon@email.com', id: 15 },
//   { firstName: 'Todd', lastName: 'Motto', email: 'todd@email.com', id: 16 },
//   { firstName: 'Ana', lastName: 'Sanz', email: 'ana@email.com', id: 17 },
//   { firstName: 'Pedro', lastName: 'Pietro', email: 'pedro@email.com', id: 18 },
// ];

// const columnas = [
//   {
//     Header: 'ID',
//     accessor: 'id',
//   },
//   {
//     Header: 'Nombre',
//     accessor: 'firstName',
//   },
//   {
//     Header: 'Apellido',
//     accessor: 'lastName',
//   },
//   {
//     Header: 'Email',
//     accessor: 'email',
//   },
// ];

function App() {
  const [mainData, setMainData] = React.useState([]);
  const [columns, setColumnData] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [tituloTabla, setTituloTabla] = React.useState('Datos');

  const mainTable = () => {
    if (!loaded) {
      return <Card />;
    } else {
      return (
        <Styles>
          <ReactTable columns={columns} data={mainData} title={tituloTabla} />
        </Styles>
      );
    }
  };

  const updateData = (newData) => {
    console.log('Nombre!!!', JSON.parse(newData));
    const dataForColumn = JSON.parse(newData)[0];
    setMainData(JSON.parse(newData));

    let colu = [];
    for (let key in dataForColumn) {
      console.log(key);
      colu.push({
        Header: key.toUpperCase(),
        accessor: key,
      });
    }
    setColumnData(colu);
    setLoaded(true);
  };

  const recibeNombre = (nombre) => {
    console.log('Recibe nombre', nombre);
    setTituloTabla(nombre);
  };
  return (
    <Router>
      <div className="App">
        {/* <LucaMenu menuOptions={['User', 'Item']} selectedMenuOption={() => console.log('hola')} /> */}
        <Navbar updateTableData={updateData} tituloTable={recibeNombre} />
        <div className="layout">
          <Switch>
            <Route path="/" exact>
              {mainTable}
              {/* <Styles>
                <ReactTable columns={columns} data={mainData} title="Usuarios" />
              </Styles> */}
            </Route>
            <Route path="/home" exact>
              <Styles>
                <ReactTable columns={columns} data={mainData} title={tituloTabla} />
              </Styles>
            </Route>
            {/* <Route path="/resultado">
              <LucaTabla titulo="Resultado" datos={data} />
            </Route> */}
            <Route path="/resultado">
              <Tab />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
