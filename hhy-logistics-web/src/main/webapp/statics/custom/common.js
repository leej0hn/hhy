//右边公告区域脚本
function LoadNotice() {
    var url = Storage.Path.Root_PORTAL + "/Notice/Top5?callback=?";
    AJAX.getJSON({ url: url, callback: function (reponse) {
            if (reponse.IsSuccess) {
                var html = "<ul>";
                for (var i = 0; i < reponse.Data.length; i++) {
                    var color = "";
                    html += "<li><a href=" + Storage.Path.Root_PORTAL + "/Article?id=" + reponse.Data[i].Id+">" + reponse.Data[i].Title + "</li>";
                }
                html += "</ul>";
                $(".main_ad_i").html(html);
                PLUG.singleRoll(".main_ad_i");
            }
        }
    });
}