/**
 * Created by JackieWu on 12/20/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Calendar = require('./common/Calendar');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var indexHtml = require('./tpl/index-tpl.html');
var linkHtml = require('./tpl/index-link-tpl.html');
var date = new Date();
var YEAR = date.getFullYear();
var MONTH = date.getMonth() + 1;
var DAY = date.getDate();

var url = new Url();
var tplRender = tpl.render;
var query = {
    $day: $('.J_index-day'),
    $center: $('.J_center'),
    $photo: $('.J_photo'),
    $wait: $('.J_wait-box'),
    $number: $('.J_wait-number'),
    $linkBox: $('.J_link-box'),
    $search: $('.J_search'),
    $deal: $('.J_deal')
};
//设置今天日期
new Calendar({
    c: 'J_calendar',
    y: YEAR,
    m: MONTH,
    a: {
        'd1': '1971-01-01',//最早时间
        'd2': '2900-01-01'//最晚时间
    },
    f: 0//显示双日历用1，单日历用0
}, $);

query.$day.html(YEAR + '年' + MONTH + '月' + DAY + '日');

//个人中心
query.$center.on('touchend', function () {
    location.href = 'personal.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
});
//客户查询
query.$search.on('touchend', function () {
    location.href = 'search.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
});
//成交助手
query.$deal.on('touchend', function () {
    location.href = 'deal.html?user_id=' + url.parameter('user_id') + '&deal_index=0' + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name')
});

query.$linkBox.html(tplRender(linkHtml, {
    user_id: url.parameter('user_id'),
    house_id: url.parameter('house_id'),
    house_name: url.parameter('house_name')
}));

//同时去访问一次
ajax({
    $: $,
    url: 'get_user_info',
    data: {
        user_id: url.parameter('user_id')
    },
    success: function (msg) {
        query.$photo.attr('src', msg.data.head_pic);
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }

});
ajax({
    $: $,
    url: 'user_task_list',
    data: {
        user_id: url.parameter('user_id')
    },
    success: function (msg) {
        query.$wait.html(tplRender(indexHtml, msg.data));
        var index = 0;
        var customerMobile = $('.J_customer-mobile');
        msg.data.forEach(function (item, i) {
            item.list.forEach(function (list, k) {
                if (list.customer_mobile == '' || list.customer_mobile == null) {
                    customerMobile.eq(index).find('a').on('click', function () {
                        mbox($, {
                            tips: '补全信息后才可使用',
                            leftBtn: '去补全',
                            callback: function () {
                                location.href = 'fill-in.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name') + '&customer_id=' + list.customer_id
                            }
                        });
                    })
                } else {
                    customerMobile.eq(index).find('a').eq(0).attr('href', 'tel:' + list.customer_mobile);
                    customerMobile.eq(index).find('a').eq(1).attr('href', 'sms:' + list.customer_mobile)
                }
                index += 1;
            })
        })
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }
});
//待办事项总数
ajax({
    $: $,
    url: 'user_task_count',
    data: {
        user_id: url.parameter('user_id')
    },
    success: function (msg) {
        query.$number.html(msg.data);
    },
    error: function (msg) {
        mbox($, {
            tips: msg.msg
        });
    }

});

function aaaa(){
    console.log('aaa')
}