/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');
var query = {
    $name: $('.J_logon-name'),
    $tel: $('.J_logon-tel'),
    $houses: $('.J_logon-houses'),
    $pwd: $('.J_logon-pwd'),
    $logonBtn: $('.J_logon-btn')
};

query.$logonBtn.on('touchend',function(){
    if(query.$name.val() === ''){
        mbox($,{
            tips: '姓名不能为空'
        });
        return
    }
    if(query.$tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        mbox($,{
            tips: '请输入正确的手机号'
        });
        return
    }
    if(query.$houses.val() === ''){
        mbox($,{
            tips: '楼盘不能为空'
        });
        return
    }
    if(query.$pwd.val() === ''){
        mbox($,{
            tips: '密码不能为空'
        });
        return
    }
    ajax({
        $: $,
        url: 'regist',
        data: {
            user_mobile: query.$tel.val(),
            user_name: query.$name.val(),
            user_pass: query.$pwd.val(),
            house_id: query.$houses.val()
        },
        success: function (msg) {
            mbox($,{
                tips: msg.msg,
                callback:function(){
                    location.href = 'login.html'
                }
            });
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }

    });
});