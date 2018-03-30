const PREFIX='/api';
export default {
  name: '员工餐费管理系统',
  prefix: 'rms',
  footerText: 'rms  © 2018 Lin LingXiao',
  CORS: [],
  openPages: ['/login'],
  api: {
    user:{
      userLogin: PREFIX+`/user/login`,
      listUsers: PREFIX+'/users',
      user: PREFIX+'/user',
  }
},
}
