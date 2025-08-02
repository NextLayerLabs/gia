import React from 'react';
import { render, screen } from '@testing-library/react';
import AgentVerificationForm from '../components/AgentVerificationForm';

test('renders verification form inputs', () => {
  render(<AgentVerificationForm user={{ uid: 'test' }} />);
  expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Agency Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/License Number/i)).toBeInTheDocument();
});
