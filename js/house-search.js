/**
 * Created by JackieWu on 15/12/27.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
var md5 = require('./lib/md5');

var url = new Url();

var infor = {
    name: url.parameter('name'),
    tel: url.parameter('tel'),
    pwd: url.parameter('pwd')
};

$('.J_search-btn').on('touchend', function () {
    ajax({
        $: $,
        url: 'house_list',
        data: {
            house_name: $('.J_search-input').val()
        },
        success: function (msg) {
            var list = '';
            msg.data.forEach(function (item, i) {
                list += '<div class="house-list" data-houseId="' + msg.data[i].house_id + '">' + msg.data[i].house_name + '</div>'
            });
            $('.J_house-search-content-box').html(list).find('.house-list').on('click', function () {
                location.href = 'logon.html?name=' + infor.name + '&tel=' + infor.tel + '&houseId=' + $(this).attr('data-houseId') + '&houseName=' + $(this).html() + '&pwd=' + infor.pwd
            })
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }
    });
});
