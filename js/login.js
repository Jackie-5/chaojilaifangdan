/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');
var query = {
    $tel: $('.J_login-tel'),
    $login: $('.J_login-button'),
    $pwd: $('.J_login-pwd')
};
query.$login.on('click', function () {
    if (query.$tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11) {
        mbox($, {
            tips: '请输入正确的手机号'
        });
        return
    }
    ajax({
        $: $,
        url: 'login',
        data: {
            user_mobile: query.$tel.val(),
            user_pass: query.$pwd.val()
        },
        success: function (msg) {
            location.href = 'index.html?user_id=' + msg.data.user_id + '&house_id=' + msg.data.house_id + '&house_name=' + msg.data.house_name
        },
        error: function(msg){
            mbox($, {
                tips: msg.msg
            });
        }

    });
});