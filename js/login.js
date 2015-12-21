/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var mbox = require('./lib/Mbox');
var query = {
    $tel: $('.J_login-tel'),
    $login: $('.J_login-button'),
    $pwd: $('.J_login-pwd')
};
var ak = '8e9b109eedc27959233242342342';
query.$login.on('click',function(){
    if(query.$tel.val().length === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        mbox($,{
            tips: '请输入正确的手机号'
        });
        return
    }
    $.ajax({
        url:'/h5_app/interface_supervisit/login',
        type: 'POST',
        data:{
            ak: ak,
            user_mobile: query.$tel.val(),
            user_pass: query.$pwd.val()
        },
        success: function (msg) {
            if(msg.result === 1){
                location.href = 'index.html?is_ios=' +  msg.data.is_ios + '&house_id=' + msg.data.house_id + '&user_id=' + msg.data.user_id
            }else{
                mbox($,{
                    tips: '登录失败'
                });
            }
        }
    });

});