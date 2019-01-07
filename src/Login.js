import React, { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
      }
    render() {
        return (
            <div className="form">
                <form onSubmit={this.props.login}> 
                    <h3>Login</h3>
                    <hr></hr>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" autoFocus aria-describedby="emailHelp" placeholder="Enter email" value={this.props.email} onChange={this.props.handleEmailChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={this.props.password} onChange={this.props.handlePasswordChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <small className="form-text text-muted">Havent Registered? <u className="hover" onClick={() => this.props.changeCurrentTab()}>Sign Up Here.</u></small>
                    </form>
            </div>
            )
    }
  }

export default Login