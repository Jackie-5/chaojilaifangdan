/**
 * Created by JackieWu on 12/23/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Url = require('./lib/get-url');
var mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var moment = require('./common/moment');
var Drop = require('./lib/drop');
var searchList = require('./tpl/search-list.html'); //搜索结果
var searchDown = require('./tpl/search-down.html'); //定金
var searchIntention = require('./tpl/search-intention.html'); //意向金
var searchPayment = require('./tpl/search-payment.html'); //付款
var searchSign = require('./tpl/search-sign.html'); //签约

var query = {
    $searchBtn: $('.J_search-btn'),
    $searchInput: $('.J_search-input'),
    $contentBox: $('.J_search-content-box'),
    $dateBtn: $('.J_search-date-btn'),
    $searchDateBox: $('.J_search-date-box'),
    $dateBtnSearch: $('.J_date-btn'),
    $starTime: $('.J_time-star'),
    $endTime: $('.J_time-end'),
    $idStartTime : $('#start-time'),
    $idEndTime : $('#end-time')
};
var url = new Url();
var tplRender = tpl.render;

//初始化moment
moment.locale('en', {
    relativeTime: {
        d: "a天",
        dd: "%d天前",
        y: "a年",
        yy: "%d年前"
    }
});
//设置时间
var TODAY = moment().format('YYYY-MM-DD');
query.$idStartTime.val(TODAY).on('change', function () {
    query.$starTime.html(moment($(this).val()).format('YYYY-MM-DD')).attr('data-star',moment($(this).val()).format('YYYY-MM-DD'))
});
query.$idEndTime.val(TODAY).on('change', function () {
    query.$endTime.html(moment($(this).val()).format('YYYY-MM-DD')).attr('data-star',moment($(this).val()).format('YYYY-MM-DD'))
});
var order_type = url.parameter('order_type'); //2再次来访 3付意向金 4付定金 5签约 6待付款 7付款
var customer = function (data) {
    ajax({
        $: $,
        url: 'customer_order_action',
        data: data,
        success: function (msg) {
            mbox($, {
                tips: msg.msg,
                callback: function () {
                    location.href = 'index.html?user_id=' + url.parameter('user_id') + '&house_id=' + url.parameter('house_id') + '&house_name=' +  url.parameter('house_name')
                }
            });
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }
    });
};
var again = function (data) {
    location.href = 'answer.html?user_id=' + url.parameter('user_id') + '&customer_id=' + data.customer_id + '&again=1';
};

var intention = function (data) {
    var time = moment(parseInt(data.task_time)).toNow(true);
    if (order_type == 3) {
        query.$contentBox.html(tplRender(searchIntention, {
            time: time,
            data: data,
            house_name: url.parameter('house_name')
        }));
    } else {
        query.$contentBox.html(tplRender(searchDown, {
            time: time,
            data: data
        }));
    }
    new Drop($);
    var q = {
        area: $('.J_inten-area'),
        name: $('.J_inten-name'),
        tel: $('.J_inten-phone'),
        houseNumber: $('.J_inten-number'),
        houseFloor: $('.J_inten-floor'),
        houseRoom: $('.J_inten-room')
    };
    $('.J_cancel').on('touchend', function () {

    });
    $('.J_submit').on('touchend', function () {
        if (q.area.val() === '') {
            mbox($, {
                tips: '建筑面积不能为空'
            });
            return
        }
        if (q.name.val() === '') {
            mbox($, {
                tips: '姓名不能为空'
            });
            return
        }
        if (q.tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(q.tel.val()) || q.tel.val().length !== 11) {
            mbox($, {
                tips: '请输入正确的手机号'
            });
            return
        }
        data.house_area = q.area.val();
        data.real_name = q.name.val();
        data.real_mobile = q.tel.val();
        data.house_number = q.houseNumber.val();
        data.house_floor = q.houseFloor.val();
        data.house_room = q.houseRoom.val();
        //下一步进度没有
        customer(data)
    })
};

var payment = function (data, drop) {
    var pIndex = 0;
    query.$contentBox.html(tplRender(searchPayment, {
        p: 0,
        index: pIndex,
        drop: drop || 0
    }));
    var q = {
        contBtn: $('.J-cont-btn'),
        payBox: $('.J_payment'),
        dealBtn: $('.J_deal-btn')
    };
    drop === 1 && q.contBtn.addClass('hide');
    new Drop($, function (index) {
        if (index === 0) {
            q.contBtn.addClass('hide');
            payment(data, 1);
            pIndex = 0
        } else {
            q.contBtn.removeClass('hide')
        }
    });
    q.contBtn.off('click').on('click', function () {
        if (pIndex < 2) {
            pIndex++;
            q.payBox.append(tplRender(searchPayment, {
                p: 1,
                index: pIndex
            }));
        }
    });
    q.dealBtn.off('click').on('click', function () {

    })

};
//签约
var sign = function (data) {
    query.$contentBox.html(tplRender(searchSign, {
        data: data
    }));
    var q = {
        area: $('.J_inten-area'), //面积
        name: $('.J_inten-name'),
        tel: $('.J_inten-phone'),
        price: $('.J_inten-price'), //总价
        unit: $('.J_unit'), //单价
        houseNumber: $('.J_inten-number'),
        houseFloor: $('.J_inten-floor'),
        houseRoom: $('.J_inten-room')
    };
    var calculate = function () {
        var area, price;
        area = typeof parseInt(q.area.val()) === "number" ? parseInt(q.area.val()) : 0;
        price = typeof parseInt(q.price.val()) === "number" ? parseInt(q.price.val()) : 0;
        q.unit.html(price / area)
    };
    q.area.on('keyup', function () {
        calculate()
    });
    q.price.on('keyup', function () {
        calculate()
    });
    $('.J_submit').on('touchend', function () {
        if (q.area.val() === '') {
            mbox($, {
                tips: '建筑面积不能为空'
            });
            return
        }
        if (q.name.val() === '') {
            mbox($, {
                tips: '姓名不能为空'
            });
            return
        }
        if (q.tel.val() === '' || !/0?(13|14|15|17|18)[0-9]{9}/.test(q.tel.val()) || q.tel.val().length !== 11) {
            mbox($, {
                tips: '请输入正确的手机号'
            });
            return
        }
        if (q.price.val() === '') {
            mbox($, {
                tips: '购房总价不能为空'
            });
            return
        }
        data.house_area = q.area.val();
        data.real_name = q.name.val();
        data.real_mobile = q.tel.val();
        data.house_number = q.houseNumber.val();
        data.house_floor = q.houseFloor.val();
        data.house_room = q.houseRoom.val();
        data.total_price = q.price.val();
        data.price = q.unit.html();
        //下一步进度没有
        customer(data)
    })
};
var searchResult = function () {
    ajax({
        $: $,
        url: 'search_customer',
        data: {
            user_id: url.parameter('user_id'),
            search_key: query.$searchInput.val(),
            order_type: url.parameter('order_type'),
            date1: query.$starTime.attr('data-star'),
            date2: query.$endTime.attr('data-end')
        },
        success: function (msg) {
            query.$contentBox.html(tplRender(searchList, {
                msg: msg.data.customer_info_list
            }));

            $('.J_search-list').on('click', function () {
                if (order_type == 2) {//2再次来访
                    again(msg.data.customer_info_list[$(this).index()])
                } else if (order_type == 3 || order_type == 4) {//3付意向金 4付定金
                    intention(msg.data.customer_info_list[$(this).index()])
                } else if (order_type == 5) {// 5签约
                    sign(msg.data.customer_info_list[$(this).index()])
                } else if (order_type == 7) {// 7付款
                    payment(msg.data.customer_info_list[$(this).index()])
                }
            })
        },
        error: function (msg) {
            mbox($, {
                tips: msg.msg
            });
        }

    });
};
query.$searchBtn.on('touchend', function () {
    searchResult()
});

query.$dateBtnSearch.on('touchend', function () {
    searchResult()
});



query.$dateBtn.on('touchend', function () {
    if(query.$searchDateBox.hasClass('hide')){
        query.$searchDateBox.removeClass('hide')
    }else{
        query.$searchDateBox.addClass('hide')
    }
});
