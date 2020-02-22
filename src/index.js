import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';

import './config/ReactotronConfig';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C749C" />
      <Routes />
    </>
  );
}

export default App;
