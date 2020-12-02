import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faWindowClose, faLink, faClock, faListAlt, faThermometer, faPen, faTasks, faKiwiBird, faBook, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';

class Sidebar extends Component {
    render() {
        const { presentPage: present } = this.props
        return (
            <div className="col-md-2 col-sm-3 sidebar">
                {window.innerWidth <= 768 ?
                    <div onClick={() => this.props.toggle()} className="close_btn" style={{ float: 'right' }}>
                        <FontAwesomeIcon style={{ width: 25, height: 25, color: 'green' }} icon={faWindowClose} />
                    </div> : null}

                <a style={{ fontSize: 20 }} className="navbar-brand " href="/">Pengist</a>
                <div className="cd">
                    <h5>{this.props.user.name}</h5>
                    <p>{this.props.user.email}</p>
                </div>
                <div
                    onClick={() => {
                        this.props.navigateTo('home')
                        this.props.toggle()

                    }}

                    className={present === "home" ? ` cr  sidebar_item` : 'sidebar_item'}>

                    <span > <FontAwesomeIcon icon={faClock} className={present === "home" ? `cr cr_icon` : "sidebar_text"} /></span>  <span className="sidebar_text">Post Article</span>

                </div>

                <div onClick={() => {
                    this.props.navigateTo('schedule')
                    this.props.toggle()

                }} className={present === "schedule" ? ` cr  sidebar_item` : 'sidebar_item'}>

                    <span><FontAwesomeIcon icon={faTasks} className={present === "schedule" ? `cr cr_icon` : "sidebar_text"} /></span> <span className="sidebar_text" >View articles by you</span>

                </div>

                {
                    this.props.user.email === "admin@gmail.com" &&
                    <div
                        onClick={() => {
                            this.props.navigateTo('recent')

                            this.props.toggle()
                        }}

                        className={present === "recent" ? ` cr  sidebar_item` : 'sidebar_item'}>

                        <span><FontAwesomeIcon className={present === "recent" ? `cr cr_icon` : "sidebar_text"} icon={faBook} /></span> <span className="sidebar_text">View recent posts </span>

                    </div>
                }


                <div onClick={() => {
                    this.props.navigateTo('links')
                    this.props.toggle()

                }} className={present === "links" ? ` cr  sidebar_item` : 'sidebar_item'}>

                    <span> <FontAwesomeIcon className={present === "links" ? `cr cr_icon` : "sidebar_text"} icon={faKiwiBird} /></span> <span className="sidebar_text">Tweeter handle</span>

                </div>

                {
                    this.props.user.email === "admin@gmail.com" &&
                    <div
                        onClick={() => {
                            this.props.navigateTo('edit')
                            this.props.toggle()

                        }}

                        className={present === "edit" ? ` cr  sidebar_item` : 'sidebar_item'}>

                        <span><FontAwesomeIcon className={present === "edit" ? `cr cr_icon` : "sidebar_text"} icon={faPen} /></span> <span className="sidebar_text" >Todays note</span>

                    </div>


                }
                <div
                    onClick={() => {
                        swal({
                            title: "Are you sure?",
                            text: "",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    localStorage.clear('user')
                                    this.props.history.push('/')
                                } else {

                                }
                            })
                    }}

                    className={'sidebar_item'}>

                    <span><FontAwesomeIcon className={"sidebar_text"} icon={faLongArrowAltLeft} /></span> <span className="sidebar_text" >logout</span>

                </div>

            </div>
        )
    }
}

export default withRouter(Sidebar)