module.exports='<div class="search-intention"><div class="intention-list"><div class="inten-name"><i class="s-i-icon-1"></i><span>项目名称</span></div><div class="inten-input"><input type="text" value="@{it.data.real_name}" disabled="disabled" class="J_inten-project"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-2"></i><span>建筑面积</span></div><div class="inten-input"><input type="text" placeholder="请输入" value="@{it.data.house_area}" class="J_inten-area"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-3"></i><span>客户姓名</span></div><div class="inten-input"><input type="text" placeholder="请输入" value="@{it.data.real_name}" class="J_inten-name"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-4"></i><span>联系电话</span></div><div class="inten-input"><input type="tel" placeholder="请输入" value="@{it.data.real_mobile}" maxlength="11" class="J_inten-phone"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-5"></i><span>下一步进度</span></div><div class="inten-cont"><div class="border J_drop"><i></i><span>付意向金</span></div><div class="drop J_drop-show hide"><span>再次来访</span><span>付意向金</span><span>付定金</span><span>签约</span><span>付款</span></div></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-6"></i><span>计划时间</span></div><div class="time-box"><div class="time"><span>@{it.time}</span></div><label for="btn-time" class="btn-icon"><input id="btn-time" type="date" class="hide"/></label></div></div></div><div class="search-inten-btn"><span class="J_cancel">退订</span><span class="J_submit">提交</span></div><div class="search-tips">注：退订后将被降为D级客户</div>';