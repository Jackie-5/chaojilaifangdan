module.exports='<div class="wait"><?js it.forEach(function(item,k){ ?><div class="box"><div class="wait-title"><div class="title-bg"><span>@{item.order_type_name}</span></div></div><?js item.list.forEach(function(listItem, i){ ?><div class="wait-list J_wait-list"><div class="list-box"><div class="list-left"><i class="list-icon-01"></i><span>客户姓名</span></div><div class="list-right"><span>@{listItem.customer_name}</span></div></div><div class="list-box"><div class="list-left"><i class="list-icon-02"></i><span>当前级别</span></div><div class="list-right"><span>@{listItem.level}级客户</span><a href="#"><i class="right-icon-3"></i></a></div></div><div class="list-box"><div class="list-left"><i class="list-icon-03"></i><span>最新接触</span></div><div class="list-right"><span>@{listItem.lasttime}</span></div></div><div class="list-box"><div class="list-left"><i class="list-icon-04"></i><span>邀约来访</span></div><div class="list-right"><a href="tel:@{listItem.customer_mobile}"><i class="right-icon-1"></i></a><a href="sms:@{listItem.customer_mobile}"><i class="right-icon-2"></i></a></div></div><div class="list-box"><div class="list-left"><i class="list-icon-05"></i><span>计划时间</span></div><div class="list-right"><span>@{listItem.diff_days}天</span><label for="input-@{k}-@{i}"><input type="date" id="input-@{k}-@{i}" class="hide"/><i class="right-icon-3"></i></label></div></div></div><?js }); ?></div><?js }); ?></div>';