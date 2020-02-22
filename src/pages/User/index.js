import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// import { Container } from './styles';

export default function User({ navigation, route }) {
  console.tron.log(route.params);
  return <View />;
}

User.propTypes = {
  navigation: PropTypes.shape({
    // navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({}),
    }),
  }).isRequired,
};
