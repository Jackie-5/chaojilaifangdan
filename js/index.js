/**
 * Created by JackieWu on 12/20/15.
 */
var $ = require('./common/zepto');
var ajax = require('./lib/ajax');
var Calendar = require('./common/Calendar');
var Url = require('./lib/get-url');
var Mbox = require('./lib/Mbox');
var tpl = require('./lib/tpl');
var cookie = require('./lib/cookie');
var linkHtml = require('./tpl/index-link-tpl.html');
var date = new Date();
var YEAR = date.getFullYear();
var MONTH = date.getMonth() + 1;
var DAY = date.getDate();

var ua = navigator.userAgent;

var maxsize = 100 * 1024;

var url = new Url();
var tplRender = tpl.render;
var user_id = url.parameter('user_id');
var house_id = house_id;
var house_name = house_name;

var query = {
    $day: $('.J_index-day'),
    $center: $('.J_center'),
    $photo: $('.J_photo'),
    $wait: $('.J_wait-box'),
    $number: $('.J_wait-number'),
    $linkBox: $('.J_link-box'),
    $search: $('.J_search'),
    $deal: $('.J_deal'),
    $photoInput: $('#photo'),
    $indexTitle: $('.J_index-title-01'),
    $todayClick: $('.J_today-click'),
    $photoLoad: $('.J_photo-load'),
    $purchasing: $('.J_purchasing')
};
//设置今天日期
var main = function () {
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
    query.$center.on('click', function () {
        location.href = 'personal.html?user_id=' + user_id + '&house_id=' + house_id + '&house_name=' + house_name
    });
//客户查询
    query.$search.on('click', function () {
        location.href = 'search.html?user_id=' + user_id + '&house_id=' + house_id + '&house_name=' + house_name + '&order_type=20'
    });
//成交助手
    query.$deal.on('click', function () {
        location.href = 'deal.html?user_id=' + user_id + '&deal_index=6' + '&deal_page_index=0' + '&house_id=' + house_id + '&house_name=' + house_name
    });

    query.$purchasing.on('click', function () {
        new Mbox($, {
            tips: '新功能即将开通'
        });
    });

    query.$todayClick.on('click', function () {
        location.href = 'today.html?user_id=' + user_id + '&house_id=' + house_id + '&house_name=' + house_name
    });

    query.$linkBox.html(tplRender(linkHtml, {
        user_id: user_id,
        house_id: house_id,
        house_name: house_name
    }));

    query.$indexTitle.on('click', function () {
        if (query.$linkBox.hasClass('hide')) {
            query.$linkBox.removeClass('hide')
        } else {
            query.$linkBox.addClass('hide')
        }
    });

    //同时去访问一次
    ajax({
        $: $,
        url: 'get_user_info',
        data: {
            user_id: user_id
        },
        success: function (msg) {
            query.$photo.attr('src', msg.data.head_pic);
            uploadImage(msg.data.user_mobile);
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }

    });

    //待办事项总数
    ajax({
        $: $,
        url: 'user_task_count',
        data: {
            user_id: user_id
        },
        success: function (msg) {
            query.$number.html(msg.data);
        },
        error: function (msg) {
            new Mbox($, {
                tips: msg.msg
            });
        }

    });

};

// 判断参数
if (user_id && house_id && house_name) {
    main();
} else if (cookie.getCookie('user_id') && cookie.getCookie('house_id') && cookie.getCookie('house_name')) {
    user_id = cookie.getCookie('user_id');
    house_id = cookie.getCookie('house_id');
    house_name = cookie.getCookie('house_name');
    main();
} else {
    location.href = './login.html'
}


var uploadImage = function (mobile) {
    query.$photoInput.on('change', function () {
        var file = this.files[0];
        if (!/image\/\w+/.test(file.type)) {
            new Mbox($, {
                tips: '请上传图片'
            });
            return false;
        }

        query.$photoLoad.hasClass('hide') ? query.$photoLoad.removeClass('hide') : query.$photoLoad.addClass('hide');

        var readBase64 = new FileReader();
        if (!(ua.indexOf('Android') > -1 && ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger")) {
            // 将文件以Data URL形式读入页面
            readBase64.addEventListener('load', function () {
                var result = this.result;
                var img = new Image();
                img.src = result;
                if (result.length <= maxsize) {
                    img = null;
                    upload(result, file.type, mobile);
                    return;
                }
                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }
                function callback() {
                    var data = compress(img);
                    upload(data, file.type, mobile);
                    img = null;
                }
            });
        } else {
            // upload
            var formData = new FormData();
            formData.append('user_mobile', mobile);
            formData.append('head_pic', file);
            uploadAjax(formData)
        }

        readBase64.readAsDataURL(file);
    });
};


var upload = function (basestr, type, mobile) {
    // upload
    var text = window.atob(basestr.split(",")[1]);
    var buffer = new Uint8Array(text.length);
    for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }
    var blob = getBlob(buffer, type);
    var formData = new FormData();

    formData.append('user_mobile', mobile);
    formData.append('head_pic', blob);
    uploadAjax(formData)
};

var uploadAjax = function (formData) {
    ajax({
        $: $,
        url: 'update_registration',
        data: formData,
        uploadFile: true,
        success: function (updateMsg) {
            query.$photo.attr('src', updateMsg.head_pic);
            query.$photo.on('load', function () {
                query.$photoLoad.addClass('hide')
            });
            new Mbox($, {
                tips: updateMsg.msg
            });
        },
        error: function (updateMsg) {
            new Mbox($, {
                tips: updateMsg.msg
            });
        }
    });
};

function getBlob(buffer, format) {
    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    if (Builder) {
        var builder = new Builder;
        builder.append(buffer);
        return builder.getBlob(format);
    } else {
        return new window.Blob([buffer], {type: format});
    }
}

function compress(img) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var tCanvas = document.createElement("canvas");
    var tctx = tCanvas.getContext("2d");
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
//        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', 0.1);
    //alert('压缩前：' + initSize);
    //alert('压缩后：' + ndata.length);
    //alert('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}
