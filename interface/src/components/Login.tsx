import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';

import '../styles/login.scss';
import { Box } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const data = new FormData();

    data.append('email', email);
    data.append('password', password);

    try {
      const response = await api.post('authentication', data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      navigate('/newmovie');
      console.log(data);
    } catch (err) {
      alert('fez merda, mano');
    }
  }

  return (
    <Center h="100vh" w="100%">
      <Box w="300px">
        <FormControl id="form">
          <Input
            mb={4}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Center>
            <Button
              onClick={handleLogin}
              colorScheme="teal"
              mt={8}
              type="submit"
            >
              Login
            </Button>
          </Center>
        </FormControl>
      </Box>
    </Center>
  );
}

export { Login };
