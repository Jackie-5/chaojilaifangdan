/**
 * Created by JackieWu on 12/22/15.
 */
var $ = require('./common/zepto');
var mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var ajax = require('./lib/ajax');
var answerHtml = require('./tpl/answer-tpl.html');
var Url = require('./lib/get-url');
var url = new Url();
var tplRender = tpl.render;

var query = {
    $answerBox: $('.J_answer-box'),
    $answerBtn: $('.J_answer-btn')
};
var submit = function (date) {
    var QAArray = [];
    $('.J_q-a').each(function (i) {
        $(this).find('input').each(function (k, item) {
            if ($(item).prop('checked')) {
                QAArray.push($(item).val())
            }
        })
    });
    if (QAArray.length !== date.length) {
        mbox($, {
            tips: '请把问题填写完整'
        });
        return
    }
    ajax({
        $: $,
        url: 'get_answer_level',
        data: {
            question_info: QAArray.join(',') //没有填写
        },
        success: function (msg) {
            location.href = 'create-files.html?level=' + msg.data.level + '&user_id=' + url.parameter('user_id') + '&question_info=' + QAArray.join(',') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }
    });
};
ajax({
    $: $,
    url: 'get_question',
    data: {
        //customer_id: url.parameter('user_id')
    },
    success: function (msg) {
        query.$answerBox.html(tplRender(answerHtml, msg.data));
        query.$answerBtn.on('touchend', function () {
            submit(msg.data)
        });
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }

});