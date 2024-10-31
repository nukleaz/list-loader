import { makeAutoObservable, runInAction } from 'mobx';
import { IPost, getPosts } from '../api/getPosts';

class PostsStore {
	posts: IPost[] = [];
	selectedPost: IPost | null = null;
	fetching: boolean = false;
	pageNumber: number = 1;
	totalCount: number = 0;
	isLoading: boolean = false;
	error: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPosts = async () => {
		try {
			this.isLoading = true;
			const response = await getPosts(this.pageNumber);
			const newPosts = response.data;

			runInAction(() => {
				this.posts = [...this.posts, ...newPosts];
				this.pageNumber++;
				if (this.totalCount === 0) {
					this.totalCount = parseInt(response.headers['x-total-count']);
				}
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				runInAction(() => {
					this.error = (error as Error).message;
				});
			}
		} finally {
			runInAction(() => {
				this.isLoading = false;
				this.fetching = false;
			});
		}
	};

	setFetching = (bool: boolean) => {
		this.fetching = bool;
	};

	setSelectedPost = (post: IPost) => {
		this.selectedPost = post;
	};

	resetSelectedPost = () => {
		this.selectedPost = null;
	};

	editPost = (id: number, updatedPost: IPost) => {
		const index = this.posts.findIndex(post => post.id === id);
		if (index !== -1) {
			this.posts = [
				...this.posts.slice(0, index),
				{ ...this.posts[index], ...updatedPost },
				...this.posts.slice(index + 1),
			];
		}
	};

	deletePost = (id: number) => {
		this.posts = this.posts.filter(item => item.id !== id);
		if (this.posts.length < 5) {
			this.fetching = true;
		}
	};
}

export default new PostsStore();
