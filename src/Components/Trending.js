import React, { Component } from 'react'
import ShowCase from './ShowCase'
import Nav from './Nav'
import { Spinner } from 'reactstrap';
import swal from '@sweetalert/with-react'
export default class Trending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }

    }
    async componentDidMount() {
        await this.loadArticles()
    }
    async loadArticles() {

        let resp = await fetch(`https://apiarticlepengist.herokuapp.com/get-trending`, {
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
            <React.Fragment>
                <Nav />
                <div className="container">
                    <div className="row article">
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="col-md-12 col-sm-12">
                            <div className="col-md-6 p-0 media_cont col-sm-12 mb-4">
                                <h4>
                                    Trending Stories For Today
                                </h4>
                                <div className="col-md-12 col-sm-12 medias">
                                    {
                                        this.state.articles.length > 0 ?
                                            this.state.articles.map(article => {
                                                return (
                                                    <ShowCase article={article} />
                                                )
                                            })

                                            :
                                            <Spinner />

                                    }



                                </div>
                            </div>







                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
