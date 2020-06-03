import React from 'react';
import './card.css';
import Boton from '../boton/boton';
import { useHistory } from 'react-router-dom';

const Card = (props) => {
  let history = useHistory();
  const handleClick = (e) => {
    history.push('/home');
    const reader = new FileReader();
    reader.onload = function () {
      props.updateTableData(reader.result);
    };
    props.tituloTable(e.target.files[0].name);
    reader.readAsText(e.target.files[0]);
  };
  return (
    <div className="card">
      <h1>No hay datos...</h1>
      <p>
        <strong>Por favor</strong> presione el boton en la parte superior derecha en el menu de la
        cabecera, para seleccionar y cargar un fichero en formato json.
      </p>
      <Boton subirFichero={handleClick} />
    </div>
  );
};

export default Card;
