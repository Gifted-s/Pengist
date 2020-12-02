
import React, { useState, useRef } from 'react';

import swal from '@sweetalert/with-react'
import FileUploader from "react-firebase-file-uploader";
import firebase from 'firebase'
const Links = ({ back, user, change }) => {

  const [content, setContent] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [avatarURL, setAvatarUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [avatar, setAvatar] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  const handleUploadStart = () => { setIsUploading(true); setProgress(0) }
  const handleProgress = progress => setProgress(progress)
  const handleUploadError = error => {
    setIsUploading(false)
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    setAvatar(filename)
    setProgress(100)
    setIsUploading(false)
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setAvatarUrl(url)
        setImageUrl(url)
        setImgUrl(url)
      });
  };


  async function post() {

    if (!title) {
      return swal('Oops', 'Enter title', 'error')
    }
    // if (!imageUrl) {
    //   return swal('Oops', 'No image was uploaded', 'error')
    // }
    if (!content) {
      return swal('Oops', 'Enter content please', 'error')
    }
    // if (!url) {
    //   return swal('Oops', 'Enter url to read more please', 'error')
    // }
     swal('Please wait...', '', 'info')
    const postBody = await fetch("https://apiarticlepengist.herokuapp.com/post-tweet", {
    
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        name:user.name,
        url,
        content,
        imageUrl
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
      swal('Tweet Posted', ``, 'success')
    }
  }

  return (
    <div style={{paddingTop:45}}>

      <label className="label_login">Enter the title of tweet</label><br />
      <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" className="input-box" />
      <br />


      <div >
        <label className="mt-4">(Optional) Add image file(Image will show here after upload):</label>
        {isUploading &&
          <div>
            <p style={{ fontWeight: 'bolder' }}>Uploading image please wait: {progress}%</p>
            <div className="progress mt-2 mb-2" style={{ height: 20 }}>
              <div className="progress-bar progress-bar-success" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        }
        {avatarURL && <img alt="image..." style={{ width: 126, height: 120 }} src={avatarURL} />}
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
      </div>
      <br />
      <label className="label_login mt-4">Enter tweet content </label><br />
      <textarea onChange={(e) => setContent(e.target.value)} type="text" placeholder="Enter tweeter content" className="form-control"></textarea>
      <br />
      <label className="label_login mt-4">(Optional) Enter url link to make readers read more</label><br />
      <input onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Enter link" className="input-box" />
      <br />

      <button className="btn btn-success mt-4 form-control" onClick={() => {
        post()

      }}>Submit</button>

    </div>

  );
}

export default Links