import { notification } from 'antd';

export function config() {
    return {
        onError(err) {
            err.preventDefault();
            notification.error({
                message: `请求错误`,
                description: err.message,
            });
        },
    };
};