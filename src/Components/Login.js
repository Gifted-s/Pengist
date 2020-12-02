import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from '@sweetalert/with-react'

import { Link } from 'react-router-dom';
import {  faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            username: '',
            phone: '',
            password: '',
            confirm: '',
            loginEmail: '',
            loginPassword: '',
            email: '',
            retries: 0,
            isLoading: false,
            page: 1

        }
    }
    componentDidMount() {

    }
    async makeSignupReq() {
        this.setState({ retries: this.state.retries + 1 })
        const { name,
            password,
            email,
            phone,
            username
        }
            = this.state

        const signupBody = await fetch("https://userapipengist.herokuapp.com/signup", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email,
                phone,
                username,
                retries: this.state.retries
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (signupBody.error) {

            swal('', signupBody.error, 'error')
        }
        else if (signupBody === "Failed to fetch") {

            return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
        }
        else {
            this.setState({ name: '', password: '', email: '', phoneNumber: '', username: '' })
            swal(signupBody.message, 'You can login after doing this', 'success')
            this.setState({ signin: true })
        }

    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (!this.state.name) {
            return swal('Please enter your name', '', 'error')
        }
        if (!this.state.email) {
            return swal('Please enter your email', '', 'error')
        }
        if (!this.state.password) {
            return swal('Oops', 'Enter password', 'error')
        }
        if (!this.state.username) {
            return swal('Oops', 'Enter username', 'error')
        }
        if (!this.state.phone) {
            return swal('Oops', 'Enter phone number', 'error')
        }
        if (this.state.password !== this.state.confirm) {
            return swal('Oops', 'Password does not match', 'error')
        }
        swal(<Spinner />)
        console.log(this.state)
        await this.makeSignupReq()
    }



    async makeSigninReq() {
        if (!this.state.loginEmail) {
            return swal('Please enter your email', '', 'error')
        }
        if (!this.state.loginPassword) {
            return swal('Oops', 'Enter password', 'error')
        }

        const {
            loginEmail,
            loginPassword,
        }
            = this.state
        const signinBody = await fetch("https://userapipengist.herokuapp.com/signin", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)

        console.log(signinBody)
        if (signinBody.error) {
            return swal('', signinBody.error, 'error')
        }
        else if (signinBody === "Failed to fetch") {

            return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
        }
        else {
            localStorage.setItem('user', JSON.stringify({ signinBody }))

            this.props.history.push({ pathname: '/dashboard', state: { user: signinBody } })

        }

        // console.log(signupBody)
    }



    sendMail() {
        swal({
            text: 'Enter your email address',
            content: "input",
            button: {
                text: "Submit",
                closeModal: true,
            },
        })
            .then(async (e) => {

                if (e) {
                    if (!e.includes('@gmail.com')) {
                        return swal('', 'Email invalid', 'error')
                    }
                    swal('loading, please wait...', 'if you dont get a response has soon as possible, click OK and retry', 'info')
                     const result = await fetch('https://userapipengist.herokuapp.com/forgot', {
                        // const result = await fetch('http://localhost:4000/forgot', {
                        method: "Post",
                        headers: {
                            "Content-type": 'application/json'
                        },
                        body: JSON.stringify({
                           email: e
                        })
                    })
                        .then(res => res.json()).then(resJson => resJson).catch(err => err)
                    if (result === "Failed to fetch") {
                        // this.setState({showSpinner1:false})
                        return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
                    }
                    if (result.error) {
                        swal('', result.error, 'error')
                    }
                    if (result.success) {
                        swal('', 'A message has been sent to your email. Please kindly check it out', 'success')
                    }
                    if (result.errno) {
                        swal('', 'An error occured while we are sending an email to you, please checkout your network connection and try again', 'error')
                    }


                }



            })



    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="left col-md-6">
                        <h2>Pengist</h2>
                        <h5>...pen down your mind</h5>

                    </div>
                    <div className="col-md-6 right">

                        <a style={{ fontSize: 20 }} className="navbar-brand " href="/">Pengist</a>

                        {
                            this.state.page === 1 ?
                                <React.Fragment>
                                    <h4 className="login-text">Login to your Pengist account</h4>
                                    <p className="my-1 text-secondary">Don't have an accout? <Link onClick={() => this.setState({ page: 2 })}>Signup</Link></p>
                                    <form onSubmit={this.handleSubmit} className="login_form">

                                        <div>
                                            <label className="label_login">Email</label><br />
                                            <input onChange={e => this.setState({ loginEmail: e.target.value })} type="email" placeholder="Enter your email " className="input-box" />
                                        </div>

                                        <div>
                                            <label className="label_login">Password</label><br />
                                            <input onChange={e => this.setState({ loginPassword: e.target.value })} type="password" placeholder="Enter password" className="input-box" />
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => this.makeSigninReq()} className="btn btn_thick mt-4 lt_">
                                                Login <FontAwesomeIcon icon={faArrowCircleRight} style={{ marginLeft: 4 }} />
                                            </button>
                                        </div>

                                        <span style={{ float: 'right' }} onClick={() => this.sendMail()} className="text-primary">forgot password?</span>


                                    </form>
                                </React.Fragment>
                                :
                                <>
                                    <h4 className="login-text">Signup to your Pengist account</h4>
                                    <p className="my-1 text-secondary">Already have an accout? <Link onClick={() => this.setState({ page: 1 })}>Login</Link></p>
                                    <form onSubmit={this.handleSubmit} className="login_form">
                                        <div>
                                            <label className="label_login">Name</label><br />
                                            <input onChange={e => this.setState({ name: e.target.value })} type="text" placeholder="Enter your full name" className="input-box" />
                                        </div>
                                        <div>
                                            <label className="label_login">Username</label><br />
                                            <input onChange={e => this.setState({ username: e.target.value })} type="text" placeholder="Enter your username" className="input-box" />
                                        </div>
                                        <div>
                                            <label className="label_login">Phone number</label><br />
                                            <input onChange={e => this.setState({ phone: e.target.value })} type="text" placeholder="Enter your phone number" className="input-box" />
                                        </div>
                                        <div>
                                            <label className="label_login">Email</label><br />
                                            <input onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Enter your email" className="input-box" />
                                        </div>

                                        <div>
                                            <label className="label_login">Password</label><br />
                                            <input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Enter your password" className="input-box" />
                                        </div>
                                        <div>
                                            <label className="label_login">Confirm Password</label><br />
                                            <input onChange={e => this.setState({ confirm: e.target.value })} type="password" placeholder="Enter your password" className="input-box" />
                                        </div>
                                        <div>
                                            <button className="btn btn_thick mt-4 lt_">
                                                Sign up <FontAwesomeIcon icon={faArrowCircleRight} style={{ marginLeft: 4 }} />
                                            </button>
                                        </div>



                                    </form>
                                </>
                        }
                    </div>
                </div>

            </div>
        )
    }
}
