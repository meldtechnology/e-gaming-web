import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Col, Container, Figure, Form, Image, Row, Stack } from 'react-bootstrap';
import logoesgc from './assets/logo-esgc.png';


function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    return(
        <>
        <Container  className='my-3 rounded-3'>           
            <Row>
                <Col className="">
                   <div className="my-5 float-end">
                      <Image  width="300px" height="670px" alt="" src="https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBsYWluJTIwYmFja2dyb3VuZHN8ZW58MHx8MHx8fDA%3D" className='img-fluid rounded-3'/>
                   </div>
                </Col>
                <Col className="me-4">             
                <p className="logo display-2 text-center p-3 d-flex flex-row">
                   <a href='/'>
                     <Image width='100px' height='80px' src={logoesgc} className='img-fluid mx-3'/>
                   </a>
                    Sign-In
                </p>

                <Form className='border border-warning rounded-3 border-2 p-3' method="post" action="http://3.249.214.239:9011/login">
                    <Form.Group className="mb-3 " controlId="emailInputControl">
                        <Form.Label>Email Address <span className='text-danger'>*</span></Form.Label>                        
                        <Form.Control type="text" name="username" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} required></Form.Control>
                        <Form.Text className="text-muted">
                             We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordInputControl">
                        <Form.Label>Password <span className='text-danger'>*</span></Form.Label>                        
                        <Form.Control type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} required></Form.Control>
                    </Form.Group>        

                    <div className="d-grid">
                       <Button variant="warning" type="submit" className="btn btn-block btn-primary">Log In</Button>
                    </div> 
                    </Form>

                    <div className='border border-white border-5 my-3 text-center'>                        
                        <p><i className="bi bi-file-lock fs-4"></i> On a shared computer, make sure to sign out when you're done. This helps keep your account secure from other people using your device.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    
        </>
    );
}
export default Login;