import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button} from 'react-bootstrap';

const Header = () => {
  return (
    <div className="header">
      <h1>File Upload And Download</h1>
      <nav>
        <NavLink activeClassName="active" to="/" exact={true}>
          <Button style={{
            backgroundColor: "#688f94",
            borderColor: "borderHighliter",
            borderRadius: 20,
            width: 250,
            height: 33,
            }}
          >
            Upload Files
          </Button>
        </NavLink>

        <NavLink activeClassName="active" to="/list">
          <Button style={{
            backgroundColor: "#688f94",
            borderColor: "borderHighliter",
            borderRadius: 20,
            width: 250,
            height:33,
          }}>
            Files List
          </Button>
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
