/**
 * Created by JackieWu on 12/24/15.
 */
var Drop = function($,callback){
    var query = {
        $drop: $('.J_drop'),
        $show: $('.J_drop-show')
    };
    query.$drop.off('click').on('click', function () {
        if(query.$show.hasClass('hide')){
            query.$show.removeClass('hide');
            query.$show.find('span').off('click').on('click', function () {
                query.$drop.find('span').html($(this).html()).attr('data-value',$(this).attr('data-value'));
                query.$show.addClass('hide');
                callback && callback($(this).index())
            });
        }else{
            query.$show.addClass('hide');
        }
    })
};
module.exports = Drop;