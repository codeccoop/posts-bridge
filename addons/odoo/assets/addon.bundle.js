(() => {
  var rB = Object.create;
  var Ks = Object.defineProperty;
  var dB = Object.getOwnPropertyDescriptor;
  var uB = Object.getOwnPropertyNames;
  var iB = Object.getPrototypeOf,
    aB = Object.prototype.hasOwnProperty;
  var ZG = (e, t) => () => (e && (t = e((e = 0))), t);
  var lt = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t), t.exports
    ),
    _s = (e, t) => {
      for (var c in t) Ks(e, c, { get: t[c], enumerable: !0 });
    },
    sB = (e, t, c, l) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let n of uB(t))
          !aB.call(e, n) &&
            n !== c &&
            Ks(e, n, {
              get: () => t[n],
              enumerable: !(l = dB(t, n)) || l.enumerable,
            });
      return e;
    };
  var C = (e, t, c) => (
    (c = e != null ? rB(iB(e)) : {}),
    sB(
      t || !e || !e.__esModule
        ? Ks(c, "default", { value: e, enumerable: !0 })
        : c,
      e
    )
  );
  var JG = lt((le) => {
    "use strict";
    var zr = Symbol.for("react.element"),
      bB = Symbol.for("react.portal"),
      mB = Symbol.for("react.fragment"),
      XB = Symbol.for("react.strict_mode"),
      xB = Symbol.for("react.profiler"),
      GB = Symbol.for("react.provider"),
      pB = Symbol.for("react.context"),
      gB = Symbol.for("react.forward_ref"),
      HB = Symbol.for("react.suspense"),
      ZB = Symbol.for("react.memo"),
      RB = Symbol.for("react.lazy"),
      RG = Symbol.iterator;
    function fB(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (RG && e[RG]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var yG = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      WG = Object.assign,
      BG = {};
    function fo(e, t, c) {
      (this.props = e),
        (this.context = t),
        (this.refs = BG),
        (this.updater = c || yG);
    }
    fo.prototype.isReactComponent = {};
    fo.prototype.setState = function (e, t) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    };
    fo.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function vG() {}
    vG.prototype = fo.prototype;
    function $s(e, t, c) {
      (this.props = e),
        (this.context = t),
        (this.refs = BG),
        (this.updater = c || yG);
    }
    var eb = ($s.prototype = new vG());
    eb.constructor = $s;
    WG(eb, fo.prototype);
    eb.isPureReactComponent = !0;
    var fG = Array.isArray,
      FG = Object.prototype.hasOwnProperty,
      tb = { current: null },
      hG = { key: !0, ref: !0, __self: !0, __source: !0 };
    function VG(e, t, c) {
      var l,
        n = {},
        o = null,
        r = null;
      if (t != null)
        for (l in (t.ref !== void 0 && (r = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
          FG.call(t, l) && !hG.hasOwnProperty(l) && (n[l] = t[l]);
      var d = arguments.length - 2;
      if (d === 1) n.children = c;
      else if (1 < d) {
        for (var u = Array(d), i = 0; i < d; i++) u[i] = arguments[i + 2];
        n.children = u;
      }
      if (e && e.defaultProps)
        for (l in ((d = e.defaultProps), d)) n[l] === void 0 && (n[l] = d[l]);
      return {
        $$typeof: zr,
        type: e,
        key: o,
        ref: r,
        props: n,
        _owner: tb.current,
      };
    }
    function IB(e, t) {
      return {
        $$typeof: zr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function cb(e) {
      return typeof e == "object" && e !== null && e.$$typeof === zr;
    }
    function yB(e) {
      var t = { "=": "=0", ":": "=2" };
      return (
        "$" +
        e.replace(/[=:]/g, function (c) {
          return t[c];
        })
      );
    }
    var IG = /\/+/g;
    function qs(e, t) {
      return typeof e == "object" && e !== null && e.key != null
        ? yB("" + e.key)
        : t.toString(36);
    }
    function Lu(e, t, c, l, n) {
      var o = typeof e;
      (o === "undefined" || o === "boolean") && (e = null);
      var r = !1;
      if (e === null) r = !0;
      else
        switch (o) {
          case "string":
          case "number":
            r = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case zr:
              case bB:
                r = !0;
            }
        }
      if (r)
        return (
          (r = e),
          (n = n(r)),
          (e = l === "" ? "." + qs(r, 0) : l),
          fG(n)
            ? ((c = ""),
              e != null && (c = e.replace(IG, "$&/") + "/"),
              Lu(n, t, c, "", function (i) {
                return i;
              }))
            : n != null &&
              (cb(n) &&
                (n = IB(
                  n,
                  c +
                    (!n.key || (r && r.key === n.key)
                      ? ""
                      : ("" + n.key).replace(IG, "$&/") + "/") +
                    e
                )),
              t.push(n)),
          1
        );
      if (((r = 0), (l = l === "" ? "." : l + ":"), fG(e)))
        for (var d = 0; d < e.length; d++) {
          o = e[d];
          var u = l + qs(o, d);
          r += Lu(o, t, c, u, n);
        }
      else if (((u = fB(e)), typeof u == "function"))
        for (e = u.call(e), d = 0; !(o = e.next()).done; )
          (o = o.value), (u = l + qs(o, d++)), (r += Lu(o, t, c, u, n));
      else if (o === "object")
        throw (
          ((t = String(e)),
          Error(
            "Objects are not valid as a React child (found: " +
              (t === "[object Object]"
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : t) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      return r;
    }
    function Au(e, t, c) {
      if (e == null) return e;
      var l = [],
        n = 0;
      return (
        Lu(e, l, "", "", function (o) {
          return t.call(c, o, n++);
        }),
        l
      );
    }
    function WB(e) {
      if (e._status === -1) {
        var t = e._result;
        (t = t()),
          t.then(
            function (c) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = c));
            },
            function (c) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = c));
            }
          ),
          e._status === -1 && ((e._status = 0), (e._result = t));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var Ct = { current: null },
      Tu = { transition: null },
      BB = {
        ReactCurrentDispatcher: Ct,
        ReactCurrentBatchConfig: Tu,
        ReactCurrentOwner: tb,
      };
    function CG() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    le.Children = {
      map: Au,
      forEach: function (e, t, c) {
        Au(
          e,
          function () {
            t.apply(this, arguments);
          },
          c
        );
      },
      count: function (e) {
        var t = 0;
        return (
          Au(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          Au(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!cb(e))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return e;
      },
    };
    le.Component = fo;
    le.Fragment = mB;
    le.Profiler = xB;
    le.PureComponent = $s;
    le.StrictMode = XB;
    le.Suspense = HB;
    le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = BB;
    le.act = CG;
    le.cloneElement = function (e, t, c) {
      if (e == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            "."
        );
      var l = WG({}, e.props),
        n = e.key,
        o = e.ref,
        r = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((o = t.ref), (r = tb.current)),
          t.key !== void 0 && (n = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var d = e.type.defaultProps;
        for (u in t)
          FG.call(t, u) &&
            !hG.hasOwnProperty(u) &&
            (l[u] = t[u] === void 0 && d !== void 0 ? d[u] : t[u]);
      }
      var u = arguments.length - 2;
      if (u === 1) l.children = c;
      else if (1 < u) {
        d = Array(u);
        for (var i = 0; i < u; i++) d[i] = arguments[i + 2];
        l.children = d;
      }
      return {
        $$typeof: zr,
        type: e.type,
        key: n,
        ref: o,
        props: l,
        _owner: r,
      };
    };
    le.createContext = function (e) {
      return (
        (e = {
          $$typeof: pB,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: GB, _context: e }),
        (e.Consumer = e)
      );
    };
    le.createElement = VG;
    le.createFactory = function (e) {
      var t = VG.bind(null, e);
      return (t.type = e), t;
    };
    le.createRef = function () {
      return { current: null };
    };
    le.forwardRef = function (e) {
      return { $$typeof: gB, render: e };
    };
    le.isValidElement = cb;
    le.lazy = function (e) {
      return { $$typeof: RB, _payload: { _status: -1, _result: e }, _init: WB };
    };
    le.memo = function (e, t) {
      return { $$typeof: ZB, type: e, compare: t === void 0 ? null : t };
    };
    le.startTransition = function (e) {
      var t = Tu.transition;
      Tu.transition = {};
      try {
        e();
      } finally {
        Tu.transition = t;
      }
    };
    le.unstable_act = CG;
    le.useCallback = function (e, t) {
      return Ct.current.useCallback(e, t);
    };
    le.useContext = function (e) {
      return Ct.current.useContext(e);
    };
    le.useDebugValue = function () {};
    le.useDeferredValue = function (e) {
      return Ct.current.useDeferredValue(e);
    };
    le.useEffect = function (e, t) {
      return Ct.current.useEffect(e, t);
    };
    le.useId = function () {
      return Ct.current.useId();
    };
    le.useImperativeHandle = function (e, t, c) {
      return Ct.current.useImperativeHandle(e, t, c);
    };
    le.useInsertionEffect = function (e, t) {
      return Ct.current.useInsertionEffect(e, t);
    };
    le.useLayoutEffect = function (e, t) {
      return Ct.current.useLayoutEffect(e, t);
    };
    le.useMemo = function (e, t) {
      return Ct.current.useMemo(e, t);
    };
    le.useReducer = function (e, t, c) {
      return Ct.current.useReducer(e, t, c);
    };
    le.useRef = function (e) {
      return Ct.current.useRef(e);
    };
    le.useState = function (e) {
      return Ct.current.useState(e);
    };
    le.useSyncExternalStore = function (e, t, c) {
      return Ct.current.useSyncExternalStore(e, t, c);
    };
    le.useTransition = function () {
      return Ct.current.useTransition();
    };
    le.version = "18.3.1";
  });
  var A = lt((pC, YG) => {
    "use strict";
    YG.exports = JG();
  });
  var TG = lt((Re) => {
    "use strict";
    function rb(e, t) {
      var c = e.length;
      e.push(t);
      e: for (; 0 < c; ) {
        var l = (c - 1) >>> 1,
          n = e[l];
        if (0 < Du(n, t)) (e[l] = t), (e[c] = n), (c = l);
        else break e;
      }
    }
    function Yc(e) {
      return e.length === 0 ? null : e[0];
    }
    function Mu(e) {
      if (e.length === 0) return null;
      var t = e[0],
        c = e.pop();
      if (c !== t) {
        e[0] = c;
        e: for (var l = 0, n = e.length, o = n >>> 1; l < o; ) {
          var r = 2 * (l + 1) - 1,
            d = e[r],
            u = r + 1,
            i = e[u];
          if (0 > Du(d, c))
            u < n && 0 > Du(i, d)
              ? ((e[l] = i), (e[u] = c), (l = u))
              : ((e[l] = d), (e[r] = c), (l = r));
          else if (u < n && 0 > Du(i, c)) (e[l] = i), (e[u] = c), (l = u);
          else break e;
        }
      }
      return t;
    }
    function Du(e, t) {
      var c = e.sortIndex - t.sortIndex;
      return c !== 0 ? c : e.id - t.id;
    }
    typeof performance == "object" && typeof performance.now == "function"
      ? ((NG = performance),
        (Re.unstable_now = function () {
          return NG.now();
        }))
      : ((lb = Date),
        (zG = lb.now()),
        (Re.unstable_now = function () {
          return lb.now() - zG;
        }));
    var NG,
      lb,
      zG,
      _c = [],
      Ul = [],
      vB = 1,
      Gc = null,
      ft = 3,
      Eu = !1,
      Jn = !1,
      wr = !1,
      SG = typeof setTimeout == "function" ? setTimeout : null,
      OG = typeof clearTimeout == "function" ? clearTimeout : null,
      kG = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function db(e) {
      for (var t = Yc(Ul); t !== null; ) {
        if (t.callback === null) Mu(Ul);
        else if (t.startTime <= e)
          Mu(Ul), (t.sortIndex = t.expirationTime), rb(_c, t);
        else break;
        t = Yc(Ul);
      }
    }
    function ub(e) {
      if (((wr = !1), db(e), !Jn))
        if (Yc(_c) !== null) (Jn = !0), ab(ib);
        else {
          var t = Yc(Ul);
          t !== null && sb(ub, t.startTime - e);
        }
    }
    function ib(e, t) {
      (Jn = !1), wr && ((wr = !1), OG(Sr), (Sr = -1)), (Eu = !0);
      var c = ft;
      try {
        for (
          db(t), Gc = Yc(_c);
          Gc !== null && (!(Gc.expirationTime > t) || (e && !LG()));

        ) {
          var l = Gc.callback;
          if (typeof l == "function") {
            (Gc.callback = null), (ft = Gc.priorityLevel);
            var n = l(Gc.expirationTime <= t);
            (t = Re.unstable_now()),
              typeof n == "function"
                ? (Gc.callback = n)
                : Gc === Yc(_c) && Mu(_c),
              db(t);
          } else Mu(_c);
          Gc = Yc(_c);
        }
        if (Gc !== null) var o = !0;
        else {
          var r = Yc(Ul);
          r !== null && sb(ub, r.startTime - t), (o = !1);
        }
        return o;
      } finally {
        (Gc = null), (ft = c), (Eu = !1);
      }
    }
    var ju = !1,
      Uu = null,
      Sr = -1,
      QG = 5,
      AG = -1;
    function LG() {
      return !(Re.unstable_now() - AG < QG);
    }
    function nb() {
      if (Uu !== null) {
        var e = Re.unstable_now();
        AG = e;
        var t = !0;
        try {
          t = Uu(!0, e);
        } finally {
          t ? kr() : ((ju = !1), (Uu = null));
        }
      } else ju = !1;
    }
    var kr;
    typeof kG == "function"
      ? (kr = function () {
          kG(nb);
        })
      : typeof MessageChannel < "u"
        ? ((ob = new MessageChannel()),
          (wG = ob.port2),
          (ob.port1.onmessage = nb),
          (kr = function () {
            wG.postMessage(null);
          }))
        : (kr = function () {
            SG(nb, 0);
          });
    var ob, wG;
    function ab(e) {
      (Uu = e), ju || ((ju = !0), kr());
    }
    function sb(e, t) {
      Sr = SG(function () {
        e(Re.unstable_now());
      }, t);
    }
    Re.unstable_IdlePriority = 5;
    Re.unstable_ImmediatePriority = 1;
    Re.unstable_LowPriority = 4;
    Re.unstable_NormalPriority = 3;
    Re.unstable_Profiling = null;
    Re.unstable_UserBlockingPriority = 2;
    Re.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    Re.unstable_continueExecution = function () {
      Jn || Eu || ((Jn = !0), ab(ib));
    };
    Re.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (QG = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    Re.unstable_getCurrentPriorityLevel = function () {
      return ft;
    };
    Re.unstable_getFirstCallbackNode = function () {
      return Yc(_c);
    };
    Re.unstable_next = function (e) {
      switch (ft) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = ft;
      }
      var c = ft;
      ft = t;
      try {
        return e();
      } finally {
        ft = c;
      }
    };
    Re.unstable_pauseExecution = function () {};
    Re.unstable_requestPaint = function () {};
    Re.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var c = ft;
      ft = e;
      try {
        return t();
      } finally {
        ft = c;
      }
    };
    Re.unstable_scheduleCallback = function (e, t, c) {
      var l = Re.unstable_now();
      switch (
        (typeof c == "object" && c !== null
          ? ((c = c.delay), (c = typeof c == "number" && 0 < c ? l + c : l))
          : (c = l),
        e)
      ) {
        case 1:
          var n = -1;
          break;
        case 2:
          n = 250;
          break;
        case 5:
          n = 1073741823;
          break;
        case 4:
          n = 1e4;
          break;
        default:
          n = 5e3;
      }
      return (
        (n = c + n),
        (e = {
          id: vB++,
          callback: t,
          priorityLevel: e,
          startTime: c,
          expirationTime: n,
          sortIndex: -1,
        }),
        c > l
          ? ((e.sortIndex = c),
            rb(Ul, e),
            Yc(_c) === null &&
              e === Yc(Ul) &&
              (wr ? (OG(Sr), (Sr = -1)) : (wr = !0), sb(ub, c - l)))
          : ((e.sortIndex = n), rb(_c, e), Jn || Eu || ((Jn = !0), ab(ib))),
        e
      );
    };
    Re.unstable_shouldYield = LG;
    Re.unstable_wrapCallback = function (e) {
      var t = ft;
      return function () {
        var c = ft;
        ft = t;
        try {
          return e.apply(this, arguments);
        } finally {
          ft = c;
        }
      };
    };
  });
  var UG = lt((ZC, DG) => {
    "use strict";
    DG.exports = TG();
  });
  var KH = lt((dc) => {
    "use strict";
    var FB = A(),
      oc = UG();
    function z(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          c = 1;
        c < arguments.length;
        c++
      )
        t += "&args[]=" + encodeURIComponent(arguments[c]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var $p = new Set(),
      rd = {};
    function Un(e, t) {
      To(e, t), To(e + "Capture", t);
    }
    function To(e, t) {
      for (rd[e] = t, e = 0; e < t.length; e++) $p.add(t[e]);
    }
    var fl = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Nb = Object.prototype.hasOwnProperty,
      hB =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      MG = {},
      EG = {};
    function VB(e) {
      return Nb.call(EG, e)
        ? !0
        : Nb.call(MG, e)
          ? !1
          : hB.test(e)
            ? (EG[e] = !0)
            : ((MG[e] = !0), !1);
    }
    function CB(e, t, c, l) {
      if (c !== null && c.type === 0) return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return l
            ? !1
            : c !== null
              ? !c.acceptsBooleans
              : ((e = e.toLowerCase().slice(0, 5)),
                e !== "data-" && e !== "aria-");
        default:
          return !1;
      }
    }
    function JB(e, t, c, l) {
      if (t === null || typeof t > "u" || CB(e, t, c, l)) return !0;
      if (l) return !1;
      if (c !== null)
        switch (c.type) {
          case 3:
            return !t;
          case 4:
            return t === !1;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function Nt(e, t, c, l, n, o, r) {
      (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = l),
        (this.attributeNamespace = n),
        (this.mustUseProperty = c),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = r);
    }
    var Xt = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        Xt[e] = new Nt(e, 0, !1, e, null, !1, !1);
      });
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      Xt[t] = new Nt(t, 1, !1, e[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        Xt[e] = new Nt(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }
    );
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      Xt[e] = new Nt(e, 2, !1, e, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        Xt[e] = new Nt(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      Xt[e] = new Nt(e, 3, !0, e, null, !1, !1);
    });
    ["capture", "download"].forEach(function (e) {
      Xt[e] = new Nt(e, 4, !1, e, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function (e) {
      Xt[e] = new Nt(e, 6, !1, e, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function (e) {
      Xt[e] = new Nt(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Bm = /[\-:]([a-z])/g;
    function vm(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Bm, vm);
        Xt[t] = new Nt(t, 1, !1, e, null, !1, !1);
      });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Bm, vm);
        Xt[t] = new Nt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      });
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(Bm, vm);
      Xt[t] = new Nt(
        t,
        1,
        !1,
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        !1
      );
    });
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      Xt[e] = new Nt(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    Xt.xlinkHref = new Nt(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    );
    ["src", "href", "action", "formAction"].forEach(function (e) {
      Xt[e] = new Nt(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Fm(e, t, c, l) {
      var n = Xt.hasOwnProperty(t) ? Xt[t] : null;
      (n !== null
        ? n.type !== 0
        : l ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (JB(t, c, n, l) && (c = null),
        l || n === null
          ? VB(t) &&
            (c === null ? e.removeAttribute(t) : e.setAttribute(t, "" + c))
          : n.mustUseProperty
            ? (e[n.propertyName] = c === null ? (n.type === 3 ? !1 : "") : c)
            : ((t = n.attributeName),
              (l = n.attributeNamespace),
              c === null
                ? e.removeAttribute(t)
                : ((n = n.type),
                  (c = n === 3 || (n === 4 && c === !0) ? "" : "" + c),
                  l ? e.setAttributeNS(l, t, c) : e.setAttribute(t, c))));
    }
    var Bl = FB.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Pu = Symbol.for("react.element"),
      Wo = Symbol.for("react.portal"),
      Bo = Symbol.for("react.fragment"),
      hm = Symbol.for("react.strict_mode"),
      zb = Symbol.for("react.profiler"),
      eg = Symbol.for("react.provider"),
      tg = Symbol.for("react.context"),
      Vm = Symbol.for("react.forward_ref"),
      kb = Symbol.for("react.suspense"),
      wb = Symbol.for("react.suspense_list"),
      Cm = Symbol.for("react.memo"),
      El = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var cg = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.cache");
    Symbol.for("react.tracing_marker");
    var jG = Symbol.iterator;
    function Or(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (jG && e[jG]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var ke = Object.assign,
      bb;
    function Er(e) {
      if (bb === void 0)
        try {
          throw Error();
        } catch (c) {
          var t = c.stack.trim().match(/\n( *(at )?)/);
          bb = (t && t[1]) || "";
        }
      return (
        `
` +
        bb +
        e
      );
    }
    var mb = !1;
    function Xb(e, t) {
      if (!e || mb) return "";
      mb = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t)
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, "props", {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == "object" && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (i) {
              var l = i;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (i) {
              l = i;
            }
            e.call(t.prototype);
          }
        else {
          try {
            throw Error();
          } catch (i) {
            l = i;
          }
          e();
        }
      } catch (i) {
        if (i && l && typeof i.stack == "string") {
          for (
            var n = i.stack.split(`
`),
              o = l.stack.split(`
`),
              r = n.length - 1,
              d = o.length - 1;
            1 <= r && 0 <= d && n[r] !== o[d];

          )
            d--;
          for (; 1 <= r && 0 <= d; r--, d--)
            if (n[r] !== o[d]) {
              if (r !== 1 || d !== 1)
                do
                  if ((r--, d--, 0 > d || n[r] !== o[d])) {
                    var u =
                      `
` + n[r].replace(" at new ", " at ");
                    return (
                      e.displayName &&
                        u.includes("<anonymous>") &&
                        (u = u.replace("<anonymous>", e.displayName)),
                      u
                    );
                  }
                while (1 <= r && 0 <= d);
              break;
            }
        }
      } finally {
        (mb = !1), (Error.prepareStackTrace = c);
      }
      return (e = e ? e.displayName || e.name : "") ? Er(e) : "";
    }
    function YB(e) {
      switch (e.tag) {
        case 5:
          return Er(e.type);
        case 16:
          return Er("Lazy");
        case 13:
          return Er("Suspense");
        case 19:
          return Er("SuspenseList");
        case 0:
        case 2:
        case 15:
          return (e = Xb(e.type, !1)), e;
        case 11:
          return (e = Xb(e.type.render, !1)), e;
        case 1:
          return (e = Xb(e.type, !0)), e;
        default:
          return "";
      }
    }
    function Sb(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Bo:
          return "Fragment";
        case Wo:
          return "Portal";
        case zb:
          return "Profiler";
        case hm:
          return "StrictMode";
        case kb:
          return "Suspense";
        case wb:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case tg:
            return (e.displayName || "Context") + ".Consumer";
          case eg:
            return (e._context.displayName || "Context") + ".Provider";
          case Vm:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ""),
                (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
              e
            );
          case Cm:
            return (
              (t = e.displayName || null), t !== null ? t : Sb(e.type) || "Memo"
            );
          case El:
            (t = e._payload), (e = e._init);
            try {
              return Sb(e(t));
            } catch {}
        }
      return null;
    }
    function NB(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return "Cache";
        case 9:
          return (t.displayName || "Context") + ".Consumer";
        case 10:
          return (t._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ""),
            t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
          );
        case 7:
          return "Fragment";
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Sb(t);
        case 8:
          return t === hm ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == "function") return t.displayName || t.name || null;
          if (typeof t == "string") return t;
      }
      return null;
    }
    function dn(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function lg(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
      );
    }
    function zB(e) {
      var t = lg(e) ? "checked" : "value",
        c = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        l = "" + e[t];
      if (
        !e.hasOwnProperty(t) &&
        typeof c < "u" &&
        typeof c.get == "function" &&
        typeof c.set == "function"
      ) {
        var n = c.get,
          o = c.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return n.call(this);
            },
            set: function (r) {
              (l = "" + r), o.call(this, r);
            },
          }),
          Object.defineProperty(e, t, { enumerable: c.enumerable }),
          {
            getValue: function () {
              return l;
            },
            setValue: function (r) {
              l = "" + r;
            },
            stopTracking: function () {
              (e._valueTracker = null), delete e[t];
            },
          }
        );
      }
    }
    function Ku(e) {
      e._valueTracker || (e._valueTracker = zB(e));
    }
    function ng(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var c = t.getValue(),
        l = "";
      return (
        e && (l = lg(e) ? (e.checked ? "true" : "false") : e.value),
        (e = l),
        e !== c ? (t.setValue(e), !0) : !1
      );
    }
    function yi(e) {
      if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function Ob(e, t) {
      var c = t.checked;
      return ke({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: c ?? e._wrapperState.initialChecked,
      });
    }
    function PG(e, t) {
      var c = t.defaultValue == null ? "" : t.defaultValue,
        l = t.checked != null ? t.checked : t.defaultChecked;
      (c = dn(t.value != null ? t.value : c)),
        (e._wrapperState = {
          initialChecked: l,
          initialValue: c,
          controlled:
            t.type === "checkbox" || t.type === "radio"
              ? t.checked != null
              : t.value != null,
        });
    }
    function og(e, t) {
      (t = t.checked), t != null && Fm(e, "checked", t, !1);
    }
    function Qb(e, t) {
      og(e, t);
      var c = dn(t.value),
        l = t.type;
      if (c != null)
        l === "number"
          ? ((c === 0 && e.value === "") || e.value != c) && (e.value = "" + c)
          : e.value !== "" + c && (e.value = "" + c);
      else if (l === "submit" || l === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value")
        ? Ab(e, t.type, c)
        : t.hasOwnProperty("defaultValue") && Ab(e, t.type, dn(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function KG(e, t, c) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var l = t.type;
        if (
          !(
            (l !== "submit" && l !== "reset") ||
            (t.value !== void 0 && t.value !== null)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          c || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      (c = e.name),
        c !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        c !== "" && (e.name = c);
    }
    function Ab(e, t, c) {
      (t !== "number" || yi(e.ownerDocument) !== e) &&
        (c == null
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + c && (e.defaultValue = "" + c));
    }
    var jr = Array.isArray;
    function wo(e, t, c, l) {
      if (((e = e.options), t)) {
        t = {};
        for (var n = 0; n < c.length; n++) t["$" + c[n]] = !0;
        for (c = 0; c < e.length; c++)
          (n = t.hasOwnProperty("$" + e[c].value)),
            e[c].selected !== n && (e[c].selected = n),
            n && l && (e[c].defaultSelected = !0);
      } else {
        for (c = "" + dn(c), t = null, n = 0; n < e.length; n++) {
          if (e[n].value === c) {
            (e[n].selected = !0), l && (e[n].defaultSelected = !0);
            return;
          }
          t !== null || e[n].disabled || (t = e[n]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Lb(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(z(91));
      return ke({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function _G(e, t) {
      var c = t.value;
      if (c == null) {
        if (((c = t.children), (t = t.defaultValue), c != null)) {
          if (t != null) throw Error(z(92));
          if (jr(c)) {
            if (1 < c.length) throw Error(z(93));
            c = c[0];
          }
          t = c;
        }
        t == null && (t = ""), (c = t);
      }
      e._wrapperState = { initialValue: dn(c) };
    }
    function rg(e, t) {
      var c = dn(t.value),
        l = dn(t.defaultValue);
      c != null &&
        ((c = "" + c),
        c !== e.value && (e.value = c),
        t.defaultValue == null && e.defaultValue !== c && (e.defaultValue = c)),
        l != null && (e.defaultValue = "" + l);
    }
    function qG(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
    }
    function dg(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Tb(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml"
        ? dg(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
          ? "http://www.w3.org/1999/xhtml"
          : e;
    }
    var _u,
      ug = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
          ? function (t, c, l, n) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, c, l, n);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
          e.innerHTML = t;
        else {
          for (
            _u = _u || document.createElement("div"),
              _u.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
              t = _u.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function dd(e, t) {
      if (t) {
        var c = e.firstChild;
        if (c && c === e.lastChild && c.nodeType === 3) {
          c.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var _r = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      kB = ["Webkit", "ms", "Moz", "O"];
    Object.keys(_r).forEach(function (e) {
      kB.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (_r[t] = _r[e]);
      });
    });
    function ig(e, t, c) {
      return t == null || typeof t == "boolean" || t === ""
        ? ""
        : c ||
            typeof t != "number" ||
            t === 0 ||
            (_r.hasOwnProperty(e) && _r[e])
          ? ("" + t).trim()
          : t + "px";
    }
    function ag(e, t) {
      e = e.style;
      for (var c in t)
        if (t.hasOwnProperty(c)) {
          var l = c.indexOf("--") === 0,
            n = ig(c, t[c], l);
          c === "float" && (c = "cssFloat"),
            l ? e.setProperty(c, n) : (e[c] = n);
        }
    }
    var wB = ke(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function Db(e, t) {
      if (t) {
        if (wB[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(z(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(z(60));
          if (
            typeof t.dangerouslySetInnerHTML != "object" ||
            !("__html" in t.dangerouslySetInnerHTML)
          )
            throw Error(z(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(z(62));
      }
    }
    function Ub(e, t) {
      if (e.indexOf("-") === -1) return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Mb = null;
    function Jm(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Eb = null,
      So = null,
      Oo = null;
    function $G(e) {
      if ((e = Wd(e))) {
        if (typeof Eb != "function") throw Error(z(280));
        var t = e.stateNode;
        t && ((t = qi(t)), Eb(e.stateNode, e.type, t));
      }
    }
    function sg(e) {
      So ? (Oo ? Oo.push(e) : (Oo = [e])) : (So = e);
    }
    function bg() {
      if (So) {
        var e = So,
          t = Oo;
        if (((Oo = So = null), $G(e), t))
          for (e = 0; e < t.length; e++) $G(t[e]);
      }
    }
    function mg(e, t) {
      return e(t);
    }
    function Xg() {}
    var xb = !1;
    function xg(e, t, c) {
      if (xb) return e(t, c);
      xb = !0;
      try {
        return mg(e, t, c);
      } finally {
        (xb = !1), (So !== null || Oo !== null) && (Xg(), bg());
      }
    }
    function ud(e, t) {
      var c = e.stateNode;
      if (c === null) return null;
      var l = qi(c);
      if (l === null) return null;
      c = l[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (l = !l.disabled) ||
            ((e = e.type),
            (l = !(
              e === "button" ||
              e === "input" ||
              e === "select" ||
              e === "textarea"
            ))),
            (e = !l);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (c && typeof c != "function") throw Error(z(231, t, typeof c));
      return c;
    }
    var jb = !1;
    if (fl)
      try {
        (Io = {}),
          Object.defineProperty(Io, "passive", {
            get: function () {
              jb = !0;
            },
          }),
          window.addEventListener("test", Io, Io),
          window.removeEventListener("test", Io, Io);
      } catch {
        jb = !1;
      }
    var Io;
    function SB(e, t, c, l, n, o, r, d, u) {
      var i = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(c, i);
      } catch (a) {
        this.onError(a);
      }
    }
    var qr = !1,
      Wi = null,
      Bi = !1,
      Pb = null,
      OB = {
        onError: function (e) {
          (qr = !0), (Wi = e);
        },
      };
    function QB(e, t, c, l, n, o, r, d, u) {
      (qr = !1), (Wi = null), SB.apply(OB, arguments);
    }
    function AB(e, t, c, l, n, o, r, d, u) {
      if ((QB.apply(this, arguments), qr)) {
        if (qr) {
          var i = Wi;
          (qr = !1), (Wi = null);
        } else throw Error(z(198));
        Bi || ((Bi = !0), (Pb = i));
      }
    }
    function Mn(e) {
      var t = e,
        c = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do (t = e), t.flags & 4098 && (c = t.return), (e = t.return);
        while (e);
      }
      return t.tag === 3 ? c : null;
    }
    function Gg(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function ep(e) {
      if (Mn(e) !== e) throw Error(z(188));
    }
    function LB(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = Mn(e)), t === null)) throw Error(z(188));
        return t !== e ? null : e;
      }
      for (var c = e, l = t; ; ) {
        var n = c.return;
        if (n === null) break;
        var o = n.alternate;
        if (o === null) {
          if (((l = n.return), l !== null)) {
            c = l;
            continue;
          }
          break;
        }
        if (n.child === o.child) {
          for (o = n.child; o; ) {
            if (o === c) return ep(n), e;
            if (o === l) return ep(n), t;
            o = o.sibling;
          }
          throw Error(z(188));
        }
        if (c.return !== l.return) (c = n), (l = o);
        else {
          for (var r = !1, d = n.child; d; ) {
            if (d === c) {
              (r = !0), (c = n), (l = o);
              break;
            }
            if (d === l) {
              (r = !0), (l = n), (c = o);
              break;
            }
            d = d.sibling;
          }
          if (!r) {
            for (d = o.child; d; ) {
              if (d === c) {
                (r = !0), (c = o), (l = n);
                break;
              }
              if (d === l) {
                (r = !0), (l = o), (c = n);
                break;
              }
              d = d.sibling;
            }
            if (!r) throw Error(z(189));
          }
        }
        if (c.alternate !== l) throw Error(z(190));
      }
      if (c.tag !== 3) throw Error(z(188));
      return c.stateNode.current === c ? e : t;
    }
    function pg(e) {
      return (e = LB(e)), e !== null ? gg(e) : null;
    }
    function gg(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = gg(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Hg = oc.unstable_scheduleCallback,
      tp = oc.unstable_cancelCallback,
      TB = oc.unstable_shouldYield,
      DB = oc.unstable_requestPaint,
      Te = oc.unstable_now,
      UB = oc.unstable_getCurrentPriorityLevel,
      Ym = oc.unstable_ImmediatePriority,
      Zg = oc.unstable_UserBlockingPriority,
      vi = oc.unstable_NormalPriority,
      MB = oc.unstable_LowPriority,
      Rg = oc.unstable_IdlePriority,
      ji = null,
      tl = null;
    function EB(e) {
      if (tl && typeof tl.onCommitFiberRoot == "function")
        try {
          tl.onCommitFiberRoot(ji, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var Sc = Math.clz32 ? Math.clz32 : KB,
      jB = Math.log,
      PB = Math.LN2;
    function KB(e) {
      return (e >>>= 0), e === 0 ? 32 : (31 - ((jB(e) / PB) | 0)) | 0;
    }
    var qu = 64,
      $u = 4194304;
    function Pr(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function Fi(e, t) {
      var c = e.pendingLanes;
      if (c === 0) return 0;
      var l = 0,
        n = e.suspendedLanes,
        o = e.pingedLanes,
        r = c & 268435455;
      if (r !== 0) {
        var d = r & ~n;
        d !== 0 ? (l = Pr(d)) : ((o &= r), o !== 0 && (l = Pr(o)));
      } else (r = c & ~n), r !== 0 ? (l = Pr(r)) : o !== 0 && (l = Pr(o));
      if (l === 0) return 0;
      if (
        t !== 0 &&
        t !== l &&
        !(t & n) &&
        ((n = l & -l),
        (o = t & -t),
        n >= o || (n === 16 && (o & 4194240) !== 0))
      )
        return t;
      if ((l & 4 && (l |= c & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= l; 0 < t; )
          (c = 31 - Sc(t)), (n = 1 << c), (l |= e[c]), (t &= ~n);
      return l;
    }
    function _B(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function qB(e, t) {
      for (
        var c = e.suspendedLanes,
          l = e.pingedLanes,
          n = e.expirationTimes,
          o = e.pendingLanes;
        0 < o;

      ) {
        var r = 31 - Sc(o),
          d = 1 << r,
          u = n[r];
        u === -1
          ? (!(d & c) || d & l) && (n[r] = _B(d, t))
          : u <= t && (e.expiredLanes |= d),
          (o &= ~d);
      }
    }
    function Kb(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function fg() {
      var e = qu;
      return (qu <<= 1), !(qu & 4194240) && (qu = 64), e;
    }
    function Gb(e) {
      for (var t = [], c = 0; 31 > c; c++) t.push(e);
      return t;
    }
    function Id(e, t, c) {
      (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Sc(t)),
        (e[t] = c);
    }
    function $B(e, t) {
      var c = e.pendingLanes & ~t;
      (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
      var l = e.eventTimes;
      for (e = e.expirationTimes; 0 < c; ) {
        var n = 31 - Sc(c),
          o = 1 << n;
        (t[n] = 0), (l[n] = -1), (e[n] = -1), (c &= ~o);
      }
    }
    function Nm(e, t) {
      var c = (e.entangledLanes |= t);
      for (e = e.entanglements; c; ) {
        var l = 31 - Sc(c),
          n = 1 << l;
        (n & t) | (e[l] & t) && (e[l] |= t), (c &= ~n);
      }
    }
    var me = 0;
    function Ig(e) {
      return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var yg,
      zm,
      Wg,
      Bg,
      vg,
      _b = !1,
      ei = [],
      $l = null,
      en = null,
      tn = null,
      id = new Map(),
      ad = new Map(),
      Pl = [],
      e5 =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
          " "
        );
    function cp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          $l = null;
          break;
        case "dragenter":
        case "dragleave":
          en = null;
          break;
        case "mouseover":
        case "mouseout":
          tn = null;
          break;
        case "pointerover":
        case "pointerout":
          id.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ad.delete(t.pointerId);
      }
    }
    function Qr(e, t, c, l, n, o) {
      return e === null || e.nativeEvent !== o
        ? ((e = {
            blockedOn: t,
            domEventName: c,
            eventSystemFlags: l,
            nativeEvent: o,
            targetContainers: [n],
          }),
          t !== null && ((t = Wd(t)), t !== null && zm(t)),
          e)
        : ((e.eventSystemFlags |= l),
          (t = e.targetContainers),
          n !== null && t.indexOf(n) === -1 && t.push(n),
          e);
    }
    function t5(e, t, c, l, n) {
      switch (t) {
        case "focusin":
          return ($l = Qr($l, e, t, c, l, n)), !0;
        case "dragenter":
          return (en = Qr(en, e, t, c, l, n)), !0;
        case "mouseover":
          return (tn = Qr(tn, e, t, c, l, n)), !0;
        case "pointerover":
          var o = n.pointerId;
          return id.set(o, Qr(id.get(o) || null, e, t, c, l, n)), !0;
        case "gotpointercapture":
          return (
            (o = n.pointerId),
            ad.set(o, Qr(ad.get(o) || null, e, t, c, l, n)),
            !0
          );
      }
      return !1;
    }
    function Fg(e) {
      var t = zn(e.target);
      if (t !== null) {
        var c = Mn(t);
        if (c !== null) {
          if (((t = c.tag), t === 13)) {
            if (((t = Gg(c)), t !== null)) {
              (e.blockedOn = t),
                vg(e.priority, function () {
                  Wg(c);
                });
              return;
            }
          } else if (
            t === 3 &&
            c.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Xi(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var c = qb(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (c === null) {
          c = e.nativeEvent;
          var l = new c.constructor(c.type, c);
          (Mb = l), c.target.dispatchEvent(l), (Mb = null);
        } else return (t = Wd(c)), t !== null && zm(t), (e.blockedOn = c), !1;
        t.shift();
      }
      return !0;
    }
    function lp(e, t, c) {
      Xi(e) && c.delete(t);
    }
    function c5() {
      (_b = !1),
        $l !== null && Xi($l) && ($l = null),
        en !== null && Xi(en) && (en = null),
        tn !== null && Xi(tn) && (tn = null),
        id.forEach(lp),
        ad.forEach(lp);
    }
    function Ar(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        _b ||
          ((_b = !0),
          oc.unstable_scheduleCallback(oc.unstable_NormalPriority, c5)));
    }
    function sd(e) {
      function t(n) {
        return Ar(n, e);
      }
      if (0 < ei.length) {
        Ar(ei[0], e);
        for (var c = 1; c < ei.length; c++) {
          var l = ei[c];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      for (
        $l !== null && Ar($l, e),
          en !== null && Ar(en, e),
          tn !== null && Ar(tn, e),
          id.forEach(t),
          ad.forEach(t),
          c = 0;
        c < Pl.length;
        c++
      )
        (l = Pl[c]), l.blockedOn === e && (l.blockedOn = null);
      for (; 0 < Pl.length && ((c = Pl[0]), c.blockedOn === null); )
        Fg(c), c.blockedOn === null && Pl.shift();
    }
    var Qo = Bl.ReactCurrentBatchConfig,
      hi = !0;
    function l5(e, t, c, l) {
      var n = me,
        o = Qo.transition;
      Qo.transition = null;
      try {
        (me = 1), km(e, t, c, l);
      } finally {
        (me = n), (Qo.transition = o);
      }
    }
    function n5(e, t, c, l) {
      var n = me,
        o = Qo.transition;
      Qo.transition = null;
      try {
        (me = 4), km(e, t, c, l);
      } finally {
        (me = n), (Qo.transition = o);
      }
    }
    function km(e, t, c, l) {
      if (hi) {
        var n = qb(e, t, c, l);
        if (n === null) Ib(e, t, l, Vi, c), cp(e, l);
        else if (t5(n, e, t, c, l)) l.stopPropagation();
        else if ((cp(e, l), t & 4 && -1 < e5.indexOf(e))) {
          for (; n !== null; ) {
            var o = Wd(n);
            if (
              (o !== null && yg(o),
              (o = qb(e, t, c, l)),
              o === null && Ib(e, t, l, Vi, c),
              o === n)
            )
              break;
            n = o;
          }
          n !== null && l.stopPropagation();
        } else Ib(e, t, l, null, c);
      }
    }
    var Vi = null;
    function qb(e, t, c, l) {
      if (((Vi = null), (e = Jm(l)), (e = zn(e)), e !== null))
        if (((t = Mn(e)), t === null)) e = null;
        else if (((c = t.tag), c === 13)) {
          if (((e = Gg(t)), e !== null)) return e;
          e = null;
        } else if (c === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return (Vi = e), null;
    }
    function hg(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (UB()) {
            case Ym:
              return 1;
            case Zg:
              return 4;
            case vi:
            case MB:
              return 16;
            case Rg:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var _l = null,
      wm = null,
      xi = null;
    function Vg() {
      if (xi) return xi;
      var e,
        t = wm,
        c = t.length,
        l,
        n = "value" in _l ? _l.value : _l.textContent,
        o = n.length;
      for (e = 0; e < c && t[e] === n[e]; e++);
      var r = c - e;
      for (l = 1; l <= r && t[c - l] === n[o - l]; l++);
      return (xi = n.slice(e, 1 < l ? 1 - l : void 0));
    }
    function Gi(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function ti() {
      return !0;
    }
    function np() {
      return !1;
    }
    function rc(e) {
      function t(c, l, n, o, r) {
        (this._reactName = c),
          (this._targetInst = n),
          (this.type = l),
          (this.nativeEvent = o),
          (this.target = r),
          (this.currentTarget = null);
        for (var d in e)
          e.hasOwnProperty(d) && ((c = e[d]), (this[d] = c ? c(o) : o[d]));
        return (
          (this.isDefaultPrevented = (
            o.defaultPrevented != null
              ? o.defaultPrevented
              : o.returnValue === !1
          )
            ? ti
            : np),
          (this.isPropagationStopped = np),
          this
        );
      }
      return (
        ke(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var c = this.nativeEvent;
            c &&
              (c.preventDefault
                ? c.preventDefault()
                : typeof c.returnValue != "unknown" && (c.returnValue = !1),
              (this.isDefaultPrevented = ti));
          },
          stopPropagation: function () {
            var c = this.nativeEvent;
            c &&
              (c.stopPropagation
                ? c.stopPropagation()
                : typeof c.cancelBubble != "unknown" && (c.cancelBubble = !0),
              (this.isPropagationStopped = ti));
          },
          persist: function () {},
          isPersistent: ti,
        }),
        t
      );
    }
    var Ko = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Sm = rc(Ko),
      yd = ke({}, Ko, { view: 0, detail: 0 }),
      o5 = rc(yd),
      pb,
      gb,
      Lr,
      Pi = ke({}, yd, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Om,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return "movementX" in e
            ? e.movementX
            : (e !== Lr &&
                (Lr && e.type === "mousemove"
                  ? ((pb = e.screenX - Lr.screenX),
                    (gb = e.screenY - Lr.screenY))
                  : (gb = pb = 0),
                (Lr = e)),
              pb);
        },
        movementY: function (e) {
          return "movementY" in e ? e.movementY : gb;
        },
      }),
      op = rc(Pi),
      r5 = ke({}, Pi, { dataTransfer: 0 }),
      d5 = rc(r5),
      u5 = ke({}, yd, { relatedTarget: 0 }),
      Hb = rc(u5),
      i5 = ke({}, Ko, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      a5 = rc(i5),
      s5 = ke({}, Ko, {
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      b5 = rc(s5),
      m5 = ke({}, Ko, { data: 0 }),
      rp = rc(m5),
      X5 = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      x5 = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      G5 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function p5(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = G5[e])
          ? !!t[e]
          : !1;
    }
    function Om() {
      return p5;
    }
    var g5 = ke({}, yd, {
        key: function (e) {
          if (e.key) {
            var t = X5[e.key] || e.key;
            if (t !== "Unidentified") return t;
          }
          return e.type === "keypress"
            ? ((e = Gi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
            : e.type === "keydown" || e.type === "keyup"
              ? x5[e.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Om,
        charCode: function (e) {
          return e.type === "keypress" ? Gi(e) : 0;
        },
        keyCode: function (e) {
          return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === "keypress"
            ? Gi(e)
            : e.type === "keydown" || e.type === "keyup"
              ? e.keyCode
              : 0;
        },
      }),
      H5 = rc(g5),
      Z5 = ke({}, Pi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      dp = rc(Z5),
      R5 = ke({}, yd, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Om,
      }),
      f5 = rc(R5),
      I5 = ke({}, Ko, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      y5 = rc(I5),
      W5 = ke({}, Pi, {
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
              ? -e.wheelDeltaX
              : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
              ? -e.wheelDeltaY
              : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      B5 = rc(W5),
      v5 = [9, 13, 27, 32],
      Qm = fl && "CompositionEvent" in window,
      $r = null;
    fl && "documentMode" in document && ($r = document.documentMode);
    var F5 = fl && "TextEvent" in window && !$r,
      Cg = fl && (!Qm || ($r && 8 < $r && 11 >= $r)),
      up = " ",
      ip = !1;
    function Jg(e, t) {
      switch (e) {
        case "keyup":
          return v5.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Yg(e) {
      return (
        (e = e.detail), typeof e == "object" && "data" in e ? e.data : null
      );
    }
    var vo = !1;
    function h5(e, t) {
      switch (e) {
        case "compositionend":
          return Yg(t);
        case "keypress":
          return t.which !== 32 ? null : ((ip = !0), up);
        case "textInput":
          return (e = t.data), e === up && ip ? null : e;
        default:
          return null;
      }
    }
    function V5(e, t) {
      if (vo)
        return e === "compositionend" || (!Qm && Jg(e, t))
          ? ((e = Vg()), (xi = wm = _l = null), (vo = !1), e)
          : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Cg && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var C5 = {
      "color": !0,
      "date": !0,
      "datetime": !0,
      "datetime-local": !0,
      "email": !0,
      "month": !0,
      "number": !0,
      "password": !0,
      "range": !0,
      "search": !0,
      "tel": !0,
      "text": !0,
      "time": !0,
      "url": !0,
      "week": !0,
    };
    function ap(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!C5[e.type] : t === "textarea";
    }
    function Ng(e, t, c, l) {
      sg(l),
        (t = Ci(t, "onChange")),
        0 < t.length &&
          ((c = new Sm("onChange", "change", null, c, l)),
          e.push({ event: c, listeners: t }));
    }
    var ed = null,
      bd = null;
    function J5(e) {
      Ug(e, 0);
    }
    function Ki(e) {
      var t = Vo(e);
      if (ng(t)) return e;
    }
    function Y5(e, t) {
      if (e === "change") return t;
    }
    var zg = !1;
    fl &&
      (fl
        ? ((li = "oninput" in document),
          li ||
            ((Zb = document.createElement("div")),
            Zb.setAttribute("oninput", "return;"),
            (li = typeof Zb.oninput == "function")),
          (ci = li))
        : (ci = !1),
      (zg = ci && (!document.documentMode || 9 < document.documentMode)));
    var ci, li, Zb;
    function sp() {
      ed && (ed.detachEvent("onpropertychange", kg), (bd = ed = null));
    }
    function kg(e) {
      if (e.propertyName === "value" && Ki(bd)) {
        var t = [];
        Ng(t, bd, e, Jm(e)), xg(J5, t);
      }
    }
    function N5(e, t, c) {
      e === "focusin"
        ? (sp(), (ed = t), (bd = c), ed.attachEvent("onpropertychange", kg))
        : e === "focusout" && sp();
    }
    function z5(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Ki(bd);
    }
    function k5(e, t) {
      if (e === "click") return Ki(t);
    }
    function w5(e, t) {
      if (e === "input" || e === "change") return Ki(t);
    }
    function S5(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var Qc = typeof Object.is == "function" ? Object.is : S5;
    function md(e, t) {
      if (Qc(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      var c = Object.keys(e),
        l = Object.keys(t);
      if (c.length !== l.length) return !1;
      for (l = 0; l < c.length; l++) {
        var n = c[l];
        if (!Nb.call(t, n) || !Qc(e[n], t[n])) return !1;
      }
      return !0;
    }
    function bp(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function mp(e, t) {
      var c = bp(e);
      e = 0;
      for (var l; c; ) {
        if (c.nodeType === 3) {
          if (((l = e + c.textContent.length), e <= t && l >= t))
            return { node: c, offset: t - e };
          e = l;
        }
        e: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break e;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = bp(c);
      }
    }
    function wg(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? wg(e, t.parentNode)
              : "contains" in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Sg() {
      for (var e = window, t = yi(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var c = typeof t.contentWindow.location.href == "string";
        } catch {
          c = !1;
        }
        if (c) e = t.contentWindow;
        else break;
        t = yi(e.document);
      }
      return t;
    }
    function Am(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === "input" &&
          (e.type === "text" ||
            e.type === "search" ||
            e.type === "tel" ||
            e.type === "url" ||
            e.type === "password")) ||
          t === "textarea" ||
          e.contentEditable === "true")
      );
    }
    function O5(e) {
      var t = Sg(),
        c = e.focusedElem,
        l = e.selectionRange;
      if (
        t !== c &&
        c &&
        c.ownerDocument &&
        wg(c.ownerDocument.documentElement, c)
      ) {
        if (l !== null && Am(c)) {
          if (
            ((t = l.start),
            (e = l.end),
            e === void 0 && (e = t),
            "selectionStart" in c)
          )
            (c.selectionStart = t),
              (c.selectionEnd = Math.min(e, c.value.length));
          else if (
            ((e =
              ((t = c.ownerDocument || document) && t.defaultView) || window),
            e.getSelection)
          ) {
            e = e.getSelection();
            var n = c.textContent.length,
              o = Math.min(l.start, n);
            (l = l.end === void 0 ? o : Math.min(l.end, n)),
              !e.extend && o > l && ((n = l), (l = o), (o = n)),
              (n = mp(c, o));
            var r = mp(c, l);
            n &&
              r &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== n.node ||
                e.anchorOffset !== n.offset ||
                e.focusNode !== r.node ||
                e.focusOffset !== r.offset) &&
              ((t = t.createRange()),
              t.setStart(n.node, n.offset),
              e.removeAllRanges(),
              o > l
                ? (e.addRange(t), e.extend(r.node, r.offset))
                : (t.setEnd(r.node, r.offset), e.addRange(t)));
          }
        }
        for (t = [], e = c; (e = e.parentNode); )
          e.nodeType === 1 &&
            t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
          typeof c.focus == "function" && c.focus(), c = 0;
          c < t.length;
          c++
        )
          (e = t[c]),
            (e.element.scrollLeft = e.left),
            (e.element.scrollTop = e.top);
      }
    }
    var Q5 = fl && "documentMode" in document && 11 >= document.documentMode,
      Fo = null,
      $b = null,
      td = null,
      em = !1;
    function Xp(e, t, c) {
      var l =
        c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
      em ||
        Fo == null ||
        Fo !== yi(l) ||
        ((l = Fo),
        "selectionStart" in l && Am(l)
          ? (l = { start: l.selectionStart, end: l.selectionEnd })
          : ((l = (
              (l.ownerDocument && l.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (l = {
              anchorNode: l.anchorNode,
              anchorOffset: l.anchorOffset,
              focusNode: l.focusNode,
              focusOffset: l.focusOffset,
            })),
        (td && md(td, l)) ||
          ((td = l),
          (l = Ci($b, "onSelect")),
          0 < l.length &&
            ((t = new Sm("onSelect", "select", null, t, c)),
            e.push({ event: t, listeners: l }),
            (t.target = Fo))));
    }
    function ni(e, t) {
      var c = {};
      return (
        (c[e.toLowerCase()] = t.toLowerCase()),
        (c["Webkit" + e] = "webkit" + t),
        (c["Moz" + e] = "moz" + t),
        c
      );
    }
    var ho = {
        animationend: ni("Animation", "AnimationEnd"),
        animationiteration: ni("Animation", "AnimationIteration"),
        animationstart: ni("Animation", "AnimationStart"),
        transitionend: ni("Transition", "TransitionEnd"),
      },
      Rb = {},
      Og = {};
    fl &&
      ((Og = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete ho.animationend.animation,
        delete ho.animationiteration.animation,
        delete ho.animationstart.animation),
      "TransitionEvent" in window || delete ho.transitionend.transition);
    function _i(e) {
      if (Rb[e]) return Rb[e];
      if (!ho[e]) return e;
      var t = ho[e],
        c;
      for (c in t) if (t.hasOwnProperty(c) && c in Og) return (Rb[e] = t[c]);
      return e;
    }
    var Qg = _i("animationend"),
      Ag = _i("animationiteration"),
      Lg = _i("animationstart"),
      Tg = _i("transitionend"),
      Dg = new Map(),
      xp =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " "
        );
    function an(e, t) {
      Dg.set(e, t), Un(t, [e]);
    }
    for (oi = 0; oi < xp.length; oi++)
      (ri = xp[oi]),
        (Gp = ri.toLowerCase()),
        (pp = ri[0].toUpperCase() + ri.slice(1)),
        an(Gp, "on" + pp);
    var ri, Gp, pp, oi;
    an(Qg, "onAnimationEnd");
    an(Ag, "onAnimationIteration");
    an(Lg, "onAnimationStart");
    an("dblclick", "onDoubleClick");
    an("focusin", "onFocus");
    an("focusout", "onBlur");
    an(Tg, "onTransitionEnd");
    To("onMouseEnter", ["mouseout", "mouseover"]);
    To("onMouseLeave", ["mouseout", "mouseover"]);
    To("onPointerEnter", ["pointerout", "pointerover"]);
    To("onPointerLeave", ["pointerout", "pointerover"]);
    Un(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    );
    Un(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    );
    Un("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    Un(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    );
    Un(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    );
    Un(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var Kr =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      A5 = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(Kr)
      );
    function gp(e, t, c) {
      var l = e.type || "unknown-event";
      (e.currentTarget = c), AB(l, t, void 0, e), (e.currentTarget = null);
    }
    function Ug(e, t) {
      t = (t & 4) !== 0;
      for (var c = 0; c < e.length; c++) {
        var l = e[c],
          n = l.event;
        l = l.listeners;
        e: {
          var o = void 0;
          if (t)
            for (var r = l.length - 1; 0 <= r; r--) {
              var d = l[r],
                u = d.instance,
                i = d.currentTarget;
              if (((d = d.listener), u !== o && n.isPropagationStopped()))
                break e;
              gp(n, d, i), (o = u);
            }
          else
            for (r = 0; r < l.length; r++) {
              if (
                ((d = l[r]),
                (u = d.instance),
                (i = d.currentTarget),
                (d = d.listener),
                u !== o && n.isPropagationStopped())
              )
                break e;
              gp(n, d, i), (o = u);
            }
        }
      }
      if (Bi) throw ((e = Pb), (Bi = !1), (Pb = null), e);
    }
    function We(e, t) {
      var c = t[om];
      c === void 0 && (c = t[om] = new Set());
      var l = e + "__bubble";
      c.has(l) || (Mg(t, e, 2, !1), c.add(l));
    }
    function fb(e, t, c) {
      var l = 0;
      t && (l |= 4), Mg(c, e, l, t);
    }
    var di = "_reactListening" + Math.random().toString(36).slice(2);
    function Xd(e) {
      if (!e[di]) {
        (e[di] = !0),
          $p.forEach(function (c) {
            c !== "selectionchange" &&
              (A5.has(c) || fb(c, !1, e), fb(c, !0, e));
          });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[di] || ((t[di] = !0), fb("selectionchange", !1, t));
      }
    }
    function Mg(e, t, c, l) {
      switch (hg(t)) {
        case 1:
          var n = l5;
          break;
        case 4:
          n = n5;
          break;
        default:
          n = km;
      }
      (c = n.bind(null, t, c, e)),
        (n = void 0),
        !jb ||
          (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
          (n = !0),
        l
          ? n !== void 0
            ? e.addEventListener(t, c, { capture: !0, passive: n })
            : e.addEventListener(t, c, !0)
          : n !== void 0
            ? e.addEventListener(t, c, { passive: n })
            : e.addEventListener(t, c, !1);
    }
    function Ib(e, t, c, l, n) {
      var o = l;
      if (!(t & 1) && !(t & 2) && l !== null)
        e: for (;;) {
          if (l === null) return;
          var r = l.tag;
          if (r === 3 || r === 4) {
            var d = l.stateNode.containerInfo;
            if (d === n || (d.nodeType === 8 && d.parentNode === n)) break;
            if (r === 4)
              for (r = l.return; r !== null; ) {
                var u = r.tag;
                if (
                  (u === 3 || u === 4) &&
                  ((u = r.stateNode.containerInfo),
                  u === n || (u.nodeType === 8 && u.parentNode === n))
                )
                  return;
                r = r.return;
              }
            for (; d !== null; ) {
              if (((r = zn(d)), r === null)) return;
              if (((u = r.tag), u === 5 || u === 6)) {
                l = o = r;
                continue e;
              }
              d = d.parentNode;
            }
          }
          l = l.return;
        }
      xg(function () {
        var i = o,
          a = Jm(c),
          s = [];
        e: {
          var b = Dg.get(e);
          if (b !== void 0) {
            var m = Sm,
              x = e;
            switch (e) {
              case "keypress":
                if (Gi(c) === 0) break e;
              case "keydown":
              case "keyup":
                m = H5;
                break;
              case "focusin":
                (x = "focus"), (m = Hb);
                break;
              case "focusout":
                (x = "blur"), (m = Hb);
                break;
              case "beforeblur":
              case "afterblur":
                m = Hb;
                break;
              case "click":
                if (c.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                m = op;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                m = d5;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                m = f5;
                break;
              case Qg:
              case Ag:
              case Lg:
                m = a5;
                break;
              case Tg:
                m = y5;
                break;
              case "scroll":
                m = o5;
                break;
              case "wheel":
                m = B5;
                break;
              case "copy":
              case "cut":
              case "paste":
                m = b5;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                m = dp;
            }
            var p = (t & 4) !== 0,
              R = !p && e === "scroll",
              X = p ? (b !== null ? b + "Capture" : null) : b;
            p = [];
            for (var G = i, g; G !== null; ) {
              g = G;
              var H = g.stateNode;
              if (
                (g.tag === 5 &&
                  H !== null &&
                  ((g = H),
                  X !== null &&
                    ((H = ud(G, X)), H != null && p.push(xd(G, H, g)))),
                R)
              )
                break;
              G = G.return;
            }
            0 < p.length &&
              ((b = new m(b, x, null, c, a)),
              s.push({ event: b, listeners: p }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (
              ((b = e === "mouseover" || e === "pointerover"),
              (m = e === "mouseout" || e === "pointerout"),
              b &&
                c !== Mb &&
                (x = c.relatedTarget || c.fromElement) &&
                (zn(x) || x[Il]))
            )
              break e;
            if (
              (m || b) &&
              ((b =
                a.window === a
                  ? a
                  : (b = a.ownerDocument)
                    ? b.defaultView || b.parentWindow
                    : window),
              m
                ? ((x = c.relatedTarget || c.toElement),
                  (m = i),
                  (x = x ? zn(x) : null),
                  x !== null &&
                    ((R = Mn(x)), x !== R || (x.tag !== 5 && x.tag !== 6)) &&
                    (x = null))
                : ((m = null), (x = i)),
              m !== x)
            ) {
              if (
                ((p = op),
                (H = "onMouseLeave"),
                (X = "onMouseEnter"),
                (G = "mouse"),
                (e === "pointerout" || e === "pointerover") &&
                  ((p = dp),
                  (H = "onPointerLeave"),
                  (X = "onPointerEnter"),
                  (G = "pointer")),
                (R = m == null ? b : Vo(m)),
                (g = x == null ? b : Vo(x)),
                (b = new p(H, G + "leave", m, c, a)),
                (b.target = R),
                (b.relatedTarget = g),
                (H = null),
                zn(a) === i &&
                  ((p = new p(X, G + "enter", x, c, a)),
                  (p.target = g),
                  (p.relatedTarget = R),
                  (H = p)),
                (R = H),
                m && x)
              )
                t: {
                  for (p = m, X = x, G = 0, g = p; g; g = yo(g)) G++;
                  for (g = 0, H = X; H; H = yo(H)) g++;
                  for (; 0 < G - g; ) (p = yo(p)), G--;
                  for (; 0 < g - G; ) (X = yo(X)), g--;
                  for (; G--; ) {
                    if (p === X || (X !== null && p === X.alternate)) break t;
                    (p = yo(p)), (X = yo(X));
                  }
                  p = null;
                }
              else p = null;
              m !== null && Hp(s, b, m, p, !1),
                x !== null && R !== null && Hp(s, R, x, p, !0);
            }
          }
          e: {
            if (
              ((b = i ? Vo(i) : window),
              (m = b.nodeName && b.nodeName.toLowerCase()),
              m === "select" || (m === "input" && b.type === "file"))
            )
              var f = Y5;
            else if (ap(b))
              if (zg) f = w5;
              else {
                f = z5;
                var I = N5;
              }
            else
              (m = b.nodeName) &&
                m.toLowerCase() === "input" &&
                (b.type === "checkbox" || b.type === "radio") &&
                (f = k5);
            if (f && (f = f(e, i))) {
              Ng(s, f, c, a);
              break e;
            }
            I && I(e, b, i),
              e === "focusout" &&
                (I = b._wrapperState) &&
                I.controlled &&
                b.type === "number" &&
                Ab(b, "number", b.value);
          }
          switch (((I = i ? Vo(i) : window), e)) {
            case "focusin":
              (ap(I) || I.contentEditable === "true") &&
                ((Fo = I), ($b = i), (td = null));
              break;
            case "focusout":
              td = $b = Fo = null;
              break;
            case "mousedown":
              em = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (em = !1), Xp(s, c, a);
              break;
            case "selectionchange":
              if (Q5) break;
            case "keydown":
            case "keyup":
              Xp(s, c, a);
          }
          var y;
          if (Qm)
            e: {
              switch (e) {
                case "compositionstart":
                  var W = "onCompositionStart";
                  break e;
                case "compositionend":
                  W = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  W = "onCompositionUpdate";
                  break e;
              }
              W = void 0;
            }
          else
            vo
              ? Jg(e, c) && (W = "onCompositionEnd")
              : e === "keydown" &&
                c.keyCode === 229 &&
                (W = "onCompositionStart");
          W &&
            (Cg &&
              c.locale !== "ko" &&
              (vo || W !== "onCompositionStart"
                ? W === "onCompositionEnd" && vo && (y = Vg())
                : ((_l = a),
                  (wm = "value" in _l ? _l.value : _l.textContent),
                  (vo = !0))),
            (I = Ci(i, W)),
            0 < I.length &&
              ((W = new rp(W, e, null, c, a)),
              s.push({ event: W, listeners: I }),
              y ? (W.data = y) : ((y = Yg(c)), y !== null && (W.data = y)))),
            (y = F5 ? h5(e, c) : V5(e, c)) &&
              ((i = Ci(i, "onBeforeInput")),
              0 < i.length &&
                ((a = new rp("onBeforeInput", "beforeinput", null, c, a)),
                s.push({ event: a, listeners: i }),
                (a.data = y)));
        }
        Ug(s, t);
      });
    }
    function xd(e, t, c) {
      return { instance: e, listener: t, currentTarget: c };
    }
    function Ci(e, t) {
      for (var c = t + "Capture", l = []; e !== null; ) {
        var n = e,
          o = n.stateNode;
        n.tag === 5 &&
          o !== null &&
          ((n = o),
          (o = ud(e, c)),
          o != null && l.unshift(xd(e, o, n)),
          (o = ud(e, t)),
          o != null && l.push(xd(e, o, n))),
          (e = e.return);
      }
      return l;
    }
    function yo(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Hp(e, t, c, l, n) {
      for (var o = t._reactName, r = []; c !== null && c !== l; ) {
        var d = c,
          u = d.alternate,
          i = d.stateNode;
        if (u !== null && u === l) break;
        d.tag === 5 &&
          i !== null &&
          ((d = i),
          n
            ? ((u = ud(c, o)), u != null && r.unshift(xd(c, u, d)))
            : n || ((u = ud(c, o)), u != null && r.push(xd(c, u, d)))),
          (c = c.return);
      }
      r.length !== 0 && e.push({ event: t, listeners: r });
    }
    var L5 = /\r\n?/g,
      T5 = /\u0000|\uFFFD/g;
    function Zp(e) {
      return (typeof e == "string" ? e : "" + e)
        .replace(
          L5,
          `
`
        )
        .replace(T5, "");
    }
    function ui(e, t, c) {
      if (((t = Zp(t)), Zp(e) !== t && c)) throw Error(z(425));
    }
    function Ji() {}
    var tm = null,
      cm = null;
    function lm(e, t) {
      return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var nm = typeof setTimeout == "function" ? setTimeout : void 0,
      D5 = typeof clearTimeout == "function" ? clearTimeout : void 0,
      Rp = typeof Promise == "function" ? Promise : void 0,
      U5 =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof Rp < "u"
            ? function (e) {
                return Rp.resolve(null).then(e).catch(M5);
              }
            : nm;
    function M5(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function yb(e, t) {
      var c = t,
        l = 0;
      do {
        var n = c.nextSibling;
        if ((e.removeChild(c), n && n.nodeType === 8))
          if (((c = n.data), c === "/$")) {
            if (l === 0) {
              e.removeChild(n), sd(t);
              return;
            }
            l--;
          } else (c !== "$" && c !== "$?" && c !== "$!") || l++;
        c = n;
      } while (c);
      sd(t);
    }
    function cn(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
          if (t === "/$") return null;
        }
      }
      return e;
    }
    function fp(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var c = e.data;
          if (c === "$" || c === "$!" || c === "$?") {
            if (t === 0) return e;
            t--;
          } else c === "/$" && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var _o = Math.random().toString(36).slice(2),
      el = "__reactFiber$" + _o,
      Gd = "__reactProps$" + _o,
      Il = "__reactContainer$" + _o,
      om = "__reactEvents$" + _o,
      E5 = "__reactListeners$" + _o,
      j5 = "__reactHandles$" + _o;
    function zn(e) {
      var t = e[el];
      if (t) return t;
      for (var c = e.parentNode; c; ) {
        if ((t = c[Il] || c[el])) {
          if (
            ((c = t.alternate),
            t.child !== null || (c !== null && c.child !== null))
          )
            for (e = fp(e); e !== null; ) {
              if ((c = e[el])) return c;
              e = fp(e);
            }
          return t;
        }
        (e = c), (c = e.parentNode);
      }
      return null;
    }
    function Wd(e) {
      return (
        (e = e[el] || e[Il]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function Vo(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(z(33));
    }
    function qi(e) {
      return e[Gd] || null;
    }
    var rm = [],
      Co = -1;
    function sn(e) {
      return { current: e };
    }
    function Be(e) {
      0 > Co || ((e.current = rm[Co]), (rm[Co] = null), Co--);
    }
    function fe(e, t) {
      Co++, (rm[Co] = e.current), (e.current = t);
    }
    var un = {},
      Bt = sn(un),
      Ut = sn(!1),
      Qn = un;
    function Do(e, t) {
      var c = e.type.contextTypes;
      if (!c) return un;
      var l = e.stateNode;
      if (l && l.__reactInternalMemoizedUnmaskedChildContext === t)
        return l.__reactInternalMemoizedMaskedChildContext;
      var n = {},
        o;
      for (o in c) n[o] = t[o];
      return (
        l &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = n)),
        n
      );
    }
    function Mt(e) {
      return (e = e.childContextTypes), e != null;
    }
    function Yi() {
      Be(Ut), Be(Bt);
    }
    function Ip(e, t, c) {
      if (Bt.current !== un) throw Error(z(168));
      fe(Bt, t), fe(Ut, c);
    }
    function Eg(e, t, c) {
      var l = e.stateNode;
      if (((t = t.childContextTypes), typeof l.getChildContext != "function"))
        return c;
      l = l.getChildContext();
      for (var n in l)
        if (!(n in t)) throw Error(z(108, NB(e) || "Unknown", n));
      return ke({}, c, l);
    }
    function Ni(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          un),
        (Qn = Bt.current),
        fe(Bt, e),
        fe(Ut, Ut.current),
        !0
      );
    }
    function yp(e, t, c) {
      var l = e.stateNode;
      if (!l) throw Error(z(169));
      c
        ? ((e = Eg(e, t, Qn)),
          (l.__reactInternalMemoizedMergedChildContext = e),
          Be(Ut),
          Be(Bt),
          fe(Bt, e))
        : Be(Ut),
        fe(Ut, c);
    }
    var gl = null,
      $i = !1,
      Wb = !1;
    function jg(e) {
      gl === null ? (gl = [e]) : gl.push(e);
    }
    function P5(e) {
      ($i = !0), jg(e);
    }
    function bn() {
      if (!Wb && gl !== null) {
        Wb = !0;
        var e = 0,
          t = me;
        try {
          var c = gl;
          for (me = 1; e < c.length; e++) {
            var l = c[e];
            do l = l(!0);
            while (l !== null);
          }
          (gl = null), ($i = !1);
        } catch (n) {
          throw (gl !== null && (gl = gl.slice(e + 1)), Hg(Ym, bn), n);
        } finally {
          (me = t), (Wb = !1);
        }
      }
      return null;
    }
    var Jo = [],
      Yo = 0,
      zi = null,
      ki = 0,
      pc = [],
      gc = 0,
      An = null,
      Hl = 1,
      Zl = "";
    function Yn(e, t) {
      (Jo[Yo++] = ki), (Jo[Yo++] = zi), (zi = e), (ki = t);
    }
    function Pg(e, t, c) {
      (pc[gc++] = Hl), (pc[gc++] = Zl), (pc[gc++] = An), (An = e);
      var l = Hl;
      e = Zl;
      var n = 32 - Sc(l) - 1;
      (l &= ~(1 << n)), (c += 1);
      var o = 32 - Sc(t) + n;
      if (30 < o) {
        var r = n - (n % 5);
        (o = (l & ((1 << r) - 1)).toString(32)),
          (l >>= r),
          (n -= r),
          (Hl = (1 << (32 - Sc(t) + n)) | (c << n) | l),
          (Zl = o + e);
      } else (Hl = (1 << o) | (c << n) | l), (Zl = e);
    }
    function Lm(e) {
      e.return !== null && (Yn(e, 1), Pg(e, 1, 0));
    }
    function Tm(e) {
      for (; e === zi; )
        (zi = Jo[--Yo]), (Jo[Yo] = null), (ki = Jo[--Yo]), (Jo[Yo] = null);
      for (; e === An; )
        (An = pc[--gc]),
          (pc[gc] = null),
          (Zl = pc[--gc]),
          (pc[gc] = null),
          (Hl = pc[--gc]),
          (pc[gc] = null);
    }
    var nc = null,
      lc = null,
      Ve = !1,
      wc = null;
    function Kg(e, t) {
      var c = Hc(5, null, null, 0);
      (c.elementType = "DELETED"),
        (c.stateNode = t),
        (c.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [c]), (e.flags |= 16)) : t.push(c);
    }
    function Wp(e, t) {
      switch (e.tag) {
        case 5:
          var c = e.type;
          return (
            (t =
              t.nodeType !== 1 || c.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (nc = e), (lc = cn(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (nc = e), (lc = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((c = An !== null ? { id: Hl, overflow: Zl } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: c,
                  retryLane: 1073741824,
                }),
                (c = Hc(18, null, null, 0)),
                (c.stateNode = t),
                (c.return = e),
                (e.child = c),
                (nc = e),
                (lc = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function dm(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function um(e) {
      if (Ve) {
        var t = lc;
        if (t) {
          var c = t;
          if (!Wp(e, t)) {
            if (dm(e)) throw Error(z(418));
            t = cn(c.nextSibling);
            var l = nc;
            t && Wp(e, t)
              ? Kg(l, c)
              : ((e.flags = (e.flags & -4097) | 2), (Ve = !1), (nc = e));
          }
        } else {
          if (dm(e)) throw Error(z(418));
          (e.flags = (e.flags & -4097) | 2), (Ve = !1), (nc = e);
        }
      }
    }
    function Bp(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

      )
        e = e.return;
      nc = e;
    }
    function ii(e) {
      if (e !== nc) return !1;
      if (!Ve) return Bp(e), (Ve = !0), !1;
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== "head" && t !== "body" && !lm(e.type, e.memoizedProps))),
        t && (t = lc))
      ) {
        if (dm(e)) throw (_g(), Error(z(418)));
        for (; t; ) Kg(e, t), (t = cn(t.nextSibling));
      }
      if ((Bp(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(z(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var c = e.data;
              if (c === "/$") {
                if (t === 0) {
                  lc = cn(e.nextSibling);
                  break e;
                }
                t--;
              } else (c !== "$" && c !== "$!" && c !== "$?") || t++;
            }
            e = e.nextSibling;
          }
          lc = null;
        }
      } else lc = nc ? cn(e.stateNode.nextSibling) : null;
      return !0;
    }
    function _g() {
      for (var e = lc; e; ) e = cn(e.nextSibling);
    }
    function Uo() {
      (lc = nc = null), (Ve = !1);
    }
    function Dm(e) {
      wc === null ? (wc = [e]) : wc.push(e);
    }
    var K5 = Bl.ReactCurrentBatchConfig;
    function Tr(e, t, c) {
      if (
        ((e = c.ref),
        e !== null && typeof e != "function" && typeof e != "object")
      ) {
        if (c._owner) {
          if (((c = c._owner), c)) {
            if (c.tag !== 1) throw Error(z(309));
            var l = c.stateNode;
          }
          if (!l) throw Error(z(147, e));
          var n = l,
            o = "" + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == "function" &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (r) {
                var d = n.refs;
                r === null ? delete d[o] : (d[o] = r);
              }),
              (t._stringRef = o),
              t);
        }
        if (typeof e != "string") throw Error(z(284));
        if (!c._owner) throw Error(z(290, e));
      }
      return e;
    }
    function ai(e, t) {
      throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
          z(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ))
      );
    }
    function vp(e) {
      var t = e._init;
      return t(e._payload);
    }
    function qg(e) {
      function t(X, G) {
        if (e) {
          var g = X.deletions;
          g === null ? ((X.deletions = [G]), (X.flags |= 16)) : g.push(G);
        }
      }
      function c(X, G) {
        if (!e) return null;
        for (; G !== null; ) t(X, G), (G = G.sibling);
        return null;
      }
      function l(X, G) {
        for (X = new Map(); G !== null; )
          G.key !== null ? X.set(G.key, G) : X.set(G.index, G), (G = G.sibling);
        return X;
      }
      function n(X, G) {
        return (X = rn(X, G)), (X.index = 0), (X.sibling = null), X;
      }
      function o(X, G, g) {
        return (
          (X.index = g),
          e
            ? ((g = X.alternate),
              g !== null
                ? ((g = g.index), g < G ? ((X.flags |= 2), G) : g)
                : ((X.flags |= 2), G))
            : ((X.flags |= 1048576), G)
        );
      }
      function r(X) {
        return e && X.alternate === null && (X.flags |= 2), X;
      }
      function d(X, G, g, H) {
        return G === null || G.tag !== 6
          ? ((G = Jb(g, X.mode, H)), (G.return = X), G)
          : ((G = n(G, g)), (G.return = X), G);
      }
      function u(X, G, g, H) {
        var f = g.type;
        return f === Bo
          ? a(X, G, g.props.children, H, g.key)
          : G !== null &&
              (G.elementType === f ||
                (typeof f == "object" &&
                  f !== null &&
                  f.$$typeof === El &&
                  vp(f) === G.type))
            ? ((H = n(G, g.props)), (H.ref = Tr(X, G, g)), (H.return = X), H)
            : ((H = Ii(g.type, g.key, g.props, null, X.mode, H)),
              (H.ref = Tr(X, G, g)),
              (H.return = X),
              H);
      }
      function i(X, G, g, H) {
        return G === null ||
          G.tag !== 4 ||
          G.stateNode.containerInfo !== g.containerInfo ||
          G.stateNode.implementation !== g.implementation
          ? ((G = Yb(g, X.mode, H)), (G.return = X), G)
          : ((G = n(G, g.children || [])), (G.return = X), G);
      }
      function a(X, G, g, H, f) {
        return G === null || G.tag !== 7
          ? ((G = On(g, X.mode, H, f)), (G.return = X), G)
          : ((G = n(G, g)), (G.return = X), G);
      }
      function s(X, G, g) {
        if ((typeof G == "string" && G !== "") || typeof G == "number")
          return (G = Jb("" + G, X.mode, g)), (G.return = X), G;
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case Pu:
              return (
                (g = Ii(G.type, G.key, G.props, null, X.mode, g)),
                (g.ref = Tr(X, null, G)),
                (g.return = X),
                g
              );
            case Wo:
              return (G = Yb(G, X.mode, g)), (G.return = X), G;
            case El:
              var H = G._init;
              return s(X, H(G._payload), g);
          }
          if (jr(G) || Or(G))
            return (G = On(G, X.mode, g, null)), (G.return = X), G;
          ai(X, G);
        }
        return null;
      }
      function b(X, G, g, H) {
        var f = G !== null ? G.key : null;
        if ((typeof g == "string" && g !== "") || typeof g == "number")
          return f !== null ? null : d(X, G, "" + g, H);
        if (typeof g == "object" && g !== null) {
          switch (g.$$typeof) {
            case Pu:
              return g.key === f ? u(X, G, g, H) : null;
            case Wo:
              return g.key === f ? i(X, G, g, H) : null;
            case El:
              return (f = g._init), b(X, G, f(g._payload), H);
          }
          if (jr(g) || Or(g)) return f !== null ? null : a(X, G, g, H, null);
          ai(X, g);
        }
        return null;
      }
      function m(X, G, g, H, f) {
        if ((typeof H == "string" && H !== "") || typeof H == "number")
          return (X = X.get(g) || null), d(G, X, "" + H, f);
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case Pu:
              return (
                (X = X.get(H.key === null ? g : H.key) || null), u(G, X, H, f)
              );
            case Wo:
              return (
                (X = X.get(H.key === null ? g : H.key) || null), i(G, X, H, f)
              );
            case El:
              var I = H._init;
              return m(X, G, g, I(H._payload), f);
          }
          if (jr(H) || Or(H))
            return (X = X.get(g) || null), a(G, X, H, f, null);
          ai(G, H);
        }
        return null;
      }
      function x(X, G, g, H) {
        for (
          var f = null, I = null, y = G, W = (G = 0), B = null;
          y !== null && W < g.length;
          W++
        ) {
          y.index > W ? ((B = y), (y = null)) : (B = y.sibling);
          var F = b(X, y, g[W], H);
          if (F === null) {
            y === null && (y = B);
            break;
          }
          e && y && F.alternate === null && t(X, y),
            (G = o(F, G, W)),
            I === null ? (f = F) : (I.sibling = F),
            (I = F),
            (y = B);
        }
        if (W === g.length) return c(X, y), Ve && Yn(X, W), f;
        if (y === null) {
          for (; W < g.length; W++)
            (y = s(X, g[W], H)),
              y !== null &&
                ((G = o(y, G, W)),
                I === null ? (f = y) : (I.sibling = y),
                (I = y));
          return Ve && Yn(X, W), f;
        }
        for (y = l(X, y); W < g.length; W++)
          (B = m(y, X, W, g[W], H)),
            B !== null &&
              (e &&
                B.alternate !== null &&
                y.delete(B.key === null ? W : B.key),
              (G = o(B, G, W)),
              I === null ? (f = B) : (I.sibling = B),
              (I = B));
        return (
          e &&
            y.forEach(function (S) {
              return t(X, S);
            }),
          Ve && Yn(X, W),
          f
        );
      }
      function p(X, G, g, H) {
        var f = Or(g);
        if (typeof f != "function") throw Error(z(150));
        if (((g = f.call(g)), g == null)) throw Error(z(151));
        for (
          var I = (f = null), y = G, W = (G = 0), B = null, F = g.next();
          y !== null && !F.done;
          W++, F = g.next()
        ) {
          y.index > W ? ((B = y), (y = null)) : (B = y.sibling);
          var S = b(X, y, F.value, H);
          if (S === null) {
            y === null && (y = B);
            break;
          }
          e && y && S.alternate === null && t(X, y),
            (G = o(S, G, W)),
            I === null ? (f = S) : (I.sibling = S),
            (I = S),
            (y = B);
        }
        if (F.done) return c(X, y), Ve && Yn(X, W), f;
        if (y === null) {
          for (; !F.done; W++, F = g.next())
            (F = s(X, F.value, H)),
              F !== null &&
                ((G = o(F, G, W)),
                I === null ? (f = F) : (I.sibling = F),
                (I = F));
          return Ve && Yn(X, W), f;
        }
        for (y = l(X, y); !F.done; W++, F = g.next())
          (F = m(y, X, W, F.value, H)),
            F !== null &&
              (e &&
                F.alternate !== null &&
                y.delete(F.key === null ? W : F.key),
              (G = o(F, G, W)),
              I === null ? (f = F) : (I.sibling = F),
              (I = F));
        return (
          e &&
            y.forEach(function (O) {
              return t(X, O);
            }),
          Ve && Yn(X, W),
          f
        );
      }
      function R(X, G, g, H) {
        if (
          (typeof g == "object" &&
            g !== null &&
            g.type === Bo &&
            g.key === null &&
            (g = g.props.children),
          typeof g == "object" && g !== null)
        ) {
          switch (g.$$typeof) {
            case Pu:
              e: {
                for (var f = g.key, I = G; I !== null; ) {
                  if (I.key === f) {
                    if (((f = g.type), f === Bo)) {
                      if (I.tag === 7) {
                        c(X, I.sibling),
                          (G = n(I, g.props.children)),
                          (G.return = X),
                          (X = G);
                        break e;
                      }
                    } else if (
                      I.elementType === f ||
                      (typeof f == "object" &&
                        f !== null &&
                        f.$$typeof === El &&
                        vp(f) === I.type)
                    ) {
                      c(X, I.sibling),
                        (G = n(I, g.props)),
                        (G.ref = Tr(X, I, g)),
                        (G.return = X),
                        (X = G);
                      break e;
                    }
                    c(X, I);
                    break;
                  } else t(X, I);
                  I = I.sibling;
                }
                g.type === Bo
                  ? ((G = On(g.props.children, X.mode, H, g.key)),
                    (G.return = X),
                    (X = G))
                  : ((H = Ii(g.type, g.key, g.props, null, X.mode, H)),
                    (H.ref = Tr(X, G, g)),
                    (H.return = X),
                    (X = H));
              }
              return r(X);
            case Wo:
              e: {
                for (I = g.key; G !== null; ) {
                  if (G.key === I)
                    if (
                      G.tag === 4 &&
                      G.stateNode.containerInfo === g.containerInfo &&
                      G.stateNode.implementation === g.implementation
                    ) {
                      c(X, G.sibling),
                        (G = n(G, g.children || [])),
                        (G.return = X),
                        (X = G);
                      break e;
                    } else {
                      c(X, G);
                      break;
                    }
                  else t(X, G);
                  G = G.sibling;
                }
                (G = Yb(g, X.mode, H)), (G.return = X), (X = G);
              }
              return r(X);
            case El:
              return (I = g._init), R(X, G, I(g._payload), H);
          }
          if (jr(g)) return x(X, G, g, H);
          if (Or(g)) return p(X, G, g, H);
          ai(X, g);
        }
        return (typeof g == "string" && g !== "") || typeof g == "number"
          ? ((g = "" + g),
            G !== null && G.tag === 6
              ? (c(X, G.sibling), (G = n(G, g)), (G.return = X), (X = G))
              : (c(X, G), (G = Jb(g, X.mode, H)), (G.return = X), (X = G)),
            r(X))
          : c(X, G);
      }
      return R;
    }
    var Mo = qg(!0),
      $g = qg(!1),
      wi = sn(null),
      Si = null,
      No = null,
      Um = null;
    function Mm() {
      Um = No = Si = null;
    }
    function Em(e) {
      var t = wi.current;
      Be(wi), (e._currentValue = t);
    }
    function im(e, t, c) {
      for (; e !== null; ) {
        var l = e.alternate;
        if (
          ((e.childLanes & t) !== t
            ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
            : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
          e === c)
        )
          break;
        e = e.return;
      }
    }
    function Ao(e, t) {
      (Si = e),
        (Um = No = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          (e.lanes & t && (Dt = !0), (e.firstContext = null));
    }
    function Rc(e) {
      var t = e._currentValue;
      if (Um !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), No === null)) {
          if (Si === null) throw Error(z(308));
          (No = e), (Si.dependencies = { lanes: 0, firstContext: e });
        } else No = No.next = e;
      return t;
    }
    var kn = null;
    function jm(e) {
      kn === null ? (kn = [e]) : kn.push(e);
    }
    function eH(e, t, c, l) {
      var n = t.interleaved;
      return (
        n === null ? ((c.next = c), jm(t)) : ((c.next = n.next), (n.next = c)),
        (t.interleaved = c),
        yl(e, l)
      );
    }
    function yl(e, t) {
      e.lanes |= t;
      var c = e.alternate;
      for (c !== null && (c.lanes |= t), c = e, e = e.return; e !== null; )
        (e.childLanes |= t),
          (c = e.alternate),
          c !== null && (c.childLanes |= t),
          (c = e),
          (e = e.return);
      return c.tag === 3 ? c.stateNode : null;
    }
    var jl = !1;
    function Pm(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function tH(e, t) {
      (e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          });
    }
    function Rl(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function ln(e, t, c) {
      var l = e.updateQueue;
      if (l === null) return null;
      if (((l = l.shared), de & 2)) {
        var n = l.pending;
        return (
          n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (l.pending = t),
          yl(e, c)
        );
      }
      return (
        (n = l.interleaved),
        n === null ? ((t.next = t), jm(l)) : ((t.next = n.next), (n.next = t)),
        (l.interleaved = t),
        yl(e, c)
      );
    }
    function pi(e, t, c) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (c & 4194240) !== 0))
      ) {
        var l = t.lanes;
        (l &= e.pendingLanes), (c |= l), (t.lanes = c), Nm(e, c);
      }
    }
    function Fp(e, t) {
      var c = e.updateQueue,
        l = e.alternate;
      if (l !== null && ((l = l.updateQueue), c === l)) {
        var n = null,
          o = null;
        if (((c = c.firstBaseUpdate), c !== null)) {
          do {
            var r = {
              eventTime: c.eventTime,
              lane: c.lane,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null,
            };
            o === null ? (n = o = r) : (o = o.next = r), (c = c.next);
          } while (c !== null);
          o === null ? (n = o = t) : (o = o.next = t);
        } else n = o = t;
        (c = {
          baseState: l.baseState,
          firstBaseUpdate: n,
          lastBaseUpdate: o,
          shared: l.shared,
          effects: l.effects,
        }),
          (e.updateQueue = c);
        return;
      }
      (e = c.lastBaseUpdate),
        e === null ? (c.firstBaseUpdate = t) : (e.next = t),
        (c.lastBaseUpdate = t);
    }
    function Oi(e, t, c, l) {
      var n = e.updateQueue;
      jl = !1;
      var o = n.firstBaseUpdate,
        r = n.lastBaseUpdate,
        d = n.shared.pending;
      if (d !== null) {
        n.shared.pending = null;
        var u = d,
          i = u.next;
        (u.next = null), r === null ? (o = i) : (r.next = i), (r = u);
        var a = e.alternate;
        a !== null &&
          ((a = a.updateQueue),
          (d = a.lastBaseUpdate),
          d !== r &&
            (d === null ? (a.firstBaseUpdate = i) : (d.next = i),
            (a.lastBaseUpdate = u)));
      }
      if (o !== null) {
        var s = n.baseState;
        (r = 0), (a = i = u = null), (d = o);
        do {
          var b = d.lane,
            m = d.eventTime;
          if ((l & b) === b) {
            a !== null &&
              (a = a.next =
                {
                  eventTime: m,
                  lane: 0,
                  tag: d.tag,
                  payload: d.payload,
                  callback: d.callback,
                  next: null,
                });
            e: {
              var x = e,
                p = d;
              switch (((b = t), (m = c), p.tag)) {
                case 1:
                  if (((x = p.payload), typeof x == "function")) {
                    s = x.call(m, s, b);
                    break e;
                  }
                  s = x;
                  break e;
                case 3:
                  x.flags = (x.flags & -65537) | 128;
                case 0:
                  if (
                    ((x = p.payload),
                    (b = typeof x == "function" ? x.call(m, s, b) : x),
                    b == null)
                  )
                    break e;
                  s = ke({}, s, b);
                  break e;
                case 2:
                  jl = !0;
              }
            }
            d.callback !== null &&
              d.lane !== 0 &&
              ((e.flags |= 64),
              (b = n.effects),
              b === null ? (n.effects = [d]) : b.push(d));
          } else
            (m = {
              eventTime: m,
              lane: b,
              tag: d.tag,
              payload: d.payload,
              callback: d.callback,
              next: null,
            }),
              a === null ? ((i = a = m), (u = s)) : (a = a.next = m),
              (r |= b);
          if (((d = d.next), d === null)) {
            if (((d = n.shared.pending), d === null)) break;
            (b = d),
              (d = b.next),
              (b.next = null),
              (n.lastBaseUpdate = b),
              (n.shared.pending = null);
          }
        } while (!0);
        if (
          (a === null && (u = s),
          (n.baseState = u),
          (n.firstBaseUpdate = i),
          (n.lastBaseUpdate = a),
          (t = n.shared.interleaved),
          t !== null)
        ) {
          n = t;
          do (r |= n.lane), (n = n.next);
          while (n !== t);
        } else o === null && (n.shared.lanes = 0);
        (Tn |= r), (e.lanes = r), (e.memoizedState = s);
      }
    }
    function hp(e, t, c) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var l = e[t],
            n = l.callback;
          if (n !== null) {
            if (((l.callback = null), (l = c), typeof n != "function"))
              throw Error(z(191, n));
            n.call(l);
          }
        }
    }
    var Bd = {},
      cl = sn(Bd),
      pd = sn(Bd),
      gd = sn(Bd);
    function wn(e) {
      if (e === Bd) throw Error(z(174));
      return e;
    }
    function Km(e, t) {
      switch ((fe(gd, t), fe(pd, e), fe(cl, Bd), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Tb(null, "");
          break;
        default:
          (e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Tb(t, e));
      }
      Be(cl), fe(cl, t);
    }
    function Eo() {
      Be(cl), Be(pd), Be(gd);
    }
    function cH(e) {
      wn(gd.current);
      var t = wn(cl.current),
        c = Tb(t, e.type);
      t !== c && (fe(pd, e), fe(cl, c));
    }
    function _m(e) {
      pd.current === e && (Be(cl), Be(pd));
    }
    var Ne = sn(0);
    function Qi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var c = t.memoizedState;
          if (
            c !== null &&
            ((c = c.dehydrated),
            c === null || c.data === "$?" || c.data === "$!")
          )
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    var Bb = [];
    function qm() {
      for (var e = 0; e < Bb.length; e++)
        Bb[e]._workInProgressVersionPrimary = null;
      Bb.length = 0;
    }
    var gi = Bl.ReactCurrentDispatcher,
      vb = Bl.ReactCurrentBatchConfig,
      Ln = 0,
      ze = null,
      $e = null,
      nt = null,
      Ai = !1,
      cd = !1,
      Hd = 0,
      _5 = 0;
    function It() {
      throw Error(z(321));
    }
    function $m(e, t) {
      if (t === null) return !1;
      for (var c = 0; c < t.length && c < e.length; c++)
        if (!Qc(e[c], t[c])) return !1;
      return !0;
    }
    function eX(e, t, c, l, n, o) {
      if (
        ((Ln = o),
        (ze = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (gi.current = e === null || e.memoizedState === null ? tv : cv),
        (e = c(l, n)),
        cd)
      ) {
        o = 0;
        do {
          if (((cd = !1), (Hd = 0), 25 <= o)) throw Error(z(301));
          (o += 1),
            (nt = $e = null),
            (t.updateQueue = null),
            (gi.current = lv),
            (e = c(l, n));
        } while (cd);
      }
      if (
        ((gi.current = Li),
        (t = $e !== null && $e.next !== null),
        (Ln = 0),
        (nt = $e = ze = null),
        (Ai = !1),
        t)
      )
        throw Error(z(300));
      return e;
    }
    function tX() {
      var e = Hd !== 0;
      return (Hd = 0), e;
    }
    function $c() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return nt === null ? (ze.memoizedState = nt = e) : (nt = nt.next = e), nt;
    }
    function fc() {
      if ($e === null) {
        var e = ze.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = $e.next;
      var t = nt === null ? ze.memoizedState : nt.next;
      if (t !== null) (nt = t), ($e = e);
      else {
        if (e === null) throw Error(z(310));
        ($e = e),
          (e = {
            memoizedState: $e.memoizedState,
            baseState: $e.baseState,
            baseQueue: $e.baseQueue,
            queue: $e.queue,
            next: null,
          }),
          nt === null ? (ze.memoizedState = nt = e) : (nt = nt.next = e);
      }
      return nt;
    }
    function Zd(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Fb(e) {
      var t = fc(),
        c = t.queue;
      if (c === null) throw Error(z(311));
      c.lastRenderedReducer = e;
      var l = $e,
        n = l.baseQueue,
        o = c.pending;
      if (o !== null) {
        if (n !== null) {
          var r = n.next;
          (n.next = o.next), (o.next = r);
        }
        (l.baseQueue = n = o), (c.pending = null);
      }
      if (n !== null) {
        (o = n.next), (l = l.baseState);
        var d = (r = null),
          u = null,
          i = o;
        do {
          var a = i.lane;
          if ((Ln & a) === a)
            u !== null &&
              (u = u.next =
                {
                  lane: 0,
                  action: i.action,
                  hasEagerState: i.hasEagerState,
                  eagerState: i.eagerState,
                  next: null,
                }),
              (l = i.hasEagerState ? i.eagerState : e(l, i.action));
          else {
            var s = {
              lane: a,
              action: i.action,
              hasEagerState: i.hasEagerState,
              eagerState: i.eagerState,
              next: null,
            };
            u === null ? ((d = u = s), (r = l)) : (u = u.next = s),
              (ze.lanes |= a),
              (Tn |= a);
          }
          i = i.next;
        } while (i !== null && i !== o);
        u === null ? (r = l) : (u.next = d),
          Qc(l, t.memoizedState) || (Dt = !0),
          (t.memoizedState = l),
          (t.baseState = r),
          (t.baseQueue = u),
          (c.lastRenderedState = l);
      }
      if (((e = c.interleaved), e !== null)) {
        n = e;
        do (o = n.lane), (ze.lanes |= o), (Tn |= o), (n = n.next);
        while (n !== e);
      } else n === null && (c.lanes = 0);
      return [t.memoizedState, c.dispatch];
    }
    function hb(e) {
      var t = fc(),
        c = t.queue;
      if (c === null) throw Error(z(311));
      c.lastRenderedReducer = e;
      var l = c.dispatch,
        n = c.pending,
        o = t.memoizedState;
      if (n !== null) {
        c.pending = null;
        var r = (n = n.next);
        do (o = e(o, r.action)), (r = r.next);
        while (r !== n);
        Qc(o, t.memoizedState) || (Dt = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (c.lastRenderedState = o);
      }
      return [o, l];
    }
    function lH() {}
    function nH(e, t) {
      var c = ze,
        l = fc(),
        n = t(),
        o = !Qc(l.memoizedState, n);
      if (
        (o && ((l.memoizedState = n), (Dt = !0)),
        (l = l.queue),
        cX(dH.bind(null, c, l, e), [e]),
        l.getSnapshot !== t || o || (nt !== null && nt.memoizedState.tag & 1))
      ) {
        if (
          ((c.flags |= 2048),
          Rd(9, rH.bind(null, c, l, n, t), void 0, null),
          ot === null)
        )
          throw Error(z(349));
        Ln & 30 || oH(c, t, n);
      }
      return n;
    }
    function oH(e, t, c) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: c }),
        (t = ze.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (ze.updateQueue = t),
            (t.stores = [e]))
          : ((c = t.stores), c === null ? (t.stores = [e]) : c.push(e));
    }
    function rH(e, t, c, l) {
      (t.value = c), (t.getSnapshot = l), uH(t) && iH(e);
    }
    function dH(e, t, c) {
      return c(function () {
        uH(t) && iH(e);
      });
    }
    function uH(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var c = t();
        return !Qc(e, c);
      } catch {
        return !0;
      }
    }
    function iH(e) {
      var t = yl(e, 1);
      t !== null && Oc(t, e, 1, -1);
    }
    function Vp(e) {
      var t = $c();
      return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Zd,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = ev.bind(null, ze, e)),
        [t.memoizedState, e]
      );
    }
    function Rd(e, t, c, l) {
      return (
        (e = { tag: e, create: t, destroy: c, deps: l, next: null }),
        (t = ze.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (ze.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((c = t.lastEffect),
            c === null
              ? (t.lastEffect = e.next = e)
              : ((l = c.next), (c.next = e), (e.next = l), (t.lastEffect = e))),
        e
      );
    }
    function aH() {
      return fc().memoizedState;
    }
    function Hi(e, t, c, l) {
      var n = $c();
      (ze.flags |= e),
        (n.memoizedState = Rd(1 | t, c, void 0, l === void 0 ? null : l));
    }
    function ea(e, t, c, l) {
      var n = fc();
      l = l === void 0 ? null : l;
      var o = void 0;
      if ($e !== null) {
        var r = $e.memoizedState;
        if (((o = r.destroy), l !== null && $m(l, r.deps))) {
          n.memoizedState = Rd(t, c, o, l);
          return;
        }
      }
      (ze.flags |= e), (n.memoizedState = Rd(1 | t, c, o, l));
    }
    function Cp(e, t) {
      return Hi(8390656, 8, e, t);
    }
    function cX(e, t) {
      return ea(2048, 8, e, t);
    }
    function sH(e, t) {
      return ea(4, 2, e, t);
    }
    function bH(e, t) {
      return ea(4, 4, e, t);
    }
    function mH(e, t) {
      if (typeof t == "function")
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function XH(e, t, c) {
      return (
        (c = c != null ? c.concat([e]) : null), ea(4, 4, mH.bind(null, t, e), c)
      );
    }
    function lX() {}
    function xH(e, t) {
      var c = fc();
      t = t === void 0 ? null : t;
      var l = c.memoizedState;
      return l !== null && t !== null && $m(t, l[1])
        ? l[0]
        : ((c.memoizedState = [e, t]), e);
    }
    function GH(e, t) {
      var c = fc();
      t = t === void 0 ? null : t;
      var l = c.memoizedState;
      return l !== null && t !== null && $m(t, l[1])
        ? l[0]
        : ((e = e()), (c.memoizedState = [e, t]), e);
    }
    function pH(e, t, c) {
      return Ln & 21
        ? (Qc(c, t) ||
            ((c = fg()), (ze.lanes |= c), (Tn |= c), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Dt = !0)),
          (e.memoizedState = c));
    }
    function q5(e, t) {
      var c = me;
      (me = c !== 0 && 4 > c ? c : 4), e(!0);
      var l = vb.transition;
      vb.transition = {};
      try {
        e(!1), t();
      } finally {
        (me = c), (vb.transition = l);
      }
    }
    function gH() {
      return fc().memoizedState;
    }
    function $5(e, t, c) {
      var l = on(e);
      if (
        ((c = {
          lane: l,
          action: c,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        HH(e))
      )
        ZH(t, c);
      else if (((c = eH(e, t, c, l)), c !== null)) {
        var n = Yt();
        Oc(c, e, l, n), RH(c, t, l);
      }
    }
    function ev(e, t, c) {
      var l = on(e),
        n = {
          lane: l,
          action: c,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (HH(e)) ZH(t, n);
      else {
        var o = e.alternate;
        if (
          e.lanes === 0 &&
          (o === null || o.lanes === 0) &&
          ((o = t.lastRenderedReducer), o !== null)
        )
          try {
            var r = t.lastRenderedState,
              d = o(r, c);
            if (((n.hasEagerState = !0), (n.eagerState = d), Qc(d, r))) {
              var u = t.interleaved;
              u === null
                ? ((n.next = n), jm(t))
                : ((n.next = u.next), (u.next = n)),
                (t.interleaved = n);
              return;
            }
          } catch {
          } finally {
          }
        (c = eH(e, t, n, l)),
          c !== null && ((n = Yt()), Oc(c, e, l, n), RH(c, t, l));
      }
    }
    function HH(e) {
      var t = e.alternate;
      return e === ze || (t !== null && t === ze);
    }
    function ZH(e, t) {
      cd = Ai = !0;
      var c = e.pending;
      c === null ? (t.next = t) : ((t.next = c.next), (c.next = t)),
        (e.pending = t);
    }
    function RH(e, t, c) {
      if (c & 4194240) {
        var l = t.lanes;
        (l &= e.pendingLanes), (c |= l), (t.lanes = c), Nm(e, c);
      }
    }
    var Li = {
        readContext: Rc,
        useCallback: It,
        useContext: It,
        useEffect: It,
        useImperativeHandle: It,
        useInsertionEffect: It,
        useLayoutEffect: It,
        useMemo: It,
        useReducer: It,
        useRef: It,
        useState: It,
        useDebugValue: It,
        useDeferredValue: It,
        useTransition: It,
        useMutableSource: It,
        useSyncExternalStore: It,
        useId: It,
        unstable_isNewReconciler: !1,
      },
      tv = {
        readContext: Rc,
        useCallback: function (e, t) {
          return ($c().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Rc,
        useEffect: Cp,
        useImperativeHandle: function (e, t, c) {
          return (
            (c = c != null ? c.concat([e]) : null),
            Hi(4194308, 4, mH.bind(null, t, e), c)
          );
        },
        useLayoutEffect: function (e, t) {
          return Hi(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Hi(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var c = $c();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (c.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, c) {
          var l = $c();
          return (
            (t = c !== void 0 ? c(t) : t),
            (l.memoizedState = l.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (l.queue = e),
            (e = e.dispatch = $5.bind(null, ze, e)),
            [l.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = $c();
          return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Vp,
        useDebugValue: lX,
        useDeferredValue: function (e) {
          return ($c().memoizedState = e);
        },
        useTransition: function () {
          var e = Vp(!1),
            t = e[0];
          return (e = q5.bind(null, e[1])), ($c().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, c) {
          var l = ze,
            n = $c();
          if (Ve) {
            if (c === void 0) throw Error(z(407));
            c = c();
          } else {
            if (((c = t()), ot === null)) throw Error(z(349));
            Ln & 30 || oH(l, t, c);
          }
          n.memoizedState = c;
          var o = { value: c, getSnapshot: t };
          return (
            (n.queue = o),
            Cp(dH.bind(null, l, o, e), [e]),
            (l.flags |= 2048),
            Rd(9, rH.bind(null, l, o, c, t), void 0, null),
            c
          );
        },
        useId: function () {
          var e = $c(),
            t = ot.identifierPrefix;
          if (Ve) {
            var c = Zl,
              l = Hl;
            (c = (l & ~(1 << (32 - Sc(l) - 1))).toString(32) + c),
              (t = ":" + t + "R" + c),
              (c = Hd++),
              0 < c && (t += "H" + c.toString(32)),
              (t += ":");
          } else (c = _5++), (t = ":" + t + "r" + c.toString(32) + ":");
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      cv = {
        readContext: Rc,
        useCallback: xH,
        useContext: Rc,
        useEffect: cX,
        useImperativeHandle: XH,
        useInsertionEffect: sH,
        useLayoutEffect: bH,
        useMemo: GH,
        useReducer: Fb,
        useRef: aH,
        useState: function () {
          return Fb(Zd);
        },
        useDebugValue: lX,
        useDeferredValue: function (e) {
          var t = fc();
          return pH(t, $e.memoizedState, e);
        },
        useTransition: function () {
          var e = Fb(Zd)[0],
            t = fc().memoizedState;
          return [e, t];
        },
        useMutableSource: lH,
        useSyncExternalStore: nH,
        useId: gH,
        unstable_isNewReconciler: !1,
      },
      lv = {
        readContext: Rc,
        useCallback: xH,
        useContext: Rc,
        useEffect: cX,
        useImperativeHandle: XH,
        useInsertionEffect: sH,
        useLayoutEffect: bH,
        useMemo: GH,
        useReducer: hb,
        useRef: aH,
        useState: function () {
          return hb(Zd);
        },
        useDebugValue: lX,
        useDeferredValue: function (e) {
          var t = fc();
          return $e === null
            ? (t.memoizedState = e)
            : pH(t, $e.memoizedState, e);
        },
        useTransition: function () {
          var e = hb(Zd)[0],
            t = fc().memoizedState;
          return [e, t];
        },
        useMutableSource: lH,
        useSyncExternalStore: nH,
        useId: gH,
        unstable_isNewReconciler: !1,
      };
    function zc(e, t) {
      if (e && e.defaultProps) {
        (t = ke({}, t)), (e = e.defaultProps);
        for (var c in e) t[c] === void 0 && (t[c] = e[c]);
        return t;
      }
      return t;
    }
    function am(e, t, c, l) {
      (t = e.memoizedState),
        (c = c(l, t)),
        (c = c == null ? t : ke({}, t, c)),
        (e.memoizedState = c),
        e.lanes === 0 && (e.updateQueue.baseState = c);
    }
    var ta = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? Mn(e) === e : !1;
      },
      enqueueSetState: function (e, t, c) {
        e = e._reactInternals;
        var l = Yt(),
          n = on(e),
          o = Rl(l, n);
        (o.payload = t),
          c != null && (o.callback = c),
          (t = ln(e, o, n)),
          t !== null && (Oc(t, e, n, l), pi(t, e, n));
      },
      enqueueReplaceState: function (e, t, c) {
        e = e._reactInternals;
        var l = Yt(),
          n = on(e),
          o = Rl(l, n);
        (o.tag = 1),
          (o.payload = t),
          c != null && (o.callback = c),
          (t = ln(e, o, n)),
          t !== null && (Oc(t, e, n, l), pi(t, e, n));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var c = Yt(),
          l = on(e),
          n = Rl(c, l);
        (n.tag = 2),
          t != null && (n.callback = t),
          (t = ln(e, n, l)),
          t !== null && (Oc(t, e, l, c), pi(t, e, l));
      },
    };
    function Jp(e, t, c, l, n, o, r) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
          ? e.shouldComponentUpdate(l, o, r)
          : t.prototype && t.prototype.isPureReactComponent
            ? !md(c, l) || !md(n, o)
            : !0
      );
    }
    function fH(e, t, c) {
      var l = !1,
        n = un,
        o = t.contextType;
      return (
        typeof o == "object" && o !== null
          ? (o = Rc(o))
          : ((n = Mt(t) ? Qn : Bt.current),
            (l = t.contextTypes),
            (o = (l = l != null) ? Do(e, n) : un)),
        (t = new t(c, o)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = ta),
        (e.stateNode = t),
        (t._reactInternals = e),
        l &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = n),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
      );
    }
    function Yp(e, t, c, l) {
      (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
          t.componentWillReceiveProps(c, l),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
          t.UNSAFE_componentWillReceiveProps(c, l),
        t.state !== e && ta.enqueueReplaceState(t, t.state, null);
    }
    function sm(e, t, c, l) {
      var n = e.stateNode;
      (n.props = c), (n.state = e.memoizedState), (n.refs = {}), Pm(e);
      var o = t.contextType;
      typeof o == "object" && o !== null
        ? (n.context = Rc(o))
        : ((o = Mt(t) ? Qn : Bt.current), (n.context = Do(e, o))),
        (n.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (am(e, t, o, c), (n.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((t = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          t !== n.state && ta.enqueueReplaceState(n, n.state, null),
          Oi(e, c, n, l),
          (n.state = e.memoizedState)),
        typeof n.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function jo(e, t) {
      try {
        var c = "",
          l = t;
        do (c += YB(l)), (l = l.return);
        while (l);
        var n = c;
      } catch (o) {
        n =
          `
Error generating stack: ` +
          o.message +
          `
` +
          o.stack;
      }
      return { value: e, source: t, stack: n, digest: null };
    }
    function Vb(e, t, c) {
      return { value: e, source: null, stack: c ?? null, digest: t ?? null };
    }
    function bm(e, t) {
      try {
        console.error(t.value);
      } catch (c) {
        setTimeout(function () {
          throw c;
        });
      }
    }
    var nv = typeof WeakMap == "function" ? WeakMap : Map;
    function IH(e, t, c) {
      (c = Rl(-1, c)), (c.tag = 3), (c.payload = { element: null });
      var l = t.value;
      return (
        (c.callback = function () {
          Di || ((Di = !0), (fm = l)), bm(e, t);
        }),
        c
      );
    }
    function yH(e, t, c) {
      (c = Rl(-1, c)), (c.tag = 3);
      var l = e.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var n = t.value;
        (c.payload = function () {
          return l(n);
        }),
          (c.callback = function () {
            bm(e, t);
          });
      }
      var o = e.stateNode;
      return (
        o !== null &&
          typeof o.componentDidCatch == "function" &&
          (c.callback = function () {
            bm(e, t),
              typeof l != "function" &&
                (nn === null ? (nn = new Set([this])) : nn.add(this));
            var r = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: r !== null ? r : "",
            });
          }),
        c
      );
    }
    function Np(e, t, c) {
      var l = e.pingCache;
      if (l === null) {
        l = e.pingCache = new nv();
        var n = new Set();
        l.set(t, n);
      } else (n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n));
      n.has(c) || (n.add(c), (e = gv.bind(null, e, t, c)), t.then(e, e));
    }
    function zp(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) &&
            ((t = e.memoizedState),
            (t = t !== null ? t.dehydrated !== null : !0)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function kp(e, t, c, l, n) {
      return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = n), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (c.flags |= 131072),
              (c.flags &= -52805),
              c.tag === 1 &&
                (c.alternate === null
                  ? (c.tag = 17)
                  : ((t = Rl(-1, 1)), (t.tag = 2), ln(c, t, 1))),
              (c.lanes |= 1)),
          e);
    }
    var ov = Bl.ReactCurrentOwner,
      Dt = !1;
    function Jt(e, t, c, l) {
      t.child = e === null ? $g(t, null, c, l) : Mo(t, e.child, c, l);
    }
    function Sp(e, t, c, l, n) {
      c = c.render;
      var o = t.ref;
      return (
        Ao(t, n),
        (l = eX(e, t, c, l, o, n)),
        (c = tX()),
        e !== null && !Dt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~n),
            Wl(e, t, n))
          : (Ve && c && Lm(t), (t.flags |= 1), Jt(e, t, l, n), t.child)
      );
    }
    function Op(e, t, c, l, n) {
      if (e === null) {
        var o = c.type;
        return typeof o == "function" &&
          !sX(o) &&
          o.defaultProps === void 0 &&
          c.compare === null &&
          c.defaultProps === void 0
          ? ((t.tag = 15), (t.type = o), WH(e, t, o, l, n))
          : ((e = Ii(c.type, null, l, t, t.mode, n)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((o = e.child), !(e.lanes & n))) {
        var r = o.memoizedProps;
        if (
          ((c = c.compare),
          (c = c !== null ? c : md),
          c(r, l) && e.ref === t.ref)
        )
          return Wl(e, t, n);
      }
      return (
        (t.flags |= 1),
        (e = rn(o, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function WH(e, t, c, l, n) {
      if (e !== null) {
        var o = e.memoizedProps;
        if (md(o, l) && e.ref === t.ref)
          if (((Dt = !1), (t.pendingProps = l = o), (e.lanes & n) !== 0))
            e.flags & 131072 && (Dt = !0);
          else return (t.lanes = e.lanes), Wl(e, t, n);
      }
      return mm(e, t, c, l, n);
    }
    function BH(e, t, c) {
      var l = t.pendingProps,
        n = l.children,
        o = e !== null ? e.memoizedState : null;
      if (l.mode === "hidden")
        if (!(t.mode & 1))
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            fe(ko, cc),
            (cc |= c);
        else {
          if (!(c & 1073741824))
            return (
              (e = o !== null ? o.baseLanes | c : c),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              fe(ko, cc),
              (cc |= e),
              null
            );
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (l = o !== null ? o.baseLanes : c),
            fe(ko, cc),
            (cc |= l);
        }
      else
        o !== null
          ? ((l = o.baseLanes | c), (t.memoizedState = null))
          : (l = c),
          fe(ko, cc),
          (cc |= l);
      return Jt(e, t, n, c), t.child;
    }
    function vH(e, t) {
      var c = t.ref;
      ((e === null && c !== null) || (e !== null && e.ref !== c)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function mm(e, t, c, l, n) {
      var o = Mt(c) ? Qn : Bt.current;
      return (
        (o = Do(t, o)),
        Ao(t, n),
        (c = eX(e, t, c, l, o, n)),
        (l = tX()),
        e !== null && !Dt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~n),
            Wl(e, t, n))
          : (Ve && l && Lm(t), (t.flags |= 1), Jt(e, t, c, n), t.child)
      );
    }
    function Qp(e, t, c, l, n) {
      if (Mt(c)) {
        var o = !0;
        Ni(t);
      } else o = !1;
      if ((Ao(t, n), t.stateNode === null))
        Zi(e, t), fH(t, c, l), sm(t, c, l, n), (l = !0);
      else if (e === null) {
        var r = t.stateNode,
          d = t.memoizedProps;
        r.props = d;
        var u = r.context,
          i = c.contextType;
        typeof i == "object" && i !== null
          ? (i = Rc(i))
          : ((i = Mt(c) ? Qn : Bt.current), (i = Do(t, i)));
        var a = c.getDerivedStateFromProps,
          s =
            typeof a == "function" ||
            typeof r.getSnapshotBeforeUpdate == "function";
        s ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((d !== l || u !== i) && Yp(t, r, l, i)),
          (jl = !1);
        var b = t.memoizedState;
        (r.state = b),
          Oi(t, l, r, n),
          (u = t.memoizedState),
          d !== l || b !== u || Ut.current || jl
            ? (typeof a == "function" &&
                (am(t, c, a, l), (u = t.memoizedState)),
              (d = jl || Jp(t, c, d, l, b, u, i))
                ? (s ||
                    (typeof r.UNSAFE_componentWillMount != "function" &&
                      typeof r.componentWillMount != "function") ||
                    (typeof r.componentWillMount == "function" &&
                      r.componentWillMount(),
                    typeof r.UNSAFE_componentWillMount == "function" &&
                      r.UNSAFE_componentWillMount()),
                  typeof r.componentDidMount == "function" &&
                    (t.flags |= 4194308))
                : (typeof r.componentDidMount == "function" &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = l),
                  (t.memoizedState = u)),
              (r.props = l),
              (r.state = u),
              (r.context = i),
              (l = d))
            : (typeof r.componentDidMount == "function" && (t.flags |= 4194308),
              (l = !1));
      } else {
        (r = t.stateNode),
          tH(e, t),
          (d = t.memoizedProps),
          (i = t.type === t.elementType ? d : zc(t.type, d)),
          (r.props = i),
          (s = t.pendingProps),
          (b = r.context),
          (u = c.contextType),
          typeof u == "object" && u !== null
            ? (u = Rc(u))
            : ((u = Mt(c) ? Qn : Bt.current), (u = Do(t, u)));
        var m = c.getDerivedStateFromProps;
        (a =
          typeof m == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((d !== s || b !== u) && Yp(t, r, l, u)),
          (jl = !1),
          (b = t.memoizedState),
          (r.state = b),
          Oi(t, l, r, n);
        var x = t.memoizedState;
        d !== s || b !== x || Ut.current || jl
          ? (typeof m == "function" && (am(t, c, m, l), (x = t.memoizedState)),
            (i = jl || Jp(t, c, i, l, b, x, u) || !1)
              ? (a ||
                  (typeof r.UNSAFE_componentWillUpdate != "function" &&
                    typeof r.componentWillUpdate != "function") ||
                  (typeof r.componentWillUpdate == "function" &&
                    r.componentWillUpdate(l, x, u),
                  typeof r.UNSAFE_componentWillUpdate == "function" &&
                    r.UNSAFE_componentWillUpdate(l, x, u)),
                typeof r.componentDidUpdate == "function" && (t.flags |= 4),
                typeof r.getSnapshotBeforeUpdate == "function" &&
                  (t.flags |= 1024))
              : (typeof r.componentDidUpdate != "function" ||
                  (d === e.memoizedProps && b === e.memoizedState) ||
                  (t.flags |= 4),
                typeof r.getSnapshotBeforeUpdate != "function" ||
                  (d === e.memoizedProps && b === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = l),
                (t.memoizedState = x)),
            (r.props = l),
            (r.state = x),
            (r.context = u),
            (l = i))
          : (typeof r.componentDidUpdate != "function" ||
              (d === e.memoizedProps && b === e.memoizedState) ||
              (t.flags |= 4),
            typeof r.getSnapshotBeforeUpdate != "function" ||
              (d === e.memoizedProps && b === e.memoizedState) ||
              (t.flags |= 1024),
            (l = !1));
      }
      return Xm(e, t, c, l, o, n);
    }
    function Xm(e, t, c, l, n, o) {
      vH(e, t);
      var r = (t.flags & 128) !== 0;
      if (!l && !r) return n && yp(t, c, !1), Wl(e, t, o);
      (l = t.stateNode), (ov.current = t);
      var d =
        r && typeof c.getDerivedStateFromError != "function"
          ? null
          : l.render();
      return (
        (t.flags |= 1),
        e !== null && r
          ? ((t.child = Mo(t, e.child, null, o)), (t.child = Mo(t, null, d, o)))
          : Jt(e, t, d, o),
        (t.memoizedState = l.state),
        n && yp(t, c, !0),
        t.child
      );
    }
    function FH(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Ip(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Ip(e, t.context, !1),
        Km(e, t.containerInfo);
    }
    function Ap(e, t, c, l, n) {
      return Uo(), Dm(n), (t.flags |= 256), Jt(e, t, c, l), t.child;
    }
    var xm = { dehydrated: null, treeContext: null, retryLane: 0 };
    function Gm(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function hH(e, t, c) {
      var l = t.pendingProps,
        n = Ne.current,
        o = !1,
        r = (t.flags & 128) !== 0,
        d;
      if (
        ((d = r) ||
          (d = e !== null && e.memoizedState === null ? !1 : (n & 2) !== 0),
        d
          ? ((o = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (n |= 1),
        fe(Ne, n & 1),
        e === null)
      )
        return (
          um(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? (t.mode & 1
                ? e.data === "$!"
                  ? (t.lanes = 8)
                  : (t.lanes = 1073741824)
                : (t.lanes = 1),
              null)
            : ((r = l.children),
              (e = l.fallback),
              o
                ? ((l = t.mode),
                  (o = t.child),
                  (r = { mode: "hidden", children: r }),
                  !(l & 1) && o !== null
                    ? ((o.childLanes = 0), (o.pendingProps = r))
                    : (o = na(r, l, 0, null)),
                  (e = On(e, l, c, null)),
                  (o.return = t),
                  (e.return = t),
                  (o.sibling = e),
                  (t.child = o),
                  (t.child.memoizedState = Gm(c)),
                  (t.memoizedState = xm),
                  e)
                : nX(t, r))
        );
      if (
        ((n = e.memoizedState), n !== null && ((d = n.dehydrated), d !== null))
      )
        return rv(e, t, r, l, d, n, c);
      if (o) {
        (o = l.fallback), (r = t.mode), (n = e.child), (d = n.sibling);
        var u = { mode: "hidden", children: l.children };
        return (
          !(r & 1) && t.child !== n
            ? ((l = t.child),
              (l.childLanes = 0),
              (l.pendingProps = u),
              (t.deletions = null))
            : ((l = rn(n, u)), (l.subtreeFlags = n.subtreeFlags & 14680064)),
          d !== null
            ? (o = rn(d, o))
            : ((o = On(o, r, c, null)), (o.flags |= 2)),
          (o.return = t),
          (l.return = t),
          (l.sibling = o),
          (t.child = l),
          (l = o),
          (o = t.child),
          (r = e.child.memoizedState),
          (r =
            r === null
              ? Gm(c)
              : {
                  baseLanes: r.baseLanes | c,
                  cachePool: null,
                  transitions: r.transitions,
                }),
          (o.memoizedState = r),
          (o.childLanes = e.childLanes & ~c),
          (t.memoizedState = xm),
          l
        );
      }
      return (
        (o = e.child),
        (e = o.sibling),
        (l = rn(o, { mode: "visible", children: l.children })),
        !(t.mode & 1) && (l.lanes = c),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [e]), (t.flags |= 16)) : c.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l
      );
    }
    function nX(e, t) {
      return (
        (t = na({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function si(e, t, c, l) {
      return (
        l !== null && Dm(l),
        Mo(t, e.child, null, c),
        (e = nX(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function rv(e, t, c, l, n, o, r) {
      if (c)
        return t.flags & 256
          ? ((t.flags &= -257), (l = Vb(Error(z(422)))), si(e, t, r, l))
          : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = l.fallback),
              (n = t.mode),
              (l = na({ mode: "visible", children: l.children }, n, 0, null)),
              (o = On(o, n, r, null)),
              (o.flags |= 2),
              (l.return = t),
              (o.return = t),
              (l.sibling = o),
              (t.child = l),
              t.mode & 1 && Mo(t, e.child, null, r),
              (t.child.memoizedState = Gm(r)),
              (t.memoizedState = xm),
              o);
      if (!(t.mode & 1)) return si(e, t, r, null);
      if (n.data === "$!") {
        if (((l = n.nextSibling && n.nextSibling.dataset), l)) var d = l.dgst;
        return (
          (l = d), (o = Error(z(419))), (l = Vb(o, l, void 0)), si(e, t, r, l)
        );
      }
      if (((d = (r & e.childLanes) !== 0), Dt || d)) {
        if (((l = ot), l !== null)) {
          switch (r & -r) {
            case 4:
              n = 2;
              break;
            case 16:
              n = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              n = 32;
              break;
            case 536870912:
              n = 268435456;
              break;
            default:
              n = 0;
          }
          (n = n & (l.suspendedLanes | r) ? 0 : n),
            n !== 0 &&
              n !== o.retryLane &&
              ((o.retryLane = n), yl(e, n), Oc(l, e, n, -1));
        }
        return aX(), (l = Vb(Error(z(421)))), si(e, t, r, l);
      }
      return n.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Hv.bind(null, e)),
          (n._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (lc = cn(n.nextSibling)),
          (nc = t),
          (Ve = !0),
          (wc = null),
          e !== null &&
            ((pc[gc++] = Hl),
            (pc[gc++] = Zl),
            (pc[gc++] = An),
            (Hl = e.id),
            (Zl = e.overflow),
            (An = t)),
          (t = nX(t, l.children)),
          (t.flags |= 4096),
          t);
    }
    function Lp(e, t, c) {
      e.lanes |= t;
      var l = e.alternate;
      l !== null && (l.lanes |= t), im(e.return, t, c);
    }
    function Cb(e, t, c, l, n) {
      var o = e.memoizedState;
      o === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: c,
            tailMode: n,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = l),
          (o.tail = c),
          (o.tailMode = n));
    }
    function VH(e, t, c) {
      var l = t.pendingProps,
        n = l.revealOrder,
        o = l.tail;
      if ((Jt(e, t, l.children, c), (l = Ne.current), l & 2))
        (l = (l & 1) | 2), (t.flags |= 128);
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Lp(e, c, t);
            else if (e.tag === 19) Lp(e, c, t);
            else if (e.child !== null) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        l &= 1;
      }
      if ((fe(Ne, l), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (n) {
          case "forwards":
            for (c = t.child, n = null; c !== null; )
              (e = c.alternate),
                e !== null && Qi(e) === null && (n = c),
                (c = c.sibling);
            (c = n),
              c === null
                ? ((n = t.child), (t.child = null))
                : ((n = c.sibling), (c.sibling = null)),
              Cb(t, !1, n, c, o);
            break;
          case "backwards":
            for (c = null, n = t.child, t.child = null; n !== null; ) {
              if (((e = n.alternate), e !== null && Qi(e) === null)) {
                t.child = n;
                break;
              }
              (e = n.sibling), (n.sibling = c), (c = n), (n = e);
            }
            Cb(t, !0, c, null, o);
            break;
          case "together":
            Cb(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Zi(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function Wl(e, t, c) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Tn |= t.lanes),
        !(c & t.childLanes))
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(z(153));
      if (t.child !== null) {
        for (
          e = t.child, c = rn(e, e.pendingProps), t.child = c, c.return = t;
          e.sibling !== null;

        )
          (e = e.sibling),
            (c = c.sibling = rn(e, e.pendingProps)),
            (c.return = t);
        c.sibling = null;
      }
      return t.child;
    }
    function dv(e, t, c) {
      switch (t.tag) {
        case 3:
          FH(t), Uo();
          break;
        case 5:
          cH(t);
          break;
        case 1:
          Mt(t.type) && Ni(t);
          break;
        case 4:
          Km(t, t.stateNode.containerInfo);
          break;
        case 10:
          var l = t.type._context,
            n = t.memoizedProps.value;
          fe(wi, l._currentValue), (l._currentValue = n);
          break;
        case 13:
          if (((l = t.memoizedState), l !== null))
            return l.dehydrated !== null
              ? (fe(Ne, Ne.current & 1), (t.flags |= 128), null)
              : c & t.child.childLanes
                ? hH(e, t, c)
                : (fe(Ne, Ne.current & 1),
                  (e = Wl(e, t, c)),
                  e !== null ? e.sibling : null);
          fe(Ne, Ne.current & 1);
          break;
        case 19:
          if (((l = (c & t.childLanes) !== 0), e.flags & 128)) {
            if (l) return VH(e, t, c);
            t.flags |= 128;
          }
          if (
            ((n = t.memoizedState),
            n !== null &&
              ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
            fe(Ne, Ne.current),
            l)
          )
            break;
          return null;
        case 22:
        case 23:
          return (t.lanes = 0), BH(e, t, c);
      }
      return Wl(e, t, c);
    }
    var CH, pm, JH, YH;
    CH = function (e, t) {
      for (var c = t.child; c !== null; ) {
        if (c.tag === 5 || c.tag === 6) e.appendChild(c.stateNode);
        else if (c.tag !== 4 && c.child !== null) {
          (c.child.return = c), (c = c.child);
          continue;
        }
        if (c === t) break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === t) return;
          c = c.return;
        }
        (c.sibling.return = c.return), (c = c.sibling);
      }
    };
    pm = function () {};
    JH = function (e, t, c, l) {
      var n = e.memoizedProps;
      if (n !== l) {
        (e = t.stateNode), wn(cl.current);
        var o = null;
        switch (c) {
          case "input":
            (n = Ob(e, n)), (l = Ob(e, l)), (o = []);
            break;
          case "select":
            (n = ke({}, n, { value: void 0 })),
              (l = ke({}, l, { value: void 0 })),
              (o = []);
            break;
          case "textarea":
            (n = Lb(e, n)), (l = Lb(e, l)), (o = []);
            break;
          default:
            typeof n.onClick != "function" &&
              typeof l.onClick == "function" &&
              (e.onclick = Ji);
        }
        Db(c, l);
        var r;
        c = null;
        for (i in n)
          if (!l.hasOwnProperty(i) && n.hasOwnProperty(i) && n[i] != null)
            if (i === "style") {
              var d = n[i];
              for (r in d) d.hasOwnProperty(r) && (c || (c = {}), (c[r] = ""));
            } else
              i !== "dangerouslySetInnerHTML" &&
                i !== "children" &&
                i !== "suppressContentEditableWarning" &&
                i !== "suppressHydrationWarning" &&
                i !== "autoFocus" &&
                (rd.hasOwnProperty(i)
                  ? o || (o = [])
                  : (o = o || []).push(i, null));
        for (i in l) {
          var u = l[i];
          if (
            ((d = n?.[i]),
            l.hasOwnProperty(i) && u !== d && (u != null || d != null))
          )
            if (i === "style")
              if (d) {
                for (r in d)
                  !d.hasOwnProperty(r) ||
                    (u && u.hasOwnProperty(r)) ||
                    (c || (c = {}), (c[r] = ""));
                for (r in u)
                  u.hasOwnProperty(r) &&
                    d[r] !== u[r] &&
                    (c || (c = {}), (c[r] = u[r]));
              } else c || (o || (o = []), o.push(i, c)), (c = u);
            else
              i === "dangerouslySetInnerHTML"
                ? ((u = u ? u.__html : void 0),
                  (d = d ? d.__html : void 0),
                  u != null && d !== u && (o = o || []).push(i, u))
                : i === "children"
                  ? (typeof u != "string" && typeof u != "number") ||
                    (o = o || []).push(i, "" + u)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    (rd.hasOwnProperty(i)
                      ? (u != null && i === "onScroll" && We("scroll", e),
                        o || d === u || (o = []))
                      : (o = o || []).push(i, u));
        }
        c && (o = o || []).push("style", c);
        var i = o;
        (t.updateQueue = i) && (t.flags |= 4);
      }
    };
    YH = function (e, t, c, l) {
      c !== l && (t.flags |= 4);
    };
    function Dr(e, t) {
      if (!Ve)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var c = null; t !== null; )
              t.alternate !== null && (c = t), (t = t.sibling);
            c === null ? (e.tail = null) : (c.sibling = null);
            break;
          case "collapsed":
            c = e.tail;
            for (var l = null; c !== null; )
              c.alternate !== null && (l = c), (c = c.sibling);
            l === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (l.sibling = null);
        }
    }
    function yt(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        c = 0,
        l = 0;
      if (t)
        for (var n = e.child; n !== null; )
          (c |= n.lanes | n.childLanes),
            (l |= n.subtreeFlags & 14680064),
            (l |= n.flags & 14680064),
            (n.return = e),
            (n = n.sibling);
      else
        for (n = e.child; n !== null; )
          (c |= n.lanes | n.childLanes),
            (l |= n.subtreeFlags),
            (l |= n.flags),
            (n.return = e),
            (n = n.sibling);
      return (e.subtreeFlags |= l), (e.childLanes = c), t;
    }
    function uv(e, t, c) {
      var l = t.pendingProps;
      switch ((Tm(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return yt(t), null;
        case 1:
          return Mt(t.type) && Yi(), yt(t), null;
        case 3:
          return (
            (l = t.stateNode),
            Eo(),
            Be(Ut),
            Be(Bt),
            qm(),
            l.pendingContext &&
              ((l.context = l.pendingContext), (l.pendingContext = null)),
            (e === null || e.child === null) &&
              (ii(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), wc !== null && (Wm(wc), (wc = null)))),
            pm(e, t),
            yt(t),
            null
          );
        case 5:
          _m(t);
          var n = wn(gd.current);
          if (((c = t.type), e !== null && t.stateNode != null))
            JH(e, t, c, l, n),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
          else {
            if (!l) {
              if (t.stateNode === null) throw Error(z(166));
              return yt(t), null;
            }
            if (((e = wn(cl.current)), ii(t))) {
              (l = t.stateNode), (c = t.type);
              var o = t.memoizedProps;
              switch (((l[el] = t), (l[Gd] = o), (e = (t.mode & 1) !== 0), c)) {
                case "dialog":
                  We("cancel", l), We("close", l);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  We("load", l);
                  break;
                case "video":
                case "audio":
                  for (n = 0; n < Kr.length; n++) We(Kr[n], l);
                  break;
                case "source":
                  We("error", l);
                  break;
                case "img":
                case "image":
                case "link":
                  We("error", l), We("load", l);
                  break;
                case "details":
                  We("toggle", l);
                  break;
                case "input":
                  PG(l, o), We("invalid", l);
                  break;
                case "select":
                  (l._wrapperState = { wasMultiple: !!o.multiple }),
                    We("invalid", l);
                  break;
                case "textarea":
                  _G(l, o), We("invalid", l);
              }
              Db(c, o), (n = null);
              for (var r in o)
                if (o.hasOwnProperty(r)) {
                  var d = o[r];
                  r === "children"
                    ? typeof d == "string"
                      ? l.textContent !== d &&
                        (o.suppressHydrationWarning !== !0 &&
                          ui(l.textContent, d, e),
                        (n = ["children", d]))
                      : typeof d == "number" &&
                        l.textContent !== "" + d &&
                        (o.suppressHydrationWarning !== !0 &&
                          ui(l.textContent, d, e),
                        (n = ["children", "" + d]))
                    : rd.hasOwnProperty(r) &&
                      d != null &&
                      r === "onScroll" &&
                      We("scroll", l);
                }
              switch (c) {
                case "input":
                  Ku(l), KG(l, o, !0);
                  break;
                case "textarea":
                  Ku(l), qG(l);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof o.onClick == "function" && (l.onclick = Ji);
              }
              (l = n), (t.updateQueue = l), l !== null && (t.flags |= 4);
            } else {
              (r = n.nodeType === 9 ? n : n.ownerDocument),
                e === "http://www.w3.org/1999/xhtml" && (e = dg(c)),
                e === "http://www.w3.org/1999/xhtml"
                  ? c === "script"
                    ? ((e = r.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild)))
                    : typeof l.is == "string"
                      ? (e = r.createElement(c, { is: l.is }))
                      : ((e = r.createElement(c)),
                        c === "select" &&
                          ((r = e),
                          l.multiple
                            ? (r.multiple = !0)
                            : l.size && (r.size = l.size)))
                  : (e = r.createElementNS(e, c)),
                (e[el] = t),
                (e[Gd] = l),
                CH(e, t, !1, !1),
                (t.stateNode = e);
              e: {
                switch (((r = Ub(c, l)), c)) {
                  case "dialog":
                    We("cancel", e), We("close", e), (n = l);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    We("load", e), (n = l);
                    break;
                  case "video":
                  case "audio":
                    for (n = 0; n < Kr.length; n++) We(Kr[n], e);
                    n = l;
                    break;
                  case "source":
                    We("error", e), (n = l);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    We("error", e), We("load", e), (n = l);
                    break;
                  case "details":
                    We("toggle", e), (n = l);
                    break;
                  case "input":
                    PG(e, l), (n = Ob(e, l)), We("invalid", e);
                    break;
                  case "option":
                    n = l;
                    break;
                  case "select":
                    (e._wrapperState = { wasMultiple: !!l.multiple }),
                      (n = ke({}, l, { value: void 0 })),
                      We("invalid", e);
                    break;
                  case "textarea":
                    _G(e, l), (n = Lb(e, l)), We("invalid", e);
                    break;
                  default:
                    n = l;
                }
                Db(c, n), (d = n);
                for (o in d)
                  if (d.hasOwnProperty(o)) {
                    var u = d[o];
                    o === "style"
                      ? ag(e, u)
                      : o === "dangerouslySetInnerHTML"
                        ? ((u = u ? u.__html : void 0), u != null && ug(e, u))
                        : o === "children"
                          ? typeof u == "string"
                            ? (c !== "textarea" || u !== "") && dd(e, u)
                            : typeof u == "number" && dd(e, "" + u)
                          : o !== "suppressContentEditableWarning" &&
                            o !== "suppressHydrationWarning" &&
                            o !== "autoFocus" &&
                            (rd.hasOwnProperty(o)
                              ? u != null && o === "onScroll" && We("scroll", e)
                              : u != null && Fm(e, o, u, r));
                  }
                switch (c) {
                  case "input":
                    Ku(e), KG(e, l, !1);
                    break;
                  case "textarea":
                    Ku(e), qG(e);
                    break;
                  case "option":
                    l.value != null &&
                      e.setAttribute("value", "" + dn(l.value));
                    break;
                  case "select":
                    (e.multiple = !!l.multiple),
                      (o = l.value),
                      o != null
                        ? wo(e, !!l.multiple, o, !1)
                        : l.defaultValue != null &&
                          wo(e, !!l.multiple, l.defaultValue, !0);
                    break;
                  default:
                    typeof n.onClick == "function" && (e.onclick = Ji);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l = !!l.autoFocus;
                    break e;
                  case "img":
                    l = !0;
                    break e;
                  default:
                    l = !1;
                }
              }
              l && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return yt(t), null;
        case 6:
          if (e && t.stateNode != null) YH(e, t, e.memoizedProps, l);
          else {
            if (typeof l != "string" && t.stateNode === null)
              throw Error(z(166));
            if (((c = wn(gd.current)), wn(cl.current), ii(t))) {
              if (
                ((l = t.stateNode),
                (c = t.memoizedProps),
                (l[el] = t),
                (o = l.nodeValue !== c) && ((e = nc), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    ui(l.nodeValue, c, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      ui(l.nodeValue, c, (e.mode & 1) !== 0);
                }
              o && (t.flags |= 4);
            } else
              (l = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(l)),
                (l[el] = t),
                (t.stateNode = l);
          }
          return yt(t), null;
        case 13:
          if (
            (Be(Ne),
            (l = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (Ve && lc !== null && t.mode & 1 && !(t.flags & 128))
              _g(), Uo(), (t.flags |= 98560), (o = !1);
            else if (((o = ii(t)), l !== null && l.dehydrated !== null)) {
              if (e === null) {
                if (!o) throw Error(z(318));
                if (
                  ((o = t.memoizedState),
                  (o = o !== null ? o.dehydrated : null),
                  !o)
                )
                  throw Error(z(317));
                o[el] = t;
              } else
                Uo(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4);
              yt(t), (o = !1);
            } else wc !== null && (Wm(wc), (wc = null)), (o = !0);
            if (!o) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = c), t)
            : ((l = l !== null),
              l !== (e !== null && e.memoizedState !== null) &&
                l &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || Ne.current & 1 ? et === 0 && (et = 3) : aX())),
              t.updateQueue !== null && (t.flags |= 4),
              yt(t),
              null);
        case 4:
          return (
            Eo(),
            pm(e, t),
            e === null && Xd(t.stateNode.containerInfo),
            yt(t),
            null
          );
        case 10:
          return Em(t.type._context), yt(t), null;
        case 17:
          return Mt(t.type) && Yi(), yt(t), null;
        case 19:
          if ((Be(Ne), (o = t.memoizedState), o === null)) return yt(t), null;
          if (((l = (t.flags & 128) !== 0), (r = o.rendering), r === null))
            if (l) Dr(o, !1);
            else {
              if (et !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((r = Qi(e)), r !== null)) {
                    for (
                      t.flags |= 128,
                        Dr(o, !1),
                        l = r.updateQueue,
                        l !== null && ((t.updateQueue = l), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        l = c,
                        c = t.child;
                      c !== null;

                    )
                      (o = c),
                        (e = l),
                        (o.flags &= 14680066),
                        (r = o.alternate),
                        r === null
                          ? ((o.childLanes = 0),
                            (o.lanes = e),
                            (o.child = null),
                            (o.subtreeFlags = 0),
                            (o.memoizedProps = null),
                            (o.memoizedState = null),
                            (o.updateQueue = null),
                            (o.dependencies = null),
                            (o.stateNode = null))
                          : ((o.childLanes = r.childLanes),
                            (o.lanes = r.lanes),
                            (o.child = r.child),
                            (o.subtreeFlags = 0),
                            (o.deletions = null),
                            (o.memoizedProps = r.memoizedProps),
                            (o.memoizedState = r.memoizedState),
                            (o.updateQueue = r.updateQueue),
                            (o.type = r.type),
                            (e = r.dependencies),
                            (o.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (c = c.sibling);
                    return fe(Ne, (Ne.current & 1) | 2), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null &&
                Te() > Po &&
                ((t.flags |= 128), (l = !0), Dr(o, !1), (t.lanes = 4194304));
            }
          else {
            if (!l)
              if (((e = Qi(r)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (l = !0),
                  (c = e.updateQueue),
                  c !== null && ((t.updateQueue = c), (t.flags |= 4)),
                  Dr(o, !0),
                  o.tail === null &&
                    o.tailMode === "hidden" &&
                    !r.alternate &&
                    !Ve)
                )
                  return yt(t), null;
              } else
                2 * Te() - o.renderingStartTime > Po &&
                  c !== 1073741824 &&
                  ((t.flags |= 128), (l = !0), Dr(o, !1), (t.lanes = 4194304));
            o.isBackwards
              ? ((r.sibling = t.child), (t.child = r))
              : ((c = o.last),
                c !== null ? (c.sibling = r) : (t.child = r),
                (o.last = r));
          }
          return o.tail !== null
            ? ((t = o.tail),
              (o.rendering = t),
              (o.tail = t.sibling),
              (o.renderingStartTime = Te()),
              (t.sibling = null),
              (c = Ne.current),
              fe(Ne, l ? (c & 1) | 2 : c & 1),
              t)
            : (yt(t), null);
        case 22:
        case 23:
          return (
            iX(),
            (l = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== l && (t.flags |= 8192),
            l && t.mode & 1
              ? cc & 1073741824 &&
                (yt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : yt(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(z(156, t.tag));
    }
    function iv(e, t) {
      switch ((Tm(t), t.tag)) {
        case 1:
          return (
            Mt(t.type) && Yi(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            Eo(),
            Be(Ut),
            Be(Bt),
            qm(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return _m(t), null;
        case 13:
          if (
            (Be(Ne), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(z(340));
            Uo();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return Be(Ne), null;
        case 4:
          return Eo(), null;
        case 10:
          return Em(t.type._context), null;
        case 22:
        case 23:
          return iX(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var bi = !1,
      Wt = !1,
      av = typeof WeakSet == "function" ? WeakSet : Set,
      Q = null;
    function zo(e, t) {
      var c = e.ref;
      if (c !== null)
        if (typeof c == "function")
          try {
            c(null);
          } catch (l) {
            Oe(e, t, l);
          }
        else c.current = null;
    }
    function gm(e, t, c) {
      try {
        c();
      } catch (l) {
        Oe(e, t, l);
      }
    }
    var Tp = !1;
    function sv(e, t) {
      if (((tm = hi), (e = Sg()), Am(e))) {
        if ("selectionStart" in e)
          var c = { start: e.selectionStart, end: e.selectionEnd };
        else
          e: {
            c = ((c = e.ownerDocument) && c.defaultView) || window;
            var l = c.getSelection && c.getSelection();
            if (l && l.rangeCount !== 0) {
              c = l.anchorNode;
              var n = l.anchorOffset,
                o = l.focusNode;
              l = l.focusOffset;
              try {
                c.nodeType, o.nodeType;
              } catch {
                c = null;
                break e;
              }
              var r = 0,
                d = -1,
                u = -1,
                i = 0,
                a = 0,
                s = e,
                b = null;
              t: for (;;) {
                for (
                  var m;
                  s !== c || (n !== 0 && s.nodeType !== 3) || (d = r + n),
                    s !== o || (l !== 0 && s.nodeType !== 3) || (u = r + l),
                    s.nodeType === 3 && (r += s.nodeValue.length),
                    (m = s.firstChild) !== null;

                )
                  (b = s), (s = m);
                for (;;) {
                  if (s === e) break t;
                  if (
                    (b === c && ++i === n && (d = r),
                    b === o && ++a === l && (u = r),
                    (m = s.nextSibling) !== null)
                  )
                    break;
                  (s = b), (b = s.parentNode);
                }
                s = m;
              }
              c = d === -1 || u === -1 ? null : { start: d, end: u };
            } else c = null;
          }
        c = c || { start: 0, end: 0 };
      } else c = null;
      for (
        cm = { focusedElem: e, selectionRange: c }, hi = !1, Q = t;
        Q !== null;

      )
        if (
          ((t = Q), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          (e.return = t), (Q = e);
        else
          for (; Q !== null; ) {
            t = Q;
            try {
              var x = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (x !== null) {
                      var p = x.memoizedProps,
                        R = x.memoizedState,
                        X = t.stateNode,
                        G = X.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? p : zc(t.type, p),
                          R
                        );
                      X.__reactInternalSnapshotBeforeUpdate = G;
                    }
                    break;
                  case 3:
                    var g = t.stateNode.containerInfo;
                    g.nodeType === 1
                      ? (g.textContent = "")
                      : g.nodeType === 9 &&
                        g.documentElement &&
                        g.removeChild(g.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(z(163));
                }
            } catch (H) {
              Oe(t, t.return, H);
            }
            if (((e = t.sibling), e !== null)) {
              (e.return = t.return), (Q = e);
              break;
            }
            Q = t.return;
          }
      return (x = Tp), (Tp = !1), x;
    }
    function ld(e, t, c) {
      var l = t.updateQueue;
      if (((l = l !== null ? l.lastEffect : null), l !== null)) {
        var n = (l = l.next);
        do {
          if ((n.tag & e) === e) {
            var o = n.destroy;
            (n.destroy = void 0), o !== void 0 && gm(t, c, o);
          }
          n = n.next;
        } while (n !== l);
      }
    }
    function ca(e, t) {
      if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
      ) {
        var c = (t = t.next);
        do {
          if ((c.tag & e) === e) {
            var l = c.create;
            c.destroy = l();
          }
          c = c.next;
        } while (c !== t);
      }
    }
    function Hm(e) {
      var t = e.ref;
      if (t !== null) {
        var c = e.stateNode;
        switch (e.tag) {
          case 5:
            e = c;
            break;
          default:
            e = c;
        }
        typeof t == "function" ? t(e) : (t.current = e);
      }
    }
    function NH(e) {
      var t = e.alternate;
      t !== null && ((e.alternate = null), NH(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[el],
            delete t[Gd],
            delete t[om],
            delete t[E5],
            delete t[j5])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    function zH(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Dp(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || zH(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Zm(e, t, c) {
      var l = e.tag;
      if (l === 5 || l === 6)
        (e = e.stateNode),
          t
            ? c.nodeType === 8
              ? c.parentNode.insertBefore(e, t)
              : c.insertBefore(e, t)
            : (c.nodeType === 8
                ? ((t = c.parentNode), t.insertBefore(e, c))
                : ((t = c), t.appendChild(e)),
              (c = c._reactRootContainer),
              c != null || t.onclick !== null || (t.onclick = Ji));
      else if (l !== 4 && ((e = e.child), e !== null))
        for (Zm(e, t, c), e = e.sibling; e !== null; )
          Zm(e, t, c), (e = e.sibling);
    }
    function Rm(e, t, c) {
      var l = e.tag;
      if (l === 5 || l === 6)
        (e = e.stateNode), t ? c.insertBefore(e, t) : c.appendChild(e);
      else if (l !== 4 && ((e = e.child), e !== null))
        for (Rm(e, t, c), e = e.sibling; e !== null; )
          Rm(e, t, c), (e = e.sibling);
    }
    var bt = null,
      kc = !1;
    function Ml(e, t, c) {
      for (c = c.child; c !== null; ) kH(e, t, c), (c = c.sibling);
    }
    function kH(e, t, c) {
      if (tl && typeof tl.onCommitFiberUnmount == "function")
        try {
          tl.onCommitFiberUnmount(ji, c);
        } catch {}
      switch (c.tag) {
        case 5:
          Wt || zo(c, t);
        case 6:
          var l = bt,
            n = kc;
          (bt = null),
            Ml(e, t, c),
            (bt = l),
            (kc = n),
            bt !== null &&
              (kc
                ? ((e = bt),
                  (c = c.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(c)
                    : e.removeChild(c))
                : bt.removeChild(c.stateNode));
          break;
        case 18:
          bt !== null &&
            (kc
              ? ((e = bt),
                (c = c.stateNode),
                e.nodeType === 8
                  ? yb(e.parentNode, c)
                  : e.nodeType === 1 && yb(e, c),
                sd(e))
              : yb(bt, c.stateNode));
          break;
        case 4:
          (l = bt),
            (n = kc),
            (bt = c.stateNode.containerInfo),
            (kc = !0),
            Ml(e, t, c),
            (bt = l),
            (kc = n);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !Wt &&
            ((l = c.updateQueue),
            l !== null && ((l = l.lastEffect), l !== null))
          ) {
            n = l = l.next;
            do {
              var o = n,
                r = o.destroy;
              (o = o.tag),
                r !== void 0 && (o & 2 || o & 4) && gm(c, t, r),
                (n = n.next);
            } while (n !== l);
          }
          Ml(e, t, c);
          break;
        case 1:
          if (
            !Wt &&
            (zo(c, t),
            (l = c.stateNode),
            typeof l.componentWillUnmount == "function")
          )
            try {
              (l.props = c.memoizedProps),
                (l.state = c.memoizedState),
                l.componentWillUnmount();
            } catch (d) {
              Oe(c, t, d);
            }
          Ml(e, t, c);
          break;
        case 21:
          Ml(e, t, c);
          break;
        case 22:
          c.mode & 1
            ? ((Wt = (l = Wt) || c.memoizedState !== null),
              Ml(e, t, c),
              (Wt = l))
            : Ml(e, t, c);
          break;
        default:
          Ml(e, t, c);
      }
    }
    function Up(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var c = e.stateNode;
        c === null && (c = e.stateNode = new av()),
          t.forEach(function (l) {
            var n = Zv.bind(null, e, l);
            c.has(l) || (c.add(l), l.then(n, n));
          });
      }
    }
    function Nc(e, t) {
      var c = t.deletions;
      if (c !== null)
        for (var l = 0; l < c.length; l++) {
          var n = c[l];
          try {
            var o = e,
              r = t,
              d = r;
            e: for (; d !== null; ) {
              switch (d.tag) {
                case 5:
                  (bt = d.stateNode), (kc = !1);
                  break e;
                case 3:
                  (bt = d.stateNode.containerInfo), (kc = !0);
                  break e;
                case 4:
                  (bt = d.stateNode.containerInfo), (kc = !0);
                  break e;
              }
              d = d.return;
            }
            if (bt === null) throw Error(z(160));
            kH(o, r, n), (bt = null), (kc = !1);
            var u = n.alternate;
            u !== null && (u.return = null), (n.return = null);
          } catch (i) {
            Oe(n, t, i);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) wH(t, e), (t = t.sibling);
    }
    function wH(e, t) {
      var c = e.alternate,
        l = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Nc(t, e), qc(e), l & 4)) {
            try {
              ld(3, e, e.return), ca(3, e);
            } catch (p) {
              Oe(e, e.return, p);
            }
            try {
              ld(5, e, e.return);
            } catch (p) {
              Oe(e, e.return, p);
            }
          }
          break;
        case 1:
          Nc(t, e), qc(e), l & 512 && c !== null && zo(c, c.return);
          break;
        case 5:
          if (
            (Nc(t, e),
            qc(e),
            l & 512 && c !== null && zo(c, c.return),
            e.flags & 32)
          ) {
            var n = e.stateNode;
            try {
              dd(n, "");
            } catch (p) {
              Oe(e, e.return, p);
            }
          }
          if (l & 4 && ((n = e.stateNode), n != null)) {
            var o = e.memoizedProps,
              r = c !== null ? c.memoizedProps : o,
              d = e.type,
              u = e.updateQueue;
            if (((e.updateQueue = null), u !== null))
              try {
                d === "input" &&
                  o.type === "radio" &&
                  o.name != null &&
                  og(n, o),
                  Ub(d, r);
                var i = Ub(d, o);
                for (r = 0; r < u.length; r += 2) {
                  var a = u[r],
                    s = u[r + 1];
                  a === "style"
                    ? ag(n, s)
                    : a === "dangerouslySetInnerHTML"
                      ? ug(n, s)
                      : a === "children"
                        ? dd(n, s)
                        : Fm(n, a, s, i);
                }
                switch (d) {
                  case "input":
                    Qb(n, o);
                    break;
                  case "textarea":
                    rg(n, o);
                    break;
                  case "select":
                    var b = n._wrapperState.wasMultiple;
                    n._wrapperState.wasMultiple = !!o.multiple;
                    var m = o.value;
                    m != null
                      ? wo(n, !!o.multiple, m, !1)
                      : b !== !!o.multiple &&
                        (o.defaultValue != null
                          ? wo(n, !!o.multiple, o.defaultValue, !0)
                          : wo(n, !!o.multiple, o.multiple ? [] : "", !1));
                }
                n[Gd] = o;
              } catch (p) {
                Oe(e, e.return, p);
              }
          }
          break;
        case 6:
          if ((Nc(t, e), qc(e), l & 4)) {
            if (e.stateNode === null) throw Error(z(162));
            (n = e.stateNode), (o = e.memoizedProps);
            try {
              n.nodeValue = o;
            } catch (p) {
              Oe(e, e.return, p);
            }
          }
          break;
        case 3:
          if (
            (Nc(t, e),
            qc(e),
            l & 4 && c !== null && c.memoizedState.isDehydrated)
          )
            try {
              sd(t.containerInfo);
            } catch (p) {
              Oe(e, e.return, p);
            }
          break;
        case 4:
          Nc(t, e), qc(e);
          break;
        case 13:
          Nc(t, e),
            qc(e),
            (n = e.child),
            n.flags & 8192 &&
              ((o = n.memoizedState !== null),
              (n.stateNode.isHidden = o),
              !o ||
                (n.alternate !== null && n.alternate.memoizedState !== null) ||
                (dX = Te())),
            l & 4 && Up(e);
          break;
        case 22:
          if (
            ((a = c !== null && c.memoizedState !== null),
            e.mode & 1 ? ((Wt = (i = Wt) || a), Nc(t, e), (Wt = i)) : Nc(t, e),
            qc(e),
            l & 8192)
          ) {
            if (
              ((i = e.memoizedState !== null),
              (e.stateNode.isHidden = i) && !a && e.mode & 1)
            )
              for (Q = e, a = e.child; a !== null; ) {
                for (s = Q = a; Q !== null; ) {
                  switch (((b = Q), (m = b.child), b.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      ld(4, b, b.return);
                      break;
                    case 1:
                      zo(b, b.return);
                      var x = b.stateNode;
                      if (typeof x.componentWillUnmount == "function") {
                        (l = b), (c = b.return);
                        try {
                          (t = l),
                            (x.props = t.memoizedProps),
                            (x.state = t.memoizedState),
                            x.componentWillUnmount();
                        } catch (p) {
                          Oe(l, c, p);
                        }
                      }
                      break;
                    case 5:
                      zo(b, b.return);
                      break;
                    case 22:
                      if (b.memoizedState !== null) {
                        Ep(s);
                        continue;
                      }
                  }
                  m !== null ? ((m.return = b), (Q = m)) : Ep(s);
                }
                a = a.sibling;
              }
            e: for (a = null, s = e; ; ) {
              if (s.tag === 5) {
                if (a === null) {
                  a = s;
                  try {
                    (n = s.stateNode),
                      i
                        ? ((o = n.style),
                          typeof o.setProperty == "function"
                            ? o.setProperty("display", "none", "important")
                            : (o.display = "none"))
                        : ((d = s.stateNode),
                          (u = s.memoizedProps.style),
                          (r =
                            u != null && u.hasOwnProperty("display")
                              ? u.display
                              : null),
                          (d.style.display = ig("display", r)));
                  } catch (p) {
                    Oe(e, e.return, p);
                  }
                }
              } else if (s.tag === 6) {
                if (a === null)
                  try {
                    s.stateNode.nodeValue = i ? "" : s.memoizedProps;
                  } catch (p) {
                    Oe(e, e.return, p);
                  }
              } else if (
                ((s.tag !== 22 && s.tag !== 23) ||
                  s.memoizedState === null ||
                  s === e) &&
                s.child !== null
              ) {
                (s.child.return = s), (s = s.child);
                continue;
              }
              if (s === e) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === e) break e;
                a === s && (a = null), (s = s.return);
              }
              a === s && (a = null),
                (s.sibling.return = s.return),
                (s = s.sibling);
            }
          }
          break;
        case 19:
          Nc(t, e), qc(e), l & 4 && Up(e);
          break;
        case 21:
          break;
        default:
          Nc(t, e), qc(e);
      }
    }
    function qc(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var c = e.return; c !== null; ) {
              if (zH(c)) {
                var l = c;
                break e;
              }
              c = c.return;
            }
            throw Error(z(160));
          }
          switch (l.tag) {
            case 5:
              var n = l.stateNode;
              l.flags & 32 && (dd(n, ""), (l.flags &= -33));
              var o = Dp(e);
              Rm(e, o, n);
              break;
            case 3:
            case 4:
              var r = l.stateNode.containerInfo,
                d = Dp(e);
              Zm(e, d, r);
              break;
            default:
              throw Error(z(161));
          }
        } catch (u) {
          Oe(e, e.return, u);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function bv(e, t, c) {
      (Q = e), SH(e, t, c);
    }
    function SH(e, t, c) {
      for (var l = (e.mode & 1) !== 0; Q !== null; ) {
        var n = Q,
          o = n.child;
        if (n.tag === 22 && l) {
          var r = n.memoizedState !== null || bi;
          if (!r) {
            var d = n.alternate,
              u = (d !== null && d.memoizedState !== null) || Wt;
            d = bi;
            var i = Wt;
            if (((bi = r), (Wt = u) && !i))
              for (Q = n; Q !== null; )
                (r = Q),
                  (u = r.child),
                  r.tag === 22 && r.memoizedState !== null
                    ? jp(n)
                    : u !== null
                      ? ((u.return = r), (Q = u))
                      : jp(n);
            for (; o !== null; ) (Q = o), SH(o, t, c), (o = o.sibling);
            (Q = n), (bi = d), (Wt = i);
          }
          Mp(e, t, c);
        } else
          n.subtreeFlags & 8772 && o !== null
            ? ((o.return = n), (Q = o))
            : Mp(e, t, c);
      }
    }
    function Mp(e) {
      for (; Q !== null; ) {
        var t = Q;
        if (t.flags & 8772) {
          var c = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  Wt || ca(5, t);
                  break;
                case 1:
                  var l = t.stateNode;
                  if (t.flags & 4 && !Wt)
                    if (c === null) l.componentDidMount();
                    else {
                      var n =
                        t.elementType === t.type
                          ? c.memoizedProps
                          : zc(t.type, c.memoizedProps);
                      l.componentDidUpdate(
                        n,
                        c.memoizedState,
                        l.__reactInternalSnapshotBeforeUpdate
                      );
                    }
                  var o = t.updateQueue;
                  o !== null && hp(t, o, l);
                  break;
                case 3:
                  var r = t.updateQueue;
                  if (r !== null) {
                    if (((c = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          c = t.child.stateNode;
                          break;
                        case 1:
                          c = t.child.stateNode;
                      }
                    hp(t, r, c);
                  }
                  break;
                case 5:
                  var d = t.stateNode;
                  if (c === null && t.flags & 4) {
                    c = d;
                    var u = t.memoizedProps;
                    switch (t.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        u.autoFocus && c.focus();
                        break;
                      case "img":
                        u.src && (c.src = u.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var i = t.alternate;
                    if (i !== null) {
                      var a = i.memoizedState;
                      if (a !== null) {
                        var s = a.dehydrated;
                        s !== null && sd(s);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(z(163));
              }
            Wt || (t.flags & 512 && Hm(t));
          } catch (b) {
            Oe(t, t.return, b);
          }
        }
        if (t === e) {
          Q = null;
          break;
        }
        if (((c = t.sibling), c !== null)) {
          (c.return = t.return), (Q = c);
          break;
        }
        Q = t.return;
      }
    }
    function Ep(e) {
      for (; Q !== null; ) {
        var t = Q;
        if (t === e) {
          Q = null;
          break;
        }
        var c = t.sibling;
        if (c !== null) {
          (c.return = t.return), (Q = c);
          break;
        }
        Q = t.return;
      }
    }
    function jp(e) {
      for (; Q !== null; ) {
        var t = Q;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var c = t.return;
              try {
                ca(4, t);
              } catch (u) {
                Oe(t, c, u);
              }
              break;
            case 1:
              var l = t.stateNode;
              if (typeof l.componentDidMount == "function") {
                var n = t.return;
                try {
                  l.componentDidMount();
                } catch (u) {
                  Oe(t, n, u);
                }
              }
              var o = t.return;
              try {
                Hm(t);
              } catch (u) {
                Oe(t, o, u);
              }
              break;
            case 5:
              var r = t.return;
              try {
                Hm(t);
              } catch (u) {
                Oe(t, r, u);
              }
          }
        } catch (u) {
          Oe(t, t.return, u);
        }
        if (t === e) {
          Q = null;
          break;
        }
        var d = t.sibling;
        if (d !== null) {
          (d.return = t.return), (Q = d);
          break;
        }
        Q = t.return;
      }
    }
    var mv = Math.ceil,
      Ti = Bl.ReactCurrentDispatcher,
      oX = Bl.ReactCurrentOwner,
      Zc = Bl.ReactCurrentBatchConfig,
      de = 0,
      ot = null,
      Pe = null,
      mt = 0,
      cc = 0,
      ko = sn(0),
      et = 0,
      fd = null,
      Tn = 0,
      la = 0,
      rX = 0,
      nd = null,
      Tt = null,
      dX = 0,
      Po = 1 / 0,
      pl = null,
      Di = !1,
      fm = null,
      nn = null,
      mi = !1,
      ql = null,
      Ui = 0,
      od = 0,
      Im = null,
      Ri = -1,
      fi = 0;
    function Yt() {
      return de & 6 ? Te() : Ri !== -1 ? Ri : (Ri = Te());
    }
    function on(e) {
      return e.mode & 1
        ? de & 2 && mt !== 0
          ? mt & -mt
          : K5.transition !== null
            ? (fi === 0 && (fi = fg()), fi)
            : ((e = me),
              e !== 0 ||
                ((e = window.event), (e = e === void 0 ? 16 : hg(e.type))),
              e)
        : 1;
    }
    function Oc(e, t, c, l) {
      if (50 < od) throw ((od = 0), (Im = null), Error(z(185)));
      Id(e, c, l),
        (!(de & 2) || e !== ot) &&
          (e === ot && (!(de & 2) && (la |= c), et === 4 && Kl(e, mt)),
          Et(e, l),
          c === 1 &&
            de === 0 &&
            !(t.mode & 1) &&
            ((Po = Te() + 500), $i && bn()));
    }
    function Et(e, t) {
      var c = e.callbackNode;
      qB(e, t);
      var l = Fi(e, e === ot ? mt : 0);
      if (l === 0)
        c !== null && tp(c), (e.callbackNode = null), (e.callbackPriority = 0);
      else if (((t = l & -l), e.callbackPriority !== t)) {
        if ((c != null && tp(c), t === 1))
          e.tag === 0 ? P5(Pp.bind(null, e)) : jg(Pp.bind(null, e)),
            U5(function () {
              !(de & 6) && bn();
            }),
            (c = null);
        else {
          switch (Ig(l)) {
            case 1:
              c = Ym;
              break;
            case 4:
              c = Zg;
              break;
            case 16:
              c = vi;
              break;
            case 536870912:
              c = Rg;
              break;
            default:
              c = vi;
          }
          c = MH(c, OH.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = c);
      }
    }
    function OH(e, t) {
      if (((Ri = -1), (fi = 0), de & 6)) throw Error(z(327));
      var c = e.callbackNode;
      if (Lo() && e.callbackNode !== c) return null;
      var l = Fi(e, e === ot ? mt : 0);
      if (l === 0) return null;
      if (l & 30 || l & e.expiredLanes || t) t = Mi(e, l);
      else {
        t = l;
        var n = de;
        de |= 2;
        var o = AH();
        (ot !== e || mt !== t) && ((pl = null), (Po = Te() + 500), Sn(e, t));
        do
          try {
            Gv();
            break;
          } catch (d) {
            QH(e, d);
          }
        while (!0);
        Mm(),
          (Ti.current = o),
          (de = n),
          Pe !== null ? (t = 0) : ((ot = null), (mt = 0), (t = et));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((n = Kb(e)), n !== 0 && ((l = n), (t = ym(e, n)))),
          t === 1)
        )
          throw ((c = fd), Sn(e, 0), Kl(e, l), Et(e, Te()), c);
        if (t === 6) Kl(e, l);
        else {
          if (
            ((n = e.current.alternate),
            !(l & 30) &&
              !Xv(n) &&
              ((t = Mi(e, l)),
              t === 2 && ((o = Kb(e)), o !== 0 && ((l = o), (t = ym(e, o)))),
              t === 1))
          )
            throw ((c = fd), Sn(e, 0), Kl(e, l), Et(e, Te()), c);
          switch (((e.finishedWork = n), (e.finishedLanes = l), t)) {
            case 0:
            case 1:
              throw Error(z(345));
            case 2:
              Nn(e, Tt, pl);
              break;
            case 3:
              if (
                (Kl(e, l),
                (l & 130023424) === l && ((t = dX + 500 - Te()), 10 < t))
              ) {
                if (Fi(e, 0) !== 0) break;
                if (((n = e.suspendedLanes), (n & l) !== l)) {
                  Yt(), (e.pingedLanes |= e.suspendedLanes & n);
                  break;
                }
                e.timeoutHandle = nm(Nn.bind(null, e, Tt, pl), t);
                break;
              }
              Nn(e, Tt, pl);
              break;
            case 4:
              if ((Kl(e, l), (l & 4194240) === l)) break;
              for (t = e.eventTimes, n = -1; 0 < l; ) {
                var r = 31 - Sc(l);
                (o = 1 << r), (r = t[r]), r > n && (n = r), (l &= ~o);
              }
              if (
                ((l = n),
                (l = Te() - l),
                (l =
                  (120 > l
                    ? 120
                    : 480 > l
                      ? 480
                      : 1080 > l
                        ? 1080
                        : 1920 > l
                          ? 1920
                          : 3e3 > l
                            ? 3e3
                            : 4320 > l
                              ? 4320
                              : 1960 * mv(l / 1960)) - l),
                10 < l)
              ) {
                e.timeoutHandle = nm(Nn.bind(null, e, Tt, pl), l);
                break;
              }
              Nn(e, Tt, pl);
              break;
            case 5:
              Nn(e, Tt, pl);
              break;
            default:
              throw Error(z(329));
          }
        }
      }
      return Et(e, Te()), e.callbackNode === c ? OH.bind(null, e) : null;
    }
    function ym(e, t) {
      var c = nd;
      return (
        e.current.memoizedState.isDehydrated && (Sn(e, t).flags |= 256),
        (e = Mi(e, t)),
        e !== 2 && ((t = Tt), (Tt = c), t !== null && Wm(t)),
        e
      );
    }
    function Wm(e) {
      Tt === null ? (Tt = e) : Tt.push.apply(Tt, e);
    }
    function Xv(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var c = t.updateQueue;
          if (c !== null && ((c = c.stores), c !== null))
            for (var l = 0; l < c.length; l++) {
              var n = c[l],
                o = n.getSnapshot;
              n = n.value;
              try {
                if (!Qc(o(), n)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((c = t.child), t.subtreeFlags & 16384 && c !== null))
          (c.return = t), (t = c);
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return !0;
    }
    function Kl(e, t) {
      for (
        t &= ~rX,
          t &= ~la,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;

      ) {
        var c = 31 - Sc(t),
          l = 1 << c;
        (e[c] = -1), (t &= ~l);
      }
    }
    function Pp(e) {
      if (de & 6) throw Error(z(327));
      Lo();
      var t = Fi(e, 0);
      if (!(t & 1)) return Et(e, Te()), null;
      var c = Mi(e, t);
      if (e.tag !== 0 && c === 2) {
        var l = Kb(e);
        l !== 0 && ((t = l), (c = ym(e, l)));
      }
      if (c === 1) throw ((c = fd), Sn(e, 0), Kl(e, t), Et(e, Te()), c);
      if (c === 6) throw Error(z(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Nn(e, Tt, pl),
        Et(e, Te()),
        null
      );
    }
    function uX(e, t) {
      var c = de;
      de |= 1;
      try {
        return e(t);
      } finally {
        (de = c), de === 0 && ((Po = Te() + 500), $i && bn());
      }
    }
    function Dn(e) {
      ql !== null && ql.tag === 0 && !(de & 6) && Lo();
      var t = de;
      de |= 1;
      var c = Zc.transition,
        l = me;
      try {
        if (((Zc.transition = null), (me = 1), e)) return e();
      } finally {
        (me = l), (Zc.transition = c), (de = t), !(de & 6) && bn();
      }
    }
    function iX() {
      (cc = ko.current), Be(ko);
    }
    function Sn(e, t) {
      (e.finishedWork = null), (e.finishedLanes = 0);
      var c = e.timeoutHandle;
      if ((c !== -1 && ((e.timeoutHandle = -1), D5(c)), Pe !== null))
        for (c = Pe.return; c !== null; ) {
          var l = c;
          switch ((Tm(l), l.tag)) {
            case 1:
              (l = l.type.childContextTypes), l != null && Yi();
              break;
            case 3:
              Eo(), Be(Ut), Be(Bt), qm();
              break;
            case 5:
              _m(l);
              break;
            case 4:
              Eo();
              break;
            case 13:
              Be(Ne);
              break;
            case 19:
              Be(Ne);
              break;
            case 10:
              Em(l.type._context);
              break;
            case 22:
            case 23:
              iX();
          }
          c = c.return;
        }
      if (
        ((ot = e),
        (Pe = e = rn(e.current, null)),
        (mt = cc = t),
        (et = 0),
        (fd = null),
        (rX = la = Tn = 0),
        (Tt = nd = null),
        kn !== null)
      ) {
        for (t = 0; t < kn.length; t++)
          if (((c = kn[t]), (l = c.interleaved), l !== null)) {
            c.interleaved = null;
            var n = l.next,
              o = c.pending;
            if (o !== null) {
              var r = o.next;
              (o.next = n), (l.next = r);
            }
            c.pending = l;
          }
        kn = null;
      }
      return e;
    }
    function QH(e, t) {
      do {
        var c = Pe;
        try {
          if ((Mm(), (gi.current = Li), Ai)) {
            for (var l = ze.memoizedState; l !== null; ) {
              var n = l.queue;
              n !== null && (n.pending = null), (l = l.next);
            }
            Ai = !1;
          }
          if (
            ((Ln = 0),
            (nt = $e = ze = null),
            (cd = !1),
            (Hd = 0),
            (oX.current = null),
            c === null || c.return === null)
          ) {
            (et = 1), (fd = t), (Pe = null);
            break;
          }
          e: {
            var o = e,
              r = c.return,
              d = c,
              u = t;
            if (
              ((t = mt),
              (d.flags |= 32768),
              u !== null && typeof u == "object" && typeof u.then == "function")
            ) {
              var i = u,
                a = d,
                s = a.tag;
              if (!(a.mode & 1) && (s === 0 || s === 11 || s === 15)) {
                var b = a.alternate;
                b
                  ? ((a.updateQueue = b.updateQueue),
                    (a.memoizedState = b.memoizedState),
                    (a.lanes = b.lanes))
                  : ((a.updateQueue = null), (a.memoizedState = null));
              }
              var m = zp(r);
              if (m !== null) {
                (m.flags &= -257),
                  kp(m, r, d, o, t),
                  m.mode & 1 && Np(o, i, t),
                  (t = m),
                  (u = i);
                var x = t.updateQueue;
                if (x === null) {
                  var p = new Set();
                  p.add(u), (t.updateQueue = p);
                } else x.add(u);
                break e;
              } else {
                if (!(t & 1)) {
                  Np(o, i, t), aX();
                  break e;
                }
                u = Error(z(426));
              }
            } else if (Ve && d.mode & 1) {
              var R = zp(r);
              if (R !== null) {
                !(R.flags & 65536) && (R.flags |= 256),
                  kp(R, r, d, o, t),
                  Dm(jo(u, d));
                break e;
              }
            }
            (o = u = jo(u, d)),
              et !== 4 && (et = 2),
              nd === null ? (nd = [o]) : nd.push(o),
              (o = r);
            do {
              switch (o.tag) {
                case 3:
                  (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                  var X = IH(o, u, t);
                  Fp(o, X);
                  break e;
                case 1:
                  d = u;
                  var G = o.type,
                    g = o.stateNode;
                  if (
                    !(o.flags & 128) &&
                    (typeof G.getDerivedStateFromError == "function" ||
                      (g !== null &&
                        typeof g.componentDidCatch == "function" &&
                        (nn === null || !nn.has(g))))
                  ) {
                    (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                    var H = yH(o, d, t);
                    Fp(o, H);
                    break e;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          TH(c);
        } catch (f) {
          (t = f), Pe === c && c !== null && (Pe = c = c.return);
          continue;
        }
        break;
      } while (!0);
    }
    function AH() {
      var e = Ti.current;
      return (Ti.current = Li), e === null ? Li : e;
    }
    function aX() {
      (et === 0 || et === 3 || et === 2) && (et = 4),
        ot === null || (!(Tn & 268435455) && !(la & 268435455)) || Kl(ot, mt);
    }
    function Mi(e, t) {
      var c = de;
      de |= 2;
      var l = AH();
      (ot !== e || mt !== t) && ((pl = null), Sn(e, t));
      do
        try {
          xv();
          break;
        } catch (n) {
          QH(e, n);
        }
      while (!0);
      if ((Mm(), (de = c), (Ti.current = l), Pe !== null)) throw Error(z(261));
      return (ot = null), (mt = 0), et;
    }
    function xv() {
      for (; Pe !== null; ) LH(Pe);
    }
    function Gv() {
      for (; Pe !== null && !TB(); ) LH(Pe);
    }
    function LH(e) {
      var t = UH(e.alternate, e, cc);
      (e.memoizedProps = e.pendingProps),
        t === null ? TH(e) : (Pe = t),
        (oX.current = null);
    }
    function TH(e) {
      var t = e;
      do {
        var c = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((c = iv(c, t)), c !== null)) {
            (c.flags &= 32767), (Pe = c);
            return;
          }
          if (e !== null)
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          else {
            (et = 6), (Pe = null);
            return;
          }
        } else if (((c = uv(c, t, cc)), c !== null)) {
          Pe = c;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Pe = t;
          return;
        }
        Pe = t = e;
      } while (t !== null);
      et === 0 && (et = 5);
    }
    function Nn(e, t, c) {
      var l = me,
        n = Zc.transition;
      try {
        (Zc.transition = null), (me = 1), pv(e, t, c, l);
      } finally {
        (Zc.transition = n), (me = l);
      }
      return null;
    }
    function pv(e, t, c, l) {
      do Lo();
      while (ql !== null);
      if (de & 6) throw Error(z(327));
      c = e.finishedWork;
      var n = e.finishedLanes;
      if (c === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), c === e.current))
        throw Error(z(177));
      (e.callbackNode = null), (e.callbackPriority = 0);
      var o = c.lanes | c.childLanes;
      if (
        ($B(e, o),
        e === ot && ((Pe = ot = null), (mt = 0)),
        (!(c.subtreeFlags & 2064) && !(c.flags & 2064)) ||
          mi ||
          ((mi = !0),
          MH(vi, function () {
            return Lo(), null;
          })),
        (o = (c.flags & 15990) !== 0),
        c.subtreeFlags & 15990 || o)
      ) {
        (o = Zc.transition), (Zc.transition = null);
        var r = me;
        me = 1;
        var d = de;
        (de |= 4),
          (oX.current = null),
          sv(e, c),
          wH(c, e),
          O5(cm),
          (hi = !!tm),
          (cm = tm = null),
          (e.current = c),
          bv(c, e, n),
          DB(),
          (de = d),
          (me = r),
          (Zc.transition = o);
      } else e.current = c;
      if (
        (mi && ((mi = !1), (ql = e), (Ui = n)),
        (o = e.pendingLanes),
        o === 0 && (nn = null),
        EB(c.stateNode, l),
        Et(e, Te()),
        t !== null)
      )
        for (l = e.onRecoverableError, c = 0; c < t.length; c++)
          (n = t[c]), l(n.value, { componentStack: n.stack, digest: n.digest });
      if (Di) throw ((Di = !1), (e = fm), (fm = null), e);
      return (
        Ui & 1 && e.tag !== 0 && Lo(),
        (o = e.pendingLanes),
        o & 1 ? (e === Im ? od++ : ((od = 0), (Im = e))) : (od = 0),
        bn(),
        null
      );
    }
    function Lo() {
      if (ql !== null) {
        var e = Ig(Ui),
          t = Zc.transition,
          c = me;
        try {
          if (((Zc.transition = null), (me = 16 > e ? 16 : e), ql === null))
            var l = !1;
          else {
            if (((e = ql), (ql = null), (Ui = 0), de & 6)) throw Error(z(331));
            var n = de;
            for (de |= 4, Q = e.current; Q !== null; ) {
              var o = Q,
                r = o.child;
              if (Q.flags & 16) {
                var d = o.deletions;
                if (d !== null) {
                  for (var u = 0; u < d.length; u++) {
                    var i = d[u];
                    for (Q = i; Q !== null; ) {
                      var a = Q;
                      switch (a.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ld(8, a, o);
                      }
                      var s = a.child;
                      if (s !== null) (s.return = a), (Q = s);
                      else
                        for (; Q !== null; ) {
                          a = Q;
                          var b = a.sibling,
                            m = a.return;
                          if ((NH(a), a === i)) {
                            Q = null;
                            break;
                          }
                          if (b !== null) {
                            (b.return = m), (Q = b);
                            break;
                          }
                          Q = m;
                        }
                    }
                  }
                  var x = o.alternate;
                  if (x !== null) {
                    var p = x.child;
                    if (p !== null) {
                      x.child = null;
                      do {
                        var R = p.sibling;
                        (p.sibling = null), (p = R);
                      } while (p !== null);
                    }
                  }
                  Q = o;
                }
              }
              if (o.subtreeFlags & 2064 && r !== null) (r.return = o), (Q = r);
              else
                e: for (; Q !== null; ) {
                  if (((o = Q), o.flags & 2048))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ld(9, o, o.return);
                    }
                  var X = o.sibling;
                  if (X !== null) {
                    (X.return = o.return), (Q = X);
                    break e;
                  }
                  Q = o.return;
                }
            }
            var G = e.current;
            for (Q = G; Q !== null; ) {
              r = Q;
              var g = r.child;
              if (r.subtreeFlags & 2064 && g !== null) (g.return = r), (Q = g);
              else
                e: for (r = G; Q !== null; ) {
                  if (((d = Q), d.flags & 2048))
                    try {
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ca(9, d);
                      }
                    } catch (f) {
                      Oe(d, d.return, f);
                    }
                  if (d === r) {
                    Q = null;
                    break e;
                  }
                  var H = d.sibling;
                  if (H !== null) {
                    (H.return = d.return), (Q = H);
                    break e;
                  }
                  Q = d.return;
                }
            }
            if (
              ((de = n),
              bn(),
              tl && typeof tl.onPostCommitFiberRoot == "function")
            )
              try {
                tl.onPostCommitFiberRoot(ji, e);
              } catch {}
            l = !0;
          }
          return l;
        } finally {
          (me = c), (Zc.transition = t);
        }
      }
      return !1;
    }
    function Kp(e, t, c) {
      (t = jo(c, t)),
        (t = IH(e, t, 1)),
        (e = ln(e, t, 1)),
        (t = Yt()),
        e !== null && (Id(e, 1, t), Et(e, t));
    }
    function Oe(e, t, c) {
      if (e.tag === 3) Kp(e, e, c);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Kp(t, e, c);
            break;
          } else if (t.tag === 1) {
            var l = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == "function" ||
              (typeof l.componentDidCatch == "function" &&
                (nn === null || !nn.has(l)))
            ) {
              (e = jo(c, e)),
                (e = yH(t, e, 1)),
                (t = ln(t, e, 1)),
                (e = Yt()),
                t !== null && (Id(t, 1, e), Et(t, e));
              break;
            }
          }
          t = t.return;
        }
    }
    function gv(e, t, c) {
      var l = e.pingCache;
      l !== null && l.delete(t),
        (t = Yt()),
        (e.pingedLanes |= e.suspendedLanes & c),
        ot === e &&
          (mt & c) === c &&
          (et === 4 || (et === 3 && (mt & 130023424) === mt && 500 > Te() - dX)
            ? Sn(e, 0)
            : (rX |= c)),
        Et(e, t);
    }
    function DH(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = $u), ($u <<= 1), !($u & 130023424) && ($u = 4194304))
          : (t = 1));
      var c = Yt();
      (e = yl(e, t)), e !== null && (Id(e, t, c), Et(e, c));
    }
    function Hv(e) {
      var t = e.memoizedState,
        c = 0;
      t !== null && (c = t.retryLane), DH(e, c);
    }
    function Zv(e, t) {
      var c = 0;
      switch (e.tag) {
        case 13:
          var l = e.stateNode,
            n = e.memoizedState;
          n !== null && (c = n.retryLane);
          break;
        case 19:
          l = e.stateNode;
          break;
        default:
          throw Error(z(314));
      }
      l !== null && l.delete(t), DH(e, c);
    }
    var UH;
    UH = function (e, t, c) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ut.current) Dt = !0;
        else {
          if (!(e.lanes & c) && !(t.flags & 128)) return (Dt = !1), dv(e, t, c);
          Dt = !!(e.flags & 131072);
        }
      else (Dt = !1), Ve && t.flags & 1048576 && Pg(t, ki, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var l = t.type;
          Zi(e, t), (e = t.pendingProps);
          var n = Do(t, Bt.current);
          Ao(t, c), (n = eX(null, t, l, e, n, c));
          var o = tX();
          return (
            (t.flags |= 1),
            typeof n == "object" &&
            n !== null &&
            typeof n.render == "function" &&
            n.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Mt(l) ? ((o = !0), Ni(t)) : (o = !1),
                (t.memoizedState =
                  n.state !== null && n.state !== void 0 ? n.state : null),
                Pm(t),
                (n.updater = ta),
                (t.stateNode = n),
                (n._reactInternals = t),
                sm(t, l, e, c),
                (t = Xm(null, t, l, !0, o, c)))
              : ((t.tag = 0),
                Ve && o && Lm(t),
                Jt(null, t, n, c),
                (t = t.child)),
            t
          );
        case 16:
          l = t.elementType;
          e: {
            switch (
              (Zi(e, t),
              (e = t.pendingProps),
              (n = l._init),
              (l = n(l._payload)),
              (t.type = l),
              (n = t.tag = fv(l)),
              (e = zc(l, e)),
              n)
            ) {
              case 0:
                t = mm(null, t, l, e, c);
                break e;
              case 1:
                t = Qp(null, t, l, e, c);
                break e;
              case 11:
                t = Sp(null, t, l, e, c);
                break e;
              case 14:
                t = Op(null, t, l, zc(l.type, e), c);
                break e;
            }
            throw Error(z(306, l, ""));
          }
          return t;
        case 0:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : zc(l, n)),
            mm(e, t, l, n, c)
          );
        case 1:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : zc(l, n)),
            Qp(e, t, l, n, c)
          );
        case 3:
          e: {
            if ((FH(t), e === null)) throw Error(z(387));
            (l = t.pendingProps),
              (o = t.memoizedState),
              (n = o.element),
              tH(e, t),
              Oi(t, l, null, c);
            var r = t.memoizedState;
            if (((l = r.element), o.isDehydrated))
              if (
                ((o = {
                  element: l,
                  isDehydrated: !1,
                  cache: r.cache,
                  pendingSuspenseBoundaries: r.pendingSuspenseBoundaries,
                  transitions: r.transitions,
                }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                (n = jo(Error(z(423)), t)), (t = Ap(e, t, l, c, n));
                break e;
              } else if (l !== n) {
                (n = jo(Error(z(424)), t)), (t = Ap(e, t, l, c, n));
                break e;
              } else
                for (
                  lc = cn(t.stateNode.containerInfo.firstChild),
                    nc = t,
                    Ve = !0,
                    wc = null,
                    c = $g(t, null, l, c),
                    t.child = c;
                  c;

                )
                  (c.flags = (c.flags & -3) | 4096), (c = c.sibling);
            else {
              if ((Uo(), l === n)) {
                t = Wl(e, t, c);
                break e;
              }
              Jt(e, t, l, c);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            cH(t),
            e === null && um(t),
            (l = t.type),
            (n = t.pendingProps),
            (o = e !== null ? e.memoizedProps : null),
            (r = n.children),
            lm(l, n) ? (r = null) : o !== null && lm(l, o) && (t.flags |= 32),
            vH(e, t),
            Jt(e, t, r, c),
            t.child
          );
        case 6:
          return e === null && um(t), null;
        case 13:
          return hH(e, t, c);
        case 4:
          return (
            Km(t, t.stateNode.containerInfo),
            (l = t.pendingProps),
            e === null ? (t.child = Mo(t, null, l, c)) : Jt(e, t, l, c),
            t.child
          );
        case 11:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : zc(l, n)),
            Sp(e, t, l, n, c)
          );
        case 7:
          return Jt(e, t, t.pendingProps, c), t.child;
        case 8:
          return Jt(e, t, t.pendingProps.children, c), t.child;
        case 12:
          return Jt(e, t, t.pendingProps.children, c), t.child;
        case 10:
          e: {
            if (
              ((l = t.type._context),
              (n = t.pendingProps),
              (o = t.memoizedProps),
              (r = n.value),
              fe(wi, l._currentValue),
              (l._currentValue = r),
              o !== null)
            )
              if (Qc(o.value, r)) {
                if (o.children === n.children && !Ut.current) {
                  t = Wl(e, t, c);
                  break e;
                }
              } else
                for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                  var d = o.dependencies;
                  if (d !== null) {
                    r = o.child;
                    for (var u = d.firstContext; u !== null; ) {
                      if (u.context === l) {
                        if (o.tag === 1) {
                          (u = Rl(-1, c & -c)), (u.tag = 2);
                          var i = o.updateQueue;
                          if (i !== null) {
                            i = i.shared;
                            var a = i.pending;
                            a === null
                              ? (u.next = u)
                              : ((u.next = a.next), (a.next = u)),
                              (i.pending = u);
                          }
                        }
                        (o.lanes |= c),
                          (u = o.alternate),
                          u !== null && (u.lanes |= c),
                          im(o.return, c, t),
                          (d.lanes |= c);
                        break;
                      }
                      u = u.next;
                    }
                  } else if (o.tag === 10)
                    r = o.type === t.type ? null : o.child;
                  else if (o.tag === 18) {
                    if (((r = o.return), r === null)) throw Error(z(341));
                    (r.lanes |= c),
                      (d = r.alternate),
                      d !== null && (d.lanes |= c),
                      im(r, c, t),
                      (r = o.sibling);
                  } else r = o.child;
                  if (r !== null) r.return = o;
                  else
                    for (r = o; r !== null; ) {
                      if (r === t) {
                        r = null;
                        break;
                      }
                      if (((o = r.sibling), o !== null)) {
                        (o.return = r.return), (r = o);
                        break;
                      }
                      r = r.return;
                    }
                  o = r;
                }
            Jt(e, t, n.children, c), (t = t.child);
          }
          return t;
        case 9:
          return (
            (n = t.type),
            (l = t.pendingProps.children),
            Ao(t, c),
            (n = Rc(n)),
            (l = l(n)),
            (t.flags |= 1),
            Jt(e, t, l, c),
            t.child
          );
        case 14:
          return (
            (l = t.type),
            (n = zc(l, t.pendingProps)),
            (n = zc(l.type, n)),
            Op(e, t, l, n, c)
          );
        case 15:
          return WH(e, t, t.type, t.pendingProps, c);
        case 17:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : zc(l, n)),
            Zi(e, t),
            (t.tag = 1),
            Mt(l) ? ((e = !0), Ni(t)) : (e = !1),
            Ao(t, c),
            fH(t, l, n),
            sm(t, l, n, c),
            Xm(null, t, l, !0, e, c)
          );
        case 19:
          return VH(e, t, c);
        case 22:
          return BH(e, t, c);
      }
      throw Error(z(156, t.tag));
    };
    function MH(e, t) {
      return Hg(e, t);
    }
    function Rv(e, t, c, l) {
      (this.tag = e),
        (this.key = c),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = l),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function Hc(e, t, c, l) {
      return new Rv(e, t, c, l);
    }
    function sX(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function fv(e) {
      if (typeof e == "function") return sX(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === Vm)) return 11;
        if (e === Cm) return 14;
      }
      return 2;
    }
    function rn(e, t) {
      var c = e.alternate;
      return (
        c === null
          ? ((c = Hc(e.tag, t, e.key, e.mode)),
            (c.elementType = e.elementType),
            (c.type = e.type),
            (c.stateNode = e.stateNode),
            (c.alternate = e),
            (e.alternate = c))
          : ((c.pendingProps = t),
            (c.type = e.type),
            (c.flags = 0),
            (c.subtreeFlags = 0),
            (c.deletions = null)),
        (c.flags = e.flags & 14680064),
        (c.childLanes = e.childLanes),
        (c.lanes = e.lanes),
        (c.child = e.child),
        (c.memoizedProps = e.memoizedProps),
        (c.memoizedState = e.memoizedState),
        (c.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (c.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (c.sibling = e.sibling),
        (c.index = e.index),
        (c.ref = e.ref),
        c
      );
    }
    function Ii(e, t, c, l, n, o) {
      var r = 2;
      if (((l = e), typeof e == "function")) sX(e) && (r = 1);
      else if (typeof e == "string") r = 5;
      else
        e: switch (e) {
          case Bo:
            return On(c.children, n, o, t);
          case hm:
            (r = 8), (n |= 8);
            break;
          case zb:
            return (
              (e = Hc(12, c, t, n | 2)), (e.elementType = zb), (e.lanes = o), e
            );
          case kb:
            return (
              (e = Hc(13, c, t, n)), (e.elementType = kb), (e.lanes = o), e
            );
          case wb:
            return (
              (e = Hc(19, c, t, n)), (e.elementType = wb), (e.lanes = o), e
            );
          case cg:
            return na(c, n, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case eg:
                  r = 10;
                  break e;
                case tg:
                  r = 9;
                  break e;
                case Vm:
                  r = 11;
                  break e;
                case Cm:
                  r = 14;
                  break e;
                case El:
                  (r = 16), (l = null);
                  break e;
              }
            throw Error(z(130, e == null ? e : typeof e, ""));
        }
      return (
        (t = Hc(r, c, t, n)),
        (t.elementType = e),
        (t.type = l),
        (t.lanes = o),
        t
      );
    }
    function On(e, t, c, l) {
      return (e = Hc(7, e, l, t)), (e.lanes = c), e;
    }
    function na(e, t, c, l) {
      return (
        (e = Hc(22, e, l, t)),
        (e.elementType = cg),
        (e.lanes = c),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Jb(e, t, c) {
      return (e = Hc(6, e, null, t)), (e.lanes = c), e;
    }
    function Yb(e, t, c) {
      return (
        (t = Hc(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = c),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function Iv(e, t, c, l, n) {
      (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Gb(0)),
        (this.expirationTimes = Gb(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Gb(0)),
        (this.identifierPrefix = l),
        (this.onRecoverableError = n),
        (this.mutableSourceEagerHydrationData = null);
    }
    function bX(e, t, c, l, n, o, r, d, u) {
      return (
        (e = new Iv(e, t, c, d, u)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Hc(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
          element: l,
          isDehydrated: c,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        Pm(o),
        e
      );
    }
    function yv(e, t, c) {
      var l =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: Wo,
        key: l == null ? null : "" + l,
        children: e,
        containerInfo: t,
        implementation: c,
      };
    }
    function EH(e) {
      if (!e) return un;
      e = e._reactInternals;
      e: {
        if (Mn(e) !== e || e.tag !== 1) throw Error(z(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (Mt(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(z(171));
      }
      if (e.tag === 1) {
        var c = e.type;
        if (Mt(c)) return Eg(e, c, t);
      }
      return t;
    }
    function jH(e, t, c, l, n, o, r, d, u) {
      return (
        (e = bX(c, l, !0, e, n, o, r, d, u)),
        (e.context = EH(null)),
        (c = e.current),
        (l = Yt()),
        (n = on(c)),
        (o = Rl(l, n)),
        (o.callback = t ?? null),
        ln(c, o, n),
        (e.current.lanes = n),
        Id(e, n, l),
        Et(e, l),
        e
      );
    }
    function oa(e, t, c, l) {
      var n = t.current,
        o = Yt(),
        r = on(n);
      return (
        (c = EH(c)),
        t.context === null ? (t.context = c) : (t.pendingContext = c),
        (t = Rl(o, r)),
        (t.payload = { element: e }),
        (l = l === void 0 ? null : l),
        l !== null && (t.callback = l),
        (e = ln(n, t, r)),
        e !== null && (Oc(e, n, r, o), pi(e, n, r)),
        r
      );
    }
    function Ei(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function _p(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var c = e.retryLane;
        e.retryLane = c !== 0 && c < t ? c : t;
      }
    }
    function mX(e, t) {
      _p(e, t), (e = e.alternate) && _p(e, t);
    }
    function Wv() {
      return null;
    }
    var PH =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            console.error(e);
          };
    function XX(e) {
      this._internalRoot = e;
    }
    ra.prototype.render = XX.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(z(409));
      oa(e, t, null, null);
    };
    ra.prototype.unmount = XX.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Dn(function () {
          oa(null, e, null, null);
        }),
          (t[Il] = null);
      }
    };
    function ra(e) {
      this._internalRoot = e;
    }
    ra.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Bg();
        e = { blockedOn: null, target: e, priority: t };
        for (var c = 0; c < Pl.length && t !== 0 && t < Pl[c].priority; c++);
        Pl.splice(c, 0, e), c === 0 && Fg(e);
      }
    };
    function xX(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function da(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
      );
    }
    function qp() {}
    function Bv(e, t, c, l, n) {
      if (n) {
        if (typeof l == "function") {
          var o = l;
          l = function () {
            var i = Ei(r);
            o.call(i);
          };
        }
        var r = jH(t, l, e, 0, null, !1, !1, "", qp);
        return (
          (e._reactRootContainer = r),
          (e[Il] = r.current),
          Xd(e.nodeType === 8 ? e.parentNode : e),
          Dn(),
          r
        );
      }
      for (; (n = e.lastChild); ) e.removeChild(n);
      if (typeof l == "function") {
        var d = l;
        l = function () {
          var i = Ei(u);
          d.call(i);
        };
      }
      var u = bX(e, 0, !1, null, null, !1, !1, "", qp);
      return (
        (e._reactRootContainer = u),
        (e[Il] = u.current),
        Xd(e.nodeType === 8 ? e.parentNode : e),
        Dn(function () {
          oa(t, u, c, l);
        }),
        u
      );
    }
    function ua(e, t, c, l, n) {
      var o = c._reactRootContainer;
      if (o) {
        var r = o;
        if (typeof n == "function") {
          var d = n;
          n = function () {
            var u = Ei(r);
            d.call(u);
          };
        }
        oa(t, r, e, n);
      } else r = Bv(c, t, e, n, l);
      return Ei(r);
    }
    yg = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var c = Pr(t.pendingLanes);
            c !== 0 &&
              (Nm(t, c | 1),
              Et(t, Te()),
              !(de & 6) && ((Po = Te() + 500), bn()));
          }
          break;
        case 13:
          Dn(function () {
            var l = yl(e, 1);
            if (l !== null) {
              var n = Yt();
              Oc(l, e, 1, n);
            }
          }),
            mX(e, 1);
      }
    };
    zm = function (e) {
      if (e.tag === 13) {
        var t = yl(e, 134217728);
        if (t !== null) {
          var c = Yt();
          Oc(t, e, 134217728, c);
        }
        mX(e, 134217728);
      }
    };
    Wg = function (e) {
      if (e.tag === 13) {
        var t = on(e),
          c = yl(e, t);
        if (c !== null) {
          var l = Yt();
          Oc(c, e, t, l);
        }
        mX(e, t);
      }
    };
    Bg = function () {
      return me;
    };
    vg = function (e, t) {
      var c = me;
      try {
        return (me = e), t();
      } finally {
        me = c;
      }
    };
    Eb = function (e, t, c) {
      switch (t) {
        case "input":
          if ((Qb(e, c), (t = c.name), c.type === "radio" && t != null)) {
            for (c = e; c.parentNode; ) c = c.parentNode;
            for (
              c = c.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
              ),
                t = 0;
              t < c.length;
              t++
            ) {
              var l = c[t];
              if (l !== e && l.form === e.form) {
                var n = qi(l);
                if (!n) throw Error(z(90));
                ng(l), Qb(l, n);
              }
            }
          }
          break;
        case "textarea":
          rg(e, c);
          break;
        case "select":
          (t = c.value), t != null && wo(e, !!c.multiple, t, !1);
      }
    };
    mg = uX;
    Xg = Dn;
    var vv = { usingClientEntryPoint: !1, Events: [Wd, Vo, qi, sg, bg, uX] },
      Ur = {
        findFiberByHostInstance: zn,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom",
      },
      Fv = {
        bundleType: Ur.bundleType,
        version: Ur.version,
        rendererPackageName: Ur.rendererPackageName,
        rendererConfig: Ur.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Bl.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return (e = pg(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Ur.findFiberByHostInstance || Wv,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      ((Mr = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Mr.isDisabled && Mr.supportsFiber)
    )
      try {
        (ji = Mr.inject(Fv)), (tl = Mr);
      } catch {}
    var Mr;
    dc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vv;
    dc.createPortal = function (e, t) {
      var c =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!xX(t)) throw Error(z(200));
      return yv(e, t, null, c);
    };
    dc.createRoot = function (e, t) {
      if (!xX(e)) throw Error(z(299));
      var c = !1,
        l = "",
        n = PH;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (c = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (n = t.onRecoverableError)),
        (t = bX(e, 1, !1, null, null, c, !1, l, n)),
        (e[Il] = t.current),
        Xd(e.nodeType === 8 ? e.parentNode : e),
        new XX(t)
      );
    };
    dc.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(z(188))
          : ((e = Object.keys(e).join(",")), Error(z(268, e)));
      return (e = pg(t)), (e = e === null ? null : e.stateNode), e;
    };
    dc.flushSync = function (e) {
      return Dn(e);
    };
    dc.hydrate = function (e, t, c) {
      if (!da(t)) throw Error(z(200));
      return ua(null, e, t, !0, c);
    };
    dc.hydrateRoot = function (e, t, c) {
      if (!xX(e)) throw Error(z(405));
      var l = (c != null && c.hydratedSources) || null,
        n = !1,
        o = "",
        r = PH;
      if (
        (c != null &&
          (c.unstable_strictMode === !0 && (n = !0),
          c.identifierPrefix !== void 0 && (o = c.identifierPrefix),
          c.onRecoverableError !== void 0 && (r = c.onRecoverableError)),
        (t = jH(t, null, e, 1, c ?? null, n, !1, o, r)),
        (e[Il] = t.current),
        Xd(e),
        l)
      )
        for (e = 0; e < l.length; e++)
          (c = l[e]),
            (n = c._getVersion),
            (n = n(c._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [c, n])
              : t.mutableSourceEagerHydrationData.push(c, n);
      return new ra(t);
    };
    dc.render = function (e, t, c) {
      if (!da(t)) throw Error(z(200));
      return ua(null, e, t, !1, c);
    };
    dc.unmountComponentAtNode = function (e) {
      if (!da(e)) throw Error(z(40));
      return e._reactRootContainer
        ? (Dn(function () {
            ua(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Il] = null);
            });
          }),
          !0)
        : !1;
    };
    dc.unstable_batchedUpdates = uX;
    dc.unstable_renderSubtreeIntoContainer = function (e, t, c, l) {
      if (!da(c)) throw Error(z(200));
      if (e == null || e._reactInternals === void 0) throw Error(z(38));
      return ua(e, t, c, !1, l);
    };
    dc.version = "18.3.1-next-f1338f8080-20240426";
  });
  var qo = lt((fC, qH) => {
    "use strict";
    function _H() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_H);
        } catch (e) {
          console.error(e);
        }
    }
    _H(), (qH.exports = KH());
  });
  var eZ = lt((GX) => {
    "use strict";
    var $H = qo();
    (GX.createRoot = $H.createRoot), (GX.hydrateRoot = $H.hydrateRoot);
    var IC;
  });
  var XZ = lt((aa) => {
    "use strict";
    var Jv = A(),
      Yv = Symbol.for("react.element"),
      Nv = Symbol.for("react.fragment"),
      zv = Object.prototype.hasOwnProperty,
      kv =
        Jv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      wv = { key: !0, ref: !0, __self: !0, __source: !0 };
    function mZ(e, t, c) {
      var l,
        n = {},
        o = null,
        r = null;
      c !== void 0 && (o = "" + c),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (r = t.ref);
      for (l in t) zv.call(t, l) && !wv.hasOwnProperty(l) && (n[l] = t[l]);
      if (e && e.defaultProps)
        for (l in ((t = e.defaultProps), t)) n[l] === void 0 && (n[l] = t[l]);
      return {
        $$typeof: Yv,
        type: e,
        key: o,
        ref: r,
        props: n,
        _owner: kv.current,
      };
    }
    aa.Fragment = Nv;
    aa.jsx = mZ;
    aa.jsxs = mZ;
  });
  var E = lt((EC, xZ) => {
    "use strict";
    xZ.exports = XZ();
  });
  var pZ = lt((sa) => {
    (function () {
      "use strict";
      var e = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder:
          /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/,
      };
      function t(r) {
        return l(o(r), arguments);
      }
      function c(r, d) {
        return t.apply(null, [r].concat(d || []));
      }
      function l(r, d) {
        var u = 1,
          i = r.length,
          a,
          s = "",
          b,
          m,
          x,
          p,
          R,
          X,
          G,
          g;
        for (b = 0; b < i; b++)
          if (typeof r[b] == "string") s += r[b];
          else if (typeof r[b] == "object") {
            if (((x = r[b]), x.keys))
              for (a = d[u], m = 0; m < x.keys.length; m++) {
                if (a == null)
                  throw new Error(
                    t(
                      '[sprintf] Cannot access property "%s" of undefined value "%s"',
                      x.keys[m],
                      x.keys[m - 1]
                    )
                  );
                a = a[x.keys[m]];
              }
            else x.param_no ? (a = d[x.param_no]) : (a = d[u++]);
            if (
              (e.not_type.test(x.type) &&
                e.not_primitive.test(x.type) &&
                a instanceof Function &&
                (a = a()),
              e.numeric_arg.test(x.type) && typeof a != "number" && isNaN(a))
            )
              throw new TypeError(
                t("[sprintf] expecting number but found %T", a)
              );
            switch ((e.number.test(x.type) && (G = a >= 0), x.type)) {
              case "b":
                a = parseInt(a, 10).toString(2);
                break;
              case "c":
                a = String.fromCharCode(parseInt(a, 10));
                break;
              case "d":
              case "i":
                a = parseInt(a, 10);
                break;
              case "j":
                a = JSON.stringify(a, null, x.width ? parseInt(x.width) : 0);
                break;
              case "e":
                a = x.precision
                  ? parseFloat(a).toExponential(x.precision)
                  : parseFloat(a).toExponential();
                break;
              case "f":
                a = x.precision
                  ? parseFloat(a).toFixed(x.precision)
                  : parseFloat(a);
                break;
              case "g":
                a = x.precision
                  ? String(Number(a.toPrecision(x.precision)))
                  : parseFloat(a);
                break;
              case "o":
                a = (parseInt(a, 10) >>> 0).toString(8);
                break;
              case "s":
                (a = String(a)),
                  (a = x.precision ? a.substring(0, x.precision) : a);
                break;
              case "t":
                (a = String(!!a)),
                  (a = x.precision ? a.substring(0, x.precision) : a);
                break;
              case "T":
                (a = Object.prototype.toString
                  .call(a)
                  .slice(8, -1)
                  .toLowerCase()),
                  (a = x.precision ? a.substring(0, x.precision) : a);
                break;
              case "u":
                a = parseInt(a, 10) >>> 0;
                break;
              case "v":
                (a = a.valueOf()),
                  (a = x.precision ? a.substring(0, x.precision) : a);
                break;
              case "x":
                a = (parseInt(a, 10) >>> 0).toString(16);
                break;
              case "X":
                a = (parseInt(a, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            e.json.test(x.type)
              ? (s += a)
              : (e.number.test(x.type) && (!G || x.sign)
                  ? ((g = G ? "+" : "-"),
                    (a = a.toString().replace(e.sign, "")))
                  : (g = ""),
                (R = x.pad_char
                  ? x.pad_char === "0"
                    ? "0"
                    : x.pad_char.charAt(1)
                  : " "),
                (X = x.width - (g + a).length),
                (p = x.width && X > 0 ? R.repeat(X) : ""),
                (s += x.align ? g + a + p : R === "0" ? g + p + a : p + g + a));
          }
        return s;
      }
      var n = Object.create(null);
      function o(r) {
        if (n[r]) return n[r];
        for (var d = r, u, i = [], a = 0; d; ) {
          if ((u = e.text.exec(d)) !== null) i.push(u[0]);
          else if ((u = e.modulo.exec(d)) !== null) i.push("%");
          else if ((u = e.placeholder.exec(d)) !== null) {
            if (u[2]) {
              a |= 1;
              var s = [],
                b = u[2],
                m = [];
              if ((m = e.key.exec(b)) !== null)
                for (s.push(m[1]); (b = b.substring(m[0].length)) !== ""; )
                  if ((m = e.key_access.exec(b)) !== null) s.push(m[1]);
                  else if ((m = e.index_access.exec(b)) !== null) s.push(m[1]);
                  else
                    throw new SyntaxError(
                      "[sprintf] failed to parse named argument key"
                    );
              else
                throw new SyntaxError(
                  "[sprintf] failed to parse named argument key"
                );
              u[2] = s;
            } else a |= 2;
            if (a === 3)
              throw new Error(
                "[sprintf] mixing positional and named placeholders is not (yet) supported"
              );
            i.push({
              placeholder: u[0],
              param_no: u[1],
              keys: u[2],
              sign: u[3],
              pad_char: u[4],
              align: u[5],
              width: u[6],
              precision: u[7],
              type: u[8],
            });
          } else throw new SyntaxError("[sprintf] unexpected placeholder");
          d = d.substring(u[0].length);
        }
        return (n[r] = i);
      }
      typeof sa < "u" && ((sa.sprintf = t), (sa.vsprintf = c)),
        typeof window < "u" &&
          ((window.sprintf = t),
          (window.vsprintf = c),
          typeof define == "function" &&
            define.amd &&
            define(function () {
              return { sprintf: t, vsprintf: c };
            }));
    })();
  });
  var lR = lt((cR) => {
    "use strict";
    var ur = A();
    function MF(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var EF = typeof Object.is == "function" ? Object.is : MF,
      jF = ur.useState,
      PF = ur.useEffect,
      KF = ur.useLayoutEffect,
      _F = ur.useDebugValue;
    function qF(e, t) {
      var c = t(),
        l = jF({ inst: { value: c, getSnapshot: t } }),
        n = l[0].inst,
        o = l[1];
      return (
        KF(
          function () {
            (n.value = c), (n.getSnapshot = t), dx(n) && o({ inst: n });
          },
          [e, c, t]
        ),
        PF(
          function () {
            return (
              dx(n) && o({ inst: n }),
              e(function () {
                dx(n) && o({ inst: n });
              })
            );
          },
          [e]
        ),
        _F(c),
        c
      );
    }
    function dx(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var c = t();
        return !EF(e, c);
      } catch {
        return !0;
      }
    }
    function $F(e, t) {
      return t();
    }
    var eh =
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
        ? $F
        : qF;
    cR.useSyncExternalStore =
      ur.useSyncExternalStore !== void 0 ? ur.useSyncExternalStore : eh;
  });
  var oR = lt((U3, nR) => {
    "use strict";
    nR.exports = lR();
  });
  var II = lt((lT, fI) => {
    "use strict";
    var a2 = function (t) {
      return s2(t) && !b2(t);
    };
    function s2(e) {
      return !!e && typeof e == "object";
    }
    function b2(e) {
      var t = Object.prototype.toString.call(e);
      return t === "[object RegExp]" || t === "[object Date]" || x2(e);
    }
    var m2 = typeof Symbol == "function" && Symbol.for,
      X2 = m2 ? Symbol.for("react.element") : 60103;
    function x2(e) {
      return e.$$typeof === X2;
    }
    function G2(e) {
      return Array.isArray(e) ? [] : {};
    }
    function Zu(e, t) {
      return t.clone !== !1 && t.isMergeableObject(e) ? Zr(G2(e), e, t) : e;
    }
    function p2(e, t, c) {
      return e.concat(t).map(function (l) {
        return Zu(l, c);
      });
    }
    function g2(e, t) {
      if (!t.customMerge) return Zr;
      var c = t.customMerge(e);
      return typeof c == "function" ? c : Zr;
    }
    function H2(e) {
      return Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(e).filter(function (t) {
            return Object.propertyIsEnumerable.call(e, t);
          })
        : [];
    }
    function ZI(e) {
      return Object.keys(e).concat(H2(e));
    }
    function RI(e, t) {
      try {
        return t in e;
      } catch {
        return !1;
      }
    }
    function Z2(e, t) {
      return (
        RI(e, t) &&
        !(
          Object.hasOwnProperty.call(e, t) &&
          Object.propertyIsEnumerable.call(e, t)
        )
      );
    }
    function R2(e, t, c) {
      var l = {};
      return (
        c.isMergeableObject(e) &&
          ZI(e).forEach(function (n) {
            l[n] = Zu(e[n], c);
          }),
        ZI(t).forEach(function (n) {
          Z2(e, n) ||
            (RI(e, n) && c.isMergeableObject(t[n])
              ? (l[n] = g2(n, c)(e[n], t[n], c))
              : (l[n] = Zu(t[n], c)));
        }),
        l
      );
    }
    function Zr(e, t, c) {
      (c = c || {}),
        (c.arrayMerge = c.arrayMerge || p2),
        (c.isMergeableObject = c.isMergeableObject || a2),
        (c.cloneUnlessOtherwiseSpecified = Zu);
      var l = Array.isArray(t),
        n = Array.isArray(e),
        o = l === n;
      return o ? (l ? c.arrayMerge(e, t, c) : R2(e, t, c)) : Zu(t, c);
    }
    Zr.all = function (t, c) {
      if (!Array.isArray(t))
        throw new Error("first argument should be an array");
      return t.reduce(function (l, n) {
        return Zr(l, n, c);
      }, {});
    };
    var f2 = Zr;
    fI.exports = f2;
  });
  var WI = lt((nT, yI) => {
    "use strict";
    yI.exports = function e(t, c) {
      if (t === c) return !0;
      if (t && c && typeof t == "object" && typeof c == "object") {
        if (t.constructor !== c.constructor) return !1;
        var l, n, o;
        if (Array.isArray(t)) {
          if (((l = t.length), l != c.length)) return !1;
          for (n = l; n-- !== 0; ) if (!e(t[n], c[n])) return !1;
          return !0;
        }
        if (t instanceof Map && c instanceof Map) {
          if (t.size !== c.size) return !1;
          for (n of t.entries()) if (!c.has(n[0])) return !1;
          for (n of t.entries()) if (!e(n[1], c.get(n[0]))) return !1;
          return !0;
        }
        if (t instanceof Set && c instanceof Set) {
          if (t.size !== c.size) return !1;
          for (n of t.entries()) if (!c.has(n[0])) return !1;
          return !0;
        }
        if (ArrayBuffer.isView(t) && ArrayBuffer.isView(c)) {
          if (((l = t.length), l != c.length)) return !1;
          for (n = l; n-- !== 0; ) if (t[n] !== c[n]) return !1;
          return !0;
        }
        if (t.constructor === RegExp)
          return t.source === c.source && t.flags === c.flags;
        if (t.valueOf !== Object.prototype.valueOf)
          return t.valueOf() === c.valueOf();
        if (t.toString !== Object.prototype.toString)
          return t.toString() === c.toString();
        if (((o = Object.keys(t)), (l = o.length), l !== Object.keys(c).length))
          return !1;
        for (n = l; n-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(c, o[n])) return !1;
        for (n = l; n-- !== 0; ) {
          var r = o[n];
          if (!e(t[r], c[r])) return !1;
        }
        return !0;
      }
      return t !== t && c !== c;
    };
  });
  function Rs(e) {
    var t = Object.create(null);
    return function (c) {
      return t[c] === void 0 && (t[c] = e(c)), t[c];
    };
  }
  var fs = ZG(() => {});
  var KI = lt((xe) => {
    "use strict";
    var dt = typeof Symbol == "function" && Symbol.for,
      l0 = dt ? Symbol.for("react.element") : 60103,
      n0 = dt ? Symbol.for("react.portal") : 60106,
      Is = dt ? Symbol.for("react.fragment") : 60107,
      ys = dt ? Symbol.for("react.strict_mode") : 60108,
      Ws = dt ? Symbol.for("react.profiler") : 60114,
      Bs = dt ? Symbol.for("react.provider") : 60109,
      vs = dt ? Symbol.for("react.context") : 60110,
      o0 = dt ? Symbol.for("react.async_mode") : 60111,
      Fs = dt ? Symbol.for("react.concurrent_mode") : 60111,
      hs = dt ? Symbol.for("react.forward_ref") : 60112,
      Vs = dt ? Symbol.for("react.suspense") : 60113,
      w2 = dt ? Symbol.for("react.suspense_list") : 60120,
      Cs = dt ? Symbol.for("react.memo") : 60115,
      Js = dt ? Symbol.for("react.lazy") : 60116,
      S2 = dt ? Symbol.for("react.block") : 60121,
      O2 = dt ? Symbol.for("react.fundamental") : 60117,
      Q2 = dt ? Symbol.for("react.responder") : 60118,
      A2 = dt ? Symbol.for("react.scope") : 60119;
    function mc(e) {
      if (typeof e == "object" && e !== null) {
        var t = e.$$typeof;
        switch (t) {
          case l0:
            switch (((e = e.type), e)) {
              case o0:
              case Fs:
              case Is:
              case Ws:
              case ys:
              case Vs:
                return e;
              default:
                switch (((e = e && e.$$typeof), e)) {
                  case vs:
                  case hs:
                  case Js:
                  case Cs:
                  case Bs:
                    return e;
                  default:
                    return t;
                }
            }
          case n0:
            return t;
        }
      }
    }
    function PI(e) {
      return mc(e) === Fs;
    }
    xe.AsyncMode = o0;
    xe.ConcurrentMode = Fs;
    xe.ContextConsumer = vs;
    xe.ContextProvider = Bs;
    xe.Element = l0;
    xe.ForwardRef = hs;
    xe.Fragment = Is;
    xe.Lazy = Js;
    xe.Memo = Cs;
    xe.Portal = n0;
    xe.Profiler = Ws;
    xe.StrictMode = ys;
    xe.Suspense = Vs;
    xe.isAsyncMode = function (e) {
      return PI(e) || mc(e) === o0;
    };
    xe.isConcurrentMode = PI;
    xe.isContextConsumer = function (e) {
      return mc(e) === vs;
    };
    xe.isContextProvider = function (e) {
      return mc(e) === Bs;
    };
    xe.isElement = function (e) {
      return typeof e == "object" && e !== null && e.$$typeof === l0;
    };
    xe.isForwardRef = function (e) {
      return mc(e) === hs;
    };
    xe.isFragment = function (e) {
      return mc(e) === Is;
    };
    xe.isLazy = function (e) {
      return mc(e) === Js;
    };
    xe.isMemo = function (e) {
      return mc(e) === Cs;
    };
    xe.isPortal = function (e) {
      return mc(e) === n0;
    };
    xe.isProfiler = function (e) {
      return mc(e) === Ws;
    };
    xe.isStrictMode = function (e) {
      return mc(e) === ys;
    };
    xe.isSuspense = function (e) {
      return mc(e) === Vs;
    };
    xe.isValidElementType = function (e) {
      return (
        typeof e == "string" ||
        typeof e == "function" ||
        e === Is ||
        e === Fs ||
        e === Ws ||
        e === ys ||
        e === Vs ||
        e === w2 ||
        (typeof e == "object" &&
          e !== null &&
          (e.$$typeof === Js ||
            e.$$typeof === Cs ||
            e.$$typeof === Bs ||
            e.$$typeof === vs ||
            e.$$typeof === hs ||
            e.$$typeof === O2 ||
            e.$$typeof === Q2 ||
            e.$$typeof === A2 ||
            e.$$typeof === S2))
      );
    };
    xe.typeOf = mc;
  });
  var qI = lt((wT, _I) => {
    "use strict";
    _I.exports = KI();
  });
  var oy = lt((ST, ny) => {
    "use strict";
    var r0 = qI(),
      L2 = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      T2 = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      D2 = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      },
      cy = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      d0 = {};
    d0[r0.ForwardRef] = D2;
    d0[r0.Memo] = cy;
    function $I(e) {
      return r0.isMemo(e) ? cy : d0[e.$$typeof] || L2;
    }
    var U2 = Object.defineProperty,
      M2 = Object.getOwnPropertyNames,
      ey = Object.getOwnPropertySymbols,
      E2 = Object.getOwnPropertyDescriptor,
      j2 = Object.getPrototypeOf,
      ty = Object.prototype;
    function ly(e, t, c) {
      if (typeof t != "string") {
        if (ty) {
          var l = j2(t);
          l && l !== ty && ly(e, l, c);
        }
        var n = M2(t);
        ey && (n = n.concat(ey(t)));
        for (var o = $I(e), r = $I(t), d = 0; d < n.length; ++d) {
          var u = n[d];
          if (!T2[u] && !(c && c[u]) && !(r && r[u]) && !(o && o[u])) {
            var i = E2(t, u);
            try {
              U2(e, u, i);
            } catch {}
          }
        }
      }
      return e;
    }
    ny.exports = ly;
  });
  var BV,
    Dy,
    Uy = ZG(() => {
      fs();
      (BV =
        /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/),
        (Dy = Rs(function (e) {
          return (
            BV.test(e) ||
            (e.charCodeAt(0) === 111 &&
              e.charCodeAt(1) === 110 &&
              e.charCodeAt(2) < 91)
          );
        }));
    });
  var aW = lt((IE, iW) => {
    iW.exports = (function (e) {
      var t = {};
      function c(l) {
        if (t[l]) return t[l].exports;
        var n = (t[l] = { exports: {}, id: l, loaded: !1 });
        return (
          e[l].call(n.exports, n, n.exports, c), (n.loaded = !0), n.exports
        );
      }
      return (c.m = e), (c.c = t), (c.p = ""), c(0);
    })([
      function (e, t, c) {
        e.exports = c(1);
      },
      function (e, t, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var l = c(2);
        Object.defineProperty(t, "combineChunks", {
          enumerable: !0,
          get: function () {
            return l.combineChunks;
          },
        }),
          Object.defineProperty(t, "fillInChunks", {
            enumerable: !0,
            get: function () {
              return l.fillInChunks;
            },
          }),
          Object.defineProperty(t, "findAll", {
            enumerable: !0,
            get: function () {
              return l.findAll;
            },
          }),
          Object.defineProperty(t, "findChunks", {
            enumerable: !0,
            get: function () {
              return l.findChunks;
            },
          });
      },
      function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var c = (t.findAll = function (i) {
            var a = i.autoEscape,
              s = i.caseSensitive,
              b = s === void 0 ? !1 : s,
              m = i.findChunks,
              x = m === void 0 ? n : m,
              p = i.sanitize,
              R = i.searchWords,
              X = i.textToHighlight;
            return o({
              chunksToHighlight: l({
                chunks: x({
                  autoEscape: a,
                  caseSensitive: b,
                  sanitize: p,
                  searchWords: R,
                  textToHighlight: X,
                }),
              }),
              totalLength: X ? X.length : 0,
            });
          }),
          l = (t.combineChunks = function (i) {
            var a = i.chunks;
            return (
              (a = a
                .sort(function (s, b) {
                  return s.start - b.start;
                })
                .reduce(function (s, b) {
                  if (s.length === 0) return [b];
                  var m = s.pop();
                  if (b.start < m.end) {
                    var x = Math.max(m.end, b.end);
                    s.push({ highlight: !1, start: m.start, end: x });
                  } else s.push(m, b);
                  return s;
                }, [])),
              a
            );
          }),
          n = function (i) {
            var a = i.autoEscape,
              s = i.caseSensitive,
              b = i.sanitize,
              m = b === void 0 ? r : b,
              x = i.searchWords,
              p = i.textToHighlight;
            return (
              (p = m(p)),
              x
                .filter(function (R) {
                  return R;
                })
                .reduce(function (R, X) {
                  (X = m(X)), a && (X = d(X));
                  for (
                    var G = new RegExp(X, s ? "g" : "gi"), g = void 0;
                    (g = G.exec(p));

                  ) {
                    var H = g.index,
                      f = G.lastIndex;
                    f > H && R.push({ highlight: !1, start: H, end: f }),
                      g.index === G.lastIndex && G.lastIndex++;
                  }
                  return R;
                }, [])
            );
          };
        t.findChunks = n;
        var o = (t.fillInChunks = function (i) {
          var a = i.chunksToHighlight,
            s = i.totalLength,
            b = [],
            m = function (R, X, G) {
              X - R > 0 && b.push({ start: R, end: X, highlight: G });
            };
          if (a.length === 0) m(0, s, !1);
          else {
            var x = 0;
            a.forEach(function (p) {
              m(x, p.start, !1), m(p.start, p.end, !0), (x = p.end);
            }),
              m(x, s, !1);
          }
          return b;
        });
        function r(u) {
          return u;
        }
        function d(u) {
          return u.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
      },
    ]);
  });
  var Z = C(A());
  var ll = C(qo()),
    ia = C(eZ());
  function tZ(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function cZ(e) {
    var t, c;
    return tZ(e) === !1
      ? !1
      : ((t = e.constructor),
        t === void 0
          ? !0
          : ((c = t.prototype),
            !(tZ(c) === !1 || c.hasOwnProperty("isPrototypeOf") === !1)));
  }
  var $o = function () {
    return (
      ($o =
        Object.assign ||
        function (t) {
          for (var c, l = 1, n = arguments.length; l < n; l++) {
            c = arguments[l];
            for (var o in c)
              Object.prototype.hasOwnProperty.call(c, o) && (t[o] = c[o]);
          }
          return t;
        }),
      $o.apply(this, arguments)
    );
  };
  function lZ(e) {
    return e.toLowerCase();
  }
  var hv = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g],
    Vv = /[^A-Z0-9]+/gi;
  function oZ(e, t) {
    t === void 0 && (t = {});
    for (
      var c = t.splitRegexp,
        l = c === void 0 ? hv : c,
        n = t.stripRegexp,
        o = n === void 0 ? Vv : n,
        r = t.transform,
        d = r === void 0 ? lZ : r,
        u = t.delimiter,
        i = u === void 0 ? " " : u,
        a = nZ(nZ(e, l, "$1\0$2"), o, "\0"),
        s = 0,
        b = a.length;
      a.charAt(s) === "\0";

    )
      s++;
    for (; a.charAt(b - 1) === "\0"; ) b--;
    return a.slice(s, b).split("\0").map(d).join(i);
  }
  function nZ(e, t, c) {
    return t instanceof RegExp
      ? e.replace(t, c)
      : t.reduce(function (l, n) {
          return l.replace(n, c);
        }, e);
  }
  function rZ(e, t) {
    return t === void 0 && (t = {}), oZ(e, $o({ delimiter: "." }, t));
  }
  function dZ(e, t) {
    return t === void 0 && (t = {}), rZ(e, $o({ delimiter: "-" }, t));
  }
  var Ou = C(A());
  var uZ = C(A());
  var vd = {
      general: {
        backends: [],
        whitelist: !1,
        synchronize: { enabled: !1, recurrence: "hourly" },
        addons: {},
      },
      apis: { "rest-api": { relations: [] } },
    },
    pX = (0, Z.createContext)([vd, () => {}]);
  function gX({ children: e, handle: t = ["general"] }) {
    let c = (0, Z.useRef)(null),
      l = (0, Z.useRef)(vd),
      [n, o] = (0, Z.useState)(vd),
      [r, d] = (0, Z.useState)(!1);
    l.current = n;
    let u = (0, Z.useRef)((b) => {
        let m = { general: { ...vd.general, ...b.general } };
        (m.apis = Object.fromEntries(
          Object.entries(b)
            .filter(([R]) => R !== "general")
            .map(([R, X]) => [R, { ...vd.apis[R], ...X }])
        )),
          o(m);
        let x = c.current;
        if (((c.current = { ...m }), x === null)) return;
        let p = Object.keys(m.general.addons).reduce(
          (R, X) => R || m.general.addons[X] !== x.general.addons[X]
        );
        d(p);
      }).current,
      i = (0, Z.useRef)((b) => {
        let m = l.current;
        t.indexOf("general") !== -1 && (b.data.general = m.general),
          Object.entries(m.apis).forEach(([x, p]) => {
            t.indexOf(x) !== -1 && (b.data[x] = p);
          });
      }).current,
      a = (0, Z.useRef)((b) => {
        let m = l.current;
        JSON.stringify(m) !== JSON.stringify(c.current) &&
          (b.preventDefault(), (b.returnValue = !0));
      }).current;
    (0, Z.useEffect)(() => {
      wppb.on("fetch", u),
        wppb.join("submit", i),
        window.addEventListener("beforeunload", (b) => a(b));
    }, []),
      (0, Z.useEffect)(() => {
        r && window.location.reload();
      }, []);
    let s = (b) => o({ ...n, ...b });
    return uZ.default.createElement(pX.Provider, { value: [n, s] }, e);
  }
  function mn() {
    let [{ general: e }, t] = (0, Z.useContext)(pX);
    return [e, (c) => t({ general: c })];
  }
  function HX() {
    let [{ apis: e }, t] = (0, Z.useContext)(pX);
    return [e, (c) => t({ apis: { ...e, ...c } })];
  }
  function iZ() {
    let [e] = HX();
    return Object.keys(e).reduce((t, c) => t.concat(e[c].relations), []);
  }
  var aZ = C(A());
  function ZX() {
    let e = iZ();
    return (0, Z.useMemo)(() => new Set(e.map(({ post_type: t }) => t)), [e]);
  }
  var sZ = (0, Z.createContext)([]);
  function RX({ children: e }) {
    let [t, c] = (0, Z.useState)([]);
    return (
      (0, Z.useEffect)(() => {
        wppb.on("postTypes", c);
      }, []),
      aZ.default.createElement(sZ.Provider, { value: t }, e)
    );
  }
  function er({ filter: e } = { filter: !1 }) {
    let t = (0, Z.useContext)(sZ);
    if (e) {
      let c = ZX();
      return t.filter((l) => !c.has(l));
    }
    return t;
  }
  var Cn = C(A());
  function bZ(e) {
    var t,
      c,
      l = "";
    if (typeof e == "string" || typeof e == "number") l += e;
    else if (typeof e == "object")
      if (Array.isArray(e)) {
        var n = e.length;
        for (t = 0; t < n; t++)
          e[t] && (c = bZ(e[t])) && (l && (l += " "), (l += c));
      } else for (c in e) e[c] && (l && (l += " "), (l += c));
    return l;
  }
  function Cv() {
    for (var e, t, c = 0, l = "", n = arguments.length; c < n; c++)
      (e = arguments[c]) && (t = bZ(e)) && (l && (l += " "), (l += t));
    return l;
  }
  var Qe = Cv;
  var GZ = C(E());
  var tr = (e) => (0, Z.createElement)("path", e);
  var nl = (0, Z.forwardRef)(({ className: e, isPressed: t, ...c }, l) => {
    let n = {
      ...c,
      "className": Qe(e, { "is-pressed": t }) || void 0,
      "aria-hidden": !0,
      "focusable": !1,
    };
    return (0, GZ.jsx)("svg", { ...n, ref: l });
  });
  nl.displayName = "SVG";
  function Xn(e, t) {
    var c = 0,
      l,
      n;
    t = t || {};
    function o() {
      var r = l,
        d = arguments.length,
        u,
        i;
      e: for (; r; ) {
        if (r.args.length !== arguments.length) {
          r = r.next;
          continue;
        }
        for (i = 0; i < d; i++)
          if (r.args[i] !== arguments[i]) {
            r = r.next;
            continue e;
          }
        return (
          r !== l &&
            (r === n && (n = r.prev),
            (r.prev.next = r.next),
            r.next && (r.next.prev = r.prev),
            (r.next = l),
            (r.prev = null),
            (l.prev = r),
            (l = r)),
          r.val
        );
      }
      for (u = new Array(d), i = 0; i < d; i++) u[i] = arguments[i];
      return (
        (r = { args: u, val: e.apply(null, u) }),
        l ? ((l.prev = r), (r.next = l)) : (n = r),
        c === t.maxSize ? ((n = n.prev), (n.next = null)) : c++,
        (l = r),
        r.val
      );
    }
    return (
      (o.clear = function () {
        (l = null), (n = null), (c = 0);
      }),
      o
    );
  }
  var Sv = C(pZ()),
    eJ = Xn(console.error);
  var fX, gZ, Fd, HZ;
  fX = {
    "(": 9,
    "!": 8,
    "*": 7,
    "/": 7,
    "%": 7,
    "+": 6,
    "-": 6,
    "<": 5,
    "<=": 5,
    ">": 5,
    ">=": 5,
    "==": 4,
    "!=": 4,
    "&&": 3,
    "||": 2,
    "?": 1,
    "?:": 1,
  };
  gZ = ["(", "?"];
  Fd = { ")": ["("], ":": ["?", "?:"] };
  HZ = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
  function IX(e) {
    for (var t = [], c = [], l, n, o, r; (l = e.match(HZ)); ) {
      for (
        n = l[0], o = e.substr(0, l.index).trim(), o && t.push(o);
        (r = c.pop());

      ) {
        if (Fd[n]) {
          if (Fd[n][0] === r) {
            n = Fd[n][1] || n;
            break;
          }
        } else if (gZ.indexOf(r) >= 0 || fX[r] < fX[n]) {
          c.push(r);
          break;
        }
        t.push(r);
      }
      Fd[n] || c.push(n), (e = e.substr(l.index + n.length));
    }
    return (e = e.trim()), e && t.push(e), t.concat(c.reverse());
  }
  var Ov = {
    "!": function (e) {
      return !e;
    },
    "*": function (e, t) {
      return e * t;
    },
    "/": function (e, t) {
      return e / t;
    },
    "%": function (e, t) {
      return e % t;
    },
    "+": function (e, t) {
      return e + t;
    },
    "-": function (e, t) {
      return e - t;
    },
    "<": function (e, t) {
      return e < t;
    },
    "<=": function (e, t) {
      return e <= t;
    },
    ">": function (e, t) {
      return e > t;
    },
    ">=": function (e, t) {
      return e >= t;
    },
    "==": function (e, t) {
      return e === t;
    },
    "!=": function (e, t) {
      return e !== t;
    },
    "&&": function (e, t) {
      return e && t;
    },
    "||": function (e, t) {
      return e || t;
    },
    "?:": function (e, t, c) {
      if (e) throw t;
      return c;
    },
  };
  function yX(e, t) {
    var c = [],
      l,
      n,
      o,
      r,
      d,
      u;
    for (l = 0; l < e.length; l++) {
      if (((d = e[l]), (r = Ov[d]), r)) {
        for (n = r.length, o = Array(n); n--; ) o[n] = c.pop();
        try {
          u = r.apply(null, o);
        } catch (i) {
          return i;
        }
      } else t.hasOwnProperty(d) ? (u = t[d]) : (u = +d);
      c.push(u);
    }
    return c[0];
  }
  function WX(e) {
    var t = IX(e);
    return function (c) {
      return yX(t, c);
    };
  }
  function BX(e) {
    var t = WX(e);
    return function (c) {
      return +t({ n: c });
    };
  }
  var ZZ = { contextDelimiter: "", onMissingKey: null };
  function Qv(e) {
    var t, c, l;
    for (t = e.split(";"), c = 0; c < t.length; c++)
      if (((l = t[c].trim()), l.indexOf("plural=") === 0)) return l.substr(7);
  }
  function hd(e, t) {
    var c;
    (this.data = e), (this.pluralForms = {}), (this.options = {});
    for (c in ZZ) this.options[c] = t !== void 0 && c in t ? t[c] : ZZ[c];
  }
  hd.prototype.getPluralForm = function (e, t) {
    var c = this.pluralForms[e],
      l,
      n,
      o;
    return (
      c ||
        ((l = this.data[e][""]),
        (o = l["Plural-Forms"] || l["plural-forms"] || l.plural_forms),
        typeof o != "function" &&
          ((n = Qv(l["Plural-Forms"] || l["plural-forms"] || l.plural_forms)),
          (o = BX(n))),
        (c = this.pluralForms[e] = o)),
      c(t)
    );
  };
  hd.prototype.dcnpgettext = function (e, t, c, l, n) {
    var o, r, d;
    return (
      n === void 0 ? (o = 0) : (o = this.getPluralForm(e, n)),
      (r = c),
      t && (r = t + this.options.contextDelimiter + c),
      (d = this.data[e][r]),
      d && d[o]
        ? d[o]
        : (this.options.onMissingKey && this.options.onMissingKey(c, e),
          o === 0 ? c : l)
    );
  };
  var RZ = {
      "": {
        plural_forms(e) {
          return e === 1 ? 0 : 1;
        },
      },
    },
    Av = /^i18n\.(n?gettext|has_translation)(_|$)/,
    fZ = (e, t, c) => {
      let l = new hd({}),
        n = new Set(),
        o = () => {
          n.forEach((H) => H());
        },
        r = (H) => (n.add(H), () => n.delete(H)),
        d = (H = "default") => l.data[H],
        u = (H, f = "default") => {
          (l.data[f] = { ...l.data[f], ...H }),
            (l.data[f][""] = { ...RZ[""], ...l.data[f]?.[""] }),
            delete l.pluralForms[f];
        },
        i = (H, f) => {
          u(H, f), o();
        },
        a = (H, f = "default") => {
          (l.data[f] = {
            ...l.data[f],
            ...H,
            "": { ...RZ[""], ...l.data[f]?.[""], ...H?.[""] },
          }),
            delete l.pluralForms[f],
            o();
        },
        s = (H, f) => {
          (l.data = {}), (l.pluralForms = {}), i(H, f);
        },
        b = (H = "default", f, I, y, W) => (
          l.data[H] || u(void 0, H), l.dcnpgettext(H, f, I, y, W)
        ),
        m = (H = "default") => H,
        x = (H, f) => {
          let I = b(f, void 0, H);
          return c
            ? ((I = c.applyFilters("i18n.gettext", I, H, f)),
              c.applyFilters("i18n.gettext_" + m(f), I, H, f))
            : I;
        },
        p = (H, f, I) => {
          let y = b(I, f, H);
          return c
            ? ((y = c.applyFilters("i18n.gettext_with_context", y, H, f, I)),
              c.applyFilters("i18n.gettext_with_context_" + m(I), y, H, f, I))
            : y;
        },
        R = (H, f, I, y) => {
          let W = b(y, void 0, H, f, I);
          return c
            ? ((W = c.applyFilters("i18n.ngettext", W, H, f, I, y)),
              c.applyFilters("i18n.ngettext_" + m(y), W, H, f, I, y))
            : W;
        },
        X = (H, f, I, y, W) => {
          let B = b(W, y, H, f, I);
          return c
            ? ((B = c.applyFilters(
                "i18n.ngettext_with_context",
                B,
                H,
                f,
                I,
                y,
                W
              )),
              c.applyFilters(
                "i18n.ngettext_with_context_" + m(W),
                B,
                H,
                f,
                I,
                y,
                W
              ))
            : B;
        },
        G = () => p("ltr", "text direction") === "rtl",
        g = (H, f, I) => {
          let y = f ? f + "" + H : H,
            W = !!l.data?.[I ?? "default"]?.[y];
          return (
            c &&
              ((W = c.applyFilters("i18n.has_translation", W, H, f, I)),
              (W = c.applyFilters("i18n.has_translation_" + m(I), W, H, f, I))),
            W
          );
        };
      if ((e && i(e, t), c)) {
        let H = (f) => {
          Av.test(f) && o();
        };
        c.addAction("hookAdded", "core/i18n", H),
          c.addAction("hookRemoved", "core/i18n", H);
      }
      return {
        getLocaleData: d,
        setLocaleData: i,
        addLocaleData: a,
        resetLocaleData: s,
        subscribe: r,
        __: x,
        _x: p,
        _n: R,
        _nx: X,
        isRTL: G,
        hasTranslation: g,
      };
    };
  function Lv(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The namespace must be a non-empty string."), !1)
      : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)
        ? !0
        : (console.error(
            "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
          ),
          !1);
  }
  var ba = Lv;
  function Tv(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The hook name must be a non-empty string."), !1)
      : /^__/.test(e)
        ? (console.error("The hook name cannot begin with `__`."), !1)
        : /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e)
          ? !0
          : (console.error(
              "The hook name can only contain numbers, letters, dashes, periods and underscores."
            ),
            !1);
  }
  var cr = Tv;
  function Dv(e, t) {
    return function (l, n, o, r = 10) {
      let d = e[t];
      if (!cr(l) || !ba(n)) return;
      if (typeof o != "function") {
        console.error("The hook callback must be a function.");
        return;
      }
      if (typeof r != "number") {
        console.error("If specified, the hook priority must be a number.");
        return;
      }
      let u = { callback: o, priority: r, namespace: n };
      if (d[l]) {
        let i = d[l].handlers,
          a;
        for (a = i.length; a > 0 && !(r >= i[a - 1].priority); a--);
        a === i.length ? (i[a] = u) : i.splice(a, 0, u),
          d.__current.forEach((s) => {
            s.name === l && s.currentIndex >= a && s.currentIndex++;
          });
      } else d[l] = { handlers: [u], runs: 0 };
      l !== "hookAdded" && e.doAction("hookAdded", l, n, o, r);
    };
  }
  var vX = Dv;
  function Uv(e, t, c = !1) {
    return function (n, o) {
      let r = e[t];
      if (!cr(n) || (!c && !ba(o))) return;
      if (!r[n]) return 0;
      let d = 0;
      if (c)
        (d = r[n].handlers.length), (r[n] = { runs: r[n].runs, handlers: [] });
      else {
        let u = r[n].handlers;
        for (let i = u.length - 1; i >= 0; i--)
          u[i].namespace === o &&
            (u.splice(i, 1),
            d++,
            r.__current.forEach((a) => {
              a.name === n && a.currentIndex >= i && a.currentIndex--;
            }));
      }
      return n !== "hookRemoved" && e.doAction("hookRemoved", n, o), d;
    };
  }
  var Vd = Uv;
  function Mv(e, t) {
    return function (l, n) {
      let o = e[t];
      return typeof n < "u"
        ? l in o && o[l].handlers.some((r) => r.namespace === n)
        : l in o;
    };
  }
  var FX = Mv;
  function Ev(e, t, c = !1) {
    return function (n, ...o) {
      let r = e[t];
      r[n] || (r[n] = { handlers: [], runs: 0 }), r[n].runs++;
      let d = r[n].handlers;
      if (!d || !d.length) return c ? o[0] : void 0;
      let u = { name: n, currentIndex: 0 };
      for (r.__current.push(u); u.currentIndex < d.length; ) {
        let a = d[u.currentIndex].callback.apply(null, o);
        c && (o[0] = a), u.currentIndex++;
      }
      if ((r.__current.pop(), c)) return o[0];
    };
  }
  var hX = Ev;
  function jv(e, t) {
    return function () {
      var l;
      let n = e[t];
      return (l = n.__current[n.__current.length - 1]?.name) !== null &&
        l !== void 0
        ? l
        : null;
    };
  }
  var VX = jv;
  function Pv(e, t) {
    return function (l) {
      let n = e[t];
      return typeof l > "u"
        ? typeof n.__current[0] < "u"
        : n.__current[0]
          ? l === n.__current[0].name
          : !1;
    };
  }
  var CX = Pv;
  function Kv(e, t) {
    return function (l) {
      let n = e[t];
      if (cr(l)) return n[l] && n[l].runs ? n[l].runs : 0;
    };
  }
  var JX = Kv;
  var YX = class {
    constructor() {
      (this.actions = Object.create(null)),
        (this.actions.__current = []),
        (this.filters = Object.create(null)),
        (this.filters.__current = []),
        (this.addAction = vX(this, "actions")),
        (this.addFilter = vX(this, "filters")),
        (this.removeAction = Vd(this, "actions")),
        (this.removeFilter = Vd(this, "filters")),
        (this.hasAction = FX(this, "actions")),
        (this.hasFilter = FX(this, "filters")),
        (this.removeAllActions = Vd(this, "actions", !0)),
        (this.removeAllFilters = Vd(this, "filters", !0)),
        (this.doAction = hX(this, "actions")),
        (this.applyFilters = hX(this, "filters", !0)),
        (this.currentAction = VX(this, "actions")),
        (this.currentFilter = VX(this, "filters")),
        (this.doingAction = CX(this, "actions")),
        (this.doingFilter = CX(this, "filters")),
        (this.didAction = JX(this, "actions")),
        (this.didFilter = JX(this, "filters"));
    }
  };
  function _v() {
    return new YX();
  }
  var IZ = _v;
  var NX = IZ(),
    {
      addAction: kJ,
      addFilter: wJ,
      removeAction: SJ,
      removeFilter: OJ,
      hasAction: QJ,
      hasFilter: AJ,
      removeAllActions: LJ,
      removeAllFilters: TJ,
      doAction: DJ,
      applyFilters: UJ,
      currentAction: MJ,
      currentFilter: EJ,
      doingAction: jJ,
      doingFilter: PJ,
      didAction: KJ,
      didFilter: _J,
      actions: qJ,
      filters: $J,
    } = NX;
  var Ke = fZ(void 0, void 0, NX);
  var qv = Ke.getLocaleData.bind(Ke),
    $v = Ke.setLocaleData.bind(Ke),
    eF = Ke.resetLocaleData.bind(Ke),
    tF = Ke.subscribe.bind(Ke),
    ma = Ke.__.bind(Ke),
    cF = Ke._x.bind(Ke),
    lF = Ke._n.bind(Ke),
    nF = Ke._nx.bind(Ke),
    En = Ke.isRTL.bind(Ke),
    oF = Ke.hasTranslation.bind(Ke);
  function rF(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The namespace must be a non-empty string."), !1)
      : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)
        ? !0
        : (console.error(
            "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
          ),
          !1);
  }
  var Xa = rF;
  function dF(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The hook name must be a non-empty string."), !1)
      : /^__/.test(e)
        ? (console.error("The hook name cannot begin with `__`."), !1)
        : /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e)
          ? !0
          : (console.error(
              "The hook name can only contain numbers, letters, dashes, periods and underscores."
            ),
            !1);
  }
  var lr = dF;
  function uF(e, t) {
    return function (l, n, o, r = 10) {
      let d = e[t];
      if (!lr(l) || !Xa(n)) return;
      if (typeof o != "function") {
        console.error("The hook callback must be a function.");
        return;
      }
      if (typeof r != "number") {
        console.error("If specified, the hook priority must be a number.");
        return;
      }
      let u = { callback: o, priority: r, namespace: n };
      if (d[l]) {
        let i = d[l].handlers,
          a;
        for (a = i.length; a > 0 && !(r >= i[a - 1].priority); a--);
        a === i.length ? (i[a] = u) : i.splice(a, 0, u),
          d.__current.forEach((s) => {
            s.name === l && s.currentIndex >= a && s.currentIndex++;
          });
      } else d[l] = { handlers: [u], runs: 0 };
      l !== "hookAdded" && e.doAction("hookAdded", l, n, o, r);
    };
  }
  var zX = uF;
  function iF(e, t, c = !1) {
    return function (n, o) {
      let r = e[t];
      if (!lr(n) || (!c && !Xa(o))) return;
      if (!r[n]) return 0;
      let d = 0;
      if (c)
        (d = r[n].handlers.length), (r[n] = { runs: r[n].runs, handlers: [] });
      else {
        let u = r[n].handlers;
        for (let i = u.length - 1; i >= 0; i--)
          u[i].namespace === o &&
            (u.splice(i, 1),
            d++,
            r.__current.forEach((a) => {
              a.name === n && a.currentIndex >= i && a.currentIndex--;
            }));
      }
      return n !== "hookRemoved" && e.doAction("hookRemoved", n, o), d;
    };
  }
  var Cd = iF;
  function aF(e, t) {
    return function (l, n) {
      let o = e[t];
      return typeof n < "u"
        ? l in o && o[l].handlers.some((r) => r.namespace === n)
        : l in o;
    };
  }
  var kX = aF;
  function sF(e, t, c, l) {
    return function (o, ...r) {
      let d = e[t];
      d[o] || (d[o] = { handlers: [], runs: 0 }), d[o].runs++;
      let u = d[o].handlers;
      if (!u || !u.length) return c ? r[0] : void 0;
      let i = { name: o, currentIndex: 0 };
      async function a() {
        try {
          d.__current.add(i);
          let b = c ? r[0] : void 0;
          for (; i.currentIndex < u.length; )
            (b = await u[i.currentIndex].callback.apply(null, r)),
              c && (r[0] = b),
              i.currentIndex++;
          return c ? b : void 0;
        } finally {
          d.__current.delete(i);
        }
      }
      function s() {
        try {
          d.__current.add(i);
          let b = c ? r[0] : void 0;
          for (; i.currentIndex < u.length; )
            (b = u[i.currentIndex].callback.apply(null, r)),
              c && (r[0] = b),
              i.currentIndex++;
          return c ? b : void 0;
        } finally {
          d.__current.delete(i);
        }
      }
      return (l ? a : s)();
    };
  }
  var Jd = sF;
  function bF(e, t) {
    return function () {
      var l;
      let n = e[t];
      return (l = Array.from(n.__current).at(-1)?.name) !== null && l !== void 0
        ? l
        : null;
    };
  }
  var wX = bF;
  function mF(e, t) {
    return function (l) {
      let n = e[t];
      return typeof l > "u"
        ? n.__current.size > 0
        : Array.from(n.__current).some((o) => o.name === l);
    };
  }
  var SX = mF;
  function XF(e, t) {
    return function (l) {
      let n = e[t];
      if (lr(l)) return n[l] && n[l].runs ? n[l].runs : 0;
    };
  }
  var OX = XF;
  var QX = class {
    constructor() {
      (this.actions = Object.create(null)),
        (this.actions.__current = new Set()),
        (this.filters = Object.create(null)),
        (this.filters.__current = new Set()),
        (this.addAction = zX(this, "actions")),
        (this.addFilter = zX(this, "filters")),
        (this.removeAction = Cd(this, "actions")),
        (this.removeFilter = Cd(this, "filters")),
        (this.hasAction = kX(this, "actions")),
        (this.hasFilter = kX(this, "filters")),
        (this.removeAllActions = Cd(this, "actions", !0)),
        (this.removeAllFilters = Cd(this, "filters", !0)),
        (this.doAction = Jd(this, "actions", !1, !1)),
        (this.doActionAsync = Jd(this, "actions", !1, !0)),
        (this.applyFilters = Jd(this, "filters", !0, !1)),
        (this.applyFiltersAsync = Jd(this, "filters", !0, !0)),
        (this.currentAction = wX(this, "actions")),
        (this.currentFilter = wX(this, "filters")),
        (this.doingAction = SX(this, "actions")),
        (this.doingFilter = SX(this, "filters")),
        (this.didAction = OX(this, "actions")),
        (this.didFilter = OX(this, "filters"));
    }
  };
  function xF() {
    return new QX();
  }
  var yZ = xF;
  var GF = yZ(),
    {
      addAction: YY,
      addFilter: NY,
      removeAction: zY,
      removeFilter: kY,
      hasAction: wY,
      hasFilter: SY,
      removeAllActions: OY,
      removeAllFilters: QY,
      doAction: WZ,
      doActionAsync: AY,
      applyFilters: LY,
      applyFiltersAsync: TY,
      currentAction: DY,
      currentFilter: UY,
      doingAction: MY,
      doingFilter: EY,
      didAction: jY,
      didFilter: PY,
      actions: KY,
      filters: _Y,
    } = GF;
  var BZ = Object.create(null);
  function vl(e, t = {}) {
    let {
        since: c,
        version: l,
        alternative: n,
        plugin: o,
        link: r,
        hint: d,
      } = t,
      u = o ? ` from ${o}` : "",
      i = c ? ` since version ${c}` : "",
      a = l ? ` and will be removed${u} in version ${l}` : "",
      s = n ? ` Please use ${n} instead.` : "",
      b = r ? ` See: ${r}` : "",
      m = d ? ` Note: ${d}` : "",
      x = `${e} is deprecated${i}${a}.${s}${b}${m}`;
    x in BZ || (WZ("deprecated", e, t, x), console.warn(x), (BZ[x] = !0));
  }
  var vZ = new WeakMap();
  function pF(e) {
    let t = vZ.get(e) || 0;
    return vZ.set(e, t + 1), t;
  }
  function gF(e, t, c) {
    return (0, Z.useMemo)(() => {
      if (c) return c;
      let l = pF(e);
      return t ? `${t}-${l}` : l;
    }, [e, c, t]);
  }
  var zt = gF;
  var AX = {};
  _s(AX, { find: () => Yd });
  function HF(e) {
    return [
      e ? '[tabindex]:not([tabindex^="-"])' : "[tabindex]",
      "a[href]",
      "button:not([disabled])",
      'input:not([type="hidden"]):not([disabled])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      'iframe:not([tabindex^="-"])',
      "object",
      "embed",
      "area[href]",
      "[contenteditable]:not([contenteditable=false])",
    ].join(",");
  }
  function FZ(e) {
    return (
      e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    );
  }
  function ZF(e) {
    let t = e.closest("map[name]");
    if (!t) return !1;
    let c = e.ownerDocument.querySelector('img[usemap="#' + t.name + '"]');
    return !!c && FZ(c);
  }
  function Yd(e, { sequential: t = !1 } = {}) {
    let c = e.querySelectorAll(HF(t));
    return Array.from(c).filter((l) => {
      if (!FZ(l)) return !1;
      let { nodeName: n } = l;
      return n === "AREA" ? ZF(l) : !0;
    });
  }
  var DX = {};
  _s(DX, {
    find: () => WF,
    findNext: () => vF,
    findPrevious: () => BF,
    isTabbableIndex: () => hZ,
  });
  function LX(e) {
    let t = e.getAttribute("tabindex");
    return t === null ? 0 : parseInt(t, 10);
  }
  function hZ(e) {
    return LX(e) !== -1;
  }
  function RF() {
    let e = {};
    return function (c, l) {
      let { nodeName: n, type: o, checked: r, name: d } = l;
      if (n !== "INPUT" || o !== "radio" || !d) return c.concat(l);
      let u = e.hasOwnProperty(d);
      if (!(r || !u)) return c;
      if (u) {
        let a = e[d];
        c = c.filter((s) => s !== a);
      }
      return (e[d] = l), c.concat(l);
    };
  }
  function fF(e, t) {
    return { element: e, index: t };
  }
  function IF(e) {
    return e.element;
  }
  function yF(e, t) {
    let c = LX(e.element),
      l = LX(t.element);
    return c === l ? e.index - t.index : c - l;
  }
  function TX(e) {
    return e.filter(hZ).map(fF).sort(yF).map(IF).reduce(RF(), []);
  }
  function WF(e) {
    return TX(Yd(e));
  }
  function BF(e) {
    return TX(Yd(e.ownerDocument.body))
      .reverse()
      .find(
        (t) => e.compareDocumentPosition(t) & e.DOCUMENT_POSITION_PRECEDING
      );
  }
  function vF(e) {
    return TX(Yd(e.ownerDocument.body)).find(
      (t) => e.compareDocumentPosition(t) & e.DOCUMENT_POSITION_FOLLOWING
    );
  }
  function xa(e) {
    return (
      e.ownerDocument.defaultView,
      e.ownerDocument.defaultView.getComputedStyle(e)
    );
  }
  function Nd(e, t = "vertical") {
    if (e) {
      if (
        (t === "vertical" || t === "all") &&
        e.scrollHeight > e.clientHeight
      ) {
        let { overflowY: c } = xa(e);
        if (/(auto|scroll)/.test(c)) return e;
      }
      if (
        (t === "horizontal" || t === "all") &&
        e.scrollWidth > e.clientWidth
      ) {
        let { overflowX: c } = xa(e);
        if (/(auto|scroll)/.test(c)) return e;
      }
      return e.ownerDocument === e.parentNode ? e : Nd(e.parentNode, t);
    }
  }
  var Ga = { focusable: AX, tabbable: DX };
  function zd(e, t) {
    let c = (0, Z.useRef)();
    return (0, Z.useCallback)((l) => {
      l ? (c.current = e(l)) : c.current && c.current();
    }, t);
  }
  function FF() {
    return zd((e) => {
      function t(c) {
        let { key: l, shiftKey: n, target: o } = c;
        if (l !== "Tab") return;
        let r = n ? "findPrevious" : "findNext",
          d = Ga.tabbable[r](o) || null;
        if (o.contains(d)) {
          c.preventDefault(), d?.focus();
          return;
        }
        if (e.contains(d)) return;
        let u = n ? "append" : "prepend",
          { ownerDocument: i } = e,
          a = i.createElement("div");
        (a.tabIndex = -1),
          e[u](a),
          a.addEventListener("blur", () => e.removeChild(a)),
          a.focus();
      }
      return (
        e.addEventListener("keydown", t),
        () => {
          e.removeEventListener("keydown", t);
        }
      );
    }, []);
  }
  var UX = FF;
  function pa(e = "firstElement") {
    let t = (0, Z.useRef)(e),
      c = (n) => {
        n.focus({ preventScroll: !0 });
      },
      l = (0, Z.useRef)();
    return (
      (0, Z.useEffect)(() => {
        t.current = e;
      }, [e]),
      zd((n) => {
        var o;
        if (
          !(!n || t.current === !1) &&
          !n.contains(
            (o = n.ownerDocument?.activeElement) !== null && o !== void 0
              ? o
              : null
          )
        ) {
          if (t.current !== "firstElement") {
            c(n);
            return;
          }
          return (
            (l.current = setTimeout(() => {
              let r = Ga.tabbable.find(n)[0];
              r && c(r);
            }, 0)),
            () => {
              l.current && clearTimeout(l.current);
            }
          );
        }
      }, [])
    );
  }
  var ga = null;
  function hF(e) {
    let t = (0, Z.useRef)(null),
      c = (0, Z.useRef)(null),
      l = (0, Z.useRef)(e);
    return (
      (0, Z.useEffect)(() => {
        l.current = e;
      }, [e]),
      (0, Z.useCallback)((n) => {
        if (n) {
          if (((t.current = n), c.current)) return;
          c.current = n.ownerDocument.activeElement;
        } else if (c.current) {
          let r = t.current?.contains(t.current?.ownerDocument.activeElement);
          if (t.current?.isConnected && !r) {
            var o;
            ((o = ga) !== null && o !== void 0) || (ga = c.current);
            return;
          }
          l.current
            ? l.current()
            : (c.current.isConnected ? c.current : ga)?.focus(),
            (ga = null);
        }
      }, [])
    );
  }
  var MX = hF;
  function Ha(e, t) {
    typeof e == "function"
      ? e(t)
      : e && e.hasOwnProperty("current") && (e.current = t);
  }
  function xn(e) {
    let t = (0, Z.useRef)(),
      c = (0, Z.useRef)(!1),
      l = (0, Z.useRef)(!1),
      n = (0, Z.useRef)([]),
      o = (0, Z.useRef)(e);
    return (
      (o.current = e),
      (0, Z.useLayoutEffect)(() => {
        l.current === !1 &&
          c.current === !0 &&
          e.forEach((r, d) => {
            let u = n.current[d];
            r !== u && (Ha(u, null), Ha(r, t.current));
          }),
          (n.current = e);
      }, e),
      (0, Z.useLayoutEffect)(() => {
        l.current = !1;
      }),
      (0, Z.useCallback)((r) => {
        Ha(t, r), (l.current = !0), (c.current = r !== null);
        let d = r ? o.current : n.current;
        for (let u of d) Ha(u, r);
      }, [])
    );
  }
  var VZ = new Map();
  function VF(e) {
    if (!e) return null;
    let t = VZ.get(e);
    return (
      t ||
      (typeof window < "u" && typeof window.matchMedia == "function"
        ? ((t = window.matchMedia(e)), VZ.set(e, t), t)
        : null)
    );
  }
  function EX(e) {
    let t = (0, Z.useMemo)(() => {
      let c = VF(e);
      return {
        subscribe(l) {
          return c
            ? (c.addEventListener?.("change", l),
              () => {
                c.removeEventListener?.("change", l);
              })
            : () => {};
        },
        getValue() {
          var l;
          return (l = c?.matches) !== null && l !== void 0 ? l : !1;
        },
      };
    }, [e]);
    return (0, Z.useSyncExternalStore)(t.subscribe, t.getValue, () => !1);
  }
  function Za(e) {
    let t = (0, Z.useRef)();
    return (
      (0, Z.useEffect)(() => {
        t.current = e;
      }, [e]),
      t.current
    );
  }
  var CF = () => EX("(prefers-reduced-motion: reduce)"),
    kd = CF;
  var JF = Object.defineProperty,
    YF = Object.defineProperties,
    NF = Object.getOwnPropertyDescriptors,
    Ra = Object.getOwnPropertySymbols,
    JZ = Object.prototype.hasOwnProperty,
    YZ = Object.prototype.propertyIsEnumerable,
    CZ = (e, t, c) =>
      t in e
        ? JF(e, t, { enumerable: !0, configurable: !0, writable: !0, value: c })
        : (e[t] = c),
    J = (e, t) => {
      for (var c in t || (t = {})) JZ.call(t, c) && CZ(e, c, t[c]);
      if (Ra) for (var c of Ra(t)) YZ.call(t, c) && CZ(e, c, t[c]);
      return e;
    },
    w = (e, t) => YF(e, NF(t)),
    _ = (e, t) => {
      var c = {};
      for (var l in e) JZ.call(e, l) && t.indexOf(l) < 0 && (c[l] = e[l]);
      if (e != null && Ra)
        for (var l of Ra(e)) t.indexOf(l) < 0 && YZ.call(e, l) && (c[l] = e[l]);
      return c;
    };
  var zF = Object.defineProperty,
    kF = Object.defineProperties,
    wF = Object.getOwnPropertyDescriptors,
    fa = Object.getOwnPropertySymbols,
    zZ = Object.prototype.hasOwnProperty,
    kZ = Object.prototype.propertyIsEnumerable,
    NZ = (e, t, c) =>
      t in e
        ? zF(e, t, { enumerable: !0, configurable: !0, writable: !0, value: c })
        : (e[t] = c),
    ee = (e, t) => {
      for (var c in t || (t = {})) zZ.call(t, c) && NZ(e, c, t[c]);
      if (fa) for (var c of fa(t)) kZ.call(t, c) && NZ(e, c, t[c]);
      return e;
    },
    ge = (e, t) => kF(e, wF(t)),
    Ia = (e, t) => {
      var c = {};
      for (var l in e) zZ.call(e, l) && t.indexOf(l) < 0 && (c[l] = e[l]);
      if (e != null && fa)
        for (var l of fa(e)) t.indexOf(l) < 0 && kZ.call(e, l) && (c[l] = e[l]);
      return c;
    };
  function jn(...e) {}
  function jX(e, t) {
    if (SF(e)) {
      let c = OF(t) ? t() : t;
      return e(c);
    }
    return e;
  }
  function SF(e) {
    return typeof e == "function";
  }
  function OF(e) {
    return typeof e == "function";
  }
  function Ac(e, t) {
    return typeof Object.hasOwn == "function"
      ? Object.hasOwn(e, t)
      : Object.prototype.hasOwnProperty.call(e, t);
  }
  function He(...e) {
    return (...t) => {
      for (let c of e) typeof c == "function" && c(...t);
    };
  }
  function PX(e, t) {
    let c = ee({}, e);
    for (let l of t) Ac(c, l) && delete c[l];
    return c;
  }
  function KX(e, t) {
    let c = {};
    for (let l of t) Ac(e, l) && (c[l] = e[l]);
    return c;
  }
  function wd(e) {
    return e;
  }
  function Ce(e, t) {
    if (!e)
      throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
  }
  function _X(e) {
    return Object.keys(e);
  }
  function Gn(e, ...t) {
    let c = typeof e == "function" ? e(...t) : e;
    return c == null ? !1 : !c;
  }
  function Lc(e) {
    return (
      e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true"
    );
  }
  function Fl(e) {
    let t = {};
    for (let c in e) e[c] !== void 0 && (t[c] = e[c]);
    return t;
  }
  function K(...e) {
    for (let t of e) if (t !== void 0) return t;
  }
  var wZ = C(A(), 1);
  function Sd(e, t) {
    typeof e == "function" ? e(t) : e && (e.current = t);
  }
  function QF(e) {
    return !e || !(0, wZ.isValidElement)(e)
      ? !1
      : "ref" in e.props || "ref" in e;
  }
  function SZ(e) {
    return QF(e) ? J({}, e.props).ref || e.ref : null;
  }
  function OZ(e, t) {
    let c = J({}, e);
    for (let l in t) {
      if (!Ac(t, l)) continue;
      if (l === "className") {
        let o = "className";
        c[o] = e[o] ? `${e[o]} ${t[o]}` : t[o];
        continue;
      }
      if (l === "style") {
        let o = "style";
        c[o] = e[o] ? J(J({}, e[o]), t[o]) : t[o];
        continue;
      }
      let n = t[l];
      if (typeof n == "function" && l.startsWith("on")) {
        let o = e[l];
        if (typeof o == "function") {
          c[l] = (...r) => {
            n(...r), o(...r);
          };
          continue;
        }
      }
      c[l] = n;
    }
    return c;
  }
  var hl = AF();
  function AF() {
    var e;
    return (
      typeof window < "u" &&
      !!((e = window.document) != null && e.createElement)
    );
  }
  function ue(e) {
    return e ? e.ownerDocument || e : document;
  }
  function Od(e) {
    return ue(e).defaultView || window;
  }
  function uc(e, t = !1) {
    let { activeElement: c } = ue(e);
    if (!c?.nodeName) return null;
    if (Qd(c) && c.contentDocument) return uc(c.contentDocument.body, t);
    if (t) {
      let l = c.getAttribute("aria-activedescendant");
      if (l) {
        let n = ue(c).getElementById(l);
        if (n) return n;
      }
    }
    return c;
  }
  function Xe(e, t) {
    return e === t || e.contains(t);
  }
  function Qd(e) {
    return e.tagName === "IFRAME";
  }
  function Ic(e) {
    let t = e.tagName.toLowerCase();
    return t === "button"
      ? !0
      : t === "input" && e.type
        ? LF.indexOf(e.type) !== -1
        : !1;
  }
  var LF = ["button", "color", "file", "image", "reset", "submit"];
  function Ad(e) {
    if (typeof e.checkVisibility == "function") return e.checkVisibility();
    let t = e;
    return (
      t.offsetWidth > 0 || t.offsetHeight > 0 || e.getClientRects().length > 0
    );
  }
  function ic(e) {
    try {
      let t = e instanceof HTMLInputElement && e.selectionStart !== null,
        c = e.tagName === "TEXTAREA";
      return t || c || !1;
    } catch {
      return !1;
    }
  }
  function Ld(e) {
    return e.isContentEditable || ic(e);
  }
  function qX(e) {
    if (ic(e)) return e.value;
    if (e.isContentEditable) {
      let t = ue(e).createRange();
      return t.selectNodeContents(e), t.toString();
    }
    return "";
  }
  function $X(e) {
    let t = 0,
      c = 0;
    if (ic(e)) (t = e.selectionStart || 0), (c = e.selectionEnd || 0);
    else if (e.isContentEditable) {
      let l = ue(e).getSelection();
      if (
        l?.rangeCount &&
        l.anchorNode &&
        Xe(e, l.anchorNode) &&
        l.focusNode &&
        Xe(e, l.focusNode)
      ) {
        let n = l.getRangeAt(0),
          o = n.cloneRange();
        o.selectNodeContents(e),
          o.setEnd(n.startContainer, n.startOffset),
          (t = o.toString().length),
          o.setEnd(n.endContainer, n.endOffset),
          (c = o.toString().length);
      }
    }
    return { start: t, end: c };
  }
  function ya(e) {
    if (!e) return null;
    let t = (c) => c === "auto" || c === "scroll";
    if (e.clientHeight && e.scrollHeight > e.clientHeight) {
      let { overflowY: c } = getComputedStyle(e);
      if (t(c)) return e;
    } else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
      let { overflowX: c } = getComputedStyle(e);
      if (t(c)) return e;
    }
    return ya(e.parentElement) || document.scrollingElement || document.body;
  }
  function QZ() {
    return hl && !!navigator.maxTouchPoints;
  }
  function Wa() {
    return hl ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
  }
  function Pn() {
    return hl && Wa() && /apple/i.test(navigator.vendor);
  }
  function ex() {
    return hl && /firefox\//i.test(navigator.userAgent);
  }
  function tx() {
    return hl && navigator.platform.startsWith("Mac") && !QZ();
  }
  function Ba(e) {
    return !!(e.currentTarget && !Xe(e.currentTarget, e.target));
  }
  function vt(e) {
    return e.target === e.currentTarget;
  }
  function Kn(e, t) {
    let c = new FocusEvent("blur", t),
      l = e.dispatchEvent(c),
      n = ge(ee({}, t), { bubbles: !0 });
    return e.dispatchEvent(new FocusEvent("focusout", n)), l;
  }
  function AZ(e, t, c) {
    let l = new KeyboardEvent(t, c);
    return e.dispatchEvent(l);
  }
  function cx(e, t) {
    let c = new MouseEvent("click", t);
    return e.dispatchEvent(c);
  }
  function pn(e, t) {
    let c = t || e.currentTarget,
      l = e.relatedTarget;
    return !l || !Xe(c, l);
  }
  function gn(e, t, c, l) {
    let o = ((d) => {
        if (l) {
          let i = setTimeout(d, l);
          return () => clearTimeout(i);
        }
        let u = requestAnimationFrame(d);
        return () => cancelAnimationFrame(u);
      })(() => {
        e.removeEventListener(t, r, !0), c();
      }),
      r = () => {
        o(), c();
      };
    return e.addEventListener(t, r, { once: !0, capture: !0 }), o;
  }
  function Je(e, t, c, l = window) {
    let n = [];
    try {
      l.document.addEventListener(e, t, c);
      for (let r of Array.from(l.frames)) n.push(Je(e, t, c, r));
    } catch {}
    return () => {
      try {
        l.document.removeEventListener(e, t, c);
      } catch {}
      for (let r of n) r();
    };
  }
  var Ye = C(A(), 1),
    TF = C(A(), 1),
    lx = J({}, TF),
    LZ = lx.useId,
    y3 = lx.useDeferredValue,
    TZ = lx.useInsertionEffect,
    ne = hl ? Ye.useLayoutEffect : Ye.useEffect;
  function Fa(e) {
    let t = (0, Ye.useRef)(e);
    return (
      ne(() => {
        t.current = e;
      }),
      t
    );
  }
  function j(e) {
    let t = (0, Ye.useRef)(() => {
      throw new Error("Cannot call an event handler while rendering.");
    });
    return (
      TZ
        ? TZ(() => {
            t.current = e;
          })
        : (t.current = e),
      (0, Ye.useCallback)((...c) => {
        var l;
        return (l = t.current) == null ? void 0 : l.call(t, ...c);
      }, [])
    );
  }
  function MZ(e) {
    let [t, c] = (0, Ye.useState)(null);
    return (
      ne(() => {
        if (t == null || !e) return;
        let l = null;
        return (
          e((n) => ((l = n), t)),
          () => {
            e(l);
          }
        );
      }, [t, e]),
      [t, c]
    );
  }
  function ve(...e) {
    return (0, Ye.useMemo)(() => {
      if (e.some(Boolean))
        return (t) => {
          for (let c of e) Sd(c, t);
        };
    }, e);
  }
  function yc(e) {
    if (LZ) {
      let l = LZ();
      return e || l;
    }
    let [t, c] = (0, Ye.useState)(e);
    return (
      ne(() => {
        if (e || t) return;
        let l = Math.random().toString(36).substr(2, 6);
        c(`id-${l}`);
      }, [e, t]),
      e || t
    );
  }
  function ha(e, t) {
    let c = (o) => {
        if (typeof o == "string") return o;
      },
      [l, n] = (0, Ye.useState)(() => c(t));
    return (
      ne(() => {
        let o = e && "current" in e ? e.current : e;
        n(o?.tagName.toLowerCase() || c(t));
      }, [e, t]),
      l
    );
  }
  function Vl(e, t) {
    let c = (0, Ye.useRef)(!1);
    (0, Ye.useEffect)(() => {
      if (c.current) return e();
      c.current = !0;
    }, t),
      (0, Ye.useEffect)(
        () => () => {
          c.current = !1;
        },
        []
      );
  }
  function EZ() {
    return (0, Ye.useReducer)(() => [], []);
  }
  function jt(e) {
    return j(typeof e == "function" ? e : () => e);
  }
  function Ie(e, t, c = []) {
    let l = (0, Ye.useCallback)(
      (n) => (e.wrapElement && (n = e.wrapElement(n)), t(n)),
      [...c, e.wrapElement]
    );
    return w(J({}, e), { wrapElement: l });
  }
  function nr(e = !1, t) {
    let [c, l] = (0, Ye.useState)(null);
    return { portalRef: ve(l, t), portalNode: c, domReady: !e || c };
  }
  function jZ(e, t, c) {
    let l = e.onLoadedMetadataCapture,
      n = (0, Ye.useMemo)(
        () => Object.assign(() => {}, w(J({}, l), { [t]: c })),
        [l, t, c]
      );
    return [l?.[t], { onLoadedMetadataCapture: n }];
  }
  function Va() {
    return (
      (0, Ye.useEffect)(() => {
        Je("mousemove", UF, !0),
          Je("mousedown", va, !0),
          Je("mouseup", va, !0),
          Je("keydown", va, !0),
          Je("scroll", va, !0);
      }, []),
      j(() => nx)
    );
  }
  var nx = !1,
    DZ = 0,
    UZ = 0;
  function DF(e) {
    let t = e.movementX || e.screenX - DZ,
      c = e.movementY || e.screenY - UZ;
    return (DZ = e.screenX), (UZ = e.screenY), t || c || !1;
  }
  function UF(e) {
    DF(e) && (nx = !0);
  }
  function va() {
    nx = !1;
  }
  var kt = C(A(), 1),
    _n = C(E(), 1);
  function P(e) {
    let t = kt.forwardRef((c, l) => e(w(J({}, c), { ref: l })));
    return (t.displayName = e.displayName || e.name), t;
  }
  function Ca(e, t) {
    return kt.memo(e, t);
  }
  function q(e, t) {
    let c = t,
      { wrapElement: l, render: n } = c,
      o = _(c, ["wrapElement", "render"]),
      r = ve(t.ref, SZ(n)),
      d;
    if (kt.isValidElement(n)) {
      let u = w(J({}, n.props), { ref: r });
      d = kt.cloneElement(n, OZ(o, u));
    } else n ? (d = n(o)) : (d = (0, _n.jsx)(e, J({}, o)));
    return l ? l(d) : d;
  }
  function te(e) {
    let t = (c = {}) => e(c);
    return (t.displayName = e.name), t;
  }
  function _e(e = [], t = []) {
    let c = kt.createContext(void 0),
      l = kt.createContext(void 0),
      n = () => kt.useContext(c),
      o = (i = !1) => {
        let a = kt.useContext(l),
          s = n();
        return i ? a : a || s;
      },
      r = () => {
        let i = kt.useContext(l),
          a = n();
        if (!(i && i === a)) return a;
      },
      d = (i) =>
        e.reduceRight(
          (a, s) => (0, _n.jsx)(s, w(J({}, i), { children: a })),
          (0, _n.jsx)(c.Provider, J({}, i))
        );
    return {
      context: c,
      scopedContext: l,
      useContext: n,
      useScopedContext: o,
      useProviderContext: r,
      ContextProvider: d,
      ScopedContextProvider: (i) =>
        (0, _n.jsx)(
          d,
          w(J({}, i), {
            children: t.reduceRight(
              (a, s) => (0, _n.jsx)(s, w(J({}, i), { children: a })),
              (0, _n.jsx)(l.Provider, J({}, i))
            ),
          })
        ),
    };
  }
  var Td = _e(),
    PZ = Td.useContext,
    C3 = Td.useScopedContext,
    J3 = Td.useProviderContext,
    KZ = Td.ContextProvider,
    _Z = Td.ScopedContextProvider;
  var ox = C(A(), 1),
    Dd = _e([KZ], [_Z]),
    qZ = Dd.useContext,
    k3 = Dd.useScopedContext,
    $Z = Dd.useProviderContext,
    Hn = Dd.ContextProvider,
    or = Dd.ScopedContextProvider,
    eR = (0, ox.createContext)(void 0),
    tR = (0, ox.createContext)(void 0);
  function rr(e, t) {
    let c = e.__unstableInternals;
    return Ce(c, "Invalid store"), c[t];
  }
  function De(e, ...t) {
    let c = e,
      l = c,
      n = Symbol(),
      o = jn,
      r = new Set(),
      d = new Set(),
      u = new Set(),
      i = new Set(),
      a = new Set(),
      s = new WeakMap(),
      b = new WeakMap(),
      m = (W) => (u.add(W), () => u.delete(W)),
      x = () => {
        let W = r.size,
          B = Symbol();
        r.add(B);
        let F = () => {
          r.delete(B), !r.size && o();
        };
        if (W) return F;
        let S = _X(c).map((Y) =>
            He(
              ...t.map((N) => {
                var V;
                let k = (V = N?.getState) == null ? void 0 : V.call(N);
                if (k && Ac(k, Y))
                  return Fe(N, [Y], (D) => {
                    I(Y, D[Y], !0);
                  });
              })
            )
          ),
          O = [];
        for (let Y of u) O.push(Y());
        let v = t.map(dr);
        return (o = He(...S, ...O, ...v)), F;
      },
      p = (W, B, F = i) => (
        F.add(B),
        b.set(B, W),
        () => {
          var S;
          (S = s.get(B)) == null || S(), s.delete(B), b.delete(B), F.delete(B);
        }
      ),
      R = (W, B) => p(W, B),
      X = (W, B) => (s.set(B, B(c, c)), p(W, B)),
      G = (W, B) => (s.set(B, B(c, l)), p(W, B, a)),
      g = (W) => De(KX(c, W), y),
      H = (W) => De(PX(c, W), y),
      f = () => c,
      I = (W, B, F = !1) => {
        var S;
        if (!Ac(c, W)) return;
        let O = jX(B, c[W]);
        if (O === c[W]) return;
        if (!F) for (let V of t) (S = V?.setState) == null || S.call(V, W, O);
        let v = c;
        c = ge(ee({}, c), { [W]: O });
        let Y = Symbol();
        (n = Y), d.add(W);
        let N = (V, k, D) => {
          var h;
          let L = b.get(V),
            M = (pe) => (D ? D.has(pe) : pe === W);
          (!L || L.some(M)) &&
            ((h = s.get(V)) == null || h(), s.set(V, V(c, k)));
        };
        for (let V of i) N(V, v);
        queueMicrotask(() => {
          if (n !== Y) return;
          let V = c;
          for (let k of a) N(k, l, d);
          (l = V), d.clear();
        });
      },
      y = {
        getState: f,
        setState: I,
        __unstableInternals: {
          setup: m,
          init: x,
          subscribe: R,
          sync: X,
          batch: G,
          pick: g,
          omit: H,
        },
      };
    return y;
  }
  function xt(e, ...t) {
    if (e) return rr(e, "setup")(...t);
  }
  function dr(e, ...t) {
    if (e) return rr(e, "init")(...t);
  }
  function Ud(e, ...t) {
    if (e) return rr(e, "subscribe")(...t);
  }
  function Fe(e, ...t) {
    if (e) return rr(e, "sync")(...t);
  }
  function Zn(e, ...t) {
    if (e) return rr(e, "batch")(...t);
  }
  function Rn(e, ...t) {
    if (e) return rr(e, "omit")(...t);
  }
  function qn(...e) {
    let t = e.reduce((l, n) => {
      var o;
      let r = (o = n?.getState) == null ? void 0 : o.call(n);
      return r ? Object.assign(l, r) : l;
    }, {});
    return De(t, ...e);
  }
  var $n = C(A(), 1),
    rR = C(oR(), 1),
    { useSyncExternalStore: th } = rR.default,
    ch = () => () => {};
  function oe(e, t = wd) {
    let c = $n.useCallback((n) => (e ? Ud(e, null, n) : ch()), [e]),
      l = () => {
        let n = typeof t == "string" ? t : null,
          o = typeof t == "function" ? t : null,
          r = e?.getState();
        if (o) return o(r);
        if (r && n && Ac(r, n)) return r[n];
      };
    return th(c, l, l);
  }
  function Ze(e, t, c, l) {
    let n = Ac(t, c) ? t[c] : void 0,
      o = l ? t[l] : void 0,
      r = Fa({ value: n, setValue: o });
    ne(
      () =>
        Fe(e, [c], (d, u) => {
          let { value: i, setValue: a } = r.current;
          a && d[c] !== u[c] && d[c] !== i && a(d[c]);
        }),
      [e, c]
    ),
      ne(() => {
        if (n !== void 0)
          return (
            e.setState(c, n),
            Zn(e, [c], () => {
              n !== void 0 && e.setState(c, n);
            })
          );
      });
  }
  function Pt(e, t) {
    let [c, l] = $n.useState(() => e(t));
    ne(() => dr(c), [c]);
    let n = $n.useCallback((d) => oe(c, d), [c]),
      o = $n.useMemo(() => w(J({}, c), { useState: n }), [c, n]),
      r = j(() => {
        l((d) => e(J(J({}, t), d.getState())));
      });
    return [o, r];
  }
  function lh(e, t) {
    return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
  }
  function nh(e) {
    let t = e.map((l, n) => [n, l]),
      c = !1;
    return (
      t.sort(([l, n], [o, r]) => {
        let d = n.element,
          u = r.element;
        return d === u || !d || !u
          ? 0
          : lh(d, u)
            ? (l > o && (c = !0), -1)
            : (l < o && (c = !0), 1);
      }),
      c ? t.map(([l, n]) => n) : e
    );
  }
  function oh(e) {
    var t;
    let c = e.find((o) => !!o.element),
      l = [...e].reverse().find((o) => !!o.element),
      n = (t = c?.element) == null ? void 0 : t.parentElement;
    for (; n && l?.element; ) {
      if (l && n.contains(l.element)) return n;
      n = n.parentElement;
    }
    return ue(n).body;
  }
  function rh(e) {
    return e?.__unstablePrivateStore;
  }
  function Ja(e = {}) {
    var t;
    e.store;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = K(e.items, c?.items, e.defaultItems, []),
      n = new Map(l.map((b) => [b.id, b])),
      o = { items: l, renderedItems: K(c?.renderedItems, []) },
      r = rh(e.store),
      d = De({ items: l, renderedItems: o.renderedItems }, r),
      u = De(o, e.store),
      i = (b) => {
        let m = nh(b);
        d.setState("renderedItems", m), u.setState("renderedItems", m);
      };
    xt(u, () => dr(d)),
      xt(d, () =>
        Zn(d, ["items"], (b) => {
          u.setState("items", b.items);
        })
      ),
      xt(d, () =>
        Zn(d, ["renderedItems"], (b) => {
          let m = !0,
            x = requestAnimationFrame(() => {
              let { renderedItems: G } = u.getState();
              b.renderedItems !== G && i(b.renderedItems);
            });
          if (typeof IntersectionObserver != "function")
            return () => cancelAnimationFrame(x);
          let p = () => {
              if (m) {
                m = !1;
                return;
              }
              cancelAnimationFrame(x),
                (x = requestAnimationFrame(() => i(b.renderedItems)));
            },
            R = oh(b.renderedItems),
            X = new IntersectionObserver(p, { root: R });
          for (let G of b.renderedItems) G.element && X.observe(G.element);
          return () => {
            cancelAnimationFrame(x), X.disconnect();
          };
        })
      );
    let a = (b, m, x = !1) => {
        let p;
        return (
          m((X) => {
            let G = X.findIndex(({ id: H }) => H === b.id),
              g = X.slice();
            if (G !== -1) {
              p = X[G];
              let H = ee(ee({}, p), b);
              (g[G] = H), n.set(b.id, H);
            } else g.push(b), n.set(b.id, b);
            return g;
          }),
          () => {
            m((X) => {
              if (!p)
                return x && n.delete(b.id), X.filter(({ id: H }) => H !== b.id);
              let G = X.findIndex(({ id: H }) => H === b.id);
              if (G === -1) return X;
              let g = X.slice();
              return (g[G] = p), n.set(b.id, p), g;
            });
          }
        );
      },
      s = (b) => a(b, (m) => d.setState("items", m), !0);
    return ge(ee({}, u), {
      registerItem: s,
      renderItem: (b) =>
        He(
          s(b),
          a(b, (m) => d.setState("renderedItems", m))
        ),
      item: (b) => {
        if (!b) return null;
        let m = n.get(b);
        if (!m) {
          let { items: x } = u.getState();
          (m = x.find((p) => p.id === b)), m && n.set(b, m);
        }
        return m || null;
      },
      __unstablePrivateStore: d,
    });
  }
  function dR(e, t, c) {
    return Vl(t, [c.store]), Ze(e, c, "items", "setItems"), e;
  }
  function Md(e) {
    let t = [];
    for (let c of e) t.push(...c);
    return t;
  }
  function ir(e) {
    return e.slice().reverse();
  }
  var dh = { id: null };
  function Cl(e, t) {
    return e.find((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function uh(e, t) {
    return e.filter((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function uR(e, t) {
    return e.filter((c) => c.rowId === t);
  }
  function ih(e, t, c = !1) {
    let l = e.findIndex((n) => n.id === t);
    return [...e.slice(l + 1), ...(c ? [dh] : []), ...e.slice(0, l)];
  }
  function iR(e) {
    let t = [];
    for (let c of e) {
      let l = t.find((n) => {
        var o;
        return ((o = n[0]) == null ? void 0 : o.rowId) === c.rowId;
      });
      l ? l.push(c) : t.push([c]);
    }
    return t;
  }
  function aR(e) {
    let t = 0;
    for (let { length: c } of e) c > t && (t = c);
    return t;
  }
  function ah(e) {
    return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
  }
  function sh(e, t, c) {
    let l = aR(e);
    for (let n of e)
      for (let o = 0; o < l; o += 1) {
        let r = n[o];
        if (!r || (c && r.disabled)) {
          let u = o === 0 && c ? Cl(n) : n[o - 1];
          n[o] = u && t !== u.id && c ? u : ah(u?.rowId);
        }
      }
    return e;
  }
  function bh(e) {
    let t = iR(e),
      c = aR(t),
      l = [];
    for (let n = 0; n < c; n += 1)
      for (let o of t) {
        let r = o[n];
        r && l.push(ge(ee({}, r), { rowId: r.rowId ? `${n}` : void 0 }));
      }
    return l;
  }
  function sR(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = Ja(e),
      n = K(e.activeId, c?.activeId, e.defaultActiveId),
      o = ge(ee({}, l.getState()), {
        activeId: n,
        baseElement: K(c?.baseElement, null),
        includesBaseElement: K(
          e.includesBaseElement,
          c?.includesBaseElement,
          n === null
        ),
        moves: K(c?.moves, 0),
        orientation: K(e.orientation, c?.orientation, "both"),
        rtl: K(e.rtl, c?.rtl, !1),
        virtualFocus: K(e.virtualFocus, c?.virtualFocus, !1),
        focusLoop: K(e.focusLoop, c?.focusLoop, !1),
        focusWrap: K(e.focusWrap, c?.focusWrap, !1),
        focusShift: K(e.focusShift, c?.focusShift, !1),
      }),
      r = De(o, l, e.store);
    xt(r, () =>
      Fe(r, ["renderedItems", "activeId"], (u) => {
        r.setState("activeId", (i) => {
          var a;
          return i !== void 0
            ? i
            : (a = Cl(u.renderedItems)) == null
              ? void 0
              : a.id;
        });
      })
    );
    let d = (u = "next", i = {}) => {
      var a, s;
      let b = r.getState(),
        {
          skip: m = 0,
          activeId: x = b.activeId,
          focusShift: p = b.focusShift,
          focusLoop: R = b.focusLoop,
          focusWrap: X = b.focusWrap,
          includesBaseElement: G = b.includesBaseElement,
          renderedItems: g = b.renderedItems,
          rtl: H = b.rtl,
        } = i,
        f = u === "up" || u === "down",
        I = u === "next" || u === "down",
        y = I ? H && !f : !H || f,
        W = p && !m,
        B = f ? Md(sh(iR(g), x, W)) : g;
      if (((B = y ? ir(B) : B), (B = f ? bh(B) : B), x == null))
        return (a = Cl(B)) == null ? void 0 : a.id;
      let F = B.find((h) => h.id === x);
      if (!F) return (s = Cl(B)) == null ? void 0 : s.id;
      let S = B.some((h) => h.rowId),
        O = B.indexOf(F),
        v = B.slice(O + 1),
        Y = uR(v, F.rowId);
      if (m) {
        let h = uh(Y, x),
          L = h.slice(m)[0] || h[h.length - 1];
        return L?.id;
      }
      let N = R && (f ? R !== "horizontal" : R !== "vertical"),
        V = S && X && (f ? X !== "horizontal" : X !== "vertical"),
        k = I ? (!S || f) && N && G : f ? G : !1;
      if (N) {
        let h = V && !k ? B : uR(B, F.rowId),
          L = ih(h, x, k),
          M = Cl(L, x);
        return M?.id;
      }
      if (V) {
        let h = Cl(k ? Y : v, x);
        return k ? h?.id || null : h?.id;
      }
      let D = Cl(Y, x);
      return !D && k ? null : D?.id;
    };
    return ge(ee(ee({}, l), r), {
      setBaseElement: (u) => r.setState("baseElement", u),
      setActiveId: (u) => r.setState("activeId", u),
      move: (u) => {
        u !== void 0 &&
          (r.setState("activeId", u), r.setState("moves", (i) => i + 1));
      },
      first: () => {
        var u;
        return (u = Cl(r.getState().renderedItems)) == null ? void 0 : u.id;
      },
      last: () => {
        var u;
        return (u = Cl(ir(r.getState().renderedItems))) == null ? void 0 : u.id;
      },
      next: (u) => (
        u !== void 0 && typeof u == "number" && (u = { skip: u }), d("next", u)
      ),
      previous: (u) => (
        u !== void 0 && typeof u == "number" && (u = { skip: u }),
        d("previous", u)
      ),
      down: (u) => (
        u !== void 0 && typeof u == "number" && (u = { skip: u }), d("down", u)
      ),
      up: (u) => (
        u !== void 0 && typeof u == "number" && (u = { skip: u }), d("up", u)
      ),
    });
  }
  function bR(e, t, c) {
    return (
      (e = dR(e, t, c)),
      Ze(e, c, "activeId", "setActiveId"),
      Ze(e, c, "includesBaseElement"),
      Ze(e, c, "virtualFocus"),
      Ze(e, c, "orientation"),
      Ze(e, c, "rtl"),
      Ze(e, c, "focusLoop"),
      Ze(e, c, "focusWrap"),
      Ze(e, c, "focusShift"),
      e
    );
  }
  function Ed(e = {}) {
    let t = qn(
      e.store,
      Rn(e.disclosure, ["contentElement", "disclosureElement"])
    );
    let c = t?.getState(),
      l = K(e.open, c?.open, e.defaultOpen, !1),
      n = K(e.animated, c?.animated, !1),
      o = {
        open: l,
        animated: n,
        animating: !!n && l,
        mounted: l,
        contentElement: K(c?.contentElement, null),
        disclosureElement: K(c?.disclosureElement, null),
      },
      r = De(o, t);
    return (
      xt(r, () =>
        Fe(r, ["animated", "animating"], (d) => {
          d.animated || r.setState("animating", !1);
        })
      ),
      xt(r, () =>
        Ud(r, ["open"], () => {
          r.getState().animated && r.setState("animating", !0);
        })
      ),
      xt(r, () =>
        Fe(r, ["open", "animating"], (d) => {
          r.setState("mounted", d.open || d.animating);
        })
      ),
      ge(ee({}, r), {
        disclosure: e.disclosure,
        setOpen: (d) => r.setState("open", d),
        show: () => r.setState("open", !0),
        hide: () => r.setState("open", !1),
        toggle: () => r.setState("open", (d) => !d),
        stopAnimation: () => r.setState("animating", !1),
        setContentElement: (d) => r.setState("contentElement", d),
        setDisclosureElement: (d) => r.setState("disclosureElement", d),
      })
    );
  }
  function ux(e, t, c) {
    return (
      Vl(t, [c.store, c.disclosure]),
      Ze(e, c, "open", "setOpen"),
      Ze(e, c, "mounted", "setMounted"),
      Ze(e, c, "animated"),
      Object.assign(e, { disclosure: c.disclosure })
    );
  }
  function Ya(e = {}) {
    let [t, c] = Pt(Ed, e);
    return ux(t, c, e);
  }
  function jd(e = {}) {
    return Ed(e);
  }
  function ix(e, t, c) {
    return ux(e, t, c);
  }
  function mR(e = {}) {
    let [t, c] = Pt(jd, e);
    return ix(t, c, e);
  }
  function XR(e = {}) {
    var t = e,
      { popover: c } = t,
      l = Ia(t, ["popover"]);
    let n = qn(
      l.store,
      Rn(c, [
        "arrowElement",
        "anchorElement",
        "contentElement",
        "popoverElement",
        "disclosureElement",
      ])
    );
    let o = n?.getState(),
      r = jd(ge(ee({}, l), { store: n })),
      d = K(l.placement, o?.placement, "bottom"),
      u = ge(ee({}, r.getState()), {
        placement: d,
        currentPlacement: d,
        anchorElement: K(o?.anchorElement, null),
        popoverElement: K(o?.popoverElement, null),
        arrowElement: K(o?.arrowElement, null),
        rendered: Symbol("rendered"),
      }),
      i = De(u, r, n);
    return ge(ee(ee({}, r), i), {
      setAnchorElement: (a) => i.setState("anchorElement", a),
      setPopoverElement: (a) => i.setState("popoverElement", a),
      setArrowElement: (a) => i.setState("arrowElement", a),
      render: () => i.setState("rendered", Symbol("rendered")),
    });
  }
  function xR(e, t, c) {
    return Vl(t, [c.popover]), Ze(e, c, "placement"), ix(e, t, c);
  }
  var Pd = _e(),
    Oz = Pd.useContext,
    Qz = Pd.useScopedContext,
    ax = Pd.useProviderContext,
    GR = Pd.ContextProvider,
    pR = Pd.ScopedContextProvider;
  var sx = C(A(), 1),
    Kd = _e([GR], [pR]),
    Dz = Kd.useContext,
    Uz = Kd.useScopedContext,
    Na = Kd.useProviderContext,
    gR = Kd.ContextProvider,
    ar = Kd.ScopedContextProvider,
    HR = (0, sx.createContext)(void 0),
    ZR = (0, sx.createContext)(void 0);
  var _d = _e([gR], [ar]),
    Pz = _d.useContext,
    Kz = _d.useScopedContext,
    bx = _d.useProviderContext,
    sr = _d.ContextProvider,
    fn = _d.ScopedContextProvider;
  var za = C(A(), 1),
    tk = (0, za.createContext)(void 0),
    qd = _e([sr, Hn], [fn, or]),
    RR = qd.useContext,
    ck = qd.useScopedContext,
    lk = qd.useProviderContext,
    nk = qd.ContextProvider,
    ok = qd.ScopedContextProvider,
    rk = (0, za.createContext)(void 0),
    dk = (0, za.createContext)(!1);
  function fR(e, t) {
    return e.find((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function ol(e, t) {
    return (t && e.item(t)) || null;
  }
  function IR(e) {
    let t = [];
    for (let c of e) {
      let l = t.find((n) => {
        var o;
        return ((o = n[0]) == null ? void 0 : o.rowId) === c.rowId;
      });
      l ? l.push(c) : t.push([c]);
    }
    return t;
  }
  function yR(e, t = !1) {
    if (ic(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
    else if (e.isContentEditable) {
      let c = ue(e).getSelection();
      c?.selectAllChildren(e), t && c?.collapseToEnd();
    }
  }
  var mx = Symbol("FOCUS_SILENTLY");
  function WR(e) {
    (e[mx] = !0), e.focus({ preventScroll: !0 });
  }
  function BR(e) {
    let t = e[mx];
    return delete e[mx], t;
  }
  function eo(e, t, c) {
    if (!t || t === c) return !1;
    let l = e.item(t.id);
    return !(!l || (c && l.element === c));
  }
  var vR = C(A(), 1),
    ka = (0, vR.createContext)(!0);
  var wa =
    "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
  function xh(e) {
    return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
  }
  function ac(e) {
    return !(!e.matches(wa) || !Ad(e) || e.closest("[inert]"));
  }
  function br(e) {
    if (!ac(e) || xh(e)) return !1;
    if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
    let t = e.form.elements.namedItem(e.name);
    if (!t || !("length" in t)) return !0;
    let c = uc(e);
    return (
      !c || c === e || !("form" in c) || c.form !== e.form || c.name !== e.name
    );
  }
  function Xx(e, t) {
    let c = Array.from(e.querySelectorAll(wa));
    t && c.unshift(e);
    let l = c.filter(ac);
    return (
      l.forEach((n, o) => {
        if (Qd(n) && n.contentDocument) {
          let r = n.contentDocument.body;
          l.splice(o, 1, ...Xx(r));
        }
      }),
      l
    );
  }
  function to(e, t, c) {
    let l = Array.from(e.querySelectorAll(wa)),
      n = l.filter(br);
    return (
      t && br(e) && n.unshift(e),
      n.forEach((o, r) => {
        if (Qd(o) && o.contentDocument) {
          let d = o.contentDocument.body,
            u = to(d, !1, c);
          n.splice(r, 1, ...u);
        }
      }),
      !n.length && c ? l : n
    );
  }
  function FR(e, t, c) {
    let [l] = to(e, t, c);
    return l || null;
  }
  function Gh(e, t, c, l) {
    let n = uc(e),
      o = Xx(e, t),
      r = o.indexOf(n),
      d = o.slice(r + 1);
    return d.find(br) || (c ? o.find(br) : null) || (l ? d[0] : null) || null;
  }
  function Sa(e, t) {
    return Gh(document.body, !1, e, t);
  }
  function ph(e, t, c, l) {
    let n = uc(e),
      o = Xx(e, t).reverse(),
      r = o.indexOf(n),
      d = o.slice(r + 1);
    return d.find(br) || (c ? o.find(br) : null) || (l ? d[0] : null) || null;
  }
  function xx(e, t) {
    return ph(document.body, !1, e, t);
  }
  function hR(e) {
    for (; e && !ac(e); ) e = e.closest(wa);
    return e || null;
  }
  function $d(e) {
    let t = uc(e);
    if (!t) return !1;
    if (t === e) return !0;
    let c = t.getAttribute("aria-activedescendant");
    return c ? c === e.id : !1;
  }
  function Gx(e) {
    let t = uc(e);
    if (!t) return !1;
    if (Xe(e, t)) return !0;
    let c = t.getAttribute("aria-activedescendant");
    return !c || !("id" in e)
      ? !1
      : c === e.id
        ? !0
        : !!e.querySelector(`#${CSS.escape(c)}`);
  }
  function Oa(e) {
    !Gx(e) && ac(e) && e.focus();
  }
  function gh(e) {
    var t;
    let c = (t = e.getAttribute("tabindex")) != null ? t : "";
    e.setAttribute("data-tabindex", c), e.setAttribute("tabindex", "-1");
  }
  function VR(e, t) {
    let c = to(e, t);
    for (let l of c) gh(l);
  }
  function CR(e) {
    let t = e.querySelectorAll("[data-tabindex]"),
      c = (l) => {
        let n = l.getAttribute("data-tabindex");
        l.removeAttribute("data-tabindex"),
          n ? l.setAttribute("tabindex", n) : l.removeAttribute("tabindex");
      };
    e.hasAttribute("data-tabindex") && c(e);
    for (let l of t) c(l);
  }
  function JR(e, t) {
    "scrollIntoView" in e
      ? (e.focus({ preventScroll: !0 }),
        e.scrollIntoView(ee({ block: "nearest", inline: "nearest" }, t)))
      : e.focus();
  }
  var sc = C(A(), 1),
    Hh = "div",
    YR = Pn(),
    Zh = [
      "text",
      "search",
      "url",
      "tel",
      "email",
      "password",
      "number",
      "date",
      "month",
      "week",
      "time",
      "datetime",
      "datetime-local",
    ],
    kR = Symbol("safariFocusAncestor");
  function wR(e) {
    return e ? !!e[kR] : !1;
  }
  function NR(e, t) {
    e && (e[kR] = t);
  }
  function Rh(e) {
    let { tagName: t, readOnly: c, type: l } = e;
    return (t === "TEXTAREA" && !c) || (t === "SELECT" && !c)
      ? !0
      : t === "INPUT" && !c
        ? Zh.includes(l)
        : !!(
            e.isContentEditable ||
            (e.getAttribute("role") === "combobox" && e.dataset.name)
          );
  }
  function fh(e) {
    return "labels" in e ? e.labels : null;
  }
  function zR(e) {
    return e.tagName.toLowerCase() === "input" && e.type
      ? e.type === "radio" || e.type === "checkbox"
      : !1;
  }
  function Ih(e) {
    return e
      ? e === "button" ||
          e === "summary" ||
          e === "input" ||
          e === "select" ||
          e === "textarea" ||
          e === "a"
      : !0;
  }
  function yh(e) {
    return e
      ? e === "button" || e === "input" || e === "select" || e === "textarea"
      : !0;
  }
  function Wh(e, t, c, l, n) {
    return e ? (t ? (c && !l ? -1 : void 0) : c ? n : n || 0) : n;
  }
  function px(e, t) {
    return j((c) => {
      e?.(c),
        !c.defaultPrevented && t && (c.stopPropagation(), c.preventDefault());
    });
  }
  var gx = !0;
  function Bh(e) {
    let t = e.target;
    t &&
      "hasAttribute" in t &&
      (t.hasAttribute("data-focus-visible") || (gx = !1));
  }
  function vh(e) {
    e.metaKey || e.ctrlKey || e.altKey || (gx = !0);
  }
  var Tc = te(function (t) {
      var c = t,
        {
          focusable: l = !0,
          accessibleWhenDisabled: n,
          autoFocus: o,
          onFocusVisible: r,
        } = c,
        d = _(c, [
          "focusable",
          "accessibleWhenDisabled",
          "autoFocus",
          "onFocusVisible",
        ]);
      let u = (0, sc.useRef)(null);
      (0, sc.useEffect)(() => {
        l && (Je("mousedown", Bh, !0), Je("keydown", vh, !0));
      }, [l]),
        YR &&
          (0, sc.useEffect)(() => {
            if (!l) return;
            let V = u.current;
            if (!V || !zR(V)) return;
            let k = fh(V);
            if (!k) return;
            let D = () => queueMicrotask(() => V.focus());
            for (let h of k) h.addEventListener("mouseup", D);
            return () => {
              for (let h of k) h.removeEventListener("mouseup", D);
            };
          }, [l]);
      let i = l && Lc(d),
        a = !!i && !n,
        [s, b] = (0, sc.useState)(!1);
      (0, sc.useEffect)(() => {
        l && a && s && b(!1);
      }, [l, a, s]),
        (0, sc.useEffect)(() => {
          if (!l || !s) return;
          let V = u.current;
          if (!V || typeof IntersectionObserver > "u") return;
          let k = new IntersectionObserver(() => {
            ac(V) || b(!1);
          });
          return k.observe(V), () => k.disconnect();
        }, [l, s]);
      let m = px(d.onKeyPressCapture, i),
        x = px(d.onMouseDownCapture, i),
        p = px(d.onClickCapture, i),
        R = d.onMouseDown,
        X = j((V) => {
          if ((R?.(V), V.defaultPrevented || !l)) return;
          let k = V.currentTarget;
          if (!YR || Ba(V) || (!Ic(k) && !zR(k))) return;
          let D = !1,
            h = () => {
              D = !0;
            },
            L = { capture: !0, once: !0 };
          k.addEventListener("focusin", h, L);
          let M = hR(k.parentElement);
          NR(M, !0),
            gn(k, "mouseup", () => {
              k.removeEventListener("focusin", h, !0), NR(M, !1), !D && Oa(k);
            });
        }),
        G = (V, k) => {
          if ((k && (V.currentTarget = k), !l)) return;
          let D = V.currentTarget;
          D &&
            $d(D) &&
            (r?.(V),
            !V.defaultPrevented && ((D.dataset.focusVisible = "true"), b(!0)));
        },
        g = d.onKeyDownCapture,
        H = j((V) => {
          if (
            (g?.(V),
            V.defaultPrevented ||
              !l ||
              s ||
              V.metaKey ||
              V.altKey ||
              V.ctrlKey ||
              !vt(V))
          )
            return;
          let k = V.currentTarget;
          gn(k, "focusout", () => G(V, k));
        }),
        f = d.onFocusCapture,
        I = j((V) => {
          if ((f?.(V), V.defaultPrevented || !l)) return;
          if (!vt(V)) {
            b(!1);
            return;
          }
          let k = V.currentTarget,
            D = () => G(V, k);
          gx || Rh(V.target) ? gn(V.target, "focusout", D) : b(!1);
        }),
        y = d.onBlur,
        W = j((V) => {
          y?.(V), l && pn(V) && b(!1);
        }),
        B = (0, sc.useContext)(ka),
        F = j((V) => {
          l &&
            o &&
            V &&
            B &&
            queueMicrotask(() => {
              $d(V) || (ac(V) && V.focus());
            });
        }),
        S = ha(u),
        O = l && Ih(S),
        v = l && yh(S),
        Y = d.style,
        N = (0, sc.useMemo)(
          () => (a ? J({ pointerEvents: "none" }, Y) : Y),
          [a, Y]
        );
      return (
        (d = w(
          J(
            {
              "data-focus-visible": (l && s) || void 0,
              "data-autofocus": o || void 0,
              "aria-disabled": i || void 0,
            },
            d
          ),
          {
            ref: ve(u, F, d.ref),
            style: N,
            tabIndex: Wh(l, a, O, v, d.tabIndex),
            disabled: v && a ? !0 : void 0,
            contentEditable: i ? void 0 : d.contentEditable,
            onKeyPressCapture: m,
            onClickCapture: p,
            onMouseDownCapture: x,
            onMouseDown: X,
            onKeyDownCapture: H,
            onFocusCapture: I,
            onBlur: W,
          }
        )),
        Fl(d)
      );
    }),
    Bk = P(function (t) {
      let c = Tc(t);
      return q(Hh, c);
    });
  var rl = C(A(), 1),
    OR = C(E(), 1),
    Fh = "div";
  function hh(e) {
    return e.some((t) => !!t.rowId);
  }
  function Vh(e) {
    let t = e.target;
    return t && !ic(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
  }
  function Ch(e) {
    return (
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta"
    );
  }
  function SR(e, t, c) {
    return j((l) => {
      var n;
      if (
        (t?.(l),
        l.defaultPrevented ||
          l.isPropagationStopped() ||
          !vt(l) ||
          Ch(l) ||
          Vh(l))
      )
        return;
      let o = e.getState(),
        r = (n = ol(e, o.activeId)) == null ? void 0 : n.element;
      if (!r) return;
      let d = l,
        { view: u } = d,
        i = _(d, ["view"]),
        a = c?.current;
      r !== a && r.focus(),
        AZ(r, l.type, i) || l.preventDefault(),
        l.currentTarget.contains(r) && l.stopPropagation();
    });
  }
  function Jh(e) {
    return fR(Md(ir(IR(e))));
  }
  function Yh(e) {
    let [t, c] = (0, rl.useState)(!1),
      l = (0, rl.useCallback)(() => c(!0), []),
      n = e.useState((o) => ol(e, o.activeId));
    return (
      (0, rl.useEffect)(() => {
        let o = n?.element;
        t && o && (c(!1), o.focus({ preventScroll: !0 }));
      }, [n, t]),
      l
    );
  }
  var Hx = te(function (t) {
      var c = t,
        {
          store: l,
          composite: n = !0,
          focusOnMove: o = n,
          moveOnKeyPress: r = !0,
        } = c,
        d = _(c, ["store", "composite", "focusOnMove", "moveOnKeyPress"]);
      let u = $Z();
      (l = l || u), Ce(l, !1);
      let i = (0, rl.useRef)(null),
        a = (0, rl.useRef)(null),
        s = Yh(l),
        b = l.useState("moves"),
        [, m] = MZ(n ? l.setBaseElement : null);
      (0, rl.useEffect)(() => {
        var v;
        if (!l || !b || !n || !o) return;
        let { activeId: Y } = l.getState(),
          N = (v = ol(l, Y)) == null ? void 0 : v.element;
        N && JR(N);
      }, [l, b, n, o]),
        ne(() => {
          if (!l || !b || !n) return;
          let { baseElement: v, activeId: Y } = l.getState();
          if (!(Y === null) || !v) return;
          let V = a.current;
          (a.current = null),
            V && Kn(V, { relatedTarget: v }),
            $d(v) || v.focus();
        }, [l, b, n]);
      let x = l.useState("activeId"),
        p = l.useState("virtualFocus");
      ne(() => {
        var v;
        if (!l || !n || !p) return;
        let Y = a.current;
        if (((a.current = null), !Y)) return;
        let V = ((v = ol(l, x)) == null ? void 0 : v.element) || uc(Y);
        V !== Y && Kn(Y, { relatedTarget: V });
      }, [l, x, p, n]);
      let R = SR(l, d.onKeyDownCapture, a),
        X = SR(l, d.onKeyUpCapture, a),
        G = d.onFocusCapture,
        g = j((v) => {
          if ((G?.(v), v.defaultPrevented || !l)) return;
          let { virtualFocus: Y } = l.getState();
          if (!Y) return;
          let N = v.relatedTarget,
            V = BR(v.currentTarget);
          vt(v) && V && (v.stopPropagation(), (a.current = N));
        }),
        H = d.onFocus,
        f = j((v) => {
          if ((H?.(v), v.defaultPrevented || !n || !l)) return;
          let { relatedTarget: Y } = v,
            { virtualFocus: N } = l.getState();
          N
            ? vt(v) && !eo(l, Y) && queueMicrotask(s)
            : vt(v) && l.setActiveId(null);
        }),
        I = d.onBlurCapture,
        y = j((v) => {
          var Y;
          if ((I?.(v), v.defaultPrevented || !l)) return;
          let { virtualFocus: N, activeId: V } = l.getState();
          if (!N) return;
          let k = (Y = ol(l, V)) == null ? void 0 : Y.element,
            D = v.relatedTarget,
            h = eo(l, D),
            L = a.current;
          (a.current = null),
            vt(v) && h
              ? (D === k
                  ? L && L !== D && Kn(L, v)
                  : k
                    ? Kn(k, v)
                    : L && Kn(L, v),
                v.stopPropagation())
              : !eo(l, v.target) && k && Kn(k, v);
        }),
        W = d.onKeyDown,
        B = jt(r),
        F = j((v) => {
          var Y;
          if ((W?.(v), v.defaultPrevented || !l || !vt(v))) return;
          let {
              orientation: N,
              items: V,
              renderedItems: k,
              activeId: D,
            } = l.getState(),
            h = ol(l, D);
          if ((Y = h?.element) != null && Y.isConnected) return;
          let L = N !== "horizontal",
            M = N !== "vertical",
            pe = hh(k);
          if (
            (v.key === "ArrowLeft" ||
              v.key === "ArrowRight" ||
              v.key === "Home" ||
              v.key === "End") &&
            ic(v.currentTarget)
          )
            return;
          let $t = {
            ArrowUp:
              (pe || L) &&
              (() => {
                if (pe) {
                  let at = V && Jh(V);
                  return at?.id;
                }
                return l?.last();
              }),
            ArrowRight: (pe || M) && l.first,
            ArrowDown: (pe || L) && l.first,
            ArrowLeft: (pe || M) && l.last,
            Home: l.first,
            End: l.last,
            PageUp: l.first,
            PageDown: l.last,
          }[v.key];
          if ($t) {
            let at = $t();
            if (at !== void 0) {
              if (!B(v)) return;
              v.preventDefault(), l.move(at);
            }
          }
        });
      d = Ie(d, (v) => (0, OR.jsx)(Hn, { value: l, children: v }), [l]);
      let S = l.useState((v) => {
        var Y;
        if (l && n && v.virtualFocus)
          return (Y = ol(l, v.activeId)) == null ? void 0 : Y.id;
      });
      d = w(J({ "aria-activedescendant": S }, d), {
        ref: ve(i, m, d.ref),
        onKeyDownCapture: R,
        onKeyUpCapture: X,
        onFocusCapture: g,
        onFocus: f,
        onBlurCapture: y,
        onKeyDown: F,
      });
      let O = l.useState((v) => n && (v.virtualFocus || v.activeId === null));
      return (d = Tc(J({ focusable: O }, d))), d;
    }),
    Tk = P(function (t) {
      let c = Hx(t);
      return q(Fh, c);
    });
  var In = C(A(), 1),
    Nh = "button";
  function QR(e) {
    if (!e.isTrusted) return !1;
    let t = e.currentTarget;
    return e.key === "Enter"
      ? Ic(t) || t.tagName === "SUMMARY" || t.tagName === "A"
      : e.key === " "
        ? Ic(t) ||
          t.tagName === "SUMMARY" ||
          t.tagName === "INPUT" ||
          t.tagName === "SELECT"
        : !1;
  }
  var zh = Symbol("command"),
    Zx = te(function (t) {
      var c = t,
        { clickOnEnter: l = !0, clickOnSpace: n = !0 } = c,
        o = _(c, ["clickOnEnter", "clickOnSpace"]);
      let r = (0, In.useRef)(null),
        d = ha(r),
        u = o.type,
        [i, a] = (0, In.useState)(() => !!d && Ic({ tagName: d, type: u }));
      (0, In.useEffect)(() => {
        r.current && a(Ic(r.current));
      }, []);
      let [s, b] = (0, In.useState)(!1),
        m = (0, In.useRef)(!1),
        x = Lc(o),
        [p, R] = jZ(o, zh, !0),
        X = o.onKeyDown,
        G = j((f) => {
          X?.(f);
          let I = f.currentTarget;
          if (
            f.defaultPrevented ||
            p ||
            x ||
            !vt(f) ||
            ic(I) ||
            I.isContentEditable
          )
            return;
          let y = l && f.key === "Enter",
            W = n && f.key === " ",
            B = f.key === "Enter" && !l,
            F = f.key === " " && !n;
          if (B || F) {
            f.preventDefault();
            return;
          }
          if (y || W) {
            let S = QR(f);
            if (y) {
              if (!S) {
                f.preventDefault();
                let O = f,
                  { view: v } = O,
                  Y = _(O, ["view"]),
                  N = () => cx(I, Y);
                ex() ? gn(I, "keyup", N) : queueMicrotask(N);
              }
            } else W && ((m.current = !0), S || (f.preventDefault(), b(!0)));
          }
        }),
        g = o.onKeyUp,
        H = j((f) => {
          if ((g?.(f), f.defaultPrevented || p || x || f.metaKey)) return;
          let I = n && f.key === " ";
          if (m.current && I && ((m.current = !1), !QR(f))) {
            f.preventDefault(), b(!1);
            let y = f.currentTarget,
              W = f,
              { view: B } = W,
              F = _(W, ["view"]);
            queueMicrotask(() => cx(y, F));
          }
        });
      return (
        (o = w(
          J(
            J({ "data-active": s || void 0, "type": i ? "button" : void 0 }, R),
            o
          ),
          { ref: ve(r, o.ref), onKeyDown: G, onKeyUp: H }
        )),
        (o = Tc(o)),
        o
      );
    }),
    $k = P(function (t) {
      let c = Zx(t);
      return q(Nh, c);
    });
  var Qa = C(A(), 1),
    kh = "div",
    eu = te(function (t) {
      var c = t,
        {
          store: l,
          shouldRegisterItem: n = !0,
          getItem: o = wd,
          element: r,
        } = c,
        d = _(c, ["store", "shouldRegisterItem", "getItem", "element"]);
      let u = PZ();
      l = l || u;
      let i = yc(d.id),
        a = (0, Qa.useRef)(r);
      return (
        (0, Qa.useEffect)(() => {
          let s = a.current;
          if (!i || !s || !n) return;
          let b = o({ id: i, element: s });
          return l?.renderItem(b);
        }, [i, n, o, l]),
        (d = w(J({}, d), { ref: ve(a, d.ref) })),
        Fl(d)
      );
    }),
    rw = P(function (t) {
      let c = eu(t);
      return q(kh, c);
    });
  var Jl = C(A(), 1),
    LR = C(E(), 1),
    wh = "button";
  function Sh(e) {
    return Ld(e) ? !0 : e.tagName === "INPUT" && !Ic(e);
  }
  function Oh(e, t = !1) {
    let c = e.clientHeight,
      { top: l } = e.getBoundingClientRect(),
      n = Math.max(c * 0.875, c - 40) * 1.5,
      o = t ? c - n + l : n + l;
    return e.tagName === "HTML" ? o + e.scrollTop : o;
  }
  function Qh(e, t = !1) {
    let { top: c } = e.getBoundingClientRect();
    return t ? c + e.clientHeight : c;
  }
  function AR(e, t, c, l = !1) {
    var n;
    if (!t || !c) return;
    let { renderedItems: o } = t.getState(),
      r = ya(e);
    if (!r) return;
    let d = Oh(r, l),
      u,
      i;
    for (let a = 0; a < o.length; a += 1) {
      let s = u;
      if (((u = c(a)), !u)) break;
      if (u === s) continue;
      let b = (n = ol(t, u)) == null ? void 0 : n.element;
      if (!b) continue;
      let x = Qh(b, l) - d,
        p = Math.abs(x);
      if ((l && x <= 0) || (!l && x >= 0)) {
        i !== void 0 && i < p && (u = s);
        break;
      }
      i = p;
    }
    return u;
  }
  function Ah(e, t) {
    return vt(e) ? !1 : eo(t, e.target);
  }
  var Rx = te(function (t) {
      var c = t,
        {
          "store": l,
          "rowId": n,
          "preventScrollOnKeyDown": o = !1,
          "moveOnKeyPress": r = !0,
          "tabbable": d = !1,
          "getItem": u,
          "aria-setsize": i,
          "aria-posinset": a,
        } = c,
        s = _(c, [
          "store",
          "rowId",
          "preventScrollOnKeyDown",
          "moveOnKeyPress",
          "tabbable",
          "getItem",
          "aria-setsize",
          "aria-posinset",
        ]);
      let b = qZ();
      l = l || b;
      let m = yc(s.id),
        x = (0, Jl.useRef)(null),
        p = (0, Jl.useContext)(tR),
        R = oe(l, (h) => {
          if (n) return n;
          if (h && p?.baseElement && p.baseElement === h.baseElement)
            return p.id;
        }),
        G = Lc(s) && !s.accessibleWhenDisabled,
        g = (0, Jl.useCallback)(
          (h) => {
            let L = w(J({}, h), { id: m || h.id, rowId: R, disabled: !!G });
            return u ? u(L) : L;
          },
          [m, R, G, u]
        ),
        H = s.onFocus,
        f = (0, Jl.useRef)(!1),
        I = j((h) => {
          if ((H?.(h), h.defaultPrevented || Ba(h) || !m || !l || Ah(h, l)))
            return;
          let { virtualFocus: L, baseElement: M } = l.getState();
          if (
            (l.setActiveId(m),
            Ld(h.currentTarget) && yR(h.currentTarget),
            !L || !vt(h) || Sh(h.currentTarget) || !M?.isConnected)
          )
            return;
          Pn() &&
            h.currentTarget.hasAttribute("data-autofocus") &&
            h.currentTarget.scrollIntoView({
              block: "nearest",
              inline: "nearest",
            }),
            (f.current = !0),
            h.relatedTarget === M || eo(l, h.relatedTarget) ? WR(M) : M.focus();
        }),
        y = s.onBlurCapture,
        W = j((h) => {
          if ((y?.(h), h.defaultPrevented)) return;
          let L = l?.getState();
          L?.virtualFocus &&
            f.current &&
            ((f.current = !1), h.preventDefault(), h.stopPropagation());
        }),
        B = s.onKeyDown,
        F = jt(o),
        S = jt(r),
        O = j((h) => {
          if ((B?.(h), h.defaultPrevented || !vt(h) || !l)) return;
          let { currentTarget: L } = h,
            M = l.getState(),
            pe = l.item(m),
            Se = !!pe?.rowId,
            he = M.orientation !== "horizontal",
            Ae = M.orientation !== "vertical",
            $t = () => !!(Se || Ae || !M.baseElement || !ic(M.baseElement)),
            ct = {
              ArrowUp: (Se || he) && l.up,
              ArrowRight: (Se || Ae) && l.next,
              ArrowDown: (Se || he) && l.down,
              ArrowLeft: (Se || Ae) && l.previous,
              Home: () => {
                if ($t())
                  return !Se || h.ctrlKey ? l?.first() : l?.previous(-1);
              },
              End: () => {
                if ($t()) return !Se || h.ctrlKey ? l?.last() : l?.next(-1);
              },
              PageUp: () => AR(L, l, l?.up, !0),
              PageDown: () => AR(L, l, l?.down),
            }[h.key];
          if (ct) {
            if (Ld(L)) {
              let st = $X(L),
                Tl = Ae && h.key === "ArrowLeft",
                Dl = Ae && h.key === "ArrowRight",
                $ = he && h.key === "ArrowUp",
                Le = he && h.key === "ArrowDown";
              if (Dl || Le) {
                let { length: ec } = qX(L);
                if (st.end !== ec) return;
              } else if ((Tl || $) && st.start !== 0) return;
            }
            let xc = ct();
            if (F(h) || xc !== void 0) {
              if (!S(h)) return;
              h.preventDefault(), l.move(xc);
            }
          }
        }),
        v = oe(l, (h) => h?.baseElement || void 0),
        Y = (0, Jl.useMemo)(() => ({ id: m, baseElement: v }), [m, v]);
      s = Ie(s, (h) => (0, LR.jsx)(eR.Provider, { value: Y, children: h }), [
        Y,
      ]);
      let N = oe(l, (h) => !!h && h.activeId === m),
        V = oe(l, (h) => {
          if (i != null) return i;
          if (h && p?.ariaSetSize && p.baseElement === h.baseElement)
            return p.ariaSetSize;
        }),
        k = oe(l, (h) => {
          if (a != null) return a;
          if (!h || !p?.ariaPosInSet || p.baseElement !== h.baseElement) return;
          let L = h.renderedItems.filter((M) => M.rowId === R);
          return p.ariaPosInSet + L.findIndex((M) => M.id === m);
        }),
        D = oe(l, (h) => {
          var L;
          if (!h?.renderedItems.length) return !0;
          if (h.virtualFocus) return !1;
          if (d) return !0;
          if (h.activeId === null) return !1;
          let M = l?.item(h.activeId);
          return M?.disabled || !((L = M?.element) != null && L.isConnected)
            ? !0
            : h.activeId === m;
        });
      return (
        (s = w(J({ "id": m, "data-active-item": N || void 0 }, s), {
          ref: ve(x, s.ref),
          tabIndex: D ? s.tabIndex : -1,
          onFocus: I,
          onBlurCapture: W,
          onKeyDown: O,
        })),
        (s = Zx(s)),
        (s = eu(
          w(J({ store: l }, s), {
            getItem: g,
            shouldRegisterItem: m ? s.shouldRegisterItem : !1,
          })
        )),
        Fl(w(J({}, s), { "aria-setsize": V, "aria-posinset": k }))
      );
    }),
    fx = Ca(
      P(function (t) {
        let c = Rx(t);
        return q(wh, c);
      })
    );
  var mr = C(A(), 1),
    UR = C(qo(), 1),
    Ix = C(E(), 1),
    Lh = "div";
  function TR(e, t) {
    let c = setTimeout(t, e);
    return () => clearTimeout(c);
  }
  function Th(e) {
    let t = requestAnimationFrame(() => {
      t = requestAnimationFrame(e);
    });
    return () => cancelAnimationFrame(t);
  }
  function DR(...e) {
    return e
      .join(", ")
      .split(", ")
      .reduce((t, c) => {
        let l = c.endsWith("ms") ? 1 : 1e3,
          n = Number.parseFloat(c || "0s") * l;
        return n > t ? n : t;
      }, 0);
  }
  function yx(e, t, c) {
    return !c && t !== !1 && (!e || !!t);
  }
  var co = te(function (t) {
      var c = t,
        { store: l, alwaysVisible: n } = c,
        o = _(c, ["store", "alwaysVisible"]);
      let r = ax();
      (l = l || r), Ce(l, !1);
      let d = (0, mr.useRef)(null),
        u = yc(o.id),
        [i, a] = (0, mr.useState)(null),
        s = l.useState("open"),
        b = l.useState("mounted"),
        m = l.useState("animated"),
        x = l.useState("contentElement"),
        p = oe(l.disclosure, "contentElement");
      ne(() => {
        d.current && l?.setContentElement(d.current);
      }, [l]),
        ne(() => {
          let g;
          return (
            l?.setState("animated", (H) => ((g = H), !0)),
            () => {
              g !== void 0 && l?.setState("animated", g);
            }
          );
        }, [l]),
        ne(() => {
          if (m) {
            if (!x?.isConnected) {
              a(null);
              return;
            }
            return Th(() => {
              a(s ? "enter" : b ? "leave" : null);
            });
          }
        }, [m, x, s, b]),
        ne(() => {
          if (!l || !m || !i || !x) return;
          let g = () => l?.setState("animating", !1),
            H = () => (0, UR.flushSync)(g);
          if ((i === "leave" && s) || (i === "enter" && !s)) return;
          if (typeof m == "number") return TR(m, H);
          let {
              transitionDuration: f,
              animationDuration: I,
              transitionDelay: y,
              animationDelay: W,
            } = getComputedStyle(x),
            {
              transitionDuration: B = "0",
              animationDuration: F = "0",
              transitionDelay: S = "0",
              animationDelay: O = "0",
            } = p ? getComputedStyle(p) : {},
            v = DR(y, W, S, O),
            Y = DR(f, I, B, F),
            N = v + Y;
          if (!N) {
            i === "enter" && l.setState("animated", !1), g();
            return;
          }
          let V = 1e3 / 60,
            k = Math.max(N - V, 0);
          return TR(k, H);
        }, [l, m, x, p, s, i]),
        (o = Ie(o, (g) => (0, Ix.jsx)(ar, { value: l, children: g }), [l]));
      let R = yx(b, o.hidden, n),
        X = o.style,
        G = (0, mr.useMemo)(
          () => (R ? w(J({}, X), { display: "none" }) : X),
          [R, X]
        );
      return (
        (o = w(
          J(
            {
              "id": u,
              "data-open": s || void 0,
              "data-enter": i === "enter" || void 0,
              "data-leave": i === "leave" || void 0,
              "hidden": R,
            },
            o
          ),
          { ref: ve(u ? l.setContentElement : null, d, o.ref), style: G }
        )),
        Fl(o)
      );
    }),
    Dh = P(function (t) {
      let c = co(t);
      return q(Lh, c);
    }),
    Fw = P(function (t) {
      var c = t,
        { unmountOnHide: l } = c,
        n = _(c, ["unmountOnHide"]);
      let o = ax(),
        r = n.store || o;
      return oe(r, (u) => !l || u?.mounted) === !1
        ? null
        : (0, Ix.jsx)(Dh, J({}, n));
    });
  function Aa(e, ...t) {
    if (!e) return !1;
    let c = e.getAttribute("data-backdrop");
    return c == null
      ? !1
      : c === "" || c === "true" || !t.length
        ? !0
        : t.some((l) => c === l);
  }
  var Wx = new WeakMap();
  function Xr(e, t, c) {
    Wx.has(e) || Wx.set(e, new Map());
    let l = Wx.get(e),
      n = l.get(t);
    if (!n)
      return (
        l.set(t, c()),
        () => {
          var d;
          (d = l.get(t)) == null || d(), l.delete(t);
        }
      );
    let o = c(),
      r = () => {
        o(), n(), l.delete(t);
      };
    return (
      l.set(t, r),
      () => {
        l.get(t) === r && (o(), l.set(t, n));
      }
    );
  }
  function tu(e, t, c) {
    return Xr(e, t, () => {
      let n = e.getAttribute(t);
      return (
        e.setAttribute(t, c),
        () => {
          n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
        }
      );
    });
  }
  function dl(e, t, c) {
    return Xr(e, t, () => {
      let n = t in e,
        o = e[t];
      return (
        (e[t] = c),
        () => {
          n ? (e[t] = o) : delete e[t];
        }
      );
    });
  }
  function cu(e, t) {
    return e
      ? Xr(e, "style", () => {
          let l = e.style.cssText;
          return (
            Object.assign(e.style, t),
            () => {
              e.style.cssText = l;
            }
          );
        })
      : () => {};
  }
  function MR(e, t, c) {
    return e
      ? Xr(e, t, () => {
          let n = e.style.getPropertyValue(t);
          return (
            e.style.setProperty(t, c),
            () => {
              n ? e.style.setProperty(t, n) : e.style.removeProperty(t);
            }
          );
        })
      : () => {};
  }
  var Uh = ["SCRIPT", "STYLE"];
  function Bx(e) {
    return `__ariakit-dialog-snapshot-${e}`;
  }
  function Mh(e, t) {
    let c = ue(t),
      l = Bx(e);
    if (!c.body[l]) return !0;
    do {
      if (t === c.body) return !1;
      if (t[l]) return !0;
      if (!t.parentElement) return !1;
      t = t.parentElement;
    } while (!0);
  }
  function Eh(e, t, c) {
    return Uh.includes(t.tagName) || !Mh(e, t)
      ? !1
      : !c.some((l) => l && Xe(t, l));
  }
  function lu(e, t, c, l) {
    for (let n of t) {
      if (!n?.isConnected) continue;
      let o = t.some((u) => (!u || u === n ? !1 : u.contains(n))),
        r = ue(n),
        d = n;
      for (; n.parentElement && n !== r.body; ) {
        if ((l?.(n.parentElement, d), !o))
          for (let u of n.parentElement.children) Eh(e, u, t) && c(u, d);
        n = n.parentElement;
      }
    }
  }
  function ER(e, t) {
    let { body: c } = ue(t[0]),
      l = [];
    return (
      lu(e, t, (o) => {
        l.push(dl(o, Bx(e), !0));
      }),
      He(dl(c, Bx(e), !0), () => {
        for (let o of l) o();
      })
    );
  }
  function xr(e = "", t = !1) {
    return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
  }
  function jh(e, t = "") {
    return He(dl(e, xr(), !0), dl(e, xr(t), !0));
  }
  function vx(e, t = "") {
    return He(dl(e, xr("", !0), !0), dl(e, xr(t, !0), !0));
  }
  function nu(e, t) {
    let c = xr(t, !0);
    if (e[c]) return !0;
    let l = xr(t);
    do {
      if (e[l]) return !0;
      if (!e.parentElement) return !1;
      e = e.parentElement;
    } while (!0);
  }
  function Fx(e, t) {
    let c = [],
      l = t.map((o) => o?.id);
    return (
      lu(
        e,
        t,
        (o) => {
          Aa(o, ...l) || c.unshift(jh(o, e));
        },
        (o, r) => {
          (r.hasAttribute("data-dialog") && r.id !== e) || c.unshift(vx(o, e));
        }
      ),
      () => {
        for (let o of c) o();
      }
    );
  }
  var Ph = "div",
    Kh = [
      "a",
      "button",
      "details",
      "dialog",
      "div",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "section",
      "select",
      "span",
      "summary",
      "textarea",
      "ul",
      "svg",
    ],
    _h = te(function (t) {
      return t;
    }),
    Yl = P(function (t) {
      return q(Ph, t);
    });
  Object.assign(
    Yl,
    Kh.reduce(
      (e, t) => (
        (e[t] = P(function (l) {
          return q(t, l);
        })),
        e
      ),
      {}
    )
  );
  var Gr = C(A(), 1),
    La = C(E(), 1);
  function jR({ store: e, backdrop: t, alwaysVisible: c, hidden: l }) {
    let n = (0, Gr.useRef)(null),
      o = Ya({ disclosure: e }),
      r = oe(e, "contentElement");
    (0, Gr.useEffect)(() => {
      let i = n.current,
        a = r;
      i && a && (i.style.zIndex = getComputedStyle(a).zIndex);
    }, [r]),
      ne(() => {
        let i = r?.id;
        if (!i) return;
        let a = n.current;
        if (a) return vx(a, i);
      }, [r]);
    let d = co({
      "ref": n,
      "store": o,
      "role": "presentation",
      "data-backdrop": r?.id || "",
      "alwaysVisible": c,
      "hidden": l ?? void 0,
      "style": { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
    });
    if (!t) return null;
    if ((0, Gr.isValidElement)(t))
      return (0, La.jsx)(Yl, w(J({}, d), { render: t }));
    let u = typeof t != "boolean" ? t : "div";
    return (0, La.jsx)(Yl, w(J({}, d), { render: (0, La.jsx)(u, {}) }));
  }
  function PR(e, ...t) {
    if (!e) return !1;
    let c = e.getAttribute("data-focus-trap");
    return c == null
      ? !1
      : t.length
        ? c === ""
          ? !1
          : t.some((l) => c === l)
        : !0;
  }
  function KR(e) {
    return tu(e, "aria-hidden", "true");
  }
  function Ta() {
    return "inert" in HTMLElement.prototype;
  }
  function hx(e, t) {
    if (!("style" in e)) return jn;
    if (Ta()) return dl(e, "inert", !0);
    let l = to(e, !0).map((n) => {
      if (t?.some((r) => r && Xe(r, n))) return jn;
      let o = Xr(
        n,
        "focus",
        () => (
          (n.focus = jn),
          () => {
            delete n.focus;
          }
        )
      );
      return He(tu(n, "tabindex", "-1"), o);
    });
    return He(
      ...l,
      KR(e),
      cu(e, { pointerEvents: "none", userSelect: "none", cursor: "default" })
    );
  }
  function _R(e, t) {
    let c = [],
      l = t.map((o) => o?.id);
    return (
      lu(
        e,
        t,
        (o) => {
          Aa(o, ...l) || PR(o, ...l) || c.unshift(hx(o, t));
        },
        (o) => {
          o.hasAttribute("role") &&
            (t.some((r) => r && Xe(r, o)) || c.unshift(tu(o, "role", "none")));
        }
      ),
      () => {
        for (let o of c) o();
      }
    );
  }
  var Da = C(A(), 1),
    qR = C(qo(), 1);
  function $R({ attribute: e, contentId: t, contentElement: c, enabled: l }) {
    let [n, o] = EZ(),
      r = (0, Da.useCallback)(() => {
        if (!l || !c) return !1;
        let { body: d } = ue(c),
          u = d.getAttribute(e);
        return !u || u === t;
      }, [n, l, c, e, t]);
    return (
      (0, Da.useEffect)(() => {
        if (!l || !t || !c) return;
        let { body: d } = ue(c);
        if (r()) return d.setAttribute(e, t), () => d.removeAttribute(e);
        let u = new MutationObserver(() => (0, qR.flushSync)(o));
        return u.observe(d, { attributeFilter: [e] }), () => u.disconnect();
      }, [n, l, t, c, r, e]),
      r
    );
  }
  var ef = C(A(), 1);
  function qh(e) {
    let t = e.getBoundingClientRect().left;
    return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
  }
  function tf(e, t, c) {
    let l = $R({
      attribute: "data-dialog-prevent-body-scroll",
      contentElement: e,
      contentId: t,
      enabled: c,
    });
    (0, ef.useEffect)(() => {
      if (!l() || !e) return;
      let n = ue(e),
        o = Od(e),
        { documentElement: r, body: d } = n,
        u = r.style.getPropertyValue("--scrollbar-width"),
        i = u ? Number.parseInt(u) : o.innerWidth - r.clientWidth,
        a = () => MR(r, "--scrollbar-width", `${i}px`),
        s = qh(r),
        b = () => cu(d, { overflow: "hidden", [s]: `${i}px` }),
        m = () => {
          var p, R;
          let { scrollX: X, scrollY: G, visualViewport: g } = o,
            H = (p = g?.offsetLeft) != null ? p : 0,
            f = (R = g?.offsetTop) != null ? R : 0,
            I = cu(d, {
              position: "fixed",
              overflow: "hidden",
              top: `${-(G - Math.floor(f))}px`,
              left: `${-(X - Math.floor(H))}px`,
              right: "0",
              [s]: `${i}px`,
            });
          return () => {
            I(), o.scrollTo({ left: X, top: G, behavior: "instant" });
          };
        },
        x = Wa() && !tx();
      return He(a(), x ? m() : b());
    }, [l, e]);
  }
  var Dc = C(A(), 1),
    lf = C(E(), 1),
    cf = (0, Dc.createContext)({});
  function nf(e) {
    let t = (0, Dc.useContext)(cf),
      [c, l] = (0, Dc.useState)([]),
      n = (0, Dc.useCallback)(
        (d) => {
          var u;
          return (
            l((i) => [...i, d]),
            He((u = t.add) == null ? void 0 : u.call(t, d), () => {
              l((i) => i.filter((a) => a !== d));
            })
          );
        },
        [t]
      );
    ne(
      () =>
        Fe(e, ["open", "contentElement"], (d) => {
          var u;
          if (d.open && d.contentElement)
            return (u = t.add) == null ? void 0 : u.call(t, e);
        }),
      [e, t]
    );
    let o = (0, Dc.useMemo)(() => ({ store: e, add: n }), [e, n]);
    return {
      wrapElement: (0, Dc.useCallback)(
        (d) => (0, lf.jsx)(cf.Provider, { value: o, children: d }),
        [o]
      ),
      nestedDialogs: c,
    };
  }
  var Ua = C(A(), 1);
  function of(e) {
    let t = (0, Ua.useRef)();
    return (
      (0, Ua.useEffect)(() => {
        if (!e) {
          t.current = null;
          return;
        }
        return Je(
          "mousedown",
          (l) => {
            t.current = l.target;
          },
          !0
        );
      }, [e]),
      t
    );
  }
  var Ma = C(A(), 1);
  function $h(e) {
    return e.tagName === "HTML" ? !0 : Xe(ue(e).body, e);
  }
  function e1(e, t) {
    if (!e) return !1;
    if (Xe(e, t)) return !0;
    let c = t.getAttribute("aria-activedescendant");
    if (c) {
      let l = ue(e).getElementById(c);
      if (l) return Xe(e, l);
    }
    return !1;
  }
  function t1(e, t) {
    if (!("clientY" in e)) return !1;
    let c = t.getBoundingClientRect();
    return c.width === 0 || c.height === 0
      ? !1
      : c.top <= e.clientY &&
          e.clientY <= c.top + c.height &&
          c.left <= e.clientX &&
          e.clientX <= c.left + c.width;
  }
  function Vx({ store: e, type: t, listener: c, capture: l, domReady: n }) {
    let o = j(c),
      r = oe(e, "open"),
      d = (0, Ma.useRef)(!1);
    ne(() => {
      if (!r || !n) return;
      let { contentElement: u } = e.getState();
      if (!u) return;
      let i = () => {
        d.current = !0;
      };
      return (
        u.addEventListener("focusin", i, !0),
        () => u.removeEventListener("focusin", i, !0)
      );
    }, [e, r, n]),
      (0, Ma.useEffect)(
        () =>
          r
            ? Je(
                t,
                (i) => {
                  let { contentElement: a, disclosureElement: s } =
                      e.getState(),
                    b = i.target;
                  !a ||
                    !b ||
                    !$h(b) ||
                    Xe(a, b) ||
                    e1(s, b) ||
                    b.hasAttribute("data-focus-trap") ||
                    t1(i, a) ||
                    (d.current && !nu(b, a.id)) ||
                    wR(b) ||
                    o(i);
                },
                l
              )
            : void 0,
        [r, l]
      );
  }
  function Cx(e, t) {
    return typeof e == "function" ? e(t) : !!e;
  }
  function rf(e, t, c) {
    let l = oe(e, "open"),
      n = of(l),
      o = { store: e, domReady: c, capture: !0 };
    Vx(
      w(J({}, o), {
        type: "click",
        listener: (r) => {
          let { contentElement: d } = e.getState(),
            u = n.current;
          u && Ad(u) && nu(u, d?.id) && Cx(t, r) && e.hide();
        },
      })
    ),
      Vx(
        w(J({}, o), {
          type: "focusin",
          listener: (r) => {
            let { contentElement: d } = e.getState();
            d && r.target !== ue(d) && Cx(t, r) && e.hide();
          },
        })
      ),
      Vx(
        w(J({}, o), {
          type: "contextmenu",
          listener: (r) => {
            Cx(t, r) && e.hide();
          },
        })
      );
  }
  function df(e, t) {
    let l = ue(e).createElement("button");
    return (
      (l.type = "button"),
      (l.tabIndex = -1),
      (l.textContent = "Dismiss popup"),
      Object.assign(l.style, {
        border: "0px",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0px",
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px",
      }),
      l.addEventListener("click", t),
      e.prepend(l),
      () => {
        l.removeEventListener("click", t), l.remove();
      }
    );
  }
  var uf = C(E(), 1),
    c1 = "div",
    Jx = te(function (t) {
      var c = t,
        { autoFocusOnShow: l = !0 } = c,
        n = _(c, ["autoFocusOnShow"]);
      return (
        (n = Ie(n, (o) => (0, uf.jsx)(ka.Provider, { value: l, children: o }), [
          l,
        ])),
        n
      );
    }),
    AS = P(function (t) {
      let c = Jx(t);
      return q(c1, c);
    });
  var af = C(A(), 1),
    Yx = (0, af.createContext)(0);
  var sf = C(A(), 1),
    bf = C(E(), 1);
  function mf({ level: e, children: t }) {
    let c = (0, sf.useContext)(Yx),
      l = Math.max(Math.min(e || c + 1, 6), 1);
    return (0, bf.jsx)(Yx.Provider, { value: l, children: t });
  }
  var l1 = "span",
    Nx = te(function (t) {
      return (
        (t = w(J({}, t), {
          style: J(
            {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            },
            t.style
          ),
        })),
        t
      );
    }),
    jS = P(function (t) {
      let c = Nx(t);
      return q(l1, c);
    });
  var n1 = "span",
    o1 = te(function (t) {
      return (
        (t = w(
          J({ "data-focus-trap": "", "tabIndex": 0, "aria-hidden": !0 }, t),
          { style: J({ position: "fixed", top: 0, left: 0 }, t.style) }
        )),
        (t = Nx(t)),
        t
      );
    }),
    ou = P(function (t) {
      let c = o1(t);
      return q(n1, c);
    });
  var Xf = C(A(), 1),
    zx = (0, Xf.createContext)(null);
  var bc = C(A(), 1),
    kx = C(qo(), 1),
    Ft = C(E(), 1),
    r1 = "div";
  function d1(e) {
    return ue(e).body;
  }
  function u1(e, t) {
    return t ? (typeof t == "function" ? t(e) : t) : ue(e).createElement("div");
  }
  function i1(e = "id") {
    return `${e ? `${e}-` : ""}${Math.random().toString(36).substr(2, 6)}`;
  }
  function yn(e) {
    queueMicrotask(() => {
      e?.focus();
    });
  }
  var wx = te(function (t) {
      var c = t,
        {
          preserveTabOrder: l,
          preserveTabOrderAnchor: n,
          portalElement: o,
          portalRef: r,
          portal: d = !0,
        } = c,
        u = _(c, [
          "preserveTabOrder",
          "preserveTabOrderAnchor",
          "portalElement",
          "portalRef",
          "portal",
        ]);
      let i = (0, bc.useRef)(null),
        a = ve(i, u.ref),
        s = (0, bc.useContext)(zx),
        [b, m] = (0, bc.useState)(null),
        [x, p] = (0, bc.useState)(null),
        R = (0, bc.useRef)(null),
        X = (0, bc.useRef)(null),
        G = (0, bc.useRef)(null),
        g = (0, bc.useRef)(null);
      return (
        ne(() => {
          let H = i.current;
          if (!H || !d) {
            m(null);
            return;
          }
          let f = u1(H, o);
          if (!f) {
            m(null);
            return;
          }
          let I = f.isConnected;
          if (
            (I || (s || d1(H)).appendChild(f),
            f.id || (f.id = H.id ? `portal/${H.id}` : i1()),
            m(f),
            Sd(r, f),
            !I)
          )
            return () => {
              f.remove(), Sd(r, null);
            };
        }, [d, o, s, r]),
        ne(() => {
          if (!d || !l || !n) return;
          let f = ue(n).createElement("span");
          return (
            (f.style.position = "fixed"),
            n.insertAdjacentElement("afterend", f),
            p(f),
            () => {
              f.remove(), p(null);
            }
          );
        }, [d, l, n]),
        (0, bc.useEffect)(() => {
          if (!b || !l) return;
          let H = 0,
            f = (I) => {
              if (!pn(I)) return;
              let y = I.type === "focusin";
              if ((cancelAnimationFrame(H), y)) return CR(b);
              H = requestAnimationFrame(() => {
                VR(b, !0);
              });
            };
          return (
            b.addEventListener("focusin", f, !0),
            b.addEventListener("focusout", f, !0),
            () => {
              cancelAnimationFrame(H),
                b.removeEventListener("focusin", f, !0),
                b.removeEventListener("focusout", f, !0);
            }
          );
        }, [b, l]),
        (u = Ie(
          u,
          (H) => {
            if (
              ((H = (0, Ft.jsx)(zx.Provider, { value: b || s, children: H })),
              !d)
            )
              return H;
            if (!b)
              return (0, Ft.jsx)("span", {
                ref: a,
                id: u.id,
                style: { position: "fixed" },
                hidden: !0,
              });
            (H = (0, Ft.jsxs)(Ft.Fragment, {
              children: [
                l &&
                  b &&
                  (0, Ft.jsx)(ou, {
                    "ref": X,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-inner-before",
                    "onFocus": (I) => {
                      pn(I, b) ? yn(Sa()) : yn(R.current);
                    },
                  }),
                H,
                l &&
                  b &&
                  (0, Ft.jsx)(ou, {
                    "ref": G,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-inner-after",
                    "onFocus": (I) => {
                      pn(I, b) ? yn(xx()) : yn(g.current);
                    },
                  }),
              ],
            })),
              b && (H = (0, kx.createPortal)(H, b));
            let f = (0, Ft.jsxs)(Ft.Fragment, {
              children: [
                l &&
                  b &&
                  (0, Ft.jsx)(ou, {
                    "ref": R,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-outer-before",
                    "onFocus": (I) => {
                      !(I.relatedTarget === g.current) && pn(I, b)
                        ? yn(X.current)
                        : yn(xx());
                    },
                  }),
                l &&
                  (0, Ft.jsx)("span", {
                    "aria-owns": b?.id,
                    "style": { position: "fixed" },
                  }),
                l &&
                  b &&
                  (0, Ft.jsx)(ou, {
                    "ref": g,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-outer-after",
                    "onFocus": (I) => {
                      if (pn(I, b)) yn(G.current);
                      else {
                        let y = Sa();
                        if (y === X.current) {
                          requestAnimationFrame(() => {
                            var W;
                            return (W = Sa()) == null ? void 0 : W.focus();
                          });
                          return;
                        }
                        yn(y);
                      }
                    },
                  }),
              ],
            });
            return (
              x && l && (f = (0, kx.createPortal)(f, x)),
              (0, Ft.jsxs)(Ft.Fragment, { children: [f, H] })
            );
          },
          [b, s, d, u.id, l, x]
        )),
        (u = w(J({}, u), { ref: a })),
        u
      );
    }),
    aO = P(function (t) {
      let c = wx(t);
      return q(r1, c);
    });
  var rt = C(A(), 1),
    Uc = C(E(), 1),
    a1 = "div",
    xf = Pn();
  function s1(e) {
    let t = uc();
    return !t || (e && Xe(e, t)) ? !1 : !!ac(t);
  }
  function Gf(e, t = !1) {
    if (!e) return null;
    let c = "current" in e ? e.current : e;
    return c ? (t ? (ac(c) ? c : null) : c) : null;
  }
  var Sx = te(function (t) {
    var c = t,
      {
        store: l,
        open: n,
        onClose: o,
        focusable: r = !0,
        modal: d = !0,
        portal: u = !!d,
        backdrop: i = !!d,
        hideOnEscape: a = !0,
        hideOnInteractOutside: s = !0,
        getPersistentElements: b,
        preventBodyScroll: m = !!d,
        autoFocusOnShow: x = !0,
        autoFocusOnHide: p = !0,
        initialFocus: R,
        finalFocus: X,
        unmountOnHide: G,
        unstable_treeSnapshotKey: g,
      } = c,
      H = _(c, [
        "store",
        "open",
        "onClose",
        "focusable",
        "modal",
        "portal",
        "backdrop",
        "hideOnEscape",
        "hideOnInteractOutside",
        "getPersistentElements",
        "preventBodyScroll",
        "autoFocusOnShow",
        "autoFocusOnHide",
        "initialFocus",
        "finalFocus",
        "unmountOnHide",
        "unstable_treeSnapshotKey",
      ]);
    let f = Na(),
      I = (0, rt.useRef)(null),
      y = mR({
        store: l || f,
        open: n,
        setOpen(T) {
          if (T) return;
          let se = I.current;
          if (!se) return;
          let Rt = new Event("close", { bubbles: !1, cancelable: !0 });
          o && se.addEventListener("close", o, { once: !0 }),
            se.dispatchEvent(Rt),
            Rt.defaultPrevented && y.setOpen(!0);
        },
      }),
      { portalRef: W, domReady: B } = nr(u, H.portalRef),
      F = H.preserveTabOrder,
      S = oe(y, (T) => F && !d && T.mounted),
      O = yc(H.id),
      v = oe(y, "open"),
      Y = oe(y, "mounted"),
      N = oe(y, "contentElement"),
      V = yx(Y, H.hidden, H.alwaysVisible);
    tf(N, O, m && !V), rf(y, s, B);
    let { wrapElement: k, nestedDialogs: D } = nf(y);
    (H = Ie(H, k, [k])),
      ne(() => {
        if (!v) return;
        let T = I.current,
          se = uc(T, !0);
        se &&
          se.tagName !== "BODY" &&
          ((T && Xe(T, se)) || y.setDisclosureElement(se));
      }, [y, v]),
      xf &&
        (0, rt.useEffect)(() => {
          if (!Y) return;
          let { disclosureElement: T } = y.getState();
          if (!T || !Ic(T)) return;
          let se = () => {
            let Rt = !1,
              be = () => {
                Rt = !0;
              },
              tc = { capture: !0, once: !0 };
            T.addEventListener("focusin", be, tc),
              gn(T, "mouseup", () => {
                T.removeEventListener("focusin", be, !0), !Rt && Oa(T);
              });
          };
          return (
            T.addEventListener("mousedown", se),
            () => {
              T.removeEventListener("mousedown", se);
            }
          );
        }, [y, Y]),
      (0, rt.useEffect)(() => {
        if (!Y || !B) return;
        let T = I.current;
        if (!T) return;
        let se = Od(T),
          Rt = se.visualViewport || se,
          be = () => {
            var tc, Kc;
            let Nr =
              (Kc = (tc = se.visualViewport) == null ? void 0 : tc.height) !=
              null
                ? Kc
                : se.innerHeight;
            T.style.setProperty("--dialog-viewport-height", `${Nr}px`);
          };
        return (
          be(),
          Rt.addEventListener("resize", be),
          () => {
            Rt.removeEventListener("resize", be);
          }
        );
      }, [Y, B]),
      (0, rt.useEffect)(() => {
        if (!d || !Y || !B) return;
        let T = I.current;
        if (!(!T || T.querySelector("[data-dialog-dismiss]")))
          return df(T, y.hide);
      }, [y, d, Y, B]),
      ne(() => {
        if (!Ta() || v || !Y || !B) return;
        let T = I.current;
        if (T) return hx(T);
      }, [v, Y, B]);
    let h = v && B;
    ne(() => {
      if (!O || !h) return;
      let T = I.current;
      return ER(O, [T]);
    }, [O, h, g]);
    let L = j(b);
    ne(() => {
      if (!O || !h) return;
      let { disclosureElement: T } = y.getState(),
        se = I.current,
        Rt = L() || [],
        be = [se, ...Rt, ...D.map((tc) => tc.getState().contentElement)];
      return d ? He(Fx(O, be), _R(O, be)) : Fx(O, [T, ...be]);
    }, [O, y, h, L, D, d, g]);
    let M = !!x,
      pe = jt(x),
      [Se, he] = (0, rt.useState)(!1);
    (0, rt.useEffect)(() => {
      if (!v || !M || !B || !N?.isConnected) return;
      let T =
          Gf(R, !0) ||
          N.querySelector("[data-autofocus=true],[autofocus]") ||
          FR(N, !0, u && S) ||
          N,
        se = ac(T);
      pe(se ? T : null) &&
        (he(!0),
        queueMicrotask(() => {
          T.focus(),
            xf && T.scrollIntoView({ block: "nearest", inline: "nearest" });
        }));
    }, [v, M, B, N, R, u, S, pe]);
    let Ae = !!p,
      $t = jt(p),
      [at, ct] = (0, rt.useState)(!1);
    (0, rt.useEffect)(() => {
      if (v) return ct(!0), () => ct(!1);
    }, [v]);
    let xc = (0, rt.useCallback)(
        (T, se = !0) => {
          let { disclosureElement: Rt } = y.getState();
          if (s1(T)) return;
          let be = Gf(X) || Rt;
          if (be?.id) {
            let Kc = ue(be),
              Nr = `[aria-activedescendant="${be.id}"]`,
              Qu = Kc.querySelector(Nr);
            Qu && (be = Qu);
          }
          if (be && !ac(be)) {
            let Kc = be.closest("[data-dialog]");
            if (Kc?.id) {
              let Nr = ue(Kc),
                Qu = `[aria-controls~="${Kc.id}"]`,
                HG = Nr.querySelector(Qu);
              HG && (be = HG);
            }
          }
          let tc = be && ac(be);
          if (!tc && se) {
            requestAnimationFrame(() => xc(T, !1));
            return;
          }
          $t(tc ? be : null) && tc && be?.focus();
        },
        [y, X, $t]
      ),
      st = (0, rt.useRef)(!1);
    ne(() => {
      if (v || !at || !Ae) return;
      let T = I.current;
      (st.current = !0), xc(T);
    }, [v, at, B, Ae, xc]),
      (0, rt.useEffect)(() => {
        if (!at || !Ae) return;
        let T = I.current;
        return () => {
          if (st.current) {
            st.current = !1;
            return;
          }
          xc(T);
        };
      }, [at, Ae, xc]);
    let Tl = jt(a);
    (0, rt.useEffect)(
      () =>
        !B || !Y
          ? void 0
          : Je(
              "keydown",
              (se) => {
                if (se.key !== "Escape" || se.defaultPrevented) return;
                let Rt = I.current;
                if (!Rt || nu(Rt)) return;
                let be = se.target;
                if (!be) return;
                let { disclosureElement: tc } = y.getState();
                !!(be.tagName === "BODY" || Xe(Rt, be) || !tc || Xe(tc, be)) &&
                  Tl(se) &&
                  y.hide();
              },
              !0
            ),
      [y, B, Y, Tl]
    ),
      (H = Ie(
        H,
        (T) => (0, Uc.jsx)(mf, { level: d ? 1 : void 0, children: T }),
        [d]
      ));
    let Dl = H.hidden,
      $ = H.alwaysVisible;
    H = Ie(
      H,
      (T) =>
        i
          ? (0, Uc.jsxs)(Uc.Fragment, {
              children: [
                (0, Uc.jsx)(jR, {
                  store: y,
                  backdrop: i,
                  hidden: Dl,
                  alwaysVisible: $,
                }),
                T,
              ],
            })
          : T,
      [y, i, Dl, $]
    );
    let [Le, ec] = (0, rt.useState)(),
      [Gl, Ro] = (0, rt.useState)();
    return (
      (H = Ie(
        H,
        (T) =>
          (0, Uc.jsx)(ar, {
            value: y,
            children: (0, Uc.jsx)(HR.Provider, {
              value: ec,
              children: (0, Uc.jsx)(ZR.Provider, { value: Ro, children: T }),
            }),
          }),
        [y]
      )),
      (H = w(
        J(
          {
            "id": O,
            "data-dialog": "",
            "role": "dialog",
            "tabIndex": r ? -1 : void 0,
            "aria-labelledby": Le,
            "aria-describedby": Gl,
          },
          H
        ),
        { ref: ve(I, H.ref) }
      )),
      (H = Jx(w(J({}, H), { autoFocusOnShow: Se }))),
      (H = co(J({ store: y }, H))),
      (H = Tc(w(J({}, H), { focusable: r }))),
      (H = wx(w(J({ portal: u }, H), { portalRef: W, preserveTabOrder: S }))),
      H
    );
  });
  function lo(e, t = Na) {
    return P(function (l) {
      let n = t(),
        o = l.store || n;
      return oe(o, (d) => !l.unmountOnHide || d?.mounted || !!l.open)
        ? (0, Uc.jsx)(e, J({}, l))
        : null;
    });
  }
  var wO = lo(
    P(function (t) {
      let c = Sx(t);
      return q(a1, c);
    }),
    Na
  );
  var ul = Math.min,
    wt = Math.max,
    du = Math.round,
    uu = Math.floor,
    Mc = (e) => ({ x: e, y: e }),
    b1 = { left: "right", right: "left", bottom: "top", top: "bottom" },
    m1 = { start: "end", end: "start" };
  function ja(e, t, c) {
    return wt(e, ul(t, c));
  }
  function Nl(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function il(e) {
    return e.split("-")[0];
  }
  function no(e) {
    return e.split("-")[1];
  }
  function Pa(e) {
    return e === "x" ? "y" : "x";
  }
  function Ka(e) {
    return e === "y" ? "height" : "width";
  }
  function zl(e) {
    return ["top", "bottom"].includes(il(e)) ? "y" : "x";
  }
  function _a(e) {
    return Pa(zl(e));
  }
  function pf(e, t, c) {
    c === void 0 && (c = !1);
    let l = no(e),
      n = _a(e),
      o = Ka(n),
      r =
        n === "x"
          ? l === (c ? "end" : "start")
            ? "right"
            : "left"
          : l === "start"
            ? "bottom"
            : "top";
    return t.reference[o] > t.floating[o] && (r = ru(r)), [r, ru(r)];
  }
  function gf(e) {
    let t = ru(e);
    return [Ea(e), t, Ea(t)];
  }
  function Ea(e) {
    return e.replace(/start|end/g, (t) => m1[t]);
  }
  function X1(e, t, c) {
    let l = ["left", "right"],
      n = ["right", "left"],
      o = ["top", "bottom"],
      r = ["bottom", "top"];
    switch (e) {
      case "top":
      case "bottom":
        return c ? (t ? n : l) : t ? l : n;
      case "left":
      case "right":
        return t ? o : r;
      default:
        return [];
    }
  }
  function Hf(e, t, c, l) {
    let n = no(e),
      o = X1(il(e), c === "start", l);
    return (
      n && ((o = o.map((r) => r + "-" + n)), t && (o = o.concat(o.map(Ea)))), o
    );
  }
  function ru(e) {
    return e.replace(/left|right|bottom|top/g, (t) => b1[t]);
  }
  function x1(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }
  function Ox(e) {
    return typeof e != "number"
      ? x1(e)
      : { top: e, right: e, bottom: e, left: e };
  }
  function oo(e) {
    let { x: t, y: c, width: l, height: n } = e;
    return {
      width: l,
      height: n,
      top: c,
      left: t,
      right: t + l,
      bottom: c + n,
      x: t,
      y: c,
    };
  }
  function Zf(e, t, c) {
    let { reference: l, floating: n } = e,
      o = zl(t),
      r = _a(t),
      d = Ka(r),
      u = il(t),
      i = o === "y",
      a = l.x + l.width / 2 - n.width / 2,
      s = l.y + l.height / 2 - n.height / 2,
      b = l[d] / 2 - n[d] / 2,
      m;
    switch (u) {
      case "top":
        m = { x: a, y: l.y - n.height };
        break;
      case "bottom":
        m = { x: a, y: l.y + l.height };
        break;
      case "right":
        m = { x: l.x + l.width, y: s };
        break;
      case "left":
        m = { x: l.x - n.width, y: s };
        break;
      default:
        m = { x: l.x, y: l.y };
    }
    switch (no(t)) {
      case "start":
        m[r] -= b * (c && i ? -1 : 1);
        break;
      case "end":
        m[r] += b * (c && i ? -1 : 1);
        break;
    }
    return m;
  }
  var Rf = async (e, t, c) => {
    let {
        placement: l = "bottom",
        strategy: n = "absolute",
        middleware: o = [],
        platform: r,
      } = c,
      d = o.filter(Boolean),
      u = await (r.isRTL == null ? void 0 : r.isRTL(t)),
      i = await r.getElementRects({ reference: e, floating: t, strategy: n }),
      { x: a, y: s } = Zf(i, l, u),
      b = l,
      m = {},
      x = 0;
    for (let p = 0; p < d.length; p++) {
      let { name: R, fn: X } = d[p],
        {
          x: G,
          y: g,
          data: H,
          reset: f,
        } = await X({
          x: a,
          y: s,
          initialPlacement: l,
          placement: b,
          strategy: n,
          middlewareData: m,
          rects: i,
          platform: r,
          elements: { reference: e, floating: t },
        });
      (a = G ?? a),
        (s = g ?? s),
        (m = { ...m, [R]: { ...m[R], ...H } }),
        f &&
          x <= 50 &&
          (x++,
          typeof f == "object" &&
            (f.placement && (b = f.placement),
            f.rects &&
              (i =
                f.rects === !0
                  ? await r.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: n,
                    })
                  : f.rects),
            ({ x: a, y: s } = Zf(i, b, u))),
          (p = -1));
    }
    return { x: a, y: s, placement: b, strategy: n, middlewareData: m };
  };
  async function qa(e, t) {
    var c;
    t === void 0 && (t = {});
    let { x: l, y: n, platform: o, rects: r, elements: d, strategy: u } = e,
      {
        boundary: i = "clippingAncestors",
        rootBoundary: a = "viewport",
        elementContext: s = "floating",
        altBoundary: b = !1,
        padding: m = 0,
      } = Nl(t, e),
      x = Ox(m),
      R = d[b ? (s === "floating" ? "reference" : "floating") : s],
      X = oo(
        await o.getClippingRect({
          element:
            (c = await (o.isElement == null ? void 0 : o.isElement(R))) ==
              null || c
              ? R
              : R.contextElement ||
                (await (o.getDocumentElement == null
                  ? void 0
                  : o.getDocumentElement(d.floating))),
          boundary: i,
          rootBoundary: a,
          strategy: u,
        })
      ),
      G =
        s === "floating"
          ? { x: l, y: n, width: r.floating.width, height: r.floating.height }
          : r.reference,
      g = await (o.getOffsetParent == null
        ? void 0
        : o.getOffsetParent(d.floating)),
      H = (await (o.isElement == null ? void 0 : o.isElement(g)))
        ? (await (o.getScale == null ? void 0 : o.getScale(g))) || {
            x: 1,
            y: 1,
          }
        : { x: 1, y: 1 },
      f = oo(
        o.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
              elements: d,
              rect: G,
              offsetParent: g,
              strategy: u,
            })
          : G
      );
    return {
      top: (X.top - f.top + x.top) / H.y,
      bottom: (f.bottom - X.bottom + x.bottom) / H.y,
      left: (X.left - f.left + x.left) / H.x,
      right: (f.right - X.right + x.right) / H.x,
    };
  }
  var ff = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      let {
          x: c,
          y: l,
          placement: n,
          rects: o,
          platform: r,
          elements: d,
          middlewareData: u,
        } = t,
        { element: i, padding: a = 0 } = Nl(e, t) || {};
      if (i == null) return {};
      let s = Ox(a),
        b = { x: c, y: l },
        m = _a(n),
        x = Ka(m),
        p = await r.getDimensions(i),
        R = m === "y",
        X = R ? "top" : "left",
        G = R ? "bottom" : "right",
        g = R ? "clientHeight" : "clientWidth",
        H = o.reference[x] + o.reference[m] - b[m] - o.floating[x],
        f = b[m] - o.reference[m],
        I = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(i)),
        y = I ? I[g] : 0;
      (!y || !(await (r.isElement == null ? void 0 : r.isElement(I)))) &&
        (y = d.floating[g] || o.floating[x]);
      let W = H / 2 - f / 2,
        B = y / 2 - p[x] / 2 - 1,
        F = ul(s[X], B),
        S = ul(s[G], B),
        O = F,
        v = y - p[x] - S,
        Y = y / 2 - p[x] / 2 + W,
        N = ja(O, Y, v),
        V =
          !u.arrow &&
          no(n) != null &&
          Y !== N &&
          o.reference[x] / 2 - (Y < O ? F : S) - p[x] / 2 < 0,
        k = V ? (Y < O ? Y - O : Y - v) : 0;
      return {
        [m]: b[m] + k,
        data: {
          [m]: N,
          centerOffset: Y - N - k,
          ...(V && { alignmentOffset: k }),
        },
        reset: V,
      };
    },
  });
  var If = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var c, l;
          let {
              placement: n,
              middlewareData: o,
              rects: r,
              initialPlacement: d,
              platform: u,
              elements: i,
            } = t,
            {
              mainAxis: a = !0,
              crossAxis: s = !0,
              fallbackPlacements: b,
              fallbackStrategy: m = "bestFit",
              fallbackAxisSideDirection: x = "none",
              flipAlignment: p = !0,
              ...R
            } = Nl(e, t);
          if ((c = o.arrow) != null && c.alignmentOffset) return {};
          let X = il(n),
            G = zl(d),
            g = il(d) === d,
            H = await (u.isRTL == null ? void 0 : u.isRTL(i.floating)),
            f = b || (g || !p ? [ru(d)] : gf(d)),
            I = x !== "none";
          !b && I && f.push(...Hf(d, p, x, H));
          let y = [d, ...f],
            W = await qa(t, R),
            B = [],
            F = ((l = o.flip) == null ? void 0 : l.overflows) || [];
          if ((a && B.push(W[X]), s)) {
            let Y = pf(n, r, H);
            B.push(W[Y[0]], W[Y[1]]);
          }
          if (
            ((F = [...F, { placement: n, overflows: B }]),
            !B.every((Y) => Y <= 0))
          ) {
            var S, O;
            let Y = (((S = o.flip) == null ? void 0 : S.index) || 0) + 1,
              N = y[Y];
            if (N)
              return {
                data: { index: Y, overflows: F },
                reset: { placement: N },
              };
            let V =
              (O = F.filter((k) => k.overflows[0] <= 0).sort(
                (k, D) => k.overflows[1] - D.overflows[1]
              )[0]) == null
                ? void 0
                : O.placement;
            if (!V)
              switch (m) {
                case "bestFit": {
                  var v;
                  let k =
                    (v = F.filter((D) => {
                      if (I) {
                        let h = zl(D.placement);
                        return h === G || h === "y";
                      }
                      return !0;
                    })
                      .map((D) => [
                        D.placement,
                        D.overflows
                          .filter((h) => h > 0)
                          .reduce((h, L) => h + L, 0),
                      ])
                      .sort((D, h) => D[1] - h[1])[0]) == null
                      ? void 0
                      : v[0];
                  k && (V = k);
                  break;
                }
                case "initialPlacement":
                  V = d;
                  break;
              }
            if (n !== V) return { reset: { placement: V } };
          }
          return {};
        },
      }
    );
  };
  async function G1(e, t) {
    let { placement: c, platform: l, elements: n } = e,
      o = await (l.isRTL == null ? void 0 : l.isRTL(n.floating)),
      r = il(c),
      d = no(c),
      u = zl(c) === "y",
      i = ["left", "top"].includes(r) ? -1 : 1,
      a = o && u ? -1 : 1,
      s = Nl(t, e),
      {
        mainAxis: b,
        crossAxis: m,
        alignmentAxis: x,
      } = typeof s == "number"
        ? { mainAxis: s, crossAxis: 0, alignmentAxis: null }
        : {
            mainAxis: s.mainAxis || 0,
            crossAxis: s.crossAxis || 0,
            alignmentAxis: s.alignmentAxis,
          };
    return (
      d && typeof x == "number" && (m = d === "end" ? x * -1 : x),
      u ? { x: m * a, y: b * i } : { x: b * i, y: m * a }
    );
  }
  var yf = function (e) {
      return (
        e === void 0 && (e = 0),
        {
          name: "offset",
          options: e,
          async fn(t) {
            var c, l;
            let { x: n, y: o, placement: r, middlewareData: d } = t,
              u = await G1(t, e);
            return r === ((c = d.offset) == null ? void 0 : c.placement) &&
              (l = d.arrow) != null &&
              l.alignmentOffset
              ? {}
              : { x: n + u.x, y: o + u.y, data: { ...u, placement: r } };
          },
        }
      );
    },
    Wf = function (e) {
      return (
        e === void 0 && (e = {}),
        {
          name: "shift",
          options: e,
          async fn(t) {
            let { x: c, y: l, placement: n } = t,
              {
                mainAxis: o = !0,
                crossAxis: r = !1,
                limiter: d = {
                  fn: (R) => {
                    let { x: X, y: G } = R;
                    return { x: X, y: G };
                  },
                },
                ...u
              } = Nl(e, t),
              i = { x: c, y: l },
              a = await qa(t, u),
              s = zl(il(n)),
              b = Pa(s),
              m = i[b],
              x = i[s];
            if (o) {
              let R = b === "y" ? "top" : "left",
                X = b === "y" ? "bottom" : "right",
                G = m + a[R],
                g = m - a[X];
              m = ja(G, m, g);
            }
            if (r) {
              let R = s === "y" ? "top" : "left",
                X = s === "y" ? "bottom" : "right",
                G = x + a[R],
                g = x - a[X];
              x = ja(G, x, g);
            }
            let p = d.fn({ ...t, [b]: m, [s]: x });
            return {
              ...p,
              data: { x: p.x - c, y: p.y - l, enabled: { [b]: o, [s]: r } },
            };
          },
        }
      );
    },
    Bf = function (e) {
      return (
        e === void 0 && (e = {}),
        {
          options: e,
          fn(t) {
            let { x: c, y: l, placement: n, rects: o, middlewareData: r } = t,
              { offset: d = 0, mainAxis: u = !0, crossAxis: i = !0 } = Nl(e, t),
              a = { x: c, y: l },
              s = zl(n),
              b = Pa(s),
              m = a[b],
              x = a[s],
              p = Nl(d, t),
              R =
                typeof p == "number"
                  ? { mainAxis: p, crossAxis: 0 }
                  : { mainAxis: 0, crossAxis: 0, ...p };
            if (u) {
              let g = b === "y" ? "height" : "width",
                H = o.reference[b] - o.floating[g] + R.mainAxis,
                f = o.reference[b] + o.reference[g] - R.mainAxis;
              m < H ? (m = H) : m > f && (m = f);
            }
            if (i) {
              var X, G;
              let g = b === "y" ? "width" : "height",
                H = ["top", "left"].includes(il(n)),
                f =
                  o.reference[s] -
                  o.floating[g] +
                  ((H && ((X = r.offset) == null ? void 0 : X[s])) || 0) +
                  (H ? 0 : R.crossAxis),
                I =
                  o.reference[s] +
                  o.reference[g] +
                  (H ? 0 : ((G = r.offset) == null ? void 0 : G[s]) || 0) -
                  (H ? R.crossAxis : 0);
              x < f ? (x = f) : x > I && (x = I);
            }
            return { [b]: m, [s]: x };
          },
        }
      );
    },
    vf = function (e) {
      return (
        e === void 0 && (e = {}),
        {
          name: "size",
          options: e,
          async fn(t) {
            var c, l;
            let { placement: n, rects: o, platform: r, elements: d } = t,
              { apply: u = () => {}, ...i } = Nl(e, t),
              a = await qa(t, i),
              s = il(n),
              b = no(n),
              m = zl(n) === "y",
              { width: x, height: p } = o.floating,
              R,
              X;
            s === "top" || s === "bottom"
              ? ((R = s),
                (X =
                  b ===
                  ((await (r.isRTL == null ? void 0 : r.isRTL(d.floating)))
                    ? "start"
                    : "end")
                    ? "left"
                    : "right"))
              : ((X = s), (R = b === "end" ? "top" : "bottom"));
            let G = p - a.top - a.bottom,
              g = x - a.left - a.right,
              H = ul(p - a[R], G),
              f = ul(x - a[X], g),
              I = !t.middlewareData.shift,
              y = H,
              W = f;
            if (
              ((c = t.middlewareData.shift) != null && c.enabled.x && (W = g),
              (l = t.middlewareData.shift) != null && l.enabled.y && (y = G),
              I && !b)
            ) {
              let F = wt(a.left, 0),
                S = wt(a.right, 0),
                O = wt(a.top, 0),
                v = wt(a.bottom, 0);
              m
                ? (W =
                    x - 2 * (F !== 0 || S !== 0 ? F + S : wt(a.left, a.right)))
                : (y =
                    p - 2 * (O !== 0 || v !== 0 ? O + v : wt(a.top, a.bottom)));
            }
            await u({ ...t, availableWidth: W, availableHeight: y });
            let B = await r.getDimensions(d.floating);
            return x !== B.width || p !== B.height
              ? { reset: { rects: !0 } }
              : {};
          },
        }
      );
    };
  function $a() {
    return typeof window < "u";
  }
  function ro(e) {
    return hf(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function Kt(e) {
    var t;
    return (
      (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
      window
    );
  }
  function Ec(e) {
    var t;
    return (t = (hf(e) ? e.ownerDocument : e.document) || window.document) ==
      null
      ? void 0
      : t.documentElement;
  }
  function hf(e) {
    return $a() ? e instanceof Node || e instanceof Kt(e).Node : !1;
  }
  function Wc(e) {
    return $a() ? e instanceof Element || e instanceof Kt(e).Element : !1;
  }
  function jc(e) {
    return $a()
      ? e instanceof HTMLElement || e instanceof Kt(e).HTMLElement
      : !1;
  }
  function Ff(e) {
    return !$a() || typeof ShadowRoot > "u"
      ? !1
      : e instanceof ShadowRoot || e instanceof Kt(e).ShadowRoot;
  }
  function gr(e) {
    let { overflow: t, overflowX: c, overflowY: l, display: n } = Bc(e);
    return (
      /auto|scroll|overlay|hidden|clip/.test(t + l + c) &&
      !["inline", "contents"].includes(n)
    );
  }
  function Vf(e) {
    return ["table", "td", "th"].includes(ro(e));
  }
  function iu(e) {
    return [":popover-open", ":modal"].some((t) => {
      try {
        return e.matches(t);
      } catch {
        return !1;
      }
    });
  }
  function es(e) {
    let t = ts(),
      c = Wc(e) ? Bc(e) : e;
    return (
      c.transform !== "none" ||
      c.perspective !== "none" ||
      (c.containerType ? c.containerType !== "normal" : !1) ||
      (!t && (c.backdropFilter ? c.backdropFilter !== "none" : !1)) ||
      (!t && (c.filter ? c.filter !== "none" : !1)) ||
      ["transform", "perspective", "filter"].some((l) =>
        (c.willChange || "").includes(l)
      ) ||
      ["paint", "layout", "strict", "content"].some((l) =>
        (c.contain || "").includes(l)
      )
    );
  }
  function Cf(e) {
    let t = kl(e);
    for (; jc(t) && !uo(t); ) {
      if (es(t)) return t;
      if (iu(t)) return null;
      t = kl(t);
    }
    return null;
  }
  function ts() {
    return typeof CSS > "u" || !CSS.supports
      ? !1
      : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function uo(e) {
    return ["html", "body", "#document"].includes(ro(e));
  }
  function Bc(e) {
    return Kt(e).getComputedStyle(e);
  }
  function au(e) {
    return Wc(e)
      ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
      : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
  }
  function kl(e) {
    if (ro(e) === "html") return e;
    let t = e.assignedSlot || e.parentNode || (Ff(e) && e.host) || Ec(e);
    return Ff(t) ? t.host : t;
  }
  function Jf(e) {
    let t = kl(e);
    return uo(t)
      ? e.ownerDocument
        ? e.ownerDocument.body
        : e.body
      : jc(t) && gr(t)
        ? t
        : Jf(t);
  }
  function pr(e, t, c) {
    var l;
    t === void 0 && (t = []), c === void 0 && (c = !0);
    let n = Jf(e),
      o = n === ((l = e.ownerDocument) == null ? void 0 : l.body),
      r = Kt(n);
    if (o) {
      let d = cs(r);
      return t.concat(
        r,
        r.visualViewport || [],
        gr(n) ? n : [],
        d && c ? pr(d) : []
      );
    }
    return t.concat(n, pr(n, [], c));
  }
  function cs(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
  }
  function zf(e) {
    let t = Bc(e),
      c = parseFloat(t.width) || 0,
      l = parseFloat(t.height) || 0,
      n = jc(e),
      o = n ? e.offsetWidth : c,
      r = n ? e.offsetHeight : l,
      d = du(c) !== o || du(l) !== r;
    return d && ((c = o), (l = r)), { width: c, height: l, $: d };
  }
  function Ax(e) {
    return Wc(e) ? e : e.contextElement;
  }
  function Hr(e) {
    let t = Ax(e);
    if (!jc(t)) return Mc(1);
    let c = t.getBoundingClientRect(),
      { width: l, height: n, $: o } = zf(t),
      r = (o ? du(c.width) : c.width) / l,
      d = (o ? du(c.height) : c.height) / n;
    return (
      (!r || !Number.isFinite(r)) && (r = 1),
      (!d || !Number.isFinite(d)) && (d = 1),
      { x: r, y: d }
    );
  }
  var p1 = Mc(0);
  function kf(e) {
    let t = Kt(e);
    return !ts() || !t.visualViewport
      ? p1
      : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
  }
  function g1(e, t, c) {
    return t === void 0 && (t = !1), !c || (t && c !== Kt(e)) ? !1 : t;
  }
  function io(e, t, c, l) {
    t === void 0 && (t = !1), c === void 0 && (c = !1);
    let n = e.getBoundingClientRect(),
      o = Ax(e),
      r = Mc(1);
    t && (l ? Wc(l) && (r = Hr(l)) : (r = Hr(e)));
    let d = g1(o, c, l) ? kf(o) : Mc(0),
      u = (n.left + d.x) / r.x,
      i = (n.top + d.y) / r.y,
      a = n.width / r.x,
      s = n.height / r.y;
    if (o) {
      let b = Kt(o),
        m = l && Wc(l) ? Kt(l) : l,
        x = b,
        p = cs(x);
      for (; p && l && m !== x; ) {
        let R = Hr(p),
          X = p.getBoundingClientRect(),
          G = Bc(p),
          g = X.left + (p.clientLeft + parseFloat(G.paddingLeft)) * R.x,
          H = X.top + (p.clientTop + parseFloat(G.paddingTop)) * R.y;
        (u *= R.x),
          (i *= R.y),
          (a *= R.x),
          (s *= R.y),
          (u += g),
          (i += H),
          (x = Kt(p)),
          (p = cs(x));
      }
    }
    return oo({ width: a, height: s, x: u, y: i });
  }
  function Lx(e, t) {
    let c = au(e).scrollLeft;
    return t ? t.left + c : io(Ec(e)).left + c;
  }
  function wf(e, t, c) {
    c === void 0 && (c = !1);
    let l = e.getBoundingClientRect(),
      n = l.left + t.scrollLeft - (c ? 0 : Lx(e, l)),
      o = l.top + t.scrollTop;
    return { x: n, y: o };
  }
  function H1(e) {
    let { elements: t, rect: c, offsetParent: l, strategy: n } = e,
      o = n === "fixed",
      r = Ec(l),
      d = t ? iu(t.floating) : !1;
    if (l === r || (d && o)) return c;
    let u = { scrollLeft: 0, scrollTop: 0 },
      i = Mc(1),
      a = Mc(0),
      s = jc(l);
    if (
      (s || (!s && !o)) &&
      ((ro(l) !== "body" || gr(r)) && (u = au(l)), jc(l))
    ) {
      let m = io(l);
      (i = Hr(l)), (a.x = m.x + l.clientLeft), (a.y = m.y + l.clientTop);
    }
    let b = r && !s && !o ? wf(r, u, !0) : Mc(0);
    return {
      width: c.width * i.x,
      height: c.height * i.y,
      x: c.x * i.x - u.scrollLeft * i.x + a.x + b.x,
      y: c.y * i.y - u.scrollTop * i.y + a.y + b.y,
    };
  }
  function Z1(e) {
    return Array.from(e.getClientRects());
  }
  function R1(e) {
    let t = Ec(e),
      c = au(e),
      l = e.ownerDocument.body,
      n = wt(t.scrollWidth, t.clientWidth, l.scrollWidth, l.clientWidth),
      o = wt(t.scrollHeight, t.clientHeight, l.scrollHeight, l.clientHeight),
      r = -c.scrollLeft + Lx(e),
      d = -c.scrollTop;
    return (
      Bc(l).direction === "rtl" && (r += wt(t.clientWidth, l.clientWidth) - n),
      { width: n, height: o, x: r, y: d }
    );
  }
  function f1(e, t) {
    let c = Kt(e),
      l = Ec(e),
      n = c.visualViewport,
      o = l.clientWidth,
      r = l.clientHeight,
      d = 0,
      u = 0;
    if (n) {
      (o = n.width), (r = n.height);
      let i = ts();
      (!i || (i && t === "fixed")) && ((d = n.offsetLeft), (u = n.offsetTop));
    }
    return { width: o, height: r, x: d, y: u };
  }
  function I1(e, t) {
    let c = io(e, !0, t === "fixed"),
      l = c.top + e.clientTop,
      n = c.left + e.clientLeft,
      o = jc(e) ? Hr(e) : Mc(1),
      r = e.clientWidth * o.x,
      d = e.clientHeight * o.y,
      u = n * o.x,
      i = l * o.y;
    return { width: r, height: d, x: u, y: i };
  }
  function Yf(e, t, c) {
    let l;
    if (t === "viewport") l = f1(e, c);
    else if (t === "document") l = R1(Ec(e));
    else if (Wc(t)) l = I1(t, c);
    else {
      let n = kf(e);
      l = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
    }
    return oo(l);
  }
  function Sf(e, t) {
    let c = kl(e);
    return c === t || !Wc(c) || uo(c)
      ? !1
      : Bc(c).position === "fixed" || Sf(c, t);
  }
  function y1(e, t) {
    let c = t.get(e);
    if (c) return c;
    let l = pr(e, [], !1).filter((d) => Wc(d) && ro(d) !== "body"),
      n = null,
      o = Bc(e).position === "fixed",
      r = o ? kl(e) : e;
    for (; Wc(r) && !uo(r); ) {
      let d = Bc(r),
        u = es(r);
      !u && d.position === "fixed" && (n = null),
        (
          o
            ? !u && !n
            : (!u &&
                d.position === "static" &&
                !!n &&
                ["absolute", "fixed"].includes(n.position)) ||
              (gr(r) && !u && Sf(e, r))
        )
          ? (l = l.filter((a) => a !== r))
          : (n = d),
        (r = kl(r));
    }
    return t.set(e, l), l;
  }
  function W1(e) {
    let { element: t, boundary: c, rootBoundary: l, strategy: n } = e,
      r = [
        ...(c === "clippingAncestors"
          ? iu(t)
            ? []
            : y1(t, this._c)
          : [].concat(c)),
        l,
      ],
      d = r[0],
      u = r.reduce(
        (i, a) => {
          let s = Yf(t, a, n);
          return (
            (i.top = wt(s.top, i.top)),
            (i.right = ul(s.right, i.right)),
            (i.bottom = ul(s.bottom, i.bottom)),
            (i.left = wt(s.left, i.left)),
            i
          );
        },
        Yf(t, d, n)
      );
    return {
      width: u.right - u.left,
      height: u.bottom - u.top,
      x: u.left,
      y: u.top,
    };
  }
  function B1(e) {
    let { width: t, height: c } = zf(e);
    return { width: t, height: c };
  }
  function v1(e, t, c) {
    let l = jc(t),
      n = Ec(t),
      o = c === "fixed",
      r = io(e, !0, o, t),
      d = { scrollLeft: 0, scrollTop: 0 },
      u = Mc(0);
    if (l || (!l && !o))
      if (((ro(t) !== "body" || gr(n)) && (d = au(t)), l)) {
        let b = io(t, !0, o, t);
        (u.x = b.x + t.clientLeft), (u.y = b.y + t.clientTop);
      } else n && (u.x = Lx(n));
    let i = n && !l && !o ? wf(n, d) : Mc(0),
      a = r.left + d.scrollLeft - u.x - i.x,
      s = r.top + d.scrollTop - u.y - i.y;
    return { x: a, y: s, width: r.width, height: r.height };
  }
  function Qx(e) {
    return Bc(e).position === "static";
  }
  function Nf(e, t) {
    if (!jc(e) || Bc(e).position === "fixed") return null;
    if (t) return t(e);
    let c = e.offsetParent;
    return Ec(e) === c && (c = c.ownerDocument.body), c;
  }
  function Of(e, t) {
    let c = Kt(e);
    if (iu(e)) return c;
    if (!jc(e)) {
      let n = kl(e);
      for (; n && !uo(n); ) {
        if (Wc(n) && !Qx(n)) return n;
        n = kl(n);
      }
      return c;
    }
    let l = Nf(e, t);
    for (; l && Vf(l) && Qx(l); ) l = Nf(l, t);
    return l && uo(l) && Qx(l) && !es(l) ? c : l || Cf(e) || c;
  }
  var F1 = async function (e) {
    let t = this.getOffsetParent || Of,
      c = this.getDimensions,
      l = await c(e.floating);
    return {
      reference: v1(e.reference, await t(e.floating), e.strategy),
      floating: { x: 0, y: 0, width: l.width, height: l.height },
    };
  };
  function h1(e) {
    return Bc(e).direction === "rtl";
  }
  var V1 = {
    convertOffsetParentRelativeRectToViewportRelativeRect: H1,
    getDocumentElement: Ec,
    getClippingRect: W1,
    getOffsetParent: Of,
    getElementRects: F1,
    getClientRects: Z1,
    getDimensions: B1,
    getScale: Hr,
    isElement: Wc,
    isRTL: h1,
  };
  function C1(e, t) {
    let c = null,
      l,
      n = Ec(e);
    function o() {
      var d;
      clearTimeout(l), (d = c) == null || d.disconnect(), (c = null);
    }
    function r(d, u) {
      d === void 0 && (d = !1), u === void 0 && (u = 1), o();
      let { left: i, top: a, width: s, height: b } = e.getBoundingClientRect();
      if ((d || t(), !s || !b)) return;
      let m = uu(a),
        x = uu(n.clientWidth - (i + s)),
        p = uu(n.clientHeight - (a + b)),
        R = uu(i),
        G = {
          rootMargin: -m + "px " + -x + "px " + -p + "px " + -R + "px",
          threshold: wt(0, ul(1, u)) || 1,
        },
        g = !0;
      function H(f) {
        let I = f[0].intersectionRatio;
        if (I !== u) {
          if (!g) return r();
          I
            ? r(!1, I)
            : (l = setTimeout(() => {
                r(!1, 1e-7);
              }, 1e3));
        }
        g = !1;
      }
      try {
        c = new IntersectionObserver(H, { ...G, root: n.ownerDocument });
      } catch {
        c = new IntersectionObserver(H, G);
      }
      c.observe(e);
    }
    return r(!0), o;
  }
  function Qf(e, t, c, l) {
    l === void 0 && (l = {});
    let {
        ancestorScroll: n = !0,
        ancestorResize: o = !0,
        elementResize: r = typeof ResizeObserver == "function",
        layoutShift: d = typeof IntersectionObserver == "function",
        animationFrame: u = !1,
      } = l,
      i = Ax(e),
      a = n || o ? [...(i ? pr(i) : []), ...pr(t)] : [];
    a.forEach((X) => {
      n && X.addEventListener("scroll", c, { passive: !0 }),
        o && X.addEventListener("resize", c);
    });
    let s = i && d ? C1(i, c) : null,
      b = -1,
      m = null;
    r &&
      ((m = new ResizeObserver((X) => {
        let [G] = X;
        G &&
          G.target === i &&
          m &&
          (m.unobserve(t),
          cancelAnimationFrame(b),
          (b = requestAnimationFrame(() => {
            var g;
            (g = m) == null || g.observe(t);
          }))),
          c();
      })),
      i && !u && m.observe(i),
      m.observe(t));
    let x,
      p = u ? io(e) : null;
    u && R();
    function R() {
      let X = io(e);
      p &&
        (X.x !== p.x ||
          X.y !== p.y ||
          X.width !== p.width ||
          X.height !== p.height) &&
        c(),
        (p = X),
        (x = requestAnimationFrame(R));
    }
    return (
      c(),
      () => {
        var X;
        a.forEach((G) => {
          n && G.removeEventListener("scroll", c),
            o && G.removeEventListener("resize", c);
        }),
          s?.(),
          (X = m) == null || X.disconnect(),
          (m = null),
          u && cancelAnimationFrame(x);
      }
    );
  }
  var Af = yf;
  var Lf = Wf,
    Tf = If,
    Df = vf;
  var Uf = ff;
  var Mf = Bf,
    Ef = (e, t, c) => {
      let l = new Map(),
        n = { platform: V1, ...c },
        o = { ...n.platform, _c: l };
      return Rf(e, t, { ...n, platform: o });
    };
  var ls = C(A(), 1),
    Tx = C(E(), 1),
    J1 = "div";
  function jf(e = 0, t = 0, c = 0, l = 0) {
    if (typeof DOMRect == "function") return new DOMRect(e, t, c, l);
    let n = {
      x: e,
      y: t,
      width: c,
      height: l,
      top: t,
      right: e + c,
      bottom: t + l,
      left: e,
    };
    return w(J({}, n), { toJSON: () => n });
  }
  function Y1(e) {
    if (!e) return jf();
    let { x: t, y: c, width: l, height: n } = e;
    return jf(t, c, l, n);
  }
  function N1(e, t) {
    return {
      contextElement: e || void 0,
      getBoundingClientRect: () => {
        let l = e,
          n = t?.(l);
        return n || !l ? Y1(n) : l.getBoundingClientRect();
      },
    };
  }
  function z1(e) {
    return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
  }
  function Pf(e) {
    let t = window.devicePixelRatio || 1;
    return Math.round(e * t) / t;
  }
  function k1(e, t) {
    return Af(({ placement: c }) => {
      var l;
      let n = (e?.clientHeight || 0) / 2,
        o =
          typeof t.gutter == "number"
            ? t.gutter + n
            : (l = t.gutter) != null
              ? l
              : n;
      return {
        crossAxis: !!c.split("-")[1] ? void 0 : t.shift,
        mainAxis: o,
        alignmentAxis: t.shift,
      };
    });
  }
  function w1(e) {
    if (e.flip === !1) return;
    let t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
    return (
      Ce(!t || t.every(z1), !1),
      Tf({ padding: e.overflowPadding, fallbackPlacements: t })
    );
  }
  function S1(e) {
    if (!(!e.slide && !e.overlap))
      return Lf({
        mainAxis: e.slide,
        crossAxis: e.overlap,
        padding: e.overflowPadding,
        limiter: Mf(),
      });
  }
  function O1(e) {
    return Df({
      padding: e.overflowPadding,
      apply({ elements: t, availableWidth: c, availableHeight: l, rects: n }) {
        let o = t.floating,
          r = Math.round(n.reference.width);
        (c = Math.floor(c)),
          (l = Math.floor(l)),
          o.style.setProperty("--popover-anchor-width", `${r}px`),
          o.style.setProperty("--popover-available-width", `${c}px`),
          o.style.setProperty("--popover-available-height", `${l}px`),
          e.sameWidth && (o.style.width = `${r}px`),
          e.fitViewport &&
            ((o.style.maxWidth = `${c}px`), (o.style.maxHeight = `${l}px`));
      },
    });
  }
  function Q1(e, t) {
    if (e) return Uf({ element: e, padding: t.arrowPadding });
  }
  var Dx = te(function (t) {
      var c = t,
        {
          store: l,
          modal: n = !1,
          portal: o = !!n,
          preserveTabOrder: r = !0,
          autoFocusOnShow: d = !0,
          wrapperProps: u,
          fixed: i = !1,
          flip: a = !0,
          shift: s = 0,
          slide: b = !0,
          overlap: m = !1,
          sameWidth: x = !1,
          fitViewport: p = !1,
          gutter: R,
          arrowPadding: X = 4,
          overflowPadding: G = 8,
          getAnchorRect: g,
          updatePosition: H,
        } = c,
        f = _(c, [
          "store",
          "modal",
          "portal",
          "preserveTabOrder",
          "autoFocusOnShow",
          "wrapperProps",
          "fixed",
          "flip",
          "shift",
          "slide",
          "overlap",
          "sameWidth",
          "fitViewport",
          "gutter",
          "arrowPadding",
          "overflowPadding",
          "getAnchorRect",
          "updatePosition",
        ]);
      let I = bx();
      (l = l || I), Ce(l, !1);
      let y = l.useState("arrowElement"),
        W = l.useState("anchorElement"),
        B = l.useState("disclosureElement"),
        F = l.useState("popoverElement"),
        S = l.useState("contentElement"),
        O = l.useState("placement"),
        v = l.useState("mounted"),
        Y = l.useState("rendered"),
        N = (0, ls.useRef)(null),
        [V, k] = (0, ls.useState)(!1),
        { portalRef: D, domReady: h } = nr(o, f.portalRef),
        L = j(g),
        M = j(H),
        pe = !!H;
      ne(() => {
        if (!F?.isConnected) return;
        F.style.setProperty("--popover-overflow-padding", `${G}px`);
        let he = N1(W, L),
          Ae = async () => {
            if (!v) return;
            y || (N.current = N.current || document.createElement("div"));
            let ct = y || N.current,
              xc = [
                k1(ct, { gutter: R, shift: s }),
                w1({ flip: a, overflowPadding: G }),
                S1({ slide: b, shift: s, overlap: m, overflowPadding: G }),
                Q1(ct, { arrowPadding: X }),
                O1({ sameWidth: x, fitViewport: p, overflowPadding: G }),
              ],
              st = await Ef(he, F, {
                placement: O,
                strategy: i ? "fixed" : "absolute",
                middleware: xc,
              });
            l?.setState("currentPlacement", st.placement), k(!0);
            let Tl = Pf(st.x),
              Dl = Pf(st.y);
            if (
              (Object.assign(F.style, {
                top: "0",
                left: "0",
                transform: `translate3d(${Tl}px,${Dl}px,0)`,
              }),
              ct && st.middlewareData.arrow)
            ) {
              let { x: $, y: Le } = st.middlewareData.arrow,
                ec = st.placement.split("-")[0],
                Gl = ct.clientWidth / 2,
                Ro = ct.clientHeight / 2,
                T = $ != null ? $ + Gl : -Gl,
                se = Le != null ? Le + Ro : -Ro;
              F.style.setProperty(
                "--popover-transform-origin",
                {
                  top: `${T}px calc(100% + ${Ro}px)`,
                  bottom: `${T}px ${-Ro}px`,
                  left: `calc(100% + ${Gl}px) ${se}px`,
                  right: `${-Gl}px ${se}px`,
                }[ec]
              ),
                Object.assign(ct.style, {
                  left: $ != null ? `${$}px` : "",
                  top: Le != null ? `${Le}px` : "",
                  [ec]: "100%",
                });
            }
          },
          at = Qf(
            he,
            F,
            async () => {
              pe ? (await M({ updatePosition: Ae }), k(!0)) : await Ae();
            },
            { elementResize: typeof ResizeObserver == "function" }
          );
        return () => {
          k(!1), at();
        };
      }, [l, Y, F, y, W, F, O, v, h, i, a, s, b, m, x, p, R, X, G, L, pe, M]),
        ne(() => {
          if (!v || !h || !F?.isConnected || !S?.isConnected) return;
          let he = () => {
            F.style.zIndex = getComputedStyle(S).zIndex;
          };
          he();
          let Ae = requestAnimationFrame(() => {
            Ae = requestAnimationFrame(he);
          });
          return () => cancelAnimationFrame(Ae);
        }, [v, h, F, S]);
      let Se = i ? "fixed" : "absolute";
      return (
        (f = Ie(
          f,
          (he) =>
            (0, Tx.jsx)(
              "div",
              w(J({}, u), {
                style: J(
                  { position: Se, top: 0, left: 0, width: "max-content" },
                  u?.style
                ),
                ref: l?.setPopoverElement,
                children: he,
              })
            ),
          [l, Se, u]
        )),
        (f = Ie(f, (he) => (0, Tx.jsx)(fn, { value: l, children: he }), [l])),
        (f = w(J({ "data-placing": !V || void 0 }, f), {
          style: J({ position: "relative" }, f.style),
        })),
        (f = Sx(
          w(
            J(
              {
                store: l,
                modal: n,
                portal: o,
                preserveTabOrder: r,
                preserveTabOrderAnchor: B || W,
                autoFocusOnShow: V && d,
              },
              f
            ),
            { portalRef: D }
          )
        )),
        f
      );
    }),
    rQ = lo(
      P(function (t) {
        let c = Dx(t);
        return q(J1, c);
      }),
      bx
    );
  var su = _e([sr], [fn]),
    aQ = su.useContext,
    sQ = su.useScopedContext,
    bu = su.useProviderContext,
    Kf = su.ContextProvider,
    ns = su.ScopedContextProvider;
  function _f(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = XR(
        ge(ee({}, e), { placement: K(e.placement, c?.placement, "bottom") })
      ),
      n = K(e.timeout, c?.timeout, 500),
      o = ge(ee({}, l.getState()), {
        timeout: n,
        showTimeout: K(e.showTimeout, c?.showTimeout),
        hideTimeout: K(e.hideTimeout, c?.hideTimeout),
        autoFocusOnShow: K(c?.autoFocusOnShow, !1),
      }),
      r = De(o, l, e.store);
    return ge(ee(ee({}, l), r), {
      setAutoFocusOnShow: (d) => r.setState("autoFocusOnShow", d),
    });
  }
  function qf(e, t, c) {
    return (
      Ze(e, c, "timeout"),
      Ze(e, c, "showTimeout"),
      Ze(e, c, "hideTimeout"),
      xR(e, t, c)
    );
  }
  function os(e) {
    return [e.clientX, e.clientY];
  }
  function Ux(e, t) {
    let [c, l] = e,
      n = !1,
      o = t.length;
    for (let r = o, d = 0, u = r - 1; d < r; u = d++) {
      let [i, a] = t[d],
        [s, b] = t[u],
        [, m] = t[u === 0 ? r - 1 : u - 1] || [0, 0],
        x = (a - b) * (c - i) - (i - s) * (l - a);
      if (b < a) {
        if (l >= b && l < a) {
          if (x === 0) return !0;
          x > 0 && (l === b ? l > m && (n = !n) : (n = !n));
        }
      } else if (a < b) {
        if (l > a && l <= b) {
          if (x === 0) return !0;
          x < 0 && (l === b ? l < m && (n = !n) : (n = !n));
        }
      } else if (l === a && ((c >= s && c <= i) || (c >= i && c <= s)))
        return !0;
    }
    return n;
  }
  function A1(e, t) {
    let { top: c, right: l, bottom: n, left: o } = t,
      [r, d] = e,
      u = r < o ? "left" : r > l ? "right" : null,
      i = d < c ? "top" : d > n ? "bottom" : null;
    return [u, i];
  }
  function Mx(e, t) {
    let c = e.getBoundingClientRect(),
      { top: l, right: n, bottom: o, left: r } = c,
      [d, u] = A1(t, c),
      i = [t];
    return (
      d
        ? (u !== "top" && i.push([d === "left" ? r : n, l]),
          i.push([d === "left" ? n : r, l]),
          i.push([d === "left" ? n : r, o]),
          u !== "bottom" && i.push([d === "left" ? r : n, o]))
        : u === "top"
          ? (i.push([r, l]), i.push([r, o]), i.push([n, o]), i.push([n, l]))
          : (i.push([r, o]), i.push([r, l]), i.push([n, l]), i.push([n, o])),
      i
    );
  }
  var Ue = C(A(), 1),
    Ex = C(E(), 1),
    L1 = "div";
  function eI(e, t, c, l) {
    return Gx(t)
      ? !0
      : e
        ? !!(Xe(t, e) || (c && Xe(c, e)) || l?.some((n) => eI(e, n, c)))
        : !1;
  }
  function T1(e) {
    var t = e,
      { store: c } = t,
      l = _(t, ["store"]);
    let [n, o] = (0, Ue.useState)(!1),
      r = c.useState("mounted");
    (0, Ue.useEffect)(() => {
      r || o(!1);
    }, [r]);
    let d = l.onFocus,
      u = j((a) => {
        d?.(a), !a.defaultPrevented && o(!0);
      }),
      i = (0, Ue.useRef)(null);
    return (
      (0, Ue.useEffect)(
        () =>
          Fe(c, ["anchorElement"], (a) => {
            i.current = a.anchorElement;
          }),
        []
      ),
      (l = w(J({ autoFocusOnHide: n, finalFocus: i }, l), { onFocus: u })),
      l
    );
  }
  var $f = (0, Ue.createContext)(null),
    jx = te(function (t) {
      var c = t,
        {
          store: l,
          modal: n = !1,
          portal: o = !!n,
          hideOnEscape: r = !0,
          hideOnHoverOutside: d = !0,
          disablePointerEventsOnApproach: u = !!d,
        } = c,
        i = _(c, [
          "store",
          "modal",
          "portal",
          "hideOnEscape",
          "hideOnHoverOutside",
          "disablePointerEventsOnApproach",
        ]);
      let a = bu();
      (l = l || a), Ce(l, !1);
      let s = (0, Ue.useRef)(null),
        [b, m] = (0, Ue.useState)([]),
        x = (0, Ue.useRef)(0),
        p = (0, Ue.useRef)(null),
        { portalRef: R, domReady: X } = nr(o, i.portalRef),
        G = Va(),
        g = !!d,
        H = jt(d),
        f = !!u,
        I = jt(u),
        y = l.useState("open"),
        W = l.useState("mounted");
      (0, Ue.useEffect)(() => {
        if (!X || !W || (!g && !f)) return;
        let v = s.current;
        return v
          ? He(
              Je(
                "mousemove",
                (N) => {
                  if (!l || !G()) return;
                  let {
                      anchorElement: V,
                      hideTimeout: k,
                      timeout: D,
                    } = l.getState(),
                    h = p.current,
                    [L] = N.composedPath(),
                    M = V;
                  if (eI(L, v, M, b)) {
                    (p.current = L && M && Xe(M, L) ? os(N) : null),
                      window.clearTimeout(x.current),
                      (x.current = 0);
                    return;
                  }
                  if (!x.current) {
                    if (h) {
                      let pe = os(N),
                        Se = Mx(v, h);
                      if (Ux(pe, Se)) {
                        if (((p.current = pe), !I(N))) return;
                        N.preventDefault(), N.stopPropagation();
                        return;
                      }
                    }
                    H(N) &&
                      (x.current = window.setTimeout(() => {
                        (x.current = 0), l?.hide();
                      }, k ?? D));
                  }
                },
                !0
              ),
              () => clearTimeout(x.current)
            )
          : void 0;
      }, [l, G, X, W, g, f, b, I, H]),
        (0, Ue.useEffect)(() => {
          if (!X || !W || !f) return;
          let v = (Y) => {
            let N = s.current;
            if (!N) return;
            let V = p.current;
            if (!V) return;
            let k = Mx(N, V);
            if (Ux(os(Y), k)) {
              if (!I(Y)) return;
              Y.preventDefault(), Y.stopPropagation();
            }
          };
          return He(
            Je("mouseenter", v, !0),
            Je("mouseover", v, !0),
            Je("mouseout", v, !0),
            Je("mouseleave", v, !0)
          );
        }, [X, W, f, I]),
        (0, Ue.useEffect)(() => {
          X && (y || l?.setAutoFocusOnShow(!1));
        }, [l, X, y]);
      let B = Fa(y);
      (0, Ue.useEffect)(() => {
        if (X)
          return () => {
            B.current || l?.setAutoFocusOnShow(!1);
          };
      }, [l, X]);
      let F = (0, Ue.useContext)($f);
      ne(() => {
        if (n || !o || !W || !X) return;
        let v = s.current;
        if (v) return F?.(v);
      }, [n, o, W, X]);
      let S = (0, Ue.useCallback)(
        (v) => {
          m((N) => [...N, v]);
          let Y = F?.(v);
          return () => {
            m((N) => N.filter((V) => V !== v)), Y?.();
          };
        },
        [F]
      );
      (i = Ie(
        i,
        (v) =>
          (0, Ex.jsx)(ns, {
            value: l,
            children: (0, Ex.jsx)($f.Provider, { value: S, children: v }),
          }),
        [l, S]
      )),
        (i = w(J({}, i), { ref: ve(s, i.ref) })),
        (i = T1(J({ store: l }, i)));
      let O = l.useState((v) => n || v.autoFocusOnShow);
      return (
        (i = Dx(
          w(J({ store: l, modal: n, portal: o, autoFocusOnShow: O }, i), {
            portalRef: R,
            hideOnEscape(v) {
              return Gn(r, v)
                ? !1
                : (requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      l?.hide();
                    });
                  }),
                  !0);
            },
          })
        )),
        i
      );
    }),
    NQ = lo(
      P(function (t) {
        let c = jx(t);
        return q(L1, c);
      }),
      bu
    );
  var ao = C(A(), 1),
    D1 = "a",
    Px = te(function (t) {
      var c = t,
        { store: l, showOnHover: n = !0 } = c,
        o = _(c, ["store", "showOnHover"]);
      let r = bu();
      (l = l || r), Ce(l, !1);
      let d = Lc(o),
        u = (0, ao.useRef)(0);
      (0, ao.useEffect)(() => () => window.clearTimeout(u.current), []),
        (0, ao.useEffect)(
          () =>
            Je(
              "mouseleave",
              (X) => {
                if (!l) return;
                let { anchorElement: G } = l.getState();
                G &&
                  X.target === G &&
                  (window.clearTimeout(u.current), (u.current = 0));
              },
              !0
            ),
          [l]
        );
      let i = o.onMouseMove,
        a = jt(n),
        s = Va(),
        b = j((R) => {
          if (
            (i?.(R),
            d || !l || R.defaultPrevented || u.current || !s() || !a(R))
          )
            return;
          let X = R.currentTarget;
          l.setAnchorElement(X), l.setDisclosureElement(X);
          let { showTimeout: G, timeout: g } = l.getState(),
            H = () => {
              (u.current = 0),
                s() &&
                  (l?.setAnchorElement(X),
                  l?.show(),
                  queueMicrotask(() => {
                    l?.setDisclosureElement(X);
                  }));
            },
            f = G ?? g;
          f === 0 ? H() : (u.current = window.setTimeout(H, f));
        }),
        m = o.onClick,
        x = j((R) => {
          m?.(R), l && (window.clearTimeout(u.current), (u.current = 0));
        }),
        p = (0, ao.useCallback)(
          (R) => {
            if (!l) return;
            let { anchorElement: X } = l.getState();
            X?.isConnected || l.setAnchorElement(R);
          },
          [l]
        );
      return (
        (o = w(J({}, o), { ref: ve(p, o.ref), onMouseMove: b, onClick: x })),
        (o = Tc(o)),
        o
      );
    }),
    TQ = P(function (t) {
      let c = Px(t);
      return q(D1, c);
    });
  function tI(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = _f(
        ge(ee({}, e), {
          placement: K(e.placement, c?.placement, "top"),
          hideTimeout: K(e.hideTimeout, c?.hideTimeout, 0),
        })
      ),
      n = ge(ee({}, l.getState()), {
        type: K(e.type, c?.type, "description"),
        skipTimeout: K(e.skipTimeout, c?.skipTimeout, 300),
      }),
      o = De(n, l, e.store);
    return ee(ee({}, l), o);
  }
  function cI(e, t, c) {
    return Ze(e, c, "type"), Ze(e, c, "skipTimeout"), qf(e, t, c);
  }
  function mu(e = {}) {
    let [t, c] = Pt(tI, e);
    return cI(t, c, e);
  }
  var Xu = _e([Kf], [ns]),
    M1 = Xu.useContext,
    cA = Xu.useScopedContext,
    xu = Xu.useProviderContext,
    lA = Xu.ContextProvider,
    lI = Xu.ScopedContextProvider;
  var nI = C(E(), 1),
    E1 = "div",
    j1 = te(function (t) {
      var c = t,
        {
          store: l,
          portal: n = !0,
          gutter: o = 8,
          preserveTabOrder: r = !1,
          hideOnHoverOutside: d = !0,
          hideOnInteractOutside: u = !0,
        } = c,
        i = _(c, [
          "store",
          "portal",
          "gutter",
          "preserveTabOrder",
          "hideOnHoverOutside",
          "hideOnInteractOutside",
        ]);
      let a = xu();
      (l = l || a),
        Ce(l, !1),
        (i = Ie(i, (b) => (0, nI.jsx)(lI, { value: l, children: b }), [l]));
      let s = l.useState((b) =>
        b.type === "description" ? "tooltip" : "none"
      );
      return (
        (i = J({ role: s }, i)),
        (i = jx(
          w(J({}, i), {
            store: l,
            portal: n,
            gutter: o,
            preserveTabOrder: r,
            hideOnHoverOutside(b) {
              if (Gn(d, b)) return !1;
              let m = l?.getState().anchorElement;
              return m ? !("focusVisible" in m.dataset) : !0;
            },
            hideOnInteractOutside: (b) => {
              if (Gn(u, b)) return !1;
              let m = l?.getState().anchorElement;
              return m ? !Xe(m, b.target) : !0;
            },
          })
        )),
        i
      );
    }),
    rs = lo(
      P(function (t) {
        let c = j1(t);
        return q(E1, c);
      }),
      xu
    );
  var Gu = C(A(), 1),
    P1 = "div",
    so = De({ activeStore: null });
  function oI(e) {
    return () => {
      let { activeStore: t } = so.getState();
      t === e && so.setState("activeStore", null);
    };
  }
  var K1 = te(function (t) {
      var c = t,
        { store: l, showOnHover: n = !0 } = c,
        o = _(c, ["store", "showOnHover"]);
      let r = xu();
      (l = l || r), Ce(l, !1);
      let d = (0, Gu.useRef)(!1);
      (0, Gu.useEffect)(
        () =>
          Fe(l, ["mounted"], (R) => {
            R.mounted || (d.current = !1);
          }),
        [l]
      ),
        (0, Gu.useEffect)(() => {
          if (l)
            return He(
              oI(l),
              Fe(l, ["mounted", "skipTimeout"], (R) => {
                if (!l) return;
                if (R.mounted) {
                  let { activeStore: G } = so.getState();
                  return G !== l && G?.hide(), so.setState("activeStore", l);
                }
                let X = setTimeout(oI(l), R.skipTimeout);
                return () => clearTimeout(X);
              })
            );
        }, [l]);
      let u = o.onMouseEnter,
        i = j((R) => {
          u?.(R), (d.current = !0);
        }),
        a = o.onFocusVisible,
        s = j((R) => {
          a?.(R),
            !R.defaultPrevented &&
              (l?.setAnchorElement(R.currentTarget), l?.show());
        }),
        b = o.onBlur,
        m = j((R) => {
          if ((b?.(R), R.defaultPrevented)) return;
          let { activeStore: X } = so.getState();
          (d.current = !1), X === l && so.setState("activeStore", null);
        }),
        x = l.useState("type"),
        p = l.useState((R) => {
          var X;
          return (X = R.contentElement) == null ? void 0 : X.id;
        });
      return (
        (o = w(J({ "aria-labelledby": x === "label" ? p : void 0 }, o), {
          onMouseEnter: i,
          onFocusVisible: s,
          onBlur: m,
        })),
        (o = Px(
          J(
            {
              store: l,
              showOnHover(R) {
                if (!d.current || Gn(n, R)) return !1;
                let { activeStore: X } = so.getState();
                return X ? (l?.show(), !1) : !0;
              },
            },
            o
          )
        )),
        o
      );
    }),
    ds = P(function (t) {
      let c = K1(t);
      return q(P1, c);
    });
  var Kx = C(A(), 1),
    pu = _e([sr, Hn], [fn, or]),
    rI = pu.useContext,
    hA = pu.useScopedContext,
    VA = pu.useProviderContext,
    CA = pu.ContextProvider,
    JA = pu.ScopedContextProvider,
    YA = (0, Kx.createContext)(!1),
    NA = (0, Kx.createContext)(null);
  function dI(e = {}) {
    var t = e,
      { composite: c, combobox: l } = t,
      n = Ia(t, ["composite", "combobox"]);
    let o = [
        "items",
        "renderedItems",
        "moves",
        "orientation",
        "virtualFocus",
        "includesBaseElement",
        "baseElement",
        "focusLoop",
        "focusShift",
        "focusWrap",
      ],
      r = qn(n.store, Rn(c, o), Rn(l, o)),
      d = r?.getState(),
      u = sR(
        ge(ee({}, n), {
          store: r,
          includesBaseElement: K(
            n.includesBaseElement,
            d?.includesBaseElement,
            !1
          ),
          orientation: K(n.orientation, d?.orientation, "horizontal"),
          focusLoop: K(n.focusLoop, d?.focusLoop, !0),
        })
      ),
      i = Ja(),
      a = ge(ee({}, u.getState()), {
        selectedId: K(n.selectedId, d?.selectedId, n.defaultSelectedId),
        selectOnMove: K(n.selectOnMove, d?.selectOnMove, !0),
      }),
      s = De(a, u, r);
    xt(s, () =>
      Fe(s, ["moves"], () => {
        let { activeId: x, selectOnMove: p } = s.getState();
        if (!p || !x) return;
        let R = u.item(x);
        R && (R.dimmed || R.disabled || s.setState("selectedId", R.id));
      })
    );
    let b = !0;
    xt(s, () =>
      Zn(s, ["selectedId"], (x, p) => {
        if (!b) {
          b = !0;
          return;
        }
        (c && x.selectedId === p.selectedId) ||
          s.setState("activeId", x.selectedId);
      })
    ),
      xt(s, () =>
        Fe(s, ["selectedId", "renderedItems"], (x) => {
          if (x.selectedId !== void 0) return;
          let { activeId: p, renderedItems: R } = s.getState(),
            X = u.item(p);
          if (X && !X.disabled && !X.dimmed) s.setState("selectedId", X.id);
          else {
            let G = R.find((g) => !g.disabled && !g.dimmed);
            s.setState("selectedId", G?.id);
          }
        })
      ),
      xt(s, () =>
        Fe(s, ["renderedItems"], (x) => {
          let p = x.renderedItems;
          if (p.length)
            return Fe(i, ["renderedItems"], (R) => {
              let X = R.renderedItems;
              X.some((g) => !g.tabId) &&
                X.forEach((g, H) => {
                  if (g.tabId) return;
                  let f = p[H];
                  f && i.renderItem(ge(ee({}, g), { tabId: f.id }));
                });
            });
        })
      );
    let m = null;
    return (
      xt(s, () => {
        let x = () => {
            m = s.getState().selectedId;
          },
          p = () => {
            (b = !1), s.setState("selectedId", m);
          };
        if (c && "setSelectElement" in c)
          return He(Fe(c, ["value"], x), Fe(c, ["mounted"], p));
        if (l) return He(Fe(l, ["selectedValue"], x), Fe(l, ["mounted"], p));
      }),
      ge(ee(ee({}, u), s), {
        panels: i,
        setSelectedId: (x) => s.setState("selectedId", x),
        select: (x) => {
          s.setState("selectedId", x), u.move(x);
        },
      })
    );
  }
  var uI = C(A(), 1);
  function iI(e, t, c) {
    Vl(t, [c.composite, c.combobox]),
      (e = bR(e, t, c)),
      Ze(e, c, "selectedId", "setSelectedId"),
      Ze(e, c, "selectOnMove");
    let [l, n] = Pt(() => e.panels, {});
    return (
      Vl(n, [e, n]),
      Object.assign(
        (0, uI.useMemo)(() => w(J({}, e), { panels: l }), [e, l]),
        { composite: c.composite, combobox: c.combobox }
      )
    );
  }
  function gu(e = {}) {
    let t = RR(),
      c = rI() || t;
    e = w(J({}, e), {
      composite: e.composite !== void 0 ? e.composite : c,
      combobox: e.combobox !== void 0 ? e.combobox : t,
    });
    let [l, n] = Pt(dI, e);
    return iI(l, n, e);
  }
  var Hu = _e([Hn], [or]),
    q1 = Hu.useContext,
    aI = Hu.useScopedContext,
    us = Hu.useProviderContext,
    qA = Hu.ContextProvider,
    is = Hu.ScopedContextProvider;
  var sI = C(A(), 1),
    _x = C(E(), 1),
    $1 = "button",
    e2 = te(function (t) {
      var c = t,
        { store: l, getItem: n } = c,
        o = _(c, ["store", "getItem"]),
        r;
      let d = aI();
      (l = l || d), Ce(l, !1);
      let u = yc(),
        i = o.id || u,
        a = Lc(o),
        s = (0, sI.useCallback)(
          (I) => {
            let y = w(J({}, I), { dimmed: a });
            return n ? n(y) : y;
          },
          [a, n]
        ),
        b = o.onClick,
        m = j((I) => {
          b?.(I), !I.defaultPrevented && l?.setSelectedId(i);
        }),
        x = l.panels.useState((I) => {
          var y;
          return (y = I.items.find((W) => W.tabId === i)) == null
            ? void 0
            : y.id;
        }),
        p = u ? o.shouldRegisterItem : !1,
        R = l.useState((I) => !!i && I.activeId === i),
        X = l.useState((I) => !!i && I.selectedId === i),
        G = l.useState((I) => !!l.item(I.activeId)),
        g = R || (X && !G),
        H = X || ((r = o.accessibleWhenDisabled) != null ? r : !0);
      if (
        (oe(l.combobox || l.composite, "virtualFocus") &&
          (o = w(J({}, o), { tabIndex: -1 })),
        (o = w(
          J(
            {
              "id": i,
              "role": "tab",
              "aria-selected": X,
              "aria-controls": x || void 0,
            },
            o
          ),
          { onClick: m }
        )),
        l.composite)
      ) {
        let I = {
          id: i,
          accessibleWhenDisabled: H,
          store: l.composite,
          shouldRegisterItem: g && p,
          rowId: o.rowId,
          render: o.render,
        };
        o = w(J({}, o), {
          render: (0, _x.jsx)(
            fx,
            w(J({}, I), {
              render:
                l.combobox && l.composite !== l.combobox
                  ? (0, _x.jsx)(fx, w(J({}, I), { store: l.combobox }))
                  : I.render,
            })
          ),
        });
      }
      return (
        (o = Rx(
          w(J({ store: l }, o), {
            accessibleWhenDisabled: H,
            getItem: s,
            shouldRegisterItem: p,
          })
        )),
        o
      );
    }),
    as = Ca(
      P(function (t) {
        let c = e2(t);
        return q($1, c);
      })
    );
  var bI = C(E(), 1),
    t2 = "div",
    c2 = te(function (t) {
      var c = t,
        { store: l } = c,
        n = _(c, ["store"]);
      let o = us();
      (l = l || o), Ce(l, !1);
      let r = l.useState((d) =>
        d.orientation === "both" ? void 0 : d.orientation
      );
      return (
        (n = Ie(n, (d) => (0, bI.jsx)(is, { value: l, children: d }), [l])),
        l.composite && (n = J({ focusable: !1 }, n)),
        (n = J({ "role": "tablist", "aria-orientation": r }, n)),
        (n = Hx(J({ store: l }, n))),
        n
      );
    }),
    ss = P(function (t) {
      let c = c2(t);
      return q(t2, c);
    });
  var al = C(A(), 1),
    mI = C(E(), 1),
    l2 = "div",
    n2 = te(function (t) {
      var c = t,
        {
          store: l,
          unmountOnHide: n,
          tabId: o,
          getItem: r,
          scrollRestoration: d,
          scrollElement: u,
        } = c,
        i = _(c, [
          "store",
          "unmountOnHide",
          "tabId",
          "getItem",
          "scrollRestoration",
          "scrollElement",
        ]);
      let a = us();
      (l = l || a), Ce(l, !1);
      let s = (0, al.useRef)(null),
        b = yc(i.id),
        m = oe(l.panels, () => {
          var W;
          return o || ((W = l?.panels.item(b)) == null ? void 0 : W.tabId);
        }),
        x = oe(l, (W) => !!m && W.selectedId === m),
        p = Ya({ open: x }),
        R = oe(p, "mounted"),
        X = (0, al.useRef)(new Map()),
        G = j(() => {
          let W = s.current;
          return W
            ? u
              ? typeof u == "function"
                ? u(W)
                : "current" in u
                  ? u.current
                  : u
              : W
            : null;
        });
      (0, al.useEffect)(() => {
        var W, B;
        if (!d || !R) return;
        let F = G();
        if (!F) return;
        if (d === "reset") {
          F.scroll(0, 0);
          return;
        }
        if (!m) return;
        let S = X.current.get(m);
        F.scroll((W = S?.x) != null ? W : 0, (B = S?.y) != null ? B : 0);
        let O = () => {
          X.current.set(m, { x: F.scrollLeft, y: F.scrollTop });
        };
        return (
          F.addEventListener("scroll", O),
          () => {
            F.removeEventListener("scroll", O);
          }
        );
      }, [d, R, m, G, l]);
      let [g, H] = (0, al.useState)(!1);
      (0, al.useEffect)(() => {
        let W = s.current;
        if (!W) return;
        let B = to(W);
        H(!!B.length);
      }, []);
      let f = (0, al.useCallback)(
          (W) => {
            let B = w(J({}, W), { id: b || W.id, tabId: o });
            return r ? r(B) : B;
          },
          [b, o, r]
        ),
        I = i.onKeyDown,
        y = j((W) => {
          if ((I?.(W), W.defaultPrevented || !l?.composite)) return;
          let F = {
            ArrowLeft: l.previous,
            ArrowRight: l.next,
            Home: l.first,
            End: l.last,
          }[W.key];
          if (!F) return;
          let { selectedId: S } = l.getState(),
            O = F({ activeId: S });
          O && (W.preventDefault(), l.move(O));
        });
      return (
        (i = Ie(i, (W) => (0, mI.jsx)(is, { value: l, children: W }), [l])),
        (i = w(
          J({ "id": b, "role": "tabpanel", "aria-labelledby": m || void 0 }, i),
          {
            children: n && !R ? null : i.children,
            ref: ve(s, i.ref),
            onKeyDown: y,
          }
        )),
        (i = Tc(J({ focusable: !l.composite && !g }, i))),
        (i = co(J({ store: p }, i))),
        (i = eu(w(J({ store: l.panels }, i), { getItem: f }))),
        i
      );
    }),
    bs = P(function (t) {
      let c = n2(t);
      return q(l2, c);
    });
  var xI = C(E());
  function o2(e) {
    let { shortcut: t, className: c } = e;
    if (!t) return null;
    let l, n;
    return (
      typeof t == "string" && (l = t),
      t !== null &&
        typeof t == "object" &&
        ((l = t.display), (n = t.ariaLabel)),
      (0, xI.jsx)("span", { "className": c, "aria-label": n, "children": l })
    );
  }
  var GI = o2;
  var r2 = {
      "bottom": "bottom",
      "top": "top",
      "middle left": "left",
      "middle right": "right",
      "bottom left": "bottom-end",
      "bottom center": "bottom",
      "bottom right": "bottom-start",
      "top left": "top-end",
      "top center": "top",
      "top right": "top-start",
      "middle left left": "left",
      "middle left right": "left",
      "middle left bottom": "left-end",
      "middle left top": "left-start",
      "middle right left": "right",
      "middle right right": "right",
      "middle right bottom": "right-end",
      "middle right top": "right-start",
      "bottom left left": "bottom-end",
      "bottom left right": "bottom-end",
      "bottom left bottom": "bottom-end",
      "bottom left top": "bottom-end",
      "bottom center left": "bottom",
      "bottom center right": "bottom",
      "bottom center bottom": "bottom",
      "bottom center top": "bottom",
      "bottom right left": "bottom-start",
      "bottom right right": "bottom-start",
      "bottom right bottom": "bottom-start",
      "bottom right top": "bottom-start",
      "top left left": "top-end",
      "top left right": "top-end",
      "top left bottom": "top-end",
      "top left top": "top-end",
      "top center left": "top",
      "top center right": "top",
      "top center bottom": "top",
      "top center top": "top",
      "top right left": "top-start",
      "top right right": "top-start",
      "top right bottom": "top-start",
      "top right top": "top-start",
      "middle": "bottom",
      "middle center": "bottom",
      "middle center bottom": "bottom",
      "middle center left": "bottom",
      "middle center right": "bottom",
      "middle center top": "bottom",
    },
    ms = (e) => {
      var t;
      return (t = r2[e]) !== null && t !== void 0 ? t : "bottom";
    };
  var bo = C(E()),
    pI = (0, Z.createContext)({ isNestedInTooltip: !1 }),
    d2 = 700,
    u2 = { isNestedInTooltip: !0 };
  function i2(e, t) {
    let {
        children: c,
        className: l,
        delay: n = d2,
        hideOnClick: o = !0,
        placement: r,
        position: d,
        shortcut: u,
        text: i,
        ...a
      } = e,
      { isNestedInTooltip: s } = (0, Z.useContext)(pI),
      b = zt(gI, "tooltip"),
      m = i || u ? b : void 0,
      x = Z.Children.count(c) === 1,
      p;
    r !== void 0
      ? (p = r)
      : d !== void 0 &&
        ((p = ms(d)),
        vl("`position` prop in wp.components.tooltip", {
          since: "6.4",
          alternative: "`placement` prop",
        })),
      (p = p || "bottom");
    let R = mu({ placement: p, showTimeout: n }),
      X = oe(R, "mounted");
    if (s) return x ? (0, bo.jsx)(Yl, { ...a, render: c }) : c;
    function G(g) {
      return m &&
        X &&
        g.props["aria-describedby"] === void 0 &&
        g.props["aria-label"] !== i
        ? (0, Z.cloneElement)(g, { "aria-describedby": m })
        : g;
    }
    return (0, bo.jsxs)(pI.Provider, {
      value: u2,
      children: [
        (0, bo.jsx)(ds, {
          onClick: o ? R.hide : void 0,
          store: R,
          render: x ? G(c) : void 0,
          ref: t,
          children: x ? void 0 : c,
        }),
        x &&
          (i || u) &&
          (0, bo.jsxs)(rs, {
            ...a,
            className: Qe("components-tooltip", l),
            unmountOnHide: !0,
            gutter: 4,
            id: m,
            overflowPadding: 0.5,
            store: R,
            children: [
              i,
              u &&
                (0, bo.jsx)(GI, {
                  className: i ? "components-tooltip__shortcut" : "",
                  shortcut: u,
                }),
            ],
          }),
      ],
    });
  }
  var gI = (0, Z.forwardRef)(i2),
    HI = gI;
  var Ny = C(II()),
    zy = C(WI());
  var qx = new Set();
  function I2() {
    return globalThis.SCRIPT_DEBUG === !0;
  }
  function wl(e) {
    if (I2() && !qx.has(e)) {
      console.warn(e);
      try {
        throw Error(e);
      } catch {}
      qx.add(e);
    }
  }
  function Ru(e) {
    return e != null;
  }
  function BI(e = [], t) {
    var c;
    return (c = e.find(Ru)) !== null && c !== void 0 ? c : t;
  }
  var vI = { initial: void 0, fallback: "" };
  function y2(e, t = vI) {
    let { initial: c, fallback: l } = { ...vI, ...t },
      [n, o] = (0, Z.useState)(e),
      r = Ru(e);
    (0, Z.useEffect)(() => {
      r && n && o(void 0);
    }, [r, n]);
    let d = BI([e, n, c], l),
      u = (0, Z.useCallback)(
        (i) => {
          r || o(i);
        },
        [r]
      );
    return [d, u];
  }
  var $x = y2;
  function W2(e, t) {
    let c = (0, Z.useRef)(!1);
    (0, Z.useEffect)(() => {
      if (c.current) return e();
      c.current = !0;
    }, t),
      (0, Z.useEffect)(
        () => () => {
          c.current = !1;
        },
        []
      );
  }
  var fu = W2;
  var Go = C(A()),
    Vu = C(A());
  var B2 = !1;
  function v2(e) {
    if (e.sheet) return e.sheet;
    for (var t = 0; t < document.styleSheets.length; t++)
      if (document.styleSheets[t].ownerNode === e)
        return document.styleSheets[t];
  }
  function F2(e) {
    var t = document.createElement("style");
    return (
      t.setAttribute("data-emotion", e.key),
      e.nonce !== void 0 && t.setAttribute("nonce", e.nonce),
      t.appendChild(document.createTextNode("")),
      t.setAttribute("data-s", ""),
      t
    );
  }
  var FI = (function () {
    function e(c) {
      var l = this;
      (this._insertTag = function (n) {
        var o;
        l.tags.length === 0
          ? l.insertionPoint
            ? (o = l.insertionPoint.nextSibling)
            : l.prepend
              ? (o = l.container.firstChild)
              : (o = l.before)
          : (o = l.tags[l.tags.length - 1].nextSibling),
          l.container.insertBefore(n, o),
          l.tags.push(n);
      }),
        (this.isSpeedy = c.speedy === void 0 ? !B2 : c.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = c.nonce),
        (this.key = c.key),
        (this.container = c.container),
        (this.prepend = c.prepend),
        (this.insertionPoint = c.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (l) {
        l.forEach(this._insertTag);
      }),
      (t.insert = function (l) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
          this._insertTag(F2(this));
        var n = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var o = v2(n);
          try {
            o.insertRule(l, o.cssRules.length);
          } catch {}
        } else n.appendChild(document.createTextNode(l));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (l) {
          var n;
          return (n = l.parentNode) == null ? void 0 : n.removeChild(l);
        }),
          (this.tags = []),
          (this.ctr = 0);
      }),
      e
    );
  })();
  var Gt = "-ms-",
    Iu = "-moz-",
    ie = "-webkit-",
    Xs = "comm",
    Rr = "rule",
    fr = "decl";
  var hI = "@import";
  var xs = "@keyframes";
  var VI = "@layer";
  var CI = Math.abs,
    mo = String.fromCharCode,
    JI = Object.assign;
  function YI(e, t) {
    return Me(e, 0) ^ 45
      ? (((((((t << 2) ^ Me(e, 0)) << 2) ^ Me(e, 1)) << 2) ^ Me(e, 2)) << 2) ^
          Me(e, 3)
      : 0;
  }
  function Gs(e) {
    return e.trim();
  }
  function e0(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function re(e, t, c) {
    return e.replace(t, c);
  }
  function yu(e, t) {
    return e.indexOf(t);
  }
  function Me(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function Wn(e, t, c) {
    return e.slice(t, c);
  }
  function St(e) {
    return e.length;
  }
  function Ir(e) {
    return e.length;
  }
  function yr(e, t) {
    return t.push(e), e;
  }
  function t0(e, t) {
    return e.map(t).join("");
  }
  var ps = 1,
    Wr = 1,
    NI = 0,
    Ot = 0,
    qe = 0,
    vr = "";
  function Wu(e, t, c, l, n, o, r) {
    return {
      value: e,
      root: t,
      parent: c,
      type: l,
      props: n,
      children: o,
      line: ps,
      column: Wr,
      length: r,
      return: "",
    };
  }
  function Fr(e, t) {
    return JI(
      Wu("", null, null, "", null, null, 0),
      e,
      { length: -e.length },
      t
    );
  }
  function zI() {
    return qe;
  }
  function kI() {
    return (
      (qe = Ot > 0 ? Me(vr, --Ot) : 0), Wr--, qe === 10 && ((Wr = 1), ps--), qe
    );
  }
  function Qt() {
    return (
      (qe = Ot < NI ? Me(vr, Ot++) : 0), Wr++, qe === 10 && ((Wr = 1), ps++), qe
    );
  }
  function vc() {
    return Me(vr, Ot);
  }
  function Bu() {
    return Ot;
  }
  function hr(e, t) {
    return Wn(vr, e, t);
  }
  function Br(e) {
    switch (e) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function gs(e) {
    return (ps = Wr = 1), (NI = St((vr = e))), (Ot = 0), [];
  }
  function Hs(e) {
    return (vr = ""), e;
  }
  function Vr(e) {
    return Gs(hr(Ot - 1, c0(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function wI(e) {
    for (; (qe = vc()) && qe < 33; ) Qt();
    return Br(e) > 2 || Br(qe) > 3 ? "" : " ";
  }
  function SI(e, t) {
    for (
      ;
      --t &&
      Qt() &&
      !(qe < 48 || qe > 102 || (qe > 57 && qe < 65) || (qe > 70 && qe < 97));

    );
    return hr(e, Bu() + (t < 6 && vc() == 32 && Qt() == 32));
  }
  function c0(e) {
    for (; Qt(); )
      switch (qe) {
        case e:
          return Ot;
        case 34:
        case 39:
          e !== 34 && e !== 39 && c0(qe);
          break;
        case 40:
          e === 41 && c0(e);
          break;
        case 92:
          Qt();
          break;
      }
    return Ot;
  }
  function OI(e, t) {
    for (; Qt() && e + qe !== 57; ) if (e + qe === 84 && vc() === 47) break;
    return "/*" + hr(t, Ot - 1) + "*" + mo(e === 47 ? e : Qt());
  }
  function QI(e) {
    for (; !Br(vc()); ) Qt();
    return hr(e, Ot);
  }
  function TI(e) {
    return Hs(Zs("", null, null, null, [""], (e = gs(e)), 0, [0], e));
  }
  function Zs(e, t, c, l, n, o, r, d, u) {
    for (
      var i = 0,
        a = 0,
        s = r,
        b = 0,
        m = 0,
        x = 0,
        p = 1,
        R = 1,
        X = 1,
        G = 0,
        g = "",
        H = n,
        f = o,
        I = l,
        y = g;
      R;

    )
      switch (((x = G), (G = Qt()))) {
        case 40:
          if (x != 108 && Me(y, s - 1) == 58) {
            yu((y += re(Vr(G), "&", "&\f")), "&\f") != -1 && (X = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          y += Vr(G);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          y += wI(x);
          break;
        case 92:
          y += SI(Bu() - 1, 7);
          continue;
        case 47:
          switch (vc()) {
            case 42:
            case 47:
              yr(h2(OI(Qt(), Bu()), t, c), u);
              break;
            default:
              y += "/";
          }
          break;
        case 123 * p:
          d[i++] = St(y) * X;
        case 125 * p:
        case 59:
        case 0:
          switch (G) {
            case 0:
            case 125:
              R = 0;
            case 59 + a:
              X == -1 && (y = re(y, /\f/g, "")),
                m > 0 &&
                  St(y) - s &&
                  yr(
                    m > 32
                      ? LI(y + ";", l, c, s - 1)
                      : LI(re(y, " ", "") + ";", l, c, s - 2),
                    u
                  );
              break;
            case 59:
              y += ";";
            default:
              if (
                (yr((I = AI(y, t, c, i, a, n, d, g, (H = []), (f = []), s)), o),
                G === 123)
              )
                if (a === 0) Zs(y, t, I, I, H, o, s, d, f);
                else
                  switch (b === 99 && Me(y, 3) === 110 ? 100 : b) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      Zs(
                        e,
                        I,
                        I,
                        l && yr(AI(e, I, I, 0, 0, n, d, g, n, (H = []), s), f),
                        n,
                        f,
                        s,
                        d,
                        l ? H : f
                      );
                      break;
                    default:
                      Zs(y, I, I, I, [""], f, 0, d, f);
                  }
          }
          (i = a = m = 0), (p = X = 1), (g = y = ""), (s = r);
          break;
        case 58:
          (s = 1 + St(y)), (m = x);
        default:
          if (p < 1) {
            if (G == 123) --p;
            else if (G == 125 && p++ == 0 && kI() == 125) continue;
          }
          switch (((y += mo(G)), G * p)) {
            case 38:
              X = a > 0 ? 1 : ((y += "\f"), -1);
              break;
            case 44:
              (d[i++] = (St(y) - 1) * X), (X = 1);
              break;
            case 64:
              vc() === 45 && (y += Vr(Qt())),
                (b = vc()),
                (a = s = St((g = y += QI(Bu())))),
                G++;
              break;
            case 45:
              x === 45 && St(y) == 2 && (p = 0);
          }
      }
    return o;
  }
  function AI(e, t, c, l, n, o, r, d, u, i, a) {
    for (
      var s = n - 1, b = n === 0 ? o : [""], m = Ir(b), x = 0, p = 0, R = 0;
      x < l;
      ++x
    )
      for (var X = 0, G = Wn(e, s + 1, (s = CI((p = r[x])))), g = e; X < m; ++X)
        (g = Gs(p > 0 ? b[X] + " " + G : re(G, /&\f/g, b[X]))) && (u[R++] = g);
    return Wu(e, t, c, n === 0 ? Rr : d, u, i, a);
  }
  function h2(e, t, c) {
    return Wu(e, t, c, Xs, mo(zI()), Wn(e, 2, -2), 0);
  }
  function LI(e, t, c, l) {
    return Wu(e, t, c, fr, Wn(e, 0, l), Wn(e, l + 1, -1), l);
  }
  function Xo(e, t) {
    for (var c = "", l = Ir(e), n = 0; n < l; n++) c += t(e[n], n, e, t) || "";
    return c;
  }
  function DI(e, t, c, l) {
    switch (e.type) {
      case VI:
        if (e.children.length) break;
      case hI:
      case fr:
        return (e.return = e.return || e.value);
      case Xs:
        return "";
      case xs:
        return (e.return = e.value + "{" + Xo(e.children, l) + "}");
      case Rr:
        e.value = e.props.join(",");
    }
    return St((c = Xo(e.children, l)))
      ? (e.return = e.value + "{" + c + "}")
      : "";
  }
  function UI(e) {
    var t = Ir(e);
    return function (c, l, n, o) {
      for (var r = "", d = 0; d < t; d++) r += e[d](c, l, n, o) || "";
      return r;
    };
  }
  function MI(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  fs();
  var V2 = function (t, c, l) {
      for (
        var n = 0, o = 0;
        (n = o), (o = vc()), n === 38 && o === 12 && (c[l] = 1), !Br(o);

      )
        Qt();
      return hr(t, Ot);
    },
    C2 = function (t, c) {
      var l = -1,
        n = 44;
      do
        switch (Br(n)) {
          case 0:
            n === 38 && vc() === 12 && (c[l] = 1), (t[l] += V2(Ot - 1, c, l));
            break;
          case 2:
            t[l] += Vr(n);
            break;
          case 4:
            if (n === 44) {
              (t[++l] = vc() === 58 ? "&\f" : ""), (c[l] = t[l].length);
              break;
            }
          default:
            t[l] += mo(n);
        }
      while ((n = Qt()));
      return t;
    },
    J2 = function (t, c) {
      return Hs(C2(gs(t), c));
    },
    EI = new WeakMap(),
    Y2 = function (t) {
      if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
        for (
          var c = t.value,
            l = t.parent,
            n = t.column === l.column && t.line === l.line;
          l.type !== "rule";

        )
          if (((l = l.parent), !l)) return;
        if (
          !(t.props.length === 1 && c.charCodeAt(0) !== 58 && !EI.get(l)) &&
          !n
        ) {
          EI.set(t, !0);
          for (
            var o = [], r = J2(c, o), d = l.props, u = 0, i = 0;
            u < r.length;
            u++
          )
            for (var a = 0; a < d.length; a++, i++)
              t.props[i] = o[u]
                ? r[u].replace(/&\f/g, d[a])
                : d[a] + " " + r[u];
        }
      }
    },
    N2 = function (t) {
      if (t.type === "decl") {
        var c = t.value;
        c.charCodeAt(0) === 108 &&
          c.charCodeAt(2) === 98 &&
          ((t.return = ""), (t.value = ""));
      }
    };
  function jI(e, t) {
    switch (YI(e, t)) {
      case 5103:
        return ie + "print-" + e + e;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return ie + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return ie + e + Iu + e + Gt + e + e;
      case 6828:
      case 4268:
        return ie + e + Gt + e + e;
      case 6165:
        return ie + e + Gt + "flex-" + e + e;
      case 5187:
        return (
          ie +
          e +
          re(e, /(\w+).+(:[^]+)/, ie + "box-$1$2" + Gt + "flex-$1$2") +
          e
        );
      case 5443:
        return ie + e + Gt + "flex-item-" + re(e, /flex-|-self/, "") + e;
      case 4675:
        return (
          ie +
          e +
          Gt +
          "flex-line-pack" +
          re(e, /align-content|flex-|-self/, "") +
          e
        );
      case 5548:
        return ie + e + Gt + re(e, "shrink", "negative") + e;
      case 5292:
        return ie + e + Gt + re(e, "basis", "preferred-size") + e;
      case 6060:
        return (
          ie +
          "box-" +
          re(e, "-grow", "") +
          ie +
          e +
          Gt +
          re(e, "grow", "positive") +
          e
        );
      case 4554:
        return ie + re(e, /([^-])(transform)/g, "$1" + ie + "$2") + e;
      case 6187:
        return (
          re(
            re(re(e, /(zoom-|grab)/, ie + "$1"), /(image-set)/, ie + "$1"),
            e,
            ""
          ) + e
        );
      case 5495:
      case 3959:
        return re(e, /(image-set\([^]*)/, ie + "$1$`$1");
      case 4968:
        return (
          re(
            re(
              e,
              /(.+:)(flex-)?(.*)/,
              ie + "box-pack:$3" + Gt + "flex-pack:$3"
            ),
            /s.+-b[^;]+/,
            "justify"
          ) +
          ie +
          e +
          e
        );
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return re(e, /(.+)-inline(.+)/, ie + "$1$2") + e;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (St(e) - 1 - t > 6)
          switch (Me(e, t + 1)) {
            case 109:
              if (Me(e, t + 4) !== 45) break;
            case 102:
              return (
                re(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  "$1" +
                    ie +
                    "$2-$3$1" +
                    Iu +
                    (Me(e, t + 3) == 108 ? "$3" : "$2-$3")
                ) + e
              );
            case 115:
              return ~yu(e, "stretch")
                ? jI(re(e, "stretch", "fill-available"), t) + e
                : e;
          }
        break;
      case 4949:
        if (Me(e, t + 1) !== 115) break;
      case 6444:
        switch (Me(e, St(e) - 3 - (~yu(e, "!important") && 10))) {
          case 107:
            return re(e, ":", ":" + ie) + e;
          case 101:
            return (
              re(
                e,
                /(.+:)([^;!]+)(;|!.+)?/,
                "$1" +
                  ie +
                  (Me(e, 14) === 45 ? "inline-" : "") +
                  "box$3$1" +
                  ie +
                  "$2$3$1" +
                  Gt +
                  "$2box$3"
              ) + e
            );
        }
        break;
      case 5936:
        switch (Me(e, t + 11)) {
          case 114:
            return ie + e + Gt + re(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
          case 108:
            return ie + e + Gt + re(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
          case 45:
            return ie + e + Gt + re(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
        }
        return ie + e + Gt + e + e;
    }
    return e;
  }
  var z2 = function (t, c, l, n) {
      if (t.length > -1 && !t.return)
        switch (t.type) {
          case fr:
            t.return = jI(t.value, t.length);
            break;
          case xs:
            return Xo([Fr(t, { value: re(t.value, "@", "@" + ie) })], n);
          case Rr:
            if (t.length)
              return t0(t.props, function (o) {
                switch (e0(o, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return Xo(
                      [
                        Fr(t, {
                          props: [re(o, /:(read-\w+)/, ":" + Iu + "$1")],
                        }),
                      ],
                      n
                    );
                  case "::placeholder":
                    return Xo(
                      [
                        Fr(t, {
                          props: [re(o, /:(plac\w+)/, ":" + ie + "input-$1")],
                        }),
                        Fr(t, {
                          props: [re(o, /:(plac\w+)/, ":" + Iu + "$1")],
                        }),
                        Fr(t, {
                          props: [re(o, /:(plac\w+)/, Gt + "input-$1")],
                        }),
                      ],
                      n
                    );
                }
                return "";
              });
        }
    },
    k2 = [z2],
    Cr = function (t) {
      var c = t.key;
      if (c === "css") {
        var l = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(l, function (p) {
          var R = p.getAttribute("data-emotion");
          R.indexOf(" ") !== -1 &&
            (document.head.appendChild(p), p.setAttribute("data-s", ""));
        });
      }
      var n = t.stylisPlugins || k2,
        o = {},
        r,
        d = [];
      (r = t.container || document.head),
        Array.prototype.forEach.call(
          document.querySelectorAll('style[data-emotion^="' + c + ' "]'),
          function (p) {
            for (
              var R = p.getAttribute("data-emotion").split(" "), X = 1;
              X < R.length;
              X++
            )
              o[R[X]] = !0;
            d.push(p);
          }
        );
      var u,
        i = [Y2, N2];
      {
        var a,
          s = [
            DI,
            MI(function (p) {
              a.insert(p);
            }),
          ],
          b = UI(i.concat(n, s)),
          m = function (R) {
            return Xo(TI(R), b);
          };
        u = function (R, X, G, g) {
          (a = G),
            m(R ? R + "{" + X.styles + "}" : X.styles),
            g && (x.inserted[X.name] = !0);
        };
      }
      var x = {
        key: c,
        sheet: new FI({
          key: c,
          container: r,
          nonce: t.nonce,
          speedy: t.speedy,
          prepend: t.prepend,
          insertionPoint: t.insertionPoint,
        }),
        nonce: t.nonce,
        inserted: o,
        registered: {},
        insert: u,
      };
      return x.sheet.hydrate(d), x;
    };
  function vu() {
    return (
      (vu = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var c = arguments[t];
              for (var l in c) ({}).hasOwnProperty.call(c, l) && (e[l] = c[l]);
            }
            return e;
          }),
      vu.apply(null, arguments)
    );
  }
  var P2 = !0;
  function xo(e, t, c) {
    var l = "";
    return (
      c.split(" ").forEach(function (n) {
        e[n] !== void 0 ? t.push(e[n] + ";") : n && (l += n + " ");
      }),
      l
    );
  }
  var Fu = function (t, c, l) {
      var n = t.key + "-" + c.name;
      (l === !1 || P2 === !1) &&
        t.registered[n] === void 0 &&
        (t.registered[n] = c.styles);
    },
    Bn = function (t, c, l) {
      Fu(t, c, l);
      var n = t.key + "-" + c.name;
      if (t.inserted[c.name] === void 0) {
        var o = c;
        do t.insert(c === o ? "." + n : "", o, t.sheet, !0), (o = o.next);
        while (o !== void 0);
      }
    };
  function ry(e) {
    for (var t = 0, c, l = 0, n = e.length; n >= 4; ++l, n -= 4)
      (c =
        (e.charCodeAt(l) & 255) |
        ((e.charCodeAt(++l) & 255) << 8) |
        ((e.charCodeAt(++l) & 255) << 16) |
        ((e.charCodeAt(++l) & 255) << 24)),
        (c = (c & 65535) * 1540483477 + (((c >>> 16) * 59797) << 16)),
        (c ^= c >>> 24),
        (t =
          ((c & 65535) * 1540483477 + (((c >>> 16) * 59797) << 16)) ^
          ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
    switch (n) {
      case 3:
        t ^= (e.charCodeAt(l + 2) & 255) << 16;
      case 2:
        t ^= (e.charCodeAt(l + 1) & 255) << 8;
      case 1:
        (t ^= e.charCodeAt(l) & 255),
          (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
    }
    return (
      (t ^= t >>> 13),
      (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
      ((t ^ (t >>> 15)) >>> 0).toString(36)
    );
  }
  var dy = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  };
  fs();
  var K2 = !1,
    _2 = /[A-Z]|^ms/g,
    q2 = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
    sy = function (t) {
      return t.charCodeAt(1) === 45;
    },
    uy = function (t) {
      return t != null && typeof t != "boolean";
    },
    u0 = Rs(function (e) {
      return sy(e) ? e : e.replace(_2, "-$&").toLowerCase();
    }),
    iy = function (t, c) {
      switch (t) {
        case "animation":
        case "animationName":
          if (typeof c == "string")
            return c.replace(q2, function (l, n, o) {
              return (sl = { name: n, styles: o, next: sl }), n;
            });
      }
      return dy[t] !== 1 && !sy(t) && typeof c == "number" && c !== 0
        ? c + "px"
        : c;
    },
    $2 =
      "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function hu(e, t, c) {
    if (c == null) return "";
    var l = c;
    if (l.__emotion_styles !== void 0) return l;
    switch (typeof c) {
      case "boolean":
        return "";
      case "object": {
        var n = c;
        if (n.anim === 1)
          return (sl = { name: n.name, styles: n.styles, next: sl }), n.name;
        var o = c;
        if (o.styles !== void 0) {
          var r = o.next;
          if (r !== void 0)
            for (; r !== void 0; )
              (sl = { name: r.name, styles: r.styles, next: sl }), (r = r.next);
          var d = o.styles + ";";
          return d;
        }
        return eV(e, t, c);
      }
      case "function": {
        if (e !== void 0) {
          var u = sl,
            i = c(e);
          return (sl = u), hu(e, t, i);
        }
        break;
      }
    }
    var a = c;
    if (t == null) return a;
    var s = t[a];
    return s !== void 0 ? s : a;
  }
  function eV(e, t, c) {
    var l = "";
    if (Array.isArray(c))
      for (var n = 0; n < c.length; n++) l += hu(e, t, c[n]) + ";";
    else
      for (var o in c) {
        var r = c[o];
        if (typeof r != "object") {
          var d = r;
          t != null && t[d] !== void 0
            ? (l += o + "{" + t[d] + "}")
            : uy(d) && (l += u0(o) + ":" + iy(o, d) + ";");
        } else {
          if (o === "NO_COMPONENT_SELECTOR" && K2) throw new Error($2);
          if (
            Array.isArray(r) &&
            typeof r[0] == "string" &&
            (t == null || t[r[0]] === void 0)
          )
            for (var u = 0; u < r.length; u++)
              uy(r[u]) && (l += u0(o) + ":" + iy(o, r[u]) + ";");
          else {
            var i = hu(e, t, r);
            switch (o) {
              case "animation":
              case "animationName": {
                l += u0(o) + ":" + i + ";";
                break;
              }
              default:
                l += o + "{" + i + "}";
            }
          }
        }
      }
    return l;
  }
  var ay = /label:\s*([^\s;{]+)\s*(;|$)/g,
    sl;
  function Sl(e, t, c) {
    if (
      e.length === 1 &&
      typeof e[0] == "object" &&
      e[0] !== null &&
      e[0].styles !== void 0
    )
      return e[0];
    var l = !0,
      n = "";
    sl = void 0;
    var o = e[0];
    if (o == null || o.raw === void 0) (l = !1), (n += hu(c, t, o));
    else {
      var r = o;
      n += r[0];
    }
    for (var d = 1; d < e.length; d++)
      if (((n += hu(c, t, e[d])), l)) {
        var u = o;
        n += u[d];
      }
    ay.lastIndex = 0;
    for (var i = "", a; (a = ay.exec(n)) !== null; ) i += "-" + a[1];
    var s = ry(n) + i;
    return { name: s, styles: n, next: sl };
  }
  var Ys = C(A()),
    tV = function (t) {
      return t();
    },
    cV = Ys.useInsertionEffect ? Ys.useInsertionEffect : !1,
    Ns = cV || tV;
  var i0 = Go.createContext(
      typeof HTMLElement < "u" ? Cr({ key: "css" }) : null
    ),
    a0 = i0.Provider,
    s0 = function () {
      return (0, Vu.useContext)(i0);
    },
    b0 = function (t) {
      return (0, Vu.forwardRef)(function (c, l) {
        var n = (0, Vu.useContext)(i0);
        return t(c, n, l);
      });
    },
    m0 = Go.createContext({});
  var eD = {}.hasOwnProperty;
  var zs = C(A());
  var bD = C(oy());
  function U() {
    for (var e = arguments.length, t = new Array(e), c = 0; c < e; c++)
      t[c] = arguments[c];
    return Sl(t);
  }
  function by(e, t) {
    if (e.inserted[t.name] === void 0) return e.insert("", t, e.sheet, !0);
  }
  function my(e, t, c) {
    var l = [],
      n = xo(e, l, c);
    return l.length < 2 ? c : n + t(l);
  }
  var Xy = function (t) {
      var c = Cr(t);
      (c.sheet.speedy = function (d) {
        this.isSpeedy = d;
      }),
        (c.compat = !0);
      var l = function () {
          for (var u = arguments.length, i = new Array(u), a = 0; a < u; a++)
            i[a] = arguments[a];
          var s = Sl(i, c.registered, void 0);
          return Bn(c, s, !1), c.key + "-" + s.name;
        },
        n = function () {
          for (var u = arguments.length, i = new Array(u), a = 0; a < u; a++)
            i[a] = arguments[a];
          var s = Sl(i, c.registered),
            b = "animation-" + s.name;
          return (
            by(c, {
              name: s.name,
              styles: "@keyframes " + b + "{" + s.styles + "}",
            }),
            b
          );
        },
        o = function () {
          for (var u = arguments.length, i = new Array(u), a = 0; a < u; a++)
            i[a] = arguments[a];
          var s = Sl(i, c.registered);
          by(c, s);
        },
        r = function () {
          for (var u = arguments.length, i = new Array(u), a = 0; a < u; a++)
            i[a] = arguments[a];
          return my(c.registered, l, lV(i));
        };
      return {
        css: l,
        cx: r,
        injectGlobal: o,
        keyframes: n,
        hydrate: function (u) {
          u.forEach(function (i) {
            c.inserted[i] = !0;
          });
        },
        flush: function () {
          (c.registered = {}), (c.inserted = {}), c.sheet.flush();
        },
        sheet: c.sheet,
        cache: c,
        getRegisteredStyles: xo.bind(null, c.registered),
        merge: my.bind(null, c.registered, l),
      };
    },
    lV = function e(t) {
      for (var c = "", l = 0; l < t.length; l++) {
        var n = t[l];
        if (n != null) {
          var o = void 0;
          switch (typeof n) {
            case "boolean":
              break;
            case "object": {
              if (Array.isArray(n)) o = e(n);
              else {
                o = "";
                for (var r in n) n[r] && r && (o && (o += " "), (o += r));
              }
              break;
            }
            default:
              o = n;
          }
          o && (c && (c += " "), (c += o));
        }
      }
      return c;
    };
  var bl = Xy({ key: "css" }),
    ID = bl.flush,
    yD = bl.hydrate,
    xy = bl.cx,
    WD = bl.merge,
    BD = bl.getRegisteredStyles,
    vD = bl.injectGlobal,
    FD = bl.keyframes,
    hD = bl.css,
    VD = bl.sheet,
    CD = bl.cache;
  var nV = (e) =>
      typeof e < "u" &&
      e !== null &&
      ["name", "styles"].every((t) => typeof e[t] < "u"),
    Xc = () => {
      let e = s0();
      return (0, Z.useCallback)(
        (...c) => {
          if (e === null)
            throw new Error(
              "The `useCx` hook should be only used within a valid Emotion Cache Context"
            );
          return xy(
            ...c.map((l) => (nV(l) ? (Bn(e, l, !1), `${e.key}-${l.name}`) : l))
          );
        },
        [e]
      );
    };
  var X0 = {
    name: "kv6lnz",
    styles: "box-sizing:border-box;*,*::before,*::after{box-sizing:inherit;}",
  };
  var oV = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
    Ol = function (e) {
      return typeof e == "string" ? e.length > 0 : typeof e == "number";
    },
    ut = function (e, t, c) {
      return (
        t === void 0 && (t = 0),
        c === void 0 && (c = Math.pow(10, t)),
        Math.round(c * e) / c + 0
      );
    },
    hc = function (e, t, c) {
      return (
        t === void 0 && (t = 0),
        c === void 0 && (c = 1),
        e > c ? c : e > t ? e : t
      );
    },
    Iy = function (e) {
      return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
    },
    Gy = function (e) {
      return {
        r: hc(e.r, 0, 255),
        g: hc(e.g, 0, 255),
        b: hc(e.b, 0, 255),
        a: hc(e.a),
      };
    },
    x0 = function (e) {
      return { r: ut(e.r), g: ut(e.g), b: ut(e.b), a: ut(e.a, 3) };
    },
    rV = /^#([0-9a-f]{3,8})$/i,
    ks = function (e) {
      var t = e.toString(16);
      return t.length < 2 ? "0" + t : t;
    },
    yy = function (e) {
      var t = e.r,
        c = e.g,
        l = e.b,
        n = e.a,
        o = Math.max(t, c, l),
        r = o - Math.min(t, c, l),
        d = r
          ? o === t
            ? (c - l) / r
            : o === c
              ? 2 + (l - t) / r
              : 4 + (t - c) / r
          : 0;
      return {
        h: 60 * (d < 0 ? d + 6 : d),
        s: o ? (r / o) * 100 : 0,
        v: (o / 255) * 100,
        a: n,
      };
    },
    Wy = function (e) {
      var t = e.h,
        c = e.s,
        l = e.v,
        n = e.a;
      (t = (t / 360) * 6), (c /= 100), (l /= 100);
      var o = Math.floor(t),
        r = l * (1 - c),
        d = l * (1 - (t - o) * c),
        u = l * (1 - (1 - t + o) * c),
        i = o % 6;
      return {
        r: 255 * [l, d, r, r, u, l][i],
        g: 255 * [u, l, l, d, r, r][i],
        b: 255 * [r, r, u, l, l, d][i],
        a: n,
      };
    },
    py = function (e) {
      return { h: Iy(e.h), s: hc(e.s, 0, 100), l: hc(e.l, 0, 100), a: hc(e.a) };
    },
    gy = function (e) {
      return { h: ut(e.h), s: ut(e.s), l: ut(e.l), a: ut(e.a, 3) };
    },
    Hy = function (e) {
      return Wy(
        ((c = (t = e).s),
        {
          h: t.h,
          s:
            (c *= ((l = t.l) < 50 ? l : 100 - l) / 100) > 0
              ? ((2 * c) / (l + c)) * 100
              : 0,
          v: l + c,
          a: t.a,
        })
      );
      var t, c, l;
    },
    Cu = function (e) {
      return {
        h: (t = yy(e)).h,
        s:
          (n = ((200 - (c = t.s)) * (l = t.v)) / 100) > 0 && n < 200
            ? ((c * l) / 100 / (n <= 100 ? n : 200 - n)) * 100
            : 0,
        l: n / 2,
        a: t.a,
      };
      var t, c, l, n;
    },
    dV =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    uV =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    iV =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    aV =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    g0 = {
      string: [
        [
          function (e) {
            var t = rV.exec(e);
            return t
              ? (e = t[1]).length <= 4
                ? {
                    r: parseInt(e[0] + e[0], 16),
                    g: parseInt(e[1] + e[1], 16),
                    b: parseInt(e[2] + e[2], 16),
                    a:
                      e.length === 4
                        ? ut(parseInt(e[3] + e[3], 16) / 255, 2)
                        : 1,
                  }
                : e.length === 6 || e.length === 8
                  ? {
                      r: parseInt(e.substr(0, 2), 16),
                      g: parseInt(e.substr(2, 2), 16),
                      b: parseInt(e.substr(4, 2), 16),
                      a:
                        e.length === 8
                          ? ut(parseInt(e.substr(6, 2), 16) / 255, 2)
                          : 1,
                    }
                  : null
              : null;
          },
          "hex",
        ],
        [
          function (e) {
            var t = iV.exec(e) || aV.exec(e);
            return t
              ? t[2] !== t[4] || t[4] !== t[6]
                ? null
                : Gy({
                    r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                    g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                    b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                    a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1),
                  })
              : null;
          },
          "rgb",
        ],
        [
          function (e) {
            var t = dV.exec(e) || uV.exec(e);
            if (!t) return null;
            var c,
              l,
              n = py({
                h:
                  ((c = t[1]),
                  (l = t[2]),
                  l === void 0 && (l = "deg"),
                  Number(c) * (oV[l] || 1)),
                s: Number(t[3]),
                l: Number(t[4]),
                a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
              });
            return Hy(n);
          },
          "hsl",
        ],
      ],
      object: [
        [
          function (e) {
            var t = e.r,
              c = e.g,
              l = e.b,
              n = e.a,
              o = n === void 0 ? 1 : n;
            return Ol(t) && Ol(c) && Ol(l)
              ? Gy({ r: Number(t), g: Number(c), b: Number(l), a: Number(o) })
              : null;
          },
          "rgb",
        ],
        [
          function (e) {
            var t = e.h,
              c = e.s,
              l = e.l,
              n = e.a,
              o = n === void 0 ? 1 : n;
            if (!Ol(t) || !Ol(c) || !Ol(l)) return null;
            var r = py({
              h: Number(t),
              s: Number(c),
              l: Number(l),
              a: Number(o),
            });
            return Hy(r);
          },
          "hsl",
        ],
        [
          function (e) {
            var t = e.h,
              c = e.s,
              l = e.v,
              n = e.a,
              o = n === void 0 ? 1 : n;
            if (!Ol(t) || !Ol(c) || !Ol(l)) return null;
            var r = (function (d) {
              return {
                h: Iy(d.h),
                s: hc(d.s, 0, 100),
                v: hc(d.v, 0, 100),
                a: hc(d.a),
              };
            })({ h: Number(t), s: Number(c), v: Number(l), a: Number(o) });
            return Wy(r);
          },
          "hsv",
        ],
      ],
    },
    Zy = function (e, t) {
      for (var c = 0; c < t.length; c++) {
        var l = t[c][0](e);
        if (l) return [l, t[c][1]];
      }
      return [null, void 0];
    },
    sV = function (e) {
      return typeof e == "string"
        ? Zy(e.trim(), g0.string)
        : typeof e == "object" && e !== null
          ? Zy(e, g0.object)
          : [null, void 0];
    };
  var G0 = function (e, t) {
      var c = Cu(e);
      return { h: c.h, s: hc(c.s + 100 * t, 0, 100), l: c.l, a: c.a };
    },
    p0 = function (e) {
      return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
    },
    Ry = function (e, t) {
      var c = Cu(e);
      return { h: c.h, s: c.s, l: hc(c.l + 100 * t, 0, 100), a: c.a };
    },
    H0 = (function () {
      function e(t) {
        (this.parsed = sV(t)[0]),
          (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
      }
      return (
        (e.prototype.isValid = function () {
          return this.parsed !== null;
        }),
        (e.prototype.brightness = function () {
          return ut(p0(this.rgba), 2);
        }),
        (e.prototype.isDark = function () {
          return p0(this.rgba) < 0.5;
        }),
        (e.prototype.isLight = function () {
          return p0(this.rgba) >= 0.5;
        }),
        (e.prototype.toHex = function () {
          return (
            (t = x0(this.rgba)),
            (c = t.r),
            (l = t.g),
            (n = t.b),
            (r = (o = t.a) < 1 ? ks(ut(255 * o)) : ""),
            "#" + ks(c) + ks(l) + ks(n) + r
          );
          var t, c, l, n, o, r;
        }),
        (e.prototype.toRgb = function () {
          return x0(this.rgba);
        }),
        (e.prototype.toRgbString = function () {
          return (
            (t = x0(this.rgba)),
            (c = t.r),
            (l = t.g),
            (n = t.b),
            (o = t.a) < 1
              ? "rgba(" + c + ", " + l + ", " + n + ", " + o + ")"
              : "rgb(" + c + ", " + l + ", " + n + ")"
          );
          var t, c, l, n, o;
        }),
        (e.prototype.toHsl = function () {
          return gy(Cu(this.rgba));
        }),
        (e.prototype.toHslString = function () {
          return (
            (t = gy(Cu(this.rgba))),
            (c = t.h),
            (l = t.s),
            (n = t.l),
            (o = t.a) < 1
              ? "hsla(" + c + ", " + l + "%, " + n + "%, " + o + ")"
              : "hsl(" + c + ", " + l + "%, " + n + "%)"
          );
          var t, c, l, n, o;
        }),
        (e.prototype.toHsv = function () {
          return (
            (t = yy(this.rgba)),
            { h: ut(t.h), s: ut(t.s), v: ut(t.v), a: ut(t.a, 3) }
          );
          var t;
        }),
        (e.prototype.invert = function () {
          return Fc({
            r: 255 - (t = this.rgba).r,
            g: 255 - t.g,
            b: 255 - t.b,
            a: t.a,
          });
          var t;
        }),
        (e.prototype.saturate = function (t) {
          return t === void 0 && (t = 0.1), Fc(G0(this.rgba, t));
        }),
        (e.prototype.desaturate = function (t) {
          return t === void 0 && (t = 0.1), Fc(G0(this.rgba, -t));
        }),
        (e.prototype.grayscale = function () {
          return Fc(G0(this.rgba, -1));
        }),
        (e.prototype.lighten = function (t) {
          return t === void 0 && (t = 0.1), Fc(Ry(this.rgba, t));
        }),
        (e.prototype.darken = function (t) {
          return t === void 0 && (t = 0.1), Fc(Ry(this.rgba, -t));
        }),
        (e.prototype.rotate = function (t) {
          return t === void 0 && (t = 15), this.hue(this.hue() + t);
        }),
        (e.prototype.alpha = function (t) {
          return typeof t == "number"
            ? Fc({ r: (c = this.rgba).r, g: c.g, b: c.b, a: t })
            : ut(this.rgba.a, 3);
          var c;
        }),
        (e.prototype.hue = function (t) {
          var c = Cu(this.rgba);
          return typeof t == "number"
            ? Fc({ h: t, s: c.s, l: c.l, a: c.a })
            : ut(c.h);
        }),
        (e.prototype.isEqual = function (t) {
          return this.toHex() === Fc(t).toHex();
        }),
        e
      );
    })(),
    Fc = function (e) {
      return e instanceof H0 ? e : new H0(e);
    },
    fy = [],
    By = function (e) {
      e.forEach(function (t) {
        fy.indexOf(t) < 0 && (t(H0, g0), fy.push(t));
      });
    };
  function vy(e, t) {
    var c = {
        white: "#ffffff",
        bisque: "#ffe4c4",
        blue: "#0000ff",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        azure: "#f0ffff",
        whitesmoke: "#f5f5f5",
        papayawhip: "#ffefd5",
        plum: "#dda0dd",
        blanchedalmond: "#ffebcd",
        black: "#000000",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gainsboro: "#dcdcdc",
        cornsilk: "#fff8dc",
        cornflowerblue: "#6495ed",
        burlywood: "#deb887",
        aquamarine: "#7fffd4",
        beige: "#f5f5dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkkhaki: "#bdb76b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        peachpuff: "#ffdab9",
        darkmagenta: "#8b008b",
        darkred: "#8b0000",
        darkorchid: "#9932cc",
        darkorange: "#ff8c00",
        darkslateblue: "#483d8b",
        gray: "#808080",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        wheat: "#f5deb3",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        ghostwhite: "#f8f8ff",
        darkviolet: "#9400d3",
        magenta: "#ff00ff",
        green: "#008000",
        dodgerblue: "#1e90ff",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        blueviolet: "#8a2be2",
        forestgreen: "#228b22",
        lawngreen: "#7cfc00",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        fuchsia: "#ff00ff",
        brown: "#a52a2a",
        maroon: "#800000",
        mediumblue: "#0000cd",
        lightcoral: "#f08080",
        darkturquoise: "#00ced1",
        lightcyan: "#e0ffff",
        ivory: "#fffff0",
        lightyellow: "#ffffe0",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        linen: "#faf0e6",
        mediumaquamarine: "#66cdaa",
        lemonchiffon: "#fffacd",
        lime: "#00ff00",
        khaki: "#f0e68c",
        mediumseagreen: "#3cb371",
        limegreen: "#32cd32",
        mediumspringgreen: "#00fa9a",
        lightskyblue: "#87cefa",
        lightblue: "#add8e6",
        midnightblue: "#191970",
        lightpink: "#ffb6c1",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        mintcream: "#f5fffa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        navajowhite: "#ffdead",
        navy: "#000080",
        mediumvioletred: "#c71585",
        powderblue: "#b0e0e6",
        palegoldenrod: "#eee8aa",
        oldlace: "#fdf5e6",
        paleturquoise: "#afeeee",
        mediumturquoise: "#48d1cc",
        mediumorchid: "#ba55d3",
        rebeccapurple: "#663399",
        lightsteelblue: "#b0c4de",
        mediumslateblue: "#7b68ee",
        thistle: "#d8bfd8",
        tan: "#d2b48c",
        orchid: "#da70d6",
        mediumpurple: "#9370db",
        purple: "#800080",
        pink: "#ffc0cb",
        skyblue: "#87ceeb",
        springgreen: "#00ff7f",
        palegreen: "#98fb98",
        red: "#ff0000",
        yellow: "#ffff00",
        slateblue: "#6a5acd",
        lavenderblush: "#fff0f5",
        peru: "#cd853f",
        palevioletred: "#db7093",
        violet: "#ee82ee",
        teal: "#008080",
        slategray: "#708090",
        slategrey: "#708090",
        aliceblue: "#f0f8ff",
        darkseagreen: "#8fbc8f",
        darkolivegreen: "#556b2f",
        greenyellow: "#adff2f",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        tomato: "#ff6347",
        silver: "#c0c0c0",
        sienna: "#a0522d",
        lavender: "#e6e6fa",
        lightgreen: "#90ee90",
        orange: "#ffa500",
        orangered: "#ff4500",
        steelblue: "#4682b4",
        royalblue: "#4169e1",
        turquoise: "#40e0d0",
        yellowgreen: "#9acd32",
        salmon: "#fa8072",
        saddlebrown: "#8b4513",
        sandybrown: "#f4a460",
        rosybrown: "#bc8f8f",
        darksalmon: "#e9967a",
        lightgoldenrodyellow: "#fafad2",
        snow: "#fffafa",
        lightgrey: "#d3d3d3",
        lightgray: "#d3d3d3",
        dimgray: "#696969",
        dimgrey: "#696969",
        olivedrab: "#6b8e23",
        olive: "#808000",
      },
      l = {};
    for (var n in c) l[c[n]] = n;
    var o = {};
    (e.prototype.toName = function (r) {
      if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
        return "transparent";
      var d,
        u,
        i = l[this.toHex()];
      if (i) return i;
      if (r?.closest) {
        var a = this.toRgb(),
          s = 1 / 0,
          b = "black";
        if (!o.length) for (var m in c) o[m] = new e(c[m]).toRgb();
        for (var x in c) {
          var p =
            ((d = a),
            (u = o[x]),
            Math.pow(d.r - u.r, 2) +
              Math.pow(d.g - u.g, 2) +
              Math.pow(d.b - u.b, 2));
          p < s && ((s = p), (b = x));
        }
        return b;
      }
    }),
      t.string.push([
        function (r) {
          var d = r.toLowerCase(),
            u = d === "transparent" ? "#0000" : c[d];
          return u ? new e(u).toRgb() : null;
        },
        "name",
      ]);
  }
  var Z0;
  By([vy]);
  function bV() {
    if (!(typeof document > "u")) {
      if (!Z0) {
        let e = document.createElement("div");
        e.setAttribute("data-g2-color-computation-node", ""),
          document.body.appendChild(e),
          (Z0 = e);
      }
      return Z0;
    }
  }
  function mV(e) {
    return typeof e != "string" ? !1 : Fc(e).isValid();
  }
  function XV(e) {
    if (typeof e != "string") return "";
    if (mV(e)) return e;
    if (!e.includes("var(") || typeof document > "u") return "";
    let t = bV();
    if (!t) return "";
    t.style.background = e;
    let c = window?.getComputedStyle(t).background;
    return (t.style.background = ""), c || "";
  }
  var xV = Xn(XV);
  function GV(e) {
    let t = xV(e);
    return Fc(t).isLight() ? "#000000" : "#ffffff";
  }
  function Fy(e) {
    return GV(e) === "#000000" ? "dark" : "light";
  }
  var hy = new RegExp(/-left/g),
    Vy = new RegExp(/-right/g),
    Cy = new RegExp(/Left/g),
    Jy = new RegExp(/Right/g);
  function pV(e) {
    return e === "left"
      ? "right"
      : e === "right"
        ? "left"
        : hy.test(e)
          ? e.replace(hy, "-right")
          : Vy.test(e)
            ? e.replace(Vy, "-left")
            : Cy.test(e)
              ? e.replace(Cy, "Right")
              : Jy.test(e)
                ? e.replace(Jy, "Left")
                : e;
  }
  var gV = (e = {}) =>
    Object.fromEntries(Object.entries(e).map(([t, c]) => [pV(t), c]));
  function Vc(e = {}, t) {
    return () =>
      t
        ? En()
          ? U(t, "", "")
          : U(e, "", "")
        : En()
          ? U(gV(e), "", "")
          : U(e, "", "");
  }
  Vc.watch = () => En();
  var Yy = {
    "default.fontFamily":
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    "default.fontSize": "13px",
    "helpText.fontSize": "12px",
    "mobileTextMinFontSize": "16px",
  };
  function Ju(e) {
    var t;
    return (t = Yy[e]) !== null && t !== void 0 ? t : "";
  }
  var HV = "4px";
  function ce(e) {
    if (typeof e > "u") return;
    if (!e) return "0";
    let t = typeof e == "number" ? e : Number(e);
    return (typeof window < "u" &&
      window.CSS?.supports?.("margin", e.toString())) ||
      Number.isNaN(t)
      ? e.toString()
      : `calc(${HV} * ${e})`;
  }
  var ws = "#fff",
    ml = {
      900: "#1e1e1e",
      800: "#2f2f2f",
      700: "#757575",
      600: "#949494",
      400: "#ccc",
      300: "#ddd",
      200: "#e0e0e0",
      100: "#f0f0f0",
    },
    ZV = { yellow: "#f0b849", red: "#d94f4f", green: "#4ab866" },
    Xl = {
      accent:
        "var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9))",
      accentDarker10:
        "var(--wp-components-color-accent-darker-10, var(--wp-admin-theme-color-darker-10, #2145e6))",
      accentDarker20:
        "var(--wp-components-color-accent-darker-20, var(--wp-admin-theme-color-darker-20, #183ad6))",
      accentInverted: `var(--wp-components-color-accent-inverted, ${ws})`,
      background: `var(--wp-components-color-background, ${ws})`,
      foreground: `var(--wp-components-color-foreground, ${ml[900]})`,
      foregroundInverted: `var(--wp-components-color-foreground-inverted, ${ws})`,
      gray: {
        900: `var(--wp-components-color-foreground, ${ml[900]})`,
        800: `var(--wp-components-color-gray-800, ${ml[800]})`,
        700: `var(--wp-components-color-gray-700, ${ml[700]})`,
        600: `var(--wp-components-color-gray-600, ${ml[600]})`,
        400: `var(--wp-components-color-gray-400, ${ml[400]})`,
        300: `var(--wp-components-color-gray-300, ${ml[300]})`,
        200: `var(--wp-components-color-gray-200, ${ml[200]})`,
        100: `var(--wp-components-color-gray-100, ${ml[100]})`,
      },
    },
    RV = {
      background: Xl.background,
      backgroundDisabled: Xl.gray[100],
      border: Xl.gray[600],
      borderHover: Xl.gray[700],
      borderFocus: Xl.accent,
      borderDisabled: Xl.gray[400],
      textDisabled: Xl.gray[600],
      darkGrayPlaceholder: `color-mix(in srgb, ${Xl.foreground}, transparent 38%)`,
      lightGrayPlaceholder: `color-mix(in srgb, ${Xl.background}, transparent 35%)`,
    },
    Ge = Object.freeze({ gray: ml, white: ws, alert: ZV, theme: Xl, ui: RV });
  var Yu = "36px",
    fV = {
      controlPaddingX: 12,
      controlPaddingXSmall: 8,
      controlPaddingXLarge: 12 * 1.3334,
      controlBackgroundColor: Ge.white,
      controlBoxShadowFocus: `0 0 0 0.5px ${Ge.theme.accent}`,
      controlHeight: Yu,
      controlHeightXSmall: `calc( ${Yu} * 0.6 )`,
      controlHeightSmall: `calc( ${Yu} * 0.8 )`,
      controlHeightLarge: `calc( ${Yu} * 1.2 )`,
      controlHeightXLarge: `calc( ${Yu} * 1.4 )`,
    },
    ae = Object.assign({}, fV, {
      colorDivider: "rgba(0, 0, 0, 0.1)",
      colorScrollbarThumb: "rgba(0, 0, 0, 0.2)",
      colorScrollbarThumbHover: "rgba(0, 0, 0, 0.5)",
      colorScrollbarTrack: "rgba(0, 0, 0, 0.04)",
      elevationIntensity: 1,
      radiusXSmall: "1px",
      radiusSmall: "2px",
      radiusMedium: "4px",
      radiusLarge: "8px",
      radiusFull: "9999px",
      radiusRound: "50%",
      borderWidth: "1px",
      borderWidthFocus: "1.5px",
      borderWidthTab: "4px",
      spinnerSize: 16,
      fontSize: "13px",
      fontSizeH1: "calc(2.44 * 13px)",
      fontSizeH2: "calc(1.95 * 13px)",
      fontSizeH3: "calc(1.56 * 13px)",
      fontSizeH4: "calc(1.25 * 13px)",
      fontSizeH5: "13px",
      fontSizeH6: "calc(0.8 * 13px)",
      fontSizeInputMobile: "16px",
      fontSizeMobile: "15px",
      fontSizeSmall: "calc(0.92 * 13px)",
      fontSizeXSmall: "calc(0.75 * 13px)",
      fontLineHeightBase: "1.4",
      fontWeight: "normal",
      fontWeightHeading: "600",
      gridBase: "4px",
      cardPaddingXSmall: `${ce(2)}`,
      cardPaddingSmall: `${ce(4)}`,
      cardPaddingMedium: `${ce(4)} ${ce(6)}`,
      cardPaddingLarge: `${ce(6)} ${ce(8)}`,
      elevationXSmall:
        "0 1px 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02), 0 3px 3px rgba(0, 0, 0, 0.02), 0 4px 4px rgba(0, 0, 0, 0.01)",
      elevationSmall:
        "0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 3px rgba(0, 0, 0, 0.04), 0 6px 6px rgba(0, 0, 0, 0.03), 0 8px 8px rgba(0, 0, 0, 0.02)",
      elevationMedium:
        "0 2px 3px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 0.04), 0 12px 12px rgba(0, 0, 0, 0.03), 0 16px 16px rgba(0, 0, 0, 0.02)",
      elevationLarge:
        "0 5px 15px rgba(0, 0, 0, 0.08), 0 15px 27px rgba(0, 0, 0, 0.07), 0 30px 36px rgba(0, 0, 0, 0.04), 0 50px 43px rgba(0, 0, 0, 0.02)",
      surfaceBackgroundColor: Ge.white,
      surfaceBackgroundSubtleColor: "#F3F3F3",
      surfaceBackgroundTintColor: "#F5F5F5",
      surfaceBorderColor: "rgba(0, 0, 0, 0.1)",
      surfaceBorderBoldColor: "rgba(0, 0, 0, 0.15)",
      surfaceBorderSubtleColor: "rgba(0, 0, 0, 0.05)",
      surfaceBackgroundTertiaryColor: Ge.white,
      surfaceColor: Ge.white,
      transitionDuration: "200ms",
      transitionDurationFast: "160ms",
      transitionDurationFaster: "120ms",
      transitionDurationFastest: "100ms",
      transitionTimingFunction: "cubic-bezier(0.08, 0.52, 0.52, 1)",
      transitionTimingFunctionControl: "cubic-bezier(0.12, 0.8, 0.32, 1)",
    });
  var Nu = {
    name: "9amh4a",
    styles:
      "font-size:11px;font-weight:500;line-height:1.4;text-transform:uppercase",
  };
  var ky = C(E()),
    wy = (0, Z.createContext)({}),
    Ss = () => (0, Z.useContext)(wy);
  function IV({ value: e }) {
    let t = Ss(),
      c = (0, Z.useRef)(e);
    return (
      fu(() => {
        (0, zy.default)(c.current, e) &&
          c.current !== e &&
          globalThis.SCRIPT_DEBUG === !0 &&
          wl(`Please memoize your context: ${JSON.stringify(e)}`);
      }, [e]),
      (0, Z.useMemo)(
        () => (0, Ny.default)(t ?? {}, e ?? {}, { isMergeableObject: cZ }),
        [t, e]
      )
    );
  }
  var yV = ({ children: e, value: t }) => {
      let c = IV({ value: t });
      return (0, ky.jsx)(wy.Provider, { value: c, children: e });
    },
    R0 = (0, Z.memo)(yV);
  var Sy = "data-wp-component",
    Oy = "data-wp-c16t",
    po = "__contextSystemKey__";
  function WV(e) {
    return `components-${dZ(e)}`;
  }
  var Os = Xn(WV);
  function At(e, t) {
    return Qy(e, t, { forwardsRef: !0 });
  }
  function I0(e, t) {
    return Qy(e, t);
  }
  function Qy(e, t, c) {
    let l = c?.forwardsRef ? (0, Z.forwardRef)(e) : e;
    typeof t > "u" &&
      globalThis.SCRIPT_DEBUG === !0 &&
      wl("contextConnect: Please provide a namespace");
    let n = l[po] || [t];
    return (
      Array.isArray(t) && (n = [...n, ...t]),
      typeof t == "string" && (n = [...n, t]),
      Object.assign(l, {
        [po]: [...new Set(n)],
        displayName: t,
        selector: `.${Os(t)}`,
      })
    );
  }
  function f0(e) {
    if (!e) return [];
    let t = [];
    return e[po] && (t = e[po]), e.type && e.type[po] && (t = e.type[po]), t;
  }
  function y0(e, t) {
    return e
      ? typeof t == "string"
        ? f0(e).includes(t)
        : Array.isArray(t)
          ? t.some((c) => f0(e).includes(c))
          : !1
      : !1;
  }
  function Ay(e) {
    return { [Sy]: e };
  }
  function Ly() {
    return { [Oy]: !0 };
  }
  function tt(e, t) {
    let c = Ss();
    typeof t > "u" &&
      globalThis.SCRIPT_DEBUG === !0 &&
      wl("useContextSystem: Please provide a namespace");
    let l = c?.[t] || {},
      n = { ...Ly(), ...Ay(t) },
      { _overrides: o, ...r } = l,
      d = Object.entries(r).length ? Object.assign({}, r, e) : e,
      i = Xc()(Os(t), e.className),
      a =
        typeof d.renderChildren == "function"
          ? d.renderChildren(d)
          : d.children;
    for (let s in d) n[s] = d[s];
    for (let s in o) n[s] = o[s];
    return a !== void 0 && (n.children = a), (n.className = i), n;
  }
  var Ty = {
    border: 0,
    clip: "rect(1px, 1px, 1px, 1px)",
    WebkitClipPath: "inset( 50% )",
    clipPath: "inset( 50% )",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px",
    wordWrap: "normal",
  };
  var vn = C(A());
  Uy();
  var vV = Dy,
    FV = function (t) {
      return t !== "theme";
    },
    My = function (t) {
      return typeof t == "string" && t.charCodeAt(0) > 96 ? vV : FV;
    },
    Ey = function (t, c, l) {
      var n;
      if (c) {
        var o = c.shouldForwardProp;
        n =
          t.__emotion_forwardProp && o
            ? function (r) {
                return t.__emotion_forwardProp(r) && o(r);
              }
            : o;
      }
      return typeof n != "function" && l && (n = t.__emotion_forwardProp), n;
    },
    hV = !1,
    VV = function (t) {
      var c = t.cache,
        l = t.serialized,
        n = t.isStringTag;
      return (
        Fu(c, l, n),
        Ns(function () {
          return Bn(c, l, n);
        }),
        null
      );
    },
    we = function e(t, c) {
      var l = t.__emotion_real === t,
        n = (l && t.__emotion_base) || t,
        o,
        r;
      c !== void 0 && ((o = c.label), (r = c.target));
      var d = Ey(t, c, l),
        u = d || My(n),
        i = !u("as");
      return function () {
        var a = arguments,
          s =
            l && t.__emotion_styles !== void 0
              ? t.__emotion_styles.slice(0)
              : [];
        if (
          (o !== void 0 && s.push("label:" + o + ";"),
          a[0] == null || a[0].raw === void 0)
        )
          s.push.apply(s, a);
        else {
          s.push(a[0][0]);
          for (var b = a.length, m = 1; m < b; m++) s.push(a[m], a[0][m]);
        }
        var x = b0(function (p, R, X) {
          var G = (i && p.as) || n,
            g = "",
            H = [],
            f = p;
          if (p.theme == null) {
            f = {};
            for (var I in p) f[I] = p[I];
            f.theme = vn.useContext(m0);
          }
          typeof p.className == "string"
            ? (g = xo(R.registered, H, p.className))
            : p.className != null && (g = p.className + " ");
          var y = Sl(s.concat(H), R.registered, f);
          (g += R.key + "-" + y.name), r !== void 0 && (g += " " + r);
          var W = i && d === void 0 ? My(G) : u,
            B = {};
          for (var F in p) (i && F === "as") || (W(F) && (B[F] = p[F]));
          return (
            (B.className = g),
            X && (B.ref = X),
            vn.createElement(
              vn.Fragment,
              null,
              vn.createElement(VV, {
                cache: R,
                serialized: y,
                isStringTag: typeof G == "string",
              }),
              vn.createElement(G, B)
            )
          );
        });
        return (
          (x.displayName =
            o !== void 0
              ? o
              : "Styled(" +
                (typeof n == "string"
                  ? n
                  : n.displayName || n.name || "Component") +
                ")"),
          (x.defaultProps = t.defaultProps),
          (x.__emotion_real = x),
          (x.__emotion_base = n),
          (x.__emotion_styles = s),
          (x.__emotion_forwardProp = d),
          Object.defineProperty(x, "toString", {
            value: function () {
              return r === void 0 && hV ? "NO_COMPONENT_SELECTOR" : "." + r;
            },
          }),
          (x.withComponent = function (p, R) {
            return e(
              p,
              vu({}, c, R, { shouldForwardProp: Ey(x, R, !0) })
            ).apply(void 0, s);
          }),
          x
        );
      };
    };
  var jy = C(E()),
    CV = we("div", { target: "e19lxcc00" })("");
  function JV({ as: e, ...t }, c) {
    return (0, jy.jsx)(CV, { as: e, ref: c, ...t });
  }
  var YV = Object.assign((0, Z.forwardRef)(JV), {
      selector: ".components-view",
    }),
    Pc = YV;
  var Py = C(E());
  function NV(e, t) {
    let { style: c, ...l } = tt(e, "VisuallyHidden");
    return (0, Py.jsx)(Pc, { ref: t, ...l, style: { ...Ty, ...(c || {}) } });
  }
  var zV = At(NV, "VisuallyHidden"),
    Fn = zV;
  var W0 = ["40em", "52em", "64em"],
    kV = (e = {}) => {
      let { defaultIndex: t = 0 } = e;
      if (typeof t != "number")
        throw new TypeError(
          `Default breakpoint index should be a number. Got: ${t}, ${typeof t}`
        );
      if (t < 0 || t > W0.length - 1)
        throw new RangeError(
          `Default breakpoint index out of range. Theme has ${W0.length} breakpoints, got index ${t}`
        );
      let [c, l] = (0, Z.useState)(t);
      return (
        (0, Z.useEffect)(() => {
          let n = () =>
              W0.filter((r) =>
                typeof window < "u"
                  ? window.matchMedia(`screen and (min-width: ${r})`).matches
                  : !1
              ).length,
            o = () => {
              let r = n();
              c !== r && l(r);
            };
          return (
            o(),
            typeof window < "u" && window.addEventListener("resize", o),
            () => {
              typeof window < "u" && window.removeEventListener("resize", o);
            }
          );
        }, [c]),
        c
      );
    };
  function Ky(e, t = {}) {
    let c = kV(t);
    if (!Array.isArray(e) && typeof e != "function") return e;
    let l = e || [];
    return l[c >= l.length ? l.length - 1 : c];
  }
  var _y = { name: "zjik7", styles: "display:flex" },
    qy = {
      name: "qgaee5",
      styles:
        "display:block;max-height:100%;max-width:100%;min-height:0;min-width:0",
    },
    $y = { name: "82a6rk", styles: "flex:1" },
    eW = { name: "13nosa1", styles: ">*{min-height:0;}" },
    tW = { name: "1pwxzk4", styles: ">*{min-width:0;}" };
  function wV(e) {
    let { isReversed: t, ...c } = e;
    return typeof t < "u"
      ? (vl("Flex isReversed", {
          alternative: 'Flex direction="row-reverse" or "column-reverse"',
          since: "5.9",
        }),
        { ...c, direction: t ? "row-reverse" : "row" })
      : c;
  }
  function B0(e) {
    let {
        align: t,
        className: c,
        direction: l = "row",
        expanded: n = !0,
        gap: o = 2,
        justify: r = "space-between",
        wrap: d = !1,
        ...u
      } = tt(wV(e), "Flex"),
      i = Array.isArray(l) ? l : [l],
      a = Ky(i),
      s = typeof a == "string" && !!a.includes("column"),
      b = Xc(),
      m = (0, Z.useMemo)(() => {
        let x = U(
          {
            alignItems: t ?? (s ? "normal" : "center"),
            flexDirection: a,
            flexWrap: d ? "wrap" : void 0,
            gap: ce(o),
            justifyContent: r,
            height: s && n ? "100%" : void 0,
            width: !s && n ? "100%" : void 0,
          },
          "",
          ""
        );
        return b(_y, x, s ? eW : tW, c);
      }, [t, c, b, a, n, o, s, r, d]);
    return { ...u, className: m, isColumn: s };
  }
  var v0 = (0, Z.createContext)({ flexItemDisplay: void 0 }),
    lW = () => (0, Z.useContext)(v0);
  var F0 = C(E());
  function SV(e, t) {
    let { children: c, isColumn: l, ...n } = B0(e);
    return (0, F0.jsx)(v0.Provider, {
      value: { flexItemDisplay: l ? "block" : void 0 },
      children: (0, F0.jsx)(Pc, { ...n, ref: t, children: c }),
    });
  }
  var OV = At(SV, "Flex"),
    Qs = OV;
  function h0(e) {
    let { className: t, display: c, isBlock: l = !1, ...n } = tt(e, "FlexItem"),
      o = {},
      r = lW().flexItemDisplay;
    o.Base = U({ display: c || r }, "", "");
    let u = Xc()(qy, o.Base, l && $y, t);
    return { ...n, className: u };
  }
  var nW = C(E());
  function QV(e, t) {
    let c = h0(e);
    return (0, nW.jsx)(Pc, { ...c, ref: t });
  }
  var AV = At(QV, "FlexItem"),
    As = AV;
  function _t(e) {
    return typeof e < "u" && e !== null;
  }
  function oW(e) {
    let {
        className: t,
        margin: c,
        marginBottom: l = 2,
        marginLeft: n,
        marginRight: o,
        marginTop: r,
        marginX: d,
        marginY: u,
        padding: i,
        paddingBottom: a,
        paddingLeft: s,
        paddingRight: b,
        paddingTop: m,
        paddingX: x,
        paddingY: p,
        ...R
      } = tt(e, "Spacer"),
      G = Xc()(
        _t(c) && U("margin:", ce(c), ";", ""),
        _t(u) && U("margin-bottom:", ce(u), ";margin-top:", ce(u), ";", ""),
        _t(d) && U("margin-left:", ce(d), ";margin-right:", ce(d), ";", ""),
        _t(r) && U("margin-top:", ce(r), ";", ""),
        _t(l) && U("margin-bottom:", ce(l), ";", ""),
        _t(n) && Vc({ marginLeft: ce(n) })(),
        _t(o) && Vc({ marginRight: ce(o) })(),
        _t(i) && U("padding:", ce(i), ";", ""),
        _t(p) && U("padding-bottom:", ce(p), ";padding-top:", ce(p), ";", ""),
        _t(x) && U("padding-left:", ce(x), ";padding-right:", ce(x), ";", ""),
        _t(m) && U("padding-top:", ce(m), ";", ""),
        _t(a) && U("padding-bottom:", ce(a), ";", ""),
        _t(s) && Vc({ paddingLeft: ce(s) })(),
        _t(b) && Vc({ paddingRight: ce(b) })(),
        t
      );
    return { ...R, className: G };
  }
  var rW = C(E());
  function LV(e, t) {
    let c = oW(e);
    return (0, rW.jsx)(Pc, { ...c, ref: t });
  }
  var TV = At(LV, "Spacer"),
    pt = TV;
  function DV({ icon: e, size: t = 24, ...c }, l) {
    return (0, Z.cloneElement)(e, { width: t, height: t, ...c, ref: l });
  }
  var V0 = (0, Z.forwardRef)(DV);
  var C0 = C(E()),
    UV = (0, C0.jsx)(nl, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, C0.jsx)(tr, {
        d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z",
      }),
    }),
    zu = UV;
  var J0 = C(E()),
    MV = (0, J0.jsx)(nl, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, J0.jsx)(tr, {
        d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z",
      }),
    }),
    Y0 = MV;
  var N0 = C(E()),
    EV = (0, N0.jsx)(nl, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: (0, N0.jsx)(tr, {
        d: "m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z",
      }),
    }),
    z0 = EV;
  var dW = {
    name: "hdknak",
    styles:
      "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap",
  };
  var Ls = "\u2026",
    hn = {
      auto: "auto",
      head: "head",
      middle: "middle",
      tail: "tail",
      none: "none",
    },
    PV = { ellipsis: Ls, ellipsizeMode: hn.auto, limit: 0, numberOfLines: 0 };
  function KV(e, t, c, l) {
    if (typeof e != "string") return "";
    let n = e.length,
      o = ~~t,
      r = ~~c,
      d = Ru(l) ? l : Ls;
    return (o === 0 && r === 0) || o >= n || r >= n || o + r >= n
      ? e
      : r === 0
        ? e.slice(0, o) + d
        : e.slice(0, o) + d + e.slice(n - r);
  }
  function uW(e = "", t) {
    let c = { ...PV, ...t },
      { ellipsis: l, ellipsizeMode: n, limit: o } = c;
    if (n === hn.none) return e;
    let r, d;
    switch (n) {
      case hn.head:
        (r = 0), (d = o);
        break;
      case hn.middle:
        (r = Math.floor(o / 2)), (d = Math.floor(o / 2));
        break;
      default:
        (r = o), (d = 0);
    }
    return n !== hn.auto ? KV(e, r, d, l) : e;
  }
  function Ts(e) {
    let {
        className: t,
        children: c,
        ellipsis: l = Ls,
        ellipsizeMode: n = hn.auto,
        limit: o = 0,
        numberOfLines: r = 0,
        ...d
      } = tt(e, "Truncate"),
      u = Xc(),
      i;
    typeof c == "string" ? (i = c) : typeof c == "number" && (i = c.toString());
    let a = i
        ? uW(i, { ellipsis: l, ellipsizeMode: n, limit: o, numberOfLines: r })
        : c,
      s = !!i && n === hn.auto,
      b = (0, Z.useMemo)(
        () =>
          u(
            s && !r && dW,
            s &&
              !!r &&
              U(
                r === 1 ? "word-break: break-all;" : "",
                " -webkit-box-orient:vertical;-webkit-line-clamp:",
                r,
                ";display:-webkit-box;overflow:hidden;",
                ""
              ),
            t
          ),
        [t, u, r, s]
      );
    return { ...d, className: b, children: a };
  }
  var A0 = {};
  _s(A0, {
    Text: () => k0,
    block: () => w0,
    destructive: () => S0,
    highlighterText: () => Q0,
    muted: () => O0,
    positive: () => _V,
    upperCase: () => qV,
  });
  var k0 = U(
      "color:",
      Ge.gray[900],
      ";line-height:",
      ae.fontLineHeightBase,
      ";margin:0;text-wrap:balance;text-wrap:pretty;",
      ""
    ),
    w0 = { name: "4zleql", styles: "display:block" },
    _V = U("color:", Ge.alert.green, ";", ""),
    S0 = U("color:", Ge.alert.red, ";", ""),
    O0 = U("color:", Ge.gray[700], ";", ""),
    Q0 = U(
      "mark{background:",
      Ge.alert.yellow,
      ";border-radius:",
      ae.radiusSmall,
      ";box-shadow:0 0 0 1px rgba( 0, 0, 0, 0.05 ) inset,0 -1px 0 rgba( 0, 0, 0, 0.1 ) inset;}",
      ""
    ),
    qV = { name: "50zrmy", styles: "text-transform:uppercase" };
  var sW = C(aW());
  var $V = (e) => {
      let t = {};
      for (let c in e) t[c.toLowerCase()] = e[c];
      return t;
    },
    e9 = Xn($V);
  function bW({
    activeClassName: e = "",
    activeIndex: t = -1,
    activeStyle: c,
    autoEscape: l,
    caseSensitive: n = !1,
    children: o,
    findChunks: r,
    highlightClassName: d = "",
    highlightStyle: u = {},
    highlightTag: i = "mark",
    sanitize: a,
    searchWords: s = [],
    unhighlightClassName: b = "",
    unhighlightStyle: m,
  }) {
    if (!o) return null;
    if (typeof o != "string") return o;
    let x = o,
      p = (0, sW.findAll)({
        autoEscape: l,
        caseSensitive: n,
        findChunks: r,
        sanitize: a,
        searchWords: s,
        textToHighlight: x,
      }),
      R = i,
      X = -1,
      G = "",
      g;
    return p.map((f, I) => {
      let y = x.substr(f.start, f.end - f.start);
      if (f.highlight) {
        X++;
        let W;
        typeof d == "object"
          ? n
            ? (W = d[y])
            : ((d = e9(d)), (W = d[y.toLowerCase()]))
          : (W = d);
        let B = X === +t;
        (G = `${W} ${B ? e : ""}`),
          (g = B === !0 && c !== null ? Object.assign({}, u, c) : u);
        let F = { children: y, className: G, key: I, style: g };
        return (
          typeof R != "string" && (F.highlightIndex = X),
          (0, Z.createElement)(R, F)
        );
      }
      return (0, Z.createElement)("span", {
        children: y,
        className: b,
        key: I,
        style: m,
      });
    });
  }
  var L0 = 13,
    mW = {
      body: L0,
      caption: 10,
      footnote: 11,
      largeTitle: 28,
      subheadline: 12,
      title: 20,
    },
    FE = [1, 2, 3, 4, 5, 6].flatMap((e) => [e, e.toString()]);
  function T0(e = L0) {
    if (e in mW) return T0(mW[e]);
    if (typeof e != "number") {
      let c = parseFloat(e);
      if (Number.isNaN(c)) return e;
      e = c;
    }
    return `calc(${`(${e} / ${L0})`} * ${ae.fontSize})`;
  }
  function XW(e, t) {
    if (t) return t;
    if (!e) return;
    let c = `calc(${ae.controlHeight} + ${ce(2)})`;
    switch (e) {
      case "large":
        c = `calc(${ae.controlHeightLarge} + ${ce(2)})`;
        break;
      case "small":
        c = `calc(${ae.controlHeightSmall} + ${ce(2)})`;
        break;
      case "xSmall":
        c = `calc(${ae.controlHeightXSmall} + ${ce(2)})`;
        break;
      default:
        break;
    }
    return c;
  }
  var t9 = { name: "50zrmy", styles: "text-transform:uppercase" };
  function D0(e) {
    let {
        adjustLineHeightForInnerControls: t,
        align: c,
        children: l,
        className: n,
        color: o,
        ellipsizeMode: r,
        isDestructive: d = !1,
        display: u,
        highlightEscape: i = !1,
        highlightCaseSensitive: a = !1,
        highlightWords: s,
        highlightSanitize: b,
        isBlock: m = !1,
        letterSpacing: x,
        lineHeight: p,
        optimizeReadabilityFor: R,
        size: X,
        truncate: G = !1,
        upperCase: g = !1,
        variant: H,
        weight: f = ae.fontWeight,
        ...I
      } = tt(e, "Text"),
      y = l,
      W = Array.isArray(s),
      B = X === "caption";
    if (W) {
      if (typeof l != "string")
        throw new TypeError(
          "`children` of `Text` must only be `string` types when `highlightWords` is defined"
        );
      y = bW({
        autoEscape: i,
        children: l,
        caseSensitive: a,
        searchWords: s,
        sanitize: b,
      });
    }
    let F = Xc(),
      S = (0, Z.useMemo)(() => {
        let N = {},
          V = XW(t, p);
        if (
          ((N.Base = U(
            {
              color: o,
              display: u,
              fontSize: T0(X),
              fontWeight: f,
              lineHeight: V,
              letterSpacing: x,
              textAlign: c,
            },
            "",
            ""
          )),
          (N.upperCase = t9),
          (N.optimalTextColor = null),
          R)
        ) {
          let k = Fy(R) === "dark";
          N.optimalTextColor = k
            ? U({ color: Ge.gray[900] }, "", "")
            : U({ color: Ge.white }, "", "");
        }
        return F(
          k0,
          N.Base,
          N.optimalTextColor,
          d && S0,
          !!W && Q0,
          m && w0,
          B && O0,
          H && A0[H],
          g && N.upperCase,
          n
        );
      }, [t, c, n, o, F, u, m, B, d, W, x, p, R, X, g, H, f]),
      O;
    G === !0 && (O = "auto"), G === !1 && (O = "none");
    let v = { ...I, className: S, children: l, ellipsizeMode: r || O },
      Y = Ts(v);
    return (
      !G &&
        Array.isArray(l) &&
        (y = Z.Children.map(l, (N) =>
          typeof N != "object" || N === null || !("props" in N)
            ? N
            : y0(N, ["Link"])
              ? (0, Z.cloneElement)(N, { size: N.props.size || "inherit" })
              : N
        )),
      { ...Y, children: G ? Y.children : y }
    );
  }
  var xW = C(E());
  function c9(e, t) {
    let c = D0(e);
    return (0, xW.jsx)(Pc, { as: "span", ...c, ref: t });
  }
  var l9 = At(c9, "Text"),
    U0 = l9;
  var GW = C(E());
  var M0 = we("span", { target: "em5sgkm8" })({
      name: "pvvbxf",
      styles: "box-sizing:border-box;display:block",
    }),
    E0 = we("span", { target: "em5sgkm7" })({
      name: "jgf79h",
      styles:
        "align-items:center;align-self:stretch;box-sizing:border-box;display:flex",
    }),
    n9 = ({ disabled: e, isBorderless: t }) =>
      t ? "transparent" : e ? Ge.ui.borderDisabled : Ge.ui.border,
    j0 = we("div", { target: "em5sgkm6" })(
      "&&&{box-sizing:border-box;border-color:",
      n9,
      ";border-radius:inherit;border-style:solid;border-width:1px;bottom:0;left:0;margin:0;padding:0;pointer-events:none;position:absolute;right:0;top:0;",
      Vc({ paddingLeft: 2 }),
      ";}"
    ),
    pW = we(Qs, { target: "em5sgkm5" })(
      "box-sizing:border-box;position:relative;border-radius:",
      ae.radiusSmall,
      ";padding-top:0;&:focus-within:not( :has( :is( ",
      M0,
      ", ",
      E0,
      " ):focus-within ) ){",
      j0,
      "{border-color:",
      Ge.ui.borderFocus,
      ";box-shadow:",
      ae.controlBoxShadowFocus,
      ";outline:2px solid transparent;outline-offset:-2px;}}"
    ),
    o9 = ({ disabled: e }) => {
      let t = e ? Ge.ui.backgroundDisabled : Ge.ui.background;
      return U({ backgroundColor: t }, "", "");
    },
    r9 = { name: "1d3w5wq", styles: "width:100%" },
    d9 = ({ __unstableInputWidth: e, labelPosition: t }) =>
      e
        ? t === "side"
          ? ""
          : t === "edge"
            ? U({ flex: `0 0 ${e}` }, "", "")
            : U({ width: e }, "", "")
        : r9,
    gW = we("div", { target: "em5sgkm4" })(
      "align-items:center;box-sizing:border-box;border-radius:inherit;display:flex;flex:1;position:relative;",
      o9,
      " ",
      d9,
      ";"
    ),
    u9 = ({ disabled: e }) =>
      e ? U({ color: Ge.ui.textDisabled }, "", "") : "",
    P0 = ({ inputSize: e }) => {
      let t = {
          "default": "13px",
          "small": "11px",
          "compact": "13px",
          "__unstable-large": "13px",
        },
        c = t[e] || t.default,
        l = "16px";
      return c
        ? U(
            "font-size:",
            l,
            ";@media ( min-width: 600px ){font-size:",
            c,
            ";}",
            ""
          )
        : "";
    },
    HW = ({ inputSize: e, __next40pxDefaultSize: t }) => {
      let c = {
        "default": {
          height: 40,
          lineHeight: 1,
          minHeight: 40,
          paddingLeft: ae.controlPaddingX,
          paddingRight: ae.controlPaddingX,
        },
        "small": {
          height: 24,
          lineHeight: 1,
          minHeight: 24,
          paddingLeft: ae.controlPaddingXSmall,
          paddingRight: ae.controlPaddingXSmall,
        },
        "compact": {
          height: 32,
          lineHeight: 1,
          minHeight: 32,
          paddingLeft: ae.controlPaddingXSmall,
          paddingRight: ae.controlPaddingXSmall,
        },
        "__unstable-large": {
          height: 40,
          lineHeight: 1,
          minHeight: 40,
          paddingLeft: ae.controlPaddingX,
          paddingRight: ae.controlPaddingX,
        },
      };
      return t || (c.default = c.compact), c[e] || c.default;
    },
    i9 = (e) => U(HW(e), "", ""),
    a9 = ({ paddingInlineStart: e, paddingInlineEnd: t }) =>
      U({ paddingInlineStart: e, paddingInlineEnd: t }, "", ""),
    s9 = ({ isDragging: e, dragCursor: t }) => {
      let c, l;
      return (
        e &&
          (c = U(
            "cursor:",
            t,
            ";user-select:none;&::-webkit-outer-spin-button,&::-webkit-inner-spin-button{-webkit-appearance:none!important;margin:0!important;}",
            ""
          )),
        e && t && (l = U("&:active{cursor:", t, ";}", "")),
        U(c, " ", l, ";", "")
      );
    },
    t4 = we("input", { target: "em5sgkm3" })(
      "&&&{background-color:transparent;box-sizing:border-box;border:none;box-shadow:none!important;color:",
      Ge.theme.foreground,
      ";display:block;font-family:inherit;margin:0;outline:none;width:100%;",
      s9,
      " ",
      u9,
      " ",
      P0,
      " ",
      i9,
      " ",
      a9,
      " &::-webkit-input-placeholder{line-height:normal;}}"
    ),
    b9 = we(U0, { target: "em5sgkm2" })(
      "&&&{",
      Nu,
      ";box-sizing:border-box;display:block;padding-top:0;padding-bottom:0;max-width:100%;z-index:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}"
    ),
    ZW = (e) => (0, GW.jsx)(b9, { ...e, as: "label" }),
    RW = we(As, { target: "em5sgkm1" })({
      name: "1b6uupn",
      styles: "max-width:calc( 100% - 10px )",
    }),
    m9 = ({
      variant: e = "default",
      size: t,
      __next40pxDefaultSize: c,
      isPrefix: l,
    }) => {
      let { paddingLeft: n } = HW({ inputSize: t, __next40pxDefaultSize: c }),
        o = l ? "paddingInlineStart" : "paddingInlineEnd";
      return e === "default"
        ? U({ [o]: n }, "", "")
        : U({ display: "flex", [o]: n - 4 }, "", "");
    },
    fW = we("div", { target: "em5sgkm0" })(m9, ";");
  var IW = C(E());
  function X9({ disabled: e = !1, isBorderless: t = !1 }) {
    return (0, IW.jsx)(j0, {
      "aria-hidden": "true",
      "className": "components-input-control__backdrop",
      "disabled": e,
      "isBorderless": t,
    });
  }
  var x9 = (0, Z.memo)(X9),
    yW = x9;
  var Ds = C(E());
  function K0({ children: e, hideLabelFromVision: t, htmlFor: c, ...l }) {
    return e
      ? t
        ? (0, Ds.jsx)(Fn, { as: "label", htmlFor: c, children: e })
        : (0, Ds.jsx)(RW, {
            children: (0, Ds.jsx)(ZW, { htmlFor: c, ...l, children: e }),
          })
      : null;
  }
  function Us(e) {
    let { __next36pxDefaultSize: t, __next40pxDefaultSize: c, ...l } = e;
    return { ...l, __next40pxDefaultSize: c ?? t };
  }
  var Ql = C(E());
  function G9(e) {
    let c = `input-base-control-${zt(WW)}`;
    return e || c;
  }
  function p9(e) {
    let t = {};
    switch (e) {
      case "top":
        (t.direction = "column"), (t.expanded = !1), (t.gap = 0);
        break;
      case "bottom":
        (t.direction = "column-reverse"), (t.expanded = !1), (t.gap = 0);
        break;
      case "edge":
        t.justify = "space-between";
        break;
    }
    return t;
  }
  function WW(e, t) {
    let {
        __next40pxDefaultSize: c,
        __unstableInputWidth: l,
        children: n,
        className: o,
        disabled: r = !1,
        hideLabelFromVision: d = !1,
        labelPosition: u,
        id: i,
        isBorderless: a = !1,
        label: s,
        prefix: b,
        size: m = "default",
        suffix: x,
        ...p
      } = Us(tt(e, "InputBase")),
      R = G9(i),
      X = d || !s,
      G = (0, Z.useMemo)(
        () => ({
          InputControlPrefixWrapper: { __next40pxDefaultSize: c, size: m },
          InputControlSuffixWrapper: { __next40pxDefaultSize: c, size: m },
        }),
        [c, m]
      );
    return (0, Ql.jsxs)(pW, {
      ...p,
      ...p9(u),
      className: o,
      gap: 2,
      ref: t,
      children: [
        (0, Ql.jsx)(K0, {
          className: "components-input-control__label",
          hideLabelFromVision: d,
          labelPosition: u,
          htmlFor: R,
          children: s,
        }),
        (0, Ql.jsxs)(gW, {
          __unstableInputWidth: l,
          className: "components-input-control__container",
          disabled: r,
          hideLabel: X,
          labelPosition: u,
          children: [
            (0, Ql.jsxs)(R0, {
              value: G,
              children: [
                b &&
                  (0, Ql.jsx)(M0, {
                    className: "components-input-control__prefix",
                    children: b,
                  }),
                n,
                x &&
                  (0, Ql.jsx)(E0, {
                    className: "components-input-control__suffix",
                    children: x,
                  }),
              ],
            }),
            (0, Ql.jsx)(yW, { disabled: r, isBorderless: a }),
          ],
        }),
      ],
    });
  }
  var BW = At(WW, "InputBase");
  function vW(e) {
    return (t) => {
      let { isComposing: c } = "nativeEvent" in t ? t.nativeEvent : t;
      c || t.keyCode === 229 || e(t);
    };
  }
  var FW = we("div", { target: "ej5x27r4" })(
      "font-family:",
      Ju("default.fontFamily"),
      ";font-size:",
      Ju("default.fontSize"),
      ";",
      X0,
      ";"
    ),
    g9 = ({ __nextHasNoMarginBottom: e = !1 }) =>
      !e && U("margin-bottom:", ce(2), ";", ""),
    hW = we("div", { target: "ej5x27r3" })(
      g9,
      " .components-panel__row &{margin-bottom:inherit;}"
    ),
    VW = U(Nu, ";display:block;margin-bottom:", ce(2), ";padding:0;", ""),
    CW = we("label", { target: "ej5x27r2" })(VW, ";"),
    H9 = { name: "11yad0w", styles: "margin-bottom:revert" },
    Z9 = ({ __nextHasNoMarginBottom: e = !1 }) => !e && H9,
    JW = we("p", { target: "ej5x27r1" })(
      "margin-top:",
      ce(2),
      ";margin-bottom:0;font-size:",
      Ju("helpText.fontSize"),
      ";font-style:normal;color:",
      Ge.gray[700],
      ";",
      Z9,
      ";"
    ),
    YW = we("span", { target: "ej5x27r0" })(VW, ";");
  var xl = C(E());
  var R9 = (e) => {
      let {
        __nextHasNoMarginBottom: t = !1,
        __associatedWPComponentName: c = "BaseControl",
        id: l,
        label: n,
        hideLabelFromVision: o = !1,
        help: r,
        className: d,
        children: u,
      } = tt(e, "BaseControl");
      return (
        t ||
          vl(`Bottom margin styles for wp.components.${c}`, {
            since: "6.7",
            version: "7.0",
            hint: "Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.",
          }),
        (0, xl.jsxs)(FW, {
          className: d,
          children: [
            (0, xl.jsxs)(hW, {
              className: "components-base-control__field",
              __nextHasNoMarginBottom: t,
              children: [
                n &&
                  l &&
                  (o
                    ? (0, xl.jsx)(Fn, { as: "label", htmlFor: l, children: n })
                    : (0, xl.jsx)(CW, {
                        className: "components-base-control__label",
                        htmlFor: l,
                        children: n,
                      })),
                n &&
                  !l &&
                  (o
                    ? (0, xl.jsx)(Fn, { as: "label", children: n })
                    : (0, xl.jsx)(NW, { children: n })),
                u,
              ],
            }),
            !!r &&
              (0, xl.jsx)(JW, {
                id: l ? l + "__help" : void 0,
                className: "components-base-control__help",
                __nextHasNoMarginBottom: t,
                children: r,
              }),
          ],
        })
      );
    },
    f9 = (e, t) => {
      let { className: c, children: l, ...n } = e;
      return (0, xl.jsx)(YW, {
        ref: t,
        ...n,
        className: Qe("components-base-control__label", c),
        children: l,
      });
    },
    NW = (0, Z.forwardRef)(f9),
    I9 = Object.assign(I0(R9, "BaseControl"), { VisualLabel: NW }),
    Ms = I9;
  var zW = C(E());
  function y9({ icon: e, className: t, size: c = 20, style: l = {}, ...n }) {
    let o = ["dashicon", "dashicons", "dashicons-" + e, t]
        .filter(Boolean)
        .join(" "),
      d = {
        ...(c != 20
          ? { fontSize: `${c}px`, width: `${c}px`, height: `${c}px` }
          : {}),
        ...l,
      };
    return (0, zW.jsx)("span", { className: o, style: d, ...n });
  }
  var _0 = y9;
  var q0 = C(E());
  function W9({
    icon: e = null,
    size: t = typeof e == "string" ? 20 : 24,
    ...c
  }) {
    if (typeof e == "string")
      return (0, q0.jsx)(_0, { icon: e, size: t, ...c });
    if ((0, Z.isValidElement)(e) && _0 === e.type)
      return (0, Z.cloneElement)(e, { ...c });
    if (typeof e == "function")
      return (0, Z.createElement)(e, { size: t, ...c });
    if (e && (e.type === "svg" || e.type === nl)) {
      let l = { ...e.props, width: t, height: t, ...c };
      return (0, q0.jsx)(nl, { ...l });
    }
    return (0, Z.isValidElement)(e)
      ? (0, Z.cloneElement)(e, { size: t, ...c })
      : e;
  }
  var Jr = W9;
  var ht = C(E()),
    B9 = ["onMouseDown", "onClick"];
  function v9({
    __experimentalIsFocusable: e,
    isDefault: t,
    isPrimary: c,
    isSecondary: l,
    isTertiary: n,
    isLink: o,
    isPressed: r,
    isSmall: d,
    size: u,
    variant: i,
    describedBy: a,
    ...s
  }) {
    let b = u,
      m = i,
      x = { "accessibleWhenDisabled": e, "aria-pressed": r, "description": a };
    if (d) {
      var p;
      ((p = b) !== null && p !== void 0) || (b = "small");
    }
    if (c) {
      var R;
      ((R = m) !== null && R !== void 0) || (m = "primary");
    }
    if (n) {
      var X;
      ((X = m) !== null && X !== void 0) || (m = "tertiary");
    }
    if (l) {
      var G;
      ((G = m) !== null && G !== void 0) || (m = "secondary");
    }
    if (t) {
      var g;
      vl("wp.components.Button `isDefault` prop", {
        since: "5.4",
        alternative: 'variant="secondary"',
      }),
        ((g = m) !== null && g !== void 0) || (m = "secondary");
    }
    if (o) {
      var H;
      ((H = m) !== null && H !== void 0) || (m = "link");
    }
    return { ...x, ...s, size: b, variant: m };
  }
  function F9(e, t) {
    let {
        __next40pxDefaultSize: c,
        accessibleWhenDisabled: l,
        isBusy: n,
        isDestructive: o,
        className: r,
        disabled: d,
        icon: u,
        iconPosition: i = "left",
        iconSize: a,
        showTooltip: s,
        tooltipPosition: b,
        shortcut: m,
        label: x,
        children: p,
        size: R = "default",
        text: X,
        variant: G,
        description: g,
        ...H
      } = v9(e),
      {
        "href": f,
        "target": I,
        "aria-checked": y,
        "aria-pressed": W,
        "aria-selected": B,
        ...F
      } = "href" in H ? H : { href: void 0, target: void 0, ...H },
      S = zt(kW, "components-button__description"),
      O =
        (typeof p == "string" && !!p) ||
        (Array.isArray(p) &&
          p?.[0] &&
          p[0] !== null &&
          p?.[0]?.props?.className !== "components-tooltip"),
      Y = Qe("components-button", r, {
        "is-next-40px-default-size": c,
        "is-secondary": G === "secondary",
        "is-primary": G === "primary",
        "is-small": R === "small",
        "is-compact": R === "compact",
        "is-tertiary": G === "tertiary",
        "is-pressed": [!0, "true", "mixed"].includes(W),
        "is-pressed-mixed": W === "mixed",
        "is-busy": n,
        "is-link": G === "link",
        "is-destructive": o,
        "has-text": !!u && (O || X),
        "has-icon": !!u,
      }),
      N = d && !l,
      V = f !== void 0 && !d ? "a" : "button",
      k =
        V === "button"
          ? {
              "type": "button",
              "disabled": N,
              "aria-checked": y,
              "aria-pressed": W,
              "aria-selected": B,
            }
          : {},
      D = V === "a" ? { href: f, target: I } : {},
      h = {};
    if (d && l) {
      (k["aria-disabled"] = !0), (D["aria-disabled"] = !0);
      for (let at of B9)
        h[at] = (ct) => {
          ct && (ct.stopPropagation(), ct.preventDefault());
        };
    }
    let L = !N && ((s && !!x) || !!m || (!!x && !p?.length && s !== !1)),
      M = g ? S : void 0,
      pe = F["aria-describedby"] || M,
      Se = {
        "className": Y,
        "aria-label": F["aria-label"] || x,
        "aria-describedby": pe,
        "ref": t,
      },
      he = (0, ht.jsxs)(ht.Fragment, {
        children: [
          u && i === "left" && (0, ht.jsx)(Jr, { icon: u, size: a }),
          X && (0, ht.jsx)(ht.Fragment, { children: X }),
          p,
          u && i === "right" && (0, ht.jsx)(Jr, { icon: u, size: a }),
        ],
      }),
      Ae =
        V === "a"
          ? (0, ht.jsx)("a", { ...D, ...F, ...h, ...Se, children: he })
          : (0, ht.jsx)("button", { ...k, ...F, ...h, ...Se, children: he }),
      $t = L
        ? { text: p?.length && g ? g : x, shortcut: m, placement: b && ms(b) }
        : {};
    return (0, ht.jsxs)(ht.Fragment, {
      children: [
        (0, ht.jsx)(HI, { ...$t, children: Ae }),
        g &&
          (0, ht.jsx)(Fn, {
            children: (0, ht.jsx)("span", { id: M, children: g }),
          }),
      ],
    });
  }
  var kW = (0, Z.forwardRef)(F9),
    Ee = kW;
  var Es,
    h9 = new Uint8Array(16);
  function $0() {
    if (
      !Es &&
      ((Es =
        typeof crypto < "u" &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !Es)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return Es(h9);
  }
  var gt = [];
  for (let e = 0; e < 256; ++e) gt.push((e + 256).toString(16).slice(1));
  function wW(e, t = 0) {
    return (
      gt[e[t + 0]] +
      gt[e[t + 1]] +
      gt[e[t + 2]] +
      gt[e[t + 3]] +
      "-" +
      gt[e[t + 4]] +
      gt[e[t + 5]] +
      "-" +
      gt[e[t + 6]] +
      gt[e[t + 7]] +
      "-" +
      gt[e[t + 8]] +
      gt[e[t + 9]] +
      "-" +
      gt[e[t + 10]] +
      gt[e[t + 11]] +
      gt[e[t + 12]] +
      gt[e[t + 13]] +
      gt[e[t + 14]] +
      gt[e[t + 15]]
    );
  }
  var V9 =
      typeof crypto < "u" &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
    eG = { randomUUID: V9 };
  function C9(e, t, c) {
    if (eG.randomUUID && !t && !e) return eG.randomUUID();
    e = e || {};
    let l = e.random || (e.rng || $0)();
    if (((l[6] = (l[6] & 15) | 64), (l[8] = (l[8] & 63) | 128), t)) {
      c = c || 0;
      for (let n = 0; n < 16; ++n) t[c + n] = l[n];
      return t;
    }
    return wW(l);
  }
  var js = C9;
  var OW = C(E()),
    SW = new Set(),
    tG = new WeakMap(),
    Y9 = (e) => {
      if (tG.has(e)) return tG.get(e);
      let t = js().replace(/[0-9]/g, "");
      for (; SW.has(t); ) t = js().replace(/[0-9]/g, "");
      SW.add(t);
      let c = Cr({ container: e, key: t });
      return tG.set(e, c), c;
    };
  function N9(e) {
    let { children: t, document: c } = e;
    if (!c) return null;
    let l = Y9(c.head);
    return (0, OW.jsx)(a0, { value: l, children: t });
  }
  var QW = N9;
  var AW = C(E());
  function z9(e, t) {
    let c = tt(e, "InputControlSuffixWrapper");
    return (0, AW.jsx)(fW, { ...c, ref: t });
  }
  var k9 = At(z9, "InputControlSuffixWrapper"),
    LW = k9;
  var w9 = ({ disabled: e }) =>
      e ? U("color:", Ge.ui.textDisabled, ";cursor:default;", "") : "",
    S9 = { name: "1lv1yo7", styles: "display:inline-flex" },
    O9 = ({ variant: e }) => (e === "minimal" ? S9 : ""),
    TW = we(BW, { target: "e1mv6sxx3" })(
      "color:",
      Ge.theme.foreground,
      ";cursor:pointer;",
      w9,
      " ",
      O9,
      ";"
    ),
    Q9 = ({
      __next40pxDefaultSize: e,
      multiple: t,
      selectSize: c = "default",
    }) => {
      if (t) return;
      let l = {
        "default": {
          height: 40,
          minHeight: 40,
          paddingTop: 0,
          paddingBottom: 0,
        },
        "small": { height: 24, minHeight: 24, paddingTop: 0, paddingBottom: 0 },
        "compact": {
          height: 32,
          minHeight: 32,
          paddingTop: 0,
          paddingBottom: 0,
        },
        "__unstable-large": {
          height: 40,
          minHeight: 40,
          paddingTop: 0,
          paddingBottom: 0,
        },
      };
      e || (l.default = l.compact);
      let n = l[c] || l.default;
      return U(n, "", "");
    },
    cG = 18,
    A9 = ({
      __next40pxDefaultSize: e,
      multiple: t,
      selectSize: c = "default",
    }) => {
      let l = {
        "default": ae.controlPaddingX,
        "small": ae.controlPaddingXSmall,
        "compact": ae.controlPaddingXSmall,
        "__unstable-large": ae.controlPaddingX,
      };
      e || (l.default = l.compact);
      let n = l[c] || l.default;
      return Vc({
        paddingLeft: n,
        paddingRight: n + cG,
        ...(t ? { paddingTop: n, paddingBottom: n } : {}),
      });
    },
    L9 = ({ multiple: e }) => ({ overflow: e ? "auto" : "hidden" }),
    T9 = { name: "n1jncc", styles: "field-sizing:content" },
    D9 = ({ variant: e }) => (e === "minimal" ? T9 : ""),
    DW = we("select", { target: "e1mv6sxx2" })(
      "&&&{appearance:none;background:transparent;box-sizing:border-box;border:none;box-shadow:none!important;color:currentColor;cursor:inherit;display:block;font-family:inherit;margin:0;width:100%;max-width:none;white-space:nowrap;text-overflow:ellipsis;",
      P0,
      ";",
      Q9,
      ";",
      A9,
      ";",
      L9,
      " ",
      D9,
      ";}"
    ),
    UW = we("div", { target: "e1mv6sxx1" })(
      "margin-inline-end:",
      ce(-1),
      ";line-height:0;path{fill:currentColor;}"
    ),
    MW = we(LW, { target: "e1mv6sxx0" })(
      "position:absolute;pointer-events:none;",
      Vc({ right: 0 }),
      ";"
    );
  var Ps = C(E()),
    U9 = () =>
      (0, Ps.jsx)(MW, {
        children: (0, Ps.jsx)(UW, {
          children: (0, Ps.jsx)(V0, { icon: zu, size: cG }),
        }),
      }),
    EW = U9;
  var go = C(E());
  function M9(e) {
    let c = `inspector-select-control-${zt(jW)}`;
    return e || c;
  }
  function E9({ options: e }) {
    return e.map(({ id: t, label: c, value: l, ...n }, o) => {
      let r = t || `${c}-${l}-${o}`;
      return (0, go.jsx)("option", { value: l, ...n, children: c }, r);
    });
  }
  function j9(e, t) {
    let {
        className: c,
        disabled: l = !1,
        help: n,
        hideLabelFromVision: o,
        id: r,
        label: d,
        multiple: u = !1,
        onChange: i,
        options: a = [],
        size: s = "default",
        value: b,
        labelPosition: m = "top",
        children: x,
        prefix: p,
        suffix: R,
        variant: X = "default",
        __next40pxDefaultSize: G = !1,
        __nextHasNoMarginBottom: g = !1,
        ...H
      } = Us(e),
      f = M9(r),
      I = n ? `${f}__help` : void 0;
    if (!a?.length && !x) return null;
    let y = (B) => {
        if (e.multiple) {
          let S = Array.from(B.target.options)
            .filter(({ selected: O }) => O)
            .map(({ value: O }) => O);
          e.onChange?.(S, { event: B });
          return;
        }
        e.onChange?.(B.target.value, { event: B });
      },
      W = Qe("components-select-control", c);
    return (0, go.jsx)(Ms, {
      help: n,
      id: f,
      __nextHasNoMarginBottom: g,
      __associatedWPComponentName: "SelectControl",
      children: (0, go.jsx)(TW, {
        className: W,
        disabled: l,
        hideLabelFromVision: o,
        id: f,
        isBorderless: X === "minimal",
        label: d,
        size: s,
        suffix: R || (!u && (0, go.jsx)(EW, {})),
        prefix: p,
        labelPosition: m,
        __unstableInputWidth: X === "minimal" ? "auto" : void 0,
        variant: X,
        __next40pxDefaultSize: G,
        children: (0, go.jsx)(DW, {
          ...H,
          "__next40pxDefaultSize": G,
          "aria-describedby": I,
          "className": "components-select-control__input",
          "disabled": l,
          "id": f,
          "multiple": u,
          "onChange": y,
          "ref": t,
          "selectSize": s,
          "value": b,
          "variant": X,
          "children": x || (0, go.jsx)(E9, { options: a }),
        }),
      }),
    });
  }
  var jW = (0, Z.forwardRef)(j9),
    Lt = jW;
  var P9 = new Set(["alert", "status", "log", "marquee", "timer"]),
    PW = [];
  function KW(e) {
    let t = Array.from(document.body.children),
      c = [];
    PW.push(c);
    for (let l of t)
      l !== e && K9(l) && (l.setAttribute("aria-hidden", "true"), c.push(l));
  }
  function K9(e) {
    let t = e.getAttribute("role");
    return !(
      e.tagName === "SCRIPT" ||
      e.hasAttribute("hidden") ||
      e.hasAttribute("aria-hidden") ||
      e.hasAttribute("aria-live") ||
      (t && P9.has(t))
    );
  }
  function _W() {
    let e = PW.pop();
    if (e) for (let t of e) t.removeAttribute("aria-hidden");
  }
  var q9 = ae.transitionDuration,
    $9 = Number.parseInt(ae.transitionDuration),
    eC = "components-modal__disappear-animation";
  function qW() {
    let e = (0, Z.useRef)(),
      [t, c] = (0, Z.useState)(!1),
      l = kd(),
      n = (0, Z.useCallback)(
        () =>
          new Promise((o) => {
            let r = e.current;
            if (l) {
              o();
              return;
            }
            if (!r) {
              globalThis.SCRIPT_DEBUG === !0 &&
                wl(
                  "wp.components.Modal: the Modal component can't be closed with an exit animation because of a missing reference to the modal frame element."
                ),
                o();
              return;
            }
            let d,
              u = () =>
                new Promise((a) => {
                  (d = (s) => {
                    s.animationName === eC && a();
                  }),
                    r.addEventListener("animationend", d),
                    c(!0);
                }),
              i = () =>
                new Promise((a) => {
                  setTimeout(() => a(), $9 * 1.2);
                });
            Promise.race([u(), i()]).then(() => {
              d && r.removeEventListener("animationend", d), c(!1), o();
            });
          }),
        [l]
      );
    return {
      overlayClassname: t ? "is-animating-out" : void 0,
      frameRef: e,
      frameStyle: { "--modal-frame-animation-duration": `${q9}` },
      closeModal: n,
    };
  }
  var Ht = C(E()),
    $W = (0, Z.createContext)(new Set()),
    ku = new Map();
  function tC(e, t) {
    let {
        bodyOpenClassName: c = "modal-open",
        role: l = "dialog",
        title: n = null,
        focusOnMount: o = !0,
        shouldCloseOnEsc: r = !0,
        shouldCloseOnClickOutside: d = !0,
        isDismissible: u = !0,
        aria: i = { labelledby: void 0, describedby: void 0 },
        onRequestClose: a,
        icon: s,
        closeButtonLabel: b,
        children: m,
        style: x,
        overlayClassName: p,
        className: R,
        contentLabel: X,
        onKeyDown: G,
        isFullScreen: g = !1,
        size: H,
        headerActions: f = null,
        __experimentalHideHeader: I = !1,
      } = e,
      y = (0, Z.useRef)(),
      W = zt(eB),
      B = n ? `components-modal-header-${W}` : i.labelledby,
      F = pa(o === "firstContentElement" ? "firstElement" : o),
      S = UX(),
      O = MX(),
      v = (0, Z.useRef)(null),
      Y = (0, Z.useRef)(null),
      [N, V] = (0, Z.useState)(!1),
      [k, D] = (0, Z.useState)(!1),
      h;
    g || H === "fill" ? (h = "is-full-screen") : H && (h = `has-size-${H}`);
    let L = (0, Z.useCallback)(() => {
      if (!v.current) return;
      let $ = Nd(v.current);
      v.current === $ ? D(!0) : D(!1);
    }, [v]);
    (0, Z.useEffect)(() => (KW(y.current), () => _W()), []);
    let M = (0, Z.useRef)();
    (0, Z.useEffect)(() => {
      M.current = a;
    }, [a]);
    let pe = (0, Z.useContext)($W),
      [Se] = (0, Z.useState)(() => new Set());
    (0, Z.useEffect)(() => {
      pe.add(M);
      for (let $ of pe) $ !== M && $.current?.();
      return () => {
        for (let $ of Se) $.current?.();
        pe.delete(M);
      };
    }, [pe, Se]),
      (0, Z.useEffect)(() => {
        var $;
        let Le = c,
          ec = 1 + (($ = ku.get(Le)) !== null && $ !== void 0 ? $ : 0);
        return (
          ku.set(Le, ec),
          document.body.classList.add(c),
          () => {
            let Gl = ku.get(Le) - 1;
            Gl === 0
              ? (document.body.classList.remove(Le), ku.delete(Le))
              : ku.set(Le, Gl);
          }
        );
      }, [c]);
    let {
      closeModal: he,
      frameRef: Ae,
      frameStyle: $t,
      overlayClassname: at,
    } = qW();
    (0, Z.useLayoutEffect)(() => {
      if (!window.ResizeObserver || !Y.current) return;
      let $ = new ResizeObserver(L);
      return (
        $.observe(Y.current),
        L(),
        () => {
          $.disconnect();
        }
      );
    }, [L, Y]);
    function ct($) {
      r &&
        ($.code === "Escape" || $.key === "Escape") &&
        !$.defaultPrevented &&
        ($.preventDefault(), he().then(() => a($)));
    }
    let xc = (0, Z.useCallback)(
        ($) => {
          var Le;
          let ec =
            (Le = $?.currentTarget?.scrollTop) !== null && Le !== void 0
              ? Le
              : -1;
          !N && ec > 0 ? V(!0) : N && ec <= 0 && V(!1);
        },
        [N]
      ),
      st = null,
      Tl = {
        onPointerDown: ($) => {
          $.target === $.currentTarget && ((st = $.target), $.preventDefault());
        },
        onPointerUp: ({ target: $, button: Le }) => {
          let ec = $ === st;
          (st = null), Le === 0 && ec && he().then(() => a());
        },
      },
      Dl = (0, Ht.jsx)("div", {
        ref: xn([y, t]),
        className: Qe("components-modal__screen-overlay", at, p),
        onKeyDown: vW(ct),
        ...(d ? Tl : {}),
        children: (0, Ht.jsx)(QW, {
          document,
          children: (0, Ht.jsx)("div", {
            "className": Qe("components-modal__frame", h, R),
            "style": { ...$t, ...x },
            "ref": xn([Ae, S, O, o !== "firstContentElement" ? F : null]),
            "role": l,
            "aria-label": X,
            "aria-labelledby": X ? void 0 : B,
            "aria-describedby": i.describedby,
            "tabIndex": -1,
            "onKeyDown": G,
            "children": (0, Ht.jsxs)("div", {
              "className": Qe("components-modal__content", {
                "hide-header": I,
                "is-scrollable": k,
                "has-scrolled-content": N,
              }),
              "role": "document",
              "onScroll": xc,
              "ref": v,
              "aria-label": k ? ma("Scrollable section") : void 0,
              "tabIndex": k ? 0 : void 0,
              "children": [
                !I &&
                  (0, Ht.jsxs)("div", {
                    className: "components-modal__header",
                    children: [
                      (0, Ht.jsxs)("div", {
                        className: "components-modal__header-heading-container",
                        children: [
                          s &&
                            (0, Ht.jsx)("span", {
                              "className": "components-modal__icon-container",
                              "aria-hidden": !0,
                              "children": s,
                            }),
                          n &&
                            (0, Ht.jsx)("h1", {
                              id: B,
                              className: "components-modal__header-heading",
                              children: n,
                            }),
                        ],
                      }),
                      f,
                      u &&
                        (0, Ht.jsxs)(Ht.Fragment, {
                          children: [
                            (0, Ht.jsx)(pt, { marginBottom: 0, marginLeft: 3 }),
                            (0, Ht.jsx)(Ee, {
                              size: "small",
                              onClick: ($) => he().then(() => a($)),
                              icon: z0,
                              label: b || ma("Close"),
                            }),
                          ],
                        }),
                    ],
                  }),
                (0, Ht.jsx)("div", {
                  ref: xn([Y, o === "firstContentElement" ? F : null]),
                  children: m,
                }),
              ],
            }),
          }),
        }),
      });
    return (0, ll.createPortal)(
      (0, Ht.jsx)($W.Provider, { value: Se, children: Dl }),
      document.body
    );
  }
  var eB = (0, Z.forwardRef)(tC),
    lG = eB;
  var Al = C(E()),
    cC = () => {};
  function lC(e, t) {
    let {
        buttonProps: c = {},
        children: l,
        className: n,
        icon: o,
        initialOpen: r,
        onToggle: d = cC,
        opened: u,
        title: i,
        scrollAfterOpen: a = !0,
      } = e,
      [s, b] = $x(u, { initial: r === void 0 ? !0 : r, fallback: !1 }),
      m = (0, Z.useRef)(null),
      x = kd() ? "auto" : "smooth",
      p = (G) => {
        G.preventDefault();
        let g = !s;
        b(g), d(g);
      },
      R = (0, Z.useRef)();
    (R.current = a),
      fu(() => {
        s &&
          R.current &&
          m.current?.scrollIntoView &&
          m.current.scrollIntoView({
            inline: "nearest",
            block: "nearest",
            behavior: x,
          });
      }, [s, x]);
    let X = Qe("components-panel__body", n, { "is-opened": s });
    return (0, Al.jsxs)("div", {
      className: X,
      ref: xn([m, t]),
      children: [
        (0, Al.jsx)(nC, { icon: o, isOpened: !!s, onClick: p, title: i, ...c }),
        typeof l == "function" ? l({ opened: !!s }) : s && l,
      ],
    });
  }
  var nC = (0, Z.forwardRef)(({ isOpened: e, icon: t, title: c, ...l }, n) =>
      c
        ? (0, Al.jsx)("h2", {
            className: "components-panel__body-title",
            children: (0, Al.jsxs)(Ee, {
              "className": "components-panel__body-toggle",
              "aria-expanded": e,
              "ref": n,
              ...l,
              "children": [
                (0, Al.jsx)("span", {
                  "aria-hidden": "true",
                  "children": (0, Al.jsx)(Jr, {
                    className: "components-panel__arrow",
                    icon: e ? Y0 : zu,
                  }),
                }),
                c,
                t &&
                  (0, Al.jsx)(Jr, {
                    icon: t,
                    className: "components-panel__icon",
                    size: 20,
                  }),
              ],
            }),
          })
        : null
    ),
    oC = (0, Z.forwardRef)(lC),
    nG = oC;
  var tB = C(E());
  function rC({ className: e, children: t }, c) {
    return (0, tB.jsx)("div", {
      className: Qe("components-panel__row", e),
      ref: c,
      children: t,
    });
  }
  var dC = (0, Z.forwardRef)(rC),
    oG = dC;
  var Ho = C(E()),
    cB = (e) => {
      if (!(typeof e > "u" || e === null))
        return e.match(/^tab-panel-[0-9]*-(.*)/)?.[1];
    },
    uC = (
      {
        className: e,
        children: t,
        tabs: c,
        selectOnMove: l = !0,
        initialTabName: n,
        orientation: o = "horizontal",
        activeClass: r = "is-active",
        onSelect: d,
      },
      u
    ) => {
      let i = zt(lB, "tab-panel"),
        a = (0, Z.useCallback)(
          (R) => {
            if (!(typeof R > "u")) return `${i}-${R}`;
          },
          [i]
        ),
        s = gu({
          setSelectedId: (R) => {
            if (typeof R > "u" || R === null) return;
            let X = c.find((g) => a(g.name) === R);
            if (X?.disabled || X === x) return;
            let G = cB(R);
            typeof G > "u" || d?.(G);
          },
          orientation: o,
          selectOnMove: l,
          defaultSelectedId: a(n),
          rtl: En(),
        }),
        b = cB(oe(s, "selectedId")),
        m = (0, Z.useCallback)(
          (R) => {
            s.setState("selectedId", a(R));
          },
          [a, s]
        ),
        x = c.find(({ name: R }) => R === b),
        p = Za(b);
      return (
        (0, Z.useEffect)(() => {
          p !== b && b === n && b && d?.(b);
        }, [b, n, d, p]),
        (0, Z.useLayoutEffect)(() => {
          if (x) return;
          let R = c.find((X) => X.name === n);
          if (!(n && !R))
            if (R && !R.disabled) m(R.name);
            else {
              let X = c.find((G) => !G.disabled);
              X && m(X.name);
            }
        }, [c, x, n, i, m]),
        (0, Z.useEffect)(() => {
          if (!x?.disabled) return;
          let R = c.find((X) => !X.disabled);
          R && m(R.name);
        }, [c, x?.disabled, m, i]),
        (0, Ho.jsxs)("div", {
          className: e,
          ref: u,
          children: [
            (0, Ho.jsx)(ss, {
              store: s,
              className: "components-tab-panel__tabs",
              children: c.map((R) =>
                (0, Ho.jsx)(
                  as,
                  {
                    "id": a(R.name),
                    "className": Qe(
                      "components-tab-panel__tabs-item",
                      R.className,
                      { [r]: R.name === b }
                    ),
                    "disabled": R.disabled,
                    "aria-controls": `${a(R.name)}-view`,
                    "render": (0, Ho.jsx)(Ee, {
                      __next40pxDefaultSize: !0,
                      icon: R.icon,
                      label: R.icon && R.title,
                      showTooltip: !!R.icon,
                    }),
                    "children": !R.icon && R.title,
                  },
                  R.name
                )
              ),
            }),
            x &&
              (0, Ho.jsx)(bs, {
                id: `${a(x.name)}-view`,
                store: s,
                tabId: a(x.name),
                className: "components-tab-panel__tab-content",
                children: t(x),
              }),
          ],
        })
      );
    },
    lB = (0, Z.forwardRef)(uC),
    wu = lB;
  var rG = C(E());
  function iC(e, t) {
    let {
        __nextHasNoMarginBottom: c,
        __next40pxDefaultSize: l = !1,
        label: n,
        hideLabelFromVision: o,
        value: r,
        help: d,
        id: u,
        className: i,
        onChange: a,
        type: s = "text",
        ...b
      } = e,
      m = zt(nB, "inspector-text-control", u),
      x = (p) => a(p.target.value);
    return (0, rG.jsx)(Ms, {
      __nextHasNoMarginBottom: c,
      __associatedWPComponentName: "TextControl",
      label: n,
      hideLabelFromVision: o,
      id: m,
      help: d,
      className: i,
      children: (0, rG.jsx)("input", {
        "className": Qe("components-text-control__input", {
          "is-next-40px-default-size": l,
        }),
        "type": s,
        "id": m,
        "value": r,
        "onChange": x,
        "aria-describedby": d ? m + "__help" : void 0,
        "ref": t,
        ...b,
      }),
    });
  }
  var nB = (0, Z.forwardRef)(iC),
    je = nB;
  var Cc = C(A());
  var aC = ({ onClick: e }) => {
    let [t, c] = (0, Z.useState)(!1);
    return Cc.default.createElement(
      "svg",
      {
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: { position: "absolute", zIndex: 1, top: "-4px", right: "-5px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
        onClick: () => e(),
      },
      Cc.default.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff",
      }),
      Cc.default.createElement("path", {
        d: "M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff00",
      })
    );
  };
  function sC({ name: e, focus: t, setFocus: c, copy: l }) {
    return Cc.default.createElement(
      "div",
      {
        style: { position: "relative", padding: "0px 24px 0px 10px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
      },
      Cc.default.createElement("span", null, e),
      t && Cc.default.createElement(aC, { onClick: l })
    );
  }
  function dG({ relations: e, setRelations: t, Relation: c }) {
    let l = wp.i18n.__,
      n = er({ filter: !0 }),
      [o, r] = (0, Z.useState)(e[0]?.name || "add"),
      [d, u] = (0, Z.useState)(null),
      i = e
        .map(
          ({
            backend: m,
            endpoint: x,
            post_type: p,
            foreign_key: R = "id",
            fields: X = [],
            ...G
          }) => ({
            ...G,
            name: p,
            title: p,
            post_type: p,
            backend: m,
            endpoint: x,
            foreign_key: R,
            fields: X,
            icon: n.length
              ? Cc.default.createElement(sC, {
                  name: p,
                  focus: d === p,
                  setFocus: (g) => u(g ? p : null),
                  copy: () => b(p),
                })
              : null,
          })
        )
        .concat([{ title: l("Add relation", "posts-bridge"), name: "add" }]),
      a = (m, x) => {
        m === -1 && (m = e.length);
        let p = e
          .slice(0, m)
          .concat([x])
          .concat(e.slice(m + 1, e.length));
        p.forEach((R) => {
          delete R.name, delete R.title, delete R.icon;
        }),
          t(p),
          r(p[m].post_type);
      },
      s = ({ post_type: m }) => {
        let x = e.findIndex((R) => R.post_type === m),
          p = e.slice(0, x).concat(e.slice(x + 1));
        t(p), r(p[x - 1]?.post_type || "add");
      },
      b = (m) => {
        let x = e.findIndex((X) => X.post_type === m),
          p = e[x],
          R = { ...p, fields: JSON.parse(JSON.stringify(p.fields || [])) };
        t(e.concat(R)), r(R.post_type);
      };
    return Cc.default.createElement(
      "div",
      { style: { width: "100%" } },
      Cc.default.createElement(
        "label",
        {
          className: "components-base-control__label",
          style: {
            fontSize: "11px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "calc(8px)",
          },
        },
        l("Posts remote relations", "posts-bridge")
      ),
      Cc.default.createElement(
        wu,
        { tabs: i, onSelect: r, initialTabName: o },
        (m) =>
          Cc.default.createElement(c, {
            data: m,
            remove: s,
            update: (x) =>
              a(
                e.findIndex(({ post_type: p }) => p === m.post_type),
                x
              ),
          })
      )
    );
  }
  var Ll = C(A());
  var it = C(A());
  var Yr = C(A());
  var ye = C(A());
  var uG = {
    ID: "ID",
    post_title: "Title",
    post_name: "Slug",
    post_excerpt: "Excerpt",
    post_content: "Content",
    post_status: "Status",
    featured_media: "Featured media",
    post_date: "Date",
    post_category: "Categories",
    tags_input: "Tags",
  };
  function iG({ fields: e, setFields: t, done: c }) {
    let l = wp.i18n.__,
      n = (0, Z.useMemo)(
        () =>
          Object.keys(uG).map(
            (a) =>
              e.find(({ name: b }) => b === a) || {
                name: a,
                value: null,
                index: null,
              }
          ),
        [e]
      ),
      o = (0, Z.useMemo)(() => {
        let a = e.filter(({ name: s }) => !Object.hasOwnProperty.call(uG, s));
        return a.length ? a : [{ name: "", foreign: "", index: e.length }];
      }, [e]),
      r = (a, s, b) => {
        let m;
        s >= e.length
          ? (m = e.concat({ name: "", foreign: "", index: s, [a]: b }))
          : (m = e.map(
              (x, p) => (
                s === p &&
                  ((x[a] = b), a === "name" && x.foreign !== b && (x.name = b)),
                { ...x }
              )
            )),
          t(m);
      },
      d = (a, s, b) => {
        s === null ? u(a, b) : r("foreign", s, b);
      },
      u = (a = "", s = "") => {
        let b = e.concat([{ name: a, foreign: s, index: e.length }]);
        t(b);
      },
      i = (a) => {
        let s = e.slice(0, a).concat(e.slice(a + 1));
        t(s);
      };
    return ye.default.createElement(
      ye.default.Fragment,
      null,
      ye.default.createElement(
        "label",
        {
          className: "components-base-control__label",
          style: {
            fontSize: "11px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "calc(8px)",
          },
        },
        l("Post fields", "posts-bridge")
      ),
      ye.default.createElement(
        "table",
        { style: { width: "100%", minWidth: "500px" } },
        ye.default.createElement(
          "tbody",
          null,
          n.map(({ name: a, foreign: s, index: b }) =>
            ye.default.createElement(
              "tr",
              { key: a },
              ye.default.createElement(
                "td",
                null,
                ye.default.createElement("b", null, uG[a])
              ),
              ye.default.createElement(
                "td",
                null,
                ye.default.createElement(je, {
                  placeholder: l("Foreign field name", "posts-bridge"),
                  value: s || "",
                  onChange: (m) => d(a, b, m),
                  __nextHasNoMarginBottom: !0,
                })
              )
            )
          )
        )
      ),
      ye.default.createElement(pt, { paddingY: "calc(3px)" }),
      ye.default.createElement(
        "div",
        { style: { display: "flex" } },
        ye.default.createElement(
          "label",
          {
            className: "components-base-control__label",
            style: {
              fontSize: "11px",
              textTransform: "uppercase",
              fontWeight: 500,
              lineHeight: "32px",
            },
          },
          l("Custom fields", "posts-bridge")
        ),
        ye.default.createElement(
          Ee,
          {
            variant: "secondary",
            onClick: () => u(),
            style: {
              marginLeft: "1em",
              height: "32px",
              marginBottom: "calc(8px)",
            },
          },
          l("Add", "posts-bridge")
        )
      ),
      ye.default.createElement(
        "table",
        { style: { width: "100%", minWidth: "500px" } },
        ye.default.createElement(
          "tbody",
          null,
          o.map(({ foreign: a, name: s, index: b }) =>
            ye.default.createElement(
              "tr",
              { key: b },
              ye.default.createElement(
                "td",
                null,
                ye.default.createElement(je, {
                  placeholder: l("Custom field name", "posts-bridge"),
                  value: s,
                  onChange: (m) => r("name", b, m),
                  __nextHasNoMarginBottom: !0,
                })
              ),
              ye.default.createElement(
                "td",
                null,
                ye.default.createElement(je, {
                  placeholder: l("Foreign field name", "posts-bridge"),
                  value: a,
                  onChange: (m) => r("foreign", b, m),
                  __nextHasNoMarginBottom: !0,
                })
              ),
              ye.default.createElement(
                "td",
                { style: { borderLeft: "1rem solid transparent" } },
                ye.default.createElement(
                  Ee,
                  {
                    isDestructive: !0,
                    variant: "secondary",
                    onClick: () => i(b),
                    style: { height: "32px" },
                  },
                  l("Drop", "posts-bridge")
                )
              )
            )
          )
        )
      ),
      ye.default.createElement(pt, { paddingY: "calc(3px)" }),
      ye.default.createElement(
        Ee,
        { variant: "primary", onClick: () => c(), style: { height: "32px" } },
        l("Done", "posts-bridge")
      )
    );
  }
  function aG({ fields: e, setFields: t }) {
    let c = wp.i18n.__,
      [l, n] = (0, Z.useState)(!1),
      o = (r) => {
        r.forEach((d) => {
          delete d.index;
        }),
          t(r);
      };
    return Yr.default.createElement(
      Yr.default.Fragment,
      null,
      Yr.default.createElement(
        Ee,
        {
          variant: "secondary",
          onClick: () => n(!0),
          style: { width: "130px", justifyContent: "center", height: "32px" },
        },
        c("Remote fields", "posts-bridge")
      ),
      l &&
        Yr.default.createElement(
          lG,
          {
            title: c("Remote fields", "posts-bridge"),
            onRequestClose: () => n(!1),
          },
          Yr.default.createElement(iG, {
            fields: e.map((r, d) => ({ ...r, index: d })),
            setFields: o,
            done: () => n(!1),
          })
        )
    );
  }
  var qt = C(A());
  function Su({ add: e, schema: t, children: c = () => {} }) {
    let l = wp.i18n.__,
      [{ backends: n }] = mn(),
      o = [{ label: "", value: "" }].concat(
        n.map(({ name: g }) => ({ label: g, value: g }))
      ),
      r = er({ filter: !0 }),
      d = [{ label: "", value: "" }].concat(
        r.map((g) => ({ label: g, value: g }))
      ),
      [u, i] = (0, Z.useState)(""),
      [a, s] = (0, Z.useState)(""),
      [b, m] = (0, Z.useState)(""),
      [x, p] = (0, Z.useState)({}),
      R = (0, Z.useMemo)(() =>
        t.filter((g) => !["post_type", "backend", "foreign_key"].includes(g))
      ),
      X = () => {
        e({ ...x, post_type: u, backend: a, foreigh_key: b, fields: [] }),
          i(""),
          s(""),
          m(""),
          p({});
      },
      G = (0, Z.useMemo)(
        () =>
          !(
            u &&
            (a || !t.includes("backend")) &&
            (b || !t.includes("foreign_key")) &&
            R.reduce((g, H) => g && x[H], !0)
          ),
        [u, a, b, x, R]
      );
    return qt.default.createElement(
      "div",
      {
        style: {
          padding: "calc(24px) calc(32px)",
          width: "calc(100% - 64px)",
          backgroundColor: "rgb(245, 245, 245)",
        },
      },
      qt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        qt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          qt.default.createElement(Lt, {
            label: l("Post type", "posts-bridge"),
            value: u,
            onChange: i,
            options: d,
            __nextHasNoMarginBottom: !0,
          })
        ),
        t.includes("backend") &&
          qt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            qt.default.createElement(Lt, {
              label: l("Backend", "posts-bridge"),
              value: a,
              onChange: s,
              options: o,
              __nextHasNoMarginBottom: !0,
            })
          ),
        t.includes("foreign_key") &&
          qt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            qt.default.createElement(je, {
              label: l("Foreign key", "posts-bridge"),
              value: b,
              onChange: m,
              __nextHasNoMarginBottom: !0,
            })
          ),
        c({ data: x, update: (g) => p(g) })
      ),
      qt.default.createElement(pt, { paddingY: "calc(8px)" }),
      qt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        qt.default.createElement(
          "div",
          null,
          qt.default.createElement(
            "label",
            {
              style: {
                display: "block",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "11px",
                margin: 0,
                marginBottom: "calc(4px)",
                maxWidth: "100%",
              },
            },
            l("Add relation", "posts-bridge")
          ),
          qt.default.createElement(
            Ee,
            {
              variant: "primary",
              onClick: () => X(),
              style: {
                width: "130px",
                justifyContent: "center",
                height: "32px",
              },
              disabled: G,
            },
            l("Add", "posts-bridge")
          )
        )
      )
    );
  }
  function sG({
    data: e,
    update: t,
    remove: c,
    schema: l = ["post_type", "backend", "foreign_key"],
    template: n = ({ add: r, schema: d }) =>
      it.default.createElement(Su, { add: r, schema: d }),
    children: o = () => {},
  }) {
    if (e.name === "add") return n({ add: t, schema: l });
    let r = wp.i18n.__,
      [{ backends: d }] = mn(),
      u = [{ label: "", value: "" }].concat(
        d.map(({ name: s }) => ({ label: s, value: s }))
      ),
      i = er({ filter: !0 }),
      a = [{ label: "", value: "" }].concat(
        i
          .filter((s) => s !== e.post_type)
          .map((s) => ({ label: s, value: s }))
          .concat([{ label: e.post_type, value: e.post_type }])
      );
    return it.default.createElement(
      "div",
      {
        style: {
          padding: "calc(24px) calc(32px)",
          width: "calc(100% - 64px)",
          backgroundColor: "rgb(245, 245, 245)",
        },
      },
      it.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        it.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          it.default.createElement(Lt, {
            label: r("Post type", "posts-bridge"),
            value: e.post_type,
            onChange: (s) => t({ ...e, post_type: s }),
            options: a,
            __nextHasNoMarginBottom: !0,
          })
        ),
        l.includes("backend") &&
          it.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            it.default.createElement(Lt, {
              label: r("Backend", "posts-bridge"),
              value: e.backend,
              onChange: (s) => t({ ...e, backend: s }),
              options: u,
              __nextHasNoMarginBottom: !0,
            })
          ),
        l.includes("foreign_key") &&
          it.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            it.default.createElement(je, {
              label: r("Foreign key", "posts-bridge"),
              value: e.foreign_key,
              onChange: (s) => t({ ...e, foreign_key: s }),
              __nextHasNoMarginBottom: !0,
            })
          ),
        o({ data: e, update: t })
      ),
      it.default.createElement(pt, { paddingY: "calc(8px)" }),
      it.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        it.default.createElement(
          "div",
          null,
          it.default.createElement(
            "label",
            {
              style: {
                display: "block",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "calc(4px)",
              },
            },
            r("Map fields", "posts-bridge")
          ),
          it.default.createElement(aG, {
            fields: e.fields || [],
            setFields: (s) => t({ ...e, fields: s }),
          })
        ),
        it.default.createElement(
          "div",
          null,
          it.default.createElement(
            "label",
            {
              style: {
                display: "block",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "11px",
                margin: 0,
                marginBottom: "calc(4px)",
                maxWidth: "100%",
              },
            },
            r("Remove relation", "posts-bridge")
          ),
          it.default.createElement(
            Ee,
            {
              isDestructive: !0,
              variant: "primary",
              onClick: () => c(e),
              style: {
                width: "130px",
                justifyContent: "center",
                height: "32px",
              },
            },
            r("Remove", "posts-bridge")
          )
        )
      )
    );
  }
  var Vn = C(A());
  function Zo() {
    let [{ "odoo-api": e = { databases: [], relations: [] } }, t] = HX();
    return [e, (l) => t({ "odoo-api": l })];
  }
  function bG({ add: e, schema: t }) {
    let c = wp.i18n.__,
      [{ databases: l }] = Zo(),
      n = [{ label: "", value: "" }].concat(
        l.map(({ name: o }) => ({ label: o, value: o }))
      );
    return Vn.default.createElement(
      Su,
      { add: e, schema: t },
      ({ data: o, update: r }) =>
        Vn.default.createElement(
          Vn.default.Fragment,
          null,
          Vn.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Vn.default.createElement(Lt, {
              label: c("Database", "posts-bridge"),
              help:
                l.length === 0
                  ? c(
                      "Configure, at least, one database access on the panel below"
                    )
                  : "",
              value: o.database,
              onChange: (d) => r({ ...o, database: d }),
              options: n,
              __nextHasNoMarginBottom: !0,
            })
          ),
          Vn.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Vn.default.createElement(je, {
              label: c("Model", "posts-bridge"),
              value: o.model || "",
              onChange: (d) => r({ ...o, model: d }),
              __nextHasNoMarginBottom: !0,
            })
          )
        )
    );
  }
  function mG({ data: e, update: t, remove: c }) {
    let l = wp.i18n.__,
      [{ databases: n }] = Zo(),
      o = [{ label: "", value: "" }].concat(
        n.map(({ name: r }) => ({ label: r, value: r }))
      );
    return Ll.default.createElement(
      sG,
      {
        data: e,
        update: t,
        remove: c,
        template: ({ add: r, schema: d }) =>
          Ll.default.createElement(bG, { add: r, schema: d }),
        schema: ["post_type", "database", "model"],
      },
      ({ data: r, update: d }) =>
        Ll.default.createElement(
          Ll.default.Fragment,
          null,
          Ll.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Ll.default.createElement(je, {
              label: l("Model", "posts-bridge"),
              value: r.model,
              onChange: (u) => d({ ...r, model: u }),
              __nextHasNoMarginBottom: !0,
            })
          ),
          Ll.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Ll.default.createElement(Lt, {
              label: l("Database", "posts-bridge"),
              value: r.database,
              onChange: (u) => d({ ...r, database: u }),
              options: o,
              __nextHasNoMarginBottom: !0,
            })
          )
        )
    );
  }
  var Jc = C(A());
  var Zt = C(A());
  var Vt = C(A());
  function XG({ add: e, databases: t }) {
    let c = wp.i18n.__,
      [{ backends: l }] = mn(),
      n = [{ label: "", value: "" }].concat(
        l.map(({ name: g }) => ({ label: g, value: g }))
      ),
      o = (0, Z.useMemo)(() => new Set(t.map(({ name: g }) => g)), [t]),
      [r, d] = (0, Z.useState)(""),
      [u, i] = (0, Z.useState)(""),
      [a, s] = (0, Z.useState)(!1),
      [b, m] = (0, Z.useState)(""),
      [x, p] = (0, Z.useState)(""),
      R = (g) => {
        s(o.has(g.trim())), d(g);
      },
      X = () => {
        e({ name: r.trim(), backend: u, user: b, password: x }),
          d(""),
          i(""),
          m(""),
          p(""),
          s(!1);
      },
      G = !(r && u && b && x && !a);
    return Vt.default.createElement(
      "div",
      {
        style: {
          padding: "calc(24px) calc(32px)",
          width: "calc(100% - 64px)",
          backgroundColor: "rgb(245, 245, 245)",
        },
      },
      Vt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        Vt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Vt.default.createElement(je, {
            label: c("Name", "forms-bridge"),
            help: a ? c("This name is already in use", "forms-bridge") : "",
            value: r,
            onChange: R,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Vt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Vt.default.createElement(Lt, {
            label: c("Backend", "forms-bridge"),
            value: u,
            onChange: i,
            options: n,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Vt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Vt.default.createElement(je, {
            label: c("User", "forms-bridge"),
            value: b,
            onChange: m,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Vt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Vt.default.createElement(je, {
            label: c("Password", "forms-bridge"),
            value: x,
            onChange: p,
            __nextHasNoMarginBottom: !0,
          })
        )
      ),
      Vt.default.createElement(pt, { paddingY: "calc(8px)" }),
      Vt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        Vt.default.createElement(
          "div",
          null,
          Vt.default.createElement(
            "label",
            {
              style: {
                display: "block",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "11px",
                margin: 0,
                marginBottom: "calc(4px)",
                maxWidth: "100%",
              },
            },
            c("Add database", "forms-bridge")
          ),
          Vt.default.createElement(
            Ee,
            {
              variant: "primary",
              onClick: () => X(),
              style: {
                width: "130px",
                justifyContent: "center",
                height: "32px",
              },
              disabled: G,
            },
            c("Add", "forms-bridge")
          )
        )
      )
    );
  }
  function xG({ data: e, update: t, remove: c, databases: l }) {
    if (e.name === "add")
      return Zt.default.createElement(XG, { add: t, databases: l });
    let n = wp.i18n.__,
      [{ backends: o }] = mn(),
      r = [{ label: "", value: "" }].concat(
        o.map(({ name: p }) => ({ label: p, value: p }))
      ),
      [d, u] = (0, Z.useState)(e.name),
      i = (0, Z.useRef)(e.name),
      a = (0, Z.useMemo)(() => new Set(l.map(({ name: p }) => p)), [l]),
      [s, b] = (0, Z.useState)(!1),
      m = (p) => {
        b(p !== i.current && a.has(p.trim())), u(p);
      },
      x = (0, Z.useRef)();
    return (
      (0, Z.useEffect)(() => {
        clearTimeout(x.current),
          !(!d || s) &&
            (x.current = setTimeout(() => {
              a.has(d.trim()) || t({ ...e, name: d.trim() });
            }, 500));
      }, [d]),
      (0, Z.useEffect)(() => u(e.name), [e.name]),
      Zt.default.createElement(
        "div",
        {
          style: {
            padding: "calc(24px) calc(32px)",
            width: "calc(100% - 64px)",
            backgroundColor: "rgb(245, 245, 245)",
          },
        },
        Zt.default.createElement(
          "div",
          { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
          Zt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Zt.default.createElement(je, {
              label: n("Name", "forms-bridge"),
              help: s ? n("This name is already in use", "forms-bridge") : "",
              value: d,
              onChange: m,
              onFocus: () => (focus = !0),
              onBlur: () => (focus = !1),
              __nextHasNoMarginBottom: !0,
            })
          ),
          Zt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Zt.default.createElement(Lt, {
              label: n("Backend", "forms-bridge"),
              value: e.backend,
              onChange: (p) => t({ ...e, backend: p }),
              options: r,
              __nextHasNoMarginBottom: !0,
            })
          ),
          Zt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Zt.default.createElement(je, {
              label: n("User", "forms-bridge"),
              value: e.user,
              onChange: (p) => t({ ...e, user: p }),
              __nextHasNoMarginBottom: !0,
            })
          ),
          Zt.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Zt.default.createElement(je, {
              label: n("Password", "forms-bridge"),
              value: e.password,
              onChange: (p) => t({ ...e, password: p }),
              __nextHasNoMarginBottom: !0,
            })
          )
        ),
        Zt.default.createElement(pt, { paddingY: "calc(8px)" }),
        Zt.default.createElement(
          "div",
          { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
          Zt.default.createElement(
            "div",
            null,
            Zt.default.createElement(
              "label",
              {
                style: {
                  display: "block",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "11px",
                  margin: 0,
                  marginBottom: "calc(4px)",
                  maxWidth: "100%",
                },
              },
              n("Remove database", "forms-bridge")
            ),
            Zt.default.createElement(
              Ee,
              {
                isDestructive: !0,
                variant: "primary",
                onClick: () => c(e),
                style: {
                  width: "130px",
                  justifyContent: "center",
                  height: "32px",
                },
              },
              n("Remove", "forms-bridge")
            )
          )
        )
      )
    );
  }
  var bC = ({ onClick: e }) => {
    let [t, c] = (0, Z.useState)(!1);
    return Jc.default.createElement(
      "svg",
      {
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: { position: "absolute", zIndex: 1, top: "-4px", right: "-5px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
        onClick: () => e(),
      },
      Jc.default.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff",
      }),
      Jc.default.createElement("path", {
        d: "M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff00",
      })
    );
  };
  function mC({ name: e, focus: t, setFocus: c, copy: l }) {
    return Jc.default.createElement(
      "div",
      {
        style: { position: "relative", padding: "0px 24px 0px 10px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
      },
      Jc.default.createElement("span", null, e),
      t && Jc.default.createElement(bC, { onClick: l })
    );
  }
  function GG({ databases: e, setDatabases: t }) {
    let c = wp.i18n.__,
      [l, n] = (0, Z.useState)(e[0]?.name || "add"),
      [o, r] = (0, Z.useState)(null),
      d = e
        .map(({ name: s, user: b, password: m, backend: x }) => ({
          name: s,
          title: s,
          user: b,
          password: m,
          backend: x,
          icon: Jc.default.createElement(mC, {
            name: s,
            focus: o === s,
            setFocus: (p) => r(p ? s : null),
            copy: () => a(s),
          }),
        }))
        .concat([{ title: c("Add database", "forms-bridge"), name: "add" }]),
      u = (s, b) => {
        s === -1 && (s = e.length);
        let m = e
          .slice(0, s)
          .concat([b])
          .concat(e.slice(s + 1, e.length));
        m.forEach((x) => {
          delete x.title, delete x.icon;
        }),
          t(m),
          n(m[s].name);
      },
      i = ({ name: s }) => {
        let b = e.findIndex((x) => x.name === s),
          m = e.slice(0, b).concat(e.slice(b + 1));
        t(m), n(m[b - 1]?.name || "add");
      },
      a = (s) => {
        let b = e.findIndex((R) => R.name === s),
          x = { ...e[b] },
          p = !1;
        p ||
          ((x.name += "-copy"),
          (p = e.find((R) => R.name === x.name) === void 0)),
          t(e.concat(x)),
          n(x.name);
      };
    return Jc.default.createElement(
      "div",
      { style: { width: "100%" } },
      Jc.default.createElement(
        "label",
        {
          className: "components-base-control__label",
          style: {
            fontSize: "11px",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "calc(8px)",
          },
        },
        c("Databases", "forms-bridge")
      ),
      Jc.default.createElement(
        wu,
        { tabs: d, onSelect: n, initialTabName: l },
        (s) =>
          Jc.default.createElement(xG, {
            data: s,
            remove: i,
            update: (b) =>
              u(
                e.findIndex(({ name: m }) => m === s.name),
                b
              ),
            databases: e,
          })
      )
    );
  }
  function pG() {
    let e = wp.i18n.__,
      [{ databases: t, relations: c }, l] = Zo(),
      n = (o) => l({ databases: t, relations: c, ...o });
    return Cn.default.createElement(
      Cn.default.Fragment,
      null,
      Cn.default.createElement(
        oG,
        null,
        Cn.default.createElement(dG, {
          relations: c,
          setRelations: (o) => n({ relations: o }),
          Relation: mG,
        })
      ),
      Cn.default.createElement(pt, { paddingY: "calc(8px)" }),
      Cn.default.createElement(
        nG,
        { title: e("Databases", "posts-bridge"), initialOpen: t.length === 0 },
        Cn.default.createElement(GG, {
          databases: t,
          setDatabases: (o) => n({ databases: o }),
        })
      )
    );
  }
  var oB =
    "iVBORw0KGgoAAAANSUhEUgAAAfQAAADCCAMAAACIXMC8AAAAw3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPxnio7gV8CMQ5pE6gYdvwYbKbQ9ifNhw2GczvfrSo8OQkmyFc01ZzBIlUrNhIKjDUaQwQOXhMI1n54Ul8hSbJF9q9kjznxcmBGbqe1mpM8o7GuhSvjrl1E8zL2jro8wqmHE5AUMg+bfgly13L+wn7BCfaVOomvbP/ti0zs2e4eJTkYGY2bxBrgvSdysQIPFDiJn08Bl8DSzgfyb00T6AHWBWXL3mP+ZAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TS0WqHSwo4pChOtlFRRxrFYpQodQKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxdnBSdJES/5cUWsR4cNyPd/ced+8AoVllqtkTB1TNMjLJhJjLr4rBV4QwgDACGJKYqc+l0yl4jq97+Ph6F+NZ3uf+HP1KwWSATySOM92wiDeIZzYtnfM+cYSVJYX4nHjCoAsSP3JddvmNc8lhgWdGjGxmnjhCLJa6WO5iVjZU4mniqKJqlC/kXFY4b3FWq3XWvid/YaigrSxzneYokljEEtIQIaOOCqqwEKNVI8VEhvYTHv4Rx58ml0yuChg5FlCDCsnxg//B727N4tSkmxRKAIEX2/4YA4K7QKth29/Htt06AfzPwJXW8deawOwn6Y2OFj0CwtvAxXVHk/eAyx1g+EmXDMmR/DSFYhF4P6NvygODt0Dfmttbex+nD0CWukrdAAeHwHiJstc93t3b3du/Z9r9/QBKVnKW9KmKxgAADXhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6OWY2MjM1MDUtZDFiMy00MjFkLWE0ODYtYmY3ZTZiYjU2MTUyIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmYyY2M3ZGUwLTZjNjAtNGIwYi05ZjYwLTljYjcwN2E2M2IyZSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmE2N2EyNDQyLTYyYTYtNDhhZi05NDYzLWI1MTk4NDZlZGY2OSIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTczNDE4ODgyMjI0NjQ1NyIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjM0IgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNDoxMjoxNFQxNjowNzowMCswMTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQ6MTI6MTRUMTY6MDc6MDArMDE6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTljZTE1Zi1jZDE3LTRkOGItYjVjOC00NDFhYjc1ZDQzNjQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDI0LTEyLTE0VDE2OjA3OjAyKzAxOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pn2O54UAAAHLUExURTEAAEdwTIiIiImGiIiIiIiIiI17hop8hYeHh5aHlriguIiIiIeHh4iIiIiIiIiIiIeHh4eHh4iIiIeHh4eHh4iIiIiIiIiIiIeHh4eHh4iIiIeHh4iIiIeHh4eHh4eHh4iIiIeHh4eHh4iIiIiIiJtWiIiIiIiIiIeHh4iIiIeHh4eHh4iIiIiIiImJiZxWiZxUi4iIiIiIiJ1YiIeHh5xXiJxWiZxXiZtWiJxXiZxXiYiIiJtWiJxWiZtXiYeHh5tWiJtXiYeHh5xWiJxXiJtWiJtWiJxXiZxWiJxWiJxXiYiIiJxWiZtXiIeHh5xWiZxXiJxWiJxWiJxWiZxWiYiIiJxWif///4iIiJxXiYqKivn4+f39/fv7+42NjdbW1pCQkPDw8JaWlqysrOnp6f7+/rGxsaGhoZ2dncHBwbm5uZOTk8/Pz6ioqLy8vPPz85qamsTExKSkpOzs7MfHx9/f39zc3OXl5ePj47W1tZ9bjPb29szMzKRlk7F6otCuxp1YiqFfj9nZ2ahsmMWdusqlwL+Ts9S2zLWCp+bU4e/j7K1zndLS0vjz99m+0fLq8MrKyunZ5eze6PXu893F1uLO3buLrriHq+DK2s+wIikAAAABdFJOUwBA5thmAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gMDg8HArn/GasAAAXOSURBVHja7d1BdqRIDIRhPV2K+99s3qxmMd02mQplCPhj7SI69QFdLlMQQQghhBBCCCGEEEIIIYQQQgghhBBCCHlx8t8whq+JJ+4fNUf9i+awf9Ic9A+ao/5JdNQ/aA466OQT6KiDTr5gDjroBHQCOgGdgE5AJ6AT0AnoBHQCOgGdgE5AJ6CDDjrooINOQCegE9AJ6AR0Avp7c/0vBssz6K49Z9QOe/2Q04fu36YhQl8rdS3WKt7mnr+lAz3XW02LdYs3uOe9iNG3Wk2LHSAuZc+VyNA3S12LnUGucs/VSND3W02LHUMuYM+dlNErrabFDiIvquduSuilUtdiR5lX2DNLg9ibURZbTYudRb6tnrVsopdbTYudZr7HntXsoGe91WHeoH5d59WzL82tDnI5+6XJGPNsbzXt4PPM19jTgn7iXDKn9oj5gno60A/9D9LZO9D8tno60I+9b+jsHWh+Uz0d6AffLXb2DjS/pZ4O9KO/I3T2DjS/oZ4O9MO/GXb2DjT/VT1fg56mk9pA88tunsdaTSe1eeY/q6cF3fHZn6/Wgn6ZzfNc68APmhXmW7uJ9OKw8kiysVV9JVwv+q5dCf3QL9knW2vmDbUl9NL+sjsGzclS19r6OX9Ez4u34aqnia2lqN4Lr72qWLr7wuJi9eY9O82xX3tXXlMv7UKTqws+QF9XFyxiHT3bW3Wv0W/iNljXjqNZghRdU9oHJlXXXAmxpq5awBr6idZGLaG67KInFbr4OpTTreV9RLaz7Vm1nTKEJ6oF9DOtxR8+oq68kFmBLr+29Hhrn7lsW9KL1++qS3/jvIueh1r3f1Jae8r8Lrr4A8Uyuri00VyzOfF3k+6pD0OP1um/H/3WmUP+96Jb6OdaO80VG9R/9bSCvl1aQte3ru8a+p1tg6jjaoyh6AF6/dYCv6J3XO31O/rJ1lbz8jY7bifxMPTonX6e7PWhxy56tMw/Ha0qn5PoEZ2HugW9pRT0u4d6z/hjJvrhxYJ+AD0eiN50C8AHoUfz9L+DHjvo0Tv/Wehdix2Ifr0PPUCfi56g/4wT30GPl6HnUPT8Enq6drZnoEfvHGahB+igvwI9voMeoIN+5hdF0EEHndM76LyR49076KCDzidy3/0Y9l1/cIkvoQfo/RfOgH5zu545gN6Mfn0H/YFXznzhwsiR6FwN60T/4NWwo77sYPnP1fVlB+PZ/ezXmizfcOk95t70DZcXfZetdfr5SPT3f1U5HK1r+0XHvjYOPSzjb5j+rU169rWikN7cdHMGT+vEO1HID/VhNxrqnP69DXoWe/ZQr91SzHLI9d5dKky1ZST15sTzT8sxl1V0333kLLcJTekg0oJ+e2uexZ5Dn3ZD4Og75hZW4FnsKXXLrb8l6Nk5fOFisx/90plfbYPQHHLZOXxZr3D3EanPe5xH29BSh256nIfmwT2rT+7RLEA5/ewbvqm2XV36tKZUjCHD0ar5d7ZtZB9sdQs7D+MrTyFjTqurVm228vqeJzBmA3q2lLoW26B2+8W7D9gtTSGjoTW3X+1ZbA397+yFZ2lntskVpt/SalpsWf1PeNdVMN94VGrlZSdaSyeJjsUq1P8zvBZ/vjCIrcS0VletCH0xlkHEvNaYZ96n7hiEZ/rVd+DnzbvUJ87BNfyB6HHevGkOlumHCT1imrplEJbxCz5JtZjr1S2DiLmtMdBcrW4ZRExujYHmWnXLIMLRqvqbuMdcqW4ZhGX8sqtfTOY6dcckwjJ+4fV1JnORumUQ8YzWGEeuYbcMIp7SGgPN6+qWQYSjdXfC88yL7JZBxLNaYx55ST0MkwhHadP9amzk++yWQYSjtTzggeZb7OGYRDy1NeaRr7NrOj1TMI1+HvkSu7LUMgTX6KeJ33dXd3qmYBr9PPLf3btKLTNwTX4Y+I/y3Z2eGZgmPw3cH8vqXTP/NjUhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQggh5NH5BzHSChHioKm4AAAAAElFTkSuQmCC";
  function gG() {
    let [e, t] = (0, Z.useState)(null),
      c = (0, Z.useRef)((l) => {
        t(
          l === "odoo-api"
            ? document.getElementById(l).querySelector(".root")
            : null
        );
      }).current;
    return (
      (0, Z.useEffect)(() => {
        wppb.on("tab", c);
      }, []),
      (0, Z.useEffect)(() => {
        if (!e) return;
        let l = document.querySelector("#odoo-api .addon-logo");
        l &&
          (l.setAttribute("src", "data:image/png;base64," + oB),
          (l.style.width = "70px"));
      }, [e]),
      Ou.default.createElement(
        gX,
        { handle: ["odoo-api"] },
        Ou.default.createElement(
          RX,
          null,
          Ou.default.createElement(
            "div",
            null,
            e && (0, ll.createPortal)(Ou.default.createElement(pG, null), e)
          )
        )
      )
    );
  }
  wppb.join("addons", ({ data: e }) => {
    let t = wp.i18n.__;
    e["odoo-api"] = t("Odoo JSON-RPC", "posts-bridge");
    let c = document.createElement("div");
    (c.style.visibility = "hidden"),
      document.body.appendChild(c),
      (0, ia.createRoot)(c).render(React.createElement(gG, null));
  });
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

is-plain-object/dist/is-plain-object.mjs:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
