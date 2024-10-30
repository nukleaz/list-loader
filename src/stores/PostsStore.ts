import { makeAutoObservable, runInAction } from 'mobx';
import { IPost, getPosts } from '../api/getPosts';

class PostsStore {
	posts: IPost[] = [];
	error: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPosts = async (pageNumber: number) => {
		try {
			const response = await getPosts(pageNumber);
			const newPosts = response.data;

			runInAction(() => {
				this.posts = [...this.posts, ...newPosts];
			});

			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				runInAction(() => {
					this.error = (error as Error).message;
				});
			}
		}
	};

	setPosts = (data: any) => {
		this.posts = [...this.posts, ...data];
	};
}

export default new PostsStore();
