const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.verifyAgent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  const { fullName, agencyName, licenseNumber, fileUrl } = data;
  await admin.firestore().collection('agent_verifications').doc(context.auth.uid).set({
    fullName,
    agencyName,
    licenseNumber,
    fileUrl: fileUrl || null,
    status: 'Pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
  return { success: true };
});
