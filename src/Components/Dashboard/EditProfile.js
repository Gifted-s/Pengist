
import React, { useState, useRef } from 'react';

import swal from '@sweetalert/with-react'
import FileUploader from "react-firebase-file-uploader";
import firebase from 'firebase'
const EditProfile = ({ back, user, change }) => {

    const [note, setNote] = useState('')



    async function post() {


        if (!note) {
            return swal('Oops', 'Enter note', 'error')
        }
        swal('Please wait...', '', 'info')
        const postBody = await fetch("https://apiarticlepengist.herokuapp.com/post-note", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                note
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)

        console.log(postBody)
        if (postBody.error) {
            return swal('', postBody.error, 'error')
        }
        else if (postBody === "Failed to fetch") {

            return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
        }
        else {
            setNote('')
            swal('Note Posted', ``, 'success')
        }
    }

    return (
        <div style={{ paddingTop: 45 }}>

            <label className="label_login">Enter today's note</label><br />
            <input value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="Enter note" className="input-box" />
            <br />



            <button className="btn btn-success mt-4 form-control" onClick={() => {
                post()

            }}>Submit</button>

        </div>

    );
}

export default EditProfile