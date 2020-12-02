import React, { Component } from 'react'
import Nav from './Nav'
import swal from 'sweetalert';
import { Spinner } from 'reactstrap';
export default class Forums extends Component {
    state = {
        name: '',
        message: '',
        feeds: [],
        reply: ''
    }
    async componentDidMount() {
        await this.loadFeeds()
    }
    loadFeeds = async () => {
        await fetch(`https://apiarticlepengist.herokuapp.com/get-feeds`, {
            method: 'Get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(resJson => this.setState({ feeds: resJson.feedbacks.reverse() }))
            .catch(err => err.message)
    }

    async reply(_id) {
        if (!this.state.reply) {
            return swal('Please enter your reply before clicking reply', '', 'error')
        }
        let reponse = await fetch(`https://apiarticlepengist.herokuapp.com/feed-res/${_id}`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                reply: this.state.reply
            })
        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)
        if (!reponse.error) {
            this.loadFeeds()
            swal('', 'reply sent', 'success')
            return this.setState({ reply: '' })
        }


    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (!this.state.name || !this.state.message) {
            return swal('Please enter your name and message', '', 'error')
        }
        const resBody = await fetch("https://apiarticlepengist.herokuapp.com/post-feed", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                content: this.state.message
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)


        if (resBody.error) {
            return swal('', resBody.error, 'error')
        }
        else if (resBody === "Failed to fetch") {

            return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
        }
        else {
            swal('posted', '', 'success')
            return this.loadFeeds()

        }

    }
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4  iii">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group ">
                                    <label for="exampleFormControlInput1">Enter your name</label>
                                    <input onChange={(e) => this.setState({ name: e.target.value })} type="text" class="form-control" id="exampleFormControlInput1" placeholder="e.g Adewumi Sunkanmi" />
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">What would you like to say</label>
                                    <textarea onChange={(e) => this.setState({ message: e.target.value })} class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                </div>
                                <div class="form-group">
                                    <button type="submit" className="btn btn-success form-control">
                                        Create Topic
                                </button>
                                </div>
                            </form>

                        </div>



                        <div style={{ backgroundColor: 'rgba(0,0,0,0.04)' }} className="col-md-8 p-4 iii">
                            {
                                this.state.feeds.length > 0 ?
                                    this.state.feeds.map(feed => {
                                        return (
                                            <div style={{ backgroundColor: 'white', boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)", borderRadius: 5 }} className="row p-4 my-3">
                                                <div>
                                                    <h5>{feed.content}</h5>

                                                    <p style={{ fontSize: 14 }}>By: {feed.name}</p>
                                                    <small style={{ top: 10, right: 10 }}>
                                                        {
                                                            new Date(feed.datePosted).toLocaleString()
                                                        }
                                                        <div >
                                                            <div className="mb-3">
                                                                <b>Replies</b>
                                                            </div>
                                                            {
                                                                feed.replies.map(reply => {
                                                                    return (
                                                                        <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: 10, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>

                                                                            <div style={{ fontSize: 14 }}>
                                                                                {reply.reply}
                                                                            </div>
                                                                            <div>
                                                                                <small>{new Date(reply.datePosted).toLocaleString()}</small>
                                                                            </div>
                                                                        </div>

                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                        <hr />
                                                        <div>
                                                            <span>Replies {feed.noOfRes}</span>
                                                        </div>
                                                        <div>
                                                            <input onChange={(e) => {
                                                                this.setState({ reply: e.target.value })
                                                            }} type="text" placeholder="Type here" />
                                                        </div>
                                                        <div>
                                                            <span onClick={() => {
                                                                this.reply(feed._id)
                                                            }} className="btn btn-success  btn-sm my-1">Reply</span>
                                                        </div>


                                                    </small>
                                                </div>

                                            </div>
                                        )
                                    })
                                    :
                                    <Spinner />
                            }

                            {/* <form onSubmit={this.handleSubmit}>
                            <div class="form-group ">
                                <label for="exampleFormControlInput1">Enter your name</label>
                                <input onChange={(e) => this.setState({ name: e.target.value })} type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">What would you like to say</label>
                                <textarea onChange={(e) => this.setState({ message: e.target.value })} class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" className="btn btn_thick form-control">
                                    Submit
                                </button>
                            </div>
                        </form> */}

                        </div>

                    </div>


                </div>
            </React.Fragment>
        )
    }
}
