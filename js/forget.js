/**
 * Created by JackieWu on 12/20/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');

var time = 120;
var interval;
var query = {
    $tel: $('.J_forget-tel'),
    $code: $('.J_forget-code'),
    $countdown: $('.J_countdown'),
    $forgetBtn: $('.J_forget-btn')
};

query.$countdown.on('touchend', function () {
    if(query.$tel.val().length === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        mbox($, {
            tips: '请输入正确的手机号'
        });
        return
    }
    ajax({
        $: $,
        url: 'get_yanzhengcode',
        data: {
            user_mobile: query.$tel.val()
        },
        success: function (msg) {
            mbox($, {
                tips: msg.msg
            });
            query.$countdown.addClass('active');
            interval = setInterval(function(){
                time--;
                query.$countdown.html('重新获取('+ time +'S)');
                if(time === 0){
                    clearInterval(interval);
                    query.$countdown.html('获取验证码')
                }
            },1000)
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }

    });
});

query.$forgetBtn.on('touchend',function(){
    if(query.$tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11){
        mbox($, {
            tips: '请输入正确的手机号'
        });
        return
    }
    if(query.$code.val() === ''){
        mbox($, {
            tips: '请输入验证码'
        });
        return
    }
    ajax({
        $: $,
        url: 'is_yanzhengcode',
        data: {
            user_mobile: query.$tel.val(),
            yanzheng_code: query.$code.val()
        },
        success: function (msg) {
            mbox($, {
                tips: msg.msg,
                callback: function () {
                    location.href = 'update-pwd.html?user_mobile=' + query.$tel.val()
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