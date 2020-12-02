import React, { Component } from 'react'
import Nav from './Nav'
import swal from '@sweetalert/with-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGifts, faUsers, faArrowRight, faPeopleCarry, faAirFreshener, faAddressCard, faLifeRing, faRing, faUserGraduate, faBaby, faArchway, faThumbsUp, faPenNib, faPenAlt, faPen, faKiwiBird, faUser, faComment, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap';
import getProfile from './getProfile';

export default class Tweeter extends Component {
    state = {
        tweets: [],
        name: '',
        comment: '',
        liked: false,
        unliked: false
    }
    componentDidMount() {
        this.loadTweets()
    }
    loadTweets = function () {
        fetch(`https://apiarticlepengist.herokuapp.com/get-tweets`, {
            method: 'Get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(resJson => this.setState({ tweets: resJson.tweets.reverse() }))
            .catch(err => err.message)

    }


    async like(id) {
        let liked = await fetch(`https://apiarticlepengist.herokuapp.com/like-tweet/${id}`, {
            method: 'Get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!liked.error) {
            let likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || { ids: [''] }
            localStorage.setItem('likedTweets', JSON.stringify({ ids: [...likedTweets.ids, id] }))
            this.loadTweets()
            //   return this.setState({ liked: true })
        }


    }


    async comment(id) {
        if (!this.state.name || !this.state.comment) {
            return swal('', 'Enter name and comment', 'info')
        }
        let liked = await fetch(`https://apiarticlepengist.herokuapp.com/comment-tweet/${id}`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                comment: this.state.comment,
                name: this.state.name
            })
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!liked.error) {
            this.loadTweets()
            return this.setState({ comment: '', name: '' })
        }


    }
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className="container-fluid">
                    <div style={{ marginTop: 20 }}>
                        <div className="col-md-5 offset-md-3 col-sm-12">
                            <h3 style={{ fontWeight: 'bold', fontSize: 24 }} >The Street of Tweeter  <FontAwesomeIcon icon={faKiwiBird} /></h3>
                            <p>
                                Stay updated
                        </p>
                        </div>

                        <div style={{ borderRadius: 7 }} className="col-md-6 offset-md-3 col-sm-12 medias">
                            {
                                this.state.tweets.length > 0 ?
                                    this.state.tweets.map((tweet) => {
                                        let likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || { ids: [''] }
                                        const alreadyLiked = likedTweets.ids.includes(tweet._id)
                                        let color = "green"
                                        return (
                                            <>
                                                <span onClick={()=> getProfile(tweet.name)} style={{alignItems:'center', display:'flex', flexDirection:'row'}} className="tweet_name"><FontAwesomeIcon icon={faUser} style={{ backgroundColor: 'rgba(0,0,0,0.5)',cursor:'pointer',borderRadius:'50%', padding: 2,width:20, height:20,marginRight:10, color: 'white' }} />{tweet.name}</span>
                                                <div style={{ borderRadius: 5, border:'1px solid rgba(0,0,0,0.1)', padding:16 }} className="media my-4">


                                                    <div>

                                                        <div style={{width:'100%'}} className="media-body">
                                                            <div style={{padding:10}}>

                                                          
                                                            <h6 className="my-2" style={{ fontWeight: 'bold' }}>{tweet.title}</h6>
                                                            <small style={{fontSize:14, marginBottom:10}}>{tweet.content}</small>
                                                            </div>
                                                        </div>
                                                        {tweet.imageUrl && <img style={{ width: '100%', height: '100%' }} src={tweet.imageUrl} className="mr-3" alt="..." />}
                                                        <div />
                                                        {tweet.url && <a href={tweet.url} className="ml-2" target="_blank" style={{ marginTop: 20 }}>
                                                            Read More
                                                     </a>}
                                                        <div style={{ justifyContent: 'space-between', display:'flex' }} className="row offset-md-2 my-4">
                                                            <div className="col-6">
                                                                <div style={{padding:'0 0 0 10px'}}>
                                                                <FontAwesomeIcon onClick={() => {
                                                                    if (alreadyLiked) {
                                                                        return
                                                                    }

                                                                    this.like(tweet._id)
                                                                }} style={{ fontSize: 20, marginLeft:20, cursor: 'pointer', color: !alreadyLiked ? 'rgba(0,0,0,0.5)' : 'green' }} icon={faThumbsUp} />

                                                                <span style={{fontSize:13}} className="ml-1">{alreadyLiked ? `You and ${tweet.likes - 1} others` : tweet.likes} </span>
                                                                </div>
                                                            </div>
                                                            {/* <div className="col">
                                                             <FontAwesomeIcon onClick={()=>{
                                                                 this.unLike(tweet._id)
                                                             }} style={{fontSize:20,cursor:'pointer', color:'rgba(0,0,0,0.5)'}} icon={faThumbsDown}/>
                                                             <span className="ml-1">90</span>
                                                         </div> */}
                                                            <div onClick={() => {
                                                                swal(
                                                                    <div>
                                                                        <div>
                                                                            <input onChange={(e) => this.setState({ name: e.target.value })} className="form-control" placeholder="Enter your name" />
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <textarea onChange={(e) => this.setState({ comment: e.target.value })} className="form-control" placeholder="Enter your comment">
                                                                            </textarea>
                                                                        </div>



                                                                    </div>).then(() => {
                                                                        this.comment(tweet._id)
                                                                    })
                                                            }} className="col-6">
                                                                <FontAwesomeIcon style={{ fontSize: 20, cursor: 'pointer', color: 'rgba(0,0,0,0.5)' }} icon={faComment} />
                                                                <span className="ml-1">{tweet.comments ? tweet.comments.length : 0}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="ml-2">Comments</h4>
                                                        </div>

                                                         {
                                                             tweet.comments.map((comment)=>{
                                                                 return(

                                                               
                                                                 <div style={{backgroundColor:'rgba(0,0,0,0.01)', padding:10}}>
                                                                <div style={{color:'rgba(0,0,0,0.5)', fontSize:13, alignItems:'center', display:'flex', flexDirection:'row'}}>
                                                                <FontAwesomeIcon  icon={faUser} style={{ backgroundColor: 'rgba(0,0,0,0.4)',marginRight:10,  padding: 2,width:20,borderRadius:'50%', height:20, color: 'white' }} /> {comment.name}
                                                                 </div>
                                                                 <div style={{color:'rgba(0,0,0,1)',marginTop:10, fontSize:16}}>
                                                                 {comment.comment}
                                                                 </div>

                                                                 <small style={{fontSize:12}}>
                                                                     {
                                                                         new Date(comment.date).toLocaleString()
                                                                     }
                                                                 </small>
                                                                 <hr/>
                                                                </div>
                                                                  )

                                                             })
                                                         }
                                                        <div className="row">

                                                        </div>




                                                    </div>
                                                </div>
                                                <hr/>
                                            </>
                                        )
                                    })
                                    :
                                    <Spinner />
                            }





                            <a class="btn btn_thick btn-lg my-4" href="/signup" role="button">Become a Pengister</a>
                        </div>

                    </div>
                    <div className="row">
                        <div style={{ padding: 20, width: '100%', marginTop: 50 }} className="">
                            <p className="text-center text-secondary">  ©copy 2020 Pengist inc</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}
