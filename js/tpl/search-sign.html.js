module.exports='<div class="search-intention"><div class="intention-list"><div class="inten-name"><i class="s-i-icon-1"></i><span>项目名称</span></div><div class="inten-input"><input type="text" value="@{it.house_name}" disabled="disabled" class="J_inten-project"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-7"></i><span>购房房号</span></div><div class="inten-input house-number"><input type="text" value="@{it.data.house_number}" class="J_inten-number input-center"/><div class="separated">栋</div><input type="text" value="@{it.data.house_floor}" class="J_inten-floor input-center"/><div class="separated">层</div><input type="text" value="@{it.data.house_room}" class="J_inten-room input-center"/><div class="separated">号</div></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-2"></i><span>建筑面积</span></div><div class="inten-input"><input type="tel" value="@{it.data.house_area}" placeholder="请输入" class="J_inten-area"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-3"></i><span>客户姓名</span></div><div class="inten-input"><input type="text" value="@{it.data.real_name}" placeholder="请输入" class="J_inten-name"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-4"></i><span>联系电话</span></div><div class="inten-input"><input type="tel" value="@{it.data.real_mobile}" placeholder="请输入" class="J_inten-phone"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-9"></i><span>购房总价</span></div><div class="inten-input"><div class="icon-money">￥</div><input type="tel" value="@{it.data.total_price}" placeholder="请输入" class="J_inten-price"/></div></div><div class="intention-list"><div class="inten-name"><i class="s-i-icon-10"></i><span>购房单价</span></div><div class="inten-input"><div class="icon-money">￥</div><div class="unit J_unit">@{it.data.price}</div></div></div></div><div class="unit-tips">注：输入总价后自动换算单价</div><div class="search-unit-btn J_search-unit-btn J_submit">提交</div>';