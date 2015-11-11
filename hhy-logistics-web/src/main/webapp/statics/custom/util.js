/*****************扩展方法********************/
String.prototype.replaceAll = function (str1, str2) {
    var str = this;
    var result = str.replace(eval("/" + str1 + "/gi"), str2);
    return result;
}
/*****************常用方法********************/
var READONLYCLASS = "readOnly";
var UTIL = new function () {
    this.getMessage = function (msg) {
        return LANG[msg];
    };
    this.getUrlParam = function (pName, win) {
        var sUrl;
        if (typeof (win) == 'string') {
            sUrl = win;
            if (sUrl.indexOf('?') < 0) sUrl = '?' + sUrl;
        } else {
            if (!win) win = window;
            sUrl = win.location.search;
        }
        var iQ = sUrl.indexOf('?') + 1;
        if (iQ > 0) {
            sUrl = '&' + sUrl.substring(iQ, sUrl.length);
            iQ = sUrl.indexOf('?'); //url参数中还存在url?
            var key = '&' + pName + '=';
            var i = sUrl.indexOf(key);
            if (i > -1) {
                var j = sUrl.indexOf('&', i + 1); //&Key=Val&Key2=...
                if (j < 0 || (iQ > 1 && j > iQ)) j = sUrl.length;
                return unescape(sUrl.substring(i + key.length, j));
            }
        }
        return null;
    };
    this.addUrlParam = function (url, pName, value) {
        if (!url)
            url = window.location.href;
        //将url前的?移除
        var index = url.indexOf("?");
        var search = ""; //get部分
        if (index > -1 && index != url.length - 1) {
            search = url.substring(index + 1);
            url = url.substring(0, index + 1);
        }
        var pattern = pName + '=([^&]*)';
        var replaceText = pName + '=' + escape(value);
        if (search.match(pattern)) {
            var reg = new RegExp(pattern);
            search = search.replace(reg, replaceText);
        }
        else {
            if (index > -1) {
                search = search + '&' + replaceText;
            }
            else {
                search = search + '?' + replaceText;
            }
        }
        return url + search;
    }
    this.stringToJson = function (jsonText) {
        if (jsonText == null || jsonText == undefined || jsonText.length == 0)
            return {};
        if (typeof jsonText == "object") {
            return jsonText;
        }
        return eval('(' + jsonText + ')');
    };
    this.jsonToString = function (data) {
        return JSON2.stringify(data);
    };
    this.refresh = function (win) {
        if (!win) { win = window.top; }
        if (win.PAGER) {
            win.PAGER.show();
        }
    };
    this.refreshAndClose = function (win) {
        if (!win) { win = window.top; }
        if (win.PICKER) {
            win.PICKER.close();
        }
        UTIL.refresh(win);
    };
    this.getAppPath = function (win) {

    };
    this.bookmark = function (win) {
        if (!win)
            win = window;
        var url = win.document.location.href;
        var title = document.title;
        if (document.all) {
            window.external.AddFavorite(url, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else if (window.opera && window.print) {
            var mbm = document.createElement('a');
            mbm.setAttribute('rel', 'sidebar');
            mbm.setAttribute('href', url);
            mbm.setAttribute('title', title);
            mbm.click();
        } else {
            alert("您的游览器不支持自动加入收藏,请尝试 Ctrl+D 手动添加吧.");
        }
    };
    this.getFunction = function (funcName) {
        if (!funcName)
            return null;
        if (typeof funcName == "function") {
            return funcName;
        }
        //string xx.xx 
        var actions = funcName.split('.');
        var i = 0;
        var func = window;
        while (i < actions.length) {
            var action = actions[i];
            if (!func[action]) {
                func = null;
                break;
            } else {
                func = func[action];
            }
            i = i + 1;
        }
        return func;
    };
    this.getRandom = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };
    this.setSecurityLevel = function (id, container) {//安全密码判断
        var val = $("#" + id).val();
        var level = getSecurityLevel(val);
        var element = $("#" + container);
        if (val.length >= 6) {
            element.show();
            switch (level) {
                case 1:
                    $("b", element).removeClass().addClass("ico_sc1");
                    break;
                case 2:
                    $("b", element).removeClass().addClass("ico_sc2");
                    break;
                case 3:
                    $("b", element).removeClass().addClass("ico_sc3");
                    break;
                default:
                    break;
            }
        } else {
            element.hide();
        }
        return level;
    };
    function getSecurityLevel(value) {
        var pattern_1 = /^.*([\W_])+.*$/i;
        var pattern_2 = /^.*([a-zA-Z])+.*$/i;
        var pattern_3 = /^.*([0-9])+.*$/i;
        var level = 0;
        if (value.length >= 10) {
            level++;
        }
        if (pattern_1.test(value)) {
            level++;
        }
        if (pattern_2.test(value)) {
            level++;
        }
        if (pattern_3.test(value)) {
            level++;
        }
        if (level > 3) {
            level = 3;
        }
        return level;
    };

}
var DATA = new function () {
    this.toFloat = function (val) {
        var tmp = parseFloat(val);
        tmp = isNaN(tmp) ? 0 : tmp;
        return tmp;
    }
}
/*****************FORM********************/
var FORM = new function () {
    this.ajaxSubmit = function (url, data, callback, cfg) {
        if (!cfg) cfg = {};
        cfg.url = url;
        cfg.data = cfg.data || data;
        cfg.callback = cfg.callback || callback;
        cfg.isWait = cfg.isWait
        if (!cfg.url) {
            alert('请求地址错误');
            return;
        };
        if (cfg.callback) {
            if (typeof (cfg.callback) != "function") {
                alert('回调函数错误');
                return;
            }
        };
        $.ajax({
            type: "POST",
            url: cfg.url,
            data: cfg.data,
            success: function (msg) {
                if (cfg.callback) {
                    cfg.callback(msg);
                }
            }
        });
    },
    this.submit = function (id) {
        $("input[placed=1]").val("");
        $("#" + id).submit();
    }
    this.setReadOnly = function (ids) {
        if (!ids) return;
        var arryIds = ids.split(',');
        for (i = 0; i < arryIds.length; i++) {
            this.setOneReadOnly(arryIds[i]);
        }
    },
    this.setOneReadOnly = function (id) {
        if (!id) return;
        if ($("#" + id).length == 0) return;
        $("#" + id).attr("disabled", "disabled");
        $("#" + id).addClass(READONLYCLASS);
    },
    this.cancelReadOnly = function (ids) {
        if (!ids) return;
        var arryIds = ids.split(',');
        for (i = 0; i < arryIds.length; i++) {
            this.cancelOneReadOnly(arryIds[i]);
        }
    },
    this.cancelOneReadOnly = function (id) {
        if (!id) return;
        if ($("#" + id).length == 0) return;
        $("#" + id).removeAttr("disabled");
        $("#" + id).removeClass(READONLYCLASS);
    },
    this.placeHolder = function (option) {
        //{id,title,className }
        if (!option || !option.id || !option.title)
            return;
        option.className = option.className || "gray";
        $("#" + option.id).focus(function () {
            if ($("#" + option.id).attr("placed") == '1') {
                $("#" + option.id).val("");
                $("#" + option.id).attr("placed", "0");
                $("#" + option.id).removeClass(option.className);
            }
        })
        $("#" + option.id).bind("blur", function () {
            if ($("#" + option.id).val().length == 0) {
                $("#" + option.id).val(option.title).addClass(option.className);
                $("#" + option.id).attr("placed", "1");
            }
        });
        if ($("#" + option.id).val().length == 0) {
            $("#" + option.id).val(option.title).addClass(option.className);
            $("#" + option.id).attr("placed", "1");
        }
    },
    this.getVal = function (name) {
        if ($("#" + name).length == 0) {
            return null;
        }
        if ($("#" + name).attr("placed") == "1") {
            return "";
        } else {
            return $("#" + name).val();
        }
    },
    this.reset = function (id) {
        $("#" + id + " input").each(function () {
            $(this).val('');
        });
    }
}
/*****************AJAX********************/
var AJAX = new function () {
    //    var _options = {
    //        target: null,
    //        url: null,
    //        data: null,
    //        callback: null,
    //        validator: null,
    //        dataType: "json", //json,text
    //        isAsync: true,
    //        lockMode: null, //screen,#id
    //        lockSkin: null, //circle
    //        lockFunc: null//{load:null,release:null}
    //    };
    var _this = this;
    this.post = function (url, data, callback) {
        var options = {};
        if (url) {
            options.url = url;
        }
        if (data) {
            options.data = data;
        }
        if (callback) {
            options.callback = callback;
        }
        ajaxsubmit(options);
    };
    this.submit = function (options) {
        ajaxsubmit(options);
    };
    this.getJSON = function (options) {
        var _options = {
            url: null,
            data: null,
            callback: null
        }
        $.extend(_options, options);
        if (_options.target && !_options.url) {
            _options.url = _options.target.attr("action");
        }
        if (_options.target && !_options.data) {
            var formdata = $("input[placed!=1],select,textarea", _options.target).serialize();
            _options.data = formdata;
        }
        $.getJSON(_options.url, _options.data, _options.callback);
    };
    this.formSubmit = function (options) {
        if (!options || !options.target) {
            alert('请给定提交区域');
            return;
        }
        if (!options.lockFunc) {
            if (!options.lockMode) {
                options.lockMode = 'screen';
            }
            if (!options.lockSkin) {
                options.lockSkin = 'circle';
            }
            if (options.lockMode == 'screen' && options.lockSkin == 'circle') {
                options.lockFunc = LOCK.circle();
            }
        }
        var formdata = $("input[placed!=1],select,textarea", options.target).serialize();
        options.data = formdata;
        if (!options.url) {
            options.url = options.target.attr("action");
        }
        if (!options.callback) {
            if (options.target.attr("targetId")) {//替换id 
                options.callback = function (reponse) {
                    if (reponse.IsSuccess) {
                        $("#" + options.target.attr("targetId")).html(reponse.Data);
                    } else {
                        $("#" + options.target.attr("targetId")).html(LANG.FormSubmit_LoadDataFailed);
                    }
                }
            } else if (options.target.attr("targetAction")) {//替换id 
                options.callback = function (reponse) {
                    if (reponse.IsSuccess) {
                        var action = options.target.attr("targetAction");
                        if (action.indexOf('(') > -1) {
                            eval(action);
                        } else {
                            window.location.href = options.target.attr("targetAction");
                        }
                    } else {
                        alert(reponse.Error);
                    }
                }
            }
        }
        ajaxsubmit(options);
    };
    function ajaxsubmit(options) {
        if (!options.lockSkin) {
            options.lockSkin = 'circle';
        }
        if (!options.lockFunc) {
            if (options.lockMode == 'screen' && options.lockSkin == 'circle') {
                options.lockFunc = LOCK.circle();
            }
        }
        var _options = {
            target: null,
            url: null,
            data: null,
            callback: null,
            isMultimedia: true,
            validator: null,
            dataType: "json", //json,text
            isAsync: true,
            lockMode: null, //screen,#id
            lockSkin: null, //circle
            lockFunc: null//{load:null,release:null}
        };
        $.extend(_options, options);
        if (!_options.url) {
            alert('请给定请求地址');
            return;
        };
        if (_options.validator) {
            if (_options.validator instanceof Array) {
                var v = true;
                for (var i = 0; i < _options.validator.length; i++) {
                    if (!_options.validator[i].form()) {
                        v = false;
                        break;
                    }
                }
                if (!v) {
                    return;
                }
            }
            else {
                if (!_options.validator.form()) {
                    return;
                }
            }
        };
        //判断是否是重复动作
        if (_options.target) {
            var isLock = _options.target.attr("isLock");
            if (isLock == "1") {
                alert(LANG.AjaxSubmit_LockError);
                return;
            } else {
                _options.target.attr("isLock", "1");
            }
        }

        if (_options.lockFunc && _options.lockFunc.load) {
            _options.lockFunc.load(_options.lockMode);
        }
        //判断是否有附件
        if (_options.target && _options.isMultimedia) {
            var files = $('input:file', _options.target).fieldValue();
            var found = false;
            for (var j = 0; j < files.length; j++) {
                if (files[j])
                    found = true;
            }
            if (found) {
                _options.target.attr("method", "POST");
                _options.target.attr("enctype", "multipart/form-data");
                _options.url += _options.url.indexOf('?') < 0 ? "?AjaxRequest=1" : "&AjaxRequest=1";
                $(_options.target).ajaxSubmit({
                    url: _options.url,
                    type: "POST",
                    dataType: "text",
                    success: function (reponse) {
                        callHandle(_options, reponse);
                    }
                });
                return;
            }
        }
        $.ajax({
            type: "POST",
            url: _options.url,
            data: _options.data,
            async: _options.isAsync,
            success: function (reponse) {
                callHandle(_options, reponse);
            },
            error: function (a, b) {
                var callback = _options.callback;
                release(_options);
                var json = { IsSuccess: false, Error: LANG.AjaxSubmit_RequireException };
                if (!callback)
                    return;
                callback(json);
                return false;
            }
        });
    };
    function release(options) {
        if (options.target) {
            options.target.attr("isLock", "0");
        }
        if (options.lockFunc && options.lockFunc.release) {
            options.lockFunc.release(options.lockMode);
        }
    };
    //执行回调函数
    function callHandle(_options, reponse) {
        var callback = _options.callback;
        release(_options);
        //判断是否登陆异常
        if (callback) {
            var json = null;
            try {
                if (typeof (reponse) == "string") {
                    json = { IsSuccess: true, Data: reponse };
                } else {
                    json = UTIL.stringToJson(reponse);
                }
                if (json.ErrorCode == "00") {
                    //                            alert('登陆超时,请重新登陆');
                    AsyncLogin();
                    return false;
                }
            }
            catch (err) {
                json = { IsSuccess: false, Error: LANG.AjaxSubmit_DataException };
            }
            callback(json);
            return false;
        }
    }
};
var LOCK = new function () {
    this.circle = function () {
        return {
            load: function () {
                var height = $(document).scrollTop() + 270;
                if ($(".loading_mark").length == 0) {
                    var html = "";
                    html += "<div class='circle_wait' style='top:" + height + "px;'><img src='/Base/RS/CM/Image/loading.gif' alt='" + LANG.AjaxSubmit_LockLoading + "'/></div>";
                    html += "<div class='loading_mark' tabindex='-1'></div>";
                    $("body").append(html);
                }
                $(".circle_wait").show();
                $(".loading_mark").css({ display: "block", height: $(document).height() });
                $(window).scroll(function () {
                    var height = $(document).scrollTop() + 270;
                    $(".circle_wait").css("top", height);
                });
            },
            release: function () {
                $(".circle_wait").hide();
                $(".loading_mark").hide();
            }
        }
    },
    this.bar = function () {
        return {
            load: function (mode) {
                if ($(mode + " .bar_wait").length == 0) {
                    var html = "";
                    html += "<div class='bar_wait'></div>";
                    $(mode).append(html);
                }
                $(mode + " .bar_wait").show();
            },
            release: function (mode) {
                $(mode + " .bar_wait").hide();
            }
        }
    }
}
/*****************Validator********************/
//options:{rules,messages}
//需要引入jquery.validate
var Validator = function (id, options) {
    if (options != null && options != undefined && !options.errorPlacement) {
        options.success = function (label) {
            try {
                var element = $("#" + $(label).attr("for"));
                var td = element.parents("td").next("td");
                label.removeClass();
                label.addClass("success");
                if ($(".tip", td).length == 0) {
                    if (options.errorLable) {
                        $(options.errorLable, td).html("");
                        error.appendTo($(options.errorLable, td));
                    } else {
                        td.html("");
                        error.appendTo(td);
                    }
                } else {
                    $(".tip_c p", td).html("");
                    label.appendTo($(".tip_c p", td));
                }
            } catch (e) { }
        }
        options.errorPlacement = function (error, element) {
            try {
                var td = element.parents("td").next("td");
                if ($(".tip", td).length == 0) {
                    if (options.errorLable) {
                        $(options.errorLable, td).html("");
                        error.appendTo($(options.errorLable, td));
                    } else {
                        td.html("");
                        error.appendTo(td);
                    }
                } else {
                    $(".tip_c p", td).html("");
                    error.appendTo($(".tip_c p", td));
                }
            } catch (e) { }
        }
    }
    return $("#" + id).validate(options);
}
/*****************Date********************/
//需要引入WdatePicker.js
var DatePickor = function (options) {
    WdatePicker(options);
}
/*****************Picker********************/
var PICKER = new function () {
    var winId = "subwin";
    var winIframe = "subwin_iframe";
    var opts;
    var dialogElement;
    this.open = function (url, title, width, height, callback, options) {
        var defaults = {
            title: "",
            draggable: false,
            resizable: false,
            modal: true,
            callback: null,
            close: function () {
            }
        }
        if (!options) {
            options = {};
        }
        if (!height) height = 450;
        if (!width) width = 600;
        options.height = height;
        options.width = width;
        options.title = title;
        options.callback = callback;
        opts = $.extend(defaults, options);
        if ($("#" + winId).length == 0) {
            $(window.document.body).append("<div class=\"subwin\" id=" + winId + ">" +
                                        "<iframe id=\"subwin_iframe\" name=\"subwin_iframe\" scrolling=\"auto\" frameborder=\"0\" src=\"\" style=\"width: 100%;height: 99%;\"></iframe>" +
                                        "</div>");
        }
        if (url.indexOf("#") == 0) {//自定义窗口
            $(url).dialog(opts);
            $(url).dialog('open');
            $(url).show();
            dialogElement = url;
        } else {
            var _close = opts.close;
            opts.close = function () {
                _close();
                $('#' + winIframe).attr("src", "");
            }
            $('#' + winId).dialog(opts);
            $('#' + winIframe)[0].src = "";
            $('#' + winIframe)[0].src = url;
            $('#' + winId).dialog('open');
            $('#' + winIframe).show();
            dialogElement = '#' + winId;
        }
    }
    this.close = function () {
        if (dialogElement) {
            $(dialogElement).dialog('close');
        }
    }
    this.pick = function (data) {
        if (opts.callback) {
            opts.callback(data);
        }
        this.close();
    }
}
/********************列表操作***************************/
var GRID = new function () {
    //获取值，不校验grid:tableId,col:checkbox所在列,默认为0
    this.getValue = function (grid, col, validateFunc) {
        grid = grid || "data_area";
        col = col || 0;
        var result = { Row: 0, List: [], Data: "", Error: "" };
        $("#" + grid + " tr").each(function (i,o) {
            var td = $("td", o)[col];
            if (td) {
                var chk = $("input[type='checkbox']", td);
                if (chk && chk.attr("checked")) {
                    if (validateFunc) {
                        var validate_result = validateFunc(chk);
                        if (!validate_result.IsSuccess) {
                            result.Error = validate_result.error;
                            return false;
                        }
                    }
                    var val = chk.val();
                    if (val.length > 0) {
                        result.List.push(chk.val());
                    }
                }
            }
        })
        result.Row = result.List.length;
        result.Data = result.List.join(',');
        return result;
    };
    //全部选择
    this.selectAll = function (source, grid, col) {
        grid = grid || "data_area";
        col = col || 0;
        if (!source)
            return;
        var isChecked = false;
        if ($(source).attr("checked")) {
            isChecked = true;
        }
        $("#" + grid + " tr").each(function (i,o) {
            var td = $("td", o)[col];
            if (td) {
                var chk = $("input[type='checkbox']", td);
                if (chk && isChecked) {
                    chk.attr("checked", isChecked)
                } else {
                    chk.removeAttr("checked");
                }
            }
        })
    }
}
/*****************Pager********************/
var PAGER = new function () {
    this.opts = {
        container: "data_area",
        pagerContainer: ".data_pager",
        searchId: "data_search",
        view: 10,
        startRow: 0,
        pageSize: 10,
        data: "",
        totalId: "totalcount",
        lockFunc: null, //{load:null,release:null}
        onSubmit: null,
        onLoad: null
    };
    this.show = function (options) {
        opts = $.extend(PAGER.opts, options);
        PAGER.opts = opts;
        if ($(opts.pagerContainer).length == 0)
            return;
        if (!opts.lockFunc && opts.lockSkin == 'circle') {
            opts.lockFunc = LOCK.circle();
        }
        $("#" + opts.container + " tbody").html("");
        var info = load(opts);
    };
    this.refresh = function () {
        this.show({ startRow: 0 });
    }
    function load(opts) {
        var info = { StartRow: opts.startRow, PageSize: opts.pageSize, TotalCount: 0, List: "", opts: opts };
        if (!opts.data)
            return initPager(info);
        //添加进度
        if ($("#" + opts.container + " .loading").length == 0) {
            $("#" + opts.container).append("<div class=\"loading\"></div>");
        }
        //添加分页信息
        if ($("#" + opts.searchId + " input[name=StartRecord]").length == 0) {
            var sr = "<input type=\"text\" name=\"StartRecord\" id=\"StartRecord\" style=\"display:none\" value=\"" + opts.startRow + "\" />";
            sr += "<input type=\"text\" name=\"StartRow\" id=\"StartRow\" style=\"display:none\" value=\"" + opts.startRow + "\" />";//兼容
            $("#" + opts.searchId).append(sr);
        }
        else {
            $("#" + opts.searchId + " input[name=StartRecord]").val(opts.startRow);
            $("#" + opts.searchId + " input[name=StartRow]").val(opts.startRow);
        }
        if ($("#" + opts.searchId + " input[name=PageSize]").length == 0) {
            var pz = "<input type=\"text\" name=\"PageSize\" id=\"PageSize\" style=\"display:none\" value=\"" + opts.pageSize + "\" />";
            $("#" + opts.searchId).append(pz);
        }
        else {
            $("#" + opts.searchId + " input[name=PageSize]").val(opts.pageSize);
        }
        // var datas = $("#" + opts.searchId + " input[type=text]").serialize();
        var datas = $("#" + opts.searchId + " input[placed!=1],select,textarea").serialize();
        if (opts.onSubmit) {
            datas = opts.onSubmit(datas);
        }
        AJAX.submit({
            url: opts.data,
            data: datas,
            dataType: "text",
            lockMode: "#" + opts.container + " .loading",
            lockFunc: LOCK.bar(),
            callback: function (reponse) {
                if (reponse.IsSuccess) {
                    info.List = reponse.Data;
                }
                initPager(info);
            }
        });
    }
    function initPager(info) {
        $("#" + info.opts.container + " tbody").html(info.List);
        info.TotalCount = parseInt($("#" + info.opts.totalId).val());
        var totalPage = parseInt((info.TotalCount - info.TotalCount % info.PageSize) / info.PageSize);
        if (info.TotalCount % info.PageSize != 0) {
            totalPage += 1;
        }
        var curPage = parseInt((opts.startRow + 1) / info.PageSize) + 1;
        var lPage = parseInt(info.opts.view / 2);
        var rPage = parseInt(info.opts.view / 2);
        var pageHtml = ""; //[1]...[6][7][8][9][10][11]...[end]
        var l = curPage - lPage;
        if (curPage > 1) {//增加上一页
            pageHtml += "<a  href=\"#\" class=\"link prev\">上一页</a>";
        }
        if (l >= 2) {//显示首页
            pageHtml += "<a  href=\"#\">1</a>";
        }
        if (l > 2) {//省略中间页
            pageHtml += "<span>...</span>";
        }
        for (var i = curPage - lPage; i < curPage; i++) {
            if (i >= 1) {
                pageHtml += "<a  href=\"#\">" + i + "</a>";
            }
        }
        pageHtml += "<a  class=\"cur\" href=\"#\">" + curPage + "</a>";
        var r = curPage + rPage;
        for (var i = curPage + 1; i < curPage + rPage; i++) {
            if (i <= totalPage) {
                pageHtml += "<a  href=\"#\">" + i + "</a>";
            }
        }
        if (r + 1 < totalPage) {
            pageHtml += "<span>...</span>";
        }
        if (r <= totalPage) {
            pageHtml += "<a  href=\"#\">" + totalPage + "</a>";
        }
        if (curPage < totalPage) {//增加下一页
            pageHtml += "<a  href=\"#\" class=\"link next\">下一页</a>";
        }
        var html = "<div class=\"pager\">" +
                        "<div  class=\"pager_l\"> <span>共" + totalPage + "页/" + info.TotalCount + "条</span></div>" +
                        "<div  class=\"pager_r\">" +
                          pageHtml +
                        "</div>" +
                   "</div>";
        $(info.opts.pagerContainer).html(html);
        $(".pager a[class!=link]").click(function () {
            var page = parseInt($(this).text());
            PAGER.show({ startRow: (page - 1) * PAGER.opts.pageSize })
        })
        $(".pager a.next").click(function () {
            var page = parseInt($(".pager a.cur").text());
            PAGER.show({ startRow: (page) * PAGER.opts.pageSize })
        })
        $(".pager a.prev").click(function () {
            var page = parseInt($(".pager a.cur").text());
            PAGER.show({ startRow: (page - 2) * PAGER.opts.pageSize })
        });
        if (info.opts.onLoad) {
            info.opts.onLoad();
        };
    }
}
/********************地址控件***************************/
//{id,placeHolderForArea,level,selected,isAutoComplete}
var AREA;
var Location = function (options) {
    if (!AREA) {
        AREA = eval("(" + EXPRESS.areaData + ")");
    }
    options.parentId = options.id + "_parent";
    options.areaShowId = options.id + "_areashow";
    var cfg = {
        placeHolderForArea: "请输入城市名(中文/拼音)",
        level: 3,
        selected: setHiddenValue,
        onSuccess: null, //赋值成功后触发事件
        id: "",
        parentId: "",
        areaShowId: "",
        isAutoComplete: true,
        autoTip: $("<div class='menutip'>您可以使用键盘的<span class='arr'>&nbsp;&uarr;&nbsp;&darr;&nbsp;</span>键来选择</div>")//触发googlesuggest,增加说明
    };
    jQuery.extend(cfg, options);
    cfg.areaData = AREA;
    this.getConfig = function () {
        return cfg;
    };
    this.init = function () {
        var self = this;
        $("#" + cfg.id).wrap("<span class=\"location_p\"  id='" + cfg.parentId + "'></span>");
        $("#" + cfg.parentId).append("<span id=" + cfg.areaShowId + " class=\"location-select\"></span>");
        $('html').bind("click", function (event) { pageClickHandler(event, cfg); });
        initArea();
        if (cfg.isAutoComplete) {
            $("#" + cfg.id).autocomplete({
                "source": function (request, response) {
                    //[{ "value": "福建省-厦门市", "label": "厦门市", "exId": 0}]
                    var content = request.term.toUpperCase(); ;
                    var Arr = new Array();
                    var areaData = AREA;
                    for (m in areaData) {
                        var obj = areaData[m];
                        if ("s" in obj) {
                            for (sub in areaData[m]) {
                                if (sub != 'code' && sub != 'scope' && sub != 's') {
                                    if (areaData[m][sub].s[0].toUpperCase().indexOf(content) > -1 || areaData[m][sub].s[1].toUpperCase().indexOf(content) > -1 || sub.indexOf(content) > -1) {
                                        var Address = { value: "", label: "", exId: 0 };
                                        Address.value = m + "-" + sub;
                                        Address.label = sub;
                                        Arr.push(Address);
                                    }
                                    //继续遍历区
                                    for (three in areaData[m][sub]) {
                                        if (three != 'code' && three != 'scope' && three != 's') {
                                            if (areaData[m][sub][three].s[0].toUpperCase().indexOf(content) > -1 || areaData[m][sub][three].s[1].toUpperCase().indexOf(content) > -1 || three.indexOf(content) > -1) {
                                                var Address = { value: "", label: "", exId: 0 };
                                                Address.value = m + "-" + sub + "-" + three;
                                                Address.label = sub + "-" + three;
                                                Arr.push(Address);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    response(Arr);
                },
                "delay": 50,
                "minLength": 1,
                "position": {
                    my: "left top",
                    at: "left bottom",
                    offset: "0 28"
                },
                select: function (event, ui) {
                    setAutoCompleteValue(this, ui.item);
                },
                open: function () {
                    var id = this.id;
                    $(this).after(cfg.autoTip.css({
                        "top": $(this).position().top + 30,
                        "left": $(this).position().left
                    }));
                    $("#" + cfg.areaShowId).areaselect("close");
                },
                close: function (event) {
                    cfg.autoTip.remove();
                }
            })
        }
        FORM.placeHolder({ id: cfg.id, title: cfg.placeHolderForArea });
        if ($("#" + cfg.id).val().length > 0 && $("#" + cfg.id).val() != cfg.placeHolderForArea) {
            $("#" + cfg.id).css("color", "black");
        }
    };
    this.isValid = function (value) {//地址是否有效
        if (value.length == 0)
            return true;
        return false;
    };
    function initArea() {
        var self = this;
        if (!cfg.areaShowId) {
            alert('未给定areaShowId');
            return false;
        }
        if (!cfg.id) {
            alert('未给定id');
            return false;
        }
        $("#" + cfg.areaShowId).areaselect({
            "source": cfg.areaData,
            "showIn": "#" + cfg.id,
            "grade": cfg.level,
            "type": 'area',
            "selected": cfg.selected
        }).hide();
        //如果textbox有值默认赋值
        if ($("#" + cfg.id).val().length > 0) {
            var address = getAddress(cfg.areaData, $("#" + cfg.id).val());
            if (address == null)
                return;
            $("#" + cfg.areaShowId).areaselect("initAddress");
            $("#" + cfg.areaShowId).areaselect("initTab", address);
        }
    };
    function pageClickHandler(event, cfg) {
        var target = $(event.target),
				parent = target.parents(".area-tab"),
				sId, isMenu = target.parent().attr('class') == 'ui-menu-item';
        //点击空白 关闭搜索框
        if (target.parent().attr('Id') != cfg.parentId) {
            //            $("#source-area-select").hide();
            //            $("#dest-area-select").hide();
            $("#" + cfg.areaShowId).areaselect("close");
        } else {
            var top;
            var left;
            top = cfg.top || parseInt($("#" + cfg.id).offset().top) + parseInt($("#" + cfg.id).height()) + 7;
            left = cfg.left || $("#" + cfg.id).offset().left;
            $("#" + cfg.areaShowId).areaselect("open").css({ "top": top, "left": left });
        }
    };
    function setHiddenValue(address, id) {
        if (!id || !address)
            return;
        $(id).css("color", "black");
        if (id.indexOf("Origin") > -1) {
            setOriginValue(address);
        } else if (id.indexOf("Dest") > -1) {
            setDestValue(address);
        }
        if (cfg.onSuccess) {
            cfg.onSuccess(address, id);
        }
    };
    function setAutoCompleteValue(element, data) {
        var datas = data.value.split('-');
        var address = {};
        $("#" + element.id).val(data.value);
        setHiddenValue(address, element.id);
        var source = cfg.areaData;
        for (var i = 0; i < datas.length; i++) {
            source = source[datas[i]];
            if (source == undefined)
                return;
            address[i + 1] = { name: datas[i], code: source.code };
        }
        $("#" + cfg.areaShowId).areaselect("initAddress");
        $("#" + cfg.areaShowId).areaselect("initTab", address);
        if (datas.length != 3) {
            $("#" + cfg.areaShowId).areaselect("open");
        }

    };
    function setOriginValue(address) {
        if (address[1]) {
            $("#prm_OriginProvinceName_").val(address[1].name);
            $("#prm_OriginProvinceId_").val(address[1].code);
            $("#OriginProvinceName").val(address[1].name);
            $("#OriginProvinceId").val(address[1].code);
        }
        if (address[2]) {
            $("#prm_OriginCityName_").val(address[2].name);
            $("#prm_OriginCityId_").val(address[2].code);
            $("#OriginCityName").val(address[2].name);
            $("#OriginCityId").val(address[2].code);
        }
        if (address[3]) {
            $("#prm_OriginAreaName_").val(address[3].name);
            $("#prm_OriginAreaId_").val(address[3].code);
            $("#OriginAreaName").val(address[3].name);
            $("#OriginAreaId").val(address[3].code);
        }
    };
    function setDestValue(address) {
        if (address[1]) {
            $("#prm_DestinationProvinceName_").val(address[1].name);
            $("#prm_DestinationProvinceId_").val(address[1].code);
            $("#DestinationProvinceName").val(address[1].name);
            $("#DestinationProvinceId").val(address[1].code);
        }
        if (address[2]) {
            $("#prm_DestinationCityName_").val(address[2].name);
            $("#prm_DestinationCityId_").val(address[2].code);
            $("#DestinationCityName").val(address[2].name);
            $("#DestinationCityId").val(address[2].code);
        }
        if (address[3]) {
            $("#prm_DestinationAreaName_").val(address[3].name);
            $("#prm_DestinationAreaId_").val(address[3].code);
            $("#DestinationAreaName").val(address[3].name);
            $("#DestinationAreaId").val(address[3].code);
        }
    };
    function getAddress(source, text) {
        if (text && text.length <= 0) {
            return null;
        }
        var address = {};
        var source = source || cfg.areaData;
        var datas = text.split('-');
        for (var i = 0; i < datas.length; i++) {
            source = source[datas[i]];
            if (source == undefined)
                return;
            address[i + 1] = { name: datas[i], code: source.code };
        }
        return address;
    };
    function hide() {
        $("#" + cfg.areaShowId).areaselect("close");
    };
    this.init();
};
Location.getAreaList = function (provinceId, cityId) { //通过市Id获取区
    if (!AREA) {
        AREA = eval("(" + EXPRESS.areaData + ")");
    }
    var li = [];
    for (m in AREA) { //Name:{code:,s:,scope:,childName1:{},childName2:{}}
        var pItem = AREA[m];
        if (pItem["code"] == provinceId) {//找到省
            for (p in pItem) {
                var cItem = pItem[p];
                if (cItem["code"] && cItem["code"] == cityId) {//找到市
                    for (a in cItem) {
                        var aItem = cItem[a];
                        if (aItem["code"]) { //区信息
                            li.push({ Name: a, Code: aItem["code"], Item: aItem });
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return li;
};
Location.getTownList = function (provinceId, cityId, areaId) { //通过市Id获取区
    var datas = Location.getAreaList(provinceId, cityId);
    var li = [];
    for (var i in datas) {
        var item = datas[i];
        if (item.Code == areaId) {
            var aItem = item.Item;
            for (t in aItem) {
                var tItem = aItem[t];
                if (tItem["code"]) { //镇信息
                    li.push({ Name: t, Code: tItem["code"], Item: tItem });
                }
            }
            break;
        }
    }
    return li;
};
/********************控件***************************/
var TextArea = function (opts) {
    var _opts = { name: "", size: 400, defaultText: "" };
    opts = $.extend(_opts, opts);
    if (!opts.name)
        return;
    opts.sizeId = opts.name + "_WordCount";
    $("#" + opts.name).bind("keyup", function () {
        checkWordCount(opts);
    });
    $("#" + opts.name).bind("change", function () {
        checkWordCount(opts);
    });
    if (opts.defaultText) {
        FORM.placeHolder({ id: opts.name, title: opts.defaultText });
    }
    function checkWordCount(opts) {
        var used = $("#" + opts.name).val().length;
        if (parseInt(opts.size) >= parseInt(used)) {
            $("#" + opts.sizeId).html((parseInt(opts.size) - parseInt(used)));
        } else {
            $("#" + opts.name).val($("#" + opts.name).val().substring(0, parseInt(opts.size)));
        }
    }
}
var COMBOX_EVNET;
var ComboxList = {};//当前页面的列表清单
var Combox = function (opts) {
    var _opts = { name: "", data: [], isvalid: true, onChange: null, dataField: "", valueField: "", onRender: null, selectValue: "", selectText: "" };
    function init() {
        opts = $.extend(_opts, opts);
        opts.txtName = opts.name + "_text";
        var container = $("#" + opts.name).parents(".combox");
        var combox_list = getComboxList();
        container.append(combox_list);
        $("#" + opts.txtName).val(opts.selectText);
        //绑定事件
        //        $(".combox_li", container).hover(function () {
        //            $(".combox_li", container).removeClass("combox_select");
        //            $(this).addClass("combox_select");
        //        }, function () {
        //            $(this).removeClass("combox_select")
        //        });
        $(".combox_li", container).bind("click", function () {
            var value = getValue(opts.name);
            var txt = getText(opts.name);
            //获取当前值
            var curValue = $(this).attr("code");
            var curTxt = $(this).attr("text");
            $(".combox_list", container).hide();
            $("#" + opts.name).val(curValue);
            $("#" + opts.txtName).val(curTxt);
            $(".combox_li", container).removeClass("combox_select");
            $(this).addClass("combox_select");
            if (value != curValue && opts.onChange) {
                var func = UTIL.getFunction(opts.onChange);
                if (func) {
                    func($("#" + opts.name), curTxt, curValue);
                }
            }
        });
        $(".combox_icon", container).click(function () {
            googleSuggest(opts, 'click');
        });
        $("#" + opts.txtName).bind("click", function () {
            googleSuggest(opts, 'click');
        });
        $("#" + opts.txtName).bind("keydown", function (event) {
            var keycode = event.which;
            if (keycode != 38 && keycode != 40 && keycode != 13 && keycode != 9) {
                googleSuggest(opts);
            }
        });
        $("#" + opts.txtName).bind("keyup", function (event) {
            var keycode = event.which;
            if (keycode != 38 && keycode != 40 && keycode != 13 && keycode != 9) {
                googleSuggest(opts);
            }
        });
        function googleSuggest(opts, eventName) {
            var obj = $("#" + opts.txtName);
            var container = obj.parents(".combox");
            var input = obj.val();
            if (input.length > 0) {
                input = input.toUpperCase();
            };
            if (opts.data != null && opts.data.length > 0) {
                for (var i = 0; i < opts.data.length; i++) {
                    var text = opts.data[i][opts.dataField].toUpperCase();
                    var value = opts.data[i][opts.valueField];
                    var seq = opts.data[i].comboxSeq;
                    if (text.indexOf(input) > -1 || input.length == 0 || eventName == "click") {
                        $("li[seq=" + seq + "]", container).show();
                    } else {
                        $("li[seq=" + seq + "]", container).hide();
                    }
                }
            }
            $(".combox_list", container).show();
        }
    }
    function getComboxList() {
        var combox_list = "<div  class=\"combox_list\" style=\"display:none\">";
        combox_list += "<ul>";
        if (opts.data != null && opts.data.length > 0) {
            for (var i = 0; i < opts.data.length; i++) {
                //产生动态序列号
                opts.data[i].comboxSeq = i;
                var text = opts.data[i][opts.dataField];
                var value = opts.data[i][opts.valueField];
                var isSelect = false;
                if (opts.selectValue == value) {
                    isSelect = true;
                    opts.selectText = text;
                }
                combox_list += ("<li class=\"combox_li" + (isSelect == true ? " combox_select" : "") + "\" code=" + value + " text=" + text + " seq=" + i + ">");
                if (opts.onRender && window[opts.onRender]) {
                    combox_list += window[opts.onRender](text, value, opts.data[i]);
                } else {
                    combox_list += "<span>" + text + "</span>";
                }
                combox_list += "</li>";
            }
        }
        combox_list += "</ul>";
        return combox_list;
    }
    function getValue(name) {
        return $("#" + name).val();
    }
    function getText(name) {
        return $("#" + name + "_text").val();
    }
    init();
    this.getValue = getValue;
    this.getText = getText;
    this.setValue = function (value) {
        var text = "";
        if (opts.data != null && opts.data.length > 0 && value) {
            for (var i = 0; i < opts.data.length; i++) {
                var c = opts.data[i][opts.valueField];
                if (c == value) {
                    text = opts.data[i][opts.dataField];
                    break;
                }
            }
        }
        if (text == "")
            value = "";
        var oldValue = $("#" + opts.name).val();
        $("#" + opts.name).val(value);
        $("#" + opts.txtName).val(text);
        if (value != oldValue && opts.onChange && window[opts.onChange]) {
            window[opts.onChange]($("#" + opts.name), curTxt, curValue);
        }
    }
    if (COMBOX_EVNET == undefined) {
        COMBOX_EVNET = true;
        ComboxList = {};
        Combox.getInstance = function (name) {
            if (ComboxList[name]) {
                return ComboxList[name];
            } else {
                return null;
            }
        }
        $("html").bind("click", function (event) {
            if (event && event.target) {
                var drp_container = $(event.target).parents(".combox");
                if (!drp_container || drp_container.length == 0) {
                    $(".combox_list").hide();
                }
            }
        });
    }
    ComboxList[opts.name] = this;
}
/*****************map********************/
var Map = function (opts) {
    var map;
    var defaults = {
        id: "map", //地图位置
        city: "北京", //初始化城市
        data: ""//数据服务地址
    };
    function init() {
        opts = $.extend(defaults, opts);
        map = new BMap.Map(opts.id);
        map.centerAndZoom(opts.city, 10); //定位当前城市
        map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
        map.enableScrollWheelZoom();
    }
    init();
    if (!Map.Icon) {
        Map.Icon = {};
        Map.Icon.Red = new BMap.Icon("/Base/RS/CM/Image/markers.png", new BMap.Size(21, 30), {
            offset: new BMap.Size(21, 30), // 指定定位位置  
            imageOffset: new BMap.Size(0, -116) // 设置图片偏移  
        });
        Map.Icon.Blue = new BMap.Icon("/Base/RS/CM/Image/markers.png", new BMap.Size(24, 35), {
            offset: new BMap.Size(24, 35), // 指定定位位置  
            imageOffset: new BMap.Size(0, -156) // 设置图片偏移  
        });
    }
    return map;
};
Map.Marker = function (point, opts) {
    opts = opts || {};
    var defaults = {
        icon: Map.Icon.Red //红色图标
    };
    opts = $.extend(defaults, opts);
    var market = new BMap.Marker(point, opts);
    market.data = opts.data;
    return market;
};
Map.InfoWindow = function (opts) {
    opts = opts || {};
    var defaults = {
        width: 300,
        height: 80,
        title: "",
        content: ""
    };
    opts = $.extend(defaults, opts);
    return new BMap.InfoWindow(opts.content, opts);
};
Map.getPoint = function (lng, lat) {
    return new BMap.Point(lng, lat);
};
Map.getAddressPoint = function (data, callback, city) {
    var geo = new BMap.Geocoder();
    geo.getPoint(data.Address, function (point) {
        if (point != null) {
            callback(point, data);
        }
    }, city);
};
Map.DrivingRoute = function () {
    var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: route }); //驾车实例
    driving.search(start, end); //显示一条线路
};
Map.drivingRoute = function (map,start, end, route) {
    if (!route)
        route = BMAP_DRIVING_POLICY_LEAST_DISTANCE;
    var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: route }); //驾车实例
    driving.search(start, end); //显示一条线路
};

/********************文件管理***************************/
var BrowseHistory = [];
var FILE = new function () {
    this.del = function (id, callback) {
        if (!id) {
            alert('请选择要删除的附件');
            return false;
        }
        if (confirm("确定删除该附件?")) {
            AJAX.submit({
                url: "/Attachment/Delete",
                data: { Id: id },
                callback: function (reponse) {
                    if (callback) {
                        callback(reponse);
                    }
                }
            });
        }
    };
    this.browse = function (opts) { //浏览图片
        opts = opts || {};
        var defaults = {
            url: null//通过异步获取数据
        };
        opts = $.extend(defaults, opts);
        if (!opts.url) {
            return;
        }
        var result = { url: null, data: null };
        for (var i = 0; i < BrowseHistory.length; i++) {
            if (BrowseHistory[i].url == opts.url) {
                data = BrowseHistory[i];
                break;
            }
        }
        if (!result.data) {
            AJAX.submit({
                url: opts.url,
                callback: function (reponse) {
                    if (reponse.IsSuccess) {
                        result.url = opts.url;
                        result.data = reponse.Data;
                        BrowseHistory.push(result);
                        setup(result);
                    } else {
                        alert(reponse.Error);
                    }
                }
            })
        } else {
            setup(result);
        }
    }
    function setup(result) {
        if ($("#img_browse").length > 0) {
            $("#img_browse").remove();
            $("#img_browse_mask").remove();
        }
        $(document.body).append(result.data);
        var height = $(document).scrollTop() + document.body.clientHeight;
        $("#img_browse").css({ height: height });
        $("#img_browse .browse_c").css({ top: $(document).scrollTop() + 50 });
        $("#img_browse_mask").css({ height: height });
        $("#img_browse").show();
        $("#img_browse_mask").show();
        $("#img_browse .browse_close").click(function () {
            $("#img_browse").remove();
            $("#img_browse_mask").remove();
        });
        $(window).scroll(function () {
            var height = $(document).scrollTop() + 50;
            $("#img_browse .browse_c").css({ top: $(document).scrollTop() + 50 });
        });
    }
}
/**********************发送手机号码等管理*************************/
var EMITTER = new function () {
    var wait = 60;
    var intervalId; //定时器
    this.MobileSend = function (opts) {
        var defaults = {
            sourceId: "btnVaildateCode",
            templateId: null,
            dest: null,
            sendUrl: "/Emitter/MobileSend",
            validator: null,
            success: null
        }
        defaults = $.extend(defaults, opts);
        if (!defaults.templateId) {
            alert('请给定模板编号');
            return;
        }
        if (!defaults.dest) {
            alert('请填写要发送的号码');
            return;
        }
        if ($("#Win_MobileCode").length > 0) {
            $("#Win_MobileCode").remove();
        }
        var html = "<div id=\"Win_MobileCode\"><div class=\"Win_MobileCode_form\">";
        html += "<div class=\"Win_MobileCode_form_h\">请输入验证码:</div>";
        html += "<div class=\"Win_MobileCode_form_c\"><input type=\"text\" class=\"txt_fixed\" id=\"txtMobileCode\" style=\"width: 75px; height: 25px;\" >";
        html += "<img id=\"verifyimage\" title=\"验证码\" style=\"width: 75px; height: 25px; vertical-align: middle\" align=\"absmiddle\" src=\"/ValidateCode/Create?Category=" + defaults.templateId + "_SMS" + "&r=" + Math.round(Math.random() * 10000) + "\" alt=\"\">";
        html += "<span><a href=\"javascript:\" id=\"actRefrash\" title=\"点击可重新选择验证码\">看不清</a></span>";
        html += "</div>";
        html += "<div class=\"Win_MobileCode_tool\"><input type=\"button\" id=\"btnMobileCode\" style=\"background:#c2264d;margin-left:0px;\" class=\"btn_edit\" name=\"btnMobileCode\" value=\"确定\" /></div>";
        html += "<div class=\"Win_MobileCode_form_p\"></div>";
        html += "</div></div>";
        $(document.body).append(html);
        PICKER.open("#Win_MobileCode", "", 350, 220);
        $(".ui-widget-header").css("background", "#FFF");
        $("#btnMobileCode").click(function () {
            var code = $("#txtMobileCode").val();
            if (code.length == 0) {
                $(".Win_MobileCode_form_p").html("验证码不能为空");
                return false;
            }
            var data = { templateId: defaults.templateId, dest: defaults.dest, validateCode: code };
            AJAX.post(defaults.sendUrl, data, function (reponse) {
                if (reponse.IsSuccess) {
                    PICKER.close();
                    if (defaults.success) {
                        defaults.success();
                        return;
                    }
                    var source = $("#" + defaults.sourceId);
                    source.attr("disabled", "disabled");
                    source.css("color", "gray");
                    intervalId = window.setInterval(function () {
                        if (wait > 0) {
                            source.val("验证码已发送," + wait + "秒后重新获取验证码");
                            wait--;
                        } else {
                            wait = 60;
                            source.val("获取验证码");
                            source.removeAttr("disabled");
                            source.css("color", "black");
                            window.clearInterval(intervalId);
                        }
                    }, 1000);

                } else {
                    $(".Win_MobileCode_form_p").html(reponse.Error);
                }
            });
        })
        $("#actRefrash").click(function () {
            var src = "/ValidateCode/Create?Category=" + defaults.templateId + "_SMS" + "&r=" + Math.round(Math.random() * 10000);
            $("#verifyimage").attr("src", src);
        })
    }
}
/*****************一些小插件********************/
var PLUG = new function () {
    this.goTop = function (id) {//回到顶部功能
        if (!id) { return; }
        var av_height = $(window).height();
        var av_width = $(window).width();
        var go_top = $("#" + id);
        var Gotop_w = go_top.width() + 2;
        var Gotop_h = go_top.height() + 2;
        var doc_width = 960;
        var Gotop_x = (av_width > doc_width ? 0.5 * av_width + 0.5 * doc_width : av_width - Gotop_w);
        var Gotop_y = av_height - Gotop_h;
        var ie6Hack = "<style>.go_top{position:absolute; top:expression(documentElement.scrollTop+documentElement.clientHeight - this.offsetHeight-40);</style>}";
        if ($.browser.msie && ($.browser.version == "6.0")) {
            $("body").append(ie6Hack);
        }
        function setGotop() {
            av_height = $(window).height();
            av_width = $(window).width();
            Gotop_y = av_height - Gotop_h - 133;
            //Gotop_x = (av_width > doc_width ? 0.5 * av_width + 0.5 * doc_width : av_width - Gotop_w);
            Gotop_x = (av_width - Gotop_w);
            go_top.fadeIn(200);
            //            if ($(window).scrollTop() > 0) {
            //                go_top.fadeIn(200);
            //            } else {
            //                go_top.fadeOut(200);
            //            }
            if ($.browser.msie && ($.browser.version == "6.0")) {
                go_top.animate({ "left": Gotop_x }, 0);
                return false;
            }
            go_top.animate({ "left": Gotop_x, "top": Gotop_y }, 0);
        }
        setGotop();
        $(window).resize(function () {
            setGotop();
        })
        $(window).scroll(function () {
            setGotop();
        })
        go_top.find(".top").click(function () {
            $("html , body").animate({ scrollTop: "0" }, 100);
        })
        go_top.find(".item-ico").mouseover(function () {
            $(this).siblings(".item-bg").css("background", "#81c0f2");
        }).mouseout(function () {
            $(this).siblings(".item-bg").css("background", "#b3d9f7");
        })
    },
    this.smartFloat = function (id) {
        var element = $(id);
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) { //如果滚动到页面超出了当前元素element的相对页面顶部的高度
                if (window.XMLHttpRequest) { //如果不是ie6
                    element.css({
                        position: "fixed",
                        top: 0
                    }).addClass("shadow");
                } else { //如果是ie6
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                }).removeClass("shadow");
            }
        });
    },
    this.singleRoll = function (obj) {
        var _wrap = $(obj);   //定义滚动区域
        var _interval = 3000;               //定义滚动间隙时间
        var _moving;                        //需要清除的动画
        _wrap.hover(function () {
            clearInterval(_moving);         //当鼠标在滚动区域中时，停止滚动
        }, function () {
            _moving = setInterval(function () {
                var _field = _wrap.find('li:first'); //此变量不可放置于函数起始处，li:first取值是变化的
                var _h = _field.height();            //取得每次滚动高度
                _field.animate({ marginTop: -_h + 'px' }, 600, function () {    //通过取负margin值，隐藏第一行
                    _field.css('marginTop', 0).appendTo(_wrap);                 //隐藏后，将该行的margin值置零，并插入到最后，实现无缝滚动
                })
            }, _interval)           //滚动间隔时间取决于_interval
        }).trigger('mouseleave');   //函数载入时，模拟执行mouseleave，即自动滚动
    }
};

jQuery.fn.picScroll = function (option) {
    opt = jQuery.extend({
        box: null, //主Id
        pic: null, //大图框id
        prev: null,
        next: null,
        minPic: null, //小图框Id
        min_prev: null,
        min_next: null,
        autoPlay: false, //是否自动播放
        interTime: 3000, //自动播放间隔时间
        delayTime: 500,  //图片切换时间
        min_picnum: 5  //小图显示数量
    }, option || {});
    var picNum = $(opt.pic).find("ul li").length;
    var picWidth = $(opt.pic).find("ul li").outerWidth(true);

    var minPicNum = $(opt.minPic).find('ul li').length;
    var minpicminw = $(opt.minPic).find('ul li').outerWidth(true);

    $(opt.pic).find("ul").width(picWidth * picNum);
    $(opt.minPic).find("ul").width(minpicminw * minPicNum);

    var pictime;
    var picIndex = 0;

    var height = $(document).scrollTop() + 50;
    $(opt.box).css("top", height);
    $(window).scroll(function () {
        var height = $(document).scrollTop() + 50;
        $(opt.box).css("top", height);
    });
    $(opt.minPic).find("li").click(function () {
        picIndex = $(this).index();
        show(picIndex);
        minShow(picIndex);
    })
    if (opt.autoPlay == true) {
        //自动播放
        pictime = setInterval(function () {
            show(picIndex);
            minShow(picIndex)
            picIndex++;
            if (picIndex == picNum) { picIndex = 0 };
        }, opt.interTime);
        //鼠标经过停止播放
        $(opt.box).hover(function () {
            clearInterval(pictime);
        }, function () {
            pictime = setInterval(function () {
                show(picIndex);
                minShow(picIndex)
                picIndex++;
                if (picIndex == picNum) { picIndex = 0 };
            }, opt.interTime);
        });
    }
    $(opt.prev).click(function () {
        if (picIndex == 0) { picIndex = picNum };
        picIndex--;
        minShow(picIndex)
        show(picIndex);
    })
    $(opt.next).click(function () {
        if (picIndex == picNum - 1) { picIndex = -1 };
        picIndex++;
        minShow(picIndex)
        show(picIndex);
    })

    $(opt.min_prev).click(function () {
        if (picIndex == 0) { picIndex = picNum };
        picIndex--;
        minShow(picIndex)
        show(picIndex);
    })
    $(opt.min_next).click(function () {
        if (picIndex == picNum - 1) { picIndex = -1 };
        picIndex++;
        minShow(picIndex)
        show(picIndex);
    })
    function show(index) {
        var leftValue = -index * picWidth;
        $(opt.pic).find("ul li").css("float", "left");
        //$(opt.pic).find("ul").css("left", leftValue);
        $(opt.pic).find("ul").stop().animate({ "left": leftValue }, opt.delayTime);
        $(opt.minPic).find("li:eq(" + index + ")").addClass("on").siblings(this).removeClass("on");
    }
    function minShow(index) {
        var mingdjl_num = index - (opt.min_picnum - 1) + 1;
        var leftValue = -mingdjl_num * minpicminw;
        if (minPicNum > opt.min_picnum) {
            if (index < 3) { leftValue = 0; }
            if (index == minPicNum - 1) { leftValue = -(mingdjl_num - 1) * minpicminw; }
            $(opt.minPic).find("ul").stop().animate({ "left": leftValue }, opt.delayTime);
        }
    }
}


