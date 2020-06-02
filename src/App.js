import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';
import ReactTable from './components/react-table/react-table';
import Card from './components/card/card';
import Tab from './components/tab/tab';

import './App.css';
import './assets/css/global.css';

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
    const dataForColumn = JSON.parse(newData)[0];
    setMainData(JSON.parse(newData));

    let colu = [];
    for (let key in dataForColumn) {
      // console.log(key);
      colu.push({
        Header: key.toUpperCase(),
        accessor: key,
      });
    }
    setColumnData(colu);
    setLoaded(true);
  };

  const recibeNombre = (nombre) => {
    setTituloTabla(nombre.split('.')[0].toUpperCase());
  };
  return (
    <Router>
      <div className="App">
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
