import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PaymentComponents from '../PartPayment/PaymentComponents';
import axios from 'axios';
import { changeEtat } from '../../Redux/Slice/changeStateSlice';

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()
    //update user for subscribe 
    const updateUserForCheckPayment = async (condition) => {
      await axios.put(
        `https://movies-application-api.vercel.app/user/updateOneUser/${user._id}`,
        { ...user, subscribe: condition }
      );
      dispatch(changeEtat());
    };
  
    const checkPayment = async (payment_id) => {
      await axios
        .post(
          `https://movies-application-api.vercel.app/payment/verify/${payment_id}`
        )
        .then((result) =>
          result.data === "SUCCESS"
            ? updateUserForCheckPayment(true)
            : updateUserForCheckPayment(false)
        )
        .catch((err) => console.log(err));
    };
    useEffect(() => {
      checkPayment(user.paymentId);
    }, []);
    //end 
  return (
    <div className='Profile'>
    <h1> {user.username} </h1>
    <h2> {user.email} </h2>
    <h3> {user.subscribe? "GOOD" : "You need to pay"} </h3>
    <Button>Update Profile</Button>
    <PaymentComponents />
    </div>
  )
}

export default Profile