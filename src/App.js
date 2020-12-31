import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {

            fullName: '',
            username: '',
            email: '',
            password: '',
            isSubmitted: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        const { fullName, username, email, password } = this.state
        e.preventDefault();

        const newUser = {
            fullName,
            username,
            email,
            password
        }

        axios.post('http://localhost:4000/app/signup', newUser).then(response => {
            this.setState({
                isSubmitted: 'Form submitted'
            })
        })
    }

    render() {
        const { fullName, username, email, password } = this.state

        return (
            <div>
                <div className="container bg-info p-5">
                    <h3 className="bg-success">{this.state.isSubmitted}</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="FullName..." name="fullName" value={fullName} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username..." name="username" value={username} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email..." name="email" value={email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password..." name="password" value={password} onChange={this.handleChange} />
                        </div>

                        <button className="btn btn-warning btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
