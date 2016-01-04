/**
 * Created by JackieWu on 12/22/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Mbox = require('./lib/Mbox');
var moment = require('./common/moment');
var Url = require('./lib/get-url');
var url = new Url();
var TODAY = moment().format('YYYY-MM-DD');
var query = {
    $level: $('.J_level'),
    $createDate: $('.J_create-date'),
    $name: $('.J_create-name'),
    $cTel1: $('.J_create-tel-1'),//前四位
    $cTel2: $('.J_create-tel-2'),
    $gender: $('.J_gender-box'),
    $createFiles: $('.J_create-files-btn')
};
var gender;
query.$level.html(url.parameter('level'));
query.$createDate.val(TODAY);

query.$createFiles.on('click', function () {
    if (query.$name.val() === '') {
        new Mbox($, {
            tips: '昵称不能为空'
        });
        return
    }
    if ((query.$cTel1.val() !== '' && query.$cTel1.val().length !== 4) || (query.$cTel2.val() !== '' && query.$cTel2.val().length !== 4)) {
        new Mbox($, {
            tips: '请输入正确手机号的前四位和后四位'
        });
        return
    }
    query.$gender.find('input').each(function () {
        if ($(this).prop('checked')) {
            gender = $(this).val()
        }
    });
    ajax({
        $: $,
        url: 'create_customer_test',
        data: {
            customer_name: query.$name.val(),
            pre_cus_mobile: query.$cTel1.val(),
            last_cus_mobile: query.$cTel2.val(),
            customer_gender: gender,
            user_id: url.parameter('user_id'),
            house_id: url.parameter('house_id'),
            house_name: url.parameter('house_name'),
            rtime: query.$createDate.val(),
            question_info: url.parameter('question_info')
        },
        success: function (msg) {
            new Mbox($, {
                tips: msg.msg,
                callback: function () {
                    location.href = 'index.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
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

