import React, {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  validateFileSize,
  validateFileType,
} from "../services/fileValidatorService";
import FileService from "../services/fileService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { isNullishCoalesce } from "typescript";
import { MdLocalDining } from "react-icons/md";

export const UpdateProfile = () => {
  //* =========== User===========

  const { currentUser, logout, avatar, setAvatar, updatePic, isLogged } =
    useAuth();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  //* =========== useState ===========

  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadFormError, setUploadFormError] = useState<string>("");

  //* =========== useRef ===========

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const oldPasswordRef = useRef<any>(null);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const navigate = useNavigate();

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [localStorage.getItem("avatar")]);

  //* =========== Functions ===========

  const { handleLogOut } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/${userId}`, config);
      console.log("account deleted");
      navigate("/");
      handleLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.put("/");
    } catch (err) {
      console.log(err);
    }

    return;
  };

  const handleUpdatePic = async () => {
    const data = new FormData();

    data.append("avatar", file);

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
            "avatar",
            `http://localhost:4000/files/${res.data.avatar}`
          );
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    setTimeout(() => {
      setAvatar(localStorage.getItem("avatar"));
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

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;

    if (!file || file.length === 0) {
      setUploadFormError("");
      setFile(null);
      setPreviewURL("");
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
      setUploadFormError("");
    }
    if (uploadFormError && validFileType.isValid) {
      setUploadFormError("");
    }

    setFile(file[0]);
    const fileURL = URL.createObjectURL(file[0]);
    setPreviewURL(fileURL);
  };

  const handleClose = () => {
    setShow(false);
    setFile(null);
    setPreviewURL("");
  };
  const handleShow = () => (setShow(true), setError(""));

  //* =========== Style ===========

  const style = {
    button: {
      width: "100%",
      marginBottom: "16px",
    },
    input: {
      width: "100%",
    },
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "200px",
        maxWidth: "500px",
      }}
    >
      <div
        id="preview-box"
        style={{
          backgroundImage: `url(${avatar})`,
          marginBottom: "8px",
        }}
      >
        <img
          id="preview-image"
          style={{ cursor: "pointer" }}
          onClick={handleShow}
          src={avatar}
          alt=""
        />
      </div>
      <Form onSubmit={handleUpdateProfile} style={style.input}>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl ref={emailRef} required type="email" />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl ref={passwordRef} type="password" />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>Old Password</FormLabel>
          <FormControl ref={oldPasswordRef} type="password" />
        </FormGroup>
        <br />
        {error && (
          <Alert
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
              paddingTop: "30px",
            }}
            variant="danger"
          >
            <p>{error}</p>
          </Alert>
        )}
        <Button disabled={loading} style={style.button} type="submit">
          Save Changes
        </Button>
        <Button
          className="bottom"
          variant="danger"
          type="submit"
          style={style.button}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change your profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="input-group" style={{ width: "100%" }} />
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
                    backgroundImage: `url(https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1)`,
                    height: "150px",
                    width: "150px",
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
    </Container>
  );
};
