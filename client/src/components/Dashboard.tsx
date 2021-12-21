import React, { SyntheticEvent, useState } from 'react';
import { Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../style/dashboard.scss';
import FileUpload from './FileUpload';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, isLogged, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => (setShow(true), setError(''));
  const navigate = useNavigate();
  const image = currentUser.avatar;
  const [profPic, setProfPic] = useState(image);

  const handlePicChange = async () => {
    try {
      await api.post('/users/updatepicture', profPic);
    } catch (error) {
      console.log(error);
      setError('Failed to change profile picture');
    }
  };

  const handleLogOut = async () => {
    setError('');

    try {
      await logout();
    } catch (error) {
      setError('Failed to log out');
    }
    navigate('/');
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="input-group" style={{ width: '100%' }} />
          Preview
          <img
            className="pic"
            src={profPic}
            alt="profile-picture"
            onClick={handleShow}
          />
        </Modal.Body>
        <Modal.Footer>
          <FileUpload />
          {error && (
            <Alert className="h-25" variant="danger">
              {error}
            </Alert>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handlePicChange}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <img
        className="pic"
        src={currentUser && currentUser.avatar}
        alt=""
        onClick={handleShow}
      />
      <strong>{currentUser.name}</strong>
      <p>Email: {currentUser && currentUser.email}</p>
      <Button onClick={handleLogOut}>Log Out</Button>
      <p>{error}</p>
    </div>
  );
}
