import React, { Component } from 'react'
import axios from 'axios'

export default class Items extends Component {

    handleDelete = (userId) => {
        axios.delete('http://localhost:4000/app/delete', { data: { id: userId } })

        window.location.reload();
    }

    render() {
        return (
            <div>
                <li className="list-group-item">{this.props.user.fullName} <i className="float-right" onClick={() => this.handleDelete(this.props.user._id)}>X</i></li>
            </div>
        )
    }
}
