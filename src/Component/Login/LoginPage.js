import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function LoginPage() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        // <div className='container-login' >
        //     <div className='inner-login'>
        //         <Form noValidate validated={validated} onSubmit={handleSubmit}>

        //             <Form.Group as={Col} md="12" className='form-group-login' controlId="validationCustom01">
        //                 <Form.Label>USER ID</Form.Label>
        //                 <Form.Control
        //                     className='form-input-login'
        //                     required
        //                     type="text"
        //                     placeholder="User ID"
        //                     defaultValue="Mark"
        //                 />
        //             </Form.Group>
        //             <Form.Group as={Col} md="12" className='form-group-login' controlId="validationCustom02">
        //                 <Form.Label>PASSWORD</Form.Label>
        //                 <Form.Control
        //                     className='form-input-login'
        //                     required
        //                     type="password"
        //                     placeholder="Password"
        //                     defaultValue="Otto"
        //                 />
        //             </Form.Group>




        //             <Button type="submit" className='login-button'>Submit form</Button>
        //         </Form>
        //     </div>
        // </div>
        <main class="main1">

                <form class='form1'>
                    <h1 class='h1'>Log In</h1>
                    <div class="form-group1">
                        <label class='label'>Email address</label>
                        <div>
                            <input id='input1' type="text" placeholder="Email address" />
                        </div>
                    </div>
                    <div class="form-group1">
                        <label class='label'>Password</label>
                        <div>
                            <input id='input1' type="text" placeholder="Password" />
                        </div>
                       
                    </div>
                    <div>
                        <button class='button1' type="submit">Sign In</button>
                    </div>
                 
                </form>
  
            <div>
       
            </div>
        </main>

    );
}

export default LoginPage;