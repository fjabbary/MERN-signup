import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Item from './Item'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {

            fullName: '',
            username: '',
            email: '',
            password: '',
            isSubmitted: '',
            users: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/app/grab')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
    }


    // componentDidUpdate(prevProps, prevState) {

    //     axios.get('http://localhost:4000/app/grab')
    //         .then(response => {
    //             this.setState({
    //                 users: response.data
    //             })
    //         })
    // }


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
                fullName: '',
                username: '',
                email: '',
                password: '',
                isSubmitted: 'Form submitted'
            })

            setTimeout(() => {

                this.setState({
                    isSubmitted: ''
                })
            }, 2000)
        })

        window.location.reload();

    }

    render() {
        const { fullName, username, email, password, users } = this.state
        const userJSX = users.map(user => <Item user={user} key={user._id} />)


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

                        <button className="btn btn-warning btn-block" disabled={!fullName || !username || !email || !password}>Submit</button>
                    </form>


                    <ul className="list-group mt-5">
                        {userJSX}
                    </ul>
                </div>
            </div>
        )
    }
}
