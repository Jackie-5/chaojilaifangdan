/**
 * Created by JackieWu on 12/11/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var mbox = require('./lib/Mbox');
var Url = require('./lib/get-url');
var url = new Url();
var query = {
    $customer_name: $('.J_customer_name'),
    $customer_mobile: $('J_customer_mobile'),
    $customer_tel: $('.J_customer_tel'),
    $customer_mobile2: $('.J_customer_mobile2'),
    $customer_email: $('.J_customer_email'),
    $customer_age: $('.J_customer_age'),
    $customer_birthday: $('.J_customer_birthday'),
    $gender_box: $('.J_gender-box'),
    $logonBtn: $('.J_logon-btn')
};
var update = function(data){
    query.$logonBtn.on('click', function () {
        if (query.$customer_name.val() === '') {
            mbox($, {
                tips: '姓名不能为空'
            });
            return
        }
        if (query.$customer_mobile.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(query.$customer_mobile.val()) || query.$tel.$customer_mobile().length !== 11) {
            mbox($, {
                tips: '请输入正确的手机号'
            });
            return
        }

        data.customer_name = query.$customer_name.val();
        data.customer_mobile = query.$customer_mobile.val();
        data.customer_mobile = query.$customer_tel.val();
        data.customer_mobile2 = query.$customer_mobile2.val();
        data.$customer_email = query.$customer_email.val();
        data.$customer_age = query.$customer_age.val();
        data.$customer_birthday = query.$customer_birthday.val();
        query.$gender_box.find('input').each(function(){
            if($(this).prop('checked')){
                data.customer_age = $(this).val()
            }
        });

        ajax({
            $: $,
            url: 'update_customer_info_test',
            data: data,
            success: function (msg) {
                mbox($, {
                    tips: msg.msg,
                    callback: function () {
                        location.href = 'index.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
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
};
ajax({
    $: $,
    url: 'get_customer_info',
    data: {
        customer_id: url.parameter('customer_id')
    },
    success: function (msg) {
        update(msg.data)
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }

});