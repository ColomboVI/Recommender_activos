import React from 'react';
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom';
import './navbar.css';

import Boton from '../boton/boton';

const Navbar = (props) => {
  const handleClick = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      props.updateTableData(reader.result);
    };
    props.tituloTable(e.target.files[0].name);
    console.log(e.target.files[0].name);
    reader.readAsText(e.target.files[0]);
  };

  return (
    <>
      <header>
        <nav>
          <ul className="navmenu">
            <li>
              <Link to="/home" id="luca--logo" className="icon-logo_LUCA"></Link>
            </li>
            <li>
              <Boton subirFichero={handleClick} />
            </li>
            {/* <div className="marginInput">
              <input type="file" className="custom-file-input" onChange={handleClick} />
            </div> */}
            <NavLink to="/" activeClassName="active" exact>
              Input data
            </NavLink>
            <NavLink to="/resultado" activeClassName="active">
              Output
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
