import React, { useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/navbar/Navbar';
// import ReactTable from './components/react-table/react-table';
import Card from './components/card/card';
import Tab from './components/tab/tab';
import Maintab from './components/main-tab/main-tab';
import ReactTableResult from './components/react-table-result/react-table-result';
import Hybrid from './components/hybrid/hybrid';

import './App.css';
import './assets/css/global.css';
import { alumnos } from './data.json';
import { DataContext } from './contexts/DataContext';
import ImportarDatos from './components/ImportarDatos/ImportarDatos';

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

const MainApp = () => {
  const { updateData, tableName } = useContext(DataContext);

  const columnas = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Edad',
        accessor: 'age',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

  // const mainTable = () => {
  //   if (!loaded) {
  //     return <Card updateTableData={updateData} tituloTable={tableName} />;
  //   } else {
  //     return (
  //       <Styles>
  //         <ReactTable
  //           columns={columns}
  //           data={mainData}
  //           title={tituloTabla}
  //           updateTableData={updateData}
  //           tituloTable={tableName}
  //         />
  //       </Styles>
  //     );
  //   }
  // };

  return (
    <Router>
      <div className="App">
        <Navbar updateTableData={updateData} tituloTable={tableName} />
        <div className="layout">
          <Switch>
            {/* <Route path="/" exact>
              {mainTable}
            </Route>
            <Route path="/home" exact>
              {mainTable}
              <Styles>
                <ReactTable columns={columns} data={mainData} title={tituloTabla} />
              </Styles>
            </Route> */}
            <Route path="/" exact>
              <Maintab />
            </Route>
            <Route path="/importar-datos" exact>
              <ImportarDatos />
            </Route>
            <Route path="/home" exact>
              <Maintab />
            </Route>

            <Route path="/main-tab" exact>
              <Maintab />
            </Route>
            <Route path="/hybrid" exact>
              <Hybrid />
            </Route>
            <Route path="/tabla-result" exact>
              {/* <h1>Tabla resultado</h1> */}
              <Styles>
                <ReactTableResult columns={columnas} titulo={'Resultado'} data={alumnos} />
              </Styles>
            </Route>
            <Route path="/resultado">
              <Tab updateTableData={updateData} tituloTable={tableName} />
            </Route>
            <Route path="/card">
              <Card updateTableData={updateData} tituloTable={tableName} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default MainApp;
