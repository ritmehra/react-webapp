import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="/">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">LIVE</p>
          </NavItem>
          <NavItem eventKey={2} href="/">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">MESSAGES</p>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
