import React from 'react';
import { View, Text } from 'react-native';
import AgentVerificationForm from '../components/AgentVerificationForm';

const AgentVerificationScreen = ({ user }) => (
  <View>
    <Text style={{ fontSize: 24, marginBottom: 16 }}>Agent Verification</Text>
    <AgentVerificationForm user={user} />
  </View>
);

export default AgentVerificationScreen;
