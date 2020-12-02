import React, { Component } from 'react'
import swal from '@sweetalert/with-react'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import Home from '../Home';
import ShowCase from '../ShowCase';
export default class ScheduleEvent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         articles: [],
         changeScreen: false,


      }
   }
   async componentDidMount() {
      await this.loadArticles()
   }
   async loadArticles() {
      const user = this.props.user
      let resp = await fetch(`https://apiarticlepengist.herokuapp.com/get-user-article/${user._id}`, {
         method: 'Get',
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then((response) => response.json())
         .then(resJson => resJson)
         .catch(err => err.message)

      if (resp.error) {
         return swal('', resp.error, 'error')
      }
      else if (resp === "Failed to fetch") {

         return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
      }
      else {
         console.log(resp)
         this.setState({ articles: resp })
      }



   }

   render() {

      return (
         <div onClick={() => this.props.close()} style={{ backgroundColor: 'transparent' }} className="container">
            <h1 style={{ textAlign: 'center' }}>Your Posts</h1>
            <div style={{ padding: 0 }} className="row ">
               <div style={{ display: 'flex', justifyContent: 'center', padding: 0, backgroundColor: 'white' }} className="col-md-12 col-sm-12">



                  <div style={{ padding: 20 }} className="medias">
                     {
                        this.state.articles.length > 0 ?
                           this.state.articles.map(article => {
                              return (
                                 <div>
                                    <small style={{ fontSize: 11 }} className="">article id: {article.articleId}</small>
                                    <ShowCase article={article} />
                                 </div>

                              )
                           })

                           :
                           <h4>You have not posted any article yet</h4>

                     }





                  </div>








               </div>
            </div>


         </div>

      )
   }
}
