/**
 * Created by JackieWu on 12/22/15.
 */
var Mbox = require('./Mbox');
var ajax = function (options) {
    options.data.ak = '57b7e940555a331c45f1f3aafa41320e';
    var ajaxUrl = {
        regist: '/h5_app/interface_supervisit/regist', //用户注册
        login: '/h5_app/interface_supervisit/login', //登录
        house_list: '/h5_app/interface_supervisit/house_list', //获取楼盘id
        update_registration: '/h5_app/interface_supervisit/update_registration', //个人中心更新用户信息
        user_task_count: '/h5_app/interface_supervisit/user_task_count', //今日待办个数
        update_pwd: '/h5_app/interface_supervisit/update_pwd', //找回密码
        get_question: '/h5_app/interface_supervisit/get_question', //获取问答卷信息
        customer_visit_agin: '/h5_app/interface_supervisit/customer_visit_agin', //再次来访获取答案
        create_customer_test: '/h5_app/interface_supervisit/create_customer_test', //创建用户档案(在用户填写完问卷之后)
        update_customer_info_test: '/h5_app/interface_supervisit/update_customer_info_test', //更新用户信息
        get_user_info: '/h5_app/interface_supervisit/get_user_info',//获取用户信息
        user_task_list: '/h5_app/interface_supervisit/user_task_list', //获取今日代办
        update_order_type: '/h5_app/interface_supervisit/update_order_type', //更新用户等级
        get_yanzhengcode: '/h5_app/interface_supervisit/get_yanzhengcode', //获取验证码
        is_yanzhengcode: '/h5_app/interface_supervisit/is_yanzhengcode', //确认验证码
        get_answer_level: '/h5_app/interface_supervisit/get_answer_level', //获取用户等级
        get_customer_info: '/h5_app/interface_supervisit/get_customer_info', //获取用户信息
        search_customer_by_level: '/h5_app/interface_supervisit/search_customer_by_level',//按等级查找客户
        customer_order_action: '/h5_app/interface_supervisit/customer_order_action',//更新客户状态，再次来访，下意向金，下定，签约，付款
        search_customer: '/h5_app/interface_supervisit/search_customer', //搜索查询
        get_customer_dynamic_state: '/h5_app/interface_supervisit/get_customer_dynamic_state', //成交助手
        update_task_time: '/h5_app/interface_supervisit/update_task_time' //更新用户时间线
    };
    // 'http://Laifangdan.searchchinahouse.com'
    options.$.ajax({
        url: 'http://Laifangdan.searchchinahouse.com' + ajaxUrl[options.url],
        type: 'POST',
        data: options.data,
        processData: !options.uploadFile,
        contentType: options.uploadFile ? false : undefined,
        success: function (msg) {
            if(typeof msg === 'string') msg = JSON.parse(msg);
            if (msg.result === 1 || msg.result === 10) {
                options.success && options.success(msg)
            } else {
                options.error && options.error(msg)
            }
        },
        error: function (msg) {
            if(typeof msg === 'string') msg = JSON.parse(msg);
            options.error && options.error(msg)
        }

    })
};

module.exports = ajax;
