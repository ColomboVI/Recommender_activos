import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main-tab.css';
import styled from 'styled-components';
import ReactTableNew from '../react-table-user/react-table-user';
import ReactTableItems from '../react-table-items/react-table-items';
import { users } from '../../assets/data/users_ids.json';
import { items } from '../../assets/data/item.json';

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

const Maintab = () => {
  const [usuarios, setUsuarios] = useState(users);
  const [peliculas, setPeliculas] = useState(items);
  console.log('usuarios', usuarios);
  console.log('peliculas', peliculas);

  const columnas = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Age',
      accessor: 'Age',
    },
    {
      Header: 'Zip',
      accessor: 'Zip',
    },
  ];

  const columnasItems = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Titulo',
      accessor: 'title',
    },
    {
      Header: 'Director',
      accessor: 'director',
    },
  ];

  return (
    <div className="tabset">
      <input type="radio" name="tabset" id="tab1" aria-controls="result" defaultChecked />
      <label htmlFor="tab1">Users</label>

      <input type="radio" name="tabset" id="tab2" aria-controls="grafica" />
      <label htmlFor="tab2">Items</label>

      <div className="tab-panels">
        <section id="result" className="tab-panel">
          {/* <h2>Users</h2> */}
          <Styles>
            <ReactTableNew
              columns={columnas}
              data={usuarios}
              // title={tituloTabla}
              // updateTableData={updateData}
              // tituloTable={tableName}
            />
          </Styles>
        </section>
        <section id="grafica" className="tab-panel">
          {/* <h2>Items</h2> */}
          <Styles>
            <ReactTableItems
              columns={columnasItems}
              data={items}
              // title={tituloTabla}
              // updateTableData={updateData}
              // tituloTable={tableName}
            />
          </Styles>
        </section>
      </div>
    </div>
  );
};

export default Maintab;