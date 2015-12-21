/**
 * Created by JackieWu on 12/20/15.
 */
var $ = require('./common/zepto');
var Calendar = require('./common/Calendar');
var mbox = require('./lib/Mbox');
var ak = '8e9b109eedc27959233242342342';
var date = new Date();
var YEAR = date.getFullYear();
var MONTH = date.getMonth() + 1;
var DAY = date.getDate();

var quyer = {
    $day: $('.J_index-day'),
    $center: $('.J_center')
};

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

quyer.$day.html(YEAR + '年' + MONTH + '月' + DAY + '日');

$.ajax({
    url: '/h5_app/interface_supervisit/get_user_info',
    type: 'POST',
    data:{
        ak: ak,
        user_id: ''//哪用户登录的url
    },
    success: function(msg){
        if(msg.result !== 1){
            mbox($,{
                tips: '用户信息获取失败'
            });
        }else{

        }
    }
});