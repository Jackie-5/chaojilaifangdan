/**
 * Created by JackieWu on 16/1/2.
 */
var ua = navigator.userAgent;
var dateChange = function ($, container,cb) {
    var setStarInterVal;
    var time = '';
    if(ua.indexOf('Android') > -1 && ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger"){
        container.on('click', function () {
            var _this = $(this);
            setStarInterVal = setInterval(function () {
                if(time.toString() !== container.val().toString()){
                    if(time.toString() ===  container.val().toString() && time !== ''){
                        time = container.val();
                        cb && cb(time,_this);
                        clearInterval(setStarInterVal);
                    }
                }
            },1);
        });
    }else{
        container.on('blur', function () {
            var _this = $(this);
            time = container.val();
            cb && cb(time,_this);
        })

    }
};
module.exports = dateChange;