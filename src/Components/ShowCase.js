import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

export default class ShowCase extends Component {

   render() {
      const { article } = this.props
      return (
         < div className="media" key={article._id}>
           {article.imageUrl && <img src={article.imageUrl} className="mr-3 article_im" alt="..." />}
            <div className="media-body">
               <h5 className="mt-1">{article.title}</h5>
               <div>
                 {article.pretext && <small className="mt-3">{article.pretext}</small>}
               </div>

               <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }} className="row justify-content-end pr-3">
                  <span style={{ marginLeft: 20 }}>
                     <FontAwesomeIcon style={{ color: 'rgba(0,0,0,0.5)', fontSize: 13 }} icon={faThumbsUp} /> <small>{article.numberOfLikes}</small>
                  </span>
                  <span className="ml-3">
                     <FontAwesomeIcon style={{ color: 'rgba(0,0,0,0.5)', fontSize: 13 }} icon={faComment} /> <small>{article.noOfComments}</small>
                  </span>
               </div>
               {article.category === "Series" ? <div> <small>Episode: <b>{article.episode}</b></small></div> : null}

               <small>Category : <b className="">{article.category}</b></small><br />
               <small style={{ fontSize: 11, }}>Posted On {new Date(article.dateAdded).toDateString()}</small>
               <div className="mt-1">
                  <a style={{ color: "white" }} href={`/article/${article._id}`} className="btn_thick mt-2 read">
                     Read More
                </a>
               </div>
            </div>

         </div>

      )
   }
}
