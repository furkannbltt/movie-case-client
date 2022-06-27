import * as API from "../../api";
import { Form, FormControl, FormLabel, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate()
  const submitHandler = (event: any) => {
    event.preventDefault();
    const singUpData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    if (event.target.password.value === event.target.password2.value) {
      API.signUp(singUpData)
        .then((result) => {
          if (result.data.status) {
            navigate("/signin");
            alert("kayıt başarılı")
          }
          else {
            alert(result.data.message);
          }
        })

    } else {
      alert("şifreler eşleşmiyor")
    };
  }


  return (
    <div className="mt-5">
      <Container><Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={submitHandler}>
            <FormControl
              required
              key="email"
              id="email"
              placeholder="Email"
              className="p-3"
              type="email"
            />
            <FormControl
              required
              id="password"
              placeholder="Password"
              type="password"
              className="p-3"
            />

            <FormControl
              required
              id="password2"
              placeholder="Password"
              type="password"
              className="p-3"
            />
            <Button className="w-100 btn btn-lg btn-danger" type="submit">
              Sign Up
            </Button>
            <Link to="/signin">Giriş yap</Link>
          </Form></Col>
      </Row>
      </Container>
    </div>
  );
};
