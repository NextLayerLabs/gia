import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import styles from '../styles/AgentVerificationForm';
import * as DocumentPicker from 'expo-document-picker';
import { saveAgentVerification, watchAgentVerification } from '../firebase/agentVerification';

const AgentVerificationForm = ({ user }) => {
  const [fullName, setFullName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (!user) return;
    const unsub = watchAgentVerification(user.uid, (doc) => {
      if (doc.exists()) {
        setStatus(doc.data().status || 'Pending');
      }
    });
    return unsub;
  }, [user]);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    await saveAgentVerification(user.uid, { fullName, agencyName, licenseNumber }, file);
    setFullName('');
    setAgencyName('');
    setLicenseNumber('');
    setFile(null);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Agency Name" value={agencyName} onChangeText={setAgencyName} style={styles.input} />
      <TextInput placeholder="License Number" value={licenseNumber} onChangeText={setLicenseNumber} style={styles.input} />
      <Button title={file ? 'Document Selected' : 'Pick Document'} onPress={pickDocument} />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.status}>Status: {status}</Text>
    </View>
  );
};

export default AgentVerificationForm;
