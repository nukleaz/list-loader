import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PostList } from './components/PostList/PostList';
import postsStore from './stores/PostsStore';

export const App: React.FC = observer(() => {
	const { posts, fetchPosts } = postsStore;
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [fetching, setFetching] = useState<boolean>(false);
	const [totalCount, setTotalCount] = useState<number>(0);

	useEffect(() => {
		setFetching(true);
	}, []);

	useEffect(() => {
		if (fetching) {
			fetchPosts(pageNumber)
				.then(response => {
					setPageNumber(prevNum => prevNum + 1);
					setTotalCount(response?.headers['x-total-count']);
				})
				.finally(() => setFetching(false));
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [totalCount, posts]);

	const handleScroll = (e: Event) => {
		const target = e.target as Document;
		if (
			target.documentElement.scrollHeight -
				(target.documentElement.scrollTop + window.innerHeight) <
				150 &&
			posts.length < totalCount
		) {
			setFetching(true);
		}
	};

	return <PostList />;
});
