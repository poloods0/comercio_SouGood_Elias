import { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import { register } from '../../lib/user';

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(email, password);
  };

  const handleOnChange = (value: string, attribute: string) => {
    switch (attribute){
      case 'email':
        setEmail(value);
      break

      case 'password':
        setPassword(value)
      break

      case 'passwordConfirmation':
        setPasswordConfirmation(value);
      break
    }
  }

  return (
    <Container fluid>
    <Row xl={3} lg={2} md={2} sm={2}>
    <Form className={`border p-4 m-5 mx-auto`} onSubmit={handleSubmit}>
      <h1 className='text-center m-3'>Registro de cuenta</h1>
        <div className='mt-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={(e: any) => handleOnChange(e.target.value, 'email')} type="email" placeholder="ejemplo@gmail.com" required={true}/>
        </div>

        <div className='mt-4'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control onChange={(e: any) => handleOnChange(e.target.value, 'password')} type="password" placeholder="123456" required={true}/>
        </div>

        <div className='mt-4 mb-4'>
          <Form.Label>Confirmación de contraseña</Form.Label>
          <Form.Control onChange={(e: any) => handleOnChange(e.target.value, 'passwordConfirmation')} type="password" placeholder="123456" required={true}/>
        </div>
      <div className={`text-center`}>
        <a href="/login" className='row link-primary justify-content-center'>¿Ya tienes una cuenta?</a>
        <button className={`btn btn-outline-success`}style={{marginTop: 10}} type="submit">
          Submit
        </button>
      </div>
    </Form>
    </Row>
    </Container>
  );
};

export default Register;
