import React, { SyntheticEvent, useState } from 'react';
import { Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../style/dashboard.scss';
import {
  validateFileSize,
  validateFileType,
} from '../services/fileValidatorService';
import FileService from '../services/fileService';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, isLogged, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => (setShow(true), setError(''));
  const navigate = useNavigate();
  const [profPic, setProfPic] = useState();
  const [img, setImg] = useState<any>();

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

  const [uploadFormError, setUploadFormError] = useState<string>('');

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;

    if (!file || file.length === 0) {
      setUploadFormError('');
      return;
    }

    console.log(file[0].name);

    const validFileSize = await validateFileSize(file[0].size);
    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0].name)
    );

    if (!validFileSize.isValid) {
      setUploadFormError(validFileSize.errorMessage);
    }
    if (!validFileType.isValid) {
      setUploadFormError(validFileType.errorMessage);
    }
    if (uploadFormError && validFileSize.isValid) {
      setUploadFormError('');
    }
    if (uploadFormError && validFileType.isValid) {
      setUploadFormError('');
    }
    setProfPic(file[0]); // * I have to learn how to render file images
    setImg(file[0].name);
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
          {profPic && (
            <img
              className="pic"
              src={profPic}
              alt={setImg}
              onClick={handleShow}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div>
            {uploadFormError && <p>{uploadFormError}</p>}
            <div>
              <input
                type="file"
                onChange={(e: SyntheticEvent) =>
                  handleFileUpload(e.currentTarget as HTMLInputElement)
                }
              />
            </div>
          </div>
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
