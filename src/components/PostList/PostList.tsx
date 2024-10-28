import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { IPost } from '../../api/getPosts';
import postStore from '../../stores/PostsStore';
import { PostItem } from '../PostItem/PostItem';

export const PostList: React.FC = observer(() => {
	const { posts } = postStore;

	return (
		<List
			bordered
			dataSource={posts}
			renderItem={(post: IPost) => <PostItem post={post} />}
		/>
	);
});
