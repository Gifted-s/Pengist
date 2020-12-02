import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGifts, faUsers, faArrowRight, faPeopleCarry, faAirFreshener, faAddressCard, faLifeRing, faRing, faUserGraduate, faBaby, faArchway, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

// import {  faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import Nav from './Nav';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollAnimation from 'react-animate-on-scroll'
import { Spinner } from 'reactstrap';
import ShowCase from './ShowCase';
// import {Spinner} from 'reactstrap';
export default class Home extends Component {
   constructor(props) {
      super(props)
      this.state = {
         cur: 0,
         sponsored: [],
         featured: [],
         trending: [],
         notes: []

      }
   }
   async componentDidMount() {
      await this.loadPosts()
      this.switchEvent = setInterval(() => {
         this.setState(prevState => {
            return { cur: prevState.cur === 4 ? 0 : prevState.cur + 1 }
         })
      }, 2000)
   }
   async componentWillUnmount() {
      clearInterval(this.switchEvent)
   }

   async loadPosts() {
      await fetch(`https://apiarticlepengist.herokuapp.com/get-notes`, {
         method: 'Get',
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then((response) => response.json())
         .then(resJson => this.setState({ notes: resJson.notes }))
         .catch(err => err.message)
      let sresp = await fetch(`https://apiarticlepengist.herokuapp.com/get-sponsored`, {
         method: 'Get',
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then((response) => response.json())
         .then(resJson => resJson)
         .catch(err => err.message)
      let tresp = await fetch(`https://apiarticlepengist.herokuapp.com/get-trending`, {
         method: 'Get',
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then((response) => response.json())
         .then(resJson => resJson)
         .catch(err => err.message)

      let fresp = await fetch(`https://apiarticlepengist.herokuapp.com/get-featured`, {
         method: 'Get',
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then((response) => response.json())
         .then(resJson => resJson)
         .catch(err => err.message)


      this.setState({ featured: !fresp.error ? fresp : [], sponsored: !sresp.error ? sresp : [], trending: !tresp.error ? tresp : [] })
   }
   render() {
      let events = ["Article", "Story", "Vision", 'Mind', "Inspiration"]

      return (

         <div>


            <div>
               <div onClick={() => {
                  this.props.history.push('/forums')
               }} className="feedback">
                  Feedback
                </div>



               <div id="top" className="container-fluid bg__">

                  <Nav navigate={this.props.history} />
                  <span className="note" style={{ fontSize: 12, color: 'rgba(0,0,0,0.8)', marginTop: -20, textAlign: 'center' }}>{this.state.notes[0] ? `${this.state.notes[this.state.notes.length - 1].note}` : null}</span>


                  <div className="row cont_">

                     {/* <div className="bender">
              
          </div> */}
                     <div className="col-md-6 col-sm-12 home_left_">
                        {/* <h2  className="p-features__headline">The easy way to accept Bitcoin for online payments</h2> */}
                        <h2 className="home_h1 ">Thank you for visiting Pengist Writers & Readers Crib</h2>

                        <h5>Make your relaxing worthwhile with our breath taking stories and catchy articles. <i style={{ fontSize: 14 }}>Stay with us...</i></h5>
                        <div className="">
                           <div className="p_1">
                              <br data-v-74a6fb34="" />
                        Express your <span className="bold normal-text">{events[this.state.cur]}</span> to the fullest

                        </div>
                        </div>


                        <div className="ch"><FontAwesomeIcon icon={faCheck} style={{ height: 15, width: 15, color: "#20c997", marginRight: 30 }} />Everything with Ease.</div>

                        <div className="btn_class"><button onClick={() => this.props.history.push('/signup')} type="button" className="btn_outline">
                           Become a Pengister
                </button> <button onClick={() => this.props.history.push('/getstarted')} type="button" style={{ backgroundColor: '#12bb88' }} className="btn_thick">
                              Learn more
                </button></div>
                     </div>
                     <div className="col-md-6 media_cont col-sm-12">
                        <h4 className="trend">Sponsored Post</h4>
                        <div className="col-md-8 col-sm-12 medias">
                           {
                              this.state.sponsored.length > 0 ?
                                 this.state.sponsored.map((article) => {
                                    return (
                                       <ShowCase article={article} />
                                    )
                                 })
                                 :
                                 <div>
                                    <small><Spinner size="sm" /></small>
                                 </div>

                           }


                        </div>
                     </div>
                  </div>

                  <div className="container-fluid">
                     <div className="row">
                        <div className="col-md-6 media_cont col-sm-12">
                           <h4 className="trend">Trending</h4>
                           <div className="col-md-8 col-sm-12 medias">
                              {
                                 this.state.trending.length > 0 ?
                                    this.state.trending.map((article) => {
                                       return (
                                          <ShowCase article={article} />
                                       )
                                    })
                                    :
                                    <div>
                                       <small><Spinner size="sm" /></small>
                                    </div>

                              }


                           </div>
                        </div>




                        <div className="col-md-6 media_cont col-sm-12">
                           <h4 className="trend mt-4">Featured</h4>
                           <div className="col-md-8 col-sm-12 medias">
                              {
                                 this.state.featured.length > 0 ?
                                    this.state.featured.map((article) => {
                                       return (
                                          <ShowCase article={article} />
                                       )
                                    })
                                    :
                                    <div>
                                       <small><Spinner size="sm" /></small>
                                    </div>

                              }


                           </div>
                        </div>

                     </div>

                  </div>

                  <div className="container-fluid">
                     <div className="row ll">
                        <ScrollAnimation animateIn="fadeIn" className="col-md-11 col-sm-1- left_back">
                           <div >
                              <h1>Pengist</h1>

                              <h4>your sure hub for intriguing stories</h4>
                           </div>
                        </ScrollAnimation>

                        <div className="col-md-4 feat">


                        </div>

                     </div>

                     <div className="row">
                        <div style={{ padding: 20, width: '100%', marginTop: 50 }} className="">
                           <p className="text-center text-secondary">  © 2020, Pengist inc</p>
                        </div>
                     </div>
                  </div>

               </div>



            </div >


         </div>

      )
   }
}
