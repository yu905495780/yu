accessid = '';
accesskey = '';
host = '';
policyBase64 = '';
signature = '';
callbackbody = '';
filename = '';
key = '';
expire = 0;
g_object_name = '';
g_object_name_type = '';
now = timestamp = Date.parse(new Date()) / 1000;

function send_request() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp != null) {
        serverUrl = 'http://192.168.1.11:8080/apptoken/getJsToken'
        xmlhttp.open("GET", serverUrl, false);
        xmlhttp.send(null);
        return xmlhttp.responseText
    }
    else {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length; i++) {
        if (tt[i].checked) {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_signature() {
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3) {
        body = send_request();
        var obj = eval("(" + body + ")");
        host = obj['host'];
        policyBase64 = obj['policy'];
        accessid = obj['accessid'];
        signature = obj['signature'];
        expire = parseInt(obj['expire']);
        callbackbody = obj['callback'];
        key = obj['dir'];
        return true;
    }
    return false;
};

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.');
    suffix = '';
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name') {
        suffix = get_suffix(filename);
        g_object_name = key + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename) {
    if (g_object_name_type == 'local_name') {
        tmp_name = g_object_name;
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if (g_object_name_type == 'random_name') {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret) {
    if (ret == false) {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename);
        calculate_object_name(filename);
    }
    new_multipart_params = {
        'key': g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'callback': callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: [
        'selectfiles1', 'selectfiles2', 'selectfiles3', 'selectfiles4'
    ],
    //multi_selection: false,
    // container: document.getElementById('selectfiles'),
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    url: 'http://oss.aliyuncs.com',

    filters: {
        mime_types: [ //只允许上传图片和zip,rar文件
            {title: "Image files", extensions: "jpg,jpeg,gif,png,bmp"},
            {title: "Zip files", extensions: "zip,rar"}
        ],
        max_file_size: '10mb', //最大只能上传10mb的文件
        prevent_duplicates: true //不允许选取重复文件
    },

    init: {
        PostInit: function () {
            document.getElementById('ossfile').innerHTML = '';
        },

        FilesAdded: function (up, files) {
            //选择文件后立刻上传
            set_upload_param(uploader, '', false);
        },

        BeforeUpload: function (up, file) {
            check_object_radio();
            set_upload_param(up, file.name, true);
        },

        FileFiltered: function (up, file) {
            var nativeFile = file.getNative();
            var inputId = "#" + nativeFile.inputId;
            var src = getObjectURL(nativeFile);
            $(inputId).parent().css('background', 'url(' + src + ') no-repeat center center').css({
                'background-size': '100%',
                "z-index": 9999
            });
        },

        FileUploaded: function (up, file, info) {
            /*上传成功后回写随机文件名*/
            var nativeFile = file.getNative();
            var inputId = "#" + nativeFile.inputId;
            var div = $(inputId).parent().prev();
            if (info.status == 200) {
                div.attr("file-url", get_uploaded_object_name(file.name));
            }
            else {
                div.attr("error:" + info.response);
            }
        },

        Error: function (up, err) {

            if (err.code == -600) {
                document.getElementsByClassName('console')[0].innerHTML = '<div style="position: absolute;z-index: 10000;background: rgba(0,0,0,0.8);width: 100%;height: 100%;top: 0;left: 0;"><div class="alert_box" style="background-color: #fff;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 3.9rem;height: 4.08rem;z-index: 25;border-radius: 0.1rem;font-size: 0.28rem;text-align: center;overflow: hidden;"><img src="../img/landing_page/landing_icon.png" alt="" class="icon" style="width: auto;height: 1.58rem;margin: 0.39rem 0 0.31rem;"><p class="title" style="font-size: 0.26rem;margin-bottom: 0.26rem;color: #BABABA;">欢迎参与本次活动</p><p style="padding: 0 0.5rem;font-size: 0.18rem;margin-bottom: 0.25rem;" class="title_p">选择的图片太大，请重新上传</p> <p class="close" style="height: 0.67rem;line-height: 0.67rem;color: #fff;font-size: 0.28rem;background-color: #F66E78;">确定</p> </div></div>';
            }
            else if (err.code == -601) {
                document.getElementsByClassName('console')[0].innerHTML = '<div style="position: absolute;z-index: 10000;background: rgba(0,0,0,0.8);width: 100%;height: 100%;top: 0;left: 0;"><div class="alert_box" style="background-color: #fff;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 3.9rem;height: 4.08rem;z-index: 25;border-radius: 0.1rem;font-size: 0.28rem;text-align: center;overflow: hidden;"><img src="../img/landing_page/landing_icon.png" alt="" class="icon" style="width: auto;height: 1.58rem;margin: 0.39rem 0 0.31rem;"><p class="title" style="font-size: 0.26rem;margin-bottom: 0.26rem;color: #BABABA;">欢迎参与本次活动</p><p style="padding: 0 0.5rem;font-size: 0.18rem;margin-bottom: 0.25rem;" class="title_p">请选择图片</p> <p class="close" style="height: 0.67rem;line-height: 0.67rem;color: #fff;font-size: 0.28rem;background-color: #F66E78;">确定</p> </div></div>';
            }
            else if (err.code == -602) {
                document.getElementsByClassName('console')[0].innerHTML = '<div style="position: absolute;z-index: 10000;background: rgba(0,0,0,0.8);width: 100%;height: 100%;top: 0;left: 0;"><div class="alert_box" style="background-color: #fff;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 3.9rem;height: 4.08rem;z-index: 25;border-radius: 0.1rem;font-size: 0.28rem;text-align: center;overflow: hidden;"><img src="../img/landing_page/landing_icon.png" alt="" class="icon" style="width: auto;height: 1.58rem;margin: 0.39rem 0 0.31rem;"><p class="title" style="font-size: 0.26rem;margin-bottom: 0.26rem;color: #BABABA;">欢迎参与本次活动</p><p style="padding: 0 0.5rem;font-size: 0.18rem;margin-bottom: 0.25rem;" class="title_p">这个文件已经上传过一遍了</p> <p class="close" style="height: 0.67rem;line-height: 0.67rem;color: #fff;font-size: 0.28rem;background-color: #F66E78;">确定</p> </div></div>';
            }
            else {
                document.getElementsByClassName('console')[0].innerHTML = '<div style="position: absolute;z-index: 10000;background: rgba(0,0,0,0.8);width: 100%;height: 100%;top: 0;left: 0;"><div class="alert_box" style="background-color: #fff;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 3.9rem;height: 4.08rem;z-index: 25;border-radius: 0.1rem;font-size: 0.28rem;text-align: center;overflow: hidden;"><img src="../img/landing_page/landing_icon.png" alt="" class="icon" style="width: auto;height: 1.58rem;margin: 0.39rem 0 0.31rem;"><p class="title" style="font-size: 0.26rem;margin-bottom: 0.26rem;color: #BABABA;">欢迎参与本次活动</p><p style="padding: 0 0.5rem;font-size: 0.18rem;margin-bottom: 0.25rem;" class="title_p">Error xml:' + err.response + '</p> <p class="close" style="height: 0.67rem;line-height: 0.67rem;color: #fff;font-size: 0.28rem;background-color: #F66E78;">确定</p> </div></div>';
            }
            document.getElementsByClassName("close")[0].onclick = function () {
                document.getElementsByClassName('console')[0].removeChild(this.parentNode.parentNode);
            }
        }
    }
});

uploader.init();


function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}
