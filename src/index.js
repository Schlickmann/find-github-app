import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Routes from './routes';

import './config/ReactotronConfig';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C749C" />
      <Routes />
    </>
  );
}

export default App;
