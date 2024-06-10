import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pic from "../assets/ProfilePic.png"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'

let url = 'https://backend2-0weq.onrender.com/'

const QRCodeDisplay = () => {
    const { username } = useParams()
    const [contactDetails, setContactDetails] = useState({
        fullName: '',
        userName: '',
        phone: '',
        email: '',
        address: '',
        role: ''
    })  

    useEffect(()=>{
        axios.get(`${url}contacts/${username}`).then(res=>{
            setContactDetails(...res.data)
        }).catch(err=>console.log(err))
    },[])

    const generateVCard = () => {
        axios.get(`${url}vcard/${username}`, {
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/vcard' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${contactDetails.fullName}.vcf`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            console.error('Error generating vCard:', error);
        });
      };

// console.log(username)

  return (
    <div className='d-flex flex-column align-items-center border pt-4'>
        
        <div>
            <img className='rounded-circle' style={{width:"auto", height:"6rem"}}src={Pic} alt="" />
        </div>


    <Form style={{width:"35rem"}}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control readOnly  value={contactDetails.fullName} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control readOnly  value={contactDetails.phone}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control readOnly  value={contactDetails.email}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Address</Form.Label>
          <Form.Control readOnly value={contactDetails.address}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Role</Form.Label>
          <Form.Control readOnly value={contactDetails.role}/>
        </Form.Group>
      </Row>

<div className='d-flex justify-content-center w-100'>
          <Button variant="primary" type="button" onClick={generateVCard} >Download contact</Button>
</div>

    </Form>
    </div>
  )
}

export default QRCodeDisplay
