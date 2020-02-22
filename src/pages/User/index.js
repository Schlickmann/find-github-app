import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation, route }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStarts] = useState([]);

  const { user } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: user.name });
    loadUsersInfo();
  }, []);

  async function loadUsersInfo() {
    setIsLoading(true);
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    console.tron.log(response.data[0]); // html_url

    setStarts([...stars, ...response.data]);
    setPage(page + 1);
    setIsLoading(false);
  }

  function handleListEndReached() {
    if (stars.length < 30) {
      return;
    }

    loadUsersInfo();
  }

  function handleRefreshList() {
    setPage(1);

    loadUsersInfo();
  }

  function handleNavigate(repo) {
    navigation.navigate('Repository', { repo });
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => handleNavigate(item.html_url)}
          >
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          </TouchableWithoutFeedback>
        )}
        onEndReachedThreshold={0.2}
        onEndReached={handleListEndReached}
        onRefresh={handleRefreshList}
        refreshing={isLoading}
      />
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        login: PropTypes.string,
        avatar: PropTypes.string,
        bio: PropTypes.string,
      }),
    }),
  }).isRequired,
};
