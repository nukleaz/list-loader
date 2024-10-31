import { Spin } from 'antd';
import style from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={style.wrap}>
			<Spin size='large' />
		</div>
	);
};
