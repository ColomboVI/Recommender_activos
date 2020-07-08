import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { useHistory } from 'react-router-dom';
import Boton from '../boton/boton';

const Navbar = (props) => {
  const { loaded, resetTable, setLoaded } = useContext(DataContext);
  // console.log('useContext', data);
  let history = useHistory();
  const handleClick = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      props.updateTableData(reader.result);
    };
    if (e.target.files[0] === undefined) {
      return;
    } else {
      props.tituloTable(e.target.files[0].name);
      reader.readAsText(e.target.files[0]);
      history.push('/');
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul className="navmenu">
            <li>
              <Link to="/home" id="luca--logo" className="icon-logo_LUCA"></Link>
            </li>
            {/* <li>
              <Boton subirFichero={handleClick} nameButton={'Cargar datos'} />
            </li> */}
            {/* <div className="marginInput">
              <input type="file" className="custom-file-input" onChange={handleClick} />
            </div> */}
            {/* <NavLink to="/" activeClassName="active" exact>
              Input data
            </NavLink> */}
            <NavLink to="/importar-datos" activeClassName="active">
              Importar datos
            </NavLink>
            <NavLink to="/hybrid" activeClassName="active">
              Hybrid
            </NavLink>
            <NavLink to="/main-tab" activeClassName="active">
              Input data
            </NavLink>
            <NavLink to="/resultado" activeClassName="active">
              Output
            </NavLink>
            {/* <NavLink to="/tabla-result" activeClassName="active">
              Tabla nueva
            </NavLink> */}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
