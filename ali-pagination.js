var globalImgServer = "http://style.alibaba.com";
location.protocol === "https:" && (globalImgServer = "https://ipaystyle.alibaba.com");
(function() {
    function e() {
        var e = this,
            t = {
                targetId: "clickShowTargetId",
                switchId: "",
                contentId: "clickShowContentId",
                bodyClickClose: !0,
                showOrHidden: !0,
                needMask: !1,
                needXY: !0,
                excursion: [0, 0],
                closeBtnsClassName: "",
                maskIframeClassName: "maskIframe",
                iframeMaskSrc: globalImgServer + "/js/blank.html",
                hide: !1,
                onInit: function() {},
                unInit: function() {},
                onShow: function() {},
                unShow: function() {},
                onHidden: function() {},
                unHidden: function() {}
            },
            n, r = !1,
            i, s, o, u, a, f = !0;
        e.init = function(l) {
            if (r) return !1;
            n = l || {}, e.config = n, YAHOO.lang.augmentObject(l, t), n.onInit.apply(e), i = get(n.targetId), s = get(n.contentId), o = n.switchId == "" ? i : get(n.switchId), a = n.closeBtnsClassName == "" ? [] : YUD.getElementsByClassName(n.closeBtnsClassName, "*", s);
            if (!o) return;
            YUE.on(i, "click", e.showDirectly), n.bodyClickClose && YUE.on(document.body, "click", e.hiddenDirectly), a && YUE.on(a, "click", e.dCloseBtnsClick = function() {
                e.hiddenDirectly(null, !0)
            }), YUE.on(o, "mouseover", e.dSwitchMouseover = function() {
                f = !1
            }), YUE.on(s, "mouseover", e.dContentMouseover = function() {
                f = !1
            }), YUE.on(o, "mouseout", e.dSwitchMouseout = function() {
                f = !0
            }), YUE.on(s, "mouseout", e.dContentMouseout = function() {
                f = !0
            });
            if (n.needMask) {
                u = document.createElement("iframe"), u.className = n.maskIframeClassName, u.style.display = "none";
                var c = 0;
                isNaN(YUD.getStyle(s, "zIndex")) || (c = YUD.getStyle(s, "zIndex")), u.style.zIndex = c - 1, u.style.top = "0px", u.style.left = "0px", YAHOO.env.ua.ie === 6 && location.protocol == "https:" && (u.src = n.iframeMaskSrc), u.frameBorder = 0, s.parentNode.appendChild(u)
            }
            return n.unInit.apply(e), e.afterHidden = new YAHOO.util.CustomEvent("afterHidden", e), e
        }, e.dispose = function() {
            YUE.removeListener(document.body, "click", e.hiddenDirectly), YUE.removeListener(i, "click", e.showDirectly), YUE.removeListener(a, "click", e.dCloseBtnsClick), YUE.removeListener(o, "mouseover", e.dSwitchMouseover), YUE.removeListener(s, "mouseover", e.dContentMouseover), YUE.removeListener(o, "mouseout", e.dSwitchMouseout), YUE.removeListener(s, "mouseout", e.dContentMouseout), n.needMask && s.parentNode.removeChild(u)
        }, e.showDirectly = function() {
            if (n.hide) return !1;
            n.onShow.apply(e);
            if (n.showOrHidden && s.style.display != "none" && YUD.getStyle(s, "visibility") != "hidden") {
                f = !1, e.hiddenDirectly(null, !0);
                return
            }
            var t = [];
            n.needXY ? (t = YUD.getXY(i), s.style.visibility = "hidden", s.style.display = "", l(n.excursion), t[0] += n.excursion[0], t[1] += n.excursion[1], s.style.visibility = "visible", YUD.setXY(s, t)) : s.style.display = "", n.needMask && (u.style.display = "", u.style.width = s.offsetWidth + "px", u.style.height = s.offsetHeight + "px", n.needXY && YUD.setXY(u, t), u.style.visibility = "visible"), n.unShow.apply(e)
        }, e.hiddenDirectly = function(t, r) {
            if (s.style.display == "none") return;
            n.onHidden.apply(e);
            if (f || r) e.afterHidden && e.afterHidden.fire(), s.style.display = "none", n.needMask && (u.style.display = "none"), n.unHidden.apply(e)
        }, e.getConfig = function() {
            return n
        };
        var l = function(e) {
            if (typeof e[0] == "string") switch (e[0]) {
                case "center":
                    e[0] = parseInt(i.offsetWidth / 2, 10);
                    break;
                case "right":
                    e[0] = o.offsetWidth - s.offsetWidth;
                    break;
                default:
                    e[0] = 0
            }
            if (typeof e[1] == "string") switch (e[1]) {
                case "center":
                    e[1] = paseInt(i.offsetHeight / 2);
                    break;
                case "bottom":
                    e[1] = i.offsetHeight;
                    break;
                default:
                    e[1] = 0
            }
            return e
        }
    }
    AE.namespace("widget").clickShow = e
})();
(function() {
    function e() {
        this.config = {
            proxy: globalImgServer + "/static/ajax_proxy.html?iframe_delete=true",
            domain: "alibaba.com"
        }, this.temp = {
            ajaxForm: null
        }, this.setForm = function(e) {
            this.temp.ajaxForm = e
        }, this.asyncRequest = function(e, t, n, r, i) {
            var s = this;
            s.config = YL.merge(s.config, i || {});
            var o = s.config;
            try {
                document.domain = o.domain
            } catch (u) {}
            var a = document.createElement("iframe");
            YUE.on(a, "load", function() {
                var i = n.success;
                n.success = function(e) {
                    i(e)
                }, s.temp.ajaxForm && this.contentWindow.setForm(s.temp.ajaxForm), this.contentWindow.sendRequest(e, t, n, r)
            });
            var f = "";
            if (o.proxy.indexOf("iframe_delete=true") == -1) {
                var l = "&";
                o.proxy.indexOf("?") == -1 && (l = "?"), f = l + "iframe_delete=true"
            }
            a.src = o.proxy + f, a.style.display = "none", setTimeout(function() {
                document.body.appendChild(a)
            }, 0)
        }
    }
    AE.namespace("run").ajaxProxy = e
})();
YAHOO.lang.JSON = function() {
    function _revive(e, t) {
        var n = function(e, r) {
            var i, s, o = e[r];
            if (o && typeof o == "object")
                for (i in o) l.hasOwnProperty(o, i) && (s = n(o, i), s === undefined ? delete o[i] : o[i] = s);
            return t.call(e, r, o)
        };
        return typeof t == "function" ? n({
            "": e
        }, "") : e
    }

    function _char(e) {
        return _CHARS[e] || (_CHARS[e] = "\\u" + ("0000" + (+e.charCodeAt(0)).toString(16)).slice(-4)), _CHARS[e]
    }

    function _prepare(e) {
        return e.replace(_UNICODE_EXCEPTIONS, _char)
    }

    function _isValid(e) {
        return l.isString(e) && _INVALID.test(e.replace(_ESCAPES, "@").replace(_VALUES, "]").replace(_BRACKETS, ""))
    }

    function _string(e) {
        return '"' + e.replace(_SPECIAL_CHARS, _char) + '"'
    }

    function _stringify(e, t, n, r, i) {
        var s = typeof r == "function" ? r.call(e, t, e[t]) : e[t],
            o, u, a, f, c, h, p;
        if (s instanceof Date) s = l.JSON.dateToString(s);
        else if (s instanceof String || s instanceof Boolean || s instanceof Number) s = s.valueOf();
        switch (typeof s) {
            case "string":
                return _string(s);
            case "number":
                return isFinite(s) ? String(s) : "null";
            case "boolean":
                return String(s);
            case "object":
                if (s === null) return "null";
                for (o = i.length - 1; o >= 0; --o)
                    if (i[o] === s) return "null";
                i[i.length] = s, p = [], h = l.isArray(s);
                if (n > 0)
                    if (h)
                        for (o = s.length - 1; o >= 0; --o) p[o] = _stringify(s, o, n - 1, r, i) || "null";
                    else {
                        a = 0;
                        if (l.isArray(r))
                            for (o = 0, u = r.length; o < u; ++o) f = r[o], c = _stringify(s, f, n - 1, r, i), c && (p[a++] = _string(f) + ":" + c);
                        else
                            for (f in s) typeof f == "string" && l.hasOwnProperty(s, f) && (c = _stringify(s, f, n - 1, r, i), c && (p[a++] = _string(f) + ":" + c));
                        p.sort()
                    }
                return i.pop(), h ? "[" + p.join(",") + "]" : "{" + p.join(",") + "}"
        }
        return undefined
    }
    var l = YAHOO.lang,
        _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        _VALUES = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,
        _INVALID = /^[\],:{}\s]*$/,
        _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _CHARS = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
    return {
        isValid: function(e) {
            return _isValid(_prepare(e))
        },
        parse: function(s, reviver) {
            s = _prepare(s);
            if (_isValid(s)) return _revive(eval("(" + s + ")"), reviver);
            throw new SyntaxError("parseJSON")
        },
        stringify: function(e, t, n) {
            return e !== undefined ? (l.isArray(t) && (t = function(e) {
                var t = [],
                    n = {},
                    r, i, s, o;
                for (i = 0, s = 0, o = e.length; i < o; ++i) r = e[i], typeof r == "string" && n[r] === undefined && (t[n[r] = s++] = r);
                return t
            }(t)), n = n >= 0 ? n : 1 / 0, _stringify({
                "": e
            }, "", n, t, [])) : undefined
        },
        dateToString: function(e) {
            function t(e) {
                return e < 10 ? "0" + e : e
            }
            return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "Z"
        },
        stringToDate: function(e) {
            if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(e)) {
                var t = new Date;
                return t.setUTCFullYear(RegExp.$1, (RegExp.$2 | 0) - 1, RegExp.$3), t.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6), t
            }
            return e
        }
    }
}(), YAHOO.register("json", YAHOO.lang.JSON, {
    version: "2.6.0",
    build: "1321"
});
YUE.onDOMReady(function() {
    var e = window.feedbackIdArr = [],
        t = window.feedbackIdStr = "",
        n = !0,
        r = window.feedbackDigg = function() {
            var r = "",
                i, s, o;
            typeof runParams != "undefined" ? (r = runParams.productId, s = runParams.feedbackServer) : typeof _aecoremetricsServer != "undefined" ? s = _aecoremetricsServer : (get("productId") != null && (r = get("productId").value), get("feedbackServer") && (s = get("feedbackServer").value)), i = s + "/display/DiggShowAjaxService.htm", o = s + "/display/DiggDoAjaxService.htm";
            var u = {
                    thfTableEl: get("thf-table") || get("the-list") || get("transction-feedback")
                },
                a = function() {
                    for (var n = 0, r = YUD.getElementsByClassName("feedback-id", "input", u.thfTableEl); n < r.length; n++) {
                        if (r[n].parentNode.innerHTML.indexOf("No feedback") != -1) continue;
                        e.push(r[n].value)
                    }
                    return t = e.join(","), t.substr(-1, 1) == "," && t.substring(-1, t.length - 1), t
                }(),
                f = function(t) {
                    e = t.argument[0];
                    for (var r = 0; r < e.length; r++)(function(e) {
                        if (e != "") {
                            var r = t.responseText;
                            if (!r) return;
                            var i = YAHOO.lang.JSON.parse(r);
                            if (i.isSuccess == "true") {
                                var s = i.result[e].useful,
                                    o = i.result[e].useless,
                                    u = i.result[e].showButton;
                                if (!i) return;
                                var a = document.createElement("div");
                                a.className = "thf-digg", u == "yes" ? a.innerHTML = '<span class="thf-digg-text">Is this feedback helpful for you?</span><span class="thf-digg-useful">	<a class="thf-digg-yes thf-digg-btn" href="javascript:;">Yes</a>	(<span class="thf-digg-useful-num thf-digg-num">' + s + "</span>)" + "</span>" + '<span class="thf-digg-useless">' + '	<a class="thf-digg-no thf-digg-btn" href="javascript:;">No</a>' + '	(<span class="thf-digg-useless-num thf-digg-num">' + o + "</span>)" + "</span>" : u == "no" && (a.innerHTML = '<span class="thf-digg-useful">	<span>Helpful</span>	(<span class="thf-digg-useful-num thf-digg-num">' + s + "</span>)" + "</span>" + '<span class="thf-digg-useless">' + "	<span>Not Helpful</span>" + '	(<span class="thf-digg-useless-num thf-digg-num">' + o + "</span>)" + "</span>");
                                var f = "feedback-" + e;
                                setTimeout(function() {
                                    YUD.insertBefore(a, document.getElementById(f)), n = !0
                                }, 500)
                            }
                        }
                    })(e[r]);
                    setTimeout(function() {
                        var e = YUD.getElementsByClassName("thf-digg-btn", "a", u.thfTableEl);
                        YUE.on(e, "click", l)
                    }, 500)
                },
                l = function() {
                    var e = this,
                        t = YUD.getNextSibling(e),
                        n, i;
                    e.className.indexOf("thf-digg-yes") != -1 ? n = "dig_yes" : e.className.indexOf("thf-digg-no") != -1 && (n = "dig_no");
                    var u = YUD.getAncestorByTagName(e, "td"),
                        a = YUD.getElementsByClassName("feedback-id", "input", u)[0],
                        f = YUD.getElementsByClassName("thf-digg-useful", "span", u)[0],
                        l = YUD.getElementsByClassName("thf-digg-useless", "span", u)[0],
                        c = YUD.getElementsByClassName("thf-digg-yes", "a", u)[0],
                        h = YUD.getElementsByClassName("thf-digg-no", "a", u)[0],
                        p = YUD.getElementsByClassName("thf-digg-text", "span", u)[0],
                        d = YUD.getElementsByClassName("thf-digg", "div", u)[0];
                    a && (i = a.value);
                    var v = function(e) {
                            var n = e.responseText;
                            if (!n) return;
                            var r = YAHOO.lang.JSON.parse(n),
                                i = r.isSuccess,
                                s = r.result,
                                o = function() {
                                    var e = document.createElement("span"),
                                        t = document.createElement("span");
                                    e.innerHTML = "Helpful", t.innerHTML = "Not Helpful", YUD.insertBefore(e, c), f.removeChild(c), YUD.insertBefore(t, h), l.removeChild(h), d.removeChild(p)
                                };
                            if (i == "true" && s == "") t.innerHTML = parseInt(t.firstChild.nodeValue) + 1, o();
                            else if (i == "false" && s == "go_to_login") {
                                var u = window.top.location.href;
                                window.top.location = "https://login.aliexpress.com/buyer.htm?return=" + u
                            } else i == "false" && s == "has_digged" && o()
                        },
                        m = o + "?evaluation_id=" + i + "&type=" + n + "&product_id=" + r + "&random=" + Math.random();
                    (new AE.run.ajaxProxy).asyncRequest("GET", m, {
                        success: v,
                        failure: function() {},
                        timeout: 5e3
                    }, "", {
                        proxy: s + "/ajax_proxy.html?iframe_delete=true",
                        domain: "aliexpress.com"
                    })
                },
                c = function(e, t) {
                    if (t != "" && n) {
                        n = !1;
                        if (!get("diggFrom")) return !1;
                        var o = get("diggFrom").value;
                        if (o == "profile") {
                            var u = get("refreshPageid").value,
                                a = get("memberType").value;
                            if (u == "left" && a == "seller" || u == "received" && a == "buyer" || u == "dynamic" && a == "buyer") return !1
                        }
                        var l = i + "?evaluation_ids=" + t + "&product_id=" + r + "&from=" + o + "&random=" + Math.random();
                        if (get("feedbackServer")) var c = YAHOO.util.Connect || new AE.run.ajaxProxy;
                        else var c = new AE.run.ajaxProxy || YAHOO.util.Connect;
                        c.asyncRequest("GET", l, {
                            success: f,
                            failure: function() {},
                            timeout: 5e3,
                            argument: [e]
                        }, "", {
                            proxy: s + "/ajax_proxy.html?iframe_delete=true",
                            domain: "aliexpress.com"
                        })
                    }
                };
            return {
                init: function(e, t) {
                    c(e, t)
                }
            }
        }();
    r.init(e, t)
});
AE.namespace("AE.run"), AE.run.loadVipLevel = function() {
    this.config = {
        ajaxUrl: "",
        imgPath: "http://i02.i.aliimg.com/wimg/buyer/single/",
        targetForId: {
            id: "",
            memberId: ""
        },
        targetForClass: {
            name: "",
            parentId: "",
            attrName: ""
        },
        lnkClass: "",
        imgClass: "",
        lnkUrl: "http://help.aliexpress.com/vip_club.html",
        lnkTarget: "_blank"
    }, this.cache = {
        1: {
            title: "VIP Silver",
            imgSrc: "vip_silver_11x11.png"
        },
        2: {
            title: "VIP Gold",
            imgSrc: "vip_gold_11x11.png"
        },
        3: {
            title: "VIP Platinum",
            imgSrc: "vip_platinum_11x11.png"
        }
    }
}, AE.run.loadVipLevel.prototype = {
    init: function(e) {
        var t = this.config = YL.merge(this.config, e || {}),
            n = this;
        n.getLevel()
    },
    getLevel: function() {
        var e = this.config,
            t = this,
            n = t.getBuyerSeqs();
        if (n) {
            var r = e.ajaxUrl + "?buyerSeqs=" + n;
            t.getJSONP(r, function(n) {
                if (e.targetForId && get(e.targetForId.id) && n[e.targetForId.memberId] != undefined) {
                    var r = t.createVipNode(n[e.targetForId.memberId]);
                    r && get(e.targetForId.id).appendChild(r)
                }
                e.targetForClass && YUD.getElementsByClassName(e.targetForClass.name, "*", e.targetForClass.parentId, function() {
                    var r = this.getAttribute(e.targetForClass.attrName);
                    if (n[r] != undefined) {
                        var i = t.createVipNode(n[r]);
                        i && this.appendChild(i)
                    }
                })
            })
        }
    },
    createVipNode: function(e) {
        var t = e + "";
        if (t == "0") return null;
        var n = this.config,
            r = this.cache,
            i = this,
            s = document.createElement("a"),
            o = document.createElement("img");
        return YUD.addClass(s, n.lnkClass), YUD.addClass(o, n.imgClass), s.setAttribute("href", n.lnkUrl), s.setAttribute("target", n.lnkTarget), s.setAttribute("title", r[t].title), o.setAttribute("src", n.imgPath + r[t].imgSrc), o.setAttribute("alt", r[t].title), s.appendChild(o), s
    },
    getBuyerSeqs: function() {
        var e = this.config,
            t = this,
            n = [];
        e.targetForId && n.push(e.targetForId.memberId);
        if (e.targetForClass) {
            var r = e.targetForClass.attrName;
            YUD.getElementsByClassName(e.targetForClass.name, "*", e.targetForClass.parentId, function() {
                n.push(this.getAttribute(r))
            })
        }
        return n = t.aryRemoveDuplicate(n), n.join(",")
    },
    getJSONP: function(e, t) {
        var n = this,
            r = "tempJson" + (new Date).getTime();
        YAHOO.util.Get.script(e + "&jsonName=" + r, {
            onFailure: function() {},
            onTimeout: function() {},
            onSuccess: function(e) {
                e.purge();
                var i = window[r];
                i && t && t.call(n, i)
            },
            timeout: 5e3
        })
    },
    aryRemoveDuplicate: function(e) {
        var t = {},
            n = [];
        for (var r = 0, i = e.length; r < i; r++) t[e[r]] == undefined && (t[e[r]] = e[r]);
        for (var s in t) n.push(s);
        return n
    }
};
YUE.onDOMReady(function() {
    AE.run.loadVipLevel && (new AE.run.loadVipLevel).init({
        ajaxUrl: vipLevelConfig.vipLevelServerUrl,
        targetForId: null,
        targetForClass: {
            name: "vip-level",
            parentId: "transction-feedback",
            attrName: "memberid"
        }
    })
});

function gotoPage(e) {
    if (typeof e != "number" || e < 0) return !1;
    var t = document.forms.refreshForm,
        n = t.elements.page;
    n.value = e, t.submit()
}

function sortList(e) {
    var t = document.forms.refreshForm,
        n = t.elements.evaSortValue;
    n.value = e;
    var r = t.elements.page;
    r.value = "1", t.submit()
}

function starFileter(e) {
    if (typeof e != "number" || e < 0 || e > 5) return !1;
    var t = document.forms.refreshForm,
        n = t.elements.star;
    n.value = e;
    var r = t.elements.page;
    r.value = 1, t.submit()
}(function() {
    document.body.offsetWidth < 950 && YUD.addClass(document.body, "store")
})(), YUE.onDOMReady(function() {
    var e = get("goto-page-num");
    YUE.on("pagination-bottom-goto", "click", function() {
        var t = parseInt(e.value);
        if (isNaN(t) || t < 0) return !1;
        gotoPage(t)
    }), get("sort-by-selector") && (new AE.widget.clickShow).init({
        targetId: "sort-by-selector",
        contentId: "sort-by-container",
        bodyClickClose: !0,
        needMask: !0,
        excursion: [0, 20]
    })
}), YUE.on(window, "load", function() {
    setTimeout(function() {
        var e = window.chrome,
            t;
        e ? t = document.documentElement.scrollHeight : t = document.body.scrollHeight, this.frame = get("getHeightProxy");
        var n = frame.getAttribute("thesrc");
        this.frame.src = n + "?iframe_delete=true#feedback|" + t
    }, 1e3)
});