import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { IPost } from '../../api/getPosts';
import postStore from '../../stores/PostsStore';

export const PostList: React.FC = observer(() => {
	const { posts } = postStore;

	const postsData = posts?.value as IPost[] | undefined;

	return (
		<List
			bordered
			dataSource={postsData}
			renderItem={post => <List.Item key={post.id}>{post.title}</List.Item>}
		/>
	);
});
