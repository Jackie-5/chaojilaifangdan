/**
 * Created by JackieWu on 12/23/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Mbox = require('./lib/Mbox');
var Url = require('./lib/get-url');
var url = new Url();
var query = {
    $tel: $('.J_logon-tel'),
    $pwd: $('.J_logon-pwd'),
    $logonBtn: $('.J_logon-btn')
};
url.parameter('user_mobile') && query.$tel.val(url.parameter('user_mobile'));
query.$logonBtn.on('touchend',function(){
    if(query.$tel.val().length === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        new Mbox($,{
            tips: '请输入正确的手机号'
        });
        return
    }
    if(query.$pwd.val() === ''){
        new Mbox($,{
            tips: '密码不能为空'
        });
        return
    }
    ajax({
        $: $,
        url: 'update_pwd',
        data: {
            user_mobile: query.$tel.val(),
            user_pass: query.$pwd.val()
        },
        success: function (msg) {
            new Mbox($,{
                tips: msg.msg,
                callback:function(){
                    location.href = 'login.html'
                }
            });
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }

    });
});