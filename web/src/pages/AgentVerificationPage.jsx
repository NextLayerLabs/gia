import React from 'react';
import AgentVerificationForm from '../components/AgentVerificationForm';

const AgentVerificationPage = ({ user }) => (
  <div className="agent-verification-page">
    <h1>Agent Verification</h1>
    <AgentVerificationForm user={user} />
  </div>
);

export default AgentVerificationPage;
