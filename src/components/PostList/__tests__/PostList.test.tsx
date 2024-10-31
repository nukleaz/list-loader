import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IPost } from '../../../api/getPosts';
import { PostList } from '../PostList';

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		value: jest.fn().mockImplementation(() => ({
			matches: false,
			addListener: jest.fn(),
			removeListener: jest.fn(),
		})),
	});
});

describe('PostList', () => {
	it('renders correctly with passed props', () => {
		const posts: IPost[] = [
			{
				id: 1,
				title: 'Post 1',
				albumId: 1,
				url: 'https://example.com/post1',
				thumbnailUrl: 'https://example.com/thumbnail1',
			},
			{
				id: 2,
				title: 'Post 2',
				albumId: 2,
				url: 'https://example.com/post2',
				thumbnailUrl: 'https://example.com/thumbnail2',
			},
		];
		const { getByText, getAllByRole } = render(<PostList posts={posts} />);
		expect(getByText('Post 1')).toBeInTheDocument();
		expect(getByText('Post 2')).toBeInTheDocument();
		const listItems = getAllByRole('listitem');
		expect(listItems.length).toBe(2);
	});

	it('renders correct number of list items', () => {
		const posts: IPost[] = [
			{
				id: 1,
				title: 'Post 1',
				albumId: 1,
				url: 'https://example.com/post1',
				thumbnailUrl: 'https://example.com/thumbnail1',
			},
			{
				id: 2,
				title: 'Post 2',
				albumId: 2,
				url: 'https://example.com/post2',
				thumbnailUrl: 'https://example.com/thumbnail2',
			},
		];
		const { getAllByRole } = render(<PostList posts={posts} />);
		const listItems = getAllByRole('listitem');
		expect(listItems.length).toBe(posts.length);
	});
});
