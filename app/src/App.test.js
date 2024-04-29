import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders App', () => {
    let dom = render(
          <App />
    );
    let rootElement = dom.queryAllByTestId("root");
    expect(rootElement).toBeTruthy();
  });
});
