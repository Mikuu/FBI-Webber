/*! layPage-v1.3.0 分页组件 License MIT  http://laypage.layui.com/ By 贤心 */
!function () {
    function h(b) {
        var a = "laypagecss";
        h.dir = "dir" in h ? h.dir : i.getpath + "../css/laypage.css", new i(b), h.dir && !g[l](a) && i.use(h.dir, a)
    }

    h.v = "1.3";
    var g = document, l = "getElementById", k = "getElementsByTagName", j = 0, i = function (e) {
        var d = this, f = d.config = e || {};
        f.item = j++, d.render(!0)
    };
    i.on = function (e, d, f) {
        return e.attachEvent ? e.attachEvent("on" + d, function () {
            f.call(e, window.even)
        }) : e.addEventListener(d, f, !1), i
    }, i.getpath = function () {
        var d = document.scripts, c = d[d.length - 1].src;
        return c.substring(0, c.lastIndexOf("/") + 1)
    }(), i.use = function (d, b) {
        var a = g.createElement("link");
        a.type = "text/css", a.rel = "stylesheet", a.href = h.dir, b && (a.id = b), g[k]("head")[0].appendChild(a), a = null
    }, i.prototype.type = function () {
        var b = this.config;
        return "object" == typeof b.cont ? void 0 === b.cont.length ? 2 : 3 : void 0
    }, i.prototype.view = function () {
        var a = this, n = a.config, m = [], f = {};
        if (n.pages = 0 | n.pages, n.curr = 0 | n.curr || 1, n.groups = "groups" in n ? 0 | n.groups : 5, n.first = "first" in n ? n.first : "&#x9996;&#x9875;", n.last = "last" in n ? n.last : "&#x5C3E;&#x9875;", n.prev = "prev" in n ? n.prev : "&#x4E0A;&#x4E00;&#x9875;", n.next = "next" in n ? n.next : "&#x4E0B;&#x4E00;&#x9875;", n.pages <= 1) {
            return ""
        }
        for (n.groups > n.pages && (n.groups = n.pages), f.index = Math.ceil((n.curr + (n.groups > 1 && n.groups !== n.pages ? 1 : 0)) / (0 === n.groups ? 1 : n.groups)), n.curr > 1 && n.prev && m.push('<a href="javascript:;" class="laypage_prev" data-page="' + (n.curr - 1) + '">' + n.prev + "</a>"), f.index > 1 && n.first && 0 !== n.groups && m.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + n.first + "</a><span>&#x2026;</span>"), f.poor = Math.floor((n.groups - 1) / 2), f.start = f.index > 1 ? n.curr - f.poor : 1, f.end = f.index > 1 ? function () {
            var b = n.curr + (n.groups - f.poor - 1);
            return b > n.pages ? n.pages : b
        }() : n.groups, f.end - f.start < n.groups - 1 && (f.start = f.end - n.groups + 1); f.start <= f.end; f.start++) {
            f.start === n.curr ? m.push('<span class="laypage_curr" ' + (/^#/.test(n.skin) ? 'style="background-color:' + n.skin + '"' : "") + ">" + f.start + "</span>") : m.push('<a href="javascript:;" data-page="' + f.start + '">' + f.start + "</a>")
        }
        return n.pages > n.groups && f.end < n.pages && n.last && 0 !== n.groups && m.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="' + n.pages + '">' + n.last + "</a>"), f.flow = !n.prev && 0 === n.groups, (n.curr !== n.pages && n.next || f.flow) && m.push(function () {
            return f.flow && n.curr === n.pages ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + n.next + "</span>" : '<a href="javascript:;" class="laypage_next" data-page="' + (n.curr + 1) + '">' + n.next + "</a>"
        }()), '<div name="laypage' + h.v + '" class="laypage_main laypageskin_' + (n.skin ? function (b) {
            return /^#/.test(b) ? "molv" : b
        }(n.skin) : "default") + '" id="laypage_' + a.config.item + '">' + m.join("") + function () {
            return n.skip ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="text" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label><button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>' : ""
        }() + "</div>"
    }, i.prototype.jump = function (f) {
        if (f) {
            for (var d = this, r = d.config, q = f.children, p = f[k]("button")[0], o = f[k]("input")[0], n = 0, m = q.length; m > n; n++) {
                "a" === q[n].nodeName.toLowerCase() && i.on(q[n], "click", function () {
                    var b = 0 | this.getAttribute("data-page");
                    r.curr = b, d.render()
                })
            }
            p && i.on(p, "click", function () {
                var b = 0 | o.value.replace(/\s|\D/g, "");
                b && b <= r.pages && (r.curr = b, d.render())
            })
        }
    }, i.prototype.render = function (b) {
        var o = this, n = o.config, m = o.type(), c = o.view();
        2 === m ? n.cont.innerHTML = c : 3 === m ? n.cont.html(c) : g[l](n.cont).innerHTML = c, n.jump && n.jump(n, b), o.jump(g[l]("laypage_" + n.item)), n.hash && !b && (location.hash = "!" + n.hash + "=" + n.curr)
    }, "function" == typeof define ? define(function () {
        return h
    }) : "undefined" != typeof exports ? module.exports = h : window.laypage = h
}();
var pageSize = 10;
var changeIndexLeft = 1;
var changeIndexRight = 1;
var dataAllInfo;
var fadeTime = 1000;
var Stimeout = 5000;

function render() {
    $("#dataleft").hide();
    $("#dataright").hide();
    var g = dataAllInfo;
    var d = g.left;
    var n = g.right;
    var b = "";
    var l = "";
    if (d && d.length > 0) {
        var a = d.slice(pageSize * (changeIndexLeft - 1), Math.min(pageSize * (changeIndexLeft), d.length));
        for (var h = 0; h < a.length; h++) {
            var f = a[h];
            b += '<li><div class="list-info-name">' + f.passenger_name + '</div><div class="list-info-num">' + f.passenger_id_no + "</div></li>"
        }
    }
    if (n && n.length > 0) {
        var j = n.slice(pageSize * (changeIndexRight - 1), Math.min(pageSize * (changeIndexRight), n.length));
        for (var h = 0; h < j.length; h++) {
            var f = j[h];
            l += '<li><div class="list-info-name">' + f.passenger_name + '</div><div class="list-info-num">' + f.passenger_id_no + "</div></li>"
        }
    }
    if (b) {
        $("#empty_left").hide();
        $("#dataleft").html(b);
        $("#dataleft").fadeIn(fadeTime)
    } else {
        $("#empty_left").show()
    }
    if (l) {
        $("#empty_right").hide();
        $("#dataright").html(l);
        $("#dataright").fadeIn(fadeTime)
    } else {
        $("#empty_right").show()
    }
    var m = d.length;
    var k = n.length;
    var e = m % pageSize == 0 ? m / pageSize : Math.ceil(m / pageSize);
    var c = k % pageSize == 0 ? k / pageSize : Math.ceil(k / pageSize);
    if (changeIndexLeft == e) {
        changeIndexLeft = 1
    } else {
        changeIndexLeft++
    }
    if (changeIndexRight == c) {
        changeIndexRight = 1
    } else {
        changeIndexRight++
    }
}

(function (b) {
    b(document).ready(function () {
        a.bind();
        a.queryAll()
    });
    var a = {
        bind: function () {
            b("#search").click(function () {
                var d = b("#input_name").val();
                var c = b("#input_id_no").val();
                if (!d) {
                    b("#input_name").css("border-color", "red");
                    return
                }
                if (!c) {
                    b("#input_id_no").css("border-color", "red");
                    return
                }
                a.queryOne()
            });
            b("#input_name").keyup(function () {
                b("#input_name").css("border-color", "")
            });
            b("#input_id_no").keyup(function () {
                b("#input_id_no").css("border-color", "")
            })
        }, queryOne: function () {
            var e = b("#input_name").val();
            var c = b("#input_id_no").val();
            var d = dhtmlx.modalbox({targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>'});
            b.ajax({
                type: "POST",
                url: ctx + "queryDishonest/getOne",
                data: {passenger_name: e, passenger_id_no: c},
                timeout: 10000,
                error: function (f, h, g) {
                    dhtmlx.modalbox.hide(d)
                },
                success: function (f) {
                    dhtmlx.modalbox.hide(d);
                    var g = f.data;
                    if (g) {
                        a.renderOne(g, 1)
                    } else {
                        dhtmlx.alert({title: "提示", ok: "确定", text: "查询失败", type: "alert-error"})
                    }
                }
            })
        }, queryAll: function () {
            var c = dhtmlx.modalbox({targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>'});
            b.ajax({
                type: "GET",
                url: ctx + "queryDishonest/query",
                data: {},
                timeout: 10000,
                error: function (d, f, e) {
                    dhtmlx.modalbox.hide(c)
                },
                success: function (d) {
                    dhtmlx.modalbox.hide(c);
                    var e = d.data;
                    if (e) {
                        dataAllInfo = e;
                        render();
                        window.setInterval("render()", Stimeout)
                    } else {
                        dhtmlx.alert({title: "提示", ok: "确定", text: "查询失败", type: "alert-error"})
                    }
                }
            })
        }, dateFormat: function (d) {
            var c = d;
            if (c && c.length == 8) {
                c = d.substring(0, 4) + "-" + d.substring(4, 6) + "-" + d.substring(6, 8)
            }
            return c
        }, renderOne: function (j, n) {
            if (!j || j.length == 0) {
                dhtmlx.alert({title: "提示", ok: "确定", text: "没有找到相关数据！", type: "alert-error"});
                a.showWhichOne(1);
                return
            }
            b("#result_name").html("“" + b("#input_name").val() + "”");
            var p = j.length;
            var l = p % pageSize == 0 ? p / pageSize : Math.ceil(p / pageSize);
            var f = j.slice(pageSize * (n - 1), Math.min(pageSize * (n), j.length));
            var g = '<tr><th width="60">类别</th><th width="120">失信人姓名</th><th width="160">证件号码</th><th width="120">限制起始时间</th><th>原因</th></tr>';
            for (var k = 0; k < f.length; k++) {
                var h = f[k];
                var d = h.check_flag == 1 ? "公示中" : "限制中";
                var o = h.passenger_name;
                var m = h.start_date;
                var e = h.passenger_id_no;
                var c = h.flag2;
                g += "<tr><td>" + d + "</td><td>" + o + "</td><td>" + e + "</td><td>" + a.dateFormat(m) + "</td><td>" + c + "</td></tr>"
            }
            b("#searchTable").html(g);
            a.showWhichOne(2);
            laypage({
                cont: "page-right",
                pages: l,
                curr: n,
                first: 1,
                last: l,
                skin: "#1A9EFE",
                skip: true,
                groups: 9,
                jump: function (i, q) {
                    if (!q) {
                        a.renderOne(j, i.curr)
                    }
                }
            })
        }, showWhichOne: function (c) {
            b("#div1").hide();
            b("#div2").hide();
            if (c == 1) {
                b("#div1").show()
            } else {
                b("#div2").show()
            }
        }
    }
})(jQuery);
