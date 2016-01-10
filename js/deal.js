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
var setTime;
var customer_order_id = [];
var customer_id = [];
var customer_name = [];
var order_type = [];
var customer_mobile = [];

var url = new Url();
var tplRender = tpl.render;
var index = 1;
var query = {
    $titleBar: $('.J_deal-title-bar'),
    $dealBox: $('.J_deal-content-box'),
    $loading: $('.J_loading')
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
            //loading
            query.$loading.addClass('hide');
            if (msg.data.customer_info_list.length > 0) {
                query.$dealBox.append(tplRender(dealSearchList, {
                    msg: msg.data.customer_info_list,
                    user_id: url.parameter('user_id'),
                    house_name: url.parameter('house_name'),
                    house_id: url.parameter('house_id'),
                    index: index
                }));
                msg.data.customer_info_list.forEach(function (item, i) {
                    //保存id
                    customer_order_id.push(item.customer_order_id);
                    customer_id.push(item.customer_id);
                    customer_name.push(item.customer_name);
                    order_type.push(item.order_type);
                    customer_mobile.push(item.customer_mobile);
                });
                $('.J_font-cont').on('click', function () {
                    if(order_type[$(this).parents('.J_deal-box').index()] != 1 && order_type[$(this).parents('.J_deal-box').index()] != 7){
                        location.href = './search.html?user_id=' + url.parameter('user_id') + '&house_name=' + url.parameter('house_name') + '&house_id=' + url.parameter('house_id') + '&deal=' + customer_name[$(this).parents('.J_deal-box').index()] + '&order_type=' + order_type[$(this).parents('.J_deal-box').index()]
                    }
                });
                $('.J_mobile').find('a').on('click', function () {
                    var $this = $(this);
                    if (customer_mobile[$this.parents('.J_deal-box').index()] != '' && customer_mobile[$this.parents('.J_deal-box').index()] != 0 && customer_mobile[$this.parents('.J_deal-box').index()] != null && !~customer_mobile[$this.parents('.J_deal-box').index()].indexOf('*')) {
                        if ($this.hasClass('J_search-tel')) {
                            location.href = 'tel:' + customer_mobile[$this.parents('.J_deal-box').index()]
                        } else {
                            location.href = 'sms:' + customer_mobile[$this.parents('.J_deal-box').index()]
                        }
                    } else {
                        new Mbox($, {
                            tips: '补全信息后才可使用',
                            leftBtn: '去补全',
                            rightBtnTrue: true,
                            callback: function () {
                                location.href = 'fill-in.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' + url.parameter('house_name') + '&customer_id=' + customer_id[$this.parents('.J_deal-box').index()]
                            }
                        });
                    }
                });

                dateChange($, $('.J_date-time-input'), function (time, _this) {
                    ajax({
                        $: $,
                        url: 'update_order_type',
                        data: {
                            customer_order_id: customer_order_id[_this.parents('.J_deal-box').index()],
                            task_time: time
                        },
                        success: function (msg) {
                            var diff_days = '' ;
                            if (!!~msg.diff_days.toString().indexOf('-')) {
                                diff_days = '过期' + msg.diff_days.toString().split('-')[1] + '天'
                            } else if (msg.diff_days.toString() == 0) {
                                diff_days = '今天'
                            } else {
                                diff_days = '还剩' + msg.diff_days.toString() + '天'
                            }
                            _this.parents('.J_deal-box').find('.J_diff_days').html(diff_days);
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
            }
            index += 1;
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }
    });
};
levelAjax(url.parameter('deal_index'), index);
$(window).on('scroll', function () {
    if ($(window).scrollTop() + $(window).height() > $('body').height() - 5 && query.$loading.hasClass('hide')) {
        setTime = setTimeout(function () {
            levelAjax(url.parameter('deal_index'), index);
            setTime && clearTimeout(setTime);
        }, 2000);
        query.$loading.removeClass('hide')
    }
});

