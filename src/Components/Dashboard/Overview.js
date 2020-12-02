import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import todaysDate from '../Gifted-Date/Gifted-Date'
import { faHandPointRight, faFolder, faChartLine, faChartPie, faChartArea, faChartBar, faPeopleCarry, faTasks, faMoneyBillWave, faPen, faUser, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import Post from './Post';
export default class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)


    }
    render() {

        return (
            <React.Fragment>
                <div style={{ paddingTop: 80 }}>

                    {
                        this.state.page == 1 ?
                            <div className="row" onClick={() => this.props.close()}>
                                <div className="col-md-6 mb-4">
                                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 4.7, border: '1px solid rgba(0,0,0,0.1)', padding: 20 }} className="create col-md-8">
                                        <div style={{ textAlign: 'center' }}>
                                            <FontAwesomeIcon style={{ width: 40, height: 40, color: 'rgba(0,0,0,0.3)' }} icon={faPenAlt} />
                                            <h1>{this.props.user.noOfPost}</h1>
                                            <p>posts</p>
                                        </div>

                                        <div onClick={() => {
                                            this.setState({ page: 2 })
                                        }} className="btn btn-success btn-md">
                                            Create a new post
                                            </div>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 4.7, border: '1px solid rgba(0,0,0,0.1)', padding: 0 }} className="create col-md-10">
                                        <div className="bg-success" style={{ textAlign: 'center', paddingTop: 20 }}>
                                            <FontAwesomeIcon style={{ width: 60, height: 60, color: 'white' }} icon={faUser} />
                                            <div><b className="text-light">{this.props.user.username}</b></div>

                                        </div>

                                        <div style={{ padding: 20 }}>
                                            <div>
                                                {this.props.user.name}
                                            </div>

                                            <hr />
                                            <div> {this.props.user.email}</div>
                                            <hr />
                                            <div>
                                                {this.props.user.phone}
                                            </div>


                                        </div>

                                        <div style={{ padding: 30, width: '100%' }}>
                                            <div style={{ width: '100%' }} onClick={() => this.props.change('schedule')} className="btn  btn-success btn-md">
                                                View your posts
                                        </div></div>


                                    </div>
                                </div>

                            </div>
                            :
                            <Post reload={() => this.props.reload()} change={this.props.change} user={this.props.user} back={() => this.setState({ page: 1 })} />

                    }


                </div>
            </React.Fragment>
        )
    }
}
