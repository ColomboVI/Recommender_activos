import React from 'react';
import './tabla.css';
import { alumnos } from '../../data.json';

export class LucaTabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos
    };
    this.crearHeaders = this.crearHeaders.bind(this);
    this.createCabeceras = this.createCabeceras.bind(this);
    console.log(alumnos);
  }

  crearHeaders() {
    let data = this.state.alumnos;
    const headers = new Set([]);
    data.forEach(elemento => {
      Object.keys(elemento).forEach(keyElement => headers.add(keyElement));
    });
    return headers;
    // let result = data.flatMap(Object.keys(data));
    // let result = Object.keys(Object.assign({}, ...data));
  }
  createCabeceras() {
    return this.crearHeaders().forEach(header => {
      console.log(header);
      return <li>{header}</li>;
    });
  }

  renderTableData() {
    return this.state.alumnos.map((student, index) => {
      const { id, name, age, email } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.alumnos[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  render() {
    return (
      <div>
        {this.createCabeceras()}
        <button onClick={this.createCabeceras}>click</button>
        {/* <h1 id="title">{this.props.titulo}</h1>
        <table id="tabla">
          <tbody>
            <tr className="densidadBaja-Header">{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <button onClick={this.createCabeceras}>click</button> */}
      </div>
    );
  }
}
