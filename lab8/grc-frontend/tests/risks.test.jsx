import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RiskForm from '../src/features/risks/components/RiskForm';
import { riskScore, scoreLevel } from '../src/features/risks/riskConstants';

describe('risk scoring', () => {
  it('multiplies likelihood by impact', () => {
    expect(riskScore({ likelihood: 4, impact: 5 })).toBe(20);
    expect(scoreLevel(20)).toBe('Critical');
    expect(scoreLevel(2)).toBe('Low');
  });
});

describe('RiskForm', () => {
  it('shows accessible errors for required fields and does not submit', async () => {
    const onSubmit = vi.fn();
    render(<MemoryRouter><RiskForm onSubmit={onSubmit} /></MemoryRouter>);
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
    expect(screen.getByLabelText(/^Title/)).toHaveAttribute('aria-invalid', 'true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('updates the live score as values change', async () => {
    render(<MemoryRouter><RiskForm onSubmit={vi.fn()} /></MemoryRouter>);
    const impact = screen.getByLabelText(/Impact/);
    await userEvent.clear(impact);
    await userEvent.type(impact, '5');
    expect(screen.getByRole('status')).toHaveTextContent('Risk score: 5');
  });
});
