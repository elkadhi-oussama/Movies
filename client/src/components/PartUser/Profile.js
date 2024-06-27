import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div className='Profile'>
    <h1> {user.username} </h1>
    <h2> {user.email} </h2>
    <Button>Update Profile</Button>
    <Button variant='success' > Payment  </Button>
    </div>
  )
}

export default Profile