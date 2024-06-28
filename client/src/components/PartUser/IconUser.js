import React, { useEffect, useState } from "react";
import { Col, ListGroup, Offcanvas, Row, Spinner, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeEtat } from "../../Redux/Slice/changeStateSlice";
import { delUser } from "../../Redux/Slice/userSlice";
import axios from "axios";

const IconUser = () => {
  return (
    <>
      <OffCanvasExample placement={"end"} name={"end"} />
    </>
  );
};

export default IconUser;

function OffCanvasExample({ name, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth");
    dispatch(changeEtat());
    dispatch(delUser());
    navigate("/");
  };
  const user = useSelector((state) => state.user.value);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    <>
      {user.email ? (
        <>
          <img
            className="imgProfile"
            src="./images/219986.png"
            alt=""
            onClick={handleShow}
          />

          <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
              >
                <Row>
                  <Col sm={8}>
                    <ListGroup>
                      <Link className="ViewProfile"  to={"/profile"} onClick={()=>(handleClose(), dispatch(changeEtat()))} ><ListGroup.Item >View Profile</ListGroup.Item></Link>
                      <ListGroup.Item className="LogoutProfile" onClick={() => logout()}>
                        Logout
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Tab.Container>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      )}
    </>
  );
}
