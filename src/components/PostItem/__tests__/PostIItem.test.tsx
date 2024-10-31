import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IPost } from '../../../api/getPosts';
import postsStore from '../../../stores/PostsStore';
import { PostItem } from '../PostItem';

jest.mock('../../../stores/PostsStore.ts', () => ({
	deletePost: jest.fn(),
	setSelectedPost: jest.fn(),
	resetSelectedPost: jest.fn(),
}));

describe('PostItem', () => {
	let mockPost: IPost;

	beforeEach(() => {
		mockPost = {
			id: 1,
			title: 'Post title',
			albumId: 1,
			url: 'https://example.com/post1',
			thumbnailUrl: 'https://example.com/thumbnail1',
		};
		jest.clearAllMocks();
	});

	it('calls deletePost when the "Delete" button is clicked', () => {
		render(<PostItem post={mockPost} />);

		const deleteButton = screen.getByRole('button', { name: /удалить/i });
		expect(deleteButton).toBeInTheDocument();
		fireEvent.click(deleteButton);

		expect(postsStore.deletePost).toHaveBeenCalledWith(mockPost.id);
	});

	it('calls setSelectedPost when the "Edit" button is clicked', () => {
		render(<PostItem post={mockPost} />);

		const editButton = screen.getByRole('button', { name: /редактировать/i });
		expect(editButton).toBeInTheDocument();
		fireEvent.click(editButton);

		expect(postsStore.setSelectedPost).toHaveBeenCalledWith(mockPost);
	});
});
