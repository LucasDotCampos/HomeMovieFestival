import { FormEvent, SyntheticEvent, useState } from 'react';
import { api } from '../services/api';
import { Nav } from '../components/nav';
import { Input } from '@chakra-ui/input';
import { Button, Center } from '@chakra-ui/react';

export function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [pirate, setPirate] = useState('');
  const [magnet, setMagnet] = useState('');
  const [image, setImage] = useState<File>();

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;
    console.log(file[0]);

    if (!file || file.length === 0) {
      return;
    }
    setImage(file[0]);
  };

  let valid = false;

  function validateData() {
    if (title == '') {
      alert('Title is required');
    } else if (description == '') {
      alert('Description is required');
    } else if (releaseDate == '') {
      alert('Release date is required');
    } else if (pirate == '') {
      alert('Pirate name is required');
    } else if (magnet == '') {
      alert('Magnet is required');
    } else {
      valid = true;
    }
  }

  async function sendData(event: FormEvent) {
    event.preventDefault();

    validateData();

    if (valid) {
      const data = new FormData();

      data.append('title', title);
      data.append('description', description);
      data.append('releaseDate', releaseDate);
      data.append('pirate', pirate);
      data.append('magnet', magnet);
      data.append('image', image);

      try {
        await api.post('newmovie', data);
        alert('Movie has been added successfully');
      } catch (error) {
        alert('Erro no cadastro, tente novamente');
      }
    }
  }

  const styles = {
    input: {
      border: '1px solid #005c5c73',
      borderRadius: '0.4rem',
      margin: '4px',
      width: '80vw',
    },
  };

  return (
    <div className="newmovie-page">
      <div className="nav">
        <Nav />
      </div>
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
          <Input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            style={styles.input}
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            style={styles.input}
            type="date"
            name="release"
            value={releaseDate}
            placeholder="Release Date"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <Input
            style={styles.input}
            type="text"
            name="pirate"
            value={pirate}
            placeholder="Username"
            onChange={(e) => setPirate(e.target.value)}
          />
          <Input
            style={styles.input}
            type="text"
            name="magnet"
            value={magnet}
            placeholder="Magnet"
            onChange={(e) => setMagnet(e.target.value)}
          />
          <Input
            style={styles.input}
            type="file"
            onChange={(e: SyntheticEvent) =>
              handleFileUpload(e.currentTarget as HTMLInputElement)
            }
          />
          <Center>
            <Button style={{ border: '1px solid #00808053' }} type="submit">
              Submit
            </Button>
          </Center>
        </form>
      </div>
    </div>
  );
}
