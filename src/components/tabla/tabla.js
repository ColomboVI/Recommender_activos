import React from 'react';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CSVLink } from 'react-csv';
import './tabla.css';
// import { alumnos } from '../../data.json';

export class LucaTabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
      id: '',
      resultado: {},
      item: '',
      datosHybridos: [],
    };
    this.crearHeaders = this.crearHeaders.bind(this);
    this.createCabeceras = this.createCabeceras.bind(this);
    this.getData = this.getData.bind(this);
    console.log('objeto => ', props.objeto.tipo);
    if (props.objeto.tipo === 'user') {
      this.getData(props.objeto.id);
    } else if (props.objeto.tipo === 'item') {
      this.getItems(props.objeto.id);
    } else if (props.objeto.tipo === 'hybrid') {
      this.getHybridResult();
    } else if (props.objeto.tipo === 'content_base') {
      this.getContentBaseResult();
    } else if (props.objeto.tipo === 'group') {
      this.getGroupResult();
    }
  }

  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount');
  //   this.setState({ datosHybridos: this.props.hybridData });
  // }
  getGroupResult() {
    let superArray = [];
    let obj1 = {};
    let obj2 = {};
    obj1.id = this.props.hybridData;
    obj2.item_lim = 10;
    superArray.push(obj1);
    superArray.push(obj2);
    console.log('llega hasta aqui GRUPO', superArray);
    fetch('http://localhost:4000/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(superArray),
    }).then((res) => {
      res.json().then((datos) => {
        this.setState({ resultado: datos });
        let arr = [];

        for (let pelicula in this.state.resultado) {
          const result = {};
          result.name = this.state.resultado[pelicula];
          // result.rating = pelicula;
          arr.push(result);
        }

        this.crearHeaders(arr);
        this.setState({ alumnos: arr });
      });
    });
  }
  getContentBaseResult() {
    let data = this.props.hybridData;
    fetch('http://localhost:4000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((datos) => {
        this.setState({ resultado: datos });
        let arr = [];

        for (let pelicula in this.state.resultado) {
          const result = {};
          result.name = pelicula;
          result.rating = this.state.resultado[pelicula];

          arr.push(result);
        }

        this.crearHeaders(arr);
        this.setState({ alumnos: arr });
      });
    });
  }

  getHybridResult() {
    let data = this.props.hybridData;
    fetch('http://localhost:4000/hybrid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((datos) => {
        this.setState({ resultado: datos });

        const responseRecommendator = this.state.resultado[0].items.map((ele, i) => {
          return {
            name: ele,
            rating: this.state.resultado[0].ratings[i],
          };
        });

        this.crearHeaders(responseRecommendator);
        this.setState({ alumnos: responseRecommendator });
      });
    });
  }
  getData(id) {
    let array = [];
    let obj = {};
    obj.id = id;
    array.push(obj);
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array),
    }).then((res) => {
      res.json().then((data) => {
        this.setState({ resultado: data });
        const responseRecommendator = this.state.resultado[0].items.map((element, idx) => {
          return {
            name: element,
            rating: this.state.resultado[0].ratings[idx],
          };
        });
        this.crearHeaders(responseRecommendator);
        this.setState({ alumnos: responseRecommendator });
      });
    });
  }

  getItems(id) {
    let array = [];
    let obj1 = {};
    let obj2 = {};
    obj1.id = [id];
    array.push(obj1);
    obj2.n_user = 10;
    array.push(obj2);

    fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array),
    }).then((res) => {
      res.json().then((data) => {
        this.setState({ resultado: data });

        const responseRecommendator = this.state.resultado[0].users.map((element, idx) => {
          return {
            name: element,
            rating: this.state.resultado[0].ratings[idx],
          };
        });
        this.crearHeaders(responseRecommendator);
        this.setState({ alumnos: responseRecommendator });
      });
    });
  }

  crearHeaders(data) {
    // let data = this.state.alumnos;
    const headers = new Set([]);
    data.forEach((elemento) => {
      Object.keys(elemento).forEach((keyElement) => headers.add(keyElement));
    });
    return headers;
    // let result = data.flatMap(Object.keys(data));
    // let result = Object.keys(Object.assign({}, ...data));
  }
  createCabeceras() {
    return this.crearHeaders().forEach((header) => {
      // console.log(header);
      return <li>{header}</li>;
    });
  }

  renderTableData() {
    return this.state.alumnos.map((student, index) => {
      const { name, rating } = student; //destructuring
      return (
        <tr key={index}>
          {/* <td>{index}</td> */}
          <td>{name}</td>
          {/* <td>{age}</td> */}
          <td>{rating}</td>
        </tr>
      );
    });
  }
  renderTableData2() {
    return this.props.datos.map((datos, index) => {
      const { titulo, genero } = datos; //destructuring
      return (
        <tr key={index}>
          <td>{titulo}</td>
          <td>{genero}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    if (this.state.alumnos.length > 0) {
      let header = Object.keys(this.state.alumnos[0]);
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    } else {
      return;
    }
  }
  renderTableHeader2() {
    console.log('this.propsdatos', this.props.datos[0]);
    const cabeza = this.props.datos[0];
    let header = Object.keys(cabeza);
    console.log('header', header);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  renderTitulo = () => {
    if (this.state.item === 'user') {
      return <h1>Usuario</h1>;
    } else if (this.state.item === 'item') {
      return <h1>Item</h1>;
    }
  };
  render() {
    return (
      <div>
        {this.renderTitulo()}
        {this.state.item}
        {/* {this.createCabeceras()} */}
        {/* <button onClick={this.createCabeceras}>click</button> */}
        <h1 id="title">{this.props.titulo}</h1>
        <table id="tabla">
          <tbody>
            <tr className="densidadBaja-Header">{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <br />
        {/* <ReactHTMLTableToExcel
          id="tabla-button"
          className="download-table-xls-button"
          table="tabla"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        /> */}
        <CSVLink data={this.state.alumnos} className="download-table-xls-button">
          Descarga CSV
        </CSVLink>
      </div>
    );
  }
}
