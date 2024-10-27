import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { IPost, getPosts } from '../api/getPosts';

class PostsStore {
	posts?: IPromiseBasedObservable<IPost[]>;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPosts = () => {
		this.posts = fromPromise(getPosts());
	};
}

export default new PostsStore();
