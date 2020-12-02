import React, { Component, useState, useRef } from 'react'
import Nav from './Nav'
import swal from '@sweetalert/with-react'
import JoditEditor from "jodit-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGifts, faUsers, faArrowRight, faPeopleCarry, faAirFreshener, faAddressCard, faLifeRing, faRing, faUserGraduate, faBaby, faArchway, faThumbsUp, faPenNib, faPenAlt, faPen, faPhone } from '@fortawesome/free-solid-svg-icons'

export default class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className="container">
                    <div style={{ marginTop: 90 }} class="jumbotron">
                        <h1 style={{ fontWeight: 'bold' }} class="display-4 text-center">Contact us  </h1>
                        <h3 style={{ textAlign: 'center' }}>Meet the CEO</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="row">
                            <img src={require('./ogaga.jpg')} className="img-fluid" alt="loading..." />
                        </div>

                        <p class="lead mt-4 text-center">Pengist is the brain child of Christopher Oghenewogaga Vantus an all-around writer with the support of great minds like Adewumi Sunkanmi </p>
                        <p>Facebook <a href="https://facebook.com/profile.php?id=100006762968170&ref=content_filter">Christopher Oghenewogaga Vantus</a></p>
                        <p>Instagram <a href="https://instagram.com/ogaga_bleeds">@Ogaga_bleeds</a></p>
                        <p>Message Pengist.org directly on WhatsApp: <a href="https://wa.me/message/ZRDCNSDR7TJHJ1"><FontAwesomeIcon style={{ color: '#28a745' }} icon={faPhone} /> </a> </p>
                        <hr class="my-4" />
                        <a class="btn btn_thick btn-lg" href="/signup" role="button">Become a Pengister</a>
                    </div>
                    <div className="row">
                        <div style={{ padding: 20, width: '100%', marginTop: 50 }} className="">
                            <p className="text-center text-secondary"> © 2020, Pengist inc</p>
                        </div>
                    </div>


                </div>
            </React.Fragment>

        )
    }
}


// const Contact = () => {
//     const config = {
//         readonly: false // all options from https://xdsoft.net/jodit/doc/
//       }
//       const editor = useRef(null)
//     const [id, setId] = useState('')
//     const [jobTitle, setJobTitle] = useState('')
//     const [category, setCategory] = useState('')
//     const [jobType, setJobType] = useState('')
//     const [companyHq, setCompanyHq] = useState('')
//     const [regionalRestrictions, setRegion] = useState('')
//     const [applicationLink, setApplicationLink] = useState('')
//     const [jobDescription, setJobDescription] = useState('')
//     const [companyName, setCompanyName] = useState('')
//     const [companyStatement, setCompanyStatement] = useState('')
//     const [logoUrl, setLogoUrl] = useState('')
//     const [websiteUrl, setWebsiteUrl] = useState('')
//     const [companyEmail, setCompanyEmail] = useState('')
//     const [companyDescription, setCompanyDecription] = useState('')
//     const [datePosted, setDatePosted] = useState('')
//     const [planType, setPlanType] = useState('')
//     const [count, setCount] =useState(0)
//     const [jobPosted, setJobPosted] = useState(0)
//    async function postJob(){
//         let job= {
//             id,
//             jobType,
//             jobTitle,
//             category,
//             companyHq,
//             regionalRestrictions,
//             applicationLink,
//             jobDescription,
//             companyName,
//             companyStatement,
//             logoUrl,
//             websiteUrl,
//             companyEmail,
//             companyDescription,
//             datePosted,
//             planType,
//             jobPosted
//         }

//      const postBody = await fetch("http://localhost:4001/add-job",{
//         method:'Post',
//         headers:{
//             'Content-type':'application/json'
//         },
//         body: JSON.stringify({
//            ...job
//         })

//     })
//     .then((response)=>response.json())
//     .then(resJson => resJson)
//     .catch(err => err.message)
//     if(!postBody.error){
//         setCount(count+1)
//         swal('done',`${count}`, 'success')
//     }
//     }


//    let text= ''
//    let cDes=''
//     return (
//         <div style={{marginLeft:70}}>
//             <div>
//                 <label>
//                     id
//                 </label><br />
//                 <input type="text" onChange={(e) => setId(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     jobTitle
//                 </label><br />
//                 <input type="text" onChange={(e) => setJobTitle(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     jobCategory
//                 </label><br />
//                 <input type="text" onChange={(e) => setCategory(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     jobType
//                 </label><br />
//                 <input type="text" onChange={(e) => setJobType(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     companyHq
//                 </label><br />
//                 <input type="text" onChange={(e) => setCompanyHq(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     regionalRestrictions
//                 </label><br />
//                 <input type="text" onChange={(e) => setRegion(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      applicationLink
//                 </label><br />
//                 <input type="text" onChange={(e) => setApplicationLink(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      jobDescription
//                 </label><br />
//                 <JoditEditor
//                 ref={editor}

//                 config={config}
//                 onChange={(e)=> {text=e} }
//                 tabIndex={5} // tabIndex of textarea
//                 onBlur={(e)=>{setJobDescription(text)
//               }}
//                 />
//             </div>
//             <div>
//                 <label>
//                      companyName
//                 </label><br />
//                 <input type="text" onChange={(e) => setCompanyName(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      companyStatement
//                 </label><br />
//                 <input type="text" onChange={(e) => setCompanyStatement(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      logoUrl
//                 </label><br />
//                 <input type="text" onChange={(e) => setLogoUrl(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      websiteUrl
//                 </label><br />
//                 <input type="text" onChange={(e) => setWebsiteUrl(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      companyEmail
//                 </label><br />
//                 <input type="text" onChange={(e) => setCompanyEmail(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                      companyDescription
//                 </label><br />
//                 <JoditEditor
//                 ref={editor}

//                 config={config}
//                 onChange={(e)=> {cDes=e} }
//                 tabIndex={5} // tabIndex of textarea
//                 onBlur={(e)=>{setCompanyDecription(cDes)
//                 }}
//                 />
//             </div>
//             <div>
//                 <label>
//                      datePosted
//                 </label><br />
//                 <input type="date" onChange={(e) => setDatePosted(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                     planType
//                 </label><br />
//                 <input type="text" onChange={(e) => setPlanType(e.target.value)} />
//             </div>
//             <div>
//                 <label>
//                    jobPosted
//                 </label><br />
//                 <input type="number" onChange={(e) => setJobPosted(parseInt(e.target.value))} />
//             </div>

//             <div onClick={()=>{
//                 postJob()
//             }} className="btn btn-primary">
//                 Add job
//             </div>
//         </div>

//     )
// }
// export default Contact