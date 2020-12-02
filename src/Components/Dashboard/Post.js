
import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import swal from '@sweetalert/with-react'
import FileUploader from "react-firebase-file-uploader";
import firebase from 'firebase'
const Post = ({ back, user, change, reload }) => {
  let text;
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [avatarURL, setAvatarUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [avatar, setAvatar] = useState('')
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [pre, setPre] = useState('')
  const [start, setStart] = useState(false)
  const [episode, setEpisode] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('Short Stories')
  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }


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
    if (!category) {
      return swal('Please enter category', '', 'error')
    }
    // if (!pre) {
    //   return swal('Oops', 'Enter Pretext', 'error')
    // }
    if (!title) {
      return swal('Oops', 'Enter title', 'error')
    }
    // if (!imageUrl) {
    //   return swal('Oops', 'No image was uploaded', 'error')
    // }
    if (!content) {
      return swal('Oops', 'Enter content please', 'error')
    }
    await fetch(`https://userapipengist.herokuapp.com/increase-post/${user._id}`, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then(resJson => resJson)
      .catch(err => err.message)


    const postBody = await fetch("https://apiarticlepengist.herokuapp.com/add-article", {

      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        pretext: pre,
        category,
        content,
        articleId: id,
        episode: parseInt(episode),
        authorId: user._id,
        authorName: user.name,
        imageUrl
      })

    })
      .then((response) => response.json())
      .then(resJson => resJson)
      .catch(err => err.message)


    if (postBody.error) {
      return swal('', postBody.error, 'error')
    }
    else if (postBody === "Failed to fetch") {

      return swal('', 'we could not access the server try again and ensure internet connection is on', 'error')
    }
    else {
      
      swal('Article posted', `article id is ( ${postBody.articleId} ). you can also see it in your articles collection`, 'success').then(() => back()).then(()=>{
        window.location = '/dashboard'
      })
    }
  }

  return (<div className="col-md-7 offset-md-2">
    <div >

      <label className="label_login">Enter the title of your post</label><br />
      <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" className="input-box" />
      <br />


      <div >
        <label className="mt-3">(Optional) Add image file(Image will show here after upload):</label>
        {isUploading &&
          <div>
            <p style={{ fontWeight: 'bolder' }}>Uploading image please wait: {progress}%</p>
            <div className="progress mt-2 mb-2" style={{ height: 20 }}>
              <div className="progress-bar progress-bar-success" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        }
        {avatarURL && <img alt="heoooo" style={{ width: 126, height: 120 }} src={avatarURL} />}
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
      <label className="label_login mt-4">select article category</label><br />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Short Stories">Short Stories</option>
        <option value="Poems">Poems</option>
        <option value="Series">Series</option>
      </select> <br />
      <label className="label_login mt-4">If it is the continuation of a series, enter article id. Can't remember? find it <span onClick={() => change('schedule')} className="btn btn-success btn-sm">Here</span> </label><br />
      <input onChange={(e) => setId(e.target.value)} type="text" placeholder="Enter article id" className="input-box" />
      <br />
      <label className="label_login mt-4">If it is a series, what episode ?</label><br />
      <input onChange={(e) => setEpisode(e.target.value)} type="number" placeholder="Enter Episode" className="input-box" />
      <br />


      {
        start ?
          <div>
            <h6 style={{ fontWeight: 'bold', marginTop: 20 }}>Enter content here or simply copy and paste</h6>
            <JoditEditor
              ref={editor}
              config={config}
              onChange={(e) => text = e}
              tabIndex={1} // tabIndex of textarea
              onBlur={(e) => { setContent(text) }}
            />
          </div>

          :
          <div>  <span onClick={() => setStart(true)} className="btn mt-3 btn-success">Click here to post content</span> </div>
      }

      <br />
      <label className="label_login mt-4">(Optional) Enter a pretext (This is a short text that would draw the attention of your readers)</label><br />
      <input onChange={(e) => setPre(e.target.value)} type="text" placeholder="Enter pretext" className="input-box" />
    </div>
    <button className="btn btn-success form-control mt-4" onClick={() => {
      post()

    }}>Submit</button>

  </div>

  );
}

export default Post