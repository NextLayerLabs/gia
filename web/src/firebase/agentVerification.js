import { getFirestore, doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const saveAgentVerification = async (uid, data, file) => {
  const db = getFirestore();
  const storage = getStorage();
  let fileUrl = null;

  if (file) {
    const storageRef = ref(storage, `agentVerifications/${uid}/${file.name}`);
    await uploadBytes(storageRef, file);
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
