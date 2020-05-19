var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, k, m) {
    a != Array.prototype && a != Object.prototype && (a[k] = m.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, k, m, h) {
    if (k) {
        m = $jscomp.global;
        a = a.split(".");
        for (h = 0; h < a.length - 1; h++) {
            var f = a[h];
            f in m || (m[f] = {});
            m = m[f]
        }
        a = a[a.length - 1];
        h = m[a];
        k = k(h);
        k != h && null != k && $jscomp.defineProperty(m, a, {
            configurable: !0,
            writable: !0,
            value: k
        })
    }
};
$jscomp.underscoreProtoCanBeSet = function () {
    var a = {
            a: !0
        },
        k = {};
    try {
        return k.__proto__ = a, k.a
    } catch (m) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, k) {
    a.__proto__ = k;
    if (a.__proto__ !== k) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.polyfill("Object.setPrototypeOf", function (a) {
    return a || $jscomp.setPrototypeOf
}, "es6", "es5");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (k) {
        return $jscomp.SYMBOL_PREFIX + (k || "") + a++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.arrayIterator = function (a) {
    var k = 0;
    return $jscomp.iteratorPrototype(function () {
        return k < a.length ? {
            done: !1,
            value: a[k++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function (a, k) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var m = 0,
        h = {
            next: function () {
                if (m < a.length) {
                    var f = m++;
                    return {
                        value: k(f, a[f]),
                        done: !1
                    }
                }
                h.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return h.next()
            }
        };
    h[Symbol.iterator] = function () {
        return h
    };
    return h
};
$jscomp.polyfill("Array.prototype.values", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a, m) {
            return m
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function (a) {
    return a ? a : function (a, m, h) {
        var f = this.length || 0;
        0 > m && (m = Math.max(0, f + m));
        if (null == h || h > f) h = f;
        h = Number(h);
        0 > h && (h = Math.max(0, f + h));
        for (m = Number(m || 0); m < h; m++) this[m] = a;
        return this
    }
}, "es6", "es3");
$jscomp.findInternal = function (a, k, m) {
    a instanceof String && (a = String(a));
    for (var h = a.length, f = 0; f < h; f++) {
        var d = a[f];
        if (k.call(m, d, f, a)) return {
            i: f,
            v: d
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, m) {
        return $jscomp.findInternal(this, a, m).v
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6", "es3");
var __extends = this && this.__extends || function () {
        var a = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function (a, m) {
            a.__proto__ = m
        } || function (a, m) {
            for (var h in m) m.hasOwnProperty(h) && (a[h] = m[h])
        };
        return function (k, m) {
            function h() {
                this.constructor = k
            }
            a(k, m);
            k.prototype = null === m ? Object.create(m) : (h.prototype = m.prototype, new h)
        }
    }(),
    __decorate = this && this.__decorate || function (a, k, m, h) {
        var f = arguments.length,
            d = 3 > f ? k : null === h ? h = Object.getOwnPropertyDescriptor(k, m) : h,
            e;
        if ("object" === typeof Reflect && "function" ===
            typeof Reflect.decorate) d = Reflect.decorate(a, k, m, h);
        else
            for (var b = a.length - 1; 0 <= b; b--)
                if (e = a[b]) d = (3 > f ? e(d) : 3 < f ? e(k, m, d) : e(k, m)) || d;
        return 3 < f && d && Object.defineProperty(k, m, d), d
    },
    TeiaJS;
(function (a) {
    (function (k) {
        var m = function () {
            function h(f) {
                this._selection = a.Utilities.Helpers.makeArray(f);
                if (void 0 === this._selection) throw "selection cannot be null or undefined";
            }
            h.prototype.getAllItems = function () {
                return this._selection
            };
            h.prototype.center = function () {
                throw "Must be called for child class";
            };
            h.prototype.minMax = function () {
                var a = [],
                    d;
                for (d in this._selection) a = this._minMaxIterative(this._selection[d], a);
                return a
            };
            h.prototype._minMaxIterative = function (a, d) {
                throw "Must be called for child class";
            };
            h.prototype.isolate = function (a, d) {
                this._getAllItemsOfScene(a).forEach(function (e) {
                    e.setEnabled(!1)
                });
                this._selection.forEach(function (e) {
                    e.setEnabled(!0)
                });
                d.zoomOn(this._selection)
            };
            h.prototype._enableAllItemsOfScene = function (a, d) {
                throw "Must be called for child class";
            };
            h.prototype.exitIsolateMode = function (a, d) {
                this._enableAllItemsOfScene(a, !0);
                d.zoomOn(this._getAllItemsOfScene(a))
            };
            h.prototype._getAllItemsOfScene = function (a) {
                throw "Must be called for child class";
            };
            return h
        }();
        k.Selection = m
    })(a.API ||
        (a.API = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    var k = function () {
        function a() {}
        a.prototype.getName_ = function () {
            var a = this.constructor.toString();
            "_" === a[a.length - 1] && (a = a.substring(0, a.length - 1));
            return a
        };
        a.prototype.getFullName_ = function () {
            return this.getName_()
        };
        return a
    }();
    a.Type = k
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (a) {
            function f() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(f, a);
            return f
        }(a.Type);
        k.Viewport = m
    })(a.API || (a.API = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(f, a);
            f.prototype.center = function () {
                var d = this.minMax();
                d = d[0].add(d[1]);
                d.scaleInPlace(.5);
                return d
            };
            f.prototype.shifted = function () {
                var d = this.minMax();
                d = d[0].add(d[1]);
                d.scaleInPlace(.75);
                return d
            };
            f.prototype.InfinityVectorToZeroVector = function (d) {
                if (void 0 === d) return BABYLON.Vector3.Zero();
                var e = BABYLON.Vector3.Zero();
                e.x = 1.797693220248158E100 <= Math.abs(d.x) ? 0 : d.x;
                e.y = 1.797693220248158E100 <=
                    Math.abs(d.y) ? 0 : d.y;
                e.z = 1.797693220248158E100 <= Math.abs(d.z) ? 0 : d.z;
                return e
            };
            f.prototype.isInfinityVector = function (d) {
                return void 0 === d ? !1 : 1.797693220248158E100 <= Math.abs(d.x) && 1.797693220248158E100 <= Math.abs(d.y) && 1.797693220248158E100 <= Math.abs(d.z)
            };
            f.prototype._minMaxIterative = function (d, e) {
                if (0 == d.isEnabled() || null == d.getBoundingInfo() || !d._isObjectTeia) return e;
                d.computeWorldMatrix(!0);
                var b = d.getBoundingInfo().boundingBox.maximumWorld;
                d = d.getBoundingInfo().boundingBox.minimumWorld;
                null == e[0] &&
                    (e[0] = new BABYLON.Vector3(d.x, d.y, d.z));
                null == e[1] && (e[1] = new BABYLON.Vector3(b.x, b.y, b.z));
                e[0].x = d.x < e[0].x ? d.x : e[0].x;
                e[0].y = d.y < e[0].y ? d.y : e[0].y;
                e[0].z = d.z < e[0].z ? d.z : e[0].z;
                e[1].x = b.x > e[1].x ? b.x : e[1].x;
                e[1].y = b.y > e[1].y ? b.y : e[1].y;
                e[1].z = b.z > e[1].z ? b.z : e[1].z;
                e[0] = this.InfinityVectorToZeroVector(e[0]);
                e[1] = this.InfinityVectorToZeroVector(e[1]);
                return e
            };
            f.prototype._enableAllItemsOfScene = function (d, e) {
                this._getAllItemsOfScene(d).forEach(function (b) {
                    b.setEnabled(e)
                })
            };
            f.prototype._getAllItemsOfScene =
                function (d) {
                    return d.meshes
                };
            return f
        }(a.Selection);
        a.SelectionIn3D = k
    })(a.API || (a.API = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b, c, g, l, f, C, p, r, t, k) {
                void 0 === c && (c = !0);
                void 0 === g && (g = !1);
                void 0 === r && (r = !1);
                void 0 === t && (t = !1);
                void 0 === k && (k = !1);
                var n = h.call(this) || this;
                n._camerasArray = [];
                n._viewportsControl = d;
                a.Utilities.Helpers.isNumber(l) && a.Utilities.Helpers.isNumber(f) && a.Utilities.Helpers.isNumber(C) && a.Utilities.Helpers.isNumber(p) || (f = l = 0, p = C = 1);
                n._xyzViewport = new BABYLON.Viewport(l, f, C, p);
                n._cameras = new a.Utilities.Set;
                n._container = b;
                n._scene = e;
                n.activeCamera =
                    null;
                t || n._generateInfoBoxContainer();
                c && n._generateCameraControls();
                g && n._generateViewcubeControls();
                k || n._generateLayersControls(r);
                return n
            }
            __extends(f, h);
            Object.defineProperty(f.prototype, "activeCamera", {
                get: function () {
                    return this._activeCamera
                },
                set: function (d) {
                    var e = this,
                        b = this._activeCamera;
                    this._activeCamera && (this._scene.activeCameras = this._scene.activeCameras.filter(function (c, b, d) {
                        return c.uniqueId !== e._activeCamera.uniqueId
                    }));
                    if (this._activeCamera = d) this._scene.activeCameras.push(d), this._activeCamera.viewport =
                        this._xyzViewport, a.Utilities.Event.fire(this, f.ACTIVE_CAMERA_CHANGED, b, this._activeCamera)
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype.addArcRotateCamera = function (d, e, b, c, g, l, a, f, h, r) {
                void 0 === a && (a = .5);
                void 0 === r && (r = 1);
                return this._addCamera(BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera, d, e, b, a, f, c, g, l, 5, h, r)
            };
            f.prototype.addFreeCamera = function (d, e, b, c, g, l, a, f) {
                void 0 === c && (c = 5);
                void 0 === g && (g = 0);
                void 0 === f && (f = 1);
                return this._addCamera(BABYLON.TeiaJSAddons.CameraTypes.FreeCamera, d, e, b, g, l,
                    null, null, null, c, a, f)
            };
            f.prototype.addUniversalCamera = function (d, e, b, c, g, l, a) {
                void 0 === g && (g = 0);
                void 0 === a && (a = 5);
                return this._addCamera(BABYLON.TeiaJSAddons.CameraTypes.UniversalCamera, d, e, b, g, l, null, null, null, a, c, null)
            };
            f.prototype.addVirtualJoystickCamera = function (d, e, b) {
                return this._addCamera(BABYLON.TeiaJSAddons.CameraTypes.VirtualJoystickCamera, d, e, b)
            };
            f.prototype.addWebVRCamera = function (d, e, b) {
                return this._addCamera(BABYLON.TeiaJSAddons.CameraTypes.WebVRCamera, d, e, b)
            };
            f.prototype._addCamera =
                function (d, e, b, c, g, l, n, C, h, r, t, k) {
                    void 0 === g && (g = 0);
                    void 0 === r && (r = 5);
                    void 0 === k && (k = 1);
                    if (null != d && e && b && c && (d != BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera || null != n && null != C && null != h)) {
                        a.Utilities.Event.fire(this, f.ADDING_CAMERA_EVENT);
                        if (d == BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera) {
                            var p = new BABYLON.TeiaJSAddons.ArcRotateCamera(e, n, C, h, b, c);
                            p.inertia = g;
                            p.minZ = 0;
                            p.lowerRadiusLimit = .01 * h;
                            p.speed = .2 * h;
                            p.layerMask = t;
                            p.angularSensibilityX = l;
                            p.angularSensibilityY = l;
                            1 > k && (k = 1);
                            p.wheelPrecision =
                                k
                        } else d == BABYLON.TeiaJSAddons.CameraTypes.FreeCamera ? (p = new BABYLON.TeiaJSAddons.FreeCamera(e, b, c), p.speed = r, p.layerMask = t, p.angularSensibility = l, p.inertia = g, p.minZ = 0, p.layerMask = t, p.ellipsoid = new BABYLON.Vector3(.3, .7, .3), p.angularSensibility = l, p.checkCollisions = !0, p.noRotationConstraint = !0) : d == BABYLON.TeiaJSAddons.CameraTypes.UniversalCamera ? (p = new BABYLON.TeiaJSAddons.UniversalCamera(e, b, c), p.layerMask = t, p.minZ = 0, p.ellipsoid = new BABYLON.Vector3(.4, .8, .4), p.angularSensibility = l, p.inertia = g, p.speed =
                            r, p.checkCollisions = !0) : d == BABYLON.TeiaJSAddons.CameraTypes.VirtualJoystickCamera ? (p = new BABYLON.VirtualJoysticksCamera(e, b, c), p.ellipsoid = new BABYLON.Vector3(.3, .7, .3), p.angularSensibility = l) : d == BABYLON.TeiaJSAddons.CameraTypes.WebVRCamera && (p = new BABYLON.WebVRFreeCamera(e, b, c), p.ellipsoid = new BABYLON.Vector3(.3, .7, .3), p.angularSensibility = l);
                        e = this._cameras.add(p);
                        this._camerasArray.push(p);
                        if (void 0 !== e) return this.activeCamera || (this.activeCamera = p), p.cameraType = d, a.Utilities.Event.fire(this,
                            f.ADDED_CAMERA_EVENT, p, e), e
                    }
                };
            f.prototype.disableCameraControls = function () {
                void 0 != this._cameraControls && this._cameraControls.disableActions()
            };
            f.prototype.enableCameraControls = function () {
                void 0 != this._cameraControls && this._cameraControls.enableActions()
            };
            f.prototype.removeCamera = function (d) {
                var e = this._cameras.getUniqueObject(d);
                void 0 !== e && (a.Utilities.Event.fire(this, f.REMOVING_CAMERA_EVENT, e, d), this._scene.removeCamera(e), this._cameras.remove(d) && a.Utilities.Event.fire(this, f.REMOVED_CAMERA_EVENT))
            };
            f.prototype._cameraSwitchMode = function () {
                var d = this.activeCamera;
                this.activeCamera.mode == BABYLON.Camera.PERSPECTIVE_CAMERA ? d.switchMode(BABYLON.Camera.ORTHOGRAPHIC_CAMERA) : d.switchMode(BABYLON.Camera.PERSPECTIVE_CAMERA)
            };
            f.prototype._cameraBack = function () {
                this.activeCamera.back()
            };
            f.prototype._cameraTop = function () {
                this.activeCamera.top()
            };
            f.prototype._cameraRight = function () {
                this.activeCamera.right()
            };
            f.prototype._cameraLeft = function () {
                this.activeCamera.left()
            };
            f.prototype._cameraBottom = function () {
                this.activeCamera.bottom()
            };
            f.prototype._cameraFront = function () {
                this.activeCamera.front()
            };
            f.prototype.addLayerControlsItem = function (d, e, b) {
                this._layersControls.addLayerListItem(d, e, b)
            };
            f.prototype.showLayer = function () {
                this._layersControls.show()
            };
            f.prototype.hideLayer = function () {
                this._layersControls.hide()
            };
            f.prototype._infoBoxZoomOn = function (d, e) {
                this.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && (d = this._getMeshesByObjectID(e), 0 != d.length && this.activeCamera.zoomOn(d))
            };
            f.prototype._getMeshesByObjectID =
                function (d) {
                    var e = [],
                        b;
                    for (b in this._scene.meshes) {
                        var c = this._scene.meshes[b];
                        c.objectId == d && e.push(c)
                    }
                    return e
                };
            f.prototype._generateCameraControls = function () {
                var d = new a.Utilities.Action(this._cameraBack, this),
                    e = new a.Utilities.Action(this._cameraTop, this),
                    b = new a.Utilities.Action(this._cameraRight, this),
                    c = new a.Utilities.Action(this._cameraSwitchMode, this),
                    g = new a.Utilities.Action(this._cameraLeft, this),
                    l = new a.Utilities.Action(this._cameraBottom, this),
                    f = new a.Utilities.Action(this._cameraFront,
                        this);
                this._cameraControls = new Teia.gui.CameraControls(d, e, b, c, g, l, f, ["camera_controls"]);
                this._cameraControls.appendToParent(this._container)
            };
            f.prototype._generateLayersControls = function (d) {
                void 0 === d && (d = !1);
                this._layersControls = new Teia.gui.LayersControls(this._viewportsControl, d, ["layers_controls"]);
                this._layersControls.appendToParent(this._container)
            };
            f.prototype._generateViewcubeControls = function () {
                var d = this;
                a.Utilities.Event.on(this._viewportsControl, "sceneloaded", function () {
                    d._viewcubeControls =
                        new Teia.gui.ViewcubeControls(d._viewportsControl);
                    d._viewcubeControls.init()
                })
            };
            f.prototype._generateInfoBoxContainer = function () {
                this._infoBoxManager = new Teia.gui.InfoBoxManager(this._viewportsControl, this._xyzViewport, ["canvas_2D", "draw"], this._container.id);
                this._infoBoxManager.appendToParent(this._container);
                this._bindInfoBoxManager()
            };
            f.prototype._bindInfoBoxManager = function () {
                a.Utilities.Event.on(this._infoBoxManager, Teia.gui.InfoBox.ZOOM_ON_EVENT, $.proxy(this._infoBoxZoomOn, this))
            };
            f.prototype.createInfoBox =
                function (d) {
                    d = this._getMeshesByObjectID(d);
                    this._infoBoxManager.createInfoBox(d[0], d[0].name)
                };
            f.prototype.update2DCanvas = function (d) {
                void 0 === d && (d = !1);
                this._infoBoxManager && (0 != this._infoBoxManager._countInfobox || d) && this._infoBoxManager.update(this.activeCamera)
            };
            f.prototype.clear2DCanvas = function () {
                this._infoBoxManager && 0 != this._infoBoxManager._countInfobox && this._infoBoxManager.clearCanvas()
            };
            f.prototype.dispose = function () {
                this._infoBoxManager && this._infoBoxManager.dispose()
            };
            f.prototype.getCamerasByType =
                function (d) {
                    var e = [],
                        b;
                    for (b in this._cameras.values) {
                        var c = this._cameras.values[b];
                        c.cameraType === d && e.push(c)
                    }
                    return e
                };
            f.prototype.getCamerasById = function (d) {
                return this._cameras.getUniqueObject(d)
            };
            return f
        }(k.Viewport);
        m.ADDING_CAMERA_EVENT = "addingCamera";
        m.ADDED_CAMERA_EVENT = "addedCamera";
        m.ACTIVE_CAMERA_CHANGED = "activeCameraChanged";
        m.REMOVING_CAMERA_EVENT = "removingCamera";
        m.REMOVED_CAMERA_EVENT = "removedCamera";
        k.Viewport3D = m
    })(a.API || (a.API = {}))
})(TeiaJS || (TeiaJS = {}));
var BABYLON;
(function (a) {
    (function (k) {
        var m;
        (function (d) {
            d[d.ArcRotateCamera = 0] = "ArcRotateCamera";
            d[d.FreeCamera = 1] = "FreeCamera";
            d[d.UniversalCamera = 2] = "UniversalCamera";
            d[d.VirtualJoystickCamera = 3] = "VirtualJoystickCamera";
            d[d.WebVRCamera = 4] = "WebVRCamera"
        })(m = k.CameraTypes || (k.CameraTypes = {}));
        var h = function () {
            return function () {}
        }();
        h.ZOOM_ON_FACTOR = 1;
        h.AUTO_ZOOM_MORE = 0;
        h.AUTO_ZOOM_LESS = 1;
        h.CAMERA_WILL_MOVE_TO_TOP_EVENT = "cameraWillMoveToTop";
        h.CAMERA_HAS_MOVED_TO_TOP_EVENT = "cameraHasMovedToTop";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_EVENT =
            "cameraWillMoveToBottom";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_EVENT = "cameraHasMovedToBottom";
        h.CAMERA_WILL_MOVE_TO_LEFT_EVENT = "cameraWillMoveToLeft";
        h.CAMERA_HAS_MOVED_TO_LEFT_EVENT = "cameraHasMovedToLeft";
        h.CAMERA_WILL_MOVE_TO_RIGHT_EVENT = "cameraWillMoveToRight";
        h.CAMERA_HAS_MOVED_TO_RIGHT_EVENT = "cameraHasMovedToRight";
        h.CAMERA_WILL_MOVE_TO_FRONT_EVENT = "cameraWillMoveToFront";
        h.CAMERA_HAS_MOVED_TO_FRONT_EVENT = "cameraHasMovedToFront";
        h.CAMERA_WILL_MOVE_TO_BACK_EVENT = "cameraWillMoveToBack";
        h.CAMERA_HAS_MOVED_TO_BACK_EVENT =
            "cameraHasMovedToBack";
        h.CAMERA_WILL_MOVE_TO_TOP_FRONT_EVENT = "cameraWillMoveToTopFront";
        h.CAMERA_HAS_MOVED_TO_TOP_FRONT_EVENT = "cameraHasMovedToTopFront";
        h.CAMERA_WILL_MOVE_TO_TOP_RIGHT_EVENT = "cameraWillMoveToTopRight";
        h.CAMERA_HAS_MOVED_TO_TOP_RIGHT_EVENT = "cameraHasMovedToTopRight";
        h.CAMERA_WILL_MOVE_TO_TOP_BACK_EVENT = "cameraWillMoveToTopBack";
        h.CAMERA_HAS_MOVED_TO_TOP_BACK_EVENT = "cameraHasMovedToTopBack";
        h.CAMERA_WILL_MOVE_TO_TOP_LEFT_EVENT = "cameraWillMoveToTopLeft";
        h.CAMERA_HAS_MOVED_TO_TOP_LEFT_EVENT =
            "cameraHasMovedToTopLeft";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_EVENT = "cameraWillMoveToBottomFront";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_EVENT = "cameraHasMovedToBottomFront";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_RIGHT_EVENT = "cameraWillMoveToBottomRight";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_RIGHT_EVENT = "cameraHasMovedToBottomRight";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_EVENT = "cameraWillMoveToBottomBack";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_EVENT = "cameraHasMovedToBottomBack";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_LEFT_EVENT = "cameraWillMoveToBottomLeft";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_LEFT_EVENT = "cameraHasMovedToBottomLeft";
        h.CAMERA_WILL_MOVE_TO_FRONT_RIGHT_EVENT = "cameraWillMoveToFrontRight";
        h.CAMERA_HAS_MOVED_TO_FRONT_RIGHT_EVENT = "cameraHasMovedToFrontRight";
        h.CAMERA_WILL_MOVE_TO_BACK_RIGHT_EVENT = "cameraWillMoveToBackRight";
        h.CAMERA_HAS_MOVED_TO_BACK_RIGHT_EVENT = "cameraHasMovedToBackRight";
        h.CAMERA_WILL_MOVE_TO_BACK_LEFT_EVENT = "cameraWillMoveToBackLeft";
        h.CAMERA_HAS_MOVED_TO_BACK_LEFT_EVENT = "cameraHasMovedToBackLeft";
        h.CAMERA_WILL_MOVE_TO_FRONT_LEFT_EVENT =
            "cameraWillMoveToFrontLeft";
        h.CAMERA_HAS_MOVED_TO_FRONT_LEFT_EVENT = "cameraHasMovedToFrontLeft";
        h.CAMERA_WILL_MOVE_TO_TOP_FRONT_LEFT_EVENT = "cameraWillMoveToTopFrontLeft";
        h.CAMERA_HAS_MOVED_TO_TOP_FRONT_LEFT_EVENT = "cameraHasMovedToTopFrontLeft";
        h.CAMERA_WILL_MOVE_TO_TOP_FRONT_RIGHT_EVENT = "cameraWillMoveToTopFrontRight";
        h.CAMERA_HAS_MOVED_TO_TOP_FRONT_RIGHT_EVENT = "cameraHasMovedToTopFrontRight";
        h.CAMERA_WILL_MOVE_TO_TOP_BACK_RIGHT_EVENT = "cameraWillMoveToTopBackRight";
        h.CAMERA_HAS_MOVED_TO_TOP_BACK_RIGHT_EVENT =
            "cameraHasMovedToTopBackRight";
        h.CAMERA_WILL_MOVE_TO_TOP_BACK_LEFT_EVENT = "cameraWillMoveToTopBackLeft";
        h.CAMERA_HAS_MOVED_TO_TOP_BACK_LEFT_EVENT = "cameraHasMovedToTopBackLeft";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_LEFT_EVENT = "cameraWillMoveToBottomFrontLeft";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_LEFT_EVENT = "cameraHasMovedToBottomFrontLeft";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_RIGHT_EVENT = "cameraWillMoveToBottomFrontRight";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_RIGHT_EVENT = "cameraHasMovedToBottomFrontRight";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_RIGHT_EVENT =
            "cameraWillMoveToBottomBackRight";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_RIGHT_EVENT = "cameraHasMovedToBottomBackRight";
        h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_LEFT_EVENT = "cameraWillMoveToBottomBackLeft";
        h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_LEFT_EVENT = "cameraHasMovedToBottomBackLeft";
        h.CAMERA_TARGET_WILL_MOVE = "cameraTargetWillMove";
        h.CAMERA_TARGET_HAS_MOVED = "cameraTargetHasMoved";
        h.CAMERA_MODE_WILL_CHANGE = "cameraModeWillChange";
        h.CAMERA_MODE_HAS_CHANGED = "cameraModeHasChanged";
        h.CAMERA_IS_MOVING_EVENT = "cameraIsMoving";
        h.CAMERA_IS_STATIONARY_EVENT = "cameraIsStationary";
        h.CAMERA_END_MOVING_EVENT = "cameraIsEndMoving";
        h.CAMERA_IS_NOT_MOVING_EVENT = "cameraIsNotMoving";
        h.CAMERA_IS_NOT_MOVING_TIME = .9;
        k.Camera = h;
        var f = function (d) {
            function e(b, c, g, e, a, f) {
                b = d.call(this, b, c, g, e, a, f) || this;
                b._cameraStartNotMovingTime = 0;
                b._radiusScale = 1;
                b._positionScale = .5;
                b._framingTime = 1500;
                b._lastFrameTime = null;
                b._lastInteractionTime = -Infinity;
                b._animatables = [];
                b._betaIsAnimating = !1;
                b._lastFrameRadius = 0;
                b.lowerRadiusLimit = .2;
                b._worldMinMax =
                    null;
                b.zoomOnFactor = 1;
                b._animationsTmp = [];
                b._autoZoom = !1;
                b._autoZoomMode = null;
                return b
            }
            __extends(e, d);
            Object.defineProperty(e.prototype, "cameraType", {
                get: function () {
                    return m.ArcRotateCamera
                },
                enumerable: !0,
                configurable: !0
            });
            e.prototype._isOrtho = function () {
                return this.mode == a.Camera.ORTHOGRAPHIC_CAMERA ? !0 : !1
            };
            e.prototype._isPersp = function () {
                return this.mode == a.Camera.PERSPECTIVE_CAMERA ? !0 : !1
            };
            e.prototype._toOrtho = function () {
                this._isOrtho() ? this.zoomOrtho() : this.switchMode(a.Camera.ORTHOGRAPHIC_CAMERA)
            };
            e.prototype._toPersp = function () {
                this._isPersp() || this.switchMode(a.Camera.PERSPECTIVE_CAMERA)
            };
            e.prototype._addAnimation = function (b, c, g, e, d, f, h, r, t, k) {
                b = new a.Animation(b, c, g, e, d);
                e == a.Animation.ANIMATIONTYPE_FLOAT ? e = (f + h) / 2 : (e = f.add(h), e = e.divide(new a.Vector3(2, 2, 2)));
                c = [];
                c.push({
                    frame: r,
                    value: f
                });
                c.push({
                    frame: t,
                    value: e
                });
                c.push({
                    frame: k,
                    value: h
                });
                b.setKeys(c);
                this._animationsTmp.push(b)
            };
            e.prototype._animate = function () {
                var b = this;
                this.animations = this._animationsTmp;
                this.getScene().beginDirectAnimation(this,
                    this.animations, 0, 40, !1, 1,
                    function () {
                        TeiaJS.Utilities.Event.fire(b, h.CAMERA_END_MOVING_EVENT, b)
                    });
                this._animationsTmp = []
            };
            e.prototype.update = function () {
                d.prototype.update.call(this);
                this._isSynchronized() ? (TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_STATIONARY_EVENT, this), Math.round((new Date).getTime() / 1E3) - this._cameraStartNotMovingTime > h.CAMERA_IS_NOT_MOVING_TIME && TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_NOT_MOVING_EVENT, this)) : (TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_MOVING_EVENT, this),
                    this._cameraStartNotMovingTime = Math.round((new Date).getTime() / 1E3));
                this._autoZoom && (this._autoZoomMode == h.AUTO_ZOOM_MORE ? this.radius -= Math.abs(this.radius / 50) : this._autoZoomMode == h.AUTO_ZOOM_LESS && (this.radius += Math.abs(this.radius / 50)), this.mode == a.Camera.ORTHOGRAPHIC_CAMERA && this.zoomOrtho());
                if (null == this.animations || 0 === this.animations.length) this.getScene().stopAnimation(this);
                else {
                    var b = this.animations.length;
                    if (0 != b)
                        for (var c = 0; c < b; c++)
                            if (null != this.animations[c]) switch (this.animations[c].dataType) {
                                case a.Animation.ANIMATIONTYPE_FLOAT:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length -
                                        1].value == this[this.animations[c].targetPropertyPath[0]] && this.animations.splice(c, 1);
                                    break;
                                case a.Animation.ANIMATIONTYPE_VECTOR3:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length - 1].value.equals(this[this.animations[c].targetPropertyPath[0]]) && this.animations.splice(c, 1)
                            }
                }
            };
            e.prototype.attachControl = function (b, c) {
                var g = this;
                void 0 === c && (c = !0);
                d.prototype.attachControl.call(this, b, c);
                var e = this.getScene().getEngine();
                this._onWheel = function (c) {
                    c.preventDefault();
                    var b = 0;
                    c.deltaY && (b =
                        (0 > c.deltaY ? 100 : -100) / g.wheelPrecision * (g.radius / 25));
                    b && (g.inertialRadiusOffset += b);
                    switch (g.mode) {
                        case a.Camera.ORTHOGRAPHIC_CAMERA:
                            g.zoomOrtho()
                    }
                };
                this._keyPressed = function (c) {
                    c.ctrlKey && e.getRenderingCanvas().removeEventListener(a.Tools.GetPointerPrefix() + "move", g._onPointerMove, !1)
                };
                this._keyUp = function (c) {
                    17 == c.keyCode && e.getRenderingCanvas().addEventListener(a.Tools.GetPointerPrefix() + "move", g._onPointerMove)
                };
                e.getRenderingCanvas().addEventListener("wheel", this._onWheel)
            };
            e.prototype.detachControl =
                function (b) {
                    d.prototype.detachControl.call(this, b);
                    this.getScene().getEngine().getRenderingCanvas().removeEventListener("wheel", this._onWheel)
                };
            e.prototype.switchMode = function (b) {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_MODE_WILL_CHANGE, this._id);
                this.mode = b;
                switch (b) {
                    case a.Camera.ORTHOGRAPHIC_CAMERA:
                        this.zoomOrtho()
                }
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_MODE_HAS_CHANGED, this._id)
            };
            e.prototype.top = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_EVENT, this._id);
                this._addAnimation("topAlpha",
                    "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 2), 0, 10, 20);
                this._addAnimation("topBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, this.lowerBetaLimit, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_EVENT, this._id)
            };
            e.prototype.bottom = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_EVENT,
                    this._id);
                this._addAnimation("bottomAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 2), 0, 10, 20);
                this._addAnimation("bottomBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, this.upperBetaLimit, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_EVENT, this._id)
            };
            e.prototype.right = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_RIGHT_EVENT, this._id);
                this._addAnimation("rightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 0), 0, 10, 20);
                this._addAnimation("rightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_RIGHT_EVENT, this._id)
            };
            e.prototype.left = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_LEFT_EVENT, this._id);
                this._addAnimation("leftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI), 0, 10, 20);
                this._addAnimation("leftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_LEFT_EVENT, this._id)
            };
            e.prototype.front = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_FRONT_EVENT, this._id);
                this._addAnimation("frontAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 2), 0, 10, 20);
                this._addAnimation("frontBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_FRONT_EVENT, this._id)
            };
            e.prototype.back = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_BACK_EVENT, this._id);
                this._addAnimation("backAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 2), 0, 10, 20);
                this._addAnimation("backBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BACK_EVENT, this._id)
            };
            e.prototype.topFront = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_TOP_FRONT_EVENT, this._id);
                this._addAnimation("topFrontAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 2), 0, 10, 20);
                this._addAnimation("topFrontBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_FRONT_EVENT, this._id)
            };
            e.prototype.topRight =
                function () {
                    TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_RIGHT_EVENT, this._id);
                    this._addAnimation("topRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 0), 0, 10, 20);
                    this._addAnimation("topRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                    this._animate();
                    TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_RIGHT_EVENT,
                        this._id)
                };
            e.prototype.topBack = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_BACK_EVENT, this._id);
                this._addAnimation("topBackAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 2), 0, 10, 20);
                this._addAnimation("topBackBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_HAS_MOVED_TO_TOP_BACK_EVENT, this._id)
            };
            e.prototype.topLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_LEFT_EVENT, this._id);
                this._addAnimation("topLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI), 0, 10, 20);
                this._addAnimation("topLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_LEFT_EVENT, this._id)
            };
            e.prototype.bottomFront = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_EVENT, this._id);
                this._addAnimation("bottomFrontAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 2), 0, 10, 20);
                this._addAnimation("bottomFrontBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT,
                    this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_EVENT, this._id)
            };
            e.prototype.bottomRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_RIGHT_EVENT, this._id);
                this._addAnimation("bottomRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 0), 0, 10, 20);
                this._addAnimation("bottomRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT,
                    a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_RIGHT_EVENT, this._id)
            };
            e.prototype.bottomBack = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_EVENT, this._id);
                this._addAnimation("bottomBackAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 2), 0, 10, 20);
                this._addAnimation("bottomBackBeta",
                    "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_EVENT, this._id)
            };
            e.prototype.bottomLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_LEFT_EVENT, this._id);
                this._addAnimation("bottomLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha,
                    Math.PI), 0, 10, 20);
                this._addAnimation("bottomLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_LEFT_EVENT, this._id)
            };
            e.prototype.frontRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_FRONT_RIGHT_EVENT, this._id);
                this._addAnimation("frontRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT,
                    this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 4), 0, 10, 20);
                this._addAnimation("frontRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_FRONT_RIGHT_EVENT, this._id)
            };
            e.prototype.backRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BACK_RIGHT_EVENT, this._id);
                this._addAnimation("backRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT,
                    a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 4), 0, 10, 20);
                this._addAnimation("backRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BACK_RIGHT_EVENT, this._id)
            };
            e.prototype.backLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BACK_LEFT_EVENT, this._id);
                this._addAnimation("backLeftAlpha",
                    "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, .75 * Math.PI), 0, 10, 20);
                this._addAnimation("backLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BACK_LEFT_EVENT, this._id)
            };
            e.prototype.frontLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_FRONT_LEFT_EVENT,
                    this._id);
                this._addAnimation("frontLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 1.25 * Math.PI), 0, 10, 20);
                this._addAnimation("frontLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 2, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_FRONT_LEFT_EVENT, this._id)
            };
            e.prototype.topFrontLeft = function () {
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_WILL_MOVE_TO_TOP_FRONT_LEFT_EVENT, this._id);
                this._addAnimation("topFrontLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 1.25 * Math.PI), 0, 10, 20);
                this._addAnimation("topFrontLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_FRONT_LEFT_EVENT, this._id)
            };
            e.prototype.topFrontRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_FRONT_RIGHT_EVENT, this._id);
                this._addAnimation("topFrontRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 4), 0, 10, 20);
                this._addAnimation("topFrontRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_HAS_MOVED_TO_TOP_FRONT_RIGHT_EVENT, this._id)
            };
            e.prototype.topBackRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_BACK_RIGHT_EVENT, this._id);
                this._addAnimation("topBackRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 4), 0, 10, 20);
                this._addAnimation("topBackRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta,
                    Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_BACK_RIGHT_EVENT, this._id)
            };
            e.prototype.topBackLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_TOP_BACK_LEFT_EVENT, this._id);
                this._addAnimation("topBackLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, .75 * Math.PI), 0, 10, 20);
                this._addAnimation("topBackLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT,
                    a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, Math.PI / 4, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_TOP_BACK_LEFT_EVENT, this._id)
            };
            e.prototype.bottomFrontLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_LEFT_EVENT, this._id);
                this._addAnimation("bottomFrontLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, 1.25 * Math.PI), 0,
                    10, 20);
                this._addAnimation("bottomFrontLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_LEFT_EVENT, this._id)
            };
            e.prototype.bottomFrontRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_FRONT_RIGHT_EVENT, this._id);
                this._addAnimation("bottomFrontRightAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT,
                    this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, -Math.PI / 4), 0, 10, 20);
                this._addAnimation("bottomFrontRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_FRONT_RIGHT_EVENT, this._id)
            };
            e.prototype.bottomBackRight = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_RIGHT_EVENT, this._id);
                this._addAnimation("bottomBackRightAlpha",
                    "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, Math.PI / 4), 0, 10, 20);
                this._addAnimation("bottomBackRightBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_RIGHT_EVENT, this._id)
            };
            e.prototype.bottomBackLeft = function () {
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_WILL_MOVE_TO_BOTTOM_BACK_LEFT_EVENT,
                    this._id);
                this._addAnimation("bottomBackLeftAlpha", "alpha", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.inTrigoCircle(this.alpha), this.calculateAlpha(this.alpha, .75 * Math.PI), 0, 10, 20);
                this._addAnimation("bottomBackLeftBeta", "beta", 30, a.Animation.ANIMATIONTYPE_FLOAT, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.beta, .75 * Math.PI, 20, 30, 40);
                this._animate();
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_HAS_MOVED_TO_BOTTOM_BACK_LEFT_EVENT, this._id)
            };
            e.prototype.zoomOrtho = function () {
                this._worldMinMax =
                    a.Mesh.MinMax(this.getScene().meshes);
                this.orthoTop = Math.abs(this._worldMinMax.max.x - this._worldMinMax.min.x) / Math.abs(this._worldMinMax.max.z - this._worldMinMax.min.z) * .5 * this.radius;
                this.orthoBottom = -this.orthoTop;
                this.orthoLeft = -this.orthoTop * this.getScene().getEngine().getAspectRatio(this);
                this.orthoRight = -this.orthoLeft
            };
            e.prototype.resize = function () {
                this._isOrtho() && this.zoomOrtho()
            };
            e.prototype.focusOn = function (b, c) {
                void 0 === b && (b = void 0);
                void 0 === c && (c = !0);
                TeiaJS.Utilities.Event.fire(this,
                    h.CAMERA_TARGET_WILL_MOVE, this._id);
                "undefined" == typeof b && (b = this.getScene().meshes);
                b = b.min || b.max ? a.Vector3.Center(b.min, b.max) : (new TeiaJS.API.SelectionIn3D(b)).center();
                this._addAnimation("targetPosition", "target", 30, a.Animation.ANIMATIONTYPE_VECTOR3, a.Animation.ANIMATIONLOOPMODE_CONSTANT, this.target, b, 0, 10, 20);
                this._animate();
                c || (this.maxZ = NaN);
                TeiaJS.Utilities.Event.fire(this, h.CAMERA_TARGET_HAS_MOVED, this._id)
            };
            e.prototype.zoomOn = function (b, c) {
                var g = this;
                void 0 === b && (b = void 0);
                void 0 === c &&
                    (c = !0);
                b = b || this.getScene().meshes;
                0 != b.length && (b = b.min || b.max ? [b.min, b.max] : (new TeiaJS.API.SelectionIn3D(b)).minMax(), this.zoomOnBoundingInfo(b[0], b[1], !1, function () {
                    TeiaJS.Utilities.Event.fire(g, h.CAMERA_END_MOVING_EVENT, g._id)
                }))
            };
            e.prototype.zoomOnBoundingInfo = function (b, c, g, e) {
                void 0 === g && (g = !1);
                void 0 === e && (e = null);
                var d = b.y;
                d += (c.y - d) * this._positionScale;
                var l = c.subtract(b).scale(.5);
                g ? g = new a.Vector3(0, d, 0) : (g = b.add(l), g = new a.Vector3(g.x, d, g.z));
                this._vectorTransition || (this._vectorTransition =
                    a.Animation.CreateAnimation("target", a.Animation.ANIMATIONTYPE_VECTOR3, 60, a.FramingBehavior.EasingFunction));
                this._betaIsAnimating = !0;
                this._animatables.push(a.Animation.TransitionTo("target", g, this, this.getScene(), 60, this._vectorTransition, this._framingTime));
                g = 0;
                g = this._calculateLowerRadiusFromModelBoundingSphere(b, c);
                null === this.lowerRadiusLimit && (this.lowerRadiusLimit = this.minZ);
                this._radiusTransition || (this._radiusTransition = a.Animation.CreateAnimation("radius", a.Animation.ANIMATIONTYPE_FLOAT,
                    60, a.FramingBehavior.EasingFunction));
                this._animatables.push(a.Animation.TransitionTo("radius", g, this, this.getScene(), 60, this._radiusTransition, this._framingTime, function () {
                    e && e()
                }))
            };
            e.prototype._calculateLowerRadiusFromModelBoundingSphere = function (b, c) {
                c = c.subtract(b).length();
                b = this._getFrustumSlope();
                c = .5 * c * this._radiusScale;
                b = Math.max(c * Math.sqrt(1 + 1 / (b.x * b.x)), c * Math.sqrt(1 + 1 / (b.y * b.y)));
                this.lowerRadiusLimit && (b = b < this.lowerRadiusLimit ? this.lowerRadiusLimit : b);
                this.upperRadiusLimit && (b = b > this.upperRadiusLimit ?
                    this.upperRadiusLimit : b);
                return b
            };
            e.prototype._getFrustumSlope = function () {
                var b = this.getScene().getEngine().getAspectRatio(this),
                    c = Math.tan(this.fov / 2);
                return new a.Vector2(c * b, c)
            };
            e.prototype.zoomOnMinMax = function (b, c) {
                this.zoomOn(b, c)
            };
            e.prototype.startTouchZoom = function (b) {
                this._autoZoom = !0;
                this._autoZoomMode = b
            };
            e.prototype.stopTouchZoom = function () {
                this._autoZoom = !1
            };
            e.prototype.calculateAlpha = function (b, c) {
                b = this.inTrigoCircle(b);
                c = this.inTrigoCircle(c);
                return Math.abs(c - b) > Math.abs(c - 2 * Math.PI -
                    b) ? c - 2 * Math.PI : c
            };
            e.prototype.inTrigoCircle = function (b) {
                b %= 2 * Math.PI;
                0 > b && (b += 2 * Math.PI);
                return b
            };
            e.prototype.translate = function (b, c) {
                this._isSynchronizedViewMatrix() ? (TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_STATIONARY_EVENT, this), Math.round((new Date).getTime() / 1E3) - this._cameraStartNotMovingTime > h.CAMERA_IS_NOT_MOVING_TIME && TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_NOT_MOVING_EVENT, this)) : (TeiaJS.Utilities.Event.fire(this, h.CAMERA_IS_MOVING_EVENT, this), this._cameraStartNotMovingTime = Math.round((new Date).getTime() /
                    1E3));
                a.Vector3.Unproject(b, this.getScene().getEngine().getRenderWidth(), this.getScene().getEngine().getRenderHeight(), this.getWorldMatrix(), this.getViewMatrix(), this.getProjectionMatrix());
                a.Vector3.Unproject(c, this.getScene().getEngine().getRenderWidth(), this.getScene().getEngine().getRenderHeight(), this.getWorldMatrix(), this.getViewMatrix(), this.getProjectionMatrix());
                b = b.subtract(c);
                b.scaleInPlace(this.radius / 1E3);
                b.y = -b.y;
                c = a.Vector3.Zero();
                var g = this.getViewMatrix(),
                    e = a.Matrix.Zero();
                g.invertToRef(e);
                a.Vector3.TransformNormalToRef(b, e, c);
                this.position.addInPlace(c);
                this.target.addInPlace(c)
            };
            return e
        }(a.ArcRotateCamera);
        k.ArcRotateCamera = f;
        f = function (d) {
            function e(b, c, g) {
                b = d.call(this, b, c, g) || this;
                b._sceneTeia = g;
                b._worldMinMax = null;
                b._animationsTmp = [];
                b._autoZoom = !1;
                b._autoZoomMode = null;
                return b
            }
            __extends(e, d);
            Object.defineProperty(e.prototype, "cameraType", {
                get: function () {
                    return m.FreeCamera
                },
                enumerable: !0,
                configurable: !0
            });
            e.prototype._isOrtho = function () {
                return this.mode == a.Camera.ORTHOGRAPHIC_CAMERA ?
                    !0 : !1
            };
            e.prototype._isPersp = function () {
                return this.mode == a.Camera.PERSPECTIVE_CAMERA ? !0 : !1
            };
            e.prototype._toOrtho = function () {};
            e.prototype._toPersp = function () {};
            e.prototype._addAnimation = function (b, c, g, e, d, f, h) {
                b = new a.Animation(b, c, g, e, d);
                e == a.Animation.ANIMATIONTYPE_FLOAT ? e = (f + h) / 2 : (e = f.add(h), e = e.divide(new a.Vector3(2, 2, 2)));
                c = [];
                c.push({
                    frame: 0,
                    value: f
                });
                c.push({
                    frame: 10,
                    value: e
                });
                c.push({
                    frame: 20,
                    value: h
                });
                b.setKeys(c);
                this._animationsTmp.push(b)
            };
            e.prototype._animate = function () {
                this.animations =
                    this._animationsTmp;
                this._sceneTeia.beginAnimation(this, 0, 20, !0);
                this._animationsTmp = []
            };
            e.prototype.update = function () {
                d.prototype.update.call(this);
                this._isSynchronizedViewMatrix() ? TeiaJS.Utilities.Event.fire(this, e.CAMERA_IS_STATIONARY_EVENT, this) : TeiaJS.Utilities.Event.fire(this, e.CAMERA_IS_MOVING_EVENT, this);
                if (null == this.animations || 0 === this.animations.length) this._sceneTeia.stopAnimation(this);
                else {
                    var b = this.animations.length;
                    if (0 != b)
                        for (var c = 0; c < b; c++)
                            if (null != this.animations[c]) switch (this.animations[c].dataType) {
                                case a.Animation.ANIMATIONTYPE_FLOAT:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length -
                                        1].value == this[this.animations[c].targetPropertyPath[0]] && this.animations.splice(c, 1);
                                    break;
                                case a.Animation.ANIMATIONTYPE_VECTOR3:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length - 1].value.equals(this[this.animations[c].targetPropertyPath[0]]) && this.animations.splice(c, 1)
                            }
                }
            };
            e.prototype.top = function () {};
            e.prototype.bottom = function () {};
            e.prototype.right = function () {};
            e.prototype.left = function () {};
            e.prototype.front = function () {};
            e.prototype.back = function () {};
            e.prototype.zoomOrtho = function () {};
            e.prototype.resize = function () {};
            e.prototype.focusOn = function (b) {
                TeiaJS.Utilities.Event.fire(this, e.CAMERA_TARGET_WILL_MOVE, this._id);
                "undefined" == typeof b && (b = this._sceneTeia.meshes);
                this.position = b.min || b.max ? a.Vector3.Center(b.min, b.max).scale(1.25) : (new TeiaJS.API.SelectionIn3D(b)).shifted();
                this.setTarget(a.Vector3.Center(b.min, b.max));
                TeiaJS.Utilities.Event.fire(this, e.CAMERA_TARGET_HAS_MOVED, this._id)
            };
            e.prototype.zoomOn = function (b) {
                void 0 === b && (b = void 0);
                b = b || this.getScene().meshes;
                var c = b.min ||
                    b.max ? [b.min, b.max] : (new TeiaJS.API.SelectionIn3D(b)).minMax();
                a.Vector3.Distance(c[0], c[1]);
                this.focusOn(b)
            };
            e.prototype.zoomOnMinMax = function (b, c) {
                this.zoomOn(b)
            };
            e.prototype.startTouchZoom = function (b) {
                this._autoZoom = !0;
                this._autoZoomMode = b
            };
            e.prototype.stopTouchZoom = function () {
                this._autoZoom = !1
            };
            e.prototype.calculateAlpha = function (b, c) {
                b = this.inTrigoCircle(b);
                c = this.inTrigoCircle(c);
                return Math.abs(c - b) > Math.abs(c - 2 * Math.PI - b) ? c - 2 * Math.PI : c
            };
            e.prototype.inTrigoCircle = function (b) {
                b %= 2 * Math.PI;
                0 >
                    b && (b += 2 * Math.PI);
                return b
            };
            e.prototype.translate = function (b, c) {};
            return e
        }(a.FreeCamera);
        f.ZOOM_ON_FACTOR = 1;
        f.AUTO_ZOOM_MORE = 0;
        f.AUTO_ZOOM_LESS = 1;
        f.CAMERA_WILL_MOVE_TO_TOP_EVENT = "cameraWillMoveToTop";
        f.CAMERA_HAS_MOVED_TO_TOP_EVENT = "cameraHasMovedToTop";
        f.CAMERA_WILL_MOVE_TO_BOTTOM_EVENT = "cameraWillMoveToBottom";
        f.CAMERA_HAS_MOVED_TO_BOTTOM_EVENT = "cameraHasMovedToBottom";
        f.CAMERA_WILL_MOVE_TO_LEFT_EVENT = "cameraWillMoveToLeft";
        f.CAMERA_HAS_MOVED_TO_LEFT_EVENT = "cameraHasMovedToLeft";
        f.CAMERA_WILL_MOVE_TO_RIGHT_EVENT =
            "cameraWillMoveToRight";
        f.CAMERA_HAS_MOVED_TO_RIGHT_EVENT = "cameraHasMovedToRight";
        f.CAMERA_WILL_MOVE_TO_FRONT_EVENT = "cameraWillMoveToFront";
        f.CAMERA_HAS_MOVED_TO_FRONT_EVENT = "cameraHasMovedToFront";
        f.CAMERA_WILL_MOVE_TO_BACK_EVENT = "cameraWillMoveToBack";
        f.CAMERA_HAS_MOVED_TO_BACK_EVENT = "cameraHasMovedToBack";
        f.CAMERA_TARGET_WILL_MOVE = "cameraTargetWillMove";
        f.CAMERA_TARGET_HAS_MOVED = "cameraTargetHasMoved";
        f.CAMERA_MODE_WILL_CHANGE = "cameraModeWillChange";
        f.CAMERA_MODE_HAS_CHANGED = "cameraModeHasChanged";
        f.CAMERA_IS_MOVING_EVENT = "cameraIsMoving";
        f.CAMERA_IS_STATIONARY_EVENT = "cameraIsStationary";
        k.FreeCamera = f;
        f = function (d) {
            function e(b, c, g) {
                b = d.call(this, b, c, g) || this;
                b._sceneTeia = g;
                b._worldMinMax = null;
                b._animationsTmp = [];
                b._autoZoom = !1;
                b._autoZoomMode = null;
                return b
            }
            __extends(e, d);
            Object.defineProperty(e.prototype, "cameraType", {
                get: function () {
                    return m.UniversalCamera
                },
                enumerable: !0,
                configurable: !0
            });
            e.prototype._isOrtho = function () {
                return this.mode == a.Camera.ORTHOGRAPHIC_CAMERA ? !0 : !1
            };
            e.prototype._isPersp =
                function () {
                    return this.mode == a.Camera.PERSPECTIVE_CAMERA ? !0 : !1
                };
            e.prototype._toOrtho = function () {};
            e.prototype._toPersp = function () {};
            e.prototype._addAnimation = function (b, c, g, e, d, f, h) {
                b = new a.Animation(b, c, g, e, d);
                e == a.Animation.ANIMATIONTYPE_FLOAT ? e = (f + h) / 2 : (e = f.add(h), e = e.divide(new a.Vector3(2, 2, 2)));
                c = [];
                c.push({
                    frame: 0,
                    value: f
                });
                c.push({
                    frame: 10,
                    value: e
                });
                c.push({
                    frame: 20,
                    value: h
                });
                b.setKeys(c);
                this._animationsTmp.push(b)
            };
            e.prototype._animate = function () {
                this.animations = this._animationsTmp;
                this._sceneTeia.beginAnimation(this,
                    0, 20, !0);
                this._animationsTmp = []
            };
            e.prototype.update = function () {
                d.prototype.update.call(this);
                this._isSynchronizedViewMatrix() ? TeiaJS.Utilities.Event.fire(this, e.CAMERA_IS_STATIONARY_EVENT, this) : TeiaJS.Utilities.Event.fire(this, e.CAMERA_IS_MOVING_EVENT, this);
                if (null == this.animations || 0 === this.animations.length) this._sceneTeia.stopAnimation(this);
                else {
                    var b = this.animations.length;
                    if (0 != b)
                        for (var c = 0; c < b; c++)
                            if (null != this.animations[c]) switch (this.animations[c].dataType) {
                                case a.Animation.ANIMATIONTYPE_FLOAT:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length -
                                        1].value == this[this.animations[c].targetPropertyPath[0]] && this.animations.splice(c, 1);
                                    break;
                                case a.Animation.ANIMATIONTYPE_VECTOR3:
                                    this.animations[c].getKeys()[this.animations[c].getKeys().length - 1].value.equals(this[this.animations[c].targetPropertyPath[0]]) && this.animations.splice(c, 1)
                            }
                }
            };
            e.prototype.top = function () {};
            e.prototype.bottom = function () {};
            e.prototype.right = function () {};
            e.prototype.left = function () {};
            e.prototype.front = function () {};
            e.prototype.back = function () {};
            e.prototype.zoomOrtho = function () {};
            e.prototype.resize = function () {};
            e.prototype.attachControl = function (b, c) {
                void 0 === c && (c = !0);
                d.prototype.attachControl.call(this, b, c)
            };
            e.prototype.detachControl = function (b) {
                d.prototype.detachControl.call(this, b)
            };
            e.prototype.focusOn = function (b) {
                TeiaJS.Utilities.Event.fire(this, e.CAMERA_TARGET_WILL_MOVE, this._id);
                "undefined" == typeof b && (b = this._sceneTeia.meshes);
                this.position = b.min || b.max ? a.Vector3.Center(b.min, b.max).scale(1.25) : (new TeiaJS.API.SelectionIn3D(b)).shifted();
                this.setTarget(a.Vector3.Center(b.min,
                    b.max));
                TeiaJS.Utilities.Event.fire(this, e.CAMERA_TARGET_HAS_MOVED, this._id)
            };
            e.prototype.zoomOn = function (b) {
                void 0 === b && (b = void 0);
                b = b || this.getScene().meshes;
                var c = b.min || b.max ? [b.min, b.max] : (new TeiaJS.API.SelectionIn3D(b)).minMax();
                a.Vector3.Distance(c[0], c[1]);
                this.focusOn(b)
            };
            e.prototype.zoomOnMinMax = function (b, c) {
                this.zoomOn(b)
            };
            e.prototype.startTouchZoom = function (b) {
                this._autoZoom = !0;
                this._autoZoomMode = b
            };
            e.prototype.stopTouchZoom = function () {
                this._autoZoom = !1
            };
            e.prototype.calculateAlpha = function (b,
                c) {
                b = this.inTrigoCircle(b);
                c = this.inTrigoCircle(c);
                return Math.abs(c - b) > Math.abs(c - 2 * Math.PI - b) ? c - 2 * Math.PI : c
            };
            e.prototype.inTrigoCircle = function (b) {
                b %= 2 * Math.PI;
                0 > b && (b += 2 * Math.PI);
                return b
            };
            e.prototype.translate = function (b, c) {};
            return e
        }(a.UniversalCamera);
        f.ZOOM_ON_FACTOR = 1;
        f.AUTO_ZOOM_MORE = 0;
        f.AUTO_ZOOM_LESS = 1;
        f.CAMERA_WILL_MOVE_TO_TOP_EVENT = "cameraWillMoveToTop";
        f.CAMERA_HAS_MOVED_TO_TOP_EVENT = "cameraHasMovedToTop";
        f.CAMERA_WILL_MOVE_TO_BOTTOM_EVENT = "cameraWillMoveToBottom";
        f.CAMERA_HAS_MOVED_TO_BOTTOM_EVENT =
            "cameraHasMovedToBottom";
        f.CAMERA_WILL_MOVE_TO_LEFT_EVENT = "cameraWillMoveToLeft";
        f.CAMERA_HAS_MOVED_TO_LEFT_EVENT = "cameraHasMovedToLeft";
        f.CAMERA_WILL_MOVE_TO_RIGHT_EVENT = "cameraWillMoveToRight";
        f.CAMERA_HAS_MOVED_TO_RIGHT_EVENT = "cameraHasMovedToRight";
        f.CAMERA_WILL_MOVE_TO_FRONT_EVENT = "cameraWillMoveToFront";
        f.CAMERA_HAS_MOVED_TO_FRONT_EVENT = "cameraHasMovedToFront";
        f.CAMERA_WILL_MOVE_TO_BACK_EVENT = "cameraWillMoveToBack";
        f.CAMERA_HAS_MOVED_TO_BACK_EVENT = "cameraHasMovedToBack";
        f.CAMERA_TARGET_WILL_MOVE =
            "cameraTargetWillMove";
        f.CAMERA_TARGET_HAS_MOVED = "cameraTargetHasMoved";
        f.CAMERA_MODE_WILL_CHANGE = "cameraModeWillChange";
        f.CAMERA_MODE_HAS_CHANGED = "cameraModeHasChanged";
        f.CAMERA_IS_MOVING_EVENT = "cameraIsMoving";
        f.CAMERA_IS_STATIONARY_EVENT = "cameraIsStationary";
        k.UniversalCamera = f
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    var k = function (a) {
            function f() {
                var d = a.call(this) || this;
                d.ALBEDO = !1;
                d.AMBIENT = !1;
                d.AMBIENTINGRAYSCALE = !1;
                d.OPACITY = !1;
                d.OPACITYRGB = !1;
                d.REFLECTION = !1;
                d.EMISSIVE = !1;
                d.REFLECTIVITY = !1;
                d.BUMP = !1;
                d.BUMPDIRECTUV = 0;
                d.PARALLAX = !1;
                d.PARALLAXOCCLUSION = !1;
                d.SPECULAROVERALPHA = !1;
                d.CLIPPLANE = !1;
                d.ALPHATEST = !1;
                d.ALPHAFROMALBEDO = !1;
                d.POINTSIZE = !1;
                d.FOG = !1;
                d.SPECULARTERM = !1;
                d.OPACITYFRESNEL = !1;
                d.EMISSIVEFRESNEL = !1;
                d.FRESNEL = !1;
                d.NORMAL = !1;
                d.TANGENT = !1;
                d.UV1 = !1;
                d.UV2 = !1;
                d.VERTEXCOLOR = !1;
                d.VERTEXALPHA = !1;
                d.NUM_BONE_INFLUENCERS = 0;
                d.BonesPerMesh = 0;
                d.INSTANCES = !1;
                d.MICROSURFACEFROMREFLECTIVITYMAP = !1;
                d.MICROSURFACEAUTOMATIC = !1;
                d.EMISSIVEASILLUMINATION = !1;
                d.LINKEMISSIVEWITHALBEDO = !1;
                d.LIGHTMAP = !1;
                d.USELIGHTMAPASSHADOWMAP = !1;
                d.REFLECTIONMAP_3D = !1;
                d.REFLECTIONMAP_SPHERICAL = !1;
                d.REFLECTIONMAP_PLANAR = !1;
                d.REFLECTIONMAP_CUBIC = !1;
                d.REFLECTIONMAP_PROJECTION = !1;
                d.REFLECTIONMAP_SKYBOX = !1;
                d.REFLECTIONMAP_EXPLICIT = !1;
                d.REFLECTIONMAP_EQUIRECTANGULAR = !1;
                d.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !1;
                d.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !1;
                d.INVERTCUBICMAP = !1;
                d.LOGARITHMICDEPTH = !1;
                d.CAMERATONEMAP = !1;
                d.CAMERACONTRAST = !1;
                d.CAMERACOLORGRADING = !1;
                d.CAMERACOLORCURVES = !1;
                d.OVERLOADEDVALUES = !1;
                d.OVERLOADEDSHADOWVALUES = !1;
                d.USESPHERICALFROMREFLECTIONMAP = !1;
                d.REFRACTION = !1;
                d.REFRACTIONMAP_3D = !1;
                d.LINKREFRACTIONTOTRANSPARENCY = !1;
                d.REFRACTIONMAPINLINEARSPACE = !1;
                d.LODBASEDMICROSFURACE = !1;
                d.USEPHYSICALLIGHTFALLOFF = !1;
                d.RADIANCEOVERALPHA = !1;
                d.USEPMREMREFLECTION = !1;
                d.USEPMREMREFRACTION = !1;
                d.TWOSIDEDLIGHTING = !1;
                d.SHADOWFLOAT = !1;
                d.METALLICWORKFLOW = !1;
                d.METALLICMAP = !1;
                d.ROUGHNESSSTOREINMETALMAPALPHA = !1;
                d.ROUGHNESSSTOREINMETALMAPGREEN = !1;
                d.METALLNESSSTOREINMETALMAPBLUE = !1;
                d.AOSTOREINMETALMAPRED = !1;
                d.MICROSURFACEMAP = !1;
                d.MORPHTARGETS = !1;
                d.MORPHTARGETS_NORMAL = !1;
                d.MORPHTARGETS_TANGENT = !1;
                d.NUM_MORPH_INFLUENCERS = 0;
                d.rebuild();
                return d
            }
            __extends(f, a);
            return f
        }(a.MaterialDefines),
        m = function (h) {
            function f(d, e) {
                var b = h.call(this, d, e) || this;
                b.directIntensity = 1;
                b.emissiveIntensity = 1;
                b.environmentIntensity = 1;
                b.specularIntensity = 1;
                b._lightingInfos = new a.Vector4(b.directIntensity,
                    b.emissiveIntensity, b.environmentIntensity, b.specularIntensity);
                b.disableBumpMap = !1;
                b.overloadedShadowIntensity = 1;
                b.overloadedShadeIntensity = 1;
                b._overloadedShadowInfos = new a.Vector4(b.overloadedShadowIntensity, b.overloadedShadeIntensity, 0, 0);
                b.cameraExposure = 1;
                b.cameraContrast = 1;
                b.cameraColorGradingTexture = null;
                b.cameraColorCurves = null;
                b._cameraInfos = new a.Vector4(1, 1, 0, 0);
                b._microsurfaceTextureLods = new a.Vector2(0, 0);
                b.overloadedAmbient = a.Color3.White();
                b.overloadedAmbientIntensity = 0;
                b.overloadedAlbedo =
                    a.Color3.White();
                b.overloadedAlbedoIntensity = 0;
                b.overloadedReflectivity = new a.Color3(0, 0, 0);
                b.overloadedReflectivityIntensity = 0;
                b.overloadedEmissive = a.Color3.White();
                b.overloadedEmissiveIntensity = 0;
                b._overloadedIntensity = new a.Vector4(b.overloadedAmbientIntensity, b.overloadedAlbedoIntensity, b.overloadedReflectivityIntensity, b.overloadedEmissiveIntensity);
                b.overloadedReflection = a.Color3.White();
                b.overloadedReflectionIntensity = 0;
                b.overloadedMicroSurface = 0;
                b.overloadedMicroSurfaceIntensity = 0;
                b._overloadedMicroSurface =
                    new a.Vector3(b.overloadedMicroSurface, b.overloadedMicroSurfaceIntensity, b.overloadedReflectionIntensity);
                b.ambientTextureStrength = 1;
                b.ambientColor = new a.Color3(0, 0, 0);
                b.albedoColor = new a.Color3(1, 1, 1);
                b.reflectivityColor = new a.Color3(1, 1, 1);
                b.reflectionColor = new a.Color3(0, 0, 0);
                b.emissiveColor = new a.Color3(0, 0, 0);
                b.microSurface = .9;
                b.indexOfRefraction = .66;
                b.invertRefractionY = !1;
                b.linkRefractionWithTransparency = !1;
                b.linkEmissiveWithAlbedo = !1;
                b.useLightmapAsShadowmap = !1;
                b.useEmissiveAsIllumination = !1;
                b.useAlphaFromAlbedoTexture = !1;
                b.useSpecularOverAlpha = !0;
                b.useMicroSurfaceFromReflectivityMapAlpha = !1;
                b.useRoughnessFromMetallicTextureAlpha = !0;
                b.useRoughnessFromMetallicTextureGreen = !1;
                b.useMetallnessFromMetallicTextureBlue = !1;
                b.useAmbientOcclusionFromMetallicTextureRed = !1;
                b.useAmbientInGrayScale = !1;
                b.useAutoMicroSurfaceFromReflectivityMap = !1;
                b.useScalarInLinearSpace = !1;
                b.usePhysicalLightFalloff = !0;
                b.useRadianceOverAlpha = !0;
                b.useParallax = !1;
                b.useParallaxOcclusion = !1;
                b.parallaxScaleBias = .05;
                b.disableLighting = !1;
                b.maxSimultaneousLights = 4;
                b.invertNormalMapX = !1;
                b.invertNormalMapY = !1;
                b.twoSidedLighting = !1;
                b._renderTargets = new a.SmartArray(16);
                b._worldViewProjectionMatrix = a.Matrix.Zero();
                b._globalAmbientColor = new a.Color3(0, 0, 0);
                b._tempColor = new a.Color3;
                b._defines = new k;
                b._cachedDefines = new k;
                b._myScene = null;
                b._myShadowGenerator = null;
                b._cachedDefines.BonesPerMesh = -1;
                b.getRenderTargetTextures = function () {
                    b._renderTargets.reset();
                    a.StandardMaterial.ReflectionTextureEnabled && b.reflectionTexture && b.reflectionTexture.isRenderTarget &&
                        b._renderTargets.push(b.reflectionTexture);
                    a.StandardMaterial.RefractionTextureEnabled && b.refractionTexture && b.refractionTexture.isRenderTarget && b._renderTargets.push(b.refractionTexture);
                    return b._renderTargets
                };
                return b
            }
            __extends(f, h);
            f.prototype.getClassName = function () {
                return "LegacyPBRMaterial"
            };
            Object.defineProperty(f.prototype, "useLogarithmicDepth", {
                get: function () {
                    return this._useLogarithmicDepth
                },
                set: function (d) {
                    this._useLogarithmicDepth = d && this.getScene().getEngine().getCaps().fragmentDepthSupported
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype.needAlphaBlending = function () {
                return this.linkRefractionWithTransparency ? !1 : 1 > this.alpha || null != this.opacityTexture || this._shouldUseAlphaFromAlbedoTexture() || this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled
            };
            f.prototype.needAlphaTesting = function () {
                return this.linkRefractionWithTransparency ? !1 : null != this.albedoTexture && this.albedoTexture.hasAlpha
            };
            f.prototype._shouldUseAlphaFromAlbedoTexture = function () {
                return null != this.albedoTexture &&
                    this.albedoTexture.hasAlpha && this.useAlphaFromAlbedoTexture
            };
            f.prototype.getAlphaTestTexture = function () {
                return this.albedoTexture
            };
            f.prototype._checkCache = function (d, e, b) {
                return e ? !1 : !0
            };
            f.prototype.convertColorToLinearSpaceToRef = function (d, e) {
                f.convertColorToLinearSpaceToRef(d, e, this.useScalarInLinearSpace)
            };
            f.convertColorToLinearSpaceToRef = function (d, e, b) {
                b ? (e.r = d.r, e.g = d.g, e.b = d.b) : d.toLinearSpaceToRef(e)
            };
            f.BindLights = function (d, e, b, c, g, l, n) {
                for (var h = 0, p = 0, r = e._lightSources; p < r.length; p++) {
                    var t =
                        r[p],
                        k = t._uniformBuffer.useUbo;
                    t._uniformBuffer.bindToEffect(b, "Light" + h);
                    a.MaterialHelper.BindLightProperties(t, b, h);
                    this.convertColorToLinearSpaceToRef(t.diffuse, f._scaledAlbedo, g);
                    f._scaledAlbedo.scaleToRef(t.intensity, f._scaledAlbedo);
                    t._uniformBuffer.updateColor4(k ? "vLightDiffuse" : "vLightDiffuse" + h, f._scaledAlbedo, n ? t.radius : t.range);
                    c.SPECULARTERM && (this.convertColorToLinearSpaceToRef(t.specular, f._scaledReflectivity, g), f._scaledReflectivity.scaleToRef(t.intensity, f._scaledReflectivity), t._uniformBuffer.updateColor3(k ?
                        "vLightSpecular" : "vLightSpecular" + h, f._scaledReflectivity));
                    d.shadowsEnabled && a.MaterialHelper.BindLightShadow(t, d, e, h + "", b);
                    t._uniformBuffer.update();
                    h++;
                    if (h === l) break
                }
            };
            f.prototype.isReady = function (d, e) {
                if (this.isFrozen && this._wasPreviouslyReady) return !0;
                var b = this.getScene(),
                    c = b.getEngine(),
                    g = !1;
                this._defines.reset();
                b.lightsEnabled && !this.disableLighting && a.MaterialHelper.PrepareDefinesForLights(b, d, this._defines, !0, this.maxSimultaneousLights);
                if (!this.checkReadyOnEveryCall && this._renderId ===
                    b.getRenderId() && this._checkCache(b, d, e)) return !0;
                if (b.texturesEnabled) {
                    b.getEngine().getCaps().textureLOD && (this._defines.LODBASEDMICROSFURACE = !0);
                    if (this.albedoTexture && a.StandardMaterial.DiffuseTextureEnabled) {
                        if (!this.albedoTexture.isReady()) return !1;
                        g = !0;
                        this._defines.ALBEDO = !0
                    }
                    if (this.ambientTexture && a.StandardMaterial.AmbientTextureEnabled) {
                        if (!this.ambientTexture.isReady()) return !1;
                        g = !0;
                        this._defines.AMBIENT = !0;
                        this._defines.AMBIENTINGRAYSCALE = this.useAmbientInGrayScale
                    }
                    if (this.opacityTexture &&
                        a.StandardMaterial.OpacityTextureEnabled) {
                        if (!this.opacityTexture.isReady()) return !1;
                        g = !0;
                        this._defines.OPACITY = !0;
                        this.opacityTexture.getAlphaFromRGB && (this._defines.OPACITYRGB = !0)
                    }
                    if (this.reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled) {
                        if (!this.reflectionTexture.isReady()) return !1;
                        this._defines.REFLECTION = !0;
                        this.reflectionTexture.coordinatesMode === a.Texture.INVCUBIC_MODE && (this._defines.INVERTCUBICMAP = !0);
                        this._defines.REFLECTIONMAP_3D = this.reflectionTexture.isCube;
                        switch (this.reflectionTexture.coordinatesMode) {
                            case a.Texture.CUBIC_MODE:
                            case a.Texture.INVCUBIC_MODE:
                                this._defines.REFLECTIONMAP_CUBIC = !0;
                                break;
                            case a.Texture.EXPLICIT_MODE:
                                this._defines.REFLECTIONMAP_EXPLICIT = !0;
                                break;
                            case a.Texture.PLANAR_MODE:
                                this._defines.REFLECTIONMAP_PLANAR = !0;
                                break;
                            case a.Texture.PROJECTION_MODE:
                                this._defines.REFLECTIONMAP_PROJECTION = !0;
                                break;
                            case a.Texture.SKYBOX_MODE:
                                this._defines.REFLECTIONMAP_SKYBOX = !0;
                                break;
                            case a.Texture.SPHERICAL_MODE:
                                this._defines.REFLECTIONMAP_SPHERICAL = !0;
                                break;
                            case a.Texture.EQUIRECTANGULAR_MODE:
                                this._defines.REFLECTIONMAP_EQUIRECTANGULAR = !0;
                                break;
                            case a.Texture.FIXED_EQUIRECTANGULAR_MODE:
                                this._defines.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !0;
                                break;
                            case a.Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                                this._defines.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !0
                        }
                        this.reflectionTexture instanceof a.HDRCubeTexture && this.reflectionTexture && (this._defines.USESPHERICALFROMREFLECTIONMAP = !0, this.reflectionTexture.isPMREM && (this._defines.USEPMREMREFLECTION = !0))
                    }
                    if (this.lightmapTexture && a.StandardMaterial.LightmapTextureEnabled) {
                        if (!this.lightmapTexture.isReady()) return !1;
                        g = !0;
                        this._defines.LIGHTMAP = !0;
                        this._defines.USELIGHTMAPASSHADOWMAP = this.useLightmapAsShadowmap
                    }
                    if (this.emissiveTexture &&
                        a.StandardMaterial.EmissiveTextureEnabled) {
                        if (!this.emissiveTexture.isReady()) return !1;
                        g = !0;
                        this._defines.EMISSIVE = !0
                    }
                    if (a.StandardMaterial.SpecularTextureEnabled) {
                        if (this.metallicTexture) {
                            if (!this.metallicTexture.isReady()) return !1;
                            g = !0;
                            this._defines.METALLICWORKFLOW = !0;
                            this._defines.METALLICMAP = !0;
                            this._defines.ROUGHNESSSTOREINMETALMAPALPHA = this.useRoughnessFromMetallicTextureAlpha;
                            this._defines.ROUGHNESSSTOREINMETALMAPGREEN = !this.useRoughnessFromMetallicTextureAlpha && this.useRoughnessFromMetallicTextureGreen;
                            this._defines.METALLNESSSTOREINMETALMAPBLUE = this.useMetallnessFromMetallicTextureBlue;
                            this._defines.AOSTOREINMETALMAPRED = this.useAmbientOcclusionFromMetallicTextureRed
                        } else if (this.reflectivityTexture) {
                            if (!this.reflectivityTexture.isReady()) return !1;
                            g = !0;
                            this._defines.REFLECTIVITY = !0;
                            this._defines.MICROSURFACEFROMREFLECTIVITYMAP = this.useMicroSurfaceFromReflectivityMapAlpha;
                            this._defines.MICROSURFACEAUTOMATIC = this.useAutoMicroSurfaceFromReflectivityMap
                        }
                        if (this.microSurfaceTexture) {
                            if (!this.microSurfaceTexture.isReady()) return !1;
                            g = !0;
                            this._defines.MICROSURFACEMAP = !0
                        }
                    }
                    if (b.getEngine().getCaps().standardDerivatives && this.bumpTexture && a.StandardMaterial.BumpTextureEnabled && !this.disableBumpMap) {
                        if (!this.bumpTexture.isReady()) return !1;
                        g = !0;
                        this._defines.BUMP = !0;
                        this.useParallax && this.albedoTexture && a.StandardMaterial.DiffuseTextureEnabled && (this._defines.PARALLAX = !0, this.useParallaxOcclusion && (this._defines.PARALLAXOCCLUSION = !0))
                    }
                    if (this.refractionTexture && a.StandardMaterial.RefractionTextureEnabled) {
                        if (!this.refractionTexture.isReady()) return !1;
                        g = !0;
                        this._defines.REFRACTION = !0;
                        this._defines.REFRACTIONMAP_3D = this.refractionTexture.isCube;
                        this.linkRefractionWithTransparency && (this._defines.LINKREFRACTIONTOTRANSPARENCY = !0);
                        this.refractionTexture instanceof a.HDRCubeTexture && (this._defines.REFRACTIONMAPINLINEARSPACE = !0, this.refractionTexture.isPMREM && (this._defines.USEPMREMREFRACTION = !0))
                    }
                    if (this.cameraColorGradingTexture && a.StandardMaterial.ColorGradingTextureEnabled) {
                        if (!this.cameraColorGradingTexture.isReady()) return !1;
                        this._defines.CAMERACOLORGRADING = !0
                    }!this.backFaceCulling && this.twoSidedLighting && (this._defines.TWOSIDEDLIGHTING = !0)
                }
                b.clipPlane && (this._defines.CLIPPLANE = !0);
                c.getAlphaTesting() && (this._defines.ALPHATEST = !0);
                this._shouldUseAlphaFromAlbedoTexture() && (this._defines.ALPHAFROMALBEDO = !0);
                this.useEmissiveAsIllumination && (this._defines.EMISSIVEASILLUMINATION = !0);
                this.linkEmissiveWithAlbedo && (this._defines.LINKEMISSIVEWITHALBEDO = !0);
                this.useLogarithmicDepth && (this._defines.LOGARITHMICDEPTH = !0);
                1 != this.cameraContrast && (this._defines.CAMERACONTRAST = !0);
                1 != this.cameraExposure && (this._defines.CAMERATONEMAP = !0);
                this.cameraColorCurves && (this._defines.CAMERACOLORCURVES = !0);
                if (1 != this.overloadedShadeIntensity || 1 != this.overloadedShadowIntensity) this._defines.OVERLOADEDSHADOWVALUES = !0;
                if (0 < this.overloadedMicroSurfaceIntensity || 0 < this.overloadedEmissiveIntensity || 0 < this.overloadedReflectivityIntensity || 0 < this.overloadedAlbedoIntensity || 0 < this.overloadedAmbientIntensity || 0 < this.overloadedReflectionIntensity) this._defines.OVERLOADEDVALUES = !0;
                if (this.pointsCloud ||
                    b.forcePointsCloud) this._defines.POINTSIZE = !0;
                b.fogEnabled && d && d.applyFog && b.fogMode !== a.Scene.FOGMODE_NONE && this.fogEnabled && (this._defines.FOG = !0);
                a.StandardMaterial.FresnelEnabled && (this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled || this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled) && (this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled && (this._defines.OPACITYFRESNEL = !0), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled &&
                    (this._defines.EMISSIVEFRESNEL = !0), this._defines.FRESNEL = !0);
                this._defines.SPECULARTERM && this.useSpecularOverAlpha && (this._defines.SPECULAROVERALPHA = !0);
                this.usePhysicalLightFalloff && (this._defines.USEPHYSICALLIGHTFALLOFF = !0);
                this.useRadianceOverAlpha && (this._defines.RADIANCEOVERALPHA = !0);
                if (void 0 !== this.metallic && null !== this.metallic || void 0 !== this.roughness && null !== this.roughness) this._defines.METALLICWORKFLOW = !0;
                d && (b.getEngine().getCaps().standardDerivatives || d.isVerticesDataPresent(a.VertexBuffer.NormalKind) ||
                    (d.createNormals(!0), a.Tools.Warn("PBRMaterial: Normals have been created for the mesh: " + d.name)), d.isVerticesDataPresent(a.VertexBuffer.NormalKind) && (this._defines.NORMAL = !0, d.isVerticesDataPresent(a.VertexBuffer.TangentKind) && (this._defines.TANGENT = !0)), g && (d.isVerticesDataPresent(a.VertexBuffer.UVKind) && (this._defines.UV1 = !0), d.isVerticesDataPresent(a.VertexBuffer.UV2Kind) && (this._defines.UV2 = !0)), d.useVertexColors && d.isVerticesDataPresent(a.VertexBuffer.ColorKind) && (this._defines.VERTEXCOLOR = !0, d.hasVertexAlpha && (this._defines.VERTEXALPHA = !0)), d.useBones && d.computeBonesUsingShaders && (this._defines.NUM_BONE_INFLUENCERS = d.numBoneInfluencers, this._defines.BonesPerMesh = d.skeleton.bones.length + 1), e && (this._defines.INSTANCES = !0), d.morphTargetManager && (e = d.morphTargetManager, this._defines.MORPHTARGETS_TANGENT = e.supportsTangents && this._defines.TANGENT, this._defines.MORPHTARGETS_NORMAL = e.supportsNormals && this._defines.NORMAL, this._defines.MORPHTARGETS = 0 < e.numInfluencers, this._defines.NUM_MORPH_INFLUENCERS =
                        e.numInfluencers));
                if (!this._defines.isEqual(this._cachedDefines)) {
                    this._defines.cloneTo(this._cachedDefines);
                    b.resetCachedMaterial();
                    e = new a.EffectFallbacks;
                    this._defines.REFLECTION && e.addFallback(0, "REFLECTION");
                    this._defines.REFRACTION && e.addFallback(0, "REFRACTION");
                    this._defines.REFLECTIVITY && e.addFallback(0, "REFLECTIVITY");
                    this._defines.BUMP && e.addFallback(0, "BUMP");
                    this._defines.PARALLAX && e.addFallback(1, "PARALLAX");
                    this._defines.PARALLAXOCCLUSION && e.addFallback(0, "PARALLAXOCCLUSION");
                    this._defines.SPECULAROVERALPHA &&
                        e.addFallback(0, "SPECULAROVERALPHA");
                    this._defines.FOG && e.addFallback(1, "FOG");
                    this._defines.POINTSIZE && e.addFallback(0, "POINTSIZE");
                    this._defines.LOGARITHMICDEPTH && e.addFallback(0, "LOGARITHMICDEPTH");
                    a.MaterialHelper.HandleFallbacksForShadows(this._defines, e, this.maxSimultaneousLights);
                    this._defines.SPECULARTERM && e.addFallback(0, "SPECULARTERM");
                    this._defines.OPACITYFRESNEL && e.addFallback(1, "OPACITYFRESNEL");
                    this._defines.EMISSIVEFRESNEL && e.addFallback(2, "EMISSIVEFRESNEL");
                    this._defines.FRESNEL &&
                        e.addFallback(3, "FRESNEL");
                    0 < this._defines.NUM_BONE_INFLUENCERS && e.addCPUSkinningFallback(0, d);
                    g = [a.VertexBuffer.PositionKind];
                    this._defines.NORMAL && g.push(a.VertexBuffer.NormalKind);
                    this._defines.TANGENT && g.push(a.VertexBuffer.TangentKind);
                    this._defines.UV1 && g.push(a.VertexBuffer.UVKind);
                    this._defines.UV2 && g.push(a.VertexBuffer.UV2Kind);
                    this._defines.VERTEXCOLOR && g.push(a.VertexBuffer.ColorKind);
                    a.MaterialHelper.PrepareAttributesForBones(g, d, this._defines, e);
                    a.MaterialHelper.PrepareAttributesForInstances(g,
                        this._defines);
                    a.MaterialHelper.PrepareAttributesForMorphTargets(g, d, this._defines);
                    d = this._defines.toString();
                    var l = "world view viewProjection vEyePosition vLightsType vAmbientColor vAlbedoColor vReflectivityColor vEmissiveColor vReflectionColor vFogInfos vFogColor pointSize vAlbedoInfos vAmbientInfos vOpacityInfos vReflectionInfos vEmissiveInfos vReflectivityInfos vMicroSurfaceSamplerInfos vBumpInfos vLightmapInfos vRefractionInfos mBones vClipPlane albedoMatrix ambientMatrix opacityMatrix reflectionMatrix emissiveMatrix reflectivityMatrix microSurfaceSamplerMatrix bumpMatrix lightmapMatrix refractionMatrix opacityParts emissiveLeftColor emissiveRightColor vLightingIntensity vOverloadedShadowIntensity vOverloadedIntensity vOverloadedAlbedo vOverloadedReflection vOverloadedReflectivity vOverloadedEmissive vOverloadedMicroSurface logarithmicDepthConstant vSphericalX vSphericalY vSphericalZ vSphericalXX vSphericalYY vSphericalZZ vSphericalXY vSphericalYZ vSphericalZX vMicrosurfaceTextureLods vCameraInfos vNormalReoderParams".split(" "),
                        f = "albedoSampler ambientSampler opacitySampler reflectionCubeSampler reflection2DSampler emissiveSampler reflectivitySampler microSurfaceSampler bumpSampler lightmapSampler refractionCubeSampler refraction2DSampler".split(" "),
                        h = ["Material", "Scene"];
                    this._defines.CAMERACOLORCURVES && a.ColorCurves.PrepareUniforms(l);
                    this._defines.CAMERACOLORGRADING && (l.push("vCameraColorGradingInfos", "vCameraColorGradingScaleOffset"), f.push("cameraColorGrading2DSampler"));
                    a.MaterialHelper.PrepareUniformsAndSamplersList({
                        uniformsNames: l,
                        uniformBuffersNames: h,
                        samplers: f,
                        defines: this._defines,
                        maxSimultaneousLights: this.maxSimultaneousLights
                    });
                    var p = function (c) {
                        if (this.onCompiled) this.onCompiled(c);
                        this.bindSceneUniformBuffer(c, b.getSceneUniformBuffer())
                    }.bind(this);
                    this._effect = b.getEngine().createEffect("legacyPbr", {
                            attributes: g,
                            uniformsNames: l,
                            uniformBuffersNames: h,
                            samplers: f,
                            defines: d,
                            fallbacks: e,
                            onCompiled: p,
                            onError: this.onError,
                            indexParameters: {
                                maxSimultaneousLights: this.maxSimultaneousLights,
                                maxSimultaneousMorphTargets: this._defines.NUM_MORPH_INFLUENCERS
                            }
                        },
                        c);
                    this.buildUniformLayout()
                }
                if (!this._effect.isReady()) return !1;
                this._renderId = b.getRenderId();
                return this._wasPreviouslyReady = !0
            };
            f.prototype.buildUniformLayout = function () {
                this._uniformBuffer.addUniform("vAlbedoInfos", 2);
                this._uniformBuffer.addUniform("vAmbientInfos", 3);
                this._uniformBuffer.addUniform("vOpacityInfos", 2);
                this._uniformBuffer.addUniform("vEmissiveInfos", 2);
                this._uniformBuffer.addUniform("vLightmapInfos", 2);
                this._uniformBuffer.addUniform("vReflectivityInfos", 3);
                this._uniformBuffer.addUniform("vMicroSurfaceSamplerInfos",
                    2);
                this._uniformBuffer.addUniform("vRefractionInfos", 4);
                this._uniformBuffer.addUniform("vReflectionInfos", 2);
                this._uniformBuffer.addUniform("vBumpInfos", 3);
                this._uniformBuffer.addUniform("albedoMatrix", 16);
                this._uniformBuffer.addUniform("ambientMatrix", 16);
                this._uniformBuffer.addUniform("opacityMatrix", 16);
                this._uniformBuffer.addUniform("emissiveMatrix", 16);
                this._uniformBuffer.addUniform("lightmapMatrix", 16);
                this._uniformBuffer.addUniform("reflectivityMatrix", 16);
                this._uniformBuffer.addUniform("microSurfaceSamplerMatrix",
                    16);
                this._uniformBuffer.addUniform("bumpMatrix", 16);
                this._uniformBuffer.addUniform("vNormalReoderParams", 4);
                this._uniformBuffer.addUniform("refractionMatrix", 16);
                this._uniformBuffer.addUniform("reflectionMatrix", 16);
                this._uniformBuffer.addUniform("vReflectionColor", 3);
                this._uniformBuffer.addUniform("vAlbedoColor", 4);
                this._uniformBuffer.addUniform("vLightingIntensity", 4);
                this._uniformBuffer.addUniform("vMicrosurfaceTextureLods", 2);
                this._uniformBuffer.addUniform("vReflectivityColor", 4);
                this._uniformBuffer.addUniform("vEmissiveColor",
                    3);
                this._uniformBuffer.addUniform("opacityParts", 4);
                this._uniformBuffer.addUniform("emissiveLeftColor", 4);
                this._uniformBuffer.addUniform("emissiveRightColor", 4);
                this._uniformBuffer.addUniform("vOverloadedIntensity", 4);
                this._uniformBuffer.addUniform("vOverloadedAmbient", 3);
                this._uniformBuffer.addUniform("vOverloadedAlbedo", 3);
                this._uniformBuffer.addUniform("vOverloadedReflectivity", 3);
                this._uniformBuffer.addUniform("vOverloadedEmissive", 3);
                this._uniformBuffer.addUniform("vOverloadedReflection", 3);
                this._uniformBuffer.addUniform("vOverloadedMicroSurface", 3);
                this._uniformBuffer.addUniform("vOverloadedShadowIntensity", 4);
                this._uniformBuffer.addUniform("pointSize", 1);
                this._uniformBuffer.create()
            };
            f.prototype.unbind = function () {
                this.reflectionTexture && this.reflectionTexture.isRenderTarget && this._uniformBuffer.setTexture("reflection2DSampler", null);
                this.refractionTexture && this.refractionTexture.isRenderTarget && this._uniformBuffer.setTexture("refraction2DSampler", null);
                h.prototype.unbind.call(this)
            };
            f.prototype.bindOnlyWorldMatrix = function (d) {
                this._effect.setMatrix("world", d)
            };
            f.prototype.bind = function (d, e) {
                this._myScene = this.getScene();
                var b = this._effect;
                this.bindOnlyWorldMatrix(d);
                a.MaterialHelper.BindBonesParameters(e, this._effect);
                if (this._myScene.getCachedMaterial() !== this) {
                    this._uniformBuffer.bindToEffect(b, "Material");
                    this.bindViewProjection(b);
                    this._uniformBuffer.useUbo && this.isFrozen && this._uniformBuffer.isSync || (a.StandardMaterial.FresnelEnabled && (this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled &&
                            this._uniformBuffer.updateColor4("opacityParts", new a.Color3(this.opacityFresnelParameters.leftColor.toLuminance(), this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled && (this._uniformBuffer.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power), this._uniformBuffer.updateColor4("emissiveRightColor",
                                this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias))), this._myScene.texturesEnabled && (this.albedoTexture && a.StandardMaterial.DiffuseTextureEnabled && (this._uniformBuffer.updateFloat2("vAlbedoInfos", this.albedoTexture.coordinatesIndex, this.albedoTexture.level), this._uniformBuffer.updateMatrix("albedoMatrix", this.albedoTexture.getTextureMatrix())), this.ambientTexture && a.StandardMaterial.AmbientTextureEnabled && (this._uniformBuffer.updateFloat3("vAmbientInfos", this.ambientTexture.coordinatesIndex,
                            this.ambientTexture.level, this.ambientTextureStrength), this._uniformBuffer.updateMatrix("ambientMatrix", this.ambientTexture.getTextureMatrix())), this.opacityTexture && a.StandardMaterial.OpacityTextureEnabled && (this._uniformBuffer.updateFloat2("vOpacityInfos", this.opacityTexture.coordinatesIndex, this.opacityTexture.level), this._uniformBuffer.updateMatrix("opacityMatrix", this.opacityTexture.getTextureMatrix())), this.reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled && (this._microsurfaceTextureLods.x =
                            Math.round(Math.log(this.reflectionTexture.getSize().width) * Math.LOG2E), this._uniformBuffer.updateMatrix("reflectionMatrix", this.reflectionTexture.getReflectionTextureMatrix()), this._uniformBuffer.updateFloat2("vReflectionInfos", this.reflectionTexture.level, 0), this._defines.USESPHERICALFROMREFLECTIONMAP && (d = this.reflectionTexture.sphericalPolynomial, this._effect.setFloat3("vSphericalX", d.x.x, d.x.y, d.x.z), this._effect.setFloat3("vSphericalY", d.y.x, d.y.y, d.y.z), this._effect.setFloat3("vSphericalZ",
                                d.z.x, d.z.y, d.z.z), this._effect.setFloat3("vSphericalXX_ZZ", d.xx.x - d.zz.x, d.xx.y - d.zz.y, d.xx.z - d.zz.z), this._effect.setFloat3("vSphericalYY_ZZ", d.yy.x - d.zz.x, d.yy.y - d.zz.y, d.yy.z - d.zz.z), this._effect.setFloat3("vSphericalZZ", d.zz.x, d.zz.y, d.zz.z), this._effect.setFloat3("vSphericalXY", d.xy.x, d.xy.y, d.xy.z), this._effect.setFloat3("vSphericalYZ", d.yz.x, d.yz.y, d.yz.z), this._effect.setFloat3("vSphericalZX", d.zx.x, d.zx.y, d.zx.z))), this.emissiveTexture && a.StandardMaterial.EmissiveTextureEnabled && (this._uniformBuffer.updateFloat2("vEmissiveInfos",
                            this.emissiveTexture.coordinatesIndex, this.emissiveTexture.level), this._uniformBuffer.updateMatrix("emissiveMatrix", this.emissiveTexture.getTextureMatrix())), this.lightmapTexture && a.StandardMaterial.LightmapTextureEnabled && (this._uniformBuffer.updateFloat2("vLightmapInfos", this.lightmapTexture.coordinatesIndex, this.lightmapTexture.level), this._uniformBuffer.updateMatrix("lightmapMatrix", this.lightmapTexture.getTextureMatrix())), a.StandardMaterial.SpecularTextureEnabled && (this.metallicTexture ? (this._uniformBuffer.updateFloat3("vReflectivityInfos",
                            this.metallicTexture.coordinatesIndex, this.metallicTexture.level, this.ambientTextureStrength), this._uniformBuffer.updateMatrix("reflectivityMatrix", this.metallicTexture.getTextureMatrix())) : this.reflectivityTexture && (this._uniformBuffer.updateFloat3("vReflectivityInfos", this.reflectivityTexture.coordinatesIndex, this.reflectivityTexture.level, 1), this._uniformBuffer.updateMatrix("reflectivityMatrix", this.reflectivityTexture.getTextureMatrix())), this.microSurfaceTexture && (this._uniformBuffer.updateFloat2("vMicroSurfaceSamplerInfos",
                            this.microSurfaceTexture.coordinatesIndex, this.microSurfaceTexture.level), this._uniformBuffer.updateMatrix("microSurfaceSamplerMatrix", this.microSurfaceTexture.getTextureMatrix()))), this.bumpTexture && this._myScene.getEngine().getCaps().standardDerivatives && a.StandardMaterial.BumpTextureEnabled && !this.disableBumpMap && (this._uniformBuffer.updateFloat3("vBumpInfos", this.bumpTexture.coordinatesIndex, 1 / this.bumpTexture.level, this.parallaxScaleBias), this._uniformBuffer.updateMatrix("bumpMatrix", this.bumpTexture.getTextureMatrix()),
                            this._myScene._mirroredCameraPosition ? this._uniformBuffer.updateFloat4("vNormalReoderParams", this.invertNormalMapX ? 0 : 1, this.invertNormalMapX ? 1 : -1, this.invertNormalMapY ? 0 : 1, this.invertNormalMapY ? 1 : -1) : this._uniformBuffer.updateFloat4("vNormalReoderParams", this.invertNormalMapX ? 1 : 0, this.invertNormalMapX ? -1 : 1, this.invertNormalMapY ? 1 : 0, this.invertNormalMapY ? -1 : 1)), this.refractionTexture && a.StandardMaterial.RefractionTextureEnabled && (this._microsurfaceTextureLods.y = Math.round(Math.log(this.refractionTexture.getSize().width) *
                            Math.LOG2E), d = 1, this.refractionTexture.isCube || (this._uniformBuffer.updateMatrix("refractionMatrix", this.refractionTexture.getReflectionTextureMatrix()), this.refractionTexture.depth && (d = this.refractionTexture.depth)), this._uniformBuffer.updateFloat4("vRefractionInfos", this.refractionTexture.level, this.indexOfRefraction, d, this.invertRefractionY ? -1 : 1)), (this.reflectionTexture || this.refractionTexture) && this._uniformBuffer.updateFloat2("vMicrosurfaceTextureLods", this._microsurfaceTextureLods.x, this._microsurfaceTextureLods.y)),
                        this.pointsCloud && this._uniformBuffer.updateFloat("pointSize", this.pointSize), this._defines.METALLICWORKFLOW ? (f._scaledReflectivity.r = void 0 === this.metallic || null === this.metallic ? 1 : this.metallic, f._scaledReflectivity.g = void 0 === this.roughness || null === this.roughness ? 1 : this.roughness, this._uniformBuffer.updateColor4("vReflectivityColor", f._scaledReflectivity, 0)) : (this.convertColorToLinearSpaceToRef(this.reflectivityColor, f._scaledReflectivity), this._uniformBuffer.updateColor4("vReflectivityColor", f._scaledReflectivity,
                            this.microSurface)), this.convertColorToLinearSpaceToRef(this.emissiveColor, f._scaledEmissive), this._uniformBuffer.updateColor3("vEmissiveColor", f._scaledEmissive), this.convertColorToLinearSpaceToRef(this.reflectionColor, f._scaledReflection), this._uniformBuffer.updateColor3("vReflectionColor", f._scaledReflection), this.convertColorToLinearSpaceToRef(this.albedoColor, f._scaledAlbedo), this._uniformBuffer.updateColor4("vAlbedoColor", f._scaledAlbedo, this.alpha * e.visibility), this._lightingInfos.x = this.directIntensity,
                        this._lightingInfos.y = this.emissiveIntensity, this._lightingInfos.z = this.environmentIntensity, this._lightingInfos.w = this.specularIntensity, this._uniformBuffer.updateVector4("vLightingIntensity", this._lightingInfos), this._overloadedShadowInfos.x = this.overloadedShadowIntensity, this._overloadedShadowInfos.y = this.overloadedShadeIntensity, this._uniformBuffer.updateVector4("vOverloadedShadowIntensity", this._overloadedShadowInfos), this._overloadedIntensity.x = this.overloadedAmbientIntensity, this._overloadedIntensity.y =
                        this.overloadedAlbedoIntensity, this._overloadedIntensity.z = this.overloadedReflectivityIntensity, this._overloadedIntensity.w = this.overloadedEmissiveIntensity, this._uniformBuffer.updateVector4("vOverloadedIntensity", this._overloadedIntensity), this._uniformBuffer.updateColor3("vOverloadedAmbient", this.overloadedAmbient), this.convertColorToLinearSpaceToRef(this.overloadedAlbedo, this._tempColor), this._uniformBuffer.updateColor3("vOverloadedAlbedo", this._tempColor), this.convertColorToLinearSpaceToRef(this.overloadedReflectivity,
                            this._tempColor), this._uniformBuffer.updateColor3("vOverloadedReflectivity", this._tempColor), this.convertColorToLinearSpaceToRef(this.overloadedEmissive, this._tempColor), this._uniformBuffer.updateColor3("vOverloadedEmissive", this._tempColor), this.convertColorToLinearSpaceToRef(this.overloadedReflection, this._tempColor), this._uniformBuffer.updateColor3("vOverloadedReflection", this._tempColor), this._overloadedMicroSurface.x = this.overloadedMicroSurface, this._overloadedMicroSurface.y = this.overloadedMicroSurfaceIntensity,
                        this._overloadedMicroSurface.z = this.overloadedReflectionIntensity, this._uniformBuffer.updateVector3("vOverloadedMicroSurface", this._overloadedMicroSurface));
                    if (this._myScene.texturesEnabled && (this.albedoTexture && a.StandardMaterial.DiffuseTextureEnabled && this._uniformBuffer.setTexture("albedoSampler", this.albedoTexture), this.ambientTexture && a.StandardMaterial.AmbientTextureEnabled && this._uniformBuffer.setTexture("ambientSampler", this.ambientTexture), this.opacityTexture && a.StandardMaterial.OpacityTextureEnabled &&
                            this._uniformBuffer.setTexture("opacitySampler", this.opacityTexture), this.reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled && (this.reflectionTexture.isCube ? this._uniformBuffer.setTexture("reflectionCubeSampler", this.reflectionTexture) : this._uniformBuffer.setTexture("reflection2DSampler", this.reflectionTexture)), this.emissiveTexture && a.StandardMaterial.EmissiveTextureEnabled && this._uniformBuffer.setTexture("emissiveSampler", this.emissiveTexture), this.lightmapTexture && a.StandardMaterial.LightmapTextureEnabled &&
                            this._uniformBuffer.setTexture("lightmapSampler", this.lightmapTexture), a.StandardMaterial.SpecularTextureEnabled && (this.metallicTexture ? this._uniformBuffer.setTexture("reflectivitySampler", this.metallicTexture) : this.reflectivityTexture && this._uniformBuffer.setTexture("reflectivitySampler", this.reflectivityTexture), this.microSurfaceTexture && this._uniformBuffer.setTexture("microSurfaceSampler", this.microSurfaceTexture)), this.bumpTexture && this._myScene.getEngine().getCaps().standardDerivatives && a.StandardMaterial.BumpTextureEnabled &&
                            !this.disableBumpMap && this._uniformBuffer.setTexture("bumpSampler", this.bumpTexture), this.refractionTexture && a.StandardMaterial.RefractionTextureEnabled && (this.refractionTexture.isCube ? this._uniformBuffer.setTexture("refractionCubeSampler", this.refractionTexture) : this._uniformBuffer.setTexture("refraction2DSampler", this.refractionTexture)), this.cameraColorGradingTexture && a.StandardMaterial.ColorGradingTextureEnabled)) {
                        this._effect.setTexture("cameraColorGrading2DSampler", this.cameraColorGradingTexture);
                        var c = this.cameraColorGradingTexture.level;
                        d = this.cameraColorGradingTexture.getSize().height;
                        var g = d - 1,
                            l = 1 / d;
                        this._effect.setFloat4("vCameraColorGradingInfos", c, d, g, l);
                        c = l / d;
                        this._effect.setFloat4("vCameraColorGradingScaleOffset", g * c, g / d, .5 * c, .5 * l)
                    }
                    a.MaterialHelper.BindClipPlane(this._effect, this._myScene);
                    this._myScene.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor);
                    b.setVector3("vEyePosition", this._myScene._mirroredCameraPosition ? this._myScene._mirroredCameraPosition : this._myScene.activeCamera.position);
                    b.setColor3("vAmbientColor", this._globalAmbientColor)
                }
                this._myScene.getCachedMaterial() === this && this.isFrozen || (this._myScene.lightsEnabled && !this.disableLighting && f.BindLights(this._myScene, e, this._effect, this._defines, this.useScalarInLinearSpace, this.maxSimultaneousLights, this.usePhysicalLightFalloff), (this._myScene.fogEnabled && e.applyFog && this._myScene.fogMode !== a.Scene.FOGMODE_NONE || this.reflectionTexture) && this.bindView(b), a.MaterialHelper.BindFogParameters(this._myScene, e, this._effect), this._defines.NUM_MORPH_INFLUENCERS &&
                    a.MaterialHelper.BindMorphTargetParameters(e, this._effect), this._cameraInfos.x = this.cameraExposure, this._cameraInfos.y = this.cameraContrast, b.setVector4("vCameraInfos", this._cameraInfos), this.cameraColorCurves && a.ColorCurves.Bind(this.cameraColorCurves, this._effect), a.MaterialHelper.BindLogDepth(this._defines, this._effect, this._myScene));
                this._uniformBuffer.update();
                this._afterBind(e);
                this._myScene = null
            };
            f.prototype.getAnimatables = function () {
                var d = [];
                this.albedoTexture && this.albedoTexture.animations &&
                    0 < this.albedoTexture.animations.length && d.push(this.albedoTexture);
                this.ambientTexture && this.ambientTexture.animations && 0 < this.ambientTexture.animations.length && d.push(this.ambientTexture);
                this.opacityTexture && this.opacityTexture.animations && 0 < this.opacityTexture.animations.length && d.push(this.opacityTexture);
                this.reflectionTexture && this.reflectionTexture.animations && 0 < this.reflectionTexture.animations.length && d.push(this.reflectionTexture);
                this.emissiveTexture && this.emissiveTexture.animations && 0 <
                    this.emissiveTexture.animations.length && d.push(this.emissiveTexture);
                this.metallicTexture && this.metallicTexture.animations && 0 < this.metallicTexture.animations.length ? d.push(this.metallicTexture) : this.reflectivityTexture && this.reflectivityTexture.animations && 0 < this.reflectivityTexture.animations.length && d.push(this.reflectivityTexture);
                this.bumpTexture && this.bumpTexture.animations && 0 < this.bumpTexture.animations.length && d.push(this.bumpTexture);
                this.lightmapTexture && this.lightmapTexture.animations &&
                    0 < this.lightmapTexture.animations.length && d.push(this.lightmapTexture);
                this.refractionTexture && this.refractionTexture.animations && 0 < this.refractionTexture.animations.length && d.push(this.refractionTexture);
                this.cameraColorGradingTexture && this.cameraColorGradingTexture.animations && 0 < this.cameraColorGradingTexture.animations.length && d.push(this.cameraColorGradingTexture);
                return d
            };
            f.prototype.dispose = function (d, e) {
                e && (this.albedoTexture && this.albedoTexture.dispose(), this.ambientTexture && this.ambientTexture.dispose(),
                    this.opacityTexture && this.opacityTexture.dispose(), this.reflectionTexture && this.reflectionTexture.dispose(), this.emissiveTexture && this.emissiveTexture.dispose(), this.metallicTexture && this.metallicTexture.dispose(), this.reflectivityTexture && this.reflectivityTexture.dispose(), this.bumpTexture && this.bumpTexture.dispose(), this.lightmapTexture && this.lightmapTexture.dispose(), this.refractionTexture && this.refractionTexture.dispose(), this.cameraColorGradingTexture && this.cameraColorGradingTexture.dispose());
                this._renderTargets.dispose();
                h.prototype.dispose.call(this, d, e)
            };
            f.prototype.clone = function (d) {
                var e = this;
                return a.SerializationHelper.Clone(function () {
                    return new f(d, e.getScene())
                }, this)
            };
            f.prototype.serialize = function () {
                var d = a.SerializationHelper.Serialize(this);
                d.customType = "BABYLON.LegacyPBRMaterial";
                return d
            };
            f.Parse = function (d, e, b) {
                return a.SerializationHelper.Parse(function () {
                    return new f(d.name, e)
                }, d, e, b)
            };
            return f
        }(a.Material);
    m._scaledAlbedo = new a.Color3;
    m._scaledReflectivity = new a.Color3;
    m._scaledEmissive = new a.Color3;
    m._scaledReflection = new a.Color3;
    __decorate([a.serialize()], m.prototype, "directIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "emissiveIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "environmentIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "specularIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "disableBumpMap", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedShadowIntensity", void 0);
    __decorate([a.serialize()], m.prototype,
        "overloadedShadeIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "cameraExposure", void 0);
    __decorate([a.serialize()], m.prototype, "cameraContrast", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "cameraColorGradingTexture", void 0);
    __decorate([a.serializeAsColorCurves()], m.prototype, "cameraColorCurves", void 0);
    __decorate([a.serializeAsColor3()], m.prototype, "overloadedAmbient", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedAmbientIntensity", void 0);
    __decorate([a.serializeAsColor3()],
        m.prototype, "overloadedAlbedo", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedAlbedoIntensity", void 0);
    __decorate([a.serializeAsColor3()], m.prototype, "overloadedReflectivity", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedReflectivityIntensity", void 0);
    __decorate([a.serializeAsColor3()], m.prototype, "overloadedEmissive", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedEmissiveIntensity", void 0);
    __decorate([a.serializeAsColor3()], m.prototype, "overloadedReflection", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedReflectionIntensity", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedMicroSurface", void 0);
    __decorate([a.serialize()], m.prototype, "overloadedMicroSurfaceIntensity", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "albedoTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "ambientTexture", void 0);
    __decorate([a.serialize()], m.prototype, "ambientTextureStrength", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "opacityTexture",
        void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "reflectionTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "emissiveTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "reflectivityTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "metallicTexture", void 0);
    __decorate([a.serialize()], m.prototype, "metallic", void 0);
    __decorate([a.serialize()], m.prototype, "roughness", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "microSurfaceTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "bumpTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "lightmapTexture", void 0);
    __decorate([a.serializeAsTexture()], m.prototype, "refractionTexture", void 0);
    __decorate([a.serializeAsColor3("ambient")], m.prototype, "ambientColor", void 0);
    __decorate([a.serializeAsColor3("albedo")], m.prototype, "albedoColor", void 0);
    __decorate([a.serializeAsColor3("reflectivity")], m.prototype, "reflectivityColor", void 0);
    __decorate([a.serializeAsColor3("reflection")],
        m.prototype, "reflectionColor", void 0);
    __decorate([a.serializeAsColor3("emissive")], m.prototype, "emissiveColor", void 0);
    __decorate([a.serialize()], m.prototype, "microSurface", void 0);
    __decorate([a.serialize()], m.prototype, "indexOfRefraction", void 0);
    __decorate([a.serialize()], m.prototype, "invertRefractionY", void 0);
    __decorate([a.serializeAsFresnelParameters()], m.prototype, "opacityFresnelParameters", void 0);
    __decorate([a.serializeAsFresnelParameters()], m.prototype, "emissiveFresnelParameters", void 0);
    __decorate([a.serialize()], m.prototype, "linkRefractionWithTransparency", void 0);
    __decorate([a.serialize()], m.prototype, "linkEmissiveWithAlbedo", void 0);
    __decorate([a.serialize()], m.prototype, "useLightmapAsShadowmap", void 0);
    __decorate([a.serialize()], m.prototype, "useEmissiveAsIllumination", void 0);
    __decorate([a.serialize()], m.prototype, "useAlphaFromAlbedoTexture", void 0);
    __decorate([a.serialize()], m.prototype, "useSpecularOverAlpha", void 0);
    __decorate([a.serialize()], m.prototype, "useMicroSurfaceFromReflectivityMapAlpha",
        void 0);
    __decorate([a.serialize()], m.prototype, "useRoughnessFromMetallicTextureAlpha", void 0);
    __decorate([a.serialize()], m.prototype, "useRoughnessFromMetallicTextureGreen", void 0);
    __decorate([a.serialize()], m.prototype, "useMetallnessFromMetallicTextureBlue", void 0);
    __decorate([a.serialize()], m.prototype, "useAmbientOcclusionFromMetallicTextureRed", void 0);
    __decorate([a.serialize()], m.prototype, "useAmbientInGrayScale", void 0);
    __decorate([a.serialize()], m.prototype, "useAutoMicroSurfaceFromReflectivityMap",
        void 0);
    __decorate([a.serialize()], m.prototype, "useScalarInLinearSpace", void 0);
    __decorate([a.serialize()], m.prototype, "usePhysicalLightFalloff", void 0);
    __decorate([a.serialize()], m.prototype, "useRadianceOverAlpha", void 0);
    __decorate([a.serialize()], m.prototype, "useParallax", void 0);
    __decorate([a.serialize()], m.prototype, "useParallaxOcclusion", void 0);
    __decorate([a.serialize()], m.prototype, "parallaxScaleBias", void 0);
    __decorate([a.serialize()], m.prototype, "disableLighting", void 0);
    __decorate([a.serialize()],
        m.prototype, "maxSimultaneousLights", void 0);
    __decorate([a.serialize()], m.prototype, "invertNormalMapX", void 0);
    __decorate([a.serialize()], m.prototype, "invertNormalMapY", void 0);
    __decorate([a.serialize()], m.prototype, "twoSidedLighting", void 0);
    __decorate([a.serialize()], m.prototype, "useLogarithmicDepth", null);
    a.LegacyPBRMaterial = m
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b) {
                d = h.call(this, d, e) || this;
                d._diffuseColor = b;
                return d
            }
            __extends(f, h);
            f.prototype.needAlphaBlending = function () {
                return 1 > f.OpacityFactor * this._diffuseColor.a
            };
            f.prototype.needAlphaTesting = function () {
                return !0
            };
            f.prototype.isReady = function () {
                var d = this.getScene().getEngine();
                d.setAlphaTesting(!0);
                d.setAlphaMode(a.Engine.ALPHA_ADD);
                d.setDepthBuffer(!0);
                this._effect = d.createEffect("defaultMaterial", ["position", "normal", "uv"], ["worldViewProjection",
                    "diffuseColor", "vEyePosition", "world"
                ], [], "");
                return this._effect.isReady() ? !0 : !1
            };
            f.prototype.bind = function (d, e) {
                this._effect.setMatrix("world", d);
                this._effect.setVector3("vEyePosition", this.getScene().activeCamera.position);
                this._effect.setMatrix("worldViewProjection", d.multiply(this.getScene().getTransformMatrix()));
                this._effect.setColor4("diffuseColor", new a.Color3(this._diffuseColor.r, this._diffuseColor.g, this._diffuseColor.b), this._diffuseColor.a * f.OpacityFactor)
            };
            return f
        }(a.Material);
        m.OpacityFactor =
            .45;
        k.DefaultMaterial = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    var k = function (a) {
        function f() {
            var d = null !== a && a.apply(this, arguments) || this;
            d.CUTTING = !1;
            return d
        }
        __extends(f, a);
        return f
    }(a.StandardMaterialDefines);
    a.CuttingMaterialDefines = k;
    var m = function (h) {
        function f() {
            var d = null !== h && h.apply(this, arguments) || this;
            d._planeQuaternion = new a.Vector4(0, 0, 0, 0);
            d._planePositionTop = new a.Vector4(0, 0, 0, 0);
            d._planePositionBottom = new a.Vector4(0, 0, 0, 0);
            d._planePositionLeft = new a.Vector4(0, 0, 0, 0);
            d._planePositionRight = new a.Vector4(0, 0, 0, 0);
            d._planePositionBack =
                new a.Vector4(0, 0, 0, 0);
            d._planePositionFront = new a.Vector4(0, 0, 0, 0);
            d._maximumPlaneTop = new a.Vector3(0, 0, 0);
            d._minimumPlaneTop = new a.Vector3(0, 0, 0);
            d._maximumPlaneBottom = new a.Vector3(0, 0, 0);
            d._minimumPlaneBottom = new a.Vector3(0, 0, 0);
            d._maximumPlaneLeft = new a.Vector3(0, 0, 0);
            d._minimumPlaneLeft = new a.Vector3(0, 0, 0);
            d._maximumPlaneRight = new a.Vector3(0, 0, 0);
            d._minimumPlaneRight = new a.Vector3(0, 0, 0);
            d._maximumPlaneFront = new a.Vector3(0, 0, 0);
            d._minimumPlaneFront = new a.Vector3(0, 0, 0);
            d._maximumPlaneBack =
                new a.Vector3(0, 0, 0);
            d._minimumPlaneBack = new a.Vector3(0, 0, 0);
            d._cuttingPlaneUniforms = "maximumPlaneFront minimumPlaneFront maximumPlaneBack minimumPlaneBack maximumPlaneRight minimumPlaneRight maximumPlaneLeft minimumPlaneLeft maximumPlaneTop minimumPlaneTop maximumPlaneBottom minimumPlaneBottom planePositionTop planePositionBack planePositionLeft planePositionBottom planePositionFront planePositionRight planeQuaternion worldPlaneMatrix".split(" ");
            d._defines = new k;
            d._attributes = [];
            return d
        }
        __extends(f,
            h);
        f.prototype.setCuttingMode = function (d) {
            this._defines.CUTTING = d
        };
        f.prototype.setPlaneQuaternion = function (d) {
            this._planeQuaternion = d
        };
        f.prototype.setPlanePositionTop = function (d) {
            this._planePositionTop = d
        };
        f.prototype.setPlanePositionBottom = function (d) {
            this._planePositionBottom = d
        };
        f.prototype.setPlanePositionFront = function (d) {
            this._planePositionFront = d
        };
        f.prototype.setPlanePositionBack = function (d) {
            this._planePositionBack = d
        };
        f.prototype.setPlanePositionLeft = function (d) {
            this._planePositionLeft = d
        };
        f.prototype.setPlanePositionRight =
            function (d) {
                this._planePositionRight = d
            };
        f.prototype.setMinimumTop = function (d) {
            this._minimumPlaneTop = d
        };
        f.prototype.setMaximumTop = function (d) {
            this._maximumPlaneTop = d
        };
        f.prototype.setMinimumBottom = function (d) {
            this._minimumPlaneBottom = d
        };
        f.prototype.setMaximumBottom = function (d) {
            this._maximumPlaneBottom = d
        };
        f.prototype.setMinimumLeft = function (d) {
            this._minimumPlaneLeft = d
        };
        f.prototype.setMaximumLeft = function (d) {
            this._maximumPlaneLeft = d
        };
        f.prototype.setMinimumRight = function (d) {
            this._minimumPlaneRight = d
        };
        f.prototype.setMaximumRight = function (d) {
            this._maximumPlaneRight = d
        };
        f.prototype.setMinimumBack = function (d) {
            this._minimumPlaneBack = d
        };
        f.prototype.setMaximumBack = function (d) {
            this._maximumPlaneBack = d
        };
        f.prototype.setMinimumFront = function (d) {
            this._minimumPlaneFront = d
        };
        f.prototype.setMaximumFront = function (d) {
            this._maximumPlaneFront = d
        };
        return f
    }(a.PushMaterial);
    a.CuttingMaterial = m
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e) {
                return h.call(this, d, e) || this
            }
            __extends(f, h);
            Object.defineProperty(f.prototype, "diffuseColor", {
                get: function () {
                    return this._diffuseColor
                },
                set: function (d) {
                    this.alphaMode = a.Engine.ALPHA_ADD;
                    this._diffuseColor = d
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype.needAlphaTesting = function () {
                return !1
            };
            f.prototype.needAlphaBlending = function () {
                return !1
            };
            f.prototype.isReady = function () {
                var d = this.getScene().getEngine();
                d.setAlphaMode(a.Engine.ALPHA_ADD);
                var e = this._defines.toString();
                this._effect = d.createEffect(TeiaJS.Urls.shadersUrl + "/defaultMaterialBlend", ["position", "normal", "uv"], "worldViewProjection viewMatrix modelTransformMatrix diffuseColor far near distancee world".split(" ").concat(this._cuttingPlaneUniforms), [], e);
                return this._effect.isReady() ? !0 : !1
            };
            f.prototype.bind = function (d, e) {
                h.prototype.bind.call(this, d, e);
                this._effect.setMatrix("world", d);
                var b = this.getScene().activeCamera.getProjectionMatrix(!0).clone();
                b.invert();
                var c = this.getScene().activeCamera.getViewMatrix(),
                    g = e.getWorldMatrix();
                e = e.getBoundingInfo().boundingBox;
                this._effect.setMatrix("worldViewProjection", d.multiply(this.getScene().getTransformMatrix()));
                this._effect.setMatrix("viewMatrix", c);
                this._effect.setMatrix("projectMatrixInv", b);
                this._effect.setMatrix("modelTransformMatrix", g);
                this._effect.setFloat("far", this.getScene().activeCamera.maxZ);
                this._effect.setFloat("near", this.getScene().activeCamera.minZ);
                this._effect.setFloat("distancee", this.getScene().activeCamera.radius);
                this._effect.setFloat3("modelCenter",
                    e.center.x, e.center.y, e.center.z);
                d = a.Vector3.Distance(e.center, e.maximumWorld);
                this._effect.setFloat("modelDistanceMax", d);
                this._effect.setColor4("diffuseColor", new a.Color3(this.diffuseColor.r, this.diffuseColor.g, this.diffuseColor.b), .45)
            };
            return f
        }(a.CuttingMaterial);
        m.opacityFactor = .45;
        k.DefaultMaterialBlend = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b) {
                d = h.call(this, d, e) || this;
                d._diffuseColor = b;
                return d
            }
            __extends(f, h);
            Object.defineProperty(f.prototype, "diffuseColor", {
                get: function () {
                    return this._diffuseColor
                },
                set: function (d) {
                    this._diffuseColor = d
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype.needAlphaTesting = function () {
                return !1
            };
            f.prototype.needAlphaBlending = function () {
                return !1
            };
            f.prototype.isReady = function (d, e) {
                d = this.getScene().getEngine();
                d.setAlphaMode(a.Engine.ALPHA_DISABLE);
                var b = [],
                    c = [a.VertexBuffer.PositionKind, a.VertexBuffer.NormalKind, a.VertexBuffer.UVKind];
                e && (b.push("#define INSTANCES"), c.push("world0"), c.push("world1"), c.push("world2"), c.push("world3"));
                e = b.join("\n");
                this._cachedDefines !== e && (this._cachedDefines = e, this._effect = d.createEffect("defaultMaterialSolid", c, "worldViewProjection viewMatrix modelTransformMatrix diffuseColor far near distance".split(" "), [], e));
                return this._effect.isReady() ? !0 : !1
            };
            f.prototype.bind = function (d, e) {
                this._effect.setMatrix("worldViewProjection",
                    d.multiply(this.getScene().getTransformMatrix().clone()));
                this._effect.setMatrix("viewMatrix", this.getScene().activeCamera.getViewMatrix());
                this._effect.setMatrix("modelTransformMatrix", e.getWorldMatrix().clone());
                this._effect.setFloat("far", this.getScene().activeCamera.maxZ);
                this._effect.setFloat("near", this.getScene().activeCamera.minZ);
                this._effect.setFloat("distance", this.getScene().activeCamera.radius);
                this._effect.setColor4("diffuseColor", new a.Color3(this.diffuseColor.r, this.diffuseColor.g,
                    this.diffuseColor.b), this.diffuseColor.a)
            };
            return f
        }(a.Material);
        m.opacityFactor = .3;
        k.DefaultMaterialSolid = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f() {
                return null !== h && h.apply(this, arguments) || this
            }
            __extends(f, h);
            f.prototype.needAlphaBlending = function () {
                return !0
            };
            f.prototype.needAlphaTesting = function () {
                return !1
            };
            f.prototype.isReady = function () {
                var d = this.getScene().getEngine();
                d.setDepthBuffer(!0);
                d.setAlphaMode(a.Engine.ALPHA_DISABLE);
                this._effect = d.createEffect("depthMaterial", ["position", "normal", "uv"], ["worldViewProjection", "far", "near", "viewMatrix", "power"], [], "");
                return this._effect.isReady() ?
                    !0 : !1
            };
            f.prototype.bind = function (d, e) {
                e = this.getScene();
                var b = e.activeCamera,
                    c = -1.386294361 / Math.log((b.radius - b.minZ) / (b.maxZ - b.minZ));
                this._effect.setMatrix("worldViewProjection", d.multiply(e.getTransformMatrix()));
                this._effect.setFloat("far", b.maxZ);
                this._effect.setFloat("near", b.minZ);
                this._effect.setMatrix("viewMatrix", d.multiply(b.getViewMatrix().clone()));
                this._effect.setFloat("power", c)
            };
            return f
        }(a.Material);
        k.DepthMaterial = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f() {
                return null !== h && h.apply(this, arguments) || this
            }
            __extends(f, h);
            f.prototype.needAlphaBlending = function () {
                return !1
            };
            f.prototype.needAlphaTesting = function () {
                return !1
            };
            f.prototype.isReady = function () {
                this._effect = this.getScene().getEngine().createEffect("normalMaterial", ["position", "normal", "uv"], ["worldViewProjection", "viewMatrix", "modelTransformMatrix"], [], "");
                return this._effect.isReady() ? !0 : !1
            };
            f.prototype.bind = function (d, e) {
                var b = this.getScene();
                b.getEngine().setAlphaMode(a.Engine.ALPHA_DISABLE);
                this._effect.setMatrix("worldViewProjection", d.multiply(b.getTransformMatrix()));
                this._effect.setMatrix("viewMatrix", b.activeCamera.getViewMatrix());
                this._effect.setMatrix("modelTransformMatrix", e.getWorldMatrix())
            };
            return f
        }(a.Material);
        k.NormalMaterial = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b, c, g, l) {
                void 0 == c && (c = a.Texture.TRILINEAR_SAMPLINGMODE);
                return h.call(this, d, "blendEdge", "depthSampler normalSampler blendSampler solidSampler opacityFactor pixelSize enableGlow enableBlink time".split(" "), ["solidSampler", "blendSampler", "depthSampler", "normalSampler"], e, b, c, g, l) || this
            }
            __extends(f, h);
            return f
        }(a.PostProcess);
        k.BlendEdgePostProcess = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b, c, g, l) {
                void 0 == c && (c = a.Texture.TRILINEAR_SAMPLINGMODE);
                return h.call(this, d, "blend", "solidSampler blendSampler opacityFactor pixelSize enableGlow enableBlink time".split(" "), ["solidSampler", "blendSampler"], e, b, c, g, l) || this
            }
            __extends(f, h);
            return f
        }(a.PostProcess);
        m.opacityFactor = .7;
        k.BlendPostProcess = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b, c, g, l) {
                void 0 == c && (c = a.Texture.TRILINEAR_SAMPLINGMODE);
                return h.call(this, d, "edge", ["depthSampler", "normalSampler", "pixelSize"], ["blendEffectSampler", "depthSampler", "normalSampler"], e, b, c, g, l) || this
            }
            __extends(f, h);
            return f
        }(a.PostProcess);
        k.EdgePostProcess = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b, c, g, l) {
                void 0 == c && (c = a.Texture.TRILINEAR_SAMPLINGMODE);
                return h.call(this, d, "pass", ["passSampler"], ["passSampler"], e, b, c, g, l) || this
            }
            __extends(f, h);
            return f
        }(a.PostProcess);
        k.PassPostProcess = m
    })(a.TeiaJSAddons || (a.TeiaJSAddons = {}))
})(BABYLON || (BABYLON = {}));
(function (a) {
    a.authToken = "__Theia_AuthToken__";
    var k = function () {
        function a() {}
        Object.defineProperty(a, "baseUrl", {
            get: function () {
                return a._baseUrl
            },
            set: function (h) {
                a._baseUrl = h
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "teiaJSUrlRel", {
            set: function (h) {
                a._teiaJSUrlRel = h
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "teiaJSUrl", {
            get: function () {
                return a.baseUrl + a._teiaJSUrlRel
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "teiaJSModuleUrlRel", {
            set: function (h) {
                a._teiaJSModuleUrlRel =
                    h
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "teiaJSModuleUrl", {
            get: function () {
                return a.baseUrl + a._teiaJSModuleUrlRel
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "scriptsUrl", {
            get: function () {
                return a.teiaJSModuleUrl + "/Scripts/Generated"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "assetsUrl", {
            get: function () {
                return a.scriptsUrl + "/Content/assets"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "shadersUrl", {
            get: function () {
                return a.scriptsUrl + "/Content/shaders"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "getLayerUrl", {
            get: function () {
                return a.teiaJSUrl + "/TeiaJS/GetLayer"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "getObjectActionUrl", {
            get: function () {
                return "Api/" + a.teiaJSUrl + "/TeiaJS/GetObjectAction"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "getObjectsActionsUrl", {
            get: function () {
                return "Api/" + a.teiaJSUrl + "/TeiaJS/GetObjectsActions"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "getInfoBoxLayoutUrl", {
            get: function () {
                return "Api/" +
                    a.teiaJSUrl + "/TeiaJS/GetInfoBoxLayout"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "getObjectUrl", {
            get: function () {
                return a.teiaJSUrl + "/TeiaJS/GetObjects"
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a, "babylonResponseUrl", {
            get: function () {
                return a.teiaJSUrl + "/TeiaJS/BabylonResponse?pfileName="
            },
            enumerable: !0,
            configurable: !0
        });
        return a
    }();
    k._baseUrl = "";
    k._teiaJSUrlRel = "/Teia.TeiaJS";
    k._teiaJSModuleUrlRel = "/Modules/Teia.TeiaJS";
    a.Urls = k
})(TeiaJS || (TeiaJS = {}));
var Teia;
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, d, e, b) {
                if ("string" === typeof a) this._domObject = document.createElement(a);
                else if (a instanceof HTMLElement) this._domObject = a;
                else throw Error("Invalid parameter type");
                d && this.addClasses(d);
                e && this.setId(e);
                this.setData(b)
            }
            a.prototype.appendToParent = function (a) {
                this._container = a;
                a.appendChild(this._domObject)
            };
            a.prototype.getHtmlClasses = function () {
                return this._domObject.className.split(" ")
            };
            a.prototype.addClasses = function (a) {
                a = TeiaJS.Utilities.Helpers.makeArray(a);
                for (var d in a) this._domObject.className += a[d] + " "
            };
            a.prototype.removeClasses = function (a) {
                a = TeiaJS.Utilities.Helpers.makeArray(a);
                for (var d in a) this._domObject.className = this._domObject.className.replace(a[d] + " ", "")
            };
            a.prototype.getHtmlId = function () {
                return this._domObject.id
            };
            a.prototype.setId = function (a) {
                this._domObject.id = a
            };
            a.prototype.getDomObject = function () {
                return this._domObject
            };
            a.prototype.setDomObjectAttribute = function (a, d) {
                this._domObject.setAttribute(a, d)
            };
            a.prototype.setData = function (a) {
                this._data =
                    a
            };
            a.prototype.getData = function () {
                return this._data
            };
            a.prototype.dispose = function () {
                this._domObject.parentNode.removeChild(this._domObject)
            };
            return a
        }();
        a.HtmlContent = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (h) {
            function f(d, e, b, c, g, l, f, C, p) {
                C = h.call(this, "div", C, p) || this;
                C._actions = [d, e, b, c, g, l, f];
                p = new a.GridView(3, 3, "Camera controls", ["camera_controls_table"]);
                p.appendToParent(C.getDomObject());
                d = new a.ClickableImage(d, TeiaJS.Urls.assetsUrl + "/camera_back.svg", ["camera_back"]);
                p.setCell(0, 0, d);
                e = new a.ClickableImage(e, TeiaJS.Urls.assetsUrl + "/camera_top.svg", ["camera_top"]);
                p.setCell(0, 1, e);
                b = new a.ClickableImage(b, TeiaJS.Urls.assetsUrl + "/camera_right.svg", ["camera_right"]);
                p.setCell(0, 2, b);
                c = new a.ClickableImage(c, TeiaJS.Urls.assetsUrl + "/camera_perspective.svg", ["camera_perspective"]);
                p.setCell(1, 1, c);
                g = new a.ClickableImage(g, TeiaJS.Urls.assetsUrl + "/camera_left.svg", ["camera_left"]);
                p.setCell(2, 0, g);
                l = new a.ClickableImage(l, TeiaJS.Urls.assetsUrl + "/camera_bottom.svg", ["camera_bottom"]);
                p.setCell(2, 1, l);
                f = new a.ClickableImage(f, TeiaJS.Urls.assetsUrl + "/camera_front.svg", ["camera_front"]);
                p.setCell(2, 2, f);
                return C
            }
            __extends(f, h);
            f.prototype.disableActions = function () {
                for (var a in this._actions) this._actions[a].disable()
            };
            f.prototype.enableActions = function () {
                for (var a in this._actions) this._actions[a].enable()
            };
            return f
        }(a.HtmlContent);
        a.CameraControls = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b) {
                e = a.call(this, "canvas", e, b) || this;
                e._viewportsControl = d;
                e.getDomObject().height = e._viewportsControl.canvas.height * e._viewportsControl._engine.getHardwareScalingLevel();
                e.getDomObject().width = e._viewportsControl.canvas.width * e._viewportsControl._engine.getHardwareScalingLevel();
                e._backgroundColorCanvas = "#FFFFFF";
                e._shadowLineColor = "#000000";
                e._idName = b + "-container";
                return e
            }
            __extends(f, a);
            f.prototype.getDomObject = function () {
                return a.prototype.getDomObject.call(this)
            };
            f.prototype.clear = function () {
                this.getDomObject().width = this._viewportsControl.canvas.width * this._viewportsControl._engine.getHardwareScalingLevel();
                this.getDomObject().height = this._viewportsControl.canvas.height * this._viewportsControl._engine.getHardwareScalingLevel()
            };
            f.prototype.drawPoint = function (a) {
                var e = this.getDomObject().getContext("2d");
                e.beginPath();
                e.arc(a.x, a.y, 2, 0, 2 * Math.PI, !1);
                e.lineWidth = 1;
                e.fillStyle = this._backgroundColorCanvas;
                e.fill()
            };
            f.prototype.drawLine = function (a, e) {
                var b = this._getContext();
                b.beginPath();
                b.moveTo(a.x, a.y);
                b.lineTo(e.x, e.y);
                b.stroke()
            };
            f.prototype._getContext = function () {
                return this.getDomObject().getContext("2d")
            };
            f.prototype.linkInfoBox = function (a, e) {
                var b = a.getAssociatedMesh();
                b = BABYLON.Vector3.TransformCoordinates(b.getBoundingInfo().boundingBox.centerWorld, e.getViewMatrix());
                b = BABYLON.Vector3.TransformCoordinates(b, e.getProjectionMatrix());
                e = this._getContext();
                var c = $(a.getDomObject()),
                    g = 0 >= c[0].offsetTop ? 0 : c[0].offsetTop,
                    d = c[0].offsetLeft,
                    f = $("#" + this._viewportsControl.namespace +
                        "-left_bar").width();
                a = new BABYLON.Vector2(d + c.width() / 2 + f, g);
                var h = new BABYLON.Vector2(d + f, g + c.height() / 2),
                    p = new BABYLON.Vector2(d + c.width() + f, g + c.height() / 2);
                c = new BABYLON.Vector2(d + c.width() / 2 + f, g + c.height());
                g = BABYLON.Vector2.Zero();
                b = new BABYLON.Vector2(b.x * (this.getDomObject().width / 2) + this.getDomObject().width / 2, this.getDomObject().height - (b.y * (this.getDomObject().height / 2) + this.getDomObject().height / 2));
                d = BABYLON.Vector2.Distance(a, b);
                d >= BABYLON.Vector2.Distance(a, b) && (g = a, d = BABYLON.Vector2.Distance(a,
                    b));
                d >= BABYLON.Vector2.Distance(h, b) && (g = h, d = BABYLON.Vector2.Distance(h, b));
                d >= BABYLON.Vector2.Distance(p, b) && (g = p, d = BABYLON.Vector2.Distance(p, b));
                d >= BABYLON.Vector2.Distance(c, b) && (g = c, BABYLON.Vector2.Distance(c, b));
                e.strokeStyle = this._backgroundColorCanvas;
                e.shadowColor = this._shadowLineColor;
                e.shadowBlur = 2;
                e.shadowOffsetX = 0;
                e.shadowOffsetY = 0;
                e.lineWidth = 1;
                e.lineCap = "round";
                this.drawLine(g, b);
                this.drawPoint(b)
            };
            f.prototype.appendToParent = function (d) {
                a.prototype.appendToParent.call(this, d);
                this.getDomObject().width =
                    d.offsetWidth;
                this.getDomObject().height = d.offsetHeight
            };
            return f
        }(a.HtmlContent);
        a.Canvas2D = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c) {
                e = a.call(this, "img", e, b, c) || this;
                e.setImgSrc(d);
                return e
            }
            __extends(f, a);
            f.prototype.setImgSrc = function (a) {
                this.setDomObjectAttribute("src", a)
            };
            return f
        }(a.HtmlContent);
        a.Image = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                if (d) return e = a.call(this, e, b, c, g) || this, e.getDomObject().draggable = !1, e._clickAction = d, e._clickAction.register(e, ["click"]), e;
                console.error("clickAction parameter not set")
            }
            __extends(f, a);
            f.prototype.enable = function () {};
            f.prototype.disable = function () {};
            return f
        }(a.Image);
        a.ClickableIcon = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                if (d) return e = a.call(this, e, b, c, g) || this, e.getDomObject().draggable = !1, e._clickAction = d, e._clickAction.register(e, ["click"]), e;
                console.error("clickAction parameter not set")
            }
            __extends(f, a);
            f.prototype.enable = function () {};
            f.prototype.disable = function () {};
            return f
        }(a.Image);
        a.ClickableImage = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c) {
                return a.call(this, d, e || f._defaultImg, b, c) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/close.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.CloseButton = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c) {
                return a.call(this, d, e, b, c) || this
            }
            __extends(f, a);
            Object.defineProperty(f.prototype, "content", {
                get: function () {
                    return this.getDomObject().innerHTML
                },
                set: function (a) {
                    this.getDomObject().innerHTML = a
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.HtmlContent);
        a.HtmlContentEditable = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b) {
                return a.call(this, "div", d, e, b) || this
            }
            __extends(f, a);
            return f
        }(a.HtmlContentEditable);
        a.Div = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/focus_on.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.FocusOn = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g, l) {
                c = a.call(this, "table", c, g, l) || this;
                g = document.createElement("caption");
                c.getDomObject().appendChild(g);
                g.textContent = b || "";
                c._rows = d;
                c._columns = e;
                for (b = 0; b < d; b++)
                    for (g = document.createElement("tr"), c.getDomObject().appendChild(g), l = 0; l < e; l++) {
                        var f = document.createElement("td");
                        g.appendChild(f)
                    }
                return c
            }
            __extends(f, a);
            f.prototype.setCell = function (a, e, b, c, g) {
                var d = this.getDomObject().getElementsByTagName("tr");
                if (!(a >= d.length || (a = d[a].getElementsByTagName("td"),
                        e >= a.length))) {
                    e = a[e];
                    for (var f in c) e.className += c[f];
                    g && (e.id = g);
                    b.appendToParent(e)
                }
            };
            f.prototype.getLabel = function () {
                return this._label
            };
            f.prototype.setLabel = function (a) {
                this._label = a;
                this.getDomObject().getElementsByTagName("caption")[0].innerText = a
            };
            f.prototype.addRow = function (a, e) {
                var b = 0 == this.getNumberOfColumns(0) ? this._columns : this.getNumberOfColumns(0),
                    c = document.createElement("tr");
                void 0 != e && c.setAttribute("id", e);
                a ? this.getDomObject().insertBefore(c, this.getDomObject().firstChild) : this.getDomObject().appendChild(c);
                for (a = 0; a < b; a++) e = document.createElement("td"), c.appendChild(e)
            };
            f.prototype.getNumberOfRows = function () {
                return this.getDomObject().getElementsByTagName("tr").length
            };
            f.prototype.getNumberOfColumns = function (a) {
                return this.getDomObject().getElementsByTagName("tr")[a].getElementsByTagName("td").length
            };
            return f
        }(a.HtmlContent);
        a.GridView = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c) {
                return a.call(this, "i", e, b, c) || this
            }
            __extends(f, a);
            return f
        }(a.HtmlContent);
        a.Icon = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b) {
                var c = a.call(this, "div", ["object_info", "uk-panel", "uk-panel-box"], "InfoBox-" + d.objectId) || this;
                c._lineDrawn = !0;
                c._keysElements = {};
                c._layouts = {};
                c._dataKeys = {};
                c.setDomObjectAttribute("ObjectId", d.objectId);
                c._objectId = d.objectId;
                c._associatedMesh = d;
                c._generateLayout(b, {
                    title: e
                });
                return c
            }
            __extends(f, a);
            Object.defineProperty(f.prototype, "objectId", {
                get: function () {
                    return this._objectId
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype._onClosing =
                function () {
                    TeiaJS.Utilities.Event.fire(this, f.CLOSING_INFOBOX_EVENT, this)
                };
            f.prototype._generateLayout = function (a, e, b) {
                a.layouts && this._parseLayouts(a.layouts);
                a.header && (this._header = this._generateElement(a.header, e), this.getDomObject().appendChild(this._header));
                this._content = this._generateElement(a.content, e);
                this.getDomObject().appendChild(this._content);
                a.footer && (this._footer = this._generateElement(a.footer, e), this.getDomObject().appendChild(this._footer));
                a.control && (this._control = this._generateElement(a.control,
                    e), this.getDomObject().appendChild(this._control));
                a.badge && (this._badge = this._generateElement(a.badge, e), this.getDomObject().appendChild(this._badge))
            };
            f.prototype._parseLayouts = function (a) {
                if (a)
                    for (var e in a) {
                        var b = a[e];
                        this._layouts[b.for] = b
                    }
            };
            f.prototype._generateElement = function (a, e, b, c) {
                var g = document.createElement(a.tagName);
                delete a.tagName;
                for (var l in a.content) g.appendChild(this._generateElement(a.content[l], e, b, c));
                delete a.content;
                a.key && (a.maxLength && (g.dataset.maxLength = a.maxLength),
                    delete a.maxLength, c ? (this._dataKeys[b] = this._dataKeys[b] || {}, this._dataKeys[b][c] = this._dataKeys[b][c] || {}, this._dataKeys[b][c][a.key] = g) : this._keysElements[a.key] = g, e = e[a.key], void 0 != e && ((b = g.dataset.maxLength) && e.length > b && (g.setAttribute("title", e), e = e.substring(0, b) + "..."), g.innerHTML += e), delete a.key);
                a.closeButton && (TeiaJS.Utilities.Event.on(g, "click", $.proxy(this._onClosing, this)), delete a.closeButton);
                a.pin && (TeiaJS.Utilities.Event.on(g, "click", $.proxy(this._onPin, this)), delete a.pin);
                a.zoomOn &&
                    (TeiaJS.Utilities.Event.on(g, "click", $.proxy(this._onZoom, this)), delete a.zoomOn);
                a.src && (a.src = eval(a.src));
                a.id && (g.id = a.id + "-" + this._objectId, delete a.id);
                for (l in a)
                    if ("object" == typeof a[l])
                        for (var d in a[l]) g[l][d] = a[l][d];
                    else -1 !== l.indexOf("data-") ? g.setAttribute(l, a[l]) : g[l] = a[l];
                return g
            };
            f.prototype._onPin = function () {
                this.toggleLineDrawn();
                TeiaJS.Utilities.Event.fire(this, f.UPDATE_UI, this)
            };
            f.prototype._onZoom = function () {
                TeiaJS.Utilities.Event.fire(this, f.ZOOM_ON_EVENT, this)
            };
            f.prototype.setCustomClasses =
                function (a, e, b) {
                    void 0 === b && (b = "content");
                    this._dataKeys[b] && this._dataKeys[b][a] && (this._dataKeys[b][a].dataLine.className = "infobox-data " + e)
                };
            f.prototype.addCustomClasses = function (a, e, b) {
                void 0 === b && (b = "content");
                this._dataKeys[b] && this._dataKeys[b][a] && (this._dataKeys[b][a].dataLine.className += " " + e)
            };
            f.prototype.removeCustomClasses = function (a, e, b) {
                void 0 === b && (b = "content");
                if (this._dataKeys[b] && this._dataKeys[b][a])
                    for (a = this._dataKeys[b][a].dataLine, b = 0, e = e.split(" "); b < e.length; b++) a.className =
                        a.className.replace(e[b], "")
            };
            f.prototype.addData = function (a, e, b, c, g, l) {
                void 0 === b && (b = "content");
                void 0 === c && (c = !1);
                void 0 === l && (l = "0");
                "content" != b || e.valueTitle || ("object" != typeof e && (e = {
                    value: e
                }), e.valueTitle = a);
                "control" != b || e.valueTitle || ("object" != typeof e && (e = {
                    value: e
                }), e.valueTitle = a);
                "badge" != b || e.valueTitle || ("object" != typeof e && (e = {
                    value: e
                }), e.valueTitle = a);
                if (this._dataKeys[b] && this._dataKeys[b][a]) {
                    for (var d in e)
                        if (c = this._dataKeys[b][a][d], l = e[d], void 0 != c) {
                            if ("undefined" != c.dataset.maxLength) {
                                var f =
                                    c.dataset.maxLength;
                                f && l.length > f && (l = l.substr(0, f) + "...")
                            }
                            c.innerHTML = l;
                            l = c.getElementsByTagName("script");
                            for (f = 0; f < l.length; f++) {
                                var h = l[f],
                                    r = document.createElement("script");
                                r.type = "text/javascript";
                                r.innerHTML = h.innerHTML;
                                h.parentNode.removeChild(h);
                                c.appendChild(r)
                            }
                        } this.setCustomClasses(a, g, b)
                } else if (d = this._keysElements[b]) {
                    e = this._generateElement($.extend(!0, {}, this._layouts[b]), e, b, a);
                    c ? d.insertBefore(e, d.firstChild) : d.appendChild(e);
                    e.setAttribute("data-filter", l);
                    l = e.getElementsByTagName("script");
                    for (f = 0; f < l.length; f++) h = l[f], r = document.createElement("script"), r.type = "text/javascript", r.innerHTML = h.innerHTML, h.parentNode.removeChild(h), e.appendChild(r);
                    this._dataKeys[b][a].dataLine = e;
                    this.setCustomClasses(a, g, b)
                }
            };
            f.prototype.remove = function () {
                $(this.getDomObject()).hide().promise().done(function () {
                    this.remove()
                })
            };
            f.prototype.toggleLineDrawn = function () {
                this._lineDrawn = !this._lineDrawn
            };
            f.prototype.setLineDrawn = function (a) {
                this._lineDrawn = a
            };
            f.prototype.isLineDrawn = function () {
                return this._lineDrawn
            };
            f.prototype.getAssociatedMesh = function () {
                return this._associatedMesh
            };
            return f
        }(a.HtmlContent);
        k.CLOSING_INFOBOX_EVENT = "closinginfobox";
        k.ZOOM_ON_EVENT = "zoomOn";
        k.UPDATE_UI = "updateUi";
        a.InfoBox = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (h) {
            function f(d, e, b, c, g) {
                void 0 === b && (b = []);
                var l = h.call(this, "div", b.concat("info_box_container noselect"), c + "Canvas_2D", g) || this;
                l._countInfobox = 0;
                l._openingCallbacks = {};
                l._dataCallbacks = {};
                l._viewportsControl = d;
                l._canvas2D = new a.Canvas2D(l._viewportsControl, ["canvas_2D"], c + "-infoBoxLines");
                l._infoBoxes = {};
                l._viewportInfos = e;
                l._objectsInfos = {};
                l._binding();
                TeiaJS.Utilities.Request.Get(TeiaJS.Urls.getInfoBoxLayoutUrl, null).done(function (c) {
                    l._infoBoxLayout =
                        c
                });
                return l
            }
            __extends(f, h);
            f.prototype._binding = function () {
                this._onWindowReziseProxy || (this._onWindowReziseProxy = $.proxy(this.resize, this));
                TeiaJS.Utilities.Event.on(window, "resize", this._onWindowReziseProxy)
            };
            f.prototype._unibinding = function () {
                TeiaJS.Utilities.Event.on(window, "resize", this._onWindowReziseProxy)
            };
            f.prototype.appendToParent = function (a) {
                var e = this;
                h.prototype.appendToParent.call(this, a);
                setTimeout(function () {
                    e.resize();
                    e._canvas2D.appendToParent(e.getDomObject())
                }, 100)
            };
            f.prototype.setCustomClassesForInfoboxKey =
                function (a, e, b, c) {
                    void 0 === b && (b = "");
                    for (var g = !1, l = 0, d = this._objectsInfos[a]; l < d.length; l++) {
                        var f = d[l];
                        if (f.containerKey == c && f.key == e) {
                            f.customClasses = b;
                            g = !0;
                            break
                        }
                    }
                    g && this._infoBoxes[a] && this._infoBoxes[a].setCustomClasses(e, b, c)
                };
            f.prototype.addCustomClassedForInfoboxKey = function (a, e, b, c) {
                void 0 === b && (b = "");
                for (var g = !1, l = 0, d = this._objectsInfos[a]; l < d.length; l++) {
                    var f = d[l];
                    if (f.containerKey == c && f.key == e) {
                        f.customClasses += b;
                        g = !0;
                        break
                    }
                }
                g && this._infoBoxes[a] && this._infoBoxes[a].addCustomClasses(e,
                    b, c)
            };
            f.prototype.removeCustomClassedForInfoboxKey = function (a, e, b, c) {
                void 0 === b && (b = "");
                for (var g = !1, l = 0, d = this._objectsInfos[a]; l < d.length; l++) {
                    var f = d[l];
                    if (f.containerKey == c && f.key == e) {
                        g = 0;
                        for (l = b.split(" "); g < l.length; g++) f.customClasses = f.customClasses.replace(l[g], "");
                        g = !0;
                        break
                    }
                }
                g && this._infoBoxes[a] && this._infoBoxes[a].removeCustomClasses(e, b, c)
            };
            f.prototype.addData = function (a, e, b, c, g, l, f) {
                void 0 === g && (g = !1);
                void 0 === l && (l = "");
                void 0 === f && (f = "0");
                this._objectsInfos[a] || (this._objectsInfos[a] = []);
                null == l && (l = "");
                var d = !1,
                    n;
                for (n in this._objectsInfos[a]) {
                    var h = this._objectsInfos[a][n];
                    if (h.containerKey == c && h.key == e) {
                        h.value = b;
                        d = !0;
                        break
                    }
                }
                d || (g ? this._objectsInfos[a].unshift({
                    key: e,
                    value: b,
                    containerKey: c,
                    customClasses: l,
                    rank: f
                }) : this._objectsInfos[a].push({
                    key: e,
                    value: b,
                    containerKey: c,
                    customClasses: l,
                    rank: f
                }));
                this._infoBoxes[a] && this._infoBoxes[a].addData(e, b, c, g, l, f)
            };
            f.prototype.setOpeningCallback = function (a, e, b) {
                this._openingCallbacks[a] = b;
                this._dataCallbacks[a] = e
            };
            f.prototype.removeData =
                function (a, e, b) {
                    for (var c in this._objectsInfos[a])
                        if (this._objectsInfos[a][c].containerKey == b && this._objectsInfos[a][c].key == e) {
                            delete this._objectsInfos[a][c];
                            break
                        }
                };
            f.prototype.removeAllData = function (a) {
                delete this._objectsInfos[a]
            };
            f.prototype.CopyToClipboard = function (a, e, b) {
                var c = $("<input>");
                $("body").append(c);
                c.val(a).select();
                document.execCommand("copy");
                c.remove();
                "undefined" === typeof e && (e = !0);
                "undefined" === typeof b && (b = "Copied to clipboard");
                e && UIkit.notify(b, {
                    status: "success",
                    pos: "bottom-right",
                    timeout: 500
                })
            };
            f.prototype.createInfoBox = function (d, e, b, c) {
                var g = this;
                if (!this._infoBoxes[d.objectId]) {
                    var l = this;
                    b = b || [];
                    b.push("object_info uk-panel-box uk-panel" + e.replace(/ /g, "_"));
                    var n = new a.InfoBox(d, e, $.extend(!0, {}, this._infoBoxLayout));
                    this._countInfobox++;
                    this._infoBoxes[d.objectId] = n;
                    n.getDomObject().style.display = "none";
                    n.appendToParent(this.getDomObject());
                    $(n.getDomObject()).draggable({
                        containment: "parent",
                        snap: ".info_box_container div",
                        snapMode: "outer",
                        obstacle: ".nav-menu3D",
                        zIndex: 1E4,
                        opacity: .7,
                        cancel: ".object_info_tools-data",
                        handle: ".uk-panel-header",
                        stack: ".object_info"
                    }, {
                        start: function () {},
                        drag: function () {
                            l._viewportsControl.freeze(!1);
                            l._viewportsControl._updateSelectionUI()
                        },
                        stop: function () {
                            l._viewportsControl.unfreeze()
                        }
                    });
                    $("#" + n.getDomObject().id + " .title-container").dblclick(function () {
                        l.CopyToClipboard($(this).text(), !0, "Value copied")
                    });
                    for (var h in this._objectsInfos[d.objectId]) e = this._objectsInfos[d.objectId][h], n.addData(e.key, e.value, e.containerKey, !1, e.customClasses,
                        e.rank);
                    TeiaJS.Utilities.Event.on(n, a.InfoBox.CLOSING_INFOBOX_EVENT, $.proxy(function (c, b) {
                        g.removeInfoBox(b)
                    }, this));
                    TeiaJS.Utilities.Event.on(n, a.InfoBox.ZOOM_ON_EVENT, $.proxy(this._onZoomOn, this));
                    TeiaJS.Utilities.Event.on(n, a.InfoBox.UPDATE_UI, $.proxy(this._onUpdateUI, this));
                    BABYLON.Vector3.Project(d.getAbsolutePosition(), BABYLON.Matrix.Identity(), this._viewportsControl.scene.getTransformMatrix(), this._viewportsControl.activeViewport.activeCamera.viewport);
                    this._viewportsControl._engine.getHardwareScalingLevel();
                    h = this._viewportsControl.canvas.width * this._viewportsControl._engine.getHardwareScalingLevel();
                    e = $(n.getDomObject()).width() + 25;
                    $(n.getDomObject()).height();
                    h -= e;
                    $(n.getDomObject()).css({
                        left: h - 300 + this._countInfobox % 5 * 50,
                        top: 150 + this._countInfobox % 5 * 50
                    });
                    $(n.getDomObject()).show(0, function () {
                        var c = g._openingCallbacks[d.objectId],
                            b = g._dataCallbacks[d.objectId];
                        c && c(d.objectId, b, n);
                        TeiaJS.Utilities.Event.fire(g, f.INFOBOX_OPENED, n.objectId)
                    });
                    return n
                }
            };
            f.prototype._onUpdateUI = function (d, e) {
                TeiaJS.Utilities.Event.fire(this,
                    a.InfoBox.UPDATE_UI, e.objectId);
                this.update(this._viewportsControl.activeViewport.activeCamera)
            };
            f.prototype._onZoomOn = function (d, e) {
                TeiaJS.Utilities.Event.fire(this, a.InfoBox.ZOOM_ON_EVENT, e.objectId)
            };
            f.prototype.removeInfoBoxes = function (a) {
                for (var e in a) this.removeInfoBox(a[e])
            };
            f.prototype.removeInfoBox = function (a) {
                if (this._infoBoxes[a.objectId] || this._infoBoxes[a]) a = a.objectId ? a : this._infoBoxes[a], a.remove(), delete this._infoBoxes[a.objectId], TeiaJS.Utilities.Event.fire(this, f.INFOBOX_CLOSED,
                    a.objectId)
            };
            f.prototype.getObjectInfoBox = function (a) {
                if (a) return this._infoBoxes[a];
                console.error("Must have an object id.")
            };
            f.prototype.resize = function () {
                var a = this._viewportsControl.viewerContainer,
                    e = a.offsetWidth * this._viewportInfos.width;
                this.getDomObject().style.width = e + "px";
                e = a.offsetHeight * this._viewportInfos.height;
                this.getDomObject().style.height = e + "px";
                e = a.offsetWidth * this._viewportInfos.x;
                this.getDomObject().style.left = e + "px";
                a = a.offsetHeight * this._viewportInfos.y;
                this.getDomObject().style.bottom =
                    a + "px";
                this._canvas2D.getDomObject().width = this._viewportsControl.canvas.width * this._viewportsControl._engine.getHardwareScalingLevel();
                this._canvas2D.getDomObject().height = this._viewportsControl.canvas.height * this._viewportsControl._engine.getHardwareScalingLevel()
            };
            f.drawLine = function (a) {
                a.setLineDrawn(!a.isLineDrawn())
            };
            f.prototype.replaceInfoboxInCanvas = function () {
                for (var a in this._infoBoxes) {
                    var e = this._infoBoxes[a],
                        b = this._viewportsControl.canvas.height * this._viewportsControl._engine.getHardwareScalingLevel(),
                        c = this._viewportsControl.canvas.width * this._viewportsControl._engine.getHardwareScalingLevel(),
                        g = $(e.getDomObject()).width() + 25,
                        l = $(e.getDomObject()).height() + 25;
                    b -= l;
                    c -= g;
                    $(e.getDomObject()).css({
                        left: Math.floor(Math.random() * c),
                        top: Math.floor(Math.random() * b)
                    })
                }
            };
            f.prototype._drawLine = function (a, e) {
                this._canvas2D.linkInfoBox(a, e)
            };
            f.prototype.clearCanvas = function () {
                this._canvas2D.clear()
            };
            f.prototype.update = function (a) {
                this.clearCanvas();
                this._drawLines(a)
            };
            f.prototype._drawLines = function (a) {
                for (var e in this._infoBoxes) {
                    var b =
                        this._infoBoxes[e];
                    b.isLineDrawn() && this._drawLine(b, a)
                }
            };
            f.prototype.dispose = function () {
                h.prototype.dispose.call(this);
                this._canvas2D.dispose();
                this._unibinding()
            };
            return f
        }(a.HtmlContent);
        k.INFOBOX_OPENED = "infoboxOpened";
        k.INFOBOX_CLOSED = "infoboxClosed";
        a.InfoBoxManager = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/zoom_on.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.ZoomOn = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (h) {
            function f(d, e, b, c, g) {
                return h.call(this, d, e || a.ZoomOn._defaultImg, b, c, g) || this
            }
            __extends(f, h);
            return f
        }(a.ZoomOn);
        a.InfoBoxZoomOn = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/isolate.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.Isolate = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (h) {
            function f(d, e, b, c) {
                b = h.call(this, "div", b, c) || this;
                b._viewportsControl = d;
                e || b.hide();
                (new a.ListView("Layers", ["layers_controls_container"])).appendToParent(b.getDomObject());
                return b
            }
            __extends(f, h);
            f.prototype.show = function () {
                this.getDomObject().style.display = "block"
            };
            f.prototype.hide = function () {
                this.getDomObject().style.display = "none"
            };
            f.prototype.addLayerListItem = function (a, e, b) {
                var c = this,
                    g = document.createElement("li");
                g.setAttribute("id", "layer-" + a);
                var l = document.createElement("input");
                l.setAttribute("type", "checkbox");
                l.name = "layer-" + a + "-checkbox";
                l.setAttribute("layer-id", a);
                l.checked = b;
                l.className = "layer-checkbox";
                a = document.createElement("span");
                a.className = "layer-label";
                a.textContent = e;
                g.appendChild(l);
                g.appendChild(a);
                this.getDomObject().getElementsByTagName("ul")[0].appendChild(g);
                TeiaJS.Utilities.Event.on(l, "click", function (b) {
                    l.checked ? TeiaJS.Utilities.Event.fire(c, f.ENABLING_LAYER_EVENT, [l.getAttribute("layer-id")]) : TeiaJS.Utilities.Event.fire(c,
                        f.DISABLING_LAYER_EVENT, [l.getAttribute("layer-id")])
                })
            };
            return f
        }(a.HtmlContent);
        k.ENABLING_LAYER_EVENT = "layerEnabling";
        k.DISABLING_LAYER_EVENT = "layerDisabling";
        a.LayersControls = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c) {
                b = a.call(this, "div", e, b, c) || this;
                c = document.createElement("div");
                b.getDomObject().appendChild(c);
                c.textContent = d || "";
                for (var g in e) c.className += e[g] + "_header ";
                d = document.createElement("div");
                b.getDomObject().appendChild(d);
                for (g in e) d.className += e[g] + "_content ";
                c = document.createElement("ul");
                d.appendChild(c);
                for (g in e) c.className += e[g] + "_list";
                c.className += " uk-list";
                return b
            }
            __extends(f, a);
            return f
        }(a.HtmlContent);
        a.ListView = k
    })(a.gui ||
        (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, e, b) {
                this._text = a;
                this._callback = e;
                this._classes = b
            }
            Object.defineProperty(a.prototype, "text", {
                get: function () {
                    return this._text
                },
                set: function (a) {
                    this._text = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "classes", {
                get: function () {
                    return this._classes
                },
                set: function (a) {
                    this._classes = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "callback", {
                get: function () {
                    return this._callback
                },
                set: function (a) {
                    this.callback =
                        a
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
        a.ModalOptionsButton = k;
        var h = function () {
            function a(a, e, b, c) {
                void 0 === a && (a = !0);
                void 0 === e && (e = !0);
                void 0 === b && (b = !1);
                void 0 === c && (c = []);
                this._showCancelButton = this._showCloseButton = !0;
                this._showBlockUI = !1;
                this._otherButtons = [];
                this._showCloseButton = a;
                this._showCancelButton = e;
                this._otherButtons = c;
                this._showBlockUI = b
            }
            Object.defineProperty(a.prototype, "showCloseButton", {
                get: function () {
                    return this._showCloseButton
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype,
                "showCancelButton", {
                    get: function () {
                        return this._showCancelButton
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(a.prototype, "otherButtons", {
                get: function () {
                    return this._otherButtons
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "shouldBlockUI", {
                get: function () {
                    return this._showBlockUI
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
        a.ModalOptions = h;
        k = function (f) {
            function d(e, b, c, g, l, d) {
                void 0 === c && (c = new h);
                void 0 === g && (g = []);
                g.push("uk-modal", "teia-modal");
                l = l || (new TeiaJS.Utilities.UniqueId).getValue();
                g = f.call(this, g, l, d) || this;
                g._modalBody = new a.Div(["uk-modal-dialog"]);
                g._modalBody.appendToParent(g.getDomObject());
                c.showCloseButton && (l = document.createElement("button"), l.className = "uk-modal-close uk-close", g._modalBody.getDomObject().appendChild(l));
                g._header = new a.Div(["uk-modal-header"]);
                g._header.content = b;
                g._header.appendToParent(g._modalBody.getDomObject());
                g._content = new a.Span;
                g._content.content = e;
                g._content.appendToParent(g._modalBody.getDomObject());
                g._footer = new a.Div(["uk-modal-footer",
                    " uk-text-right"
                ]);
                c.showCancelButton && (e = document.createElement("button"), e.textContent = "Cancel", e.className = "uk-button uk-modal-close", g._footer.getDomObject().appendChild(e));
                for (var n in c.otherButtons) e = c.otherButtons[n], b = document.createElement("button"), b.className = "uk-button " + e.classes, b.addEventListener("click", e.callback), b.innerText = e.text, g._footer.getDomObject().appendChild(b);
                g._footer.appendToParent(g._modalBody.getDomObject());
                g.appendToParent(document.body);
                g._UIKitModal = UIkit.modal("#" +
                    g.getHtmlId());
                g._UIKitModal.options.bgclose = !c.shouldBlockUI;
                g._UIKitModal.options.keyboard = !c.shouldBlockUI;
                g._UIKitModal.options.center = !0;
                return g
            }
            __extends(d, f);
            Object.defineProperty(d.prototype, "title", {
                get: function () {
                    return this._header.content
                },
                set: function (a) {
                    this._header.content = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(d.prototype, "content", {
                get: function () {
                    return this._content.content
                },
                set: function (a) {
                    this._content.content = a
                },
                enumerable: !0,
                configurable: !0
            });
            d.prototype.show =
                function () {
                    this._UIKitModal.show()
                };
            d.prototype.hide = function () {
                this._UIKitModal.hide()
            };
            return d
        }(a.Div);
        a.Modal = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/opacity_less.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.OpacityMinus = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/opacity_plus.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.OpacityPlus = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/pin.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.Pin = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/info.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.ShowHideInformations = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/map.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.ShowHideMap = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/search.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.ShowHideSearchResults = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/tree.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.ShowHideTreeview = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b) {
                return a.call(this, "span", d, e, b) || this
            }
            __extends(f, a);
            return f
        }(a.HtmlContentEditable);
        a.Span = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                e = a.call(this, e, b, c, g) || this;
                e.getDomObject().draggable = !1;
                e._clickAction = d;
                d = BABYLON.Tools.GetPointerPrefix();
                e._clickAction.register(e, [d + "down"], [d + "up", d + "out"]);
                return e
            }
            __extends(f, a);
            f.prototype.enable = function () {};
            f.prototype.disable = function () {};
            return f
        }(a.Image);
        a.StartStopImage = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/switch_mode.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.ClickableImage);
        a.SwitchCameraMode = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (h) {
            function f(a, e) {
                a = h.call(this, "div", a, e) || this;
                a.addClasses(["toolbar", "ignoreWidth"]);
                return a
            }
            __extends(f, h);
            f.prototype.setTopContent = function (d) {
                this._removeOldContent("align_top");
                this._topContent = d;
                d = new a.HtmlContent("div", ["align_top"]);
                d.appendToParent(this.getDomObject());
                this._topContent.appendToParent(d.getDomObject())
            };
            f.prototype.setBottomContent = function (d) {
                this._removeOldContent("align_bottom");
                this._bottomContent = d;
                d = new a.HtmlContent("div",
                    ["align_bottom"]);
                d.appendToParent(this.getDomObject());
                this._bottomContent.appendToParent(d.getDomObject())
            };
            f.prototype._removeOldContent = function (a) {
                a = this.getDomObject().getElementsByClassName(a);
                0 < a.length && a[0].parentNode.removeChild(a[0])
            };
            return f
        }(a.HtmlContent);
        a.Toolbar = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a) {
                this.viewportsControl = a;
                this.camera = null;
                this.scene = a.scene;
                this.labelCube = this.controlCube = this.compass = null;
                this.isVisible = !1;
                this.VIEWPORT_HEIGHT = this.VIEWPORT_WIDTH = .15;
                this.VIEWPORT_X = .85;
                this.VIEWPORT_Y = .8;
                this.FACES = {
                    BACK: 0,
                    RIGHT: 1,
                    TOP: 2,
                    BOTTOM: 3,
                    LEFT: 4,
                    FRONT: 5,
                    TOP_FRONT_EDGE: 6,
                    TOP_RIGHT_EDGE: 7,
                    TOP_BACK_EDGE: 8,
                    TOP_LEFT_EDGE: 9,
                    BOTTOM_FRONT_EDGE: 10,
                    BOTTOM_RIGHT_EDGE: 11,
                    BOTTOM_BACK_EDGE: 12,
                    BOTTOM_LEFT_EDGE: 13,
                    FRONT_RIGHT_EDGE: 14,
                    BACK_RIGHT_EDGE: 15,
                    BACK_LEFT_EDGE: 16,
                    FRONT_LEFT_EDGE: 17,
                    TOP_FRONT_LEFT_CORNER: 18,
                    TOP_FRONT_RIGHT_CORNER: 19,
                    TOP_BACK_RIGHT_CORNER: 20,
                    TOP_BACK_LEFT_CORNER: 21,
                    BOTTOM_FRONT_LEFT_CORNER: 22,
                    BOTTOM_FRONT_RIGHT_CORNER: 23,
                    BOTTOM_BACK_RIGHT_CORNER: 24,
                    BOTTOM_BACK_LEFT_CORNER: 25
                };
                this.COMPASS_COLOR = new BABYLON.Color3(.4, .4, .4);
                this.COMPASS_OPACITY = .8;
                this.FACE_COLOUR = new BABYLON.Color3(.5, .75, 1);
                this.FACE_OPACITY_MOUSE_OFF = 0;
                this.FACE_OPACITY_MOUSE_OVER = .4;
                this.spritesPosition = []
            }
            a.prototype.init = function () {
                this.setupCamera();
                this.setupGeometry();
                this.setupEvent()
            };
            a.prototype.setupEvent = function () {
                this.viewportsControl.canvas.addEventListener("mousemove", this.onMouseMove.bind(this), !1);
                this.viewportsControl.canvas.addEventListener("pointerdown", this.onPointerDown.bind(this), !1)
            };
            a.prototype.setupCamera = function () {
                this.camera = new BABYLON.TeiaJSAddons.ArcRotateCamera("viewcube_camera", -Math.PI / 2, 3 * Math.PI / 8, 250, new BABYLON.Vector3(0, 0, 0), this.scene);
                this.camera.layerMask = 1073741824;
                this.camera.lowerRadiusLimit = this.camera.upperRadiusLimit =
                    300;
                this.camera.viewport = new BABYLON.Viewport(this.VIEWPORT_X, this.VIEWPORT_Y, this.VIEWPORT_WIDTH, this.VIEWPORT_HEIGHT);
                var a = this;
                this.viewportsControl.scene.registerBeforeRender(function () {
                    var d = a.viewportsControl.activeViewport.activeCamera;
                    if (a.viewportsControl.activeViewport.activeCamera.cameraType == BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera) {
                        var e = a.scene.activeCameras.indexOf(a.camera); - 1 == e && a.scene.activeCameras.push(a.camera);
                        a.camera.alpha = d.alpha;
                        a.camera.beta = d.beta;
                        a.isVisible ||
                            (a.isVisible = !0, a.controlCube.isVisible = !0, a.labelCube.isVisible = !0, a.compass.isVisible = !0)
                    } else e = a.scene.activeCameras.indexOf(a.camera), -1 != e && a.scene.activeCameras.splice(e, 1), a.isVisible && (a.isVisible = !1, a.controlCube.isVisible = !1, a.labelCube.isVisible = !1, a.compass.isVisible = !1)
                });
                this.viewportsControl.scene.registerAfterRender(function () {
                    a.viewportsControl.engine.setViewport(a.viewportsControl.activeViewport.activeCamera.viewport)
                })
            };
            a.prototype.setupGeometry = function () {
                var a = Math.PI / 2,
                    d = Math.PI,
                    e = 1.5 * Math.PI,
                    b = 2 * Math.PI,
                    c = new BABYLON.Vector3(1, 0, 0),
                    g = new BABYLON.Vector3(0, 1, 0),
                    l = new BABYLON.Vector3(0, 0, 1),
                    n = new BABYLON.StandardMaterial("viewcube_label_default_material", this.scene);
                n.specularColor = new BABYLON.Color3(0, 0, 0);
                n.diffuseColor = new BABYLON.Color3(.25, .25, .25);
                n.emissiveColor = new BABYLON.Color3(.75, .75, .75);
                n.alpha = 1;
                var h = n.clone("viewcube_top_material");
                h.diffuseTexture = this.makeDynamicTexture(this.FACES.TOP, "TOP", Math.PI / 2);
                var p = n.clone("viewcube_front_material");
                p.diffuseTexture =
                    this.makeDynamicTexture(this.FACES.FRONT, "FRONT", 0);
                var r = n.clone("viewcube_right_material");
                r.diffuseTexture = this.makeDynamicTexture(this.FACES.RIGHT, "RIGHT", Math.PI / 2);
                var t = n.clone("viewcube_back_material");
                t.diffuseTexture = this.makeDynamicTexture(this.FACES.BACK, "BACK", -Math.PI);
                t.diffuseColor = new BABYLON.Color3(.35, .35, .35);
                var k = n.clone("viewcube_left_material");
                k.diffuseTexture = this.makeDynamicTexture(this.FACES.LEFT, "LEFT", Math.PI / 2);
                n = n.clone("viewcube_bottom_material");
                n.diffuseTexture =
                    this.makeDynamicTexture(this.FACES.BOTTOM, "BOTTOM", -Math.PI / 2);
                n.emissiveColor = new BABYLON.Color3(.95, .95, .95);
                h = [t, p, r, k, h, n];
                p = new BABYLON.MultiMaterial("viewcube_labels_multimaterial", this.scene);
                p.subMaterials = h;
                this.labelCube = BABYLON.Mesh.CreateBox("viewcube_labels", 99, this.scene);
                this.labelCube._isObjectTeia = !1;
                this.labelCube.isPickable = !1;
                this.labelCube.layerMask = 1073741824;
                this.labelCube.material = p;
                this.labelCube.useOctreeForRenderingSelection = !0;
                this.labelCube.subMeshes = [];
                null != this.viewportsControl._octree &&
                    this.viewportsControl._octree.dynamicContent.push(this.labelCube);
                p = this.labelCube.getTotalVertices();
                for (h = 0; 6 > h; h++) new BABYLON.SubMesh(h, 0, p, 6 * h, 6, this.labelCube);
                var q = new BABYLON.StandardMaterial("viewcube_faces_material", this.scene);
                q.specularColor = new BABYLON.Color3(0, 0, 0);
                q.diffuseColor = new BABYLON.Color3(.1, .1, .1);
                q.emissiveColor = this.FACE_COLOUR;
                q.alpha = this.FACE_OPACITY_MOUSE_OFF;
                h = this.makeFace(this.FACES.BACK, 70, 0, 0, 50, [{
                    axis: l,
                    rad: a
                }], q);
                p = this.makeFace(this.FACES.RIGHT, 70, 50, 0, 0, [{
                    axis: g,
                    rad: a
                }, {
                    axis: l,
                    rad: a
                }], q);
                r = this.makeFace(this.FACES.TOP, 70, 0, 50, 0, [{
                    axis: c,
                    rad: e
                }, {
                    axis: l,
                    rad: d
                }], q);
                t = this.makeFace(this.FACES.BOTTOM, 70, 0, -50, 0, [{
                    axis: c,
                    rad: a
                }, {
                    axis: l,
                    rad: b
                }], q);
                k = this.makeFace(this.FACES.LEFT, 70, -50, 0, 0, [{
                    axis: c,
                    rad: a
                }, {
                    axis: g,
                    rad: e
                }], q);
                n = this.makeFace(this.FACES.FRONT, 70, 0, 0, -50, [{
                    axis: g,
                    rad: d
                }, {
                    axis: l,
                    rad: a
                }], q);
                var m = this.makeEdge(this.FACES.TOP_FRONT_EDGE, 70, 15, 0, 50, -50, [{
                        axis: l,
                        rad: d
                    }, {
                        axis: g,
                        rad: d
                    }], q),
                    u = this.makeEdge(this.FACES.TOP_RIGHT_EDGE, 70, 15, 50, 50, 0, [{
                            axis: c,
                            rad: d
                        },
                        {
                            axis: g,
                            rad: a
                        }, {
                            axis: l,
                            rad: 0
                        }
                    ], q),
                    y = this.makeEdge(this.FACES.TOP_BACK_EDGE, 70, 15, 0, 50, 50, [{
                        axis: l,
                        rad: d
                    }], q),
                    v = this.makeEdge(this.FACES.TOP_LEFT_EDGE, 70, 15, -50, 50, 0, [{
                        axis: c,
                        rad: a
                    }, {
                        axis: g,
                        rad: d
                    }, {
                        axis: l,
                        rad: a
                    }], q),
                    D = this.makeEdge(this.FACES.BOTTOM_FRONT_EDGE, 70, 15, 0, -50, -50, [{
                        axis: g,
                        rad: d
                    }], q),
                    w = this.makeEdge(this.FACES.BOTTOM_RIGHT_EDGE, 70, 15, 50, -50, 0, [{
                        axis: c,
                        rad: a
                    }, {
                        axis: g,
                        rad: b
                    }, {
                        axis: l,
                        rad: a
                    }], q),
                    E = this.makeEdge(this.FACES.BOTTOM_BACK_EDGE, 70, 15, 0, -50, 50, [{
                        axis: l,
                        rad: b
                    }], q),
                    F = this.makeEdge(this.FACES.BOTTOM_LEFT_EDGE,
                        70, 15, -50, -50, 0, [{
                            axis: c,
                            rad: a
                        }, {
                            axis: g,
                            rad: e
                        }, {
                            axis: l,
                            rad: a
                        }], q),
                    B = this.makeEdge(this.FACES.FRONT_RIGHT_EDGE, 70, 15, 50, 0, -50, [{
                        axis: l,
                        rad: a
                    }, {
                        axis: g,
                        rad: d
                    }], q),
                    G = this.makeEdge(this.FACES.BACK_RIGHT_EDGE, 70, 15, 50, 0, 50, [{
                        axis: l,
                        rad: a
                    }], q),
                    H = this.makeEdge(this.FACES.BACK_LEFT_EDGE, 70, 15, -50, 0, 50, [{
                        axis: l,
                        rad: e
                    }], q),
                    I = this.makeEdge(this.FACES.FRONT_LEFT_EDGE, 70, 15, -50, 0, -50, [{
                        axis: l,
                        rad: e
                    }, {
                        axis: g,
                        rad: d
                    }], q),
                    J = this.makeCorner(this.FACES.TOP_FRONT_LEFT_CORNER, 15, -50, 50, -50, [{
                            axis: c,
                            rad: a
                        }, {
                            axis: g,
                            rad: d
                        },
                        {
                            axis: l,
                            rad: a
                        }
                    ], q),
                    K = this.makeCorner(this.FACES.TOP_FRONT_RIGHT_CORNER, 15, 50, 50, -50, [{
                        axis: c,
                        rad: a
                    }, {
                        axis: g,
                        rad: d
                    }, {
                        axis: l,
                        rad: 0
                    }], q),
                    L = this.makeCorner(this.FACES.TOP_BACK_RIGHT_CORNER, 15, 50, 50, 50, [{
                        axis: l,
                        rad: d
                    }], q);
                e = this.makeCorner(this.FACES.TOP_BACK_LEFT_CORNER, 15, -50, 50, 50, [{
                    axis: l,
                    rad: e
                }], q);
                var M = this.makeCorner(this.FACES.BOTTOM_FRONT_LEFT_CORNER, 15, -50, -50, -50, [{
                    axis: c,
                    rad: 0
                }, {
                    axis: g,
                    rad: d
                }, {
                    axis: l,
                    rad: a
                }], q);
                d = this.makeCorner(this.FACES.BOTTOM_FRONT_RIGHT_CORNER, 15, 50, -50, -50, [{
                    axis: c,
                    rad: 0
                }, {
                    axis: g,
                    rad: d
                }, {
                    axis: l,
                    rad: 0
                }], q);
                a = this.makeCorner(this.FACES.BOTTOM_BACK_RIGHT_CORNER, 15, 50, -50, 50, [{
                    axis: l,
                    rad: a
                }], q);
                l = this.makeCorner(this.FACES.BOTTOM_BACK_LEFT_CORNER, 15, -50, -50, 50, [{
                    axis: l,
                    rad: b
                }], q);
                c = [q.clone("viewcube_faces_material_0"), q.clone("viewcube_faces_material_1"), q.clone("viewcube_faces_material_2"), q.clone("viewcube_faces_material_3"), q.clone("viewcube_faces_material_4"), q.clone("viewcube_faces_material_5"), q.clone("viewcube_faces_material_6"), q.clone("viewcube_faces_material_7"),
                    q.clone("viewcube_faces_material_8"), q.clone("viewcube_faces_material_9"), q.clone("viewcube_faces_material_10"), q.clone("viewcube_faces_material_11"), q.clone("viewcube_faces_material_12"), q.clone("viewcube_faces_material_13"), q.clone("viewcube_faces_material_14"), q.clone("viewcube_faces_material_15"), q.clone("viewcube_faces_material_16"), q.clone("viewcube_faces_material_17"), q.clone("viewcube_faces_material_18"), q.clone("viewcube_faces_material_19"), q.clone("viewcube_faces_material_20"), q.clone("viewcube_faces_material_21"),
                    q.clone("viewcube_faces_material_22"), q.clone("viewcube_faces_material_23"), q.clone("viewcube_faces_material_24"), q.clone("viewcube_faces_material_25")
                ];
                b = new BABYLON.MultiMaterial("viewcube_faces_multimaterial", this.scene);
                b.subMaterials = c;
                this.controlCube = BABYLON.Mesh.MergeMeshes([h, p, r, t, k, n, m, u, y, v, D, w, E, F, B, G, H, I, J, K, L, e, M, d, a, l], !0);
                null != this.viewportsControl._octree && this.viewportsControl._octree.dynamicContent.push(this.controlCube);
                this.controlCube.id = this.controlCube.name = "viewcube_faces";
                this.controlCube._isObjectTeia = !1;
                this.controlCube.isPickable = !1;
                this.controlCube.layerMask = 1073741824;
                this.controlCube.useOctreeForRenderingSelection = !0;
                this.controlCube.subMeshes = [];
                this.controlCube.renderingGroupId = 1;
                for (l = 0; 6 > l; l++) new BABYLON.SubMesh(l, 0 + 8 * l, 8, 0 + 12 * l, 12, this.controlCube);
                for (l = 0; 12 > l; l++) new BABYLON.SubMesh(6 + l, 48 + 16 * l, 16, 72 + 24 * l, 24, this.controlCube);
                for (h = 0; 8 > h; h++) new BABYLON.SubMesh(18 + h, 240 + 24 * h, 24, 360 + 36 * h, 36, this.controlCube);
                this.controlCube.material = b;
                this.compass = this.makeCompass("compass",
                    0, -51, 0, 90, 64, this.COMPASS_COLOR, this.COMPASS_OPACITY);
                this.compass._isObjectTeia = !1;
                this.compass.useOctreeForRenderingSelection = !0;
                this.compass.layerMask = 1073741824;
                null != this.viewportsControl._octree && this.viewportsControl._octree.dynamicContent.push(this.compass)
            };
            a.prototype.makeFace = function (a, d, e, b, c, g, l) {
                var f = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a, {
                    size: d,
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                }, this.scene);
                f.material = l;
                f.position = new BABYLON.Vector3(e, b, c);
                g.forEach(function (c) {
                    f.rotate(c.axis,
                        c.rad)
                });
                return f
            };
            a.prototype.makeEdge = function (a, d, e, b, c, g, l, n) {
                var f = {
                    width: d,
                    height: e,
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                };
                d = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a + "_sub1", f, this.scene);
                d.position.y = e / 2;
                f = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a + "_sub2", f, this.scene);
                f.position.z = -e / 2;
                f.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
                var h = BABYLON.Mesh.MergeMeshes([d, f]);
                h.id = h.name = "viewcube_" + a;
                h.material = n;
                h.position = new BABYLON.Vector3(b, c, g);
                l.forEach(function (c) {
                    h.rotate(c.axis,
                        c.rad)
                });
                return h
            };
            a.prototype.makeCorner = function (a, d, e, b, c, g, l) {
                var f = {
                        size: d,
                        width: d,
                        height: d,
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE
                    },
                    h = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a + "_sub1", f, this.scene);
                h.position.x = d / 2;
                h.position.y = d / 2;
                var p = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a + "_sub2", f, this.scene);
                p.position.x = d / 2;
                p.position.z = -d / 2;
                p.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
                f = BABYLON.MeshBuilder.CreatePlane("viewcube_" + a + "_sub3", f, this.scene);
                f.position.y = d / 2;
                f.position.z = -d /
                    2;
                f.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
                var r = BABYLON.Mesh.MergeMeshes([h, p, f]);
                r.id = r.name = "viewcube_" + a;
                r.material = l;
                r.position = new BABYLON.Vector3(e, b, c);
                g.forEach(function (c) {
                    r.rotate(c.axis, c.rad)
                });
                return r
            };
            a.prototype.makeCompass = function (a, d, e, b, c, g, l, n) {
                a = [];
                for (l = c = 0; 36 > l; l++) g = new BABYLON.Vector3(85 * Math.sin(c), 0, 85 * Math.cos(c)), a.push([g, g.add(new BABYLON.Vector3(0, 8, 0))]), 0 == l && this.spritesPosition.push({
                        label: "North",
                        position: new BABYLON.Vector3(85 * Math.sin(c), e + 15, 85 * Math.cos(c))
                    }),
                    9 == l && this.spritesPosition.push({
                        label: "East",
                        position: new BABYLON.Vector3(85 * Math.sin(c), e + 15, 85 * Math.cos(c))
                    }), 18 == l && this.spritesPosition.push({
                        label: "South",
                        position: new BABYLON.Vector3(85 * Math.sin(c), e + 15, 85 * Math.cos(c))
                    }), 27 == l && this.spritesPosition.push({
                        label: "West",
                        position: new BABYLON.Vector3(85 * Math.sin(c), e + 15, 85 * Math.cos(c))
                    }), c += Math.PI / 18;
                for (l = c = 0; 72 > l; l++) g = new BABYLON.Vector3(85 * Math.sin(c), 0, 85 * Math.cos(c)), a.push([g, g.add(new BABYLON.Vector3(0, 4, 0))]), c += Math.PI / 36;
                a = BABYLON.MeshBuilder.CreateLineSystem("viewcube_compass", {
                    lines: a,
                    updatable: !1
                }, this.scene);
                a.color = this.COMPASS_COLOR;
                a.position = new BABYLON.Vector3(d, e, b);
                return a
            };
            a.prototype.makeDynamicTexture = function (a, d, e) {
                a = new BABYLON.DynamicTexture("Viewcube_DynamicTexture_" + a, 512, this.scene, !0);
                a.drawText(d, null, null, "bold 100px Arial", "black", "#C6C6C6", !0);
                a.wAng = e;
                return a
            };
            a.prototype.enableCompassSprites = function () {
                for (var a = 0; a < this.spritesPosition.length; a++) this.createCompassSprite(this.spritesPosition[a].label, this.spritesPosition[a].position)
            };
            a.prototype.setCompassOrientation =
                function (a) {};
            a.prototype.createCompassSprite = function (a, d) {
                var e = new BABYLON.SpriteManager("spriteManager_" + a, "", 1, 256, this.scene);
                e.layerMask = 1073741824;
                var b = new BABYLON.Sprite("sprite_" + a, e),
                    c = new BABYLON.DynamicTexture("DynamicTexture_" + a, 256, this.scene, !0);
                c.hasAlpha = !0;
                c.drawText(a.charAt(0), null, null, "bold 256px Segoe UI", "black", "transparent", !1, !0, 256);
                e.texture = c;
                e.texture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                e.texture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                b.position = d;
                b.size = 15
            };
            a.prototype.onMouseMove = function (a) {
                var d = this;
                this.controlCube.subMeshes.forEach(function (a) {
                    a.getMaterial().alpha = d.FACE_OPACITY_MOUSE_OFF
                });
                a = new BABYLON.Vector2(this.scene.pointerX, this.scene.pointerY);
                (a = this.scene.pick(a.x, a.y, function (a) {
                    return "viewcube_faces" == a.id
                }, null, this.camera)) && a.hit && (this.controlCube.subMeshes[a.subMeshId].getMaterial().alpha = this.FACE_OPACITY_MOUSE_OVER)
            };
            a.prototype.onPointerDown = function (a) {
                a = new BABYLON.Vector2(this.scene.pointerX, this.scene.pointerY);
                (a = this.scene.pick(a.x,
                    a.y,
                    function (a) {
                        return "viewcube_faces" == a.id
                    }, null, this.camera)) && a.hit && this.setView(a.subMeshId)
            };
            a.prototype.setView = function (a) {
                if (this.viewportsControl.activeViewport.activeCamera.cameraType == BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera) {
                    var d = this.viewportsControl.activeViewport.activeCamera;
                    switch (a) {
                        case this.FACES.TOP:
                            d.top();
                            break;
                        case this.FACES.FRONT:
                            d.front();
                            break;
                        case this.FACES.LEFT:
                            d.left();
                            break;
                        case this.FACES.RIGHT:
                            d.right();
                            break;
                        case this.FACES.BACK:
                            d.back();
                            break;
                        case this.FACES.BOTTOM:
                            d.bottom();
                            break;
                        case this.FACES.TOP_FRONT_EDGE:
                            d.topFront();
                            break;
                        case this.FACES.TOP_RIGHT_EDGE:
                            d.topRight();
                            break;
                        case this.FACES.TOP_BACK_EDGE:
                            d.topBack();
                            break;
                        case this.FACES.TOP_LEFT_EDGE:
                            d.topLeft();
                            break;
                        case this.FACES.BOTTOM_FRONT_EDGE:
                            d.bottomFront();
                            break;
                        case this.FACES.BOTTOM_RIGHT_EDGE:
                            d.bottomRight();
                            break;
                        case this.FACES.BOTTOM_BACK_EDGE:
                            d.bottomBack();
                            break;
                        case this.FACES.BOTTOM_LEFT_EDGE:
                            d.bottomLeft();
                            break;
                        case this.FACES.FRONT_RIGHT_EDGE:
                            d.frontRight();
                            break;
                        case this.FACES.BACK_RIGHT_EDGE:
                            d.backRight();
                            break;
                        case this.FACES.BACK_LEFT_EDGE:
                            d.backLeft();
                            break;
                        case this.FACES.FRONT_LEFT_EDGE:
                            d.frontLeft();
                            break;
                        case this.FACES.TOP_FRONT_LEFT_CORNER:
                            d.topFrontLeft();
                            break;
                        case this.FACES.TOP_FRONT_RIGHT_CORNER:
                            d.topFrontRight();
                            break;
                        case this.FACES.TOP_BACK_RIGHT_CORNER:
                            d.topBackRight();
                            break;
                        case this.FACES.TOP_BACK_LEFT_CORNER:
                            d.topBackLeft();
                            break;
                        case this.FACES.BOTTOM_FRONT_LEFT_CORNER:
                            d.bottomFrontLeft();
                            break;
                        case this.FACES.BOTTOM_FRONT_RIGHT_CORNER:
                            d.bottomFrontRight();
                            break;
                        case this.FACES.BOTTOM_BACK_RIGHT_CORNER:
                            d.bottomBackRight();
                            break;
                        case this.FACES.BOTTOM_BACK_LEFT_CORNER:
                            d.bottomBackLeft();
                            break;
                        default:
                            console.warn("[Viewcube] You clicked on an unrecognized face")
                    }
                }
            };
            return a
        }();
        a.ViewcubeControls = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/zoom_less.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.StartStopImage);
        a.ZoomMinus = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g) {
                return a.call(this, d, e || f._defaultImg, b, c, g) || this
            }
            __extends(f, a);
            Object.defineProperty(f, "_defaultImg", {
                get: function () {
                    return TeiaJS.Urls.assetsUrl + "/zoom_more.png"
                },
                enumerable: !0,
                configurable: !0
            });
            return f
        }(a.StartStopImage);
        a.ZoomPlus = k
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (k) {
        var m = function () {
            function c(c, a) {
                this._activeInXLayers = 0;
                this._activeInXLayers = c;
                this._forceDisable = a
            }
            Object.defineProperty(c.prototype, "activeInXLayers", {
                get: function () {
                    return this._activeInXLayers
                },
                set: function (c) {
                    this._activeInXLayers = 0 > c ? 0 : c
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "forceDisable", {
                get: function () {
                    return this._forceDisable
                },
                set: function (c) {
                    this._forceDisable = c
                },
                enumerable: !0,
                configurable: !0
            });
            return c
        }();
        k._ActiveInLayers = m;
        var h =
            function () {
                function c() {
                    this._actionsRef = new a.Utilities.Set
                }
                Object.defineProperty(c.prototype, "name", {
                    get: function () {
                        return this._name
                    },
                    set: function (c) {
                        this._name = c
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(c.prototype, "parentId", {
                    get: function () {
                        return this._parentId
                    },
                    set: function (c) {
                        this._parentId = c
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(c.prototype, "actions", {
                    get: function () {
                        return this._actionsRef
                    },
                    enumerable: !0,
                    configurable: !0
                });
                c.prototype.init = function (b, e, d) {
                    a.Utilities.Event.fire(this,
                        c.INITIALIZING_OBJECT_EVENT);
                    if (b && e && d) {
                        var g = e["@id"];
                        this._name = e["@name"];
                        this._parentId = e["@parentId"];
                        e = a.Utilities.Helpers.makeArray(e.actionRef);
                        for (var l = e.length, f = 0; f < l; ++f) {
                            var n = e[f]["@ref"],
                                h = b.actions.getUniqueObject(n);
                            if (this._actionsRef.add(h, n))
                                if (h) {
                                    var k = h.objectsRef.getUniqueObject(g);
                                    k ? !d.active || d.objects.contains(g) && b.objects.getUniqueObject(g).actions.getUniqueObject(n) || ++k.activeInXLayers : h.objectsRef.add(new m(d.active ? 1 : 0, "display" === h.type), g)
                                } else a.Utilities.Event.fire(this,
                                    c.INITIALIZING_OBJECT_ERRROR_EVENT)
                        }
                        a.Utilities.Event.fire(this, c.OBJECT_INITIALIZED_EVENT);
                        a.Utilities.Event.fire(this, c.INITIALIZE_OBJECT_COMPLETE_EVENT);
                        return g
                    }
                    a.Utilities.Event.fire(this, c.INITIALIZING_OBJECT_ERRROR_EVENT);
                    a.Utilities.Event.fire(this, c.INITIALIZE_OBJECT_COMPLETE_EVENT)
                };
                return c
            }();
        h.INITIALIZING_OBJECT_EVENT = "intializingObject";
        h.OBJECT_INITIALIZED_EVENT = "objectInitialized";
        h.INITIALIZING_OBJECT_ERRROR_EVENT = "initializingObjectError";
        h.INITIALIZE_OBJECT_COMPLETE_EVENT = "initializeObjectComplete";
        k._Object = h;
        var f = function () {
            function c() {
                this._objectsRef = new a.Utilities.Set;
                this._activeInXLayers = 0;
                this._attributesNames = new a.Utilities.Set
            }
            Object.defineProperty(c.prototype, "name", {
                get: function () {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "type", {
                get: function () {
                    return this._type
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "objectsRef", {
                get: function () {
                    return this._objectsRef
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype,
                "activeInXLayers", {
                    get: function () {
                        return this._activeInXLayers
                    },
                    set: function (c) {
                        this._activeInXLayers = 0 > c ? 0 : c
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(c.prototype, "attributesNames", {
                get: function () {
                    return this._attributesNames
                },
                enumerable: !0,
                configurable: !0
            });
            c.prototype.init = function (b, e) {
                a.Utilities.Event.fire(this, c.INITIALIZING_ACTION_EVENT);
                if (b && e) {
                    var g = b["@id"];
                    this._name = b["@name"];
                    this._type = b["@type"];
                    e.active && !e.actions.contains(g) && (this._activeInXLayers = 1);
                    b = a.Utilities.Helpers.makeArray(b.attribute);
                    for (var l in b) this._attributesNames.add(b[l]["@name"]);
                    a.Utilities.Event.fire(this, c.ACTION_INITIALIZED_EVENT);
                    a.Utilities.Event.fire(this, c.INITIALIZE_ACTION_COMPLETE_EVENT);
                    return g
                }
                a.Utilities.Event.fire(this, c.INITIALIZING_ACTION_ERRROR_EVENT);
                a.Utilities.Event.fire(this, c.INITIALIZE_ACTION_COMPLETE_EVENT)
            };
            return c
        }();
        f.INITIALIZING_ACTION_EVENT = "intializingAction";
        f.ACTION_INITIALIZED_EVENT = "actionInitialized";
        f.INITIALIZING_ACTION_ERRROR_EVENT = "initializingActionError";
        f.INITIALIZE_ACTION_COMPLETE_EVENT =
            "initializeActionComplete";
        k._Action = f;
        var d = function () {
            function c() {
                this._active = !1;
                this._actions = new a.Utilities.Set;
                this._objects = new a.Utilities.Set
            }
            Object.defineProperty(c.prototype, "active", {
                get: function () {
                    return this._active
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "actions", {
                get: function () {
                    return this._actions
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "objects", {
                get: function () {
                    return this._objects
                },
                enumerable: !0,
                configurable: !0
            });
            c.prototype.enable =
                function (c) {
                    this._active = c
                };
            return c
        }();
        k._Layer = d;
        var e;
        (function (c) {
            c[c.ENABLE = 0] = "ENABLE";
            c[c.DISABLE = 1] = "DISABLE";
            c[c.REMOVE = 2] = "REMOVE"
        })(e || (e = {}));
        var b = function () {
            function c() {
                this._layers = new a.Utilities.Set;
                this._objects = new a.Utilities.Set;
                this._actions = new a.Utilities.Set;
                this._objectsActionsStack = [];
                c._jsonKeys = {};
                c._jsonKeys.SmartScene = "SmartScene";
                c._jsonKeys.Id = "@id";
                c._jsonKeys.Name = "@Name";
                c._jsonKeys.SceneId = "@SceneId";
                c._jsonKeys.SceneName = "@sceneName";
                c._jsonKeys.Object = "Object";
                c._jsonKeys.ParentId = "@parentId";
                c._jsonKeys.ActionsRef = "actionRef";
                c._jsonKeys.Ref = "@ref";
                c._jsonKeys.Action = "Action";
                c._jsonKeys.Type = "@type";
                c._jsonKeys.Attribute = "attribute";
                c._jsonKeys.Index = "@index";
                c._jsonKeys.Label = "label";
                c._jsonKeys.For = "@for";
                c._jsonKeys.Value = "@Value";
                c._jsonKeys.Condition = "@condition";
                c._jsonKeys.AnimatedTime = "@animatedTime";
                c._jsonKeys.Color = "@color";
                c._jsonKeys.Axis = "@axis";
                c._jsonKeys.RotationValue = "@value"
            }
            Object.defineProperty(c.prototype, "objects", {
                get: function () {
                    return this._objects
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(c.prototype, "actions", {
                get: function () {
                    return this._actions
                },
                enumerable: !0,
                configurable: !0
            });
            c.prototype.bindSignalEvents = function () {
                a.Utilities.SignalR.addSignalRCallback("actionAddedToLayer", $.proxy(this._onActionAddedToLayer, this));
                a.Utilities.SignalR.addSignalRCallback("actionsAddedToLayer", $.proxy(this._onActionsAddedToLayer, this));
                a.Utilities.SignalR.addSignalRCallback("actionRemovedFromLayer", $.proxy(this._onActionRemovedFromLayer, this));
                a.Utilities.SignalR.addSignalRCallback("notificationUpdate", $.proxy(this._onNotificationUpdated, this))
            };
            c.prototype._onNotificationUpdated = function (c) {
                this._getObjectInfo(c)
            };
            c.prototype.enableActionTypeOnObject = function (c, a) {
                this._enableActionTypeOnObject(c, a, !0)
            };
            c.prototype.disableActionTypeOnObject = function (c, a) {
                this._enableActionTypeOnObject(c, a, !1)
            };
            c.prototype._enableActionTypeOnObject = function (b, e, d) {
                a.Utilities.Event.fire(this, d ? c.ENABLING_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_EVENT);
                if (b && "display" === e) {
                    b = b.getAllItems();
                    for (var g in b)
                        if (e = b[g]) {
                            var l = this._objects.getUniqueObject(e.objectId);
                            if (l) {
                                l = l.actions.values;
                                for (var f in l)(l = this._actions.getUniqueObject(f)) && "display" === l.type && ((l = l.objectsRef.getUniqueObject(e.objectId)) ? (l.forceDisable = !d, d && this._fetchAction(f, e.objectId)) : a.Utilities.Event.fire(this, d ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT))
                            } else a.Utilities.Event.fire(this, d ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT :
                                c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT)
                        } else a.Utilities.Event.fire(this, d ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT);
                    a.Utilities.Event.fire(this, d ? c.ENABLED_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLED_ACTION_TYPE_ON_OBJECT_EVENT)
                } else a.Utilities.Event.fire(this, d ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT);
                a.Utilities.Event.fire(this, d ? c.ENABLE_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLE_ACTION_TYPE_ON_OBJECT_COMPLETE_EVENT)
            };
            c.prototype._toggleActionTypeOnObject = function (b, e, d, f) {
                a.Utilities.Event.fire(this, f ? c.ENABLING_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_EVENT);
                if (!e || "changeRotation" !== d && "changePosition" !== d && "changeColor" !== d && "alert" !== d) a.Utilities.Event.fire(this, f ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT), a.Utilities.Event.fire(this, f ? c.ENABLE_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLE_ACTION_TYPE_ON_OBJECT_COMPLETE_EVENT);
                else if (d = this._objects.getUniqueObject(e)) {
                    d =
                        d.actions.values;
                    for (var g in d) g == b && (!(d = this._actions.getUniqueObject(g)) || "changeRotation" !== d.type && "changePosition" !== d.type && "changeColor" !== d.type && "alert" !== d.type || ((d = d.objectsRef.getUniqueObject(e)) ? (d.forceDisable = !f, f ? this._fetchAction(g, e) : a.Utilities.Event.fire(this, c.OBJECTSACTIONS_REMOVED, g, e)) : a.Utilities.Event.fire(this, f ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT)));
                    a.Utilities.Event.fire(this, f ? c.ENABLED_ACTION_TYPE_ON_OBJECT_EVENT :
                        c.DISABLED_ACTION_TYPE_ON_OBJECT_EVENT);
                    a.Utilities.Event.fire(this, f ? c.ENABLE_ACTION_TYPE_ON_OBJECT_EVENT : c.DISABLE_ACTION_TYPE_ON_OBJECT_COMPLETE_EVENT)
                } else a.Utilities.Event.fire(this, f ? c.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT : c.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT)
            };
            c.prototype.enableLayer = function (c) {
                this._enableLayer(c, e.ENABLE)
            };
            c.prototype.disableLayer = function (c) {
                this._enableLayer(c, e.DISABLE)
            };
            c.prototype.tryAddActionToLayer = function (c, b, e) {
                var g = this,
                    l = this._layers.getUniqueObject(e);
                if (!l) return !1;
                a.Utilities.Request.Post(a.Urls.getObjectActionUrl, JSON.stringify({
                    ActionId: c,
                    ObjectId: b
                })).done(function (c) {
                    g._addObjectActionFromTeiaServerData(c, l)
                });
                return !0
            };
            c.prototype.tryAddActionsToLayer = function (c, b) {
                var g = this,
                    e = this._layers.getUniqueObject(c);
                if (!e) return !1;
                a.Utilities.Request.Post(a.Urls.getObjectsActionsUrl, JSON.stringify(b)).done(function (c) {
                    for (var a in c) g._addObjectActionFromTeiaServerData(c[a], e)
                })
            };
            c.prototype._addObjectActionFromTeiaServerData = function (b, e) {
                a.Utilities.Event.fire(this,
                    c.OBJECTSACTIONS_UPDATED, b);
                var g = b.ActionId,
                    l = b.ObjectId,
                    d = e.actions.getUniqueObject(g);
                d ? d.activeInXLayers += 1 : (d = new f, d.init(b.objectAction, e));
                this._addActionToLayerInternal(d, e, g, l);
                e.actions.add(d, g);
                this._actions.add(d, g)
            };
            c.prototype._addActionToLayerInternal = function (c, a, b, e) {
                var g = c.objectsRef.getUniqueObject(e);
                g || (g = new m(0, !1), c.objectsRef.add(g, e));
                g.activeInXLayers += a.active ? 1 : 0;
                g = this._objects.getUniqueObject(e);
                g || (g = new h, g.name = e, g.parentId = "TODO", g.actions.add(c, b), this._objects.add(g,
                    e), a.objects.add(g, e))
            };
            c.prototype.tryRemoveActionFromLayer = function (b, e, d) {
                d = this._layers.getUniqueObject(d);
                if (!d) return !1;
                var g = d.actions.getUniqueObject(b);
                if (!g) return !1;
                --g.activeInXLayers;
                var l = g.objectsRef.getUniqueObject(e);
                if (!l) return !1;
                --l.activeInXLayers;
                0 == l.activeInXLayers && this._objects.remove(e);
                g.objectsRef.remove(e);
                0 == g.activeInXLayers && 0 == g.objectsRef.count && (d.actions.remove(b), this._actions.remove(b));
                a.Utilities.Event.fire(this, c.OBJECTSACTIONS_REMOVED, b, e)
            };
            c.prototype.onObjectsRemoved =
                function (c) {
                    for (var a in c) this.onObjectRemoved(c[a])
                };
            c.prototype.onObjectRemoved = function (c) {
                for (var a in this._layers.values) {
                    var b = this._layers.getUniqueObject(a),
                        g = b.objects.getUniqueObject(c);
                    if (g) {
                        for (var e in g.actions.values) {
                            var d = g.actions.getUniqueObject(e);
                            d.objectsRef.remove(c);
                            0 === d.objectsRef.count && (this._actions.remove(e), b.actions.remove(e))
                        }
                        this._objects.remove(c);
                        b.objects.remove(c)
                    }
                }
            };
            c.prototype._enableLayer = function (b, l) {
                var g = !1,
                    d = -1;
                switch (l) {
                    case e.ENABLE:
                        var f = [c.ENABLING_LAYER_EVENT,
                            c.ENABLED_LAYER_EVENT, c.ENABLING_LAYER_ERROR_EVENT, c.ENABLE_LAYER_COMPLETE_EVENT
                        ];
                        g = !0;
                        d = 1;
                        break;
                    case e.DISABLE:
                        f = [c.DISABLING_LAYER_EVENT, c.DISABLED_LAYER_EVENT, c.DISABLING_LAYER_ERROR_EVENT, c.DISABLE_LAYER_COMPLETE_EVENT];
                        break;
                    case e.REMOVE:
                        f = [c.REMOVING_LAYER_EVENT, c.REMOVED_LAYER_EVENT, c.REMOVING_LAYER_ERROR_EVENT, c.REMOVE_LAYER_COMPLETE_EVENT];
                        break;
                    default:
                        throw "Not implemented yet.";
                }
                a.Utilities.Event.fire(this, f[0]);
                var h = this._layers.getUniqueObject(b);
                if (h) {
                    if (h.active !== g) {
                        h.enable(g);
                        g = h.actions.values;
                        for (var t in g)
                            if (g = this._actions.getUniqueObject(t)) {
                                g.activeInXLayers += d;
                                var k = g.objectsRef,
                                    q;
                                for (q in k.values) k.getUniqueObject(q).activeInXLayers = k.getUniqueObject(q).activeInXLayers + d, h.objects.getUniqueObject(q) && (0 == k.getUniqueObject(q).activeInXLayers ? this._toggleActionTypeOnObject(t, q, g.type, !1) : 1 == k.getUniqueObject(q).activeInXLayers && h.active && this._toggleActionTypeOnObject(t, q, g.type, !0))
                            } else a.Utilities.Event.fire(this, f[2])
                    }
                    switch (l) {
                        case e.ENABLE:
                            break;
                        case e.DISABLE:
                            break;
                        case e.REMOVE:
                            this._layers.remove(b);
                            break;
                        default:
                            throw "Not implemented yet.";
                    }
                    a.Utilities.Event.fire(this, f[1])
                } else a.Utilities.Event.fire(this, f[2]);
                a.Utilities.Event.fire(this, f[3])
            };
            c.prototype.addLayer = function (b, e, d, f) {
                var g = this;
                a.Utilities.Event.fire(this, c.ADDING_LAYER_EVENT);
                a.Utilities.Event.fire(this, c.DOWNLOADING_LAYER_DATA_EVENT);
                $.get(a.Urls.getLayerUrl, {
                    ViewId: b,
                    LayerId: e,
                    AuthToken: a.authToken
                }, function (b, l, d) {
                    a.Utilities.Event.fire(g, c.DOWNLOADED_LAYER_DATA_EVENT);
                    (b = g._parseLayerData(e,
                        b, f)) ? (g._layers.add(b, e), g._fetchInternal(e)) : a.Utilities.Event.fire(g, c.ADDING_LAYER_ERROR_EVENT)
                }).fail(function (b, e, l) {
                    a.Utilities.Event.fire(g, c.DOWNLOADING_LAYER_DATA_ERROR_EVENT);
                    a.Utilities.Event.fire(g, c.ADDING_LAYER_ERROR_EVENT)
                }).always(function (b, e, l) {
                    a.Utilities.Event.fire(g, c.DOWNLOAD_LAYER_DATA_COMPLETE_EVENT);
                    a.Utilities.Event.fire(g, c.ADD_LAYER_COMPLETE_EVENT)
                })
            };
            c.prototype.removeLayer = function (c) {
                this._enableLayer(c, e.REMOVE)
            };
            c.prototype._parseLayerData = function (b, e, f) {
                a.Utilities.Event.fire(this,
                    c.PARSING_LAYER_DATA_EVENT);
                if (e && (b = new d, b.enable(f), this._tryParseSmartScene(e[c._jsonKeys.SmartScene], b))) return a.Utilities.Event.fire(this, c.PARSED_LAYER_DATA_EVENT), a.Utilities.Event.fire(this, c.PARSE_LAYER_DATA_COMPLETE_EVENT), b;
                a.Utilities.Event.fire(this, c.PARSING_LAYER_DATA_ERROR_EVENT);
                a.Utilities.Event.fire(this, c.PARSE_LAYER_DATA_COMPLETE_EVENT)
            };
            c.prototype._tryParseSmartScene = function (b, e) {
                a.Utilities.Event.fire(this, c.PARSING_SMARTSCENE_EVENT);
                if (!b || !e) return a.Utilities.Event.fire(this,
                    c.PARSING_SMARTSCENE_ERROR_EVENT), a.Utilities.Event.fire(this, c.PARSE_SMARTSCENE_COMPLETE_EVENT), !1;
                var g = this._tryParseActions(b, e);
                g || a.Utilities.Event.fire(this, c.PARSING_SMARTSCENE_ERROR_EVENT);
                (g = this._tryParseObjects(b, e) && g) ? a.Utilities.Event.fire(this, c.PARSED_SMARTSCENE_EVENT): a.Utilities.Event.fire(this, c.PARSING_SMARTSCENE_ERROR_EVENT);
                a.Utilities.Event.fire(this, c.PARSE_SMARTSCENE_COMPLETE_EVENT);
                return !0
            };
            c.prototype._tryParseActions = function (b, e) {
                a.Utilities.Event.fire(this, c.PARSING_ACTIONS_EVENT);
                if (!b || !e || !b[c._jsonKeys.Action]) return a.Utilities.Event.fire(this, c.PARSING_ACTIONS_ERROR_EVENT), a.Utilities.Event.fire(this, c.PARSE_ACTIONS_COMPLETE_EVENT), !1;
                for (var g = a.Utilities.Helpers.makeArray(b[c._jsonKeys.Action]), l = g.length, d = !0, h = 0; h < l; ++h) {
                    a.Utilities.Event.fire(this, c.PARSING_ACTION_EVENT);
                    var t = g[h],
                        k = new f;
                    if (t = k.init(t, e)) {
                        var q = this._actions.getUniqueObject(t);
                        if (q) {
                            if (q.type !== k.type || q.name !== k.name) {
                                a.Utilities.Event.fire(this, c.PARSING_ACTION_ERROR_EVENT);
                                a.Utilities.Event.fire(this,
                                    c.PARSE_ACTION_COMPLETE_EVENT);
                                a.Utilities.Event.fire(this, c.PARSING_ACTIONS_ERROR_EVENT);
                                continue
                            }
                            var m = k.attributesNames;
                            if (m)
                                for (var u in m.values) q.attributesNames.add(m.getUniqueObject(u), u);
                            k.activeInXLayers = q.activeInXLayers;
                            e.active && !e.actions.getUniqueObject(t) && ++k.activeInXLayers;
                            q = q.objectsRef;
                            for (var y in q) {
                                m = !1;
                                for (var v = a.Utilities.Helpers.makeArray(b[c._jsonKeys.Object]), D = 0; D < v.length; ++D)
                                    if (v[D]["@id"] === y) {
                                        m = !0;
                                        break
                                    } for (var w in k.objectsRef.values)
                                    if (w === y) {
                                        m || ++k.objectsRef.getUniqueObject(w).activeInXLayers;
                                        break
                                    } k.objectsRef.add(q[y])
                            }
                        }
                        this._actions.add(k, t);
                        e.actions.add(k, t);
                        a.Utilities.Event.fire(this, c.PARSED_ACTION_EVENT);
                        a.Utilities.Event.fire(this, c.PARSE_ACTION_COMPLETE_EVENT)
                    } else d = !1, a.Utilities.Event.fire(this, c.PARSING_ACTION_ERROR_EVENT), a.Utilities.Event.fire(this, c.PARSE_ACTION_COMPLETE_EVENT), a.Utilities.Event.fire(this, c.PARSING_ACTIONS_ERROR_EVENT)
                }
                a.Utilities.Event.fire(this, c.PARSED_ACTIONS_EVENT);
                a.Utilities.Event.fire(this, c.PARSE_ACTIONS_COMPLETE_EVENT);
                return d
            };
            c.prototype._tryParseObjects =
                function (b, e) {
                    a.Utilities.Event.fire(this, c.PARSING_OBJECTS_EVENT);
                    if (!b || !e || !b[c._jsonKeys.Object]) return a.Utilities.Event.fire(this, c.PARSING_OBJECTS_ERROR_EVENT), a.Utilities.Event.fire(this, c.PARSE_OBJECTS_COMPLETE_EVENT), !1;
                    b = a.Utilities.Helpers.makeArray(b[c._jsonKeys.Object]);
                    for (var g = b.length, l = !0, d = 0; d < g; ++d) {
                        a.Utilities.Event.fire(this, c.PARSING_OBJECT_EVENT);
                        var f = b[d],
                            t = new h;
                        if (f = t.init(this, f, e)) {
                            var k = this._objects.getUniqueObject(f);
                            if (k) {
                                if (k.name !== t.name || k.parentId !== t.parentId) {
                                    a.Utilities.Event.fire(this,
                                        c.PARSING_OBJECT_ERROR_EVENT);
                                    a.Utilities.Event.fire(this, c.PARSE_OBJECT_COMPLETE_EVENT);
                                    a.Utilities.Event.fire(this, c.PARSING_OBJECTS_ERROR_EVENT);
                                    continue
                                }
                                k = k.actions;
                                for (var q in k.values) t.actions.add(k.getUniqueObject(q), q);
                                this._objects.setUniqueObject(f, t)
                            } else this._objects.add(t, f);
                            e.objects.add(t, f);
                            a.Utilities.Event.fire(this, c.PARSED_OBJECT_EVENT);
                            a.Utilities.Event.fire(this, c.PARSE_OBJECT_COMPLETE_EVENT)
                        } else l = !1, a.Utilities.Event.fire(this, c.PARSING_OBJECT_ERROR_EVENT), a.Utilities.Event.fire(this,
                            c.PARSE_OBJECT_COMPLETE_EVENT), a.Utilities.Event.fire(this, c.PARSING_OBJECTS_ERROR_EVENT)
                    }
                    a.Utilities.Event.fire(this, c.PARSED_OBJECTS_EVENT);
                    a.Utilities.Event.fire(this, c.PARSE_OBJECTS_COMPLETE_EVENT);
                    return l
                };
            c.prototype.fetch = function () {
                setTimeout($.proxy(this._fetchInternal, this), 10)
            };
            c.prototype._getObjectInfo = function (b) {
                var g = this;
                a.Utilities.Event.fire(this, c.FETCHING_EVENT);
                for (var e in this._layers.values) {
                    var d = this._layers.getUniqueObject(e);
                    if (d.active) {
                        d = d.actions.values;
                        for (var f in d)
                            if ((d =
                                    this._actions.getUniqueObject(f)) && !(1 > d.activeInXLayers)) {
                                d = d.objectsRef;
                                for (var h in d.values) {
                                    var t = d.getUniqueObject(h);
                                    1 > t.activeInXLayers || t.forceDisable || h != b || (this._objects.getUniqueObject(h) ? a.Utilities.Request.Post(a.Urls.getObjectActionUrl, JSON.stringify({
                                        ActionId: f,
                                        ObjectId: h
                                    })).done(function (b, e, d) {
                                        b ? a.Utilities.Event.fire(g, c.OBJECTSACTIONS_UPDATED, b) : a.Utilities.Event.fire(g, c.FETCHING_ERROR_EVENT)
                                    }).fail(function (b, e, d) {
                                        a.Utilities.Event.fire(g, c.FETCHING_ERROR_EVENT)
                                    }).always(function (b,
                                        e, d) {
                                        a.Utilities.Event.fire(g, c.FETCH_COMPLETE_EVENT)
                                    }) : a.Utilities.Event.fire(this, c.FETCHING_ERROR_EVENT))
                                }
                            }
                    } else a.Utilities.Event.fire(this, c.FETCHING_ERROR_EVENT)
                }
            };
            c.prototype._fetchInternal = function (b) {
                a.Utilities.Event.fire(this, c.FETCHING_EVENT);
                var g = this._layers.getUniqueObject(b);
                if (g.active) {
                    var e = g.actions.values;
                    g = [];
                    for (var d in e)
                        if ((e = this._actions.getUniqueObject(d)) && !(1 > e.activeInXLayers)) {
                            var f = e.objectsRef,
                                h;
                            for (h in f.values) {
                                var t = f.getUniqueObject(h);
                                1 > t.activeInXLayers ||
                                    t.forceDisable || (this._objects.getUniqueObject(h) ? "display" != e.type && g.push({
                                        ActionId: d,
                                        ObjectId: h
                                    }) : a.Utilities.Event.fire(this, c.FETCHING_ERROR_EVENT))
                            }
                        } this._fetchActions(b, g)
                } else a.Utilities.Event.fire(this, c.FETCHING_ERROR_EVENT)
            };
            c.prototype._fetchAction = function (b, e) {
                var g = this;
                a.Utilities.Request.Post(a.Urls.getObjectActionUrl, JSON.stringify({
                    ActionId: b,
                    ObjectId: e,
                    __RequestVerificationToken: a.authToken
                })).done(function (b, e, d) {
                    b ? a.Utilities.Event.fire(g, c.OBJECTSACTIONS_UPDATED, b) : a.Utilities.Event.fire(g,
                        c.FETCHING_ERROR_EVENT)
                }).fail(function (b, e, d) {
                    a.Utilities.Event.fire(g, c.FETCHING_ERROR_EVENT)
                }).always(function (b, e, d) {
                    a.Utilities.Event.fire(g, c.FETCH_COMPLETE_EVENT)
                })
            };
            c.prototype._fetchActions = function (b, e) {
                var g = this;
                if (!this._layers.getUniqueObject(b)) return !1;
                a.Utilities.Request.Post(a.Urls.getObjectsActionsUrl, JSON.stringify(e)).done(function (b) {
                    b ? a.Utilities.Event.fire(g, c.OBJECTSACTIONS_UPDATED, b) : a.Utilities.Event.fire(g, c.FETCHING_ERROR_EVENT)
                }).fail(function (b, e, d) {
                    a.Utilities.Event.fire(g,
                        c.FETCHING_ERROR_EVENT)
                }).always(function (b, e, d) {
                    a.Utilities.Event.fire(g, c.FETCH_COMPLETE_EVENT)
                })
            };
            c.prototype.stopFetching = function () {
                a.Utilities.Event.fire(this, c.STOPPING_FETCHING_EVENT);
                this._interval && (window.clearInterval(this._interval), this._interval = void 0);
                a.Utilities.Event.fire(this, c.STOPPED_FETCHING_EVENT);
                a.Utilities.Event.fire(this, c.STOP_FETCHING_COMPLETE_EVENT)
            };
            c.prototype._objectActionJson = function (c) {
                if (c) {
                    try {
                        c = $.parseJSON(c)
                    } catch (l) {
                        return
                    }
                    return c
                }
            };
            c.prototype.destroy = function () {
                delete this._layers;
                delete this._actions;
                delete this._objects
            };
            c.prototype._onActionAddedToLayer = function (c, a, b) {
                this.tryAddActionToLayer(c, a, b)
            };
            c.prototype._onActionsAddedToLayer = function (c, a) {
                this.tryAddActionsToLayer(c, a)
            };
            c.prototype._onActionRemovedFromLayer = function (c, a, b) {
                this.tryRemoveActionFromLayer(c, a, b)
            };
            return c
        }();
        b.ENABLING_ACTION_TYPE_ON_OBJECT_EVENT = "enablingActionTypeOnObject";
        b.ENABLED_ACTION_TYPE_ON_OBJECT_EVENT = "enabledActionTypeOnObject";
        b.ENABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT = "enablingActionTypeOnObjectError";
        b.ENABLE_ACTION_TYPE_ON_OBJECT_EVENT = "enableActionTypeOnObjectComplete";
        b.DISABLING_ACTION_TYPE_ON_OBJECT_EVENT = "disablingActionTypeOnObject";
        b.DISABLED_ACTION_TYPE_ON_OBJECT_EVENT = "disabledActionTypeOnObject";
        b.DISABLING_ACTION_TYPE_ON_OBJECT_ERROR_EVENT = "disablingActionTypeOnObjectError";
        b.DISABLE_ACTION_TYPE_ON_OBJECT_COMPLETE_EVENT = "disableActionTypeOnObjectComplete";
        b.ENABLING_LAYER_EVENT = "enablingLayer";
        b.ENABLED_LAYER_EVENT = "enabledLayer";
        b.ENABLING_LAYER_ERROR_EVENT = "enablingLayerError";
        b.ENABLE_LAYER_COMPLETE_EVENT =
            "enableLayerComplete";
        b.DISABLING_LAYER_EVENT = "disablingLayer";
        b.DISABLED_LAYER_EVENT = "disabledLayer";
        b.DISABLING_LAYER_ERROR_EVENT = "disablingLayerError";
        b.DISABLE_LAYER_COMPLETE_EVENT = "disableLayerComplete";
        b.ADDING_LAYER_EVENT = "addingLayer";
        b.ADDED_LAYER_EVENT = "addedLayer";
        b.ADDING_LAYER_ERROR_EVENT = "addingLayerError";
        b.ADD_LAYER_COMPLETE_EVENT = "addLayerComplete";
        b.REMOVING_LAYER_EVENT = "removingLayer";
        b.REMOVED_LAYER_EVENT = "remvedLayer";
        b.REMOVING_LAYER_ERROR_EVENT = "removingLayerError";
        b.REMOVE_LAYER_COMPLETE_EVENT =
            "removeLayerComplete";
        b.DOWNLOADING_LAYER_DATA_EVENT = "downloadingLayer";
        b.DOWNLOADED_LAYER_DATA_EVENT = "downloadedLayer";
        b.DOWNLOADING_LAYER_DATA_ERROR_EVENT = "downloadingLayerError";
        b.DOWNLOAD_LAYER_DATA_COMPLETE_EVENT = "downloadLayerComplete";
        b.PARSING_LAYER_DATA_EVENT = "parsingLayer";
        b.PARSED_LAYER_DATA_EVENT = "parsedLayer";
        b.PARSING_LAYER_DATA_ERROR_EVENT = "parsingLayerError";
        b.PARSE_LAYER_DATA_COMPLETE_EVENT = "parseLayerComplete";
        b.PARSING_SMARTSCENE_EVENT = "parsingSmartScene";
        b.PARSED_SMARTSCENE_EVENT =
            "parsedSmartScene";
        b.PARSING_SMARTSCENE_ERROR_EVENT = "parsingSmartSceneError";
        b.PARSE_SMARTSCENE_COMPLETE_EVENT = "parseSmartSceneComplete";
        b.PARSING_ACTIONS_EVENT = "parsingActions";
        b.PARSED_ACTIONS_EVENT = "parsedActions";
        b.PARSING_ACTIONS_ERROR_EVENT = "parsingActionsError";
        b.PARSE_ACTIONS_COMPLETE_EVENT = "parseActionsComplete";
        b.PARSING_ACTION_EVENT = "parsingAction";
        b.PARSED_ACTION_EVENT = "parsedAction";
        b.PARSING_ACTION_ERROR_EVENT = "parsingActionError";
        b.PARSE_ACTION_COMPLETE_EVENT = "parseActionComplete";
        b.PARSING_OBJECTS_EVENT = "parsingObjects";
        b.PARSED_OBJECTS_EVENT = "parsedObjects";
        b.PARSING_OBJECTS_ERROR_EVENT = "parsingObjectsError";
        b.PARSE_OBJECTS_COMPLETE_EVENT = "parseObjectsComplete";
        b.PARSING_OBJECT_EVENT = "parsingObject";
        b.PARSED_OBJECT_EVENT = "parsedObject";
        b.PARSING_OBJECT_ERROR_EVENT = "parsingObjectError";
        b.PARSE_OBJECT_COMPLETE_EVENT = "parseObjectComplete";
        b.FETCHING_EVENT = "fetching";
        b.FETCHED_EVENT = "fetched";
        b.FETCHING_ERROR_EVENT = "fetchingError";
        b.FETCH_COMPLETE_EVENT = "fetchComplete";
        b.STOPPING_FETCHING_EVENT =
            "stoppingFetching";
        b.STOPPED_FETCHING_EVENT = "stoppedFetching";
        b.STOPPING_FETCHING_ERROR_EVENT = "stoppingFetchingError";
        b.STOP_FETCHING_COMPLETE_EVENT = "stopFetchingComplete";
        b.OBJECTSACTIONS_UPDATED = "objectsActionsUpdated";
        b.OBJECTSACTIONS_REMOVED = "objectsActionsRemoved";
        k.ActionsManager = b
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (a) {
            function e(b, c, g, e) {
                var d = a.call(this) || this;
                if ("" === b || 0 > c || "" === g) throw Error("Invalid parameters");
                d._name = b;
                d._index = c;
                d._type = g;
                d._value = e;
                return d
            }
            __extends(e, a);
            Object.defineProperty(e.prototype, "booleanValue", {
                get: function () {
                    return !!this._value
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "stringValue", {
                get: function () {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "index", {
                get: function () {
                    return this._index
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "type", {
                get: function () {
                    return this._type
                },
                enumerable: !0,
                configurable: !0
            });
            return e
        }(a.Type);
        k.ObjectActionAttribute = m;
        var h = function (a) {
            function e(b, c) {
                var g = a.call(this) || this;
                if (0 > b || "" === c) throw Error("Invalid parameters");
                g._forIndex = b;
                g._value = c;
                return g
            }
            __extends(e, a);
            Object.defineProperty(e.prototype, "forIndex", {
                get: function () {
                    return this._forIndex
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "value", {
                get: function () {
                    return this._value
                },
                enumerable: !0,
                configurable: !0
            });
            return e
        }(a.Type);
        k.ObjectActionLabel = h;
        var f = function (d) {
            function e(b, c, g, e, f, k, p, r) {
                var l = d.call(this) || this;
                if ("" === b || "" === c || "" === g || !e) throw Error("Invalid parameters");
                l._name = b;
                l._actionclass_sfx = k;
                l._modeLightBox = p;
                l._titleLightBox = r;
                l._actionId = c;
                l._objectId = g;
                l._attributes = new a.Utilities.Set;
                l._labels = new a.Utilities.Set;
                b = a.Utilities.Helpers.makeArray(e);
                for (var n in b) c = b[n], c = new m(c.Name, c.Index, c.Type, c.Value), l._attributes.add(c, c.index.toString());
                f = a.Utilities.Helpers.makeArray(f);
                for (var C in f) c = f[C], n = new h(c.For, c.Value), l._labels.add(n, n.forIndex.toString());
                return l
            }
            __extends(e, d);
            Object.defineProperty(e.prototype, "name", {
                get: function () {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "actionclass_sfx", {
                get: function () {
                    return this._actionclass_sfx
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "modeLightBox", {
                get: function () {
                    return this._modeLightBox
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "titleLightBox", {
                get: function () {
                    return this._titleLightBox
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "actionId", {
                get: function () {
                    return this._actionId
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "objectId", {
                get: function () {
                    return this._objectId
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype, "id", {
                get: function () {
                    return this._actionId + "_" + this._objectId
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(e.prototype,
                "attributes", {
                    get: function () {
                        return this._attributes
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(e.prototype, "labels", {
                get: function () {
                    return this._labels
                },
                enumerable: !0,
                configurable: !0
            });
            e.newObjectAction = function (a) {
                if (a) switch (a.Type) {
                    case "alert":
                        return new k.Alert.Action(a.Name, a.ActionId, a.ObjectId, a.Attribute, a.Condition, a.Signal, a.Label);
                    case "changeColor":
                        return new k.ChangeColor.Action(a.Name, a.ActionId, a.ObjectId, a.Attribute, a.State, a.Label);
                    case "changeRotation":
                        return new k.ChangeRotation.Action(a.Name,
                            a.ActionId, a.ObjectId, a.Attribute, a.Rotation, a.Label);
                    case "changePosition":
                        return new k.ChangePosition.Action(a.Name, a.ActionId, a.ObjectId, a.Attribute, a.Position, a.Label);
                    case "display":
                        return new k.Display.Action(a.Name, a.ActionId, a.ObjectId, a.Attribute, a.Label, a.Actionclass_sfx, a.modeLightBox, a.titleLightBox)
                }
            };
            return e
        }(a.Type);
        k.ObjectAction = f
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        (function (m) {
            var h = function (a) {
                function b(c, b, e, d, h, k, r) {
                    if (!h || !k) throw Error("Invalid parameters");
                    c = a.call(this, c, b, e, d, r) || this;
                    c._condition = h[0].Condition;
                    c._signal = f.newSignal(k[0]);
                    return c
                }
                __extends(b, a);
                b.prototype._conditionToEval = function () {
                    for (var c = /A\[([\d]+)\]/g, a = this._condition, b = c.exec(a); null != b;) {
                        var e = this.attributes.getUniqueObject(b[1]);
                        if (!e) return;
                        e = "xs:boolean" === e.type ? e.booleanValue : e.stringValue;
                        a = 0 == b.index ? e + a.substring(b[0].length) : a.substring(0,
                            b.index) + e + a.substring(b.index + b[0].length);
                        b = c.exec(a)
                    }
                    return a
                };
                return b
            }(k.ObjectAction);
            m.Action = h;
            var f = function (a) {
                function b(c) {
                    var b = a.call(this) || this;
                    b._attributesIndices = c;
                    return b
                }
                __extends(b, a);
                b.newSignal = function (c) {
                    if (c) switch (c["@type"]) {
                        case "popup":
                            return new d(c["@attributes"])
                    }
                };
                return b
            }(a.Type);
            m.Signal = f;
            var d = function (a) {
                function b(c) {
                    return a.call(this, c) || this
                }
                __extends(b, a);
                return b
            }(f);
            m.Popup = d
        })(k.Alert || (k.Alert = {}))
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS ||
    (TeiaJS = {}));
(function (a) {
    (function (k) {
        (function (m) {
            var h = function (d) {
                function e(a, c, g, e, f, h) {
                    a = d.call(this, a, c, g, e, h) || this;
                    a._states = [];
                    if (!f) throw Error("Invalid parameters");
                    a._tryParseStates(f);
                    return a
                }
                __extends(e, d);
                e.prototype._tryParseStates = function (b) {
                    if (!b) return !1;
                    b = a.Utilities.Helpers.makeArray(b);
                    var c = !0,
                        g;
                    for (g in b) {
                        var e = f.newState(b[g]);
                        e ? this._states.push(e) : c = !1
                    }
                    return c
                };
                e.prototype.colorToApply = function () {
                    try {
                        for (var a in this._states) {
                            var c = this._states[a];
                            if (eval(this._conditionToEval(c.condition))) return c.color
                        }
                    } catch (g) {
                        console.log("Error in action condition:"), console.log(c.condition),
                            console.log(this._conditionToEval(c.condition))
                    }
                };
                e.prototype._conditionToEval = function (a) {
                    for (var c = /A\[([\d]+)\]/g, b = c.exec(a); null != b;) {
                        var e = this.attributes.getUniqueObject(b[1]);
                        if (!e) return;
                        e = "xs:boolean" === e.type ? e.booleanValue : e.stringValue;
                        a = 0 == b.index ? e + a.substring(b[0].length) : a.substring(0, b.index) + e + a.substring(b.index + b[0].length);
                        b = c.exec(a)
                    }
                    return a
                };
                return e
            }(k.ObjectAction);
            m.Action = h;
            var f = function (d) {
                function e() {
                    return null !== d && d.apply(this, arguments) || this
                }
                __extends(e, d);
                Object.defineProperty(e.prototype,
                    "condition", {
                        get: function () {
                            return this._condition
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                Object.defineProperty(e.prototype, "animatedTime", {
                    get: function () {
                        return this._animatedTime
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(e.prototype, "color", {
                    get: function () {
                        return this._color
                    },
                    enumerable: !0,
                    configurable: !0
                });
                e.newState = function (b) {
                    if (b) {
                        var c = a.Utilities.Helpers.hexToRgb(b.Color);
                        if (c) {
                            var g = b.Condition;
                            b = b.AnimatedTime;
                            var d = new e;
                            d._animatedTime = b;
                            d._color = new BABYLON.Color3(c.r, c.g, c.b);
                            d._condition = g;
                            return d
                        }
                    }
                };
                return e
            }(a.Type);
            m.State = f
        })(k.ChangeColor || (k.ChangeColor = {}))
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        (function (m) {
            var h = function (d) {
                function e(a, c, g, e, f, h) {
                    a = d.call(this, a, c, g, e, h) || this;
                    a._positions = [];
                    if (!f) throw Error("Invalid parameters");
                    a._ttyParsePositions(f);
                    return a
                }
                __extends(e, d);
                e.prototype._ttyParsePositions = function (b) {
                    if (!b) return !1;
                    b = a.Utilities.Helpers.makeArray(b);
                    var c = !0,
                        g;
                    for (g in b) {
                        var e = f.newPosition(b[g]);
                        e ? this._positions.push(e) : c = !1
                    }
                    return c
                };
                e.prototype.positionToApply = function () {
                    var a = [],
                        c;
                    for (c in this._positions) {
                        var g = this._positions[c];
                        eval(this._conditionToEval(g.condition)) &&
                            a.push(g)
                    }
                    return a
                };
                e.prototype._conditionToEval = function (a) {
                    for (var c = /A\[([\d]+)\]/g, b = c.exec(a); null != b;) {
                        var e = this.attributes.getUniqueObject(b[1]);
                        if (!e) return;
                        e = "xs:boolean" === e.type ? e.booleanValue : e.stringValue;
                        a = 0 == b.index ? e + a.substring(b[0].length) : a.substring(0, b.index) + e + a.substring(b.index + b[0].length);
                        b = c.exec(a)
                    }
                    return a
                };
                return e
            }(k.ObjectAction);
            m.Action = h;
            var f = function (a) {
                function e() {
                    return null !== a && a.apply(this, arguments) || this
                }
                __extends(e, a);
                Object.defineProperty(e.prototype,
                    "condition", {
                        get: function () {
                            return this._condition
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                Object.defineProperty(e.prototype, "tx", {
                    get: function () {
                        return this._tx
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(e.prototype, "ty", {
                    get: function () {
                        return this._ty
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(e.prototype, "tz", {
                    get: function () {
                        return this._tz
                    },
                    enumerable: !0,
                    configurable: !0
                });
                e.newPosition = function (a) {
                    if (a) {
                        var c = a.Condition,
                            b = a.Tx,
                            d = a.Ty;
                        a = a.Tz;
                        var f = new e;
                        f._condition = c;
                        f._tx = parseFloat(b);
                        f._ty = parseFloat(d);
                        f._tz = parseFloat(a);
                        return f
                    }
                };
                return e
            }(a.Type);
            m.Position = f
        })(k.ChangePosition || (k.ChangePosition = {}))
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        (function (m) {
            var h = function (d) {
                function e(a, c, g, e, f, h) {
                    a = d.call(this, a, c, g, e, h) || this;
                    a._rotations = [];
                    if (!f) throw Error("Invalid parameters");
                    a._tryParseRotations(f);
                    return a
                }
                __extends(e, d);
                e.prototype._tryParseRotations = function (b) {
                    if (!b) return !1;
                    b = a.Utilities.Helpers.makeArray(b);
                    var c = !0,
                        g;
                    for (g in b) {
                        var e = f.newRotation(b[g]);
                        e ? this._rotations.push(e) : c = !1
                    }
                    return c
                };
                e.prototype.rotationToApply = function () {
                    var a = [],
                        c;
                    for (c in this._rotations) {
                        var g = this._rotations[c];
                        eval(this._conditionToEval(g.condition)) &&
                            a.push(g)
                    }
                    return a
                };
                e.prototype._conditionToEval = function (a) {
                    for (var c = /A\[([\d]+)\]/g, b = c.exec(a); null != b;) {
                        var e = this.attributes.getUniqueObject(b[1]);
                        if (!e) return;
                        e = "xs:boolean" === e.type ? e.booleanValue : e.stringValue;
                        a = 0 == b.index ? e + a.substring(b[0].length) : a.substring(0, b.index) + e + a.substring(b.index + b[0].length);
                        b = c.exec(a)
                    }
                    return a
                };
                return e
            }(k.ObjectAction);
            m.Action = h;
            var f = function (a) {
                function e() {
                    return null !== a && a.apply(this, arguments) || this
                }
                __extends(e, a);
                Object.defineProperty(e.prototype,
                    "condition", {
                        get: function () {
                            return this._condition
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                Object.defineProperty(e.prototype, "rx", {
                    get: function () {
                        return this._rx
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(e.prototype, "ry", {
                    get: function () {
                        return this._ry
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(e.prototype, "rz", {
                    get: function () {
                        return this._rz
                    },
                    enumerable: !0,
                    configurable: !0
                });
                e.newRotation = function (a) {
                    if (a) {
                        var c = a.Condition,
                            b = a.Rx,
                            d = a.Ry;
                        a = a.Rz;
                        var f = new e;
                        f._condition = c;
                        f._rx = parseFloat(b);
                        f._ry = parseFloat(d);
                        f._rz = parseFloat(a);
                        return f
                    }
                };
                return e
            }(a.Type);
            m.Rotation = f
        })(k.ChangeRotation || (k.ChangeRotation = {}))
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        (function (k) {
            var h = function (a) {
                function d() {
                    return null !== a && a.apply(this, arguments) || this
                }
                __extends(d, a);
                return d
            }(a.ObjectAction);
            k.Action = h
        })(a.Display || (a.Display = {}))
    })(a.ObjectActions || (a.ObjectActions = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, b) {
                this._playingMeshes = [];
                this._lockedAnimationsStepIds = [];
                this._pendingAnimationMeshes = {};
                this._id = 0;
                this._scene = b;
                this._id = a;
                this._animationsSteps = []
            }
            Object.defineProperty(a.prototype, "animationsSteps", {
                get: function () {
                    return this._animationsSteps
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "id", {
                set: function (a) {
                    this._id = a
                },
                enumerable: !0,
                configurable: !0
            });
            a.prototype.setFromTeia = function (a) {
                if (a && 0 != a.length)
                    for (var b in a) {
                        var c =
                            a[b],
                            g = this.addAnimationStep(c.StepId, c.StepName),
                            e;
                        for (e in c.Animations) {
                            var d = c.Animations[e];
                            this.addAnimationToStep(g.id, d.Id, d.Name, d.Property, d.ValueType, d.Value, d.FramesNumber)
                        }
                    } else console.warn("Unable to create animation group, invalid json provided, no AnimationStep found...")
            };
            a.prototype.addAnimationStep = function (a, b) {
                this._animationsSteps.push(new h(a, b));
                return this._animationsSteps[this._animationsSteps.length - 1]
            };
            a.prototype.addAnimationToStep = function (a, b, c, g, d, n, h) {
                var e = this._animationsSteps.filter(function (c,
                    b, g) {
                    return c.id == a
                });
                1 != e.length ? console.warn("An error occured while trying to get animationStep") : (e = e[0], e.addAnimation(new f(b, e.id + "_" + c, g, BABYLON.Animation["ANIMATIONTYPE_" + d], n, h)))
            };
            a.prototype.startAnimation = function (a, b) {
                a.TeiaAnimationGroup = this;
                this._playingMeshes.push(a);
                this._startStepForMesh(a, 0, b)
            };
            a.prototype.stopAnimation = function (a, b) {
                void 0 === b && (b = !0);
                this._playingMeshes = this._playingMeshes.filter(function (c) {
                    return c.uniqueId != a.uniqueId
                });
                b && (this._scene.stopAnimation(a), a.animations.length =
                    0)
            };
            a.prototype.lockAnimationOnStep = function (a) {
                if (-1 === this._lockedAnimationsStepIds.indexOf(a)) {
                    var b = this._animationsSteps.filter(function (c) {
                        return c.id == a
                    });
                    !b || 1 > b.length || this._lockedAnimationsStepIds.push(a)
                }
            };
            a.prototype.unlockAnimationOnStep = function (a) {
                var b = this._lockedAnimationsStepIds.indexOf(a);
                if (-1 !== b) {
                    delete this._lockedAnimationsStepIds[b];
                    for (var c in this._pendingAnimationMeshes[a]) b = this._pendingAnimationMeshes[a][c], this._startStepForMesh(b.mesh, b.stepIndex, b.callback);
                    delete this._pendingAnimationMeshes[a]
                }
            };
            a.prototype._startStepForMesh = function (a, b, c) {
                var g = this,
                    e = this._playingMeshes.filter(function (c) {
                        return c.uniqueId == a.uniqueId
                    });
                if (this._animationsSteps.length <= b || 0 == e.length) c && (delete a.TeiaAnimationGroup, delete a.TeiaAnimationStep, c(a, this));
                else {
                    var d = this._animationsSteps[b]; - 1 !== this._lockedAnimationsStepIds.indexOf(d.id) ? (this._pendingAnimationMeshes[d.id] || (this._pendingAnimationMeshes[d.id] = []), this._pendingAnimationMeshes[d.id].push({
                        mesh: a,
                        stepIndex: b,
                        callback: c
                    })) : (e = d.createBabylonAnimations(a,
                        this._scene), a.animations = a.animations.concat(e), this._scene.beginDirectAnimation(a, e, 0, d.maxFrames, !1, 1, function () {
                        a.animations = a.animations.filter(function (c, a, b) {
                            return -1 !== c.name.indexOf(d.id + "_") ? !1 : !0
                        });
                        g._startStepForMesh(a, ++b, c)
                    }))
                }
            };
            return a
        }();
        a.AnimationsGroup = k;
        var h = function () {
            function a(a, b) {
                this._maxFrame = 0;
                this._id = a;
                this._name = b;
                this._animations = []
            }
            Object.defineProperty(a.prototype, "animations", {
                get: function () {
                    return this._animations
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype,
                "name", {
                    get: function () {
                        return this._name
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(a.prototype, "id", {
                get: function () {
                    return this._id
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "maxFrames", {
                get: function () {
                    return this._maxFrame
                },
                enumerable: !0,
                configurable: !0
            });
            a.prototype.addAnimation = function (a) {
                this._animations.push(a);
                this._maxFrame = Math.max(this._maxFrame, a.frames)
            };
            a.prototype.createBabylonAnimations = function (a, b) {
                var c = [],
                    g;
                for (g in this._animations) {
                    var e =
                        this._animations[g];
                    e = e.createBabylonAnimation(a, a[e.property], b);
                    e.TeiaAnimationStep = this;
                    c.push(e)
                }
                return c
            };
            a.prototype.getAnimation = function (a) {
                return 0 !== this._animations.length && this._animations[a] ? this._animations[a] : null
            };
            return a
        }();
        a.AnimationStep = h;
        var f = function () {
            function a(a, b, c, g, d, f) {
                this._id = a;
                this._name = b;
                this._property = c;
                this._valueType = g;
                this._value = d;
                this._frames = f
            }
            Object.defineProperty(a.prototype, "property", {
                get: function () {
                    return this._property
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "value", {
                get: function () {
                    return this._createValue(this._value, this._valueType)
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "frames", {
                get: function () {
                    return this._frames
                },
                enumerable: !0,
                configurable: !0
            });
            a.prototype.createBabylonAnimation = function (a, b, c) {
                a = new BABYLON.Animation(this._name, this._property, 30, this._valueType, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                c = [];
                c.push({
                    frame: 0,
                    value: b
                });
                c.push({
                    frame: this._frames,
                    value: this.value
                });
                a.setKeys(c);
                return a
            };
            a.prototype._createValue = function (a, b) {
                a = a.split(",");
                switch (b) {
                    case BABYLON.Animation.ANIMATIONTYPE_VECTOR3:
                        return new BABYLON.Vector3(parseFloat(a[0]), parseFloat(a[1]), parseFloat(a[2]));
                    case BABYLON.Animation.ANIMATIONTYPE_VECTOR2:
                        return new BABYLON.Vector2(parseFloat(a[0]), parseFloat(a[1]));
                    case BABYLON.Animation.ANIMATIONTYPE_FLOAT:
                        return parseFloat(a[0]);
                    case BABYLON.Animation.ANIMATIONTYPE_COLOR3:
                        return new BABYLON.Color3(parseFloat(a[0]), parseFloat(a[1]), parseFloat(a[2]));
                    case BABYLON.Animation.ANIMATIONTYPE_QUATERNION:
                        return new BABYLON.Quaternion(parseFloat(a[0]),
                            parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]))
                }
            };
            return a
        }();
        a.Animation = f
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    var k = function (a) {
        function h() {
            return null !== a && a.apply(this, arguments) || this
        }
        __extends(h, a);
        return h
    }(a.CuttingMaterialDefines);
    a.StandardCuttingMaterialDefines = k;
    k = function (k) {
        function h(f, d, e) {
            var b = k.call(this, f, d) || this;
            b.ambientColor = new a.Color3(0, 0, 0);
            b.diffuseColor = new a.Color3(1, 1, 1);
            b.specularColor = new a.Color3(1, 1, 1);
            b.emissiveColor = new a.Color3(0, 0, 0);
            b.specularPower = 64;
            b._useAlphaFromDiffuseTexture = !1;
            b._useEmissiveAsIllumination = !1;
            b._linkEmissiveWithDiffuse = !1;
            b._useSpecularOverAlpha = !1;
            b._useReflectionOverAlpha = !1;
            b._disableLighting = !1;
            b._useParallax = !1;
            b._useParallaxOcclusion = !1;
            b.parallaxScaleBias = .05;
            b._roughness = 0;
            b.indexOfRefraction = .98;
            b.invertRefractionY = !0;
            b._useLightmapAsShadowmap = !1;
            b._useReflectionFresnelFromSpecular = !1;
            b._useGlossinessFromSpecularMapAlpha = !1;
            b._maxSimultaneousLights = 4;
            b._invertNormalMapX = !1;
            b._invertNormalMapY = !1;
            b._twoSidedLighting = !1;
            b._renderTargets = new a.SmartArray(16);
            b._worldViewProjectionMatrix = a.Matrix.Zero();
            b._globalAmbientColor = new a.Color3(0,
                0, 0);
            e && (b.diffuseColor = e.diffuseColor, b.emissiveColor = e.emissiveColor, b.ambientColor = e.ambientColor, b.specularColor = e.specularColor, b.alpha = e.alpha, b.alphaMode = e.alphaMode, b.diffuseTexture = e.diffuseTexture, b.ambientTexture = e.ambientTexture, b.emissiveTexture = e.emissiveTexture, b.bumpTexture = e.bumpTexture, b.lightmapTexture = e.lightmapTexture, b.opacityTexture = e.opacityTexture, b.reflectionTexture = e.reflectionTexture, b.specularTexture = e.specularTexture, b.refractionTexture = e.refractionTexture, b.diffuseFresnelParameters =
                e.diffuseFresnelParameters, b.emissiveFresnelParameters = e.emissiveFresnelParameters, b.opacityFresnelParameters = e.opacityFresnelParameters, b.reflectionFresnelParameters = e.reflectionFresnelParameters, b.refractionFresnelParameters = e.refractionFresnelParameters, b.useEmissiveAsIllumination = e.useEmissiveAsIllumination, b.roughness = e.roughness, b.useAlphaFromDiffuseTexture = e.useAlphaFromDiffuseTexture, b.useGlossinessFromSpecularMapAlpha = e.useGlossinessFromSpecularMapAlpha, b.useLogarithmicDepth = e.useLogarithmicDepth,
                b.useReflectionFresnelFromSpecular = e.useReflectionFresnelFromSpecular, b.useSpecularOverAlpha = e.useSpecularOverAlpha, b.useLightmapAsShadowmap = e.useLightmapAsShadowmap, b.disableLighting = e.disableLighting, b.maxSimultaneousLights = e.maxSimultaneousLights);
            b.backFaceCulling = !1;
            b._attachImageProcessingConfiguration(null);
            b.getRenderTargetTextures = function () {
                b._renderTargets.reset();
                a.StandardMaterial.ReflectionTextureEnabled && b._reflectionTexture && b._reflectionTexture.isRenderTarget && b._renderTargets.push(b._reflectionTexture);
                a.StandardMaterial.RefractionTextureEnabled && b._refractionTexture && b._refractionTexture.isRenderTarget && b._renderTargets.push(b._refractionTexture);
                return b._renderTargets
            };
            return b
        }
        __extends(h, k);
        Object.defineProperty(h.prototype, "imageProcessingConfiguration", {
            get: function () {
                return this._imageProcessingConfiguration
            },
            set: function (a) {
                this._attachImageProcessingConfiguration(a);
                this._markAllSubMeshesAsTexturesDirty()
            },
            enumerable: !0,
            configurable: !0
        });
        h.prototype._attachImageProcessingConfiguration =
            function (a) {
                var d = this;
                a !== this._imageProcessingConfiguration && (this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), this._imageProcessingConfiguration = a ? a : this.getScene().imageProcessingConfiguration, this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(function (a) {
                    d._markAllSubMeshesAsImageProcessingDirty()
                }))
            };
        Object.defineProperty(h.prototype, "cameraColorCurvesEnabled", {
            get: function () {
                return this.imageProcessingConfiguration.colorCurvesEnabled
            },
            set: function (a) {
                this.imageProcessingConfiguration.colorCurvesEnabled = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h.prototype, "cameraColorGradingEnabled", {
            get: function () {
                return this.imageProcessingConfiguration.colorGradingEnabled
            },
            set: function (a) {
                this.imageProcessingConfiguration.colorGradingEnabled = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h.prototype, "cameraToneMappingEnabled", {
            get: function () {
                return this._imageProcessingConfiguration.toneMappingEnabled
            },
            set: function (a) {
                this._imageProcessingConfiguration.toneMappingEnabled = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h.prototype, "cameraExposure", {
            get: function () {
                return this._imageProcessingConfiguration.exposure
            },
            set: function (a) {
                this._imageProcessingConfiguration.exposure = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h.prototype, "cameraContrast", {
            get: function () {
                return this._imageProcessingConfiguration.contrast
            },
            set: function (a) {
                this._imageProcessingConfiguration.contrast = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h.prototype, "cameraColorGradingTexture", {
            get: function () {
                return this._imageProcessingConfiguration.colorGradingTexture
            },
            set: function (a) {
                this._imageProcessingConfiguration.colorGradingTexture = a
            },
            enumerable: !0,
            configurable: !0
        });
        h.prototype.getClassName = function () {
            return "StandardCuttingMaterial"
        };
        Object.defineProperty(h.prototype, "useLogarithmicDepth", {
            get: function () {
                return this._useLogarithmicDepth
            },
            set: function (a) {
                this._useLogarithmicDepth = a && this.getScene().getEngine().getCaps().fragmentDepthSupported;
                this._markAllSubMeshesAsMiscDirty()
            },
            enumerable: !0,
            configurable: !0
        });
        h.prototype.needAlphaBlending = function () {
            return 1 > this.alpha || null != this._opacityTexture || this._shouldUseAlphaFromDiffuseTexture() || this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled
        };
        h.prototype.needAlphaTesting = function () {
            return null != this._diffuseTexture && this._diffuseTexture.hasAlpha
        };
        h.prototype._shouldUseAlphaFromDiffuseTexture = function () {
            return null != this._diffuseTexture && this._diffuseTexture.hasAlpha &&
                this._useAlphaFromDiffuseTexture
        };
        h.prototype.getAlphaTestTexture = function () {
            return this._diffuseTexture
        };
        h.prototype.isReadyForSubMesh = function (f, d, e) {
            if (this.isFrozen && this._wasPreviouslyReady && d.effect) return !0;
            d._materialDefines || (d._materialDefines = new a.StandardMaterialDefines);
            var b = this.getScene(),
                c = d._materialDefines;
            c.CUTTING = this._defines.CUTTING;
            if (!this.checkReadyOnEveryCall && d.effect && c._renderId === b.getRenderId()) return !0;
            var g = b.getEngine();
            c._needNormals = a.MaterialHelper.PrepareDefinesForLights(b,
                f, c, !0, this._maxSimultaneousLights, this._disableLighting);
            if (c._areTexturesDirty) {
                c._needUVs = !1;
                c.MAINUV1 = !1;
                c.MAINUV2 = !1;
                if (b.texturesEnabled) {
                    if (this._diffuseTexture && a.StandardMaterial.DiffuseTextureEnabled)
                        if (this._diffuseTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._diffuseTexture, c, "DIFFUSE");
                        else return !1;
                    else c.DIFFUSE = !1;
                    if (this._ambientTexture && a.StandardMaterial.AmbientTextureEnabled)
                        if (this._ambientTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._ambientTexture,
                            c, "AMBIENT");
                        else return !1;
                    else c.AMBIENT = !1;
                    if (this._opacityTexture && a.StandardMaterial.OpacityTextureEnabled)
                        if (this._opacityTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._opacityTexture, c, "OPACITY"), c.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
                        else return !1;
                    else c.OPACITY = !1;
                    if (this._reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled)
                        if (this._reflectionTexture.isReadyOrNotBlocking()) switch (c._needNormals = !0, c.REFLECTION = !0, c.ROUGHNESS = 0 < this._roughness,
                            c.REFLECTIONOVERALPHA = this._useReflectionOverAlpha, c.INVERTCUBICMAP = this._reflectionTexture.coordinatesMode === a.Texture.INVCUBIC_MODE, c.REFLECTIONMAP_3D = this._reflectionTexture.isCube, this._reflectionTexture.coordinatesMode) {
                            case a.Texture.CUBIC_MODE:
                            case a.Texture.INVCUBIC_MODE:
                                c.setReflectionMode("REFLECTIONMAP_CUBIC");
                                break;
                            case a.Texture.EXPLICIT_MODE:
                                c.setReflectionMode("REFLECTIONMAP_EXPLICIT");
                                break;
                            case a.Texture.PLANAR_MODE:
                                c.setReflectionMode("REFLECTIONMAP_PLANAR");
                                break;
                            case a.Texture.PROJECTION_MODE:
                                c.setReflectionMode("REFLECTIONMAP_PROJECTION");
                                break;
                            case a.Texture.SKYBOX_MODE:
                                c.setReflectionMode("REFLECTIONMAP_SKYBOX");
                                break;
                            case a.Texture.SPHERICAL_MODE:
                                c.setReflectionMode("REFLECTIONMAP_SPHERICAL");
                                break;
                            case a.Texture.EQUIRECTANGULAR_MODE:
                                c.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR");
                                break;
                            case a.Texture.FIXED_EQUIRECTANGULAR_MODE:
                                c.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR_FIXED");
                                break;
                            case a.Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                                c.setReflectionMode("REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED")
                        } else return !1;
                        else c.REFLECTION = !1;
                    if (this._emissiveTexture && a.StandardMaterial.EmissiveTextureEnabled)
                        if (this._emissiveTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._emissiveTexture, c, "EMISSIVE");
                        else return !1;
                    else c.EMISSIVE = !1;
                    if (this._lightmapTexture && a.StandardMaterial.LightmapTextureEnabled)
                        if (this._lightmapTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._lightmapTexture, c, "LIGHTMAP"), c.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap;
                        else return !1;
                    else c.LIGHTMAP = !1;
                    if (this._specularTexture && a.StandardMaterial.SpecularTextureEnabled)
                        if (this._specularTexture.isReadyOrNotBlocking()) a.MaterialHelper.PrepareDefinesForMergedUV(this._specularTexture, c, "SPECULAR"), c.GLOSSINESS = this._useGlossinessFromSpecularMapAlpha;
                        else return !1;
                    else c.SPECULAR = !1;
                    if (b.getEngine().getCaps().standardDerivatives && this._bumpTexture && a.StandardMaterial.BumpTextureEnabled)
                        if (this._bumpTexture.isReady()) a.MaterialHelper.PrepareDefinesForMergedUV(this._bumpTexture, c, "BUMP"), c.PARALLAX =
                            this._useParallax, c.PARALLAXOCCLUSION = this._useParallaxOcclusion;
                        else return !1;
                    else c.BUMP = !1;
                    if (this._refractionTexture && a.StandardMaterial.RefractionTextureEnabled)
                        if (this._refractionTexture.isReadyOrNotBlocking()) c._needUVs = !0, c.REFRACTION = !0, c.REFRACTIONMAP_3D = this._refractionTexture.isCube;
                        else return !1;
                    else c.REFRACTION = !1;
                    c.TWOSIDEDLIGHTING = !this._backFaceCulling && this._twoSidedLighting
                } else c.DIFFUSE = !1, c.AMBIENT = !1, c.OPACITY = !1, c.REFLECTION = !1, c.EMISSIVE = !1, c.LIGHTMAP = !1, c.BUMP = !1, c.REFRACTION = !1;
                c.ALPHAFROMDIFFUSE = this._shouldUseAlphaFromDiffuseTexture();
                c.EMISSIVEASILLUMINATION = this._useEmissiveAsIllumination;
                c.LINKEMISSIVEWITHDIFFUSE = this._linkEmissiveWithDiffuse;
                c.SPECULAROVERALPHA = this._useSpecularOverAlpha
            }
            if (c._areImageProcessingDirty) {
                if (!this._imageProcessingConfiguration.isReady()) return !1;
                this._imageProcessingConfiguration.prepareDefines(c)
            }
            if (c._areFresnelDirty)
                if (a.StandardMaterial.FresnelEnabled) {
                    if (this._diffuseFresnelParameters || this._opacityFresnelParameters || this._emissiveFresnelParameters ||
                        this._refractionFresnelParameters || this._reflectionFresnelParameters) c.DIFFUSEFRESNEL = this._diffuseFresnelParameters && this._diffuseFresnelParameters.isEnabled, c.OPACITYFRESNEL = this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled, c.REFLECTIONFRESNEL = this._reflectionFresnelParameters && this._reflectionFresnelParameters.isEnabled, c.REFLECTIONFRESNELFROMSPECULAR = this._useReflectionFresnelFromSpecular, c.REFRACTIONFRESNEL = this._refractionFresnelParameters && this._refractionFresnelParameters.isEnabled,
                        c.EMISSIVEFRESNEL = this._emissiveFresnelParameters && this._emissiveFresnelParameters.isEnabled, c._needNormals = !0, c.FRESNEL = !0
                } else c.FRESNEL = !1;
            a.MaterialHelper.PrepareDefinesForMisc(f, b, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, c);
            a.MaterialHelper.PrepareDefinesForAttributes(f, c, !0, !0, !0);
            a.MaterialHelper.PrepareDefinesForFrameBoundValues(b, g, c, e);
            if (c.isDirty) {
                c.markAsProcessed();
                b.resetCachedMaterial();
                e = new a.EffectFallbacks;
                c.REFLECTION && e.addFallback(0, "REFLECTION");
                c.SPECULAR &&
                    e.addFallback(0, "SPECULAR");
                c.BUMP && e.addFallback(0, "BUMP");
                c.PARALLAX && e.addFallback(1, "PARALLAX");
                c.PARALLAXOCCLUSION && e.addFallback(0, "PARALLAXOCCLUSION");
                c.SPECULAROVERALPHA && e.addFallback(0, "SPECULAROVERALPHA");
                c.FOG && e.addFallback(1, "FOG");
                c.POINTSIZE && e.addFallback(0, "POINTSIZE");
                c.LOGARITHMICDEPTH && e.addFallback(0, "LOGARITHMICDEPTH");
                a.MaterialHelper.HandleFallbacksForShadows(c, e, this._maxSimultaneousLights);
                c.SPECULARTERM && e.addFallback(0, "SPECULARTERM");
                c.DIFFUSEFRESNEL && e.addFallback(1,
                    "DIFFUSEFRESNEL");
                c.OPACITYFRESNEL && e.addFallback(2, "OPACITYFRESNEL");
                c.REFLECTIONFRESNEL && e.addFallback(3, "REFLECTIONFRESNEL");
                c.EMISSIVEFRESNEL && e.addFallback(4, "EMISSIVEFRESNEL");
                c.FRESNEL && e.addFallback(4, "FRESNEL");
                var l = [a.VertexBuffer.PositionKind];
                c.NORMAL && l.push(a.VertexBuffer.NormalKind);
                c.UV1 && l.push(a.VertexBuffer.UVKind);
                c.UV2 && l.push(a.VertexBuffer.UV2Kind);
                c.VERTEXCOLOR && l.push(a.VertexBuffer.ColorKind);
                a.MaterialHelper.PrepareAttributesForBones(l, f, c, e);
                a.MaterialHelper.PrepareAttributesForInstances(l,
                    c);
                a.MaterialHelper.PrepareAttributesForMorphTargets(l, f, c);
                f = "default";
                var n = "world view viewProjection vEyePosition vLightsType vAmbientColor vDiffuseColor vSpecularColor vEmissiveColor vFogInfos vFogColor pointSize vDiffuseInfos vAmbientInfos vOpacityInfos vReflectionInfos vEmissiveInfos vSpecularInfos vBumpInfos vLightmapInfos vRefractionInfos mBones vClipPlane diffuseMatrix ambientMatrix opacityMatrix reflectionMatrix emissiveMatrix specularMatrix bumpMatrix lightmapMatrix refractionMatrix diffuseLeftColor diffuseRightColor opacityParts reflectionLeftColor reflectionRightColor emissiveLeftColor emissiveRightColor refractionLeftColor refractionRightColor logarithmicDepthConstant vNormalReoderParams".split(" ");
                n = n.concat(this._cuttingPlaneUniforms);
                var h = "diffuseSampler ambientSampler opacitySampler reflectionCubeSampler reflection2DSampler emissiveSampler specularSampler bumpSampler lightmapSampler refractionCubeSampler refraction2DSampler".split(" "),
                    k = ["Material", "Scene"];
                a.ImageProcessingConfiguration.PrepareUniforms(n, c);
                a.ImageProcessingConfiguration.PrepareSamplers(h, c);
                a.MaterialHelper.PrepareUniformsAndSamplersList({
                    uniformsNames: n,
                    uniformBuffersNames: k,
                    samplers: h,
                    defines: c,
                    maxSimultaneousLights: this._maxSimultaneousLights
                });
                this.customShaderNameResolve && (f = this.customShaderNameResolve(f, n, k, h, c));
                var r = c.toString();
                d.setEffect(b.getEngine().createEffect(f, {
                    attributes: l,
                    uniformsNames: n,
                    uniformBuffersNames: k,
                    samplers: h,
                    defines: r,
                    fallbacks: e,
                    onCompiled: this.onCompiled,
                    onError: this.onError,
                    indexParameters: {
                        maxSimultaneousLights: this._maxSimultaneousLights,
                        maxSimultaneousMorphTargets: c.NUM_MORPH_INFLUENCERS
                    }
                }, g), c);
                this.buildUniformLayout()
            }
            if (!d.effect.isReady()) return !1;
            c._renderId = b.getRenderId();
            return this._wasPreviouslyReady = !0
        };
        h.prototype.buildUniformLayout = function () {
            this._uniformBuffer.addUniform("diffuseLeftColor", 4);
            this._uniformBuffer.addUniform("diffuseRightColor", 4);
            this._uniformBuffer.addUniform("opacityParts", 4);
            this._uniformBuffer.addUniform("reflectionLeftColor", 4);
            this._uniformBuffer.addUniform("reflectionRightColor", 4);
            this._uniformBuffer.addUniform("refractionLeftColor", 4);
            this._uniformBuffer.addUniform("refractionRightColor", 4);
            this._uniformBuffer.addUniform("emissiveLeftColor", 4);
            this._uniformBuffer.addUniform("emissiveRightColor",
                4);
            this._uniformBuffer.addUniform("vDiffuseInfos", 2);
            this._uniformBuffer.addUniform("vAmbientInfos", 2);
            this._uniformBuffer.addUniform("vOpacityInfos", 2);
            this._uniformBuffer.addUniform("vReflectionInfos", 2);
            this._uniformBuffer.addUniform("vEmissiveInfos", 2);
            this._uniformBuffer.addUniform("vLightmapInfos", 2);
            this._uniformBuffer.addUniform("vSpecularInfos", 2);
            this._uniformBuffer.addUniform("vBumpInfos", 3);
            this._uniformBuffer.addUniform("diffuseMatrix", 16);
            this._uniformBuffer.addUniform("ambientMatrix",
                16);
            this._uniformBuffer.addUniform("opacityMatrix", 16);
            this._uniformBuffer.addUniform("reflectionMatrix", 16);
            this._uniformBuffer.addUniform("emissiveMatrix", 16);
            this._uniformBuffer.addUniform("lightmapMatrix", 16);
            this._uniformBuffer.addUniform("specularMatrix", 16);
            this._uniformBuffer.addUniform("bumpMatrix", 16);
            this._uniformBuffer.addUniform("vNormalReoderParams", 4);
            this._uniformBuffer.addUniform("refractionMatrix", 16);
            this._uniformBuffer.addUniform("vRefractionInfos", 4);
            this._uniformBuffer.addUniform("vSpecularColor",
                4);
            this._uniformBuffer.addUniform("vEmissiveColor", 3);
            this._uniformBuffer.addUniform("vDiffuseColor", 4);
            this._uniformBuffer.addUniform("pointSize", 1);
            this._uniformBuffer.create()
        };
        h.prototype.unbind = function () {
            this._activeEffect && (this._reflectionTexture && this._reflectionTexture.isRenderTarget && this._activeEffect.setTexture("reflection2DSampler", null), this._refractionTexture && this._refractionTexture.isRenderTarget && this._activeEffect.setTexture("refraction2DSampler", null));
            k.prototype.unbind.call(this)
        };
        h.prototype.bindForSubMesh = function (f, d, e) {
            var b = this.getScene(),
                c = e._materialDefines;
            if (c) {
                this._activeEffect = e = e.effect;
                e.setMatrix("viewProjection", b.getTransformMatrix());
                e.setVector3("minimumPlaneTop", this._minimumPlaneTop);
                e.setVector3("maximumPlaneTop", this._maximumPlaneTop);
                e.setVector3("minimumPlaneBottom", this._minimumPlaneBottom);
                e.setVector3("maximumPlaneBottom", this._maximumPlaneBottom);
                e.setVector4("planePositionTop", this._planePositionTop);
                e.setVector4("planePositionBottom", this._planePositionBottom);
                e.setVector4("planePositionLeft", this._planePositionLeft);
                e.setVector4("planePositionRight", this._planePositionRight);
                e.setVector4("planePositionBack", this._planePositionBack);
                e.setVector4("planePositionFront", this._planePositionFront);
                e.setVector3("minimumPlaneBack", this._minimumPlaneBack);
                e.setVector3("maximumPlaneBack", this._maximumPlaneBack);
                e.setVector3("minimumPlaneFront", this._minimumPlaneFront);
                e.setVector3("maximumPlaneFront", this._maximumPlaneFront);
                e.setVector3("minimumPlaneLeft", this._minimumPlaneLeft);
                e.setVector3("maximumPlaneLeft", this._maximumPlaneLeft);
                e.setVector3("minimumPlaneRight", this._minimumPlaneRight);
                e.setVector3("maximumPlaneRight", this._maximumPlaneRight);
                e.setVector4("planeQuaternion", this._planeQuaternion);
                this.bindOnlyWorldMatrix(f);
                a.MaterialHelper.BindBonesParameters(d, e);
                this._mustRebind(b, e, d.visibility) && (this._uniformBuffer.bindToEffect(e, "Material"), this.bindViewProjection(e), this._uniformBuffer.useUbo && this.isFrozen && this._uniformBuffer.isSync || (a.StandardMaterial.FresnelEnabled &&
                    c.FRESNEL && (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled && (this._uniformBuffer.updateColor4("diffuseLeftColor", this.diffuseFresnelParameters.leftColor, this.diffuseFresnelParameters.power), this._uniformBuffer.updateColor4("diffuseRightColor", this.diffuseFresnelParameters.rightColor, this.diffuseFresnelParameters.bias)), this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled && this._uniformBuffer.updateColor4("opacityParts", new a.Color3(this.opacityFresnelParameters.leftColor.toLuminance(),
                            this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power), this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled && (this._uniformBuffer.updateColor4("reflectionLeftColor", this.reflectionFresnelParameters.leftColor, this.reflectionFresnelParameters.power), this._uniformBuffer.updateColor4("reflectionRightColor", this.reflectionFresnelParameters.rightColor, this.reflectionFresnelParameters.bias)), this.refractionFresnelParameters &&
                        this.refractionFresnelParameters.isEnabled && (this._uniformBuffer.updateColor4("refractionLeftColor", this.refractionFresnelParameters.leftColor, this.refractionFresnelParameters.power), this._uniformBuffer.updateColor4("refractionRightColor", this.refractionFresnelParameters.rightColor, this.refractionFresnelParameters.bias)), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled && (this._uniformBuffer.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power),
                            this._uniformBuffer.updateColor4("emissiveRightColor", this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias))), b.texturesEnabled && (this._diffuseTexture && a.StandardMaterial.DiffuseTextureEnabled && (this._uniformBuffer.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level), a.MaterialHelper.BindTextureMatrix(this._diffuseTexture, this._uniformBuffer, "diffuse")), this._ambientTexture && a.StandardMaterial.AmbientTextureEnabled && (this._uniformBuffer.updateFloat2("vAmbientInfos",
                            this._ambientTexture.coordinatesIndex, this._ambientTexture.level), a.MaterialHelper.BindTextureMatrix(this._ambientTexture, this._uniformBuffer, "ambient")), this._opacityTexture && a.StandardMaterial.OpacityTextureEnabled && (this._uniformBuffer.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level), a.MaterialHelper.BindTextureMatrix(this._opacityTexture, this._uniformBuffer, "opacity")), this._reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled && (this._uniformBuffer.updateFloat2("vReflectionInfos",
                            this._reflectionTexture.level, this.roughness), this._uniformBuffer.updateMatrix("reflectionMatrix", this._reflectionTexture.getReflectionTextureMatrix())), this._emissiveTexture && a.StandardMaterial.EmissiveTextureEnabled && (this._uniformBuffer.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level), a.MaterialHelper.BindTextureMatrix(this._emissiveTexture, this._uniformBuffer, "emissive")), this._lightmapTexture && a.StandardMaterial.LightmapTextureEnabled && (this._uniformBuffer.updateFloat2("vLightmapInfos",
                            this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level), a.MaterialHelper.BindTextureMatrix(this._lightmapTexture, this._uniformBuffer, "lightmap")), this._specularTexture && a.StandardMaterial.SpecularTextureEnabled && (this._uniformBuffer.updateFloat2("vSpecularInfos", this._specularTexture.coordinatesIndex, this._specularTexture.level), a.MaterialHelper.BindTextureMatrix(this._specularTexture, this._uniformBuffer, "specular")), this._bumpTexture && b.getEngine().getCaps().standardDerivatives && a.StandardMaterial.BumpTextureEnabled &&
                        (this._uniformBuffer.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, 1 / this._bumpTexture.level, this.parallaxScaleBias), a.MaterialHelper.BindTextureMatrix(this._bumpTexture, this._uniformBuffer, "bump"), b._mirroredCameraPosition ? this._uniformBuffer.updateFloat4("vNormalReoderParams", this.invertNormalMapX ? 0 : 1, this.invertNormalMapX ? 1 : -1, this.invertNormalMapY ? 0 : 1, this.invertNormalMapY ? 1 : -1) : this._uniformBuffer.updateFloat4("vNormalReoderParams", this.invertNormalMapX ? 1 : 0, this.invertNormalMapX ?
                            -1 : 1, this.invertNormalMapY ? 1 : 0, this.invertNormalMapY ? -1 : 1)), this._refractionTexture && a.StandardMaterial.RefractionTextureEnabled && (f = 1, this._refractionTexture.isCube || (this._uniformBuffer.updateMatrix("refractionMatrix", this._refractionTexture.getReflectionTextureMatrix()), this._refractionTexture.depth && (f = this._refractionTexture.depth)), this._uniformBuffer.updateFloat4("vRefractionInfos", this._refractionTexture.level, this.indexOfRefraction, f, this.invertRefractionY ? -1 : 1))), this.pointsCloud && this._uniformBuffer.updateFloat("pointSize",
                        this.pointSize), c.SPECULARTERM && this._uniformBuffer.updateColor4("vSpecularColor", this.specularColor, this.specularPower), this._uniformBuffer.updateColor3("vEmissiveColor", this.emissiveColor), this._uniformBuffer.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha * d.visibility)), b.texturesEnabled && (this._diffuseTexture && a.StandardMaterial.DiffuseTextureEnabled && e.setTexture("diffuseSampler", this._diffuseTexture), this._ambientTexture && a.StandardMaterial.AmbientTextureEnabled && e.setTexture("ambientSampler",
                        this._ambientTexture), this._opacityTexture && a.StandardMaterial.OpacityTextureEnabled && e.setTexture("opacitySampler", this._opacityTexture), this._reflectionTexture && a.StandardMaterial.ReflectionTextureEnabled && (this._reflectionTexture.isCube ? e.setTexture("reflectionCubeSampler", this._reflectionTexture) : e.setTexture("reflection2DSampler", this._reflectionTexture)), this._emissiveTexture && a.StandardMaterial.EmissiveTextureEnabled && e.setTexture("emissiveSampler", this._emissiveTexture), this._lightmapTexture &&
                    a.StandardMaterial.LightmapTextureEnabled && e.setTexture("lightmapSampler", this._lightmapTexture), this._specularTexture && a.StandardMaterial.SpecularTextureEnabled && e.setTexture("specularSampler", this._specularTexture), this._bumpTexture && b.getEngine().getCaps().standardDerivatives && a.StandardMaterial.BumpTextureEnabled && e.setTexture("bumpSampler", this._bumpTexture), this._refractionTexture && a.StandardMaterial.RefractionTextureEnabled && (this._refractionTexture.isCube ? e.setTexture("refractionCubeSampler",
                        this._refractionTexture) : e.setTexture("refraction2DSampler", this._refractionTexture))), a.MaterialHelper.BindClipPlane(e, b), b.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor), e.setVector3("vEyePosition", b._mirroredCameraPosition ? b._mirroredCameraPosition : b.activeCamera.globalPosition), e.setColor3("vAmbientColor", this._globalAmbientColor));
                if (this._mustRebind(b, e) || !this.isFrozen) b.lightsEnabled && !this._disableLighting && a.MaterialHelper.BindLights(b, d, e, c, this._maxSimultaneousLights),
                    (b.fogEnabled && d.applyFog && b.fogMode !== a.Scene.FOGMODE_NONE || this._reflectionTexture || this._refractionTexture) && this.bindView(e), a.MaterialHelper.BindFogParameters(b, d, e), c.NUM_MORPH_INFLUENCERS && a.MaterialHelper.BindMorphTargetParameters(d, e), a.MaterialHelper.BindLogDepth(c, e, b), this._imageProcessingConfiguration.bind(this._activeEffect);
                this._uniformBuffer.update();
                this._afterBind(d, this._activeEffect)
            }
        };
        h.prototype.getAnimatables = function () {
            var a = [];
            this._diffuseTexture && this._diffuseTexture.animations &&
                0 < this._diffuseTexture.animations.length && a.push(this._diffuseTexture);
            this._ambientTexture && this._ambientTexture.animations && 0 < this._ambientTexture.animations.length && a.push(this._ambientTexture);
            this._opacityTexture && this._opacityTexture.animations && 0 < this._opacityTexture.animations.length && a.push(this._opacityTexture);
            this._reflectionTexture && this._reflectionTexture.animations && 0 < this._reflectionTexture.animations.length && a.push(this._reflectionTexture);
            this._emissiveTexture && this._emissiveTexture.animations &&
                0 < this._emissiveTexture.animations.length && a.push(this._emissiveTexture);
            this._specularTexture && this._specularTexture.animations && 0 < this._specularTexture.animations.length && a.push(this._specularTexture);
            this._bumpTexture && this._bumpTexture.animations && 0 < this._bumpTexture.animations.length && a.push(this._bumpTexture);
            this._lightmapTexture && this._lightmapTexture.animations && 0 < this._lightmapTexture.animations.length && a.push(this._lightmapTexture);
            this._refractionTexture && this._refractionTexture.animations &&
                0 < this._refractionTexture.animations.length && a.push(this._refractionTexture);
            return a
        };
        h.prototype.getActiveTextures = function () {
            var a = k.prototype.getActiveTextures.call(this);
            this._diffuseTexture && a.push(this._diffuseTexture);
            this._ambientTexture && a.push(this._ambientTexture);
            this._opacityTexture && a.push(this._opacityTexture);
            this._reflectionTexture && a.push(this._reflectionTexture);
            this._emissiveTexture && a.push(this._emissiveTexture);
            this._specularTexture && a.push(this._specularTexture);
            this._bumpTexture &&
                a.push(this._bumpTexture);
            this._lightmapTexture && a.push(this._lightmapTexture);
            this._refractionTexture && a.push(this._refractionTexture);
            return a
        };
        h.prototype.hasTexture = function (a) {
            return k.prototype.hasTexture.call(this, a) || this._diffuseTexture === a || this._ambientTexture === a || this._opacityTexture === a || this._reflectionTexture === a || this._emissiveTexture === a || this._specularTexture === a || this._bumpTexture === a || this._lightmapTexture === a || this._refractionTexture === a ? !0 : !1
        };
        h.prototype.dispose = function (a,
            d) {
            d && (this._diffuseTexture && this._diffuseTexture.dispose(), this._ambientTexture && this._ambientTexture.dispose(), this._opacityTexture && this._opacityTexture.dispose(), this._reflectionTexture && this._reflectionTexture.dispose(), this._emissiveTexture && this._emissiveTexture.dispose(), this._specularTexture && this._specularTexture.dispose(), this._bumpTexture && this._bumpTexture.dispose(), this._lightmapTexture && this._lightmapTexture.dispose(), this._refractionTexture && this._refractionTexture.dispose());
            this._imageProcessingConfiguration &&
                this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
            k.prototype.dispose.call(this, a, d)
        };
        h.prototype.clone = function (f) {
            var d = this,
                e = a.SerializationHelper.Clone(function () {
                    return new h(f, d.getScene())
                }, this);
            e.name = f;
            e.id = f;
            return e
        };
        h.prototype.serialize = function () {
            return a.SerializationHelper.Serialize(this)
        };
        h.Parse = function (f, d, e) {
            return a.SerializationHelper.Parse(function () {
                return new a.StandardMaterial(f.name, d)
            }, f, d, e)
        };
        Object.defineProperty(h, "DiffuseTextureEnabled", {
            get: function () {
                return a.StandardMaterial._DiffuseTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._DiffuseTextureEnabled !== f && (a.StandardMaterial._DiffuseTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "AmbientTextureEnabled", {
            get: function () {
                return a.StandardMaterial._AmbientTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._AmbientTextureEnabled !== f && (a.StandardMaterial._AmbientTextureEnabled =
                    f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "OpacityTextureEnabled", {
            get: function () {
                return a.StandardMaterial._OpacityTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._OpacityTextureEnabled !== f && (a.StandardMaterial._OpacityTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "ReflectionTextureEnabled", {
            get: function () {
                return a.StandardMaterial._ReflectionTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._ReflectionTextureEnabled !== f && (a.StandardMaterial._ReflectionTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "EmissiveTextureEnabled", {
            get: function () {
                return a.StandardMaterial._EmissiveTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._EmissiveTextureEnabled !== f && (a.StandardMaterial._EmissiveTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "SpecularTextureEnabled", {
            get: function () {
                return a.StandardMaterial._SpecularTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._SpecularTextureEnabled !== f && (a.StandardMaterial._SpecularTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "BumpTextureEnabled", {
            get: function () {
                return a.StandardMaterial._BumpTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._BumpTextureEnabled !==
                    f && (a.StandardMaterial._BumpTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "LightmapTextureEnabled", {
            get: function () {
                return a.StandardMaterial._LightmapTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._LightmapTextureEnabled !== f && (a.StandardMaterial._LightmapTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "RefractionTextureEnabled", {
            get: function () {
                return a.StandardMaterial._RefractionTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._RefractionTextureEnabled !== f && (a.StandardMaterial._RefractionTextureEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "ColorGradingTextureEnabled", {
            get: function () {
                return a.StandardMaterial._ColorGradingTextureEnabled
            },
            set: function (f) {
                a.StandardMaterial._ColorGradingTextureEnabled !== f && (a.StandardMaterial._ColorGradingTextureEnabled =
                    f, a.Engine.MarkAllMaterialsAsDirty(a.Material.TextureDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(h, "FresnelEnabled", {
            get: function () {
                return a.StandardMaterial._FresnelEnabled
            },
            set: function (f) {
                a.StandardMaterial._FresnelEnabled !== f && (a.StandardMaterial._FresnelEnabled = f, a.Engine.MarkAllMaterialsAsDirty(a.Material.FresnelDirtyFlag))
            },
            enumerable: !0,
            configurable: !0
        });
        return h
    }(a.CuttingMaterial);
    k._DiffuseTextureEnabled = !0;
    k._AmbientTextureEnabled = !0;
    k._OpacityTextureEnabled = !0;
    k._ReflectionTextureEnabled = !0;
    k._EmissiveTextureEnabled = !0;
    k._SpecularTextureEnabled = !0;
    k._BumpTextureEnabled = !0;
    k._LightmapTextureEnabled = !0;
    k._RefractionTextureEnabled = !0;
    k._ColorGradingTextureEnabled = !0;
    k._FresnelEnabled = !0;
    __decorate([a.serializeAsTexture("diffuseTexture")], k.prototype, "_diffuseTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "diffuseTexture", void 0);
    __decorate([a.serializeAsTexture("ambientTexture")], k.prototype, "_ambientTexture",
        void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "ambientTexture", void 0);
    __decorate([a.serializeAsTexture("opacityTexture")], k.prototype, "_opacityTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "opacityTexture", void 0);
    __decorate([a.serializeAsTexture("reflectionTexture")], k.prototype, "_reflectionTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "reflectionTexture",
        void 0);
    __decorate([a.serializeAsTexture("emissiveTexture")], k.prototype, "_emissiveTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "emissiveTexture", void 0);
    __decorate([a.serializeAsTexture("specularTexture")], k.prototype, "_specularTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "specularTexture", void 0);
    __decorate([a.serializeAsTexture("bumpTexture")], k.prototype, "_bumpTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")],
        k.prototype, "bumpTexture", void 0);
    __decorate([a.serializeAsTexture("lightmapTexture")], k.prototype, "_lightmapTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "lightmapTexture", void 0);
    __decorate([a.serializeAsTexture("refractionTexture")], k.prototype, "_refractionTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "refractionTexture", void 0);
    __decorate([a.serializeAsColor3("ambient")], k.prototype, "ambientColor",
        void 0);
    __decorate([a.serializeAsColor3("diffuse")], k.prototype, "diffuseColor", void 0);
    __decorate([a.serializeAsColor3("specular")], k.prototype, "specularColor", void 0);
    __decorate([a.serializeAsColor3("emissive")], k.prototype, "emissiveColor", void 0);
    __decorate([a.serialize()], k.prototype, "specularPower", void 0);
    __decorate([a.serialize("useAlphaFromDiffuseTexture")], k.prototype, "_useAlphaFromDiffuseTexture", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useAlphaFromDiffuseTexture",
        void 0);
    __decorate([a.serialize("useEmissiveAsIllumination")], k.prototype, "_useEmissiveAsIllumination", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useEmissiveAsIllumination", void 0);
    __decorate([a.serialize("linkEmissiveWithDiffuse")], k.prototype, "_linkEmissiveWithDiffuse", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "linkEmissiveWithDiffuse", void 0);
    __decorate([a.serialize("useSpecularOverAlpha")], k.prototype,
        "_useSpecularOverAlpha", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useSpecularOverAlpha", void 0);
    __decorate([a.serialize("useReflectionOverAlpha")], k.prototype, "_useReflectionOverAlpha", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useReflectionOverAlpha", void 0);
    __decorate([a.serialize("disableLighting")], k.prototype, "_disableLighting", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsLightsDirty")],
        k.prototype, "disableLighting", void 0);
    __decorate([a.serialize("useParallax")], k.prototype, "_useParallax", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useParallax", void 0);
    __decorate([a.serialize("useParallaxOcclusion")], k.prototype, "_useParallaxOcclusion", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useParallaxOcclusion", void 0);
    __decorate([a.serialize()], k.prototype, "parallaxScaleBias", void 0);
    __decorate([a.serialize("roughness")],
        k.prototype, "_roughness", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "roughness", void 0);
    __decorate([a.serialize()], k.prototype, "indexOfRefraction", void 0);
    __decorate([a.serialize()], k.prototype, "invertRefractionY", void 0);
    __decorate([a.serialize("useLightmapAsShadowmap")], k.prototype, "_useLightmapAsShadowmap", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useLightmapAsShadowmap", void 0);
    __decorate([a.serializeAsFresnelParameters("diffuseFresnelParameters")],
        k.prototype, "_diffuseFresnelParameters", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")], k.prototype, "diffuseFresnelParameters", void 0);
    __decorate([a.serializeAsFresnelParameters("opacityFresnelParameters")], k.prototype, "_opacityFresnelParameters", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")], k.prototype, "opacityFresnelParameters", void 0);
    __decorate([a.serializeAsFresnelParameters("reflectionFresnelParameters")], k.prototype, "_reflectionFresnelParameters",
        void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")], k.prototype, "reflectionFresnelParameters", void 0);
    __decorate([a.serializeAsFresnelParameters("refractionFresnelParameters")], k.prototype, "_refractionFresnelParameters", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")], k.prototype, "refractionFresnelParameters", void 0);
    __decorate([a.serializeAsFresnelParameters("emissiveFresnelParameters")], k.prototype, "_emissiveFresnelParameters", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")],
        k.prototype, "emissiveFresnelParameters", void 0);
    __decorate([a.serialize("useReflectionFresnelFromSpecular")], k.prototype, "_useReflectionFresnelFromSpecular", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsFresnelDirty")], k.prototype, "useReflectionFresnelFromSpecular", void 0);
    __decorate([a.serialize("useGlossinessFromSpecularMapAlpha")], k.prototype, "_useGlossinessFromSpecularMapAlpha", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "useGlossinessFromSpecularMapAlpha",
        void 0);
    __decorate([a.serialize("maxSimultaneousLights")], k.prototype, "_maxSimultaneousLights", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsLightsDirty")], k.prototype, "maxSimultaneousLights", void 0);
    __decorate([a.serialize("invertNormalMapX")], k.prototype, "_invertNormalMapX", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "invertNormalMapX", void 0);
    __decorate([a.serialize("invertNormalMapY")], k.prototype, "_invertNormalMapY", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")],
        k.prototype, "invertNormalMapY", void 0);
    __decorate([a.serialize("twoSidedLighting")], k.prototype, "_twoSidedLighting", void 0);
    __decorate([a.expandToProperty("_markAllSubMeshesAsTexturesDirty")], k.prototype, "twoSidedLighting", void 0);
    __decorate([a.serialize()], k.prototype, "useLogarithmicDepth", null);
    a.StandardCuttingMaterial = k
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a) {
                this._viewport = a;
                this._scene = a.scene;
                this._camera = a.scene.activeCamera;
                this._canvas = a.canvas;
                this._isLights = this._isVisible = !0;
                this._pickables = [];
                this._isEnabled = !1;
                this._currentMode = 1;
                this._planeMaterial = new BABYLON.StandardMaterial("planemat", this._scene);
                this._planeMaterial.ambientColor = new BABYLON.Color3(.5, .5, .5);
                this._planeMaterial.emissiveColor = new BABYLON.Color3(.5, .5, .5);
                this._planeMaterial.alpha = .03;
                this._planeMaterial.backFaceCulling = !1;
                this._planeMaterial.disableLighting = !0;
                this._world = this._scene.getWorldExtends();
                this._center = BABYLON.Vector3.Center(this._world.min, this._world.max);
                this._plane = BABYLON.MeshBuilder.CreateBox("BoxCuttingStereo", {
                    size: 2
                }, this._scene);
                this._plane._isObjectTeia = !1;
                this._plane.rotationQuaternion = BABYLON.Quaternion.Identity();
                this._plane.position = this._center;
                this._plane.isVisible = !1;
                this._plane.isPickable = !1;
                this._plane.showBoundingBox = !0;
                null != this._viewport._octree && this._viewport._octree.dynamicContent.push(this._plane);
                if (0 < this._viewport.scene.meshes.length) {
                    a = BABYLON.Vector3.Zero();
                    for (var d = BABYLON.Vector3.Zero(), e = 0; e < this._viewport.scene.meshes.length; e++)
                        if (this._viewport.scene.meshes[e]._isObjectTeia) {
                            var b = this._viewport.scene.meshes[e].getBoundingInfo().boundingBox.vectorsWorld;
                            a = a.MaximizeInPlace(b[1]);
                            d = d.MinimizeInPlace(b[0])
                        } this._plane.scaling.y = Number(a.y - d.y) / 2;
                    this._plane.scaling.x = Number(a.x - d.x) / 2;
                    this._plane.scaling.z = Number(a.z - d.z) / 2
                } else this._plane.scaling.y = 20, this._plane.scaling.x = 20, this._plane.scaling.z =
                    20;
                this._plane.material = this._planeMaterial
            }
            a.prototype.isEnabled = function () {
                return this._isEnabled
            };
            a.prototype.enabled = function () {
                var a = this;
                this._viewport.freeze(!1);
                if (!this.isEnabled()) {
                    var d = this._parseAllMaterials();
                    this._setAllMaterialsToCut(d);
                    this._createPlane();
                    this._sendCuttingValuesToMaterials();
                    this._mouseUp = function (e) {
                        return a._onMouseUp(e)
                    };
                    this._mouseMove = function (e) {
                        return a._onMouseMove(e)
                    };
                    this._canvas.addEventListener("pointerup", this._mouseUp, !1);
                    this._canvas.addEventListener("pointermove",
                        this._mouseMove, !1);
                    this._isEnabled = !0
                }
                this._viewport.unfreeze()
            };
            a.prototype.RestartCuttingPlan = function () {
                this._plane.dispose();
                this._editor.disposeAll();
                this._plane = BABYLON.MeshBuilder.CreateBox("BoxCuttingStereo", {
                    size: 2
                }, this._scene);
                this._plane._isObjectTeia = !1;
                this._plane.rotationQuaternion = BABYLON.Quaternion.Identity();
                this._plane.position = this._center;
                this._plane.isVisible = !1;
                this._plane.isPickable = !1;
                this._plane.showBoundingBox = !0;
                null != this._viewport._octree && this._viewport._octree.dynamicContent.push(this._plane);
                if (0 < this._viewport.scene.meshes.length) {
                    for (var a = BABYLON.Vector3.Zero(), d = BABYLON.Vector3.Zero(), e = 0; e < this._viewport.scene.meshes.length; e++)
                        if (this._viewport.scene.meshes[e]._isObjectTeia) {
                            var b = this._viewport.scene.meshes[e].getBoundingInfo().boundingBox.vectorsWorld;
                            a = a.MaximizeInPlace(b[1]);
                            d = d.MinimizeInPlace(b[0])
                        } this._plane.scaling.y = Number(a.y - d.y) / 2;
                    this._plane.scaling.x = Number(a.x - d.x) / 2;
                    this._plane.scaling.z = Number(a.z - d.z) / 2
                } else this._plane.scaling.y = 20, this._plane.scaling.x = 20, this._plane.scaling.z =
                    20;
                this._plane.material = this._planeMaterial;
                this._createPlane();
                this._sendCuttingValuesToMaterials()
            };
            a.prototype.initCuttingMaterial = function () {
                var a = this._parseAllMaterials();
                this._setAllMaterialsToCut(a);
                this._sendCuttingValuesToMaterials()
            };
            a.prototype._setAllMaterialsToCut = function (a) {
                this._materialsToCut = a
            };
            a.prototype.isVisible = function () {
                return this._isVisible
            };
            a.prototype.undo = function () {
                this._editor.undo()
            };
            a.prototype.redo = function () {
                this._editor.redo()
            };
            a.prototype.enableScaling = function () {
                this._currentMode =
                    3;
                this._editor.enableScaling()
            };
            a.prototype.enableTranslation = function () {
                this._currentMode = 1;
                this._editor.enableTranslation()
            };
            a.prototype.enableRotation = function () {
                this._currentMode = 2;
                this._editor.enableRotation();
                this._editor.setRotSnap(!0)
            };
            a.prototype._resetMeshesPickable = function () {
                for (var a in this._scene.meshes) this._scene.meshes[a].material = this._originalMaterials[a], this._pickables[a] && (this._scene.meshes[a].isPickable = this._pickables[a]);
                this._pickables = []
            };
            a.prototype._parseAllMaterials =
                function () {
                    var a = [];
                    this._viewport.freeze(!1);
                    for (var d = 0; d < this._scene.meshes.length; d++)
                        if (this._scene.meshes[d]._isObjectTeia) {
                            var e = this._parseMaterial(this._scene.meshes[d].material);
                            a.push(e);
                            this._pickables[this._scene.meshes[d].id] = this._scene.meshes[d].isPickable;
                            this._scene.meshes[d].material = e
                        } this._viewport.unfreeze();
                    return a
                };
            a.prototype._parseStandardMaterial = function (a) {
                a = new BABYLON.StandardCuttingMaterial(a.name, this._scene, a);
                a.linkEmissiveWithDiffuse = !this._viewport.renduTeia;
                a.setCuttingMode(!0);
                return a
            };
            a.prototype._parseOtherMaterial = function (a) {
                a.setCuttingMode(!0);
                return a
            };
            a.prototype._parseMultiMaterial = function (a) {
                for (var d = 0; d < a.subMaterials.length; d++) a.subMaterials[d] = this._parseMaterial(a.subMaterials[d]);
                return a
            };
            a.prototype._parseMaterial = function (a) {
                if (a instanceof BABYLON.StandardMaterial) var d = this._parseStandardMaterial(a);
                else a instanceof BABYLON.MultiMaterial ? (a = a.clone(a.name + "Cutting"), d = this._parseMultiMaterial(a)) : a instanceof BABYLON.CuttingMaterial ?
                    d = this._parseOtherMaterial(a) : console.log("Other material");
                return d
            };
            a.prototype._stopCutting = function () {
                var a = this;
                this._scene.meshes.forEach(function (d) {
                    d._isObjectTeia && (d.material.dispose(), d.material = a._viewport._onRenduTeia(a._viewport._renduTeia, d.id), d.isVisible = a._viewport._teiaHierarchy[d.objectId].shouldBeVisible, d.isPickable = a._pickables[d.id])
                })
            };
            a.prototype._createPlane = function () {
                this._plane.isVisible = !0;
                this._editor = new BABYLON.EditControl(this._plane, this._viewport, 1, !1);
                1 == this._currentMode ?
                    this._editor.enableTranslation() : 2 == this._currentMode ? this._editor.enableRotation() : this._editor.enableScaling()
            };
            a.prototype.enablePickableToCuttingObjects = function () {
                for (var a in this._scene.meshes) {
                    var d = this._scene.meshes[a];
                    d._isObjectTeia && (this._plane.intersectsMesh(d) ? (d.isPickable = this._pickables[d.id], d.isVisible = this._viewport._teiaHierarchy[d.objectId].shouldBeVisible) : (d.isPickable = !1, d.isVisible = !1))
                }
            };
            a.prototype._sendCuttingValuesToMaterials = function () {
                var a = this._plane.getBoundingInfo().boundingBox.vectorsWorld,
                    d = new BABYLON.Vector4(a[1].x, a[1].y, a[1].z, 0),
                    e = new BABYLON.Vector4(a[7].x, a[7].y, a[7].z, 0),
                    b = new BABYLON.Vector4(a[6].x, a[6].y, a[6].z, 0),
                    c = new BABYLON.Vector4(a[1].x, a[1].y, a[1].z, 0),
                    g = new BABYLON.Vector4(a[1].x, a[1].y, a[1].z, 0);
                a = new BABYLON.Vector4(a[5].x, a[5].y, a[5].z, 0);
                var l = this._plane.rotationQuaternion;
                l = new BABYLON.Vector4(l.x, l.y, l.z, l.w);
                var n = d.y,
                    h = e.y,
                    k = b.x,
                    r = c.x,
                    t = g.z,
                    x = a.z,
                    q = new BABYLON.Vector3(d.x, 1E12, d.z);
                n = new BABYLON.Vector3(d.x - 2 * this._plane.scaling.x, n, d.z - 2 * this._plane.scaling.z);
                h = new BABYLON.Vector3(e.x, h, e.z);
                var m = new BABYLON.Vector3(e.x - 2 * this._plane.scaling.x, -1E11, e.z - 2 * this._plane.scaling.z),
                    u = new BABYLON.Vector3(g.x, g.y, 1E11);
                t = new BABYLON.Vector3(g.x - 2 * this._plane.scaling.x, g.y - 2 * this._plane.scaling.y, t);
                x = new BABYLON.Vector3(a.x, a.y, x);
                var y = new BABYLON.Vector3(a.x - 2 * this._plane.scaling.x, a.y - 2 * this._plane.scaling.y, -1E11);
                k = new BABYLON.Vector3(k, b.y, b.z);
                var v = new BABYLON.Vector3(-1E11, b.y - 2 * this._plane.scaling.y, b.z - 2 * this._plane.scaling.z),
                    D = new BABYLON.Vector3(1E11,
                        c.y, c.z);
                r = new BABYLON.Vector3(r, c.y - 2 * this._plane.scaling.y, e.z - 2 * this._plane.scaling.z);
                for (var w in this._materialsToCut)
                    if (this._materialsToCut[w])
                        if (this._materialsToCut[w] instanceof BABYLON.MultiMaterial)
                            for (var E = this._materialsToCut[w], F = 0; F < E.subMaterials.length; F++) {
                                var B = E.subMaterials[F];
                                B.setMaximumTop(q);
                                B.setMinimumTop(n);
                                B.setMaximumBottom(h);
                                B.setMinimumBottom(m);
                                B.setMaximumRight(D);
                                B.setMinimumRight(r);
                                B.setMinimumLeft(v);
                                B.setMaximumLeft(k);
                                B.setMaximumBack(x);
                                B.setMinimumBack(y);
                                B.setMaximumFront(u);
                                B.setMinimumFront(t);
                                B.setPlanePositionTop(d);
                                B.setPlanePositionBottom(e);
                                B.setPlanePositionFront(g);
                                B.setPlanePositionBack(a);
                                B.setPlanePositionLeft(b);
                                B.setPlanePositionRight(c);
                                B.setPlaneQuaternion(l)
                            } else this._materialsToCut[w] instanceof BABYLON.CuttingMaterial && (this._materialsToCut[w].setMaximumTop(q), this._materialsToCut[w].setMinimumTop(n), this._materialsToCut[w].setMaximumBottom(h), this._materialsToCut[w].setMinimumBottom(m), this._materialsToCut[w].setMaximumRight(D),
                                this._materialsToCut[w].setMinimumRight(r), this._materialsToCut[w].setMinimumLeft(v), this._materialsToCut[w].setMaximumLeft(k), this._materialsToCut[w].setMaximumBack(x), this._materialsToCut[w].setMinimumBack(y), this._materialsToCut[w].setMaximumFront(u), this._materialsToCut[w].setMinimumFront(t), this._materialsToCut[w].setPlanePositionTop(d), this._materialsToCut[w].setPlanePositionBottom(e), this._materialsToCut[w].setPlanePositionFront(g), this._materialsToCut[w].setPlanePositionBack(a), this._materialsToCut[w].setPlanePositionLeft(b),
                                this._materialsToCut[w].setPlanePositionRight(c), this._materialsToCut[w].setPlaneQuaternion(l))
            };
            a.prototype.showCuttingPlane = function () {
                this._isVisible || (this._plane.showBoundingBox = !0, this._editor = new BABYLON.EditControl(this._plane, this._viewport, 1, !1), 1 == this._currentMode ? this._editor.enableTranslation() : 2 == this._currentMode ? (this._editor.enableRotation(), this._editor.setRotSnap(!0)) : this._editor.enableScaling(), this._isVisible = !0, this._canvas.addEventListener("pointermove", this._mouseMove, !1),
                    this._sendCuttingValuesToMaterials())
            };
            a.prototype.disabled = function () {
                this._viewport.freeze(!1);
                this.isEnabled() && (this._stopCutting(), this._editor.detach(), this._editor = null, this._isEnabled = this._isVisible = this._plane.isVisible = !1, this._canvas.removeEventListener("pointerup", this._mouseUp), this._canvas.removeEventListener("pointermove", this._mouseMove));
                this._viewport.unfreeze()
            };
            a.prototype.hideCuttingPlane = function () {};
            a.prototype._launchEvents = function () {};
            a.prototype._onMouseUp = function (a) {
                this._sendCuttingValuesToMaterials();
                this.enablePickableToCuttingObjects()
            };
            a.prototype._onMouseMove = function (a) {
                this._sendCuttingValuesToMaterials();
                this.enablePickableToCuttingObjects()
            };
            return a
        }();
        a.CuttingPlane = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    var k = a.Axis,
        m = a.Color3,
        h = a.Mesh,
        f = a.MeshBuilder,
        d = a.Path2,
        e = a.Quaternion,
        b = a.Space,
        c = a.StandardMaterial,
        g = a.Vector3,
        l;
    (function (c) {
        c[c.TRANS = 0] = "TRANS";
        c[c.ROT = 1] = "ROT";
        c[c.SCALE = 2] = "SCALE"
    })(l || (l = {}));
    var n = function () {
        function n(c, a, b, d) {
            var l = this;
            this.local = !0;
            this.snapR = this.snapT = !1;
            this.transSnap = 1;
            this.rotSnap = Math.PI / 18;
            this.axesLen = .4;
            this.axesScale = 1;
            this.visibility = .7;
            this.distFromCamera = 2;
            this.toParent = new g(0, 0, 0);
            this.cameraNormal = new g(0, 0, 0);
            this.actionListener = null;
            this.editing = this.pointerIsOver = this.pDown = !1;
            this.snapRZ = this.snapRY = this.snapRX = 0;
            this.snapTV = new g(0, 0, 0);
            this.transBy = new g(0, 0, 0);
            this.snapS = !1;
            this.snapSA = this.snapSZ = this.snapSY = this.snapSX = 0;
            this.snapSV = new g(0, 0, 0);
            this.scaleSnap = .25;
            this.scale = new g(0, 0, 0);
            this.eulerian = !1;
            this.snapRA = 0;
            this.cN = new g(0, 0, 0);
            this.scaleEnabled = this.rotEnabled = this.transEnabled = !1;
            this.localX = new g(0, 0, 0);
            this.localY = new g(0, 0, 0);
            this.localZ = new g(0, 0, 0);
            this.mesh = c;
            this.owner = a;
            this.canvas = a.canvas;
            this.axesScale =
                b;
            this.eulerian = null !== d ? d : !1;
            this.checkQuaternion();
            this.scene = c.getScene();
            this.mainCamera = a.activeViewport.activeCamera;
            this.actHist = new C(c, 10);
            c.computeWorldMatrix(!0);
            this.theParent = new h("EditControl", this.scene);
            this.theParent.rotationQuaternion = e.Identity();
            this.theParent.visibility = 0;
            this.theParent.isPickable = !1;
            this.createMaterials(this.scene);
            this.createGuideAxes();
            this.guideCtl.parent = this.theParent;
            this.createPickPlanes();
            this.pickPlanes.parent = this.theParent;
            this.pointerdown = function (c) {
                return l.onPointerDown(c)
            };
            this.pointerup = function (c) {
                return l.onPointerUp(c)
            };
            this.pointermove = function (c) {
                return l.onPointerMove(c)
            };
            this.canvas.addEventListener("pointerdown", this.pointerdown, !1);
            this.canvas.addEventListener("pointerup", this.pointerup, !1);
            this.canvas.addEventListener("pointermove", this.pointermove, !1);
            this.setLocalAxes(c);
            this.renderer = function () {
                return l.renderLoopProcess()
            };
            this.scene.registerBeforeRender(this.renderer)
        }
        n.prototype.checkQuaternion = function () {
            if (!this.eulerian && (null == this.mesh.rotationQuaternion ||
                    void 0 == this.mesh.rotationQuaternion)) throw "Error: Eulerian is set to false but the mesh's rotationQuaternion is not set.";
        };
        n.prototype.setAxesScale = function () {
            this.theParent.position.subtractToRef(this.mainCamera.position, this.toParent);
            g.FromFloatArrayToRef(this.mainCamera.getWorldMatrix().asArray(), 8, this.cameraNormal);
            var c = g.Dot(this.toParent, this.cameraNormal) / this.cameraNormal.length() / this.distFromCamera;
            g.FromFloatsToRef(c, c, c, this.theParent.scaling);
            g.FromFloatsToRef(c, c, c, this.pALL.scaling)
        };
        n.prototype.setAxesRotation = function () {
            if (this.local)
                if (this.eulerian) {
                    var c = this.mesh.rotation;
                    this.theParent.rotationQuaternion.copyFrom(a.Quaternion.RotationYawPitchRoll(c.y, c.x, c.z))
                } else this.theParent.rotationQuaternion = this.mesh.rotationQuaternion
        };
        n.prototype.renderLoopProcess = function () {
            this.theParent.position = this.mesh.getAbsolutePivotPoint();
            this.setAxesScale();
            this.setAxesRotation();
            this.onPointerOver()
        };
        n.prototype.switchTo = function (c, a) {
            c.computeWorldMatrix(!0);
            this.mesh = c;
            null != a &&
                (this.eulerian = a);
            this.checkQuaternion();
            this.setLocalAxes(c);
            this.actHist = new C(c, 10)
        };
        n.prototype.setUndoCount = function (c) {
            this.actHist.setCapacity(c)
        };
        n.prototype.undo = function () {
            var c = this.actHist.undo();
            this.mesh.computeWorldMatrix(!0);
            this.setLocalAxes(this.mesh);
            this.callActionListener(c)
        };
        n.prototype.redo = function () {
            var c = this.actHist.redo();
            this.mesh.computeWorldMatrix(!0);
            this.setLocalAxes(this.mesh);
            this.callActionListener(c)
        };
        n.prototype.detach = function () {
            this.canvas.removeEventListener("pointerdown",
                this.pointerdown, !1);
            this.canvas.removeEventListener("pointerup", this.pointerup, !1);
            this.canvas.removeEventListener("pointermove", this.pointermove, !1);
            this.scene.unregisterBeforeRender(this.renderer);
            this.removeActionListener();
            this.disposeAll()
        };
        n.prototype.disposeAll = function () {
            this.theParent.dispose();
            this.disposeMaterials();
            this.actHist = null
        };
        n.prototype.addActionListener = function (c) {
            this.actionListener = c
        };
        n.prototype.removeActionListener = function () {
            this.actionListener = null
        };
        n.prototype.onPointerDown =
            function (c) {
                var a = this;
                c.preventDefault();
                this.pDown = !0;
                0 == c.button && (c = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (c) {
                    if (a.transEnabled) {
                        if (c == a.tX || c == a.tY || c == a.tZ || c == a.tXZ || c == a.tZY || c == a.tYX || c == a.tAll) return !0
                    } else if (a.rotEnabled) {
                        if (c == a.rX || c == a.rY || c == a.rZ || c == a.rAll) return !0
                    } else if (a.scaleEnabled && (c == a.sX || c == a.sY || c == a.sZ || c == a.sXZ || c == a.sZY || c == a.sYX || c == a.sAll)) return !0;
                    return !1
                }, null, this.mainCamera), void 0 != c && c.hit && (this.axisPicked = c.pickedMesh, c = this.axisPicked.getChildren(),
                    0 < c.length ? c[0].visibility = this.visibility : this.axisPicked.visibility = this.visibility, c = this.axisPicked.name, "X" == c ? this.bXaxis.visibility = 1 : "Y" == c ? this.bYaxis.visibility = 1 : "Z" == c ? this.bZaxis.visibility = 1 : "XZ" == c ? (this.bXaxis.visibility = 1, this.bZaxis.visibility = 1) : "ZY" == c ? (this.bZaxis.visibility = 1, this.bYaxis.visibility = 1) : "YX" == c ? (this.bYaxis.visibility = 1, this.bXaxis.visibility = 1) : "ALL" == c && (this.bXaxis.visibility = 1, this.bYaxis.visibility = 1, this.bZaxis.visibility = 1), this.editing = !0, this.pickPlane =
                    this.getPickPlane(this.axisPicked), this.prevPos = this.getPosOnPickPlane(), window.setTimeout(function (c, b) {
                        return a.detachControl(c, b)
                    }, 0, this.mainCamera, this.canvas)))
            };
        n.prototype.isEditing = function () {
            return this.editing
        };
        n.prototype.detachControl = function (c, a) {
            c.detachControl(a)
        };
        n.prototype.isPointerOver = function () {
            return this.pointerIsOver
        };
        n.prototype.onPointerOver = function () {
            var c = this;
            if (!this.pDown) {
                var a = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (a) {
                    if (c.transEnabled) {
                        if (a ==
                            c.tX || a == c.tY || a == c.tZ || a == c.tXZ || a == c.tZY || a == c.tYX || a == c.tAll) return !0
                    } else if (c.rotEnabled) {
                        if (a == c.rX || a == c.rY || a == c.rZ || a == c.rAll) return !0
                    } else if (c.scaleEnabled && (a == c.sX || a == c.sY || a == c.sZ || a == c.sXZ || a == c.sZY || a == c.sYX || a == c.sAll)) return !0;
                    return !1
                }, null, this.mainCamera);
                void 0 != a && (a.hit ? a.pickedMesh != this.prevOverMesh && (this.pointerIsOver = !0, this.clearPrevOverMesh(), this.prevOverMesh = a.pickedMesh, this.rotEnabled ? (this.savedCol = this.prevOverMesh.getChildren()[0].color, this.prevOverMesh.getChildren()[0].color =
                    m.White()) : (a = this.prevOverMesh.getChildren(), 0 < a.length ? (this.savedMat = a[0].material, a[0].material = this.whiteMat) : (this.savedMat = this.prevOverMesh.material, this.prevOverMesh.material = this.whiteMat)), "X" == this.prevOverMesh.name ? this.xaxis.color = m.White() : "Y" == this.prevOverMesh.name ? this.yaxis.color = m.White() : "Z" == this.prevOverMesh.name && (this.zaxis.color = m.White())) : (this.pointerIsOver = !1, null != this.prevOverMesh && (this.restoreColor(this.prevOverMesh), this.prevOverMesh = null)))
            }
        };
        n.prototype.clearPrevOverMesh =
            function () {
                null != this.prevOverMesh && (this.prevOverMesh.visibility = 0, this.restoreColor(this.prevOverMesh))
            };
        n.prototype.restoreColor = function (c) {
            if (c) {
                switch (c.name) {
                    case "X":
                        this.xaxis.color = m.Red();
                        break;
                    case "Y":
                        this.yaxis.color = m.Green();
                        break;
                    case "Z":
                        this.zaxis.color = m.Blue()
                }
                if (this.rotEnabled) c.getChildren()[0].color = this.savedCol;
                else {
                    var a = c.getChildren();
                    0 < a.length ? a[0].material = this.savedMat : c.material = this.savedMat
                }
            }
        };
        n.prototype.onPointerUp = function (c) {
            this.pDown = !1;
            this.editing && (this.mainCamera.attachControl(this.canvas),
                this.editing = !1, this.hideBaxis(), this.restoreColor(this.prevOverMesh), this.prevOverMesh = null, c = this.getActionType(), this.actHist.add(c), this.callActionListener(c))
        };
        n.prototype.getActionType = function () {
            var c = null;
            this.transEnabled ? c = l.TRANS : this.rotEnabled ? c = l.ROT : this.scaleEnabled && (c = l.SCALE);
            return c
        };
        n.prototype.callActionListener = function (c) {
            null != this.actionListener && window.setTimeout(this.actionListener, 0, c)
        };
        n.prototype.onPointerMove = function (c) {
            if (this.pDown && this.editing && (this.pickPlane =
                    this.getPickPlane(this.axisPicked), c = this.getPosOnPickPlane(), null != c)) {
                var a = c.subtract(this.prevPos);
                if (0 != a.x || 0 != a.y || 0 != a.z) this.transEnabled && this.doTranslation(a), this.scaleEnabled && this.local && this.doScaling(a), this.rotEnabled && this.doRotation(this.mesh, this.axisPicked, c), this.prevPos = c
            }
        };
        n.prototype.getPickPlane = function (c) {
            c = c.name;
            if (this.transEnabled || this.scaleEnabled) {
                if ("XZ" == c) return this.pXZ;
                if ("ZY" == c) return this.pZY;
                if ("YX" == c) return this.pYX;
                if ("ALL" == c) return this.pALL;
                var a =
                    this.mesh.getWorldMatrix().clone().invert();
                a = g.TransformCoordinates(this.mainCamera.position, a);
                var b = this.mesh.scaling;
                if ("X" === c) return Math.abs(a.y * b.y) > Math.abs(a.z * b.z) ? this.pXZ : this.pYX;
                if ("Z" === c) return Math.abs(a.y * b.y) > Math.abs(a.x * b.x) ? this.pXZ : this.pZY;
                if ("Y" === c) return Math.abs(a.z * b.z) > Math.abs(a.x * b.x) ? this.pYX : this.pZY
            } else if (this.rotEnabled) switch (c) {
                case "X":
                    return this.pZY;
                case "Y":
                    return this.pXZ;
                case "Z":
                    return this.pYX;
                default:
                    return this.pALL
            } else return null
        };
        n.prototype.doTranslation =
            function (c) {
                this.transBy.x = 0;
                this.transBy.y = 0;
                this.transBy.z = 0;
                var a = this.axisPicked.name;
                if ("X" == a || "XZ" == a || "YX" == a || "ALL" == a) this.transBy.x = this.local ? g.Dot(c, this.localX) / (this.localX.length() * this.mesh.scaling.x) : c.x;
                if ("Y" == a || "ZY" == a || "YX" == a || "ALL" == a) this.transBy.y = this.local ? g.Dot(c, this.localY) / (this.localY.length() * this.mesh.scaling.y) : c.y;
                if ("Z" == a || "XZ" == a || "ZY" == a || "ALL" == a) this.transBy.z = this.local ? g.Dot(c, this.localZ) / (this.localZ.length() * this.mesh.scaling.z) : c.z;
                this.transWithSnap(this.mesh,
                    this.transBy, this.local);
                this.mesh.computeWorldMatrix(!0)
            };
        n.prototype.transWithSnap = function (c, a, e) {
            if (this.snapT) {
                var d = !1;
                this.snapTV.addInPlace(a);
                Math.abs(this.snapTV.x) > this.tSnap.x / c.scaling.x && (a.x = 0 < this.snapTV.x ? this.tSnap.x : -this.tSnap.x, a.x /= c.scaling.x, d = !0);
                Math.abs(this.snapTV.y) > this.tSnap.y / c.scaling.y && (a.y = 0 < this.snapTV.y ? this.tSnap.y : -this.tSnap.y, a.y /= c.scaling.y, d = !0);
                Math.abs(this.snapTV.z) > this.tSnap.z / c.scaling.z && (a.z = 0 < this.snapTV.z ? this.tSnap.z : -this.tSnap.z, a.z /= c.scaling.z,
                    d = !0);
                if (!d) return;
                Math.abs(a.x) !== this.tSnap.x / c.scaling.x && (a.x = 0);
                Math.abs(a.y) !== this.tSnap.y / c.scaling.y && (a.y = 0);
                Math.abs(a.z) !== this.tSnap.z / c.scaling.z && (a.z = 0);
                g.FromFloatsToRef(0, 0, 0, this.snapTV)
            }
            e ? (this.mesh.translate(k.X, a.x, b.LOCAL), this.mesh.translate(k.Y, a.y, b.LOCAL), this.mesh.translate(k.Z, a.z, b.LOCAL)) : this.mesh.position.addInPlace(a)
        };
        n.prototype.doScaling = function (c) {
            this.scale.x = 0;
            this.scale.y = 0;
            this.scale.z = 0;
            var a = this.axisPicked.name;
            if ("X" == a || "XZ" == a || "YX" == a) this.scale.x =
                g.Dot(c, this.localX) / this.localX.length();
            if ("Y" == a || "ZY" == a || "YX" == a) this.scale.y = g.Dot(c, this.localY) / this.localY.length();
            if ("Z" == a || "XZ" == a || "ZY" == a) this.scale.z = g.Dot(c, this.localZ) / this.localZ.length();
            "ALL" == a ? (c = g.Dot(c, this.mainCamera.upVector), this.scale.copyFromFloats(c, c, c)) : "XZ" == a ? Math.abs(this.scale.x) > Math.abs(this.scale.z) ? this.scale.z = this.scale.x : this.scale.x = this.scale.z : "ZY" == a ? Math.abs(this.scale.z) > Math.abs(this.scale.y) ? this.scale.y = this.scale.z : this.scale.z = this.scale.y : "YX" ==
                a && (Math.abs(this.scale.y) > Math.abs(this.scale.x) ? this.scale.x = this.scale.y : this.scale.y = this.scale.x);
            this.scaleWithSnap(this.mesh, this.scale)
        };
        n.prototype.scaleWithSnap = function (c, a) {
            if (this.snapS) {
                var b = !1;
                this.snapSV.addInPlace(a);
                Math.abs(this.snapSV.x) > this.scaleSnap && (a.x = 0 < a.x ? this.scaleSnap : -this.scaleSnap, b = !0);
                Math.abs(this.snapSV.y) > this.scaleSnap && (a.y = 0 < a.y ? this.scaleSnap : -this.scaleSnap, b = !0);
                Math.abs(this.snapSV.z) > this.scaleSnap && (a.z = 0 < a.z ? this.scaleSnap : -this.scaleSnap, b = !0);
                if (!b) return;
                Math.abs(a.x) !== this.scaleSnap && 0 !== a.x && (a.x = 0);
                Math.abs(a.y) !== this.scaleSnap && 0 !== a.y && (a.y = 0);
                Math.abs(a.z) !== this.scaleSnap && 0 !== a.z && (a.z = 0);
                g.FromFloatsToRef(0, 0, 0, this.snapSV)
            }
            c.scaling.addInPlace(a)
        };
        n.prototype.doRotation = function (c, a, e) {
            var d = this.cN;
            g.TransformNormalToRef(k.Z, this.mainCamera.getWorldMatrix(), d);
            e = n.getAngle(this.prevPos, e, c.getAbsolutePivotPoint(), d);
            a == this.rX ? (this.snapR && (this.snapRX += e, e = 0, Math.abs(this.snapRX) >= this.rotSnap && (e = 0 < this.snapRX ? this.rotSnap : -this.rotSnap,
                this.snapRX = 0)), 0 !== e && (this.local ? (0 > g.Dot(this.localX, d) && (e *= -1), c.rotate(k.X, e, b.LOCAL)) : c.rotate(new g(d.x, 0, 0), e, b.WORLD))) : a == this.rY ? (this.snapR && (this.snapRY += e, e = 0, Math.abs(this.snapRY) >= this.rotSnap && (e = 0 < this.snapRY ? this.rotSnap : -this.rotSnap, this.snapRY = 0)), 0 !== e && (this.local ? (0 > g.Dot(this.localY, d) && (e *= -1), c.rotate(k.Y, e, b.LOCAL)) : c.rotate(new g(0, d.y, 0), e, b.WORLD))) : a == this.rZ ? (this.snapR && (this.snapRZ += e, e = 0, Math.abs(this.snapRZ) >= this.rotSnap && (e = 0 < this.snapRZ ? this.rotSnap : -this.rotSnap,
                this.snapRZ = 0)), 0 !== e && (this.local ? (0 > g.Dot(this.localZ, d) && (e *= -1), c.rotate(k.Z, e, b.LOCAL)) : c.rotate(new g(0, 0, d.z), e, b.WORLD))) : a == this.rAll && (this.snapR && (this.snapRA += e, e = 0, Math.abs(this.snapRA) >= this.rotSnap && (e = 0 < this.snapRA ? this.rotSnap : -this.rotSnap, this.snapRA = 0)), 0 !== e && c.rotate(c.position.subtract(this.mainCamera.position), e, b.WORLD));
            this.setLocalAxes(this.mesh);
            this.eulerian && (c.rotation = c.rotationQuaternion.toEulerAngles(), c.rotationQuaternion = null)
        };
        n.prototype.getPosOnPickPlane = function () {
            var c =
                this,
                a = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (a) {
                    return a == c.pickPlane
                }, null, this.mainCamera);
            return void 0 != a ? a.hit ? a.pickedPoint : null : null
        };
        n.prototype.hideBaxis = function () {
            this.bXaxis.visibility = 0;
            this.bYaxis.visibility = 0;
            this.bZaxis.visibility = 0
        };
        n.prototype.isTranslationEnabled = function () {
            return this.transEnabled
        };
        n.prototype.enableTranslation = function () {
            null == this.tX && (this.createTransAxes(), this.tCtl.parent = this.theParent);
            this.clearPrevOverMesh();
            this.transEnabled ||
                (this.tEndX.visibility = this.visibility, this.tEndY.visibility = this.visibility, this.tEndZ.visibility = this.visibility, this.tEndXZ.visibility = this.visibility, this.tEndZY.visibility = this.visibility, this.tEndYX.visibility = this.visibility, this.tEndAll.visibility = this.visibility, this.transEnabled = !0, this.disableRotation(), this.disableScaling())
        };
        n.prototype.disableTranslation = function () {
            this.transEnabled && (this.tEndX.visibility = 0, this.tEndY.visibility = 0, this.tEndZ.visibility = 0, this.tEndXZ.visibility = 0, this.tEndZY.visibility =
                0, this.tEndYX.visibility = 0, this.tEndAll.visibility = 0, this.transEnabled = !1)
        };
        n.prototype.isRotationEnabled = function () {
            return this.rotEnabled
        };
        n.prototype.returnEuler = function (c) {
            this.eulerian = c
        };
        n.prototype.enableRotation = function () {
            null == this.rX && (this.createRotAxes(), this.rCtl.parent = this.theParent);
            this.clearPrevOverMesh();
            this.rotEnabled || (this.rEndX.visibility = this.visibility, this.rEndY.visibility = this.visibility, this.rEndZ.visibility = this.visibility, this.rEndAll.visibility = this.visibility, this.rotEnabled = !0, this.disableTranslation(), this.disableScaling())
        };
        n.prototype.disableRotation = function () {
            this.rotEnabled && (this.rEndX.visibility = 0, this.rEndY.visibility = 0, this.rEndZ.visibility = 0, this.rEndAll.visibility = 0, this.rotEnabled = !1)
        };
        n.prototype.isScalingEnabled = function () {
            return this.scaleEnabled
        };
        n.prototype.enableScaling = function () {
            null == this.sX && (this.createScaleAxes(), this.sCtl.parent = this.theParent);
            this.clearPrevOverMesh();
            this.scaleEnabled || (this.sEndX.visibility = this.visibility, this.sEndY.visibility =
                this.visibility, this.sEndZ.visibility = this.visibility, this.sEndXZ.visibility = this.visibility, this.sEndZY.visibility = this.visibility, this.sEndYX.visibility = this.visibility, this.sEndAll.visibility = this.visibility, this.scaleEnabled = !0, this.disableTranslation(), this.disableRotation())
        };
        n.prototype.disableScaling = function () {
            this.scaleEnabled && (this.sEndX.visibility = 0, this.sEndY.visibility = 0, this.sEndZ.visibility = 0, this.sEndXZ.visibility = 0, this.sEndZY.visibility = 0, this.sEndYX.visibility = 0, this.sEndAll.visibility =
                0, this.scaleEnabled = !1)
        };
        n.prototype.createGuideAxes = function () {
            this.guideCtl = new h("guideCtl", this.scene);
            this.bXaxis = h.CreateLines("bxAxis", [new g(-100, 0, 0), new g(100, 0, 0)], this.scene);
            this.bYaxis = h.CreateLines("byAxis", [new g(0, -100, 0), new g(0, 100, 0)], this.scene);
            this.bZaxis = h.CreateLines("bzAxis", [new g(0, 0, -100), new g(0, 0, 100)], this.scene);
            this.bXaxis.isPickable = !1;
            this.bYaxis.isPickable = !1;
            this.bZaxis.isPickable = !1;
            this.bXaxis._isObjectTeia = !1;
            this.bYaxis._isObjectTeia = !1;
            this.bZaxis._isObjectTeia = !1;
            this.bXaxis.parent = this.guideCtl;
            this.bYaxis.parent = this.guideCtl;
            this.bZaxis.parent = this.guideCtl;
            this.bXaxis.color = m.Red();
            this.bYaxis.color = m.Green();
            this.bZaxis.color = m.Blue();
            null != this.owner._octree && (this.owner._octree.addMesh(this.bXaxis), this.owner._octree.addMesh(this.bYaxis), this.owner._octree.addMesh(this.bZaxis));
            this.hideBaxis();
            var c = this.axesLen * this.axesScale;
            this.xaxis = h.CreateLines("xAxis", [new g(0, 0, 0), new g(c, 0, 0)], this.scene);
            this.yaxis = h.CreateLines("yAxis", [new g(0, 0, 0),
                new g(0, c, 0)
            ], this.scene);
            this.zaxis = h.CreateLines("zAxis", [new g(0, 0, 0), new g(0, 0, c)], this.scene);
            this.xaxis._isObjectTeia = !1;
            this.xaxis._isObjectTeia = !1;
            this.xaxis._isObjectTeia = !1;
            null != this.owner._octree && (this.owner._octree.addMesh(this.xaxis), this.owner._octree.addMesh(this.yaxis), this.owner._octree.addMesh(this.zaxis));
            this.xaxis.isPickable = !1;
            this.yaxis.isPickable = !1;
            this.zaxis.isPickable = !1;
            this.xaxis.parent = this.guideCtl;
            this.yaxis.parent = this.guideCtl;
            this.zaxis.parent = this.guideCtl;
            this.xaxis.color =
                m.Red();
            this.yaxis.color = m.Green();
            this.zaxis.color = m.Blue();
            this.xaxis.renderingGroupId = 2;
            this.yaxis.renderingGroupId = 2;
            this.zaxis.renderingGroupId = 2
        };
        n.prototype.createPickPlanes = function () {
            this.pALL = h.CreatePlane("pALL", 5, this.scene);
            this.pXZ = h.CreatePlane("pXZ", 5, this.scene);
            this.pZY = h.CreatePlane("pZY", 5, this.scene);
            this.pYX = h.CreatePlane("pYX", 5, this.scene);
            null != this.owner._octree && (this.owner._octree.addMesh(this.pALL), this.owner._octree.addMesh(this.pXZ), this.owner._octree.addMesh(this.pZY),
                this.owner._octree.addMesh(this.pYX));
            this.pALL._isObjectTeia = !1;
            this.pXZ._isObjectTeia = !1;
            this.pZY._isObjectTeia = !1;
            this.pZY._isObjectTeia = !1;
            this.pALL.isPickable = !1;
            this.pXZ.isPickable = !1;
            this.pZY.isPickable = !1;
            this.pYX.isPickable = !1;
            this.pALL.visibility = 0;
            this.pXZ.visibility = 0;
            this.pZY.visibility = 0;
            this.pYX.visibility = 0;
            this.pALL.renderingGroupId = 1;
            this.pXZ.renderingGroupId = 1;
            this.pZY.renderingGroupId = 1;
            this.pYX.renderingGroupId = 1;
            this.pALL.billboardMode = h.BILLBOARDMODE_ALL;
            this.pXZ.rotate(k.X,
                1.57);
            this.pZY.rotate(k.Y, 1.57);
            this.pickPlanes = new h("pickPlanes", this.scene);
            null != this.owner._octree && this.owner._octree.addMesh(this.pickPlanes);
            this.pALL.parent = this.theParent;
            this.pXZ.parent = this.pickPlanes;
            this.pZY.parent = this.pickPlanes;
            this.pYX.parent = this.pickPlanes
        };
        n.prototype.createTransAxes = function () {
            var c = .04 * this.axesScale,
                a = this.axesLen * this.axesScale;
            this.tCtl = new h("tarnsCtl", this.scene);
            this.tX = this.extrudeBox(c / 2, a);
            this.tX.name = "X";
            this.tY = this.tX.clone("Y");
            this.tZ = this.tX.clone("Z");
            this.tXZ = f.CreatePlane("XZ", {
                size: 2 * c
            }, this.scene);
            this.tZY = this.tXZ.clone("ZY");
            this.tYX = this.tXZ.clone("YX");
            this.tXZ.rotation.x = 1.57;
            this.tZY.rotation.y = -1.57;
            this.tXZ.position.x = c;
            this.tXZ.position.z = c;
            this.tZY.position.z = c;
            this.tZY.position.y = c;
            this.tYX.position.y = c;
            this.tYX.position.x = c;
            this.tAll = h.CreateBox("ALL", 2 * c, this.scene);
            this.tX.parent = this.tCtl;
            this.tY.parent = this.tCtl;
            this.tZ.parent = this.tCtl;
            this.tXZ.parent = this.tCtl;
            this.tZY.parent = this.tCtl;
            this.tYX.parent = this.tCtl;
            this.tAll.parent =
                this.tCtl;
            this.tX.rotation.y = 1.57;
            this.tY.rotation.x -= 1.57;
            this.tX.visibility = 0;
            this.tY.visibility = 0;
            this.tZ.visibility = 0;
            this.tXZ.visibility = 0;
            this.tZY.visibility = 0;
            this.tYX.visibility = 0;
            this.tAll.visibility = 0;
            this.tX.renderingGroupId = 1;
            this.tY.renderingGroupId = 1;
            this.tZ.renderingGroupId = 1;
            this.tXZ.renderingGroupId = 1;
            this.tZY.renderingGroupId = 1;
            this.tYX.renderingGroupId = 1;
            this.tAll.renderingGroupId = 1;
            this.tX.isPickable = !1;
            this.tY.isPickable = !1;
            this.tZ.isPickable = !1;
            this.tXZ.isPickable = !1;
            this.tZY.isPickable = !1;
            this.tYX.isPickable = !1;
            this.tAll.isPickable = !1;
            var b = a / 5;
            this.tEndX = h.CreateCylinder("tEndX", b, 0, c, 6, 1, this.scene);
            this.tEndY = this.tEndX.clone("tEndY");
            this.tEndZ = this.tEndX.clone("tEndZ");
            this.tEndXZ = this.createTriangle("XZ", 1.75 * c, this.scene);
            this.tEndZY = this.tEndXZ.clone("ZY");
            this.tEndYX = this.tEndXZ.clone("YX");
            this.tEndAll = f.CreatePolyhedron("tEndAll", {
                type: 1,
                size: c / 2
            }, this.scene);
            this.tEndX.rotation.x = 1.57;
            this.tEndY.rotation.x = 1.57;
            this.tEndZ.rotation.x = 1.57;
            this.tEndXZ.rotation.x = -1.57;
            this.tEndZY.rotation.x = -1.57;
            this.tEndYX.rotation.x = -1.57;
            this.tEndX.parent = this.tX;
            this.tEndY.parent = this.tY;
            this.tEndZ.parent = this.tZ;
            this.tEndXZ.parent = this.tXZ;
            this.tEndZY.parent = this.tZY;
            this.tEndYX.parent = this.tYX;
            this.tEndAll.parent = this.tAll;
            this.tEndX.position.z = a - b / 2;
            this.tEndY.position.z = a - b / 2;
            this.tEndZ.position.z = a - b / 2;
            this.tEndX.material = this.redMat;
            this.tEndY.material = this.greenMat;
            this.tEndZ.material = this.blueMat;
            this.tEndXZ.material = this.redMat;
            this.tEndZY.material = this.blueMat;
            this.tEndYX.material =
                this.greenMat;
            this.tEndAll.material = this.yellowMat;
            this.tEndX.renderingGroupId = 1;
            this.tEndY.renderingGroupId = 1;
            this.tEndZ.renderingGroupId = 1;
            this.tEndXZ.renderingGroupId = 1;
            this.tEndZY.renderingGroupId = 1;
            this.tEndYX.renderingGroupId = 1;
            this.tEndAll.renderingGroupId = 1;
            this.tEndX.isPickable = !1;
            this.tEndY.isPickable = !1;
            this.tEndZ.isPickable = !1;
            this.tEndXZ.isPickable = !1;
            this.tEndZY.isPickable = !1;
            this.tEndYX.isPickable = !1;
            this.tEndAll.isPickable = !1;
            null != this.owner._octree && (this.owner._octree.addMesh(this.tCtl),
                this.owner._octree.addMesh(this.tX), this.owner._octree.addMesh(this.tY), this.owner._octree.addMesh(this.tZ), this.owner._octree.addMesh(this.tXZ), this.owner._octree.addMesh(this.tZY), this.owner._octree.addMesh(this.tYX), this.owner._octree.addMesh(this.tAll), this.owner._octree.addMesh(this.tEndX), this.owner._octree.addMesh(this.tEndY), this.owner._octree.addMesh(this.tEndZ), this.owner._octree.addMesh(this.tEndXZ), this.owner._octree.addMesh(this.tEndZY), this.owner._octree.addMesh(this.tEndYX), this.owner._octree.addMesh(this.tEndAll));
            this.tCtl._isObjectTeia = !1;
            this.tX._isObjectTeia = !1;
            this.tY._isObjectTeia = !1;
            this.tZ._isObjectTeia = !1;
            this.tXZ._isObjectTeia = !1;
            this.tZY._isObjectTeia = !1;
            this.tYX._isObjectTeia = !1;
            this.tAll._isObjectTeia = !1;
            this.tEndX._isObjectTeia = !1;
            this.tEndY._isObjectTeia = !1;
            this.tEndZ._isObjectTeia = !1;
            this.tEndXZ._isObjectTeia = !1;
            this.tEndZY._isObjectTeia = !1;
            this.tEndYX._isObjectTeia = !1;
            this.tEndAll._isObjectTeia = !1
        };
        n.prototype.createTriangle = function (c, b, g) {
            b = (new d(b / 2, -b / 2)).addLineTo(b / 2, b / 2).addLineTo(-b /
                2, b / 2).addLineTo(b / 2, -b / 2);
            return (new a.PolygonMeshBuilder(c, b, g)).build()
        };
        n.prototype.createRotAxes = function () {
            var c = this.axesLen * this.axesScale * 2;
            this.rCtl = new h("rotCtl", this.scene);
            this.rX = this.createTube(c / 2, 90);
            this.rX.name = "X";
            this.rY = this.rX.clone("Y");
            this.rZ = this.rX.clone("Z");
            this.rAll = this.createTube(c / 1.75, 360);
            this.rAll.name = "ALL";
            this.rX.parent = this.rCtl;
            this.rY.parent = this.rCtl;
            this.rZ.parent = this.rCtl;
            this.rAll.parent = this.pALL;
            this.rX.rotation.z = 1.57;
            this.rZ.rotation.x = -1.57;
            this.rAll.rotation.x =
                1.57;
            this.rX.visibility = 0;
            this.rY.visibility = 0;
            this.rZ.visibility = 0;
            this.rAll.visibility = 0;
            this.rX.renderingGroupId = 1;
            this.rY.renderingGroupId = 1;
            this.rZ.renderingGroupId = 1;
            this.rAll.renderingGroupId = 1;
            this.rX.isPickable = !1;
            this.rY.isPickable = !1;
            this.rZ.isPickable = !1;
            this.rAll.isPickable = !1;
            this.rEndX = this.createCircle(c / 2, 90);
            this.rEndY = this.rEndX.clone("");
            this.rEndZ = this.rEndX.clone("");
            this.rEndAll = this.createCircle(c / 1.75, 360);
            this.rEndX.parent = this.rX;
            this.rEndY.parent = this.rY;
            this.rEndZ.parent =
                this.rZ;
            this.rEndAll.parent = this.rAll;
            this.rEndX.color = m.Red();
            this.rEndY.color = m.Green();
            this.rEndZ.color = m.Blue();
            this.rEndAll.color = m.Yellow();
            this.rEndX.renderingGroupId = 1;
            this.rEndY.renderingGroupId = 1;
            this.rEndZ.renderingGroupId = 1;
            this.rEndAll.renderingGroupId = 1;
            this.rEndX.isPickable = !1;
            this.rEndY.isPickable = !1;
            this.rEndZ.isPickable = !1;
            this.rEndAll.isPickable = !1;
            null != this.owner._octree && (this.owner._octree.addMesh(this.rEndX), this.owner._octree.addMesh(this.rEndY), this.owner._octree.addMesh(this.rEndZ),
                this.owner._octree.addMesh(this.rEndAll), this.owner._octree.addMesh(this.rX), this.owner._octree.addMesh(this.rY), this.owner._octree.addMesh(this.rZ), this.owner._octree.addMesh(this.rAll));
            this.rEndX._isObjectTeia = !1;
            this.rEndY._isObjectTeia = !1;
            this.rEndZ._isObjectTeia = !1;
            this.rEndAll._isObjectTeia = !1;
            this.rX._isObjectTeia = !1;
            this.rY._isObjectTeia = !1;
            this.rZ._isObjectTeia = !1;
            this.rAll._isObjectTeia = !1
        };
        n.prototype.extrudeBox = function (c, a) {
            c = [new g(c, c, 0), new g(-c, c, 0), new g(-c, -c, 0), new g(c, -c, 0),
                new g(c, c, 0)
            ];
            a = [new g(0, 0, 0), new g(0, 0, a)];
            return h.ExtrudeShape("", c, a, 1, 0, 2, this.scene)
        };
        n.prototype.createCircle = function (c, a) {
            null === a && (a = 360);
            for (var b = [], e, d, l = 3.14 / 180, f = 0, n = 0; n <= a; n += 10) e = c * Math.cos(n * l), d = 90 == n ? c : 270 == n ? -c : c * Math.sin(n * l), b[f] = new g(e, 0, d), f++;
            return h.CreateLines("", b, this.scene)
        };
        n.prototype.createTube = function (c, b) {
            null === b && (b = 360);
            for (var e = [], d, l, f = 3.14 / 180, n = 0, k = 0; k <= b; k += 30) d = c * Math.cos(k * f), l = 90 == k ? c : 270 == k ? -c : c * Math.sin(k * f), e[n] = new g(d, 0, l), n++;
            return h.CreateTube("",
                e, .02, 3, null, a.Mesh.NO_CAP, this.scene)
        };
        n.prototype.createScaleAxes = function () {
            var c = .04 * this.axesScale,
                a = this.axesLen * this.axesScale;
            this.sCtl = new h("sCtl", this.scene);
            this.sX = this.extrudeBox(c / 2, a);
            this.sX.name = "X";
            this.sY = this.sX.clone("Y");
            this.sZ = this.sX.clone("Z");
            this.sXZ = f.CreatePlane("XZ", {
                size: 2 * c
            }, this.scene);
            this.sZY = this.sXZ.clone("ZY");
            this.sYX = this.sXZ.clone("YX");
            this.sXZ.rotation.x = 1.57;
            this.sZY.rotation.y = -1.57;
            this.sXZ.position.x = c;
            this.sXZ.position.z = c;
            this.sZY.position.z = c;
            this.sZY.position.y =
                c;
            this.sYX.position.y = c;
            this.sYX.position.x = c;
            this.sAll = h.CreateBox("ALL", 2 * c, this.scene);
            this.sX.material = this.redMat;
            this.sY.material = this.greenMat;
            this.sZ.material = this.blueMat;
            this.sAll.material = this.yellowMat;
            this.sX.parent = this.sCtl;
            this.sY.parent = this.sCtl;
            this.sZ.parent = this.sCtl;
            this.sAll.parent = this.sCtl;
            this.sXZ.parent = this.sCtl;
            this.sZY.parent = this.sCtl;
            this.sYX.parent = this.sCtl;
            this.sX.rotation.y = 1.57;
            this.sY.rotation.x -= 1.57;
            this.sX.visibility = 0;
            this.sY.visibility = 0;
            this.sZ.visibility =
                0;
            this.sXZ.visibility = 0;
            this.sZY.visibility = 0;
            this.sYX.visibility = 0;
            this.sAll.visibility = 0;
            this.sX.renderingGroupId = 1;
            this.sY.renderingGroupId = 1;
            this.sZ.renderingGroupId = 1;
            this.sXZ.renderingGroupId = 1;
            this.sZY.renderingGroupId = 1;
            this.sYX.renderingGroupId = 1;
            this.sAll.renderingGroupId = 1;
            this.sX.isPickable = !1;
            this.sY.isPickable = !1;
            this.sZ.isPickable = !1;
            this.sXZ.isPickable = !1;
            this.sZY.isPickable = !1;
            this.sYX.isPickable = !1;
            this.sAll.isPickable = !1;
            null != this.owner._octree && (this.owner._octree.addMesh(this.sX),
                this.owner._octree.addMesh(this.sY), this.owner._octree.addMesh(this.sZ), this.owner._octree.addMesh(this.sXZ), this.owner._octree.addMesh(this.sZY), this.owner._octree.addMesh(this.sYX), this.owner._octree.addMesh(this.sAll));
            this.sX._isObjectTeia = !1;
            this.sY._isObjectTeia = !1;
            this.sZ._isObjectTeia = !1;
            this.sXZ._isObjectTeia = !1;
            this.sZY._isObjectTeia = !1;
            this.sYX._isObjectTeia = !1;
            this.sAll._isObjectTeia = !1;
            this.sEndX = h.CreateBox("", c, this.scene);
            this.sEndY = this.sEndX.clone("");
            this.sEndZ = this.sEndX.clone("");
            this.sEndAll = f.CreatePolyhedron("sEndAll", {
                type: 1,
                size: c / 2
            }, this.scene);
            this.sEndXZ = this.createTriangle("XZ", 1.75 * c, this.scene);
            this.sEndZY = this.sEndXZ.clone("ZY");
            this.sEndYX = this.sEndXZ.clone("YX");
            this.sEndXZ.rotation.x = -1.57;
            this.sEndZY.rotation.x = -1.57;
            this.sEndYX.rotation.x = -1.57;
            this.sEndX.parent = this.sX;
            this.sEndY.parent = this.sY;
            this.sEndZ.parent = this.sZ;
            this.sEndXZ.parent = this.sXZ;
            this.sEndZY.parent = this.sZY;
            this.sEndYX.parent = this.sYX;
            this.sEndAll.parent = this.sAll;
            this.sEndX.position.z =
                a - c / 2;
            this.sEndY.position.z = a - c / 2;
            this.sEndZ.position.z = a - c / 2;
            this.sEndX.material = this.redMat;
            this.sEndY.material = this.greenMat;
            this.sEndZ.material = this.blueMat;
            this.sEndXZ.material = this.redMat;
            this.sEndZY.material = this.blueMat;
            this.sEndYX.material = this.greenMat;
            this.sEndAll.material = this.yellowMat;
            this.sEndX.renderingGroupId = 1;
            this.sEndY.renderingGroupId = 1;
            this.sEndZ.renderingGroupId = 1;
            this.sEndXZ.renderingGroupId = 1;
            this.sEndZY.renderingGroupId = 1;
            this.sEndYX.renderingGroupId = 1;
            this.sEndAll.renderingGroupId =
                1;
            this.sEndX.isPickable = !1;
            this.sEndY.isPickable = !1;
            this.sEndZ.isPickable = !1;
            this.sEndXZ.isPickable = !1;
            this.sEndZY.isPickable = !1;
            this.sEndYX.isPickable = !1;
            this.sEndAll.isPickable = !1;
            null != this.owner._octree && (this.owner._octree.addMesh(this.sEndX), this.owner._octree.addMesh(this.sEndY), this.owner._octree.addMesh(this.sEndZ), this.owner._octree.addMesh(this.sEndXZ), this.owner._octree.addMesh(this.sEndZY), this.owner._octree.addMesh(this.sEndYX), this.owner._octree.addMesh(this.sEndAll));
            this.sEndX._isObjectTeia = !1;
            this.sEndY._isObjectTeia = !1;
            this.sEndZ._isObjectTeia = !1;
            this.sEndXZ._isObjectTeia = !1;
            this.sEndZY._isObjectTeia = !1;
            this.sEndYX._isObjectTeia = !1;
            this.sEndAll._isObjectTeia = !1
        };
        n.prototype.setLocalAxes = function (c) {
            c = c.getWorldMatrix();
            g.FromFloatArrayToRef(c.asArray(), 0, this.localX);
            g.FromFloatArrayToRef(c.asArray(), 4, this.localY);
            g.FromFloatArrayToRef(c.asArray(), 8, this.localZ)
        };
        n.prototype.setLocal = function (c) {
            this.local != c && (this.local = c, c || (this.theParent.rotationQuaternion = e.Identity()))
        };
        n.prototype.isLocal =
            function () {
                return this.local
            };
        n.prototype.setTransSnap = function (c) {
            this.snapT = c
        };
        n.prototype.setRotSnap = function (c) {
            this.snapR = c
        };
        n.prototype.setScaleSnap = function (c) {
            this.snapS = c
        };
        n.prototype.setTransSnapValue = function (c) {
            this.tSnap = new g(c, c, c);
            this.transSnap = c
        };
        n.prototype.setRotSnapValue = function (c) {
            this.rotSnap = c
        };
        n.prototype.setScaleSnapValue = function (c) {
            this.scaleSnap = c
        };
        n.getAngle = function (c, a, b, e) {
            c = c.subtract(b);
            b = a.subtract(b);
            a = g.Cross(c, b);
            c = Math.asin(a.length() / (c.length() * b.length()));
            0 > g.Dot(a, e) && (c *= -1);
            return c
        };
        n.prototype.createMaterials = function (c) {
            this.redMat = n.getStandardMaterial("redMat", m.Red(), c);
            this.greenMat = n.getStandardMaterial("greenMat", m.Green(), c);
            this.blueMat = n.getStandardMaterial("blueMat", m.Blue(), c);
            this.whiteMat = n.getStandardMaterial("whiteMat", m.White(), c);
            this.yellowMat = n.getStandardMaterial("whiteMat", m.Yellow(), c)
        };
        n.prototype.disposeMaterials = function () {
            this.redMat.dispose();
            this.greenMat.dispose();
            this.blueMat.dispose();
            this.whiteMat.dispose();
            this.yellowMat.dispose()
        };
        n.getStandardMaterial = function (a, b, g) {
            a = new c(a, g);
            a.emissiveColor = b;
            a.diffuseColor = m.Black();
            a.specularColor = m.Black();
            a.backFaceCulling = !1;
            return a
        };
        return n
    }();
    a.EditControl = n;
    var C = function () {
        function c(c, a) {
            this.lastMax = 10;
            this.acts = [];
            this.current = this.last = -1;
            this.mesh = c;
            this.lastMax = a - 1;
            this.add()
        }
        c.prototype.setCapacity = function (c) {
            0 == c ? console.error("capacity should be more than zero") : (this.lastMax = c - 1, this.current = this.last = -1, this.acts = [], this.add())
        };
        c.prototype.add = function (c) {
            void 0 ===
                c && (c = null);
            c = new p(this.mesh, c);
            this.current < this.last && (this.acts.splice(this.current + 1), this.last = this.current);
            this.last == this.lastMax ? (this.acts.shift(), this.acts.push(c)) : (this.acts.push(c), this.last++, this.current++)
        };
        c.prototype.undo = function () {
            if (0 < this.current) {
                var c = this.acts[this.current].getActionType();
                this.current--;
                this.acts[this.current].perform(this.mesh);
                return c
            }
        };
        c.prototype.redo = function () {
            if (this.current < this.last) return this.current++, this.acts[this.current].perform(this.mesh),
                this.acts[this.current].getActionType()
        };
        return c
    }();
    a.ActHist = C;
    var p = function () {
        function c(c, a) {
            this.p = c.position.clone();
            null == c.rotationQuaternion ? (this.rQ = null, this.rE = c.rotation.clone()) : (this.rQ = c.rotationQuaternion.clone(), this.rE = null);
            this.s = c.scaling.clone();
            this.at = a
        }
        c.prototype.getActionType = function () {
            return this.at
        };
        c.prototype.perform = function (c) {
            c.position.copyFrom(this.p);
            null == c.rotationQuaternion ? null != this.rE ? c.rotation.copyFrom(this.rE) : c.rotation.copyFrom(this.rQ.toEulerAngles()) :
                null != this.rQ ? c.rotationQuaternion.copyFrom(this.rQ) : c.rotationQuaternion.copyFrom(e.RotationYawPitchRoll(this.rE.y, this.rE.x, this.rE.z));
            c.scaling.copyFrom(this.s)
        };
        return c
    }();
    a.Act = p
})(BABYLON || (BABYLON = {}));
(function (a) {
    (function (k) {
        var m = function () {
            function h() {
                this._keyToAction = {};
                this._keyIsShift = {};
                this._keyShiftToAction = {};
                this._keyToAction = {};
                this._keyIsShift = {};
                this._keyShiftToAction = {};
                this._binding()
            }
            h.prototype._binding = function () {
                a.Utilities.Event.on(window, "keypress", $.proxy(this._onKeyPressed, this))
            };
            h.prototype.addShortcut = function (a, d, e) {
                void 0 === e && (e = !1);
                this._keyToAction[a] && this._keyIsShift[a] == e ? console.warn("Already setted shortcut") : (this._keyIsShift[a] = e) ? this._keyShiftToAction[a] =
                    d._doCallback : this._keyToAction[a] = d._doCallback
            };
            h.prototype._onKeyPressed = function (a) {
                var d = !!a.shiftKey;
                a && a.target && ("BODY" === a.target.tagName || "SPAN" === a.target.tagName || "DIV" === a.target.tagName || "CANVAS" === a.target.tagName) && (this._keyToAction[a.which] && !d ? (a.preventDefault(), this._keyToAction[a.which]()) : this._keyShiftToAction[a.which] && this._keyIsShift[a.which] == d && (a.preventDefault(), this._keyShiftToAction[a.which]()))
            };
            return h
        }();
        k.KeyboardShortcuts = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS ||
    (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, d, e) {
                this._originalMesh = a;
                this._cursorColor = d;
                this._scene = e;
                this._lines = [];
                this._linesAlreadyCreated = !1
            }
            a.prototype.drawCursor = function () {
                var a = this._getPointsPath();
                if (this._linesAlreadyCreated)
                    for (var d = 0; d < a.length; d += 2) void 0 != a[d + 1] && this._updateLine(a[d], a[d + 1], this._lines[d / 2]);
                else {
                    for (d = 0; d < a.length; d += 2) void 0 != a[d + 1] && this._drawLine(a[d], a[d + 1]);
                    this._linesAlreadyCreated = !0
                }
            };
            a.prototype._getPointsPath = function () {
                var a = [],
                    d = this._originalMesh.position.x -
                    this._originalMesh.scaling.x,
                    e = this._originalMesh.position.z + this._originalMesh.scaling.z,
                    b = this._originalMesh.position.z - this._originalMesh.scaling.z,
                    c = new BABYLON.Vector3(this._originalMesh.position.x + this._originalMesh.scaling.x, this._originalMesh.position.y, this._originalMesh.position.z);
                d = new BABYLON.Vector3(d, this._originalMesh.position.y, this._originalMesh.position.z);
                e = new BABYLON.Vector3(this._originalMesh.position.x, this._originalMesh.position.y, e);
                b = new BABYLON.Vector3(this._originalMesh.position.x,
                    this._originalMesh.position.y, b);
                a.push(c, d, e, b);
                return a
            };
            a.prototype._drawLine = function (a, d) {
                var e = [];
                e.push(a, d);
                a = BABYLON.MeshBuilder.CreateLines("line", {
                    points: e,
                    updatable: !0
                }, this._scene);
                a.color = this._cursorColor;
                a.isPickable = !1;
                this._lines.push(a)
            };
            a.prototype._updateLine = function (a, d, e) {
                var b = [];
                b.push(a, d);
                BABYLON.MeshBuilder.CreateLines(null, {
                    points: b,
                    updatable: !0,
                    instance: e
                }, null)
            };
            a.prototype.getPoint = function () {
                return this._originalMesh
            };
            a.prototype.updateCursor = function (a) {
                this._originalMesh =
                    a;
                this.drawCursor()
            };
            a.prototype.deleteCursor = function () {
                this._lines[0].dispose();
                this._lines[1].dispose();
                this._lines = []
            };
            return a
        }();
        a.Cursor = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function h(a) {
                this._currentMeasure = -1;
                this._viewport = a;
                this._scene = this._viewport.scene;
                this._camera = this._scene.activeCamera;
                this._saveCameraValues();
                this._preciseMode = !1
            }
            h.prototype.addNewMeasure = function () {
                if (this._measures) 4 < this._measures.length || (this._measures[this._currentMeasure] && this._measures[this._currentMeasure].putMeasureToSleep(), this._currentColor = this._getFreeColor(), f = new a.Measurement(this._viewport, this._currentMeasure + 1, this._currentColor,
                    this), f.changeCurrentMeasure(), this._currentMeasure = this._measures.length, this._measures.push(f), this._measures[this._currentMeasure].enable());
                else {
                    this._currentMeasure++;
                    this._measures = [];
                    this._colorsMeasurement = [];
                    this._colorsUsed = [];
                    this._colorsMeasurement.push(BABYLON.Color3.Purple(), BABYLON.Color3.Green(), BABYLON.Color3.Yellow(), BABYLON.Color3.Magenta(), BABYLON.Color3.Blue());
                    this._currentColor = this._getFreeColor();
                    var f = new a.Measurement(this._viewport, this._currentMeasure, this._currentColor,
                        this);
                    this._measures.push(f);
                    this._measures[this._currentMeasure].enable()
                }
                return this._measures.length
            };
            h.prototype.getNumberOfMeasures = function () {
                return this._measures ? this._measures.length : -1
            };
            h.prototype._isElemOfColors = function (a) {
                return -1 === this._colorsUsed.indexOf(a) ? !1 : !0
            };
            h.prototype._getFreeColor = function () {
                for (var a = 0; a < this._colorsMeasurement.length; a++)
                    if (!this._isElemOfColors(this._colorsMeasurement[a])) return this._colorsUsed.push(this._colorsMeasurement[a]), this._colorsMeasurement[a]
            };
            h.prototype.getCurrentMeasure = function () {
                return this._measures[this._currentMeasure]
            };
            h.prototype.setCurrentMeasure = function (a) {
                this._currentMeasure = a
            };
            h.prototype.zoomOnCurrentMeasure = function () {
                return this._measures ? this._measures[this._currentMeasure].zoomOnCurrentMeasure() : "Aucune mesure n'est pr\u00e9sente"
            };
            h.prototype.switchPrecisionMode = function () {
                if (this._preciseMode) return this._resetCameraValues(), this._preciseMode = !1, "Mode pr\u00e9cision desactiv\u00e9";
                this._enablePreciseMode();
                this._preciseMode = !0;
                return "Mode pr\u00e9cision activ\u00e9"
            };
            h.prototype.addMeasurePoint = function (a) {
                if (!this._measures) return "L'outil de mesure n'est pas initialis\u00e9";
                this._measures[this._currentMeasure].setPuttingPointMode(a);
                return "Cliquez dans la sc\u00e8ne pour placer le point"
            };
            h.prototype.setDeletePointMode = function (a) {
                if (!this._measures) return "L'outil de mesure n'est pas initialis\u00e9";
                this._measures[this._currentMeasure].setDeletingPointMode(a);
                return "Cliquez sur le point \u00e0 supprimer"
            };
            h.prototype._resizeHtmlMeasures =
                function () {
                    for (var a = 0; a < this._measures.length; a++) this._measures[a].removeCurrentDistance(), this._measures[a].setIndexMeasurement(a), this._measures[a].distance();
                    this._currentMeasure = this._measures.length - 1
                };
            h.prototype.setMeasureUnity = function (a) {
                this._measures && this._measures[this._currentMeasure].setMeasureUnity(a)
            };
            h.prototype._saveCameraValues = function () {
                var a = this._camera;
                this._previousWheelPrecision = a.wheelPrecision;
                this._previousRadiusLimit = a.lowerRadiusLimit
            };
            h.prototype._enablePreciseMode =
                function () {
                    this._camera.wheelPrecision = 10;
                    this._camera.lowerRadiusLimit = .01
                };
            h.prototype._resetCameraValues = function () {
                this._camera.wheelPrecision = this._previousWheelPrecision;
                this._camera.lowerRadiusLimit = this._previousRadiusLimit
            };
            h.prototype.restartCss = function () {
                var a = this._getFreeColor().toHexString();
                $("#currentMeasure").css("color", a)
            };
            h.prototype.disableMeasurement = function () {
                if (this._measures) {
                    var a = this._measures[this._currentMeasure].getCurrentColor();
                    a = this._colorsUsed.indexOf(a);
                    this._colorsUsed.splice(a,
                        1);
                    this._measures[this._currentMeasure].disableMeasurement();
                    this._measures.splice(this._currentMeasure, 1);
                    this._resizeHtmlMeasures();
                    if (0 > this._currentMeasure) return this.restartCss(), this._measures = null, 0;
                    this._currentColor = this._measures[this._currentMeasure].getCurrentColor();
                    this._measures[this._currentMeasure].changeCurrentMeasure();
                    return this._measures.length
                }
                return 0
            };
            return h
        }();
        a.MeasureHandler = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function h(a, d, e, b) {
                var c = this;
                this._viewportsControl = a;
                this._handler = b;
                this._scene = a.scene;
                this._canvas = a.canvas;
                this._camera = a.scene.activeCamera;
                this._engine = a.scene.getEngine();
                this._getBrowser();
                this._pointerDown = function (a) {
                    return c._onPointerDown(a)
                };
                this._pointerUp = function (a) {
                    return c._onPointerUp(a)
                };
                this._pointerMove = function (a) {
                    return c._onPointerMove(a)
                };
                this._measureUnity = "metres";
                this._isCameraAttached = !0;
                this._points = [];
                this._cursors = [];
                this._lines = [];
                this._setMaterials();
                this._previousMeshUnderMouse = this._scene.meshes[0];
                this._indexMeasurement = d;
                this._linesColor = e;
                this._addDistanceInDropDown(0);
                this._isSleeping = !1
            }
            h.prototype._getBrowser = function () {
                0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./) ? this._isIE = !0 : this._isIE = !1
            };
            h.prototype.getCurrentColor = function () {
                return this._linesColor
            };
            h.prototype._setMaterials = function () {
                this._deleteMaterial = new BABYLON.StandardMaterial("deleteMat", this._scene);
                this._deleteMaterial.diffuseColor = BABYLON.Color3.Red();
                this._deleteMaterial.emissiveColor = BABYLON.Color3.Red();
                this._deleteMaterial.alpha = .8;
                this._originalMaterial = new BABYLON.StandardMaterial("originalMat", this._scene);
                this._originalMaterial.diffuseColor = BABYLON.Color3.Black();
                this._originalMaterial.emissiveColor = BABYLON.Color3.Black();
                this._originalMaterial.alpha = .7;
                this._movingMaterial = new BABYLON.StandardMaterial("movingMat", this._scene);
                this._movingMaterial.diffuseColor = BABYLON.Color3.Green();
                this._movingMaterial.emissiveColor = BABYLON.Color3.Green();
                this._movingMaterial.alpha = .5
            };
            h.prototype._boundingBoxVolume = function (a) {
                a = a._boundingInfo.maximum;
                return 2 * a.x * a.y * 2 * a.z * 2
            };
            h.prototype._boundingSphereVolume = function (a) {
                a = a._boundingInfo.boundingSphere.maximum;
                return 4 / 3 * Math.PI * a.x * a.y * a.z
            };
            h.prototype._getWorldPositionsOfVertices = function (a) {
                for (var d = [], e = a.getVerticesData(BABYLON.VertexBuffer.PositionKind), b = 0; b < e.length - 2; b += 3) {
                    var c = new BABYLON.Vector3(e[b], e[b + 1], e[b + 2]);
                    d.push(BABYLON.Vector3.TransformCoordinates(c,
                        a.getWorldMatrix()))
                }
                return d
            };
            h.prototype._getLocalPositionsOfVertices = function (a) {
                var d = [];
                a = a.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                for (var e = 0; e < a.length - 2; e += 3) {
                    var b = new BABYLON.Vector3(a[e], a[e + 1], a[e + 2]);
                    d.push(b)
                }
                return d
            };
            h.prototype._signedVolumeOfTriangle = function (a, d, e) {
                d = BABYLON.Vector3.Cross(d, e);
                return BABYLON.Vector3.Dot(a, d) / 6
            };
            h.prototype.volumeOfMesh = function (a) {
                var d = 0;
                a = this._scene.getMeshByName(a);
                for (var e = a.getIndices(), b = this._getLocalPositionsOfVertices(a),
                        c = 0; c < e.length; c += 3) d += this._signedVolumeOfTriangle(b[e[c]], b[e[c + 1]], b[e[c + 2]]);
                d = Math.abs(d);
                console.log("Volume total : " + d + " m^3");
                console.log("Bounding box volume : " + this._boundingBoxVolume(a));
                console.log("Bounding sphere volume : " + this._boundingSphereVolume(a))
            };
            h.prototype.enable = function () {
                this._initMouseEvents()
            };
            h.prototype.setMeasureUnity = function (a) {
                this._measureUnity = a;
                this.distance()
            };
            h.prototype._initMouseEvents = function () {
                this._isIE ? (this._canvas.addEventListener("pointerup", this._pointerUp),
                    this._canvas.addEventListener("pointerdown", this._pointerDown), this._canvas.addEventListener("pointermove", this._pointerMove)) : (this._canvas.addEventListener("mouseup", this._pointerUp), this._canvas.addEventListener("mousedown", this._pointerDown), this._canvas.addEventListener("mousemove", this._pointerMove))
            };
            h.prototype._deleteAllPoints = function () {
                for (var a = 0; a < this._points.length; a++) this._points[a].dispose();
                this._points = []
            };
            h.prototype._deleteAllLines = function () {
                for (var a = 0; a < this._lines.length; a++) this._lines[a].dispose();
                this._lines = []
            };
            h.prototype._isElemOfPoints = function (a) {
                return -1 != this._points.indexOf(a) ? !0 : !1
            };
            h.prototype.setIndexMeasurement = function (a) {
                this._indexMeasurement = a
            };
            h.prototype._removeMouseEvents = function () {
                this._isIE ? (this._canvas.removeEventListener("pointerup", this._pointerUp), this._canvas.removeEventListener("pointerdown", this._pointerDown), this._canvas.removeEventListener("pointermove", this._pointerMove)) : (this._canvas.removeEventListener("mouseup", this._pointerUp), this._canvas.removeEventListener("mousedown",
                    this._pointerDown), this._canvas.removeEventListener("mousemove", this._pointerMove))
            };
            h.prototype.putMeasureToSleep = function () {
                this._isSleeping || (this._removeMouseEvents(), this._isSleeping = !0)
            };
            h.prototype.wakeUpMeasure = function () {
                this._isSleeping && (this._initMouseEvents(), this._isSleeping = !1)
            };
            h.prototype.disableMeasurement = function () {
                this._removeMouseEvents();
                this._deleteAllCursors();
                this._deleteAllPoints();
                this._deleteAllLines();
                this._isCameraAttached || this._camera.attachControl(this._canvas);
                $("#distance" +
                    this._indexMeasurement.toString()).remove()
            };
            h.prototype._refreshLines = function () {
                this._deleteAllLines();
                for (var a = 0; a < this._points.length; a++) this._points[a + 1] && this._drawLineBetweenTwoPoints(this._points[a].position, this._points[a + 1].position)
            };
            h.prototype._deleteLinesOfPickedPoint = function (a) {
                var d = this._points.indexOf(a);
                this._points[d + 1] && (this._lines[d].dispose(), this._lines.splice(d, 1));
                d = this._points.indexOf(a);
                this._points[d - 1] && (this._lines[d - 1].dispose(), this._lines.splice(d - 1, 1))
            };
            h.prototype._updateLinesOfPickedPoint =
                function (a) {
                    a = this._points.indexOf(a);
                    this._points[a + 1] && this._updateLineBetweenTwoPoints(this._points[a], this._points[a + 1], this._lines[a]);
                    this._points[a - 1] && this._updateLineBetweenTwoPoints(this._points[a - 1], this._points[a], this._lines[a - 1])
                };
            h.prototype.convertColorToCssStyle = function (a) {
                a.toHexString();
                return a.toHexString()
            };
            h.prototype._switchCurrentMeasureHtml = function (a) {
                $("#currentMeasure").addClass("material-icons");
                $("#currentMeasure").css("color", a)
            };
            h.prototype._onPointerDown = function (a) {
                a =
                    this._scene.pick(this._scene.pointerX, this._scene.pointerY, null, null, this._camera);
                var d = a.pickedMesh;
                if (this._deletePointMode && a.hit && this._isElemOfPoints(d)) {
                    var e = this._points.indexOf(d);
                    this._deleteLinesOfPickedPoint(d);
                    this._cursors[e].deleteCursor();
                    this._cursors.splice(e, 1);
                    this._points[e].dispose();
                    this._points.splice(e, 1);
                    this._refreshLines();
                    this.distance()
                }
                this._isElemOfPoints(d) && (this._pointPick = d, this._pointPick.material = this._movingMaterial, this._pointPick.isPickable = !1, this._isCameraAttached &&
                    (this._camera.detachControl(this._canvas), this._isCameraAttached = !1));
                this._putPointMode && a.hit && (this._putCircleToMouseCoordinates(a), this._putPointMode = !1)
            };
            h.prototype._onPointerMove = function (a) {
                a = this._scene.pick(this._scene.pointerX, this._scene.pointerY, null, null, this._camera);
                this._pointPick ? a.hit && (this._pointPick.position = a.pickedPoint, this._updateLinesOfPickedPoint(this._pointPick), a = this._indexOfPoint(this._pointPick), this._cursors[a].updateCursor(this._pointPick)) : this._changeColorOfMeshUnderMouse(a)
            };
            h.prototype._deleteAllCursors = function () {
                for (var a in this._cursors) this._cursors[a].deleteCursor()
            };
            h.prototype._deleteCursor = function (a) {
                a = this._indexOfPoint(a);
                this._cursors[a].deleteCursor();
                this._cursors.splice(a, 1)
            };
            h.prototype._indexOfPoint = function (a) {
                for (var d = 0; d < this._cursors.length; d++)
                    if (this._cursors[d].getPoint() == a) return d;
                return -1
            };
            h.prototype._changeColorOfMeshUnderMouse = function (a) {
                var d = a.pickedMesh;
                a.hit && d != this._previousMeshUnderMouse && (this._isElemOfPoints(this._previousMeshUnderMouse) &&
                    (this._previousMeshUnderMouse.material = this._originalMaterial), this._previousMeshUnderMouse = d, this._isElemOfPoints(d) && (this._deletePointMode ? d.material = this._deleteMaterial : this._pointPick || (d.material = this._movingMaterial)))
            };
            h.prototype._onPointerUp = function (a) {
                this._scene.pick(this._scene.pointerX, this._scene.pointerY, null, null, this._camera);
                this._pointPick && (this._pointPick.isPickable = !0, this.distance(), this._pointPick = null);
                this._deletePointMode = !1;
                this._isCameraAttached || (this._camera.attachControl(this._canvas),
                    this._isCameraAttached = !0)
            };
            h.prototype.setPuttingPointMode = function (a) {
                this._putPointMode = a
            };
            h.prototype.setDeletingPointMode = function (a) {
                this._deletePointMode = a
            };
            h.prototype._putCircleToMouseCoordinates = function (f) {
                var d = BABYLON.MeshBuilder.CreateSphere("sphere", {
                    segments: 256,
                    diameter: 2,
                    updatable: !0
                }, this._scene);
                d.material = this._originalMaterial;
                d.scaling = new BABYLON.Vector3(.1, .1, .1);
                d.position = f.pickedPoint;
                d.visibility = .3;
                this._points.push(d);
                f = new a.Cursor(d, this._linesColor, this._scene);
                f.drawCursor();
                this._cursors.push(f);
                1 < this._points.length && (f = this._points.length - 2, this._drawLineBetweenTwoPoints(this._points[f].position, this._points[f + 1].position), this.distance())
            };
            h.prototype._drawLineBetweenTwoPoints = function (a, d) {
                var e = [];
                e.push(a);
                e.push(d);
                a = BABYLON.MeshBuilder.CreateLines("line", {
                    points: e,
                    updatable: !0
                }, this._scene);
                a.isPickable = !1;
                a.color = this._linesColor;
                this._lines.push(a)
            };
            h.prototype._updateLineBetweenTwoPoints = function (a, d, e) {
                var b = [];
                b.push(a.position);
                b.push(d.position);
                BABYLON.MeshBuilder.CreateLines(null, {
                    points: b,
                    updatable: !0,
                    instance: e
                }, null)
            };
            h.prototype.zoomOnCurrentMeasure = function () {
                if (1 > this._points.length) return "Aucun point n'est pr\u00e9sent sur la mesure";
                this._camera.zoomOn([this._points[this._points.length - 1]])
            };
            h.prototype._addChangeCurrentMeasureEvent = function (a) {
                var d = this;
                $(a).on("click", function () {
                    d.changeCurrentMeasure()
                })
            };
            h.prototype._changeColorCurrentMeasure = function () {
                var a = this.convertColorToCssStyle(this._linesColor);
                this._switchCurrentMeasureHtml(a)
            };
            h.prototype.changeCurrentMeasure =
                function () {
                    this._handler.getCurrentMeasure().putMeasureToSleep();
                    this._isSleeping && this.wakeUpMeasure();
                    this._changeColorCurrentMeasure();
                    this._handler.setCurrentMeasure(this._indexMeasurement)
                };
            h.prototype.removeCurrentDistance = function () {
                $("#distance" + this._indexMeasurement.toString()).remove()
            };
            h.prototype._addDistanceInDropDown = function (a) {
                var d = this.convertColorToCssStyle(this._linesColor),
                    e = "distance_number" + this._indexMeasurement.toString(),
                    b = "distance" + this._indexMeasurement.toString(),
                    c =
                    "distanceColor" + this._indexMeasurement.toString();
                $("#distances").append("<li id=" + b + "><a class='uk-text-center uk-dropdown-close text-measure-over' id=" + e + "><i class='circle-measure-over' style='color:" + d + "' id=" + c + ">brightness_1</i>Distance : " + a + " " + this._convertUnity() + "</a></li>");
                $("#" + c).addClass("material-icons");
                $("#" + c).addClass("circle-color");
                this._addChangeCurrentMeasureEvent("#" + e)
            };
            h.prototype._convertUnity = function () {
                return "metres" == this._measureUnity ? "m" : "centimetres" == this._measureUnity ?
                    "cm" : "mm"
            };
            h.prototype.distance = function () {
                for (var a = 0, d = 0; d < this._points.length; d++) this._points[d + 1] && (a += BABYLON.Vector3.Distance(this._points[d].position, this._points[d + 1].position));
                "centimetres" === this._measureUnity ? a *= 100 : "millimetres" === this._measureUnity && (a *= 1E3);
                a = Math.round(100 * a) / 100;
                this.removeCurrentDistance();
                this._addDistanceInDropDown(a);
                return a
            };
            return h
        }();
        a.Measurement = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (a) {
            function f() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(f, a);
            return f
        }(a.Type);
        k.ModuleBase = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d, e, b) {
                var c = h.call(this) || this;
                c._unbindSmartScene = function () {
                    a.Utilities.Event.off(this._smartScene, k.SmartScene.SELECTION_ADDED_EVENT, this._onSelectionAddedIn3DProxy);
                    a.Utilities.Event.off(this._smartScene, k.SmartScene.SELECTION_REMOVED_EVENT, this._onSelectionRemovedIn3DProxy)
                };
                c._currentObjectIdLoaded = null;
                c._smartSceneTreeView = d;
                c._smartScene = e;
                c._defaultScenesFolder = b;
                c._binding();
                return c
            }
            __extends(f, h);
            f.prototype._binding = function () {
                this._bindSmartSceneTreeView();
                this._bindSmartScene()
            };
            f.prototype._bindSmartSceneTreeView = function () {
                this._onSelectionAddedProxy || (this._onSelectionAddedProxy = $.proxy(this._onSelectionAdded, this));
                this._onSelectionRemovedProxy || (this._onSelectionRemovedProxy = $.proxy(this._onSelectionRemoved, this));
                this._onSelectionClearedProxy || (this._onSelectionClearedProxy = $.proxy(this._onSelectionCleared, this));
                a.Utilities.Event.on(this._smartSceneTreeView._smartScene, k.SmartScene.SELECTION_ADDED_EVENT, this._onSelectionAddedProxy);
                a.Utilities.Event.on(this._smartSceneTreeView._smartScene,
                    k.SmartScene.SELECTION_REMOVED_EVENT, this._onSelectionRemovedProxy);
                a.Utilities.Event.on(this._smartSceneTreeView._smartScene, k.SmartScene.SELECTION_CLEARED_EVENT, this._onSelectionClearedProxy)
            };
            f.prototype._unbindSmartSceneTreeView = function () {
                a.Utilities.Event.off(this._smartSceneTreeView._smartScene, k.SmartScene.SELECTION_ADDED_EVENT, this._onSelectionAddedProxy);
                a.Utilities.Event.off(this._smartSceneTreeView._smartScene, k.SmartScene.SELECTION_REMOVED_EVENT, this._onSelectionRemovedProxy);
                a.Utilities.Event.off(this._smartSceneTreeView._smartScene,
                    k.SmartScene.SELECTION_CLEARED_EVENT, this._onSelectionClearedProxy)
            };
            f.prototype._bindSmartScene = function () {
                this._onSelectionAddedIn3DProxy || (this._onSelectionAddedIn3DProxy = $.proxy(this._onSelectionAddedIn3D, this));
                this._onSelectionRemovedIn3DProxy || (this._onSelectionRemovedIn3DProxy = $.proxy(this._onSelectionRemovedIn3D, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SELECTION_ADDED_EVENT, this._onSelectionAddedIn3DProxy);
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SELECTION_REMOVED_EVENT,
                    this._onSelectionRemovedIn3DProxy)
            };
            f.prototype._onSelectionAddedIn3D = function (a, e) {
                this._smartScene.homePage ? this._onSelectionAdded(null, "2239", !0) : (this._unbindSmartSceneTreeView(), this._smartSceneTreeView._smartScene._addObjectToSelection(e, !0), this._bindSmartSceneTreeView())
            };
            f.prototype._onSelectionAdded = function (a, e, b) {
                e && (a = this._smartSceneTreeView._treeView._jqTree.tree("getNodeById", e), a = this._getDataToSend(a, 2)) && (this._tryLoadNewScene(a.id, a.name, !b), this._unbindSmartScene(), this._smartScene._addObjectToSelection(e,
                    !0), this._bindSmartScene(), this._previousSelection = e)
            };
            f.prototype._getDataToSend = function (a, e) {
                for (var b = []; a;) b.unshift({
                    id: a.id,
                    name: a.name
                }), a = a.parent;
                return b[e]
            };
            f.prototype._onSelectionRemoved = function (a, e) {
                e && (this._unbindSmartScene(), this._smartScene._removeObjectFromSelection(e), this._bindSmartScene())
            };
            f.prototype._onSelectionCleared = function (a, e) {
                this._smartScene._clearObjectsSelection()
            };
            f.prototype._onSelectionRemovedIn3D = function (a, e) {
                e && (this._unbindSmartSceneTreeView(), this._smartSceneTreeView._smartScene._removeObjectFromSelection(e),
                    this._bindSmartSceneTreeView())
            };
            f.prototype._tryLoadNewSceneTeia = function (a, e, b) {
                return this._smartScene.setFromUrl("/Teia.TeiaJS/TeiaJS/GetView/" + a + "?zoneName=" + e, !1, b)
            };
            f.prototype._tryLoadNewScene = function (a, e, b) {
                return this._tryLoadNewSceneTeia(a, e, b)
            };
            return f
        }(k.ModuleBase);
        k.MipMap = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function () {
            function h(a) {
                this.MAXIUM_SPRITES_NUMBER = 100;
                this._viewport = a;
                this._canvas = a.canvas;
                this._scene = a.scene;
                this._infoboxManager = this._viewport.getInfoBoxManager();
                this._meshesNotified = {};
                this._sprites = {};
                this._notifications = {};
                this._deletingMode = this._addingMode = !1;
                this.initMouseEvents();
                this.addSignalR();
                this._createSpriteManager();
                this.getAllMeshesNotified()
            }
            h.prototype.setAddingMode = function (a) {
                $("#setNotification").addClass("notification-button-enabled");
                this._addingMode = a;
                this._deletingMode = !1;
                $("#deleteNotification").removeClass("notification-button-enabled")
            };
            h.prototype.setDeletingMode = function (a) {
                $("#deleteNotification").addClass("notification-button-enabled");
                this._deletingMode = a;
                this._addingMode = !1;
                $("#setNotification").removeClass("notification-button-enabled")
            };
            h.prototype.resetAllModes = function () {
                this._deletingMode = this._addingMode = !1;
                $("#setNotification").removeClass("notification-button-enabled");
                $("#deleteNotification").removeClass("notification-button-enabled")
            };
            h.prototype._createSpriteManager = function () {
                new BABYLON.Texture("/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/notification.png", this._scene);
                this._spriteManager = new BABYLON.SpriteManager("spritesNotificationManager", "/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/notification.png", this.MAXIUM_SPRITES_NUMBER, 64, this._scene);
                this._spriteManager.isPickable = !0
            };
            h.prototype.setSpriteOnPickedMesh = function (a, d) {
                var e = this,
                    b = new BABYLON.Sprite("SpriteNotification", this._spriteManager);
                b.size =
                    .5;
                b.position = a.absolutePosition;
                b.isPickable = !0;
                b.actionManager = new BABYLON.ActionManager(this._scene);
                this._infoboxManager.addData(a.objectId, "Notification", d);
                b.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                    e._deletingMode || $(".infoBox-content-container").is(":visible") || (e._viewport.clearObjectsSelection(), e._viewport.addObjectToSelection(a.objectId), e._viewport._showInfoBox())
                }));
                this._meshesNotified[a.objectId] = !0;
                this._sprites[a.objectId] =
                    b;
                this._notifications[a.objectId] = d
            };
            h.prototype.deleteNotificationOnMesh = function (a) {
                var d = this._currentMeshPicked.objectId;
                this._viewport.getSmartSceneID();
                this._deletingMode && (this._meshesNotified[a.objectId] ? $.ajax({
                    url: "/Teia.Notification/API/Notification",
                    type: "DELETE",
                    data: {
                        ObjectId: d
                    },
                    success: function (a) {
                        UIkit.notify("Notification supprim\u00e9e", {
                            timeout: 2E3
                        })
                    },
                    error: function (a) {
                        UIkit.notify("Erreur lors de la suppression", {
                            timeout: 2E3
                        })
                    }
                }) : UIkit.notify("Aucune notification attach\u00e9e sur ce mesh", {
                    timeout: 2E3
                }), this._currentMeshPicked = null, this.resetAllModes())
            };
            h.prototype.pickMesh = function () {
                var a = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
                a.pickedMesh && (this._currentMeshPicked = a.pickedMesh)
            };
            h.prototype.attachNotificationToMesh = function () {
                if (this._addingMode && this._currentMeshPicked) {
                    $("#notificationValueWindow").show();
                    if (this._currentMeshPicked && this._notifications[this._currentMeshPicked.objectId]) {
                        var a = this._currentMeshPicked.objectId;
                        $("#notificationValue").val(this._notifications[a])
                    }
                    this._addingMode = !1
                }
            };
            h.prototype.submitNotification = function () {
                var a = this,
                    d = $("#notificationValue").val(),
                    e = this._currentMeshPicked.objectId;
                if (!this._currentMeshPicked) return UIkit.notify("Erreur, vous n'avez pas s\u00e9lection\u00e9 d'objet", {
                    timeout: 2E3
                }), this.resetAllModes(), !1;
                this._viewport.getSmartSceneID();
                $.ajax({
                    url: "/Teia.Notification/API/Notification",
                    type: "POST",
                    data: {
                        ObjectId: e,
                        Value: d
                    },
                    success: function (a) {
                        UIkit.notify("Notification ajout\u00e9e", {
                            timeout: 2E3
                        })
                    },
                    error: function (a) {
                        UIkit.notify("Erreur lors de l'ajout", {
                            timeout: 2E3
                        })
                    },
                    complete: function (b) {
                        a._currentMeshPicked = null;
                        a.resetAllModes();
                        $("#notificationValue").val("Entrez votre notification ici")
                    }
                });
                return !0
            };
            h.prototype.getAllMeshesNotified = function () {
                var a = this,
                    d = this._viewport.getSmartSceneID();
                $.ajax({
                    url: "/Teia.Notification/API/Notification",
                    type: "GET",
                    data: {
                        smartSceneID: d
                    },
                    success: function (e) {
                        for (var b in e) {
                            var c = e[b],
                                g = a._scene.getMeshByID(c.MeshID);
                            a.setSpriteOnPickedMesh(g, c.Value)
                        }
                    },
                    error: function (a) {
                        console.log("Error with ajax request")
                    }
                })
            };
            h.prototype.initMouseEvents = function () {
                var a = this;
                this._canvas.addEventListener("mouseup", function () {
                    a._addingMode ? (a.pickMesh(), a.attachNotificationToMesh()) : a._deletingMode && (a.pickMesh(), a.deleteNotificationOnMesh(a._currentMeshPicked))
                })
            };
            h.prototype.addSignalR = function () {
                a.Utilities.SignalR.addSignalRCallback("notificationCreate", $.proxy(this._onNotificationAdded, this));
                a.Utilities.SignalR.addSignalRCallback("notificationDelete", $.proxy(this._onNotificationDeleted, this));
                a.Utilities.SignalR.addSignalRCallback("notificationUpdate",
                    $.proxy(this._onNotificationUpdated, this))
            };
            h.prototype._onNotificationAdded = function (a) {
                var d = a.ObjectRecord ? a.ObjectRecord.Id : a.ObjectId;
                var e = this._viewport._getMeshesByObjectID(d)[0];
                this.setSpriteOnPickedMesh(e, a.Value);
                this._infoboxManager.addData(d, "Notification", a.Value)
            };
            h.prototype._onNotificationDeleted = function (a) {
                delete this._meshesNotified[a];
                this._sprites[a].dispose();
                delete this._sprites[a];
                delete this._notifications[a]
            };
            h.prototype._onNotificationUpdated = function (a) {
                var d = a.ObjectRecord ?
                    a.ObjectRecord.Id : a.ObjectId;
                var e = this._viewport._getMeshesByObjectID(d)[0];
                delete this._meshesNotified[d];
                delete this._notifications[d];
                this._sprites[d].dispose();
                delete this._sprites[d];
                this.setSpriteOnPickedMesh(e, a.Value);
                this._infoboxManager.addData(d, "Notification", a.Value)
            };
            return h
        }();
        k.NotificationHandler = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(a, e, b, c) {
                var g = h.call(this) || this;
                g._engine = a;
                g._name = e;
                g._sigleInstance = c || !0;
                g._postProcessType = b;
                g._postProcesses = [];
                g._cameras = [];
                g._indicesForCamera = {};
                g._renderPasses = {};
                g._renderEffectAsPasses = {};
                return g
            }
            __extends(f, h);
            f.prototype.addPass = function (a) {
                this._renderPasses[a.name] = a
            };
            f.prototype.removePass = function (a) {
                delete this._renderPasses[a.name];
                this._linkParameters()
            };
            f.prototype.addRenderEffectAsPass = function (a) {
                this._renderEffectAsPasses[a._name] =
                    a
            };
            f.prototype.getPass = function (a) {
                for (var e in this._renderPasses)
                    if (e == a) return this._renderPasses[a]
            };
            f.prototype.emptyPasses = function () {
                this._renderPasses = {};
                this._linkParameters()
            };
            f.prototype.attachCameras = function (d) {
                d = a.Utilities.Helpers.makeArray(d);
                for (var e = 0; e < d.length; e++) {
                    if (this._sigleInstance) {
                        var b = this._postProcesses[0] || eval("new " + this._postProcessType + '("' + this._postProcessType + '", 1.0, null, null, this._engine, true)');
                        this._postProcesses[0] = b
                    } else b = this._postProcesses[d[e]] ||
                        eval("new " + this._postProcessType + '("' + this._postProcessType + '", 1.0, null, null, this._engine, true)'), this._postProcesses[d[e].name] = b;
                    b = d[e].attachPostProcess(b);
                    null == this._indicesForCamera[d[e].name] && (this._indicesForCamera[d[e].name] = []);
                    this._indicesForCamera[d[e].name].push(b); - 1 == this._cameras.indexOf(d[e].name) && this._cameras.push(d[e].name)
                }
                this._linkParameters()
            };
            f.prototype._linkParameters = function () {
                var a = this,
                    e;
                for (e in this._postProcesses) this._postProcesses[e].onApply = function (b) {
                    a.parameters(b);
                    for (var c in a._renderPasses) b.setTexture(c, a._renderPasses[c].renderTexture);
                    for (var g in a._renderEffectAsPasses);
                }
            };
            f.prototype.enable = function (d) {
                d = a.Utilities.Helpers.makeArray(d);
                for (var e = 0; e < d.length; e++)
                    for (var b = 0; b < this._indicesForCamera[d[e].name].length; b++);
            };
            f.prototype.getPostProcess = function () {};
            return f
        }(k.ModuleBase);
        k.RenderEffect = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e, b, c, g, l) {
                return a.call(this) || this
            }
            __extends(f, a);
            Object.defineProperty(f.prototype, "renderTexture", {
                get: function () {
                    return this._renderTexture
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "renderList", {
                set: function (a) {
                    this._renderTexture.renderList = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "name", {
                get: function () {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype._update = function () {
                this.renderList =
                    this._renderList
            };
            return f
        }(a.ModuleBase);
        a.RenderPass = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function (a) {
            function f(d, e) {
                var b = a.call(this) || this;
                b._engine = d;
                b._name = e;
                b._renderEffects = {};
                b._renderEffectsPasses = [];
                b._cameras = [];
                return b
            }
            __extends(f, a);
            return f
        }(a.ModuleBase);
        a.RenderPipeline = k
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, d) {
                this._name = a;
                this._objectId = d
            }
            Object.defineProperty(a.prototype, "name", {
                get: function () {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "objectId", {
                get: function () {
                    return this._objectId
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
        a.ResultObject = k;
        k = function () {
            function a() {
                this._objects = []
            }
            Object.defineProperty(a.prototype, "meshList", {
                get: function () {
                    return this._objects
                },
                enumerable: !0,
                configurable: !0
            });
            a.prototype.add =
                function (a) {
                    this.meshList.push(a)
                };
            return a
        }();
        a.Result = k
    })(a.SearchEngine || (a.SearchEngine = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = "\\^$+*?.".split(""),
            h = function () {
                function f(a, e, b, c, g) {
                    this._term = a;
                    this._type = e;
                    this._mode = b;
                    this._caseSensitive = c;
                    this._smartSceneId = g._smartScene.sceneId;
                    this._jqTree = g._treeView._jqTree;
                    this._treeViewDatas = g._treeView.dataStack
                }
                Object.defineProperty(f.prototype, "result", {
                    get: function () {
                        return this._result
                    },
                    enumerable: !0,
                    configurable: !0
                });
                Object.defineProperty(f.prototype, "meshList", {
                    get: function () {
                        return this._result.meshList
                    },
                    enumerable: !0,
                    configurable: !0
                });
                f.prototype.proceed =
                    function () {
                        this._result = new k.Result;
                        switch (this._type) {
                            case a.Modules_.SearchType.name:
                                this.proceedInName();
                                break;
                            case a.Modules_.SearchType.type:
                                this.proceedInType()
                        }
                    };
                f.prototype.proceedInName = function () {
                    var d;
                    switch (this._mode) {
                        case a.Modules_.SearchMode.normal:
                            for (d = 0; d < m.length; d++) this._term = this._term.replace(m[d], "\\" + m[d]);
                            d = this._caseSensitive ? new RegExp(this._term, "") : new RegExp(this._term, "i");
                            break;
                        case a.Modules_.SearchMode.regex:
                            d = this._caseSensitive ? new RegExp(this._term, "") : new RegExp(this._term,
                                "i");
                            break;
                        case a.Modules_.SearchMode.wildcard:
                            this._term = this._term.replace("*", ""), d = this._caseSensitive ? new RegExp(this._term, "") : new RegExp(this._term, "i")
                    }
                    this._searchInNodes(new Teia.gui.NodeData(null, null, this._treeViewDatas), d);
                    a.Utilities.Event.fire(this, f.SEARCH_COMPLETE_EVENT, this)
                };
                f.prototype._searchInNodes = function (a, e) {
                    e.test(a.Label) && this._result.add(new k.ResultObject(a.Label, a.Id));
                    for (var b in a.Children) this._searchInNodes(a.Children[b], e)
                };
                f.prototype.proceedInType = function () {
                    var d =
                        this,
                        e = $.ajax({
                            type: "GET",
                            url: "Teia.TeiaJS/Search/Type?Type=" + this._term + "&sceneId=" + this._smartSceneId,
                            dataType: "json"
                        });
                    e.done(function (b) {
                        for (var c = 0; c < b.Result.id.length; c++) {
                            var g = d._jqTree.tree("getNodeById", b.Result.id[c]);
                            d._result.add(new k.ResultObject(g.name, g.id))
                        }
                        a.Utilities.Event.fire(d, f.SEARCH_COMPLETE_EVENT, d)
                    });
                    e.fail(function (a, c) {
                        console.log("Request failed: " + c)
                    })
                };
                f.prototype._onSearchComplete = function () {
                    console.warn("Deprecated use of Search._onSearchComplete")
                };
                return f
            }();
        h.SEARCH_COMPLETE_EVENT = "searchComplete";
        k.Search = h
    })(a.SearchEngine || (a.SearchEngine = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m;
        (function (a) {
            a[a.normal = 0] = "normal";
            a[a.regex = 1] = "regex";
            a[a.wildcard = 2] = "wildcard"
        })(m = k.SearchMode || (k.SearchMode = {}));
        (function (a) {
            a[a.name = 0] = "name";
            a[a.type = 1] = "type";
            a[a.attribut = 2] = "attribut"
        })(k.SearchType || (k.SearchType = {}));
        var h = function (f) {
            function d(a, b) {
                var c = f.call(this) || this;
                c._smartSceneTreeView = a;
                c._viewportsControl = b;
                c._searches = [];
                c._searchBoxes = [];
                return c
            }
            __extends(d, f);
            Object.defineProperty(d.prototype, "smartSceneTreeView", {
                set: function (a) {
                    this._smartSceneTreeView =
                        a
                },
                enumerable: !0,
                configurable: !0
            });
            d.prototype.addSearchBox = function (e) {
                this._searchBoxes.push(new a.Modules_.SearchBox(this, e))
            };
            d.prototype.newSearch = function (e, b, c, g) {
                var d = this;
                this._viewportsControl.freeze(!1);
                if (e && "" !== e) return e = new a.SearchEngine.Search(e, b, c, g, this._smartSceneTreeView), a.Utilities.Event.on(e, a.SearchEngine.Search.SEARCH_COMPLETE_EVENT, $.proxy(function (c, b) {
                        d.displayResult(b);
                        a.Utilities.Event.off(b, a.SearchEngine.Search.SEARCH_COMPLETE_EVENT)
                    }, this)), e.proceed(), this._searches.push(e),
                    this._viewportsControl.unfreeze(), e;
                $(".resultsList").empty()
            };
            d.prototype.displayResult = function (a) {
                a = a.meshList;
                $(".resultsList").empty();
                for (var b = 0; b < a.length; b++) {
                    var c = document.createElement("li");
                    c.className = "result uk-comment-meta";
                    var g = -1 != this._viewportsControl.noInfoboxObjects.indexOf(a[b].objectId) ? ' <i class="Teia-Icons-About Teia-Icons-Size-Small"></i>' : ' <a  class="treeview-icone   " href= \'javascript:' + this._viewportsControl.namespace + ".viewport.vueZoom(" + a[b].objectId + ");" + this._viewportsControl.namespace +
                        ".viewport._showInfoBox();'  data-node-id=\"" + a[b].objectId + '" data-uk-tooltip title="Info box"><i class="Teia-Icons-About Teia-Icons-Size-Small"></i></a>';
                    c.innerHTML = a[b].name + "<input type='hidden' value=" + a[b].objectId + '><div class="button-search"> <a  class="treeview-icone " href= \'javascript:' + this._viewportsControl.namespace + ".viewport.vueZoom(" + a[b].objectId + ");'  data-node-id=\"" + a[b].objectId + '" data-uk-tooltip title="Zoom on target"><i class="Teia-Icons-Zoom-In Teia-Icons-Size-Small"></i></a>' +
                        g + "</div>";
                    $(c).data("objectId", a[b].objectId);
                    $(".resultsList").append(c);
                    var e = this;
                    $(c).click(function () {
                        e._smartSceneTreeView._smartScene._addObjectToSelection($(this).data("objectId"), !0)
                    })
                }
            };
            d.prototype.showHide = function () {
                for (var a = 0; a < this._searchBoxes.length; a++) this._searchBoxes[a].showHide()
            };
            return d
        }(k.ModuleBase);
        k.SearchManager = h;
        h = function (f) {
            function d(a, b) {
                var c = f.call(this) || this;
                c._searchManager = a;
                c._container = b || document.body;
                c._boxContainer = document.createElement("div");
                c._boxContainer.className =
                    "uk-search";
                c._boxContainer.id = "searchBoxId";
                c._searchField = document.createElement("input");
                c._searchField.style.width = "95%";
                c._searchField.style.top = "-3px";
                c._searchField.style.height = "30px";
                c._searchField.setAttribute("type", "text");
                c._searchField.setAttribute("class", "uk-search-field");
                c._searchField.setAttribute("name", "searchField");
                c._searchField.setAttribute("id", "searchField");
                c._searchField.setAttribute("results", "10");
                c._searchField.setAttribute("autosave", "unique");
                c._searchField.setAttribute("placeholder",
                    "Rechercher ...");
                c._searchResults = document.createElement("div");
                c._searchResults.className = "searchResults";
                c._searchResults.id = "resultsList-searchBoxId";
                c._searchResults.style.display = "none";
                c._searchResultsList = document.createElement("ul");
                c._searchResultsList.className = "resultsList uk-list uk-list-striped";
                c._searchResultsList.style.height = "200px";
                c._searchResultsList.style.overflow = "auto";
                c._close = document.createElement("a");
                c._close.className = "uk-modal-close uk-close search-field-close";
                c._searchResults.appendChild(c._searchResultsList);
                c._searchResults.appendChild(c._close);
                c._boxContainer.appendChild(c._searchField);
                c._boxContainer.appendChild(c._searchResults);
                c._boxContainer.appendChild(c._close);
                c._container.appendChild(c._boxContainer);
                c._binding();
                return c
            }
            __extends(d, f);
            Object.defineProperty(d.prototype, "searchResultList", {
                get: function () {
                    return this._searchResultsList
                },
                enumerable: !0,
                configurable: !0
            });
            d.prototype._binding = function () {
                var e = this,
                    b = null;
                $(this._searchField).keypress(function (c) {
                    13 == (c.keyCode ? c.keyCode : c.which) &&
                        (c = $(e._searchField).val(), e._searchManager.newSearch(c, a.Modules_.SearchType.name, m.regex, !1), null == b && (b = $("#resultsList-searchBoxId").jqxPopover({
                            offset: {
                                left: 80,
                                top: 0
                            },
                            autoClose: !0,
                            animationOpenDelay: 100,
                            width: 250,
                            height: 250,
                            animationCloseDelay: 100,
                            animationType: "fade",
                            title: "Recherche : " + $("#searchField").val(),
                            position: "bottom",
                            showCloseButton: !0,
                            selector: $("#searchField")
                        })), b.jqxPopover("open"))
                });
                $(this._searchType).change(function () {
                    var c = $(e._searchField).val();
                    e._searchManager.newSearch(c,
                        a.Modules_.SearchType.name, m.regex, !1);
                    null == b && (b = $("#resultsList-searchBoxId").jqxPopover({
                        autoClose: !0,
                        animationOpenDelay: 100,
                        width: 250,
                        height: 220,
                        animationCloseDelay: 100,
                        animationType: "fade",
                        position: "bottom",
                        title: "Recherche :" + $("#searchField").val(),
                        showCloseButton: !0,
                        selector: $("#searchField")
                    }));
                    $("#resultsList-searchBoxId").jqxPopover({
                        title: "<i class='material-icons'>search</i> Recherche : " + $("#searchField").val()
                    });
                    $("#resultsList-searchBoxId").jqxPopover("open")
                });
                $(this._close).click(function () {
                    $(e._searchField).val("");
                    var c = $(e._searchField).val();
                    e._searchManager.newSearch(c, a.Modules_.SearchType.name, m.regex, !1)
                })
            };
            d.prototype.showHide = function () {
                $(this._boxContainer).fadeToggle()
            };
            return d
        }(k.ModuleBase);
        k.SearchBox = h
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(d) {
                if (d) {
                    var e = h.call(this) || this;
                    e._actionsManager = d;
                    e._objectsActions = new a.Utilities.Set;
                    e._selectedObjectsIds = [];
                    e._selectedMeshesNames = [];
                    e._currentSceneFile = "";
                    e._jsonKeys = {};
                    a.Utilities.SignalR.addSignalRCallback("objectRemovedFromScene", $.proxy(e._onObjectRemovedEvent, e));
                    a.Utilities.SignalR.addSignalRCallback("objectsRemovedFromScene", $.proxy(e._onObjectsRemovedEvent, e));
                    a.Utilities.SignalR.addSignalRCallback("objectParentChanged", $.proxy(e._onObjectParentChangedEvent,
                        e));
                    a.Utilities.SignalR.addSignalRCallback("objectComponentUpdated", $.proxy(e._onObjectThreeDUpdated, e));
                    a.Utilities.SignalR.addSignalRCallback("notificationChangePosition", $.proxy(e._onPositionChanged, e));
                    e._actionsManager.bindSignalEvents();
                    return e
                }
                console.error("You must provide a valid actionsManager")
            }
            __extends(f, h);
            Object.defineProperty(f.prototype, "objectsActions", {
                get: function () {
                    return this._objectsActions
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "selectedObjectsIds", {
                get: function () {
                    return this._selectedObjectsIds
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "zoomOnObjectName", {
                get: function () {
                    return this._zoomOnObjectName
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "sceneId", {
                get: function () {
                    return this._sceneId
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(f.prototype, "sceneClearColor", {
                get: function () {
                    return this._sceneClearColor
                },
                enumerable: !0,
                configurable: !0
            });
            f.prototype._onObjectRemovedEvent = function (d) {
                a.Utilities.Event.fire(this,
                    f.REMOVED_OBJECT_EVENT, d);
                this._actionsManager.onObjectRemoved(d)
            };
            f.prototype._onObjectsRemovedEvent = function (d) {
                d && 0 !== d.length && (a.Utilities.Event.fire(this, f.REMOVED_OBJECTS_EVENT, d), this._actionsManager.onObjectsRemoved(d))
            };
            f.prototype._onObjectParentChangedEvent = function (d, e) {
                a.Utilities.Event.fire(this, f.CHANGED_PARENT_OBJECT_EVENT, d, e)
            };
            f.prototype._onObjectThreeDUpdated = function (d) {
                var e = this;
                void 0 != this._firstParsingEndedDone && this._firstParsingEndedDone && a.Utilities.Request.Post(a.Urls.getObjectUrl,
                    JSON.stringify(a.Utilities.Helpers.makeArray({
                        ObjectId: d
                    }))).done(function (b) {
                    b = JSON.parse(b);
                    b = a.Utilities.Helpers.makeArray(b[e._jsonKeys.Object]);
                    for (var c in b) e._tryParseObject(b[c], !0)
                })
            };
            f.prototype._onPositionChanged = function (d, e, b) {
                a.Utilities.Event.fire(this, f.POSITION_CHANGED_EVENT, d, e, b)
            };
            f.prototype._addObjectToSelection = function (d, e, b, c) {
                void 0 === c && (c = !0);
                var g = -1 === this._selectedObjectsIds.indexOf(d);
                e && (1 != this._selectedObjectsIds.length || g) && this._clearObjectsSelection();
                if (d) {
                    if (e) this._clearObjectsSelection();
                    else if (!g) return;
                    this._selectedObjectsIds.push(d);
                    this._selectedMeshesNames.push(b);
                    c && a.Utilities.Event.fire(this, a.Modules_.SmartScene.SELECTION_ADDED_EVENT, d, e, b)
                }
            };
            f.prototype._addObjectToZoomOnSelection = function (a, e) {
                this._zoomOnObjectName = {
                    name: a,
                    parentName: e
                }
            };
            f.prototype._removeObjectFromSelection = function (d) {
                var e = this._selectedObjectsIds.indexOf(d); - 1 != e && (this._selectedObjectsIds.splice(e, 1), this._selectedMeshesNames.splice(e, 1), a.Utilities.Event.fire(this, f.SELECTION_REMOVED_EVENT, d,
                    0 === this._selectedObjectsIds.length, this._selectedMeshesNames))
            };
            f.prototype._clearObjectsSelection = function () {
                var d = this._selectedObjectsIds.slice(0);
                this._selectedObjectsIds.length = 0;
                this._zoomOnObjectName = {
                    name: null,
                    parentName: null
                };
                this._selectedMeshesNames.length = 0;
                a.Utilities.Event.fire(this, f.SELECTION_CLEARED_EVENT, d)
            };
            f.prototype._isLoadNeeded = function (d) {
                if (this._currentSceneFile === a.Urls.baseUrl + d) return this._needUnloadScene = !1;
                if ((this._needUnloadScene = "" !== this._currentSceneFile) && !window.confirm("You are about to modify the current scene. Do you want to proceed ?")) {
                    d =
                        d.split("?");
                    if (d = 0 < d.length ? d[1] : null) {
                        d = d.split("&");
                        for (var e = 0; e < d.length; e++) {
                            var b = d[e].split("=");
                            "objectId" == b[0] && a.Utilities.Event.fire(this, a.Modules_.SmartScene.SELECTION_REMOVED_EVENT, b[1])
                        }
                    }
                    return !1
                }
                this._currentSceneFile = a.Urls.baseUrl + d;
                this.homePage && (this.homePage = !1);
                return !0
            };
            f.prototype._unloadPreviousScene = function () {
                a.Utilities.Event.off(this._actionsManager, k.ActionsManager.OBJECTSACTIONS_UPDATED);
                a.Utilities.Event.off(this._actionsManager, k.ActionsManager.FETCHED_EVENT);
                this._actionsManager.destroy();
                this._actionsManager = new k.ActionsManager;
                a.Utilities.Event.fire(this, f.SCENE_CLEARED_EVENT)
            };
            f.prototype.setFromUrl = function (d, e, b, c) {
                var g = this;
                if (!this._isLoadNeeded(d) && !e) return !1;
                a.Utilities.Event.fire(this, f.GETTING_TEIA_SCENE_EVENT);
                $.getJSON(this._currentSceneFile, function (a) {
                    if (!a) return !1;
                    g._needUnloadScene && !b && g._unloadPreviousScene();
                    if (a.bjs) g.setFromBabylon(a.bjs, !1, !0, b);
                    else {
                        for (var e in a._) g._jsonKeys[e] = a._[e];
                        g._typeL = a[g._jsonKeys.typeL];
                        g._tryParseSmartScene(a[g._jsonKeys.SmartScene],
                            c);
                        return !0
                    }
                }).fail(function () {
                    a.Utilities.Event.fire(g, f.ERROR_GETTING_TEIA_SCENE_EVENT)
                })
            };
            f.prototype.setFromJSON = function (a) {
                throw "Not implemented yet";
            };
            f.prototype.setFromBabylon = function (d, e, b, c) {
                var g = this;
                if (!b && !e && !this._isLoadNeeded(d)) return !1;
                a.Utilities.Event.fire(this, f.GETTING_TEIA_SCENE_EVENT);
                $.getJSON(b ? a.Urls.baseUrl + d : this._currentSceneFile, function (c) {
                    if (!c) return !1;
                    g._needUnloadScene && !e && g._unloadPreviousScene();
                    var b = c.meshes.length;
                    a.Utilities.Event.fire(g, f.PARSING_STARTED_EVENT,
                        b);
                    var l = new Worker(a.Urls.scriptsUrl + "/smartSceneWebWorker.js");
                    l.onmessage = function (c) {
                        setTimeout(function () {
                            a.Utilities.Event.fire(g, f.ADDED_OBJECT_EVENT, c.data.id, null, d, c.data.id, null, c.data.parentId, c.data.name, c.data.publish, !0, !0, !0);
                            b--;
                            0 === b && a.Utilities.Event.fire(g, f.PARSING_ENDED_EVENT)
                        }, 10)
                    };
                    l.postMessage(c.meshes)
                }).fail(function () {
                    a.Utilities.Event.fire(g, f.ERROR_GETTING_TEIA_SCENE_EVENT)
                });
                return !0
            };
            f.prototype._tryParseSmartScene = function (d, e) {
                a.Utilities.Event.fire(this, f.PARSING_STARTED_EVENT,
                    d[this._jsonKeys.Object].length, d[this._jsonKeys.name]);
                d && (this._tryParseObjects(d, e), e || this._tryParseLayers(d), this._sceneClearColor = new BABYLON.Color4(1, 1, 1, 0), a.Utilities.SignalR.setTeiaJSReady(), a.Utilities.Event.fire(this, f.PARSING_ENDED_EVENT))
            };
            f.prototype.addObjectsFromTeiaServer = function (d) {
                var e = this;
                void 0 != this._firstParsingEndedDone && this._firstParsingEndedDone && (d = a.Utilities.Helpers.makeArray(d), a.Utilities.Event.fire(this, f.PARSING_STARTED_EVENT, d.length), a.Utilities.Request.Post(a.Urls.getObjectUrl,
                    JSON.stringify(d)).done(function (b) {
                    b = JSON.parse(b);
                    b = a.Utilities.Helpers.makeArray(b[e._jsonKeys.Object]);
                    for (var c in b) e._tryParseObject(b[c])
                }).always(function () {
                    a.Utilities.Event.fire(e, f.PARSING_ENDED_EVENT)
                }))
            };
            f.prototype._tryParseObjects = function (a, e) {
                this._children = [];
                if (!a) return !1;
                this._tryParseObject(a, !1, e)
            };
            f.prototype._tryParseObject = function (d, e, b) {
                if (!d) return !1;
                var c = a.Utilities.Helpers.makeArray(d[this._jsonKeys.Object]);
                if (c)
                    for (var g = c.length, l = !0, n = 0; n < g; ++n) l = this._tryParseObject(c[n],
                        e, b) && l;
                if (d[this._jsonKeys.sceneId]) return this._sceneId = d[this._jsonKeys.sceneId], a.Utilities.SignalR.sceneId = this._sceneId, !0;
                a.Utilities.Event.fire(this, f.ADDING_OBJECT_EVENT, d[this._jsonKeys.id]);
                this._children[d[this._jsonKeys.parentId]] = this._children[d[this._jsonKeys.parentId]] || [];
                this._children[d[this._jsonKeys.parentId]].push(d[this._jsonKeys.id]);
                if (d[this._jsonKeys.material] && d[this._jsonKeys.material][this._jsonKeys.color]) {
                    var h = d[this._jsonKeys.material][this._jsonKeys.color];
                    h = {
                        r: parseInt(h.substring(1,
                            3), 16) / 255,
                        g: parseInt(h.substring(3, 5), 16) / 255,
                        b: parseInt(h.substring(5, 7), 16) / 255,
                        hex: !0
                    }
                }
                if (!d[this._jsonKeys.file]) {
                    var k = d[this._jsonKeys.box];
                    if (k) return this._fireObjectEvent(e, d[this._jsonKeys.id], this._children[d[this._jsonKeys.id]], null, null, h, d[this._jsonKeys.parentId], d[this._jsonKeys.name], d[this._jsonKeys.publish], d[this._jsonKeys.noInfobox] || b, d[this._jsonKeys.clickable], d[this._jsonKeys.visible], {
                            height: k[this._jsonKeys.boxH],
                            width: k[this._jsonKeys.boxD],
                            depth: k[this._jsonKeys.boxW]
                        },
                        null, d[this._jsonKeys.treeview]), !0;
                    if (k = d[this._jsonKeys.sphere]) return this._fireObjectEvent(e, d[this._jsonKeys.id], this._children[d[this._jsonKeys.id]], null, null, h, d[this._jsonKeys.parentId], d[this._jsonKeys.name], d[this._jsonKeys.publish], d[this._jsonKeys.noInfobox] || b, d[this._jsonKeys.clickable], d[this._jsonKeys.visible], null, k[this._jsonKeys.radius], d[this._jsonKeys.treeview]), !0;
                    this._fireObjectEvent(e, d[this._jsonKeys.id], this._children[d[this._jsonKeys.id]], null, null, null, d[this._jsonKeys.parentId],
                        d[this._jsonKeys.name], d[this._jsonKeys.publish], d[this._jsonKeys.noInfobox] || b, d[this._jsonKeys.clickable], d[this._jsonKeys.visible], null, null, d[this._jsonKeys.treeview]);
                    return !0
                }
                c = a.Utilities.Helpers.makeArray(d[this._jsonKeys.file][this._jsonKeys.mesh]);
                for (k in c) this._fireObjectEvent(e, d[this._jsonKeys.id], this._children[d[this._jsonKeys.id]], a.Urls.babylonResponseUrl + d[this._jsonKeys.file][this._jsonKeys.src], c[k], h, d[this._jsonKeys.parentId], d[this._jsonKeys.name], d[this._jsonKeys.publish],
                    d[this._jsonKeys.noInfobox] || b, d[this._jsonKeys.clickable], d[this._jsonKeys.visible], null, null, d[this._jsonKeys.treeview])
            };
            f.prototype._fireObjectEvent = function (d, e, b, c, g, l, n, h, k, r, m, x, q, z, u) {
                void 0 === d && (d = !1);
                a.Utilities.Event.fire(this, d ? f.UPDATED_THREED_OBJECT_EVENT : f.ADDED_OBJECT_EVENT, e, b, c, g, l, n, h, k, r, m, x, q, z, u)
            };
            f.prototype._tryParseLayers = function (d) {
                if (!d || !d[this._jsonKeys.Layer]) return !1;
                this._binding();
                var e = a.Utilities.Helpers.makeArray(d[this._jsonKeys.Layer]),
                    b;
                for (b in e) {
                    var c =
                        e[b];
                    this._actionsManager.addLayer(d[this._jsonKeys.smartSceneId], c[this._jsonKeys.id], c[this._jsonKeys.name], c[this._jsonKeys.initiallyActivated]);
                    a.Utilities.Event.fire(this, f.PARSED_LAYER_EVENT, [c[this._jsonKeys.id], c[this._jsonKeys.name], c[this._jsonKeys.initiallyActivated]])
                }
                return !0
            };
            f.prototype._binding = function () {
                var d = this;
                a.Utilities.Event.on(this._actionsManager, k.ActionsManager.OBJECTSACTIONS_UPDATED, function (a, b) {
                    a = d._tryParseObjectsActions(b);
                    d.updateObjectsActions(a)
                });
                a.Utilities.Event.on(this._actionsManager,
                    k.ActionsManager.OBJECTSACTIONS_REMOVED,
                    function (a, b, c) {
                        d._removeObjectAction(b, c)
                    });
                a.Utilities.Event.on(this._actionsManager, k.ActionsManager.FETCHED_EVENT, function () {
                    console.log("fetched")
                })
            };
            f.prototype._unbinding = function () {
                a.Utilities.Event.off(this._actionsManager, k.ActionsManager.OBJECTSACTIONS_UPDATED);
                a.Utilities.Event.off(this._actionsManager, k.ActionsManager.OBJECTSACTIONS_REMOVED);
                a.Utilities.Event.off(this._actionsManager, k.ActionsManager.FETCHED_EVENT)
            };
            f.prototype._tryParseObjectsActions =
                function (d) {
                    if (d) {
                        d = a.Utilities.Helpers.makeArray(d);
                        for (var e in d) {
                            var b = a.ObjectActions.ObjectAction.newObjectAction(d[e]);
                            if (b) {
                                var c = c || [];
                                c.push(b)
                            }
                        }
                        return c
                    }
                };
            f.prototype.updateObjectsActions = function (a) {
                if (a)
                    for (var e in a) {
                        var b = a[e];
                        this._objectsActions.getUniqueObject(b.id) ? this._objectsActions.setUniqueObject(b.id, b) : this._objectsActions.add(b, b.id)
                    }
            };
            f.prototype._removeObjectAction = function (a, e) {
                this._objectsActions.remove(a + "_" + e)
            };
            f.prototype.dispose = function () {
                a.Utilities.SignalR.dispose();
                this._unbinding()
            };
            return f
        }(k.ModuleBase);
        m.GETTING_TEIA_SCENE_EVENT = "gettingTeiaScene";
        m.ERROR_GETTING_TEIA_SCENE_EVENT = "errorGettingTeiaScene";
        m.PARSING_STARTED_EVENT = "parsingStarted";
        m.PARSING_ENDED_EVENT = "parsingEnded";
        m.ADDING_OBJECT_EVENT = "parsingObject";
        m.ADDED_OBJECT_EVENT = "parsedObject";
        m.REMOVED_OBJECT_EVENT = "removedObject";
        m.REMOVED_OBJECTS_EVENT = "removedObjects";
        m.UPDATED_THREED_OBJECT_EVENT = "updatedThreeDObjectEvent";
        m.POSITION_CHANGED_EVENT = "positionChanged";
        m.CHANGED_PARENT_OBJECT_EVENT =
            "changedParentObject";
        m.SELECTION_ADDED_EVENT = "selectionAdded";
        m.SELECTION_REMOVED_EVENT = "selectionRemoved";
        m.SELECTION_CLEARED_EVENT = "selectionCleared";
        m.SCENE_CLEARED_EVENT = "sceneCleared";
        m.PARSED_LAYER_EVENT = "parsedLayer";
        k.SmartScene = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (a) {
        var k = function () {
            function a(a, b, c, g, d) {
                this.label = a;
                this.id = b;
                this.children = c;
                this.parentId = g;
                this.isVisible = d
            }
            Object.defineProperty(a.prototype, "IsVisible", {
                get: function () {
                    return this.isVisible
                },
                set: function (a) {
                    this.isVisible = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "Label", {
                get: function () {
                    return this.label
                },
                set: function (a) {
                    this.label = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "Id", {
                get: function () {
                    return this.id
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "Children", {
                get: function () {
                    return this.children
                },
                set: function (a) {
                    this.children = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "ParentId", {
                get: function () {
                    return this.parentId
                },
                set: function (a) {
                    this.parentId = a
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
        a.NodeData = k;
        var h;
        (function (a) {
            a[a.INSIDE = 0] = "INSIDE";
            a[a.UPSIDE = 1] = "UPSIDE";
            a[a.DOWNSIDE = 2] = "DOWNSIDE"
        })(h || (h = {}));
        var f = function () {
            function a(a, b, c, g, l) {
                void 0 === l && (l = !1);
                var e = this;
                this._numberOfObjectsAdded = 0;
                this._pendingChildrenStack = {};
                this._unclickableIds = [];
                this._noTitle = !0;
                this._disabledNodeData = {};
                this._viewportsControl = a;
                var d = this;
                "OffCanvas" == this._viewportsControl._viewportsControlOptions.treeViewType ? (this._offCanvasContainer = document.createElement("div"), this._offCanvasContainer.className = "stereograph-treeView-container-offcanvas noselect uk-offcanvas", this._offCanvasContainer.id = "id-stereograph-treeView-container-offcanvas-" + this._viewportsControl.namespace,
                    this._offCanvasBarContainer = document.createElement("div"), this._offCanvasBarContainer.className = "stereograph-treeView-container-offcanvas-bar noselect uk-offcanvas-bar", this._offCanvasBarContainer.id = "id-stereograph-treeView-container-offcanvas-bar-" + this._viewportsControl.namespace, this._offCanvasBarContainer.setAttribute("mode", "slide"), this._scrollContainer = document.createElement("div"), this._scrollContainer.className = "stereograph-treeView-container noselect uk-overflow-container", this._scrollContainer.id =
                    "id-stereograph-treeView-container-" + this._viewportsControl.namespace, this._offCanvasContainer.appendChild(this._offCanvasBarContainer), this._offCanvasBarContainer.appendChild(this._scrollContainer), this._container = document.createElement("div"), this._container.className = "stereograph-treeView", $(this._scrollContainer).append("<a class='uk-close stereograph-treeView-close'></a> <h3><i class='Teia-Icons-Tree-Structure'></i> TreeView</h3>"), $("body").append(this._offCanvasContainer)) : (this._modalContainer =
                    document.createElement("div"), this._modalContainer.className = "stereograph-treeView-container-modal noselect uk-panel uk-panel-box", this._modalContainer.id = "id-stereograph-treeView-container-modal-" + this._viewportsControl.namespace, this._modalContainer.style.display = "none", this._scrollContainer = document.createElement("div"), this._scrollContainer.className = "stereograph-treeView-container-Modal-Scrollbar noselect uk-overflow-container", this._scrollContainer.id = "id-stereograph-treeView-container-" + this._viewportsControl.namespace,
                    this._modalContainer.appendChild(this._scrollContainer), this._container = document.createElement("div"), this._container.className = "stereograph-treeView", $(this._scrollContainer).append("<a class='uk-close uk-close-alt absolute-close stereograph-treeView-close'></a> <h3 class='stereograph-treeView-container-header uk-panel-header'><i class='Teia-Icons-Tree-Structure Teia-Icons-Size-Small'></i> TreeView</h3>"), $("body").append(this._modalContainer), $(this._modalContainer).draggable({
                        containment: "parent",
                        zIndex: 1E4,
                        opacity: .7,
                        handle: ".stereograph-treeView-container-header"
                    }, {
                        start: function () {},
                        drag: function () {
                            d._viewportsControl.freeze(!1, !1);
                            d._viewportsControl._updateSelectionUI()
                        },
                        stop: function () {
                            d._viewportsControl.unfreeze()
                        }
                    }));
                g && g.addSearchBox(this._scrollContainer);
                this._scrollContainer.appendChild(this._container);
                $(this._container);
                this._jqTree = $(this._container).tree({
                    data: [],
                    autoOpen: !1,
                    slide: !1,
                    autoEscape: !1,
                    keyboardSupport: !0,
                    closedIcon: jQuery('<i class="uk-icon-angle-right"></i>'),
                    openedIcon: jQuery('<i class="uk-icon-angle-down"></i>'),
                    onCreateLi: function (a, c) {
                        l || a.isVisible && c.find(".jqtree-element").after('<div class="container-switch"><label class="switch switch-blue"><input id="checkbox-node-' + a.id + '" checked class=" switch-input" data-node-id="' + a.id + '" OnClick="' + e._viewportsControl.namespace + ".viewport.toggleVisible(" + a.id + ');event.stopPropagation();" type = "checkbox" >  <span class="switch-label" data-on="" data-off=""></span><span class="switch-handle"></span></label></div>')
                    }
                });
                "OffCanvas" == this._viewportsControl._viewportsControlOptions.treeViewType ? (this._viewportsControl.addButtonGroup("id-stereograph-treeView-container-" + this._viewportsControl.namespace + "-buttonTreeview", "uk-link", "Teia-Icons-Tree-Structure", {}, function () {
                    $("#" + d._offCanvasContainer.id).is(":visible") ? UIkit.offcanvas.hide(!1) : UIkit.offcanvas.show("#" + d._offCanvasContainer.id, {
                        mode: "slide"
                    })
                }, null, "TreeView"), $("#" + this._scrollContainer.id).addClass("stereograph-treeview"), $(this._scrollContainer).find(".stereograph-treeView-close").on("click",
                    function () {
                        $("#" + d._offCanvasContainer.id).is(":visible") && UIkit.offcanvas.hide(!1)
                    })) : (this._viewportsControl.addButtonGroup("id-stereograph-treeView-container-" + this._viewportsControl.namespace + "-buttonTreeview", "uk-link", "Teia-Icons-Tree-Structure", {}, function () {
                    $("#" + d._modalContainer.id).is(":visible") ? $("#" + d._modalContainer.id).hide() : $("#" + d._modalContainer.id).show()
                }, null, "TreeView"), $("#" + this._scrollContainer.id).addClass("stereograph-treeview"), $(this._scrollContainer).find(".stereograph-treeView-close").on("click",
                    function () {
                        $("#" + d._modalContainer.id).is(":visible") && $("#" + d._modalContainer.id).hide()
                    }));
                this._binding();
                this._highlightedNodes = {};
                this._dataIndexes = {};
                this._orphanDataStack = {};
                this._dataStack = [];
                this._viewportsControl._viewportsControlOptions.treeViewAutoOpen && ("OffCanvas" == this._viewportsControl._viewportsControlOptions.treeViewType ? UIkit.offcanvas.show("#" + d._offCanvasContainer.id, {
                    mode: "slide"
                }) : $("#" + d._modalContainer.id).show())
            }
            Object.defineProperty(a.prototype, "dataStack", {
                get: function () {
                    this._rebuildFullDataStack();
                    return this._dataStack
                },
                enumerable: !0,
                configurable: !0
            });
            a.prototype.setTitle = function (a, b) {
                void 0 === b && (b = !1);
                if (this._noTitle || b) {
                    b = document.createElement("header");
                    var c = document.createElement("h1");
                    c.className = "tm-margin-large-top tm-heading-large";
                    c.textContent = a;
                    b.appendChild(c)
                }
            };
            a.prototype._hubConnection_StateChanged = function (a) {
                var b = {
                    0: "connecting",
                    1: "connected",
                    2: "reconnecting",
                    4: "disconnected"
                };
                console.log("SignalR state changed from: " + b[a.oldState] + " to: " + b[a.newState])
            };
            a.prototype.setParentNode =
                function (a, b) {
                    var c = this._jqTree.tree("getSelectedNode");
                    (a = this._jqTree.tree("getNodeById", a)) && a.parent && a.parent.id !== b && (b = this._jqTree.tree("getNodeById", b)) && (this._mCustomScrollbar = null, this._jqTree.tree("moveNode", a, b, "inside"), this._refresh(), this.addToSelection(c.id, !1, !0))
                };
            a.prototype.enableNode = function (a) {
                this._disabledNodeData[a] && (this._unclickableIds = this._unclickableIds.filter(function (b, c) {
                        return b !== a
                    }), this._addNodeData(this._dataStack, this._disabledNodeData[a].data, this._disabledNodeData[a].parentId),
                    this._reloadData(), delete this._disabledNodeData[a])
            };
            a.prototype.disableNode = function (a) {
                if (!this._disabledNodeData[a]) {
                    this._unclickableIds.push(a);
                    var b = this._jqTree.tree("getNodeById", a);
                    b = b ? b.parent : null;
                    this._disabledNodeData[a] = {
                        parentId: b ? b.id : -1,
                        data: this._dataIndexes[a]
                    };
                    this._removeNodeData(a);
                    this._reloadData()
                }
            };
            a.prototype.unactivateNodes = function (a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    this._disabledNodeData[c.objectId] = {
                        data: this._dataIndexes[c.objectId],
                        parentId: this._dataIndexes[c.objectId].ParentId
                    };
                    c = $("#checkbox-node-" + c.objectId);
                    c.attr("disabled", "disabled");
                    c.parent().parent().addClass("treeview-disabled")
                }
            };
            a.prototype.tryAdd = function (a, b, c, g, l, d, f, h, r) {
                void 0 === f && (f = !0);
                void 0 === h && (h = !0);
                void 0 === r && (r = !0);
                if (!a || !b) return this._numberOfObjectsAdded++, !1;
                $(this._scrollContainer).hasClass("loadingTreeview") || $(this._scrollContainer).addClass("loadingTreeview");
                b = 30 < b.length ? new k('<span class="' + (h ? "node-selected" : "node-unselected") + '" style="text-overflow: ellipsis;overflow:hidden;width: 210px;white-space: nowrap;display: block;" >' +
                    b + "</span>", a, [], g, f) : new k('<span class="' + (h ? "node-selected" : "node-unselected") + '">' + b + "</span>", a, [], g, f);
                h || this._unclickableIds.push(a);
                r && (this._dataStack = this._addNodeData(this._dataStack, b, g, d));
                this._numberOfObjectsAdded++;
                this._numberOfObjectsAdded >= c && (a = !1, 1 == this._dataStack.length && (this._dataStack.push(null), a = !0), a && this._dataStack.length--, this._mCustomScrollbar = null, this._jqTree.tree("loadData", this._dataStack), this._displayScrollbarIfNeeded(), this._refresh());
                return !0
            };
            a.prototype.tryRemove =
                function (a) {
                    var b = this._jqTree.tree("getNodeById", a);
                    if (!b) return !0;
                    this._jqTree.tree("removeNode", b);
                    this._highlightedNodes[a] && delete this._highlightedNodes[a];
                    this._removeNodeData(a);
                    this._refresh();
                    return !0
                };
            a.prototype.tryRemoveNodes = function (a) {
                for (var b in a) delete this._dataIndexes[a[b]];
                this._removeFromDataStackRecursive(this._dataStack, a);
                this._reloadData()
            };
            a.prototype._reloadData = function () {
                this._jqTree.tree("loadData", this._dataStack)
            };
            a.prototype._removeFromDataStack = function (a) {
                this._removeFromDataStackRecursive(this._dataStack,
                    [a])
            };
            a.prototype._removeFromDataStackRecursive = function (a, b) {
                for (var c in a) {
                    var g = a[c];
                    if (-1 !== b.indexOf(g.Id)) {
                        a.splice(parseInt(c), 1);
                        break
                    }
                    g.Children && this._removeFromDataStackRecursive(g.Children, b)
                }
            };
            a.prototype.tryUdpateLabel = function (a, b) {
                if (!a || !b) return !1;
                a = this._jqTree.tree("getNodeById", a);
                if (!a) return !1;
                this._jqTree.tree("updateNode", a, b);
                this._refresh();
                return !0
            };
            a.prototype.expandAll = function () {
                this._expandOrCollapse("openNode")
            };
            a.prototype.collapseAll = function () {
                this._expandOrCollapse("closeNode")
            };
            a.prototype.toggleDisplay = function () {
                $(this._scrollContainer).is(":visible") ? this.hide() : this.show()
            };
            a.prototype.setVisibleState = function (a, b) {
                a = document.getElementById("checkbox-node-" + a);
                null != a && (a.checked = b)
            };
            a.prototype.show = function () {
                $(this._scrollContainer).show()
            };
            a.prototype.hide = function () {
                $(this._scrollContainer).hide()
            };
            a.prototype.highlightNodeById = function (a, b) {
                this.highlightNode(this._jqTree.tree("getNodeById", a), b)
            };
            a.prototype.highlightNode = function (a, b) {
                a && (this._beforeHighlightingNode(a),
                    this._highlightedNodes[a.id] = this._highlightedNodes[a.id] || {
                        nodeId: a.id,
                        notifications: []
                    }, isNaN(this._highlightedNodes[a.id].notifications[b]) && (this._highlightedNodes[a.id].notifications[b] = 0), this._highlightedNodes[a.id].notifications[b]++, this._showHighlightedIcon(a), this._afterHighlightingNode(a))
            };
            a.prototype.unHighlightNodeById = function (a, b) {
                this.unHighlightNode(this._jqTree.tree("getNodeById", a), b)
            };
            a.prototype.unHighlightNode = function (a, b) {
                if (a) {
                    var c = a.id;
                    0 < this._highlightedNodes[c].notifications[b] &&
                        this._highlightedNodes[c].notifications[b]--;
                    this._showHighlightedIcon(a)
                }
            };
            a.prototype.unHighligthAll = function (a) {
                for (var b in this._highlightedNodes) {
                    var c = this._jqTree.tree("getNodeById", b);
                    if (c)
                        for (; this._highlightedNodes[b].notifications[a];) this.unHighlightNode(c, a)
                }
            };
            a.prototype.addToSelection = function (a, b, c) {
                void 0 === c && (c = !1);
                null != a && (a = this._jqTree.tree("getNodeById", a)) && (this._jqTree.tree("isNodeSelected", a) || this._selectNode(a, c), b || (this._openParentNodes(a.parent), this._scrollTo(a),
                    $(".treeView-selection").removeClass("treeView-selection"), $(".jqtree-selected").addClass("treeView-selection")))
            };
            a.prototype.unselectNodeById = function (a) {
                a = this._jqTree.tree("getNodeById", a);
                this._unselectNode(a)
            };
            a.prototype._binding = function () {
                TeiaJS.Utilities.Event.on(this._container, "tree.dblclick", $.proxy(this._onDbClick, this));
                TeiaJS.Utilities.Event.on(this._container, "tree.click", $.proxy(this._onClick, this));
                TeiaJS.Utilities.Event.on(this._container, "tree.close", $.proxy(this._onNodeClosed,
                    this));
                TeiaJS.Utilities.Event.on(this._container, "tree.open", $.proxy(this._onNodeOpen, this));
                TeiaJS.Utilities.Event.on(this._close, "click", this.hide);
                TeiaJS.Utilities.Event.on(this._container, "mouseup", function (a) {
                    $(".uk-check-box").is(":focus") && $(".container-3d").focus()
                })
            };
            a.prototype._unbinding = function () {
                TeiaJS.Utilities.Event.off(this._container, "tree.dblclick");
                TeiaJS.Utilities.Event.off(this._container, "tree.click");
                TeiaJS.Utilities.Event.off(this._container, "tree.close");
                TeiaJS.Utilities.Event.off(this._container,
                    "tree.open");
                TeiaJS.Utilities.Event.off(this._close, "click");
                TeiaJS.Utilities.Event.off(this._container, "mouseup")
            };
            a.prototype._onDbClick = function (e) {
                e.preventDefault(); - 1 === this._unclickableIds.indexOf(e.node.id) && (this.addToSelection(e.node.id, !1), TeiaJS.Utilities.Event.fire(this, a.NODE_DB_CLICKED_EVENT, e.node.id))
            };
            a.prototype._sortTreeViewFunction = function (a, b) {
                var c = [],
                    g = [];
                if (a && a.Children && !a.Children.sorted) {
                    var e = !1;
                    1 == a.Children.length && (a.Children.push(null), e = !0);
                    a.Children.sort($.proxy(this._sortTreeViewFunction,
                        this));
                    e && a.Children.length--;
                    a.Children.sorted = !0
                }
                b && b.Children && !b.Children.sorted && (e = !1, 1 == b.Children.length && (b.Children.push(null), e = !0), b.Children.sort($.proxy(this._sortTreeViewFunction, this)), e && b.Children.length--, b.Children.sorted = !0);
                if (!a) return 1;
                if (!b) return -1;
                a.Label.replace(/(\d+)|(\D+)/g, function (a, b, g) {
                    c.push([b || Infinity, g || ""]);
                    return null
                });
                for (b.Label.replace(/(\d+)|(\D+)/g, function (a, c, b) {
                        g.push([c || Infinity, b || ""]);
                        return null
                    }); c.length && g.length;)
                    if (a = c.shift(), b = g.shift(),
                        a = a[0] - b[0] || a[1].localeCompare(b[1])) return a;
                return c.length - g.length
            };
            a.prototype._addNodeData = function (a, b, c, g) {
                void 0 === g && (g = !1);
                this._dataIndexes[b.Id] = b;
                if (g) return this._disabledNodeData[b.Id] = {
                    data: b,
                    parentId: c
                }, a;
                if (!c || 0 >= c) return a.push(this._dataIndexes[b.Id]), a;
                this._linkChildrenToParent(c, b.Id);
                return a
            };
            a.prototype._linkChildrenToParent = function (a, b) {
                this._dataIndexes[a] ? this._dataIndexes[a].Children.push(this._dataIndexes[b]) : (this._pendingChildrenStack[a] || (this._pendingChildrenStack[a] = []), this._pendingChildrenStack[a].push(b));
                for (var c in this._pendingChildrenStack[b]) this._linkChildrenToParent(b, this._pendingChildrenStack[b][c])
            };
            a.prototype._removeNodeData = function (a) {
                delete this._dataIndexes[a];
                this._removeFromDataStack(a)
            };
            a.prototype._rebuildFullDataStack = function () {
                for (var a in this._orphanDataStack) this._dataIndexes[a].Children = this._dataIndexes[a].Children.concat(this._orphanDataStack[a]);
                this._orphanDataStack = {}
            };
            a.prototype._getChildNodes = function (a) {
                this._rebuildFullDataStack();
                var b = this._dataStack;
                a && (b = this._dataIndexes[a].Children);
                a ? this._dataIndexes[a].Children = b : this._dataStack = b;
                for (var c in b) - 1 == b[c].Label.indexOf("glyphicon") && (a = this._viewportsControl.namespace + ".v", b[c].Label = ' <a id="node-' + b[c].Id + '" class="treeview-icone glyphicons glyphicons-eye-open " href=\'javascript:' + a + '._toggleSelection("#node-' + b[c].Id + '");\' data-node-id="' + b[c].Id + '"></a>' + b[c].Label, b[c].Label = b[c].Label + ' <a  class="treeview-icone glyphicons glyphicons-screenshot " href=\'javascript:' +
                    a + "._zoomOnWithGroups();'  data-node-id=\"" + b[c].Id + '"></a>', b[c].Label = b[c].Label + ' <a  class="treeview-icone glyphicons glyphicons-chat " href=\'javascript:' + a + "._showInfoBox();'  data-node-id=\"" + b[c].Id + '"></a></span>'), 0 < b[c].Children.length && (this._orphanDataStack[b[c].Id] = b[c].Children.splice(1, b[c].Children.length - 1), this._orphanDataStack[b[c].Children[0].Id] = b[c].Children[0].Children.splice(0, b[c].Children[0].Children.length));
                return b
            };
            a.prototype._loadNodeChildrenElements = function (a) {
                $(a.children[0].element).addClass("loadingNode");
                $(a.children[0].element).find(".jqtree-title")[0].innerText = "Loading ...";
                this._jqTree.tree("loadData", this._getChildNodes(a.id), a)
            };
            a.prototype._closeAllChildNodes = function (a) {
                for (var b in a.children) this._jqTree.tree("closeNode", a.children[b])
            };
            a.prototype._deleteUnnecessaryNodes = function (a) {
                this._jqTree.tree("loadData", [a.children[0]], a);
                this._showHighlightedIcon(a)
            };
            a.prototype._refresh = function () {
                this._refreshHighlightedNodes()
            };
            a.prototype._displayScrollbarIfNeeded = function () {
                var a = this;
                this._mCustomScrollbar ||
                    (this._mCustomScrollbar = $(this._container).mCustomScrollbar({
                        mouseWheel: !0,
                        theme: "light",
                        autoDraggerLength: !0,
                        alwaysShowScrollbar: 0,
                        scrollInertia: 0,
                        callbacks: {
                            whileScrolling: function () {
                                return a._alertHighlightedNodeOutOfContainer()
                            },
                            onScrollStart: function () {
                                return a._viewportsControl.freeze(!1, !1)
                            },
                            onScroll: function () {
                                return a._viewportsControl.unfreeze()
                            }
                        },
                        advanced: {
                            updateOnContentResize: !0
                        }
                    }));
                this._mCustomScrollbar.mCustomScrollbar("update")
            };
            a.prototype._expandOrCollapse = function (a, b) {
                b = b || this._jqTree.tree("getTree");
                for (var c in b.children) this._expandOrCollapse(a, b.children[c]);
                this._jqTree.tree(a, b, !1)
            };
            a.prototype._getNodeLineDom = function (a) {
                return a ? $(a.element).children(".jqtree-element").first() : null
            };
            a.prototype._showSameDepthHightlightedNodes = function (a) {
                if (a.parent && (a = this._jqTree.tree("getNodeById", a.parent.id))) {
                    a = a.children;
                    for (var b in a) this._showHighlightedIcon(a[b])
                }
            };
            a.prototype._showHighlightedIcon = function (e) {
                if (!e || !this._highlightedNodes[e.id]) return !1;
                var b = this._getNodeLineDom(e),
                    c = Math.min(b.children(".notification").length,
                        3),
                    g = this._highlightedNodes[e.id].notifications,
                    d;
                for (d in g) {
                    var f = a._notificationLevelToClassName[d],
                        h = g[d];
                    if (0 === h) b.children(".notification." + f).remove(), b.children(".notification.grey").remove(), delete this._highlightedNodes[e.id].notifications[d];
                    else {
                        var k = this._getPreviousLevelHighlightedNode(e, d);
                        if (2 > k.numberOfElementPrevious && 2 <= c) {
                            var r = b.children("span.notification");
                            r = r[r.length - 1];
                            c--;
                            $(r).remove()
                        }
                        0 == b.children(".notification." + f).length && 2 == c && (f = "grey");
                        0 == b.children(".notification." +
                            f).length && 3 > c && (r = "<span class='notification " + f + "' style='background-color: " + f + ";' data-order=" + d + "></span>", k.previousElement ? $(k.previousElement).after(r) : $(b.children(".jqtree-title")).after(r));
                        k = b.children(".notification." + f);
                        if ("grey" == f) {
                            h = this._getSumOfHighlightedNodeBelow(e, d);
                            $(k).html(h);
                            break
                        }
                        $(k).html(h)
                    }
                }
                return !0
            };
            a.prototype._getSumOfHighlightedNodeBelow = function (a, b) {
                var c = 0,
                    g;
                for (g in this._highlightedNodes[a.id].notifications) g < b || (c += this._highlightedNodes[a.id].notifications[g]);
                return c
            };
            a.prototype._getPreviousLevelHighlightedNode = function (a, b) {
                a = $(a.element).children(".jqtree-element").children("span.notification[data-order]");
                var c = [],
                    g;
                for (g in a) {
                    if (isNaN(parseInt(g))) break;
                    $(a[g]).attr("data-order") < b && c.push(a[g])
                }
                return {
                    numberOfElementPrevious: c.length,
                    previousElement: c[c.length - 1]
                }
            };
            a.prototype._refreshHighlightedNodes = function () {
                for (var a in this._highlightedNodes) {
                    var b = this._highlightedNodes[a].nodeId,
                        c = this._jqTree.tree("getNodeById", b);
                    !c && b ? delete this._highlightedNodes[a] :
                        0 == $(c.element).children().children(".notification").length && 0 < this._highlightedNodes[a].notifications.length && this._showHighlightedIcon(c)
                }
            };
            a.prototype._getChildHighlightedNodes = function (a, b, c) {
                if (a) {
                    a = TeiaJS.Utilities.Helpers.makeArray(a);
                    var g = [],
                        e;
                    for (e in a) {
                        var d = a[e];
                        this._highlightedNodes[d.id] || (this._highlightedNodes[d.id] = {
                            nodeId: d.id,
                            notifications: []
                        });
                        g = this._sumOfHighlighted(this._highlightedNodes[d.id].notifications, g);
                        !d.children || b && $(d.element).hasClass("jqtree-closed") && c || (g =
                            this._sumOfHighlighted(this._getChildHighlightedNodes(d.children, b, !0), g))
                    }
                    return g
                }
            };
            a.prototype._sumOfHighlighted = function (a, b) {
                var c = a.length > b.length ? a.slice(0) : b.slice(0);
                a = a.length > b.length ? b.slice(0) : a.slice(0);
                for (b = 0; b < c.length; b++) c[b] = c[b] || 0, a[b] = a[b] || 0, c[b] += a[b], 0 == c[b] && c.splice(b, 0);
                return c
            };
            a.prototype._differenceOfHighlightedNodes = function (a, b) {
                a = a.slice(0);
                b = b.slice(0);
                for (var c = 0; c < a.length; c++) a[c] = a[c] || 0, b[c] = b[c] || 0, a[c] -= b[c], 0 > a[c] && (a[c] = 0);
                return a
            };
            a.prototype._alertHighlightedNodeOutOfContainer =
                function () {
                    var a = this._checkIfHighlightedNodeOutOfBox($(".notificationParent.jqtree-closed:visible")) | this._checkIfHighlightedNodeOutOfBox($(".notificationChild:visible"));
                    a ? (a & h.DOWNSIDE && !$(this._scrollContainer).hasClass("notificationDownside") ? $(this._scrollContainer).addClass("notificationDownside") : a & h.DOWNSIDE || $(this._scrollContainer).removeClass("notificationDownside"), a & h.UPSIDE && !$(this._scrollContainer).hasClass("notificationUpside") ? $(this._scrollContainer).addClass("notificationUpside") :
                        a & h.UPSIDE || $(this._scrollContainer).removeClass("notificationUpside")) : ($(this._scrollContainer).removeClass("notificationUpside"), $(this._scrollContainer).removeClass("notificationDownside"))
                };
            a.prototype._checkIfHighlightedNodeOutOfBox = function (a) {
                var b = h.INSIDE;
                if (0 == a.length) return b;
                Math.abs(parseInt($(".mCSB_container").css("top"))) > a[0].parentElement.parentElement.offsetTop && (b |= h.UPSIDE);
                a = a[a.length - 1].parentElement.parentElement;
                var c = Math.abs(parseInt($(".stereograph-treeView-container .mCSB_container").css("top"))) +
                    $(".stereograph-treeView-container").innerHeight();
                a.offsetTop + a.offsetHeight > c && (b |= h.DOWNSIDE);
                return b
            };
            a.prototype._surfaceChildrenNotifications = function (a) {
                a && (this._highlightedNodes[a.id] = {
                    nodeId: a.id,
                    notifications: this._getChildHighlightedNodes(a, !0)
                }, this._showHighlightedIcon(a))
            };
            a.prototype._unSurfaceChildrenNotifications = function (a, b) {
                if (a) {
                    var c = this._highlightedNodes[a.id];
                    if (c && c.notifications && 0 != c.notifications.length) {
                        for (var g in a.children) {
                            var e = a.children[g],
                                d = this._getChildHighlightedNodes(e,
                                    !0, b);
                            c.notifications = this._differenceOfHighlightedNodes(c.notifications, d);
                            d && 0 < d.length && this._showHighlightedIcon(e)
                        }
                        this._highlightedNodes[a.id] = {
                            nodeId: a.id,
                            notifications: c.notifications
                        };
                        this._showHighlightedIcon(a)
                    }
                }
            };
            a.prototype._beforeHighlightingNode = function (a) {
                a && (a = a.parent, !a.element || !$(a.element).hasClass("jqtree-closed") && this._isNodeVisible(a) || (this._beforeHighlightingNode(a), $(a.element).hasClass("jqtree-closed") && this._unSurfaceChildrenNotifications(a)))
            };
            a.prototype._afterHighlightingNode =
                function (a) {
                    a && (a = a.parent, !a.element || !$(a.element).hasClass("jqtree-closed") && this._isNodeVisible(a) || ($(a.element).hasClass("jqtree-closed") && this._surfaceChildrenNotifications(a), this._afterHighlightingNode(a)))
                };
            a.prototype._onNodeClosed = function (a) {
                this._surfaceChildrenNotifications(a.node);
                this._closeAllChildNodes(a.node);
                this._showSameDepthHightlightedNodes(a.node)
            };
            a.prototype._onNodeOpen = function (a) {
                this._unSurfaceChildrenNotifications(a.node, !0);
                this._showSameDepthHightlightedNodes(a.node)
            };
            a.prototype._isNodeVisible = function (a) {
                return a ? 0 != $(a.element).offset().left : !1
            };
            a.prototype._onClick = function (e) {
                e.preventDefault(); - 1 === this._unclickableIds.indexOf(e.node.id) && (e.click_event.shiftKey && this._jqTree.tree("getSelectedNode") || (this._shiftOriginNode = e.node), e.click_event.ctrlKey || e.click_event.shiftKey || this._jqTree.tree("isNodeSelected", e.node) ? e.click_event.shiftKey ? (this._unselectAll(), this._onShiftClick(e.node)) : e.click_event.ctrlKey ? this._onCtrlClick(e.node) : TeiaJS.Utilities.Event.fire(this,
                    a.NODE_CLICKING_EVENT) : (this._unselectAll(), this._selectNode(e.node), this._viewportsControl.zoomOnSelectedObjects()))
            };
            a.prototype._onCtrlClick = function (a) {
                this._jqTree.tree("isNodeSelected", a) ? this._unselectNode(a) : this._selectNode(a)
            };
            a.prototype._onShiftClick = function (a) {
                this._selectRange(this._shiftOriginNode, a)
            };
            a.prototype._scrollTo = function (a) {
                var b = this;
                a && this._mCustomScrollbar && setTimeout(function () {
                    b._mCustomScrollbar.mCustomScrollbar("scrollTo", a.element.offsetTop - b._scrollContainer.offsetHeight /
                        2, {
                            scrollInertia: 0
                        })
                }, 200)
            };
            a.prototype._openParentNodes = function (a) {
                a && (this._jqTree.tree("openNode", a, !1), this._openParentNodes(a.parent))
            };
            a.prototype._selectNode = function (e, b) {
                void 0 === b && (b = !1);
                this._jqTree.tree("addToSelection", e); - 1 != this._viewportsControl.noInfoboxObjects.indexOf(e.id) ? this._disableInfoBoxButton() : this._enableInfoBoxButton();
                b || TeiaJS.Utilities.Event.fire(this, a.NODE_SELECTED_EVENT, 1 < this._jqTree.tree("getSelectedNodes").length, e)
            };
            a.prototype._disableInfoBoxButton = function () {
                $("#id-stereograph-menu" +
                    this._viewportsControl.namespace + "-InfoBox").attr("disabled", "disabled")
            };
            a.prototype._enableInfoBoxButton = function () {
                $("#id-stereograph-menu" + this._viewportsControl.namespace + "-InfoBox").removeAttr("disabled")
            };
            a.prototype._unselectNode = function (e) {
                this._unselectNodeInternal(e);
                e && TeiaJS.Utilities.Event.fire(this, a.NODE_UNSELECTED_EVENT, e);
                (e = this._jqTree.tree("getSelectedNode")) && e.length || this._disableInfoBoxButton()
            };
            a.prototype._unselectNodeInternal = function (a) {
                a && this._jqTree.tree("removeFromSelection",
                    a)
            };
            a.prototype._unselectAll = function () {
                var e = this._jqTree.tree("getSelectedNodes"),
                    b;
                for (b in e) this._unselectNodeInternal(e[b]);
                TeiaJS.Utilities.Event.fire(this, a.ALL_UNSELECTED_EVENT, e)
            };
            a.prototype._selectRange = function (a, b) {
                var c = $(a.element).offset().top < $(b.element).offset().top ? a : b;
                this._selectChildInRange(c, c == a ? b : a, c)
            };
            a.prototype._selectChildInRange = function (a, b, c) {
                if (c) {
                    this._selectNode(c);
                    if (c == b || -1 == c.element.className.indexOf("jqtree-closed") && 0 < c.children.length && this._selectChildInRange(a,
                            b, c.children[0]) || this._selectChildInRange(a, b, c.getNextSibling())) return !0;
                    if (c.getLevel() <= a.getLevel()) {
                        for (c = c.parent; c = c.getNextSibling(););
                        this._selectChildInRange(a, b, c)
                    }
                }
            };
            a.prototype.dispose = function () {
                this._mCustomScrollbar.remove();
                this._unbinding()
            };
            return a
        }();
        f.NODE_CLICKING_EVENT = "nodeClicking";
        f.NODE_SELECTED_EVENT = "nodeSelected";
        f.NODE_UNSELECTED_EVENT = "nodeUnselected";
        f.ALL_UNSELECTED_EVENT = "allUnselected";
        f.NODE_DB_CLICKED_EVENT = "nodedbclick";
        f._notificationLevelToClassName = ["red",
            "orange", "green", "blue"
        ];
        a.TreeView = f
    })(a.gui || (a.gui = {}))
})(Teia || (Teia = {}));
(function (a) {
    (function (k) {
        var m = function (h) {
            function f(a, e, b, c) {
                var g = h.call(this) || this;
                g._viewportsControl = a;
                g._smartScene = e;
                g._treeView = new Teia.gui.TreeView(a, b, !0, c);
                g._binding();
                return g
            }
            __extends(f, h);
            f.prototype._binding = function () {
                a.Utilities.Event.on(this._smartScene, k.SmartScene.ADDED_OBJECT_EVENT, $.proxy(this._onObjectAdded, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.PARSING_STARTED_EVENT, $.proxy(this._onParsingStarted, this));
                a.Utilities.Event.on(this._treeView, Teia.gui.TreeView.NODE_DB_CLICKED_EVENT,
                    $.proxy(this._onDbClickedNode, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.REMOVED_OBJECT_EVENT, $.proxy(this._onObjectRemoved, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.REMOVED_OBJECTS_EVENT, $.proxy(this._onObjectsRemoved, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.UPDATED_THREED_OBJECT_EVENT, $.proxy(this._onObjectThreeDUpdated, this));
                a.Utilities.Event.on(this._viewportsControl, k.ViewportsControl.OBJECT_VISIBLE_STATE_CHANGED_EVENT, $.proxy(this._onVisibleStateChanged,
                    this));
                a.Utilities.Event.on(this._viewportsControl, k.ViewportsControl.MESHES_NOT_FOUND, $.proxy(this._onMeshesNotFound, this));
                this._treeViewBinding();
                this._smartSceneBinding()
            };
            f.prototype._unbinding = function () {
                a.Utilities.Event.off(this._smartScene, k.SmartScene.ADDED_OBJECT_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.PARSING_STARTED_EVENT);
                a.Utilities.Event.off(this._treeView, Teia.gui.TreeView.NODE_DB_CLICKED_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.REMOVED_OBJECT_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.REMOVED_OBJECTS_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.UPDATED_THREED_OBJECT_EVENT);
                this._treeViewUnbinding();
                this._smartSceneUnbinding()
            };
            f.prototype._onVisibleStateChanged = function (a, e, b) {
                this._treeView.setVisibleState(e, b)
            };
            f.prototype._onMeshesNotFound = function (a, e) {
                this._treeView.unactivateNodes(e)
            };
            f.prototype._onObjectRemoved = function (a, e) {
                this._treeView.tryRemove(e)
            };
            f.prototype._onObjectsRemoved = function (a, e) {
                for (var b in e) this._treeView.tryRemove(e[b])
            };
            f.prototype._onObjectThreeDUpdated = function (a, e, b, c, g, l, f, h, k, r, m, x, q, z, u) {
                k && m ? this._treeView.enableNode(e) : this._treeView.disableNode(e);
                u || this._treeView.disableNode(e);
                q && this._treeView.setParentNode(e, f)
            };
            f.prototype._onParsingStarted = function (a, e, b) {
                this._totalOfObjects = e
            };
            f.prototype._smartSceneBinding = function () {
                this._smartSceneSelectionAdded || (this._smartSceneSelectionAdded = $.proxy(this._onSelectionAdded, this));
                this._smartSceneSelectionRemoved || (this._smartSceneSelectionRemoved = $.proxy(this._onSelectionRemoved,
                    this));
                this._smartSceneSelectionCleared || (this._smartSceneSelectionCleared = $.proxy(this._onSelectionCleared, this));
                a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.SELECTION_ADDED_EVENT, $.proxy(this._onSelectionAdded, this));
                a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.SELECTION_REMOVED_EVENT, $.proxy(this._onSelectionRemoved, this));
                a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.SELECTION_CLEARED_EVENT, $.proxy(this._onSelectionCleared, this))
            };
            f.prototype._smartSceneUnbinding =
                function () {
                    a.Utilities.Event.off(this._smartScene, a.Modules_.SmartScene.SELECTION_ADDED_EVENT, $.proxy(this._onSelectionAdded, this));
                    a.Utilities.Event.off(this._smartScene, a.Modules_.SmartScene.SELECTION_REMOVED_EVENT, $.proxy(this._onSelectionRemoved, this));
                    a.Utilities.Event.off(this._smartScene, a.Modules_.SmartScene.SELECTION_CLEARED_EVENT, $.proxy(this._onSelectionCleared, this))
                };
            f.prototype._treeViewBinding = function () {
                this._treeViewNodeSelected || (this._treeViewNodeSelected = $.proxy(this._onNodeSelected,
                    this));
                this._treeViewNodesUnselected || (this._treeViewNodesUnselected = $.proxy(this._onNodeUnselected, this));
                this._treeViewAllNodeUnselected || (this._treeViewAllNodeUnselected = $.proxy(this._onAllNodesUnselected, this));
                a.Utilities.Event.on(this._treeView, Teia.gui.TreeView.NODE_SELECTED_EVENT, $.proxy(this._onNodeSelected, this));
                a.Utilities.Event.on(this._treeView, Teia.gui.TreeView.NODE_UNSELECTED_EVENT, $.proxy(this._onNodeUnselected, this));
                a.Utilities.Event.on(this._treeView, Teia.gui.TreeView.ALL_UNSELECTED_EVENT,
                    $.proxy(this._onAllNodesUnselected, this))
            };
            f.prototype._treeViewUnbinding = function () {
                a.Utilities.Event.off(this._treeView, Teia.gui.TreeView.NODE_SELECTED_EVENT, $.proxy(this._onNodeSelected, this));
                a.Utilities.Event.off(this._treeView, Teia.gui.TreeView.NODE_UNSELECTED_EVENT, $.proxy(this._onNodeUnselected, this));
                a.Utilities.Event.off(this._treeView, Teia.gui.TreeView.ALL_UNSELECTED_EVENT, $.proxy(this._onAllNodesUnselected, this))
            };
            f.prototype._toggleTreeviewDisplay = function () {
                this._treeView.toggleDisplay()
            };
            f.prototype.hideTreeView = function () {
                this._treeView.hide()
            };
            f.prototype.showTreeView = function () {
                this._treeView.show()
            };
            f.prototype._onSelectionAdded = function (a, e) {
                this._treeViewUnbinding();
                this._treeView.addToSelection(e);
                this._treeViewBinding()
            };
            f.prototype._onSelectionRemoved = function (a, e, b) {
                this._removeObjectsFromSelection(e)
            };
            f.prototype._onSelectionCleared = function (a, e) {
                this._removeObjectsFromSelection(e)
            };
            f.prototype._removeObjectsFromSelection = function (d) {
                if (d) {
                    d = a.Utilities.Helpers.makeArray(d);
                    for (var e in d) this._treeView.unselectNodeById(d[e]), $(".treeView-selection").removeClass("treeView-selection")
                }
            };
            f.prototype._onObjectAdded = function (a, e, b, c, g, l, f, h, k, r, m, x, q, z, u) {
                this._treeView.tryAdd(e, h, this._totalOfObjects, f, null, !k, x, m, u)
            };
            f.prototype._onNodeSelected = function (a, e, b) {
                this._smartSceneUnbinding();
                this._smartScene._addObjectToSelection(b.id, !e, b.name);
                this._smartSceneBinding()
            };
            f.prototype._onNodeUnselected = function (a, e) {
                this._smartScene._removeObjectFromSelection(e)
            };
            f.prototype._onAllNodesUnselected =
                function (a, e) {
                    for (var b in e) this._smartScene._removeObjectFromSelection(e[b])
                };
            f.prototype._onDbClickedNode = function (d, e) {
                a.Utilities.Event.fire(this, Teia.gui.TreeView.NODE_DB_CLICKED_EVENT)
            };
            f.prototype._onObjectActionUpdated = function (a, e, b) {
                this._treeView.highlightNodeById(b.objectId, 0)
            };
            f.prototype.dispose = function () {
                this._unbinding();
                this._treeView.dispose()
            };
            return f
        }(k.ModuleBase);
        k.SmartSceneTreeView = m
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function () {
            return function () {}
        }();
        k.MeshesInformationsPosition = m;
        (function () {
            function a(a, c, g, e) {
                this._targetColor = a;
                this._colorPlus = c;
                this._mesh = g;
                this._callback = e
            }
            Object.defineProperty(a.prototype, "targetColor", {
                get: function () {
                    return this._targetColor
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "colorPlus", {
                get: function () {
                    return this._colorPlus
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "mesh", {
                get: function () {
                    return this._mesh
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "callback", {
                get: function () {
                    return this._callback
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        })();
        var h = function () {
                return function () {}
            }(),
            f = function () {
                return function () {}
            }();
        k.TeiaObject = f;
        var d = function () {
            function a(a, c, g, e, d, f, h, k, m, x, q, z, u, y, v, D, w, E, F, B, G, H, I, J, K, L, M, N, O, P, sa, ta, Q, R, A, S, T, U, V, W, X, Y, Z, aa, ba, ca, da, ea, fa, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra) {
                void 0 === g && (g = !0);
                void 0 === e && (e = !0);
                void 0 === d && (d = "#FFFFFF");
                void 0 === f && (f = !1);
                void 0 === m && (m = []);
                void 0 === x && (x = !1);
                void 0 === q && (q = !1);
                void 0 === z && (z = !1);
                void 0 === u && (u = !1);
                void 0 === y && (y = !1);
                void 0 === v && (v = !1);
                void 0 === D && (D = !1);
                void 0 === w && (w = !1);
                void 0 === E && (E = !1);
                void 0 === F && (F = !1);
                void 0 === B && (B = !1);
                void 0 === G && (G = !1);
                void 0 === H && (H = !1);
                void 0 === I && (I = 0);
                void 0 === J && (J = 5);
                void 0 === K && (K = !1);
                void 0 === L && (L = !1);
                void 0 === M && (M = !1);
                void 0 === N && (N = !1);
                void 0 === O && (O = !1);
                void 0 === P && (P = !1);
                void 0 === Q && (Q = !1);
                void 0 === R && (R = !1);
                void 0 === A && (A = "");
                void 0 === S && (S = !1);
                void 0 ===
                    T && (T = !1);
                void 0 === U && (U = !0);
                void 0 === V && (V = !1);
                void 0 === W && (W = !0);
                void 0 === X && (X = !0);
                void 0 === Y && (Y = !1);
                void 0 === Z && (Z = !1);
                void 0 === aa && (aa = null);
                void 0 === ba && (ba = "bottom");
                void 0 === ca && (ca = !0);
                void 0 === da && (da = "Modal");
                void 0 === ea && (ea = !1);
                void 0 === fa && (fa = .1);
                void 0 === ha && (ha = !1);
                void 0 === ia && (ia = !1);
                void 0 === ja && (ja = !1);
                void 0 === ka && (ka = 5);
                void 0 === la && (la = 100);
                void 0 === ma && (ma = !1);
                void 0 === na && (na = !1);
                void 0 === oa && (oa = .03);
                void 0 === pa && (pa = 200);
                void 0 === qa && (qa = !0);
                void 0 === ra && (ra = !0);
                this._containerId =
                    a;
                this._generateTreeView = g;
                this._useLibelle = Z;
                this._showCameraControls = e;
                this._showViewcubeControls = v;
                this._namespace = c;
                this._backgroundColor = d;
                this._texturedMode = f;
                this._wireframeMode = Y;
                this._cameras = m;
                this._sun = x;
                this._lights = q;
                this._skybox = z;
                this._skyboxPath = aa;
                this._flatShadedMesh = u;
                this._webGl2 = G;
                this._incremental = H;
                this._showTitle = U;
                this._showMenuBar = W;
                this._showHomeView = ca;
                this._octreeMode = ha;
                this._treeViewAutoOpen = ea;
                this._menuBarPosition = ba;
                this._treeViewType = da;
                this._modeExploitation = X;
                this._cuttingPlan = V;
                this._ssao = y;
                this._antiAliasing = D;
                this._layer = w;
                this._optimize = E;
                this._hdr = F;
                this._mouseWheelPrecision = I;
                this._infoHelp = B;
                this._disableInfoBoxes = Q;
                this._disableLayerControls = R;
                this._versionTeia = A;
                this._cameraSpeed = J;
                this._screenshotShortcut = K;
                this._rotateTranslateShortcut = L;
                this._showInfoboxShortcut = M;
                this._zoomOnObjectShortcut = N;
                this._switchRenderModeShortcut = O;
                this._switchCameraShortcut = P;
                this._cacheServeur = T;
                this._cacheNavigateur = S;
                this._xRayOpacity = fa;
                this._backFaceCulling =
                    ia;
                this._bouncingBehavior = ja;
                this._minRadiusBouncingBehavior = ka;
                this._maxRadiusBouncingBehavior = la;
                this._framingBehavior = ma;
                this._autoRotationBehavior = na;
                this._autoRotationSpeed = oa;
                this._autoRotationWaitTime = pa;
                this._autoRotationZoomStopsAnimation = qa;
                this._activatOverlay = ra
            }
            Object.defineProperty(a.prototype, "generateTreeView", {
                get: function () {
                    return this._generateTreeView
                },
                set: function (a) {
                    this._generateTreeView = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "useLibelle", {
                get: function () {
                    return this._useLibelle
                },
                set: function (a) {
                    this._useLibelle = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "containerId", {
                get: function () {
                    return this._containerId
                },
                set: function (a) {
                    this._containerId = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "namespace", {
                get: function () {
                    return this._namespace
                },
                set: function (a) {
                    this._namespace = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "showCameraControls", {
                get: function () {
                    return this._showCameraControls
                },
                set: function (a) {
                    this._showCameraControls =
                        a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "showViewcubeControls", {
                get: function () {
                    return this._showViewcubeControls
                },
                set: function (a) {
                    this._showViewcubeControls = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "backgroundColor", {
                get: function () {
                    return this._backgroundColor
                },
                set: function (a) {
                    this._backgroundColor = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "texturedMode", {
                get: function () {
                    return this._texturedMode
                },
                set: function (a) {
                    this._texturedMode =
                        a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "wireframeMode", {
                get: function () {
                    return this._wireframeMode
                },
                set: function (a) {
                    this._wireframeMode = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "xRayOpacity", {
                get: function () {
                    return this._xRayOpacity
                },
                set: function (a) {
                    this._xRayOpacity = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "lights", {
                get: function () {
                    return this._lights
                },
                set: function (a) {
                    this._lights = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "skybox", {
                get: function () {
                    return this._skybox
                },
                set: function (a) {
                    this._skybox = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "skyboxPath", {
                get: function () {
                    return this._skyboxPath
                },
                set: function (a) {
                    this._skyboxPath = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "sun", {
                get: function () {
                    return this._sun
                },
                set: function (a) {
                    this._sun = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "flatShadedMesh", {
                get: function () {
                    return this._flatShadedMesh
                },
                set: function (a) {
                    this._flatShadedMesh = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "webGl2", {
                get: function () {
                    return this._webGl2
                },
                set: function (a) {
                    this._webGl2 = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "versionTeia", {
                get: function () {
                    return this._versionTeia
                },
                set: function (a) {
                    this._versionTeia = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "ssao", {
                get: function () {
                    return this._ssao
                },
                set: function (a) {
                    this._ssao = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "hdr", {
                get: function () {
                    return this._hdr
                },
                set: function (a) {
                    this._hdr = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "mouseWheelPrecision", {
                get: function () {
                    return this._mouseWheelPrecision
                },
                set: function (a) {
                    this._mouseWheelPrecision = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "infoHelp", {
                get: function () {
                    return this._infoHelp
                },
                set: function (a) {
                    this._infoHelp = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype,
                "showTitle", {
                    get: function () {
                        return this._showTitle
                    },
                    set: function (a) {
                        this._showTitle = a
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(a.prototype, "showMenuBar", {
                get: function () {
                    return this._showMenuBar
                },
                set: function (a) {
                    this._showMenuBar = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "showHomeView", {
                get: function () {
                    return this._showHomeView
                },
                set: function (a) {
                    this._showHomeView = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "octreeMode", {
                get: function () {
                    return this._octreeMode
                },
                set: function (a) {
                    this._octreeMode = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "backFaceCulling", {
                get: function () {
                    return this._backFaceCulling
                },
                set: function (a) {
                    this._backFaceCulling = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "bouncingBehavior", {
                get: function () {
                    return this._bouncingBehavior
                },
                set: function (a) {
                    this._bouncingBehavior = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "minRadiusBouncingBehavior", {
                get: function () {
                    return this._minRadiusBouncingBehavior
                },
                set: function (a) {
                    this._minRadiusBouncingBehavior = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "maxRadiusBouncingBehavior", {
                get: function () {
                    return this._maxRadiusBouncingBehavior
                },
                set: function (a) {
                    this._maxRadiusBouncingBehavior = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "framingBehavior", {
                get: function () {
                    return this._framingBehavior
                },
                set: function (a) {
                    this._framingBehavior = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "autoRotationBehavior", {
                get: function () {
                    return this._autoRotationBehavior
                },
                set: function (a) {
                    this._autoRotationBehavior = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "autoRotationSpeed", {
                get: function () {
                    return this._autoRotationSpeed
                },
                set: function (a) {
                    this._autoRotationSpeed = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "autoRotationWaitTime", {
                get: function () {
                    return this._autoRotationWaitTime
                },
                set: function (a) {
                    this._autoRotationWaitTime = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype,
                "autoRotationZoomStopsAnimation", {
                    get: function () {
                        return this._autoRotationZoomStopsAnimation
                    },
                    set: function (a) {
                        this._autoRotationZoomStopsAnimation = a
                    },
                    enumerable: !0,
                    configurable: !0
                });
            Object.defineProperty(a.prototype, "activatOverlay", {
                get: function () {
                    return this._activatOverlay
                },
                set: function (a) {
                    this._activatOverlay = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "treeViewAutoOpen", {
                get: function () {
                    return this._treeViewAutoOpen
                },
                set: function (a) {
                    this._treeViewAutoOpen = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "menuBarPosition", {
                get: function () {
                    return this._menuBarPosition
                },
                set: function (a) {
                    this._menuBarPosition = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "treeViewType", {
                get: function () {
                    return this._treeViewType
                },
                set: function (a) {
                    this._treeViewType = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "modeExploitation", {
                get: function () {
                    return this._modeExploitation
                },
                set: function (a) {
                    this._modeExploitation = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "cuttingPlan", {
                get: function () {
                    return this._cuttingPlan
                },
                set: function (a) {
                    this._cuttingPlan = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "incremental", {
                get: function () {
                    return this._incremental
                },
                set: function (a) {
                    this._incremental = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "cacheNavigateur", {
                get: function () {
                    return this._cacheNavigateur
                },
                set: function (a) {
                    this._cacheNavigateur = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "cacheServeur", {
                get: function () {
                    return this._cacheServeur
                },
                set: function (a) {
                    this._cacheServeur = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "optimize", {
                get: function () {
                    return this._optimize
                },
                set: function (a) {
                    this._optimize = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "cameras", {
                get: function () {
                    return this._cameras
                },
                set: function (a) {
                    this._cameras = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "antiAliasing", {
                get: function () {
                    return this._antiAliasing
                },
                set: function (a) {
                    this._antiAliasing = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "layer", {
                get: function () {
                    return this._layer
                },
                set: function (a) {
                    this._layer = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "cameraSpeed", {
                get: function () {
                    return this._cameraSpeed
                },
                set: function (a) {
                    this._cameraSpeed = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "screenshotShortcut", {
                get: function () {
                    return this._screenshotShortcut
                },
                set: function (a) {
                    this._screenshotShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "rotateTranslateShortcut", {
                get: function () {
                    return this._rotateTranslateShortcut
                },
                set: function (a) {
                    this._rotateTranslateShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "showInfoboxShortcut", {
                get: function () {
                    return this._showInfoboxShortcut
                },
                set: function (a) {
                    this._showInfoboxShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "zoomOnObjectShortcut", {
                get: function () {
                    return this._zoomOnObjectShortcut
                },
                set: function (a) {
                    this._zoomOnObjectShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "switchRenderModeShortcut", {
                get: function () {
                    return this._switchRenderModeShortcut
                },
                set: function (a) {
                    this._switchRenderModeShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "switchCameraShortcut", {
                get: function () {
                    return this._switchCameraShortcut
                },
                set: function (a) {
                    this._switchCameraShortcut = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "playAnimations", {
                get: function () {
                    return this._playAnimations
                },
                set: function (a) {
                    this._playAnimations = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "disableInfoBoxes", {
                get: function () {
                    return this._disableInfoBoxes
                },
                set: function (a) {
                    this._disableInfoBoxes = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(a.prototype, "disableLayerControls", {
                get: function () {
                    return this._disableLayerControls
                },
                set: function (a) {
                    this._disableLayerControls = a
                },
                enumerable: !0,
                configurable: !0
            });
            return a
        }();
        k.ViewportsControlOptions = d;
        d = function (e) {
            function b(c, g) {
                var d = e.call(this) || this;
                d._meshesToImport = [];
                d._boxesToCreate = [];
                d._spheresToCreate = [];
                d._rendering = !1;
                d._viewports = new a.Utilities.Set;
                d._noInfoboxObjects = [];
                d._meshesNotUpdated = [];
                d._meshesNotUpdatedClone = [];
                d._arrayIdCamera = [];
                d._index = 0;
                d._locked = !1;
                d._eventPrefix = BABYLON.Tools.GetPointerPrefix();
                d._numberOfObjectsToImport = 0;
                d._arrayEventOptimize = [];
                d._alreadyZoomedOn = !1;
                d._meshesInformations = {};
                d._objectIdToMeshesNames = [];
                d._meshesRotationAnimations = {};
                d._originalColors = {};
                d._originalPositions = {};
                d._originalRotations = {};
                d._objectsSelecting = [];
                d._hdrActivate = !1;
                d._manualLoadingScreen = !1;
                d._levelScalling = .5;
                d._lengthMeshes = 0;
                d._onOptimized = !1;
                d._isActivatOverlay = !0;
                d._selectionColor = new BABYLON.Color3(0, 0, 1);
                d._invisibleObjectIds = [];
                d._pickedMeshSelObjects = [];
                d._pickedMeshXYCur = {
                    x: -1,
                    y: -1
                };
                d._initScene = !0;
                d._lastFPS = 0;
                d._numberOfFrames = 0;
                d._averageOnWindow = 60;
                d._pendingActionStack = [];
                d._pendingMovingStack = [];
                d._ActionStack = [];
                d.ACTIVE_LAYER = 268435455;
                d.ACTIVE_OPTIMIZE_LAYER = 268435456;
                d._IsStationary = !0;
                d._parsingRetainCount = 0;
                d._objectsIdsPendingFromTeiaServer = [];
                d._teiaHierarchy = {};
                d.screenshot = function () {
                    BABYLON.Tools.CreateScreenshotUsingRenderTarget(this._engine, this._activeViewport._activeCamera, {
                        precision: 2
                    })
                };
                d.setAnimation = function (a, c, b, g, d) {
                    var e = this._getMeshesByObjectID(a);
                    void 0 == d && (d = !0);
                    void 0 == b && (b = 0);
                    void 0 == g && (g = 100);
                    e && void 0 != this._sceneAnimations[a] && (c ? (e[0].animations.push(this._sceneAnimations[a][0]),
                        this._scene.beginAnimation(e[0], Math.round(b * this._sceneAnimations[a][0]._keys.length / 100), Math.round(g * this._sceneAnimations[a][0]._keys.length / 100), d)) : this._scene.beginAnimation(e[0], 0, 100, !1))
                };
                d.stopAllAnimation = function () {
                    for (var a = 0; this._scene._activeAnimatables.length > a; a++) this._scene._activeAnimatables[a].loopAnimation = !1
                };
                d.resetSprite = function (a) {
                    for (var c in this._listesprite)
                        if (-1 < c.indexOf(a)) {
                            null != this._listesprite[c] && (this._listesprite[c]._manager.dispose(), this._listesprite[c].dispose(),
                                this._listesprite[c] = null);
                            var b = this._scene.getMeshByName(c + "LineSpriteTeia");
                            null != b && b.dispose()
                        }
                };
                d._firstParsingEndedDone = !1;
                d._objectsIdsToAddDataStack = [];
                d._TextObjectAlert = function (a, c, b) {
                    var g = new BABYLON.DynamicTexture("dynamic texture", 256, this._scene, !0);
                    a = this._getMeshesByObjectID(a);
                    for (var d in a) {
                        var e = a[d];
                        c && (g.drawText(b, null, 100, "Bold 100px Verdana", "#000", "#fff"), e.material.diffuseTexture = g)
                    }
                };
                d._viewportsControlOptions = g;
                d._viewerContainer = document.getElementById(d._viewportsControlOptions.containerId) ||
                    document.body;
                if (!BABYLON.Engine.isSupported()) return window.WebGLRenderingContext ? UIkit.modal.alert('<div class="logoWebgl"></div>Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br /> Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.') : UIkit.modal.alert('<div class="logoWebgl"></div>Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/> Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'),
                    d;
                g = document.createAttribute("tabindex");
                g.value = "1";
                d.viewerContainer.setAttributeNode(g);
                d._canvasContainer = document.createElement("div");
                d._canvasContainer.className = "teiaContainer noselect";
                d._canvasContainer.style.position = "relative";
                d._canvasContainer.style.height = "100%";
                d._canvas = document.createElement("canvas");
                d._canvas.style.height = "100%";
                d._canvas.style.width = "100%";
                d._canvas.id = "canvas-3D-" + d._viewportsControlOptions.containerId;
                d._canvasContainer.appendChild(d._canvas);
                d.viewerContainer.appendChild(d._canvasContainer);
                d._limitDeviceRatio = 1;
                d._engine = new BABYLON.Engine(d._canvas, d._viewportsControlOptions.antiAliasing, {
                    limitDeviceRatio: d._limitDeviceRatio,
                    stencil: !0,
                    disableWebGL2Support: !d._viewportsControlOptions.webGl2
                }, !1);
                d._onContextLost = function (a) {};
                d._canvas.addEventListener("webglcontextlost", d._onContextLost, !1);
                BABYLON.Engine.ShadersRepository = a.Urls.shadersUrl + "/";
                BABYLON.SceneLoader.ShowLoadingScreen = !1;
                BABYLON.PerfCounter.Enabled = !1;
                d._scene = new BABYLON.Scene(d._engine);
                d._scene.particlesEnabled = !1;
                d._scene.shadowsEnabled = !1;
                d._scene.nopick = !1;
                d._drawingCanvas = document.createElement("canvas");
                d._drawingCanvas.id = "LayerDrawingCanvas";
                d._drawingCanvas.style.position = "absolute";
                d._drawingCanvas.style.pointerEvents = "none";
                d._drawingCanvas.style.backgroundColor = "transparent";
                d._drawingContext = d._drawingCanvas.getContext("2d");
                d._drawingCanvas.style.left = "0px";
                d._drawingCanvas.style.top = "0px";
                d._drawingCanvas.style.width = "100%";
                d._drawingCanvas.style.height = "100%";
                d._drawingCanvas.height = d._canvas.height;
                d._drawingCanvas.width = d._canvas.width;
                d._canvasContainer.appendChild(d._drawingCanvas);
                d._scene.constantlyUpdateMeshUnderPointer = !0;
                d._scene.getBoundingBoxRenderer().frontColor = BABYLON.Color3.Black();
                d._scene.getBoundingBoxRenderer().backColor = BABYLON.Color3.Black();
                var f = function () {
                    if (d._IsStationary) {
                        d._currentMesh = d._scene.meshUnderPointer;
                        d.canvas.style.cursor = d._currentMesh && d._currentMesh.isPickable ? "pointer" : "";
                        if (d._obj)
                            if (d._obj !== d._currentMesh) d._drawingContext.clearRect(0, 0, d._drawingCanvas.width,
                                d._drawingCanvas.height), -1 == d._getSelectedMeshes().indexOf(d._obj) && (d._obj.renderOverlay = !1);
                            else {
                                if (!d._obj.isPickable || !d._obj.isVisible) return;
                                var a = !d._obj._isObjectTeia,
                                    c = d._obj.name;
                                if (.5 == d._obj.overlayAlpha) {
                                    c = d._obj.id;
                                    var b = "none"
                                } else b = d._obj.objectId;
                                !a && d._IsStationary && 0 == d._obj.renderOverlay && d._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && (a = BABYLON.Vector3.TransformCoordinates(d._obj.getBoundingInfo().boundingBox.centerWorld, d._activeViewport.activeCamera.getViewMatrix()),
                                    a = BABYLON.Vector3.TransformCoordinates(a, d._activeViewport.activeCamera.getProjectionMatrix()), a = new BABYLON.Vector2(d._drawingCanvas.width / 2 * a.x + d._drawingCanvas.width / 2, d._drawingCanvas.height - (d._drawingCanvas.height / 2 * a.y + d._drawingCanvas.height / 2)), d._renderLabel(c + " [" + b + "]", a, 12, function () {
                                        return d._obj.renderOverlay ? "red" : "black"
                                    }), d._obj.overlayColor = new BABYLON.Color3(1, .9, 0), d._obj.renderOverlay = !0)
                            } d._obj = d._currentMesh
                    }
                };
                d._scene.registerBeforeRender(function () {
                    d._isActivatOverlay && f()
                });
                BABYLON.SceneLoader.ShowLoadingScreen = !1;
                d._smartScene = c;
                d._colorForObjectAction = {};
                d._rotationForObjectAction = {};
                d._positionForObjectAction = {};
                d._arrayMeshByObjectId = {};
                "#undefined" == d._viewportsControlOptions.backgroundColor && (d._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0));
                d._keyboardShortcuts = new a.Modules_.KeyboardShortcuts;
                d._meshesMaterialBJ = [];
                d._meshesMaterialTeia = [];
                d._meshesNotUpdated = [];
                d._meshesNotUpdatedClone = [];
                d._sceneAnimations = [];
                d._listesprite = [];
                d._listeBlinkAnimation = [];
                d._binding();
                d._changingColorObjects = {};
                d._meshesRotationAnimations = {};
                d._scene.animationsEnabled = !0;
                d._searchManager = new a.Modules_.SearchManager(d._smartSceneTreeView, d);
                d.setLoadingText("Loading SmartScene 3D...");
                $("#progress_Load").attr("aria-valuenow", "10");
                d._generateStereographToolbar();
                d._bindWindowResize();
                c = new a.Utilities.Action($.proxy(d._showInfoBox, d), d);
                d._keyboardShortcuts.addShortcut(105, c);
                c = new a.Utilities.Action($.proxy(d.zoomOnSelectedObjects, d), d);
                d._keyboardShortcuts.addShortcut(122, c);
                c = new a.Utilities.Action($.proxy(d._isolateSelection, d), d);
                d._keyboardShortcuts.addShortcut(32, c);
                c = new a.Utilities.Action(d._hideSelected, d);
                d._keyboardShortcuts.addShortcut(32, c, !0);
                c = new a.Utilities.Action(d._unHideAll, d);
                d._keyboardShortcuts.addShortcut(65, c, !0);
                d._viewportsControlOptions.sun && (d._light = d.createAndLoadSun());
                "myViewport" == d._viewportsControlOptions.containerId && (d._viewportsControlOptions.lights = !0, d._viewportsControlOptions.sun = !0, d._viewportsControlOptions.showCameraControls = !1);
                d._renduTeia = !d._viewportsControlOptions.texturedMode;
                for (c = 0; d._scene.lights.length < c; c++) d._scene.lights[c].setEnabled(d._viewportsControlOptions.lights);
                null != d._light && d._light.setEnabled(d._viewportsControlOptions.sun);
                d._viewportsControlOptions.sun || d._viewportsControlOptions.lights || (d._scene.lightsEnabled = !1);
                d._highLightLayer = new BABYLON.HighlightLayer("hlTeia", d._scene, {
                    camera: d._scene.activeCamera
                });
                d._highLightLayer.innerGlow = !1;
                d._isBoundingBox = !d._viewportsControlOptions.texturedMode;
                d._eventTranslate = !1;
                d._isModeEditor = !1;
                d._grid = null;
                d._gridTexture = null;
                d._gridGuide = null;
                d._gridGuideTexture = null;
                d._nameCamera = b.ARC_ROTATE_CAMERA;
                return d
            }
            __extends(b, e);
            Object.defineProperty(b.prototype, "scene", {
                get: function () {
                    return this._scene
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "engine", {
                get: function () {
                    return this._engine
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "activeViewport", {
                get: function () {
                    return this._activeViewport
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "canvas", {
                get: function () {
                    return this._canvas
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "noInfoboxObjects", {
                get: function () {
                    return this._noInfoboxObjects
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "viewports", {
                get: function () {
                    return this._viewports
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "viewerContainer", {
                get: function () {
                    return this._viewerContainer
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "sceneBackgroundColor", {
                get: function () {
                    return this._scene.clearColor
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "renduTeia", {
                get: function () {
                    return this._renduTeia
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "eventTranslate", {
                get: function () {
                    return this._eventTranslate
                },
                set: function (a) {
                    this._eventTranslate = a
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "namespace", {
                get: function () {
                    return this._viewportsControlOptions.namespace
                },
                enumerable: !0,
                configurable: !0
            });
            b.prototype.getInfoBoxManager = function () {
                return this._activeViewport._infoBoxManager
            };
            b.prototype.loadTexture = function () {
                this._texture = new BABYLON.Texture("/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/notification.png", this.scene)
            };
            b.prototype._renderLabel = function (a, b, d, e, f, h, k) {
                void 0 === f && (f = "normal 12px Arial");
                void 0 === h && (h = this._drawingContext);
                void 0 === k && (k = this._drawingCanvas);
                h.font = f;
                f = h.measureText(a);
                var c = b.x - f.width / 2,
                    g = b.y;
                k.getBoundingClientRect();
                h.beginPath();
                h.rect(c - 5, g - d - 12, f.width + 10, 15);
                h.fillStyle = e();
                h.globalAlpha = .5;
                h.fill();
                h.globalAlpha = 1;
                h.strokeStyle = "#FFFFFF";
                h.lineWidth = 1;
                h.stroke();
                h.fillStyle = "#FFFFFF";
                h.fillText(a, c, g - d);
                h.beginPath();
                h.arc(b.x, g, 2, 0, 2 * Math.PI, !1);
                h.fill()
            };
            b.prototype.setSpriteIN3D = function (a, b, d) {
                void 0 === b && (b = "/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/notification.png");
                if (null != a) {
                    var c = new BABYLON.Texture(b, this._scene, !0, !1, BABYLON.Texture.NEAREST_SAMPLINGMODE);
                    c.hasAlpha = !0;
                    c.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                    c.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                    b = new BABYLON.SpriteManager("manager" + a, b, 1, 64, this._scene);
                    c = new BABYLON.Sprite("SpriteNotification" + a, b);
                    c.size = 1;
                    a = this._getMeshesByObjectID(a);
                    0 != a.length && (c.position = null == d ? a[0]._boundingInfo.boundingBox.center : d, b.isPickable = !0, c.isPickable = !0, c.actionManager = new BABYLON.ActionManager(this.scene), c.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {})))
                }
            };
            b.prototype.deleteSpriteIN3DByTags = function (a,
                b) {
                var c = this;
                void 0 === b && (b = "");
                if (null == a) return null;
                a = this.getMeshesByTag(a).meshes;
                this.freeze(!1);
                0 < a.length && a.forEach(function (a) {
                    var g = c._listesprite[a.objectId];
                    if (void 0 != g) {
                        Object.keys(g).forEach(function (d) {
                            if (d == a.objectId + b || d == a.objectId + "Title" + b) g[d].dispose(), delete c._listesprite[a.objectId][d]
                        });
                        var d = c._scene.getMeshByName(a.objectId + b + "LineSpriteTeia");
                        null != d && d.dispose()
                    }
                });
                this.unfreeze()
            };
            b.prototype.setSpriteIN3DByTags = function (a, b, d, e, f, h, k, m, x, q, z, u, y) {
                var c = this;
                void 0 ===
                    b && (b = "");
                void 0 === d && (d = "/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/notification.png");
                void 0 === f && (f = null);
                void 0 === k && (k = !0);
                void 0 === m && (m = 512);
                void 0 === x && (x = 1);
                void 0 === q && (q = "White");
                void 0 === z && (z = "rgba(100, 100, 100, 0.3)");
                void 0 === u && (u = !1);
                void 0 === y && (y = !1);
                if (null == a) return null;
                a = this.getMeshesByTag(a);
                var g = a.meshes,
                    l = a.searchTag,
                    n = [];
                0 < g.length && g.forEach(function (a) {
                    null == c._listesprite[a.objectId] && (c._listesprite[a.objectId] = []);
                    if (null == c._listesprite[a.objectId][a.objectId +
                            b
                        ]) {
                        var g = new BABYLON.SpriteManager("manager" + a.objectId, d, 1, m, c._scene);
                        g.texture.hasAlpha = !0;
                        var p = new BABYLON.Sprite("SpriteNotification" + a.objectId + b, g);
                        c._listesprite[a.objectId][a.objectId + b] = p;
                        g.isPickable = !0;
                        BABYLON.Tags.EnableFor(p);
                        BABYLON.Tags.AddTagsTo(p, l + " " + b);
                        p.isPickable = !0;
                        g.renderingGroupId = y ? 1 : 0;
                        p.shouldBeVisible = !0
                    } else p = c._listesprite[a.objectId][a.objectId + b], g = p._manager, g._spriteTexture = new BABYLON.Texture(d, c.scene, !0, !1, BABYLON.Texture.TRILINEAR_SAMPLINGMODE), g._spriteTexture.wrapU =
                        BABYLON.Texture.CLAMP_ADDRESSMODE, g._spriteTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                    if (null == e) {
                        g = a.getBoundingInfo().boundingBox.vectorsWorld;
                        var C = new BABYLON.Vector3(g[1].x, g[1].y, g[1].z)
                    } else {
                        var r = a.getBoundingInfo().boundingBox.vectorsWorld;
                        r = Number(r[1].y - r[0].y);
                        g = new BABYLON.Vector3(a._boundingInfo.boundingBox.centerWorld.x, a._boundingInfo.boundingBox.centerWorld.y + r / 2, a._boundingInfo.boundingBox.centerWorld.z);
                        C = new BABYLON.Vector3(null == e.x ? g.x : g.x + e.x, null == e.y ? g.y : g.y + e.y, null ==
                            e.z ? g.z : g.z + e.z)
                    }
                    p.position = C;
                    p.shouldBeSize = x;
                    p.idTeia = b;
                    p.size = x;
                    n.push(p);
                    p.actionManager = new BABYLON.ActionManager(c.scene);
                    p.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                        if (c._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && c._activeViewport.activeCamera.useAutoRotationBehavior) {
                            var b = c._activeViewport.activeCamera.getBehaviorByName("AutoRotation");
                            b._isPointerDown = !0
                        }
                        h && h(a);
                        k && (c._smartScene._addObjectToSelection(a.objectId,
                            !0, a.name, !1), c._activeViewport.createInfoBox(a.objectId), c._activeViewport._infoBoxManager.getObjectInfoBox(a.objectId), c.zoomOnSelectedObjects(), c._showInfoBox());
                        c._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && c._activeViewport.activeCamera.useAutoRotationBehavior && (b = c._activeViewport.activeCamera.getBehaviorByName("AutoRotation"), b._isPointerDown = !1)
                    }));
                    if ("" != f) {
                        if (null == c._listesprite[a.objectId][a.objectId + "Title" + b]) {
                            var t = new BABYLON.SpriteManager("managerTitle" +
                                a.objectId + b, "", 2, m, c._scene);
                            g = new BABYLON.Sprite("textSpriteTitle" + a.objectId, t);
                            c._listesprite[a.objectId][a.objectId + "Title" + b] = g;
                            BABYLON.Tags.EnableFor(g);
                            BABYLON.Tags.AddTagsTo(g, l + " " + b);
                            t.renderingGroupId = y ? 1 : 0
                        } else g = c._listesprite[a.objectId][a.objectId + "Title" + b], t = g._manager;
                        var D = new BABYLON.DynamicTexture("DynamicTextureSprite", m, c._scene, !0);
                        D.hasAlpha = !0;
                        D.getContext().save(); - 1 < f.indexOf("@name") && (f = a.name);
                        D.drawText(f, null, 70, "bold 30px Segoe UI", q, z, !1, !0, 100);
                        D.update(!1);
                        t.texture =
                            D;
                        t.texture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                        t.texture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                        g.position.x = C.x;
                        g.position.z = C.z;
                        g.position.y = C.y;
                        g.shouldBeSize = 3 * x;
                        g.size = 3 * x;
                        n.push(g);
                        a.getBoundingInfo();
                        r = new BABYLON.Vector3(a._boundingInfo.boundingBox.centerWorld.x, a._boundingInfo.boundingBox.centerWorld.y + r / 2, a._boundingInfo.boundingBox.centerWorld.z);
                        u && (r = BABYLON.Mesh.CreateDashedLines(a.objectId + b + "LineSpriteTeia", [g.position, r], 3, 1, 200, c._scene, !0), c._octree && c._octree.dynamicContent.push(r),
                            r.color = new BABYLON.Color3(.8, .8, .8));
                        g.actionManager = new BABYLON.ActionManager(c.scene);
                        g.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                            if (c._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && c._activeViewport.activeCamera.useAutoRotationBehavior) {
                                var b = c._activeViewport.activeCamera.getBehaviorByName("AutoRotation");
                                b._isPointerDown = !0
                            }
                            h && h(a);
                            k && (c._smartScene._addObjectToSelection(a.objectId, !0,
                                a.name, !0), c._activeViewport.createInfoBox(a.objectId), c._activeViewport._infoBoxManager.getObjectInfoBox(a.objectId), c.zoomOnSelectedObjects());
                            c._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && c._activeViewport.activeCamera.useAutoRotationBehavior && (b = c._activeViewport.activeCamera.getBehaviorByName("AutoRotation"), b._isPointerDown = !1)
                        }))
                    }
                    c._setVisibleSprite(a.objectId, p.shouldBeVisible)
                });
                return n
            };
            b.prototype.setSprite = function () {
                var a = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
                    id: "ScreenCanvas",
                    size: new BABYLON.Size(200, 200),
                    x: 0,
                    y: 0
                });
                new BABYLON.Rectangle2D({
                    id: "mainRect",
                    parent: a,
                    width: 64,
                    height: 64,
                    fill: "#404080FF",
                    x: 0,
                    y: 0
                });
                (new BABYLON.Sprite2D(this._texture, {
                    parent: a,
                    id: "sprite",
                    spriteSize: new BABYLON.Size(64, 64),
                    x: 0,
                    y: 0,
                    isVisible: !0
                })).pointerEventObservable.add(function (a, c) {
                    console.log("Sprite hit")
                }, BABYLON.PrimitivePointerInfo.PointerUp)
            };
            b.prototype.setAnimationSpritebyTag = function (a, b, d, e, f) {
                var c = this;
                void 0 === b && (b = "");
                void 0 === d && (d = !1);
                void 0 === e && (e = 0);
                void 0 === f && (f = 1);
                var g = "",
                    l = !1;
                a.split(" ").forEach(function (a) {
                    "" != a && ("!" == a || "(" == a || ")" == a || "||" == a || "&&" == a ? (g = g + " " + a + " ", l = !0) : "et" == a.toLowerCase() || "and" == a.toLowerCase() ? (g += " && ", l = !0) : "ou" == a.toLowerCase() || "or" == a.toLowerCase() ? (g += " || ", l = !0) : "not" == a.toLowerCase() || "non" == a.toLowerCase() ? (g += "!", l = !0) : l ? (g += a, l = !1) : g = g + ("" == g ? "" : " && ") + a)
                });
                a = this.scene._getByTags(this._listesprite, g);
                0 != a.length && a.forEach(function (a) {
                    if (0 == e) {
                        var b = 20,
                            g = new BABYLON.Animation("position", "position.y",
                                b, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        null == a.positionInitY && (a.positionInitY = a.position.y);
                        var l = [];
                        l.push({
                            frame: 0,
                            value: a.positionInitY
                        });
                        l.push({
                            frame: 5 * b,
                            value: a.positionInitY + 10
                        });
                        l.push({
                            frame: 10 * b,
                            value: a.positionInitY
                        });
                        g.setKeys(l);
                        l = new BABYLON.BounceEase;
                        g.setEasingFunction(l)
                    } else b = 20, g = new BABYLON.Animation("rotation", "width", b, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE), l = [], l.push({
                            frame: 0,
                            value: a.width
                        }),
                        l.push({
                            frame: 5 * b,
                            value: 0
                        }), l.push({
                            frame: 10 * b,
                            value: a.width
                        }), g.setKeys(l);
                    c._scene.beginDirectAnimation(a, [g], 0, 15 * b, d, f)
                })
            };
            b.prototype.getMeasureHandler = function () {
                this._measuresHandler || (this._measuresHandler = new k.MeasureHandler(this));
                return this._measuresHandler
            };
            b.prototype.switchFreeCamera = function () {
                this._switchCamera(BABYLON.TeiaJSAddons.CameraTypes.FreeCamera)
            };
            b.prototype.switchUniversalCamera = function () {
                this._switchCamera(BABYLON.TeiaJSAddons.CameraTypes.UniversalCamera)
            };
            b.prototype.switchJoystickCamera =
                function () {
                    this._switchCamera(BABYLON.TeiaJSAddons.CameraTypes.VirtualJoystickCamera)
                };
            b.prototype.switchWebVRCamera = function () {
                this._switchCamera(BABYLON.TeiaJSAddons.CameraTypes.WebVRCamera)
            };
            b.prototype.switchArcRotateCamera = function () {
                this._switchCamera(BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera)
            };
            b.prototype.getCuttingPlane = function () {
                if (this._cuttingPlane) return this._cuttingPlane
            };
            b.prototype.getSmartSceneID = function () {
                return this._smartScene.sceneId
            };
            b.prototype.createNotificationHandler =
                function () {
                    return new k.NotificationHandler(this)
                };
            b.prototype.changeTexture = function () {
                var a = new BABYLON.Texture("/Modules/Teia.TeiaJS/Scripts/Generated/Content/assets/info.png", this._scene),
                    b = BABYLON.Mesh.CreateBox("box", 2, this.scene),
                    d = this.scene.getMeshByID("Cube");
                BABYLON.Geometry.ExtractFromMesh(b, b.geometry.id).applyToMesh(d);
                b.position.y = 4;
                b = new BABYLON.StandardMaterial("test", this.scene);
                b.diffuseColor = BABYLON.Color3.Red();
                b.diffuseTexture = a;
                d.material = b
            };
            b.prototype.freeze = function (a, b) {
                void 0 ===
                    a && (a = !0);
                void 0 === b && (b = !1);
                this._unbindingMouse();
                for (var c in this._viewports.values) this._viewports.values[c].activeCamera.detachControl(this._canvas), this._viewports.values[c].disableCameraControls();
                b && void 0 != this._smartSceneTreeView && this._smartSceneTreeView.hideTreeView();
                a && this.loadingScreen();
                this._stopRender()
            };
            b.prototype.unfreeze = function () {
                this._bindingMouse();
                for (var a in this._viewports.values) this._viewports.values[a].activeCamera.attachControl(this._canvas), this._viewports.values[a].enableCameraControls();
                void 0 != this._smartSceneTreeView && this._smartSceneTreeView.showTreeView();
                this.unloadingScreen();
                this._startRender()
            };
            b.prototype._binding = function () {
                this._bindingMouse();
                a.Utilities.Event.on(this._smartScene, k.SmartScene.PARSING_STARTED_EVENT, $.proxy(this._onParsingStarted, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.GETTING_TEIA_SCENE_EVENT, $.proxy(this._onGettingTeiaScene, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.ERROR_GETTING_TEIA_SCENE_EVENT, $.proxy(this.unloadingScreen,
                    this));
                a.Utilities.Event.on(this._smartScene.objectsActions, a.Utilities.Set.ADDED_EVENT, $.proxy(this._onObjectActionAdded, this));
                a.Utilities.Event.on(this._smartScene.objectsActions, a.Utilities.Set.SET_EVENT, $.proxy(this._onObjectActionUpdated, this));
                a.Utilities.Event.on(this._smartScene.objectsActions, a.Utilities.Set.REMOVED_EVENT, $.proxy(this._onObjectActionRemoved, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.REMOVED_OBJECT_EVENT, $.proxy(this._onObjectRemoved, this));
                a.Utilities.Event.on(this._smartScene,
                    k.SmartScene.REMOVED_OBJECTS_EVENT, $.proxy(this._onObjectsRemoved, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.CHANGED_PARENT_OBJECT_EVENT, $.proxy(this._onObjectParentChanged, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.UPDATED_THREED_OBJECT_EVENT, $.proxy(this._onObjectThreeDUpdated, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.POSITION_CHANGED_EVENT, $.proxy(this._onObjectPositionChanged, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.PARSED_LAYER_EVENT,
                    $.proxy(this._onLayerAdded, this));
                a.Utilities.Event.on(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, $.proxy(this._onVisibleStateChanged, this));
                this._smartSceneBinding()
            };
            b.prototype._onVisibleStateChanged = function (a, b, d) {
                this._setVisibleSprite(b, d)
            };
            b.prototype._setVisibleSprite = function (a, b) {
                var c = this;
                if (null != this._listesprite[a]) {
                    var g = this._listesprite[a];
                    Object.keys(g).forEach(function (d) {
                        d = g[d];
                        d.size = b ? d.shouldBeSize : 0;
                        d.shouldBeVisible = b;
                        d = c._scene.getMeshByName(a + d.idTeia + "LineSpriteTeia");
                        null != d && (d.isVisible = b)
                    })
                }
            };
            b.prototype._onGettingTeiaScene = function (a) {
                this.loadingScreen(!1);
                this.setLoadingText("Loading SmartScene 3d...")
            };
            b.prototype._onLayerAdded = function (a, b) {
                for (var c in this.viewports.values) this.viewports.values[c].addLayerControlsItem(b[0], b[1], b[2])
            };
            b.prototype._showLayer = function () {
                for (var a in this.viewports.values) this.viewports.values[a].showLayer()
            };
            b.prototype._hideLayer = function () {
                for (var a in this.viewports.values) this.viewports.values[a].hideLayer()
            };
            b.prototype._enableLayer =
                function (a, b) {
                    this._smartScene._actionsManager.enableLayer(b[0])
                };
            b.prototype._disableLayer = function (a, b) {
                this._smartScene._actionsManager.disableLayer(b[0])
            };
            b.prototype._unbinding = function () {
                this._unbindingMouse();
                this._smartSceneUnbinding();
                this._unbindInfoBoxManager();
                this._unbindLayerControls();
                a.Utilities.Event.off(this._smartScene, k.SmartScene.PARSING_STARTED_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.GETTING_TEIA_SCENE_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.ERROR_GETTING_TEIA_SCENE_EVENT);
                a.Utilities.Event.off(this._smartScene.objectsActions, a.Utilities.Set.ADDED_EVENT);
                a.Utilities.Event.off(this._smartScene.objectsActions, a.Utilities.Set.SET_EVENT);
                a.Utilities.Event.off(this._smartScene.objectsActions, a.Utilities.Set.REMOVED_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.REMOVED_OBJECT_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.REMOVED_OBJECTS_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.CHANGED_PARENT_OBJECT_EVENT);
                a.Utilities.Event.off(this._smartScene,
                    k.SmartScene.UPDATED_THREED_OBJECT_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.POSITION_CHANGED_EVENT);
                a.Utilities.Event.off(this._smartScene._actionsManager, k.ActionsManager.ADDED_LAYER_EVENT)
            };
            b.prototype._onActiveCameraChanged = function (a, b, d) {
                b && b.detachControl(this._canvas);
                d.attachControl(this._canvas);
                this.scene.cameraToUseForPointers = d
            };
            b.prototype._bindingMouse = function () {
                this._onMouseDownProxy || (this._onMouseDownProxy = $.proxy(this._onMouseDown, this));
                this._onDbClickProxy ||
                    (this._onDbClickProxy = $.proxy(this._onDbClick, this));
                a.Utilities.Event.on(this._canvas, this._eventPrefix + "down", this._onMouseDownProxy);
                a.Utilities.Event.on(this._canvas, "dblclick", this._onDbClickProxy)
            };
            b.prototype._unbindingMouse = function () {
                a.Utilities.Event.off(this._canvas, this._eventPrefix + "down", this._onMouseDownProxy);
                a.Utilities.Event.off(this._canvas, "dblclick", this._onDbClickProxy)
            };
            b.prototype._bindLayerControls = function () {
                a.Utilities.Event.on(this._activeViewport._layersControls, Teia.gui.LayersControls.ENABLING_LAYER_EVENT,
                    $.proxy(this._enableLayer, this));
                a.Utilities.Event.on(this._activeViewport._layersControls, Teia.gui.LayersControls.DISABLING_LAYER_EVENT, $.proxy(this._disableLayer, this))
            };
            b.prototype._unbindLayerControls = function () {
                a.Utilities.Event.off(this._activeViewport._layersControls, Teia.gui.LayersControls.ENABLING_LAYER_EVENT);
                a.Utilities.Event.off(this._activeViewport._layersControls, Teia.gui.LayersControls.DISABLING_LAYER_EVENT)
            };
            b.prototype._bindInfoBoxManager = function () {
                a.Utilities.Event.on(this._activeViewport._infoBoxManager,
                    Teia.gui.InfoBoxManager.INFOBOX_OPENED, $.proxy(this._onInfoboxOpened, this));
                a.Utilities.Event.on(this._activeViewport._infoBoxManager, Teia.gui.InfoBoxManager.INFOBOX_CLOSED, $.proxy(this._onInfoboxClosed, this))
            };
            b.prototype._unbindInfoBoxManager = function () {
                a.Utilities.Event.off(this._activeViewport._infoBoxManager, Teia.gui.InfoBoxManager.INFOBOX_OPENED);
                a.Utilities.Event.off(this._activeViewport._infoBoxManager, Teia.gui.InfoBoxManager.INFOBOX_CLOSED)
            };
            b.prototype._onInfoboxOpened = function () {
                this._updateSelectionUI();
                void 0 != this._smartScene._actionsManager && this._smartScene._actionsManager.enableActionTypeOnObject(new a.API.Selection(this._getSelectedMeshes()), "display")
            };
            b.prototype._onInfoboxClosed = function () {
                this._updateSelectionUI();
                void 0 != this._smartScene._actionsManager && this._smartScene._actionsManager.disableActionTypeOnObject(new a.API.Selection(this._getSelectedMeshes()), "display")
            };
            b.prototype._smartSceneBinding = function () {
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SELECTION_ADDED_EVENT, $.proxy(this._onSelectionAdded,
                    this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SELECTION_REMOVED_EVENT, $.proxy(this._onSelectionRemoved, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SELECTION_CLEARED_EVENT, $.proxy(this._onSelectionCleared, this));
                a.Utilities.Event.on(this._smartScene, k.SmartScene.SCENE_CLEARED_EVENT, $.proxy(this._onSceneCleared, this))
            };
            b.prototype._smartSceneUnbinding = function () {
                a.Utilities.Event.off(this._smartScene, k.SmartScene.SELECTION_ADDED_EVENT);
                a.Utilities.Event.off(this._smartScene,
                    k.SmartScene.SELECTION_REMOVED_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.SELECTION_CLEARED_EVENT);
                a.Utilities.Event.off(this._smartScene, k.SmartScene.SCENE_CLEARED_EVENT)
            };
            b.prototype._bindWindowResize = function () {
                this._onWindowResizeProxy || (this._onWindowResizeProxy = $.proxy(this._onResize, this));
                a.Utilities.Event.on(window, "resize", this._onWindowResizeProxy)
            };
            b.prototype._unbindWindowResize = function () {
                a.Utilities.Event.off(window, "resize", this._onWindowResizeProxy)
            };
            b.prototype._onResize =
                function () {
                    var a = this;
                    clearTimeout(b);
                    var b = setTimeout(function () {
                        a._canvas.width = a.viewerContainer.clientWidth;
                        a._canvas.height = a.viewerContainer.clientHeight;
                        a._engine.resize()
                    }, 10)
                };
            b.prototype._renderInternal = function () {
                if ((0 < this._meshesNotUpdated.length || 0 < this.scene.meshes.length && (0 < this._boxesToCreate.length || 0 < this._spheresToCreate.length)) && this._scene.isReady()) {
                    this._stopRender();
                    for (var c = 0; c < this._meshesNotUpdated.length; c++) this.updateMeshInfos(this._meshesNotUpdated[c]);
                    this.scene.meshes.map(function (a) {
                        return a.id
                    });
                    this._lengthMeshes = this._scene.meshes.length;
                    var g = [];
                    this._objectIdToMeshesNames.filter(function (a, c, b) {
                        1 < a.length && g.push({
                            name: a[0],
                            objectId: c
                        });
                        return !1
                    });
                    for (var d = 0; d < g.length; d++) {
                        var e = g[d];
                        0 == d && (this._objectIdToMeshesNames[e.objectId] = [e.name])
                    }
                    for (d = this._meshesNotUpdated.length = 0; d < this._boxesToCreate.length; d++) this._createUnitBox(this._boxesToCreate[d]);
                    for (d = this._boxesToCreate.length = 0; d < this._spheresToCreate.length; d++) this._createUnitSphere(this._spheresToCreate[d]);
                    this._spheresToCreate.length =
                        0;
                    this._alreadyZoomedOn || (this.scene.render(), this._alreadyZoomedOn = !0, this._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && this._activeViewport.activeCamera.zoomOn());
                    if (this._initScene) {
                        this._initScene = !1;
                        this._renduTeia ? ($("#Type-Rendu-" + this.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-WireFrame"), $("#Type-Rendu-" + this.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Texture"), $("#Type-Rendu-" +
                            this.namespace + "-Container  .Teia-Icons-Type-Rendu").addClass("Teia-Icons-Mesh-Xray")) : ($("#Type-Rendu-" + this.namespace + "-Container  .Teia-Icons-Type-Rendu").addClass("Teia-Icons-Mesh-Texture"), $("#Type-Rendu-" + this.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-WireFrame"), $("#Type-Rendu-" + this.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Xray"));
                        this.switchWireFrame(this._viewportsControlOptions.wireframeMode);
                        this._viewportsControlOptions.ssao &&
                            this.addEffectSSAO();
                        this._viewportsControlOptions.hdr && !this._renduTeia && this.addEffectHdr();
                        this._activateSkybox(this._viewportsControlOptions.skybox, this._viewportsControlOptions.hdr && !this._renduTeia, this._viewportsControlOptions.skyboxPath);
                        this.unloadingScreen(!1);
                        null != this.urlParam("ObjectId") && (c = this.urlParam("OpenInfobox"), this.vueZoom(this.urlParam("ObjectId"), c));
                        this.addButtonGroup("id-Teia-Logo" + this.namespace, "uk-link", "Teia-Icons-Teia ", {}, null, null, "Teia V" + this._viewportsControlOptions.versionTeia +
                            " <br/> Version WebGL : " + this._engine.webGLVersion + " <br/> Nombre d'objets : " + this._scene.meshes.length);
                        this._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && (a.Utilities.Event.on(this._activeViewport.activeCamera, "cameraIsMoving", $.proxy(this._cameraIsMoving, this)), a.Utilities.Event.on(this._activeViewport.activeCamera, "cameraIsNotMoving", $.proxy(this._cameraIsStationary, this)), a.Utilities.Event.on(this._activeViewport.activeCamera, "cameraIsEndMoving",
                                $.proxy(this._cameraIsEndMoving, this)), this._viewportsControlOptions.autoRotationBehavior && (this._activeViewport.activeCamera.useAutoRotationBehavior = this._viewportsControlOptions.autoRotationBehavior, c = this._activeViewport.activeCamera.getBehaviorByName("AutoRotation"), c.idleRotationSpeed = this._viewportsControlOptions.autoRotationSpeed, c.idleRotationWaitTime = 6E3 * this._viewportsControlOptions.autoRotationWaitTime, c.zoomStopsAnimation = this._viewportsControlOptions.autoRotationZoomStopsAnimation), this._viewportsControlOptions.framingBehavior &&
                            (this._activeViewport.activeCamera.useFramingBehavior = this._viewportsControlOptions.framingBehavior), this._viewportsControlOptions.bouncingBehavior && (this._activeViewport.activeCamera.useBouncingBehavior = this._viewportsControlOptions.bouncingBehavior), this._activeViewport.activeCamera.upperRadiusLimit = this._viewportsControlOptions.maxRadiusBouncingBehavior, this._activeViewport.activeCamera.lowerRadiusLimit = this._viewportsControlOptions.minRadiusBouncingBehavior);
                        this._isActivatOverlay = this._viewportsControlOptions.activatOverlay;
                        a.Utilities.Event.fire(this, b.SCENE_LOADED_EVENT);
                        return
                    }
                }
                this._averageOnWindow = this.engine.getFps();
                d = Object.keys(this._arrayEventOptimize);
                if (!this._initScene) {
                    if (this._IsStationary) {
                        this.scene.nopick && (this.scene.nopick = !1, this._updateSelectionUI(!0, !1));
                        if (this._viewportsControlOptions.optimize) {
                            0 < d.length && this._onOptimized && (this._index = this._scene.meshes.length);
                            if (0 != this._index) {
                                for (d = this._index; 0 < d; d--)
                                    if (this._optimizeScenebyIndex(!1, d), !this._IsStationary) {
                                        d = c;
                                        break
                                    } this._index = 0
                            }
                            this._onOptimized = !1
                        }
                        this._levelScalling = 1;
                        this.engine.getHardwareScalingLevel() != this._levelScalling && this.engine.setHardwareScalingLevel(this._levelScalling)
                    } else if (this.scene.nopick || (this.scene.nopick = this._isActivatOverlay, this._updateSelectionUI(!0, !0)), this._viewportsControlOptions.optimize) {
                        if (0 < d.length) {
                            for (c = 0; c < d.length; c++) this._arrayEventOptimize[d[c]]();
                            this._onOptimized = !0
                        }
                        3 > this._averageOnWindow ? (this._levelScalling = 1, d = Math.min(Math.floor(this._index + 15E3), this._lengthMeshes - 1)) : 10 > this._averageOnWindow ?
                            (this._levelScalling = 1, d = Math.min(Math.floor(this._index + 3500), this._lengthMeshes - 1)) : (this._levelScalling = 1, d = this._index);
                        this.engine.getHardwareScalingLevel() != this._levelScalling && this.engine.setHardwareScalingLevel(this._levelScalling);
                        for (c = this._index; c < d; c++)
                            if (this._optimizeScenebyIndex(!0, c, this._levelScalling), this._IsStationary) {
                                d = c;
                                break
                            } this._index = d
                    } else this._levelScalling = 1, this.engine.getHardwareScalingLevel() != this._levelScalling && this.engine.setHardwareScalingLevel(this._levelScalling);
                    this._scene.render()
                }
            };
            b.prototype._stopRender = function () {
                this._rendering && (this._rendering = !1, this._engine.stopRenderLoop(this._renderInternalProxy))
            };
            b.prototype._startRender = function () {
                this._rendering || (this._rendering = !0, this._renderInternalProxy || (this._renderInternalProxy = $.proxy(this._renderInternal, this)), this._engine.runRenderLoop(this._renderInternalProxy))
            };
            b.prototype.dispose = function (a) {
                void 0 === a && (a = !1);
                this._engine.dispose();
                this._smartSceneTreeView && this._smartSceneTreeView.dispose();
                for (var c in this._viewports.values) this._viewports.values[c].dispose();
                this._unbinding();
                this._unbindWindowResize();
                this._canvasContainer.parentNode.removeChild(this._canvasContainer);
                a || this._smartScene.dispose()
            };
            b.prototype._updateSelectionUI = function (a, b) {
                void 0 === a && (a = !1);
                void 0 === b && (b = !1);
                this._drawingContext.clearRect(0, 0, this._drawingCanvas.width, this._drawingCanvas.height);
                for (var c in this.viewports.values) {
                    var g = this.viewports.values[c];
                    b ? g.clear2DCanvas() : g.update2DCanvas(a)
                }
            };
            b.prototype.urlParam =
                function (a) {
                    a = (new RegExp("[?&]" + a + "=([^&#]*)")).exec(window.location.href);
                    return null == a ? null : a[1] || 0
                };
            b.prototype.addNew3DViewport = function (c, g, d, e, f) {
                void 0 === c && (c = BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera);
                void 0 === g && (g = 0);
                void 0 === d && (d = 0);
                void 0 === e && (e = 1);
                void 0 === f && (f = 1);
                a.Utilities.Event.fire(this, b.ADDING_VIEWPORT_EVENT);
                this._viewport3d = g = new a.API.Viewport3D(this, this._scene, this._viewerContainer, this._viewportsControlOptions.showCameraControls, this._viewportsControlOptions.showViewcubeControls,
                    g, d, e, f, this._viewportsControlOptions.layer, this._viewportsControlOptions.disableInfoBoxes, this._viewportsControlOptions.disableLayerControls);
                d = this._viewports.add(g);
                this._arrayIdCamera[0] = g.addArcRotateCamera("defaultCamera", new BABYLON.Vector3(0, 0, 0), this._scene, -Math.PI / 2, 3 * Math.PI / 8, 250, .2, 200, this.ACTIVE_LAYER, this._viewportsControlOptions.mouseWheelPrecision);
                this._arrayIdCamera[1] = g.addArcRotateCamera("OptimizeCamera", new BABYLON.Vector3(0, 0, 0), this._scene, -Math.PI / 2, 3 * Math.PI / 8, 250, 0, 200,
                    this.ACTIVE_OPTIMIZE_LAYER);
                this._arrayIdCamera[2] = g.addFreeCamera("freeCamera", new BABYLON.Vector3(0, 0, 0), this._scene, this._viewportsControlOptions.cameraSpeed, 0, 200, this.ACTIVE_LAYER);
                this._arrayIdCamera[3] = g.addUniversalCamera("universalCamera", new BABYLON.Vector3(0, 0, 0), this._scene, this.ACTIVE_LAYER, 0, 200, this._viewportsControlOptions.cameraSpeed);
                this._arrayIdCamera[4] = g.addVirtualJoystickCamera("VirtualjoystickCamera", new BABYLON.Vector3(0, 0, 0), this._scene);
                this._arrayIdCamera[5] = g.addWebVRCamera("WebVRCamera",
                    new BABYLON.Vector3(0, 0, 0), this._scene);
                if (this._viewportsControlOptions.cameras)
                    for (var l in this._viewportsControlOptions.cameras) {
                        e = this._viewportsControlOptions.cameras[l];
                        if ("ArcRotateCamera" == e.Type) {
                            f = g.getCamerasByType(b.ARC_ROTATE_CAMERA);
                            if (!f || 0 === f.length) continue;
                            this._alreadyZoomedOn = !0;
                            f[0].target = new BABYLON.Vector3(e.Target.x, e.Target.y, e.Target.z);
                            f[0].alpha = e.Alpha;
                            f[0].beta = e.Beta;
                            f[0].radius = e.Radius
                        }
                        "UniversalCamera" == e.Type && (f = g.getCamerasById(this._arrayIdCamera[b.UNIVERSAL_CAMERA])) &&
                            (this._alreadyZoomedOn = !0, f.position = new BABYLON.Vector3(e.Position.x, e.Position.y, e.Position.z), f.rotation = new BABYLON.Vector3(e.Rotation.x, e.Rotation.y, e.Rotation.z), (f = g.getCamerasById(this._arrayIdCamera[b.FREE_CAMERA])) && 0 !== f.length && (this._alreadyZoomedOn = !0, f.position = new BABYLON.Vector3(e.Position.x, e.Position.y, e.Position.z), f.rotation = new BABYLON.Vector3(e.Rotation.x, e.Rotation.y, e.Rotation.z), f = g.getCamerasById(this._arrayIdCamera[b.VIRTUALJOYSTICKS_CAMERA]))) && (this._alreadyZoomedOn = !0, f.position = new BABYLON.Vector3(e.Position.x, e.Position.y, e.Position.z), f.rotation = new BABYLON.Vector3(e.Rotation.x, e.Rotation.y, e.Rotation.z))
                    }
                this._switchCamera(c);
                this._bindingViewport(g);
                c === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera ? ($("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View"),
                        $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Satellite-View")) : c === BABYLON.TeiaJSAddons.CameraTypes.UniversalCamera ? ($("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Street-View"), $("#Camera-All-" + this.namespace +
                        "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View")) : c === BABYLON.TeiaJSAddons.CameraTypes.VirtualJoystickCamera ? ($("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Virtual-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View")) :
                    c === BABYLON.TeiaJSAddons.CameraTypes.WebVRCamera && ($("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-WebVR"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View"), $("#Camera-All-" + this.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View"));
                this._rendering || this._startRender();
                a.Utilities.Event.fire(this, b.ADDED_VIEWPORT_EVENT, g, d);
                this._activeViewport || (this._activeViewport = g);
                this._bindInfoBoxManager();
                this._bindLayerControls();
                return d
            };
            b.prototype.removeViewport = function (a) {
                if (a) return this._viewports.remove(a)
            };
            b.prototype.clear = function () {
                a.Utilities.Event.fire(this, b.CLEARING_VIEWPORTS_EVENT);
                this._viewports.clear();
                a.Utilities.Event.fire(this, b.CLEARED_VIEWPORTS_EVENT)
            };
            b.prototype.createAndLoadSun = function () {
                var a = this;
                new BABYLON.HemisphericLight("default light Sun Teia",
                    BABYLON.Vector3.Up(), this._scene);
                var b = new BABYLON.DirectionalLight("torche_Default", new BABYLON.Vector3(2, -5, -1), this._scene);
                b.intensity = 1;
                b.range = 100;
                this._scene.registerBeforeRender(function () {
                    b.position = a.activeViewport.activeCamera.position
                });
                return b
            };
            b.prototype.createAndLoadBox = function (a, b) {
                if (a && null != b) return BABYLON.Mesh.CreateBox(a, b, this._scene)
            };
            b.prototype._createUnitBox = function (a) {
                var c = this._scene.getMeshByName("unitBoxOrigin");
                c || (c = BABYLON.Mesh.CreateBox("unitBoxOrigin", 1, this._scene),
                    c.isVisible = !1, c.isPickable = !1, c.setEnabled(!1));
                c = new BABYLON.InstancedMesh(a.name, c);
                c.scaling = a.scaling;
                return this._initUnitMesh(a, c)
            };
            b.prototype._createUnitSphere = function (a) {
                var c = this._scene.getMeshByName("unitSphereOrigin");
                c || (c = BABYLON.Mesh.CreateSphere("unitSphereOrigin", 16, 1, this._scene), c.isVisible = !1, c.isPickable = !1, c.setEnabled(!1));
                c = new BABYLON.InstancedMesh(a.name, c);
                c = this._initUnitMesh(a, c);
                c.scaling.copyFromFloats(a.scaling, a.scaling, a.scaling);
                var b = !0,
                    d;
                for (d in this._pendingMovingStack) {
                    var e =
                        this._pendingMovingStack[d];
                    e.objectId == c.objectId && (this._onObjectPositionChanged(null, e.objectId, e.posX, e.posZ), this._pendingMovingStack.slice(parseInt(d), 0), b = !1)
                }
                c.isVisible = !b;
                c.sourceMesh.material = this._createSphereMaterial(a.objectId, c.position);
                c.material = c.sourceMesh.material;
                return c
            };
            b.prototype._createSphereMaterial = function (c, b) {
                c = new BABYLON.StandardMaterial(c + "Solid", this._scene);
                c.alpha = 1;
                c.backFaceCulling = !1;
                c.specularPower = 64;
                c.useSpecularOverAlpha = !1;
                c.useAlphaFromDiffuseTexture = !1;
                c.diffuseColor = new BABYLON.Color3(1, 0, 0);
                c.emissiveColor = new BABYLON.Color3(1, 0, 0);
                c.ambientColor = new BABYLON.Color3(1, 0, 0);
                c.specularColor = new BABYLON.Color3(1, 0, 0);
                b = new BABYLON.Texture(a.Urls.assetsUrl + "/material-teia-alpha.png", this._scene);
                b.uScale = 1;
                b.vScale = 1;
                b.coordinatesMode = 0;
                b.uOffset = 0;
                b.vOffset = 0;
                b.uAng = 0;
                b.vAng = 0;
                b.level = .45;
                b.coordinatesIndex = 0;
                b.hasAlpha = !1;
                b.getAlphaFromRGB = !1;
                c.opacityTexture = b;
                return c
            };
            b.prototype._initUnitMesh = function (a, b, d) {
                var c = this._getMeshesByObjectID(a.parentId);
                0 < c.length && (b.parent = c[0]);
                b.objectId = a.objectId;
                b.colorComponent = new BABYLON.Color3(a.color.r, a.color.g, a.color.b);
                b.position.y = b.scaling.y / 2;
                a.publish || b.setEnabled(!1);
                a.clickable || (b.isPickable = !1);
                a.visible || (b.isVisible = !1);
                this._checkIfPendingMeshUpdated(b);
                if (d) return b;
                b.material = new BABYLON.StandardMaterial(b.objectId + "Solid", this._scene);
                b.material.diffuseColor = new BABYLON.Color3(a.color.r, a.color.g, a.color.b);
                b.actionManager = new BABYLON.ActionManager(this._scene);
                b.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,
                    function () {}));
                a = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, b, "visibility", .2, 1E3);
                d = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, b, "visibility", 1, 1E3);
                b.actionManager.registerAction(a).then(d);
                this._meshesMaterialTeia[b.id] = b.material;
                return b
            };
            b.prototype.getPickedMesh = function (a, b, d) {
                var c = this;
                void 0 === d && (d = !0);
                if (null != a && null != b && !this.scene.nopick) {
                    a = this._scene.pick(a, b, function (a) {
                            return a.isPickable && (!d || a.objectId != c._pickedMeshSelCur)
                        },
                        null, this.activeViewport.activeCamera).pickedMesh;
                    if (!a) return null;
                    this._pickedMeshSelCur = a.objectId;
                    return a
                }
            };
            b.prototype.getPickedObject = function (a, b) {
                if (null != a && null != b && !this.scene.nopick) {
                    var c = this._scene.pick(a, b, null, null, this.activeViewport.activeCamera).pickedMesh;
                    if (!c) {
                        for (var g in this._pickedMeshSelObjects) {
                            var d = this._getMeshesByObjectID(this._pickedMeshSelObjects[g]);
                            0 < d.length && (d[0].isPickable = !0)
                        }
                        this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                        c = this._scene.pick(a,
                            b, null, null, this.activeViewport.activeCamera).pickedMesh;
                        if (!c) return null
                    }
                    if (this._pickedMeshXYCur.x != a || this._pickedMeshXYCur.y != b) {
                        for (var e in this._pickedMeshSelObjects) d = this._getMeshesByObjectID(this._pickedMeshSelObjects[e]), 0 < d.length && (d[0].isPickable = !0);
                        this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                        this._pickedMeshXYCur.x = a;
                        this._pickedMeshXYCur.y = b
                    } - 1 != this._pickedMeshSelObjects.indexOf(c.objectId) ? (c.isPickable = !1, c = this._scene.pick(a, b, null, null, this.activeViewport.activeCamera).pickedMesh) :
                        (this._pickedMeshSelObjects.push(c.objectId), c.isPickable = !1);
                    if (!c) return null;
                    this._pickedMeshSelCur = c.objectId;
                    return c || null
                }
            };
            b.prototype.cloneObject = function (c, b) {
                void 0 === b && (b = !0);
                c = this._getMeshesByObjectID(c);
                if (0 === c.length) return null;
                var g = (new a.Utilities.UniqueId).getValue(),
                    d;
                for (d in c) {
                    var e = c[d],
                        f = e.clone(e.name, e.parent, !0);
                    e.clones || (e.clones = []);
                    e.clones.push(f);
                    f.objectId = g;
                    f.isPickable = b;
                    b || (f.disableEdgesRendering(), f.renderOverlay = !1, f.renderingGroupId = 0)
                }
                return g
            };
            b.prototype.removeClonesFromObject =
                function (a) {
                    if ((a = this._getMeshesByObjectID(a)) && 0 !== a.length)
                        for (var c in a) {
                            var b = a[c],
                                d;
                            for (d in b.clones) b.clones[d].dispose()
                        }
                };
            b.prototype.getMeshesByTag = function (a) {
                void 0 === a && (a = "*");
                if ("*" == a) a = this.scene.meshes;
                else {
                    var c = !1,
                        b = "";
                    a.split(" ").forEach(function (a) {
                        "" != a && ("!" == a || "(" == a || ")" == a || "||" == a || "&&" == a ? (b = b + " " + a + " ", c = !0) : "et" == a.toLowerCase() || "and" == a.toLowerCase() ? (b += " && ", c = !0) : "ou" == a.toLowerCase() || "or" == a.toLowerCase() ? (b += " || ", c = !0) : "not" == a.toLowerCase() || "non" == a.toLowerCase() ?
                            (b += "!", c = !0) : c ? (b += a, c = !1) : b = b + ("" == b ? "" : " && ") + a)
                    });
                    a = this._scene.getMeshesByTags(b)
                }
                return {
                    searchTag: b,
                    meshes: a
                }
            };
            b.prototype.setAlphabyTag = function (a, b) {
                a = this.getMeshesByTag(a).meshes;
                this.freeze(!1);
                0 < a.length && a.forEach(function (a) {
                    a.material.alpha = b
                });
                this.unfreeze()
            };
            b.prototype.setclickablebyTag = function (a, b) {
                void 0 === b && (b = !0);
                a = this.getMeshesByTag(a).meshes;
                this.freeze(!1);
                0 < a.length && a.forEach(function (a) {
                    a._isObjectTeia && (a.isPickable = b)
                });
                this.unfreeze()
            };
            b.prototype.addButtonGroupSeparator =
                function () {
                    void 0 == this._groupBouton && (this._groupBouton = document.createElement("ul"), this._groupBouton.className = "nav-menu3D uk-list nav-menu3D-" + this._viewportsControlOptions.menuBarPosition + (this._viewportsControlOptions.showMenuBar ? "" : " uk-hidden"), this._groupBouton.id = "nav-menu3D-" + this.namespace, document.body.appendChild(this._groupBouton), this._listeGroupBoutons = []);
                    var a = document.createElement("li");
                    a.className = "uk-separator";
                    $("#nav-menu3D-" + this.namespace).append(a)
                };
            b.prototype.addButtonGroupIcone =
                function (a, b, d, e, f) {
                    void 0 == this._groupBouton && (this._groupBouton = document.createElement("ul"), this._groupBouton.className = "nav-menu3D uk-list nav-menu3D-" + this._viewportsControlOptions.menuBarPosition + (this._viewportsControlOptions.showMenuBar ? "" : " uk-hidden"), this._groupBouton.id = "nav-menu3D-" + this.namespace, document.body.appendChild(this._groupBouton), this._listeGroupBoutons = []);
                    this._listeGroupBoutons.push(a);
                    var c = document.createElement("li");
                    c.id = a;
                    null != b && (c.className = b);
                    c.innerHTML = "<i class='" +
                        d + "'></i>";
                    $("#nav-menu3D-" + this.namespace).append(c);
                    null != e && $("#" + a).attr("title", e);
                    null != f && f()
                };
            b.prototype.addButtonGroup = function (a, b, d, e, f, h, k, m) {
                void 0 == this._groupBouton && (this._groupBouton = document.createElement("ul"), this._groupBouton.className = "nav-menu3D uk-list nav-menu3D-" + this._viewportsControlOptions.menuBarPosition + (this._viewportsControlOptions.showMenuBar ? "" : " uk-hidden"), this._groupBouton.id = "nav-menu3D-" + this.namespace, this._canvasContainer.appendChild(this._groupBouton), this._listeGroupBoutons = []);
                if (-1 == this._listeGroupBoutons.indexOf(a)) {
                    var c = document.createElement("li");
                    c.className = b;
                    c.innerHTML = "<i class='" + d + "'></i>";
                    c.id = a;
                    this._listeGroupBoutons.push(a);
                    if (null == m) $("#nav-menu3D-" + this.namespace).append(c);
                    else {
                        d = "SubMenu-" + m;
                        if (-1 == this._listeGroupBoutons.indexOf(d)) {
                            this._listeGroupBoutons.push(d);
                            var g = document.createElement("div");
                            g.id = "Popover-" + d;
                            var l = document.createElement("ul");
                            l.className = "uk-list Teia-SubMenu";
                            l.id = d;
                            0 < ("#" + m).length ? ($("#" + m).append(g), $("#Popover-" +
                                d).append(l)) : console.log("Element not found " + m + " i");
                            l = $("#" + m).attr("title");
                            $("#Popover-" + d).jqxPopover({
                                offset: {
                                    left: 0,
                                    top: 0
                                },
                                arrowOffsetValue: 0,
                                autoClose: !1,
                                animationOpenDelay: 0,
                                animationCloseDelay: 0,
                                animationType: "none",
                                position: "bottom" == this._viewportsControlOptions.menuBarPosition ? "top" : "top" == this._viewportsControlOptions.menuBarPosition ? "bottom" : "left" == this._viewportsControlOptions.menuBarPosition ? "right" : "left",
                                title: null != l ? l : "",
                                showCloseButton: !0,
                                selector: $("#" + m)
                            });
                            $("#Popover-" +
                                d).addClass("Popover-SubMenu")
                        } else l == document.getElementById(d);
                        $("#" + d).append(c)
                    }
                } else c = document.getElementById(a), c.className = b, c.innerHTML = "<i class='" + d + "'></i>";
                null != k && ($("#" + a).attr("data-uk-tooltip", ""), $("#" + a).attr("title", k));
                null != f && ($("#" + c.id + "." + b).unbind("click"), $("#" + c.id + "." + b).click(e, f));
                null != h && h()
            };
            b.prototype._makeTextView = function (a, b) {
                var c = new BABYLON.DynamicTexture("DynamicTextureForChar", 64, this._scene, !0);
                c.drawText(a, null, 36, "bold 15px Arial", "white", "grey", !0);
                c.wAng = b;
                return c
            };
            b.prototype.endAnimation = function (a, b, d) {
                void 0 === d && (d = !0);
                if ((a = this._getMeshesByObjectID(a)) && 0 !== a.length) {
                    b = null != b ? b.split(",") : [];
                    for (var c in a) {
                        var g = a[c];
                        if (0 < b.length)
                            for (var e = 0; e < b.length; e++) {
                                var l = this.scene.getAnimatableByTarget(g);
                                null != l && (l.goToFrame(0), this._scene.stopAnimation(g, b[e]))
                            } else this._scene.stopAnimation(g);
                        if (0 !== g.animations.length) {
                            for (var f in g.animations) {
                                l = g.animations[f];
                                var h = l.targetPropertyPath;
                                e = g;
                                for (var k in h) e = e[h[k]];
                                l = l.getKeys();
                                l = l[l.length - 1];
                                e.copyFrom && e.copyFrom(l.value)
                            }
                            d && (g.animations.length = 0)
                        }
                    }
                }
            };
            b.prototype.showMapScene = function () {
                var a = new BABYLON.ArcRotateCamera("cameraMap", Math.PI / 2, 0, 110, BABYLON.Vector3.Zero(), this._scene);
                this._scene.activeCameras.push(a);
                a.viewport = new BABYLON.Viewport(0, .65, .3, .3);
                var b = new BABYLON.Layer("top", "", this._scene, !0);
                b.alphaTest = !0;
                b.onBeforeRender = function () {
                    this._engine.setColorWrite(!1);
                    this._scene.activeCamera == a && this._engine.setDepthBuffer(!0)
                };
                b.onAfterRender = function () {
                    this._engine.setColorWrite(!0)
                }
            };
            b.prototype.blinkObjectByTag = function (a, b, d, e, f, h, k) {
                void 0 === d && (d = 30);
                void 0 === f && (f = !0);
                void 0 === h && (h = "");
                void 0 === k && (k = !0);
                a = this.getMeshesByTag(a).meshes;
                this.freeze(!1);
                if (0 < a.length)
                    for (var c = 0; c < a.length; c++) this.blinkObject(a[c].objectId, b, d, e, f, h + a[c].objectId, k);
                this.unfreeze()
            };
            b.prototype.blinkObject = function (a, b, d, e, f, h, k) {
                void 0 === d && (d = 30);
                void 0 === f && (f = !0);
                void 0 === h && (h = "");
                void 0 === k && (k = !0);
                e = this._getMeshesByObjectID(a);
                if (!k) b = this._listeBlinkAnimation["BlinkAnimation" + h +
                    a], void 0 != b && (b.stop(), this.endAnimation(a, "BlinkAnimationDiffuse" + h + a + ",BlinkAnimationEmissive" + h + a + ",BlinkAnimationOpacity" + h + a));
                else if (e && 0 !== e.length) {
                    0 === d && (d = 1);
                    for (var c in e)
                        if (k = e[c], k.material.diffuseColor && k.material.emissiveColor && k.material.ambientColor && k.material.alpha) {
                            if (k.material instanceof BABYLON.MultiMaterial) break;
                            var g = new BABYLON.Animation("BlinkAnimationDiffuse" + h + a, "material.diffuseColor", d, BABYLON.Animation.ANIMATIONTYPE_COLOR3, f ? BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE :
                                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
                                l = new BABYLON.Animation("BlinkAnimationEmissive" + h + a, "material.emissiveColor", d, BABYLON.Animation.ANIMATIONTYPE_COLOR3, f ? BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE : BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
                                n = new BABYLON.Animation("BlinkAnimationOpacity" + h + a, "material.alpha", d, BABYLON.Animation.ANIMATIONTYPE_FLOAT, f ? BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE : BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
                                p = new BABYLON.CubicEase;
                            p.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
                            g.setEasingFunction(p);
                            l.setEasingFunction(p);
                            n.setEasingFunction(p);
                            p = this._originalColors[k.objectId];
                            null != this._colorForObjectAction && null != this._colorForObjectAction[a] && (p = this._colorForObjectAction[a][this._colorForObjectAction[a].length - 1].color);
                            var m = [],
                                r = [];
                            m.push({
                                frame: 0,
                                value: p
                            });
                            m.push({
                                frame: d,
                                value: b
                            });
                            m.push({
                                frame: 2 * d,
                                value: p
                            });
                            r.push({
                                frame: 0,
                                value: .09
                            });
                            r.push({
                                frame: d,
                                value: .6
                            });
                            r.push({
                                frame: 2 * d,
                                value: .09
                            });
                            g.setKeys(m);
                            l.setKeys(m);
                            n.setKeys(r);
                            null == k.getAnimationByName("BlinkAnimationDiffuse" +
                                h + a) && k.animations.push(g);
                            null == k.getAnimationByName("BlinkAnimationEmissive" + h + a) && k.animations.push(l);
                            null == k.getAnimationByName("BlinkAnimationOpacity" + h + a) && k.animations.push(n);
                            k = this._scene.beginAnimation(k, 0, 2 * d, f, 1);
                            this._listeBlinkAnimation["BlinkAnimation" + h + a] = k
                        }
                }
            };
            b.prototype.getObjectRelativePosition = function (a) {
                return (a = this._getMeshesByObjectID(a)) && 0 !== a.length ? a[0].position.clone() : null
            };
            b.prototype.getObjectAbsolutePosition = function (a) {
                return (a = this._getMeshesByObjectID(a)) && 0 !==
                    a.length ? a[0].getAbsolutePosition().clone() : null
            };
            b.prototype.getObjectScaling = function (a) {
                return (a = this._getMeshesByObjectID(a)) && 0 !== a.length ? a[0].scaling.clone() : null
            };
            b.prototype.setObjectScaling = function (a, b, d, e, f) {
                void 0 === d && (d = 1E3);
                void 0 === e && (e = 30);
                var c = this._getMeshesByObjectID(a);
                if (!c || 0 === c.length) return null;
                d = d / 1E3 * e;
                0 === d && (d = 1);
                var g = new BABYLON.Animation("MoveAnimation", "scaling", e, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                a = [];
                a.push({
                    frame: 0,
                    value: c[0].scaling
                });
                a.push({
                    frame: d,
                    value: b
                });
                g.setKeys(a);
                c[0].animations.push(g);
                this._scene.beginDirectAnimation(c[0], [g], 0, d, !1, void 0, function () {
                    c[0].animations = c[0].animations.filter(function (a, c, b) {
                        return a.name != g.name
                    });
                    f && f(c[0])
                })
            };
            b.prototype.getObjectParentId = function (a) {
                return (a = this._getMeshesByObjectID(a)) && 0 !== a.length ? a[0].parent ? a[0].parent.objectId : -1 : null
            };
            b.prototype.getObjectChildrenId = function (a) {
                return this._scene.meshes.filter(function (c, b, d) {
                    return c.parent && c.parent.objectId ==
                        a
                }).map(function (a, c, b) {
                    return a.objectId
                })
            };
            b.prototype.getObjectDescendantsId = function (a) {
                a = this._getMeshesByObjectID(a);
                var c = [],
                    b;
                for (b in a) c = c.concat(a[b].getDescendants().map(function (a, c, b) {
                    return a.objectId
                }));
                return c
            };
            b.prototype.getDescendantObjectsIds = function (a, b) {
                var c = [];
                if (!this._teiaHierarchy[a]) return null;
                this._getDescendantsObjectsIds(c, this._teiaHierarchy[a], b);
                return c
            };
            b.prototype._getDescendantsObjectsIds = function (a, b, d) {
                if (b.children && 0 != b.children.length)
                    for (var c = 0; c < b.children.length; c++) {
                        var g =
                            b.children[c];
                        d && !d(g) || a.push(g.objectId);
                        this._getDescendantsObjectsIds(a, g, d)
                    }
            };
            b.prototype.deleteObject = function (a, b) {
                a = this._getMeshesByObjectID(a);
                if (!a || 0 === a.length) return null;
                for (var c in a) a[c].dispose(b)
            };
            b.prototype.deleteObjects = function (a, b) {
                if ((a = this._getMeshesByObjectsIds(a)) && 0 !== a.length)
                    for (var c = 0; c < a.length; c++) a[c].dispose(b)
            };
            b.prototype.serializeScene = function (a) {
                void 0 === a && (a = !1);
                for (var c = 0, b = this.scene.meshes.filter(function (a) {
                        return !a.isVisible || !a.isEnabled
                    }); c < b.length; c++) {
                    var d =
                        b[c];
                    d.getChildMeshes();
                    d.dispose(!0)
                }
                if (!a)
                    for (a = 0, c = this.scene.meshes; a < c.length; a++) b = c[a], !b.material || b.material.diffuseTexture || b.material.emissiveTexture || b.material.opacityTexture || 1 != b.material.alpha || b.material.dispose(!0);
                this.scene.lights.length = 0;
                this.scene.cameras.length = 0;
                this.scene.activeCamera = null;
                return BABYLON.SceneSerializer.Serialize(this.scene)
            };
            b.prototype.moveObjectToObject = function (a, b, d, e, f) {
                var c = this._getMeshesByObjectID(b);
                if (0 !== c.length && (a = this._getMeshesByObjectID(a)) &&
                    0 !== a.length && (b = a[0], c = c[0].getAbsolutePosition())) {
                    var g = c;
                    b.parent && (g = b.parent.getWorldMatrix().clone().invert(), c = new BABYLON.Vector3(c.x, c.y, c.z), g = BABYLON.Vector3.TransformCoordinates(c, g));
                    g.y += (b.getBoundingInfo().boundingBox.maximumWorld.y - b.getBoundingInfo().boundingBox.minimumWorld.y) / 2;
                    this._move(a, g, d, e, f)
                }
            };
            b.prototype.moveObject = function (a, b, d, e, f) {
                a = this._getMeshesByObjectID(a);
                0 !== a.length && this._move(a, b, d, e, f)
            };
            b.prototype._move = function (a, b, d, e, f) {
                void 0 === d && (d = 1E3);
                void 0 ===
                    e && (e = 30);
                d = d / 1E3 * e;
                0 === d && (d = 1);
                for (var c in a) {
                    var g = a[c],
                        l = new BABYLON.Animation("MoveAnimation", "position", e, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
                        h = [];
                    h.push({
                        frame: 0,
                        value: g.position
                    });
                    h.push({
                        frame: d,
                        value: b
                    });
                    l.setKeys(h);
                    g.animations.push(l);
                    this._scene.beginDirectAnimation(g, [l], 0, d, !1, void 0, function () {
                        g.animations = g.animations.filter(function (a, c, b) {
                            return a.name != l.name
                        });
                        f && f(g)
                    })
                }
            };
            b.prototype._getMeshesByObjectID = function (a) {
                return a ?
                    this._arrayMeshByObjectId[a] || [] : []
            };
            b.prototype._getMeshesByObjectsIds = function (a) {
                return a && 0 != a.length ? this._scene.meshes.filter(function (c, b, d) {
                    return -1 !== a.indexOf(c.objectId)
                }) : []
            };
            b.prototype.tryGetObject = function (a, b) {
                void 0 === b && (b = !1);
                if (a) {
                    var c = jQuery.Deferred(),
                        d = this._getMeshesByObjectID(a);
                    if ((!d || 0 == d.length) && b) return this._objectsIdsPendingFromTeiaServer.push({
                            meshesCount: 0,
                            objectId: a,
                            promise: c
                        }), 0 < this._objectsIdsToAddDataStack.filter(function (c) {
                            return c.ObjectId == a
                        }).length ||
                        this._smartScene.addObjectsFromTeiaServer({
                            ObjectId: a
                        }), c.promise();
                    setTimeout(function () {
                        c.resolve(d)
                    }, 100);
                    return c.promise()
                }
                console.error("Trying to get object, but no objectId provided...")
            };
            b.prototype.loadingScreen = function (a) {
                void 0 === a && (a = !0);
                a && (this._manualLoadingScreen = !0);
                this._loadingScreen || (this._loadingScreen = document.createElement("ul"), this._loadingScreen.className = "uk-list", this._loadingScreen.id = "loading", this._loadingScreen.style.position = "absolute", this._loadingScreen.style.width =
                    "100%", this._loadingScreen.style.top = "40%", this._loadingScreen.style.height = "300px", this._loadingScreenText = document.createElement("li"), this._loadingScreenText.id = "TextLoading-" + this.namespace, this._loadingScreenText.className = " uk-align-center", this._loadingScreenText.style.textAlign = "center", this._loadingScreenText.textContent = "Loading...", this._loadingCircle = document.createElement("li"), this._canvasContainer.appendChild(this._loadingScreen), this._loadingScreen.appendChild(this._loadingCircle),
                    this._loadingScreen.appendChild(this._loadingScreenText), this._progressState = 0, this._loadingCircle.innerHTML = '<div class="flexy-column"><div class="progress-factor flexy-item" ><div class="progress-bar" ><div class="bar has-rotation has-colors custom ruler" role= "progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id= "progress_Load" ><div class="tooltip white" > </div><div class="bar-face face-position roof percentage" > </div><div class="bar-face face-position back percentage" > </div> <div class="bar-face face-position floor percentage volume-lights" > </div> <div class="bar-face face-position left" > </div> <div class="bar-face face-position right" > </div> <div class="bar-face face-position front percentage volume-lights shine" > </div></div></div></div></div>')
            };
            b.prototype.setLoadingText = function (a, b, d) {
                void 0 === b && (b = "");
                void 0 == this._loadingScreen && this.loadingScreen(!1);
                this._loadingScreenText.innerHTML = "<br/><div class='uk-comment-meta'>" + b + a + "</div>"
            };
            b.prototype.setLoadingPercentage = function (a, b, d) {
                void 0 === b && (b = !1);
                void 0 === d && (d = !0);
                if (d || !this._manualLoadingScreen) this._loadingScreen && this._progressBar || this.loadingScreen(d), a += "%", this._progressBar.style.width = a, this._progressBar.innerHTML = b ? a : ""
            };
            b.prototype.addLoadingPercentage = function (a, b,
                d) {
                void 0 === d && (d = !0);
                if (d || !this._manualLoadingScreen) this._loadingScreen && this._progressBar || this.loadingScreen(d), this._progressState += a
            };
            b.prototype.getLoadingPercentage = function () {
                return this._progressState
            };
            b.prototype.unloadingScreen = function (a) {
                void 0 === a && (a = !0);
                if (a || !this._manualLoadingScreen) a && (this._manualLoadingScreen = !1), this._loadingScreen && (this._loadingScreen.parentNode.removeChild(this._loadingScreen), delete this._loadingScreen)
            };
            b.prototype._bindingViewport = function (c) {
                a.Utilities.Event.on(c,
                    a.API.Viewport3D.ACTIVE_CAMERA_CHANGED, $.proxy(this._onActiveCameraChanged, this))
            };
            b.prototype._unbindingViewport = function (c) {
                a.Utilities.Event.off(c, a.API.Viewport3D.ACTIVE_CAMERA_CHANGED)
            };
            b.prototype._onParsingStarted = function (c, b) {
                this._parsingRetainCount++;
                1 < this._parsingRetainCount || (this._onObjectAddingProxy || (this._onObjectAddingProxy = $.proxy(this._onObjectAdding, this)), this._onObjectAddedProxy || (this._onObjectAddedProxy = $.proxy(this._onObjectAdded, this)), this._onParsingEndedProxy || (this._onParsingEndedProxy =
                    $.proxy(this._onParsingEnded, this)), a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.ADDING_OBJECT_EVENT, this._onObjectAddingProxy), a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.ADDED_OBJECT_EVENT, this._onObjectAddedProxy), a.Utilities.Event.on(this._smartScene, a.Modules_.SmartScene.PARSING_ENDED_EVENT, this._onParsingEndedProxy), this._numberOfObjectsToImport = b)
            };
            b.prototype._onParsingEnded = function (c) {
                var b = this;
                try {
                    var d = this;
                    this._parsingRetainCount--;
                    if (!(0 < this._parsingRetainCount)) {
                        a.Utilities.Event.off(this._smartScene,
                            a.Modules_.SmartScene.ADDING_OBJECT_EVENT, this._onObjectAddingProxy);
                        a.Utilities.Event.off(this._smartScene, a.Modules_.SmartScene.ADDED_OBJECT_EVENT, this._onObjectAddedProxy);
                        a.Utilities.Event.off(this._smartScene, a.Modules_.SmartScene.PARSING_ENDED_EVENT, this._onParsingEndedProxy);
                        for (var e in this._meshesToImport)
                            if (this._firstParsingEndedDone) this._importMeshToScene({
                                fileURL: e,
                                meshesName: this._meshesToImport[e]
                            });
                            else {
                                var f = e.match(/[\w 1-9 . -- _]+[A-z\u00c0-\u00fa]*.babylon{1}(.incremental)?$/i)[0],
                                    h = e.replace(/[\w 1-9 . -- _]+[A-z\u00c0-\u00fa]*.babylon{1}(.incremental)?$/i, "");
                                h = h.replace("?", "?CacheServeur=" + this._viewportsControlOptions.cacheServeur + "&CacheNavigateur=" + this._viewportsControlOptions.cacheNavigateur + "&");
                                BABYLON.SceneLoader.Append(a.Urls.baseUrl + h, f, this.scene, function (a) {
                                    try {
                                        $("#progress_Load").attr("aria-valuenow", "95"), b.setLoadingText("Rendering..."), b._viewportsControlOptions.octreeMode && 5E3 < b._scene.meshes.length && (b._octree = a.createOrUpdateSelectionOctree()), 0 === a.lights.length &&
                                            b.createAndLoadSun(), b._meshesNotUpdated = a.meshes.slice(), b._meshesNotUpdatedClone = b._meshesNotUpdated.slice(), b._firstParsingEndedDone = !0, b._smartScene._firstParsingEndedDone = !0, null != b._viewportsControlOptions.backgroundColor ? "#undefined" == b._viewportsControlOptions.backgroundColor && (b._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)) : b._scene.clearColor = b._smartScene.sceneClearColor
                                    } catch (t) {
                                        jQuery("#teia-loader-evo").changeLiviconEvo("strokeColor", "#FF0000")
                                    }
                                }, function (a) {
                                    var c = a.currentTarget.getResponseHeader("X-Content-Length");
                                    500 == a.target.status ? (jQuery("#teia-loader-evo").changeLiviconEvo("strokeColor", "#FF0000"), d.setLoadingText("Erreur " + a.target.status + ": [ " + a.target.statusText + " ]", "<i class='material-icons'>warning</i>", "#FF0000")) : 200 == a.target.status ? (a.lengthComputable ? $("#progress_Load").attr("aria-valuenow", (90 * a.loaded / a.total).toFixed().toString()) : $("#progress_Load").attr("aria-valuenow", (90 * a.loaded / c).toFixed().toString()), d.setLoadingText("Download File 3d, please wait...")) : (jQuery("#teia-loader-evo").changeLiviconEvo("strokeColor",
                                        "#FF0000"), d.setLoadingText("Erreur " + a.target.status + ": [ " + a.target.statusText + " ]"))
                                })
                            } this._meshesToImport = []
                    }
                } catch (r) {
                    jQuery("#teia-loader-evo").changeLiviconEvo("strokeColor", "#FF0000")
                }
            };
            b.prototype._onObjectAdding = function (a, b) {};
            b.prototype._onObjectActionAdded = function (c, b, d) {
                var g = this;
                c = this._getMeshesByObjectID(d.objectId);
                var e = !1;
                if (c && 0 !== c.length) c[0].action = !0;
                else {
                    var f = this._objectIdToMeshesNames[d.objectId];
                    for (h in f)
                        if (this._meshesInformations[f[h]]) {
                            e = !0;
                            this._ActionStack.push(d.objectId);
                            this._pendingActionStack.push({
                                uniqueId: b,
                                objectAction: d
                            });
                            return
                        }
                }
                if (!c || 0 == c.length && !e) {
                    this._pendingActionStack.push({
                        uniqueId: b,
                        objectAction: d
                    });
                    this._objectsIdsToAddDataStack.push({
                        ObjectId: d.objectId
                    });
                    clearTimeout(this._addObjectsFromTeiaServerTimeout);
                    if (100 <= this._objectsIdsToAddDataStack.length) {
                        this._smartScene.addObjectsFromTeiaServer(this._objectsIdsToAddDataStack);
                        this._objectsIdsToAddDataStack.length = 0;
                        return
                    }
                    this._addObjectsFromTeiaServerTimeout = setTimeout(function () {
                        g._smartScene.addObjectsFromTeiaServer(g._objectsIdsToAddDataStack);
                        g._objectsIdsToAddDataStack.length = 0
                    }, 1E3)
                }
                if (d instanceof a.ObjectActions.ChangeColor.Action) {
                    var l = d.colorToApply();
                    l && (this._onEnabledColorActionForObject(d.actionId, d.objectId), this._onUpdatedColorActionForObject(d.actionId, d.objectId, l))
                } else if (d instanceof a.ObjectActions.Display.Action)
                    for (l in d.attributes.values) {
                        c = d.attributes.getUniqueObject(l);
                        b = d.labels.getUniqueObject(l).value;
                        var h = c.stringValue;
                        c = c.index;
                        e = d.titleLightBox ? d.titleLightBox : "Info";
                        d.modeLightBox && (h = '<a href="#modal-display' +
                            l + d.objectId + '"  data-uk-modal="{center:true}">' + e + '</a><div id ="modal-display' + l + d.objectId + '" class="uk-modal"><div class="uk-modal-dialog"><div class="uk-modal-header">' + b + "</div>" + h + "</div></div>");
                        this._activeViewport._infoBoxManager.addData(d.objectId, b, {
                            value: h,
                            key: b
                        }, "content", !0, d.actionclass_sfx, c.toString())
                    } else if (d instanceof a.ObjectActions.Alert.Action) eval(d._conditionToEval()) ? this.blinkObject(d.objectId, new BABYLON.Color3(1, 0, 0), 100, null, !0, d.actionId, !0) : this.blinkObject(d.objectId,
                        new BABYLON.Color3(1, 0, 0), 100, null, !1, d.actionId, !1);
                    else if (d instanceof a.ObjectActions.ChangeRotation.Action) {
                    if (l = d.rotationToApply()) {
                        b = {
                            rx: 0,
                            ry: 0,
                            rz: 0
                        };
                        for (h = 0; h < l.length; h++) b.rx += l[h].rx, b.ry += l[h].ry, b.rz += l[h].rz;
                        this._onEnabledRotationActionForObject(d.actionId, d.objectId);
                        this._onUpdatedRotationActionForObject(d.actionId, d.objectId, b)
                    }
                } else if (d instanceof a.ObjectActions.ChangePosition.Action && (l = d.positionToApply())) {
                    b = {
                        tx: 0,
                        ty: 0,
                        tz: 0
                    };
                    for (h = 0; h < l.length; h++) b.tx += l[h].tx, b.ty += l[h].ty,
                        b.tz += l[h].tz;
                    this._onEnabledPositionActionForObject(d.actionId, d.objectId);
                    this._onUpdatedPositionActionForObject(d.actionId, d.objectId, b)
                }
            };
            b.prototype._onObjectActionUpdated = function (c, b, d) {
                if (d instanceof a.ObjectActions.ChangeColor.Action) {
                    var g = d.colorToApply();
                    g ? (this._onEnabledColorActionForObject(d.actionId, d.objectId), this._onUpdatedColorActionForObject(d.actionId, d.objectId, g)) : this._onChangeColorActionFalse(d.actionId, d.objectId)
                } else if (d instanceof a.ObjectActions.Display.Action)
                    for (g in d.attributes.values) c =
                        d.attributes.getUniqueObject(g), b = d.labels.getUniqueObject(g).value, this._activeViewport._infoBoxManager.addData(d.objectId, b, {
                            value: c.stringValue,
                            key: b
                        });
                else if (d instanceof a.ObjectActions.Alert.Action) eval(d._conditionToEval()) ? this.blinkObject(d.objectId, new BABYLON.Color3(1, 0, 0), 100, null, !0, d.actionId, !0) : this.blinkObject(d.objectId, new BABYLON.Color3(1, 0, 0), 100, null, !1, d.actionId, !1);
                else if (d instanceof a.ObjectActions.ChangeRotation.Action) {
                    if (g = d.rotationToApply()) {
                        c = {
                            rx: 0,
                            ry: 0,
                            rz: 0
                        };
                        for (b =
                            0; b < g.length; b++) c.rx += g[b].rx, c.ry += g[b].ry, c.rz += g[b].rz;
                        this._onEnabledRotationActionForObject(d.actionId, d.objectId);
                        this._onUpdatedRotationActionForObject(d.actionId, d.objectId, c)
                    }
                } else if (d instanceof a.ObjectActions.ChangePosition.Action && (g = d.positionToApply())) {
                    c = {
                        tx: 0,
                        ty: 0,
                        tz: 0
                    };
                    for (b = 0; b < g.length; b++) c.tx += g[b].tx, c.ty += g[b].ty, c.tz += g[b].tz;
                    this._onEnabledPositionActionForObject(d.actionId, d.objectId);
                    this._onUpdatedPositionActionForObject(d.actionId, d.objectId, c)
                }
            };
            b.prototype._onObjectActionRemoved =
                function (c, b, d) {
                    (c = this._getMeshesByObjectID(d.objectId)) && 0 !== c.length || (c[0].action = !1);
                    d instanceof a.ObjectActions.ChangeColor.Action ? this._onChangeColorActionFalse(d.actionId, d.objectId) : d instanceof a.ObjectActions.Display.Action || (d instanceof a.ObjectActions.Alert.Action ? this.blinkObject(d.objectId, new BABYLON.Color3(1, 0, 0), 100, null, !1, d.actionId, !1) : d instanceof a.ObjectActions.ChangeRotation.Action ? this._onChangeRotationActionFalse(d.actionId, d.objectId) : d instanceof a.ObjectActions.ChangePosition.Action &&
                        this._onChangePositionActionFalse(d.actionId, d.objectId));
                    this._getMeshesByObjectID(d.objectId); - 1 != this._ActionStack.indexOf(d.objectId) && this._ActionStack.splice(this._ActionStack.indexOf(d.objectId), 1)
                };
            b.prototype.addNotification = function () {
                for (var a = 0; a < arguments.length; a++);
            };
            b.prototype._importMeshToScene = function (c) {
                var b = this,
                    d = c.fileURL;
                c = c.meshesName;
                if (d) {
                    var e = d.split("/")[d.split("/").length - 1];
                    d = a.Urls.baseUrl + d.replace(e, "");
                    c = a.Utilities.Helpers.makeArray(c);
                    BABYLON.SceneLoader.ImportMesh(c,
                        d, e, this._scene,
                        function (a, c) {
                            b._meshesNotUpdated = b._meshesNotUpdated.concat(a);
                            b._meshesNotUpdatedClone = b._meshesNotUpdated.slice()
                        })
                }
            };
            b.prototype._checkIfPendingMeshUpdated = function (a) {
                var c = 0,
                    b = this._objectsIdsPendingFromTeiaServer.filter(function (b, d, g) {
                        c = d;
                        return b.objectId == a.objectId
                    });
                b && 0 < b.length && (b[0].meshesCount--, 0 < b[0].meshesCount || (b[0].promise.resolve(this._getMeshesByObjectID(a.objectId)), delete this._objectsIdsPendingFromTeiaServer[c]))
            };
            b.prototype.AddTagsToByTag = function (a, b) {
                a =
                    this.getMeshesByTag(a).meshes;
                for (var c = 0; c < a.length; c++) BABYLON.Tags.AddTagsTo(a[c], b)
            };
            b.prototype.updateMeshInfos = function (a) {
                var c = this;
                if (null != a) {
                    var b = this._meshesInformations[a.id];
                    if (b) {
                        var d = b.objectColor;
                        a.objectId = b.objectId;
                        a.parentId = b.parentId;
                        a._isObjectTeia = !0;
                        a.action = !1;
                        a.colorComponent = d;
                        this._originalColors[a.objectId] = d;
                        a.name = b.name;
                        a.isPickable = b.clickable;
                        a.isVisible = b.visible && a.isVisible;
                        a.shouldBeVisible = a.isVisible;
                        a.useVertexColors = !1;
                        a.checkCollisions = !1;
                        a.isBlocked = !0;
                        a.overlayColor = new BABYLON.Color3(1, .9, 0);
                        a.overlayAlpha = .3;
                        a.edgesColor = new BABYLON.Color4(0, .5, 1, 1);
                        a.edgesWidth = 1;
                        a.setCheckParentEnabled(!1);
                        a.freezeWorldMatrix();
                        if (this._initScene) {
                            this._arrayMeshByObjectId[b.objectId] || (this._arrayMeshByObjectId[b.objectId] = []);
                            this._arrayMeshByObjectId[b.objectId].push(a);
                            BABYLON.Tags.EnableFor(a);
                            var e = a.name;
                            null != b.tag && (e += "_" + b.tag);
                            e = e.split("-").join(" ");
                            e = e.split(":").join(" ");
                            e = e.split("_").join(" ");
                            BABYLON.Tags.AddTagsTo(a, e);
                            BABYLON.Tags.AddTagsTo(a,
                                a.id);
                            BABYLON.Tags.AddTagsTo(a, a.objectId.toString());
                            a.getChildMeshes().forEach(function (a) {
                                BABYLON.Tags.EnableFor(a);
                                BABYLON.Tags.AddTagsTo(a, e);
                                BABYLON.Tags.AddTagsTo(a, a.id)
                            })
                        }
                        this._viewportsControlOptions.flatShadedMesh && this._initScene && -1 == navigator.userAgent.toLowerCase().indexOf("chrome") && a.subMeshes && "Mesh" == a.constructor.name && a.convertToFlatShadedMesh();
                        0 < a.animations.length && this._initScene && void 0 == this._sceneAnimations[b.objectId] && (this._sceneAnimations[b.objectId] = a.animations, a.animations = []);
                        b = a.material;
                        d = d ? new BABYLON.Color3(d.r, d.g, d.b) : b && b.diffuseColor ? b.diffuseColor : new BABYLON.Color3(.8, .8, .8);
                        if (null == this._meshesMaterialBJ[a.id] && this._initScene)
                            if (null == a.getVerticesData("normal") || 0 == a.getVerticesData("normal").length) {
                                var f = a.material;
                                if (null != a.material)
                                    if (null != f.subMaterials)
                                        if (this._viewportsControlOptions.modeExploitation) {
                                            var h = new BABYLON.StandardCuttingMaterial(a.objectId + "Solid", this._scene);
                                            for (b = 0; 1 > b; b++) h.alpha = f.subMaterials[b].alpha;
                                            h.backFaceCulling = this._viewportsControlOptions.backFaceCulling;
                                            h.specularPower = 64;
                                            h.useSpecularOverAlpha = !1;
                                            h.useAlphaFromDiffuseTexture = !1;
                                            h.linkEmissiveWithDiffuse = !0;
                                            h.diffuseColor = new BABYLON.Color3(d.r, d.g, d.b);
                                            h.emissiveColor = new BABYLON.Color3(d.r, d.g, d.b);
                                            h.backFaceCulling = !1;
                                            h.disableLighting = !0;
                                            this._meshesMaterialBJ[a.id] = h.clone(a.objectId + "Solid" + a.id)
                                        } else this._meshesMaterialBJ[a.id] = a.material, null != a.material && a.material.freeze();
                                else this._viewportsControlOptions.modeExploitation ? (b = new BABYLON.StandardMaterial(a.objectId + "Solid" + a.id, this._scene),
                                    null != a.material && (b.alpha = a.material.alpha), b.backFaceCulling = this._viewportsControlOptions.backFaceCulling, b.specularPower = 64, b.useSpecularOverAlpha = !1, b.useAlphaFromDiffuseTexture = !1, b.linkEmissiveWithDiffuse = !0, b.diffuseColor = new BABYLON.Color3(d.r, d.g, d.b), b.emissiveColor = new BABYLON.Color3(d.r, d.g, d.b), b.unfreeze(), b.disableLighting = !0, this._meshesMaterialBJ[a.id] = b.clone(a.objectId + "Solid" + a.id)) : (this._meshesMaterialBJ[a.id] = a.material, null != a.material && (a.material.backFaceCulling = this._viewportsControlOptions.backFaceCulling,
                                    a.material.freeze()))
                            } else if (this._viewportsControlOptions.modeExploitation) {
                            f = a.material ? a.material.clone(a.name + a.material.name + a.id) : new BABYLON.StandardMaterial(a.name + "-textured-default" + a.id, this._scene);
                            if (a.material && null != a.material.subMaterials)
                                for (f.subMaterials = [], b = 0; b < a.material.subMaterials.length; b++) null != a.material.subMaterials[b] && (f.subMaterials[b] = a.material.subMaterials[b].clone(a.material.subMaterials[b].name + a.id));
                            this._meshesMaterialBJ[a.id] = f;
                            this._meshesMaterialBJ[a.id].backFaceCulling =
                                this._viewportsControlOptions.backFaceCulling
                        } else this._meshesMaterialBJ[a.id] = a.material, null != a.material && (a.material.backFaceCulling = this._viewportsControlOptions.backFaceCulling);
                        if (!this._meshesMaterialTeia[a.id] && this._initScene) {
                            b = new BABYLON.StandardMaterial(a.objectId + "Solid" + a.id, this._scene);
                            if (null == a.getVerticesData("normal") || 0 == a.getVerticesData("normal").length) b.disableLighting = !0, b.specularPower = 64, b.useSpecularOverAlpha = !1, b.useAlphaFromDiffuseTexture = !1, b.linkEmissiveWithDiffuse = !0;
                            b.disableLighting = !0;
                            b.alpha = this._viewportsControlOptions.xRayOpacity;
                            b.backFaceCulling = this._viewportsControlOptions.backFaceCulling;
                            b.linkEmissiveWithDiffuse = !0;
                            b.diffuseColor = new BABYLON.Color3(d.r, d.g, d.b);
                            b.emissiveColor = new BABYLON.Color3(1, 1, 1);
                            b.ambientColor = new BABYLON.Color3(d.r, d.g, d.b);
                            this._meshesMaterialTeia[a.id] = b
                        }
                        a.material = this._onRenduTeia(this._renduTeia, a.id);
                        this._initScene && (this._getMinMaxRecursive(a), a.refreshBoundingInfo(), a.actionManager = new BABYLON.ActionManager(this._scene),
                            new BABYLON.ActionEvent(null, 0, 0, a), this._isActivatOverlay || a.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (a) {})), this._viewportsControlOptions.octreeMode && null != this._octree && (this._octree.addMesh(a), a.useOctreeForPicking = !0), this._pendingActionStack = this._pendingActionStack.filter(function (b, d, g) {
                                return b.objectAction.objectId == a.objectId ? (a.action = !0, c._onObjectActionAdded(null, b.uniqueId, b.objectAction), !1) : !0
                            }))
                    } else a.dispose(), a = null
                }
            };
            b.prototype._makeOverOut = function (a) {
                this._highLightLayer.removeMesh(a)
            };
            b.prototype._onRenduTeia = function (a, b) {
                return a || null == this._meshesMaterialBJ[b] ? this._meshesMaterialTeia[b] : this._meshesMaterialBJ[b]
            };
            b.prototype._onObjectAdded = function (c, b, d, e, h, k, m, t, x, q, z, u, y, v, D) {
                q && this._noInfoboxObjects.push(b);
                u || this._invisibleObjectIds.push(b);
                null != h && (h = h.split(","));
                c = this._teiaHierarchy[b];
                c || (c = new f, c.objectId = Number(b), c.isVisible = u, c.shouldBeVisible = u, c.children = [], this._teiaHierarchy[b] =
                    c);
                m && "-1" != m && (q = this._teiaHierarchy[m], q || (q = new f, q.objectId = Number(m), q.isVisible = !0, q.shouldBeVisible = !0, q.children = [], this._teiaHierarchy[m] = q), q.children.push(c));
                this._objectIdToMeshesNames[b] = this._objectIdToMeshesNames[b] || [];
                this._objectIdToMeshesNames[b] = this._objectIdToMeshesNames[b].concat(a.Utilities.Helpers.makeArray(h));
                (c = this._objectsIdsPendingFromTeiaServer.filter(function (a) {
                    return a.objectId == b
                })) && 0 < c.length && c[0].meshesCount++;
                if (y) this._boxesToCreate.push({
                    name: t,
                    scaling: new BABYLON.Vector3(y.width,
                        y.height, y.depth),
                    color: k,
                    objectId: b,
                    parentId: m,
                    publish: x,
                    clickable: z,
                    visible: u
                });
                else if (v) this._spheresToCreate.push({
                    name: t,
                    scaling: v,
                    color: k,
                    objectId: b,
                    parentId: m,
                    publish: x,
                    clickable: z,
                    visible: u
                });
                else {
                    this._meshesToImport[e] || (this._meshesToImport[e] = []);
                    this._meshesToImport[e] = this._meshesToImport[e].concat(h);
                    y = 1 < h.length;
                    for (var g in h) v = h[g], c = null == this._meshesInformations[v], this._meshesInformations[v] = this._meshesInformations[v] || {
                        name: t,
                        objectId: b,
                        children: d,
                        fileURL: e,
                        objectColor: k,
                        publish: x,
                        clickable: z,
                        visible: u
                    }, !this._meshesInformations[v] || y || c ? this._meshesInformations[v] && y && !c && (this._meshesInformations[v].objectId = b, this._meshesInformations[v].objectColor = k, this._meshesInformations[v].publish = x) : (this._meshesInformations[v].tag = this._meshesInformations[v].name, this._meshesInformations[v].name = t), m && (this._meshesInformations[v].parentId = m)
                }
            };
            b.prototype._onObjectRemoved = function (a, b) {
                this._activeViewport._infoBoxManager.removeInfoBox(b);
                this._removeObject(b)
            };
            b.prototype._cameraIsMoving =
                function (a) {
                    this._IsStationary = !1
                };
            b.prototype._cameraIsStationary = function (a) {
                this._IsStationary = !0
            };
            b.prototype._cameraIsEndMoving = function (a) {
                this._updateSelectionUI()
            };
            b.prototype._onObjectsRemoved = function (a, b) {
                this._activeViewport._infoBoxManager.removeInfoBoxes(b);
                this._removeObjects(b)
            };
            b.prototype._removeObjects = function (a) {
                var c = [],
                    b;
                for (b in this._scene.meshes) {
                    var d = this._scene.meshes[b]; - 1 !== a.indexOf(d.objectId) && c.push(d)
                }
                for (b in c) a = c[b], this._disposeMeshAssociatedSprite(a), a.dispose()
            };
            b.prototype._removeObject = function (a) {
                a = this._getMeshesByObjectID(a);
                for (var c in a) this._removeMesh(a[c])
            };
            b.prototype._removeMesh = function (a) {
                this._disposeMeshAssociatedSprite(a);
                a.dispose()
            };
            b.prototype._setMeshAndDescendantsVisible = function (c, d) {
                if (d)
                    for (a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c, !0), c = this.getDescendantObjectsIds(c), d = 0; d < c.length; d++) {
                        var g = this._getMeshesByObjectID(c[d]);
                        if (0 < g.length)
                            for (var e = 0; e < g.length; e++) this._teiaHierarchy[g[e].objectId].shouldBeVisible =
                                this._teiaHierarchy[g[e].objectId].isVisible, g[e].isVisible = this._teiaHierarchy[g[e].objectId].shouldBeVisible, g[e].shouldBeVisible = !0, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, g[e].objectId, !0);
                        else this._teiaHierarchy[c[d]].shouldBeVisible = this._teiaHierarchy[c[d]].isVisible, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c[d], !0)
                    } else
                        for (a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c, !1), c = this.getDescendantObjectsIds(c), d = 0; d < c.length; d++)
                            if (g =
                                this._getMeshesByObjectID(c[d]), 0 < g.length)
                                for (e = 0; e < g.length; e++) g[e].shouldBeVisible = !1, this._teiaHierarchy[g[e].objectId].shouldBeVisible = !1, g[e].isVisible = !1, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, g[e].objectId, !1);
                            else this._teiaHierarchy[c[d]].shouldBeVisible = !1, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c[d], !1)
            };
            b.prototype._onObjectThreeDUpdated = function (a, b, d, e, f, h, k, m, x, q, z, u, y, v, D) {
                if ((a = this._getMeshesByObjectID(b)) && 0 != a.length) {
                    this._colorForObjectAction[b] &&
                        0 == this._colorForObjectAction[b].length ? this.changeObjectColor(b, h, !1) : this._originalColors[b] = new BABYLON.Color3(h.r, h.g, h.b);
                    for (var c in a) h = a[c], x ? (d = this._invisibleObjectIds.indexOf(b), u && -1 !== d ? this._invisibleObjectIds.splice(d) : u || -1 !== d || this._invisibleObjectIds.push(b), h.isVisible = u, h.isPickable = z, this._setMeshAndDescendantsVisible(h.objectId, u)) : h.setEnabled(x);
                    y ? this._updateUnitBox(a, y, k) : v && this._updateUnitSphere(a, v)
                }
            };
            b.prototype._onObjectPositionChanged = function (a, b, d, e) {
                if ((a = this._getMeshesByObjectID(b)) &&
                    0 != a.length)
                    for (var c in a) {
                        var g = a[c];
                        g.isVisible = !0;
                        var f = new BABYLON.Animation("movingSphereAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        b = [];
                        b.push({
                            frame: 0,
                            value: g.position
                        });
                        b.push({
                            frame: 30,
                            value: new BABYLON.Vector3(d, g.position.y, e)
                        });
                        f.setKeys(b);
                        g.animations.push(f);
                        this._moveMeshAssociatedSprite(g, d, e);
                        this._scene.beginDirectAnimation(g, [f], 0, 100, void 0, void 0, function () {
                            g.animations = g.animations.filter(function (a, c, b) {
                                return a.name !=
                                    f.name
                            })
                        })
                    } else this._smartScene.addObjectsFromTeiaServer({
                        ObjectId: b
                    }), this._pendingMovingStack.push({
                        objectId: b,
                        posX: d,
                        posZ: e
                    })
            };
            b.prototype._getMeshAssociatedSprite = function (a) {
                var c = a.associatedSprite;
                c || (c = new BABYLON.Sprite(a.objectId + "picker", this._pickerSpriteManager), a.associatedSprite = c, 0 == a.getBoundingInfo().boundingSphere.radiusWorld && this._scene.render(), c.size = a.getBoundingInfo().boundingSphere.radiusWorld, c.position.y = a.position.y);
                return c
            };
            b.prototype._disposeMeshAssociatedSprite =
                function (a) {
                    (a = a.associatedSprite) && a.dispose()
                };
            b.prototype._moveMeshAssociatedSprite = function (a, b, d) {
                var c = this._getMeshAssociatedSprite(a),
                    g = new BABYLON.Animation("movingSpriteAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                a = [];
                a.push({
                    frame: 0,
                    value: c.position
                });
                a.push({
                    frame: 30,
                    value: new BABYLON.Vector3(b, c.position.y, d)
                });
                g.setKeys(a);
                c.animations.push(g);
                this._scene.beginDirectAnimation(c, [g], 0, 100, void 0, void 0, function () {
                    c.animations =
                        c.animations.filter(function (a, c, b) {
                            return a.name != g.name
                        })
                })
            };
            b.prototype._updateUnitBox = function (a, b, d) {
                d = (d = this._getMeshesByObjectID(d)) && 0 < d.length ? d[0] : null;
                for (var c in a) {
                    var g = a[c];
                    d && (g.parent = d);
                    g.scaling.copyFromFloats(b.width, b.height, b.depth);
                    g.position.y = b.height / 2;
                    this._recomputeParentsBoundingBoxRecursive(g)
                }
            };
            b.prototype._updateUnitSphere = function (a, b) {
                for (var c in a) {
                    var d = a[c];
                    d.scaling.copyFromFloats(b, b, b);
                    d.position.y = b / 2;
                    this._recomputeParentsBoundingBoxRecursive(d);
                    this._scene.render();
                    var g = this._getMeshAssociatedSprite(d);
                    g.size = d.getBoundingInfo().boundingSphere.radiusWorld;
                    g.position.y = d.position.y
                }
            };
            b.prototype._recomputeParentsBoundingBoxRecursive = function (a) {
                a.refreshBoundingInfo();
                a.parent && this._recomputeParentsBoundingBoxRecursive(a.parent)
            };
            b.prototype._onObjectParentChanged = function (a, b, d) {
                if ((a = this._getMeshesByObjectID(d)) && 0 != a.length) {
                    b = this._getMeshesByObjectID(b);
                    for (var c in b) b[c].parent = a[0]
                }
            };
            b.prototype._onEnabledColorActionForObject = function (a, b) {
                this._colorForObjectAction[b] ||
                    (this._colorForObjectAction[b] = []); - 1 === this._getIndexOfColorObjectAction(a, b) && this._colorForObjectAction[b].unshift({
                    actionId: a,
                    color: null
                })
            };
            b.prototype._onChangeColorActionFalse = function (a, b) {
                this._colorForObjectAction[b] && (a = this._getIndexOfColorObjectAction(a, b), -1 != a && this._colorForObjectAction[b].splice(a, 1), 0 == this._colorForObjectAction[b].length ? this.restoreObjectOriginalColor(b) : (a = this._colorForObjectAction[b][this._colorForObjectAction[b].length - 1].actionId, this._onUpdatedColorActionForObject(a,
                    b, this._colorForObjectAction[b][this._colorForObjectAction[b].length - 1].color)))
            };
            b.prototype._onUpdatedColorActionForObject = function (a, b, d) {
                this._colorForObjectAction[b] && (a = this._getIndexOfColorObjectAction(a, b), -1 != a && (this._colorForObjectAction[b][a].color = d), 0 == a && this.changeObjectColor(b, d, !1, Math.min(10 >= this._viewportsControlOptions.xRayOpacity ? 6 * this._viewportsControlOptions.xRayOpacity : 25 > this._viewportsControlOptions.xRayOpacity ? 3 * this._viewportsControlOptions.xRayOpacity : 2 * this._viewportsControlOptions.xRayOpacity,
                    1)))
            };
            b.prototype._getIndexOfColorObjectAction = function (a, b) {
                for (var c in this._colorForObjectAction[b])
                    if (this._colorForObjectAction[b][c] && this._colorForObjectAction[b][c].actionId == a) return parseInt(c);
                return -1
            };
            b.prototype._onEnabledRotationActionForObject = function (a, b) {
                this._rotationForObjectAction[b] || (this._rotationForObjectAction[b] = []);
                this._getIndexOfRotationObjectAction(a, b)
            };
            b.prototype._onChangeRotationActionFalse = function (a, b) {
                this._rotationForObjectAction[b] && (a = this._getIndexOfRotationObjectAction(a,
                    b), -1 != a && this._rotationForObjectAction[b].splice(a, 1), 0 == this._rotationForObjectAction[b].length ? this.restoreObjectOriginalRotation(b) : (this.endAnimation(b), this.changeObjectRotation(b, 0)))
            };
            b.prototype._onUpdatedRotationActionForObject = function (a, b, d) {
                if (this._rotationForObjectAction[b]) {
                    if (-1 == this._getIndexOfRotationObjectAction(a, b)) this._rotationForObjectAction[b].unshift({
                        actionId: a,
                        rx: d.rx,
                        ry: d.ry,
                        rz: d.rz
                    });
                    else
                        for (var c in this._rotationForObjectAction[b])
                            if (this._rotationForObjectAction[b][c].actionId ==
                                a) {
                                this._rotationForObjectAction[b][c].rx = d.rx;
                                this._rotationForObjectAction[b][c].ry = d.ry;
                                this._rotationForObjectAction[b][c].rz = d.rz;
                                break
                            } this.changeObjectRotation(b, 1E3)
                }
            };
            b.prototype._getIndexOfRotationObjectAction = function (a, b) {
                for (var c in this._rotationForObjectAction[b])
                    if (this._rotationForObjectAction[b][c] && this._rotationForObjectAction[b][c].actionId == a) return parseInt(c);
                return -1
            };
            b.prototype._onEnabledPositionActionForObject = function (a, b) {
                this._positionForObjectAction[b] || (this._positionForObjectAction[b] = []);
                this._getIndexOfPositionObjectAction(a, b)
            };
            b.prototype._onChangePositionActionFalse = function (a, b) {
                this._positionForObjectAction[b] && (a = this._getIndexOfPositionObjectAction(a, b), -1 != a && this._positionForObjectAction[b].splice(a, 1), 0 == this._positionForObjectAction[b].length ? this.restoreObjectOriginalPosition(b) : (this.endAnimation(b), this.changeObjectPosition(b, 0)))
            };
            b.prototype._onUpdatedPositionActionForObject = function (a, b, d) {
                if (this._positionForObjectAction[b]) {
                    if (-1 == this._getIndexOfPositionObjectAction(a,
                            b)) this._positionForObjectAction[b].unshift({
                        actionId: a,
                        tx: d.tx,
                        ty: d.ty,
                        tz: d.tz
                    });
                    else
                        for (var c in this._positionForObjectAction[b])
                            if (this._positionForObjectAction[b][c].actionId == a) {
                                this._positionForObjectAction[b][c].tx = d.tx;
                                this._positionForObjectAction[b][c].ty = d.ty;
                                this._positionForObjectAction[b][c].tz = d.tz;
                                break
                            } this.changeObjectPosition(b, 1E3)
                }
            };
            b.prototype._getIndexOfPositionObjectAction = function (a, b) {
                for (var c in this._positionForObjectAction[b])
                    if (this._positionForObjectAction[b][c] &&
                        this._positionForObjectAction[b][c].actionId == a) return parseInt(c);
                return -1
            };
            b.prototype._getOffsets = function (a) {
                var c = new h;
                void 0 == a.offsetX && void 0 == a.clientX && -1 !== a.type.indexOf("pointer") && (a = a.originalEvent);
                c.X = void 0 == a.offsetX ? a.clientX - $(a.target).offset().left + window.pageXOffset : a.offsetX;
                c.Y = void 0 == a.offsetY ? a.clientY - $(a.target).offset().top + window.pageYOffset : a.offsetY;
                return c
            };
            b.prototype._onDbClick = function (a) {
                2 < this._pickedMeshSelObjects.length ? (this._smartScene._addObjectToSelection(this._pickedMeshSelObjects[this._pickedMeshSelObjects.length -
                    3], !0, "", !0), this._showInfoBox(this._pickedMeshSelObjects[this._pickedMeshSelObjects.length - 3])) : 0 < this._pickedMeshSelObjects.length && (this._smartScene._addObjectToSelection(this._pickedMeshSelObjects[0], !0, "", !0), this._showInfoBox(this._pickedMeshSelObjects[0]))
            };
            b.prototype._onMouseDown = function (c) {
                1 === c.which && (this._isModeEditor && "undefined" != typeof this._switchObjects && this._switchObjects._mousedown(c), this._offsets = this._getOffsets(c), this._onMouseUpCallback || (this._onMouseUpCallback = $.proxy(this._onMouseUp,
                    this)), a.Utilities.Event.on(this._canvas, this._eventPrefix + "up", this._onMouseUpCallback), c.shiftKey || this._eventTranslate || 2 == c.button) && (this._onMouseMoveCallback || (this._onMouseMoveCallback = $.proxy(this._onMouseMove, this), this._onMouseMoveEndedCallback = $.proxy(this._onMouseMoveEnded, this)), this._activeViewport.activeCamera.detachControl(this._canvas), a.Utilities.Event.on(this._canvas, this._eventPrefix + "move", this._onMouseMoveCallback), a.Utilities.Event.on(this._canvas, this._eventPrefix + "up", this._onMouseMoveEndedCallback))
            };
            b.prototype._onMouseMove = function (a) {
                this._isModeEditor && "undefined" != typeof this._switchObjects && this._switchObjects._mousemove(a);
                a = this._getOffsets(a);
                this._activeViewport.activeCamera.translate(new BABYLON.Vector3(this._offsets.X, this._offsets.Y, 0), new BABYLON.Vector3(a.X, a.Y, 0));
                this._offsets = a;
                this._updateSelectionUI(!0)
            };
            b.prototype._onMouseMoveEnded = function () {
                a.Utilities.Event.off(this._canvas, this._eventPrefix + "up", this._onMouseMoveEndedCallback);
                a.Utilities.Event.off(this._canvas, this._eventPrefix +
                    "move", this._onMouseMoveCallback);
                this._activeViewport.activeCamera.attachControl(this._canvas)
            };
            b.prototype.addEventOptimizeScene = function (a, b) {
                this._arrayEventOptimize[a] = b
            };
            b.prototype._optimizeScenebyIndex = function (a, b, d) {
                void 0 === a && (a = !1);
                void 0 === d && (d = 0);
                var c = this._scene.meshes[b];
                if (null == c || c.isVisible == !a) return !1;
                void 0 === a && (a = !1);
                var e;
                void 0 === d && (e = 1);
                .5 === d && (e = 1);
                1 === d && (e = 2);
                2 === d && (e = 3);
                3 === d && (e = 4);
                d = this._smartScene.selectedObjectsIds;
                a ? 95 < 100 * b / this._scene.meshes.length || (c.onOptimizedStatus =
                    c.isVisible) && 0 != b % e && (a = !c._isObjectTeia, c.shouldBeVisible = c.isVisible || a, c.isVisible = a || 0 == d.indexOf(c.objectId) && c.isVisible || c.action) : !c.isVisible && c._isObjectTeia && (c.isVisible = c.onOptimizedStatus && c.shouldBeVisible)
            };
            b.prototype._optimizeScene = function (a) {
                void 0 === a && (a = !1);
                if (!a) {
                    if (500 < this._scene.meshes.length && this._viewportsControlOptions.optimize && this._onOptimized) {
                        a = this._scene.meshes.length;
                        for (var c = 1; c < a; c++) {
                            var b = !this._scene.meshes[c]._isObjectTeia;
                            this._scene.meshes[c].isVisible =
                                b || 0 == this._getSelectedMeshes().indexOf(this._scene.meshes[c]) && this._scene.meshes[c].isVisible || this._scene.meshes[c].shouldBeVisible
                        }
                        this._onOptimized = !1
                    }
                } else if (500 < this._scene.meshes.filter(function (a, c) {
                        return 1 == a.isVisible
                    }).length && this._viewportsControlOptions.optimize && !this._onOptimized) {
                    a = this._scene.meshes.length;
                    for (c = 1; c < a; c++) 0 != c % 2 && this._scene.meshes[c].isVisible && (b = !this._scene.meshes[c]._isObjectTeia, this._scene.meshes[c].shouldBeVisible = this._scene.meshes[c].isVisible, this._scene.meshes[c].isVisible =
                        b || 0 == this._getSelectedMeshes().indexOf(this._scene.meshes[c]) && this._scene.meshes[c].isVisible || this._scene.meshes[c].action);
                    this._onOptimized = !0
                }
            };
            b.prototype.clearObjectsSelection = function () {
                this._smartScene._clearObjectsSelection()
            };
            b.prototype.addObjectToSelection = function (a) {
                this._smartScene._addObjectToSelection(a)
            };
            b.prototype._onMouseUp = function (c) {
                this._isModeEditor && "undefined" != typeof this._switchObjects && this._switchObjects._mouseup(c);
                var b = this._getOffsets(c);
                if (this._eventTranslate) {
                    b =
                        this.getPickedObject(b.X, b.Y);
                    var d;
                    b && (d = b.objectId || null);
                    this._smartScene._addObjectToSelection(d, !0);
                    a.Utilities.Event.off(this._canvas, this._eventPrefix + "up", this._onMouseUpCallback)
                } else {
                    a.Utilities.Event.off(this._canvas, this._eventPrefix + "up", this._onMouseUpCallback);
                    var e = Math.max(this._canvas.clientHeight, this._canvas.clientWidth);
                    if (!(Math.abs(this._offsets.X - b.X) > .01 * e || Math.abs(this._offsets.Y - b.Y) > .01 * e)) {
                        b = this.getPickedObject(b.X, b.Y);
                        if (b) {
                            d = b.objectId || null;
                            var f = b.name || ""
                        }
                        void 0 ==
                            this._smartScene.selectedObjectsIds || !d && c.ctrlKey || (c.ctrlKey ? -1 === this._smartScene.selectedObjectsIds.indexOf(d) ? this._smartScene._addObjectToSelection(d, !1, f) : this._smartScene._removeObjectFromSelection(d) : this._smartScene._addObjectToSelection(d, !0, f))
                    }
                }
            };
            b.prototype._onHighlightingAnimationFinished = function (a) {
                a = this._getMeshesByObjectID(a);
                for (var c in a) a[c].material = this._onRenduTeia(this._renduTeia, a[c].id)
            };
            b.prototype._onSelectionAdded = function (a, b) {
                var c = this;
                b && -1 === this._objectsSelecting.indexOf(b) &&
                    (a = this._getMeshesByObjectID(b)) && 0 != a.length && (this._pickedMeshSelCur = b, this._activeViewport.activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.UniversalCamera ? a.forEach(function (a) {
                        a.disableEdgesRendering();
                        a.renderOverlay = !1;
                        a.renderingGroupId = 0
                    }) : a.forEach(function (a) {
                        c.selectViewObject(a)
                    }))
            };
            b.prototype.selectViewObject = function (a, b) {
                void 0 === b && (b = !0);
                a.overlayColor = new BABYLON.Color3(0, .4, 1);
                this._isActivatOverlay && (a.renderOverlay = !0, a.renderingGroupId = 1);
                b && 1E4 > a.getTotalVertices() &&
                    this._isActivatOverlay && a.enableEdgesRendering()
            };
            b.prototype._onSelectionRemoved = function (a, b, d) {
                this._removeObjectsFromSelection(b)
            };
            b.prototype._onSelectionCleared = function (a, b) {
                this._pickedMeshSelCur = null;
                this._removeObjectsFromSelection(b)
            };
            b.prototype._onSceneCleared = function (a) {
                for (; 0 < this.scene.meshes.length;) this.scene.meshes[0].dispose();
                for (var c in this._meshesToImport) delete this._meshesToImport[c]
            };
            b.prototype.CloseAllInfoBox = function () {
                var a = this._activeViewport._infoBoxManager._infoBoxes,
                    b;
                for (b in a) this._activeViewport._infoBoxManager.removeInfoBox(a[b])
            };
            b.prototype._removeObjectsFromSelection = function (c) {
                if (c) {
                    c = a.Utilities.Helpers.makeArray(c);
                    for (var b in c) {
                        this._objectsSelecting = this._objectsSelecting.filter(function (a) {
                            return a != c[b]
                        });
                        var d = this._getMeshesByObjectID(c[b]),
                            e;
                        for (e in d) d[e].disableEdgesRendering(), d[e].renderOverlay = !1, d[e].renderingGroupId = 0
                    }
                }
            };
            b.prototype.getInvertedObjectColor = function (a) {
                a = this._getMeshesByObjectID(a);
                if (!a || 0 == a.length) return null;
                a =
                    new BABYLON.Color3;
                a.r = 0;
                a.g = 0;
                a.b = 1;
                return a
            };
            b.prototype._setObjectColor = function (a, b, d, e, f, h, k) {
                void 0 === d && (d = !1);
                void 0 === f && (f = !0);
                void 0 === h && (h = !1);
                void 0 === k && (k = !1);
                for (var c in a) {
                    var g = a[c];
                    d ? (g.edgesColor = new BABYLON.Color4(b.r, b.g, b.b, 1), g.edgesWidth = 2, g.enableEdgesRendering()) : (g.renderOutline = !1, g.disableEdgesRendering());
                    h ? (this._highLightLayer.removeMesh(g), this._highLightLayer.addMesh(g, new BABYLON.Color3(b.r, b.g, b.b), !0)) : this._highLightLayer.removeMesh(g);
                    if (f && (null != this._meshesMaterialTeia[g.id] &&
                            (this._meshesMaterialTeia[g.id].diffuseColor = new BABYLON.Color3(b.r, b.g, b.b), k && (this._meshesMaterialTeia[g.id].emissiveColor = new BABYLON.Color3(b.r, b.g, b.b), this._meshesMaterialTeia[g.id].ambientColor = new BABYLON.Color3(b.r, b.g, b.b)), null != e && (this._meshesMaterialTeia[g.id].alpha = e)), null != this._meshesMaterialBJ[g.id]))
                        if (this._meshesMaterialBJ[g.id] instanceof BABYLON.StandardMaterial) null != this._meshesMaterialBJ[g.id].diffuseColor && (this._meshesMaterialBJ[g.id].diffuseColor = new BABYLON.Color3(b.r,
                            b.g, b.b)), k && (null != this._meshesMaterialBJ[g.id].emissiveColor && (this._meshesMaterialBJ[g.id].emissiveColor = new BABYLON.Color3(b.r, b.g, b.b)), null != this._meshesMaterialBJ[g.id].ambientColor && (this._meshesMaterialBJ[g.id].ambientColor = new BABYLON.Color3(b.r, b.g, b.b))), null != e && (this._meshesMaterialBJ[g.id].alpha = e);
                        else if (this._meshesMaterialBJ[g.id] instanceof BABYLON.MultiMaterial) {
                        g = this._meshesMaterialBJ[g.id];
                        for (var l = 0; l < g.subMaterials.length; l++)
                            if (g.subMaterials[l] instanceof BABYLON.StandardMaterial) {
                                var n =
                                    g.subMaterials[l];
                                null != n && (null != n.diffuseColor && (n.diffuseColor = new BABYLON.Color3(b.r, b.g, b.b)), k && (null != n.emissiveColor && (n.emissiveColor = new BABYLON.Color3(b.r, b.g, b.b)), null != n.ambientColor && (n.ambientColor = new BABYLON.Color3(b.r, b.g, b.b))), null != e && (n.alpha = e))
                            }
                    }
                }
            };
            b.prototype._mergeMeshes = function (a, b, d, e, f) {
                this.freeze(!1);
                if (0 == a.length) return null;
                var c = a[0],
                    g = c.name,
                    h = c.id,
                    l = c.objectId,
                    k = c.parent,
                    n = c.getChildren(),
                    m = c.isPickable,
                    C = c.isVisible,
                    v = c.shouldBeVisible;
                a = BABYLON.Mesh.MergeMeshes(a,
                    b, d, e, f);
                if (null == a) return k.getChildren().push(c), c.getChildren().concat(n), c;
                a.id = h;
                a.name = g;
                a.objectId = l;
                a.action = !1;
                a.parent = k;
                a._isObjectTeia = !0;
                a.isPickable = m;
                a.isVisible = C;
                a.shouldBeVisible = v;
                a.useVertexColors = !1;
                a.checkCollisions = !1;
                a.overlayColor = new BABYLON.Color3(1, .9, 0);
                a.overlayAlpha = .1;
                a.edgesColor = new BABYLON.Color4(0, .5, 1, 1);
                a.edgesWidth = 2;
                a.setCheckParentEnabled(!1);
                a.freezeWorldMatrix();
                this._arrayMeshByObjectId[l].length = 0;
                this._arrayMeshByObjectId[l].push(a);
                BABYLON.Tags.EnableFor(a);
                c = a.name.split("-").join(" ");
                c = c.split(":").join(" ");
                c = c.split("_").join(" ");
                BABYLON.Tags.AddTagsTo(a, c);
                BABYLON.Tags.AddTagsTo(a, l);
                null != this._octree && this._octree.addMesh(a);
                c = a;
                k.getChildren().push(c);
                this.unfreeze();
                return c
            };
            b.prototype._mergeMeshesByName = function (a, b) {
                var c = this;
                void 0 === b && (b = !1);
                this.freeze(!1);
                if (b) {
                    for (var d in this._pickedMeshSelObjects) b = this._getMeshesByObjectID(this._pickedMeshSelObjects[d]), 0 < b.length && (b[0].isPickable = !0);
                    this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                    var e = [];
                    this._scene.meshes.filter(function (c) {
                        return -1 < c.name.indexOf(a)
                    }).forEach(function (a) {
                        null != a.parent ? e[a.parent.id] = a.parent : null != a.parentId && (e[a.parent.id] = c._arrayMeshByObjectId[a.parentId])
                    });
                    for (var g in e) {
                        var f = e[g].getChildren(function (c) {
                            return -1 < c.name.indexOf(a) && 0 == c.getChildren().length && c.isVisible
                        });
                        if (0 < f.length) {
                            d = f[0].id;
                            var h = f[0].objectId,
                                k = f[0].name,
                                m = f[0].isPickable,
                                z = f[0].isVisible,
                                u = f[0].shouldBeVisible;
                            for (b = 0; b < f.length; b++) this._teiaHierarchy[f[b].objectId].objectId =
                                h, this._teiaHierarchy[f[b].objectId].isVisible = z, this._teiaHierarchy[f[b].objectId].shouldBeVisible = u, this._teiaHierarchy[f[b].objectId].children = null;
                            b = BABYLON.Mesh.MergeMeshes(f, !0);
                            if (null == b) return;
                            null == e[g]._children && (e[g]._children = []);
                            e[g]._children.push(b);
                            b.id = d;
                            b.name = k;
                            b.objectId = h;
                            b.action = !1;
                            b.parent = e[g];
                            b._isObjectTeia = !0;
                            b.isPickable = m;
                            b.isVisible = z;
                            b.shouldBeVisible = u;
                            b.useVertexColors = !1;
                            b.checkCollisions = !1;
                            b.overlayColor = new BABYLON.Color3(1, .9, 0);
                            b.overlayAlpha = .1;
                            b.edgesColor =
                                new BABYLON.Color4(0, .5, 1, 1);
                            b.edgesWidth = 2;
                            b.setCheckParentEnabled(!1);
                            b.freezeWorldMatrix();
                            this._arrayMeshByObjectId[h].length = 0;
                            this._arrayMeshByObjectId[h].push(b);
                            BABYLON.Tags.EnableFor(b);
                            d = b.name;
                            d = b.name.split("-").join(" ");
                            d = d.split(":").join(" ");
                            d = d.split("_").join(" ");
                            BABYLON.Tags.AddTagsTo(b, d);
                            null != this._octree && this._octree.addMesh(b)
                        }
                    }
                } else {
                    u = this._scene.meshes.filter(function (c) {
                        return -1 < c.name.indexOf(a)
                    });
                    0 == u.length && this.unfreeze();
                    g = u[0].id;
                    h = u[0].objectId;
                    k = u[0].name;
                    m =
                        u[0].isVisible;
                    z = u[0].shouldBeVisible;
                    for (b = 0; b < u.length; b++) this._teiaHierarchy[u[b].objectId].objectId = h, this._teiaHierarchy[u[b].objectId].isVisible = m, this._teiaHierarchy[u[b].objectId].shouldBeVisible = z, this._teiaHierarchy[u[b].objectId].children = null;
                    for (d in this._pickedMeshSelObjects) b = this._getMeshesByObjectID(this._pickedMeshSelObjects[d]), 0 < b.length && (b[0].isPickable = !0);
                    this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                    b = BABYLON.Mesh.MergeMeshes(u, !0, !0);
                    b.id = g;
                    b.name =
                        k;
                    b.objectId = h;
                    b.action = !1;
                    b.isPickable = !0;
                    b.isVisible = m;
                    b.shouldBeVisible = z;
                    b.useVertexColors = !1;
                    b.checkCollisions = !1;
                    b._isObjectTeia = !0;
                    b.overlayColor = new BABYLON.Color3(1, .9, 0);
                    b.overlayAlpha = .1;
                    b.edgesColor = new BABYLON.Color4(0, .5, 1, 1);
                    b.edgesWidth = 2;
                    b.setCheckParentEnabled(!1);
                    b.freezeWorldMatrix();
                    this._arrayMeshByObjectId[h].length = 0;
                    this._arrayMeshByObjectId[h].push(b);
                    null != this._octree && this._octree.addMesh(b)
                }
                this.unfreeze()
            };
            b.prototype._mergeMeshesByTags = function (a, b) {
                void 0 === b && (b = !1);
                this.freeze(!1);
                if (b) {
                    for (var c in this._pickedMeshSelObjects) b = this._getMeshesByObjectID(this._pickedMeshSelObjects[c]), 0 < b.length && (b[0].isPickable = !0);
                    this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                    var d = [];
                    this.getMeshesByTag(a).meshes.forEach(function (a) {
                        null != a.parent && (d[a.parent.id] = a.parent)
                    });
                    for (var e in d) {
                        var g = d[e].getChildren(function (a) {
                            return -1 < a.name.indexOf(name) && 0 == a.getChildren().length && a.isVisible
                        });
                        if (0 < g.length) {
                            c = g[0].id;
                            a = g[0].objectId;
                            var f =
                                g[0].name,
                                h = g[0].isPickable,
                                k = g[0].isVisible,
                                m = g[0].shouldBeVisible;
                            for (b = 0; b < g.length; b++) this._teiaHierarchy[g[b].objectId].objectId = a, this._teiaHierarchy[g[b].objectId].isVisible = k, this._teiaHierarchy[g[b].objectId].shouldBeVisible = m, this._teiaHierarchy[g[b].objectId].children = null;
                            b = BABYLON.Mesh.MergeMeshes(g, !0, !0);
                            null == d[e]._children && (d[e]._children = []);
                            d[e]._children.push(b);
                            b.id = c;
                            b.name = f;
                            b.objectId = a;
                            b.action = !1;
                            b.parent = d[e];
                            b._isObjectTeia = !0;
                            b.isPickable = h;
                            b.isVisible = k;
                            b.shouldBeVisible =
                                m;
                            b.useVertexColors = !1;
                            b.checkCollisions = !1;
                            b.overlayColor = new BABYLON.Color3(1, .9, 0);
                            b.overlayAlpha = .1;
                            b.edgesColor = new BABYLON.Color4(0, .5, 1, 1);
                            b.edgesWidth = 2;
                            b.setCheckParentEnabled(!1);
                            b.freezeWorldMatrix();
                            this._arrayMeshByObjectId[a].length = 0;
                            this._arrayMeshByObjectId[a].push(b);
                            BABYLON.Tags.EnableFor(b);
                            c = b.name;
                            c = b.name.split("-").join(" ");
                            c = c.split(":").join(" ");
                            c = c.split("_").join(" ");
                            BABYLON.Tags.AddTagsTo(b, c);
                            null != this._octree && this._octree.addMesh(b)
                        }
                    }
                } else {
                    m = this.getMeshesByTag(a).meshes;
                    if (0 == m.length) {
                        this.unfreeze();
                        return
                    }
                    e = m[0].id;
                    a = m[0].objectId;
                    f = m[0].name;
                    h = m[0].isVisible;
                    k = m[0].shouldBeVisible;
                    for (b = 0; b < m.length; b++) this._teiaHierarchy[m[b].objectId].objectId = a, this._teiaHierarchy[m[b].objectId].isVisible = h, this._teiaHierarchy[m[b].objectId].shouldBeVisible = k, this._teiaHierarchy[m[b].objectId].children = null;
                    for (c in this._pickedMeshSelObjects) b = this._getMeshesByObjectID(this._pickedMeshSelObjects[c]), 0 < b.length && (b[0].isPickable = !0);
                    this._pickedMeshSelObjects.splice(0, this._pickedMeshSelObjects.length);
                    b = BABYLON.Mesh.MergeMeshes(m, !0, !0);
                    b.id = e;
                    b.name = f;
                    b.objectId = a;
                    b.action = !1;
                    b.isPickable = !0;
                    b.isVisible = h;
                    b.shouldBeVisible = k;
                    b.useVertexColors = !1;
                    b.checkCollisions = !1;
                    b._isObjectTeia = !0;
                    b.overlayColor = new BABYLON.Color3(1, .9, 0);
                    b.overlayAlpha = .1;
                    b.edgesColor = new BABYLON.Color4(0, .5, 1, 1);
                    b.edgesWidth = 2;
                    b.setCheckParentEnabled(!1);
                    b.freezeWorldMatrix();
                    this._arrayMeshByObjectId[a].length = 0;
                    this._arrayMeshByObjectId[a].push(b);
                    null != this._octree && this._octree.addMesh(b)
                }
                this.unfreeze()
            };
            b.prototype.changeObjectColorByTag =
                function (a, b, d, e, f, h) {
                    var c = this;
                    void 0 === d && (d = !1);
                    void 0 === e && (e = null);
                    void 0 === f && (f = !0);
                    void 0 === h && (h = !1);
                    this.getMeshesByTag(a).meshes.forEach(function (a) {
                        c.changeObjectColor(a.objectId, b, d, e, f, h)
                    })
                };
            b.prototype.changeObjectColor = function (a, b, d, e, f, h, k) {
                void 0 === d && (d = !1);
                void 0 === e && (e = null);
                void 0 === f && (f = !0);
                void 0 === h && (h = !1);
                void 0 === k && (k = !1);
                if (b && a) {
                    if (1 < b.r || 1 < b.g || 1 < b.b) b.r /= 255, b.g /= 255, b.b /= 255;
                    b instanceof BABYLON.Color3 && (b = new BABYLON.Color4(b.r, b.g, b.b, 1));
                    if ((a = this._getMeshesByObjectID(a)) &&
                        !(1 > a.length)) {
                        if (!this._originalColors[a[0].objectId] && null != this._meshesMaterialTeia[a[0].id] && null != this._meshesMaterialTeia[a[0].id].diffuseColor) {
                            var c = this._meshesMaterialTeia[a[0].id].diffuseColor;
                            this._originalColors[a[0].objectId] = new BABYLON.Color3(c.r, c.g, c.b)
                        }
                        this._setObjectColor(a, b, d, e, f, h, k)
                    }
                }
            };
            b._setObjectColor = function (a, b) {
                var c, d;
                for (d in a) {
                    var e = a[d];
                    c || (c = e.getScene());
                    a[0].material.diffuseColor = new BABYLON.Color3(b.r, b.g, b.b)
                }
            };
            b.prototype.restoreObjectsOriginalColor = function () {
                for (var a in this._originalColors) this.restoreObjectOriginalColor(a)
            };
            b.prototype.restoreObjectOriginalColor = function (a, b) {
                this._originalColors[a] && (this.changeObjectColor(a, this._originalColors[a], !1), delete this._originalColors[a])
            };
            b.prototype.changeObjectColorAnimated = function (a, b, d, e) {
                if ((a = this._getMeshesByObjectID(a)) && 0 !== a.length)
                    for (var c in a) {
                        var g = a[c];
                        this._originalColors[g.objectId] || (e = g.material.diffuseColor, this._originalColors[g.objectId] = new BABYLON.Color3(e.r, e.g, e.b));
                        d = d / 1E3 * 30;
                        0 === d && (d = 1);
                        var f = new BABYLON.Animation("ChangeColorAnimation", "material.diffuseColor",
                                30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
                            h = new BABYLON.Animation("ChangeColorAnimation", "material.emissiveColor", 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        e = [];
                        e.push({
                            frame: 0,
                            value: g.material.diffuseColor
                        });
                        e.push({
                            frame: d,
                            value: b
                        });
                        f.setKeys(e);
                        h.setKeys(e);
                        g.animations.push(f, h);
                        this._scene.beginDirectAnimation(g, [f, h], 0, d, void 0, void 0, function () {
                            g.animations = g.animations.filter(function (a, b, c) {
                                return a.name !=
                                    f.name && a.name != h.name
                            })
                        })
                    }
            };
            b.prototype.changeObjectRotation = function (b, d, e) {
                for (var c = this._getMeshesByObjectID(b), g = 0; g < c.length; g++) {
                    var f = c[g];
                    this._originalRotations[f.objectId] || (this._originalRotations[f.objectId] = f.rotationQuaternion || new BABYLON.Quaternion);
                    var h = this._originalRotations[f.objectId].toEulerAngles(),
                        l = h.x,
                        k = h.y;
                    h = h.z;
                    for (var m = this._rotationForObjectAction[b], z = 0; z < m.length; z++) {
                        var u = m[z];
                        l += u.rx % 360;
                        k += u.ry % 360;
                        h += u.rz % 360
                    }
                    l = a.Utilities.Helpers.fromDegreesToRadians(l);
                    k =
                        a.Utilities.Helpers.fromDegreesToRadians(k);
                    h = a.Utilities.Helpers.fromDegreesToRadians(h);
                    k = a.Utilities.Helpers.fromEulerToQuaternion(l, k, h);
                    d = d / 1E3 * 30;
                    0 === d && (d = 1);
                    h = new BABYLON.Animation("RotationAnimationAction", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                    l = [];
                    l.push({
                        frame: 0,
                        value: f.rotationQuaternion || new BABYLON.Quaternion
                    });
                    l.push({
                        frame: d,
                        value: k
                    });
                    h.setKeys(l);
                    f.animations.push(h);
                    this._scene.beginDirectAnimation(f, [h],
                        0, d, !1, 1, e)
                }
            };
            b.prototype.restoreObjectOriginalRotation = function (a, b) {
                if (this._originalRotations[a]) {
                    b = this._originalRotations[a];
                    a = this._getMeshesByObjectID(a);
                    for (var c = 0; c < a.length; c++) a[c].rotationQuaternion = b
                }
            };
            b.prototype.changeObjectPosition = function (a, b, d) {
                for (var c = this._getMeshesByObjectID(a), e = 0; e < c.length; e++) {
                    var g = c[e];
                    this._originalPositions[g.objectId] || (this._originalPositions[g.objectId] = g.position);
                    for (var f = this._originalPositions[g.objectId].x, h = this._originalPositions[g.objectId].y,
                            l = this._originalPositions[g.objectId].z, k = this._positionForObjectAction[a], m = 0; m < k.length; m++) {
                        var u = k[m];
                        f += u.tx;
                        h += u.ty;
                        l += u.tz
                    }
                    f = new BABYLON.Vector3(f, h, l);
                    b = b / 1E3 * 30;
                    0 === b && (b = 1);
                    h = new BABYLON.Animation("PositionAnimationAction", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                    l = [];
                    l.push({
                        frame: 0,
                        value: g.position || new BABYLON.Vector3(0, 0, 0)
                    });
                    l.push({
                        frame: b,
                        value: f
                    });
                    h.setKeys(l);
                    g.animations.push(h);
                    this._scene.beginDirectAnimation(g, [h], 0,
                        b, !1, 1, d)
                }
            };
            b.prototype.restoreObjectOriginalPosition = function (a, b) {
                if (this._originalPositions[a]) {
                    b = this._originalPositions[a];
                    a = this._getMeshesByObjectID(a);
                    for (var c = 0; c < a.length; c++) a[c].position = b
                }
            };
            b.prototype._getSelectedMeshes = function () {
                var a = this._smartScene.selectedObjectsIds,
                    b = [],
                    d;
                for (d in a) b = b.concat(this._getMeshesByObjectID(a[d]));
                return b
            };
            b.prototype.hideObjects = function (a, b) {
                void 0 === b && (b = !1);
                var c = [],
                    d = this._scene.meshes.filter(function (d, e, g) {
                        (e = b && -1 !== a.indexOf(d.objectId) ||
                            !b && -1 === a.indexOf(d.objectId)) || c.push(d);
                        return e
                    });
                this._isolate(d, !0);
                this._isolate(c, !1)
            };
            b.prototype._isolateSelection = function () {
                var b = this,
                    d = this._getSelectedMeshes(),
                    e = this._smartScene.selectedObjectsIds;
                d = d.concat(d);
                var f = e;
                for (d = 0; d < e.length; d++) f = f.concat(this.getDescendantObjectsIds(e[d]));
                e = this._getMeshesByObjectsIds(f);
                a.Utilities.Helpers.compareArrays(e, this._lastIsolatedMeshes) && (e = []);
                0 === e.length ? (this._isolate(this._scene.meshes.filter(function (a, c, d) {
                        return -1 === b._invisibleObjectIds.indexOf(a.objectId)
                    }),
                    !0), this._lastIsolatedMeshes && (this._lastIsolatedMeshes.length = 0, this.zoomOnSelectedObjects())) : (this._isolate(e, !0), this._isolate(this._scene.meshes.filter(function (a, b, c) {
                    return -1 !== f.indexOf(a.objectId) ? !1 : !0
                }), !1), this._lastIsolatedMeshes = e, this.zoomOnSelectedObjects())
            };
            b.prototype._focusOnSelectedObjects = function () {
                this._zoomOnFocusOnSelectedObjects(!1)
            };
            b.prototype.zoomOnSelectedObjects = function () {
                a.Utilities.Event.fire(this, "zoomOnSelection");
                this._zoomOnWithGroups()
            };
            b.prototype._getChildren =
                function (a) {
                    return a.getChildren()
                };
            b.prototype._zoomOnFocusOnSelectedObjects = function (a, b) {
                if (!a) {
                    a = this._getSelectedMeshes();
                    0 == a.length && (a = this._scene.meshes);
                    for (var c in this.viewports.values)
                        if (this.viewports.values[c].activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera) {
                            var d = this.viewports.values[c].activeCamera.zoomOnFactor;
                            b && (this.viewports.values[c].activeCamera.zoomOnFactor = b);
                            this.viewports.values[c].activeCamera.zoomOn(a);
                            b && (this.viewports.values[c].activeCamera.zoomOnFactor =
                                d)
                        }
                }
            };
            b.prototype._getGroupMinMax = function (a, b) {
                void 0 === b && (b = {
                    min: null,
                    max: null
                });
                for (var c in a) {
                    var d = a[c];
                    d._isObjectTeia && ((d = this._getMinMaxRecursive(d), b.min && b.max) ? null != d && (b.min.MinimizeInPlace(d.min), b.max.MaximizeInPlace(d.max)) : null != b && null != d && (b.min = d.min, b.max = d.max))
                }
                return b
            };
            b.prototype._getMinMaxRecursive = function (a, b) {
                void 0 === b && (b = {
                    min: null,
                    max: null
                });
                var c = a.getBoundingInfo().boundingBox;
                if (this.isInfinityVector(c.maximumWorld) || this.isInfinityVector(c.minimumWorld)) a._boundingInfo =
                    new BABYLON.BoundingInfo(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero()), c = a.getBoundingInfo().boundingBox;
                if (c.minimumWorld.equals(c.maximumWorld)) {
                    var d = this._getChildren(a),
                        e = {
                            min: null,
                            max: null
                        };
                    for (f in d) {
                        var g = d[f];
                        g.isVisible && this._getMinMaxRecursive(g, e)
                    }
                    if (!e.min || !e.max) return null;
                    var f = a.getWorldMatrix().clone().invert();
                    d = BABYLON.Vector3.TransformCoordinates(e.min, f);
                    f = BABYLON.Vector3.TransformCoordinates(e.max, f);
                    a._boundingInfo = new BABYLON.BoundingInfo(d, f);
                    if (!b.min) return b.min = c.minimumWorld,
                        b.max = c.maximumWorld, b.max = this.InfinityVectorToZeroVector(b.max), b.min = this.InfinityVectorToZeroVector(b.min), b;
                    b.max = this.InfinityVectorToZeroVector(b.max);
                    b.min = this.InfinityVectorToZeroVector(b.min);
                    b.min.MinimizeInPlace(e.min);
                    b.max.MaximizeInPlace(e.max);
                    return b
                }
                if (!b.min) return b.min = c.minimumWorld, b.max = c.maximumWorld, b.max = this.InfinityVectorToZeroVector(b.max), b.min = this.InfinityVectorToZeroVector(b.min), b;
                b.max = this.InfinityVectorToZeroVector(b.max);
                b.min = this.InfinityVectorToZeroVector(b.min);
                b.min.MinimizeInPlace(c.minimumWorld);
                b.max.MaximizeInPlace(c.maximumWorld);
                return b
            };
            b.prototype.InfinityVectorToZeroVector = function (a) {
                if (void 0 === a) return BABYLON.Vector3.Zero();
                var b = BABYLON.Vector3.Zero();
                b.x = 1.797693220248158E100 <= Math.abs(a.x) ? 0 : a.x;
                b.y = 1.797693220248158E100 <= Math.abs(a.y) ? 0 : a.y;
                b.z = 1.797693220248158E100 <= Math.abs(a.z) ? 0 : a.z;
                return b
            };
            b.prototype.isInfinityVector = function (a) {
                return void 0 === a ? !1 : 1.797693220248158E100 <= Math.abs(a.x) && 1.797693220248158E100 <= Math.abs(a.y) && 1.797693220248158E100 <=
                    Math.abs(a.z)
            };
            b.prototype._zoomOnWithGroups = function () {
                var a = this._getMeshesByObjectID(this._smartScene.selectedObjectsIds[0]);
                if (this._activeViewport.activeCamera.cameraType !== BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && !a || 0 === a.length) this._activeViewport.activeCamera.zoomOn(null);
                else {
                    var b = {
                        min: null,
                        max: null
                    };
                    this._getGroupMinMax(a, b);
                    if (b.min && b.max)
                        for (var d in this._viewports.values) this.viewports.values[d].activeCamera.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera &&
                            this.viewports.values[d].activeCamera.zoomOnMinMax(a)
                }
            };
            b.prototype._startZoomPlus = function () {
                for (var a in this.viewports.values) {
                    var b = this.viewports.values[a].activeCamera;
                    b.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && b.startTouchZoom(BABYLON.TeiaJSAddons.Camera.AUTO_ZOOM_MORE)
                }
            };
            b.prototype._stopZoom = function () {
                for (var a in this.viewports.values)
                    if (this._nameCamera == b.ARC_ROTATE_CAMERA) {
                        var d = this.viewports.values[a].activeCamera;
                        d.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera &&
                            d.stopTouchZoom()
                    }
            };
            b.prototype._startZoomMinus = function () {
                for (var a in this.viewports.values) {
                    var b = this.viewports.values[a].activeCamera;
                    b.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera && b.startTouchZoom(BABYLON.TeiaJSAddons.Camera.AUTO_ZOOM_LESS)
                }
            };
            b.prototype._decreaseOpacity = function () {
                BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor += .1;
                1 < BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor && (BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor = 1)
            };
            b.prototype._increaseOpacity =
                function () {
                    BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor -= .1;
                    .1 > BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor && (BABYLON.TeiaJSAddons.BlendPostProcess.opacityFactor = .1)
                };
            b.prototype._switchCameraMode = function () {
                for (var a in this.viewports.values) this.viewports.values[a]._cameraSwitchMode()
            };
            b.prototype._switchCamera = function (a) {
                for (var b in this._viewports.values) {
                    var c = this._viewports.values[b],
                        d = c.getCamerasByType(a);
                    if (d && 0 !== d.length && (this._scene.activeCameras = this._scene.activeCameras.filter(function (a,
                            b, d) {
                            return a.uniqueId != c.activeCamera.uniqueId
                        }), this.scene.activeCamera = d[0], c.activeCamera = d[0], this.scene.cameraToUseForPointers = d[0], d[0].cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera)) {
                        if (this._viewportsControlOptions.autoRotationBehavior) {
                            d[0].useAutoRotationBehavior = this._viewportsControlOptions.autoRotationBehavior;
                            var e = d[0].getBehaviorByName("AutoRotation");
                            e.idleRotationSpeed = this._viewportsControlOptions.autoRotationSpeed;
                            e.idleRotationWaitTime = 6E3 * this._viewportsControlOptions.autoRotationWaitTime;
                            e.zoomStopsAnimation = this._viewportsControlOptions.autoRotationZoomStopsAnimation
                        }
                        this._viewportsControlOptions.framingBehavior && (d[0].useFramingBehavior = this._viewportsControlOptions.framingBehavior);
                        this._viewportsControlOptions.bouncingBehavior && (d[0].useBouncingBehavior = this._viewportsControlOptions.bouncingBehavior);
                        d[0].upperRadiusLimit = this._viewportsControlOptions.maxRadiusBouncingBehavior;
                        d[0].lowerRadiusLimit = this._viewportsControlOptions.minRadiusBouncingBehavior
                    }
                }
            };
            b.prototype._switchCameraById =
                function (a) {
                    for (var b in this._viewports.values) {
                        var c = this._viewports.values[b],
                            d = c.getCamerasById(this._arrayIdCamera[a]);
                        if (d && (this._scene.activeCameras = this._scene.activeCameras.filter(function (a, b, d) {
                                return a.uniqueId != c.activeCamera.uniqueId
                            }), this.scene.activeCamera = d, c.activeCamera = d, this.scene.cameraToUseForPointers = d, d.cameraType === BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera)) {
                            if (this._viewportsControlOptions.autoRotationBehavior) {
                                d.useAutoRotationBehavior = this._viewportsControlOptions.autoRotationBehavior;
                                var e = d.getBehaviorByName("AutoRotation");
                                e.idleRotationSpeed = this._viewportsControlOptions.autoRotationSpeed;
                                e.idleRotationWaitTime = 6E3 * this._viewportsControlOptions.autoRotationWaitTime;
                                e.zoomStopsAnimation = this._viewportsControlOptions.autoRotationZoomStopsAnimation
                            }
                            this._viewportsControlOptions.framingBehavior && (d.useFramingBehavior = this._viewportsControlOptions.framingBehavior);
                            this._viewportsControlOptions.bouncingBehavior && (d.useBouncingBehavior = this._viewportsControlOptions.bouncingBehavior);
                            d.upperRadiusLimit = this._viewportsControlOptions.maxRadiusBouncingBehavior;
                            d.lowerRadiusLimit = this._viewportsControlOptions.minRadiusBouncingBehavior
                        }
                    }
                };
            b.prototype._isolate = function (c, d) {
                for (var e in c) {
                    var g = c[e];
                    g._isObjectTeia && (g.isVisible = d && g.shouldBeVisible, g.onOptimizedStatus = g.isVisible, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, g.objectId, d && g.shouldBeVisible))
                }
                return !0
            };
            b.prototype.isolateMeshesByMeshId = function (a) {
                var b = this.scene.meshes.filter(function (b) {
                    return -1 ===
                        a.indexOf(b.id)
                });
                this._isolate(b, !1)
            };
            b.prototype.toggleVisible = function (a, b) {
                if (a) {
                    var c = this._getMeshesByObjectID(a);
                    if (c && 0 !== c.length) {
                        var d = !c[0].isVisible;
                        null != b && (d = b);
                        for (b = 0; b < c.length; b++) this._teiaHierarchy[a].shouldBeVisible = d && this._teiaHierarchy[a].isVisible, c[b].isVisible = d && this._teiaHierarchy[a].shouldBeVisible, c[b].shouldBeVisible = d;
                        this._setMeshAndDescendantsVisible(c[0].objectId, c[0].isVisible)
                    } else this._teiaHierarchy[a].shouldBeVisible = !this._teiaHierarchy[a].shouldBeVisible &&
                        this._teiaHierarchy[a].isVisible, this._setMeshAndDescendantsVisible(a, this._teiaHierarchy[a].shouldBeVisible)
                }
            };
            b.prototype.visibleObjects = function (a, b) {
                this.freeze(!1);
                if (a) {
                    for (var c = 0; c < a.length; c++)
                        for (var d = this._getMeshesByObjectID(a[c]), e = 0; e < d.length; e++) d[e].isVisible = b, d[e].shouldBeVisible = b, null != document.getElementById("checkbox-node-" + a[c]) && (document.getElementById("checkbox-node-" + a[c]).checked = b && d[e].shouldBeVisible);
                    this.unfreeze()
                }
            };
            b.prototype._toggleSelection = function (a, b) {
                void 0 ===
                    b && (b = !1);
                var c = this._getMeshesByObjectID(a),
                    d = [],
                    e;
                for (e in c) {
                    var g = c[e];
                    d.push(g);
                    d = d.concat(jQuery.grep(g.getDescendants(), function (a, b) {
                        return a instanceof BABYLON.AbstractMesh
                    }))
                }
                null != document.getElementById("checkbox-node-" + a) && (document.getElementById("checkbox-node-" + a).checked = b);
                this._isolate(d, b)
            };
            b.prototype._hideSelected = function () {
                a.Utilities.Event.fire(this, "hideSelection");
                var b = this._getSelectedMeshes(),
                    d;
                for (d in b) b[d].isVisible = !b[d].isVisible, b[d].shouldBeVisible = b[d].isVisible,
                    null != document.getElementById("checkbox-node-" + b[d].objectId) && (document.getElementById("checkbox-node-" + b[d].objectId).checked = b[d].isVisible)
            };
            b.prototype._unHideAll = function () {
                var a = this._scene.meshes,
                    b;
                for (b in a) a[b]._isObjectTeia && (a[b].isVisible = this._teiaHierarchy[a[b].objectId].isVisible, a[b].shouldBeVisible = !0, null != document.getElementById("checkbox-node-" + a[b].objectId) && (document.getElementById("checkbox-node-" + a[b].objectId).checked = a[b].isVisible))
            };
            b.prototype._hideAllObject = function () {
                jQuery.each(jQuery("[id^=checkbox-node-]"),
                    function () {
                        this.checked = !1
                    });
                this._scene.meshes.forEach(function (a) {
                    a._isObjectTeia ? (a.isVisible = !1, a.shouldBeVisible = !1) : a.isVisible = a.isVisible
                });
                return !0
            };
            b.prototype.switchWireFrame = function (a) {
                void 0 === a && (a = !0);
                this.freeze(!1);
                this._scene.meshes.forEach(function (b) {
                    if (b._isObjectTeia)
                        if (b.material instanceof BABYLON.MultiMaterial) {
                            b = b.material;
                            for (var c = 0; c < b.subMaterials.length; c++) b.subMaterials[c].wireframe = a
                        } else null != b.material && (b.material.wireframe = a)
                });
                this.unfreeze()
            };
            b.prototype.switchModeRendu =
                function (b, d) {
                    var c = this;
                    this.freeze(!1);
                    void 0 === d && (d = this._scene.lightsEnabled);
                    a.Utilities.Event.fire(this, "switchRenderMode", b);
                    this._activateSkybox(!b && this._viewportsControlOptions.skybox, this._viewportsControlOptions.hdr && !this._renduTeia, this._viewportsControlOptions.skyboxPath);
                    this._renduTeia = b;
                    this._scene.lightsEnabled = d;
                    this._isBoundingBox = b;
                    this._scene.meshes.forEach(function (a) {
                        a._isObjectTeia && (a.material = c._onRenduTeia(c._renduTeia, a.id))
                    });
                    this._hdrActivate && b ? this._hdr.dispose() :
                        this._hdrActivate && !b && this.addEffectHdr();
                    this._cuttingPlane && this._cuttingPlane.isEnabled() && this._cuttingPlane.initCuttingMaterial();
                    this.unfreeze()
                };
            b.prototype._activateSkybox = function (a, b, d) {
                void 0 === b && (b = !1);
                if (a && !this._skybox)
                    if ("none" == d) "#undefined" != this._viewportsControlOptions.backgroundColor && (this._scene.createDefaultEnvironment({
                            createGround: !1,
                            skyboxSize: 2E3,
                            setupImageProcessing: !1
                        }).setMainColor(BABYLON.Color3.FromHexString(this._viewportsControlOptions.backgroundColor)), this._skybox =
                        this._scene.getMeshByName("BackgroundSkybox"), this._skybox._isObjectTeia = !1, b = this._scene.getMeshByName("BackgroundPlane"), this._skybox.isPickable = !1, this._octree && (null != this._skybox && this._octree.dynamicContent.push(this._skybox), null != b && this._octree.dynamicContent.push(b)));
                    else {
                        var c = !1;
                        if (b) {
                            var e = .5;
                            d || (d = "/Media/Default/assets/environment.dds");
                            var g = d.split(".").pop().toLowerCase()
                        } else e = .5, b = !1, d || (d = "/Media/Default/assets/skybox"), g = d.split(".").pop().toLowerCase();
                        "hdr" == g.toLowerCase() &&
                            (c = !0);
                        d = c ? new BABYLON.HDRCubeTexture(d, this._scene, 1024) : new BABYLON.CubeTexture(d, this._scene);
                        b && (d.gammaSpace = !1);
                        d.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                        this._skybox = this._scene.createDefaultSkybox(d, b || c, 1E4, e);
                        this._skybox._isObjectTeia = !1;
                        this._skybox.isPickable = !1;
                        this._octree && this._octree.dynamicContent.push(this._skybox)
                    } null != this._skybox && (this._skybox.isVisible = a)
            };
            b.prototype.showSkybox = function (a) {
                if (a) {
                    a = BABYLON.Mesh.CreateBox("skyBox", 1E3, this._scene);
                    a._isObjectTeia = !1;
                    BABYLON.Effect.ShadersStore.gradientVertexShader =
                        "precision mediump float;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;uniform mat4 worldViewProjection;varying vec4 vPosition;varying vec3 vNormal;void main(){vec4 p = vec4(position,1.);vPosition = p;vNormal = normal;gl_Position = worldViewProjection * p;}";
                    BABYLON.Effect.ShadersStore.gradientPixelShader = "precision mediump float;uniform mat4 worldView;varying vec4 vPosition;varying vec3 vNormal;uniform float offset;uniform vec3 topColor;uniform vec3 bottomColor;void main(void){float h = normalize(vPosition+offset).y;gl_FragColor = vec4(mix(bottomColor,topColor,max(pow(max(h,0.0),0.6),0.0)),1.0);}";
                    var b = new BABYLON.ShaderMaterial("gradient", this._scene, "gradient", {});
                    b.setFloat("offset", 10);
                    b.setColor3("topColor", BABYLON.Color3.FromInts(0, 100, 255));
                    b.setColor3("bottomColor", BABYLON.Color3.FromInts(100, 200, 255));
                    b.backFaceCulling = !1;
                    a.material = b
                }
            };
            b.prototype._makeTextPlane = function (a, b, d, e) {
                if (a = this._getMeshesByObjectID(a)) {
                    var c = new BABYLON.DynamicTexture("DynamicTexture", 50, this._scene, !0);
                    c.hasAlpha = !0;
                    c.drawText(b, 5, 40, "8px Arial", d, "transparent", !0);
                    b = BABYLON.Mesh.CreatePlane("TextPlane",
                        e, this._scene, !0);
                    d = new BABYLON.StandardMaterial("TextPlaneMaterial", this._scene);
                    d.backFaceCulling = !1;
                    d.specularColor = new BABYLON.Color3(0, 0, 0);
                    d.diffuseTexture = c;
                    b.material = d;
                    b.position = a[0].absolutePosition
                }
            };
            b.prototype.toggleTreeviewDisplay = function () {
                void 0 != this._smartSceneTreeView && this._smartSceneTreeView._toggleTreeviewDisplay()
            };
            b.prototype.addEffectTextureVideo = function (a, b) {
                a = this._getMeshesByObjectID(a);
                for (var c in a) a[c].material.diffuseTexture = new BABYLON.VideoTexture("video", [b],
                    this._scene, !0)
            };
            b.prototype.addEffectSSAO = function () {
                new BABYLON.SSAORenderingPipeline("ssao", this._scene, {
                    ssaoRatio: .5,
                    combineRatio: 1,
                    blurRatio: .5
                });
                this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", this._activeViewport.activeCamera)
            };
            b.prototype.removeEffectSSAO = function () {};
            b.prototype.doDownload = function (a) {
                var b = BABYLON.SceneSerializer.Serialize(this._scene);
                b = JSON.stringify(b);
                if (a.toLowerCase().lastIndexOf(".babylon") !== a.length - 8 || 9 > a.length) a += ".babylon";
                b = new Blob([b], {
                    type: "octet/stream"
                });
                var c = (window.webkitURL || window.URL).createObjectURL(b);
                b = window.document.createElement("a");
                b.href = c;
                b.download = a;
                a = document.createEvent("MouseEvents");
                a.initEvent("click", !0, !1);
                b.dispatchEvent(a)
            };
            b.prototype.setBackfaceCulling = function (a, b) {
                void 0 === b && (b = !1);
                this._scene.meshes.filter(function (c) {
                    -1 < c.name.indexOf(a) && (c.material.backFaceCulling = b);
                    return !0
                })
            };
            b.prototype.setPickableByTag = function (a, b) {
                void 0 === a && (a = "");
                void 0 === b && (b = !0);
                a = this.getMeshesByTag(a).meshes;
                this.freeze(!1);
                0 < a.length && a.forEach(function (a) {
                    a.isPickable = b
                });
                this.unfreeze()
            };
            b.prototype.setVisibleMeshByTag = function (c, d, e) {
                var g = this;
                void 0 === d && (d = !0);
                void 0 === e && (e = !0);
                var f = d,
                    h = e;
                c = this.getMeshesByTag(c).meshes;
                this.freeze(!1);
                0 < c.length ? (h && this._smartScene._clearObjectsSelection(), c.forEach(function (c) {
                        c.isVisible = f;
                        c.shouldBeVisible = f;
                        a.Utilities.Event.fire(g, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c.objectId, f);
                        h && g._smartScene._selectedObjectsIds.push(c.objectId)
                    }), h && this._zoomOnFocusOnSelectedObjects(!1)) :
                    $.UIkit.notify("Not Found", {
                        status: "danger",
                        pos: "bottom-center",
                        timeout: 1500
                    });
                this.unfreeze()
            };
            b.prototype.getAllTags = function () {
                return Object.keys(BABYLON.Tags.GetTags(null, null))
            };
            b.prototype.setIsolateMeshByTag = function (c, d, e, f, h, k, m, t, x) {
                var g = this;
                void 0 === d && (d = !0);
                void 0 === e && (e = !0);
                void 0 === f && (f = !1);
                void 0 === h && (h = !0);
                void 0 === k && (k = !0);
                void 0 === t && (t = !0);
                void 0 === x && (x = !1);
                var l = e,
                    n = f,
                    p = [],
                    r = d;
                d = this.getMeshesByTag(c).meshes;
                k && this.freeze(!1);
                0 < d.length ? (l && this._smartScene._clearObjectsSelection(),
                    h && $.UIkit.notify(d.length + " object" + (1 == d.length ? "" : "s") + " found", {
                        status: "primary",
                        pos: "bottom-center",
                        timeout: 3500
                    }), "" != c && this._scene.meshes.forEach(function (c) {
                        n ? c._isObjectTeia && (c.material = r ? g._onRenduTeia(!0, c.id) : g._onRenduTeia(!1, c.id)) : c._isObjectTeia && t && (c.isVisible = !r, c.shouldBeVisible = !r, a.Utilities.Event.fire(g, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c.objectId, !r))
                    }), d.forEach(function (c) {
                        n ? c._isObjectTeia && (c.material = r ? g._onRenduTeia(!1, c.id) : g._onRenduTeia(!0, c.id)) : c._isObjectTeia &&
                            (c.isVisible = r, c.shouldBeVisible = r, null != c.parent && x && (c.parent.isVisible = r, c.parent.shouldBeVisible = r, p.push(c.parent.name)), p.push(c.name), a.Utilities.Event.fire(g, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c.objectId, r));
                        l && (c = g._getMeshesByObjectID(c.objectId), 0 < c.length && (-1 == g._smartScene._selectedObjectsIds.indexOf(c[0].objectId) && g._smartScene._selectedObjectsIds.push(c[0].objectId), null != c[0].parent && -1 == g._smartScene._selectedObjectsIds.indexOf(c[0].parent.objectId) && g._smartScene._selectedObjectsIds.push(c[0].parent.objectId)))
                    }),
                    l && this._zoomOnFocusOnSelectedObjects(!1, m)) : (this.scene.meshes.forEach(function (c) {
                    c._isObjectTeia && (c.isVisible = !0, c.shouldBeVisible = !0, a.Utilities.Event.fire(this, b.OBJECT_VISIBLE_STATE_CHANGED_EVENT, c.objectId, !0))
                }), h && $.UIkit.notify("No matches found", {
                    status: "danger",
                    pos: "bottom-center",
                    timeout: 3500
                }));
                k && this.unfreeze();
                l && this.clearObjectsSelection();
                return p
            };
            b.prototype.addDataByTag = function (a, b, d, e, f, h, k) {
                var c = this;
                void 0 === f && (f = !0);
                void 0 === h && (h = "");
                void 0 === k && (k = "0");
                a = this.getMeshesByTag(a).meshes;
                var g = f,
                    l = k,
                    m = h,
                    n = {};
                a.forEach(function (a) {
                    c._activeViewport._infoBoxManager.addData(a.objectId, b, d, e, g, m, l);
                    n[a.objectId] = !0
                });
                return n
            };
            b.prototype.setLinkEmissiveWithDiffuse = function (a, b) {
                void 0 === b && (b = !1);
                this._scene.meshes.filter(function (c) {
                    -1 < c.name.indexOf(a) && null != c.material && c.material instanceof BABYLON.StandardMaterial && (c.material.linkEmissiveWithDiffuse = b);
                    return !0
                })
            };
            b.prototype.addEffectHdr = function () {
                this._hdr ? this._hdr.HDREnabled = !0 : (this._hdr = new BABYLON.StandardRenderingPipeline("hdr",
                    this._scene, 1, null, this._viewport3d._camerasArray), this._hdr.BloomEnabled = !0, this._hdr.brightThreshold = .5, this._hdr.HDREnabled = !0, this._hdr.hdrMinimumLuminance = 1, this._hdr.hdrDecreaseRate = .5, this._hdr.hdrIncreaseRate = .5, this._hdr.exposure = .05)
            };
            b.prototype.addEffectLensFlare = function () {
                var a = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-7E3, 1500, 0), this._scene),
                    b = new BABYLON.LensFlareSystem("lensFlareSystem", a, this._scene);
                new BABYLON.LensFlare(.2, 0, new BABYLON.Color3(1, 1, 1), "Media/Default/assets/lens5.png",
                    b);
                new BABYLON.LensFlare(.5, .2, new BABYLON.Color3(.5, .5, 1), "Media/Default/assets/lens4.png", b);
                new BABYLON.LensFlare(.2, 1, new BABYLON.Color3(1, 1, 1), "Media/Default/assets/lens4.png", b);
                new BABYLON.LensFlare(.4, .4, new BABYLON.Color3(1, .5, 1), "Media/Default/assets/Flare.png", b);
                new BABYLON.LensFlare(.1, .6, new BABYLON.Color3(1, 1, 1), "Media/Default/assets/lens5.png", b);
                new BABYLON.LensFlare(.3, .8, new BABYLON.Color3(1, 1, 1), "Media/Default/assets/lens4.png", b);
                return a
            };
            b.prototype.setCollisionMeshByName = function (a,
                b) {
                void 0 === b && (b = !0);
                void 0 === b && (b = !0);
                var c = b;
                this._scene.meshes.filter(function (b) {
                    -1 < b.name.indexOf(a) && (b.checkCollisions = c);
                    return !0
                })
            };
            b.prototype.removeEffectHdr = function () {
                this._hdr && (this._hdrActivate = this._hdr.HDREnabled = !1)
            };
            b.prototype.addEffectGlassByTag = function (a, b, d, e, f, h, k) {
                var c = this;
                void 0 === b && (b = .7);
                void 0 === d && (d = new BABYLON.Color3(.9, .9, .9));
                void 0 === e && (e = new BABYLON.Color3(1, 1, 1));
                void 0 === f && (f = 20);
                void 0 === h && (h = "Media/Default/assets/environment.hdr");
                void 0 === k && (k = !1);
                a = this.getMeshesByTag(a).meshes;
                0 < a.length && a.forEach(function (a) {
                    var g = h.split(".").pop(),
                        l = new BABYLON.PBRMaterial("texturereflexion", c._scene);
                    k ? l.reflectionTexture = new BABYLON.CubeTexture(h, c._scene) : "hdr" == g.toLowerCase() ? l.reflectionTexture = new BABYLON.HDRCubeTexture(h, c._scene, 512) : (l.reflectionTexture = new BABYLON.Texture(h, c._scene), l.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE);
                    l.alpha = b;
                    l.invertRefractionY = !0;
                    l.indexOfRefraction = .62;
                    l.directIntensity = 0;
                    l.environmentIntensity =
                        .5;
                    l.cameraExposure = 1.5;
                    l.cameraContrast = 1.66;
                    l.microSurface = f;
                    l.albedoColor = d;
                    l.reflectivityColor = e;
                    a.material = l;
                    c._meshesMaterialBJ[a.id] = l
                })
            };
            b.prototype.addEffectGlass = function (a, b, d, e, f, h, k) {
                var c = this;
                void 0 === b && (b = .7);
                void 0 === d && (d = new BABYLON.Color3(.9, .9, .9));
                void 0 === e && (e = new BABYLON.Color3(1, 1, 1));
                void 0 === f && (f = 20);
                void 0 === h && (h = "Media/Default/assets/environment.hdr");
                void 0 === k && (k = !1);
                var g = h.split(".").pop(),
                    l = new BABYLON.PBRMaterial("texturereflexion", this._scene);
                k ? l.reflectionTexture =
                    new BABYLON.CubeTexture(h, this._scene) : "hdr" == g.toLowerCase() ? l.reflectionTexture = new BABYLON.HDRCubeTexture(h, this._scene, 512) : (l.reflectionTexture = new BABYLON.Texture(h, this._scene), l.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE);
                l.alpha = b;
                l.invertRefractionY = !0;
                l.indexOfRefraction = .62;
                l.directIntensity = 0;
                l.environmentIntensity = .5;
                l.cameraExposure = 1.5;
                l.cameraContrast = 1.66;
                l.microSurface = f;
                l.albedoColor = d;
                l.reflectivityColor = e;
                this._scene.meshes.filter(function (b) {
                    -1 < b.name.indexOf(a) &&
                        (b.material = l, c._meshesMaterialBJ[b.id] = l);
                    return !0
                })
            };
            b.prototype.setLevelDiffuse = function (a) {
                void 0 === a && (a = 1);
                this._scene.meshes.filter(function (b) {
                    null != b.material && null != b.material && b.material instanceof BABYLON.StandardMaterial && (b.material.diffuseTexture.level = a);
                    return !0
                })
            };
            b.prototype.addEffectPbr = function (a, b, d, e, f, h, k, m, x, q, z, u, y, v, D, w, E, F, B, G, H, I, J, K, L) {
                var c = this;
                void 0 === b && (b = .5);
                void 0 === d && (d = .5);
                void 0 === e && (e = .5);
                void 0 === f && (f = !0);
                void 0 === h && (h = 1);
                void 0 === k && (k = 1);
                void 0 === m &&
                    (m = 1);
                void 0 === x && (x = 1);
                void 0 === q && (q = 1);
                void 0 === z && (z = "#ffffff");
                void 0 === u && (u = null);
                void 0 === y && (y = "#ffffff");
                void 0 === v && (v = null);
                void 0 === D && (D = "#000000");
                void 0 === w && (w = null);
                void 0 === E && (E = "#ffffff");
                void 0 === F && (F = null);
                void 0 === B && (B = null);
                void 0 === G && (G = null);
                void 0 === H && (H = null);
                void 0 === I && (I = "Media/Default/assets/studio.hdr");
                void 0 === J && (J = !1);
                void 0 === K && (K = 1);
                void 0 === L && (L = 0);
                var g = null,
                    l = null,
                    n = null,
                    p = null,
                    r = null,
                    t = null,
                    C = null;
                void 0 != u && (g = new BABYLON.Texture(u, this._scene));
                void 0 != G && (C = new BABYLON.Texture(G, this._scene));
                void 0 != H && (r = new BABYLON.Texture(H, this._scene));
                void 0 != F && (t = new BABYLON.Texture(F, this._scene));
                void 0 != B && (l = new BABYLON.Texture(B, this._scene));
                void 0 != v && (n = new BABYLON.Texture(v, this._scene));
                void 0 != w && (p = new BABYLON.Texture(w, this._scene));
                void 0 == z && (z = "#ffffff");
                void 0 == D && (D = "#000000");
                void 0 == E && (E = "#ffffff");
                void 0 == y && (y = "#ffffff");
                var A = new BABYLON.PBRMaterial("PbrMaterial" + a, this._scene);
                u = new BABYLON.HDRCubeTexture(I, this._scene,
                    512);
                A.reflectionTexture = u;
                A.albedoColor = BABYLON.Color3.FromHexString(z);
                A.emissiveColor = BABYLON.Color3.FromHexString(D);
                A.ambientColor = BABYLON.Color3.FromHexString(E);
                A.reflectivityColor = BABYLON.Color3.FromHexString(y);
                A.microSurface = b;
                A.directIntensity = d;
                A.environmentIntensity = q;
                A.ambientTextureStrength = e;
                A.useAlphaFromAlbedoTexture = f;
                A.cameraExposure = m;
                A.cameraContrast = x;
                A.specularIntensity = h;
                A.emissiveIntensity = k;
                A.useMicroSurfaceFromReflectivityMapAlpha = !1;
                A.useSpecularOverAlpha = !1;
                A.albedoTexture =
                    g;
                A.ambientTexture = t;
                A.bumpTexture = l;
                A.microSurfaceTexture = r;
                A.emissiveTexture = p;
                A.metallicTexture = C;
                J && (A.refractionTexture = u, A.alpha = K, A.indexOfRefraction = L);
                A.reflectivityTexture = n;
                this._scene.meshes.filter(function (b) {
                    -1 < b.name.indexOf(a) && (b.material = A, c._meshesMaterialBJ[b.id] = A);
                    return !0
                });
                return A
            };
            b.prototype.changeTextureDiffuse = function (a, b) {
                var c = this,
                    d = new BABYLON.Texture(b, this._scene);
                this._scene.meshes.filter(function (b) {
                    -1 < b.name.indexOf(a) && null != b.material && b.material instanceof
                    BABYLON.StandardMaterial && (b.material.diffuseTexture = d, c._meshesMaterialBJ[b.id] = b.material);
                    return !0
                })
            };
            b.prototype.addEffectGlossyShiny = function (a, b, d, e, f, h) {
                var c = this;
                void 0 === b && (b = 1);
                void 0 === d && (d = .7);
                void 0 === e && (e = new BABYLON.Color3(1, 1, 1));
                void 0 === f && (f = 20);
                void 0 === h && (h = !0);
                var g = new BABYLON.PBRMaterial("texturereflexion", this._scene);
                g.albedoColor = e;
                g.alpha = b;
                g.reflectivityColor = new BABYLON.Color3(d, d, d);
                g.microSurface = f;
                g.usePhysicalLightFalloff = !1;
                this._scene.meshes.filter(function (b) {
                    -1 <
                        b.name.indexOf(a) && (b.material = g, h ? c._meshesMaterialTeia[b.id] = g : (c._meshesMaterialTeia[b.id] = g, c._meshesMaterialBJ[b.id] = g));
                    return !0
                })
            };
            b.prototype.addEffectStandardMaterial = function (a, b, d, e) {
                var c = this;
                void 0 === b && (b = 1);
                void 0 === d && (d = new BABYLON.Color3(1, 1, 1));
                void 0 === e && (e = !0);
                var g = new BABYLON.StandardMaterial("stdMat" + a, this._scene);
                g.diffuseColor = d;
                g.alpha = b;
                this._scene.meshes.filter(function (b) {
                    -1 < b.name.indexOf(a) && (b.material = g, e ? c._meshesMaterialTeia[b.id] = g : (c._meshesMaterialTeia[b.id] =
                        g, c._meshesMaterialBJ[b.id] = g));
                    return !0
                })
            };
            b.prototype.getPositionByTags = function (a) {
                void 0 === a && (a = "");
                var b = [];
                this.freeze(!1);
                a = this.getMeshesByTag(a).meshes;
                for (var c = 0; c < a.length; c++) {
                    var d = new m;
                    d.id = a[c].id;
                    d.objectId = a[c].objectId;
                    d.name = a[c].name;
                    d.x = a[c].absolutePosition.x;
                    d.y = a[c].absolutePosition.y;
                    d.z = a[c].absolutePosition.z;
                    b.push(d)
                }
                this.unfreeze();
                return JSON.stringify(b)
            };
            b.prototype.vueZoom = function (a, b) {
                var c = this;
                "" != a && (-1 === a && this._activeViewport.activeCamera.cameraType ===
                    BABYLON.TeiaJSAddons.CameraTypes.ArcRotateCamera ? this._activeViewport.activeCamera.zoomOn(null) : (this._smartScene._addObjectToSelection(a, !0, null, !0), setTimeout(function () {
                        c.zoomOnSelectedObjects()
                    }, 10), b && this._showInfoBox()))
            };
            b.prototype.vueZoomByTag = function (a, b) {
                var c = this;
                a = this.getMeshesByTag(a).meshes;
                0 < a.length && (this._smartScene._clearObjectsSelection(), a.forEach(function (a) {
                        c._smartScene._addObjectToSelection(a.objectId, !1, null, !1)
                    }), setTimeout(function () {
                        c.zoomOnSelectedObjects()
                    }, 10),
                    b && this._showInfoBox())
            };
            b.prototype._generateTreeView = function (b) {
                this._smartSceneTreeView = new k.SmartSceneTreeView(this, this._smartScene, this.viewerContainer, b);
                b.smartSceneTreeView = this._smartSceneTreeView;
                a.Utilities.Event.on(this._smartSceneTreeView, Teia.gui.TreeView.NODE_DB_CLICKED_EVENT, $.proxy(this._onDbClickedNode, this))
            };
            b.prototype._onDbClickedNode = function () {
                this._showInfoBox();
                this.zoomOnSelectedObjects()
            };
            b.prototype._generateSearchBox = function () {};
            b.prototype._showInfoBox = function (a) {
                var b =
                    this;
                void 0 === a && (a = null);
                a = null == a ? this._smartScene.selectedObjectsIds : [a];
                if (void 0 != a) {
                    if (0 !== a.filter(function (a) {
                            return -1 !== b._noInfoboxObjects.indexOf(a)
                        }).length) return;
                    for (var c in a) this._activeViewport.createInfoBox(a[c])
                }
                this._updateSelectionUI(!0)
            };
            b.prototype.enabledCuttingPlane = function () {
                var a = this,
                    b = this;
                this.addButtonGroup("CutPlan-" + this.namespace + "-Container", "uk-link", "Teia-Icons-CutPlan", {}, null, function () {}, "Cutting Plane");
                this.addButtonGroup("ActivateCuttingPlan-" + this.namespace,
                    "uk-link", "Icone-ActivateCuttingPlan", {},
                    function () {
                        b._cuttingPlane || (b._cuttingPlane = new k.CuttingPlane(a));
                        b._cuttingPlane && (b._cuttingPlane.isEnabled() ? (b._cuttingPlane.disabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").removeClass("deactivate")) : (b._cuttingPlane.enabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").addClass("deactivate")))
                    }, null, "Activate cutting plan", "CutPlan-" + this.namespace + "-Container");
                this.addButtonGroup("RotatePlan-" +
                    this.namespace, "uk-link", "Icone-RotateCuttingPlan", {},
                    function () {
                        b._cuttingPlane || (b._cuttingPlane = new k.CuttingPlane(a));
                        b._cuttingPlane && (b._cuttingPlane.isEnabled() || (b._cuttingPlane.enabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").addClass("deactivate")), b._cuttingPlane.enableRotation())
                    }, null, "Rotate cutting Plan", "CutPlan-" + this.namespace + "-Container");
                this.addButtonGroup("ScalingPlan-" + this.namespace, "uk-link", "Icone-ScalingCuttingPlan", {}, function () {
                    b._cuttingPlane ||
                        (b._cuttingPlane = new k.CuttingPlane(a));
                    b._cuttingPlane && (b._cuttingPlane.isEnabled() || (b._cuttingPlane.enabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").addClass("deactivate")), b._cuttingPlane.enableScaling())
                }, null, "Scaling cutting Plan", "CutPlan-" + this.namespace + "-Container");
                this.addButtonGroup("MovePlan-" + this.namespace, "uk-link", "Icone-MoveCuttingPlan", {}, function () {
                    b._cuttingPlane || (b._cuttingPlane = new k.CuttingPlane(a));
                    b._cuttingPlane && (b._cuttingPlane.isEnabled() ||
                        (b._cuttingPlane.enabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").addClass("deactivate")), b._cuttingPlane.enableTranslation())
                }, null, "Move cutting Plan", "CutPlan-" + this.namespace + "-Container");
                this.addButtonGroup("ReinitPlan-" + this.namespace, "uk-link", "Icone-InitCuttingPlan", {}, function () {
                    b._cuttingPlane || (b._cuttingPlane = new k.CuttingPlane(a));
                    b._cuttingPlane && (b._cuttingPlane.isEnabled() || (b._cuttingPlane.enabled(), $("#ActivateCuttingPlan-" + a.namespace + " i.Icone-ActivateCuttingPlan").addClass("deactivate")),
                        b._cuttingPlane.RestartCuttingPlan())
                }, null, "Restart cutting Plan", "CutPlan-" + this.namespace + "-Container")
            };
            b.prototype._generateStereographToolbar = function () {
                var b = this;
                this._viewportsControlOptions.showTitle && $(".teiaContainer ").append('<div class="outerBadgeTeia" > <h5 class="badgeTeia ' + (this._viewportsControlOptions.showMenuBar ? "" : " noMenuBar ") + " position-" + this._viewportsControlOptions.menuBarPosition + ' uk-badge" >' + $(".zone-content header h1").html() + " </h5></div>");
                this.addButtonGroup("id-Teia-Logo" +
                    this.namespace, "uk-link", "Teia-Icons-Teia ", {}, null, null, "Teia V" + this._viewportsControlOptions.versionTeia + " <br/> Version WebGL : " + this._engine.webGLVersion + " <br/> Nombre d'objets : " + this._scene.meshes.length);
                this.addButtonGroup("AlertSignalR" + this.namespace, "uk-link", "Teia-Icons-Wi-Fi Teia-Icons-Wi-Fi-Reconnect", {}, null, function () {
                    var c = {
                        0: "connecting",
                        1: "connected",
                        2: "reconnecting",
                        4: "disconnected"
                    };
                    $("#AlertSignalR" + b.namespace).attr("Title", "SignalR: " + c[a.Utilities.SignalR._hub.state]);
                    $("#AlertSignalR" + b.namespace).attr("data-uk-tooltip", "");
                    a.Utilities.SignalR.addstateChangedHandler(function () {
                        if (1 == a.Utilities.SignalR._hub.state) {
                            $("#AlertSignalR" + b.namespace + " .Teia-Icons-Wi-Fi").removeClass("Teia-Icons-Wi-Fi-Reconnect").removeClass("Teia-Icons-Wi-Fi-Slow").removeClass("Teia-Icons-Wi-Fi-Connecting");
                            for (var d = Object.keys(a.Utilities.SignalR._callbacks.values), e = "", f = 0; f < d.length; f++) e += "</br>        -" + d[f];
                            $("#AlertSignalR" + b.namespace).attr("Title", "SignalR: " + c[a.Utilities.SignalR._hub.state] +
                                "</br>Callback:" + e)
                        } else 2 == a.Utilities.SignalR.State ? ($("#AlertSignalR" + b.namespace + " .Teia-Icons-Wi-Fi").addClass("Teia-Icons-Wi-Fi-Reconnect").removeClass("Teia-Icons-Wi-Fi-Slow").removeClass("Teia-Icons-Wi-Fi-Connecting"), $("#AlertSignalR" + b.namespace).attr("Title", "SignalR: " + c[a.Utilities.SignalR._hub.state])) : 0 == a.Utilities.SignalR.State ? ($("#AlertSignalR" + b.namespace + " .Teia-Icons-Wi-Fi").addClass("Teia-Icons-Wi-Fi-Connecting").removeClass("Teia-Icons-Wi-Fi-Reconnect").removeClass("Teia-Icons-Wi-Fi-Slow"),
                            $("#AlertSignalR" + b.namespace).attr("Title", "SignalR: " + c[a.Utilities.SignalR._hub.state])) : 4 == a.Utilities.SignalR.State && ($("#AlertSignalR" + b.namespace + " .Teia-Icons-Wi-Fi").addClass("Teia-Icons-Wi-Fi-Reconnect").removeClass("Teia-Icons-Wi-Fi-Slow").removeClass("Teia-Icons-Wi-Fi-Connecting"), $("#AlertSignalR" + b.namespace).attr("Title", "SignalR: " + c[a.Utilities.SignalR._hub.state]), a.Utilities.SignalR._hub.start())
                    })
                });
                this.addButtonGroupSeparator();
                this._viewportsControlOptions.showHomeView && this.addButtonGroup("id-stereograph-menu" +
                    this.namespace + "-Home", "uk-link", "Teia-Icons-Home", {},
                    function () {
                        b._unHideAll();
                        b.vueZoom(-1)
                    }, null, "Home View");
                this._viewportsControlOptions.generateTreeView && this._generateTreeView(this._searchManager);
                this._viewportsControlOptions.screenshotShortcut && this.addButtonGroup("id-stereograph-menu" + this.namespace + "-Screenshot", "uk-link", "Teia-Icons-Screenshot", {}, function () {
                    b.screenshot()
                }, null, "Screenshot");
                this._viewportsControlOptions.rotateTranslateShortcut && this.addButtonGroup("id-stereograph-menu" +
                    this.namespace + "-Rotate-translate", "uk-link", "Teia-Icons-Translate", {},
                    function () {
                        b.eventTranslate = !b.eventTranslate;
                        b.eventTranslate ? $(".Teia-Icons-Translate").addClass("Teia-Icons-3D-Rotate") : $(".Teia-Icons-Translate").removeClass("Teia-Icons-3D-Rotate")
                    }, null, "Rotate / Translate");
                this._viewportsControlOptions.showInfoboxShortcut && this.addButtonGroup("id-stereograph-menu" + this.namespace + "-InfoBox", "uk-link", "Teia-Icons-About", {}, function () {
                    b._showInfoBox()
                }, null, "InfoBox");
                this._viewportsControlOptions.zoomOnObjectShortcut &&
                    this.addButtonGroup("id-stereograph-menu" + this.namespace + "-Zoom", "uk-link", "Teia-Icons-Zoom-In", {}, function () {
                        b.zoomOnSelectedObjects()
                    }, null, "Zoom on Object");
                this._viewportsControlOptions.switchRenderModeShortcut && (this.addButtonGroup("Type-Rendu-" + this.namespace + "-Container", "uk-link", "Teia-Icons-Type-Rendu", {}, null, null, "Render Mode"), this.addButtonGroup("Mesh-Xray-" + this.namespace, "uk-link", "Teia-Icons-Mesh-Xray", {}, function () {
                    b.switchWireFrame(!1);
                    b.switchModeRendu(!0);
                    $("#Type-Rendu-" + b.namespace +
                        "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-WireFrame");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Texture");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").addClass("Teia-Icons-Mesh-Xray")
                }, null, "Xray", "Type-Rendu-" + this.namespace + "-Container"), this.addButtonGroup("Mesh-Texture-" + this.namespace, "uk-link", "Teia-Icons-Mesh-Texture", {}, function () {
                    b.switchWireFrame(!1);
                    b.switchModeRendu(!1);
                    $("#Type-Rendu-" +
                        b.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-WireFrame");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Xray");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").addClass("Teia-Icons-Mesh-Texture")
                }, null, "Textured", "Type-Rendu-" + this.namespace + "-Container"), this.addButtonGroup("Mesh-WireFrame-" + this.namespace, "uk-link", "Teia-Icons-Mesh-WireFrame", {}, function () {
                    b.switchModeRendu(!1);
                    b.switchWireFrame(!0);
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").addClass("Teia-Icons-Mesh-WireFrame");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Xray");
                    $("#Type-Rendu-" + b.namespace + "-Container  .Teia-Icons-Type-Rendu").removeClass("Teia-Icons-Mesh-Texture")
                }, null, "WireFrame", "Type-Rendu-" + this.namespace + "-Container"));
                this._viewportsControlOptions.switchCameraShortcut && (this.addButtonGroup("Camera-All-" + this.namespace + "-Container", "uk-link",
                    "Teia-Icons-All-Camera", {}, null, null, "Switch Camera"), this.addButtonGroup("Satellite-View-" + this.namespace, "uk-link", "Teia-Icons-Satellite-View", {}, function () {
                    b.switchArcRotateCamera();
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View");
                    $("#Camera-All-" +
                        b.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Satellite-View")
                }, null, "Orbital", "Camera-All-" + this.namespace + "-Container"), this.addButtonGroup("Street-View-" + this.namespace, "uk-link", "Teia-Icons-Street-View", {}, function () {
                    b.switchUniversalCamera();
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View");
                    $("#Camera-All-" + b.namespace +
                        "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Street-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View")
                }, null, "First Person", "Camera-All-" + this.namespace + "-Container"), this.addButtonGroup("Virtual-View-" + this.namespace, "uk-link", "Teia-Icons-Virtual-View", {}, function () {
                    b.switchJoystickCamera();
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-WebVR");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-Virtual-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View")
                }, null, "Virtual joystick", "Camera-All-" + this.namespace + "-Container"), this.addButtonGroup("WebVR-View-" + this.namespace, "uk-link", "Teia-Icons-WebVR", {}, function () {
                    b.switchWebVRCamera();
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").addClass("Teia-Icons-WebVR");
                    $("#Camera-All-" +
                        b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Virtual-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Street-View");
                    $("#Camera-All-" + b.namespace + "-Container .Teia-Icons-All-Camera").removeClass("Teia-Icons-Satellite-View")
                }, null, "Web VR", "Camera-All-" + this.namespace + "-Container"));
                this._viewportsControlOptions.cuttingPlan && this.enabledCuttingPlane();
                this._viewportsControlOptions.infoHelp && this.addButtonGroup("id-stereograph-menu" +
                    this.namespace + "-InfoHelp", "uk-link", "Teia-Icons-Help", {},
                    function () {
                        UIkit.modal("#infoHelp").show()
                    },
                    function () {}, "Help");
                this.addButtonGroupSeparator()
            };
            return b
        }(k.ModuleBase);
        d.ADDING_VIEWPORT_EVENT = "addingviewport";
        d.ADDED_VIEWPORT_EVENT = "addedviewport";
        d.REMOVING_VIEWPORT_EVENT = "removingviewport";
        d.REMOVED_VIEWPORT_EVENT = "removedviewport";
        d.CLEARING_VIEWPORTS_EVENT = "clearingviewport";
        d.CLEARED_VIEWPORTS_EVENT = "clearedviewport";
        d.CLICKED_OBJECT_EVENT = "clickobject";
        d.DOUBLE_CLICKED_OBJECT_EVENT =
            "dblclickobject";
        d.OBJECT_VISIBLE_STATE_CHANGED_EVENT = "objectVisibleStateChanged";
        d.OBJECT_GOTTEN_FROM_TEIA_SERVER = "objectGottenFromTeiaServer";
        d.MESHES_NOT_FOUND = "meshNotFound";
        d.SCENE_LOADED_EVENT = "sceneloaded";
        d.ARC_ROTATE_CAMERA = 0;
        d.ARC_ROTATE_CAMERA_OPTIMIED = 1;
        d.FREE_CAMERA = 2;
        d.UNIVERSAL_CAMERA = 3;
        d.VIRTUALJOYSTICKS_CAMERA = 4;
        k.ViewportsControl = d
    })(a.Modules_ || (a.Modules_ = {}))
})(TeiaJS || (TeiaJS = {}));
(function (a) {
    (function (k) {
        var m = function (a) {
            function b() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(b, a);
            b.wrapText = function (a, b, d, e, f, h) {
                b = b.split(" ");
                for (var c = "", g = 0, k = 0; k < b.length; k++) {
                    var l = c + b[k] + " ";
                    a.measureText(l).width > f && 0 < k ? (a.fillText(c, d, e), c = b[k] + " ", e += h, g++) : c = l
                }
                a.fillText(c, d, e);
                return g
            };
            b.isNumber = function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            };
            b.compareArrays = function (a, d) {
                if (!a || !d || a.length != d.length) return !1;
                for (var c in a)
                    if (a[c] instanceof Array && d[c] instanceof Array) {
                        if (!b.compareArrays(a[c], d[c])) return !1
                    } else if (a[c] != d[c]) return !1;
                return !0
            };
            b.startsWith = function (a, b, d) {
                if (!a || !b) return !1;
                b = "^" + $.ui.autocomplete.escapeRegex(b);
                return (d ? new RegExp(b, d) : new RegExp(b)).test(a)
            };
            b.makeArray = function (a, b) {
                if (!0 === b || void 0 !== a && null != a) return Array.isArray(a) ? a : [a]
            };
            b.invertHex = function (a) {
                if (7 != a.length) return console.error("Hex color must be # + six hex numbers in length."), a;
                a = a.toUpperCase().substr(1, 6);
                a = a.split("");
                var b = "",
                    c = "FEDCBA9876".split(""),
                    d = [];
                d.A = "5";
                d.B = "4";
                d.C = "3";
                d.D = "2";
                d.E = "1";
                d.F = "0";
                for (var e = 0; 6 > e; e++)
                    if (isNaN(a[e]))
                        if (d[a[e]]) b += d[a[e]];
                        else return console.error("Hex colors must only include hex numbers 0-9, and A-F"), "";
                else b += c[a[e]];
                return "#" + b
            };
            b.RgbToHex = function (a) {
                return "#" + ("0" + parseInt((255 * a.r).toString(), 10).toString(16)).slice(-2) + ("0" + parseInt((255 * a.g).toString(), 10).toString(16)).slice(-2) + ("0" + parseInt((255 * a.b).toString(), 10).toString(16)).slice(-2)
            };
            b.hexToRgb = function (a) {
                a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    function (a, b, c, d) {
                        return b + b + c + c + d + d
                    });
                return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? new BABYLON.Color3(parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)) : null
            };
            b.fromEulerToQuaternion = function (a, b, d) {
                var c = Math.cos(a / 2),
                    e = Math.cos(b / 2),
                    f = Math.cos(d / 2);
                a = Math.sin(a / 2);
                b = Math.sin(b / 2);
                d = Math.sin(d / 2);
                return new BABYLON.Quaternion(a * e * f + c * b * d, c * b * f - a * e * d, c * e * d + a * b * f, c * e * f - a * b * d)
            };
            b.fromDegreesToRadians = function (a) {
                return a * Math.PI / 180
            };
            b.fromRadiansToDegrees = function (a) {
                return 180 *
                    a / Math.PI
            };
            b.NavigatorIsIE = function () {
                return 0 < navigator.userAgent.indexOf("MSIE") || 0 < navigator.appVersion.indexOf("Trident/") ? !0 : !1
            };
            return b
        }(a.Type);
        k.Helpers = m;
        var h = function (a) {
            function b() {
                var c = a.call(this) || this;
                c._value = CryptoJS.SHA1(b._lastId).toString();
                b._lastId = c._value;
                return c
            }
            __extends(b, a);
            b.prototype.getValue = function () {
                return this._value
            };
            return b
        }(a.Type);
        h._lastId = "_" + Math.random().toString(36).substr(2, 9);
        k.UniqueId = h;
        var f = function (d) {
            function b() {
                var a = null !== d && d.apply(this,
                    arguments) || this;
                a._set = {};
                a._count = 0;
                return a
            }
            __extends(b, d);
            Object.defineProperty(b.prototype, "values", {
                get: function () {
                    return this._set
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(b.prototype, "count", {
                get: function () {
                    return this._count
                },
                enumerable: !0,
                configurable: !0
            });
            b.prototype.add = function (c, d, e) {
                a.Utilities.Event.fire(this, b.ADDING_EVENT, d, c);
                var f = !1;
                if (!d) {
                    if (this.contains(c)) {
                        a.Utilities.Event.fire(this, b.ADDING_ERRROR_EVENT, d, c);
                        a.Utilities.Event.fire(this, b.ADD_COMPLETE_EVENT,
                            d, c);
                        return
                    }
                    f = !0
                } else if (void 0 !== this.getUniqueObject(d)) {
                    if (!e) {
                        a.Utilities.Event.fire(this, b.ADDING_ERRROR_EVENT, d, c);
                        a.Utilities.Event.fire(this, b.ADD_COMPLETE_EVENT, d, c);
                        return
                    }
                    f = !0
                }
                f && (d = (new h).getValue());
                this._set[d] = c;
                a.Utilities.Event.fire(this, b.ADDED_EVENT, d, c);
                a.Utilities.Event.fire(this, b.ADD_COMPLETE_EVENT, d, c);
                this._count++;
                return d
            };
            b.prototype.remove = function (c) {
                a.Utilities.Event.fire(this, b.REMOVING_EVENT, c);
                var d = this.getUniqueObject(c);
                if (void 0 === d) return a.Utilities.Event.fire(this,
                    b.REMOVING_ERRROR_EVENT, c), a.Utilities.Event.fire(this, b.REMOVE_COMPLETE_EVENT, c), !1;
                delete this._set[c];
                a.Utilities.Event.fire(this, b.REMOVED_EVENT, c, d);
                a.Utilities.Event.fire(this, b.REMOVE_COMPLETE_EVENT, c);
                this._count--;
                return !0
            };
            b.prototype.clear = function () {
                for (var a in this._set) this.remove(a);
                this._count = 0
            };
            b.prototype.getUniqueObject = function (a) {
                return this._set[a]
            };
            b.prototype.setUniqueObject = function (c, d) {
                a.Utilities.Event.fire(this, b.SETTING_EVENT, c, d);
                if (void 0 === d || void 0 === this.getUniqueObject(c)) return a.Utilities.Event.fire(this,
                    b.SETTING_ERROR_EVENT, c, d), a.Utilities.Event.fire(this, b.SET_COMPLETE_EVENT, c, d), !1;
                this._set[c] = d;
                a.Utilities.Event.fire(this, b.SET_EVENT, c, d);
                a.Utilities.Event.fire(this, b.SET_COMPLETE_EVENT, c, d);
                return !0
            };
            b.prototype.contains = function (a) {
                if (void 0 === a) return !1;
                for (var b in this._set)
                    if (this._set[b] === a) return !0;
                return !1
            };
            return b
        }(a.Type);
        f.ADDING_EVENT = "adding";
        f.ADDED_EVENT = "added";
        f.ADDING_ERRROR_EVENT = "addingError";
        f.ADD_COMPLETE_EVENT = "addComplete";
        f.REMOVING_EVENT = "removing";
        f.REMOVED_EVENT =
            "removed";
        f.REMOVING_ERRROR_EVENT = "removingError";
        f.REMOVE_COMPLETE_EVENT = "removeComplete";
        f.SETTING_EVENT = "setting";
        f.SET_EVENT = "set";
        f.SETTING_ERROR_EVENT = "settingError";
        f.SET_COMPLETE_EVENT = "setComplete";
        k.Set = f;
        m = function (a) {
            function b() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(b, a);
            b.fire = function (a, b) {
                for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
                d = [];
                for (var e in c) d.push(c[e]);
                $(a).trigger(b, d)
            };
            b.on = function (a, b, d) {
                $(a).on(b, d)
            };
            b.off = function (a, b, d) {
                $(a).off(b,
                    d)
            };
            return b
        }(a.Type);
        k.Event = m;
        m = function () {
            function d(a, c) {
                this._doActuatorsEvents = [];
                this._enabled = !0;
                this._doCallback = c ? $.proxy(a, c) : a
            }
            d.prototype._register = function (b, c) {
                var d = this,
                    e = [];
                e.push(b);
                for (var f in c) e.push(c[f]);
                this._doActuatorsEvents.push(e);
                if (this._enabled)
                    for (f in c) a.Utilities.Event.on(b.getDomObject(), c[f], function (a) {
                        d._doCallback(a, b)
                    })
            };
            d.prototype.registerActuator = function (a, c, d) {
                throw Error("Abstract method override it !");
            };
            d.prototype.enable = function () {
                var b = this;
                if (!this._enabled) {
                    this._enabled = !0;
                    for (var c in this._doActuatorsEvents) {
                        var d = this._doActuatorsEvents[c],
                            e = d[0];
                        e.enable();
                        d = d.slice(1, d.length);
                        for (var f in d) a.Utilities.Event.on(e.getDomObject(), d[f], $.proxy(function (a) {
                            b._doCallback(a, b)
                        }, e))
                    }
                    this._enableInternal()
                }
            };
            d.prototype.disable = function () {
                if (this._enabled) {
                    this._enabled = !1;
                    for (var b in this._doActuatorsEvents) {
                        var c = this._doActuatorsEvents[b],
                            d = c[0];
                        d.disable();
                        c = c.slice(1, c.length);
                        for (var e in c) a.Utilities.Event.off(d.getDomObject(), c[b])
                    }
                    this._disableInternal()
                }
            };
            d.prototype._enableInternal = function () {
                throw Error("Abstract method override it !");
            };
            d.prototype._disableInternal = function () {
                throw Error("Abstract method override it !");
            };
            return d
        }();
        k.ActionBase = m;
        var d = function (a) {
            function b() {
                return null !== a && a.apply(this, arguments) || this
            }
            __extends(b, a);
            b.prototype.register = function (a, b) {
                this._register(a, b)
            };
            b.prototype.registerActuator = function (a, b) {
                this._register(a, b)
            };
            b.prototype._enableInternal = function () {};
            b.prototype._disableInternal = function () {};
            return b
        }(m);
        k.Action = d;
        m = function (d) {
            function b(a, b, e) {
                a = d.call(this, a, e) || this;
                a._stopDoActuatorsEvents = [];
                if (e) return a._stopDoCallback = $.proxy(b, e), a;
                a._stopDoCallback = b;
                return a
            }
            __extends(b, d);
            b.prototype.register = function (b, d, e) {
                var c = this;
                this._register(b, d);
                d = [];
                d.push(b);
                for (var f in e) d.push(e[f]);
                this._stopDoActuatorsEvents.push(d);
                if (this._enabled)
                    for (f in e) a.Utilities.Event.on(b.getDomObject(), e[f], function (a) {
                        c._stopDoCallback(a, b)
                    })
            };
            b.prototype.registerActuator = function (a, b, d) {
                if (!d || 0 == d.lenght) throw Error("Register not done ! Missing parameters !");
                this.register(a, b, d[0]);
                if (1 < d.length) throw Error("Register done, but too much parameters !");
            };
            b.prototype._enableInternal = function () {
                var b = this,
                    d;
                for (d in this._stopDoActuatorsEvents) {
                    var e = this._stopDoActuatorsEvents[d],
                        f = e[0];
                    f.enable();
                    e = e.slice(1, e.length);
                    for (var h in e) a.Utilities.Event.on(f.getDomObject(), e[h], function (a) {
                        b._stopDoCallback(a, f)
                    })
                }
            };
            b.prototype._disableInternal = function () {
                for (var b in this._stopDoActuatorsEvents) {
                    var d = this._stopDoActuatorsEvents[b],
                        e = d[0];
                    e.disable();
                    d = d.slice(1,
                        d.length);
                    for (var f in d) a.Utilities.Event.off(e.getDomObject(), d[b])
                }
            };
            return b
        }(m);
        k.StartStopAction = m;
        m = function () {
            function a() {}
            a.Post = function (b, c, d) {
                void 0 === d && (d = "application/json");
                return a._Ajax(b, c, d, "POST")
            };
            a.Get = function (b, c, d) {
                void 0 === d && (d = "application/json");
                return a._Ajax(b, c, d, "GET")
            };
            a.Put = function (b, c, d) {
                void 0 === d && (d = "application/json");
                return a._Ajax(b, c, d, "PUT")
            };
            a.Delete = function (b, c, d) {
                void 0 === d && (d = "application/json");
                return a._Ajax(b, c, d, "DELETE")
            };
            a._Ajax = function (a,
                c, d, e) {
                return $.ajax({
                    url: a,
                    contentType: d,
                    type: e,
                    data: c
                })
            };
            return a
        }();
        k.Request = m;
        m = function (a) {
            function b() {
                return a.call(this) || this
            }
            __extends(b, a);
            Object.defineProperty(b, "State", {
                get: function () {
                    return b._hub.state
                },
                enumerable: !0,
                configurable: !0
            });
            b.addstateChangedHandler = function (a) {
                b._stateChangedHandlers.push(a)
            };
            b.addDisconnectedHandler = function (a) {
                b._disconnectedHandlers.push(a)
            };
            b.addConnectionSlowHandler = function (a) {
                b._connectionSlowHandlers.push(a)
            };
            b.addStartingHandler = function (a) {
                b._startingHandlers.push(a)
            };
            b.addReceivedHandler = function (a) {
                b._receivedHandlers.push(a)
            };
            Object.defineProperty(b, "sceneId", {
                set: function (a) {
                    b._sceneId = a
                },
                enumerable: !0,
                configurable: !0
            });
            b._init = function () {
                void 0 === b._hubStatus && (b._hubStatus = $.connection.hub.start(), b._hub = $.connection.hub, b._notificationHub || (b._notificationHub = $.connection.notificationHub), b._notificationHub.client.sendNotification = b._onSignalREvent, b._callbacks = new f, b._hub.disconnected(b._onDisconnected), b._hub.connectionSlow(b._onConnectionSlow), b._hub.starting(b._onStarting),
                    b._hub.received(b._onReceived), b._hub.stateChanged(b._onstateChanged))
            };
            b._onDisconnected = function () {
                for (var a = 0, d = b._disconnectedHandlers; a < d.length; a++)(0, d[a])()
            };
            b._onConnectionSlow = function () {
                for (var a = 0, d = b._connectionSlowHandlers; a < d.length; a++)(0, d[a])()
            };
            b._onStarting = function () {
                for (var a = 0, d = b._startingHandlers; a < d.length; a++)(0, d[a])()
            };
            b._onReceived = function () {
                for (var a = 0, d = b._receivedHandlers; a < d.length; a++)(0, d[a])()
            };
            b._onstateChanged = function () {
                for (var a = 0, d = b._stateChangedHandlers; a <
                    d.length; a++)(0, d[a])()
            };
            b.addSignalRCallback = function (a, d) {
                b._init();
                var c = b._callbacks.getUniqueObject(a);
                c || (b._callbacks.add([], a), c = b._callbacks.getUniqueObject(a));
                c.push(d)
            };
            b.setTeiaJSReady = function () {
                for (; 0 < b._eventCallbacks.length;) {
                    var a = b._eventCallbacks.shift();
                    a.callback.apply(null, a.args)
                }
                b._teiaJSReady = !0
            };
            b._onSignalREvent = function (a, d) {
                for (var c = [], e = 2; e < arguments.length; e++) c[e - 2] = arguments[e];
                if (!b._sceneId || "0" == d || b._sceneId == d) {
                    e = b._callbacks.getUniqueObject(a);
                    for (var f in e) b._teiaJSReady ?
                        e[f].apply(null, c) : b._eventCallbacks.push({
                            callback: e[f],
                            args: c
                        })
                }
            };
            b.dispose = function () {
                b._callbacks.clear();
                b._connectionSlowHandlers.length = 0;
                b._disconnectedHandlers.length = 0;
                b._receivedHandlers.length = 0;
                b._startingHandlers.length = 0;
                b._hubStatus = $.connection.hub.stop()
            };
            return b
        }(a.Type);
        m._callbacks = new f;
        m._eventCallbacks = [];
        m._teiaJSReady = !1;
        m._disconnectedHandlers = [];
        m._connectionSlowHandlers = [];
        m._startingHandlers = [];
        m._receivedHandlers = [];
        m._stateChangedHandlers = [];
        k.SignalR = m
    })(a.Utilities ||
        (a.Utilities = {}))
})(TeiaJS || (TeiaJS = {}));