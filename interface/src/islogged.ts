let isLogged: boolean = false;

function login() {
  isLogged = true;
  console.log(isLogged);
  return isLogged;
}

function logout() {
  isLogged = false;
  console.log(isLogged);

  return isLogged;
}

export { login, logout, isLogged };
