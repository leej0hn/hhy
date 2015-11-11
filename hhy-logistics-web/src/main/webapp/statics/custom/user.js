//注册界面
function Register() {
    var nodeType = "mobile"; //选中节点
    var wait=60;
    var intervalId;//定时器
    var validator;
    function init() 
    {
        $(".rh_l li").each(function (index) {
            $(this).click(function () {
                $(".rh_l li.cur").removeClass("cur");
                $(this).addClass("cur");
                nodeType = $(this).attr("t");
                if (nodeType == "mobile") {
                    $(".mobile").show();
                    $(".email").hide();
                    $("#Email").val("");
                } else {
                    $(".email").show();
                    $(".mobile").hide();
                    $("#MobilePhone").val("");
                }
                changeValidator();
            });
        });
        //通过id查找要进行校验的表单
        validator = new Validator("form1", {
            rules: {
            	UserPwd: {
                    required: true,
                    minlength: 6
                },
                UserRePwd: {
                    required: true,
                    equalTo: "#UserPwd"
                }
            },
            messages: {
            	UserPwd: {
                    required: "请输入密码",
                    minlength: "密码的最小长度是{0}个字符"
                },
                UserRePwd: {
                    required: "请输入确认密码",
                    equalTo: "两个密码不一致，请重新输入"
                }
            }
        });
        $("#btnVaildateCode").click(function () {
            var dest;
            if (nodeType == "mobile") {
                dest = $("#MobilePhone").val();
//                if (!validator.element("#MobilePhone")) {
//                    return false;
//                }
                var opts = {
                    sourceId: "btnVaildateCode",
                    templateId: "ValidateCode_SMS",
                    dest: dest
                }
                EMITTER.MobileSend(opts);
            }
            else if (nodeType == "email") {
                dest = $("#Email").val();
                if (!validator.element("#Email")) {
                    return false;
                }
                var data = { type: nodeType, dest: dest };
                AJAX.post("/Register/SendEmail", data, function (reponse) {
                    if (reponse.IsSuccess) {
                        $("#btnVaildateCode").attr("disabled", "disabled");
                        $("#btnVaildateCode").css("color", "gray");
                        intervalId = window.setInterval(function () {
                            if (wait > 0) {
                                $("#btnVaildateCode").val("验证码已发送," + wait + "秒后重新获取验证码");
                                wait--;
                            } else {
                                wait = 60;
                                $("#btnVaildateCode").val("获取验证码");
                                $("#btnVaildateCode").removeAttr("disabled");
                                $("#btnVaildateCode").css("color", "black");
                                window.clearInterval(intervalId);
                            }
                        }, 1000);

                    } else {
                        alert(reponse.Error);
                    }
                });
            }
        });
        $("#agree").click(function (o) {
            if ($("#agree").attr("checked")) {
                $("#btnSubmit").css("background", "#c2264d");
            } else {
                $("#btnSubmit").css("background", "rgb(199, 197, 198)");
            }
         });
         $("#btnSubmit").click(function () {
             if ($("#agree").attr("checked")) {
                 AJAX.formSubmit({
                     target: $("#form1"),
                     validator: validator,
                     callback: function (reponse) {
                         if (reponse.code == 0 ) {
                        	 window.location.href = ctxJS ;
                         } else {
                             alert(reponse.mes);
                         }
                     }
                 })
             } else {
                 return false;
             }
         });
//        $("#UserPwd").bind("keyup", function () {
//            var level = UTIL.setSecurityLevel('UserPwd', 'pwdstrength');
//        });
        $("#UserPwd").bind("keydown", function () {
            var level = UTIL.setSecurityLevel('UserPwd', 'sc');
        });
        changeValidator();
    };
    //改变验证规则
    function changeValidator() {
        $("#MobilePhone").rules("remove");
        $("#Email").rules("remove");
        if (nodeType == "mobile") {
            $("#MobilePhone").rules("add", {
                required: true,
                digits: true,
                mobile: true,
                rangelength: [11, 14],
                remote: {
                    url: "/Register/Check"
                },
                messages: {
                    required: '请输入手机号码',
                    digits: '请输入数字',
                    rangelength: '请输入{0}到{1}的值',
                    remote: '手机号码已被注册'
                }
            });
        } else {
            $("#Email").rules("add", {
                required: true,
                email: true,
                remote: {
                    url: "/Register/Check"
                },
                messages: {
                    required: '请输入电子邮件',
                    remote: '电子邮件已被注册'
                }
            });
        }
    };
    init();
}
//完善信息界面
function Complete() {
    var referrer = "销售代理";
    var validator;
    var id;
    function init() {
        id = $("#Id").val();
        //通过id查找要进行校验的表单
        validator = new Validator("form1", {
            rules: {
                UserCode: {
                    required: true,
                    rangelength: [6, 40],
                    remote: {
                        url: "/Register/Check?Id=" + id
                    }
                },
                UserName:{
                    required: true
                },
                SourceReferrer: {
                    required: function (element) {
                        if ($("#Source").val() == referrer) {
                            return true;
                        } else { return false; }
                    }
                },
                MobilePhone: {
                    mobile: true
                },
                Email: {
                    email:true
                }
            },
            messages: {
                UserCode: {
                    required: "请输入登录账号",
                    rangelength: "登录账号长度必须为{0}到{1}个数字或英文字符",
                    remote: "登录账号已存在"
                },
                SourceReferrer: {
                    required: "请输入销售代码"
                }
            }
        });
        $("#Source").bind("change", function () {
            if ($("#Source").val() == referrer) {
                $(".referrer").show();
            } else {
                $(".referrer").hide();
            }
            $("#SourceReferrer").val("");
        });
        $("#btnSubmit").click(function () {
            AJAX.formSubmit({
                target: $("#form1")
                , validator: validator
            })
        });
    };
    init();
}
//修改密码
function ChangePassword() {
    var validator;
    function init() {
        validator = new Validator('ChangePassword', {
            rules: {
                OldUserPwd: { required: true },
                UserPwd: { required: true, minlength: 6 },
                UserPwdConfirm: {
                    equalTo: "#UserPwd",
                    required: true
                }
            }
        });
        $("#btnSubmit").click(function () {
            AJAX.formSubmit({ target: $("#ChangePassword"), validator: validator, callback: function (response) {
                if (response.IsSuccess) {
                    alert("修改成功");
                    window.top.PICKER.close();
                }
                else {
                    alert(response.Error);
                }
            }
            });
        });
        $("#UserPwd").bind("keydown", function () {
            var level = UTIL.setSecurityLevel('UserPwd', 'sc');
        });
    }
    init();
}
//基本信息
function Info() {
    var validator;
    function init() {
        $(".centerTitle ul li").click(function () {
            var tab = $(this);
            $(".centerTitle ul li").removeClass("cur");
            tab.addClass("cur");
            $(".part").hide();
            if (tab.html() == "基本信息") {
                $("#userInfo").show();
            }
            else if (tab.html() == "公司信息") {
                $("#officeInfo").show();
            }
            else if (tab.html() == "联系人信息") {
                $("#contactInfo").show();
            }
        });
        $("#btnSubmitUser").click(function () {
            validator = new Validator('UserInfo', {
                rules: {
                    UserName: { required: true },
                    MobilePhone: { mobile: true }
                }
            });
            AJAX.formSubmit({ target: $("#UserInfo"), validator: validator, callback: function (response) {
                if (response.IsSuccess) {
                    alert("保存成功");
                }
                else {
                    alert(response.error);
                }
            }
            });
        });
        $("#btnSubmitContact").click(function () {
            validator = new Validator('ContactInfo', {
                rules: {
                    Name: { required: true },
                    MobilePhone: { required: true, mobile: true },
                    Email: { required: true, email: true },
                    Address: { required: true }
                }
            });
            AJAX.formSubmit({ target: $("#ContactInfo"), validator: validator, callback: function (response) {
                if (response.IsSuccess) {
                    alert("保存成功");
                }
                else {
                    alert(response.error);
                }
            }
            });
        });
        $("#btnSubmitOffice").click(function () {
            validator = new Validator('OfficeInfo', {
                rules: {
                    Name: { required: true },
                    Address: { required: true },
                    PostalCode: { required: true },
                    TeleAreaCode: { required: true },
                    TeleCode: { required: true },
                    TeleExtCode: { required: true },
                    FaxAreaCode: { required: true },
                    FaxCode: { required: true },
                    OpenBank: { required: true },
                    BankAccount: { required: true },
                    LegalPerson: { required: true },
                    TaxRegisterNo: { required: true }
                }
            });
            $("#Telephone").val($("#TeleAreaCode").val() + "," + $("#TeleCode").val() + "," + $("#TeleExtCode").val());
            $("#Fax").val($("#FaxAreaCode").val() + "," + $("#FaxCode").val());
            AJAX.formSubmit({ target: $("#OfficeInfo"), validator: validator, callback: function (response) {
                if (response.IsSuccess) {
                    alert("保存成功");
                }
                else {
                    alert(response.error);
                }
            }
            });
        });
        $("#OfficePic").click(function () {
            var relationid = $("#ForeignRelationId").val();
            var id = $("#OfficeInfo #Id").val();
            var url = "/User/Attachment?officeId=" + id + "&relationId=" + relationid;
            PICKER.open(url, "公司图片管理", 600, 450);
        });
    }
    init();
}

////基本信息
//function UserInfo() {
//    var validator;
//    function init() {
//        validator = new Validator('UserInfo', {
//            rules: {
//                UserName: { required: true }
//            }
//        });
//        $("#btnSubmitUser").click(function () {
//            AJAX.formSubmit({ target: $("#UserInfo"), validator: validator, callback: function (response) {
//                if (response.IsSuccess) {
//                    alert("保存成功");
//                }
//                else {
//                    alert(response.error);
//                }
//            }
//            });
//        });
//    }
//    init();
//}
////联系人信息
//function ContractInfo() {
//    var validator;
//    function init() {
//        validator = new Validator('ContractInfo', {
//            rules: {
//                Name: { required: true },
//                MobilePhone: { required: true },
//                Email: { required: true },
//                AreaCode: { required: true },
//                TeleCode: { required: true },
//                ExtCode: { required: true },
//                Address: { required: true }
//            }
//        });
//        $("#btnSubmit").click(function () {
//            $("#Telephone").val($("#AreaCode").val() + "," + $("#TeleCode").val() + "," + $("#ExtCode").val());
//            AJAX.formSubmit({ target: $("#ContractInfo"), validator: validator, callback: function (response) {
//                if (response.IsSuccess) {
//                    alert("保存成功");
//                }
//                else {
//                    alert(response.error);
//                }
//            }
//            });
//        });
//    }
//    init();
//}
////公司信息
//function OfficeInfo() {
//    var validator;
//    function init()  {
//        validator = new Validator('OfficeInfo', {
//            rules: {
//                Name: { required: true },
//                Address: { required: true },
//                PostalCode: { required: true },
//                TeleAreaCode: { required: true },
//                TeleCode: { required: true },
//                TeleExtCode: { required: true },
//                FaxAreaCode: { required: true },
//                FaxCode: { required: true },
//                OpenBank: { required: true },
//                BankAccount: { required: true },
//                LegalPerson: { required: true },
//                TaxRegisterNo: { required: true }
//            }
//        });
//        $("#btnSubmit").click(function () {

//            $("#Telephone").val($("#TeleAreaCode").val() + "," + $("#TeleCode").val() + "," + $("#TeleExtCode").val());
//            $("#Fax").val($("#FaxAreaCode").val() + "," + $("#FaxCode").val());
//            AJAX.formSubmit({ target: $("#OfficeInfo"), validator: validator, callback: function (response) {
//                if (response.IsSuccess) {
//                    alert("保存成功");
//                }
//                else {
//                    alert(response.error);
//                }
//            }
//            });
//        });
//        $("#OfficePic").click(function () {
//            relationid = $("#ForeignRelationId").val();
//            id = $("#Id").val();
//            var url = "/User/OfficeAttachment?officeId=" + id + "&relationid=" + relationid;
//            PICKER.open(url, "公司图片管理", 550, 400);
//        });
//    }
//    init();
//}
//公司评价
function Rate() {
    function init() {
        PAGER.show({ data: "/Company/Data", pageSize: 10 });
        $("#zk").click(function () {
            $("#office_all").show();
            $("#office_abbrev").hide();
        });
        $("#sj").click(function () {
            $("#office_abbrev").show();
            $("#office_all").hide();
        });
        $(".is_tab li").click(function () {
            var value = $(this).attr("v");
            if (value == "2") {
                return;
            }
            $(".is_tab li").removeClass("cur");
            $(this).addClass("cur");

            $("#Type").val(value);
            PAGER.show({ startRow: 0 });
        });
    }
    init();
}
//选择银行
function Choise() {
    function init() {
        PAGER.show({ data: "/BankCard/ChoiceData", pageSize: 10 });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });   
    }
    init();
}
//我的银行卡
function BankCard() {
    function init() {
        var ChkSelect = $("#chkSelectAll");
        ChkSelect.click(function () {
            var checkall = ChkSelect.attr("checked");
            if (checkall) {
                $("input[name=Id]").attr("checked", "checked");
            } else {
                $("input[name=Id]").removeAttr("checked");
            }
        });
        PAGER.show({ data: "/BankCard/Data", pageSize: 10, onLoad: function () {
            $(".edit").each(function () {
                $(this).click(function () {
                    var tr = $(this).parents("tr");
                    var id = $("input[name=Id]", tr).val();
                    PICKER.open("/BankCard/Detail?id=" + id, "编辑银行卡", 600, 300);
                });
            });
        }
        });  
        $("#btnDelete").click(function () {
            var count = $("input[name=Id]:checked").length;
            if (count == 0) {
                alert("未选中你要删除的信息");
                return false;
            }
            var Id = $("input[name=Id]:checked").val();
            var rowId = "";
            $("input[name=Id]").each(function () {
                if ($(this).attr("checked")) {
                    rowId += "," + $(this).val();
                }
            });
            if (confirm("确认删除数据？")) {
                AJAX.post('/BankCard/Delete', { Id: rowId.toString() }, function (result) {
                    if (result.IsSuccess) {
                        PAGER.show({ startRow: 0 });
                    }
                    else { alert(result.Message); }
                });
            }
        });
        
        $("#btnNew").click(function () {
            PICKER.open("/BankCard/Detail", "新增银行卡", 600, 300);
        }); 
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
    }
    init();
}
//银行卡详情
function BankCardDetail() {
    var validator;
    function init() {
        validator = new Validator('bankCard', {
            rules: {
                Name: { required: true },
                BankName: { required: true },
                CardNo: { required: true, digits: true, maxlength: 19, minlength: 15 }
            },
            messages: {
                CardNo: { maxlength: "请输入正确的卡号", minlength: "请输入正确的卡号" }
            }
        });
        $("#Save").click(function () {
            AJAX.formSubmit({ target: $("#bankCard"), validator: validator, callback: function (reponse) {
                if (reponse.IsSuccess) {
                    var IsNewBankCar = $("#IsNewBankCar").val();
                    if (IsNewBankCar.length == 0) {
                        window.parent.PICKER.close();
                        window.parent.location.reload(); 
                    } else {
                        var item = UTIL.stringToJson(reponse.Data)
                        window.top.choose(item.Name, item.BankName, item.CardNo);
                    }
                } else {
                    alert(reponse.Error);
                }
            }
            });
        });
    }
    init();
}
//我的兑换品
function ExchangeRecord() {
    function init() {
        FORM.placeHolder({ id: "prm_RelationName_Description_LK_", title: "兑换品名称、描述" })
        var ChkSelect = $("#chkSelectAll");
        ChkSelect.click(function () {
            var checkall = ChkSelect.attr("checked");
            if (checkall) {
                $("input[name=AccpeptId]").attr("checked", "checked");
            } else {
                $("input[name=AccpeptId]").removeAttr("checked");
            }
        });
        PAGER.show({ data: "/Integral/ExchangeRecordData", pageSize: 10 });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
        $("#drpflags").change(function () {
            $("#prm_Status_").val($("#drpflags").val());
            PAGER.show({ startRow: 0 });
        });
        $("li[name=tab]").click(function () {
            $("li[name=tab]").removeClass("cur");
            $(this).addClass("cur");
            var tab = $(this).html();
            if (tab == "兑换记录") {
                $("#dh").show();
                $("#hq").hide();
                $("#search").show();
                PAGER.show({ data: "/Integral/ExchangeRecordData", pageSize: 10 });
            }
            else {
                $("#hq").show();
                $("#dh").hide();
                $("#search").hide();
                PAGER.show({ data: "/Integral/IntegralRecordData", pageSize: 10 });
            }
        });
        $("#sign").click(function () {
            AJAX.post('/Integral/Sign', null, function (result) {
                if (result.IsSuccess) {
                    alert("签到成功");
                    $("#sign").val("已签到");
                    $("#sign").attr("disabled", "disabled");
                    $(".money").html(result.Data.Integral);
                }
                else { alert(result.Error); }
            });
        });
    }
    init();
}
//积分兑换
function Integral() {
    function init() {
        PAGER.show({ data: "/Integral/Data", pageSize: 10, onLoad: function () {
            $("a[name=exchange]").each(function () {
                $(this).click(function () {
                    var id = $(this).attr("t");
                    var integral = $(this).attr("c");
                    var currentIntegral = $("#CurrentIntegral").val();
                    if (parseInt(integral) > parseInt(currentIntegral)) { alert("积分不足"); return; }
                    if (confirm("确定兑换该奖品？")) {
                        AJAX.submit({
                            url: "/Integral/PresentExchange",
                            data: { id: id, integral: integral },
                            callback: function (data) {
                                if (data.IsSuccess) {
                                    location.reload();
                                    alert("兑换奖品成功");
                                }
                                else {
                                    alert(data.Error);
                                }
                            }
                        });
                    }
                });
            });
        } });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
        
    }
    init();
}
//消息中心
function Message() {
    function init() {
        FORM.placeHolder({ id: "prm_Content_LK_", title: "消息内容" })
        $("#chkSelectAll").click(function () {
            var checkall = ChkSelect.attr("checked");
            if (checkall) {
                $("input[name=Id]").attr("checked", "checked");
            } else {
                $("input[name=Id]").removeAttr("checked");
            }
        });
        PAGER.show({ data: "/Message/Data", pageSize: 10, onLoad: function () {
            $("a[name=edit]").click(function () {
                var id = $(this).attr("v");
                var url = "/Message/Detail?Id=" + id;
                PICKER.open(url, '消息', 500, 400);
            })
        }
        });
        $("#btnDelete").click(function () {
            var count = $("input[name=Id]:checked").length;
            if (count == 0) {
                alert("未选中你要删除的信息");
                return false;
            }
            var Id = $("input[name=Id]:checked").val();
            var rowId = "";
            $("input[name=Id]").each(function () {
                if ($(this).attr("checked")) {
                    rowId += "," + $(this).val();
                }
            });
            if (confirm("确认删除数据？")) {
                AJAX.post('/Message/Delete', { Id: rowId.toString() }, function (result) {
                    if (result.IsSuccess) {
                        PAGER.show({ startRow: 0 });
                    }
                    else { alert(result.Message); }
                });
            }
        });
        $("#btnRead").click(function () {
            var count = $("input[name=Id]:checked").length;
            if (count == 0) {
                alert("未选中你要删除的信息");
                return false;
            }
            var rowId = "";
            $("input[name=Id]").each(function () {
                if ($(this).attr("checked")) {
                    rowId += "," + $(this).val();
                }
            });
            var receiver = $("#receiver").val();
            AJAX.post('/Message/ReadMessage', { ids: rowId.toString(), receiver: receiver }, function (result) {
                if (result.IsSuccess) {
                    PAGER.show({ startRow: 0 });
                }
                else { alert(result.Message); }
            });
        });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
        $("#drpflags,#drpMsgType").bind("change", function () {
            $("#prm_MsgType_").val($("#drpMsgType").val());
            $("#Flags").val($("#drpflags").val());
            PAGER.show({ startRow: 0 });
        })

    }
    init();
}
//消息订阅
function Subscriber() {
    function init() {
        $("#btnSave").click(function () {
            var strJson = "[";
            var arrItem = new Array();
            $("#data_area tr").each(function (i, o) {
                var id = $(o).attr("v");
                var isSms = false;
                var isEmail = false;
                if (!id) {
                    return true;
                }
                if ($("input[name=sms]", o).length > 0 && $("input[name=sms]", o).attr("checked")) {
                    isSms = true;
                }
                if ($("input[name=email]", o).length > 0 && $("input[name=email]", o).attr("checked")) {
                    isEmail = true;
                }
                arrItem.push('{ESMessageConfigId:"' + id + '",IsSMSSend:' + isSms + ',IsEMailSend:' + isEmail + '}');
            });
            strJson += arrItem.join(",");
            strJson += "]";
            AJAX.post('/Message/SaveSubscriber', { Data: strJson }, function (result) {
                if (result.IsSuccess) {
                    alert('保存成功');
                }
                else {
                    alert(result.Error); 
                }
            });
        });
    }
    init();
}
//填写登录账号
function FindPassword() {
    var validator;
    function init() {
        validator = new Validator('retrievePassword', {
            rules: {
                LoginId: { required: true },
                psw_VerifiyCode: { required: true }
            }
        });
        $("#next").click(function () {
            var usercode = $("#LoginId").val();
            AJAX.formSubmit({ target: $("#retrievePassword"), validator: validator, callback: function (reponse) {
                if (reponse.IsSuccess) {
                    window.location.href = "/User/FindPswType?loginId=" + usercode;
                } else {
                    alert(reponse.Error);
                }
            }
            });
        });
        $("#psw_actRefrash").click(function () {
            var url = $("#psw_verifyimage").attr("src");
            url = UTIL.addUrlParam(url, "r", UTIL.getRandom(100000, 999999));
            $("#psw_verifyimage").attr("src", url);
        });
    }
    init();
}
//找回方式
function FindPswType() {
    var validator;
    function init() {
        var findType = "";
        $("#next").click(function () {
            var UserCode = $("#UserCode").val();
            var num = $("#txt_MobilePhone_").val();
            var type;
            $("input[name=validatetype]").each(function () {
                if ($(this).attr("checked")) {
                    type = $(this).val();
                }
            })
            $("#errMsg").html("");
            if (num == "") {
                var text = "&nbsp;" + LANG.Valid_Mobilephone;
                if (type == "email")
                    text = "&nbsp;" + LANG.Valid_Email;
                $("#errMsg").html("" + text);
                return;
            }
            findType = type;
            AJAX.post('/User/FindUserPassword', { usercode: UserCode, num: num, type: type }, function (strJson) {
                if (strJson.IsSuccess) {
                    $("#txt_MobilePhone_").val("");
                    window.location.href = "/User/PswComplete?l=" + escape(findType);
                } else {
                    alert(strJson.Error);
                }
            });
        });
        $("input[name=validatetype]").each(function () {
            $(this).click(function () {
                var obj = $(this);
                if ($(this).attr("checked")) {
                    var val = obj.val();
                    var lbl = "手机号码：";
                    if (val == "email") {
                        lbl = "电子邮件：";
                    }
                    $("#lblType").html(lbl);
                }
            });
        });
    }
    init();
}
function CheckEmail() {
    var validator;
    var wait = 60;
    var intervalId; //定时器
    function init() {
        validator = new Validator('form1', {
            rules: {
                oldEmail: { required: true, email: true },
                Email: { required: true, email: true },
                VaildateCode: { required: true }
            }
        });
        $("#btnVaildateCode").click(function () {
            var dest = $("#Email").val();
            var nodeType = "email";
            var data = { type: nodeType, dest: dest };
            AJAX.post("/Safety/Send", data, function (reponse) {
                if (reponse.IsSuccess) {
                    $("#btnVaildateCode").attr("disabled", "disabled");
                    $("#btnVaildateCode").css("color", "gray");
                    intervalId = window.setInterval(function () {
                        if (wait > 0) {
                            $("#btnVaildateCode").val("验证码已发送," + wait + "秒后重新获取验证码");
                            wait--;
                        } else {
                            wait = 60;
                            $("#btnVaildateCode").val("获取验证码");
                            $("#btnVaildateCode").removeAttr("disabled");
                            $("#btnVaildateCode").css("color", "black");
                            window.clearInterval(intervalId);
                        }
                    }, 1000);

                } else {
                    alert(reponse.Error);
                }
            });
        });
        $("#btnSubmitEmail").click(function () {
            AJAX.formSubmit({
                target: $("#form1")
                , validator: validator
            });
        });
    }
    init();
}
function CheckMobile() {
    var validator;
    var wait = 60;
    var intervalId; //定时器
    function init() {
        validator = new Validator('form1', {
            rules: {
                MobilePhone: { required: true, mobile: true },
                VaildateCode: { required: true }
            }
        });
        $("#btnVaildateCode").click(function () {
            var dest = $("#MobilePhone").val();
            var nodeType = "mobile";
            var data = { type: nodeType, dest: dest };
            AJAX.post("/Safety/Send", data, function (reponse) {
                if (reponse.IsSuccess) {
                    $("#btnVaildateCode").attr("disabled", "disabled");
                    $("#btnVaildateCode").css("color", "gray");
                    intervalId = window.setInterval(function () {
                        if (wait > 0) {
                            $("#btnVaildateCode").val("验证码已发送," + wait + "秒后重新获取验证码");
                            wait--;
                        } else {
                            wait = 60;
                            $("#btnVaildateCode").val("获取验证码");
                            $("#btnVaildateCode").removeAttr("disabled");
                            $("#btnVaildateCode").css("color", "black");
                            window.clearInterval(intervalId);
                        }
                    }, 1000);

                } else {
                    alert(reponse.Error);
                }
            });
        });
        $("#btnSubmitMobile").click(function () {
            AJAX.formSubmit({
                target: $("#form1")
                ,validator: validator
            });
        });
    }
    init();
}
//我的返现
function Wallet() {
    function init() {
        FORM.placeHolder({ id: "prm_OrderNo_", title: "订单号" });
        FORM.placeHolder({ id: "prm_BankCardNo_BankName_LK_", title: "银行、卡号" });
        PAGER.show({ data: "/Wallet/EncashmentRecordData", pageSize: 10 });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
        $("#btn_PickAmount_").mousemove(function () {
            $(this).addClass("attr");
        });
        $("#btn_PickAmount_").mouseleave(function () {
            $(this).removeClass("attr");
        });
        $("li[name=tab]").click(function(){
             $("li[name=tab]").removeClass("cur");
             $(this).addClass("cur");
            var tab = $(this).html();
            if(tab=="提现记录")
            {
                $("#tx").show();
                $("#fx").hide();
                $("#prm_BankCardNo_BankName_LK_").show();
                $("#prm_OrderNo_").hide();
                PAGER.show({ data: "/Wallet/EncashmentRecordData", pageSize: 10 });
            }
            else{
                $("#fx").show();
                $("#tx").hide();
                $("#prm_BankCardNo_BankName_LK_").hide();
                $("#prm_OrderNo_").show();
                PAGER.show({ data: "/Wallet/Data", pageSize: 10 });
            }
        });
        $("li[name=addBank]").click(function () {
            PICKER.open("/BankCard/Detail", "添加银行卡", 500, 300);
        });
    }
    init();
}
//安全设置
function Safety() {
    function init() {
         $("#changePwd").click(function () {
            PICKER.open('/User/ChangePassword', '修改登录密码',550,260);
        });
        $("#changeWalletPwd").click(function () {
            PICKER.open('/Wallet/ChangeWalletPsw?type=safety', '修改取现密码', 580, 260);
        });
        $("#changePaymentPsw").click(function () {
            PICKER.open('/Wallet/PaymentPsw?type=safety', '设置取现密码', 580, 280);
        });
        $("#checkEmail").click(function () {
            PICKER.open('/Safety/CheckEmail', '验证邮箱', 550, 260);
        });
        $("#updatekEmail").click(function () {
            PICKER.open('/Safety/CheckEmail?type=update', '验证邮箱', 550, 300);
        });
        $("#checkMobile").click(function () {
            PICKER.open('/Safety/CheckMobile', '验证手机', 550, 260);
        });
    }
    init();
}
//我的优惠券
function Coupon() {
    function init() {
        PAGER.show({ data: "/Coupon/Data", pageSize: 10 });
        $("#btnSearch").click(function () {
            PAGER.show({ startRow: 0 });
        });
        $("li[name=tab]").click(function () {
            $("li[name=tab]").removeClass("cur");
            $(this).addClass("cur");
            var status = $(this).attr("s");
            $("#Status").val(status);
            PAGER.show({ startRow: 0 });
        });
    }
    init();
}
function Center() {
    var IsFirstLoad = true;
    var hotlines = {};
    function init() {
        $("#fund").click(function () {
            applyBankMemberNum();
        });
        $(".user_hotLines li").click(function () {
            $(".user_hotLines li").removeClass("cur");
            $(this).addClass("cur");
            getRecommendLine($(this));
        })
        $("#btnSave").click(function () {
            alert('服务将在不久后开放.感谢您的支持');
        })
        getRecommendLine($("#shanghai"));
    }
    function applyBankMemberNum() {
        if (confirm("确定要申请运东西资金监管账号?")) {
            AJAX.submit({
                url: "/FundSupervision/Apply",
                callback: function (reponse) {
                    if (reponse.IsSuccess) {
                        alert('申请成功');
                        window.location.reload();
                    } else {
                        alert("对不起,申请异常.异常原因:" + reponse.Error);
                    }
                }
            })
        }
    }
    function getRecommendLine(o) {
        var id = o.attr("v");
        if (!hotlines[id]) {
            var url = Storage.Path.Root_YDX + "/TransportLine/Recommend?callback=?&CityId=" + id;
            AJAX.getJSON({ url: url, callback: function (reponse) {
                if (reponse.IsSuccess) {
                    var html = "<table width='100%'>";
                    if (reponse.Data.length == 0) {
                        html += "<tr><td>该城市暂无推荐线路</td></tr>";
                    } else {
                        for (var i = 0; i < reponse.Data.length; i++) {
                            html += "<tr>";
                            html += "<td>" + reponse.Data[i].OfficeName + "</td>";
                            html += "<td>" + reponse.Data[i].OriginCityName + "-->" + reponse.Data[i].DestinationCityName + "</td>";
                            //                        html += "<td>" + reponse.Data[i].RefDays + "</td>";
                            html += "<td>重货:<span class=\"red\" >¥" + reponse.Data[i].UKMarkUp + "</span>/公斤</td>";
                            html += "<td>重泡货:<span class=\"red\" >¥" + reponse.Data[i].BKMarkUP + "</span>/公斤</td>";
                            html += "<td>泡货:<span class=\"red\" >¥" + reponse.Data[i].HKMarkUp + "</span>/立方米</td>";
                            html += "<td>最低价:<span class=\"red\" >¥" + reponse.Data[i].LWMarkUp + "</span></td>";
                            html += "<td><input type=\"button\" class=\"btn_blue\" value=\"下单\" onclick=\"Center.booking('" + reponse.Data[i].Id + "')\"/></td></td>";
                            html += "</tr>";
                        }
                    }
                    html += "</table>";
                    $("#linesContainer").html(html);
                }
                hotlines[id] = html;
            }
            });
        }
        else {
            $("#linesContainer").html(hotlines[id]);
        }
    }
    init();
    if (IsFirstLoad) {
        Center.booking = function (id) {
            var url = Storage.Path.Root_YDX + "/Order/Booking?TransportLineId=" + id;
            window.location.href = url;
        }
        IsFirstLoad = false;
    }
}
