/**
 * Created by JackieWu on 12/31/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var moment = require('./common/moment');
var timeLineTpl = require('./tpl/time-line.html');

var url = new Url();
var tplRender = tpl.render;

ajax({
    $: $,
    url: 'get_customer_dynamic_state',
    data: {
        customer_mobile: url.parameter('customer_mobile'),
        customer_id: url.parameter('customer_id')
    },
    success: function (msg) {
        $('.J_time-line-box').html(tplRender(timeLineTpl,{
            data: msg.data.data_result
        }))
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }

});
