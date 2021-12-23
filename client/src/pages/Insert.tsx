import { FormEvent, SyntheticEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { input } from '../style/global';

export default function Newmovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [magnet, setMagnet] = useState('');
  const [image, setImage] = useState<File>();
  const { token } = useAuth();

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;
    console.log(file[0]);

    if (!file || file.length === 0) {
      return;
    }
    setImage(file[0]);
  };

  let valid = false;

  async function sendData(event: FormEvent) {
    event.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('releaseDate', releaseDate);
    data.append('magnet', magnet);
    data.append('image', image);

    try {
      await api.post('movies/createmovie', data, config);
      alert('Movie has been added successfully');
    } catch (error) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="newmovie-page">
      <div className="content">
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          encType="multipart/form"
          onSubmit={sendData}
        >
          <input
            style={input}
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style={input}
            type="text"
            name="description"
            value={description}
            required
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            style={input}
            type="date"
            name="release"
            value={releaseDate}
            required
            placeholder="Release Date"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <input
            style={input}
            type="text"
            name="magnet"
            value={magnet}
            required
            placeholder="Magnet"
            onChange={(e) => setMagnet(e.target.value)}
          />
          <input
            style={input}
            required
            type="file"
            onChange={(e: SyntheticEvent) =>
              handleFileUpload(e.currentTarget as HTMLInputElement)
            }
          />
          <div>
            <Button style={{ border: '1px solid #00808053' }} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
