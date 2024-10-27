import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { IPosts, getPosts } from '../api/getPosts';

class PostsStore {
	posts?: IPromiseBasedObservable<IPosts[]>;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPosts = () => {
		this.posts = fromPromise(getPosts());
	};
}

export default new PostsStore();
