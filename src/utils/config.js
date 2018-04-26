export default {
    name: '员工餐费管理系统',
    prefix: 'rms',
    footerText: 'rms  © 2018 Lin LingXiao',
    CORS: [],
    openPages: ['/login'],
    logo: '../../assets/logo.png',
    api: {
        user: {
            userList: '/ajax/userList',
            user: '/ajax/user',
            login: '/ajax/user/login',
            loginNameList: '/ajax/user/loginNameList'
        },
        consume: {
            dealHistory: '/ajax/dealHistory',
            statistical: '/ajax/dailyStatistical'
        }

    },
}