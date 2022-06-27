import * as API from "../../api";
import { Form, FormControl, FormLabel, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from "../../store/AuthContext";


export const SignIn = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const submitHandler = (event: any) => {
    event.preventDefault();
    const singInData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };


    API.signIn(singInData)
      .then((result) => {
if(result.data.status){
        localStorage.setItem("token", result.data.token);
        navigate("/");
        context.isLog("logIn")}
        else{
          alert(result.data.message);
        }
      })
     
  };
  

  return (
    <div className="mt-5">
    <Container><Row>
      <Col  md={{ span: 4, offset: 4 }}>
      <Form onSubmit={submitHandler}>
        <FormControl
          required
          key="email"
          id="email"
          placeholder="Email"
          type="email"
          className="p-3"
        />
        <FormControl
          id="password"
          placeholder="Password"
          type="password"
          className="p-3"
        />
      <Button className="w-100 btn btn-lg btn-danger" type="submit">
        Sign in
      </Button>
      <Link to="/signup">Kayıt ol</Link>

    </Form></Col>
    </Row>
    </Container>
    </div>
  );
};
