import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from '@sweetalert/with-react'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

export default class Recent extends Component {
    state = {
        articles: [],
        date: ''
    }

    async componentDidMount() {
        await this.loadArticles()
    }
    async loadArticles() {

        let resp = await fetch(`https://apiarticlepengist.herokuapp.com/get-posts`, {
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

            this.setState({ articles: resp })
        }



    }
    async sponsor(id) {
        let resp = await fetch(`https://apiarticlepengist.herokuapp.com/sponsor`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                sponsoredUntil: new Date(this.state.date).getTime(),
                _id: id
            })
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
            this.setState({ date: '' })
            this.loadArticles()
            swal('Success', 'Post Sponsored', 'success')
        }
    }
    async delete(id) {
       swal('Please wait...', '', 'info')
        let deleted = await fetch(`https://apiarticlepengist.herokuapp.com/delete-article/${id}`, {
            method: 'Get',
            headers: {
                'Content-type': 'application/json'
            },
           
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!deleted.error) {
            
            this.loadArticles()
            swal('deleted', '', 'success')
        }


    }
    render() {
        return (
            <div style={{ padding: 6 }} onClick={() => this.props.close()} className="container schedule recent">


                <div style={{ marginTop: 40, paddingTop: 30 }}>
                    <h3 >Recent posts</h3>
                    {
                        this.state.articles.length > 0 ?
                            this.state.articles.map(article => {
                                return (
                                    < div style={{ backgroundColor: 'white', padding: 20 }} className=" my-3" key={article._id}>
                                        {article.imageUrl && <img src={article.imageUrl} className="mr-3 ml-2 article_im" alt="..." />}
                                        <div className="media-body">
                                            <div className="row justify-content-end">
                                                {
                                                    article.sponsoredUntil > Date.now() ?
                                                        <div style={{ fontSize: 9 }} className="badge mr-4 badge-danger">Sponsored till {new Date(article.sponsoredUntil).toDateString()}</div>
                                                        : null
                                                }

                                            </div>


                                            <h5 className="mt-1">{article.title}</h5>
                                            <div>
                                                {article.pretext && <small className="mt-3">{article.pretext}</small>}
                                            </div>

                                            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }} className="row justify-content-end pr-3">
                                                <span style={{ marginLeft: 20 }}>
                                                    <FontAwesomeIcon style={{ color: 'rgba(0,0,0,0.5)', fontSize: 13 }} icon={faThumbsUp} /> <small>{article.numberOfLikes}</small>
                                                </span>
                                                <span className="ml-3 mr-3">
                                                    <FontAwesomeIcon style={{ color: 'rgba(0,0,0,0.5)', fontSize: 13 }} icon={faComment} /> <small>{article.noOfComments}</small>
                                                </span>
                                            </div>
                                            {article.category === "Series" ? <div> <small>Episode: <b>{article.episode}</b></small></div> : null}

                                            <small>Category : <b className="">{article.category}</b></small><br />
                                            <small style={{ fontSize: 11, }}>Posted On {new Date(article.dateAdded).toDateString()}</small>
                                            <div className="row align-items-center justify-content-space-around">
                                                <div className="mt-1 ml-2">
                                                    <a style={{ color: "white" }} href={`/article/${article._id}`} className="btn_thick btn-sm mt-2 read">
                                                        Read More
                                                </a>
                                                </div>

                                                <div className="mt-2 ml-2 ">
                                                    <label>Sponsor post until</label><br />
                                                    <input value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} type="date" />
                                                </div>
                                                <div className="mt-1 mr-2 ml-1 ">
                                                    <input onClick={() => {
                                                        if (this.state.date) {
                                                            this.sponsor(article._id)
                                                        }
                                                        else {
                                                            swal(<div>Please choose a date</div>)
                                                        }

                                                    }} type="button" className="btn btn-sm btn-success" value="Save" />
                                                </div>
                                                <div className="mt-1 mr-2 ml-1 ">
                                                    <input onClick={() => {
                                                        swal({
                                                            title: "Are you sure?",
                                                            text: "",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    this.delete(article._id)
                                                                } else {

                                                                }
                                                            })
                                                    }}

                                                     type="button" className="btn btn-sm btn-danger" value="Delete Article" />
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                )
                            })
                            :
                            <h3>No post for now check back later</h3>
                    }
                </div>
            </div>
        )
    }
}
