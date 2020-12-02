import { faClock, faInbox, faLink, faPlaneDeparture, faPowerOff, faTablet, faTasks, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import Nav from './Nav'

export default class Starter extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div style={{ backgroundColor: "rgba(0,0,0,0.04)", minHeight: '100vh', paddingTop: 20 }} className="container-fluid">
                    <h3 className="mb-3">How to get started as a pengister</h3>
                    <div className="col-md-7">
                        <ul class="list-group">
                            <li class="list-group-item d-flex  align-items-center">
                                <h1>1<FontAwesomeIcon style={{ marginLeft: 13, color: 'rgba(0,0,0,0.6)' }} icon={faUserCheck} /> </h1>  <br />
                                <div className="ml-3">
                                    Create an account with us using your email account
                              </div>
                                <span className="ml-4" style={{ cursor: 'pointer' }} onClick={() => {
                                    this.props.history.push('/signup')
                                }} className="ml-3 text-primary">Create account</span>
                            </li>
                            <li class="list-group-item d-flex  align-items-center">
                                <h1>2 <FontAwesomeIcon style={{ marginLeft: 9, color: 'rgba(0,0,0,0.6)' }} icon={faClock} /></h1>   <div className="ml-3">Navigate to your Dashboard page and click on the "Create a new post" Button</div>

                            </li>
                            <li class="list-group-item d-flex  align-items-center">
                                <h1>3 <FontAwesomeIcon style={{ marginLeft: 12, color: 'rgba(0,0,0,0.6)' }} icon={faTasks} /></h1>  <div className="ml-3">Fill the forms including the content of your post</div>
                            </li>
                            <li class="list-group-item d-flex align-items-center">
                                <h1>4  <FontAwesomeIcon style={{ marginLeft: 12, color: 'rgba(0,0,0,0.6)' }} icon={faPowerOff} /> </h1> <div className="ml-3">Click submit and that's it!!!. Your post would automatically appear at the featured post for the day.</div>

                            </li>
                            <li class="list-group-item d-flex align-items-center">
                                <h1>5 <FontAwesomeIcon style={{ marginLeft: 12, color: 'rgba(0,0,0,0.6)' }} icon={faLink} />  </h1> <div className="ml-3">We empower users  to share public posts, just go to the tweeter handler at your dashboard and start posting interesting and impactful stuffs</div>

                            </li>


                        </ul>
                        <div style={{ backgroundColor: 'white', padding: 20, marginTop: 50 }}>
                            <p>Please note that if you are posting a series, an id would be generated for you which you will need while posting other episodes for that series</p>
                            <p>Have a question? feel free to <span onClick={() => {
                                this.props.history.push('/contact')
                            }} className="btn btn-success">Contact us</span></p>

                    or
                    <p>Visit our forums page to raise a topic, question or suggestion</p>
                    <div onClick={() => {
                                this.props.history.push('/forums')
                            }} className="btn btn-outline-success mt-1 ">Checkout forum</div>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        )
    }
}
