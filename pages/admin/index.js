import styles from './Admin.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {sha3_512} from 'js-sha3';

import { signIn, signOut, useSession } from 'next-auth/client'

import { useState } from 'react';

export default function Admin() {
    const [ session, loading ] = useSession()

    const [validated, setValidated] = useState(false);
    const [data, setData] = useState(null)
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const Email = sha3_512(event.target.formBasicEmail.value)
        const Password = sha3_512(event.target.formBasicPassword.value)
        const toSend = {
            Email: Email,
            Password: Password
        }
        setData(toSend)
        console.log(toSend)
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toSend)
        }
        const url = `http://${window.location.host}/api/admin/login`
        alert(url)
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        event.stopPropagation();


        setValidated(true);
    };
    return (
        <main>
            <center>
                <h3>login</h3>
            </center>
            <div className={styles.centerForm}>
            {!session && <>
                Not signed in <br/>
                <button onClick={() => signIn()}>Sign in</button>
                </>}
                {session && <>
                Signed in as {session.user.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </main>
    )
}