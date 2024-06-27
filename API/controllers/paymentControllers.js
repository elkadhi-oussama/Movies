// Import the axios library for making HTTP requests
import axios from "axios";

// Function to handle adding a new payment
export const addPayment = async (req, res) => {
  // URL for the payment generation API endpoint
  const url = "https://developers.flouci.com/api/generate_payment";

  // Payload to be sent with the API request
  const payload = {
    app_token: process.env.app_token, // Application token from environment variables
    app_secret: process.env.app_secret, // Application secret from environment variables
    amount: req.body.amount, // Payment amount from the request body
    accept_card: "true", // Accept card payments
    session_timeout_secs: 1800, // Session timeout in seconds
    success_link: "http://localhost:5000/success", // URL to redirect to on successful payment
    fail_link: "http://localhost:5000/fail", // URL to redirect to on failed payment
    developer_tracking_id: process.env.myIdInAppFlouci, // Developer tracking ID from environment variables
  };

  // Make a POST request to the payment generation API
  await axios
    .post(url, payload)
    .then((result) => res.send(result.data)) // Send the API response data back to the client
    .catch((err) => console.log("this error from addPayment : ", err)); // Log any errors that occur
};

// Function to handle verifying a payment
export const verifyPayment = async (req, res) => {
  // Extract the payment ID from the request parameters
  const idPayment = req.params.id;

  // URL for the payment verification API endpoint
  const url = `https://developers.flouci.com/api/verify_payment/${idPayment}`;

  // Headers to be sent with the API request
  const headers = {
    "Content-Type": "application/json", // Content type of the request
    "apppublic": process.env.app_token, // Application token from environment variables
    "appsecret": process.env.app_secret, // Application secret from environment variables
  };

  // Make a GET request to the payment verification API
  await axios
    .get(url, { headers })
    .then((result) => res.send(result.data.result.status)) // Send the payment status back to the client
    .catch((err) => res.send("this error from verify payment : ", err)); // Send any errors that occur back to the client
};
