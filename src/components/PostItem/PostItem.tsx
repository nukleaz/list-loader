import { Button, List } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPost } from '../../api/getPosts';
import postStore from '../../stores/PostsStore';

interface PostItemProps {
	post: IPost;
}

export const PostItem: FC<PostItemProps> = observer(({ post }) => {
	const { deletePost } = postStore;
	const handleDeletePost = () => {
		deletePost(post.id);
	};

	return (
		<List.Item>
			<div>
				<span>Альбом: {post.albumId}</span>
				<span>№ {post.id}</span>
			</div>
			<h2>{post.title}</h2>
			<img src={post.thumbnailUrl} alt='image' />
			<Button type='primary'>Редактировать</Button>
			<Button danger onClick={handleDeletePost}>
				Удалить
			</Button>
		</List.Item>
	);
});
