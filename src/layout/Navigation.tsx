import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import { Link } from "react-router-dom";


interface IProps {
  user: string
}
const Navigation = (props: React.PropsWithChildren<IProps>) => {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.clear()
    navigate("/signin")
    context.isLog("logOut")
  };
  const logIn = () => {
    navigate("/signin")
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Movie Center</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Film Listesi</Nav.Link>
              <Nav.Link as={Link} to="/search">Film Ara</Nav.Link>
            </Nav>
            <Nav style={{ columnGap: "1rem" }}>
              {props.user ? <><Navbar.Text style={{ textAlign: "center" }}>{props.user}</Navbar.Text>
                <Button onClick={() => logOut()} className='ml-5' variant="outline-danger"><FaPowerOff /></Button></> : <Button onClick={() => logIn()} className='ml-5' variant="outline-danger">Giriş Yap</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Navigation