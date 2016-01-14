/**
 * Created by JackieWu on 12/31/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var dateChange = require('./lib/date-change');
var Mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var moment = require('./common/moment');
var timeLineTpl = require('./tpl/time-line.html');

var url = new Url();
var tplRender = tpl.render;

ajax({
    $: $,
    url: 'customer_log_list',
    data: {
        customer_id: url.parameter('customer_id'),
        house_id: url.parameter('house_id')
    },
    success: function (msg) {
        $('.J_time-line-box').html(tplRender(timeLineTpl, {
            data: msg.data,
            name: msg.customer_name,
            customer_id: url.parameter('customer_id'),
            user_id: url.parameter('user_id'),
            house_id: url.parameter('house_id'),
            house_name: url.parameter('house_name'),
            order_type: url.parameter('order_type'),
            customer_order_id: url.parameter('customer_order_id')
        }));
        $('.J_time').html(url.parameter('diff_days'));

        var orderType = $('.J_order-type');
        if (url.parameter('next_order_type') == 1) {
            orderType.html('首次来访');
        } else if (url.parameter('next_order_type') == 2) {
            orderType.html('再次来访');
        } else if (url.parameter('next_order_type') == 3) {
            orderType.html('付意向金');
        } else if (url.parameter('next_order_type') == 4) {
            orderType.html('付定金');
        } else if (url.parameter('next_order_type') == 5) {
            orderType.html('签约');
        } else if (url.parameter('next_order_type') == 6) {
            orderType.html('待付款');
        } else if (url.parameter('next_order_type') == 7) {
            orderType.html('确认付款');
        }
        var timeDate = $('#time-date');
        timeDate.val(moment().add(3, 'd').format('YYYY-MM-DD'));
        dateChange($, timeDate, function (time,_this) {
            ajax({
                $: $,
                url: 'update_task_time',
                data: {
                    customer_order_id: url.parameter('customer_order_id'),
                    task_time: time
                },
                success: function (msg) {
                    _this.parents('.J_time-bottom').find('.J_time').html(msg.diff_days);
                    new Mbox($, {
                        tips: msg.msg
                    });
                },
                error: function (msg) {
                    new Mbox($, {
                        tips: msg.msg
                    });
                }

            });
        })
    },
    error: function (msg) {
        new Mbox($, {
            tips: msg.msg
        });
    }

});

