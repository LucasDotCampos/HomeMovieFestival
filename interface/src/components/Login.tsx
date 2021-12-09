import React, { FormEvent, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="w-100 text-center mt-2">Log In</h2>
          {error && (
            <Alert className="h-25" variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="w-100 mb-2"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="w-100 mb-2"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
