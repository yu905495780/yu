/**
 * 解析url参数方法
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 用户id
 * @type {*}
 */
var uid = GetQueryString("uid");

$('input[type="text"],textarea').focus(function () {
    $(this).css("border", "1px solid #F3898A");
});
$('input[type="text"],textarea').blur(function () {
    $(this).css("border", "1px solid #fff");
});


$.get(apiUrl + '/activity/one/getMemberStatus', function (data) {
    var data = data.datas.memberStatus;
    console.log(data);
    if (data == -1) {
        $.post(apiUrl + "/activity/one/addMember", function (data) {
            var data = data.datas;
            if (data.gender == 1) {
                $("#male:checked")
            } else {
                $("#female:checked")
            }
            $(".name").val(data.name);
            //性别
            $(".cardNo").val(data.cardNo);
            $(".birthday").val(data.birthday);
            $(".origin").val(data.origin);
            $(".nationality").val(data.nationality);
            $(".ethnicity").val(data.ethnicity);
            $(".height").val(data.height);
            $(".weight").val(data.weight);
            $(".education").val(data.education);
            $(".wx").val(data.wx);
            $(".mobile").val(data.mobile);
            $(".company").val(data.company);
            $(".skill").val(data.skill);
            $(".summary").html(data.summary);


        })
    }
})


$(function () {

    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 60, //开始年份
        endYear: currYear + 0 //结束年份
    };

    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));

    /**
     * 绑定提交按钮事件
     */
    $(".submit").click(submit);


});

$(".terms_activity").click(function () {
    alert()
})

function alert() {
    var html = '<div class="alert_wrapper1" style="position: absolute;background: rgba(0,0,0,0.5);width: 100%;height: 100%;top: 0;left: 0;z-index: 20000"><div class="alert_top" style="position: absolute;left: 0;top: 0;width: 100%;height: 25rem;"></div><div class="alert_box" style="background-color: #fff;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 5.82rem;height: 8.68rem;z-index: 25;border-radius: 0.1rem;font-size: 0.28rem;overflow: hidden;"><p class="title1" style="font-size: 0.4rem;margin-bottom: 0.48rem;color: #000;margin-top: 0.66rem;text-align: center;">参加活动协议及注意事项</p><p class="txt1" style="padding: 0 0.5rem;font-size: 0.25rem;margin-bottom: 0.15rem;color: #656565; overflow-y: auto;line-height: 0.49rem;height: 6.23rem;">1、参赛者必须认真阅读《参加活动协议及注意事项》，提供资料中不包含任何非法的或不适于发布的事项；<br>2、参赛选手提供详尽、准确的参赛者资料，及时对资料做出必要的更新，使之符合详尽、准确的要求。如果提供的资料不正确，组委会有权取消您的参赛资格；<br>3、由组委会组织拍摄的照片和影像版权归组委会所有；<br>4、参赛者的姓名、形象、声明（陈述）都可能被拍摄及在现有的全球媒体（或今后出现的媒体）播出。以上这些资料的使用取决于主办方———北京神约科技有限公司。另外，参赛者同意大会主办方使用参赛者本人参赛过程的部分或全部内容。参赛者的一切个人及参赛资料有可能在全球媒体的广告或节目中出现，包括（不仅限于）电视、报刊杂志、广播及互联网；<br>5、参赛者同意不就所提供的资料对组委会进行任何追索，并保证在任何第三方就参赛者提供的资料对组委会进行权利要求追索时，参赛者将承担责任。除非评选需要，组委会将不对您所提供的资料作进一步的审查，并且只有参赛者对自己所提供的资料的知识产权及合法性负全部责任；<br>6、参赛者要严格遵守大赛组委会制订的比赛规则；<br>7、参赛者中有与任何经纪人公司，制作公司，媒体公司签有任何合约的，参赛前预先告知大赛主办方。<br>8、组委会将负责制订比赛的程序和规则；决定比赛的时间、地点；设计比赛的内容和形式。并可以根据实际情况对上述各事项做出相应的合理变更。本条所述各项均将在比赛进行前公布，参赛者须遵守组委会的安排；<br>9、参赛者不能采取任何不正当行为干预比赛进程，操纵或影响比赛结果；<br>10、参赛者不能影响或阻碍其他参赛者的参赛内容和行为，不对其他参赛者采取任何不包括在合法竞赛范围内的行为；<br>11、参赛者不得滥用比赛规则所赋予的参赛者权利。组委会有权在有足够证据证明参赛者做出本条款声明禁止的行为时，做出独立判断，取消参赛者的参赛资格；<br>12、组委会将对比赛的合法举办以及公开性、公平性、公正性做出保证，组委会对比赛规则和评选规则拥有最终解释权。参赛者在对比赛结果存有异议时，应向组委会呈报，并由组委会根据比赛规则和评选规则做出最后裁定；<br>13、组委会将根据比赛举办的实际情况决定获胜参赛者可以获得的荣誉和奖励，并将公开颁发所获荣誉和奖励。获奖者在获得荣誉和奖励的同时，有义务作为提供奖品赞助单位的形象代言人宣传奖品赞助单位的产品及形象。参加比赛的选手必须参加大赛主办单位组织的公益性及非公益性的活动；<br>14、组委会(分赛区)如遇人力不可抗拒因素的实际情况可延期或中止大赛，并且无需对参赛者负责。<br>参赛者本人完全理解并同意以上条款 <br>（不以任何理由撤消或反悔） </p><p class="close" style="width: 100%;height: 0.81rem;line-height: 0.81rem;color: #fff;font-size: 0.32rem;position: absolute;bottom: 0;left: 0;text-align: center;box-shadow: 0 0 8px rgba(0,0,0,0.2);"><span style="width: 50%;display: inline-block;background-color: #fff;color: #DCDCDC;position: absolute;bottom: 0;left: 0;" class="disagree">不同意</span><span style="width: 50%;display: inline-block;background-color: #F66E78;position: absolute;bottom: 0;right: 0;" class="agree">同意</span></p></div><div class="alert_bottom" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 7.7rem;"></div></div>';
    $("body").append(html);


    $(".disagree,.alert_top,.alert_bottom").click(function () {
        $(".check").prop({"checked": false});
        $(this).parents(".alert_wrapper1").remove();
    });
    $(".agree").click(function () {
        $(".check").prop({"checked": true});
        $(this).parents(".alert_wrapper1").remove();
    });
}

/**
 * 提交报名
 */
function submit() {

    if (!check()) {
        return;
    }

    if ($('.check').is(':checked')) {
        $(".submit").unbind('click');
        $.ajax({
            url: apiUrl + "/activity/one/addMember",
            data: {
                name: $(".name").val(),
                nationality: $(".nationality").val(),
                ethnicity: $(".ethnicity").val(),
                photo1: $("#selectfiles1").attr('file-url'),
                photo2: $("#selectfiles2").attr('file-url'),
                photo3: $("#selectfiles3").attr('file-url'),
                photo4: $("#selectfiles4").attr('file-url'),
                origin: $(".origin").val(),
                cardNo: $(".cardNo").val(),
                skill: $(".skill").val(),
                height: $(".height").val(),
                weight: $(".weight").val(),
                birthday: $(".birthday").val(),
                gender: isGender(),
                wx: $(".wx").val(),
                mobile: $(".mobile").val(),
                summary: $(".summary").val(),
                education: $(".education").val(),
                company: $(".company").val()
            },
            async: true,
            type: "POST",
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    var html = '<div class="alert_wrapper"><div class="alert_top" style="position: absolute;left: 0;top: 0;width: 100%;height: 25rem;"></div><div class="alert_box"><img src="../img/registration_page/success_icon.png" alt="" class="icon"><p class="title">欢迎参与本次活动</p><p class="txt">您已报名成功，请等待审核</p><p class="close">确定</p></div><div class="alert_bottom" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 7.7rem;"></div></div>';
                    $("body").append(html);
                } else if (data.code == -907) {
                    var html = '<div class="alert_wrapper"><div class="alert_top" style="position: absolute;left: 0;top: 0;width: 100%;height: 25rem;"></div><div class="alert_box"><img src="../img/registration_page/success_icon.png" alt="" class="icon"><p class="title">欢迎参与本次活动</p><p class="txt">无法重复报名，请耐心等待审核...</p><p class="close">确定</p></div><div class="alert_bottom" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 7.7rem;"></div></div>';
                    $("body").append(html);
                } else {
                    var html = '<div class="alert_wrapper"><div class="alert_top" style="position: absolute;left: 0;top: 0;width: 100%;height: 25rem;"></div><div class="alert_box"><img src="../img/registration_page/success_icon.png" alt="" class="icon"><p class="title">欢迎参与本次活动</p><p class="txt">系统异常：' + data.code + '</p><p class="close">确定</p></div><div class="alert_bottom" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 7.7rem;"></div></div>';
                    $("body").append(html);
                }
                $(".close,.alert_top,.alert_bottom").click(function () {
                    $(this).parents(".alert_wrapper").remove();
                });
            },
            complete: function (XMLHttpRequest) {
                $(".submit").click(submit);
            }
        });
    } else {
        alert()
    }
}

/**
 * 表单验证
 * @returns {boolean}
 */
function check() {
    var name = $(".name").val();
    var nationality = $(".nationality").val();
    var ethnicity = $(".ethnicity").val();
    var photo1 = $("#selectfiles1").attr('file-url');
    var photo2 = $("#selectfiles2").attr('file-url');
    var photo3 = $("#selectfiles3").attr('file-url');
    var photo4 = $("#selectfiles4").attr('file-url');
    var origin = $(".origin").val();
    var cardNo = $(".cardNo").val();
    var birthday = $(".birthday").val();
    var skill = $(".skill").val();
    var height = $(".height").val();
    var weight = $(".weight").val();
    var gender = isGender();
    var wx = $(".wx").val();
    var mobile = $(".mobile").val();
    var summary = $(".summary").val();
    var education = $(".education").val();

    if (name == null || name == ''
        || nationality == null || nationality == ''
        || ethnicity == null || ethnicity == ''
        || photo1 == null || photo1 == ''
        || photo2 == null || photo2 == ''
        || photo3 == null || photo3 == ''
        || photo4 == null || photo4 == ''
        || origin == null || origin == ''
        || cardNo == null || cardNo == ''
        || birthday == null || birthday == ''
        || skill == null || skill == ''
        || height == null || height == ''
        || weight == null || weight == ''
        || gender == null || gender == ''
        || wx == null || wx == ''
        || mobile == null || mobile == ''
        || summary == null || summary == ''
        || education == null || education == ''
    ) {
        var html = '<div class="alert_wrapper"><div class="alert_top" style="position: absolute;left: 0;top: 0;width: 100%;height: 25rem;"></div><div class="alert_box"><img src="../img/registration_page/failure_icon.png" alt="" class="icon"><p class="title">资料未完善</p><p class="txt">报名需填写所有内容及照片</p><p class="close">确定</p></div><div class="alert_bottom" style="position: absolute;left: 0;bottom: 0;width: 100%;height: 7.7rem;"></div></div>';
        $("body").append(html);

        $(".close,.alert_top,.alert_bottom").click(function () {
            $(this).parents(".alert_wrapper").remove();
        });
    } else {
        return true;
    }
}


/**
 * 性别判断
 * @returns {string}
 */
function isGender() {
    var list = $('input:radio[name="sex"]:checked').val();
    if (list == "男") {
        ser = "1";
    } else if (list == "女") {
        ser = "0";
    }
    return ser;
}
