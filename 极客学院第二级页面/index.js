/**
 * Created by Administrator on 2016/10/11.
 */
//1.创建一个获取样式函数
function getStyle(obj, attr) {
//    1.ie适配
    if (obj.currentStyle) {
        return obj.currentStyle;
    }
//    2.其他浏览器
    else {
        return getComputedStyle(obj, false)[attr];
    }
}
//2.创建一个链式运动的改变样式的函数
//如果要进行同时运动，外部传来的参数是  starMove(object,{"width":200,"height":300},fn),这样才能做同时运动
//遍历json for(var i in  json) i=每个属性值nature，itarget=json[i];
function starMove(object, json, fn) {
//    1,清除定时器
    clearInterval(object.timer);
//    2.开启定时器
    object.timer = setInterval(function () {
        var flag = true; //假设所有值都达到了目标值
        for (var nature in json) {
            //    1.获取当前要改变的样式的当前值；
            var clur = 0;
            if (nature == "opacity") {
                clur = Math.round(parseFloat(getStyle(object, nature)) * 100)
            } else {
                clur = parseInt(getStyle(object, nature));
            }
            //    2.定义改变的速度；
            var speed = 0;
            speed = (json[nature] - clur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //    3.赋值 如果判断 clur == json[nature] 当前值=目标值就停止定时器，如果有一个属性值到达了目标，则定时器定制
            //   所以不能直接判断，应该先判断等所有的属性值完成以后再关闭定时器，所以设置一个状态值
            if (clur !== json[nature]) {
                flag = false; //只要有当前值不等于目标值则flag = false
            }
            if (nature == "opacity") {
                object.style[nature] = (clur + speed) / 100;
            } else if (nature == "display") {
                object.style[nature] = json[nature];
            }
            else {
                object.style[nature] = clur + speed + "px";
            }
        }
        //所有clur !== json[nature]，不执行flag=false 当flag=true，关闭定时器结束
        if (flag) {
            clearInterval(object.timer);
            if (fn) {
                fn();
            }
        }
    }, 30);
}
//点击头部banner消失
var closeIcon = document.getElementsByClassName("close_down")[0];
var bannerTop = document.getElementsByClassName("banner")[0];
closeIcon.onclick = function () {
    bannerTop.style.display = "none";
}
//中间内容部分鼠标移入高度变高，内容出现；
var articelContent = document.getElementsByClassName("article_content")[0];
var articelLi = articelContent.getElementsByTagName("li");
var oTitle = document.getElementsByClassName("title");
var oPersonFa = document.getElementsByClassName("person");
var oClassIcon = document.getElementsByClassName("class_icon");
var oClassLevel = document.getElementsByClassName("class_level");
console.log(oClassLevel[0].parentNode);
for (var i = 0; i < articelLi.length; i++) {
    articelLi[i].index = i;
    articelLi[i].onmouseover = function () {
        var oPcontent = oTitle[this.index].getElementsByTagName("p");
        //外部高度增加
        starMove(oTitle[this.index], {"height": 184});
        //内部高度增加，然后出现，然后变色；
        starMove(oPcontent[0], {"height": 74, "opacity": 100, "display": "block"});
        //有多少人参加课程出现
        starMove(oPersonFa[this.index], {"display": "block"});
        starMove(oClassIcon[this.index], {"bottom": -25});
        starMove(oClassLevel[this.index].parentNode, {"display": "block"});
    }
    articelLi[i].onmouseout = function () {
        var oPcontent = oTitle[this.index].getElementsByTagName("p");
        //外部高度变回去
        starMove(oTitle[this.index], {"height": 88});
        //内部高度增加，然后出现，然后变色；
        starMove(oPcontent[0], {"height": 0, "opacity": 0}, function () {
            starMove(oPcontent[0], {"display": "none"});
        });
        //有多少人参加课程出现
        starMove(oPersonFa[this.index], {"display": "none"});
        starMove(oClassIcon[this.index], {"bottom": -17});
        starMove(oClassLevel[this.index].parentNode, {"display": "none"});
    }
}
//头部导航部分鼠标移入display 然后颜色从0-100
var oNav = document.getElementsByClassName("nav")[0];
var oNavLi = oNav.getElementsByTagName("li");
var oNavContent = document.getElementsByClassName("nav_content");
console.log(oNavContent);
for (var j = 1; j < oNavLi.length; j++) {
    oNavLi[j].index = j - 1;
    oNavLi[j].onmouseover = function () {
        oNavContent[this.index].style.display = "block";
        starMove(oNavContent[this.index], {"opacity": 100,});
    }
    oNavLi[j].onmouseout = function () {
        var Nav = oNavContent[this.index]
        starMove(Nav, {"opacity": 0},function(){
            Nav.style.display = "none";
        });
    }
}
//底部tab切换 变化className
var oTab = document.getElementById("tab");
var oTabLi = oTab.getElementsByTagName("li");
for(var i=2;i< oTabLi.length - 2;i++){
    oTabLi[i].onclick = function(){
        for(var j=0;j<oTabLi.length;j++){
            oTabLi[j].className="";
        }
        this.className="tab_on";
    }
}
//切换中间头部右边两个按钮切换不同样式的内容
var oStyle = document.getElementById("tab_style");
var oStyleLi = oStyle.getElementsByTagName("li");
var oStyleInner = document.getElementsByClassName("inner");
for(var i = 0;i<oStyleLi.length;i++){
    oStyleLi[i].index = i;
    oStyleLi[i].onclick = function(){
        for(var j=0;j< oStyleInner.length;j++ ){
            oStyleInner[j].style.display = "none";
        }
        oStyleInner[this.index].style.display = "block";
    }
}