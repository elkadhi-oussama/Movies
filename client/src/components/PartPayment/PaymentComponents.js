import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const PaymentComponents = () => {
  const [show, setShow] = useState(false);
  const [amount, setamount] = useState(0);
  const [paymentId, setpaymentId] = useState(null)
  const [paymentLink, setpaymentLink] = useState(null)
  const [paymentDetails, setpaymentDetails] = useState(null)

  const handleClose = () => (setShow(false), setamount(0));
  const handleShow = () => (setShow(true), setamount(0));
  
  const paymentFunction = async () => {
    try {
      const result = await axios.post(
        "https://movies-application-api.vercel.app/payment/add",
        amount
      );
      setpaymentDetails(result.data.result);
     
    } catch (error) {
      console.log("this error getted when i try to make payment : ", error);
    }
  };
  const handleChange = (e)=>{
    setamount({ amount: +e.target.value })
    paymentFunction()
  }
  console.log("paymentDetails : ", paymentDetails)
  console.log("paymentLink : ", paymentLink)
  console.log("paymentId : ", paymentId)
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Payment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check // prettier-ignore
            type={"radio"}
            id={`default-${"radio"}-1`}
            label={`3 TND juste for this movie`}
            name="group1"
            value={3000}
            onChange={(e) => handleChange(e)}
            onClick={()=>setpaymentId(paymentDetails.payment_id)}
          />
          <Form.Check // prettier-ignore
            type={"radio"}
            id={`default-${"radio"}-2`}
            label={`7.99 TND for one month to see all movies`}
            name="group1"
            value={7.99}
            onChange={(e) => handleChange(e)}
          />
          <Form.Check // prettier-ignore
            type={"radio"}
            id={`default-${"radio"}-3`}
            label={`80 TND for one year to see all movies`}
            name="group1"
            value={80000}
            onChange={(e) => handleChange(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="success"
            onClick={() => (handleClose())}
          >
           <a href={`${paymentLink}`} target="_blank" >Submit</a>
            
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentComponents;
