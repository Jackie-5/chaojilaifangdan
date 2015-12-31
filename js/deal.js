/**
 * Created by JackieWu on 12/24/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
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
    $(this).attr('href','./deal.html?user_id=' + url.parameter('user_id') + '&deal_page_index=' + i + '&deal_index=' + $(this).attr('data-value'))
});
var levelAjax = function (level,page) {
    ajax({
        $: $,
        url: 'search_customer_by_level',
        data: {
            level: level,
            user_id: url.parameter('user_id'),
            p: page //分页之后做
        },
        success: function (msg) {
            query.$dealBox.html(tplRender(dealSearchList,{
                msg: msg.data.customer_info_list
            }))
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }
    });

};
levelAjax(url.parameter('deal_index'),1);
