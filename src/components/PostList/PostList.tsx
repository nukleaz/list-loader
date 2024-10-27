import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { IPost } from '../../api/getPosts';
import postStore from '../../stores/PostsStore';
import { PostItem } from '../PostItem/PostItem';

export const PostList: React.FC = observer(() => {
	const { posts } = postStore;

	const postsData = posts?.value as IPost[] | undefined;

	return (
		<List
			bordered
			dataSource={postsData}
			renderItem={(post: IPost) => <PostItem post={post} />}
		/>
	);
});
