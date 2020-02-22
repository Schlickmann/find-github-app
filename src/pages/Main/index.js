import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const [newUser, setNewUser] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function retrieveUsers() {
      // AsyncStorage.clear();
      const users = await AsyncStorage.getItem('users');

      if (users) {
        setUsernames(users);
      }
    }

    retrieveUsers();
  }, []);

  useEffect(() => {
    function saveUsers() {
      if (usernames.length) {
        AsyncStorage.setItem('users', JSON.stringify(usernames));
      }
    }

    saveUsers();
  }, [usernames]);

  function handleInpuChange(text) {
    setNewUser(text);
  }

  async function handleSubmit() {
    if (!newUser.trim()) {
      return;
    }

    setIsLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsernames([...usernames, data]);
    setNewUser('');
    setIsLoading(false);

    Keyboard.dismiss();
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add Github User..."
          value={newUser}
          onChangeText={handleInpuChange}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton isLoading={isLoading} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={usernames}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>See Profile</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
