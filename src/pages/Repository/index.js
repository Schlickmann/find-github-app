import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Repository({ route }) {
  return <WebView source={{ uri: route.params.repo }} style={{ flex: 1 }} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }).isRequired,
};
