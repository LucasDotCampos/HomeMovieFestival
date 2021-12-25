import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Modal, Alert, Spinner, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../style/dashboard.scss';
import {
  validateFileSize,
  validateFileType,
} from '../services/fileValidatorService';
import FileService from '../services/fileService';

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout, avatar, setAvatar, updatePic } = useAuth();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState<ILista[]>([]);

  const getLastMovies = async () => {};

  useEffect(() => {
    async function getMovies() {
      const response = await api.get('/movies');
      console.log(response);
      setMoviesList(response.data);
      console.log(moviesList);
    }
    getMovies();
  }, []);

  const handleClose = () => {
    setShow(false);
    setFile(null);
    setPreviewURL('');
  };
  const handleShow = () => (setShow(true), setError(''));

  const handleUpdatePic = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const data = new FormData();

    data.append('avatar', file);

    try {
      setLoading(true);
      await updatePic(data);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      try {
        api.get(`/users/${currentUser.id}`, config).then((res) => {
          console.log(res);

          localStorage.setItem(
            'avatar',
            `http://localhost:4000/files/${res.data.avatar}`
          );
        });
      } catch (error) {}
    }, 1000);

    setTimeout(() => {
      setAvatar(localStorage.getItem('avatar'));
    }, 1000);

    console.log(avatar);

    handleClose();
    handleShow();

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    setAvatar(localStorage.getItem('avatar'));
  }, [localStorage.getItem('avatar')]);

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
    const fileURL = URL.createObjectURL(file[0]);
    setPreviewURL(fileURL);
  };

  return (
    <>
      <div style={{ width: '100vw', height: '99vh' }}>
        <Card>
          <Card.Body>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  id="preview-box"
                  style={{
                    backgroundImage: `url(${avatar})`,
                    marginRight: '16px',
                  }}
                >
                  <img
                    id="preview-image"
                    style={{ cursor: 'pointer' }}
                    onClick={handleShow}
                    src={avatar}
                    alt=""
                  />
                </div>
                <h3>{currentUser.name}</h3>
              </div>
              <Link
                to="/update-profile"
                className="btn btn-primary"
                id="update"
              >
                Update Profile
              </Link>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h4>Movies</h4>
                <Link style={{ textDecoration: 'none' }} to="/newmovie">
                  Add a new movie
                </Link>
              </p>
            </Card.Title>
            <div style={{ display: 'flex' }}>
              <div>
                {moviesList.slice(0, 5).map((moviesList) => (
                  <Card
                    key={moviesList.id}
                    className="movie p-4"
                    style={{ display: 'flex' }}
                  >
                    <Card.Img
                      id="img"
                      variant="left"
                      src={`http://localhost:4000/files/${moviesList.image}`}
                    ></Card.Img>
                    <Card.Body className="info">
                      <Card.Text className="title" id="title">
                        {moviesList.title}
                      </Card.Text>
                      <Card.Text>{moviesList.description}</Card.Text>
                      <Card.Text>{moviesList.magnet}</Card.Text>
                      <Card.Text>
                        releaseDate: {moviesList.releaseDate.substring(0, 10)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button
            style={{ textDecoration: 'none' }}
            variant="link"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
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
              {!loading ? (
                <>
                  <p>Preview</p>
                  <div
                    style={{ backgroundImage: `url(${previewURL})` }}
                    id="preview-box"
                  >
                    <img id="preview-image" src={previewURL} alt="" />
                  </div>
                </>
              ) : (
                <>
                  <p>Loading</p>
                  <Spinner
                    id="preview-box"
                    style={{
                      backgroundImage: `url(https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png)`,
                      height: '200px',
                      width: '200px',
                    }}
                    animation="border"
                  />
                </>
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
        </div>
      </div>
    </>
  );
}
