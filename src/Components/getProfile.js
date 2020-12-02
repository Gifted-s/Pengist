import React from 'react'
import swal from '@sweetalert/with-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'

async function getProfile(id) {
    swal('Please wait...', '', 'info')
    // const user = await fetch(`https://userapipengist.herokuapp.com/get-user-name/${id}`, {
    const user = await fetch(`https://userapipengist.herokuapp.com/get-user-name/${id}`, {
        method: 'Get',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then(resJson => resJson)
        .catch(err => err.message)
    if (user.name) {
        return swal(
            <div >
                <FontAwesomeIcon icon={faUser} style={{ height: 50, width: 50, color: 'white', borderRadius: '50%', backgroundColor: "lightgreen" }} />
                <div>
                    <h2>{user.name}</h2>
                    <h5 className="my-4">{user.username} </h5>
                    <h5 className="my-4"><FontAwesomeIcon icon={faEnvelope} style={{ color: 'rgba(0,0,0,0.6)', marginRight:10 }} />{user.email}</h5>
                    <h6 className="my-4"><FontAwesomeIcon icon={faPhone} style={{ color: 'rgba(0,0,0,0.6)', marginRight:4 }} />{user.phone}</h6>
                </div>


            </div>
        )
    }


}

export default getProfile