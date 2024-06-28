import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaymentComponents = () => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payment, setpayment] = useState(null);
  const user = useSelector((state) => state.user.value);

  const handleClose = () => {
    setShow(false);
    setAmount(0);
    setpayment(null);
    setError(null);
  };

  const handleShow = () => {
    setShow(true);
    setAmount(0);
    setpayment(null);
    setError(null);
  };

  const paymentFunction = async (amount) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "https://movies-application-api.vercel.app/payment/add",
        { amount } // Send amount in the correct format
      );

      setpayment(result.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occurred during payment:", error);
      setError("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };
  const updateUserForCheckPayment = async (payment_id) => {
    await axios
      .put(
        `https://movies-application-api.vercel.app/user/updateOneUser/${user._id}`,
        { ...user, paymentId: payment_id }
      )
      .then((result) => {
        return result.data;
      });
  };

  const handleChange = (e) => {
    setAmount(+e.target.value);
  };

  const handleSubmit = () => {
    if (amount > 0) {
      paymentFunction(amount);
    }
  };

  if (payment?.payment_id) {
    updateUserForCheckPayment(payment.payment_id);
  }
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
          <Form.Check
            type={"radio"}
            id={`default-radio-1`}
            label={`7 TND for one month to see all movies`}
            name="group1"
            value={7000}
            onChange={handleChange}
          />
          <Form.Check
            type={"radio"}
            id={`default-radio-2`}
            label={`80 TND for one year to see all movies`}
            name="group1"
            value={80000}
            onChange={handleChange}
          />
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={isLoading || amount === 0}
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Submit"
            )}
          </Button>
          {payment && (
            <Button variant="primary" onClick={handleClose}>
              <a
                href={`${payment.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Payment
              </a>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentComponents;
