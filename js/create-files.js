/**
 * Created by JackieWu on 12/22/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');
var moment = require('./common/moment');
var Url = require('./lib/get-url');
var url = new Url();
var TODAY = moment().format('YYYY-MM-DD');
var query = {
    $level: $('.J_level'),
    $createDate: $('.J_create-date'),
    $createDateInput: $('#create-date'),
    $name: $('.J_create-name'),
    $cTel1: $('.J_create-tel-1'),//前四位
    $cTel2: $('.J_create-tel-2'),
    $gender: $('.J_gender-box'),
    $createFiles: $('.J_create-files-btn')

};
var gender;
query.$level.html(url.parameter('level'));
query.$createDate.html(TODAY);
query.$createDateInput.val(TODAY);

query.$createFiles.on('touchend', function () {
    if (query.$name.val() === '') {
        mbox($, {
            tips: '昵称不能为空'
        });
        return
    }
    if (query.$cTel1.val() === '' && query.$cTel2.val() === '' && query.$cTel1.val().length === 4 && query.$cTel2.val().length === 4) {
        mbox($, {
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
        url: 'user_task_list',
        data: {
            pre_cus_mobile: query.$cTel1.val(),
            last_cus_mobile: query.$cTel2.val(),
            customer_gender: gender,
            user_id: url.parameter('user_id'),
            house_id: query.$gender.val()
        },
        success: function (msg) {
            mbox($, {
                tips: '创建成功',
                callback: function () {
                    location.href = 'index.html?user_id=' + url.parameter('user_id')
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

