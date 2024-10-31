import { Button, List } from 'antd';
import { FC, memo, useState } from 'react';
import { IPost } from '../../api/getPosts';
import postStore from '../../stores/PostsStore';
import { EditPostForm } from '../EditPostForm/EditPostForm';

interface PostItemProps {
	post: IPost;
}

export const PostItem: FC<PostItemProps> = memo(({ post }) => {
	const { deletePost, setSelectedPost } = postStore;
	const [isEditing, setIsEditing] = useState(false);

	const handleDeletePost = () => {
		deletePost(post.id);
	};

	const handleEditPost = () => {
		setSelectedPost(post);
		setIsEditing(true);
	};

	return (
		<List.Item>
			{isEditing ? (
				<EditPostForm onCancel={() => setIsEditing(false)} />
			) : (
				<>
					<div>
						<span>Альбом: {post.albumId}</span>
						<span>№ {post.id}</span>
					</div>
					<h2>{post.title}</h2>
					<img src={post.thumbnailUrl} alt='image' />
					<Button type='primary' onClick={handleEditPost}>
						Редактировать
					</Button>
					<Button danger onClick={handleDeletePost}>
						Удалить
					</Button>
				</>
			)}
		</List.Item>
	);
});
