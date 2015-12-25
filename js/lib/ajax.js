/**
 * Created by JackieWu on 12/22/15.
 */
var mbox = require('./Mbox');
var ajax = function (options) {
    options.data.ak = '8e9b109eedc27959233242342342';
    var ajaxUrl = {
        regist: '/h5_app/interface_supervisit/regist', //用户注册
        login: '/h5_app/interface_supervisit/login', //登录
        update_registration: '/h5_app/interface_supervisit/update_registration', //个人中心更新用户信息
        user_task_count: '/h5_app/interface_supervisit/user_task_count', //今日待办个数
        update_pwd: '/h5_app/interface_supervisit/update_pwd', //找回密码
        get_question: '/h5_app/interface_supervisit/get_question', //获取问答卷信息
        create_customer_test: '/h5_app/interface_supervisit/create_customer_test', //创建用户档案(在用户填写完问卷之后)
        update_customer_info_test: '/h5_app/interface_supervisit/update_customer_info_test',
        get_user_info: '/h5_app/interface_supervisit/get_user_info',//获取用户信息
        user_task_list: '/h5_app/interface_supervisit/user_task_list', //获取今日代办
        get_yanzhengcode: '/h5_app/interface_supervisit/get_yanzhengcode', //获取验证码
        is_yanzhengcode: '/h5_app/interface_supervisit/is_yanzhengcode', //确认验证码
        get_answer_level: '/h5_app/interface_supervisit/get_answer_level', //获取用户等级
        get_customer_info: '/h5_app/interface_supervisit/get_customer_info',
        search_customer_by_level: '/h5_app/interface_supervisit/search_customer_by_level',//按等级查找客户
        customer_order_actio: '/h5_app/interface_supervisit/customer_order_actio',//更新客户状态，再次来访，下意向金，下定，签约，付款
        search_customer: '/h5_app/interface_supervisit/search_customer' //搜索查询
    };
    options.$.ajax({
        url: ajaxUrl[options.url],
        type: 'POST',
        data: options.data,
        success: function (msg) {
            if(msg.result === 1 || msg.result === 10){
                options.success && options.success(msg)
            }else{
                options.error && options.error(msg)
            }
        },
        error: function(msg){
            options.error && options.error(msg)
        }

    })
};

module.exports = ajax;