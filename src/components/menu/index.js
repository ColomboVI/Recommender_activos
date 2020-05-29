import React from 'react';
import './menu.css';

export class LucaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOption: void 0,
    };
  }

  render() {
    const menuOptions = this.props.menuOptions.map((element, idx) => (
      <li
        key={idx}
        onClick={() => {
          this.props.selectedMenuOption(idx);
          this.setState({ selectOption: idx });
        }}
        className={
          this.state.selectOption === idx ? 'luca--navmenu__active' : 'luca--navmenu__disabled'
        }
      >
        {element}
      </li>
    ));

    return (
      <div className="luca--navmenu">
        <div id="luca--logo" className="icon-logo_LUCA"></div>
        <div className="luca--navemenu--separator"></div>
        <nav>
          <ul className="luca--navmenu">{menuOptions}</ul>
        </nav>
      </div>
    );
  }
}
