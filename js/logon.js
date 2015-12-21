/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var mbox = require('./lib/Mbox');
var query = {
    $name: $('.J_logon-name'),
    $tel: $('.J_logon-tel'),
    $houses: $('.J_logon-houses'),
    $pwd: $('.J_logon-pwd')
};

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
    $.ajax({
        url:'/h5_app/interface_supervisit/regist',
        type: 'POST',
        data:{
            ak: '8e9b109eedc27959233242342342',
            user_mobile: query.$tel.val(),
            user_name: query.$name.val(),
            user_pass: query.$pwd.val(),
            house_id: query.$houses.val()
        },
        success: function (msg) {
            if(msg.result === 1){
                mbox($,{
                    tips: '注册成功',
                    callback:function(){
                        location.href = 'login.html'
                    }
                });
            }else if(msg.result === 2){
                mbox($,{
                    tips: '此账号已经注册过'
                });
            }else{
                mbox($,{
                    tips: '账号注册失败'
                });
            }
        }
    });

});