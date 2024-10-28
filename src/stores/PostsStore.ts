import { makeAutoObservable, runInAction } from 'mobx';
import { IPost, getPosts } from '../api/getPosts';

class PostsStore {
	posts: IPost[] = [];
	pageNumber: number = 1;
	fetching: boolean = true;
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
				this.pageNumber += 1;
				this.totalCount = response.headers['x-total-count'];
			});
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
}

export default new PostsStore();
