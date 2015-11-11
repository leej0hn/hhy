function LoginLoad() {
    var validtor = new Validator("frmLogin", {
        rules: {
            UserCode: { required: true },
            Password: { required: true },
            VerifiyCode: { required: true }
        }
    });
    $("#btnlogin").click(function () {
    	var url = "login";
        AJAX.formSubmit({
            target: $("#frmLogin"),
            url: url,
            validator: validtor,
            callback: function (reponse) {
                if (reponse.code == "0") {
                	window.location.href = ctxJS+reponse.data.url;
                } else {
                    alert(reponse.mes);
                    document.getElementById('verifyimage').src=ctxFullJS+'/servlet/validateCodeServlet?'+Math.round(Math.random()*10000);
                }
            }
        });
    })
}
function CommonPageLoad() {
    $("#login").click(function () {
        Login();
    })
    $("#loginout").click(function () {
        LoginOut();
    })
}
//登陆
function Login() {
    var redirectUrl = window.top.location.href;
    var url = LOGIN_URL;
    url += "?RedirectUrl=" + escape(redirectUrl);
    window.top.location.href = url;
}
//异步登陆
function AsyncLogin() {
//    var redirectUrl = UTIL.getUrlParam("RedirectUrl");
    var url = ASYNCLOGIN_URL;
//    if (redirectUrl) {
//        url += "?RedirectUrl=" + escape(redirectUrl);
//    }
    window.top.PICKER.open(url, '用户登录', 410, 380);
}
//登出
function LoginOut() {
    if (confirm('您确定退出?')) {
        $(document.body).append("<iframe src=\"/Passport/LoginOut\"></iframe>")
    }
}
//更新顶部
function RefreshTop(name, code) {
    $("#welcome").html("<a  onclick=\"LoginOut()\" target=\"_self\" href=\"javascript:void\" >[退出]</a>");
    $("#welcome_id").text(code);
}
function Suggestion(url) {
    PICKER.open(url, '投诉与建议', 460, 350);
}
function ShowPartners() {
    $(".parten").toggle();
}
//强制客户端登陆
var isLogin = false;
function ForceLogin() {
    AJAX.submit({
        url: "login",
        isAsync: false,
        callback: function (reponse) {
            if (reponse.IsSuccess) {
                isLogin = true;
            }
        }
    });
    if (!isLogin) {
        AsyncLogin();
    }
    return isLogin;
}
//地址控件，公共取值
function GetLoaction(originId, destId) {
    var l = { OriginName: "", OriginId: "", DestName: "", DestId: "", PostData: "" };
    originId = originId || "OriginArea";
    destId = destId || "DestArea";
    l.OriginName = $("#" + originId).val();
    l.OriginId = $("#" + originId).attr("code");
    if (l.OriginId == undefined) {
        l.OriginId = "";
        l.OriginName = "";
    }
    var items = l.OriginId.split('-');
    if (items.length > 0) {
        l.OriginProvinceId = items[0];
    }
    if (items.length > 1) {
        l.OriginCityId = items[1];
    }
    if (items.length > 2) {
        l.OriginAreaId = items[2];
    }
    l.DestName = $("#" + destId).val();
    l.DestId = $("#" + destId).attr("code");
    if (l.DestId == undefined) {
        l.DestId = "";
        l.DestName = "";
    }
    items = l.DestId.split('-');
    if (items.length > 0) {
        l.DestProvinceId = items[0];
    }
    if (items.length > 1) {
        l.DestCityId = items[1];
    }
    if (items.length > 2) {
        l.DestAreaId = items[2];
    }
    l.PostData = "OriginName=" + l.OriginName + "&OriginId=" + l.OriginId + "&DestName=" + l.DestName + "&DestId=" + l.DestId;
    return l;
}