import React from "react";
import "./PaymentSuccs.css"
import { Link } from "react-router-dom";
const PaymentSuccs = () => {
  return (
    <div className="cardBody">
        <div class="card">
          <div >
            <i class="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            You can now watch movie <br /> Welcome <span><Link to={"/movie"} >watch now</Link></span>
          </p>
        </div>
    </div>
  );
};

export default PaymentSuccs;
