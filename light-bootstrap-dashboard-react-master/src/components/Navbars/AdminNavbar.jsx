import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import {history} from 'services/history.js';
import { authenticationService } from 'services/authentication.service.js';

const navbarnav = {
  margin: '20px',
  float: 'right'
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarExists: false
    };
  }
  logout() {
	 authenticationService.logout();
     history.push('/login');
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">CMAD Management Station</a>
			
          </Navbar.Brand>
		  
		</Navbar.Header>
		
		  {authenticationService.currentUserValue &&
                     <nav className="navbar navbar-expand navbar-dark bg-dark">  
                            <div style={navbarnav}>
                                <a href="#" onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
				     </nav>			
                       
                    }
                              
        
        
      </Navbar>
    );
  }
}

export default Header;
