import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Container, Row} from 'react-bootstrap';
import { useUserContext } from '../../contexts/userContext';
import { login } from '../../lib/user';

const Login: React.FC = () => {
  const router = useRouter();
  const { setToken, setRole } = useUserContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleOnChange = (value: string, attribute: string) => {
    switch (attribute){
      case 'email':
        setEmail(value);
      break

      case 'password':
        setPassword(value)
      break
    }
  }

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [newToken, newRole, err] = await login(email, password);
    if (err) setError(true);    
    setToken(newToken);
    setRole(newRole);
    if (newRole == 'admin')router.push('management');
    if (newRole == 'user') router.push('catalog'); 
  };

  return (
    <Container fluid>
      <Row xl={3} lg={2} md={2}>
        <Form className={`border p-4 m-5 mx-auto`} onSubmit={handleLogin}>
            <h1 className='text-center m-3'>Inicio de sesión</h1>
            { error && <div className="alert alert-danger" role="alert"> Datos de usuario inválidos</div>}
          
            <div className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e: any) => handleOnChange(e.target.value, 'email')} type="email" placeholder="ejemplo@gmail.com" required={true}/>
            </div>

            <div className='mt-4'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control onChange={(e: any) => handleOnChange(e.target.value, 'password')} type="password" placeholder="123456" required={true}/>
            </div>

          <div className={`text-center mt-3`}>
            <a href="/register" className='row link-primary justify-content-center mb-2'>¿No tienes una cuenta?</a>
            <button className={`btn btn-outline-success`}style={{marginTop: 10}} type="submit">
              Iniciar sesión
            </button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;