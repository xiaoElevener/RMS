import { notification } from 'antd';

export function config() {
    return {
        onError(err) {
            console.log(err);
            err.preventDefault();
            notification.error({
                message: `请求错误`,
                description: err.message,
            });
        },
    };
};