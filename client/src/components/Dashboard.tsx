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
import Nav from './Navbar';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout, avatar, setAvatar, updatePic } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => (setShow(true), setError(''));
  const navigate = useNavigate();
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleUpdatePic = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const data = new FormData();

    data.append('avatar', file);

    try {
      await api.patch('users/avatar', data, config);
    } catch (error) {
      console.log(error);
    }
    setAvatar(previewURL);
    handleClose();
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
      setFile(null);
      setPreviewURL('');
      return;
    }

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

    setFile(file[0]);
    const a = URL.createObjectURL(file[0]);
    setPreviewURL(a);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Nav />
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
          <div
            style={{ backgroundImage: `url(${previewURL})` }}
            id="preview-box"
          >
            <img id="preview-image" src={previewURL} alt="" />
          </div>
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
          <Button
            onClick={handleUpdatePic}
            disabled={!file}
            type="submit"
            variant="primary"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <img
        style={{ border: '1px solid black' }}
        className="pic"
        src={avatar}
        alt=""
        onClick={handleShow}
      />
      <strong>{currentUser.name}</strong>
      <p>Email: {currentUser.email}</p>
      <Button onClick={handleLogOut}>Log Out</Button>
      <p>{error}</p>
    </div>
  );
}
