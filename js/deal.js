/**
 * Created by JackieWu on 12/24/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');

var url = new Url();
var tplRender = tpl.render;

var query = {
    $titleBar: $('.J_deal-title-bar')
};
query.$titleBar.find('a').each(function (i) {
    $(this).attr('href', './deal.html?user_id=' + url.parameter('user_id') + '&deal_index=' + i);
    i == url.parameter('deal_index') && $(this).addClass('active')
});

