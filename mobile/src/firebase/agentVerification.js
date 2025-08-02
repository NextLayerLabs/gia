import { getFirestore, doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

export const saveAgentVerification = async (uid, data, file) => {
  const db = getFirestore();
  const storage = getStorage();
  let fileUrl = null;

  if (file) {
    const response = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.Base64 });
    const storageRef = ref(storage, `agentVerifications/${uid}/${file.name}`);
    const blob = Buffer.from(response, 'base64');
    await uploadBytesResumable(storageRef, blob);
    fileUrl = await getDownloadURL(storageRef);
  }

  const docRef = doc(db, 'agent_verifications', uid);
  await setDoc(docRef, { ...data, fileUrl, status: 'Pending', createdAt: serverTimestamp() });
};

export const watchAgentVerification = (uid, callback) => {
  const db = getFirestore();
  const docRef = doc(db, 'agent_verifications', uid);
  return onSnapshot(docRef, callback);
};
