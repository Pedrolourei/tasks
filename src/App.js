import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Auth from './components/Auth';
import Tasks from './components/Tasks';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [route, setRoute] = useState('login');

  return (
    <>
      <Auth>
        {route === 'login' && <Login onLogin={() => setRoute('tasks')} />}
        {route === 'tasks' && <Tasks />}
        {route === 'register' && <Register />}
      </Auth>
      <Auth>
        <Register />
      </Auth>
    </>
  );


};
export default App;
