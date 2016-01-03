/**
 * Created by JackieWu on 12/24/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var dateChange = require('./lib/date-change');
var Mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var dealSearchList = require('./tpl/deal-search-list.html');

var url = new Url();
var tplRender = tpl.render;

var query = {
    $titleBar: $('.J_deal-title-bar'),
    $dealBox: $('.J_deal-content-box')
};
query.$titleBar.find('a').each(function (i) {
    i == url.parameter('deal_page_index') && $(this).addClass('active');
    $(this).attr('href', './deal.html?user_id=' + url.parameter('user_id') + '&deal_page_index=' + i + '&deal_index=' + $(this).attr('data-value') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name'))
});
var levelAjax = function (level, page) {
    ajax({
        $: $,
        url: 'search_customer_by_level',
        data: {
            level: level,
            user_id: url.parameter('user_id'),
            p: page //分页之后做
        },
        success: function (msg) {
            query.$dealBox.html(tplRender(dealSearchList, {
                msg: msg.data.customer_info_list,
                user_id: url.parameter('user_id'),
                house_name: url.parameter('house_name'),
                house_id: url.parameter('house_id')
            }));
            var mobile = $('.J_mobile');
            msg.data.customer_info_list.forEach(function (item, i) {
                if (item.real_mobile == '' || item.real_mobile == null || item.real_mobile == 0) {
                    mobile.eq(i).find('a').off('click').on('click', function () {
                        new Mbox($, {
                            tips: '补全信息后才可使用',
                            leftBtn: '去补全',
                            rightBtnTrue: true,
                            callback: function () {
                                location.href = 'fill-in.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name') + '&customer_id=' + item.customer_id
                            }
                        });
                    });
                } else {
                    mobile.eq(i).find('a').eq(0).attr('href', 'tel:' + item.real_mobile);
                    mobile.eq(i).find('a').eq(1).attr('href', 'sms:' + item.real_mobile)
                }
                if (item.order_type != 1 && item.order_type != 7) {
                    $('.J_font-cont').attr('href', './search.html?user_id=' + url.parameter('user_id') + '&house_name=' + url.parameter('house_name') + '&house_id=' + url.parameter('house_id') + '&deal=' + item.customer_name + '&order_type=' + item.order_type)
                }
            });
            dateChange($, $('.J_date-time-input'), function (time,_this) {
                ajax({
                    $: $,
                    url: 'update_task_time',
                    data: {
                        customer_order_id: msg.data.customer_info_list[_this.parents('.J_deal-box').attr('data-value')].customer_order_id,
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

};
levelAjax(url.parameter('deal_index'), 1);
