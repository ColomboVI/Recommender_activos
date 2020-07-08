import React, { useState, useContext } from 'react';
import './hybrid.css';
import styled from 'styled-components';
import ReactTableUserH from '../react-table-user_4h/react-table-user_4h';
import ReactTableItemsH from '../react-table-items_4h/react-table-items_4h';
import { users } from '../../assets/data/users_ids.json';
import { items } from '../../assets/data/item.json';
import { DataContext } from '../../contexts/DataContext';

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

const Hybrid = () => {
  const { userSelected, mainArray } = useContext(DataContext);
  const [usuarios] = useState(users);
  const [peliculas] = useState(items);

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
    // {
    //   Header: 'ID',
    //   accessor: 'id',
    // },
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
    <>
      {userSelected ? (
        <Styles>
          <h4>Usuarios seleccionados</h4>
          {mainArray[0].id.map((e, i) => {
            if (mainArray[0].id.length === i + 1) {
              return (
                <span key={i}>
                  <em>
                    <strong>{e}</strong>
                  </em>
                </span>
              );
            } else {
              return (
                <span key={i}>
                  <em>
                    <strong>{e} - </strong>
                  </em>
                </span>
              );
            }
          })}
          <h3>Ahora seleccione una pelicula</h3>
          <ReactTableItemsH columns={columnasItems} data={peliculas} />
        </Styles>
      ) : (
        <Styles>
          <h3>Seleccione uno o mas usuarios</h3>
          <ReactTableUserH columns={columnas} data={usuarios} />
        </Styles>
      )}
    </>
  );
};

export default Hybrid;
