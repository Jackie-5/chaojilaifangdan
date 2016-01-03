/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Mbox = require('./lib/Mbox');
var Url = require('./lib/get-url');
var url = new Url();
var query = {
    $name: $('.J_logon-name'),
    $tel: $('.J_logon-tel'),
    $houses: $('.J_logon-houses'),
    $pwd: $('.J_logon-pwd'),
    $logonBtn: $('.J_logon-btn')
};

url.parameter('name') && query.$name.val(url.parameter('name'));
url.parameter('tel') && query.$tel.val(url.parameter('tel'));
url.parameter('houseName') && query.$houses.html(url.parameter('houseName'));
url.parameter('pwd') && query.$pwd.val(url.parameter('pwd'));

query.$houses.on('click', function () {
    location.href = 'house-search.html?name=' + query.$name.val() + '&tel=' + query.$tel.val() + '&pwd=' + query.$pwd.val()
});
query.$logonBtn.on('click', function () {
    if (query.$name.val() === '') {
        new Mbox($, {
            tips: '姓名不能为空'
        });
        return
    }
    if (query.$tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$tel.val()) || query.$tel.val().length !== 11) {
        new Mbox($, {
            tips: '请输入正确的手机号'
        });
        return
    }
    if(url.parameter('houseId') == ''){
        new Mbox($, {
            tips: '楼盘不能为空'
        });
    }
    if (query.$pwd.val() === '') {
        new Mbox($, {
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
            house_id: url.parameter('houseId')
        },
        success: function (msg) {
            new Mbox($, {
                tips: msg.msg,
                callback: function () {
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