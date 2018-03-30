
export default {
    // 支持值为 Object 和 Array
    'GET /api/users': {
      status:200,
      message:'',  
      data:[{
        'id':1,
        'username':'林凌宵',
        'email':'110@app.com',
      },{
        'id':2,
        'username':'林凌宵',
        'email':'110@app.com',
      },{
        'id':3,
        'username':'林凌宵',
        'email':'110@app.com',
      },{
        'id':4,
        'username':'林凌宵',
        'email':'110@app.com',
      },{
        'id':5,
        'username':'林凌宵',
        'email':'110@app.com',
      },{
        'id':6,
        'username':'林凌宵',
        'email':'110@app.com',
      }]
    },

    'POST /api/user/1': { 
      status:200,
      data:null,
      message:"用户创建成功!"
    },

    'GET /api/user/1':{
        status:200,
        data:{
            'id':1,
            'username':'林凌宵',
            'email':'110@app.com',
        },
        message:null
    }



};
