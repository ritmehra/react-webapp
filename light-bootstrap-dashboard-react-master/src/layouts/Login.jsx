import React, { Component } from "react";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Grid, Row, Col } from "react-bootstrap";

import { authenticationService } from 'services/authentication.service.js';

import { style } from "variables/Variables.jsx";

class LoginPage extends Component {
    constructor(props) {
        super(props);
		
		this.submitCredentails = this.submitCredentails.bind(this)
        this.handleChange = this.handleChange.bind(this);

        this.state = {
			username:'',
			pass:''
			
		}	
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
	
	componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        this.props.history.push('/login');
    }
	
	handleChange(event) {
		if(event.target.id=="userId")
           this.setState({username: event.target.value});
        else
           this.setState({pass: event.target.value});
    
   }
   submitCredentails(event){
	   
	   authenticationService.login(this.state.username, this.state.pass)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    console.log("errror:"+error);                                }
                            );
	   
   }
    render() {
        return (
            <div style={{paddingLeft:'100px',backgroundColor:'#eee'}}>
                
                <h2>Login</h2>
				
				
				<div className="content">
                 <Grid fluid>
		           <Row>
		            <FormInputs
                      ncols={["col-md-3"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          id: "userId",
                          value: this.state.username,
                          onChange : this.handleChange
                        }
						]}
                    />
                    
                    
                   </Row>
				   <Row>
		            <FormInputs
                      ncols={["col-md-3"]}
                      properties={[
                        {
                          label: "Password",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Password",
                          id: "passId",
                          value: this.state.pass,
                          onChange : this.handleChange
                        }
						]}
                    />
                    
                    
                   </Row>
				   <Row>
		            <FormInputs
                      ncols={["col-md-3"]}
                      properties={[
                        {
                          label: "",
                          type: "button",
                          bsClass: "form-control",
                          placeholder: "Submit",
                          defaultValue: "Submit",
                          onClick:this.submitCredentails
                        }
						]}
                    />
                    
                    
                   </Row>
		         </Grid>
               </div>
			</div>
        )
    }
}

export default LoginPage;