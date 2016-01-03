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
    url: 'get_customer_dynamic_state',
    data: {
        customer_id: url.parameter('customer_id'),
        house_id: url.parameter('house_id')
    },
    success: function (msg) {
        $('.J_time-line-box').html(tplRender(timeLineTpl, {
            data: msg.data.data_result
        }));

        $('.J_time').html(url.parameter('diff_days'));

        var orderType = $('.J_order-type');
        if (url.parameter('order_type') == 1) {
            orderType.html('邀约来访');
        } else if (url.parameter('order_type') == 2) {
            orderType.html('再次来访');
        } else if (url.parameter('order_type') == 3) {
            orderType.html('付意向金');
        } else if (url.parameter('order_type') == 4) {
            orderType.html('付定金');
        } else if (url.parameter('order_type') == 5) {
            orderType.html('签约');
        } else if (url.parameter('order_type') == 6) {
            orderType.html('待付款');
        } else if (url.parameter('order_type') == 7) {
            orderType.html('确认付款');
        }
        dateChange($,$('#time-date'), function (time) {
            ajax({
                $: $,
                url: 'update_order_type',
                data: {
                    customer_order_id: url.parameter('customer_order_id'),
                    task_time: time
                },
                success: function (msg) {
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
