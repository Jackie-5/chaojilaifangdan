/**
 * Created by JackieWu on 12/21/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');
var Url = require('./lib/get-url');
var url = new Url();
var query = {
    $name: $('.J_logon-name'),
    $tel: $('.J_logon-tel'),
    $houses: $('.J_logon-houses'),
    $pwd: $('.J_logon-pwd'),
    $modifyBtn: $('.J_modify-btn')
};


ajax({
    $: $,
    url: 'get_user_info',
    data: {
        user_id: url.parameter('user_id')//url带进来
    },
    success: function (msg) {
        if (msg.result === 1) {
            query.$name.val(msg.data.user_name);
            query.$tel.val(msg.data.user_mobile);
            query.$pwd.val(msg.data.user_pass);
            query.$houses.val(msg.data.house_name);
        }
    }
});

query.$modifyBtn.on('touchend', function () {
    if (query.$name.val().length === '') {
        mbox($, {
            tips: '姓名不能为空'
        });
        return
    }
    if (query.$tel.val().length === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11) {
        mbox($, {
            tips: '请输入正确的手机号'
        });
        return
    }
    if (query.$houses.val().length === '') {
        mbox($, {
            tips: '楼盘不能为空'
        });
        return
    }
    if (query.$pwd.val().length === '') {
        mbox($, {
            tips: '密码不能为空'
        });
        return
    }
    ajax({
        $: $,
        url: 'update_registration',
        data: {
            user_name: query.$name.val(),
            user_mobile: query.$tel.val(),
            user_pass: query.$pwd.val()
        },
        success: function (msg) {
            mbox($, {
                tips: '信息修改成功',
                callback:function(){
                    location.href = 'index.html?user_id=' + url.parameter('user_id')
                }
            });
        },
        error: function(msg){
            mbox($, {
                tips: msg.msg
            });
        }
    });

});