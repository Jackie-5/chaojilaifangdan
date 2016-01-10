/**
 * Created by JackieWu on 12/20/15.
 */
var tpl = require('./tpl');
var mboxHtml = require('../tpl/mbox.html.js');
var Mbox = function ($, options) {
    if(!options.firstMbox){
        options.firstMbox = true;
        $('body').append(tpl.render(mboxHtml, {
            tips: options.tips,
            leftBtn: options.leftBtn,
            rightBtn: options.rightBtn,
            rightBtnTrue: options.rightBtnTrue
        }));
        var mboxBg = $('.J_mbox-bg');
        var mbox = $('.J_mbox');
        var boxBtn = $('.J_m-box-btn');
        mboxBg.removeClass('hide');
        mbox.css('top', ($(window).height() - mbox.height()) / 2);
        boxBtn.find('span').eq(0).on('click', function () {
            options.callback && options.callback();
            options.firstMbox = false;
            mboxBg.remove()
        });
        boxBtn.find('span').eq(1).on('click', function () {
            options.firstMbox = false;
            mboxBg.remove()
        });
    }

};
module.exports = Mbox;
