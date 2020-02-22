import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  /**
   * When running it on usb.
   * configure({
   *  host: 192.168.0.14
   * })
   */
  const tron = Reactotron.configure({
    host: '192.168.0.14',
  })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
