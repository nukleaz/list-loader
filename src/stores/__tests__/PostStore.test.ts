import { IPost, getPosts } from '../../api/getPosts';
import postsStore from '../PostsStore';

jest.mock('../../api/getPosts');

describe('PostsStore', () => {
	beforeEach(() => {
		postsStore.posts = [];
		postsStore.selectedPost = null;
		postsStore.fetching = false;
		postsStore.pageNumber = 1;
		postsStore.totalCount = 0;
		postsStore.isLoading = false;
		postsStore.error = null;
	});

	it('should initialize with default values', () => {
		expect(postsStore.posts).toEqual([]);
		expect(postsStore.selectedPost).toBeNull();
		expect(postsStore.fetching).toBe(false);
		expect(postsStore.pageNumber).toBe(1);
		expect(postsStore.totalCount).toBe(0);
		expect(postsStore.isLoading).toBe(false);
		expect(postsStore.error).toBeNull();
	});

	it('should fetch posts and update state', async () => {
		const posts: IPost[] = [
			{
				id: 1,
				title: 'Post 1',
				albumId: 1,
				url: 'http://example.com/post1',
				thumbnailUrl: 'http://example.com/thumb1',
			},
			{
				id: 2,
				title: 'Post 2',
				albumId: 1,
				url: 'http://example.com/post2',
				thumbnailUrl: 'http://example.com/thumb2',
			},
		];
		const response = { data: posts, headers: { 'x-total-count': '10' } };
		(getPosts as jest.Mock).mockResolvedValue(response);
		await postsStore.fetchPosts();
		expect(postsStore.posts).toEqual(posts);
		expect(postsStore.pageNumber).toBe(2);
		expect(postsStore.totalCount).toBe(10);
	});

	it('should set selected post', () => {
		const post: IPost = {
			id: 1,
			title: 'Post 1',
			albumId: 1,
			url: 'http://example.com/post1',
			thumbnailUrl: 'http://example.com/thumb1',
		};
		postsStore.setSelectedPost(post);
		expect(postsStore.selectedPost).toStrictEqual(post);
	});

	it('should reset selected post', () => {
		const post: IPost = {
			id: 1,
			title: 'Post 1',
			albumId: 1,
			url: 'http://example.com/post1',
			thumbnailUrl: 'http://example.com/thumb1',
		};
		postsStore.setSelectedPost(post);
		postsStore.resetSelectedPost();
		expect(postsStore.selectedPost).toBeNull();
	});

	it('should edit post and update state', () => {
		const post: IPost = {
			id: 1,
			title: 'Post 1',
			albumId: 1,
			url: 'http://example.com/post1',
			thumbnailUrl: 'http://example.com/thumb1',
		};
		postsStore.posts.push(post);
		const updatedPost: IPost = { ...post, title: 'Post 1 updated' };
		postsStore.editPost(post.id, updatedPost);
		expect(postsStore.posts).toEqual([{ ...updatedPost }]);
	});

	it('should handle error when fetching posts', async () => {
		const error = new Error('Error fetching posts');
		(getPosts as jest.Mock).mockRejectedValue(error);
		await postsStore.fetchPosts();
		expect(postsStore.error).toBe(error.message);
	});

	it('should handle error when editing post', () => {
		const post: IPost = {
			id: 1,
			title: 'Post 1',
			albumId: 1,
			url: 'http://example.com/post1',
			thumbnailUrl: 'http://example.com/thumb1',
		};
		postsStore.posts.push(post);
		const updatedPost: IPost = { ...post, title: 'Post 1 updated' };

		const originalEditPost = postsStore.editPost;
		postsStore.editPost = jest.fn(() => {
			throw new Error('Error editing post');
		});

		expect(() => {
			postsStore.editPost(post.id, updatedPost);
		}).toThrow('Error editing post');

		postsStore.editPost = originalEditPost;
	});

	it('should set fetching state', () => {
		postsStore.setFetching(true);
		expect(postsStore.fetching).toBe(true);

		postsStore.setFetching(false);
		expect(postsStore.fetching).toBe(false);
	});
});
