
(function() {

    var toUid = GetQueryString("toUid");

    //计算星座
    function getxingzuo(month, day) {
        var d = new Date(1999, month - 1, day, 0, 0, 0);
        var arr = [];
        arr.push(["魔羯座", new Date(1999, 0, 1, 0, 0, 0)]);
        arr.push(["水瓶座", new Date(1999, 0, 20, 0, 0, 0)]);
        arr.push(["双鱼座", new Date(1999, 1, 19, 0, 0, 0)]);
        arr.push(["白羊座", new Date(1999, 2, 21, 0, 0, 0)]);
        arr.push(["金牛座", new Date(1999, 3, 21, 0, 0, 0)]);
        arr.push(["双子座", new Date(1999, 4, 21, 0, 0, 0)]);
        arr.push(["巨蟹座", new Date(1999, 5, 22, 0, 0, 0)]);
        arr.push(["狮子座", new Date(1999, 6, 23, 0, 0, 0)]);
        arr.push(["处女座", new Date(1999, 7, 23, 0, 0, 0)]);
        arr.push(["天秤座", new Date(1999, 8, 23, 0, 0, 0)]);
        arr.push(["天蝎座", new Date(1999, 9, 23, 0, 0, 0)]);
        arr.push(["射手座", new Date(1999, 10, 22, 0, 0, 0)]);
        arr.push(["魔羯座", new Date(1999, 11, 22, 0, 0, 0)]);
        for (var i = arr.length - 1; i >= 0; i--) {
            if (d >= arr[i][1]) return arr[i][0];
        }
    }
    //   判断是否填入公司
    function isCompany(company,companyhtml) {
        if(company == null || company == ""){
            companyhtml = "无"
        }else{
            companyhtml = company
        }
        return companyhtml
    }

    //    判断选手的性别
    function usergerden(gerden, gerdenhtml) {
        var gerdenhtml = '';
        if (gerden == 1) {
            gerdenhtml = '<span class="gerden"><img src="../img/audition_list/boy_icon.png" alt=""></span>'
        } else if (gerden == 0) {
            gerdenhtml = '<span class="gerden"><img src="../img/audition_list/girl_icon.png" alt=""></span>'
        }
        return gerdenhtml;
    }

    //判断是否关注该用户
    function isFollow(follow,followhtml) {
        var followhtml = "";
        if(follow == false){
            followhtml = '<img src="../img/audition/add_attention.png" alt="">';
        }else {
            followhtml = '<img src="../img/audition/follow.png" alt="">';
        }
        return followhtml;
    }

    $.get(apiUrl + "/activity/one/getMember?toUid="+toUid,function (data) {
        var data = data.datas.memberVoList[0];
        console.log(data);
        var stack = $('<li><img src="'+avatarUrl+data.activityOneMember.photo1+'" alt=""/></li> <li><img src="'+avatarUrl+data.activityOneMember.photo2+'" alt=""/></li> <li><img src="'+avatarUrl+data.activityOneMember.photo3+'" alt=""/></li> <li><img src="'+avatarUrl+data.activityOneMember.photo4+'" alt=""/></li>');
        $('.elasticstack').append(stack);

        var personal_data = $('<li class="list_one"> <p class="dataname_box"> <span class="data_name">'+data.activityOneMember.name+'</span> <span class="gender"> ' + usergerden(data.activityOneMember.gender, $(".gender").innerHTML) + '</span> </p> <p class="follow_box"> '+isFollow(data.follow,$(".follow_box").innerHTML)+' </p> </li> <li class="list_three">票数：<span class="information"><span>'+data.activityOneMember.sumPraise+'</span> 票</span> </li> <li class="list_two"> <p class="data_l">身高：<span class="information"><span>'+data.activityOneMember.height+'</span> cm</span> </p> <p class="data_r">体重：<span class="information"><span>'+data.activityOneMember.weight+'</span> kg</span> </p> </li> <li class="list_two"> <p class="data_l">民族：<span class="information">'+data.activityOneMember.ethnicity+'</span> </p> <p class="data_r">星座：<span class="information">'+getxingzuo(data.activityOneMember.birthday.split("-")[1], data.activityOneMember.birthday.split("-")[2])+'</span> </p> </li> <li class="list_three">出生日期：<span class="information">'+data.activityOneMember.birthday+'</span> </li> <li class="list_three">毕业/就读院校：<span class="information">'+data.activityOneMember.education+'</span> </li> <li class="list_three">所属公司：<span class="information">'+isCompany(data.activityOneMember.company,$(".information").innerHTML)+'</span> </li> <li class="list_four"> <p>个人才艺：</p> <p class="information">'+data.activityOneMember.skill+'</p> </li> <li class="list_four"> <p>个人简介：</p> <p class="information"><img src="../img/audition/segmenting_line.png" alt="">'+data.activityOneMember.summary+'</p> </li>');
        $(".personal_data").append(personal_data);
    });

})();


