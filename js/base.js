// code by Dr.Who
// email dot.who@outlook.com

var step = {
    0: [15, 15, 15, 15],
    1: [14, 14, 12, 12],
    2: [10, 10, 10, 8],
    3: [8, 7, 6],
    4: [6, 6],
    5: [4, 4],
    6: [3, 3],
    7: [2],
    8: [2],
    9: [2, 6, 2]
};
var gift = {
    0: ["小熊电热饭盒", "小熊养生壶", "苏泊尔家用电火锅", "美的电热水瓶"],
    1: ["格力香薰加湿器", "摩飞电蒸锅", "苏泊尔电压力锅", "东菱面包机"],
    2: ["Beast头戴式耳机", "希捷2TB移动硬盘", "图美家用投影仪", "佳能照片打印机"],
    3: ["kindle电子书", "都锦生蚕丝被", "OTO脚部按摩器"],
    4: ["BOSE小音响", "飞利浦空气净化器"],
    5: ["iwatch3", "戴森电吹风"],
    6: ["戴森V8吸尘器", "OTO多功能按摩沙发"],
    7: ["IPHONE8P"],
    8: ["MACBOOK AIR"],
    9: ["BOSE音响", "中财大米", "祁门红茶"]
};
var gets = {
    "0": {
        "0": [],
        "1": [],
        "2": [],
        "3": []
    },
    "1": {
        "0": [],
        "1": [],
        "2": [],
        "3": []
    },
    "2": {
        "0": [],
        "1": [],
        "2": [],
        "3": []
    },
    "3": {
        "0": [],
        "1": [],
        "2": []
    },
    "4": {
        "0": [],
        "1": []
    },
    "5": {
        "0": [],
        "1": []
    },
    "6": {
        "0": [],
        "1": []
    },
    "7": {
        "0": []
    },
    "8": {
        "0": []
    },
    "9": {
        "0": [],
        "1": [],
        "2": []
    }
};
var nowIndex = 0;
var nowCtx = 0;

var people = []
var ls = []
var rdnum, sanum;

const getVal = (v, s) => {
    v = v.split('.')
    for (var i = 0; i < v.length; i++) {
        if(typeof v[i] === 'string' && v[i].indexOf('[') > 0){
            const c = v[i].split('[')
            v[i] = c[0]
            c[1] = Number(c[1].toString().substr(0, c[1].length-1))
            v.splice(i+1, 0, c[1]);
        }
    }

    return s ? v.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, s) : o => v.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
}

var tr = $('.hide table tr')
for (var i = 0; i < tr.length; i++) {
    people.push(tr.eq(i).children('td').text())
}

if(("localStorage" in window) && window["localStorage"] != null){
    if(localStorage.getItem("ls") == null){
        for (var k = 0; k < people.length; k++) {
            ls.push(1)
        }
    } else {
        ls = JSON.parse(localStorage.getItem("ls"));
        nowIndex = localStorage.getItem("nowIndex")
        nowCtx = localStorage.getItem("nowCtx")
        gets = JSON.parse(localStorage.getItem("gets"))
        var gfs1 = getVal(nowIndex+'.'+nowCtx, gift);
        if(gfs1){
            $('.gift').children('img').attr('src', 'img/gift/'+nowIndex+''+nowCtx+'.jpg')
            $('.gift').children('p').html(gift[nowIndex][nowCtx])
            $('.btn').children().removeClass('active').eq(nowIndex).addClass('active');
        } else {
            $('#doit').hide()
            $('.btn').children().removeClass('active')
            $('.gift').children('img').hide()
            $('.gift').children('p').hide()
            $('.gift').css({
                'padding': '0',
                'width': '600px',
                'background': 'url(img/2018.png) no-repeat center'
            })
        }
    }
}

function GetRandomNum(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function numFty(){
    do{
        rdnum = GetRandomNum(0,ls.length-1);
    } while(ls[rdnum] == 0);

    sanum = people[rdnum];
    ls[rdnum] = 0;
    localStorage.setItem("ls", JSON.stringify(ls));
    return sanum;
}

var music = document.getElementById('music');

$('#doit').click(function(event) {
    var id = $(this).data('now')
    if(id == '0'){
        $(this).data('now', '1').html('下一轮')
        // var num = step[nowIndex][nowCtx];
        var num = getVal(nowIndex+'.'+nowCtx, step);
        if(num){
            music.play();
            $('.gift').hide();
            $('.namefor').html('')
            for (var i = 0; i < num; i++) {
                var nameh = numFty()
                $('.namefor').append('<span>'+nameh+'</span>')
                gets[nowIndex][nowCtx].push(nameh)
            }
            $('#redoit').data('nowIndex', nowIndex).data('nowCtx', nowCtx)
            nowCtx++;
            if(nowCtx >= step[nowIndex].length){
                nowIndex++;
                nowCtx = 0;
            }
            localStorage.setItem("nowIndex", nowIndex)
            localStorage.setItem("nowCtx", nowCtx)
            localStorage.setItem("gets", JSON.stringify(gets))

            $('#redoit').removeClass('hide')
        } else {
            alert('抽奖结束，新年快乐！')
        }
    } else {
        music.pause();
        $('.namefor').html('')
        $('.gift').show()
        var gfs = getVal(nowIndex+'.'+nowCtx, gift);
        if(gfs){
            $('#redoit').addClass('hide')
            $(this).data('now', '0').html('开始抽奖')
            $('.btn').children().removeClass('active').eq(nowIndex).addClass('active');
            $('.gift').children('img').attr('src', 'img/gift/'+nowIndex+''+nowCtx+'.jpg')
            $('.gift').children('p').html(gift[nowIndex][nowCtx])
        } else {
            $('#doit').hide()
            $('#redoit').addClass('hide')
            $('.gift').children('img').hide()
            $('.gift').children('p').hide()
            $('.gift').css({
                'padding': '0',
                'width': '600px',
                'background': 'url(img/2018.png) no-repeat center'
            })
        }
    }
});

$('#redoit').click(function(event) {
    $('.cclist').removeClass('hide')
});

$('.cccanel').click(function(event) {
    $('#ccnum').val('')
    $('.cclist').addClass('hide')
});

$('.ccyes').click(function(event) {
    var vvl = $('#ccnum').val();
    if(vvl.length > 0 && vvl > 0 && vvl < 16){
        var index = $('#redoit').data('nowIndex')
        var ctx = $('#redoit').data('nowCtx')
        $('.namefor').html('')
        for (var i = 0; i < vvl; i++) {
            var nameh = numFty()
            $('.namefor').append('<span>'+nameh+'</span>')
            gets[index][ctx].push(nameh)
        }
        localStorage.setItem("gets", JSON.stringify(gets))
        $('.cclist').addClass('hide')
        $('#ccnum').val('')
    } else {
        $('#ccnum').val('')
        alert('请输入重抽人数，数字1-15之间')
    }
});

$('.zjmd').click(function(event) {
    var xcv = $('.hjlist-div')
    xcv.html('')
    $('.hjlist').removeClass('hide')
    for (var gs in gets) {
        if (gets.hasOwnProperty(gs)) {
            xcv.append('<h4>'+ $('.btn').children().eq(gs).text() +'</h4>')
            var xb = gets[gs]
            for (var x in xb) {
                if (xb.hasOwnProperty(x)) {
                    xcv.append(`
                        <div class="lsm clearfix">
                            <div class="ls-lt">
                                第${parseInt(x)+1}轮
                            </div>
                            <div class="ls-rt">
                                ${xb[x]}
                            </div>
                        </div>
                    `)
                }
            }
        }
    }
});

$('.close').click(function(event) {
    $('.hjlist').addClass('hide')
});

$('.reset').click(function(event) {
    if(confirm('是否重置？')){
        localStorage.removeItem("ls")
        localStorage.removeItem("nowIndex")
        localStorage.removeItem("nowCtx")
        localStorage.removeItem("gets")
        window.location.reload();
    }
});
