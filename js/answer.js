/**
 * Created by JackieWu on 12/22/15.
 */
var $ = require('./common/zepto');
var Mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var ajax = require('./lib/ajax');
var answerHtml = require('./tpl/answer-tpl.html');
var Url = require('./lib/get-url');
var url = new Url();
var tplRender = tpl.render;
var BACK = -1;
var query = {
    $answerBox: $('.J_answer-box'),
    $answerBtn: $('.J_answer-btn')
};
var questionData = {};
if (url.parameter('customer_id')) questionData.customer_id = url.parameter('customer_id');
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
        new Mbox($, {
            tips: '请把问题填写完整'
        });
        return
    }
    if (!url.parameter('customer_id')) {
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
                new Mbox($, {
                    tips: msg.msg
                });
            }
        });
    } else {
        ajax({
            $: $,
            url: 'customer_visit_agin',
            data: {
                customer_id: url.parameter('customer_id'),
                question_info: QAArray.join(',') //没有填写
            },
            success: function (msg) {
                new Mbox($, {
                    tips: msg.msg,
                    callback: function () {
                        history.back(BACK)
                    }
                });
            },
            error: function (msg) {
                new Mbox($, {
                    tips: msg.msg
                });
            }
        });
    }
};
ajax({
    $: $,
    url: 'get_question',
    data: questionData,
    success: function (msg) {
        query.$answerBox.html(tplRender(answerHtml, msg.data));
        msg.data.forEach(function (item) {
            if (item.answer) {
                $('.J_q-a').find('input').each(function () {
                    if ($(this).val() == item.answer) {
                        $(this).attr('checked', 'checked')
                    }
                });
            }
        });

        query.$answerBtn.on('click', function () {
            submit(msg.data)
        });
    },
    error: function (msg) {
        new Mbox($, {
            tips: msg.msg
        });
    }

});
