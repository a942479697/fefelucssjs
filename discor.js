var mobile = false;
var ua = navigator.userAgent.toLowerCase();
if (/android/i.test(ua)) {
    mobile = true;
}
if (/ipad|iphone|ipod/.test(ua) && !window.MSStream) {
    mobile = true;
}
var hash = { '32': '\u3000' };

// 半角转全角
function sbc2dbc(str) {
    var ret = [],
        i = 0,
        len = str.length,
        code, chr;
    for (; i < len; ++i) {
        code = str.charCodeAt(i);
        chr = hash[code];
        if (!chr && code > 31 && code < 127) {
            chr = hash[code] = String.fromCharCode(code + 65248);
        }
        ret[i] = chr ? chr : str.charAt(i);
    }
    return ret.join('');
}

var hostname;
var hostname2;
var hostnametxt;
var lf = window.location.host.toLowerCase().split(".");
hostname2 = sbc2dbc(window.location.host.toUpperCase());
if (lf.length > 1) {
    hostname = lf[lf.length - 2] + "." + lf[lf.length - 1]
    hostnametxt = "www." + hostname.substring(0, 3) + hostname.substring(3, hostname.length);
    document.title = document.title + hostname2;
    if (document.getElementById("WebUrl")) {
        document.getElementById("WebUrl").innerHTML = hostname2;
    }
    if (document.getElementById("logo")) {
        document.getElementById("logo").innerHTML = hostnametxt;
    }
}
window.status = hostname2;

//  栏目下的广告
function createHeaderAd(pageFlag) { //0是广告比较多的情况, 1是广告比较少的情况
    var div = document.createElement("div");
    if (pageFlag == 0) { //广告比较多
        var temp = neiyehengfu
        div.innerHTML = '<ul>';
        for (var i = 0; i < temp.length; i++) {
            div.innerHTML += '<li style="list-style: none;">' +
                '<a href="' + temp[i].url + '" target="_blank"><img src="' + temp[i].img + '" ></a>' +

                '</li>';
        }
        div.innerHTML += '</ul>'
    } else if (pageFlag == 1) { //广告比较少
        var temp = shouyehengfu;
        for (var i = 0; i < temp.length; i++) {
            div.innerHTML += '<a href="' + temp[i].url + '" target="_blank"><img src="' + temp[i].img + '" ></a>' +
                '<br>';
        }
    }
    document.getElementById("photo-header-title-content-text-dallor").appendChild(div);
    $(".lazy").lazyload({
        effect: "show"
    });
}

//内容处的广告
function createContentAd(flag) { //0 content上面的广告 1 content下面的广告  2 both
    if (flag == 0 || flag == 2) {
        var temp = neironghengfu;
        var div = document.createElement("div");
        div.innerHTML = '<div id="photo-content-title-text-main">' +
            '<div class="photo-content-title-bottomx1">' +
            '<a href="' + neirongdatu[0].url + '" target="_blank">' +
            '<img src="' + neirongdatu[0].img + '">' +
            '</a>' +
            '</div>' +
            '<div class="photo-help">' +
            '<a href="/help/help.html">' +
            '<div class="left">无法观看说明</div>' +
            '</a>' +
            '<a onclick = "configFav()">' +
            '<div class="right">永久收藏本站</div>' +
            '</a>' +
            '</div>' +
            '<div class="photo-content-title-bottomx">' +
            '<a href="' + temp[0].url + '" target="_blank">' +
            '<img src="' + temp[0].img + '" />' +
            '</a>' +
            '</div>' +
            '</div>';
        document.getElementById("photo-content-title-text-main").appendChild(div);
    }
    if (flag == 1 || flag == 2) {
        var div1 = document.createElement("div");
        div1.innerHTML = '<div class="photo-content-title-bottomx">' +
            '<a target="_blank" href="' + temp[1].url + '"><img src="' + temp[1].img + '"></a>' +
            '</div>' +
            '<div class="photo-help">' +
            '<a href="/help/help.html">' +
            '<div class="left">无法观看说明</div>' +
            '</a>' +
            '<a onclick = "configFav()">' +
            '<div class="right">永久收藏本站</div>' +
            '</a>' +
            '</div>' +
            '<div class="photo-content-title-bottomx">' +
            '<a href="' + temp[2].url + '" target="_blank"><img src="' + temp[2].img + '"></a>' +
            '</div>'
        document.getElementById("photo-content-title-text-main-foot").appendChild(div1);
    }
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//小说列表除广告
function createListTextAd() {
    var tpl = '';
    var color = '';
    if (xiaoshuowenzi.length) {
        for (var i in xiaoshuowenzi) {
            if (i == 0) {
                color = '#0000FF'
            } else {
                color = '#FF0000'
            }
            tpl += '<li><a href="' + xiaoshuowenzi[i].url + '" target="_blank"><span>' + getNowFormatDate() + '</span><font color="' + color + '">' + xiaoshuowenzi[i].name + '</font></a></li>';
        }
        $('.list-text-my ul').prepend(tpl)
    }
}


//对联广告 
function createFloatAd() {
    var float_s;
    var device_left = 5;
    try {
        float_s = new StayPosition(0.2);
    } catch (e) {
        console.log(e)
    }
    let float_top_position = 5;
    let float_middle_position = 260;
    let float_bottom_position = 0;
    if (mobile) {
        float_top_position = window.innerHeight/4;
        float_middle_position = window.innerHeight/2;
        float_bottom_position = window.innerHeight-140;
        // float_bottom_position -= 50;
        device_left = 0;
    } else {
        float_bottom_position = document.body.clientHeight || document.documentElement.clientHeight;
        float_bottom_position -= 240;
    }

    var dataFloat = [];
    if(zuoyoupiaofu==null || zuoyoupiaofu.length==0) return;
    var float_title_header_data = zuoyoupiaofu;

    var lc_s = '';
    lc_s += '<div class="close_discor" id="left_couple"  style="z-index:9; position:absolute;top:'+float_top_position+'px;left:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[0].url + '" target="_blank">' +
        '<img src="' + float_title_header_data[0].img + '" border="0" class="float-content-title-left-up"></a>' +
        '<div  style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closeLC();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(lc_s);
    dataFloat.push({ dom: document.getElementById("left_couple"), reheight: float_top_position })
    try {
        float_s.add(document.getElementById("left_couple"), "top", float_top_position);
    } catch (e) {
        console.log(e.message)
    }

    var rc_s = '';
    rc_s += '<div class="close_discor" id="right_couple" style="z-index:9; position:absolute;top:'+float_top_position+'px;right:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[1].url + '" target="_blank"><img src="' + float_title_header_data[1].img + '" border="0" class="float-content-title-right-up" ></a>' +
        '<div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closeRC();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(rc_s);
    dataFloat.push({ dom: document.getElementById("right_couple"), reheight: float_top_position });
    try {
        float_s.add(document.getElementById("right_couple"), "top", float_top_position);
    } catch (e) {
        console.log(e.message)
    }

    var lc_s = '';
    lc_s += '<div class="close_discor" id="left_couplet" style="z-index:9; position:absolute;top:'+float_middle_position+'px;left:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[2].url + '" target="_blank">' +
        '<img src="' + float_title_header_data[2].img + '" border="0" class="float-content-title-left-center" ></a>' +
        '<div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closecoupletL();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(lc_s);
    dataFloat.push({ dom: document.getElementById("left_couplet"), reheight: float_middle_position });
    try {
        float_s.add(document.getElementById("left_couplet"), "top", float_middle_position);
    } catch (e) {
        console.log(e.message)
    }

    var rc_s = '';
    rc_s += '<div class="close_discor" id="right_couplet" style="z-index:9; position:absolute;top:'+float_middle_position+'px;right:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[3].url + '" target="_blank"><img src="' + float_title_header_data[3].img + '" border="0" class="float-content-title-right-center" ></a>' +
        '<div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closecoupletR();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(rc_s);
    dataFloat.push({ dom: document.getElementById("right_couplet"), reheight: float_middle_position });
    try {
        float_s.add(document.getElementById("right_couplet"), "top", float_middle_position);
    } catch (e) {
        console.log(e.message)
    }

    var lf_s = '';
    lf_s += '<div class="close_discor" id="left_float" style="z-index:9; position:absolute;top:' + float_bottom_position + 'px;left:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[4].url + '" target="_blank"><img src="' + float_title_header_data[4].img + '" border="0" class="float-content-title-left-down" ></a>' +
        '<div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closeLF();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(lf_s);
    dataFloat.push({ dom: document.getElementById("left_float"), reheight: float_bottom_position });
    try {
        float_s.add(document.getElementById("left_float"), "top", float_bottom_position);
    } catch (e) {
        console.log(e.message)
    }

    var rf_s = '';
    rf_s += '<div class="close_discor" id="right_float" style="z-index:9; position:absolute;top:' + float_bottom_position + 'px;right:' + device_left + 'px;">' +
        '<a href="' + float_title_header_data[5].url + '" target="_blank"><img src="' + float_title_header_data[5].img + '" border="0" class="float-content-title-right-down"></a>' +
        '<div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">' +
        '<a href="javascript:closeRF();" style="color:white;text-decoration:none;">×</a></div></div>';
    document.writeln(rf_s);
    dataFloat.push({ dom: document.getElementById("right_float"), reheight: float_bottom_position });
    var tempOffset = document.getElementById("main-container").offsetTop;
    var end = document.body.scrollTop;
    try {
        float_s.add(document.getElementById("right_float"), "top", float_bottom_position);
        float_s.start();
    } catch (e) {
        var div = document.body;
        //touchstart类似mousedown
        div.ontouchstart = function(e) {}.bind(this);
        //touchmove类似mousemove
        div.ontouchmove = function(e) {
            end = document.body.scrollTop;
            for (var i = 0; i < dataFloat.length; i++) {
                var aa = tempOffset + dataFloat[i].reheight;
                if (end != dataFloat[i].dom.offsetTop) {
                    var domOffSetTop = dataFloat[i].dom.offsetTop;
                    if (domOffSetTop > end - 510 + tempOffset + dataFloat[i].reheight) {
                        moveTop(dataFloat[i].dom, dataFloat[i].dom.offsetTop, end - 510 + tempOffset + dataFloat[i].reheight, -3);
                    } else {
                        moveTop(dataFloat[i].dom, dataFloat[i].dom.offsetTop, end - 510 + tempOffset + dataFloat[i].reheight, 3);
                    }

                }
            }
        }.bind(this);
        // touchend类似mouseup
        div.ontouchend = function(e) {
            for (var i = 0; i < dataFloat.length; i++) {
                var aa = tempOffset + dataFloat[i].reheight;
                if (end != dataFloat[i].dom.offsetTop) {
                    var domOffSetTop = dataFloat[i].dom.offsetTop;
                    if (domOffSetTop > end - 510 + tempOffset + dataFloat[i].reheight) {
                        moveTop(dataFloat[i].dom, dataFloat[i].dom.offsetTop, end - 510 + tempOffset + dataFloat[i].reheight, -3);
                    } else {
                        moveTop(dataFloat[i].dom, dataFloat[i].dom.offsetTop, end - 510 + tempOffset + dataFloat[i].reheight, 3);
                    }
                }
            }
        }.bind(this);
    }
}


function moveTop(dom, start, end, temp) {

    if (start * temp < end * temp) {
        dom.style['top'] = start + temp + 'px';
        setTimeout(function() {}, 11);
        moveTop(dom, start + temp, end, temp);
    }
}


// createFloatAd();
$(document).on("click touchstart", ".selector-ios-click", function(e) {
    $(this).parent().hide()
    var ovent = e || event;
    ovent.stopPropagation();
    ovent.preventDefault();

})

//底部的广告
function createFootAd() {
    var div = document.createElement("div");
    if(neiyedibu==null || neiyedibu.length==0) return;
    var bottom_comm = neiyedibu;
    var bottom_comm_4= bottom_comm[4].url==""?"": '<a href="' + bottom_comm[4].url + '" target="_blank"><img src="' + bottom_comm[4].img + '" border="0"></a>';
    var bottom_comm_5= bottom_comm[5].url==""?"": '<a href="' + bottom_comm[5].url + '" target="_blank"><img src="' + bottom_comm[5].img + '" border="0"></a>';
    var bottom_comm_0= bottom_comm[0].url==""?"": '<li><a href="' + bottom_comm[0].url + '" target="_blank"><img src="' + bottom_comm[0].img + '" border="0"></a></li>' ;
    var bottom_comm_1= bottom_comm[1].url==""?"": '<li><a href="' + bottom_comm[1].url + '" target="_blank"><img src="' + bottom_comm[1].img + '" border="0"></a></li>' ;
    var bottom_comm_2= bottom_comm[2].url==""?"": '<li><a href="' + bottom_comm[2].url + '" target="_blank"><img src="' + bottom_comm[2].img + '" border="0"></a></li>' ;
    var bottom_comm_3= bottom_comm[3].url==""?"": '<li><a href="' + bottom_comm[3].url + '" target="_blank"><img src="' + bottom_comm[3].img + '" border="0"></a></li>' ;

    div.innerHTML =
        '<div class="footer-content-title-dallor-uptwo-img">' +bottom_comm_4+bottom_comm_5+
        '</div>' +
        '<ul class="bottom-content-title-bottom-container">' +
        bottom_comm_0+bottom_comm_1+bottom_comm_2+bottom_comm_3+
        '</ul>';

    document.getElementById("photo--content-title-bottomx--foot").appendChild(div);
    // var height = $('.footer-content-title-dallor-uptwo-img img').width() / 4.5;
    // $('.photo--content-title-bottomx--foot .bottom-content-title-bottom-container img').css('height', height + 'px')
}

function camLink() {
    window.open(cam_url);
}

function createDetailAd() {
    var tpl = '';
    for (var i in dainyingwenzi) {
        tpl += '<div class="row"><p>推薦：<a href="' + dainyingwenzi[i].url + '"><span class="c_red">' + dainyingwenzi[i].name + '</span></a></p></div>'
    }
    $('.pull-left-mobile2').append(tpl);
}

//电影详情处的内容广告
function createMovieDetailAd() {
    if(dianyingfangkuai==null || dianyingfangkuai.length==0) return;
    var middle_square = dianyingfangkuai;
    var div = document.createElement("div");
    div.innerHTML = '<div class="pull-right">' +
        '<div class="row">' +
        '<a href="' + middle_square[0].url + '">' +
        '<img src="' + middle_square[0].img + '">' +
        '</a>' +
        '</div>' +
        '</div>';
    document.getElementById("shipin-detail-content-pull").appendChild(div);
}

function closeLC() {
    document.getElementById("left_couple").style.display = "none";
}

function closeRC() {
    document.getElementById("right_couple").style.display = "none";
}

function closecoupletL() {
    document.getElementById("left_couplet").style.display = "none";
}

function closecoupletR() {
    document.getElementById("right_couplet").style.display = "none";
}

function closeLF() {
    document.getElementById("left_float").style.display = "none";
}

function closeRF() {
    document.getElementById("right_float").style.display = "none";
}

function createTotop() {
    var toTop_s = '<div  class="scroll-mian" id="scroll-mian">' +
        '<ul  class="scroll-content">' +
        '<li  class="scroll-list"  >' +
        '<a  class="scroll-item" title="回到顶部" href="javascript:doScroll1()" target="_self">' +
        '<i  class="icon icon_arrow_up"></i></a>' +
        '</li>' +
        '</ul>' +
        '</div>'
    document.writeln(toTop_s);
}
createTotop();

window.onscroll = function() {
    setShowScoll();
}

function totop(i) {
    if (i <= 0) {
        return
    } else {
        window.scroll(0, i);
        setTimeout(function() {
            totop(i - 40)
        }, 1)

    }
}

function doScroll1() {
    let scrollTop1 = document.body.scrollTop || document.documentElement.scrollTop;
    totop(scrollTop1);
}

function setShowScoll() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let clientHeight = 800;
    if (scrollTop >= clientHeight) {
        $(".scroll-mian").show();
    } else {
        $(".scroll-mian").hide()
    }
}

function setJingCai() {
    var jingcai = jingcaineirong;
    var ul_content = "";
    for (var i = 0; i < jingcai.length; i++) {
        ul_content += ' <li class="item"><a href="' + jingcai[i].url + '" target="_blank">' + jingcai[i].name + '</a></li>'
    }
    $('#section-menu-jingcai').append(ul_content);
}

function goBtt() {
    window.open(entertiao[0].url);
}