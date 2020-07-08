import React, { createContext, useState } from 'react';
export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [result, setResult] = useState([]);
  const [objeto, setObjeto] = useState({});
  const [id, setId] = useState('');
  const [tablaItems, setTablaItems] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [columns, setColumnData] = useState([]);
  const [mainArray, setMainArray] = useState([]);
  const [array, setArray] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userSelected, setUserSelected] = React.useState(false);
  const [tituloTabla, setTituloTabla] = useState('Lista vacia');

  const updateData = (newData) => {
    const dataForColumn = JSON.parse(newData)[0];
    setMainData(JSON.parse(newData));

    let colu = [];
    for (let key in dataForColumn) {
      colu.push({
        Header: key.toUpperCase(),
        accessor: key,
      });
    }
    setColumnData(colu);
    setLoaded(true);
  };

  const tableName = (nombre) => {
    setTituloTabla(nombre.split('.')[0].toUpperCase());
  };

  const resetData = () => {
    const reader = new FileReader();
    reader.onload = function () {
      setMainData(reader.result);
    };

    reader.readAsText('./../coches.json');
    const data = [{}];
    const dataForColumn = data[0];
    setTituloTabla('Lista vacia');

    let colu = [];
    for (let key in dataForColumn) {
      colu.push({
        Header: key.toUpperCase(),
        accessor: key,
      });
    }
    setColumnData(colu);
    setLoaded(true);
  };

  return (
    <DataContext.Provider
      value={{
        mainData,
        columns,
        loaded,
        tituloTabla,
        updateData,
        tableName,
        resetData,
        setTituloTabla,
        result,
        setResult,
        id,
        setId,
        tablaItems,
        setTablaItems,
        objeto,
        setObjeto,
        mainArray,
        setMainArray,
        userSelected,
        setUserSelected,
        array,
        setArray,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
