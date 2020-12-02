import React from 'react';
import swal from 'sweetalert'
import { Link, withRouter } from 'react-router-dom'

import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.button = React.createRef()
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    const checkLogin = JSON.parse(localStorage.getItem('user'))

    if (checkLogin) {
      this.setState({ isLoggedIn: true })
    }
  }
  render() {

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-light  bg-light">
          <a style={{ fontSize: 20 }} className="navbar-brand " href="/">Pengist</a>
          <button ref={this.button} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon"></span> */}
            <span className="bol"></span>
            <span className="bol"></span>
            <span className="bol"></span>
          </button>

          <div className="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
            <ul className=" navbar-nav justify-content-end ">
              <li className="nav-item active">
                <Link onClick={() => this.button.current.click()} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link onClick={() => this.button.current.click()} className="nav-link" to="/getstarted">Get started <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">

                <Link onClick={() => this.button.current.click()} className="nav-link" to="/about">About pengist<span className="sr-only">(current)</span></Link>

              </li>
              <li className="nav-item active">

                <Link onClick={() => this.button.current.click()} className="nav-link" to="/tweeter">The Streets of Twitter<span className="sr-only">(current)</span></Link>

              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/contact">Contact us <span className="sr-only">(current)</span></a>
              </li>
              {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </li> */}

            </ul>
            <form className="form-inline my-2 my-lg-0">
              {/* <span
                onClick={


                  ()=> {this.button.current.click()
                    
                   this.state.isLoggedIn? (()=>{
                     localStorage.clear('user')
                     swal('Logged Out', 'You can login again', 'success')
                     this.setState({isLoggedIn:false})
                   })(): this.props.history.push('/signup')
                  }
                }
                style={{fontWeight:"bold"}} className="btn-custom  btn btn-outline-primary  my-2 my-sm-0" type="submit">{this.state.isLoggedIn?'Logout': 'Signup or Login'}
                <FontAwesomeIcon className="all2" style={{height:14, width:14,
                                          color:'#3297d3',
                                          marginLeft:12,
                                          }} icon={faArrowRight}/></span> */}

              {
                this.state.isLoggedIn ?
                  <button
                    onClick={
                      () => {
                        this.button.current.click()

                        this.props.history.push('/dashboard')
                      }
                    }
                    type="button" className="btn_thick mr-3 ">
                    <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} />
                  </button>

                  :
                  <button
                    onClick={


                      () => {
                        this.button.current.click()

                        this.props.history.push('/signup')
                      }
                    }
                    type="button" className="btn_thick mr-3 ">
                    Signup or Login
                </button>
              }

            </form>
          </div>
        </nav>


        <p style={{ marginTop: 80 }} className="category">
        <span>
            <Link to="/trending">
              Trending Stories
                     </Link>
          </span>
          <span>
            <a href={`/category/Poems`}>
              Poems
                     </a>
          </span>
          <span>
            <a href={`/category/Series`}>
              Series
                    </a>
          </span>
          <span>
            <Link to="/tweeter">
              Street of Tweeter
                     </Link>
          </span>
          <span>
            <a href={`/category/Short Stories`}>
              Short stories section
                   </a>
          </span>
          
          

          <span>
            <Link to="/updated">
              Updated stories for today
                      </Link>

          </span>
          <span>
            <Link to="/forums">
              Forums & Activities
                   </Link>
          </span>
          <span>
            <Link to="/forums">
              help section
                  </Link>
          </span>
          {/* <span>
               sgyusd
            </span>
            <span>
               sgyusd
            </span> */}
        </p>
      </React.Fragment>
    )
  }

}

export default withRouter(Nav)