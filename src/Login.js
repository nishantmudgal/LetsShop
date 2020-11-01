import React, { Component } from 'react';
import './login.css';
import { auth, db } from './config/Firebase';
import logo from './res/logo.png';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            errorMsg : ''
        }
    }
    
    showError = () => {
        document.getElementById('error-alert').hidden = '';
        setTimeout( () => {
            document.getElementById('error-alert').hidden = 'hidden';
        }, 5000);
    }

    login = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u);
        }).catch((error) => {
            this.setState({
                errorMsg : error.message
            });
            this.showError();
            console.log(error);
        });
    }
    
    signup = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u)
            db.collection('users').doc(u.user.uid).set({
                cart : []
            }).then( snapshot => {})
            .catch( error => console.log(error));
        }).catch((error) => {
            this.setState({
                errorMsg : error.message
            });
            this.showError();
            console.log(error);
        });

    }
    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        return (
            <div className = 'col-md-12 Login'>
                <div id="error-alert" className="alert alert-danger col-md-12 col-xs-12 col-sm-12" hidden="hidden">
                    <strong>Error! </strong>{this.state.errorMsg}
                </div>
                <div className = "Logo">
                    <img className = 'col-md-12 col-xs-12 col-sm-12' src = {logo} alt = 'Logo'/>
                </div>
                <div>
                <form>
                    <div className = 'form-group'>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">(Email ID format "username@xyz.com")</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        <small id="emailHelp" class="form-text text-muted">(Min. password length is 6 lettters)</small>
                    </div>
                        <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                        <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default Login;