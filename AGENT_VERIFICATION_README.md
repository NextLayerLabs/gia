# Agent Verification Form Scaffold

This scaffold adds an Agent Verification module for the GIA Travel App across web, mobile and Firebase Functions.

## Features
- Upload PDF or image credentials
- Inputs: Full Name, Agency Name, License Number
- Data stored in Firestore collection `agent_verifications`
- Status tracking: `Pending | Verified | Rejected`
- Firebase Authentication required

## Usage
### Web
- `web/src/components/AgentVerificationForm.jsx` renders the form.
- `web/src/pages/AgentVerificationPage.jsx` can be used as a route.
- `web/src/firebase/agentVerification.js` contains Firestore helpers.

### Mobile
- `mobile/src/components/AgentVerificationForm.js` renders the form for React Native.
- `mobile/src/screens/AgentVerificationScreen.js` provides a screen wrapper.
- `mobile/src/firebase/agentVerification.js` contains Firestore helpers.

### Firebase Function
- `firebase/functions/agentVerification.js` exposes a callable function `verifyAgent` writing to Firestore.

## Example Firestore Structure
```
agent_verifications (collection)
  └── {uid} (document)
        fullName: string
        agencyName: string
        licenseNumber: string
        fileUrl: string | null
        status: 'Pending' | 'Verified' | 'Rejected'
        createdAt: timestamp
```

## Running Tests
`npm test` (no tests are configured yet; placeholder included).
