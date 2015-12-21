Date.prototype.DateToParse = function () {
    var d = this;
    return Date.parse(d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate());
};
function CreateCalendar(para,$) {//c:容器,y:年,m:月,a:出发时间json,f:是否显示双日历,clickfu:点击事件回调函数,showFu:在日历里显示附加内容的回调函数
    var c = para.c;
    var y = para.y;
    var m = para.m;
    var a = para.a;
    var f = para.f;

    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (y == 0 || m == 0) {
        y = today.getFullYear();
        m = today.getMonth() + 1;
    }
    var dmin = a.d1.replace(/-/g, "/"), dmax = a.d2.replace(/-/g, "/");

    var i1 = 0, i2 = 0, i3 = 0, d2;
    var d1 = new Date(dmin),
        today = today.DateToParse();
    if (Date.parse(d1.getFullYear() + '/' + (d1.getMonth() + 1) + '/1') > Date.parse(new Date(y, m - 1, 1))) {
        y = d1.getFullYear();
        m = d1.getMonth() + 1;
    }
    $('.' + c).html('');
    //农历
    var tmp = '';
    for (var i = 0; i <= f; i++) {
        d1 = new Date(y, m - 1 + i);
        y = d1.getFullYear();
        m = d1.getMonth() + 1;
        tmp += '<tbody class="c-date-title"></th></tr>';
        tmp += '  <tr class="week">';
        tmp += '    <th class="weekEnd">S</th>';
        tmp += '    <th>M</th>';
        tmp += '    <th>T</th>';
        tmp += '    <th>W</th>';
        tmp += '    <th>T</th>';
        tmp += '    <th>F</th>';
        tmp += '    <th class="weekEnd">S</th>';
        tmp += '  </tr></tbody>';
        var maxdays = (new Date(Date.parse(new Date(y, m, 1)) - 86400000)).getDate();  //当前月的天数
        d1 = new Date(y, m - 1); //要显示的日期
        i1 = d1.getDay(); //这个月的第一天是星期几
        for (var j = 1; j <= 6; j++) {
            tmp += '<tr>';
            for (var k = 1; k <= 7; k++) {
                i2 = (j - 1) * 7 + k - i1;
                if (i2 < 1 || i2 > maxdays) {
                    tmp += '<td />';
                } else {
                    i3 = Date.parse(new Date(y, m - 1, i2));
                    d1 = new Date(i3);
                    tmp += '<td';
                    if (today == i3) {
                        tmp += ' class="cur"'
                    }
                    if (i3 < dmin || i3 > dmax) {
                        tmp += '><p><em>' + i2 + '</em></td>';
                    } else {
                        tmp += ' week="' + (k - 1) + '" id="' + y + '-' + m + '-' + i2 + '"><em>' + i2 + '</em></td>';

                    }
                }
            }
            tmp += '</tr>';
        }
        tmp += '</table>';

    }
    $('.' + c).append(tmp);
}
module.exports = CreateCalendar;