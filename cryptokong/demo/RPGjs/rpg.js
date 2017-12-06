/*!
 * RPG JavaScript Library Beta 1.2.0
 * http://rpgjs.com
 *
 * Copyright 2011, Samuel Ronce
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Includes Easel.js (modified)
 * http://easeljs.com
 * Copyright 2011, Grant Skinner
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: September 04, 2011
 * Update : Sat Sep 17 17:30:50 2011
 */
(function(a) {
    var c = function(h, f, j, i, g, e) {
        this.initialize(h, f, j, i, g, e)
    };
    var b = c.prototype;
    c.identity = null;
    c.DEG_TO_RAD = Math.PI / 180;
    b.a = 1;
    b.b = 0;
    b.c = 0;
    b.d = 1;
    b.tx = 0;
    b.ty = 0;
    b.alpha = 1;
    b.shadow = null;
    b.compositeOperation = null;
    b.initialize = function(h, f, j, i, g, e) {
        if (h != null) {
            this.a = h
        }
        this.b = f || 0;
        this.c = j || 0;
        if (i != null) {
            this.d = i
        }
        this.tx = g || 0;
        this.ty = e || 0
    };
    b.prepend = function(m, l, k, j, i, g) {
        var f = this.tx;
        if (m != 1 || l != 0 || k != 0 || j != 1) {
            var e = this.a;
            var h = this.c;
            this.a = e * m + this.b * k;
            this.b = e * l + this.b * j;
            this.c = h * m + this.d * k;
            this.d = h * l + this.d * j
        }
        this.tx = f * m + this.ty * k + i;
        this.ty = f * l + this.ty * j + g
    };
    b.append = function(n, l, k, j, i, g) {
        var f = this.a;
        var m = this.b;
        var h = this.c;
        var e = this.d;
        this.a = n * f + l * h;
        this.b = n * m + l * e;
        this.c = k * f + j * h;
        this.d = k * m + j * e;
        this.tx = i * f + g * h + this.tx;
        this.ty = i * m + g * e + this.ty
    };
    b.prependMatrix = function(d) {
        this.prepend(d.a, d.b, d.c, d.d, d.tx, d.ty);
        this.prependProperties(d.alpha, d.shadow, d.compositeOperation)
    };
    b.appendMatrix = function(d) {
        this.append(d.a, d.b, d.c, d.d, d.tx, d.ty);
        this.appendProperties(d.alpha, d.shadow, d.compositeOperation)
    };
    b.prependTransform = function(j, h, m, l, o, k, i, f, e) {
        if (o % 360) {
            var d = o * c.DEG_TO_RAD;
            var n = Math.cos(d);
            var g = Math.sin(d)
        } else {
            n = 1;
            g = 0
        }
        if (f || e) {
            this.tx -= f;
            this.ty -= e
        }
        if (k || i) {
            k *= c.DEG_TO_RAD;
            i *= c.DEG_TO_RAD;
            this.prepend(n * m, g * m, -g * l, n * l, 0, 0);
            this.prepend(Math.cos(i), Math.sin(i), -Math.sin(k), Math.cos(k), j, h)
        } else {
            this.prepend(n * m, g * m, -g * l, n * l, j, h)
        }
    };
    b.appendTransform = function(j, h, m, l, o, k, i, f, e) {
        if (o % 360) {
            var d = o * c.DEG_TO_RAD;
            var n = Math.cos(d);
            var g = Math.sin(d)
        } else {
            n = 1;
            g = 0
        }
        if (k || i) {
            k *= c.DEG_TO_RAD;
            i *= c.DEG_TO_RAD;
            this.append(Math.cos(i), Math.sin(i), -Math.sin(k), Math.cos(k), j, h);
            this.append(n * m, g * m, -g * l, n * l, 0, 0)
        } else {
            this.append(n * m, g * m, -g * l, n * l, j, h)
        }
        if (f || e) {
            this.tx -= f * this.a + e * this.c;
            this.ty -= f * this.b + e * this.d
        }
    };
    b.rotate = function(i) {
        var h = Math.cos(i);
        var f = Math.sin(i);
        var e = this.a;
        var g = this.c;
        var d = this.tx;
        this.a = e * h - this.b * f;
        this.b = e * f + this.b * h;
        this.c = g * h - this.d * f;
        this.d = g * f + this.d * h;
        this.tx = d * h - this.ty * f;
        this.ty = d * f + this.ty * h
    };
    b.skew = function(e, d) {
        e = e * c.DEG_TO_RAD;
        d = d * c.DEG_TO_RAD;
        this.append(Math.cos(d), Math.sin(d), -Math.sin(e), Math.cos(e), 0, 0)
    };
    b.scale = function(d, e) {
        this.a *= d;
        this.d *= e;
        this.tx *= d;
        this.ty *= e
    };
    b.translate = function(d, e) {
        this.tx += d;
        this.ty += e
    };
    b.identity = function() {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null
    };
    b.invert = function() {
        var e = this.a;
        var f = this.b;
        var g = this.c;
        var h = this.d;
        var d = this.tx;
        var i = e * h - f * g;
        this.a = h / i;
        this.b = -f / i;
        this.c = -g / i;
        this.d = e / i;
        this.tx = (g * this.ty - h * d) / i;
        this.ty = -(e * this.ty - f * d) / i
    };
    b.decompose = function(f) {
        if (f == null) {
            f = {}
        }
        f.x = this.tx;
        f.y = this.ty;
        f.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        f.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var e = Math.atan2( - this.c, this.d);
        var d = Math.atan2(this.b, this.a);
        if (e == d) {
            f.rotation = d / c.DEG_TO_RAD;
            if (this.a < 0 && this.d >= 0) {
                f.rotation += (f.rotation <= 0) ? 180 : -180
            }
            f.skewX = f.skewY = 0
        } else {
            f.skewX = e / c.DEG_TO_RAD;
            f.skewY = d / c.DEG_TO_RAD
        }
        return f
    };
    b.reinitialize = function(l, k, j, i, g, f, e, m, h) {
        this.initialize(l, k, j, i, g, f);
        this.alpha = e || 1;
        this.shadow = m;
        this.compositeOperation = h;
        return this
    };
    b.appendProperties = function(e, f, d) {
        this.alpha *= e;
        this.shadow = f || this.shadow;
        this.compositeOperation = d || this.compositeOperation
    };
    b.prependProperties = function(e, f, d) {
        this.alpha *= e;
        this.shadow = this.shadow || f;
        this.compositeOperation = this.compositeOperation || d
    };
    b.clone = function() {
        var d = new c(this.a, this.b, this.c, this.d, this.tx, this.ty);
        d.shadow = this.shadow;
        d.alpha = this.alpha;
        d.compositeOperation = this.compositeOperation;
        return d
    };
    b.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    };
    c.identity = new c(1, 0, 0, 1, 0, 0);
    a.Matrix2D = c
} (window));
(function(b) {
    var a = function() {
        throw "SpriteSheetUtils cannot be instantiated"
    };
    a._workingCanvas = document.createElement("canvas");
    a._workingContext = a._workingCanvas.getContext("2d");
    a.flip = function(B, t) {
        var q = B.image;
        var d = B.frameData;
        var y = B.frameWidth;
        var l = B.frameHeight;
        var o = q.width / y | 0;
        var m = q.height / l | 0;
        var s = o * m;
        var c = {};
        var D;
        for (var u in d) {
            D = d[u];
            if (D instanceof Array) {
                D = D.slice(0)
            }
            c[u] = D
        }
        var C = [];
        var F = 0;
        var z = 0;
        for (u in t) {
            var r = t[u];
            D = d[r[0]];
            if (D == null) {
                continue
            }
            if (D instanceof Array) {
                var h = D[0];
                var g = D[1];
                if (g == null) {
                    g = h
                }
            } else {
                h = g = D
            }
            C[z] = u;
            C[z + 1] = h;
            C[z + 2] = g;
            F += g - h + 1;
            z += 4
        }
        var f = a._workingCanvas;
        f.width = q.width;
        f.height = Math.ceil(m + F / o) * l;
        var w = a._workingContext;
        w.drawImage(q, 0, 0, o * y, m * l, 0, 0, o * y, m * l);
        var p = s - 1;
        for (z = 0; z < C.length; z += 4) {
            u = C[z];
            h = C[z + 1];
            g = C[z + 2];
            r = t[u];
            var v = r[1] ? -1 : 1;
            var k = r[2] ? -1 : 1;
            var e = v == -1 ? y: 0;
            var A = k == -1 ? l: 0;
            for (var x = h; x <= g; x++) {
                p++;
                w.save();
                w.translate((p % o) * y + e, (p / o | 0) * l + A);
                w.scale(v, k);
                w.drawImage(q, (x % o) * y, (x / o | 0) * l, y, l, 0, 0, y, l);
                w.restore()
            }
            c[u] = [p - (g - h), p, r[3]]
        }
        var E = new Image();
        E.src = f.toDataURL("image/png");
        return new SpriteSheet((E.width > 0) ? E: f, y, l, c)
    };
    a.frameDataToString = function(l) {
        var j = "";
        var k = 0;
        var f = 0;
        var i = 0;
        var g, h;
        for (var d in l) {
            i++;
            g = l[d];
            if (g instanceof Array) {
                var c = g[0];
                var e = g[1];
                if (e == null) {
                    e = c
                }
                h = g[2];
                if (h == null) {
                    h = d
                }
            } else {
                c = e = g;
                h = d
            }
            j += "\n\t" + d + ", start=" + c + ", end=" + e + ", next=" + h;
            if (h == false) {
                j += " (stop)"
            } else {
                if (h == d) {
                    j += " (loop)"
                }
            }
            if (e > k) {
                k = e
            }
            if (c < f) {
                f = c
            }
        }
        j = i + " sequences, min=" + f + ", max=" + k + j;
        return j
    };
    a.extractFrame = function(k, c) {
        var e = k.image;
        var j = k.frameWidth;
        var f = k.frameHeight;
        var i = e.width / j | 0;
        if (isNaN(c)) {
            var h = k.frameData[c];
            if (h instanceof Array) {
                c = h[0]
            } else {
                c = h
            }
        }
        var d = a._workingCanvas;
        d.width = j;
        d.height = f;
        a._workingContext.drawImage(e, (c % i) * j, (c / i | 0) * f, j, f, 0, 0, j, f);
        var g = new Image();
        g.src = d.toDataURL("image/png");
        return g
    };
    b.SpriteSheetUtils = a
} (window));
(function(a) {
    var b = function() {
        throw "Ticker cannot be instantiated."
    };
    b._listeners = [];
    b._pauseable = [];
    b._paused = false;
    b._inited = false;
    b._startTime = 0;
    b._pausedTime = 0;
    b._ticks = 0;
    b._pausedTickers = 0;
    b._interval = 50;
    b._intervalID = null;
    b._lastTime = 0;
    b._times = [];
    b.addListener = function(c, d) {
        if (!b._inited) {
            b._inited = true;
            b._startTime = b._getTime();
            b._times.push(0);
            b.setInterval(b._interval)
        }
        this.removeListener(c);
        b._pauseable[b._listeners.length] = (d == null) ? true: d;
        b._listeners.push(c)
    };
    b.removeListener = function(d) {
        if (b._listeners == null) {
            return
        }
        var c = b._listeners.indexOf(d);
        if (c != -1) {
            b._listeners.splice(c, 1);
            b._pauseable.splice(c, 1)
        }
    };
    b.removeAllListeners = function() {
        b._listeners = [];
        b._pauseable = []
    };
    b.setInterval = function(c) {
        if (b._intervalID != null) {
            clearInterval(b._intervalID)
        }
        b._lastTime = b.getTime(false);
        b._interval = c;
        b._intervalID = setInterval(b._tick, c)
    };
    b.getInterval = function() {
        return b._interval
    };
    b.getFPS = function() {
        return 1000 / b._interval
    };
    b.setFPS = function(c) {
        b.setInterval(1000 / c)
    };
    b.getMeasuredFPS = function(c) {
        if (b._times.length < 2) {
            return - 1
        }
        if (c == null) {
            c = b.getFPS() >> 1
        }
        c = Math.min(b._times.length - 1, c);
        return 1000 / ((b._times[0] - b._times[c]) / c)
    };
    b.setPaused = function(c) {
        b._paused = c
    };
    b.getPaused = function() {
        return b._paused
    };
    b.getTime = function(c) {
        return b._getTime() - b._startTime - (c ? b._pausedTime: 0)
    };
    b.getTicks = function(c) {
        return b._ticks - (c ? b._pausedTickers: 0)
    };
    b._tick = function() {
        b._ticks++;
        var f = b.getTime(false);
        var m = f - b._lastTime;
        var k = b._paused;
        if (k) {
            b._pausedTickers++;
            b._pausedTime += m
        }
        b._lastTime = f;
        var c = b._pauseable;
        var j = b._listeners.slice();
        var g = j ? j.length: 0;
        for (var h = 0; h < g; h++) {
            var d = c[h];
            var e = j[h];
            if (e == null || (k && d) || e.tick == null) {
                continue
            }
            e.tick(m)
        }
        b._times.unshift(f);
        if (b._times.length > 100) {
            b._times.pop()
        }
    };
    b._getTime = function() {
        return new Date().getTime()
    };
    a.Ticker = b
} (window));
(function(b) {
    var a = function() {
        throw "UID cannot be instantiated"
    };
    a._nextID = 0;
    a.get = function() {
        return a._nextID++
    };
    b.UID = a
} (window));
(function(b) {
    var a = function() {
        this.initialize()
    };
    var c = a.prototype;
    a.suppressCrossDomainErrors = false;
    a._hitTestCanvas = document.createElement("canvas");
    a._hitTestCanvas.width = a._hitTestCanvas.height = 1;
    a._hitTestContext = a._hitTestCanvas.getContext("2d");
    c.alpha = 1;
    c.cacheCanvas = null;
    c.id = -1;
    c.mouseEnabled = true;
    c.name = null;
    c.parent = null;
    c.regX = 0;
    c.regY = 0;
    c.rotation = 0;
    c.scaleX = 1;
    c.scaleY = 1;
    c.skewX = 0;
    c.skewY = 0;
    c.shadow = null;
    c.visible = true;
    c.x = 0;
    c.y = 0;
    c.compositeOperation = null;
    c.snapToPixel = false;
    c.onPress = null;
    c.onClick = null;
    c.onDoubleClick = null;
    c.onMouseOver = null;
    c.onMouseOut = null;
    c.tick = null;
    c.filters = null;
    c._cacheOffsetX = 0;
    c._cacheOffsetY = 0;
    c._matrix = null;
    c.initialize = function() {
        this.id = UID.get();
        this._matrix = new Matrix2D()
    };
    c.isVisible = function() {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0
    };
    c.draw = function(d, e) {
        if (e || !this.cacheCanvas) {
            return false
        }
        d.drawImage(this.cacheCanvas, this._cacheOffsetX, this._cacheOffsetY);
        return true
    };
    c.cache = function(e, h, g, d) {
        if (this.cacheCanvas == null) {
            this.cacheCanvas = document.createElement("canvas")
        }
        var f = this.cacheCanvas.getContext("2d");
        this.cacheCanvas.width = g;
        this.cacheCanvas.height = d;
        f.setTransform(1, 0, 0, 1, -e, -h);
        f.clearRect(0, 0, g + 1, d + 1);
        this.draw(f, true);
        this._cacheOffsetX = e;
        this._cacheOffsetY = h;
        this._applyFilters()
    };
    c.updateCache = function(e) {
        if (this.cacheCanvas == null) {
            throw "cache() must be called before updateCache()"
        }
        var d = this.cacheCanvas.getContext("2d");
        d.setTransform(1, 0, 0, 1, -this._cacheOffsetX, -this._cacheOffsetY);
        if (!e) {
            d.clearRect(0, 0, this.cacheCanvas.width + 1, this.cacheCanvas.height + 1)
        } else {
            d.globalCompositeOperation = e
        }
        this.draw(d, true);
        if (e) {
            d.globalCompositeOperation = "source-over"
        }
        this._applyFilters()
    };
    c.uncache = function() {
        this.cacheCanvas = null;
        this._cacheOffsetX = this._cacheOffsetY = 0
    };
    c.getStage = function() {
        var d = this;
        while (d.parent) {
            d = d.parent
        }
        if (d instanceof Stage) {
            return d
        }
        return null
    };
    c.localToGlobal = function(d, f) {
        var e = this.getConcatenatedMatrix(this._matrix);
        if (e == null) {
            return null
        }
        e.append(1, 0, 0, 1, d, f);
        return new Point(e.tx, e.ty)
    };
    c.globalToLocal = function(d, f) {
        var e = this.getConcatenatedMatrix(this._matrix);
        if (e == null) {
            return null
        }
        e.invert();
        e.append(1, 0, 0, 1, d, f);
        return new Point(e.tx, e.ty)
    };
    c.localToLocal = function(d, g, f) {
        var e = this.localToGlobal(d, g);
        return f.globalToLocal(e.x, e.y)
    };
    c.setTransform = function(h, f, k, j, l, i, g, e, d) {
        this.x = h || 0;
        this.y = f || 0;
        this.scaleX = k == null ? 1 : k;
        this.scaleY = j == null ? 1 : j;
        this.rotation = l || 0;
        this.skewX = i || 0;
        this.skewY = g || 0;
        this.regX = e || 0;
        this.regY = d || 0
    };
    c.getConcatenatedMatrix = function(d) {
        if (d) {
            d.identity()
        } else {
            d = new Matrix2D()
        }
        var e = this;
        while (e != null) {
            d.prependTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY);
            d.prependProperties(e.alpha, e.shadow, e.compositeOperation);
            e = e.parent
        }
        return d
    };
    c.hitTest = function(d, h) {
        var e = a._hitTestContext;
        var f = a._hitTestCanvas;
        e.setTransform(1, 0, 0, 1, -d, -h);
        this.draw(e);
        var g = this._testHit(e);
        f.width = 0;
        f.width = 1;
        return g
    };
    c.clone = function() {
        var d = new a();
        this.cloneProps(d);
        return d
    };
    c.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    };
    c.cloneProps = function(d) {
        d.alpha = this.alpha;
        d.name = this.name;
        d.regX = this.regX;
        d.regY = this.regY;
        d.rotation = this.rotation;
        d.scaleX = this.scaleX;
        d.scaleY = this.scaleY;
        d.shadow = this.shadow;
        d.skewX = this.skewX;
        d.skewY = this.skewY;
        d.visible = this.visible;
        d.x = this.x;
        d.y = this.y;
        d.mouseEnabled = this.mouseEnabled;
        d.compositeOperation = this.compositeOperation
    };
    c.applyShadow = function(d, e) {
        e = e || Shadow.identity;
        d.shadowColor = e.color;
        d.shadowOffsetX = e.offsetX;
        d.shadowOffsetY = e.offsetY;
        d.shadowBlur = e.blur
    };
    c._testHit = function(d) {
        try {
            var f = d.getImageData(0, 0, 1, 1).data[3] > 1
        } catch(g) {
            if (!a.suppressCrossDomainErrors) {
                throw "An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
            }
        }
        return f
    };
    c._applyFilters = function() {
        if (!this.filters || this.filters.length == 0 || !this.cacheCanvas) {
            return
        }
        var f = this.filters.length;
        var e = this.cacheCanvas.getContext("2d");
        var d = this.cacheCanvas.width;
        var j = this.cacheCanvas.height;
        for (var g = 0; g < f; g++) {
            this.filters[g].applyFilter(e, 0, 0, d, j)
        }
    };
    b.DisplayObject = a
} (window));
(function(b) {
    var a = function(d) {
        this.initialize(d)
    };
    var c = a.prototype = new DisplayObject();
    c.image = null;
    c.snapToPixel = true;
    c.DisplayObject_initialize = c.initialize;
    c.initialize = function(d) {
        this.DisplayObject_initialize();
        if (typeof d == "string") {
            this.image = new Image();
            this.image.src = d
        } else {
            this.image = d
        }
    };
    c.isVisible = function() {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext)
    };
    c.DisplayObject_draw = c.draw;
    c.draw = function(d, e) {
        if (this.DisplayObject_draw(d, e)) {
            return true
        }
        d.drawImage(this.image, 0, 0);
        return true
    };
    c.clone = function() {
        var d = new a(this.image);
        this.cloneProps(d);
        return d
    };
    c.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    };
    b.Bitmap = a
} (window));
(function(b) {
    var a = function() {
        this.initialize()
    };
    var c = a.prototype = new DisplayObject();
    c.children = null;
    c.DisplayObject_initialize = c.initialize;
    c.initialize = function() {
        this.DisplayObject_initialize();
        this.children = []
    };
    c.isVisible = function() {
        return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0
    };
    c.DisplayObject_draw = c.draw;
    c.draw = function(o, d, j) {
        var h = Stage._snapToPixelEnabled;
        if (this.DisplayObject_draw(o, d)) {
            return true
        }
        j = j || this._matrix.reinitialize(1, 0, 0, 1, 0, 0, this.alpha, this.shadow, this.compositeOperation);
        var g = this.children.length;
        var m = this.children.slice(0);
        for (var k = 0; k < g; k++) {
            var f = m[k];
            if (!f.isVisible()) {
                continue
            }
            var n = false;
            var e = f._matrix.reinitialize(j.a, j.b, j.c, j.d, j.tx, j.ty, j.alpha, j.shadow, j.compositeOperation);
            e.appendTransform(f.x, f.y, f.scaleX, f.scaleY, f.rotation, f.skewX, f.skewY, f.regX, f.regY);
            e.appendProperties(f.alpha, f.shadow, f.compositeOperation);
            if (! (f instanceof a && f.cacheCanvas == null)) {
                if (h && f.snapToPixel && e.a == 1 && e.b == 0 && e.c == 0 && e.d == 1) {
                    o.setTransform(e.a, e.b, e.c, e.d, e.tx + 0.5 | 0, e.ty + 0.5 | 0)
                } else {
                    o.setTransform(e.a, e.b, e.c, e.d, e.tx, e.ty)
                }
                o.globalAlpha = e.alpha;
                o.globalCompositeOperation = e.compositeOperation || "source-over";
                if (n = e.shadow) {
                    this.applyShadow(o, n)
                }
            }
            f.draw(o, false, e);
            if (n) {
                this.applyShadow(o)
            }
        }
        return true
    };
    c.addChild = function(f) {
        var d = arguments.length;
        if (d > 1) {
            for (var e = 0; e < d; e++) {
                this.addChild(arguments[e])
            }
            return arguments[d - 1]
        }
        if (f.parent) {
            f.parent.removeChild(f)
        }
        f.parent = this;
        this.children.push(f);
        return f
    };
    c.addChildAt = function(g, e) {
        var d = arguments.length;
        if (d > 2) {
            e = arguments[f - 1];
            for (var f = 0; f < d - 1; f++) {
                this.addChildAt(arguments[f], e + f)
            }
            return arguments[d - 2]
        }
        if (g.parent) {
            g.parent.removeChild(g)
        }
        g.parent = this;
        this.children.splice(e, 0, g);
        return g
    };
    c.removeChild = function(g) {
        var d = arguments.length;
        if (d > 1) {
            var f = true;
            for (var e = 0; e < d; e++) {
                f = f && this.removeChild(arguments[e])
            }
            return f
        }
        return this.removeChildAt(this.children.indexOf(g))
    };
    c.removeChildAt = function(f) {
        var e = arguments.length;
        if (e > 1) {
            var d = [];
            for (var g = 0; g < e; g++) {
                d[g] = arguments[g]
            }
            d.sort(function(k, i) {
                return i - k
            });
            var h = true;
            for (var g = 0; g < e; g++) {
                h = h && this.removeChildAt(d[g])
            }
            return h
        }
        if (f < 0 || f > this.children.length - 1) {
            return false
        }
        var j = this.children[f];
        if (j != null) {
            j.parent = null
        }
        this.children.splice(f, 1);
        return true
    };
    c.removeAllChildren = function() {
        while (this.children.length) {
            this.removeChildAt(0)
        }
    };
    c.getChildAt = function(d) {
        return this.children[d]
    };
    c.sortChildren = function(d) {
        this.children.sort(d)
    };
    c.getChildIndex = function(d) {
        return this.children.indexOf(d)
    };
    c.getNumChildren = function() {
        return this.children.length
    };
    c.contains = function(d) {
        while (d) {
            if (d == this) {
                return true
            }
            d = d.parent
        }
        return false
    };
    c.hitTest = function(d, e) {
        return (this.getObjectUnderPoint(d, e) != null)
    };
    c.getObjectsUnderPoint = function(e, g) {
        var d = [];
        var f = this.localToGlobal(e, g);
        this._getObjectsUnderPoint(f.x, f.y, d);
        return d
    };
    c.getObjectUnderPoint = function(d, f) {
        var e = this.localToGlobal(d, f);
        return this._getObjectsUnderPoint(e.x, e.y)
    };
    c.clone = function(f) {
        var h = new a();
        this.cloneProps(h);
        if (f) {
            var d = h.children = [];
            for (var g = 0, e = this.children.length; g < e; g++) {
                var j = this.children[g].clone(f);
                j.parent = h;
                d.push(j)
            }
        }
        return h
    };
    c.toString = function() {
        return "[Container (name=" + this.name + ")]"
    };
    c._tick = function() {
        for (var d = this.children.length - 1; d >= 0; d--) {
            var e = this.children[d];
            if (e._tick) {
                e._tick()
            }
            if (e.tick) {
                e.tick()
            }
        }
    };
    c._getObjectsUnderPoint = function(n, m, j, q) {
        var o = DisplayObject._hitTestContext;
        var f = DisplayObject._hitTestCanvas;
        var d = this._matrix;
        var k = (q & 1 && (this.onPress || this.onClick || this.onDoubleClick)) || (q & 2 && (this.onMouseOver || this.onMouseOut));
        if (this.cacheCanvas) {
            this.getConcatenatedMatrix(d);
            o.setTransform(d.a, d.b, d.c, d.d, d.tx - n, d.ty - m);
            o.globalAlpha = d.alpha;
            this.draw(o);
            if (this._testHit(o)) {
                f.width = 0;
                f.width = 1;
                if (k) {
                    return this
                }
            } else {
                return null
            }
        }
        var g = this.children.length;
        for (var h = g - 1; h >= 0; h--) {
            var e = this.children[h];
            if (!e.isVisible() || !e.mouseEnabled) {
                continue
            }
            if (e instanceof a) {
                var p;
                if (k) {
                    p = e._getObjectsUnderPoint(n, m);
                    if (p) {
                        return this
                    }
                } else {
                    p = e._getObjectsUnderPoint(n, m, j, q);
                    if (!j && p) {
                        return p
                    }
                }
            } else {
                if (!q || k || (q & 1 && (e.onPress || e.onClick || e.onDoubleClick)) || (q & 2 && (e.onMouseOver || e.onMouseOut))) {
                    e.getConcatenatedMatrix(d);
                    o.setTransform(d.a, d.b, d.c, d.d, d.tx - n, d.ty - m);
                    o.globalAlpha = d.alpha;
                    e.draw(o);
                    if (!this._testHit(o)) {
                        continue
                    }
                    f.width = 0;
                    f.width = 1;
                    if (k) {
                        return this
                    } else {
                        if (j) {
                            j.push(e)
                        } else {
                            return e
                        }
                    }
                }
            }
        }
        return null
    };
    b.Container = a
} (window));
(function(a) {
    var c = function(d) {
        this.initialize(d)
    };
    var b = c.prototype = new Container();
    c._snapToPixelEnabled = false;
    b.autoClear = true;
    b.canvas = null;
    b.mouseX = null;
    b.mouseY = null;
    b.onMouseMove = null;
    b.onMouseUp = null;
    b.onMouseDown = null;
    b.snapToPixelEnabled = false;
    b.mouseInBounds = false;
    b.tickOnUpdate = true;
    b._activeMouseEvent = null;
    b._activeMouseTarget = null;
    b._mouseOverIntervalID = null;
    b._mouseOverX = 0;
    b._mouseOverY = 0;
    b._mouseOverTarget = null;
    b.Container_initialize = b.initialize;
    b.initialize = function(d) {
        this.Container_initialize();
        this.canvas = d;
        this._enableMouseEvents(true)
    };
    b.update = function() {
        if (!this.canvas) {
            return
        }
        if (this.autoClear) {
            this.clear()
        }
        c._snapToPixelEnabled = this.snapToPixelEnabled;
        if (this.tickOnUpdate) {
            this._tick()
        }
        this.draw(this.canvas.getContext("2d"), false, this.getConcatenatedMatrix(this._matrix))
    };
    b.tick = b.update;
    b.clear = function() {
        if (!this.canvas) {
            return
        }
        var d = this.canvas.getContext("2d");
        d.setTransform(1, 0, 0, 1, 0, 0);
        d.clearRect(0, 0, this.canvas.width, this.canvas.height)
    };
    b.toDataURL = function(f, l) {
        if (!l) {
            l = "image/png"
        }
        var e = this.canvas.getContext("2d");
        var d = this.canvas.width;
        var g = this.canvas.height;
        var j;
        if (f) {
            j = e.getImageData(0, 0, d, g);
            var i = e.globalCompositeOperation;
            e.globalCompositeOperation = "destination-over";
            e.fillStyle = f;
            e.fillRect(0, 0, d, g)
        }
        var k = this.canvas.toDataURL(l);
        if (f) {
            e.clearRect(0, 0, d, g);
            e.putImageData(j, 0, 0);
            e.globalCompositeOperation = i
        }
        return k
    };
    b.enableMouseOver = function(d) {
        if (this._mouseOverIntervalID) {
            clearInterval(this._mouseOverIntervalID);
            this._mouseOverIntervalID = null
        }
        if (d <= 0) {
            return
        }
        var e = this;
        this._mouseOverIntervalID = setInterval(function() {
            e._testMouseOver()
        },
        1000 / Math.min(50, d));
        this._mouseOverX = NaN;
        this._mouseOverTarget = null
    };
    b.clone = function() {
        var d = new c(null);
        this.cloneProps(d);
        return d
    };
    b.toString = function() {
        return "[Stage (name=" + this.name + ")]"
    };
    b._enableMouseEvents = function() {
        var e = this;
        var d = a.addEventListener ? a: document;
        d.addEventListener("mouseup",
        function(f) {
            e._handleMouseUp(f)
        },
        false);
        d.addEventListener("mousemove",
        function(f) {
            e._handleMouseMove(f)
        },
        false);
        d.addEventListener("dblclick",
        function(f) {
            e._handleDoubleClick(f)
        },
        false);
        this.canvas.addEventListener("mousedown",
        function(f) {
            e._handleMouseDown(f)
        },
        false)
    };
    b._handleMouseMove = function(g) {
        if (!this.canvas) {
            this.mouseX = this.mouseY = null;
            return
        }
        if (!g) {
            g = a.event
        }
        var d = this.mouseInBounds;
        this._updateMousePosition(g.pageX, g.pageY);
        if (!d && !this.mouseInBounds) {
            return
        }
        var f = new MouseEvent("onMouseMove", this.mouseX, this.mouseY, this, g);
        if (this.onMouseMove) {
            this.onMouseMove(f)
        }
        if (this._activeMouseEvent && this._activeMouseEvent.onMouseMove) {
            this._activeMouseEvent.onMouseMove(f)
        }
    };
    b._updateMousePosition = function(e, d) {
        var f = this.canvas;
        do {
            e -= f.offsetLeft;
            d -= f.offsetTop
        } while ( f = f . offsetParent );
        this.mouseInBounds = (e >= 0 && d >= 0 && e < this.canvas.width && d < this.canvas.height);
        if (this.mouseInBounds) {
            this.mouseX = e;
            this.mouseY = d
        }
    };
    b._handleMouseUp = function(f) {
        var d = new MouseEvent("onMouseUp", this.mouseX, this.mouseY, this, f);
        if (this.onMouseUp) {
            this.onMouseUp(d)
        }
        if (this._activeMouseEvent && this._activeMouseEvent.onMouseUp) {
            this._activeMouseEvent.onMouseUp(d)
        }
        if (this._activeMouseTarget && this._activeMouseTarget.onClick && this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true, (this._mouseOverIntervalID ? 3 : 1)) == this._activeMouseTarget) {
            this._activeMouseTarget.onClick(new MouseEvent("onClick", this.mouseX, this.mouseY, this._activeMouseTarget, f))
        }
        this._activeMouseEvent = this._activeMouseTarget = null
    };
    b._handleMouseDown = function(g) {
        if (this.onMouseDown) {
            this.onMouseDown(new MouseEvent("onMouseDown", this.mouseX, this.mouseY, this, g))
        }
        var f = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, (this._mouseOverIntervalID ? 3 : 1));
        if (f) {
            if (f.onPress instanceof Function) {
                var d = new MouseEvent("onPress", this.mouseX, this.mouseY, f, g);
                f.onPress(d);
                if (d.onMouseMove || d.onMouseUp) {
                    this._activeMouseEvent = d
                }
            }
            this._activeMouseTarget = f
        }
    };
    b._testMouseOver = function() {
        if (this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds) {
            return
        }
        var d = null;
        if (this.mouseInBounds) {
            d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3);
            this._mouseOverX = this.mouseX;
            this._mouseOverY = this.mouseY
        }
        if (this._mouseOverTarget != d) {
            if (this._mouseOverTarget && this._mouseOverTarget.onMouseOut) {
                this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOut", this.mouseX, this.mouseY, this._mouseOverTarget))
            }
            if (d && d.onMouseOver) {
                d.onMouseOver(new MouseEvent("onMouseOver", this.mouseX, this.mouseY, d))
            }
            this._mouseOverTarget = d
        }
    };
    b._handleDoubleClick = function(f) {
        if (this.onDoubleClick) {
            this.onDoubleClick(new MouseEvent("onDoubleClick", this.mouseX, this.mouseY, this, f))
        }
        var d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, (this._mouseOverIntervalID ? 3 : 1));
        if (d) {
            if (d.onDoubleClick instanceof Function) {
                d.onDoubleClick(new MouseEvent("onPress", this.mouseX, this.mouseY, d, f))
            }
        }
    };
    a.Stage = c
} (window));
(function(a) {
    var c = function(d) {
        this.initialize(d)
    };
    var b = c.prototype = new DisplayObject();
    b.graphics = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(d) {
        this.DisplayObject_initialize();
        this.graphics = d ? d: new Graphics()
    };
    b.isVisible = function() {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(d, e) {
        if (this.DisplayObject_draw(d, e)) {
            return true
        }
        this.graphics.draw(d);
        return true
    };
    b.clone = function(d) {
        var e = new c((d && this.graphics) ? this.graphics.clone() : this.graphics);
        this.cloneProps(e);
        return e
    };
    b.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    };
    a.Shape = c
} (window));
(function(b) {
    function c(e, g) {
        this.f = e;
        this.params = g
    }
    c.prototype.exec = function(e) {
        this.f.apply(e, this.params)
    };
    var a = function() {
        this.initialize()
    };
    var d = a.prototype;
    a.getRGB = function(h, f, e, i) {
        if (h != null && e == null) {
            i = f;
            e = h & 255;
            f = h >> 8 & 255;
            h = h >> 16 & 255
        }
        if (i == null) {
            return "rgb(" + h + "," + f + "," + e + ")"
        } else {
            return "rgba(" + h + "," + f + "," + e + "," + i + ")"
        }
    };
    a.getHSL = function(e, f, h, g) {
        if (g == null) {
            return "hsl(" + (e % 360) + "," + f + "%," + h + "%)"
        } else {
            return "hsla(" + (e % 360) + "," + f + "%," + h + "%," + g + ")"
        }
    };
    a.STROKE_CAPS_MAP = ["butt", "round", "square"];
    a.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    a._ctx = document.createElement("canvas").getContext("2d");
    a.beginCmd = new c(a._ctx.beginPath, []);
    a.fillCmd = new c(a._ctx.fill, []);
    a.strokeCmd = new c(a._ctx.stroke, []);
    d._strokeInstructions = null;
    d._strokeStyleInstructions = null;
    d._fillInstructions = null;
    d._instructions = null;
    d._oldInstructions = null;
    d._activeInstructions = null;
    d._active = false;
    d._dirty = false;
    d.initialize = function() {
        this.clear();
        this._ctx = a._ctx
    };
    d.draw = function(g) {
        if (this._dirty) {
            this._updateInstructions()
        }
        var f = this._instructions;
        for (var h = 0, e = f.length; h < e; h++) {
            f[h].exec(g)
        }
    };
    d.moveTo = function(e, f) {
        this._activeInstructions.push(new c(this._ctx.moveTo, [e, f]));
        return this
    };
    d.lineTo = function(e, f) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.lineTo, [e, f]));
        return this
    };
    d.arcTo = function(g, i, f, h, e) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.arcTo, [g, i, f, h, e]));
        return this
    };
    d.arc = function(f, j, e, h, g, i) {
        this._dirty = this._active = true;
        if (i == null) {
            i = false
        }
        this._activeInstructions.push(new c(this._ctx.arc, [f, j, e, h, g, i]));
        return this
    };
    d.quadraticCurveTo = function(g, f, e, h) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [g, f, e, h]));
        return this
    };
    d.bezierCurveTo = function(g, f, i, h, e, j) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [g, f, i, h, e, j]));
        return this
    };
    d.rect = function(e, i, f, g) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.rect, [e, i, f, g]));
        return this
    };
    d.closePath = function() {
        if (this._active) {
            this._dirty = true;
            this._activeInstructions.push(new c(this._ctx.closePath, []))
        }
        return this
    };
    d.clear = function() {
        this._instructions = [];
        this._oldInstructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null;
        this._active = this._dirty = false;
        return this
    };
    d.beginFill = function(e) {
        if (this._active) {
            this._newPath()
        }
        this._fillInstructions = e ? [new c(this._setProp, ["fillStyle", e])] : null;
        return this
    };
    d.beginLinearGradientFill = function(e, m, h, p, f, n) {
        if (this._active) {
            this._newPath()
        }
        var g = this._ctx.createLinearGradient(h, p, f, n);
        for (var k = 0, j = e.length; k < j; k++) {
            g.addColorStop(m[k], e[k])
        }
        this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
        return this
    };
    d.beginRadialGradientFill = function(e, p, h, r, k, f, q, j) {
        if (this._active) {
            this._newPath()
        }
        var g = this._ctx.createRadialGradient(h, r, k, f, q, j);
        for (var n = 0, m = e.length; n < m; n++) {
            g.addColorStop(p[n], e[n])
        }
        this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
        return this
    };
    d.beginBitmapFill = function(f, e) {
        if (this._active) {
            this._newPath()
        }
        e = e || "";
        var g = this._ctx.createPattern(f, e);
        this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
        return this
    };
    d.endFill = function() {
        this.beginFill(null);
        return this
    };
    d.setStrokeStyle = function(g, h, e, f) {
        if (this._active) {
            this._newPath()
        }
        this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", (g == null ? "1": g)]), new c(this._setProp, ["lineCap", (h == null ? "butt": (isNaN(h) ? h: a.STROKE_CAPS_MAP[h]))]), new c(this._setProp, ["lineJoin", (e == null ? "miter": (isNaN(e) ? e: a.STROKE_JOINTS_MAP[e]))]), new c(this._setProp, ["miterLimit", (f == null ? "10": f)])];
        return this
    };
    d.beginStroke = function(e) {
        if (this._active) {
            this._newPath()
        }
        this._strokeInstructions = e ? [new c(this._setProp, ["strokeStyle", e])] : null;
        return this
    };
    d.beginLinearGradientStroke = function(e, m, h, p, f, n) {
        if (this._active) {
            this._newPath()
        }
        var g = this._ctx.createLinearGradient(h, p, f, n);
        for (var k = 0, j = e.length; k < j; k++) {
            g.addColorStop(m[k], e[k])
        }
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
        return this
    };
    d.beginRadialGradientStroke = function(e, p, h, r, k, f, q, j) {
        if (this._active) {
            this._newPath()
        }
        var g = this._ctx.createRadialGradient(h, r, k, f, q, j);
        for (var n = 0, m = e.length; n < m; n++) {
            g.addColorStop(p[n], e[n])
        }
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
        return this
    };
    d.beginBitmapStroke = function(f, e) {
        if (this._active) {
            this._newPath()
        }
        e = e || "";
        var g = this._ctx.createPattern(f, e);
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
        return this
    };
    d.endStroke = function() {
        this.beginStroke(null);
        return this
    };
    d.curveTo = d.quadraticCurveTo;
    d.drawRect = d.rect;
    d.drawRoundRect = function(f, j, g, i, e) {
        this.drawRoundRectComplex(f, j, g, i, e, e, e, e);
        return this
    };
    d.drawRoundRectComplex = function(f, m, g, j, l, i, e, k) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new c(this._ctx.moveTo, [f + l, m]), new c(this._ctx.lineTo, [f + g - i, m]), new c(this._ctx.arc, [f + g - i, m + i, i, ( - Math.PI / 2), 0, false]), new c(this._ctx.lineTo, [f + g, m + j - e]), new c(this._ctx.arc, [f + g - e, m + j - e, e, 0, Math.PI / 2, false]), new c(this._ctx.lineTo, [f + k, m + j]), new c(this._ctx.arc, [f + k, m + j - k, k, Math.PI / 2, Math.PI, false]), new c(this._ctx.lineTo, [f, m + l]), new c(this._ctx.arc, [f + l, m + l, l, Math.PI, Math.PI * 3 / 2, false]));
        return this
    };
    d.drawCircle = function(f, g, e) {
        this.arc(f, g, e, 0, Math.PI * 2);
        return this
    };
    d.drawEllipse = function(o, n, p, j) {
        this._dirty = this._active = true;
        var i = 0.5522848;
        var g = (p / 2) * i;
        var e = (j / 2) * i;
        var q = o + p;
        var m = n + j;
        var l = o + p / 2;
        var f = n + j / 2;
        this._activeInstructions.push(new c(this._ctx.moveTo, [o, f]), new c(this._ctx.bezierCurveTo, [o, f - e, l - g, n, l, n]), new c(this._ctx.bezierCurveTo, [l + g, n, q, f - e, q, f]), new c(this._ctx.bezierCurveTo, [q, f + e, l + g, m, l, m]), new c(this._ctx.bezierCurveTo, [l - g, m, o, f + e, o, f]));
        return this
    };
    d.drawPolyStar = function(f, m, e, j, k, l) {
        this._dirty = this._active = true;
        if (k == null) {
            k = 0
        }
        k = 1 - k;
        if (l == null) {
            l = 0
        } else {
            l /= 180 / Math.PI
        }
        var g = Math.PI / j;
        this._activeInstructions.push(new c(this._ctx.moveTo, [f + Math.cos(l) * e, m + Math.sin(l) * e]));
        for (var h = 0; h < j; h++) {
            l += g;
            if (k != 1) {
                this._activeInstructions.push(new c(this._ctx.lineTo, [f + Math.cos(l) * e * k, m + Math.sin(l) * e * k]))
            }
            l += g;
            this._activeInstructions.push(new c(this._ctx.lineTo, [f + Math.cos(l) * e, m + Math.sin(l) * e]))
        }
        return this
    };
    d.clone = function() {
        var e = new a();
        e._instructions = this._instructions.slice();
        e._activeInstructions = this._activeInstructions.slice();
        e._oldInstructions = this._oldInstructions.slice();
        if (this._fillInstructions) {
            e._fillInstructions = this._fillInstructions.slice()
        }
        if (this._strokeInstructions) {
            e._strokeInstructions = this._strokeInstructions.slice()
        }
        if (this._strokeStyleInstructions) {
            e._strokeStyleInstructions = this._strokeStyleInstructions.slice()
        }
        e._active = this._active;
        e._dirty = this._dirty;
        return e
    };
    d.toString = function() {
        return "[Graphics]"
    };
    d.mt = d.moveTo;
    d.lt = d.lineTo;
    d.at = d.arcTo;
    d.bt = d.bezierCurveTo;
    d.qt = d.quadraticCurveTo;
    d.a = d.arc;
    d.r = d.rect;
    d.cp = d.closePath;
    d.c = d.clear;
    d.f = d.beginFill;
    d.lf = d.beginLinearGradientFill;
    d.rf = d.beginRadialGradientFill;
    d.bf = d.beginBitmapFill;
    d.ef = d.endFill;
    d.ss = d.setStrokeStyle;
    d.s = d.beginStroke;
    d.ls = d.beginLinearGradientStroke;
    d.rs = d.beginRadialGradientStroke;
    d.bs = d.beginBitmapStroke;
    d.es = d.endStroke;
    d.dr = d.drawRect;
    d.rr = d.drawRoundRect;
    d.rc = d.drawRoundRectComplex;
    d.dc = d.drawCircle;
    d.de = d.drawEllipse;
    d.dp = d.drawPolyStar;
    d._updateInstructions = function() {
        this._instructions = this._oldInstructions.slice();
        this._instructions.push(a.beginCmd);
        if (this._fillInstructions) {
            this._instructions.push.apply(this._instructions, this._fillInstructions)
        }
        if (this._strokeInstructions) {
            this._instructions.push.apply(this._instructions, this._strokeInstructions);
            if (this._strokeStyleInstructions) {
                this._instructions.push.apply(this._instructions, this._strokeStyleInstructions)
            }
        }
        this._instructions.push.apply(this._instructions, this._activeInstructions);
        if (this._fillInstructions) {
            this._instructions.push(a.fillCmd)
        }
        if (this._strokeInstructions) {
            this._instructions.push(a.strokeCmd)
        }
    };
    d._newPath = function() {
        if (this._dirty) {
            this._updateInstructions()
        }
        this._oldInstructions = this._instructions;
        this._activeInstructions = [];
        this._active = this._dirty = false
    };
    d._setProp = function(e, f) {
        this[e] = f
    };
    b.Graphics = a
} (window));
(function(a) {
    BitmapSequence = function(c) {
        this.initialize(c)
    };
    var b = BitmapSequence.prototype = new DisplayObject();
    b.callback = null;
    b.currentFrame = -1;
    b.waitFrame = 0;
    b.currentWaitFrame = 0;
    b.arrayFrames;
    b.arrayFramesPosition = 0;
    b.nbSequenceToPlay = -1;
    b.nbSequencePlayed = 0;
    b.currentSequence = null;
    b.currentEndFrame = null;
    b.currentStartFrame = null;
    b.nextSequence = null;
    b.paused = false;
    b.spriteSheet = null;
    b.snapToPixel = true;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(c) {
        this.DisplayObject_initialize();
        this.spriteSheet = c
    };
    b.isVisible = function() {
        var c = this.spriteSheet ? this.spriteSheet.image: null;
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && c && this.currentFrame >= 0 && (c.complete || c.getContext)
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(j, c) {
        if (this.DisplayObject_draw(j, c)) {
            return true
        }
        var e = this.spriteSheet.image;
        var h = this.spriteSheet.frameWidth;
        var f = this.spriteSheet.frameHeight;
        var g = e.width / h | 0;
        var l = e.height / f | 0;
        if (this.currentEndFrame != null) {
            if (this.currentFrame > this.currentEndFrame) {
                this.nbSequencePlayed++;
                if (this.nextSequence && (this.nbSequenceToPlay == -1 || this.nbSequenceToPlay > this.nbSequencePlayed)) {
                    this._goto(this.nextSequence)
                } else {
                    this.paused = true;
                    this.currentFrame = this.currentEndFrame;
                    this.nbSequencePlayed = 0
                }
                if (this.callback) {
                    this.callback(this)
                }
            }
        } else {
            var i = this.spriteSheet.totalFrames || g * l;
            if (this.currentFrame >= i) {
                if (this.spriteSheet.loop) {
                    this.currentFrame = 0
                } else {
                    this.currentFrame = i - 1;
                    this.paused = true
                }
                if (this.callback) {
                    this.callback(this)
                }
            }
        }
        if (this.currentFrame >= 0) {
            var d = this.currentFrame % g;
            var k = this.currentFrame / g | 0;
            j.drawImage(e, h * d, f * k, h, f, 0, 0, h, f)
        }
        return true
    };
    b.tick = function() {
        if (this.currentFrame == -1 && this.spriteSheet.frameData) {
            this.paused = true
        }
        if (this.paused) {
            return
        }
        if (this.currentWaitFrame == this.waitFrame) {
            if (this.arrayFrames) {
                if (this.arrayFramesPosition >= this.arrayFrames.length) {
                    this.arrayFramesPosition = 0
                }
                this.currentFrame = this.arrayFrames[this.arrayFramesPosition];
                this.arrayFramesPosition++
            } else {
                this.currentFrame++
            }
            this.currentWaitFrame = 0
        }
        this.currentWaitFrame++
    };
    b.gotoAndPlay = function(c) {
        this.paused = false;
        this._goto(c)
    };
    b.gotoAndStop = function(c) {
        this.paused = true;
        this._goto(c)
    };
    b.clone = function() {
        var c = new BitmapSequence(this.spriteSheet);
        this.cloneProps(c);
        return c
    };
    b.toString = function() {
        return "[BitmapSequence (name=" + this.name + ")]"
    };
    b.DisplayObject_cloneProps = b.cloneProps;
    b.cloneProps = function(c) {
        this.DisplayObject_cloneProps(c);
        c.waitFrame = this.waitFrame;
        c.arrayFrames = this.arrayFrames;
        c.callback = this.callback;
        c.currentFrame = this.currentFrame;
        c.currentStartFrame = this.currentStartFrame;
        c.currentEndFrame = this.currentEndFrame;
        c.currentSequence = this.currentSequence;
        c.nextSequence = this.nextSequence;
        c.paused = this.paused;
        c.frameData = this.frameData
    };
    b._goto = function(c) {
        if (isNaN(c)) {
            if (c == this.currentSequence) {
                this.currentFrame = this.currentStartFrame;
                return
            }
            var d = this.spriteSheet.frameData[c];
            if (d instanceof Array) {
                this.currentFrame = this.currentStartFrame = d[0];
                this.currentSequence = c;
                this.currentEndFrame = d[1];
                if (this.currentEndFrame == null) {
                    this.currentEndFrame = this.currentStartFrame
                }
                if (this.currentEndFrame == null) {
                    this.currentEndFrame = this.currentFrame
                }
                this.nextSequence = d[2];
                if (this.nextSequence == null) {
                    this.nextSequence = this.currentSequence
                } else {
                    if (this.nextSequence == false) {
                        this.nextSequence = null
                    }
                }
            } else {
                this.currentSequence = this.nextSequence = null;
                this.currentEndFrame = this.currentFrame = this.currentStartFrame = d
            }
        } else {
            this.currentSequence = this.nextSequence = this.currentEndFrame = null;
            this.currentStartFrame = 0;
            this.currentFrame = c
        }
    };
    a.BitmapSequence = BitmapSequence
} (window));
(function(b) {
    var a = function(g, d, e, f) {
        this.initialize(g, d, e, f)
    };
    var c = a.prototype;
    c.image = null;
    c.frameWidth = 0;
    c.frameHeight = 0;
    c.frameData = null;
    c.loop = true;
    c.totalFrames = 0;
    c.initialize = function(g, d, e, f) {
        this.image = g;
        this.frameWidth = d;
        this.frameHeight = e;
        this.frameData = f
    };
    c.toString = function() {
        return "[SpriteSheet]"
    };
    c.clone = function() {
        var d = new a(this.image, this.frameWidth, this.frameHeight, this.frameData);
        d.loop = this.loop;
        d.totalFrames = this.totalFrames;
        return d
    };
    b.SpriteSheet = a
} (window));
(function(b) {
    var a = function(f, e, d) {
        this.initialize(f, e, d)
    };
    var c = a.prototype = new DisplayObject();
    a._workingContext = document.createElement("canvas").getContext("2d");
    c.text = "";
    c.font = null;
    c.color = null;
    c.textAlign = null;
    c.textBaseline = null;
    c.maxWidth = null;
    c.outline = false;
    c.lineHeight = null;
    c.lineWidth = null;
    c.DisplayObject_initialize = c.initialize;
    c.initialize = function(f, e, d) {
        this.DisplayObject_initialize();
        this.text = f;
        this.font = e;
        this.color = d ? d: "#000"
    };
    c.isVisible = function() {
        return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text != "")
    };
    c.DisplayObject_draw = c.draw;
    c.draw = function(q, d) {
        if (this.DisplayObject_draw(q, d)) {
            return true
        }
        if (this.outline) {
            q.strokeStyle = this.color
        } else {
            q.fillStyle = this.color
        }
        q.font = this.font;
        q.textAlign = this.textAlign ? this.textAlign: "start";
        q.textBaseline = this.textBaseline ? this.textBaseline: "alphabetic";
        var r = String(this.text).split(/(?:\r\n|\r|\n)/);
        var o = (this.lineHeight == null) ? this.getMeasuredLineHeight() : this.lineHeight;
        var n = 0;
        for (var h = 0, e = r.length; h < e; h++) {
            var p = q.measureText(r[h]).width;
            if (this.lineWidth == null || p < this.lineWidth) {
                this._drawTextLine(q, r[h], n);
                n += o;
                continue
            }
            var m = r[h].split(/(\s)/);
            var k = m[0];
            for (var f = 1, g = m.length; f < g; f += 2) {
                if (q.measureText(k + m[f] + m[f + 1]).width > this.lineWidth) {
                    this._drawTextLine(q, k, n);
                    n += o;
                    k = m[f + 1]
                } else {
                    k += m[f] + m[f + 1]
                }
            }
            this._drawTextLine(q, k, n);
            n += o
        }
        return true
    };
    c.getMeasuredWidth = function() {
        return this._getWorkingContext().measureText(this.text).width
    };
    c.getMeasuredLineHeight = function() {
        return this._getWorkingContext().measureText("M").width * 1.2
    };
    c.clone = function() {
        var d = new a(this.text, this.font, this.color);
        this.cloneProps(d);
        return d
    };
    c.toString = function() {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "...": this.text) + ")]"
    };
    c.DisplayObject_cloneProps = c.cloneProps;
    c.cloneProps = function(d) {
        this.DisplayObject_cloneProps(d);
        d.textAlign = this.textAlign;
        d.textBaseline = this.textBaseline;
        d.maxWidth = this.maxWidth;
        d.outline = this.outline;
        d.lineHeight = this.lineHeight;
        d.lineWidth = this.lineWidth
    };
    c._getWorkingContext = function() {
        var d = a._workingContext;
        d.font = this.font;
        d.textAlign = this.textAlign ? this.textAlign: "start";
        d.textBaseline = this.textBaseline ? this.textBaseline: "alphabetic";
        return d
    };
    c._drawTextLine = function(d, g, h) {
        var e = this;
        if (this.outline) {
            f("strokeText")
        } else {
            f("fillText")
        }
        function f(i) {
            if (e.maxWidth == null) {
                d[i](g, 0, h)
            } else {
                d[i](g, 0, h, e.maxWidth)
            }
        }
    };
    b.Text = a
} (window));
(function(a) {
    var c = function(e, d, g, f) {
        this.initialize(e, d, g, f)
    };
    var b = c.prototype;
    c.identity = null;
    b.color = null;
    b.offsetX = 0;
    b.offsetY = 0;
    b.blur = 0;
    b.initialize = function(e, d, g, f) {
        this.color = e;
        this.offsetX = d;
        this.offsetY = g;
        this.blur = f
    };
    b.toString = function() {
        return "[Shadow]"
    };
    b.clone = function() {
        return new c(this.color, this.offsetX, this.offsetY, this.blur)
    };
    c.identity = new c(null, 0, 0, 0);
    a.Shadow = c
} (window));
(function(b) {
    var a = function(d) {
        this.initialize(d)
    };
    var c = a.prototype = new DisplayObject();
    c.htmlElement = null;
    c._style = null;
    c.DisplayObject_initialize = c.initialize;
    c.initialize = function(d) {
        this.DisplayObject_initialize();
        this.mouseEnabled = false;
        this.htmlElement = d;
        if (d) {
            this._style = d.style;
            this._style.position = "absolute";
            this._style.transformOrigin = this._style.webkitTransformOrigin = this._style.MozTransformOrigin = "0px 0px"
        }
    };
    c.isVisible = function() {
        return this.htmlElement != null
    };
    c.draw = function(d, f) {
        if (this.htmlElement == null) {
            return
        }
        var e = this._matrix;
        var g = this.htmlElement;
        g.style.opacity = "" + e.alpha;
        g.style.visibility = this.visible ? "visible": "hidden";
        g.style.transform = g.style.webkitTransform = g.style.oTransform = ["matrix(" + e.a, e.b, e.c, e.d, e.tx, e.ty + ")"].join(",");
        g.style.MozTransform = ["matrix(" + e.a, e.b, e.c, e.d, e.tx + "px", e.ty + "px)"].join(",");
        return true
    };
    c.cache = function() {};
    c.uncache = function() {};
    c.updateCache = function() {};
    c.hitTest = function() {};
    c.localToGlobal = function() {};
    c.globalToLocal = function() {};
    c.localToLocal = function() {};
    c.clone = function() {
        var d = new a();
        this.cloneProps(d);
        return d
    };
    c.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    };
    c._tick = function() {
        if (this.htmlElement == null) {
            return
        }
        this.htmlElement.style.visibility = "hidden"
    };
    b.DOMElement = a
} (window));
(function(b) {
    var a = function(e, g, f, d) {
        this.initialize(e, g, f, d)
    };
    var c = a.prototype;
    c.x = 0;
    c.y = 0;
    c.width = 0;
    c.height = 0;
    c.initialize = function(e, g, f, d) {
        this.x = (e == null ? 0 : e);
        this.y = (g == null ? 0 : g);
        this.width = (f == null ? 0 : f);
        this.height = (d == null ? 0 : d)
    };
    c.clone = function() {
        return new a(this.x, this.y, this.width, this.height)
    };
    c.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    };
    b.Rectangle = a
} (window));
(function(b) {
    var a = function(d, e) {
        this.initialize(d, e)
    };
    var c = a.prototype;
    c.x = 0;
    c.y = 0;
    c.initialize = function(d, e) {
        this.x = (d == null ? 0 : d);
        this.y = (e == null ? 0 : e)
    };
    c.clone = function() {
        return new a(this.x, this.y)
    };
    c.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    };
    b.Point = a
} (window));
(function(b) {
    var a = function(g, f, e, h, d) {
        this.initialize(g, f, e, h, d)
    };
    var c = a.prototype;
    c.stageX = 0;
    c.stageY = 0;
    c.type = null;
    c.nativeEvent = null;
    c.onMouseMove = null;
    c.onMouseUp = null;
    c.target = null;
    c.initialize = function(g, f, e, h, d) {
        this.type = g;
        this.stageX = f;
        this.stageY = e;
        this.target = h;
        this.nativeEvent = d
    };
    c.clone = function() {
        return new a(this.type, this.stageX, this.stageY, this.target, this.nativeEvent)
    };
    c.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    };
    b.MouseEvent = a
} (window));
(function(b) {
    var a = function() {
        this.initialize()
    };
    var c = a.prototype;
    c.initialize = function() {};
    c.getBounds = function() {
        return new Rectangle(0, 0, 0, 0)
    };
    c.applyFilter = function(f, e, k, h, d, j, i, g) {};
    c.toString = function() {
        return "[Filter]"
    };
    c.clone = function() {
        return new a()
    };
    b.Filter = a
} (window));
(function(b) {
    var a = function(e, d, f) {
        this.initialize(e, d, f)
    };
    var c = a.prototype = new Filter();
    c.initialize = function(e, d, f) {
        if (isNaN(e) || e < 0) {
            e = 0
        }
        this.blurX = e | 0;
        if (isNaN(d) || d < 0) {
            d = 0
        }
        this.blurY = d | 0;
        if (isNaN(f) || f < 1) {
            f = 1
        }
        this.quality = f | 0
    };
    c.blurX = 0;
    c.blurY = 0;
    c.quality = 1;
    c.getBounds = function() {
        return new Rectangle( - this.blurX, -this.blurY, 2 * this.blurX, 2 * this.blurY)
    };
    c.applyFilter = function(w, D, C, d, h, z, U, S) {
        z = z || w;
        if (U = null) {
            U = D
        }
        if (S = null) {
            S = C
        }
        try {
            var I = w.getImageData(D, C, d, h)
        } catch(Q) {
            return false
        }
        var k = this.blurX;
        if (isNaN(k) || k < 0) {
            return false
        }
        k |= 0;
        var j = this.blurY;
        if (isNaN(j) || j < 0) {
            return false
        }
        j |= 0;
        if (k == 0 && j == 0) {
            return false
        }
        var K = this.quality;
        if (isNaN(K) || K < 1) {
            K = 1
        }
        K |= 0;
        if (K > 3) {
            K = 3
        }
        if (K < 1) {
            K = 1
        }
        var o = I.data;
        var n, B, A, q, D, C, L, H, R, P, t, v, s;
        var f = d - 1;
        var O = h - 1;
        var F = k + 1;
        var m = k + F;
        var E = j + 1;
        var l = j + E;
        var J = 1 / (m * l);
        var G = [];
        var N = [];
        var T = [];
        var V = [];
        var u = [];
        var M = [];
        while (K-->0) {
            s = v = 0;
            for (C = 0; C < h; C++) {
                n = o[s] * F;
                B = o[s + 1] * F;
                A = o[s + 2] * F;
                q = o[s + 3] * F;
                for (L = 1; L <= k; L++) {
                    H = s + (((L > f ? f: L)) << 2);
                    n += o[H++];
                    B += o[H++];
                    A += o[H++];
                    q += o[H]
                }
                for (D = 0; D < d; D++) {
                    G[v] = n;
                    N[v] = B;
                    T[v] = A;
                    V[v] = q;
                    if (C == 0) {
                        u[D] = Math.min(D + F, f) << 2;
                        M[D] = Math.max(D - k, 0) << 2
                    }
                    R = s + u[D];
                    P = s + M[D];
                    n += o[R++] - o[P++];
                    B += o[R++] - o[P++];
                    A += o[R++] - o[P++];
                    q += o[R] - o[P];
                    v++
                }
                s += (d << 2)
            }
            for (D = 0; D < d; D++) {
                t = D;
                n = G[t] * E;
                B = N[t] * E;
                A = T[t] * E;
                q = V[t] * E;
                for (L = 1; L <= j; L++) {
                    t += (L > O ? 0 : d);
                    n += G[t];
                    B += N[t];
                    A += T[t];
                    q += V[t]
                }
                v = D << 2;
                for (C = 0; C < h; C++) {
                    o[v] = (n * J + 0.5) | 0;
                    o[v + 1] = (B * J + 0.5) | 0;
                    o[v + 2] = (A * J + 0.5) | 0;
                    o[v + 3] = (q * J + 0.5) | 0;
                    if (D == 0) {
                        u[C] = Math.min(C + E, O) * d;
                        M[C] = Math.max(C - j, 0) * d
                    }
                    R = D + u[C];
                    P = D + M[C];
                    n += G[R] - G[P];
                    B += N[R] - N[P];
                    A += T[R] - T[P];
                    q += V[R] - V[P];
                    v += d << 2
                }
            }
        }
        z.putImageData(I, U, S);
        return true
    };
    c.clone = function() {
        return new a(this.blurX, this.blurY, this.quality)
    };
    c.toString = function() {
        return "[BoxBlurFilter (name=" + this.name + ")]"
    };
    b.BoxBlurFilter = a
} (window));
(function(a) {
    var b = function(e, k, i, j, h, g, d, f) {
        this.initialize(e, k, i, j, h, g, d, f)
    };
    var c = b.prototype = new Filter();
    c.redMultiplier = 1;
    c.greenMultiplier = 1;
    c.blueMultiplier = 1;
    c.alphaMultiplier = 1;
    c.redOffset = 0;
    c.greenOffset = 0;
    c.blueOffset = 0;
    c.alphaOffset = 0;
    c.initialize = function(e, k, i, j, h, g, d, f) {
        this.redMultiplier = e != null ? e: 1;
        this.greenMultiplier = k != null ? k: 1;
        this.blueMultiplier = i != null ? i: 1;
        this.alphaMultiplier = j != null ? j: 1;
        this.redOffset = h || 0;
        this.greenOffset = g || 0;
        this.blueOffset = d || 0;
        this.alphaOffset = f || 0
    };
    c.applyFilter = function(s, q, o, g, r, f, p, n) {
        f = f || s;
        if (p = null) {
            p = q
        }
        if (n = null) {
            n = o
        }
        try {
            var d = s.getImageData(q, o, g, r)
        } catch(m) {
            return false
        }
        var k = d.data;
        var h = k.length;
        for (var j = 0; j < h; j += 4) {
            k[j] = k[j] * this.redMultiplier + this.redOffset;
            k[j + 1] = k[j + 1] * this.greenMultiplier + this.greenOffset;
            k[j + 2] = k[j + 2] * this.blueMultiplier + this.blueOffset;
            k[j + 3] = k[j + 3] * this.alphaMultiplier + this.alphaOffset
        }
        d.data = k;
        f.putImageData(d, p, n);
        return true
    };
    c.toString = function() {
        return "[ColorFilter]"
    };
    c.clone = function() {
        return new b(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
    };
    a.ColorFilter = b
} (window));
(function(b) {
    var a = function(d) {
        this.initialize(d)
    };
    var c = a.prototype = new Filter();
    c.matrix = null;
    c.initialize = function(d) {
        this.matrix = d
    };
    c.applyFilter = function(j, n, m, d, f, k, U, S) {
        k = k || j;
        if (U = null) {
            U = n
        }
        if (S = null) {
            S = m
        }
        try {
            var w = j.getImageData(n, m, d, f)
        } catch(Q) {
            return false
        }
        var R = w.data;
        var F = R.length;
        var q, N, T, V;
        var h = this.matrix;
        var P = h[0],
        O = h[1],
        M = h[2],
        L = h[3],
        I = h[4];
        var G = h[5],
        D = h[6],
        B = h[7],
        z = h[8],
        u = h[9];
        var J = h[10],
        H = h[11],
        E = h[12],
        C = h[13],
        A = h[14];
        var v = h[15],
        t = h[16],
        s = h[17],
        p = h[18],
        o = h[19];
        for (var K = 0; K < F; K += 4) {
            q = R[K];
            N = R[K + 1];
            T = R[K + 2];
            V = R[K + 3];
            R[K] = q * P + N * O + T * M + V * L + I;
            R[K + 1] = q * G + N * D + T * B + V * z + u;
            R[K + 2] = q * J + N * H + T * E + V * C + A;
            R[K + 3] = q * v + N * t + T * s + V * p + o
        }
        w.data = R;
        k.putImageData(w, U, S);
        return true
    };
    c.toString = function() {
        return "[ColorMatrixFilter]"
    };
    c.clone = function() {
        return new a(this.matrix)
    };
    b.ColorMatrixFilter = a
} (window)); // --
Cache = {
    nb_files: 0,
    events_data: {},
    files: {},
    propretiesEvent: {},
    propretiesMap: {},
    graphicsMap: {},
    loadFinish: function() {},
    progressLoad: function() {},
    finishLoad: function() {},
    currentLoad: 0,
    totalLoad: 0,
    path: ""
};
Database = {};
Cache.loadGraphics = function(a, f, g, d) {
    var b = f.charAt(0).toUpperCase() + f.slice(1);
    var j = "Graphics/" + b;
    var c = Cache.get(a, f);
    if (c) {
        h();
        return c
    }
    var e = new Image();
    Cache.nb_files++;
    e.src = Cache.path + j + "/" + a;
    e.filename = a;
    e.onload = function() {
        Cache.nb_files--;
        if (!Cache.files[f]) {
            Cache.files[f] = []
        }
        Cache.files[f].push(e);
        h()
    };
    e.onerror = function() {
        alert("[en] No such file or directory :\n[fr] Impossible de trouver le fichier ou dossier :\n\n" + this.src)
    };
    function h() {
        if (g) {
            if (c) {
                g(c, d)
            } else {
                g(e, d)
            }
        }
        if (Cache.loadFinish && Cache.nb_files == 0) {
            var k = Cache.loadFinish;
            Cache.loadFinish = undefined;
            k()
        }
    }
    return e
};
Cache.get = function(a, c) {
    if (Cache.files[c]) {
        for (var b = 0; b < Cache.files[c].length; b++) {
            if (a == Cache.files[c][b].filename) {
                return Cache.files[c][b]
            }
        }
    }
    return false
};
Cache.tilesets = function(a, c, b) {
    return Cache.loadGraphics(a, "tilesets", c, b)
};
Cache.autotiles = function(a, c, b) {
    return Cache.loadGraphics(a, "autotiles", c, b)
};
Cache.characters = function(a, c, b) {
    return Cache.loadGraphics(a, "characters", c, b)
};
Cache.windowskins = function(a, c, b) {
    return Cache.loadGraphics(a, "windowskins", c, b)
};
Cache.animations = function(a, c, b) {
    return Cache.loadGraphics(a, "animations", c, b)
};
Cache.pictures = function(a, c, b) {
    return Cache.loadGraphics(a, "pictures", c, b)
};
Cache.event = function(c, e, d, b, a) {
    var f;
    if (d) {
        c = d + "/" + c
    }
    f = b ? c: Cache.path + "Data/Events/" + c + ".json";
    if (Cache.propretiesEvent[c] && !a) {
        e(Cache.propretiesEvent[c])
    } else {
        Cache.ajax(f,
        function(g) {
            var h = JSON.parse(g);
            Cache.propretiesEvent[c] = h;
            e(h)
        })
    }
};
Cache.loadAudio = function(b, d, e) {
    if (!b) {
        return false
    }
    var f = "Audio/" + d.toUpperCase();
    var a = new Audio();
    if (typeof b != "string") {
        if (a.canPlayType) {
            if ( !! (a.canPlayType("audio/mpeg;").replace(/no/, ""))) {
                b = b.mp3 + ".mp3"
            } else {
                if ( !! (a.canPlayType('audio/ogg;codecs="vorbis"').replace(/no/, ""))) {
                    b = b.ogg + ".ogg"
                }
            }
            a.src = Cache.path + f + "/" + b
        }
    } else {
        a.src = Cache.path + f + "/" + b
    }
    var c = Cache.get(b, d);
    if (c) {
        e(c);
        return c
    }
    if (!Cache.files[d]) {
        Cache.files[d] = []
    }
    Cache.files[d].push(a);
    if (e) {
        e(a)
    }
};
Cache.audioStop = function(b) {
    if (Cache.files[b]) {
        for (var a = 0; a < Cache.files[b].length; a++) {
            Cache.files[b][a].pause()
        }
    }
};
Cache.SE = function(a, b) {
    return Cache.loadAudio(a, "se", b)
};
Cache.BGM = function(a, b) {
    return Cache.loadAudio(a, "bgm", b)
};
Cache.ME = function(a, b) {
    return Cache.loadAudio(a, "me", b)
};
Cache.BGS = function(a, b) {
    return Cache.loadAudio(a, "bgs", b)
};
Cache.map = function(b, e, a, c) {
    var d = a ? b: Cache.path + "Data/Maps/" + b + ".json";
    if (Cache.propretiesMap[b] && !c) {
        e(Cache.propretiesMap[b])
    } else {
        Cache.ajax(d,
        function(f) {
            var g = JSON.parse(f);
            Cache.propretiesMap[b] = g;
            e(g)
        })
    }
};
Cache.getMapGraphics = function(a, b) {
    if (Cache.graphicsMap[a] && Cache.graphicsMap[a][b]) {
        return Cache.graphicsMap[a][b]
    }
    return false
};
Cache.setMapGraphics = function(b, a) {
    var c;
    if (!Cache.graphicsMap[b]) {
        Cache.graphicsMap[b] = []
    }
    Cache.graphicsMap[b].push(a)
};
Cache.ajax = function(a, g) {
    var f;
    try {
        f = new ActiveXObject("Msxml2.XMLHTTP")
    } catch(d) {
        try {
            f = new ActiveXObject("Microsoft.XMLHTTP")
        } catch(c) {
            try {
                f = new XMLHttpRequest()
            } catch(b) {
                f = false
            }
        }
    }
    f.onreadystatechange = function() {
        if (f.readyState == 4) {
            if (f.status == 200) {
                g(f.responseText)
            }
        }
    };
    f.open("GET", a, true);
    f.send(null)
},
Cache.onload = function(a) {
    Cache.loadFinish = a
};
Cache._progressLoadData = function(b) {
    Cache.currentLoad++;
    var a = Cache.currentLoad * 100 / Cache.totalLoad;
    Cache.progressLoad(Math.round(a * 100) / 100);
    if (Cache.currentLoad == Cache.totalLoad) {
        Cache.finishLoad();
        if (b) {
            b()
        }
        Cache.currentLoad = 0;
        Cache.totalLoad = 0
    }
};
Input = {};
Input.A = 65;
Input.Z = 122;
Input.E = 101;
Input.Q = 113;
Input.Esc = 27;
Input.Enter = 13;
Input.Shift = 16;
Input.Ctrl = 17;
Input.Alt = 18;
Input.Space = 32;
Input.Back = 8;
Input.F1 = 112;
Input.F2 = 113;
Input.F11 = 122;
Input.F12 = 123;
Input.Left = 37;
Input.Up = 38;
Input.Right = 39;
Input.Bottom = 40;
Input.keyBuffer = [];
Input.cacheKeyBuffer = [];
Input._keyFunctions = {};
Input._keyPress = {};
Input._keyType = {};
Input._lock = {};
Input._key = function(b, a, c) {
    if (typeof a == "function") {
        a(b)
    } else {
        if (Input.isPressed(a, b)) {
            c(b)
        }
    }
};
Input.press = function(b, a) {
    Input._press("keyPress", b, a)
};
Input.clearKeys = function(a) {
    Input.press(a,
    function() {})
};
Input.keyDown = function(b, a) {
    Input._press("keyDown", b, a)
};
Input.keyUp = function(b, a) {
    document.onkeyup = function(c) {
        Input._key(c, b, a);
        Input._keyPress[c.which] = 0
    }
};
Input._press = function(f, e, b) {
    if (e instanceof Array) {
        for (var d = 0; d < e.length; d++) {
            c(e[d], f)
        }
    } else {
        c(e, f)
    }
    if (Input._lock.canvas) {
        var a = Input._lock.canvas;
        a.onkeydown = g;
        a.onfocus = function(h) {
            document.onkeydown = function() {
                return false
            };
            if (Input._lock.onFocus) {
                Input._lock.onFocus(h, a)
            }
        };
        a.onblur = function(h) {
            document.onkeydown = null;
            if (Input._lock.onBlur) {
                Input._lock.onBlur(h, a)
            }
        }
    } else {
        document.onkeydown = g
    }
    function g(j) {
        if (!Input._keyPress[j.which]) {
            Input._keyPress[j.which] = 0
        }
        Input._keyPress[j.which]++;
        if (Input._keyPress[j.which] > 1 && Input._keyType[j.which] == "keyPress") {
            return
        }
        for (var h in Input._keyFunctions) {
            Input._key(j, h, Input._keyFunctions[h])
        }
    }
    function c(j, h) {
        Input._keyType[j] = h;
        Input._keyFunctions[j] = b
    }
};
Input.reset = function() {
    Input._keyFunctions = {}
};
Input.lock = function(a, e, b, c) {
    var d = document.getElementById(a.id + "-dom");
    d.setAttribute("tabindex", 1);
    if (e) {
        d.focus();
        document.onkeydown = function() {
            return false
        }
    }
    Input._lock.canvas = d;
    Input._lock.onFocus = b;
    Input._lock.onBlur = c
};
Input.isPressed = function(b, c) {
    if (b instanceof Array) {
        for (var a = 0; a < b.length; a++) {
            if (c.which == b[a]) {
                return true
            }
        }
    } else {
        if (c.which == b) {
            return true
        }
    }
    return false
};
Input.addKey = function(b, a) {
    Input[b] = a
};
Input.memorize = function() {
    Input.cacheKeyBuffer = Input.keyBuffer
};
Input.restore = function() {
    Input.keyBuffer = Input.cacheKeyBuffer
};
Input.trigger = function(c, d, a) {
    var e, b, f;
    if (d == "press") {
        Input.trigger(c, "down");
        Input.trigger(c, "up", a);
        return
    }
    if (Input._lock.canvas) {
        b = Input._lock.canvas
    } else {
        b = document
    }
    if (document.createEventObject) {
        e = document.createEventObject();
        e.keyCode = c;
        b.fireEvent("onkey" + d, e)
    } else {
        if (document.createEvent) {
            e = document.createEvent("Events");
            e.initEvent("key" + d, true, true);
            e.which = c;
            b.dispatchEvent(e)
        }
    }
    if (a) {
        f = document.getElementById(a.id + "-dom");
        f.focus()
    }
};
function Effect(a) {
    if (a instanceof Event) {
        a = a.sprite
    } else {
        if (a instanceof Scene) {
            a = a.content
        } else {
            if (a instanceof Window) {
                a = a.dialog.skin
            }
        }
    }
    this.bitmap = a
}
Effect.prototype = {
    tick: function() {
        this.tickFade();
        this.tickEasing();
        this.tickScale();
        this.tickRotation()
    },
    tickFade: function() {
        var b = this;
        if (this.fade && this.fade.start) {
            var c = this.fade.valueStart;
            var d = this.fade.duration;
            if (this.fade.mode == "out") {
                c -= d
            } else {
                c += d
            }
            if (c < 0) {
                c = 0;
                a()
            } else {
                if (c > 1) {
                    c = 1;
                    a()
                } else {
                    if (this.fade.mode == "out" && c <= this.fade.valueEnd) {
                        c = this.fade.valueEnd;
                        a()
                    } else {
                        if (this.fade.mode == "in" && c >= this.fade.valueEnd) {
                            c = this.fade.valueEnd;
                            a()
                        }
                    }
                }
            }
            this.fade.valueStart = c;
            this.bitmap.alpha = c
        }
        function a() {
            b.fade.start = false;
            if (b.fade.callback) {
                b.fade.callback()
            }
            Ticker.removeListener(b)
        }
    },
    fadeTo: function(b, a, c) {
        this.fading(1, a, b, c)
    },
    fadeStartTo: function(c, b, a, d) {
        this.fading(b, a, c, d)
    },
    fadeIn: function(a, b) {
        this.fading(0, 1, a, b)
    },
    fadeOut: function(a, b) {
        this.fading(1, 0, a, b)
    },
    fading: function(a, d, b, c) {
        this.fade = {};
        this.fade.start = true;
        this.fade.valueStart = a;
        this.fade.valueEnd = d;
        this.fade.mode = a > d ? "out": "in";
        this.fade.duration = Math.abs(d - a) / b;
        this.fade.callback = c;
        Ticker.addListener(this, false)
    },
    tickEasing: function() {
        if (this._easing && this._easing.start) {
            var k = this._easing.beginValue,
            j = this._easing.changeValue,
            h = this._easing.duration,
            n = this._easing.time,
            g = this._easing.endValue,
            m;
            this._easing.time++;
            switch (this._easing.type) {
            case "linear":
                m = j * n / h + k;
                break;
            case "easeInQuad":
                m = j * (n /= h) * n + k;
                break;
            case "easeInOutQuad":
                if ((n /= h / 2) < 1) {
                    return j / 2 * n * n + k
                }
                m = -j / 2 * ((--n) * (n - 2) - 1) + k;
                break;
            case "easeInElastic":
                var o = 1.70158;
                var f = 0;
                var l = j;
                if (n == 0) {
                    return k
                }
                if ((n /= h) == 1) {
                    return k + j
                }
                if (!f) {
                    f = h * 0.3
                }
                if (l < Math.abs(j)) {
                    l = j;
                    var o = f / 4
                } else {
                    var o = f / (2 * Math.PI) * Math.asin(j / l)
                }
                m = -(l * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * h - o) * (2 * Math.PI) / f)) + k;
                break;
            case "easeOutElastic":
                var o = 1.70158;
                var f = 0;
                var l = j;
                if (n == 0) {
                    return k
                }
                if ((n /= h) == 1) {
                    return k + j
                }
                if (!f) {
                    f = h * 0.3
                }
                if (l < Math.abs(j)) {
                    l = j;
                    var o = f / 4
                } else {
                    var o = f / (2 * Math.PI) * Math.asin(j / l)
                }
                m = l * Math.pow(2, -10 * n) * Math.sin((n * h - o) * (2 * Math.PI) / f) + j + k;
                break;
            case "easeOutExpo":
                m = (n == h) ? k + j: j * ( - Math.pow(2, -10 * n / h) + 1) + k;
                break;
            case "easeOutBounce":
                if ((n /= h) < (1 / 2.75)) {
                    m = j * (7.5625 * n * n) + k
                } else {
                    if (n < (2 / 2.75)) {
                        m = j * (7.5625 * (n -= (1.5 / 2.75)) * n + 0.75) + k
                    } else {
                        if (n < (2.5 / 2.75)) {
                            m = j * (7.5625 * (n -= (2.25 / 2.75)) * n + 0.9375) + k
                        } else {
                            m = j * (7.5625 * (n -= (2.625 / 2.75)) * n + 0.984375) + k
                        }
                    }
                }
                break
            }
            if ((k < g && m >= this._easing.endValue) || (k > g && m <= this._easing.endValue)) {
                m = this._easing.endValue;
                this._easing.start = false;
                if (this._easing.callback) {
                    this._easing.callback()
                }
                Ticker.removeListener(this)
            }
            this.bitmap[this._easing.direction] = Math.round(m)
        }
    },
    linear: function(c, a, b, d) {
        this.easing("linear", c, a, b, d)
    },
    easeInOutQuad: function(b, a, c) {
        this.easing("easeInOutQuad", b, a, c)
    },
    easeInQuad: function(b, a, c) {
        this.easing("easeInQuad", b, a, c)
    },
    easeInElastic: function(b, a, c) {
        this.easing("easeInElastic", b, a, c)
    },
    easeOutElastic: function(b, a, c) {
        this.easing("easeOutElastic", b, a, c)
    },
    easeOutBounce: function(b, a, c) {
        this.easing("easeOutBounce", b, a, c)
    },
    easeOutExpo: function(b, a, c) {
        this.easing("easeOutExpo", b, a, c)
    },
    easing: function(b, d, a, c, e) {
        this._easing = {};
        this._easing.time = 0;
        this._easing.start = true;
        this._easing.type = b;
        this._easing.callback = e;
        this._easing.beginValue = this.bitmap[c];
        this._easing.endValue = a;
        this._easing.changeValue = a - this.bitmap[c];
        this._easing.duration = d;
        this._easing.direction = c;
        Ticker.addListener(this, false)
    },
    tickScale: function() {
        var a = this;
        if (this.scale && this.scale.start) {
            var d = this.scale.valueStart;
            var c = this.scale.duration;
            if (this.scale.mode == "out") {
                d -= c
            } else {
                d += c
            }
            if (this.scale.mode == "out" && d <= this.scale.valueEnd) {
                d = this.scale.valueEnd;
                b()
            } else {
                if (this.scale.mode == "in" && d >= this.scale.valueEnd) {
                    d = this.scale.valueEnd;
                    b()
                }
            }
            this.scale.valueStart = d;
            this.bitmap["scale" + this.scale.direction.toUpperCase()] = d
        }
        function b() {
            a.scale.start = false;
            if (a.scale.callback) {
                a.scale.callback()
            }
            Ticker.removeListener(a)
        }
    },
    scaling: function(c, a, b, d) {
        this.scale = {};
        this.scale.start = true;
        this.scale.direction = b;
        this.scale.valueStart = this.bitmap["scale" + b.toUpperCase()];
        this.scale.valueEnd = a / 100;
        this.scale.mode = this.scale.valueStart > this.scale.valueEnd ? "out": "in";
        this.scale.duration = Math.abs(this.scale.valueEnd - this.scale.valueStart) / c;
        this.scale.callback = d;
        Ticker.addListener(this, false)
    },
    tickRotation: function() {
        var a = this;
        var b;
        if (this.rotation && this.rotation.start) {
            b = this.rotation.valueStart;
            var d = this.rotation.duration;
            if (b < 0) {
                b -= d
            } else {
                b += d
            }
            b = Math.round(b);
            if (b < 0 && b <= this.rotation.valueEnd) {
                c()
            } else {
                if (b > 0 && b >= this.rotation.valueEnd) {
                    c()
                }
            }
            this.rotation.valueStart = b;
            this.bitmap.rotation = b
        }
        function c() {
            b = a.rotation.valueEnd;
            if (b >= 360) {
                b = 0
            }
            a.bitmap.rotation = b;
            a.rotation.start = false;
            Ticker.removeListener(a);
            if (a.rotation.callback) {
                a.rotation.callback()
            }
        }
    },
    rotate: function(b, a, c) {
        this.rotation = {};
        this.rotation.start = true;
        this.rotation.valueStart = this.bitmap.rotation;
        this.rotation.valueEnd = a;
        this.rotation.duration = Math.abs(this.bitmap.rotation - a) / b;
        this.rotation.callback = c;
        Ticker.addListener(this, false)
    },
};
function Interpreter(a) {
    this.currentCmd = 0;
    this.indent = 0;
    this.ignoreElse = [];
    this.preprogrammedCommands()
}
Interpreter.commandFunction = {};
Interpreter.setCommand = function(b, a) {
    Interpreter.commandFunction[b] = a
};
Interpreter.addCommand = Interpreter.setCommand;
Interpreter.prototype = {
    preprogrammedCommands: function() {
        var a = {
            CHANGE_GOLD: this.cmdChangeGold,
            SHOW_TEXT: this.cmdShowText,
            ERASE_EVENT: this.cmdErase,
            TRANSFERT_PLAYER: this.cmdTransferPlayer,
            PLAY_SE: this.cmdPlaySE,
            BLINK: this.cmdBlink,
            CALL: this.cmdCall,
            SHOW_ANIMATION: this.cmdShowAnimation,
            MOVE_ROUTE: this.cmdMoveRoute,
            SELF_SWITCH_ON: this.cmdSelfSwitches,
            SELF_SWITCH_OFF: this.cmdSelfSwitches,
            SWITCHES_ON: this.cmdSwitches,
            SWITCHES_OFF: this.cmdSwitches,
            SCREEN_FLASH: this.cmdScreenFlash,
            SCREEN_TONE_COLOR: this.cmdScreenColorTone,
            SCREEN_SHAKE: this.cmdScreenShake,
            VARIABLE: this.cmdVariables,
            SET_EVENT_LOCATION: this.cmdSetEventLocation,
            SCROLL_MAP: this.cmdScrollMap,
            PLAY_BGM: this.cmdPlayBGM,
            CHANGE_ITEMS: this.cmdChangeItems,
            CHANGE_LEVEL: this.cmdChangeLevel,
            CHANGE_EXP: this.cmdChangeEXP,
            CHANGE_STATE: this.cmdChangeState,
            CHANGE_CLASS: this.cmdChangeClass,
            CHANGE_SKILLS: this.cmdChangeSkills,
            SHOW_PICTURE: this.cmdShowPicture,
            MOVE_PICTURE: this.cmdMovePicture,
            ROTATE_PICTURE: this.cmdRotatePicture,
            ERASE_PICTURE: this.cmdErasePicture,
            CHANGE_WINDOWSKIN: this.cmdChangeWindowskin,
            DETECTION_EVENTS: this.cmdDetectionEvents,
            WAIT: this.cmdWait,
            IF: this.cmdIf,
            ELSE: this.cmdElse
        };
        for (var b in a) {
            Interpreter.addCommand(b, a[b])
        }
    },
    getNextCommand: function() {
        return this.getCommand(this.currentCmd + 1)
    },
    getPrevCommand: function() {
        return this.getCommand(this.currentCmd - 1)
    },
    getCurrentCommand: function() {
        return this.getCommand(this.currentCmd)
    },
    getCommand: function(b) {
        var a = this._command(b);
        if (a) {
            return {
                name: a.name,
                params: a.params
            }
        }
        return false
    },
    _command: function(g) {
        var e = this.commands[g];
        if (e) {
            try {
                var d = /^([A-Z0-9a-z!?_]+):(.+)$/.exec(e);
                if (d != null) {
                    var c = d[1];
                    var f = d[2];
                    var a = Interpreter.commandFunction[c];
                    if (a) {
                        if (f) {
                            f = f.replace(/'/g, '"');
                            f = JSON.parse(f);
                            return {
                                name: c,
                                params: f,
                                callback: a
                            }
                        } else {
                            throw c + " => Settings not found"
                        }
                    } else {
                        throw c + " => Event commands nonexistent"
                    }
                } else {
                    if (e == "ELSE" || e == "ENDIF") {
                        return {
                            name: e
                        }
                    } else {
                        throw '"' + e + '" => Invalid command'
                    }
                }
            } catch(b) {
                if (/ILLEGAL$/.test(b)) {
                    b = '"' + e + '" => Invalid parameters'
                }
                alert(b)
            }
        }
        return false
    },
    onCommands: function() {
        var a = this._command(this.currentCmd);
        if (a) {
            a.callback(a.params, this, a.name)
        } else {
            this.currentCmd = 0;
            this.call("onFinishCommand");
            if (this.trigger == "parallel_process" || this.trigger == "auto") {
                if (this.rpg.getEventById(this.id) != null) {
                    this.onCommands()
                }
            }
        }
    },
    nextCommand: function() {
        this.currentCmd++;
        this.onCommands()
    },
    cmdShowText: function(b, j) {
        var c = j.getPrevCommand();
        var a = j.getNextCommand();
        var g = b.text;
        var f = /%V\[([0-9]+)\]/g;
        var d = f.exec(g);
        while (d != null) {
            g = g.replace(d[0], j.rpg.getVariable(d[1]));
            d = f.exec(g)
        }
        g = j.rpg.toLang(g);
        var e = j.dialog ? j.dialog: new Scene_Dialog(j.rpg);
        e.window.clear();
        e.window.drawText(20, 30, g, "18px Arial", "#FFF");
        e.onExit = function() {
            j.nextCommand()
        };
        var h = [Input.Space, Input.Enter];
        Input.press(h,
        function(k) {
            if (a.name != "SHOW_TEXT") {
                Input.clearKeys(h);
                new Effect(e.content).fadeOut(5,
                function() {
                    e.exit();
                    delete j.dialog
                })
            } else {
                j.dialog = e;
                j.nextCommand()
            }
        })
    },
    cmdErase: function(b, a) {
        a.rpg.removeEvent(a.id);
        a.nextCommand()
    },
    cmdSwitches: function(c, a, b) {
        a.rpg.setSwitches(c, b == "SWITCHES_ON");
        a.nextCommand()
    },
    cmdSelfSwitches: function(a, b, c) {
        b.setSelfSwitch(a, c == "SELF_SWITCH_ON");
        b.nextCommand()
    },
    cmdChangeGold: function(a, b) {
        b.rpg.changeGold(a);
        b.nextCommand()
    },
    cmdMoveRoute: function(c, b) {
        var a = -1;
        b.nextCommand();
        d();
        function d() {
            a++;
            if (c[a] !== undefined) {
                switch (c[a]) {
                case 2:
                case 4:
                case 6:
                case 8:
                case "up":
                case "left":
                case "right":
                case "bottom":
                    b.move(c,
                    function() {
                        d()
                    },
                    true);
                    break;
                case "step_backward":
                    b.moveAwayFromPlayer(function() {
                        d()
                    },
                    true);
                    break
                }
            } else {
                b.animation("stop")
            }
        }
    },
    cmdShowAnimation: function(b, a) {
        b.target;
        if (a.rpg.animations[b.name]) {
            var c = a._target(b.target);
            if (b.zoom) {
                a.rpg.animations[b.name].setZoom(b.zoom)
            }
            a.rpg.animations[b.name].setPositionEvent(c);
            if (b.wait) {
                a.rpg.animations[b.name].play(d)
            } else {
                a.rpg.animations[b.name].play()
            }
        }
        if (!b.wait) {
            d()
        }
        function d() {
            a.nextCommand()
        }
    },
    cmdTransferPlayer: function(c, b) {
        var a = b.rpg.getPreparedMap(c.name);
        if (a) {
            if (!a.propreties.player) {
                a.propreties.player = {}
            }
            a.propreties.player.x = c.x;
            a.propreties.player.y = c.y;
            b.rpg.callMap(c.name)
        }
        b.nextCommand()
    },
    cmdPlaySE: function(b, a) {
        var a = a;
        a.rpg.playSE(b.filename,
        function() {
            a.nextCommand()
        })
    },
    cmdBlink: function(c, a) {
        var b = a._target(c.target);
        if (c.wait) {
            b.blink(c.duration, c.frequence, a.nextCommand)
        } else {
            b.blink(c.duration, c.frequence);
            a.nextCommand()
        }
    },
    cmdCall: function(b, a) {
        a.rpg.call("eventCall_" + b, a);
        a.nextCommand()
    },
    cmdScreenFlash: function(c, a) {
        function b() {
            a.nextCommand()
        }
        var d = c.wait ? b: false;
        a.rpg.screenFlash(c.color, c.speed, d);
        if (!d) {
            b()
        }
    },
    cmdScreenColorTone: function(c, a) {
        function b() {
            a.nextCommand()
        }
        var d = c.wait ? b: false;
        a.rpg.changeScreenColorTone(c.color, c.speed, c.composite, c.opacity, d);
        if (!d) {
            b()
        }
    },
    cmdScreenShake: function(c, a) {
        function b() {
            a.nextCommand()
        }
        var d = c.wait ? b: false;
        a.rpg.screenShake(c.power, c.speed, c.duration, c.axis, d);
        if (!d) {
            b()
        }
    },
    cmdVariables: function(d, c) {
        var a = d.operand;
        var b;
        if (typeof a == "object") {
            if (a instanceof Array) {
                b = Math.floor(Math.random() * (a[1] - a[0])) + a[0]
            } else {
                if (a.variable !== undefined) {
                    b = c.rpg.getVariable(a.variable)
                }
            }
        } else {
            b = a
        }
        c.rpg.setVariable(d.id, b, d.operation);
        c.nextCommand()
    },
    cmdSetEventLocation: function(d, b) {
        var c = b._target(d.event);
        var a, e;
        if (d.appointement) {
            a = d.appointement[0];
            e = d.appointement[1]
        } else {
            if (d.variables) {
                a = b.rpg.getVariable(d.variables[0]);
                e = b.rpg.getVariable(d.variables[1])
            }
        }
        if (d.direction) {
            c.direction = d.direction
        }
        c.setPosition(a, e);
        b.nextCommand()
    },
    cmdScrollMap: function(b, a) {
        a.rpg.scroll(b.x, b.y);
        a.nextCommand()
    },
    cmdWait: function(b, a) {
        a.wait(b.frame, b.block,
        function() {
            a.nextCommand()
        })
    },
    cmdPlayBGM: function(b, a) {
        a.rpg.playBGM(b,
        function() {
            a.nextCommand()
        })
    },
    cmdChangeItems: function(e, c) {
        var a, b, d;
        a = c._getValue(e);
        for (d = 0; d < Math.abs(a); d++) {
            if (a < 0) {
                c.rpg.addItem(Database.items[e.name])
            } else {
                c.rpg.removeItem(Database.items[e.name])
            }
        }
        c.nextCommand()
    },
    cmdChangeLevel: function(d, b) {
        var c = b._target(param.event);
        var a = b._getValue(d);
        c.setLevel(c.currentLevel + a);
        b.nextCommand()
    },
    cmdChangeEXP: function(d, b) {
        var c = b._target(param.event);
        var a = b._getValue(d);
        c.addExp(a);
        b.nextCommand()
    },
    cmdChangeState: function(d, a) {
        var c = a._target(param.event);
        var b = param.name;
        if (param.operation == "add") {
            c.addState(b)
        } else {
            c.removeState(b)
        }
        a.nextCommand()
    },
    cmdChangeClass: function(c, a) {
        var b = a._target(param.event);
        b.setClass(param.name);
        a.nextCommand()
    },
    cmdChangeSkills: function(d, a) {
        var c = a._target(param.event);
        var b = param.name;
        if (param.operation == "learn") {
            c.learnSkill(b)
        } else {
            c.removeSkill(b)
        }
        a.nextCommand()
    },
    _valuePicture: function(a) {
        if (a.variables) {
            a.x = self.rpg.getVariable(a.variables.x);
            a.y = self.rpg.getVariable(a.variables.y)
        } else {
            a.x = a.constants.x;
            a.y = a.constants.y
        }
        return a
    },
    cmdShowPicture: function(b, a) {
        b = _valuePicture(b);
        a.rpg.addPicture(b.id, b.filename, b,
        function() {
            a.nextCommand()
        })
    },
    cmdMovePicture: function(b, a) {
        b = _valuePicture(b);
        a.rpg.movePicture(b.id, b.duration, b);
        a.nextCommand()
    },
    cmdRotatePicture: function(d, a) {
        var c = typeof d.value == "number" && d.wait;
        a.rpg.rotatePicture(d.id, d.duration, d.value, c ? b() : false);
        if (!c) {
            b()
        }
        function b() {
            a.nextCommand()
        }
    },
    cmdErasePicture: function(b, a) {
        a.rpg.erasePicture(b);
        a.nextCommand()
    },
    cmdChangeWindowskin: function(b, a) {
        a.rpg.windowskinDefault = b;
        a.nextCommand()
    },
    cmdDetectionEvents: function(b, a) {
        a.detectionEvents(b.area, b.label);
        a.nextCommand()
    },
    cmdIf: function(c, b) {
        var d = c.condition || "equal";
        var a = false;
        if (c["switch"]) {
            a = b.rpg.switchesIsOn(c["switch"])
        }
        b.ignoreElse.push(b.indent);
        if (a) {
            b.nextCommand()
        } else {}
    },
    cmdElse: function(b, a) {
        var c;
        if (a.rpg.valueExist(a.ignoreElse, a.indent)) {
            a.currentCmd = a._nextRealPos()
        }
        a.nextCommand()
    },
    _nextRealPos: function() {
        var d = self.currentCmd + 1;
        var b = true;
        var c, a = self.indent
    },
    _getValue: function(b) {
        var a;
        if (b.variable) {
            a = self.rpg.getVariable(b.variable)
        } else {
            a = b.constant
        }
        return a
    },
    _target: function(b) {
        var a = this;
        if (b) {
            if (b == "Player") {
                a = this.rpg.player
            } else {
                a = this.rpg.getEventByName(b)
            }
        }
        return a
    }
};
function Animation(b, a) {
    this.frames = b.frames;
    this.graphic = b.graphic;
    this.name = b.name;
    this.file_sound = b.sound;
    this.framesDefault = {};
    this.sound;
    this.bitmap;
    this.sprite;
    this.playing = false;
    this.currentSequence = 0;
    this.rpg = a;
    this.onFinish;
    this.pattern_w = this.rpg.propAnimations.pattern_w;
    this.pattern_h = this.rpg.propAnimations.pattern_h;
    this.initialize(b)
}
Animation.prototype = {
    initialize: function(d) {
        var a = this;
        var c = {
            y: 0,
            x: 0,
            zoom: 100,
            opacity: 255,
            rotation: 0,
            opacity: 255
        };
        for (var b in c) {
            if (d.framesDefault && d.framesDefault[b] !== undefined) {
                this.framesDefault[b] = d.framesDefault[b]
            } else {
                this.framesDefault[b] = c[b]
            }
        }
        Ticker.addListener(this);
        this.sprite = new Container();
        Cache.SE(this.file_sound,
        function(e) {
            a.sound = e
        });
        Cache.animations(this.graphic,
        function(f) {
            var e = new SpriteSheet(f, a.pattern_w, a.pattern_h);
            a.bitmap = new BitmapSequence(e)
        })
    },
    tick: function() {
        var c;
        var a;
        var b = this.bitmap;
        if (this.playing) {
            if (this.frames[this.currentSequence] != undefined) {
                this.sprite.removeAllChildren();
                for (a = 0; a < this.frames[this.currentSequence].length; a++) {
                    c = this.frames[this.currentSequence][a];
                    if (c) {
                        b.currentFrame = c.pattern - 1;
                        b.x = c.x != undefined ? c.x: this.framesDefault.x;
                        b.y = c.y != undefined ? c.y: this.framesDefault.y;
                        b.scaleX = c.zoom != undefined ? c.zoom / 100 : this.framesDefault.zoom / 100;
                        b.scaleY = c.zoom != undefined ? c.zoom / 100 : this.framesDefault.zoom / 100;
                        b.alpha = c.opacity != undefined ? c.opacity / 255 : this.framesDefault.opacity / 255;
                        b.rotation = c.rotation != undefined ? c.rotation: this.framesDefault.rotation;
                        b.regX = this.pattern_w / 2;
                        b.regY = this.pattern_h / 2;
                        this.sprite.addChild(b);
                        b = b.clone()
                    }
                }
                this.currentSequence++
            } else {
                this.currentSequence = 0;
                this.playing = false;
                this.rpg.layer[7].removeChild(this.sprite);
                if (this.onFinish != undefined) {
                    this.onFinish()
                }
            }
            if (this.fix) {
                this.setPosition(this.fix.sprite.x, this.fix.sprite.y, true)
            }
        }
    },
    play: function(a) {
        this.playing = true;
        if (this.sound != undefined) {
            this.sound.volume = this.rpg.soundVolume.se;
            this.sound.play()
        }
        this.onFinish = a;
        this.rpg.layer[7].addChild(this.sprite)
    },
    setPosition: function(a, c, b) {
        this.sprite.x = a * (b ? 1 : this.rpg.tile_w);
        this.sprite.y = c * (b ? 1 : this.rpg.tile_h)
    },
    setPositionEvent: function(a) {
        this.setPosition(a.sprite.x, a.sprite.y, true);
        this.fix = a
    },
    setZoom: function(a) {
        this.sprite.scaleX = a;
        this.sprite.scaleY = a
    }
};
function Rpg(a) {
    this.canvas = document.getElementById(a);
    this.ctx = this.canvas.getContext("2d");
    this.stage = new Stage(this.canvas);
    this.func_trigger = {};
    this.currentLang;
    this.maps = [];
    this.currentMapInfo = {};
    this.isometric = false;
    this.currentMap = [[]];
    this.containerMap = {
        x: 0,
        y: 0
    };
    this.layer = [];
    this.tile_w = 32;
    this.tile_h = 32;
    this.speedScrolling = 4;
    this.screen_x = 0;
    this.screen_y = 0;
    this.screen_refresh = {};
    this.htmlElements = [];
    this.onMouseEvent = {};
    this.events = [];
    this.eventsCache = [];
    this.typeDirection = "normal";
    this.switches = {};
    this.variables = {};
    this.items = {};
    this.skills = {};
    this.player;
    this.gold = 0;
    this.pictures = {};
    this.propAnimations = {};
    this.animations = {};
    this._battleFormulas = {};
    this.currentSound = {
        bgm: "",
        bgs: "",
        me: "",
        se: ""
    };
    this.soundVolume = {
        bgm: 1,
        bgs: 1,
        me: 1,
        se: 1
    };
    this.windowskinDefault = "001-Blue01.png";
    this.currentWindows = [];
    this.actions = {};
    this.tacticalMap = [];
    this.initialize()
}
Rpg.debug = false;
Rpg.mobileUserAgent = function() {
    var a = navigator.userAgent;
    if (a.match(/(iPhone)/)) {
        return "iphone"
    } else {
        if (a.match(/(iPod)/)) {
            return "ipod"
        } else {
            if (a.match(/(iPad)/)) {
                return "ipad"
            } else {
                if (a.match(/(BlackBerry)/)) {
                    return "blackberry"
                } else {
                    if (a.match(/(Android)/)) {
                        return "android"
                    } else {
                        if (a.match(/(Windows Phone)/)) {
                            return "windows phone"
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
};
Rpg.isArray = function(b) {
    return (typeof(b) === "object") ? b.constructor.toString().match(/array/i) !== null || b.length !== undefined: false
};
Rpg.keyExist = function(b, c) {
    if (Rpg.isArray(c)) {
        return b[c[0]] && b[c[0]][c[1]]
    } else {
        return b[c]
    }
};
Rpg.valueExist = function(c, f) {
    var b, e, d;
    for (e = 0; e < c.length; e++) {
        if (Rpg.isArray(f)) {
            b = true;
            for (d = 0; d < c[e].length; d++) {
                if (c[e][d] != f[d]) {
                    b = false
                }
            }
            if (b) {
                return e
            }
        } else {
            if (c[e] == f) {
                return e
            }
        }
    }
    return false
};
Rpg.unsetArrayElement = function(d, b) {
    var c = Rpg.valueExist(d, b);
    var a = d.length - 1;
    if (c !== false) {
        if (c == 0) {
            d.shift()
        } else {
            if (c == a) {
                d.pop()
            } else {
                d.splice(c, 1)
            }
        }
    }
    return d
};
Rpg.endArray = function(a) {
    return a[a.length - 1]
};
Rpg.prototype = {
    initialize: function() {
        if (Rpg.debug) {
            this.fpsLabel = new Text("-- fps", "Bold 18px Arial", "#FFF");
            this.stage.addChild(this.fpsLabel);
            this.fpsLabel.x = 10;
            this.fpsLabel.y = 20
        }
        this.setFPS(25);
        var a = new Container();
        var c = this.canvas.id + "-dom";
        div = document.createElement("div");
        div.setAttribute("id", c);
        div.style.position = "absolute";
        div.style.overflow = "hidden";
        if (!document.head) {
            document.head = document.getElementsByTagName("head")[0]
        }
        document.head.appendChild(document.createElement("style"));
        var b = Rpg.endArray(document.styleSheets);
        b.insertRule("#" + c + " {-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}", b.cssRules.length);
        div.style.left = Math.round(this.canvas.offsetLeft) + "px";
        div.style.top = Math.round(this.canvas.offsetTop) + "px";
        div.style.width = this.canvas.width + "px";
        div.style.height = this.canvas.height + "px";
        if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
            div.style.backgroundColor = "rgba(0, 0, 0, 0)"
        }
        document.body.appendChild(div);
        this._setMouseEvent(div);
        Ticker.addListener(this)
    },
    setScrolling: function(a) {
        this.speedScrolling = a
    },
    setFPS: function(a) {
        this.fps = a;
        Ticker.setFPS(a)
    },
    mapFreeze: function(a) {
        Ticker.setPaused(a)
    },
    eventsRefresh: function() {
        var a;
        for (a = 0; a < this.events.length; a++) {
            this.events[a].refresh()
        }
    },
    setGraphicAnimation: function(b, a) {
        this.propAnimations.pattern_w = b;
        this.propAnimations.pattern_h = a
    },
    addAnimation: function(a) {
        this.animations[a.name] = new Animation(a, this)
    },
    setSwitches: function(b, a) {
        this._setDataValue("switches", b, a)
    },
    setVariable: function(e, a, b) {
        var d, c;
        if (typeof e == "number") {
            e = [e]
        }
        for (d = 0; d < e.length; d++) {
            c = this.getVariable(e[d]);
            switch (b) {
            case "add":
                c += a;
                break;
            case "sub":
                c -= a;
                break;
            case "mul":
                c *= a;
                break;
            case "div":
                c /= a;
                break;
            case "mod":
                c %= a;
                break;
            default:
                c = a
            }
            this._setDataValue("variables", e[d], c);
            this.call("changeVariable", e[d])
        }
    },
    getVariable: function(a) {
        var b = this.variables[a];
        if (b === undefined) {
            b = 0
        }
        return b
    },
    _setDataValue: function(c, b, d) {
        var a;
        var e = c == "variables" ? this.variables: this.switches;
        if (Rpg.isArray(b)) {
            for (a = 0; a < b.length; a++) {
                e[b[a]] = d
            }
        } else {
            e[b] = d
        }
        this.eventsRefresh()
    },
    _sortEventsDepthIndex: function() {
        this.layer[3].sortChildren(function(d, c) {
            var f = d.z !== false ? d.z: d.y;
            var e = c.z !== false ? c.z: c.y;
            return f - e
        })
    },
    switchesIsOn: function(b) {
        var a;
        if (Rpg.isArray(b)) {
            for (a = 0; a < b.length; a++) {
                if (!this.switches[b[a]]) {
                    return false
                }
            }
        } else {
            if (!this.switches[b]) {
                return false
            }
        }
        return true
    },
    setActionBattle: function(c) {
        var b;
        this.actionBattle = c;
        this.actionBattle.ennemy = [];
        for (b = 0; b < this.events.length; b++) {
            if (this.events[b].actionBattle) {
                this.actionBattle.ennemy.push(this.events[b])
            }
        }
        if (c.displayHpBar) {
            var a;
            for (b = 0; b < this.actionBattle.ennemy.length; b++) {
                a = this.actionBattle.ennemy[b];
                a.displayBar(a.actionBattle.hp_max, a.actionBattle.hp_max, 70, 5)
            }
        }
        if (c.eventsCache) {
            for (b = 0; b < c.eventsCache.length; b++) {
                this.prepareEventAjax(c.eventsCache[b])
            }
        }
    },
    setTactical: function(g) {
        var d, b;
        this.tactical = g;
        this.tactical.event_selected = null;
        var a = this;
        this.stage.enableMouseOver();
        var c = new Audio("Audio/SE/" + g.sound_hover_area);
        this.tactical.players = [];
        this.tactical.ai = [];
        for (d = 0; d < this.events.length; d++) {
            if (this.events[d].tactical != undefined) {
                var e = this.events[d].tactical.play;
                if (e == "player") {
                    this.tactical.players.push(this.events[d])
                } else {
                    if (e == "ai") {
                        this.tactical.ai.push(this.events[d])
                    }
                }
            }
        }
        var f = new Image();
        f.src = "Graphics/Pictures/" + g.actor_area;
        f.onload = function() {
            var l = new Bitmap(f);
            var h = 0;
            for (d = 0; d < a.currentMap.length; d++) {
                a.tacticalMap[d] = [];
                for (b = 0; b < a.currentMap[0].length; b++) {
                    l.name = "area_actor";
                    l.x = d * a.tile_w;
                    l.y = b * a.tile_h;
                    l.visible = false;
                    l.onMouseOver = function() {
                        c.play()
                    };
                    a.tacticalMap[d][b] = l;
                    a.layer[7].addChild(l);
                    if (h < a.currentMap.length * a.currentMap[0].length) {
                        l = l.clone()
                    }
                    h++
                }
            }
            if (a.tactical.displayHpBar) {
                var j;
                for (d = 0; d < a.tactical.players.length; d++) {
                    j = a.tactical.players[d];
                    j.displayBar(j.tactical.hp_max, j.tactical.hp_max, 70, 5)
                }
            }
        }
    },
    tacticalAreaClear: function() {
        var b, a;
        for (b = 0; b < this.tacticalMap.length; b++) {
            for (a = 0; a < this.tacticalMap[0].length; a++) {
                this.tacticalMap[b][a].visible = false
            }
        }
    },
    isTactical: function() {
        return this.tactical != undefined
    },
    changeGold: function(a) {
        this.gold += a;
        this.call("changeGold", a)
    },
    getMapWidth: function(a) {
        return this.currentMap.length * (a ? this.tile_w: 1)
    },
    getMapHeight: function(a) {
        return this.currentMap[0].length * (a ? this.tile_h: 1)
    },
    scroll: function(a, b) {
        this.screen_x = a * this.tile_w;
        this.screen_y = b * this.tile_h
    },
    setScreen: function(a, b) {
        this.setCamera(a, b)
    },
    setCamera: function(g, f) {
        var c;
        var h;
        var b = g * this.tile_w;
        var a = f * this.tile_h;
        if (b <= this.canvas.width / 2) {
            c = 0
        } else {
            if (b + this.canvas.width / 2 >= this.getMapWidth(true)) {
                c = -(this.getMapWidth(true) - this.canvas.width)
            } else {
                c = -(b - this.canvas.width / 2 + (this.canvas.width / 2 % this.tile_w))
            }
        }
        if (a <= this.canvas.height / 2) {
            h = 0
        } else {
            if (a + this.canvas.height / 2 >= this.getMapHeight(true)) {
                h = -(this.getMapHeight(true) - this.canvas.height)
            } else {
                h = -(a - this.canvas.height / 2 + (this.canvas.height / 2 % this.tile_h))
            }
        }
        this.containerMap.x = c;
        this.containerMap.y = h;
        var j = this.tile_w / this.speedScrolling;
        var e = this.tile_h / this.speedScrolling;
        this.containerMap.x = Math.floor(this.containerMap.x / j) * j;
        this.containerMap.y = Math.floor(this.containerMap.y / e) * e;
        this.screen_x = Math.abs(this.containerMap.x);
        this.screen_y = Math.abs(this.containerMap.y);
        this.screen_refresh.x = this.screen_x;
        this.screen_refresh.y = this.screen_y;
        this.screen_refresh.scroll_y = false;
        this.screen_refresh.scroll_x = false;
        var d = this._multipleScreen(this.screen_x, this.screen_y);
        this.screen_x = d.x;
        this.screen_y = d.y;
        this.call("setScreen", {
            x: g,
            y: f
        });
        this._sortEventsDepthIndex();
        this.refreshMap(true)
    },
    _multipleScreen: function(a, d) {
        var c = this.tile_w / this.speedScrolling;
        var b = this.tile_h / this.speedScrolling;
        a = Math.floor(a / c) * c;
        d = Math.floor(d / b) * b;
        return {
            x: a,
            y: d
        }
    },
    tick: function() {
        var c = this;
        var f = {
            x: this.containerMap.x,
            y: this.containerMap.y
        };
        if (this.targetScreen == "Mouse") {
            this.screen_x = this.stage.mouseX;
            this.screen_y = this.stage.mouseY
        } else {
            if (this.targetScreen == "Player") {}
        }
        if (this.targetScreen != undefined) {
            f.y -= Math.abs(f.y) == this.screen_y ? 0 : Math.floor((this.screen_y < Math.abs(f.y) ? -this.tile_h: this.tile_h) / this.speedScrolling);
            var g = Math.abs(f.x);
            var e = Math.abs(f.y);
            var b = this.speedScrolling;
            var a = this.speedScrolling;
            if (g != this.screen_x) {
                if (this.screen_x > g) {
                    if (g > this.screen_x - b) {
                        f.x = -this.screen_x
                    } else {
                        f.x -= b
                    }
                } else {
                    if (this.screen_x < g) {
                        if (g < this.screen_x + b) {
                            f.x = -this.screen_x
                        } else {
                            f.x += b
                        }
                    }
                }
            }
            if (e != this.screen_y) {
                if (this.screen_y > e) {
                    if (e > this.screen_y - a) {
                        f.y = -this.screen_y
                    } else {
                        f.y -= a
                    }
                } else {
                    if (this.screen_y < e) {
                        if (e < this.screen_y + a) {
                            f.y = -this.screen_y
                        } else {
                            f.y += a
                        }
                    }
                }
            }
            if (f.x > 0) {
                this.screen_x = f.x = 0
            } else {
                if (f.x + this.getMapWidth(true) < this.canvas.width) {
                    f.x = this.canvas.width - this.getMapWidth(true);
                    f.x = this._multipleScreen(f.x, 0).x;
                    this.screen_x = Math.abs(f.x)
                }
            }
            if (f.y > 0) {
                this.screen_y = f.y = 0
            } else {
                if (f.y + this.getMapHeight(true) < this.canvas.height) {
                    f.y = this.canvas.height - this.getMapHeight(true);
                    f.y = this._multipleScreen(0, f.y).y;
                    this.screen_y = Math.abs(f.y)
                }
            }
            function d(o) {
                var j, m, k, l, h;
                if (o) {
                    j = c.screen_x;
                    m = c.tile_w;
                    k = c.screen_refresh.x;
                    l = c.screen_refresh.start_x;
                    h = c.screen_refresh.scroll_x
                } else {
                    j = c.screen_y;
                    m = c.tile_h;
                    k = c.screen_refresh.y;
                    l = c.screen_refresh.start_y;
                    h = c.screen_refresh.scroll_y
                }
                if (Math.abs(k - l) >= m / 2 && h) {
                    if (o) {
                        k = c.screen_refresh.x = j
                    } else {
                        k = c.screen_refresh.y = j
                    }
                }
                if (!isNaN(k)) {
                    if (k != j && !h) {
                        var n = {};
                        if (o) {
                            c.screen_refresh.start_x = j;
                            c.screen_refresh.scroll_x = true
                        } else {
                            c.screen_refresh.start_y = j;
                            c.screen_refresh.scroll_y = true
                        }
                        if (k > j) {
                            if (o) {
                                n.direction = "left"
                            } else {
                                n.direction = "up"
                            }
                        } else {
                            if (o) {
                                n.direction = "right"
                            } else {
                                n.direction = "bottom"
                            }
                        }
                        c.screen_refresh.dir = n.direction;
                        c.call("_scrollStart", n)
                    } else {
                        if (k == j && h) {
                            if (o) {
                                c.screen_refresh.scroll_x = false
                            } else {
                                c.screen_refresh.scroll_y = false
                            }
                            c.call("_scrollFinish", {
                                direction: c.screen_refresh.dir
                            })
                        }
                    }
                }
            }
            d(true);
            d(false)
        }
        if (this.currentMap) {
            this.screen_refresh.x = this.screen_x;
            this.screen_refresh.y = this.screen_y;
            if (this.canvas.width <= this.getMapWidth(true)) {
                this.containerMap.x = f.x
            }
            if (this.canvas.height <= this.getMapHeight(true)) {
                this.containerMap.y = f.y
            }
        }
        this._tickHtmlElements();
        this._tickShake();
        if (Rpg.debug) {
            this.fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps"
        }
        this.call("update");
        this.stage.update()
    },
    clone: function(a) {
        var c;
        if (typeof(a) != "object" || a == null) {
            return a
        }
        var b = a.constructor();
        for (c in a) {
            b[c] = this.clone(a[c])
        }
        return b
    },
    tilePriority: function(a) {
        return this.mapData.propreties[a][0]
    },
    tilePassage: function(a) {
        return this.mapData.propreties[a][1]
    },
    isPassable: function(a, g, c) {
        var e;
        if (!c) {
            c = 16
        }
        if (a < 0 || g < 0 || a >= this.currentMap.length || g >= this.currentMap[0].length) {
            return false
        }
        var b = this.currentMap[a][g];
        var f, d;
        for (e = 2; e >= 0; e--) {
            if (b[e] != null) {
                d = this.tilePriority(b[e]);
                if (d == 0) {
                    f = this.tilePassage(b[e]);
                    if (f == 0 || f == 16) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
        return false
    },
    prepareMap: function(b, a, c) {
        this.maps.push({
            name: b,
            propreties: a,
            callback: c
        })
    },
    getPreparedMap: function(a) {
        var b;
        for (b = 0; b < this.maps.length; b++) {
            if (this.maps[b].name == a) {
                return this.maps[b]
            }
        }
        return false
    },
    setPreparedMap: function(b, a, d) {
        var c = this.getPreparedMap(b);
        if (c) {
            c.propreties = a;
            if (d) {
                c.callback = d
            }
            return true
        }
        return false
    },
    callMap: function(a) {
        var b = this.getPreparedMap(a);
        if (b) {
            this.loadMap(a, b.propreties, b.callback);
            return true
        }
        return false
    },
    clearMap: function() {
        var a;
        for (a = 0; a < 9; a++) {
            this.layer[a] = new Container()
        }
        for (a = 0; a < this.events.length; a++) {
            Ticker.removeListener(this.events[a])
        }
        this.events = [];
        this.bind("update",
        function() {});
        if (this.containerMap.name !== undefined) {
            this.stage.clear();
            this.containerMap.removeAllChildren();
            if (this.player) {
                this.player.refreshBitmap()
            }
            if (this.tone) {
                this.tone = undefined
            }
            this.stage.removeChild(this.containerMap)
        }
    },
    displayMap: function() {
        if (!this.stage.contains(this.containerMap)) {
            this.stage.addChildAt(this.containerMap, 0);
            return true
        }
        return false
    },
    loadMap: function(b, q, n, r) {
        var t = this;
        var c = [];
        var o, m, h, f;
        if (typeof b != "string") {
            q.customPath = true;
            q.noCache = b.noCache;
            b = b.path
        }
        this.clearMap();
        function g() {
            Cache._progressLoadData(function() {
                t._sortEventsDepthIndex();
                if (n) {
                    n()
                }
                if (q.autoDisplay) {
                    t.displayMap()
                }
            })
        }
        q.autoDisplay = q.autoDisplay === undefined ? true: q.autoDisplay;
        Cache.totalLoad = 4;
        Cache.totalLoad += (q.events ? q.events.length: 0) * 2;
        Cache.totalLoad += (q.autotiles ? q.autotiles.length: 0);
        Cache.totalLoad += (q.player ? 1 : 0);
        this.maps.push({
            name: b,
            propreties: q,
            callback: n
        });
        this.currentMapInfo = {
            name: b,
            propreties: q
        };
        Cache.map(b, s, q.customPath, q.noCache);
        function a(x, l, v) {
            var u = 0;
            var k = new Container();
            var j = t.tile_w / 2;
            var w = v / j;
            c.push(k);
            for (u = 0; u < 4; u++) {
                x.currentFrame = w * l[u][1] + l[u][0];
                if (v / j > 6) {
                    x.waitFrame = 5;
                    x.arrayFrames = [];
                    for (h = 0; h < w / 6; h++) {
                        x.arrayFrames.push(x.currentFrame + (h * 6))
                    }
                }
                switch (u) {
                case 1:
                    x.x = j;
                    break;
                case 2:
                    x.y = j;
                    break;
                case 3:
                    x.x = 0;
                    break
                }
                k.addChild(x);
                x = x.clone()
            }
        }
        function e(j, u) {
            var k = 0;
            j = (j - 1) * 2;
            u = (u - 1) * 2;
            var l = [];
            for (k = 0; k < 4; k++) {
                switch (k) {
                case 1:
                    j++;
                    break;
                case 2:
                    u++;
                    break;
                case 3:
                    j--;
                    break
                }
                l.push([j, u])
            }
            return l
        }
        function d(H, y, A, v) {
            var x, w, u;
            switch (H) {
            case 0:
                a(y, A.center, v);
                break;
            case 1:
                var z = [];
                var F = [];
                var B;
                for (x = 1; x <= 4; x++) {
                    for (w = 0; w <= z.length; w++) {
                        F.push((w != 0 ? z[w - 1] : "") + x + ";")
                    }
                    for (w = 0; w < F.length; w++) {
                        z.push(F[w]);
                        B = F[w].split(";");
                        B.pop();
                        var E = [];
                        for (u = 1; u <= 4; u++) {
                            if (Rpg.valueExist(B, u) !== false) {
                                E.push(A.corner[u - 1])
                            } else {
                                E.push(A.center[u - 1])
                            }
                        }
                        a(y, E, v);
                        y = y.clone()
                    }
                    F = []
                }
                break;
            case 2:
                var l = [A.left, A.top, A.right, A.bottom];
                var G;
                var D = [2, 3];
                var C;
                for (x = 0; x < 4; x++) {
                    for (w = 0; w < 4; w++) {
                        G = t.clone(l[x]);
                        if (w == 1 || w == 3) {
                            C = D[0] - 1;
                            G[C] = A.corner[C]
                        }
                        if (w == 2 || w == 3) {
                            C = D[1] - 1;
                            G[C] = A.corner[C]
                        }
                        a(y, G, v);
                        y = y.clone()
                    }
                    D[0]++;
                    D[1]++;
                    if (D[0] > 4) {
                        D[0] = 1
                    }
                    if (D[1] > 4) {
                        D[1] = 1
                    }
                }
                break;
            case 3:
                a(y, [A.left[0], A.right[1], A.right[2], A.left[3]], v);
                y = y.clone();
                a(y, [A.top[0], A.top[1], A.bottom[2], A.bottom[3]], v);
                break;
            case 4:
                var l = [A.top_left, A.top_right, A.bottom_right, A.bottom_left];
                var G;
                var C = 3;
                for (x = 0; x < l.length; x++) {
                    for (w = 0; w < 2; w++) {
                        G = t.clone(l[x]);
                        if (w == 1) {
                            G[C - 1] = A.corner[C - 1]
                        }
                        a(y, G, v);
                        y = y.clone()
                    }
                    C++;
                    if (C > 4) {
                        C = 1
                    }
                }
                break;
            case 5:
                var l = [[A.top_left[0], A.top_right[1], A.right[2], A.left[3]], [A.top_left[0], A.top[1], A.bottom[2], A.bottom_left[3]], [A.left[0], A.right[1], A.bottom_right[2], A.bottom_left[3]], [A.top[0], A.top_right[1], A.bottom_right[2], A.bottom[3]]];
                for (x = 0; x < l.length; x++) {
                    a(y, l[x], v);
                    y = y.clone()
                }
                break;
            case 6:
                a(y, A.full, v);
                y = y.clone();
                a(y, A.full, v);
                break
            }
        }
        function s(u) {
            g();
            t.mapData = u;
            var l = u.map;
            var j = new Container();
            Cache.onload(function() {
                if (q.autotiles) {
                    var I = {
                        center: e(2, 3),
                        full: e(1, 1),
                        corner: e(3, 1),
                        left: e(1, 3),
                        right: e(3, 3),
                        top: e(2, 2),
                        bottom: e(2, 4),
                        top_left: e(1, 2),
                        top_right: e(3, 2),
                        bottom_left: e(1, 4),
                        bottom_right: e(3, 4)
                    };
                    var H, x, N, K;
                    for (o = 0; o < q.autotiles.length; o++) {
                        H = Cache.get(q.autotiles[o], "autotiles");
                        K = new SpriteSheet(H, t.tile_w / 2, t.tile_h / 2);
                        N = new BitmapSequence(K);
                        for (m = 0; m < 7; m++) {
                            d(m, N, I, H.width);
                            N = N.clone()
                        }
                    }
                }
                if (!u.layer1) {
                    var Q = Cache.get(q.tileset, "tilesets");
                    var S = new SpriteSheet(Q, t.tile_w, t.tile_h);
                    var O = new BitmapSequence(S);
                    var L = 0,
                    z, P;
                    map_img = [];
                    for (o = 0; o < 2; o++) {
                        var z = document.createElement("canvas");
                        z.width = l.length * t.tile_w;
                        z.height = l[0].length * t.tile_h;
                        P = new Stage(z);
                        map_img.push(P)
                    }
                    for (f = 0; f < 3; f++) {
                        for (o = 0; o < l.length; o++) {
                            for (m = 0; m < l[0].length; m++) {
                                var J = l[o][m][f];
                                if (J != null) {
                                    var R = t.tilePriority(J);
                                    var B = (R == 0 ? 0 : 1);
                                    R = f + (R == 0 ? 0 : 4);
                                    if (!l[o][m][3]) {
                                        l[o][m][3] = {}
                                    }
                                    if ((J - 48) - c.length >= 0) {
                                        O.name = "tile" + L + "_" + o + "_" + m;
                                        O.x = t._positionValueToReal(o, m).x;
                                        O.y = t._positionValueToReal(o, m).y;
                                        O.currentFrame = J - 384;
                                        l[o][m][3][R] = O;
                                        map_img[B].addChild(O);
                                        O = O.clone()
                                    } else {
                                        var x = c[J - 48];
                                        if (x) {
                                            x = x.clone(true);
                                            x.x = t._positionValueToReal(o, m).x;
                                            x.y = t._positionValueToReal(o, m).y;
                                            l[o][m][3][R] = x;
                                            map_img[B].addChild(x)
                                        }
                                    }
                                    L++
                                }
                            }
                        }
                    }
                }
                var T;
                for (o = 0; o < 2; o++) {
                    T = Cache.getMapGraphics(b, o);
                    if (!T) {
                        T = new Image();
                        if (u.layer1) {
                            T.src = u["layer" + (o + 1)];
                            Cache.setMapGraphics(b, T)
                        } else {
                            var y = map_img[o].canvas.getContext("2d");
                            map_img[o].draw(y);
                            T = map_img[o].canvas;
                            Cache.setMapGraphics(b, T)
                        }
                    }
                    t.layer[(o * 4)].addChild(new Bitmap(T));
                    g()
                }
                for (o = 0; o < t.layer.length; o++) {
                    j.addChild(t.layer[o])
                }
                t.currentMap = l;
                t.containerMap = j;
                function E() {
                    if (!t.player) {
                        t.player = new Player(q.player, t);
                        t.setCamera(t.player.x, t.player.y)
                    } else {
                        if (r && r.player) {
                            for (var U in r.player) {
                                t.player[U] = r.player[U]
                            }
                            q.player.x = r.player.x;
                            q.player.y = r.player.y
                        }
                        t.player.setPosition(q.player.x, q.player.y);
                        t.setCamera(t.player.x, t.player.y)
                    }
                    t.player.fixCamera(true);
                    t.player.setTransfert([]);
                    if (q.transfert) {
                        t.player.setTransfert(q.transfert)
                    }
                    t.player.inTransfert = false;
                    g()
                }
                if (q.player) {
                    if (!t.player) {
                        Cache.characters(q.player.filename,
                        function() {
                            E()
                        })
                    } else {
                        E()
                    }
                }
                var M, F, A, G;
                if (q.events) {
                    if (!Rpg.isArray(q.events)) {
                        G = q.events.path;
                        A = true;
                        F = q.events.noCache;
                        q.events = [G]
                    }
                    for (o = 0; o < q.events.length; o++) {
                        M = q.events[o];
                        C(M)
                    }
                }
                function C(U) {
                    Cache.event(U,
                    function(V) {
                        if (V[1][0].character_hue) {
                            Cache.characters(V[1][0].character_hue,
                            function() {
                                D(V, U);
                                g()
                            })
                        } else {
                            D(V, U);
                            g()
                        }
                    },
                    b, A, F)
                }
                function D(Z, Y) {
                    g();
                    var W, X;
                    if (r && r.events) {
                        for (var V = 0; V < r.events.length; V++) {
                            X = r.events[V];
                            if (Y == X.name) {
                                Z[0].x = X.x;
                                Z[0].y = X.y;
                                W = new Event(Z, t);
                                for (var U in X) {
                                    if (U != "x" && U != "y") {
                                        W[U] = X[U]
                                    }
                                }
                                break
                            }
                        }
                    } else {
                        W = new Event(Z, t)
                    }
                }
            });
            if (u.layer1) {
                var k = Cache.loadFinish;
                Cache.loadFinish = undefined;
                k();
                g()
            } else {
                Cache.tilesets(q.tileset,
                function() {
                    g()
                })
            }
            if (q.autotiles) {
                for (o = 0; o < q.autotiles.length; o++) {
                    Cache.autotiles(q.autotiles[o],
                    function() {
                        g()
                    })
                }
            }
            function v(y) {
                if (q[y]) {
                    var z = /\/([^\/]+)$/;
                    var A = z.exec(t.currentSound[y].src);
                    var x = true;
                    if (A) {
                        if (typeof q[y] == "string") {
                            x = A[1] != q[y]
                        } else {
                            x = A[1] != q[y].mp3 + ".mp3" && A[1] != q[y].ogg + ".ogg"
                        }
                        if (x) {
                            w(q[y], y)
                        }
                    } else {
                        w(q[y], y)
                    }
                }
            }
            function w(x, y) {
                if (y == "bgm") {
                    t.playBGM(x)
                } else {
                    t.playBGS(x)
                }
            }
            v("bgm");
            v("bgs")
        }
        this.bind("_scrollStart",
        function(j) {
            t.refreshMap(false, {
                direction: j.direction,
                add: true
            })
        });
        this.bind("_scrollFinish",
        function(j) {
            t.refreshMap(false, {
                direction: j.direction,
                add: false
            })
        })
    },
    refreshMap: function(n, l) {
        return;
        var h, g, f, b;
        var c = Math.ceil(this.canvas.width / this.tile_w);
        var s = Math.ceil(this.canvas.height / this.tile_h);
        var r = Math.floor(Math.abs(this.containerMap.x) / this.tile_w);
        var o = Math.floor(Math.abs(this.containerMap.y) / this.tile_h);
        if (n) {
            for (f = 0; f < 8; f++) {
                if (f != 3) {
                    this.layer[f].removeAllChildren();
                    for (h = 0; h < c; h++) {
                        for (g = 0; g < s; g++) {
                            b = this.currentMap[r + h][o + g][3][f];
                            if (b) {
                                this.layer[f].addChild(b)
                            }
                        }
                    }
                }
            }
        }
        if (l) {
            var d = l.direction;
            var m = l.add ? "add": "del";
            var q;
            var r = Math.floor(this.screen_x / this.tile_w);
            var o = Math.floor(this.screen_y / this.tile_h);
            var e = l.direction == "up" || l.direction == "bottom" ? false: true;
            var t = e ? s: c;
            for (f = 0; f < 8; f++) {
                for (h = 0; h < t; h++) {
                    if (d == "left" || d == "up") {
                        q = m == "add" ? 0 : (e ? c: s)
                    } else {
                        q = m == "add" ? (e ? c: s) : -1
                    }
                    if (e) {
                        b = this.currentMap[r + q][o + h][3][f]
                    } else {
                        b = this.currentMap[r + h][o + q][3][f]
                    }
                    if (b) {
                        if (m == "add") {
                            this.layer[f].addChild(b)
                        } else {
                            this.layer[f].removeChild(b)
                        }
                    }
                }
            }
        }
    },
    getEventById: function(a) {
        return this._getEvent("id", {
            id: a
        })
    },
    getEventByName: function(a) {
        return this._getEvent("name", {
            name: a
        })
    },
    getEventByPosition: function(a, c, b) {
        return this._getEvent("position", {
            x: a,
            y: c,
            multi: b
        })
    },
    _getEvent: function(c, d) {
        var a, b = [];
        for (a = 0; a < this.events.length; a++) {
            switch (c) {
            case "name":
                if (this.events[a].name && this.events[a].name == d.name) {
                    return this.events[a]
                }
                break;
            case "id":
                if (this.events[a].id && this.events[a].id == d.id) {
                    return {
                        seek: a,
                        event: this.events[a]
                    }
                }
                break;
            case "position":
                if (this.events[a].x == d.x && this.events[a].y == d.y) {
                    if (d.multi) {
                        b.push(this.events[a])
                    } else {
                        return this.events[a]
                    }
                }
                break
            }
        }
        if (c == "position") {
            return b
        }
        return null
    },
    removeEvent: function(b) {
        var a = this.getEventById(b);
        if (a != null) {
            Ticker.removeListener(a.event);
            a.event.bitmap = undefined;
            this.layer[3].removeChild(a.event.sprite);
            this.events.splice(a.seek, 1);
            this.call("removeEvent", b);
            return true
        }
        return false
    },
    setScreenIn: function(a) {
        this.targetScreen = a
    },
    bind: function(a, b) {
        this.func_trigger[a] = b
    },
    call: function(a, b) {
        if (this.func_trigger[a] != undefined) {
            return this.func_trigger[a](b)
        }
    },
    addAction: function(a, b) {
        this.actions[a] = b
    },
    addEvent: function(b) {
        var a = new Event(b, this);
        return a
    },
    addEventAjax: function(b, c) {
        var a = this;
        Cache.event(b,
        function(d) {
            a.addEvent(d);
            if (c) {
                c(d)
            }
        })
    },
    addEventPrepared: function(a) {
        var b = this.getEventPreparedByName(a);
        if (b != null) {
            return this.addEvent(b)
        }
        return false
    },
    getEventPreparedByName: function(a) {
        for (var b = 0; b < this.eventsCache.length; b++) {
            if (this.eventsCache[b][0].name == a) {
                return this.eventsCache[b]
            }
        }
        return null
    },
    setEventPrepared: function(b, a, e) {
        var d = this.getEventPreparedByName(b);
        var f;
        if (d != null) {
            for (var c in a) {
                f = a[c];
                if (e) {
                    d[1][e][c] = f
                } else {
                    d[0][c] = f
                }
            }
        }
    },
    prepareEvent: function(a) {
        this.eventsCache.push(a)
    },
    prepareEventAjax: function(b, c) {
        var a = this;
        Cache.event(b,
        function(d) {
            a.prepareEvent(d);
            if (c) {
                c(d)
            }
        })
    },
    setEventMode: function(b, c) {
        var a = this.actionBattle.onChangeMode;
        b.actionBattle.mode = c;
        if (c == "passive" && this.actionBattle.eventPassive && this.actionBattle.eventPassive[b.actionBattle.passive]) {
            this.actionBattle.eventPassive[b.actionBattle.passive](b)
        }
        if (a) {
            a(b, c)
        }
    },
    setVolumeAudio: function(d, c) {
        var a = this;
        if (c) {
            e(c)
        } else {
            for (var b in this.soundVolume) {
                e(b)
            }
        }
        this.call("changeVolumeAudio");
        function e(f) {
            a.soundVolume[f] = d;
            a.currentSound[f].volume = d
        }
    },
    playBGM: function(a, b) {
        this._playBG("bgm", a, b)
    },
    playBGS: function(a, b) {
        this._playBG("bgs", a, b)
    },
    _playBG: function(d, c, e) {
        var b = this;
        var a = d == "bgm" ? Cache.BGM: Cache.BGS;
        Cache.audioStop(d);
        a(c,
        function(f) {
            b.currentSound[d] = f;
            f.volume = b.soundVolume[d];
            if (typeof f.loop == "boolean") {
                f.loop = true
            } else {
                f.addEventListener("ended",
                function() {
                    this.currentTime = 0;
                    this.play()
                },
                false)
            }
            f.play();
            if (e) {
                e(f)
            }
        })
    },
    playSE: function(a, b) {
        this._playSoundEffect("se", a, b)
    },
    playME: function(a, b) {
        this._playSoundEffect("me", a, b)
    },
    _playSoundEffect: function(d, c, e) {
        var b = this;
        var a = d == "se" ? Cache.SE: Cache.ME;
        a(c,
        function(f) {
            f.volume = b.soundVolume[d];
            f.play();
            if (e) {
                e(f)
            }
        })
    },
    callCommandsEvent: function(c, a, e) {
        var b = this;
        var d = e && this.player;
        if (d) {
            this.player.freeze = true
        }
        c.bind("onFinishCommand",
        function() {
            if (d) {
                b.player.freeze = false
            }
            if (a) {
                a()
            }
        });
        c.onCommands()
    },
    screenFlash: function(b, d, e) {
        var a = this;
        var c = new Shape();
        c.graphics.beginFill("#" + b).drawRect(0, 0, this.canvas.width * 2, this.canvas.height * 2);
        c.x = this.screen_x - Math.round(this.canvas.width / 2);
        c.y = this.screen_y - Math.round(this.canvas.height / 2);
        c.alpha = 0.5;
        this.containerMap.addChild(c);
        this.call("screenFlash", {
            color: b,
            speed: d
        });
        new Effect(c).fadeOut(d,
        function() {
            a.containerMap.removeChild(c);
            if (e) {
                e()
            }
        })
    },
    screenShake: function(b, c, d, a, e) {
        if (typeof a == "function") {
            e = a;
            a = false
        }
        this.shake = {};
        this.shake.power = b;
        this.shake.speed = c;
        this.shake.duration = d;
        this.shake.callback = e;
        this.shake.current = 0;
        this.shake.direction = 1;
        this.shake.axis = a || "x";
        this.call("screenShake", {
            power: b,
            speed: c,
            duration: d,
            axis: a
        })
    },
    _tickShake: function() {
        if (this.shake && (this.shake.duration >= 1 || this.shake.current != 0)) {
            var a = (this.shake.power * this.shake.speed * this.shake.direction) / 10;
            if (this.shake.duration <= 1 && this.shake.current * (this.shake.current + a) < 0) {
                this.shake.current = 0
            } else {
                this.shake.current += a
            }
            if (this.shake.current > this.shake.power * 2) {
                this.shake.direction = -1
            }
            if (this.shake.current < -this.shake.power * 2) {
                this.shake.direction = 1
            }
            if (this.shake.duration >= 1) {
                this.shake.duration -= 1
            }
            if (/x/.test(this.shake.axis)) {
                this.stage.x = this.shake.current
            }
            if (/y/.test(this.shake.axis)) {
                this.stage.y = this.shake.current
            }
            if (this.shake.duration - 1 == 0 && this.shake.callback) {
                this.shake.callback()
            }
        }
    },
    changeScreenColorTone: function(b, e, g, d, f) {
        var a = this;
        var c = false;
        if (this.tone) {
            this.containerMap.removeChild(this.tone);
            c = true;
            if (b == "reset") {
                return
            }
        }
        this.tone = new Shape();
        this.tone.graphics.beginFill("#" + b).drawRect(0, 0, this.getMapWidth(true), this.getMapHeight(true));
        this.tone.compositeOperation = g;
        this.containerMap.addChild(this.tone);
        if (!c) {
            this.tone.alpha = 0;
            if (e > 0) {
                new Effect(this.tone).fadeStartTo(e, 0, d,
                function() {
                    if (f) {
                        f()
                    }
                })
            } else {
                this.tone.alpha = d
            }
        }
        this.call("changeScreenColorTone", {
            color: b,
            speed: e,
            composite: g,
            opacity: d
        })
    },
    setTypeDirection: function(a) {
        this.typeDirection = a
    },
    addHtmlElement: function(g, l, j, c) {
        var n = this,
        f;
        var b, m, k;
        var d = this.canvas.id + "-dom";
        b = document.getElementById(d);
        if (g instanceof HTMLElement) {
            match = g.getAttribute("id");
            m = g
        } else {
            match = /id="([^"]+)"/.exec(g)
        }
        var a;
        if (c) {
            if (c instanceof Array) {
                for (var e = 0; e < c.length; e++) {
                    h(c[e])
                }
            } else {
                h(c)
            }
        } else {
            h()
        }
        function h(q) {
            var o = match[1] + (q ? "-" + q.id: "");
            if (q) {
                a = q.sprite
            } else {
                a = n.containerMap
            }
            var r = a.localToGlobal(l, j);
            f = m ? m: document.createElement("div");
            f.setAttribute("data-px", l);
            f.setAttribute("data-py", j);
            if (match) {
                f.setAttribute("id", o + "-parent")
            }
            f.style.position = "absolute";
            f.style.left = Math.round(r.x) + "px";
            f.style.top = Math.round(r.y) + "px";
            if (!m) {
                g = g.replace(/id="([^"]+)"/, 'id="' + o + '"');
                f.innerHTML = g
            }
            b.appendChild(f);
            if (f && q) {
                q.htmlElements.push(f)
            }
            n.htmlElements.push({
                element: f,
                event: q
            })
        }
        return f
    },
    _tickHtmlElements: function() {
        var c, b, a, f, e, d;
        for (c = 0; c < this.htmlElements.length; c++) {
            b = this.htmlElements[c].element;
            d = this.htmlElements[c].event;
            a = b.getAttribute("data-px");
            f = b.getAttribute("data-py");
            if (d) {
                container = d.sprite
            } else {
                container = this.containerMap
            }
            e = container.localToGlobal(a, f);
            b.style.left = Math.round(e.x) + "px";
            b.style.top = Math.round(e.y) + "px"
        }
    },
    unbindMouseEvent: function(a) {
        this.onMouseEvent[a] = undefined;
        if (this.player && this.player._useMouse) {
            this.player.useMouse(true)
        }
    },
    bindMouseEvent: function(a, h, c) {
        var j = this,
        b, d, g;
        b = document.getElementById(this.canvas.id + "-dom");
        if (c) {
            if (! (c instanceof Array)) {
                c = [c]
            }
            for (var e = 0; e < c.length; e++) {
                g = c[e];
                d = g.htmlElementMouse;
                f("out", g);
                f("over", g);
                b.appendChild(d)
            }
        }
        function f(k, l) {
            d["onmouse" + k] = function(m) {
                j._getMouseData(k, m, b, l)
            }
        }
        this.onMouseEvent[a] = h
    },
    _setMouseEvent: function(b) {
        var a = this;
        b.onclick = function(c) {
            a._getMouseData("click", c, this)
        };
        b.ondblclick = function(c) {
            a._getMouseData("dblclick", c, this)
        };
        b.onmouseup = function(c) {
            a._getMouseData("up", c, this)
        };
        b.onmousedown = function(c) {
            a._getMouseData("down", c, this)
        }
    },
    _getMouseData: function(h, f, g, d) {
        var b;
        var n = this;
        if (this.onMouseEvent[h]) {
            var c = f.clientX - g.offsetLeft;
            var a = f.clientY - g.offsetTop;
            var k = c - this.containerMap.x;
            var j = a - this.containerMap.y;
            var m = Math.floor(k / this.tile_w);
            var l = Math.floor(j / this.tile_h);
            d = d || this.containerMap.getObjectUnderPoint(k, j);
            if (this.player && this.player.id == d.id) {
                b = this.player
            } else {
                if (d.name == "event") {
                    b = this.getEventById(d.id);
                    if (b != null) {
                        b = b.event;
                        if (h == "click") {
                            b.click()
                        }
                        if (this.player._useMouse) {
                            this.player.moveMouseTo(m, l, true,
                            function() {
                                if (n.player.distance(0, 0, m, l).ini <= 1) {
                                    n.player.triggerEventBeside()
                                }
                            })
                        }
                    }
                } else {
                    if (this.player._useMouse) {
                        this.player.moveMouseTo(m, l)
                    }
                }
            }
            this.onMouseEvent[h]({
                mouse_x: c,
                mouse_y: a,
                real_x: k,
                real_y: j,
                x: m,
                y: l,
                event: b || null
            })
        }
    },
    save: function(g) {
        var d = {};
        d.switches = this.switches;
        d.variables = this.variables;
        d.selfSwitches = Cache.events_data;
        d.gold = this.gold;
        d.map = this.currentMapInfo;
        d.events = [];
        d.items = this.items;
        var f, c, a;
        for (a = 0; a < this.events.length; a++) {
            c = this.events[a];
            f = e(c);
            d.events.push(f)
        }
        if (this.player) {
            d.player = e(this.player)
        }
        function e(k) {
            var l = {};
            var m = ["htmlElements"];
            for (var h in k) {
                var j = typeof k[h];
                if ((j == "number" || j == "string" || j == "boolean" || k[h] instanceof Array) && m.indexOf(h) == -1) {
                    l[h] = k[h]
                }
            }
            return l
        }
        var b = JSON.stringify(d);
        if (g && localStorage) {
            localStorage[this.canvas.id + "-" + g] = b
        }
        return b
    },
    load: function(a, c) {
        var b;
        if (typeof a == "number") {
            b = localStorage[this.canvas.id + "-" + a];
            if (!b) {
                return false
            }
        } else {
            b = a
        }
        var d = JSON.parse(b);
        this.switches = d.switches;
        this.variables = d.variables;
        this.items = d.items;
        Cache.events_data = d.selfSwitches;
        this.gold = d.gold;
        this.loadMap(d.map.name, d.map.propreties, c, d)
    },
    addPicture: function(e, b, d, c) {
        var a = this;
        if (!d) {
            d = {}
        }
        Cache.pictures(b,
        function(f) {
            var g = new Bitmap(f);
            g.x = d.x ? d.x: 0;
            g.y = d.y ? d.y: 0;
            g.scaleX = d.zoom_x ? d.zoom_x / 100 : 1;
            g.scaleY = d.zoom_y ? d.zoom_y / 100 : 1;
            g.alpha = d.opacity ? d.opacity: 1;
            if (d.reg == "center") {
                d.regX = f.width / 2;
                d.regY = f.height / 2
            }
            g.regX = d.regX ? d.regX: 0;
            g.regY = d.regY ? d.regY: 0;
            a.pictures[e] = g;
            a.stage.addChild(g);
            a.call("addPicture", {
                id: e,
                filemane: b,
                prop: d
            });
            if (c) {
                c(f)
            }
        })
    },
    movePicture: function(d, b, c) {
        var a = this.pictures[d];
        if (c.opacity) {
            new Effect(a).fadeStartTo(b, a.alpha, c.opacity)
        }
        if (c.x !== undefined) {
            new Effect(a).linear(b, c.x, "x")
        }
        if (c.y !== undefined) {
            new Effect(a).linear(b, c.y, "y")
        }
        if (c.scaleX) {
            new Effect(a).scaling(b, c.scaleX, "x")
        }
        if (c.scaleY) {
            new Effect(a).scaling(b, c.scaleY, "y")
        }
        if (c.regX !== undefined) {
            a.regX = c.regX
        }
        if (c.regX !== undefined) {
            a.regY = c.regY
        }
        this.call("movePicture", {
            id: d,
            duration: b,
            prop: c
        })
    },
    rotatePicture: function(g, e, d, f) {
        var c = this.pictures[g];
        var b = false;
        if (typeof d == "string" && d == "loop") {
            b = true;
            d = 360
        }
        this.call("rotatePicture", {
            id: g,
            duration: e,
            value: d
        });
        a();
        function a() {
            new Effect(c).rotate(e, d, b ? a: f);
            if (f && b) {
                f()
            }
        }
    },
    erasePicture: function(a) {
        this.stage.removeChild(this.pictures[a]);
        this.call("erasePicture", a);
        delete this.pictures[a]
    },
    addItem: function(a, c, b) {
        if (typeof a != "string") {
            b = a;
            a = b.type;
            c = b.id
        }
        if (!this.items[a]) {
            this.items[a] = {}
        }
        if (!this.items[a][c]) {
            b.nb = 0
        }
        b.nb++;
        this.items[a][c] = b;
        this.call("addItem", {
            type: a,
            id: c,
            prop: b
        })
    },
    removeItem: function(a, b) {
        if (!this.items[a][b]) {
            return false
        }
        this.items[a][b].nb--;
        if (this.items[a][b].nb <= 0) {
            delete this.items[a][b]
        }
        this.call("removeItem", {
            type: a,
            id: b
        })
    },
    setItem: function(b, d, c) {
        for (var a in c) {
            this.items[b][d][a] = c[a]
        }
    },
    getItem: function(a, b) {
        return this.items[a][b] ? this.items[a][b] : false
    },
    battleFormulas: function(a, b) {
        if (typeof a == "string") {
            this._battleFormulas[a] = b
        } else {
            this._battleFormulas = a
        }
    },
    battleEffect: function(a, b, c) {
        return this._battleFormulas[a](b, c)
    },
    _positionValueToReal: function(a, c) {
        var b = {};
        if (this.isometric) {
            b.x = 320 + this.screen_x + (a - c) * this.tile_w / 2;
            b.y = this.screen_y + (a + c) * this.tile_h / 2
        } else {
            b.x = a * this.tile_w;
            b.y = c * this.tile_h
        }
        return b
    },
    _positionRealToValue: function(b, a) {
        var c = {};
        if (this.isometric) {
            c.x = a / this.tile_h + b / this.tile_w;
            c.y = a / this.tile_h - b / this.tile_w
        } else {
            c.x = Math.floor(b / this.tile_w);
            c.y = Math.floor(a / this.tile_h)
        }
        return c
    },
    setLang: function(a) {
        this.currentLang = a
    },
    toLang: function(d) {
        if (!this.currentLang) {
            return d
        }
        var b = /%(.*?)%/g;
        var a = b.exec(d);
        var c = Database.langs[this.currentLang];
        while (a != null) {
            d = d.replace(a[0], c[a[1]]);
            a = b.exec(d)
        }
        return d
    },
    setCanvasSize: function(e, b) {
        var a = "px";
        if (e == "fullscreen") {
            e = window.innerWidth;
            b = window.innerHeight
        }
        this.canvas.width = e;
        this.canvas.height = b;
        var d = document.getElementById(this.canvas.id + "-dom");
        var c = document.getElementById(this.canvas.id + "-parent");
        d.style.width = e + a;
        d.style.height = b + a;
        if (c) {
            c.style.width = e + a;
            c.style.height = b + a
        }
    }
};
function Scene(a) {
    if (!a) {
        return
    }
    this.rpg = a;
    this.pause = "all";
    this.content = new Container();
    this.windows = [];
    this.elements = [];
    this.inputs = {
        back: [],
        next: [],
        enter: []
    };
    this.onExit;
    this.initialize()
}
Scene.prototype = {
    initialize: function() {
        this.setFreeze(this.pause);
        this.rpg.stage.addChild(this.content);
        Ticker.addListener(this, false)
    },
    _input: function(a) {
        var c = this;
        function b(f, g) {
            if (f instanceof Array) {
                for (var e = 0; e < f.length; e++) {
                    c.inputs[g].push(f[e])
                }
            } else {
                c.inputs[g].push(f)
            }
        }
        function d(j, g, k) {
            var f, h;
            for (h = 0; h < c.windows.length; h++) {
                f = c.windows[h];
                if (f.active && f.isSelectable && Input.isPressed(f.inputs[g], j)) {
                    k(f)
                }
            }
        }
        b(a.back, "back");
        b(a.next, "next");
        b(a.enter, "enter");
        Input.keyDown(this.inputs.back,
        function(f) {
            d(f, "back",
            function(e) {
                e.index--;
                if (e.index < 0) {
                    e.index = e.loop ? e.commands.length - 1 : 0
                }
                e.moveCursor()
            })
        });
        Input.keyDown(this.inputs.next,
        function(f) {
            d(f, "next",
            function(e) {
                e.index++;
                if (e.index >= e.commands.length) {
                    e.index = e.loop ? 0 : e.commands.length - 1
                }
                e.moveCursor()
            })
        });
        Input.press(this.inputs.enter,
        function(f) {
            d(f, "enter",
            function(e) {
                var g = e.commands[e.index].callback;
                if (g) {
                    g()
                }
            })
        })
    },
    tick: function() {
        if (this.pause == "all") {
            this.rpg.stage.update()
        }
        for (var a = 0; a < this.windows.length; a++) {
            if (this.windows[a].update) {
                this.windows[a].update()
            }
        }
        if (this.update) {
            this.update()
        }
    },
    setFreeze: function(a) {
        this.pause = a;
        if (this.rpg.player) {
            this.rpg.player.movementPause(false)
        }
        this.rpg.mapFreeze(false);
        switch (a) {
        case "movement":
            if (this.rpg.player) {
                this.rpg.player.movementPause(true)
            }
            break;
        case "all":
            this.rpg.mapFreeze(true);
            break;
        case "delete":
            this.rpg.clearMap();
            break;
        default:
            this.pause = "normal"
        }
    },
    drawBackground: function(b) {
        var a = this;
        Cache.pictures(b,
        function(c) {
            a.bitmap = new Bitmap(c);
            a.content.addChildAt(a.bitmap, 0)
        })
    },
    removeBackground: function() {
        this.content.removeChild(this.bitmap)
    },
    exit: function(a) {
        this.rpg.stage.removeChild(this.content);
        this.setFreeze("normal");
        Input.reset();
        if (this.rpg.player) {
            this.rpg.player.assignKey()
        }
        if (this.onExit) {
            this.onExit(a)
        }
    },
    addWindow: function(b) {
        var a = new b(this.rpg, this.content);
        a.scene = this;
        this.windows.push(a);
        return a
    }
};
function Window(d, c, b, a) {
    if (!d) {
        return
    }
    var e = {};
    this.windowskin = e.skin ? e.skin: d.windowskinDefault;
    this.opacity = e.opacity ? e.opacity: 1;
    this.propfadeIn = e.fadeIn;
    this.propfadeOut = e.fadeOut;
    this.blockMovement = e.blockMovement;
    this.fadeMaxOpacity = this.opacity;
    this.autoOpen = e.autoOpen ? e.autoOpen: true;
    this.width = b ? b: 0;
    this.height = a ? a: 0;
    this.dialog = {};
    this.rpg = d;
    this.active = true;
    this.isSelectable = false;
    this.index = 0;
    this.scene;
    this.commands = [];
    this.content = new Container();
    this.cursor = {};
    this.containerParent = c ? c: this.rpg.stage;
    this.onClose;
    this.onOpen;
    this.id = Math.floor(Math.random() * 100000);
    this.isOpen = false;
    this.keyopen = null;
    this.keyclose = null;
    this.initialize()
}
Window.prototype = {
    initialize: function() {
        this.setWindowskin()
    },
    setWindowskin: function() {
        var a = this;
        this.dialog.skin = new Container();
        this.cursor.skin = new Container();
        Cache.windowskins(this.windowskin,
        function(d) {
            var c = new SpriteSheet(d, 128, 128);
            var b = new BitmapSequence(c);
            b.x = 2;
            b.y = 2;
            b.scaleX = 1;
            b.scaleY = 1;
            b.alpha = a.opacity;
            a.dialog.border = {};
            var e = new BitmapSequence(new SpriteSheet(d, 16, 16));
            function f(l, k, m, j) {
                e.currentFrame = l;
                e.x = k;
                e.y = m;
                a.dialog.border[j] = e;
                a.dialog.skin.addChild(e);
                e = e.clone()
            }
            a.dialog.content = b;
            a.dialog.skin.addChild(b);
            f(8, 16, 0, "top");
            f(19, 0, 16, "left");
            f(22, 32, 16, "right");
            f(44, 16, 32, "bottom");
            f(7, 0, 0, "top_left");
            f(10, 32, 0, "top_right");
            f(43, 0, 32, "bottom_left");
            f(46, 32, 32, "bottom_right");
            a.cursor.border = {};
            var h = new BitmapSequence(new SpriteSheet(d, 32, 32));
            function g(l, k, m, j) {
                e.currentFrame = l;
                e.x = k;
                e.y = m;
                a.cursor.border[j] = e;
                a.cursor.skin.addChild(e);
                e = e.clone()
            }
            h.currentFrame = 15;
            a.cursor.content = h;
            a.cursor.skin.alpha = 0;
            a.cursor.skin.addChild(h);
            if (a.onLoad) {
                a.onLoad()
            }
            if (a.autoOpen) {
                a.open()
            }
        })
    },
    setKeyClose: function(a) {
        this.keyclose = a
    },
    setKeyOpen: function(a) {
        this.keyopen = a
    },
    setText: function(a, e, d, c, b) {
        this.drawText(a, e, d, c, b)
    },
    drawText: function(a, e, d, c, b) {
        var d = new Text(d, c, b);
        d.x = a;
        d.y = e;
        d.lineHeight = 30;
        this.content.addChild(d);
        return d
    },
    setPosition: function(a, b) {
        if (a == "bottom") {
            this.dialog.skin.x = this.rpg.canvas.width / 2 - this.width / 2;
            this.dialog.skin.y = this.rpg.canvas.height - this.height - 20
        } else {
            this.dialog.skin.x = a;
            this.dialog.skin.y = b
        }
    },
    setOpacity: function(a) {
        this.dialog.skin.alpha = a
    },
    setBackOpacity: function(a) {
        this.dialog.content.alpha = a
    },
    setContentOpacity: function(a) {
        this.content.alpha = a
    },
    setCursorSize: function(d, a) {
        var f = 2,
        c = 2,
        b = 32,
        e = 32;
        this.cursor.border.top.scaleX = this.cursor.border.bottom.scaleX = (d - f) / f;
        this.cursor.border.right.scaleY = this.cursor.border.left.scaleY = (a - c) / c;
        this.cursor.border.top_right.x = this.cursor.border.right.x = this.cursor.border.bottom_right.x = d - f + 5;
        this.cursor.border.bottom_right.y = this.cursor.border.bottom_left.y = this.cursor.border.bottom.y = a - c + 5;
        this.cursor.content.scaleX = d / b;
        this.cursor.content.scaleY = a / e
    },
    setSize: function(d, a) {
        var f = 16,
        c = 16,
        b = 128,
        e = 128;
        this.dialog.border.top.scaleX = this.dialog.border.bottom.scaleX = (d - f) / f;
        this.dialog.border.right.scaleY = this.dialog.border.left.scaleY = (a - c) / c;
        this.dialog.border.top_right.x = this.dialog.border.right.x = this.dialog.border.bottom_right.x = d - f + 5;
        this.dialog.border.bottom_right.y = this.dialog.border.bottom_left.y = this.dialog.border.bottom.y = a - c + 5;
        this.dialog.content.scaleX = d / b;
        this.dialog.content.scaleY = a / e;
        this.width = d;
        this.height = a
    },
    open: function() {
        var a = this;
        this.setSize(this.width, this.height);
        this.dialog.open = true;
        this.content.addChild(this.cursor.skin);
        this.dialog.skin.addChild(this.content);
        this.dialog.skin.alpha = 0;
        this.containerParent.addChild(this.dialog.skin);
        this.rpg.currentWindows.push(this);
        this.isOpen = true;
        if (this.propfadeIn) {
            this.opacity = 0;
            this.fadeIn(this.propfadeIn,
            function() {
                if (a.onOpen) {
                    a.onOpen()
                }
            })
        } else {
            this.dialog.skin.alpha = 1;
            if (a.onOpen) {
                a.onOpen()
            }
        }
    },
    clear: function() {
        this.content.removeAllChildren()
    },
    close: function() {
        var a = this;
        function b() {
            a.isOpen = false;
            for (var c = 0; c < a.rpg.currentWindows.length; c++) {
                if (a.rpg.currentWindows[c].id == a.id) {
                    a.rpg.currentWindows.splice(c, 1);
                    break
                }
            }
            a.clear();
            a.containerParent.removeChild(a.dialog.skin);
            if (a.onClose) {
                a.onClose()
            }
        }
        if (this.propfadeOut) {
            this.fadeOut(this.propfadeOut, b)
        } else {
            b()
        }
    },
    fadeOut: function(a, b) {
        new Effect(this.dialog.skin).fadeOut(a, b)
    },
    fadeIn: function(a, b) {
        new Effect(this.dialog.skin).fadeStartTo(a, 0, this.fadeMaxOpacity, b)
    },
    addCommand: function(a, e, b, c, d) {
        this.commands.push({
            x: a,
            y: e,
            w: b,
            h: c,
            callback: d
        })
    },
    isActive: function(a) {
        this.active = a
    },
    selectable: function(b, a) {
        b = b !== undefined ? b: true;
        if (!a) {
            a = {}
        }
        if (!a.enter) {
            a.enter = [Input.Enter, Input.Space]
        }
        if (!a.back) {
            a.back = Input.Up
        }
        if (!a.next) {
            a.next = Input.Bottom
        }
        this.loop = b;
        this.isSelectable = true;
        this.inputs = a;
        if (this.scene) {
            this.scene._input(a)
        }
        this.cursor.skin.alpha = 1;
        this.moveCursor()
    },
    moveCursor: function(b) {
        var a = b === undefined ? this.index: b;
        if (!this.commands[a]) {
            return
        }
        this.cursor.skin.x = this.commands[a].x;
        this.cursor.skin.y = this.commands[a].y;
        this.cursor.skin.scaleX = this.commands[a].w;
        this.cursor.skin.scaleY = this.commands[a].h
    },
};
function Scene_Dialog(a) {
    this.parent = Scene;
    this.parent(a);
    this.main()
}
var p = Scene_Dialog.prototype = new Scene();
p.main = function() {
    var a = this;
    this.setFreeze("movement");
    this.window = this.addWindow(Window_Dialog);
    if (Rpg.mobileUserAgent()) {
        Cache.pictures("next.png",
        function(b) {
            var c = new Bitmap(b);
            a.content.addChild(c);
            c.x = 500;
            c.y = 410;
            a.rpg.bindMouseEvent("click",
            function(e) {
                var d = a.content.getObjectUnderPoint(e.mouse_x, e.mouse_y);
                if (d != null && d.id == c.id) {
                    a.rpg.unbindMouseEvent("click");
                    Input.trigger(Input.Space, "press")
                }
            })
        })
    }
};
function Window_Dialog(b, a) {
    this.parent = Window;
    this.parent(b, a, 450, 150)
}
var p = Window_Dialog.prototype = new Window();
p.onLoad = function() {
    var a = this;
    this.setPosition("bottom");
    this.setBackOpacity(0.8)
};
function Event(c, b, a) {
    if (!c) {
        return
    }
    this.rpg = b;
    this.self_switch = {};
    this.func_trigger = {};
    this.actions = c[0].actions || [];
    this.action_motions = {};
    this.action_prop = {};
    this.inAction = false;
    this.blockMovement = false;
    this.labelDetection = "";
    this.name = c[0].name ? c[0].name: a;
    this.commands = c.commands;
    this.id = !c[0].id ? Math.floor(Math.random() * 100000) : c[0].id;
    this.pages = c[1];
    this.x = c[0].x;
    this.y = c[0].y;
    this.real_x = c[0].real_x;
    this.real_y = c[0].real_y;
    this.regX = c[0].regX;
    this.regY = c[0].regY;
    this.opacity = 1;
    this.exp = [];
    this.params = {};
    this.currentLevel = 1;
    this.currentExp = 0;
    this.maxLevel = 100;
    this.itemEquiped = {};
    this.skillsByLevel = {};
    this.skills = {};
    this.elements = {};
    this.states = [];
    this.className = "";
    this.typeMove = "tile";
    this.behaviorMove = "";
    this.width = this.tile_w;
    this.height = this.tile_h;
    this.moving = false;
    this.stopMove = false;
    this.eventsContact = false;
    this.detection = false;
    this._wait = {
        frame: 0
    };
    this.currentFreq = 1;
    this.fixcamera = false;
    this.targetPos = {
        x: this.x,
        y: this.y
    };
    this.bitmap;
    this.bar;
    this.sprite = new Container();
    this.changePage = true;
    this.currentPage = 0;
    this.tab_move_passable = [];
    this.tab_move = [];
    this.htmlElements = [];
    this.htmlElementMouse;
    this.tickPlayer;
    this.initialize()
}
var interpreter = Event.prototype = new Interpreter();
var p = {
    initialize: function() {
        Ticker.addListener(this);
        if (this.name != "Player") {
            this.rpg.events.push(this)
        }
        this.refresh()
    },
    init_tab_move: function() {
        for (var c = 0; c < this.tactical.move * 2 + 1; c++) {
            this.tab_move_passable[c] = [];
            for (var b = 0; b < this.tactical.move * 2 + 1; b++) {
                this.tab_move_passable[c][b] = -1
            }
        }
        var a = Math.floor(this.tab_move_passable.length / 2);
        this.tab_move_passable[a][a] = 0
    },
    refresh: function() {
        var b = this;
        function f() {
            if (h.character_hue && b.direction) {
                b.bitmap.gotoAndStop(b.direction)
            }
            if (b.real_x !== undefined && b.real_y !== undefined) {
                b.setPositionReal(b.real_x, b.real_y)
            } else {
                b.setPosition(b.x, b.y)
            }
            b._trigger()
        }
        var e = this.setPage();
        if (!e) {
            if (this.bitmap != undefined) {
                this.rpg.layer[3].removeChild(this.sprite);
                this.character_hue = undefined
            }
            return
        }
        var h = this.pages[this.currentPage];
        var a = h.action_battle;
        this.commands = h.commands;
        this.tactical = h.tactical;
        if (!this.actionBattle && h.action_battle) {
            this.actionBattle = a;
            this.actionBattle.hp = this.actionBattle.hp_max;
            this.actions = this.actionBattle.actions;
            if (a.maxLevel) {
                this.maxLevel = a.maxLevel
            }
            if (a.expList) {
                this.makeExpList(a.expList.basis, a.expList.inflation)
            }
            if (a.level) {
                this.setLevel(a.level)
            }
            if (a.params) {
                var g;
                for (var d in a.params) {
                    if (typeof a.params[d] == "number") {
                        g = a.params[d];
                        a.params[d] = [g, g]
                    }
                    this.setParam(d, a.params[d][0], a.params[d][1], "proportional")
                }
            }
            if (a.items) {
                for (var d in a.items) {
                    for (var c = 0; c < a.items[d].length; c++) {
                        this.equipItem(d, a.items[d][c])
                    }
                }
            }
            if (a.elements) {
                this.setElements(a.elements)
            }
            if (a.skillsToLearn) {
                this.skillsToLearn(a.skillsToLearn)
            }
            if (a["class"]) {
                this.setClass(a["class"])
            }
            if (a.states) {
                for (var c = 0; c < a.states.length; c++) {
                    this.addState(a.states[c])
                }
            }
            this.setTypeMove("real")
        }
        this.trigger = h.trigger;
        this.direction_fix = h.direction_fix;
        this.no_animation = h.no_animation;
        this.stop_animation = h.stop_animation;
        this.speed = h.speed === undefined ? 4 : h.speed;
        this.type = h.type || "fixed";
        this.frequence = (h.frequence || 0) * 5;
        this.nbSequenceX = h.nbSequenceX || 4;
        this.nbSequenceY = h.nbSequenceY || 4;
        this.speedAnimation = h.speedAnimation || 5;
        this.graphic_pattern = h.pattern === undefined ? 0 : h.pattern;
        this.through = h.character_hue ? h.through: true;
        this.alwaysOnTop = h.alwaysOnTop || false;
        this.alwaysOnBottom = h.alwaysOnBottom || false;
        this.sprite.z = this.alwaysOnBottom ? 0 : false;
        if (this.alwaysOnBottom === false) {
            this.sprite.z = this.alwaysOnTop ? (this.rpg.getMapHeight() + 1) * this.rpg.tile_h: false
        }
        this.direction = h.direction;
        if (this.character_hue !== undefined) {
            if (this.character_hue !== h.character_hue) {
                this.rpg.layer[3].removeChild(this.sprite);
                this.character_hue = h.character_hue;
                if (this.character_hue) {
                    this.setCharacterHue(f)
                }
            } else {
                f()
            }
        } else {
            this.character_hue = h.character_hue;
            if (h.character_hue !== undefined) {
                this.setCharacterHue(f)
            } else {
                f()
            }
        }
        if (this.tactical != undefined) {
            this.tactical.status = "wait"
        }
    },
    displayBar: function(c, f, a, j, h, b) {
        if (this.bar) {
            a = a ? a: this.bar.width;
            j = j ? j: this.bar.height;
            f = f ? f: this.bar.max;
            this.sprite.removeChild(this.bar)
        }
        if (f == undefined) {
            return
        }
        if (!c) {
            c = f
        }
        if (c > f) {
            c = f
        }
        var d = new Shape();
        var g, e;
        if (h) {
            e = h.y;
            g = h.x
        } else {
            e = -5;
            g = -(a / 2 - this.rpg.tile_w / 2)
        }
        b = b || {};
        b.stroke = b.stroke || "000";
        b.fill = b.fill || "8FFF8C";
        var k = (100 * c / f) / 100;
        d.width = a;
        d.height = j;
        d.max = f;
        d.graphics.beginStroke("#" + b.stroke).drawRect(g, e, a, j);
        d.graphics.beginFill("#" + b.fill).drawRect(g, e, a * k, j);
        this.bar = d;
        this.sprite.addChild(d)
    },
    setSelfSwitch: function(c, a) {
        var b = this.rpg.currentMapInfo.name + "_" + this.id;
        this.self_switch[c] = a;
        if (!Cache.events_data[b]) {
            Cache.events_data[b] = {}
        }
        if (!Cache.events_data[b].self_switch) {
            Cache.events_data[b].self_switch = {}
        }
        Cache.events_data[b].self_switch[c] = a;
        this.rpg.call("selfSwitch", {
            event: this,
            id: c,
            enable: a
        });
        this.refresh()
    },
    selfSwitchesIsOn: function(c) {
        var a = this.rpg.currentMapInfo.name + "_" + this.id;
        var b = Cache.events_data[a];
        if (b && b.self_switch && b.self_switch[c]) {
            return true
        } else {
            return false
        }
    },
    refreshBitmap: function() {
        if (this.bitmap) {
            this.rpg.layer[3].addChild(this.sprite)
        }
    },
    setCharacterHue: function(c) {
        var a = this;
        var b;
        Cache.characters(this.character_hue,
        function(n) {
            a.height = n.height / a.nbSequenceY;
            a.width = n.width / a.nbSequenceX;
            if (a.regY === undefined) {
                a.regY = a.height - a.rpg.tile_h
            }
            if (a.regX === undefined) {
                a.regX = a.width - a.rpg.tile_w
            }
            var k = a.nbSequenceX * (a.nbSequenceY - 1) + a.graphic_pattern;
            var t = a.nbSequenceX * (a.nbSequenceY - 2 < 0 ? 0 : a.nbSequenceY - 2) + a.graphic_pattern;
            var g = a.nbSequenceX * (a.nbSequenceY - 3 < 0 ? 0 : a.nbSequenceY - 3) + a.graphic_pattern;
            var e = 0 + a.graphic_pattern;
            var o = a.nbSequenceX - 1;
            var h = {
                walkUp: [k, k + o],
                walkRight: [t, t + o],
                walkBottom: [e, e + o],
                walkLeft: [g, g + o],
                up: k,
                right: t,
                bottom: e,
                left: g
            };
            var s = new SpriteSheet(n, a.width, a.height, h);
            var j = new BitmapSequence(s);
            j.gotoAndStop(a.direction);
            j.waitFrame = Math.round(a.rpg.fps / a.speedAnimation);
            a.sprite.regY = a.regY;
            a.sprite.regX = a.regX;
            j.name = "event";
            j.id = a.id;
            a.bitmap = j;
            a.sprite.addChild(j);
            a.rpg.layer[3].addChild(a.sprite);
            var q, f, d;
            var r = new RegExp("(.*?)\\.(.*?)$", "gi");
            var m = r.exec(a.character_hue);
            if (a.actions) {
                for (b = 0; b < a.actions.length; b++) {
                    f = a.actions[b];
                    q = a.rpg.actions[f];
                    if (m != null) {
                        Cache.characters(m[1] + q.suffix_motion[0] + "." + m[2],
                        function(v, w) {
                            d = new SpriteSheet(v, v.width / a.nbSequenceX, v.height / a.nbSequenceY, h);
                            j = j.clone();
                            j.spriteSheet = d;
                            a.action_motions[w] = j
                        },
                        f)
                    }
                }
            }
            if (Rpg.debug) {
                var u = new Shape();
                u.graphics.beginStroke("#00FF00").drawRect(0, 0, a.width, a.height);
                a.sprite.addChild(u);
                var l = new Shape();
                l.graphics.beginStroke("#FF0000").drawRect(a.sprite.regX, a.sprite.regY, a.rpg.tile_w, a.rpg.tile_h);
                a.sprite.addChild(l)
            }
            if (c) {
                c()
            }
        })
    },
    _trigger: function() {
        this.htmlElementMouse = document.createElement("div");
        this.setMouseElement(0, 0, this.width, this.height);
        if (this.trigger == "parallel_process" || this.trigger == "auto" || this.trigger == "auto_one_time") {
            this.onCommands()
        }
        this.moveType();
        if (this.stop_animation) {
            this.animation("stop")
        }
    },
    setMouseElement: function(b, f, d, a) {
        var c = this.htmlElementMouse;
        var e = this.sprite.localToGlobal(b, f);
        c.style.position = "absolute";
        c.style.width = d + "px";
        c.style.height = a + "px";
        c.style.left = e.x + "px";
        c.style.top = e.y + "px";
        c.setAttribute("data-px", b);
        c.setAttribute("data-py", f);
        this.htmlElementMouse = c
    },
    moveType: function() {
        if (this.type == "random") {
            this.moveRandom()
        } else {
            if (this.type == "approach") {
                this.approachPlayer()
            }
        }
    },
    click: function() {
        if (this.trigger == "click") {
            this.onCommands()
        }
        if (this.rpg.isTactical()) {
            this.rpg.tacticalAreaClear();
            this.rpg.tactical.event_selected = this;
            if (this.tactical.status == "wait") {
                this.pathMove();
                for (var b = 0; b < this.tab_move.length; b++) {
                    var a = this.tab_move[b][0];
                    var c = this.tab_move[b][1];
                    this.rpg.tacticalMap[a][c].visible = true;
                    this.tactical.status = "readyMove"
                }
            } else {
                if (this.tactical.status == "readyMove") {
                    this.rpg.tacticalAreaClear();
                    this.tactical.status = "wait"
                }
            }
        }
    },
    fixCamera: function(a) {
        for (var b = 0; b < this.rpg.events.length; b++) {
            this.rpg.events[b].fixcamera = false
        }
        if (this.rpg.player) {
            this.rpg.player.fixcamera = false
        }
        this.fixcamera = a
    },
    tick: function() {
        if (this.bitmap == undefined) {
            return
        }
        if (this._wait.frame > 0) {
            this._wait.frame--;
            if (this._wait.frame == 0 && this._wait.callback) {
                this._wait.callback()
            }
            if (this._wait.block) {
                return
            }
        }
        var d = this.sprite.x;
        var c = this.sprite.y;
        var b = this.real_x;
        var a = this.real_y;
        var g = "";
        if (d != b) {
            if (b > d) {
                d += this.speed;
                if (d >= b) {
                    d = b;
                    g = "right"
                }
            } else {
                if (b < d) {
                    d -= this.speed;
                    if (d <= b) {
                        d = b;
                        g = "left"
                    }
                }
            }
            if (this.fixcamera) {
                this.rpg.screen_x = d - this.rpg.canvas.width / 2 + (this.rpg.canvas.width / 2 % this.rpg.tile_w)
            }
            this.sprite.x = d
        }
        if (c != a) {
            if (a > c) {
                c += this.speed;
                if (c >= a) {
                    c = a;
                    g = "bottom"
                }
            } else {
                if (a < c) {
                    c -= this.speed;
                    if (c <= a) {
                        c = a;
                        g = "up"
                    }
                }
            }
            if (this.fixcamera) {
                this.rpg.screen_y = c - this.rpg.canvas.height / 2 + (this.rpg.canvas.height / 2 % this.rpg.tile_h)
            }
            this.sprite.y = c
        }
        if (g != "" || this.currentFreq > 1) {
            if (this.currentFreq == this.frequence || this.frequence == 0) {
                this.call("onFinishStep", g);
                this.currentFreq = 1
            } else {
                this.animation("stop");
                this.currentFreq++
            }
        }
        if (this.tickPlayer) {
            this.tickPlayer()
        }
        if (this.actionBattle) {
            var e = this.detectionPlayer(this.actionBattle.area);
            if (e && !this.detection) {
                this.detection = true;
                var j = this.rpg.actionBattle.detection ? this.rpg.actionBattle.detection[this.actionBattle.detection] : false;
                this.rpg.setEventMode(this, "detection");
                if (j) {
                    j(this)
                }
            } else {
                if (!e && this.detection) {
                    this.detection = false;
                    var f = this.rpg.actionBattle.nodetection ? this.rpg.actionBattle.nodetection[this.actionBattle.nodetection] : false;
                    this.rpg.setEventMode(this, "nodetection");
                    if (f) {
                        f(this)
                    }
                }
            }
            if (this.actionBattle.mode == "offensive") {
                if (this.rpg.actionBattle.eventOffensive && this.actionBattle.offensive) {
                    this.rpg.actionBattle.eventOffensive[this.actionBattle.offensive](this)
                }
                var b = this.sprite.x;
                var a = this.sprite.y;
                switch (this.direction) {
                case "up":
                    a -= this.speed;
                    break;
                case "right":
                    b += this.speed;
                    break;
                case "left":
                    b -= this.speed;
                    break;
                case "bottom":
                    a += this.speed;
                    break
                }
                var n = this.contactWithEvent(b, a);
                if (n.length > 0) {
                    this.rpg.setEventMode(this, "attack");
                    if (this.rpg.actionBattle.eventAttack && this.actionBattle.attack) {
                        this.rpg.actionBattle.eventAttack[this.actionBattle.attack](this)
                    }
                }
            }
        }
        for (var m in this.action_prop) {
            if (!isNaN(this.action_prop[m].wait)) {
                this.action_prop[m].wait++
            }
        }
        if (this._blink && this._blink.current) {
            if (this._blink.currentDuration != this._blink.duration) {
                if (this._blink.currentFrequence >= this._blink.frequence) {
                    this._blink.currentFrequence = 0;
                    this._blink.visible = this._blink.visible ? false: true;
                    this.visible(this._blink.visible)
                }
                this._blink.currentDuration++;
                this._blink.currentFrequence++
            } else {
                this._blink.current = false;
                this.visible(true);
                if (this._blink.callback) {
                    this._blink.callback()
                }
            }
        }
        var h = this.htmlElementMouse;
        var l = h.getAttribute("data-px");
        var k = h.getAttribute("data-py");
        var o = this.sprite.localToGlobal(l, k);
        h.style.left = o.x + "px";
        h.style.top = o.y + "px";
        this._tickState()
    },
    _contactWith: function(b, a, f) {
        b = b || this.real_x;
        a = a || this.real_y;
        var d, g, j = this.rpg.tile_w,
        e = this.rpg.tile_h;
        var l = [];
        if (f == "event") {
            for (d = 0; d <= this.rpg.events.length; d++) {
                if (!this.rpg.player) {
                    continue
                }
                g = this.rpg.events.length == d ? this.rpg.player: this.rpg.events[d];
                if (g.id != this.id) {
                    k(g,
                    function() {
                        l.push(g)
                    },
                    g.through)
                }
            }
            return l
        } else {
            if (f == "tile") {
                return k(g)
            }
        }
        function k(m, n, h) {
            if ((c(b, a, m, h) || c(b + j, a, m, h) || c(b + j / 2, a, m, h) || c(b, a + e, m, h) || c(b, a + e / 2, m, h) || c(b + j / 2, a + e, m, h) || c(b + j, a + e / 2, m, h) || c(b + j, a + e, m, h))) {
                if (n) {
                    n()
                }
                return true
            }
            return false
        }
        function c(h, r, q, o) {
            var n = q.real_x;
            var m = q.real_y;
            if (o && h == n && r == m) {
                return true
            }
            return h > n && h < n + j && r > m && r < m + e
        }
    },
    contactWithEvent: function(c, b) {
        var a = this._contactWith(c, b, "event");
        this.call("contact", a);
        this.rpg.call("eventContact", {
            src: this,
            target: a
        });
        return a
    },
    fadeOut: function(a, b) {
        new Effect(this.sprite).fadeOut(a, b)
    },
    fadeIn: function(a, b) {
        new Effect(this.sprite).fadeIn(a, b)
    },
    blink: function(b, a, c) {
        this._blink = {};
        this._blink.duration = b;
        this._blink.currentDuration = 0;
        this._blink.frequence = a;
        this._blink.currentFrequence = 0;
        this._blink.visible = true;
        this._blink.current = true;
        this._blink.callback = c
    },
    visible: function(a) {
        this.sprite.visible = a
    },
    wait: function(b, a, c) {
        this._wait.frame = b;
        this._wait.block = a;
        this._wait.callback = c
    },
    detectionPlayer: function(b) {
        var a = this.rpg.player;
        if (!a) {
            return false
        }
        if (a.x <= this.x + b && a.x >= this.x - b && a.y <= this.y + b && a.y >= this.y - b) {
            return true
        }
        return false
    },
    detectionEvents: function(e, a) {
        var c = this.rpg.events;
        var f = [];
        var b, d;
        for (b = 0; b < c.length; b++) {
            d = c[b];
            if (d.real_x <= this.real_x + e && d.real_x >= this.real_x - e && d.real_y <= this.real_y + e && d.real_y >= this.real_y - e && d.id != this.id) {
                d.labelDetection = a;
                d.refresh();
                f.push(d)
            }
        }
        this.rpg.call("eventDetected", {
            src: this,
            events: f
        });
        return f
    },
    distance: function(b, g, a, f) {
        var e = Math.abs(b - a) + Math.abs(g - f);
        var c = Math.abs(this.x - a) + Math.abs(this.y - f);
        var d = e + c;
        return {
            _final: e,
            ini: c,
            somme: d
        }
    },
    animation: function(d, c, b, a) {
        if (!this.bitmap) {
            return false
        }
        if (d == "stop") {
            if (this.stop_animation) {
                d = "walk"
            } else {
                if (!this.direction_fix) {
                    this.bitmap.gotoAndStop(this.direction);
                    return
                } else {
                    if (this.direction_fix) {
                        return
                    }
                }
            }
        }
        if (d == "walk") {
            switch (this.direction) {
            case "left":
                d = "walkLeft";
                break;
            case "right":
                d = "walkRight";
                break;
            case "up":
                d = "walkUp";
                break;
            case "bottom":
                d = "walkBottom";
                break
            }
        }
        if (this.bitmap.currentSequence != d) {
            this.bitmap.nbSequenceToPlay = a ? a: -1;
            this.bitmap.gotoAndPlay(d);
            this.bitmap.waitFrame = c ? Math.ceil(this.rpg.fps / c) : this.bitmap.waitFrame;
            this.bitmap.callback = b
        }
    },
    setStopDirection: function(a) {
        this.direction = a;
        this.animation("stop")
    },
    turnTowardPlayer: function() {
        var b = this.rpg.player;
        if (b) {
            var a = this.directionRelativeToPlayer();
            if (a == 2) {
                this.setStopDirection("up")
            } else {
                if (a == 8) {
                    this.setStopDirection("bottom")
                } else {
                    if (a == 6) {
                        this.setStopDirection("right")
                    } else {
                        if (a == 4) {
                            this.setStopDirection("left")
                        }
                    }
                }
            }
        }
    },
    moveAwayFromPlayer: function(c, d) {
        var a;
        var b = this.rpg.player;
        if (b) {
            if (b.y < this.y) {
                a = 8
            } else {
                if (b.y > this.y) {
                    a = 2
                } else {
                    if (b.x > this.x) {
                        a = 4
                    } else {
                        if (b.x < this.x) {
                            a = 6
                        }
                    }
                }
            }
            this.move([a], c, d)
        }
    },
    directionRelativeToPlayer: function() {
        var b = this.rpg.player;
        var c = Math.floor(this.real_x / b.speed) * b.speed;
        var a = Math.floor(this.real_y / b.speed) * b.speed;
        if (b) {
            if (b.real_y < a) {
                return 2
            }
            if (b.real_y > a) {
                return 8
            }
            if (b.real_x > c) {
                return 6
            }
            if (b.real_x < c) {
                return 4
            }
        }
        return false
    },
    _setBehaviorMove: function(a) {
        this.real_x = this.sprite.x;
        this.real_y = this.sprite.y;
        this.behaviorMove = a
    },
    _isBehaviorMove: function(a) {
        return this.behaviorMove == a
    },
    approachPlayer: function() {
        var a = this;
        this._setBehaviorMove("approachPlayer");
        b();
        function b() {
            if (!a._isBehaviorMove("approachPlayer")) {
                return
            }
            var c = a.directionRelativeToPlayer();
            if (c) {
                a.move(c,
                function(d) {
                    if (d) {
                        b()
                    }
                },
                true)
            }
        }
    },
    moveStop: function(a) {
        if (a) {
            this.animation("stop")
        }
        this._setBehaviorMove("stop");
        this.stopMove = true
    },
    moveStart: function() {
        this.stopMove = false
    },
    moveRandom: function() {
        var a = this;
        this._setBehaviorMove("moveRandom");
        b();
        function b() {
            if (!a._isBehaviorMove("moveRandom")) {
                return
            }
            var f = (Math.floor(Math.random() * 4) + 1) * 2;
            var c = [];
            if (a.typeMove == "real") {
                var e = 8;
                for (var d = 0; d < e; d++) {
                    c.push(f)
                }
            } else {
                c = f
            }
            a.move(c,
            function() {
                b()
            },
            true)
        }
    },
    canMove: function(b) {
        var a = this.x;
        var d = this.y;
        var c = true;
        switch (b) {
        case 2:
            d--;
            break;
        case 4:
            a--;
            break;
        case 6:
            a++;
            break;
        case 8:
            d++;
            break
        }
        if (this.rpg.player && this.rpg.player.x == a && this.rpg.player.y == d) {
            this.moving = false;
            return false
        }
        c = this.rpg.isPassable(a, d);
        if (!c) {
            this.moving = false
        }
        return c
    },
    move: function(e, k, j) {
        var n = this;
        var g = 0;
        var h = true;
        if (typeof e == "number" || typeof e == "string") {
            e = [e]
        }
        if (e.length == 0 || this.blockMovement) {
            this.moving = false;
            return
        }
        function b(r, q) {
            var s = n.rpg._positionRealToValue(r, q);
            return n.rpg.isPassable(s.x, s.y)
        }
        function o(v, s, r) {
            var y = 1;
            var q = n.rpg.tile_w - y;
            var u = n.rpg.tile_h - y;
            var t, x;
            if (r == "right") {}
            x = b(v, s);
            x &= b(v + q, s);
            t = b(v, s + u);
            t &= b(v + q, s + u);
            return x && t
        }
        function m(r) {
            var q;
            var s = n.typeMove == "tile" || n.moveWithMouse ? (r == "left" ? n.rpg.tile_w: n.rpg.tile_h) : n.speed;
            if (r == "left" || r == "up") {
                return - s
            } else {
                return s
            }
        }
        function d(s) {
            var r;
            var v = n.real_x + m(s);
            var t = n.rpg.isometric ? n.real_y + m(s) / 2 : n.real_y;
            var u = n.rpg._positionRealToValue(v, t).x;
            var q = f(v, t, s);
            if (!j || (j && o(v, t, s) && q)) {
                n.real_x = v;
                n.real_y = t;
                n.x = u
            } else {
                h = false;
                if (q) {
                    l(v, t, s)
                } else {}
            }
            n.direction = s
        }
        function c(r) {
            if (n.rpg.isometric) {
                var u = n.real_x + -m(r);
                var t = n.real_y + m(r) / 2
            } else {
                var t = n.real_y + m(r);
                var u = n.real_x
            }
            var q = f(u, t, r);
            var s = n.rpg._positionRealToValue(u, t).y;
            if (!j || (j && o(u, t, r) && q)) {
                n.real_y = t;
                n.real_x = u;
                n.y = s
            } else {
                h = false;
                if (q) {
                    l(u, t, r)
                } else {}
            }
            n.direction = r
        }
        function f(t, s, q) {
            var r, v, u;
            v = t;
            u = s;
            if (n.typeMove == "tile" || n.moveWithMouse) {
                if (q == "left" || q == "right") {
                    v = t + (q == "left" ? n.rpg.tile_w: -n.rpg.tile_w) / 2
                } else {
                    u = s + (q == "up" ? n.rpg.tile_h: -n.rpg.tile_h) / 2
                }
            }
            var w = n.contactWithEvent(v, u);
            if (w.length > 0) {
                for (r = 0; r < w.length; r++) {
                    if (!w[r].through) {
                        return l(t, s, q, w[r])
                    }
                }
            }
            return true
        }
        function l(s, r, q, t) {
            h = false;
            if (n.typeMove == "tile" || n.moveWithMouse) {
                return false
            }
            if (q == "left" || q == "right") {
                if (t) {
                    n.real_x = t.real_x - (q == "right" ? n.rpg.tile_w: 0)
                } else {
                    n.real_x = Math.floor(Math.abs(s / n.rpg.tile_w)) * n.rpg.tile_w
                }
            } else {
                if (t) {
                    n.real_y = t.real_y - (q == "bottom" ? n.rpg.tile_h: 0)
                } else {
                    n.real_y = Math.floor(Math.abs(r / n.rpg.tile_h)) * n.rpg.tile_h
                }
            }
            if (q == "left" && s > 0) {
                n.real_x += n.rpg.tile_w
            }
            if (q == "up" && r > 0) {
                n.real_y += n.rpg.tile_h
            }
            return false
        }
        function a() {
            switch (e[g]) {
            case "upLeft":
            case "up":
            case 2:
                c("up");
                if (!n.no_animation) {
                    n.animation("walkUp")
                }
                break;
            case "left":
            case 4:
                d("left");
                if (!n.no_animation) {
                    n.animation("walkLeft")
                }
                break;
            case "right":
            case 6:
                d("right");
                if (!n.no_animation) {
                    n.animation("walkRight")
                }
                break;
            case "bottom":
            case 8:
                c("bottom");
                if (!n.no_animation) {
                    n.animation("walkBottom")
                }
                break
            }
            n.moving = true;
            n.rpg._sortEventsDepthIndex();
            if (!h) {
                n.call("onFinishStep", h)
            }
        }
        this.bind("onFinishStep",
        function(q) {
            g++;
            if (g >= e.length) {
                if (k) {
                    k(q)
                }
                n.moving = false
            } else {
                a()
            }
        });
        this.bind("contact",
        function(q) {
            if (q.length > 0) {
                n.eventsContact = q;
                if (n.name == "Player") {
                    n.interactionEventBeside(q, "contact")
                }
            } else {
                n.eventsContact = false
            }
        });
        a()
    },
    jump: function(a, d) {
        if (a != 0 || d != 0) {
            if (Math.abs(a) > Math.abs(d)) {
                a < 0 ? this.setStopDirection("left") : this.setStopDirection("right")
            } else {
                d < 0 ? this.setStopDirection("up") : this.setStopDirection("down")
            }
        }
        var c = this.x + a;
        var b = this.y + d
    },
    getEventBeside: function(b) {
        var a = this.x;
        var d = this.y;
        var c;
        switch (this.direction) {
        case "up":
            d--;
            break;
        case "right":
            a++;
            break;
        case "left":
            a--;
            break;
        case "bottom":
            d++;
            break
        }
        if (b) {
            if (this.rpg.player && this.rpg.player.x == a && this.rpg.player.y == d) {
                c = this.rpg.player
            }
        } else {
            c = this.rpg.getEventByPosition(a, d)
        }
        return c
    },
    getEventAround: function(e) {
        var d, a, g, b;
        var f = {};
        var c = ["up", "right", "left", "bottom"];
        for (d = 0; d < 4; d++) {
            b = false;
            a = this.x;
            g = this.y;
            switch (c[d]) {
            case "up":
                g--;
                break;
            case "right":
                a++;
                break;
            case "left":
                a--;
                break;
            case "bottom":
                g++;
                break
            }
            if (e) {
                if (this.rpg.player && this.rpg.player.x == a && this.rpg.player.y == g) {
                    f[c[d]] = [this.rpg.player];
                    b = true
                }
            }
            if (!b) {
                f[c[d]] = this.rpg.getEventByPosition(a, g, true)
            }
        }
        return f
    },
    actionType: function(b) {
        var c;
        var a = this;
        switch (b) {
        case "attack":
            c = this.getEventBeside();
            if (c && c.actionBattle) {
                if (c.actionBattle.mode == "invinsible") {
                    if (this.rpg.actionBattle.eventInvinsible && c.actionBattle.invinsible) {
                        this.rpg.actionBattle.eventInvinsible[c.actionBattle.invinsible](c)
                    }
                    return
                }
                if (this.rpg.actionBattle.eventAffected && c.actionBattle.affected) {
                    this.rpg.setEventMode(c, "affected");
                    this.rpg.actionBattle.eventAffected[c.actionBattle.affected](c)
                }
                if (c.actionBattle.hp <= 0) {
                    this.rpg.setEventMode(c, "death");
                    var d = c.actionBattle.animation_death;
                    if (d) {
                        this.rpg.animations[d].setPosition(c.x, c.y);
                        this.rpg.animations[d].play()
                    }
                    c.fadeOut(5,
                    function() {
                        var m = c.actionBattle.ennemyDead;
                        var k = Math.floor(Math.random() * 100);
                        var h = 0,
                        e = 0,
                        l = null;
                        if (m) {
                            for (var g = 0; g < m.length; g++) {
                                e += m[g].probability;
                                if (k >= h && k <= e - 1) {
                                    l = g;
                                    break
                                }
                                h += e
                            }
                        }
                        a.rpg.removeEvent(c.id);
                        if (l != null) {
                            var j = m[l].name;
                            var f = a.rpg.actionBattle.ennemyDead ? a.rpg.actionBattle.ennemyDead[m[l].call] : false;
                            if (f) {
                                f(c, j)
                            }
                        }
                    })
                } else {
                    c.displayBar(c.actionBattle.hp)
                }
            }
            break
        }
    },
    action: function(b, h) {
        var e = this.rpg.actions[b];
        var g = 0;
        var k = this;
        var c = this.bitmap;
        var f, d;
        if (this.action_prop[b] && !isNaN(this.action_prop[b].wait) && this.action_prop[b].wait < e.wait_finish) {
            return false
        }
        if (this.inAction) {
            return false
        }
        if (e.condition && !e.condition()) {
            return false
        }
        if (e.onStart) {
            e.onStart(this)
        }
        this.changeBitmap(this.action_motions[b]);
        this.direction_fix = true;
        this.no_animation = true;
        this.inAction = true;
        this.blockMovement = e.block_movement;
        function a(l) {
            if (e[l]) {
                if (typeof e[l] === "string") {
                    f = e[l]
                } else {
                    f = e[l][k.direction]
                }
                if (f) {
                    k.rpg.animations[f].setPosition(k.x, k.y);
                    k.rpg.animations[f].play()
                }
            }
        }
        this.actionType(e.action);
        d = e.duration_motion ? e.duration_motion: 1;
        a("animations");
        this.animation("walk", e.speed !== undefined ? e.speed: 10,
        function(l) {
            if (g > 0) {
                a("animations")
            }
            if (d - 1 == g) {
                l.paused = true;
                j()
            }
            g++
        },
        d);
        function j() {
            k.blockMovement = false;
            k.direction_fix = false;
            k.no_animation = false;
            k.changeBitmap(c);
            k.animation("stop");
            k.inAction = false;
            k.action_prop[b] = {};
            k.action_prop[b].wait = 0;
            a("animation_finish");
            if (e.onFinish) {
                e.onFinish(k)
            }
            if (h) {
                h(k)
            }
        }
    },
    turn: function() {},
    changeBitmap: function(a) {
        this.sprite.removeChild(this.bitmap);
        this.bitmap = a.clone();
        this.sprite.addChild(this.bitmap)
    },
    pathfinding: function(C, a, m) {
        var e = this.x;
        var c = this.y;
        var D = [];
        var b = {};
        b[e] = {};
        b[e][c] = [null, null, null];
        var n = this.distance(C, a, e, c);
        var u = {};
        u[e] = {};
        u[e][c] = [0, n._final, n.somme, 0];
        var o = 0,
        A;
        while (! (e == C && c == a)) {
            if (c == null || e == null) {
                return []
            }
            o++;
            for (var z = 0; z < 4; z++) {
                e = parseInt(e);
                c = parseInt(c);
                switch (z) {
                case 0:
                    var g = c - 1;
                    var l = e;
                    break;
                case 1:
                    var g = c;
                    var l = e + 1;
                    break;
                case 2:
                    var g = c + 1;
                    var l = e;
                    break;
                case 3:
                    var g = c;
                    var l = e - 1;
                    break
                }
                A = true;
                if (!m) {
                    for (var v = 0; v < this.rpg.events.length; v++) {
                        if (this.rpg.events[v].x == l && this.rpg.events[v].y == g && !this.rpg.events[v].through) {
                            A = false;
                            break
                        }
                    }
                }
                if (!Rpg.keyExist(b, [l, g])) {
                    if ((this.rpg.isPassable(l, g) && A) || Rpg.valueExist(this.tab_move, [l, g])) {
                        var n = this.distance(C, a, l, g);
                        if (b[l] == undefined) {
                            b[l] = {}
                        }
                        b[l][g] = [n.ini, n._final, n.somme, o]
                    }
                }
            }
            b[e][c] = [null, null, null];
            var t = min_somme_dis = 200;
            var d = new_pos = [];
            for (var B in b) {
                for (var w in b[B]) {
                    var s = b[B][w];
                    if (s[2] != null) {
                        if (s[2] <= min_somme_dis && s[1] <= t) {
                            t = s[1];
                            min_somme_dis = s[2];
                            d = s;
                            new_pos = [B, w]
                        }
                    }
                }
            }
            if (u[new_pos[0]] == undefined) {
                u[new_pos[0]] = {}
            }
            u[new_pos[0]][new_pos[1]] = d;
            e = new_pos[0];
            c = new_pos[1]
        }
        var k = 200;
        while (k != 0) {
            var k = min_somme_dis = min_dis_id = 200;
            e = parseInt(e);
            c = parseInt(c);
            if (c == null || e == null) {
                return []
            }
            for (var z = 0; z < 4; z++) {
                switch (z) {
                case 0:
                    var g = c - 1;
                    var l = e;
                    var q = 8;
                    break;
                case 1:
                    var g = c;
                    var l = e + 1;
                    var q = 4;
                    break;
                case 2:
                    var g = c + 1;
                    var l = e;
                    var q = 2;
                    break;
                case 3:
                    var g = c;
                    var l = e - 1;
                    var q = 6;
                    break
                }
                if (u[l] == undefined) {
                    u[l] = {}
                }
                var s = u[l][g];
                u[e][c] = null;
                if (s != null) {
                    if (s[3] < min_dis_id) {
                        min_dis_id = s[3];
                        k = s[0];
                        var r = q;
                        var h = l;
                        var f = g
                    }
                }
            }
            e = h;
            c = f;
            D.push(r)
        }
        return D.reverse()
    },
    pathMove: function() {
        var k = this.x;
        var h = this.y;
        var o = [];
        var e = [[k, h]];
        var n = 0;
        var m = e[0][0] - this.tactical.move;
        var l = e[0][1] - this.tactical.move;
        this.tab_move = [];
        this.init_tab_move();
        while (n != this.tactical.move && !e.length == 0) {
            o = [];
            for (var d = 0; d < e.length; d++) {
                var b = e[d][0];
                var a = e[d][1];
                var g = b - m;
                var f = a - l;
                for (var c = 0; c < 4; c++) {
                    switch (c) {
                    case 0:
                        if (this.rpg.isPassable(b, a + 1) && this.tab_move_passable[g][f + 1] == -1) {
                            o.push([b, a + 1]);
                            this.tab_move.push([b, a + 1]);
                            this.tab_move_passable[g][f + 1] = 0
                        }
                        break;
                    case 1:
                        if (this.rpg.isPassable(b + 1, a) && this.tab_move_passable[g + 1][f] == -1) {
                            o.push([b + 1, a]);
                            this.tab_move.push([b + 1, a]);
                            this.tab_move_passable[g + 1][f] = 0
                        }
                        break;
                    case 2:
                        if (this.rpg.isPassable(b, a - 1) && this.tab_move_passable[g][f - 1] == -1) {
                            o.push([b, a - 1]);
                            this.tab_move.push([b, a - 1]);
                            this.tab_move_passable[g][f - 1] = 0
                        }
                        break;
                    case 3:
                        if (this.rpg.isPassable(b - 1, a) && this.tab_move_passable[g - 1][f] == -1) {
                            o.push([b - 1, a]);
                            this.tab_move.push([b - 1, a]);
                            this.tab_move_passable[g - 1][f] = 0
                        }
                        break
                    }
                }
            }
            e = this.rpg.clone(o);
            n += 1
        }
    },
    setPosition: function(a, b) {
        this.sprite.x = this.real_x = this.rpg._positionValueToReal(a, b).x;
        this.sprite.y = this.real_y = this.rpg._positionValueToReal(a, b).y;
        this.x = a;
        this.y = b;
        this._setPosition()
    },
    setPositionReal: function(b, a) {
        this.sprite.x = this.real_x = b;
        this.sprite.y = this.real_y = a;
        this.x = this.rpg._positionRealToValue(b, a).x;
        this.y = this.rpg._positionRealToValue(b, a).y;
        this._setPosition()
    },
    _setPosition: function() {
        this.moving = false;
        this.animation("stop")
    },
    setTypeMove: function(a) {
        this.typeMove = a
    },
    setIndexBefore: function(a) {
        var b = a - 1;
        if (b < 0) {
            b = 0
        }
        this.setIndexAfter(b)
    },
    setIndexAfter: function(a) {
        var b = this.rpg.layer[3];
        b.removeChild(this.sprite);
        b.addChildAt(this.sprite, a)
    },
    getIndex: function() {
        return this.rpg.layer[3].getChildIndex(this.sprite)
    },
    createEventRelativeThis: function(c, h) {
        if (h.x === undefined) {
            h.x = 0
        }
        if (h.y === undefined) {
            h.y = 0
        }
        var a = this.real_x + h.x * this.rpg.tile_w;
        var g = this.real_y + h.y * this.rpg.tile_h;
        var e = a,
        d = g;
        if (h.dir !== undefined) {
            var b = h.dir * this.rpg.tile_w;
            switch (this.direction) {
            case "up":
                d = g - b;
                break;
            case "left":
                e = a - b;
                break;
            case "right":
                e = a + b;
                break;
            case "bottom":
                d = g + b;
                break
            }
        }
        this.rpg.setEventPrepared(c, {
            real_x: h.move ? a: e,
            real_y: h.move ? g: d
        });
        var f = this.rpg.addEventPrepared(c);
        if (h.move) {
            f.real_x = e;
            f.real_y = d
        }
        if (!f) {
            return false
        }
    },
    commandsExit: function() {
        this.currentCmd = -2
    },
    getElementById: function(d) {
        var b;
        var c = new RegExp("^" + d + "-");
        for (b = 0; b < this.htmlElements.length; b++) {
            var a = this.htmlElements[b].childNodes[0];
            if (c.test(a.getAttribute("id"))) {
                return a
            }
        }
        return false
    },
    setPage: function() {
        var e = false;
        for (var c = this.pages.length - 1; c >= 0; c--) {
            if (!e) {
                if (!this.pages[c].conditions) {
                    this.currentPage = c;
                    e = true
                } else {
                    var d = true;
                    var f = this.pages[c].conditions;
                    if (f.switches !== undefined) {
                        d &= this.rpg.switchesIsOn(f.switches)
                    }
                    if (f.self_switch !== undefined) {
                        d &= this.selfSwitchesIsOn(f.self_switch)
                    }
                    if (f.variables !== undefined) {
                        var b = this.rpg.getVariable(f.variables);
                        var a = f.equalOrAbove;
                        d &= b >= a
                    }
                    if (f.detection !== undefined) {
                        d &= f.detection == this.labelDetection
                    }
                    if (d) {
                        this.currentPage = c;
                        e = true
                    }
                }
            }
        }
        return e
    },
    bind: function(a, b) {
        this.func_trigger[a] = b
    },
    call: function(a, b) {
        if (this.func_trigger[a]) {
            this.func_trigger[a](b)
        }
    },
    makeExpList: function(e, d, a) {
        a = a || this.maxLevel;
        if (e instanceof Array) {
            this.exp = e
        } else {
            this.exp[0] = this.exp[1] = 0;
            var b = 2.4 + d / 100;
            var f;
            for (var c = 2; c <= a; c++) {
                f = e * (Math.pow((c + 3), b)) / (Math.pow(5, b));
                this.exp[c] = this.exp[c - 1] + parseInt(f)
            }
        }
        return this.exp
    },
    addExp: function(a) {
        this.rpg.call("addExp", {
            event: this,
            exp: a
        });
        return this.setExp(this.currentExp + a)
    },
    setExp: function(e) {
        if (this.exp.length == 0) {
            throw "makeExpList() must be called before setExp()";
            return false
        }
        var d;
        var c = this.currentLevel;
        this.currentExp = e;
        for (var b = 0; b < this.exp.length; b++) {
            if (this.exp[b] > e) {
                d = b - 1;
                break
            }
        }
        if (!d) {
            d = this.maxLevel;
            this.currentExp = this.exp[this.exp.length - 1]
        }
        this.currentLevel = d;
        var a = d - c;
        if (a != 0) {
            this.rpg.call("changeLevel", {
                event: this,
                new_level: d,
                old_level: c
            });
            this._changeSkills()
        }
        return a
    },
    setLevel: function(b) {
        var a = this.currentLevel;
        this.currentLevel = b;
        if (this.exp.length > 0) {
            this.currentExp = this.exp[b]
        }
        this.rpg.call("changeLevel", {
            event: this,
            new_level: b,
            old_level: a
        });
        this._changeSkills();
        return b - a
    },
    _changeSkills: function() {
        var b;
        for (var a = 0; a <= this.currentLevel; a++) {
            b = this.skillsByLevel[a];
            if (b && !this.skills[b.id]) {
                this.learnSkill(b)
            }
        }
    },
    setParam: function(a, c, e, f) {
        if (!this.params[a]) {
            this.params[a] = [0]
        }
        if (c instanceof Array) {
            this.params[a] = c
        } else {
            var d;
            if (f == "proportional") {
                d = (e - c) / (this.maxLevel - 1)
            }
            for (var b = 1; b <= this.maxLevel; b++) {
                this.params[a][b] = Math.ceil(c + (b - 1) * d)
            }
            this.params[a].push(e)
        }
        return this.params[a]
    },
    getCurrentParam: function(a) {
        return this.params[a][this.currentLevel]
    },
    equipItem: function(b, a) {
        if (!this.itemEquiped[b]) {
            this.itemEquiped[b] = []
        }
        this.itemEquiped[b].push(a)
    },
    itemIsEquiped: function(b, a) {
        if (this.itemEquiped[b][a]) {
            return true
        } else {
            return false
        }
    },
    removeItemEquiped: function(b, a) {
        if (!this.itemEquiped[b]) {
            return false
        }
        delete this.itemEquiped[b][a];
        return true
    },
    getItemsEquipedByType: function(a) {
        if (!this.itemEquiped[a]) {
            return false
        }
        return this.itemEquiped[a]
    },
    skillsToLearn: function(a) {
        this.skillsByLevel = a
    },
    setSkillToLearn: function(b, a) {
        this.skillsByLevel[b] = a
    },
    setClass: function(a) {
        this.className = a;
        var b = Database.classes[a];
        if (b) {
            if (b.skills) {
                this.skillsToLearn(b.skills)
            }
            if (b.elements) {
                this.setElements(b.elements)
            }
        }
    },
    setElements: function(a) {
        this.elements = a
    },
    learnSkill: function(b, a) {
        if (typeof b == "string") {
            a = Database.skills[b];
            b = a.id
        }
        this.skills[b] = a;
        this.rpg.call("learnSkill", {
            event: this,
            id: b,
            prop: a
        })
    },
    removeSkill: function(a) {
        if (typeof a == "string") {
            a = Database.skills[a].id
        }
        if (this.skills[a]) {
            delete this.skills[a];
            this.rpg.call("removeSkill", {
                event: this,
                id: a
            });
            return true
        } else {
            return false
        }
    },
    setSkill: function(c, b) {
        for (var a in b) {
            this.skills[c][a] = b[a]
        }
    },
    getSkill: function(a) {
        return this.skills[a] ? this.skills[a] : false
    },
    addState: function(a) {
        if (typeof a == "string") {
            a = Database.states[a]
        }
        a.duringTime = 0;
        this.states.push(a);
        this.rpg.call("addState", {
            event: this,
            prop: a
        });
        a.onStart(this)
    },
    removeState: function(b) {
        if (typeof b == "string") {
            b = Database.states[b].id
        }
        for (var a = 0; a < this.states.length; a++) {
            if (this.states[a].id == b) {
                this.states[a].onRelease(this);
                this.rpg.call("removeState", {
                    event: this,
                    prop: this.states[a]
                });
                delete this.states[a];
                return
            }
        }
    },
    stateInflicted: function(b) {
        if (typeof prop == "string") {
            b = Database.states[b].id
        }
        for (var a = 0; a < this.states.length; a++) {
            if (this.states[a].id == b) {
                return true
            }
        }
        return false
    },
    _tickState: function() {
        var b;
        for (var a = 0; a < this.states.length; a++) {
            b = this.states[a];
            if (b) {
                b.duringTime++;
                if (b.onDuring) {
                    b.onDuring(this, b.duringTime)
                }
            }
        }
    }
};
for (var obj in p) {
    interpreter[obj] = p[obj]
}
function Player(d, b) {
    var c = d.speed ? d.speed: 8;
    b.setScrolling(c);
    var a = [{
        name: "Player",
        x: d.x,
        y: d.y,
        real_x: d.real_x,
        real_y: d.real_y,
        regX: d.regX,
        regY: d.regY,
        actions: d.actions
    },
    [{
        character_hue: d.filename,
        direction: d.direction ? d.direction: "bottom",
        trigger: "player",
        no_animation: d.no_animation,
        speed: c,
        commands: [],
        action_battle: d.actionBattle,
        nbSequenceX: d.nbSequenceX,
        nbSequenceY: d.nbSequenceY,
        speedAnimation: d.speedAnimation
    }]];
    b.speedScrolling = c;
    this.moveWithMouse = false;
    this._useMouse = false;
    this.moving = false;
    this.keypress = false;
    this.freeze = false;
    this.transfert = [];
    this.inTransfert = false;
    this.parent = Event;
    this.parent(a, b);
    this.handleKeyPress();
    this.setTypeMove("real");
    this.movementBlock = false;
    this.tickPlayer = this._tick;
    this.old_direction = this.direction
}
var p = Player.prototype = new Event();
p.handleKeyPress = function() {
    var c = this;
    var b = [Input.Left, Input.Up, Input.Right, Input.Bottom];
    var a;
    for (i = 0; i < this.actions.length; i++) {
        act = this.rpg.actions[this.actions[i]];
        if (act.keypress) {
            a = this.actions[i];
            Input.press(act.keypress,
            function(d) {
                c.action(a)
            })
        }
    }
    Input.keyDown(b,
    function(f) {
        var d = c.movementIsBlocked();
        if (!c.freeze && !d) {
            if (!d) {
                if (Rpg.endArray(Input.keyBuffer) != f.keyCode) {
                    Input.keyBuffer.push(f.keyCode)
                }
            }
        }
    });
    Input.press([Input.Enter, Input.Space],
    function(d) {
        c.triggerEventBeside()
    });
    Input.keyUp(function(d) {
        Input.keyBuffer = Rpg.unsetArrayElement(Input.keyBuffer, d.keyCode);
        Input.cacheKeyBuffer = Rpg.unsetArrayElement(Input.keyBuffer, d.keyCode)
    })
};
p.movementIsBlocked = function() {
    var a = false;
    if (this.movementBlock) {
        return true
    }
    if (this.rpg.inAction) {
        return false
    }
    for (var b = 0; b < this.rpg.currentWindows.length; b++) {
        if (this.rpg.currentWindows[b].blockMovement) {
            a = true;
            break
        }
    }
    return a
};
p.movementPause = function(a) {
    this.movementBlock = a
};
p.assignKey = function() {
    this.handleKeyPress()
};
p._tick = function() {
    var g = this;
    if ((Input.keyBuffer.length > 0 && !this.moving) || this.moveWithMouse) {
        if (!this.moveWithMouse) {
            var d = Rpg.endArray(Input.keyBuffer);
            var c = 0;
            switch (d) {
            case Input.Left:
                c = 4;
                this.direction = "left";
                break;
            case Input.Up:
                c = 2;
                this.direction = "up";
                break;
            case Input.Right:
                c = 6;
                this.direction = "right";
                break;
            case Input.Bottom:
                c = 8;
                this.direction = "bottom";
                break
            }
        }
        if (!g.moving) {
            g.moving = true;
            g.move([c],
            function(l) {
                g.moving = false;
                if (!l || (Input.keyBuffer.length == 0 && !g.inAction)) {
                    g.animation("stop")
                }
            },
            true)
        }
        for (var b = 0; b < this.transfert.length; b++) {
            var h = this.transfert[b].dy === undefined ? 0 : this.transfert[b].dy;
            var k = this.transfert[b].dx === undefined ? 0 : this.transfert[b].dx;
            var c = this.transfert[b].direction ? this.direction == this.transfert[b].direction: true;
            var e, f;
            if (h < 0) {
                e = this.y >= this.transfert[b].y + h && this.y <= this.transfert[b].y
            } else {
                e = this.y >= this.transfert[b].y && this.y <= this.transfert[b].y + h
            }
            if (k < 0) {
                f = this.x >= this.transfert[b].x + k && this.x <= this.transfert[b].x
            } else {
                f = this.x >= this.transfert[b].x && this.x <= this.transfert[b].x + k
            }
            if (e && f && !this.inTransfert && c) {
                var a = this.rpg.getPreparedMap(this.transfert[b].map);
                if (a) {
                    if (!a.propreties.player) {
                        a.propreties.player = {}
                    }
                    a.propreties.player.x = this.transfert[b].x_final + (this.transfert[b].parallele ? Math.abs(this.x - this.transfert[b].x) : 0);
                    a.propreties.player.y = this.transfert[b].y_final + (this.transfert[b].parallele ? Math.abs(this.y - this.transfert[b].y) : 0);
                    var j = true;
                    this.moving = false;
                    Input.keyBuffer = [];
                    if (this.transfert[b].callback) {
                        j = this.transfert[b].callback()
                    }
                    if (j) {
                        this.inTransfert = true;
                        this.rpg.callMap(a.name)
                    }
                    break
                }
            }
        }
    }
};
p.interactionEventBeside = function(h, b) {
    var c, f, a = this;
    if (h.length == 0) {
        return false
    }
    for (c = 0; c < h.length; c++) {
        f = h[c];
        if (f != null) {
            if (f.trigger == b) {
                Input.memorize();
                Input.keyBuffer = [];
                this.freeze = true;
                var g = f.direction;
                if (!f.direction_fix) {
                    f.turnTowardPlayer()
                }
                var d = f.currentPage;
                f.moveStop();
                f.bind("onFinishCommand",
                function() {
                    if (f.currentPage == d) {
                        f.setStopDirection(g);
                        f.moveStart();
                        f.moveType()
                    }
                    a.freeze = false;
                    Input.restore()
                });
                f.onCommands()
            }
        }
    }
    return true
};
p.moveMouseTo = function(a, g, e, f) {
    var c = this;
    if (typeof e == "function") {
        f = e;
        e = undefined
    }
    var b = this.movementIsBlocked();
    if (this.freeze && b) {
        return
    }
    if (this.x == a && this.y == g) {
        return
    }
    var d = this.pathfinding(a, g, e);
    this.moveWithMouse = true;
    this.move(d,
    function(h) {
        c.moveWithMouse = false;
        if (!h || !c.inAction) {
            c.animation("stop");
            if (f) {
                f()
            }
        }
    },
    true)
};
p.triggerEventBeside = function() {
    var a = this.movementIsBlocked();
    if (this.freeze && !a) {
        return false
    }
    var d = this.real_x;
    var b = this.real_y;
    switch (this.direction) {
    case "up":
        b--;
        break;
    case "right":
        d++;
        break;
    case "left":
        d--;
        break;
    case "bottom":
        b++;
        break
    }
    var e = this.contactWithEvent(d, b);
    if (e.length > 0) {
        this.interactionEventBeside(e, "action_button")
    }
};
p.useMouse = function(a, b) {
    this._useMouse = a;
    if (a) {
        this.rpg.bindMouseEvent("click",
        function(c) {
            if (b) {
                b(c)
            }
        })
    } else {
        this.rpg.unbindMouseEvent("click")
    }
};
p.setTransfert = function(a) {
    this.transfert = a
};