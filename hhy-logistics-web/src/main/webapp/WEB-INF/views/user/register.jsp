<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>好好运-欢迎登录</title>
   <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">
<link href="${ctxStatic}/custom/Base.css" rel="stylesheet" type="text/css">
<script src="${ctxStatic}/custom/jquery.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/json2.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/zh-cn.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/jquery-ui.js" type="text/javascript"></script>
<link href="${ctxStatic}/custom/jquery-ui.css" rel="stylesheet" type="text/css">
<script src="${ctxStatic}/custom/util.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/base.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/jquery.form.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/additional-methods.min.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/messages_zh.min.js" type="text/javascript"></script>
<link href="${ctxStatic}/custom/jquery.validate.css" rel="stylesheet" type="text/css">
<link href="${ctxStatic}/custom/Base(1).css" rel="stylesheet" type="text/css">
<link href="${ctxStatic}/custom/common.css" rel="stylesheet" type="text/css">
<link href="${ctxStatic}/custom/user.css" rel="stylesheet" type="text/css">
<script src="${ctxStatic}/custom/user.js" type="text/javascript"></script>
<script src="${ctxStatic}/custom/common.js" type="text/javascript"></script>
<!-- 
<script src="${ctxStatic}/custom/WdatePicker.js" type="text/javascript"></script>
<link href="${ctxStatic}/custom/WdatePicker.css" rel="stylesheet" type="text/css">
 -->
    
    <script type="text/javascript">
        $(function () { Register(); })
    </script>
    <style type="text/css">
       .txt_fixed{ height:28px;}
       .td_r{ width:287px;}
       .td_l{ font-size:14px;}
       .btn_edit{ width:150px; background:rgb(199, 197, 198);}
    </style>

</head>
<body>
    <div id="top">
	<!--
   <div class="h30">
        <ul class="fl">
            <li class="fl top_li "><a href="">首页</a></li>
            <li class="fl top_li "><s></s><a href="javascript:UTIL.bookmark()">收藏</a></li>
            <li class="fl top_li "><s></s><span class="tel">4008-500-156</span></li>
            <li class="fl top_li"></li>
        </ul>
        <ul class="fr">
            <li class="fl top_r_li">您好<a id="welcome_id" href=""></a>,欢迎来到运东西!</li>
            <li class="fl top_r_li" id="welcome">
                <a href="javascript:" target="_self" id="login">[请登陆]</a><span class="m10"></span> <a href="" target="_self">[免费注册]</a>
            </li>
            <li class="fl top_r_li  pl15"><s></s><a href="" target="_self">我的订单</a></li>
            <li class="fl top_r_li  pl15"><s></s><a href="" target="_self">我要承运</a></li>
            <li class="fl top_r_li  pl15"><s></s><a href="" target="_self">消息</a></li>
            <li class="fl top_r_li  pl15"><s></s><a target="_blank" href="">在线客服</a></li>
        </ul>
   </div> 
	-->   
</div>
        <div class="w nav_logo">
             <ul class="fl">
                <li class="fl nav_li">
                    <b class="ico_logo"></b>
                </li>
             </ul>
        </div> 
    <div id="middle">
        <div id="warp">
            <div class="main">
             <div class="main_c">
                
<div>
    <div class="rh">
        <div class="rh_l">
            <ul>
                <li class="cur" t="mobile">手机号注册</li>
				<!--
                <li class="last" t="email">邮箱注册</li>
				-->
            </ul>
        </div>
        <div class="rh_r">
            已有账号?<a href="#" target="_self">马上登录</a>
        </div>
    </div>
    <div class="clear"></div>
    <div class="mt20"></div>
    <div class="rc">
        <form id="form1" method="post" action="#" novalidate="novalidate">
            <input id="PswStrength" name="PswStrength" type="hidden">
            <table width="100%">
                <tbody><tr class="mobile">
                    <td class="td_l"><span class="red">*</span>手机号码</td>
                    <td class="td_r">
                       <input id="MobilePhone" class="txt_fixed" name="MobilePhone" maxlength="40" type="text">
                    </td>
                    <td class="td_p">
                        <div class="tip">
                            <div class="tip_h"></div>
                            <div class="tip_c">
                                <p>请填写真实手机号码</p>
                            </div>
                        </div>
                    </td>
                </tr>
				<!--
                <tr style=" display:none;" class="email">
                    <td class="td_l"><span class="red">*</span>电子邮件</td>
                    <td class="td_r"><input id="Email" class="txt_fixed" name="Email" maxlength="40" type="text"></td>
                    <td class="td_p">
                         <div class="tip">
                            <div class="tip_h"></div>
                            <div class="tip_c">
                                <p>请填写真实电子邮件</p>
                            </div>
                        </div>
                    </td>
                </tr>
				-->
                <tr>
                    <td class="td_l">
                        <div style=" height:40px; line-height:55px;">
                                <span class="red">*</span>密码
                        </div>
                        <div style=" height:20px;"></div>
                    </td>
                    <td class="td_r">
                        <input id="UserPwd" class="txt_fixed" style=" margin-top:15px;" onpaste="return false" name="UserPwd" maxlength="16" type="password">
                        <div style="height:20px;text-align:right;">
                            <label id="sc" class="sc">
                                <span>安全程度：</span><b></b>
                            </label>
                        </div>
                    </td>
                    <td class="td_p">
                        <div class="tip">
                            <div class="tip_h"></div>
                            <div class="tip_c">
                                <p>密码的最小长度是6个字符</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="td_l">
                        <div style=" height:40px; line-height:55px;">
                                <span class="red">*</span>确认密码
                        </div>
                        <div style=" height:20px;"></div>
                    </td>
                    <td class="td_r">
                        <input id="UserRePwd" class="txt_fixed" onpaste="return false" name="UserRePwd" maxlength="16" type="password">
                    </td>
                    <td class="td_p">
                        <div class="tip">
                            <div class="tip_h"></div>
                            <div class="tip_c">
                                <p>请填写确认密码</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr style="display: none">
                    <td>
                        <span class="MemberType"><span>
                            <input id="validemail" style="margin: 8px;" name="ValidateType" type="radio" value="email"></span><span>电子邮件</span><span>
                                <input id="validmobile" name="ValidateType" type="radio" style="margin: 8px;" value="mobile" checked="checked"></span><span>手机号码</span> </span><span></span>
                    </td>
                    <td colspan="2"></td>
                </tr>
				<!--
                <tr style=" height:50px;">
                    <td class="td_l"><span class="red">*</span>验证码&nbsp;&nbsp;</td>
                    <td class="td_r"><input id="VaildateCode" name="VaildateCode" type="text" class="txt_fixed"></td>
                    <td class="td_p"></td>
                </tr>
                <tr>
                    <td class="td_l"></td>
                    <td>
                        <input id="btnVaildateCode" name="btnVaildateCode" value="获取验证码" size="30" type="button" class="btn_flat">
                    </td>
                    <td id="tdvalidate" class="red td_p"></td>
                </tr>
				-->
                <tr style=" height:40px;">
                    <td class="td_l"></td>
                    <td class="td_r">
                        <label>
                            <input type="checkbox" id="agree" name="agree">我已经看过并同意
                            <a target="_blank" href="#">《xxx服务条款》</a>
                        </label>
                    </td>
                    <td class="td_p"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="button" id="btnSubmit" class="btn_edit" name="btnSubmit" value="同意注册"></td>
                    <td></td>
                </tr>
            </tbody></table>
        </form>
    </div>
</div>


             </div>
             <div class="cl"></div>
            </div>
        </div>
       
    </div>
    <div class="cl"></div>
	
    <div id="bottom">
	<!--
  <div class="w" style=" height:120px;">
        <ul>
            <li>
                <div>
                    <a href="http://portal.yundx.com/Article/Help?id=58279098f8794c2bb6abb744e35e8a18" class="bottom_link" target="_blank">关于运东西</a>｜
                    <a href="http://portal.yundx.com/News" class="bottom_link" target="_blank">新闻资讯</a>｜
                    <a href="http://portal.yundx.com/Partners" class="bottom_link" target="_blank">招募供应商</a>｜
                    <a href="http://portal.yundx.com/Partners" class="bottom_link" target="_blank">诚招代理</a>｜
                    <a href="http://portal.yundx.com/Partners" class="bottom_link" target="_blank">诚聘英才</a>｜
                    <a href="http://portal.yundx.com/DownLoad" class="bottom_link" target="_blank">下载专区</a>｜
                    <a href="http://portal.yundx.com/Help" class="bottom_link" target="_blank">常见问题</a>
                    <a href="http://portal.yundx.com/App" class="bottom_link" target="_blank">App下载</a>
                </div>
                <div>
                    <a href="javascript:" class="bottom_link" onclick="Suggestion(&#39;http://portal.yundx.com/Suggestion&#39;)">投诉与建议</a>｜
                    <a href="http://portal.yundx.com/SiteMap" class="bottom_link" target="_blank">网站地图</a>｜
                    <a class="bottom_link click" onclick="ShowPartners()">合作伙伴</a>
                    <a href="http://www.tradelink.com.hk/eng/index.html" class="hide parten bottom_link" target="_blank">｜香港贸易通</a>
                    <a href="http://www.ecidh.com/" class="hide parten bottom_link" target="_blank">｜华东信息</a>
                    <a href="http://www.10000link.com/" class="hide parten bottom_link" target="_blank">｜万联网</a>
                    <a href="http://sms.sh.chinamobile.com/qxt/index.jsp" class="hide parten bottom_link" target="_blank">｜上海中国移动</a>
                    <a href="http://www.cebbank.com/Site/ceb/cn" class="hide parten bottom_link" target="_blank"> ｜光大银行</a>
                    <a href="http://www.ehuatai.com/" class="hide parten bottom_link" target="_blank">｜华泰保险</a>
                    <a href="http://cn.unionpay.com/" class="hide parten bottom_link" target="_blank">｜中国银联</a>
                    <a href="http://www.ymtfreight.com/" class="hide parten bottom_link" target="_blank">｜亿美通</a>
                    <a onclick="ShowPartners()" title="隐藏" class="hide parten bottom_link  click">&lt;&lt;</a>
                </div>
                <div style=" padding-top:10px;"> 2013@ULinkscm.com 版权所有 备案号:
                  <span id="cnzz_stat_icon_1254093506"></span>
                </div>    
            </li>
        </ul>
	</div>  
    -->	
 </div>
</body>
</html>