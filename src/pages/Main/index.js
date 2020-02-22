import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
  const [newUser, setNewUser] = useState('');
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {}, []);

  function handleInpuChange(text) {
    setNewUser(text);
  }

  async function handleSubmit() {
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsernames([...usernames, data]);
    setNewUser('');

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
        <SubmitButton onPress={handleSubmit}>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
