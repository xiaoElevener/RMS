const PREFIX = '/weather';
export default {
    name: '员工餐费管理系统',
    prefix: 'weather',
    footerText: 'rms  © 2018 Lin LingXiao',
    CORS: [],
    openPages: ['/login'],
    logo: '../../assets/logo.png',
    api: {
        user: {
            userList: PREFIX + '/ajax/userList',
            user: PREFIX + '/ajax/user',
            login: PREFIX + '/ajax/user/login',
            loginNameList: PREFIX + '/ajax/user/loginNameList'
        },
        dealHistory: {
            dealHistory: PREFIX + '/ajax/dealHistory',
            statistical: PREFIX + '/ajax/dailyStatistical',
            dealHistoryList: PREFIX + '/ajax/dealHistoryList'
        },
        messageBoard: {
            messageBoardList: PREFIX + '/ajax/messageList'
        },
        predefinedCode: {
            predefinedCodeList: PREFIX + '/ajax/predefinedCodeList',
            predefinedCode: PREFIX + '/ajax/predefinedCode',
        },

    },
}