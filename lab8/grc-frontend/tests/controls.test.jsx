import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMockResource } from '../src/api/mockStore';
import ControlList from '../src/features/controls/components/ControlList';

describe('mock resource CRUD', () => {
  it('creates, updates and deletes records', async () => {
    const api = createMockResource('test', []);
    const created = await api.create({ name: 'A' });
    expect(await api.list()).toHaveLength(1);
    await api.update(created.id, { name: 'B' });
    expect((await api.get(created.id)).name).toBe('B');
    await api.remove(created.id);
    expect(await api.list()).toHaveLength(0);
  });
});

describe('ControlList', () => {
  it('renders test result text, not just colour', () => {
    render(<MemoryRouter><ControlList controls={[{ id: '1', name: 'Access review', testResult: 'Fail' }]} /></MemoryRouter>);
    expect(screen.getByText('Fail')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Access review' })).toHaveAttribute('href', '/controls/1');
  });
});
