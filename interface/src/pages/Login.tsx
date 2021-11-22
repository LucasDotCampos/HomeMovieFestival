import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';

import '../styles/login.scss';

import { Box } from '@chakra-ui/layout';

function Login() {
  return (
    <Center h="100vh" w="100vh">
      <Box>
        <FormControl>
          <Input type="email"></Input>
        </FormControl>
      </Box>
    </Center>
  );
}

export { Login };
