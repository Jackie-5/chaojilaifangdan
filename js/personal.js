/**
 * Created by JackieWu on 12/21/15.
 */
var $ = require('./common/zepto');
var mbox = require('./lib/Mbox');
var ak = '8e9b109eedc27959233242342342';
var query = {
    $name: $('.J_logon-name'),
    $tel: $('.J_logon-tel'),
    $houses: $('.J_logon-houses'),
    $pwd: $('.J_logon-pwd')
};


$.ajax({
    url:'/h5_app/interface_supervisit/get_user_info',
    type: 'POST',
    data:{
        ak: ak,
        user_id: query.$tel.val()
    },
    success: function (msg) {
        if(msg.result === 1){

        }
    }
});

query.$login.on('click',function(){
    if(query.$name.val().length === ''){
        mbox($,{
            tips: '姓名不能为空'
        });
        return
    }
    if(query.$tel.val().length === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        mbox($,{
            tips: '请输入正确的手机号'
        });
        return
    }
    if(query.$houses.val().length === ''){
        mbox($,{
            tips: '楼盘不能为空'
        });
        return
    }
    if(query.$pwd.val().length === ''){
        mbox($,{
            tips: '密码不能为空'
        });
        return
    }


});