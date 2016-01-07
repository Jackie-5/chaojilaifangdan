/**
 * Created by JackieWu on 1/5/16.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var Mbox = require('./lib/Mbox');
var url = new Url();

var textarea = $('.J_text-textarea');
if(url.parameter('notes') !== '点击添加备注'){
    textarea.html(url.parameter('notes'));
}
$('.J_btn').on('touchend', function () {
    if(textarea.val().length > 60){
        new Mbox($, {
            tips: '备注不能超过60字'
        });
        return
    }
    ajax({
        $: $,
        url: 'update_customer_notes',
        data: {
            notes: $('.J_text-textarea').val(),
            customer_id: url.parameter('customer_id'),
            user_id: url.parameter('user_id')
        },
        success: function (msg) {
            new Mbox($, {
                tips: msg.msg,
                callback: function () {
                    history.back(-1)
                }
            });
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }

    });

})
