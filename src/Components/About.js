import React, { Component } from 'react'
import Nav from './Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGifts, faUsers, faArrowRight, faPeopleCarry, faAirFreshener, faAddressCard, faLifeRing, faRing, faUserGraduate, faBaby, faArchway, faThumbsUp, faPenNib, faPenAlt, faPen } from '@fortawesome/free-solid-svg-icons'

export default class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className="container">
                    <div style={{ marginTop: 90 }} class="jumbotron">
                        <h1 style={{ fontWeight: 'bold' }} class="display-4">About Pengist  <FontAwesomeIcon icon={faPen} /></h1>
                        <p class="lead mt-4">Pengist is a community that seeks to harbor Writers and Readers in a conducive, engaging and entertaining atmosphere...
                            We also seek to encourage writers and Readers with various contests and awards which includes cash prices...</p>
                        <hr class="my-4" />

                        <a class="btn btn_thick btn-lg" href="/signup" role="button">Become a Pengister</a>
                    </div>

                    <div className="row">
                        <div style={{ padding: 20, width: '100%', marginTop: 50 }} className="">
                            <p className="text-center text-secondary">  © 2020, Pengist inc</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}
