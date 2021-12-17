import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setError('');

    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {currentUser.name}</p>
      <p>Email: {currentUser && currentUser.email}</p>
      <Button onClick={handleLogOut}>Log Out</Button>
      <p>{error}</p>
    </div>
  );
}
