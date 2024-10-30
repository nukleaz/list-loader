import { makeAutoObservable, runInAction } from 'mobx';
import { IPost, getPosts } from '../api/getPosts';

class PostsStore {
	posts: IPost[] = [];
	fetching: boolean = false;
	pageNumber: number = 1;
	totalCount: number = 0;
	error: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPosts = async () => {
		try {
			const response = await getPosts(this.pageNumber);
			const newPosts = response.data;

			runInAction(() => {
				this.posts = [...this.posts, ...newPosts];
				this.pageNumber++;
				if (this.totalCount === 0) {
					this.totalCount = parseInt(response.headers['x-total-count']);
				}
			});

			// return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				runInAction(() => {
					this.error = (error as Error).message;
				});
			}
		} finally {
			runInAction(() => {
				this.fetching = false;
			});
		}
	};

	setFetching = (bool: boolean) => {
		this.fetching = bool;
	};

	deletePost = (id: number) => {
		this.posts = this.posts.filter(item => item.id !== id);
	};
}

export default new PostsStore();
