import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Simple component', () => {
	it('renders correctly', () => {
		const { getByText } = render(<div>Hello World!</div>);
		expect(getByText('Hello World!')).toBeInTheDocument();
	});
});
