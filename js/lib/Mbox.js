/**
 * Created by JackieWu on 12/20/15.
 */
var tpl = require('./tpl');
var mboxHtml = require('../tpl/mbox.html.js');
var mbox = function ($, options) {
    $('body').append(tpl.render(mboxHtml, {
        tips: options.tips,
        leftBtn: options.leftBtn,
        rightBtn: options.rightBtn
    }));
    var mboxBg = $('.J_mbox-bg');
    var mbox = $('.J_mbox');
    var boxBtn = $('.J_m-box-btn');
    mboxBg.removeClass('hide');
    mbox.css('top', ($(window).height() - mbox.height()) / 2);
    boxBtn.find('span').eq(0).on('click', function () {
        options.callback && options.callback();
        mboxBg.addClass('hide').remove()
    });
    boxBtn.find('span').eq(1).on('click', function () {
        mboxBg.addClass('hide').remove()
    });

};
module.exports = mbox;
