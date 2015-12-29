/**
 * Created by JackieWu on 12/20/15.
 */
var tpl = require('./tpl');
var mboxHtml = require('../tpl/mbox.html.js');
var mbox = function ($, options) {
    $('body').append(tpl.render(mboxHtml, {
        tips: options.tips
    }));
    var mboxBg = $('.J_mbox-bg');
    var mbox = $('.J_mbox');
    mboxBg.removeClass('hide');
    mbox.css('top', ($(window).height() - mbox.height()) / 2);
    $('.J_m-box-btn').on('click', function () {
        options.callback && options.callback();
        mboxBg.addClass('hide').remove()
    });
};
module.exports = mbox;
