import React, { Component } from 'react'
import Nav from './Nav'

import swal from '@sweetalert/with-react'
import renderWithHTML from 'react-render-html';
import { faFileArchive, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import ReactHtmlParser, { processNodes, convertNodeElement, htmlParser } from 'react-html-parser'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faGifts, faUsers, faArrowRight, faPeopleCarry, faAirFreshener, faAddressCard, faLifeRing, faRing, faUserGraduate, faBaby, faArchway, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap';
import { TelegramShareButton, TelegramIcon, InstapaperShareButton, InstapaperIcon, TwitterIcon, TwitterShareButton, PinterestShareButton, PinterestIcon, LinkedinIcon, LinkedinShareButton, WhatsappIcon, WhatsappShareButton, EmailShareButton, EmailIcon, FacebookIcon, FacebookShareButton } from 'react-share';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getProfile from './getProfile'
export default class Episode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {},
            name: '',
            liked: false,
            comment: '',
            isAvail: '',
            content: ''
        }
    }
    async componentDidMount() {
        await this.loadArticle()
    }
    async loadArticle() {
        let article = await fetch(`https://apiarticlepengist.herokuapp.com/get-episode/${this.props.match.params.id}/${this.props.match.params.episode}`, {
            method: 'Get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (article.error) {
            return swal('Oops', 'cannot load content,try again later', 'info')
        }
        else {

            let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || { ids: [''] }
            if (likedArticles.ids.includes(article._id)) {
                this.setState({ liked: true })
            }
            if (!article.article) {
                return this.setState({ isAvail: 'notAvail' })
            }
            this.setState({ content: article.article.content })
            return this.setState({ article: article.article, isAvail: 'true' })


        }

    }
    async like() {
        let liked = await fetch(`https://apiarticlepengist.herokuapp.com/post-like/${this.state.article._id}`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!liked.error) {
            let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || { ids: [''] }
            localStorage.setItem('likedArticles', JSON.stringify({ ids: [...likedArticles.ids, this.state.article._id] }))
            await this.loadArticle()
            return this.setState({ liked: true })
        }


    }


    async comment() {
        let liked = await fetch(`https://apiarticlepengist.herokuapp.com/post-comment/${this.state.article._id}`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                text: this.state.comment,
                postedOn: Date.now()
            })
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!liked.error) {
            await this.loadArticle()
            return this.setState({ comment: '' })
        }


    }
    render() {
        const { article } = this.state
         const article_path = `https://pengist.org/${this.props.location.pathname}`
        return (
            <React.Fragment>
                <Nav />
                <div className="container">
                    <div className="row article">
                        <div className="col-md-8 col-sm-12">
                            {
                                !this.state.isAvail ?
                                    <Spinner />
                                    :
                                    this.state.isAvail === "true" ?
                                        <>
                                            <h1>
                                                {article.title}
                                            </h1>
                                            {article.category === "Series" && <div>Episode {article.episode}</div>}

                                            <p style={{ fontWeight: 'bold',cursor:'pointer', alignItems: 'center', display: 'flex', flexDirection: 'row' }} className="my-4">
                                                <FontAwesomeIcon onClick={() => getProfile(article.authorName)} style={{ fontSize: 24, color: "white", backgroundColor: "rgba(0,0,0,0.4)", cursor: 'pointer', marginRight: 10, borderRadius: '50%' }} icon={faUser} />   By {article.authorName}
                                            </p>
                                            <p className="text-secondary">
                                                Posted on {new Date(article.dateAdded).toDateString()}
                                            </p>
                                            {
                                                article.imageUrl
                                                &&
                                                <div style={{ backgroundImage: `url(${article.imageUrl})` }} className="art_img">

                                                </div>
                                            }
                                            {
                                                <div>
                                                    {
                                                        ReactHtmlParser(this.state.content)
                                                    }

                                                </div>
                                            }



                                            <hr />

                                            <p style={{ fontSize: 16 }}>
                                                WRITTEN BY
                     </p>
                                            <h3 style={{ fontWeight: 'bold' }}>
                                                <FontAwesomeIcon onClick={() => getProfile(article.authorName)} style={{ fontSize: 30, color: "white", backgroundColor: "rgba(0,0,0,0.4)", cursor: 'pointer', marginRight: 10, borderRadius: '50%' }} icon={faUser} />  {article.authorName}

                                            </h3>
                                            {article.category === "Series" && <a href={`/episode/${article.articleId}/${article.episode + 1}`}><div className="btn float-right btn-success">Move to episode {article.episode + 1} <FontAwesomeIcon icon={faArrowRight} /> </div></a>}

                                            <p>
                                                <span onClick={() => {
                                                    if (!this.state.liked) {
                                                        this.like()
                                                    }



                                                }} style={{ padding: 10, marginTop:40, justifyContent: 'center', borderRadius: "50%", height: 70, width: 70, alignItems: 'center', display: 'flex', border: `1px solid ${this.state.liked ? '#28a745' : 'rgba(0,0,0,0.3)'}` }}>
                                                    <FontAwesomeIcon style={{ height: 24, width: 24, color: this.state.liked ? '#28a745' : 'rgba(0,0,0,0.4)', marginRight: 10 }} icon={faThumbsUp} />
                                                    {
                                                        article.numberOfLikes
                                                    }
                                                </span>



                                            </p>
                                            <h5 className="mt-4">Comments {article.noOfComments}</h5>


                                            <div style={{ marginBottom: 40 }} className="p-1">

                                                {article.comments &&
                                                    article.comments.map(comment => {
                                                        return (
                                                            <div key={comment._id} className="row  mt-2" style={{ backgroundColor: 'rgba(0,0,0,0.04)', padding: 10, borderRadius: 7 }}>
                                                                <div className="col-sm-12 col-md-3">
                                                                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{comment.name}</span>
                                                                </div>
                                                                <div className="col-sm-12 col-md-7">
                                                                    <span >{comment.text}</span>
                                                                </div>
                                                                <div className="col-sm-12 col-md-2">
                                                                    <small>{new Date(comment.postedOn).toLocaleString()}</small>
                                                                </div>


                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div >
                                                <input type="text"
                                                    className="input-box"
                                                    value={this.state.name}
                                                    onChange={(e) => this.setState({ name: e.target.value })}
                                                    placeholder="Enter your name"
                                                />

                                                <textarea type="text"
                                                    className="form-control mt-2"
                                                    value={this.state.comment}
                                                    onChange={(e) => this.setState({ comment: e.target.value })}
                                                    placeholder="Write comment"
                                                ></textarea>

                                                <button onClick={() => {
                                                    if (!this.state.comment || !this.state.name) {
                                                        return swal('', 'Please enter name and comment to perform this action', 'error')
                                                    }
                                                    this.comment()
                                                }} className="btn_thick my-3">
                                                    Comment
                                            </button>
                                            </div>



                                        </>
                                        :
                                        <>
                                            <h1 className="text-center mb-3">Thank you very much for going through this post</h1>

                                            <h4 className="text-center">You will be notified if another episode is posted</h4>

                                        </>

                            }







                        </div>

                        <div style={{marginTop:0, marginBottom:30, padding:20}}>
                        <span>Share Post  <FontAwesomeIcon icon={faShareAlt}/> </span>
            <span>
                                                <hr />
                                                <FacebookShareButton url={article_path} >
                                                    <FacebookIcon size={33} round={true} />
                                                </FacebookShareButton>
                                            </span>
                                            <span className="ml-2 mt-2">
                                                <EmailShareButton title="Hello share" url={article_path} >
                                                    <EmailIcon size={33} round={true} />
                                                </EmailShareButton>
                                            </span>
                                            <span className="ml-2 mt-2">
                                                <WhatsappShareButton url={article_path} >
                                                    <WhatsappIcon size={33} round={true} />
                                                </WhatsappShareButton>
                                            </span>
                                            <span className="ml-2 mt-2">
                                                <LinkedinShareButton url={article_path}>
                                                    <LinkedinIcon size={33} round={true} />
                                                </LinkedinShareButton>
                                            </span>
                                            {/* <span className="ml-2 mt-2">
                                                <PinterestShareButton url={`https://apiarticlepengist.herokuapp.com/get-article/${this.props.match.params.id}`} >
                                                    <PinterestIcon size={33} round={true} />
                                                </PinterestShareButton>
                                            </span> */}
                                            <span className="ml-2 mt-2">
                                                <TwitterShareButton url={article_path}>
                                                    <TwitterIcon size={33} round={true} />
                                                </TwitterShareButton>
                                            </span>
                                            <span className="ml-1 share_">
                                                <InstapaperShareButton className="share_" url={article_path}>
                                                    <InstapaperIcon size={33} round={true} />
                                                </InstapaperShareButton>
                                            </span>
                                            <span style={{ marginTop: 10 }} className="ml-2 share_">
                                                <TelegramShareButton style={{ marginTop: 7 }} className="share_" url={article_path}>
                                                    <TelegramIcon size={33} round={true} />
                                                </TelegramShareButton>
                                            </span>

                                            <a className="ml-2" href="https://instagram.com">
                                                <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: "#eb3223", float: "right", marginTop: 7, marginRight: 9 }} />
                                            </a>
            </div>
                    </div>
                </div>
            </React.Fragment >

        )
    }
}
