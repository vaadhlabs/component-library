import React from 'react';
import { render, screen } from '@testing-library/react';
import FormSection from '../src/components/forms/FormSection';

describe('FormSection', () => {
  it('renders title and description', () => {
    render(<FormSection title="Contact Us" description="Fill out the form" fields={[]} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Fill out the form')).toBeInTheDocument();
  });

  it('renders a form with default submit label', () => {
    const { container } = render(<FormSection fields={[]} />);
    expect(container.querySelector('form')).toBeTruthy();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('uses custom submit button text', () => {
    render(<FormSection submitButtonText="Send Message" fields={[]} />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders one field control per Strapi field', () => {
    const fields = [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'name', type: 'text', label: 'Name' },
    ];
    render(<FormSection fields={fields} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
