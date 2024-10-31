import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IPost } from '../../../api/getPosts';
import postsStore from '../../../stores/PostsStore';
import { PostItem } from '../PostItem';

// Мокаем весь postsStore
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
			title: 'Заголовок поста',
			albumId: 1,
			url: 'https://example.com/post1',
			thumbnailUrl: 'https://example.com/thumbnail1',
		};
		jest.clearAllMocks(); // Очищаем моки перед каждым тестом
	});

	it('вызывает deletePost при нажатии кнопки "Удалить"', () => {
		render(<PostItem post={mockPost} />);

		const deleteButton = screen.getByRole('button', { name: /удалить/i });
		expect(deleteButton).toBeInTheDocument();
		fireEvent.click(deleteButton);

		expect(postsStore.deletePost).toHaveBeenCalledWith(mockPost.id);
	});

	it('вызывает setSelectedPost при нажатии кнопки "Редактировать"', () => {
		render(<PostItem post={mockPost} />);

		const editButton = screen.getByRole('button', { name: /редактировать/i });
		expect(editButton).toBeInTheDocument();
		fireEvent.click(editButton);

		expect(postsStore.setSelectedPost).toHaveBeenCalledWith(mockPost);
	});
});
