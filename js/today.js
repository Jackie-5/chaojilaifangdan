/**
 * Created by JackieWu on 1/5/16.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var Mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var indexHtml = require('./tpl/today-tpl.html');
var changeDate = require('./lib/date-change');

var url = new Url();
var tplRender = tpl.render;


var query = {
    $wait: $('.J_wait-box')
};

var userTaskList = function () {
    ajax({
        $: $,
        url: 'user_task_list',
        data: {
            user_id: url.parameter('user_id')
        },
        success: function (msg) {
            query.$wait.html(tplRender(indexHtml, {
                data: msg.data,
                user_id: url.parameter('user_id'),
                house_id: url.parameter('house_id'),
                house_name: url.parameter('house_name')
            }));
            var index = 0;
            var customerMobile = $('.J_customer-mobile');
            msg.data.forEach(function (item, i) {
                item.list.forEach(function (list, k) {
                    if (list.customer_mobile == '' || list.customer_mobile == null || !!~list.customer_mobile.indexOf('****')) {
                        customerMobile.eq(index).find('a').off('click').on('click', function () {
                            new Mbox($, {
                                tips: '补全信息后才可使用',
                                leftBtn: '去补全',
                                rightBtnTrue: true,
                                callback: function () {
                                    location.href = 'fill-in.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name') + '&customer_id=' + list.customer_id
                                }
                            });
                        });
                    } else {
                        customerMobile.eq(index).find('a').eq(0).attr('href', 'tel:' + list.customer_mobile);
                        customerMobile.eq(index).find('a').eq(1).attr('href', 'sms:' + list.customer_mobile)
                    }

                    changeDate($, $('.J_customer-date-input').eq(index).find('input').off('click'), function (time) {
                        ajax({
                            $: $,
                            url: 'update_task_time',
                            data: {
                                customer_order_id: list.customer_order_id,
                                task_time: time
                            },
                            success: function (msg) {
                                new Mbox($, {
                                    tips: msg.msg,
                                    callback: function () {
                                        userTaskList();
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
                    index += 1;
                })
            });
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }
    });
};

userTaskList();
