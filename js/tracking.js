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
var trackingTpl = require('./tpl/tracking-tpl.html');

var url = new Url();
var tplRender = tpl.render;

ajax({
    $: $,
    url: 'get_customer_dynamic_status',
    data: {
        customer_id: url.parameter('customer_id'),
        house_id: url.parameter('house_id')
    },
    success: function (msg) {
        $('.J_time-line-box').html(tplRender(trackingTpl, {
            data: msg.data,
            name: msg.customer_name,
            customer_id: url.parameter('customer_id'),
            user_id: url.parameter('user_id'),
            house_id: url.parameter('house_id'),
            house_name: url.parameter('house_name'),
            order_type: url.parameter('order_type'),
            customer_order_id: url.parameter('customer_order_id')
        }));
    },
    error: function (msg) {
        new Mbox($, {
            tips: msg.msg
        });
    }

});

