module.exports='<?js var order_type = \'\',next_order_type = \'\',area = \'\',day=\'\'; ?><?js var href = \'javascript:;\'; ?><?js if(it.data.order_type == 1){ ?><?js     order_type= \'首次来访\'; ?><?js  }else if(it.data.order_type == 2){ ?><?js     order_type= \'再次来访\'; ?><?js  }else if(it.data.order_type == 3){ ?><?js     order_type= \'付意向金\';?><?js  }else if(it.data.order_type == 4){ ?><?js      order_type= \'付定金\'; ?><?js  }else if(it.data.order_type == 5){ ?><?js      order_type= \'签约\'; ?><?js  }else if(it.data.order_type == 6){ ?><?js      order_type= \'待付款\'; ?><?js  }else if(it.data.order_type == 7){ ?><?js      order_type= \'确认付款\'; ?><?js  } ?><?js if(it.data.next_order_type == 1){next_order_type = \'首次来访\';}else if(it.data.next_order_type == 2){next_order_type=\'再次来访\';}else if(it.data.next_order_type == 3){next_order_type=\'付意向金\';}else if(it.data.next_order_type == 4){next_order_type=\'付定金\';}else if(it.data.next_order_type == 5){next_order_type=\'签约\';}else if(it.data.next_order_type == 6){next_order_type=\'待付款\';}else if(it.data.next_order_type == 7){next_order_type=\'确认付款\';} ?><?js if(it.data.house_area != 0){area = it.data.house_area} ?><div class="search-intention"><div class="intention-list"><div class="inten-name"><i class="s-i-icon-1"></i><span>项目名称</span></div><div class="inten-input"><div class="project J_inten-project">@{it.house_name}</div></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-2"></i><span>建筑面积</span></div><div class="inten-input"><input type="text" value="@{area}" class="J_inten-area"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-3"></i><span>客户姓名</span></div><div class="inten-input"><input type="text" value="@{it.data.customer_name}" class="J_inten-name"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-4"></i><span>联系电话</span></div><div class="inten-input"><input type="tel" value="@{it.data.customer_mobile}" maxlength="11" class="J_inten-phone"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-5"></i><span>下一步进度</span></div><div class="inten-cont"><div class="border J_drop"><i></i><span data-value="@{it.data.next_order_type}">@{next_order_type}</span></div><div class="drop J_drop-show hide"><span data-value="2">再次来访</span><span data-value="3">付意向金</span><span data-value="4">付定金</span><span data-value="5">签约</span><span data-value="6">付款</span></div></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-6"></i><span>倒计时</span></div><div class="time-box"><div class="time"><span class="J_diff-days">@{it.data.diff_days}</span></div><label class="btn-icon"><input id="btn-time" type="date"/></label></div></div></div><div class="search-inten-btn"><span class="J_cancel">退订</span><span class="J_submit">提交</span></div><div class="search-tips">注：退订后将被降为D级客户</div>';