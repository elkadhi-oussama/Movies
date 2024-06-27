import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PaymentComponents from '../PartPayment/PaymentComponents';

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div className='Profile'>
    <h1> {user.username} </h1>
    <h2> {user.email} </h2>
    <Button>Update Profile</Button>
    <PaymentComponents />
    </div>
  )
}

export default Profile