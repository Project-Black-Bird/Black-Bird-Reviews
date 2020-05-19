import React, { Component } from 'react';
import "./Profile.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import { logoutUser } from "../../redux/reducer";
import { withRouter } from "react-router-dom";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            editView: false
        }
    }

    componentDidMount(){
        if(!this.props.user.email){
            this.props.history.push('/')
        }
    }

    handleInput = (val) => {
        this.setState({email: val})
    }

    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }

    handleLogout = () => {
        axios.get('auth/logout')
        .then(() => {
            this.props.logoutUser();
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    updateUseremail = () => {
        const {email} = this.state;
        axios.put(`/api/`)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Profile
