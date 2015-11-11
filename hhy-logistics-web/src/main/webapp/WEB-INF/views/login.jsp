<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>好好运-欢迎登录</title>
	<link href="${ctxStatic}/custom/Base.css" rel="stylesheet" type="text/css">
	<script src="${ctxStatic}/custom/jquery.js" type="text/javascript"></script>
	<script src="${ctxStatic}/custom/json2.js" type="text/javascript"></script>
	<script src="${ctxStatic}/custom/zh-cn.js" type="text/javascript"></script>
	<script src="${ctxStatic}/custom/jquery-ui.js" type="text/javascript"></script>
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
	
    <style type="text/css">
           #middle{ background-color:#EE2843; height:547px; text-align:center;}
          #warp{ width:1000px; position:relative; margin:0 auto;}
          .login_m{ float:right; width:374px; height:378px;background-color:#fff; margin-top:86px;}
          .login_m_h{font-size:20px; height:27px;line-height:27px;padding-left:45px;padding-top:20px;color:#666}
          .login{ text-align:left;}
    </style>
    <script type="text/javascript">
	    var ctxJS = '${ctx}';
	    var ctxStaticJS = '${ctxStatic}';
	    var ctxFullJS = '${ctxFull}';
	    $(function () {
	        if (window != window.top) {
	            window.top = window.location.href;
	            return;
	        }
	        LoginLoad();
	    })
    </script>
   </head>
   <body>
       <div id="nav">
        <div class="w nav_logo">
             <ul class="fl">
                <li class="fl nav_li">
                    <a href="#"><img src="" width="236px" height="62px"></a> 
                </li>
             </ul>
        </div>
       </div>
       <div id="middle">
            <div id="warp">
                <div class="login">
                     <div class="login_ad"></div>
                     <div class="login_m">
                          <div class="login_m_h">会员登录</div>
                         <form id="frmLogin" novalidate="novalidate">
                            <div class="userName">
                                <span>账号</span>
                                <div><input type="text" tabindex="1" class="txt_fixed" id="username" name="username" value=""></div>
                            </div>
                            <div class="userPsw">
                                <span>密码</span>
                                <div><input class="txt_fixed" type="password" tabindex="1" id="password" name="password" title="请输入密码" value=""></div>
                            </div>
                            <div class="validate">
                                <span>验证码</span>
                                <div>
                                    <input type="text" id="validateCode" class="txt_fixed" tabindex="1" style=" width:80px;" name="validateCode">
                                    <img id="verifyimage" title="验证码" style="width: 75px; height: 25px; vertical-align: middle" align="absmiddle" src="${pageContext.request.contextPath}/servlet/validateCodeServlet?+new Date().getTime();" alt="" >
                                    <a href="javascript:" id="actRefrash" title="点击可重新生成验证码" 
                                    onclick="javascript:document.getElementById('verifyimage').src='${ctxFull}/servlet/validateCodeServlet?'+Math.round(Math.random()*10000)">看不清</a>                
                                </div>
                            </div>
                            <div class="loginInfo">
                                <a href="#" target="_blank" style=" color:#005AA0; margin-left:12px;">忘记密码</a>
                                <a href="#" style=" color:#005AA0; margin-left:12px;">注册账号</a>
                            </div>
                            <div class="loginBtn">
                                <button class="loginButton" type="button" id="btnlogin">登录</button>
                            </div>
							
                        </form>
                     </div>
                     <div class="cl"></div>
                </div>
            </div>
       </div>
	   <!--
       <div id="bottom">
		<div class="w" style=" height:120px;">
        <ul>
            <li>
                <div>
                    <a href="#" class="bottom_link" target="_blank">关于好好运</a>｜
                    <a href="#" class="bottom_link" target="_blank">新闻资讯</a>｜
                    <a href="#" class="bottom_link" target="_blank">招募供应商</a>｜
                    <a href="#" class="bottom_link" target="_blank">诚招代理</a>｜
                    <a href="#" class="bottom_link" target="_blank">诚聘英才</a>｜
                    <a href="#" class="bottom_link" target="_blank">下载专区</a>｜
                    <a href="#" class="bottom_link" target="_blank">常见问题</a>
                    <a href="#" class="bottom_link" target="_blank">App下载</a>
                </div>
                <div>
                    <a href="javascript:" class="bottom_link" >投诉与建议</a>｜
                    <a href="#" class="bottom_link" target="_blank">网站地图</a>｜
                    <a class="bottom_link click" >合作伙伴</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜香港贸易通</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜华东信息</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜万联网</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜上海中国移动</a>
                    <a href="#" class="hide parten bottom_link" target="_blank"> ｜光大银行</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜华泰保险</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜中国银联</a>
                    <a href="#" class="hide parten bottom_link" target="_blank">｜亿美通</a>
                    <a title="隐藏" class="hide parten bottom_link  click">&lt;&lt;</a>
                </div>
                <div style=" padding-top:10px;"> 2013@***.com 版权所有 备案号:XXXXX
                  <span id="cnzz_stat_icon_1254093506"></span>
                </div>    
            </li>
        </ul>
		</div>      
 	</div>
     -->
 </body>
 </html>