const functions = require('firebase-functions');

/**
 * Basic HTTP Cloud Function that returns a greeting.
 *
 * Firebase deploys functions exported from this file. The previous
 * placeholder left the file empty, which meant no functions were
 * exported and deployments failed. We now export `helloGia` so the
 * project has a working entry point.
 */
exports.helloGia = functions.https.onRequest((req, res) => {
  res.json({ message: 'Hello from Gia!' });
});
