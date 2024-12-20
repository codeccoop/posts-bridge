(() => {
  var RB = Object.create;
  var cb = Object.defineProperty;
  var fB = Object.getOwnPropertyDescriptor;
  var IB = Object.getOwnPropertyNames;
  var yB = Object.getPrototypeOf,
    WB = Object.prototype.hasOwnProperty;
  var vG = (e, t) => () => (e && (t = e((e = 0))), t);
  var nt = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t), t.exports
    ),
    lb = (e, t) => {
      for (var c in t) cb(e, c, { get: t[c], enumerable: !0 });
    },
    BB = (e, t, c, l) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let n of IB(t))
          !WB.call(e, n) &&
            n !== c &&
            cb(e, n, {
              get: () => t[n],
              enumerable: !(l = fB(t, n)) || l.enumerable,
            });
      return e;
    };
  var V = (e, t, c) => (
    (c = e != null ? RB(yB(e)) : {}),
    BB(
      t || !e || !e.__esModule
        ? cb(c, "default", { value: e, enumerable: !0 })
        : c,
      e
    )
  );
  var QG = nt((le) => {
    "use strict";
    var Lr = Symbol.for("react.element"),
      vB = Symbol.for("react.portal"),
      FB = Symbol.for("react.fragment"),
      hB = Symbol.for("react.strict_mode"),
      VB = Symbol.for("react.profiler"),
      CB = Symbol.for("react.provider"),
      JB = Symbol.for("react.context"),
      YB = Symbol.for("react.forward_ref"),
      NB = Symbol.for("react.suspense"),
      zB = Symbol.for("react.memo"),
      kB = Symbol.for("react.lazy"),
      FG = Symbol.iterator;
    function wB(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (FG && e[FG]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var CG = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      JG = Object.assign,
      YG = {};
    function yo(e, t, c) {
      (this.props = e),
        (this.context = t),
        (this.refs = YG),
        (this.updater = c || CG);
    }
    yo.prototype.isReactComponent = {};
    yo.prototype.setState = function (e, t) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    };
    yo.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function NG() {}
    NG.prototype = yo.prototype;
    function ob(e, t, c) {
      (this.props = e),
        (this.context = t),
        (this.refs = YG),
        (this.updater = c || CG);
    }
    var rb = (ob.prototype = new NG());
    rb.constructor = ob;
    JG(rb, yo.prototype);
    rb.isPureReactComponent = !0;
    var hG = Array.isArray,
      zG = Object.prototype.hasOwnProperty,
      db = { current: null },
      kG = { key: !0, ref: !0, __self: !0, __source: !0 };
    function wG(e, t, c) {
      var l,
        n = {},
        o = null,
        r = null;
      if (t != null)
        for (l in (t.ref !== void 0 && (r = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
          zG.call(t, l) && !kG.hasOwnProperty(l) && (n[l] = t[l]);
      var d = arguments.length - 2;
      if (d === 1) n.children = c;
      else if (1 < d) {
        for (var u = Array(d), i = 0; i < d; i++) u[i] = arguments[i + 2];
        n.children = u;
      }
      if (e && e.defaultProps)
        for (l in ((d = e.defaultProps), d)) n[l] === void 0 && (n[l] = d[l]);
      return {
        $$typeof: Lr,
        type: e,
        key: o,
        ref: r,
        props: n,
        _owner: db.current,
      };
    }
    function SB(e, t) {
      return {
        $$typeof: Lr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function ub(e) {
      return typeof e == "object" && e !== null && e.$$typeof === Lr;
    }
    function QB(e) {
      var t = { "=": "=0", ":": "=2" };
      return (
        "$" +
        e.replace(/[=:]/g, function (c) {
          return t[c];
        })
      );
    }
    var VG = /\/+/g;
    function nb(e, t) {
      return typeof e == "object" && e !== null && e.key != null
        ? QB("" + e.key)
        : t.toString(36);
    }
    function Pu(e, t, c, l, n) {
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
              case Lr:
              case vB:
                r = !0;
            }
        }
      if (r)
        return (
          (r = e),
          (n = n(r)),
          (e = l === "" ? "." + nb(r, 0) : l),
          hG(n)
            ? ((c = ""),
              e != null && (c = e.replace(VG, "$&/") + "/"),
              Pu(n, t, c, "", function (i) {
                return i;
              }))
            : n != null &&
              (ub(n) &&
                (n = SB(
                  n,
                  c +
                    (!n.key || (r && r.key === n.key)
                      ? ""
                      : ("" + n.key).replace(VG, "$&/") + "/") +
                    e
                )),
              t.push(n)),
          1
        );
      if (((r = 0), (l = l === "" ? "." : l + ":"), hG(e)))
        for (var d = 0; d < e.length; d++) {
          o = e[d];
          var u = l + nb(o, d);
          r += Pu(o, t, c, u, n);
        }
      else if (((u = wB(e)), typeof u == "function"))
        for (e = u.call(e), d = 0; !(o = e.next()).done; )
          (o = o.value), (u = l + nb(o, d++)), (r += Pu(o, t, c, u, n));
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
    function ju(e, t, c) {
      if (e == null) return e;
      var l = [],
        n = 0;
      return (
        Pu(e, l, "", "", function (o) {
          return t.call(c, o, n++);
        }),
        l
      );
    }
    function OB(e) {
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
    var Yt = { current: null },
      Ku = { transition: null },
      AB = {
        ReactCurrentDispatcher: Yt,
        ReactCurrentBatchConfig: Ku,
        ReactCurrentOwner: db,
      };
    function SG() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    le.Children = {
      map: ju,
      forEach: function (e, t, c) {
        ju(
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
          ju(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          ju(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!ub(e))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return e;
      },
    };
    le.Component = yo;
    le.Fragment = FB;
    le.Profiler = VB;
    le.PureComponent = ob;
    le.StrictMode = hB;
    le.Suspense = NB;
    le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = AB;
    le.act = SG;
    le.cloneElement = function (e, t, c) {
      if (e == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            "."
        );
      var l = JG({}, e.props),
        n = e.key,
        o = e.ref,
        r = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((o = t.ref), (r = db.current)),
          t.key !== void 0 && (n = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var d = e.type.defaultProps;
        for (u in t)
          zG.call(t, u) &&
            !kG.hasOwnProperty(u) &&
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
        $$typeof: Lr,
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
          $$typeof: JB,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: CB, _context: e }),
        (e.Consumer = e)
      );
    };
    le.createElement = wG;
    le.createFactory = function (e) {
      var t = wG.bind(null, e);
      return (t.type = e), t;
    };
    le.createRef = function () {
      return { current: null };
    };
    le.forwardRef = function (e) {
      return { $$typeof: YB, render: e };
    };
    le.isValidElement = ub;
    le.lazy = function (e) {
      return { $$typeof: kB, _payload: { _status: -1, _result: e }, _init: OB };
    };
    le.memo = function (e, t) {
      return { $$typeof: zB, type: e, compare: t === void 0 ? null : t };
    };
    le.startTransition = function (e) {
      var t = Ku.transition;
      Ku.transition = {};
      try {
        e();
      } finally {
        Ku.transition = t;
      }
    };
    le.unstable_act = SG;
    le.useCallback = function (e, t) {
      return Yt.current.useCallback(e, t);
    };
    le.useContext = function (e) {
      return Yt.current.useContext(e);
    };
    le.useDebugValue = function () {};
    le.useDeferredValue = function (e) {
      return Yt.current.useDeferredValue(e);
    };
    le.useEffect = function (e, t) {
      return Yt.current.useEffect(e, t);
    };
    le.useId = function () {
      return Yt.current.useId();
    };
    le.useImperativeHandle = function (e, t, c) {
      return Yt.current.useImperativeHandle(e, t, c);
    };
    le.useInsertionEffect = function (e, t) {
      return Yt.current.useInsertionEffect(e, t);
    };
    le.useLayoutEffect = function (e, t) {
      return Yt.current.useLayoutEffect(e, t);
    };
    le.useMemo = function (e, t) {
      return Yt.current.useMemo(e, t);
    };
    le.useReducer = function (e, t, c) {
      return Yt.current.useReducer(e, t, c);
    };
    le.useRef = function (e) {
      return Yt.current.useRef(e);
    };
    le.useState = function (e) {
      return Yt.current.useState(e);
    };
    le.useSyncExternalStore = function (e, t, c) {
      return Yt.current.useSyncExternalStore(e, t, c);
    };
    le.useTransition = function () {
      return Yt.current.useTransition();
    };
    le.version = "18.3.1";
  });
  var A = nt((LC, OG) => {
    "use strict";
    OG.exports = QG();
  });
  var KG = nt((Re) => {
    "use strict";
    function bb(e, t) {
      var c = e.length;
      e.push(t);
      e: for (; 0 < c; ) {
        var l = (c - 1) >>> 1,
          n = e[l];
        if (0 < _u(n, t)) (e[l] = t), (e[c] = n), (c = l);
        else break e;
      }
    }
    function Nc(e) {
      return e.length === 0 ? null : e[0];
    }
    function $u(e) {
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
          if (0 > _u(d, c))
            u < n && 0 > _u(i, d)
              ? ((e[l] = i), (e[u] = c), (l = u))
              : ((e[l] = d), (e[r] = c), (l = r));
          else if (u < n && 0 > _u(i, c)) (e[l] = i), (e[u] = c), (l = u);
          else break e;
        }
      }
      return t;
    }
    function _u(e, t) {
      var c = e.sortIndex - t.sortIndex;
      return c !== 0 ? c : e.id - t.id;
    }
    typeof performance == "object" && typeof performance.now == "function"
      ? ((AG = performance),
        (Re.unstable_now = function () {
          return AG.now();
        }))
      : ((ib = Date),
        (LG = ib.now()),
        (Re.unstable_now = function () {
          return ib.now() - LG;
        }));
    var AG,
      ib,
      LG,
      qc = [],
      Ul = [],
      LB = 1,
      pc = null,
      yt = 3,
      ei = !1,
      Jn = !1,
      Dr = !1,
      UG = typeof setTimeout == "function" ? setTimeout : null,
      MG = typeof clearTimeout == "function" ? clearTimeout : null,
      TG = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function mb(e) {
      for (var t = Nc(Ul); t !== null; ) {
        if (t.callback === null) $u(Ul);
        else if (t.startTime <= e)
          $u(Ul), (t.sortIndex = t.expirationTime), bb(qc, t);
        else break;
        t = Nc(Ul);
      }
    }
    function Xb(e) {
      if (((Dr = !1), mb(e), !Jn))
        if (Nc(qc) !== null) (Jn = !0), Gb(xb);
        else {
          var t = Nc(Ul);
          t !== null && pb(Xb, t.startTime - e);
        }
    }
    function xb(e, t) {
      (Jn = !1), Dr && ((Dr = !1), MG(Ur), (Ur = -1)), (ei = !0);
      var c = yt;
      try {
        for (
          mb(t), pc = Nc(qc);
          pc !== null && (!(pc.expirationTime > t) || (e && !PG()));

        ) {
          var l = pc.callback;
          if (typeof l == "function") {
            (pc.callback = null), (yt = pc.priorityLevel);
            var n = l(pc.expirationTime <= t);
            (t = Re.unstable_now()),
              typeof n == "function"
                ? (pc.callback = n)
                : pc === Nc(qc) && $u(qc),
              mb(t);
          } else $u(qc);
          pc = Nc(qc);
        }
        if (pc !== null) var o = !0;
        else {
          var r = Nc(Ul);
          r !== null && pb(Xb, r.startTime - t), (o = !1);
        }
        return o;
      } finally {
        (pc = null), (yt = c), (ei = !1);
      }
    }
    var ti = !1,
      qu = null,
      Ur = -1,
      EG = 5,
      jG = -1;
    function PG() {
      return !(Re.unstable_now() - jG < EG);
    }
    function ab() {
      if (qu !== null) {
        var e = Re.unstable_now();
        jG = e;
        var t = !0;
        try {
          t = qu(!0, e);
        } finally {
          t ? Tr() : ((ti = !1), (qu = null));
        }
      } else ti = !1;
    }
    var Tr;
    typeof TG == "function"
      ? (Tr = function () {
          TG(ab);
        })
      : typeof MessageChannel < "u"
        ? ((sb = new MessageChannel()),
          (DG = sb.port2),
          (sb.port1.onmessage = ab),
          (Tr = function () {
            DG.postMessage(null);
          }))
        : (Tr = function () {
            UG(ab, 0);
          });
    var sb, DG;
    function Gb(e) {
      (qu = e), ti || ((ti = !0), Tr());
    }
    function pb(e, t) {
      Ur = UG(function () {
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
      Jn || ei || ((Jn = !0), Gb(xb));
    };
    Re.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (EG = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    Re.unstable_getCurrentPriorityLevel = function () {
      return yt;
    };
    Re.unstable_getFirstCallbackNode = function () {
      return Nc(qc);
    };
    Re.unstable_next = function (e) {
      switch (yt) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = yt;
      }
      var c = yt;
      yt = t;
      try {
        return e();
      } finally {
        yt = c;
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
      var c = yt;
      yt = e;
      try {
        return t();
      } finally {
        yt = c;
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
          id: LB++,
          callback: t,
          priorityLevel: e,
          startTime: c,
          expirationTime: n,
          sortIndex: -1,
        }),
        c > l
          ? ((e.sortIndex = c),
            bb(Ul, e),
            Nc(qc) === null &&
              e === Nc(Ul) &&
              (Dr ? (MG(Ur), (Ur = -1)) : (Dr = !0), pb(Xb, c - l)))
          : ((e.sortIndex = n), bb(qc, e), Jn || ei || ((Jn = !0), Gb(xb))),
        e
      );
    };
    Re.unstable_shouldYield = PG;
    Re.unstable_wrapCallback = function (e) {
      var t = yt;
      return function () {
        var c = yt;
        yt = t;
        try {
          return e.apply(this, arguments);
        } finally {
          yt = c;
        }
      };
    };
  });
  var qG = nt((UC, _G) => {
    "use strict";
    _G.exports = KG();
  });
  var lZ = nt((ic) => {
    "use strict";
    var TB = A(),
      dc = qG();
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
    var rg = new Set(),
      md = {};
    function Un(e, t) {
      Uo(e, t), Uo(e + "Capture", t);
    }
    function Uo(e, t) {
      for (md[e] = t, e = 0; e < t.length; e++) rg.add(t[e]);
    }
    var Il = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Ob = Object.prototype.hasOwnProperty,
      DB =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      $G = {},
      ep = {};
    function UB(e) {
      return Ob.call(ep, e)
        ? !0
        : Ob.call($G, e)
          ? !1
          : DB.test(e)
            ? (ep[e] = !0)
            : (($G[e] = !0), !1);
    }
    function MB(e, t, c, l) {
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
    function EB(e, t, c, l) {
      if (t === null || typeof t > "u" || MB(e, t, c, l)) return !0;
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
    function kt(e, t, c, l, n, o, r) {
      (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = l),
        (this.attributeNamespace = n),
        (this.mustUseProperty = c),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = r);
    }
    var xt = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        xt[e] = new kt(e, 0, !1, e, null, !1, !1);
      });
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      xt[t] = new kt(t, 1, !1, e[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        xt[e] = new kt(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }
    );
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      xt[e] = new kt(e, 2, !1, e, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        xt[e] = new kt(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      xt[e] = new kt(e, 3, !0, e, null, !1, !1);
    });
    ["capture", "download"].forEach(function (e) {
      xt[e] = new kt(e, 4, !1, e, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function (e) {
      xt[e] = new kt(e, 6, !1, e, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function (e) {
      xt[e] = new kt(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Jm = /[\-:]([a-z])/g;
    function Ym(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Jm, Ym);
        xt[t] = new kt(t, 1, !1, e, null, !1, !1);
      });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Jm, Ym);
        xt[t] = new kt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      });
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(Jm, Ym);
      xt[t] = new kt(
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
      xt[e] = new kt(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    xt.xlinkHref = new kt(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    );
    ["src", "href", "action", "formAction"].forEach(function (e) {
      xt[e] = new kt(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Nm(e, t, c, l) {
      var n = xt.hasOwnProperty(t) ? xt[t] : null;
      (n !== null
        ? n.type !== 0
        : l ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (EB(t, c, n, l) && (c = null),
        l || n === null
          ? UB(t) &&
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
    var vl = TB.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      ci = Symbol.for("react.element"),
      vo = Symbol.for("react.portal"),
      Fo = Symbol.for("react.fragment"),
      zm = Symbol.for("react.strict_mode"),
      Ab = Symbol.for("react.profiler"),
      dg = Symbol.for("react.provider"),
      ug = Symbol.for("react.context"),
      km = Symbol.for("react.forward_ref"),
      Lb = Symbol.for("react.suspense"),
      Tb = Symbol.for("react.suspense_list"),
      wm = Symbol.for("react.memo"),
      El = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var ig = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.cache");
    Symbol.for("react.tracing_marker");
    var tp = Symbol.iterator;
    function Mr(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (tp && e[tp]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var we = Object.assign,
      gb;
    function ed(e) {
      if (gb === void 0)
        try {
          throw Error();
        } catch (c) {
          var t = c.stack.trim().match(/\n( *(at )?)/);
          gb = (t && t[1]) || "";
        }
      return (
        `
` +
        gb +
        e
      );
    }
    var Hb = !1;
    function Zb(e, t) {
      if (!e || Hb) return "";
      Hb = !0;
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
        (Hb = !1), (Error.prepareStackTrace = c);
      }
      return (e = e ? e.displayName || e.name : "") ? ed(e) : "";
    }
    function jB(e) {
      switch (e.tag) {
        case 5:
          return ed(e.type);
        case 16:
          return ed("Lazy");
        case 13:
          return ed("Suspense");
        case 19:
          return ed("SuspenseList");
        case 0:
        case 2:
        case 15:
          return (e = Zb(e.type, !1)), e;
        case 11:
          return (e = Zb(e.type.render, !1)), e;
        case 1:
          return (e = Zb(e.type, !0)), e;
        default:
          return "";
      }
    }
    function Db(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Fo:
          return "Fragment";
        case vo:
          return "Portal";
        case Ab:
          return "Profiler";
        case zm:
          return "StrictMode";
        case Lb:
          return "Suspense";
        case Tb:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ug:
            return (e.displayName || "Context") + ".Consumer";
          case dg:
            return (e._context.displayName || "Context") + ".Provider";
          case km:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ""),
                (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
              e
            );
          case wm:
            return (
              (t = e.displayName || null), t !== null ? t : Db(e.type) || "Memo"
            );
          case El:
            (t = e._payload), (e = e._init);
            try {
              return Db(e(t));
            } catch {}
        }
      return null;
    }
    function PB(e) {
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
          return Db(t);
        case 8:
          return t === zm ? "StrictMode" : "Mode";
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
    function ag(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
      );
    }
    function KB(e) {
      var t = ag(e) ? "checked" : "value",
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
    function li(e) {
      e._valueTracker || (e._valueTracker = KB(e));
    }
    function sg(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var c = t.getValue(),
        l = "";
      return (
        e && (l = ag(e) ? (e.checked ? "true" : "false") : e.value),
        (e = l),
        e !== c ? (t.setValue(e), !0) : !1
      );
    }
    function Ci(e) {
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
    function Ub(e, t) {
      var c = t.checked;
      return we({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: c ?? e._wrapperState.initialChecked,
      });
    }
    function cp(e, t) {
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
    function bg(e, t) {
      (t = t.checked), t != null && Nm(e, "checked", t, !1);
    }
    function Mb(e, t) {
      bg(e, t);
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
        ? Eb(e, t.type, c)
        : t.hasOwnProperty("defaultValue") && Eb(e, t.type, dn(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function lp(e, t, c) {
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
    function Eb(e, t, c) {
      (t !== "number" || Ci(e.ownerDocument) !== e) &&
        (c == null
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + c && (e.defaultValue = "" + c));
    }
    var td = Array.isArray;
    function Qo(e, t, c, l) {
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
    function jb(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(z(91));
      return we({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function np(e, t) {
      var c = t.value;
      if (c == null) {
        if (((c = t.children), (t = t.defaultValue), c != null)) {
          if (t != null) throw Error(z(92));
          if (td(c)) {
            if (1 < c.length) throw Error(z(93));
            c = c[0];
          }
          t = c;
        }
        t == null && (t = ""), (c = t);
      }
      e._wrapperState = { initialValue: dn(c) };
    }
    function mg(e, t) {
      var c = dn(t.value),
        l = dn(t.defaultValue);
      c != null &&
        ((c = "" + c),
        c !== e.value && (e.value = c),
        t.defaultValue == null && e.defaultValue !== c && (e.defaultValue = c)),
        l != null && (e.defaultValue = "" + l);
    }
    function op(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
    }
    function Xg(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Pb(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml"
        ? Xg(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
          ? "http://www.w3.org/1999/xhtml"
          : e;
    }
    var ni,
      xg = (function (e) {
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
            ni = ni || document.createElement("div"),
              ni.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
              t = ni.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Xd(e, t) {
      if (t) {
        var c = e.firstChild;
        if (c && c === e.lastChild && c.nodeType === 3) {
          c.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var nd = {
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
      _B = ["Webkit", "ms", "Moz", "O"];
    Object.keys(nd).forEach(function (e) {
      _B.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (nd[t] = nd[e]);
      });
    });
    function Gg(e, t, c) {
      return t == null || typeof t == "boolean" || t === ""
        ? ""
        : c ||
            typeof t != "number" ||
            t === 0 ||
            (nd.hasOwnProperty(e) && nd[e])
          ? ("" + t).trim()
          : t + "px";
    }
    function pg(e, t) {
      e = e.style;
      for (var c in t)
        if (t.hasOwnProperty(c)) {
          var l = c.indexOf("--") === 0,
            n = Gg(c, t[c], l);
          c === "float" && (c = "cssFloat"),
            l ? e.setProperty(c, n) : (e[c] = n);
        }
    }
    var qB = we(
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
    function Kb(e, t) {
      if (t) {
        if (qB[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
    function _b(e, t) {
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
    var qb = null;
    function Sm(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var $b = null,
      Oo = null,
      Ao = null;
    function rp(e) {
      if ((e = Jd(e))) {
        if (typeof $b != "function") throw Error(z(280));
        var t = e.stateNode;
        t && ((t = oa(t)), $b(e.stateNode, e.type, t));
      }
    }
    function gg(e) {
      Oo ? (Ao ? Ao.push(e) : (Ao = [e])) : (Oo = e);
    }
    function Hg() {
      if (Oo) {
        var e = Oo,
          t = Ao;
        if (((Ao = Oo = null), rp(e), t))
          for (e = 0; e < t.length; e++) rp(t[e]);
      }
    }
    function Zg(e, t) {
      return e(t);
    }
    function Rg() {}
    var Rb = !1;
    function fg(e, t, c) {
      if (Rb) return e(t, c);
      Rb = !0;
      try {
        return Zg(e, t, c);
      } finally {
        (Rb = !1), (Oo !== null || Ao !== null) && (Rg(), Hg());
      }
    }
    function xd(e, t) {
      var c = e.stateNode;
      if (c === null) return null;
      var l = oa(c);
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
    var em = !1;
    if (Il)
      try {
        (Wo = {}),
          Object.defineProperty(Wo, "passive", {
            get: function () {
              em = !0;
            },
          }),
          window.addEventListener("test", Wo, Wo),
          window.removeEventListener("test", Wo, Wo);
      } catch {
        em = !1;
      }
    var Wo;
    function $B(e, t, c, l, n, o, r, d, u) {
      var i = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(c, i);
      } catch (a) {
        this.onError(a);
      }
    }
    var od = !1,
      Ji = null,
      Yi = !1,
      tm = null,
      e5 = {
        onError: function (e) {
          (od = !0), (Ji = e);
        },
      };
    function t5(e, t, c, l, n, o, r, d, u) {
      (od = !1), (Ji = null), $B.apply(e5, arguments);
    }
    function c5(e, t, c, l, n, o, r, d, u) {
      if ((t5.apply(this, arguments), od)) {
        if (od) {
          var i = Ji;
          (od = !1), (Ji = null);
        } else throw Error(z(198));
        Yi || ((Yi = !0), (tm = i));
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
    function Ig(e) {
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
    function dp(e) {
      if (Mn(e) !== e) throw Error(z(188));
    }
    function l5(e) {
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
            if (o === c) return dp(n), e;
            if (o === l) return dp(n), t;
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
    function yg(e) {
      return (e = l5(e)), e !== null ? Wg(e) : null;
    }
    function Wg(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Wg(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Bg = dc.unstable_scheduleCallback,
      up = dc.unstable_cancelCallback,
      n5 = dc.unstable_shouldYield,
      o5 = dc.unstable_requestPaint,
      Ue = dc.unstable_now,
      r5 = dc.unstable_getCurrentPriorityLevel,
      Qm = dc.unstable_ImmediatePriority,
      vg = dc.unstable_UserBlockingPriority,
      Ni = dc.unstable_NormalPriority,
      d5 = dc.unstable_LowPriority,
      Fg = dc.unstable_IdlePriority,
      ta = null,
      cl = null;
    function u5(e) {
      if (cl && typeof cl.onCommitFiberRoot == "function")
        try {
          cl.onCommitFiberRoot(ta, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var Qc = Math.clz32 ? Math.clz32 : s5,
      i5 = Math.log,
      a5 = Math.LN2;
    function s5(e) {
      return (e >>>= 0), e === 0 ? 32 : (31 - ((i5(e) / a5) | 0)) | 0;
    }
    var oi = 64,
      ri = 4194304;
    function cd(e) {
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
    function zi(e, t) {
      var c = e.pendingLanes;
      if (c === 0) return 0;
      var l = 0,
        n = e.suspendedLanes,
        o = e.pingedLanes,
        r = c & 268435455;
      if (r !== 0) {
        var d = r & ~n;
        d !== 0 ? (l = cd(d)) : ((o &= r), o !== 0 && (l = cd(o)));
      } else (r = c & ~n), r !== 0 ? (l = cd(r)) : o !== 0 && (l = cd(o));
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
          (c = 31 - Qc(t)), (n = 1 << c), (l |= e[c]), (t &= ~n);
      return l;
    }
    function b5(e, t) {
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
    function m5(e, t) {
      for (
        var c = e.suspendedLanes,
          l = e.pingedLanes,
          n = e.expirationTimes,
          o = e.pendingLanes;
        0 < o;

      ) {
        var r = 31 - Qc(o),
          d = 1 << r,
          u = n[r];
        u === -1
          ? (!(d & c) || d & l) && (n[r] = b5(d, t))
          : u <= t && (e.expiredLanes |= d),
          (o &= ~d);
      }
    }
    function cm(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function hg() {
      var e = oi;
      return (oi <<= 1), !(oi & 4194240) && (oi = 64), e;
    }
    function fb(e) {
      for (var t = [], c = 0; 31 > c; c++) t.push(e);
      return t;
    }
    function Vd(e, t, c) {
      (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Qc(t)),
        (e[t] = c);
    }
    function X5(e, t) {
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
        var n = 31 - Qc(c),
          o = 1 << n;
        (t[n] = 0), (l[n] = -1), (e[n] = -1), (c &= ~o);
      }
    }
    function Om(e, t) {
      var c = (e.entangledLanes |= t);
      for (e = e.entanglements; c; ) {
        var l = 31 - Qc(c),
          n = 1 << l;
        (n & t) | (e[l] & t) && (e[l] |= t), (c &= ~n);
      }
    }
    var me = 0;
    function Vg(e) {
      return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var Cg,
      Am,
      Jg,
      Yg,
      Ng,
      lm = !1,
      di = [],
      $l = null,
      en = null,
      tn = null,
      Gd = new Map(),
      pd = new Map(),
      Pl = [],
      x5 =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
          " "
        );
    function ip(e, t) {
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
          Gd.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          pd.delete(t.pointerId);
      }
    }
    function Er(e, t, c, l, n, o) {
      return e === null || e.nativeEvent !== o
        ? ((e = {
            blockedOn: t,
            domEventName: c,
            eventSystemFlags: l,
            nativeEvent: o,
            targetContainers: [n],
          }),
          t !== null && ((t = Jd(t)), t !== null && Am(t)),
          e)
        : ((e.eventSystemFlags |= l),
          (t = e.targetContainers),
          n !== null && t.indexOf(n) === -1 && t.push(n),
          e);
    }
    function G5(e, t, c, l, n) {
      switch (t) {
        case "focusin":
          return ($l = Er($l, e, t, c, l, n)), !0;
        case "dragenter":
          return (en = Er(en, e, t, c, l, n)), !0;
        case "mouseover":
          return (tn = Er(tn, e, t, c, l, n)), !0;
        case "pointerover":
          var o = n.pointerId;
          return Gd.set(o, Er(Gd.get(o) || null, e, t, c, l, n)), !0;
        case "gotpointercapture":
          return (
            (o = n.pointerId),
            pd.set(o, Er(pd.get(o) || null, e, t, c, l, n)),
            !0
          );
      }
      return !1;
    }
    function zg(e) {
      var t = zn(e.target);
      if (t !== null) {
        var c = Mn(t);
        if (c !== null) {
          if (((t = c.tag), t === 13)) {
            if (((t = Ig(c)), t !== null)) {
              (e.blockedOn = t),
                Ng(e.priority, function () {
                  Jg(c);
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
    function Ri(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var c = nm(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (c === null) {
          c = e.nativeEvent;
          var l = new c.constructor(c.type, c);
          (qb = l), c.target.dispatchEvent(l), (qb = null);
        } else return (t = Jd(c)), t !== null && Am(t), (e.blockedOn = c), !1;
        t.shift();
      }
      return !0;
    }
    function ap(e, t, c) {
      Ri(e) && c.delete(t);
    }
    function p5() {
      (lm = !1),
        $l !== null && Ri($l) && ($l = null),
        en !== null && Ri(en) && (en = null),
        tn !== null && Ri(tn) && (tn = null),
        Gd.forEach(ap),
        pd.forEach(ap);
    }
    function jr(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        lm ||
          ((lm = !0),
          dc.unstable_scheduleCallback(dc.unstable_NormalPriority, p5)));
    }
    function gd(e) {
      function t(n) {
        return jr(n, e);
      }
      if (0 < di.length) {
        jr(di[0], e);
        for (var c = 1; c < di.length; c++) {
          var l = di[c];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      for (
        $l !== null && jr($l, e),
          en !== null && jr(en, e),
          tn !== null && jr(tn, e),
          Gd.forEach(t),
          pd.forEach(t),
          c = 0;
        c < Pl.length;
        c++
      )
        (l = Pl[c]), l.blockedOn === e && (l.blockedOn = null);
      for (; 0 < Pl.length && ((c = Pl[0]), c.blockedOn === null); )
        zg(c), c.blockedOn === null && Pl.shift();
    }
    var Lo = vl.ReactCurrentBatchConfig,
      ki = !0;
    function g5(e, t, c, l) {
      var n = me,
        o = Lo.transition;
      Lo.transition = null;
      try {
        (me = 1), Lm(e, t, c, l);
      } finally {
        (me = n), (Lo.transition = o);
      }
    }
    function H5(e, t, c, l) {
      var n = me,
        o = Lo.transition;
      Lo.transition = null;
      try {
        (me = 4), Lm(e, t, c, l);
      } finally {
        (me = n), (Lo.transition = o);
      }
    }
    function Lm(e, t, c, l) {
      if (ki) {
        var n = nm(e, t, c, l);
        if (n === null) hb(e, t, l, wi, c), ip(e, l);
        else if (G5(n, e, t, c, l)) l.stopPropagation();
        else if ((ip(e, l), t & 4 && -1 < x5.indexOf(e))) {
          for (; n !== null; ) {
            var o = Jd(n);
            if (
              (o !== null && Cg(o),
              (o = nm(e, t, c, l)),
              o === null && hb(e, t, l, wi, c),
              o === n)
            )
              break;
            n = o;
          }
          n !== null && l.stopPropagation();
        } else hb(e, t, l, null, c);
      }
    }
    var wi = null;
    function nm(e, t, c, l) {
      if (((wi = null), (e = Sm(l)), (e = zn(e)), e !== null))
        if (((t = Mn(e)), t === null)) e = null;
        else if (((c = t.tag), c === 13)) {
          if (((e = Ig(t)), e !== null)) return e;
          e = null;
        } else if (c === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return (wi = e), null;
    }
    function kg(e) {
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
          switch (r5()) {
            case Qm:
              return 1;
            case vg:
              return 4;
            case Ni:
            case d5:
              return 16;
            case Fg:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var _l = null,
      Tm = null,
      fi = null;
    function wg() {
      if (fi) return fi;
      var e,
        t = Tm,
        c = t.length,
        l,
        n = "value" in _l ? _l.value : _l.textContent,
        o = n.length;
      for (e = 0; e < c && t[e] === n[e]; e++);
      var r = c - e;
      for (l = 1; l <= r && t[c - l] === n[o - l]; l++);
      return (fi = n.slice(e, 1 < l ? 1 - l : void 0));
    }
    function Ii(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function ui() {
      return !0;
    }
    function sp() {
      return !1;
    }
    function uc(e) {
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
            ? ui
            : sp),
          (this.isPropagationStopped = sp),
          this
        );
      }
      return (
        we(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var c = this.nativeEvent;
            c &&
              (c.preventDefault
                ? c.preventDefault()
                : typeof c.returnValue != "unknown" && (c.returnValue = !1),
              (this.isDefaultPrevented = ui));
          },
          stopPropagation: function () {
            var c = this.nativeEvent;
            c &&
              (c.stopPropagation
                ? c.stopPropagation()
                : typeof c.cancelBubble != "unknown" && (c.cancelBubble = !0),
              (this.isPropagationStopped = ui));
          },
          persist: function () {},
          isPersistent: ui,
        }),
        t
      );
    }
    var qo = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Dm = uc(qo),
      Cd = we({}, qo, { view: 0, detail: 0 }),
      Z5 = uc(Cd),
      Ib,
      yb,
      Pr,
      ca = we({}, Cd, {
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
        getModifierState: Um,
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
            : (e !== Pr &&
                (Pr && e.type === "mousemove"
                  ? ((Ib = e.screenX - Pr.screenX),
                    (yb = e.screenY - Pr.screenY))
                  : (yb = Ib = 0),
                (Pr = e)),
              Ib);
        },
        movementY: function (e) {
          return "movementY" in e ? e.movementY : yb;
        },
      }),
      bp = uc(ca),
      R5 = we({}, ca, { dataTransfer: 0 }),
      f5 = uc(R5),
      I5 = we({}, Cd, { relatedTarget: 0 }),
      Wb = uc(I5),
      y5 = we({}, qo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      W5 = uc(y5),
      B5 = we({}, qo, {
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      v5 = uc(B5),
      F5 = we({}, qo, { data: 0 }),
      mp = uc(F5),
      h5 = {
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
      V5 = {
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
      C5 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function J5(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = C5[e])
          ? !!t[e]
          : !1;
    }
    function Um() {
      return J5;
    }
    var Y5 = we({}, Cd, {
        key: function (e) {
          if (e.key) {
            var t = h5[e.key] || e.key;
            if (t !== "Unidentified") return t;
          }
          return e.type === "keypress"
            ? ((e = Ii(e)), e === 13 ? "Enter" : String.fromCharCode(e))
            : e.type === "keydown" || e.type === "keyup"
              ? V5[e.keyCode] || "Unidentified"
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
        getModifierState: Um,
        charCode: function (e) {
          return e.type === "keypress" ? Ii(e) : 0;
        },
        keyCode: function (e) {
          return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === "keypress"
            ? Ii(e)
            : e.type === "keydown" || e.type === "keyup"
              ? e.keyCode
              : 0;
        },
      }),
      N5 = uc(Y5),
      z5 = we({}, ca, {
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
      Xp = uc(z5),
      k5 = we({}, Cd, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Um,
      }),
      w5 = uc(k5),
      S5 = we({}, qo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Q5 = uc(S5),
      O5 = we({}, ca, {
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
      A5 = uc(O5),
      L5 = [9, 13, 27, 32],
      Mm = Il && "CompositionEvent" in window,
      rd = null;
    Il && "documentMode" in document && (rd = document.documentMode);
    var T5 = Il && "TextEvent" in window && !rd,
      Sg = Il && (!Mm || (rd && 8 < rd && 11 >= rd)),
      xp = " ",
      Gp = !1;
    function Qg(e, t) {
      switch (e) {
        case "keyup":
          return L5.indexOf(t.keyCode) !== -1;
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
    function Og(e) {
      return (
        (e = e.detail), typeof e == "object" && "data" in e ? e.data : null
      );
    }
    var ho = !1;
    function D5(e, t) {
      switch (e) {
        case "compositionend":
          return Og(t);
        case "keypress":
          return t.which !== 32 ? null : ((Gp = !0), xp);
        case "textInput":
          return (e = t.data), e === xp && Gp ? null : e;
        default:
          return null;
      }
    }
    function U5(e, t) {
      if (ho)
        return e === "compositionend" || (!Mm && Qg(e, t))
          ? ((e = wg()), (fi = Tm = _l = null), (ho = !1), e)
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
          return Sg && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var M5 = {
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
    function pp(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!M5[e.type] : t === "textarea";
    }
    function Ag(e, t, c, l) {
      gg(l),
        (t = Si(t, "onChange")),
        0 < t.length &&
          ((c = new Dm("onChange", "change", null, c, l)),
          e.push({ event: c, listeners: t }));
    }
    var dd = null,
      Hd = null;
    function E5(e) {
      qg(e, 0);
    }
    function la(e) {
      var t = Jo(e);
      if (sg(t)) return e;
    }
    function j5(e, t) {
      if (e === "change") return t;
    }
    var Lg = !1;
    Il &&
      (Il
        ? ((ai = "oninput" in document),
          ai ||
            ((Bb = document.createElement("div")),
            Bb.setAttribute("oninput", "return;"),
            (ai = typeof Bb.oninput == "function")),
          (ii = ai))
        : (ii = !1),
      (Lg = ii && (!document.documentMode || 9 < document.documentMode)));
    var ii, ai, Bb;
    function gp() {
      dd && (dd.detachEvent("onpropertychange", Tg), (Hd = dd = null));
    }
    function Tg(e) {
      if (e.propertyName === "value" && la(Hd)) {
        var t = [];
        Ag(t, Hd, e, Sm(e)), fg(E5, t);
      }
    }
    function P5(e, t, c) {
      e === "focusin"
        ? (gp(), (dd = t), (Hd = c), dd.attachEvent("onpropertychange", Tg))
        : e === "focusout" && gp();
    }
    function K5(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return la(Hd);
    }
    function _5(e, t) {
      if (e === "click") return la(t);
    }
    function q5(e, t) {
      if (e === "input" || e === "change") return la(t);
    }
    function $5(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var Ac = typeof Object.is == "function" ? Object.is : $5;
    function Zd(e, t) {
      if (Ac(e, t)) return !0;
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
        if (!Ob.call(t, n) || !Ac(e[n], t[n])) return !1;
      }
      return !0;
    }
    function Hp(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Zp(e, t) {
      var c = Hp(e);
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
        c = Hp(c);
      }
    }
    function Dg(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Dg(e, t.parentNode)
              : "contains" in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Ug() {
      for (var e = window, t = Ci(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var c = typeof t.contentWindow.location.href == "string";
        } catch {
          c = !1;
        }
        if (c) e = t.contentWindow;
        else break;
        t = Ci(e.document);
      }
      return t;
    }
    function Em(e) {
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
    function ev(e) {
      var t = Ug(),
        c = e.focusedElem,
        l = e.selectionRange;
      if (
        t !== c &&
        c &&
        c.ownerDocument &&
        Dg(c.ownerDocument.documentElement, c)
      ) {
        if (l !== null && Em(c)) {
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
              (n = Zp(c, o));
            var r = Zp(c, l);
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
    var tv = Il && "documentMode" in document && 11 >= document.documentMode,
      Vo = null,
      om = null,
      ud = null,
      rm = !1;
    function Rp(e, t, c) {
      var l =
        c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
      rm ||
        Vo == null ||
        Vo !== Ci(l) ||
        ((l = Vo),
        "selectionStart" in l && Em(l)
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
        (ud && Zd(ud, l)) ||
          ((ud = l),
          (l = Si(om, "onSelect")),
          0 < l.length &&
            ((t = new Dm("onSelect", "select", null, t, c)),
            e.push({ event: t, listeners: l }),
            (t.target = Vo))));
    }
    function si(e, t) {
      var c = {};
      return (
        (c[e.toLowerCase()] = t.toLowerCase()),
        (c["Webkit" + e] = "webkit" + t),
        (c["Moz" + e] = "moz" + t),
        c
      );
    }
    var Co = {
        animationend: si("Animation", "AnimationEnd"),
        animationiteration: si("Animation", "AnimationIteration"),
        animationstart: si("Animation", "AnimationStart"),
        transitionend: si("Transition", "TransitionEnd"),
      },
      vb = {},
      Mg = {};
    Il &&
      ((Mg = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Co.animationend.animation,
        delete Co.animationiteration.animation,
        delete Co.animationstart.animation),
      "TransitionEvent" in window || delete Co.transitionend.transition);
    function na(e) {
      if (vb[e]) return vb[e];
      if (!Co[e]) return e;
      var t = Co[e],
        c;
      for (c in t) if (t.hasOwnProperty(c) && c in Mg) return (vb[e] = t[c]);
      return e;
    }
    var Eg = na("animationend"),
      jg = na("animationiteration"),
      Pg = na("animationstart"),
      Kg = na("transitionend"),
      _g = new Map(),
      fp =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " "
        );
    function an(e, t) {
      _g.set(e, t), Un(t, [e]);
    }
    for (bi = 0; bi < fp.length; bi++)
      (mi = fp[bi]),
        (Ip = mi.toLowerCase()),
        (yp = mi[0].toUpperCase() + mi.slice(1)),
        an(Ip, "on" + yp);
    var mi, Ip, yp, bi;
    an(Eg, "onAnimationEnd");
    an(jg, "onAnimationIteration");
    an(Pg, "onAnimationStart");
    an("dblclick", "onDoubleClick");
    an("focusin", "onFocus");
    an("focusout", "onBlur");
    an(Kg, "onTransitionEnd");
    Uo("onMouseEnter", ["mouseout", "mouseover"]);
    Uo("onMouseLeave", ["mouseout", "mouseover"]);
    Uo("onPointerEnter", ["pointerout", "pointerover"]);
    Uo("onPointerLeave", ["pointerout", "pointerover"]);
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
    var ld =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      cv = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(ld)
      );
    function Wp(e, t, c) {
      var l = e.type || "unknown-event";
      (e.currentTarget = c), c5(l, t, void 0, e), (e.currentTarget = null);
    }
    function qg(e, t) {
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
              Wp(n, d, i), (o = u);
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
              Wp(n, d, i), (o = u);
            }
        }
      }
      if (Yi) throw ((e = tm), (Yi = !1), (tm = null), e);
    }
    function Be(e, t) {
      var c = t[sm];
      c === void 0 && (c = t[sm] = new Set());
      var l = e + "__bubble";
      c.has(l) || ($g(t, e, 2, !1), c.add(l));
    }
    function Fb(e, t, c) {
      var l = 0;
      t && (l |= 4), $g(c, e, l, t);
    }
    var Xi = "_reactListening" + Math.random().toString(36).slice(2);
    function Rd(e) {
      if (!e[Xi]) {
        (e[Xi] = !0),
          rg.forEach(function (c) {
            c !== "selectionchange" &&
              (cv.has(c) || Fb(c, !1, e), Fb(c, !0, e));
          });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Xi] || ((t[Xi] = !0), Fb("selectionchange", !1, t));
      }
    }
    function $g(e, t, c, l) {
      switch (kg(t)) {
        case 1:
          var n = g5;
          break;
        case 4:
          n = H5;
          break;
        default:
          n = Lm;
      }
      (c = n.bind(null, t, c, e)),
        (n = void 0),
        !em ||
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
    function hb(e, t, c, l, n) {
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
      fg(function () {
        var i = o,
          a = Sm(c),
          s = [];
        e: {
          var b = _g.get(e);
          if (b !== void 0) {
            var m = Dm,
              X = e;
            switch (e) {
              case "keypress":
                if (Ii(c) === 0) break e;
              case "keydown":
              case "keyup":
                m = N5;
                break;
              case "focusin":
                (X = "focus"), (m = Wb);
                break;
              case "focusout":
                (X = "blur"), (m = Wb);
                break;
              case "beforeblur":
              case "afterblur":
                m = Wb;
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
                m = bp;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                m = f5;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                m = w5;
                break;
              case Eg:
              case jg:
              case Pg:
                m = W5;
                break;
              case Kg:
                m = Q5;
                break;
              case "scroll":
                m = Z5;
                break;
              case "wheel":
                m = A5;
                break;
              case "copy":
              case "cut":
              case "paste":
                m = v5;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                m = Xp;
            }
            var p = (t & 4) !== 0,
              Z = !p && e === "scroll",
              x = p ? (b !== null ? b + "Capture" : null) : b;
            p = [];
            for (var G = i, g; G !== null; ) {
              g = G;
              var R = g.stateNode;
              if (
                (g.tag === 5 &&
                  R !== null &&
                  ((g = R),
                  x !== null &&
                    ((R = xd(G, x)), R != null && p.push(fd(G, R, g)))),
                Z)
              )
                break;
              G = G.return;
            }
            0 < p.length &&
              ((b = new m(b, X, null, c, a)),
              s.push({ event: b, listeners: p }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (
              ((b = e === "mouseover" || e === "pointerover"),
              (m = e === "mouseout" || e === "pointerout"),
              b &&
                c !== qb &&
                (X = c.relatedTarget || c.fromElement) &&
                (zn(X) || X[yl]))
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
                ? ((X = c.relatedTarget || c.toElement),
                  (m = i),
                  (X = X ? zn(X) : null),
                  X !== null &&
                    ((Z = Mn(X)), X !== Z || (X.tag !== 5 && X.tag !== 6)) &&
                    (X = null))
                : ((m = null), (X = i)),
              m !== X)
            ) {
              if (
                ((p = bp),
                (R = "onMouseLeave"),
                (x = "onMouseEnter"),
                (G = "mouse"),
                (e === "pointerout" || e === "pointerover") &&
                  ((p = Xp),
                  (R = "onPointerLeave"),
                  (x = "onPointerEnter"),
                  (G = "pointer")),
                (Z = m == null ? b : Jo(m)),
                (g = X == null ? b : Jo(X)),
                (b = new p(R, G + "leave", m, c, a)),
                (b.target = Z),
                (b.relatedTarget = g),
                (R = null),
                zn(a) === i &&
                  ((p = new p(x, G + "enter", X, c, a)),
                  (p.target = g),
                  (p.relatedTarget = Z),
                  (R = p)),
                (Z = R),
                m && X)
              )
                t: {
                  for (p = m, x = X, G = 0, g = p; g; g = Bo(g)) G++;
                  for (g = 0, R = x; R; R = Bo(R)) g++;
                  for (; 0 < G - g; ) (p = Bo(p)), G--;
                  for (; 0 < g - G; ) (x = Bo(x)), g--;
                  for (; G--; ) {
                    if (p === x || (x !== null && p === x.alternate)) break t;
                    (p = Bo(p)), (x = Bo(x));
                  }
                  p = null;
                }
              else p = null;
              m !== null && Bp(s, b, m, p, !1),
                X !== null && Z !== null && Bp(s, Z, X, p, !0);
            }
          }
          e: {
            if (
              ((b = i ? Jo(i) : window),
              (m = b.nodeName && b.nodeName.toLowerCase()),
              m === "select" || (m === "input" && b.type === "file"))
            )
              var f = j5;
            else if (pp(b))
              if (Lg) f = q5;
              else {
                f = K5;
                var I = P5;
              }
            else
              (m = b.nodeName) &&
                m.toLowerCase() === "input" &&
                (b.type === "checkbox" || b.type === "radio") &&
                (f = _5);
            if (f && (f = f(e, i))) {
              Ag(s, f, c, a);
              break e;
            }
            I && I(e, b, i),
              e === "focusout" &&
                (I = b._wrapperState) &&
                I.controlled &&
                b.type === "number" &&
                Eb(b, "number", b.value);
          }
          switch (((I = i ? Jo(i) : window), e)) {
            case "focusin":
              (pp(I) || I.contentEditable === "true") &&
                ((Vo = I), (om = i), (ud = null));
              break;
            case "focusout":
              ud = om = Vo = null;
              break;
            case "mousedown":
              rm = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (rm = !1), Rp(s, c, a);
              break;
            case "selectionchange":
              if (tv) break;
            case "keydown":
            case "keyup":
              Rp(s, c, a);
          }
          var y;
          if (Mm)
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
            ho
              ? Qg(e, c) && (W = "onCompositionEnd")
              : e === "keydown" &&
                c.keyCode === 229 &&
                (W = "onCompositionStart");
          W &&
            (Sg &&
              c.locale !== "ko" &&
              (ho || W !== "onCompositionStart"
                ? W === "onCompositionEnd" && ho && (y = wg())
                : ((_l = a),
                  (Tm = "value" in _l ? _l.value : _l.textContent),
                  (ho = !0))),
            (I = Si(i, W)),
            0 < I.length &&
              ((W = new mp(W, e, null, c, a)),
              s.push({ event: W, listeners: I }),
              y ? (W.data = y) : ((y = Og(c)), y !== null && (W.data = y)))),
            (y = T5 ? D5(e, c) : U5(e, c)) &&
              ((i = Si(i, "onBeforeInput")),
              0 < i.length &&
                ((a = new mp("onBeforeInput", "beforeinput", null, c, a)),
                s.push({ event: a, listeners: i }),
                (a.data = y)));
        }
        qg(s, t);
      });
    }
    function fd(e, t, c) {
      return { instance: e, listener: t, currentTarget: c };
    }
    function Si(e, t) {
      for (var c = t + "Capture", l = []; e !== null; ) {
        var n = e,
          o = n.stateNode;
        n.tag === 5 &&
          o !== null &&
          ((n = o),
          (o = xd(e, c)),
          o != null && l.unshift(fd(e, o, n)),
          (o = xd(e, t)),
          o != null && l.push(fd(e, o, n))),
          (e = e.return);
      }
      return l;
    }
    function Bo(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Bp(e, t, c, l, n) {
      for (var o = t._reactName, r = []; c !== null && c !== l; ) {
        var d = c,
          u = d.alternate,
          i = d.stateNode;
        if (u !== null && u === l) break;
        d.tag === 5 &&
          i !== null &&
          ((d = i),
          n
            ? ((u = xd(c, o)), u != null && r.unshift(fd(c, u, d)))
            : n || ((u = xd(c, o)), u != null && r.push(fd(c, u, d)))),
          (c = c.return);
      }
      r.length !== 0 && e.push({ event: t, listeners: r });
    }
    var lv = /\r\n?/g,
      nv = /\u0000|\uFFFD/g;
    function vp(e) {
      return (typeof e == "string" ? e : "" + e)
        .replace(
          lv,
          `
`
        )
        .replace(nv, "");
    }
    function xi(e, t, c) {
      if (((t = vp(t)), vp(e) !== t && c)) throw Error(z(425));
    }
    function Qi() {}
    var dm = null,
      um = null;
    function im(e, t) {
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
    var am = typeof setTimeout == "function" ? setTimeout : void 0,
      ov = typeof clearTimeout == "function" ? clearTimeout : void 0,
      Fp = typeof Promise == "function" ? Promise : void 0,
      rv =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof Fp < "u"
            ? function (e) {
                return Fp.resolve(null).then(e).catch(dv);
              }
            : am;
    function dv(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Vb(e, t) {
      var c = t,
        l = 0;
      do {
        var n = c.nextSibling;
        if ((e.removeChild(c), n && n.nodeType === 8))
          if (((c = n.data), c === "/$")) {
            if (l === 0) {
              e.removeChild(n), gd(t);
              return;
            }
            l--;
          } else (c !== "$" && c !== "$?" && c !== "$!") || l++;
        c = n;
      } while (c);
      gd(t);
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
    function hp(e) {
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
    var $o = Math.random().toString(36).slice(2),
      tl = "__reactFiber$" + $o,
      Id = "__reactProps$" + $o,
      yl = "__reactContainer$" + $o,
      sm = "__reactEvents$" + $o,
      uv = "__reactListeners$" + $o,
      iv = "__reactHandles$" + $o;
    function zn(e) {
      var t = e[tl];
      if (t) return t;
      for (var c = e.parentNode; c; ) {
        if ((t = c[yl] || c[tl])) {
          if (
            ((c = t.alternate),
            t.child !== null || (c !== null && c.child !== null))
          )
            for (e = hp(e); e !== null; ) {
              if ((c = e[tl])) return c;
              e = hp(e);
            }
          return t;
        }
        (e = c), (c = e.parentNode);
      }
      return null;
    }
    function Jd(e) {
      return (
        (e = e[tl] || e[yl]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function Jo(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(z(33));
    }
    function oa(e) {
      return e[Id] || null;
    }
    var bm = [],
      Yo = -1;
    function sn(e) {
      return { current: e };
    }
    function ve(e) {
      0 > Yo || ((e.current = bm[Yo]), (bm[Yo] = null), Yo--);
    }
    function fe(e, t) {
      Yo++, (bm[Yo] = e.current), (e.current = t);
    }
    var un = {},
      Ft = sn(un),
      Et = sn(!1),
      On = un;
    function Mo(e, t) {
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
    function jt(e) {
      return (e = e.childContextTypes), e != null;
    }
    function Oi() {
      ve(Et), ve(Ft);
    }
    function Vp(e, t, c) {
      if (Ft.current !== un) throw Error(z(168));
      fe(Ft, t), fe(Et, c);
    }
    function eH(e, t, c) {
      var l = e.stateNode;
      if (((t = t.childContextTypes), typeof l.getChildContext != "function"))
        return c;
      l = l.getChildContext();
      for (var n in l)
        if (!(n in t)) throw Error(z(108, PB(e) || "Unknown", n));
      return we({}, c, l);
    }
    function Ai(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          un),
        (On = Ft.current),
        fe(Ft, e),
        fe(Et, Et.current),
        !0
      );
    }
    function Cp(e, t, c) {
      var l = e.stateNode;
      if (!l) throw Error(z(169));
      c
        ? ((e = eH(e, t, On)),
          (l.__reactInternalMemoizedMergedChildContext = e),
          ve(Et),
          ve(Ft),
          fe(Ft, e))
        : ve(Et),
        fe(Et, c);
    }
    var Hl = null,
      ra = !1,
      Cb = !1;
    function tH(e) {
      Hl === null ? (Hl = [e]) : Hl.push(e);
    }
    function av(e) {
      (ra = !0), tH(e);
    }
    function bn() {
      if (!Cb && Hl !== null) {
        Cb = !0;
        var e = 0,
          t = me;
        try {
          var c = Hl;
          for (me = 1; e < c.length; e++) {
            var l = c[e];
            do l = l(!0);
            while (l !== null);
          }
          (Hl = null), (ra = !1);
        } catch (n) {
          throw (Hl !== null && (Hl = Hl.slice(e + 1)), Bg(Qm, bn), n);
        } finally {
          (me = t), (Cb = !1);
        }
      }
      return null;
    }
    var No = [],
      zo = 0,
      Li = null,
      Ti = 0,
      gc = [],
      Hc = 0,
      An = null,
      Zl = 1,
      Rl = "";
    function Yn(e, t) {
      (No[zo++] = Ti), (No[zo++] = Li), (Li = e), (Ti = t);
    }
    function cH(e, t, c) {
      (gc[Hc++] = Zl), (gc[Hc++] = Rl), (gc[Hc++] = An), (An = e);
      var l = Zl;
      e = Rl;
      var n = 32 - Qc(l) - 1;
      (l &= ~(1 << n)), (c += 1);
      var o = 32 - Qc(t) + n;
      if (30 < o) {
        var r = n - (n % 5);
        (o = (l & ((1 << r) - 1)).toString(32)),
          (l >>= r),
          (n -= r),
          (Zl = (1 << (32 - Qc(t) + n)) | (c << n) | l),
          (Rl = o + e);
      } else (Zl = (1 << o) | (c << n) | l), (Rl = e);
    }
    function jm(e) {
      e.return !== null && (Yn(e, 1), cH(e, 1, 0));
    }
    function Pm(e) {
      for (; e === Li; )
        (Li = No[--zo]), (No[zo] = null), (Ti = No[--zo]), (No[zo] = null);
      for (; e === An; )
        (An = gc[--Hc]),
          (gc[Hc] = null),
          (Rl = gc[--Hc]),
          (gc[Hc] = null),
          (Zl = gc[--Hc]),
          (gc[Hc] = null);
    }
    var rc = null,
      oc = null,
      Ce = !1,
      Sc = null;
    function lH(e, t) {
      var c = Zc(5, null, null, 0);
      (c.elementType = "DELETED"),
        (c.stateNode = t),
        (c.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [c]), (e.flags |= 16)) : t.push(c);
    }
    function Jp(e, t) {
      switch (e.tag) {
        case 5:
          var c = e.type;
          return (
            (t =
              t.nodeType !== 1 || c.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (rc = e), (oc = cn(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (rc = e), (oc = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((c = An !== null ? { id: Zl, overflow: Rl } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: c,
                  retryLane: 1073741824,
                }),
                (c = Zc(18, null, null, 0)),
                (c.stateNode = t),
                (c.return = e),
                (e.child = c),
                (rc = e),
                (oc = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function mm(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function Xm(e) {
      if (Ce) {
        var t = oc;
        if (t) {
          var c = t;
          if (!Jp(e, t)) {
            if (mm(e)) throw Error(z(418));
            t = cn(c.nextSibling);
            var l = rc;
            t && Jp(e, t)
              ? lH(l, c)
              : ((e.flags = (e.flags & -4097) | 2), (Ce = !1), (rc = e));
          }
        } else {
          if (mm(e)) throw Error(z(418));
          (e.flags = (e.flags & -4097) | 2), (Ce = !1), (rc = e);
        }
      }
    }
    function Yp(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

      )
        e = e.return;
      rc = e;
    }
    function Gi(e) {
      if (e !== rc) return !1;
      if (!Ce) return Yp(e), (Ce = !0), !1;
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== "head" && t !== "body" && !im(e.type, e.memoizedProps))),
        t && (t = oc))
      ) {
        if (mm(e)) throw (nH(), Error(z(418)));
        for (; t; ) lH(e, t), (t = cn(t.nextSibling));
      }
      if ((Yp(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(z(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var c = e.data;
              if (c === "/$") {
                if (t === 0) {
                  oc = cn(e.nextSibling);
                  break e;
                }
                t--;
              } else (c !== "$" && c !== "$!" && c !== "$?") || t++;
            }
            e = e.nextSibling;
          }
          oc = null;
        }
      } else oc = rc ? cn(e.stateNode.nextSibling) : null;
      return !0;
    }
    function nH() {
      for (var e = oc; e; ) e = cn(e.nextSibling);
    }
    function Eo() {
      (oc = rc = null), (Ce = !1);
    }
    function Km(e) {
      Sc === null ? (Sc = [e]) : Sc.push(e);
    }
    var sv = vl.ReactCurrentBatchConfig;
    function Kr(e, t, c) {
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
    function pi(e, t) {
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
    function Np(e) {
      var t = e._init;
      return t(e._payload);
    }
    function oH(e) {
      function t(x, G) {
        if (e) {
          var g = x.deletions;
          g === null ? ((x.deletions = [G]), (x.flags |= 16)) : g.push(G);
        }
      }
      function c(x, G) {
        if (!e) return null;
        for (; G !== null; ) t(x, G), (G = G.sibling);
        return null;
      }
      function l(x, G) {
        for (x = new Map(); G !== null; )
          G.key !== null ? x.set(G.key, G) : x.set(G.index, G), (G = G.sibling);
        return x;
      }
      function n(x, G) {
        return (x = rn(x, G)), (x.index = 0), (x.sibling = null), x;
      }
      function o(x, G, g) {
        return (
          (x.index = g),
          e
            ? ((g = x.alternate),
              g !== null
                ? ((g = g.index), g < G ? ((x.flags |= 2), G) : g)
                : ((x.flags |= 2), G))
            : ((x.flags |= 1048576), G)
        );
      }
      function r(x) {
        return e && x.alternate === null && (x.flags |= 2), x;
      }
      function d(x, G, g, R) {
        return G === null || G.tag !== 6
          ? ((G = Sb(g, x.mode, R)), (G.return = x), G)
          : ((G = n(G, g)), (G.return = x), G);
      }
      function u(x, G, g, R) {
        var f = g.type;
        return f === Fo
          ? a(x, G, g.props.children, R, g.key)
          : G !== null &&
              (G.elementType === f ||
                (typeof f == "object" &&
                  f !== null &&
                  f.$$typeof === El &&
                  Np(f) === G.type))
            ? ((R = n(G, g.props)), (R.ref = Kr(x, G, g)), (R.return = x), R)
            : ((R = Vi(g.type, g.key, g.props, null, x.mode, R)),
              (R.ref = Kr(x, G, g)),
              (R.return = x),
              R);
      }
      function i(x, G, g, R) {
        return G === null ||
          G.tag !== 4 ||
          G.stateNode.containerInfo !== g.containerInfo ||
          G.stateNode.implementation !== g.implementation
          ? ((G = Qb(g, x.mode, R)), (G.return = x), G)
          : ((G = n(G, g.children || [])), (G.return = x), G);
      }
      function a(x, G, g, R, f) {
        return G === null || G.tag !== 7
          ? ((G = Qn(g, x.mode, R, f)), (G.return = x), G)
          : ((G = n(G, g)), (G.return = x), G);
      }
      function s(x, G, g) {
        if ((typeof G == "string" && G !== "") || typeof G == "number")
          return (G = Sb("" + G, x.mode, g)), (G.return = x), G;
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case ci:
              return (
                (g = Vi(G.type, G.key, G.props, null, x.mode, g)),
                (g.ref = Kr(x, null, G)),
                (g.return = x),
                g
              );
            case vo:
              return (G = Qb(G, x.mode, g)), (G.return = x), G;
            case El:
              var R = G._init;
              return s(x, R(G._payload), g);
          }
          if (td(G) || Mr(G))
            return (G = Qn(G, x.mode, g, null)), (G.return = x), G;
          pi(x, G);
        }
        return null;
      }
      function b(x, G, g, R) {
        var f = G !== null ? G.key : null;
        if ((typeof g == "string" && g !== "") || typeof g == "number")
          return f !== null ? null : d(x, G, "" + g, R);
        if (typeof g == "object" && g !== null) {
          switch (g.$$typeof) {
            case ci:
              return g.key === f ? u(x, G, g, R) : null;
            case vo:
              return g.key === f ? i(x, G, g, R) : null;
            case El:
              return (f = g._init), b(x, G, f(g._payload), R);
          }
          if (td(g) || Mr(g)) return f !== null ? null : a(x, G, g, R, null);
          pi(x, g);
        }
        return null;
      }
      function m(x, G, g, R, f) {
        if ((typeof R == "string" && R !== "") || typeof R == "number")
          return (x = x.get(g) || null), d(G, x, "" + R, f);
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case ci:
              return (
                (x = x.get(R.key === null ? g : R.key) || null), u(G, x, R, f)
              );
            case vo:
              return (
                (x = x.get(R.key === null ? g : R.key) || null), i(G, x, R, f)
              );
            case El:
              var I = R._init;
              return m(x, G, g, I(R._payload), f);
          }
          if (td(R) || Mr(R))
            return (x = x.get(g) || null), a(G, x, R, f, null);
          pi(G, R);
        }
        return null;
      }
      function X(x, G, g, R) {
        for (
          var f = null, I = null, y = G, W = (G = 0), B = null;
          y !== null && W < g.length;
          W++
        ) {
          y.index > W ? ((B = y), (y = null)) : (B = y.sibling);
          var F = b(x, y, g[W], R);
          if (F === null) {
            y === null && (y = B);
            break;
          }
          e && y && F.alternate === null && t(x, y),
            (G = o(F, G, W)),
            I === null ? (f = F) : (I.sibling = F),
            (I = F),
            (y = B);
        }
        if (W === g.length) return c(x, y), Ce && Yn(x, W), f;
        if (y === null) {
          for (; W < g.length; W++)
            (y = s(x, g[W], R)),
              y !== null &&
                ((G = o(y, G, W)),
                I === null ? (f = y) : (I.sibling = y),
                (I = y));
          return Ce && Yn(x, W), f;
        }
        for (y = l(x, y); W < g.length; W++)
          (B = m(y, x, W, g[W], R)),
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
              return t(x, S);
            }),
          Ce && Yn(x, W),
          f
        );
      }
      function p(x, G, g, R) {
        var f = Mr(g);
        if (typeof f != "function") throw Error(z(150));
        if (((g = f.call(g)), g == null)) throw Error(z(151));
        for (
          var I = (f = null), y = G, W = (G = 0), B = null, F = g.next();
          y !== null && !F.done;
          W++, F = g.next()
        ) {
          y.index > W ? ((B = y), (y = null)) : (B = y.sibling);
          var S = b(x, y, F.value, R);
          if (S === null) {
            y === null && (y = B);
            break;
          }
          e && y && S.alternate === null && t(x, y),
            (G = o(S, G, W)),
            I === null ? (f = S) : (I.sibling = S),
            (I = S),
            (y = B);
        }
        if (F.done) return c(x, y), Ce && Yn(x, W), f;
        if (y === null) {
          for (; !F.done; W++, F = g.next())
            (F = s(x, F.value, R)),
              F !== null &&
                ((G = o(F, G, W)),
                I === null ? (f = F) : (I.sibling = F),
                (I = F));
          return Ce && Yn(x, W), f;
        }
        for (y = l(x, y); !F.done; W++, F = g.next())
          (F = m(y, x, W, F.value, R)),
            F !== null &&
              (e &&
                F.alternate !== null &&
                y.delete(F.key === null ? W : F.key),
              (G = o(F, G, W)),
              I === null ? (f = F) : (I.sibling = F),
              (I = F));
        return (
          e &&
            y.forEach(function (Q) {
              return t(x, Q);
            }),
          Ce && Yn(x, W),
          f
        );
      }
      function Z(x, G, g, R) {
        if (
          (typeof g == "object" &&
            g !== null &&
            g.type === Fo &&
            g.key === null &&
            (g = g.props.children),
          typeof g == "object" && g !== null)
        ) {
          switch (g.$$typeof) {
            case ci:
              e: {
                for (var f = g.key, I = G; I !== null; ) {
                  if (I.key === f) {
                    if (((f = g.type), f === Fo)) {
                      if (I.tag === 7) {
                        c(x, I.sibling),
                          (G = n(I, g.props.children)),
                          (G.return = x),
                          (x = G);
                        break e;
                      }
                    } else if (
                      I.elementType === f ||
                      (typeof f == "object" &&
                        f !== null &&
                        f.$$typeof === El &&
                        Np(f) === I.type)
                    ) {
                      c(x, I.sibling),
                        (G = n(I, g.props)),
                        (G.ref = Kr(x, I, g)),
                        (G.return = x),
                        (x = G);
                      break e;
                    }
                    c(x, I);
                    break;
                  } else t(x, I);
                  I = I.sibling;
                }
                g.type === Fo
                  ? ((G = Qn(g.props.children, x.mode, R, g.key)),
                    (G.return = x),
                    (x = G))
                  : ((R = Vi(g.type, g.key, g.props, null, x.mode, R)),
                    (R.ref = Kr(x, G, g)),
                    (R.return = x),
                    (x = R));
              }
              return r(x);
            case vo:
              e: {
                for (I = g.key; G !== null; ) {
                  if (G.key === I)
                    if (
                      G.tag === 4 &&
                      G.stateNode.containerInfo === g.containerInfo &&
                      G.stateNode.implementation === g.implementation
                    ) {
                      c(x, G.sibling),
                        (G = n(G, g.children || [])),
                        (G.return = x),
                        (x = G);
                      break e;
                    } else {
                      c(x, G);
                      break;
                    }
                  else t(x, G);
                  G = G.sibling;
                }
                (G = Qb(g, x.mode, R)), (G.return = x), (x = G);
              }
              return r(x);
            case El:
              return (I = g._init), Z(x, G, I(g._payload), R);
          }
          if (td(g)) return X(x, G, g, R);
          if (Mr(g)) return p(x, G, g, R);
          pi(x, g);
        }
        return (typeof g == "string" && g !== "") || typeof g == "number"
          ? ((g = "" + g),
            G !== null && G.tag === 6
              ? (c(x, G.sibling), (G = n(G, g)), (G.return = x), (x = G))
              : (c(x, G), (G = Sb(g, x.mode, R)), (G.return = x), (x = G)),
            r(x))
          : c(x, G);
      }
      return Z;
    }
    var jo = oH(!0),
      rH = oH(!1),
      Di = sn(null),
      Ui = null,
      ko = null,
      _m = null;
    function qm() {
      _m = ko = Ui = null;
    }
    function $m(e) {
      var t = Di.current;
      ve(Di), (e._currentValue = t);
    }
    function xm(e, t, c) {
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
    function To(e, t) {
      (Ui = e),
        (_m = ko = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          (e.lanes & t && (Mt = !0), (e.firstContext = null));
    }
    function fc(e) {
      var t = e._currentValue;
      if (_m !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), ko === null)) {
          if (Ui === null) throw Error(z(308));
          (ko = e), (Ui.dependencies = { lanes: 0, firstContext: e });
        } else ko = ko.next = e;
      return t;
    }
    var kn = null;
    function eX(e) {
      kn === null ? (kn = [e]) : kn.push(e);
    }
    function dH(e, t, c, l) {
      var n = t.interleaved;
      return (
        n === null ? ((c.next = c), eX(t)) : ((c.next = n.next), (n.next = c)),
        (t.interleaved = c),
        Wl(e, l)
      );
    }
    function Wl(e, t) {
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
    function tX(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function uH(e, t) {
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
    function fl(e, t) {
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
          Wl(e, c)
        );
      }
      return (
        (n = l.interleaved),
        n === null ? ((t.next = t), eX(l)) : ((t.next = n.next), (n.next = t)),
        (l.interleaved = t),
        Wl(e, c)
      );
    }
    function yi(e, t, c) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (c & 4194240) !== 0))
      ) {
        var l = t.lanes;
        (l &= e.pendingLanes), (c |= l), (t.lanes = c), Om(e, c);
      }
    }
    function zp(e, t) {
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
    function Mi(e, t, c, l) {
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
              var X = e,
                p = d;
              switch (((b = t), (m = c), p.tag)) {
                case 1:
                  if (((X = p.payload), typeof X == "function")) {
                    s = X.call(m, s, b);
                    break e;
                  }
                  s = X;
                  break e;
                case 3:
                  X.flags = (X.flags & -65537) | 128;
                case 0:
                  if (
                    ((X = p.payload),
                    (b = typeof X == "function" ? X.call(m, s, b) : X),
                    b == null)
                  )
                    break e;
                  s = we({}, s, b);
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
    function kp(e, t, c) {
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
    var Yd = {},
      ll = sn(Yd),
      yd = sn(Yd),
      Wd = sn(Yd);
    function wn(e) {
      if (e === Yd) throw Error(z(174));
      return e;
    }
    function cX(e, t) {
      switch ((fe(Wd, t), fe(yd, e), fe(ll, Yd), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Pb(null, "");
          break;
        default:
          (e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Pb(t, e));
      }
      ve(ll), fe(ll, t);
    }
    function Po() {
      ve(ll), ve(yd), ve(Wd);
    }
    function iH(e) {
      wn(Wd.current);
      var t = wn(ll.current),
        c = Pb(t, e.type);
      t !== c && (fe(yd, e), fe(ll, c));
    }
    function lX(e) {
      yd.current === e && (ve(ll), ve(yd));
    }
    var ze = sn(0);
    function Ei(e) {
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
    var Jb = [];
    function nX() {
      for (var e = 0; e < Jb.length; e++)
        Jb[e]._workInProgressVersionPrimary = null;
      Jb.length = 0;
    }
    var Wi = vl.ReactCurrentDispatcher,
      Yb = vl.ReactCurrentBatchConfig,
      Ln = 0,
      ke = null,
      et = null,
      ot = null,
      ji = !1,
      id = !1,
      Bd = 0,
      bv = 0;
    function Wt() {
      throw Error(z(321));
    }
    function oX(e, t) {
      if (t === null) return !1;
      for (var c = 0; c < t.length && c < e.length; c++)
        if (!Ac(e[c], t[c])) return !1;
      return !0;
    }
    function rX(e, t, c, l, n, o) {
      if (
        ((Ln = o),
        (ke = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Wi.current = e === null || e.memoizedState === null ? Gv : pv),
        (e = c(l, n)),
        id)
      ) {
        o = 0;
        do {
          if (((id = !1), (Bd = 0), 25 <= o)) throw Error(z(301));
          (o += 1),
            (ot = et = null),
            (t.updateQueue = null),
            (Wi.current = gv),
            (e = c(l, n));
        } while (id);
      }
      if (
        ((Wi.current = Pi),
        (t = et !== null && et.next !== null),
        (Ln = 0),
        (ot = et = ke = null),
        (ji = !1),
        t)
      )
        throw Error(z(300));
      return e;
    }
    function dX() {
      var e = Bd !== 0;
      return (Bd = 0), e;
    }
    function el() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return ot === null ? (ke.memoizedState = ot = e) : (ot = ot.next = e), ot;
    }
    function Ic() {
      if (et === null) {
        var e = ke.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = et.next;
      var t = ot === null ? ke.memoizedState : ot.next;
      if (t !== null) (ot = t), (et = e);
      else {
        if (e === null) throw Error(z(310));
        (et = e),
          (e = {
            memoizedState: et.memoizedState,
            baseState: et.baseState,
            baseQueue: et.baseQueue,
            queue: et.queue,
            next: null,
          }),
          ot === null ? (ke.memoizedState = ot = e) : (ot = ot.next = e);
      }
      return ot;
    }
    function vd(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Nb(e) {
      var t = Ic(),
        c = t.queue;
      if (c === null) throw Error(z(311));
      c.lastRenderedReducer = e;
      var l = et,
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
              (ke.lanes |= a),
              (Tn |= a);
          }
          i = i.next;
        } while (i !== null && i !== o);
        u === null ? (r = l) : (u.next = d),
          Ac(l, t.memoizedState) || (Mt = !0),
          (t.memoizedState = l),
          (t.baseState = r),
          (t.baseQueue = u),
          (c.lastRenderedState = l);
      }
      if (((e = c.interleaved), e !== null)) {
        n = e;
        do (o = n.lane), (ke.lanes |= o), (Tn |= o), (n = n.next);
        while (n !== e);
      } else n === null && (c.lanes = 0);
      return [t.memoizedState, c.dispatch];
    }
    function zb(e) {
      var t = Ic(),
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
        Ac(o, t.memoizedState) || (Mt = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (c.lastRenderedState = o);
      }
      return [o, l];
    }
    function aH() {}
    function sH(e, t) {
      var c = ke,
        l = Ic(),
        n = t(),
        o = !Ac(l.memoizedState, n);
      if (
        (o && ((l.memoizedState = n), (Mt = !0)),
        (l = l.queue),
        uX(XH.bind(null, c, l, e), [e]),
        l.getSnapshot !== t || o || (ot !== null && ot.memoizedState.tag & 1))
      ) {
        if (
          ((c.flags |= 2048),
          Fd(9, mH.bind(null, c, l, n, t), void 0, null),
          rt === null)
        )
          throw Error(z(349));
        Ln & 30 || bH(c, t, n);
      }
      return n;
    }
    function bH(e, t, c) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: c }),
        (t = ke.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (ke.updateQueue = t),
            (t.stores = [e]))
          : ((c = t.stores), c === null ? (t.stores = [e]) : c.push(e));
    }
    function mH(e, t, c, l) {
      (t.value = c), (t.getSnapshot = l), xH(t) && GH(e);
    }
    function XH(e, t, c) {
      return c(function () {
        xH(t) && GH(e);
      });
    }
    function xH(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var c = t();
        return !Ac(e, c);
      } catch {
        return !0;
      }
    }
    function GH(e) {
      var t = Wl(e, 1);
      t !== null && Oc(t, e, 1, -1);
    }
    function Sp(e) {
      var t = el();
      return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: vd,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = xv.bind(null, ke, e)),
        [t.memoizedState, e]
      );
    }
    function Fd(e, t, c, l) {
      return (
        (e = { tag: e, create: t, destroy: c, deps: l, next: null }),
        (t = ke.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (ke.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((c = t.lastEffect),
            c === null
              ? (t.lastEffect = e.next = e)
              : ((l = c.next), (c.next = e), (e.next = l), (t.lastEffect = e))),
        e
      );
    }
    function pH() {
      return Ic().memoizedState;
    }
    function Bi(e, t, c, l) {
      var n = el();
      (ke.flags |= e),
        (n.memoizedState = Fd(1 | t, c, void 0, l === void 0 ? null : l));
    }
    function da(e, t, c, l) {
      var n = Ic();
      l = l === void 0 ? null : l;
      var o = void 0;
      if (et !== null) {
        var r = et.memoizedState;
        if (((o = r.destroy), l !== null && oX(l, r.deps))) {
          n.memoizedState = Fd(t, c, o, l);
          return;
        }
      }
      (ke.flags |= e), (n.memoizedState = Fd(1 | t, c, o, l));
    }
    function Qp(e, t) {
      return Bi(8390656, 8, e, t);
    }
    function uX(e, t) {
      return da(2048, 8, e, t);
    }
    function gH(e, t) {
      return da(4, 2, e, t);
    }
    function HH(e, t) {
      return da(4, 4, e, t);
    }
    function ZH(e, t) {
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
    function RH(e, t, c) {
      return (
        (c = c != null ? c.concat([e]) : null), da(4, 4, ZH.bind(null, t, e), c)
      );
    }
    function iX() {}
    function fH(e, t) {
      var c = Ic();
      t = t === void 0 ? null : t;
      var l = c.memoizedState;
      return l !== null && t !== null && oX(t, l[1])
        ? l[0]
        : ((c.memoizedState = [e, t]), e);
    }
    function IH(e, t) {
      var c = Ic();
      t = t === void 0 ? null : t;
      var l = c.memoizedState;
      return l !== null && t !== null && oX(t, l[1])
        ? l[0]
        : ((e = e()), (c.memoizedState = [e, t]), e);
    }
    function yH(e, t, c) {
      return Ln & 21
        ? (Ac(c, t) ||
            ((c = hg()), (ke.lanes |= c), (Tn |= c), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Mt = !0)),
          (e.memoizedState = c));
    }
    function mv(e, t) {
      var c = me;
      (me = c !== 0 && 4 > c ? c : 4), e(!0);
      var l = Yb.transition;
      Yb.transition = {};
      try {
        e(!1), t();
      } finally {
        (me = c), (Yb.transition = l);
      }
    }
    function WH() {
      return Ic().memoizedState;
    }
    function Xv(e, t, c) {
      var l = on(e);
      if (
        ((c = {
          lane: l,
          action: c,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        BH(e))
      )
        vH(t, c);
      else if (((c = dH(e, t, c, l)), c !== null)) {
        var n = zt();
        Oc(c, e, l, n), FH(c, t, l);
      }
    }
    function xv(e, t, c) {
      var l = on(e),
        n = {
          lane: l,
          action: c,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (BH(e)) vH(t, n);
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
            if (((n.hasEagerState = !0), (n.eagerState = d), Ac(d, r))) {
              var u = t.interleaved;
              u === null
                ? ((n.next = n), eX(t))
                : ((n.next = u.next), (u.next = n)),
                (t.interleaved = n);
              return;
            }
          } catch {
          } finally {
          }
        (c = dH(e, t, n, l)),
          c !== null && ((n = zt()), Oc(c, e, l, n), FH(c, t, l));
      }
    }
    function BH(e) {
      var t = e.alternate;
      return e === ke || (t !== null && t === ke);
    }
    function vH(e, t) {
      id = ji = !0;
      var c = e.pending;
      c === null ? (t.next = t) : ((t.next = c.next), (c.next = t)),
        (e.pending = t);
    }
    function FH(e, t, c) {
      if (c & 4194240) {
        var l = t.lanes;
        (l &= e.pendingLanes), (c |= l), (t.lanes = c), Om(e, c);
      }
    }
    var Pi = {
        readContext: fc,
        useCallback: Wt,
        useContext: Wt,
        useEffect: Wt,
        useImperativeHandle: Wt,
        useInsertionEffect: Wt,
        useLayoutEffect: Wt,
        useMemo: Wt,
        useReducer: Wt,
        useRef: Wt,
        useState: Wt,
        useDebugValue: Wt,
        useDeferredValue: Wt,
        useTransition: Wt,
        useMutableSource: Wt,
        useSyncExternalStore: Wt,
        useId: Wt,
        unstable_isNewReconciler: !1,
      },
      Gv = {
        readContext: fc,
        useCallback: function (e, t) {
          return (el().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: fc,
        useEffect: Qp,
        useImperativeHandle: function (e, t, c) {
          return (
            (c = c != null ? c.concat([e]) : null),
            Bi(4194308, 4, ZH.bind(null, t, e), c)
          );
        },
        useLayoutEffect: function (e, t) {
          return Bi(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Bi(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var c = el();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (c.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, c) {
          var l = el();
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
            (e = e.dispatch = Xv.bind(null, ke, e)),
            [l.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = el();
          return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Sp,
        useDebugValue: iX,
        useDeferredValue: function (e) {
          return (el().memoizedState = e);
        },
        useTransition: function () {
          var e = Sp(!1),
            t = e[0];
          return (e = mv.bind(null, e[1])), (el().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, c) {
          var l = ke,
            n = el();
          if (Ce) {
            if (c === void 0) throw Error(z(407));
            c = c();
          } else {
            if (((c = t()), rt === null)) throw Error(z(349));
            Ln & 30 || bH(l, t, c);
          }
          n.memoizedState = c;
          var o = { value: c, getSnapshot: t };
          return (
            (n.queue = o),
            Qp(XH.bind(null, l, o, e), [e]),
            (l.flags |= 2048),
            Fd(9, mH.bind(null, l, o, c, t), void 0, null),
            c
          );
        },
        useId: function () {
          var e = el(),
            t = rt.identifierPrefix;
          if (Ce) {
            var c = Rl,
              l = Zl;
            (c = (l & ~(1 << (32 - Qc(l) - 1))).toString(32) + c),
              (t = ":" + t + "R" + c),
              (c = Bd++),
              0 < c && (t += "H" + c.toString(32)),
              (t += ":");
          } else (c = bv++), (t = ":" + t + "r" + c.toString(32) + ":");
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      pv = {
        readContext: fc,
        useCallback: fH,
        useContext: fc,
        useEffect: uX,
        useImperativeHandle: RH,
        useInsertionEffect: gH,
        useLayoutEffect: HH,
        useMemo: IH,
        useReducer: Nb,
        useRef: pH,
        useState: function () {
          return Nb(vd);
        },
        useDebugValue: iX,
        useDeferredValue: function (e) {
          var t = Ic();
          return yH(t, et.memoizedState, e);
        },
        useTransition: function () {
          var e = Nb(vd)[0],
            t = Ic().memoizedState;
          return [e, t];
        },
        useMutableSource: aH,
        useSyncExternalStore: sH,
        useId: WH,
        unstable_isNewReconciler: !1,
      },
      gv = {
        readContext: fc,
        useCallback: fH,
        useContext: fc,
        useEffect: uX,
        useImperativeHandle: RH,
        useInsertionEffect: gH,
        useLayoutEffect: HH,
        useMemo: IH,
        useReducer: zb,
        useRef: pH,
        useState: function () {
          return zb(vd);
        },
        useDebugValue: iX,
        useDeferredValue: function (e) {
          var t = Ic();
          return et === null
            ? (t.memoizedState = e)
            : yH(t, et.memoizedState, e);
        },
        useTransition: function () {
          var e = zb(vd)[0],
            t = Ic().memoizedState;
          return [e, t];
        },
        useMutableSource: aH,
        useSyncExternalStore: sH,
        useId: WH,
        unstable_isNewReconciler: !1,
      };
    function kc(e, t) {
      if (e && e.defaultProps) {
        (t = we({}, t)), (e = e.defaultProps);
        for (var c in e) t[c] === void 0 && (t[c] = e[c]);
        return t;
      }
      return t;
    }
    function Gm(e, t, c, l) {
      (t = e.memoizedState),
        (c = c(l, t)),
        (c = c == null ? t : we({}, t, c)),
        (e.memoizedState = c),
        e.lanes === 0 && (e.updateQueue.baseState = c);
    }
    var ua = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? Mn(e) === e : !1;
      },
      enqueueSetState: function (e, t, c) {
        e = e._reactInternals;
        var l = zt(),
          n = on(e),
          o = fl(l, n);
        (o.payload = t),
          c != null && (o.callback = c),
          (t = ln(e, o, n)),
          t !== null && (Oc(t, e, n, l), yi(t, e, n));
      },
      enqueueReplaceState: function (e, t, c) {
        e = e._reactInternals;
        var l = zt(),
          n = on(e),
          o = fl(l, n);
        (o.tag = 1),
          (o.payload = t),
          c != null && (o.callback = c),
          (t = ln(e, o, n)),
          t !== null && (Oc(t, e, n, l), yi(t, e, n));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var c = zt(),
          l = on(e),
          n = fl(c, l);
        (n.tag = 2),
          t != null && (n.callback = t),
          (t = ln(e, n, l)),
          t !== null && (Oc(t, e, l, c), yi(t, e, l));
      },
    };
    function Op(e, t, c, l, n, o, r) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
          ? e.shouldComponentUpdate(l, o, r)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Zd(c, l) || !Zd(n, o)
            : !0
      );
    }
    function hH(e, t, c) {
      var l = !1,
        n = un,
        o = t.contextType;
      return (
        typeof o == "object" && o !== null
          ? (o = fc(o))
          : ((n = jt(t) ? On : Ft.current),
            (l = t.contextTypes),
            (o = (l = l != null) ? Mo(e, n) : un)),
        (t = new t(c, o)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = ua),
        (e.stateNode = t),
        (t._reactInternals = e),
        l &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = n),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
      );
    }
    function Ap(e, t, c, l) {
      (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
          t.componentWillReceiveProps(c, l),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
          t.UNSAFE_componentWillReceiveProps(c, l),
        t.state !== e && ua.enqueueReplaceState(t, t.state, null);
    }
    function pm(e, t, c, l) {
      var n = e.stateNode;
      (n.props = c), (n.state = e.memoizedState), (n.refs = {}), tX(e);
      var o = t.contextType;
      typeof o == "object" && o !== null
        ? (n.context = fc(o))
        : ((o = jt(t) ? On : Ft.current), (n.context = Mo(e, o))),
        (n.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (Gm(e, t, o, c), (n.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((t = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          t !== n.state && ua.enqueueReplaceState(n, n.state, null),
          Mi(e, c, n, l),
          (n.state = e.memoizedState)),
        typeof n.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function Ko(e, t) {
      try {
        var c = "",
          l = t;
        do (c += jB(l)), (l = l.return);
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
    function kb(e, t, c) {
      return { value: e, source: null, stack: c ?? null, digest: t ?? null };
    }
    function gm(e, t) {
      try {
        console.error(t.value);
      } catch (c) {
        setTimeout(function () {
          throw c;
        });
      }
    }
    var Hv = typeof WeakMap == "function" ? WeakMap : Map;
    function VH(e, t, c) {
      (c = fl(-1, c)), (c.tag = 3), (c.payload = { element: null });
      var l = t.value;
      return (
        (c.callback = function () {
          _i || ((_i = !0), (Fm = l)), gm(e, t);
        }),
        c
      );
    }
    function CH(e, t, c) {
      (c = fl(-1, c)), (c.tag = 3);
      var l = e.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var n = t.value;
        (c.payload = function () {
          return l(n);
        }),
          (c.callback = function () {
            gm(e, t);
          });
      }
      var o = e.stateNode;
      return (
        o !== null &&
          typeof o.componentDidCatch == "function" &&
          (c.callback = function () {
            gm(e, t),
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
    function Lp(e, t, c) {
      var l = e.pingCache;
      if (l === null) {
        l = e.pingCache = new Hv();
        var n = new Set();
        l.set(t, n);
      } else (n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n));
      n.has(c) || (n.add(c), (e = Yv.bind(null, e, t, c)), t.then(e, e));
    }
    function Tp(e) {
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
    function Dp(e, t, c, l, n) {
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
                  : ((t = fl(-1, 1)), (t.tag = 2), ln(c, t, 1))),
              (c.lanes |= 1)),
          e);
    }
    var Zv = vl.ReactCurrentOwner,
      Mt = !1;
    function Nt(e, t, c, l) {
      t.child = e === null ? rH(t, null, c, l) : jo(t, e.child, c, l);
    }
    function Up(e, t, c, l, n) {
      c = c.render;
      var o = t.ref;
      return (
        To(t, n),
        (l = rX(e, t, c, l, o, n)),
        (c = dX()),
        e !== null && !Mt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~n),
            Bl(e, t, n))
          : (Ce && c && jm(t), (t.flags |= 1), Nt(e, t, l, n), t.child)
      );
    }
    function Mp(e, t, c, l, n) {
      if (e === null) {
        var o = c.type;
        return typeof o == "function" &&
          !pX(o) &&
          o.defaultProps === void 0 &&
          c.compare === null &&
          c.defaultProps === void 0
          ? ((t.tag = 15), (t.type = o), JH(e, t, o, l, n))
          : ((e = Vi(c.type, null, l, t, t.mode, n)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((o = e.child), !(e.lanes & n))) {
        var r = o.memoizedProps;
        if (
          ((c = c.compare),
          (c = c !== null ? c : Zd),
          c(r, l) && e.ref === t.ref)
        )
          return Bl(e, t, n);
      }
      return (
        (t.flags |= 1),
        (e = rn(o, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function JH(e, t, c, l, n) {
      if (e !== null) {
        var o = e.memoizedProps;
        if (Zd(o, l) && e.ref === t.ref)
          if (((Mt = !1), (t.pendingProps = l = o), (e.lanes & n) !== 0))
            e.flags & 131072 && (Mt = !0);
          else return (t.lanes = e.lanes), Bl(e, t, n);
      }
      return Hm(e, t, c, l, n);
    }
    function YH(e, t, c) {
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
            fe(So, nc),
            (nc |= c);
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
              fe(So, nc),
              (nc |= e),
              null
            );
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (l = o !== null ? o.baseLanes : c),
            fe(So, nc),
            (nc |= l);
        }
      else
        o !== null
          ? ((l = o.baseLanes | c), (t.memoizedState = null))
          : (l = c),
          fe(So, nc),
          (nc |= l);
      return Nt(e, t, n, c), t.child;
    }
    function NH(e, t) {
      var c = t.ref;
      ((e === null && c !== null) || (e !== null && e.ref !== c)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function Hm(e, t, c, l, n) {
      var o = jt(c) ? On : Ft.current;
      return (
        (o = Mo(t, o)),
        To(t, n),
        (c = rX(e, t, c, l, o, n)),
        (l = dX()),
        e !== null && !Mt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~n),
            Bl(e, t, n))
          : (Ce && l && jm(t), (t.flags |= 1), Nt(e, t, c, n), t.child)
      );
    }
    function Ep(e, t, c, l, n) {
      if (jt(c)) {
        var o = !0;
        Ai(t);
      } else o = !1;
      if ((To(t, n), t.stateNode === null))
        vi(e, t), hH(t, c, l), pm(t, c, l, n), (l = !0);
      else if (e === null) {
        var r = t.stateNode,
          d = t.memoizedProps;
        r.props = d;
        var u = r.context,
          i = c.contextType;
        typeof i == "object" && i !== null
          ? (i = fc(i))
          : ((i = jt(c) ? On : Ft.current), (i = Mo(t, i)));
        var a = c.getDerivedStateFromProps,
          s =
            typeof a == "function" ||
            typeof r.getSnapshotBeforeUpdate == "function";
        s ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((d !== l || u !== i) && Ap(t, r, l, i)),
          (jl = !1);
        var b = t.memoizedState;
        (r.state = b),
          Mi(t, l, r, n),
          (u = t.memoizedState),
          d !== l || b !== u || Et.current || jl
            ? (typeof a == "function" &&
                (Gm(t, c, a, l), (u = t.memoizedState)),
              (d = jl || Op(t, c, d, l, b, u, i))
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
          uH(e, t),
          (d = t.memoizedProps),
          (i = t.type === t.elementType ? d : kc(t.type, d)),
          (r.props = i),
          (s = t.pendingProps),
          (b = r.context),
          (u = c.contextType),
          typeof u == "object" && u !== null
            ? (u = fc(u))
            : ((u = jt(c) ? On : Ft.current), (u = Mo(t, u)));
        var m = c.getDerivedStateFromProps;
        (a =
          typeof m == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((d !== s || b !== u) && Ap(t, r, l, u)),
          (jl = !1),
          (b = t.memoizedState),
          (r.state = b),
          Mi(t, l, r, n);
        var X = t.memoizedState;
        d !== s || b !== X || Et.current || jl
          ? (typeof m == "function" && (Gm(t, c, m, l), (X = t.memoizedState)),
            (i = jl || Op(t, c, i, l, b, X, u) || !1)
              ? (a ||
                  (typeof r.UNSAFE_componentWillUpdate != "function" &&
                    typeof r.componentWillUpdate != "function") ||
                  (typeof r.componentWillUpdate == "function" &&
                    r.componentWillUpdate(l, X, u),
                  typeof r.UNSAFE_componentWillUpdate == "function" &&
                    r.UNSAFE_componentWillUpdate(l, X, u)),
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
                (t.memoizedState = X)),
            (r.props = l),
            (r.state = X),
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
      return Zm(e, t, c, l, o, n);
    }
    function Zm(e, t, c, l, n, o) {
      NH(e, t);
      var r = (t.flags & 128) !== 0;
      if (!l && !r) return n && Cp(t, c, !1), Bl(e, t, o);
      (l = t.stateNode), (Zv.current = t);
      var d =
        r && typeof c.getDerivedStateFromError != "function"
          ? null
          : l.render();
      return (
        (t.flags |= 1),
        e !== null && r
          ? ((t.child = jo(t, e.child, null, o)), (t.child = jo(t, null, d, o)))
          : Nt(e, t, d, o),
        (t.memoizedState = l.state),
        n && Cp(t, c, !0),
        t.child
      );
    }
    function zH(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Vp(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Vp(e, t.context, !1),
        cX(e, t.containerInfo);
    }
    function jp(e, t, c, l, n) {
      return Eo(), Km(n), (t.flags |= 256), Nt(e, t, c, l), t.child;
    }
    var Rm = { dehydrated: null, treeContext: null, retryLane: 0 };
    function fm(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function kH(e, t, c) {
      var l = t.pendingProps,
        n = ze.current,
        o = !1,
        r = (t.flags & 128) !== 0,
        d;
      if (
        ((d = r) ||
          (d = e !== null && e.memoizedState === null ? !1 : (n & 2) !== 0),
        d
          ? ((o = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (n |= 1),
        fe(ze, n & 1),
        e === null)
      )
        return (
          Xm(t),
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
                    : (o = sa(r, l, 0, null)),
                  (e = Qn(e, l, c, null)),
                  (o.return = t),
                  (e.return = t),
                  (o.sibling = e),
                  (t.child = o),
                  (t.child.memoizedState = fm(c)),
                  (t.memoizedState = Rm),
                  e)
                : aX(t, r))
        );
      if (
        ((n = e.memoizedState), n !== null && ((d = n.dehydrated), d !== null))
      )
        return Rv(e, t, r, l, d, n, c);
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
            : ((o = Qn(o, r, c, null)), (o.flags |= 2)),
          (o.return = t),
          (l.return = t),
          (l.sibling = o),
          (t.child = l),
          (l = o),
          (o = t.child),
          (r = e.child.memoizedState),
          (r =
            r === null
              ? fm(c)
              : {
                  baseLanes: r.baseLanes | c,
                  cachePool: null,
                  transitions: r.transitions,
                }),
          (o.memoizedState = r),
          (o.childLanes = e.childLanes & ~c),
          (t.memoizedState = Rm),
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
    function aX(e, t) {
      return (
        (t = sa({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function gi(e, t, c, l) {
      return (
        l !== null && Km(l),
        jo(t, e.child, null, c),
        (e = aX(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function Rv(e, t, c, l, n, o, r) {
      if (c)
        return t.flags & 256
          ? ((t.flags &= -257), (l = kb(Error(z(422)))), gi(e, t, r, l))
          : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = l.fallback),
              (n = t.mode),
              (l = sa({ mode: "visible", children: l.children }, n, 0, null)),
              (o = Qn(o, n, r, null)),
              (o.flags |= 2),
              (l.return = t),
              (o.return = t),
              (l.sibling = o),
              (t.child = l),
              t.mode & 1 && jo(t, e.child, null, r),
              (t.child.memoizedState = fm(r)),
              (t.memoizedState = Rm),
              o);
      if (!(t.mode & 1)) return gi(e, t, r, null);
      if (n.data === "$!") {
        if (((l = n.nextSibling && n.nextSibling.dataset), l)) var d = l.dgst;
        return (
          (l = d), (o = Error(z(419))), (l = kb(o, l, void 0)), gi(e, t, r, l)
        );
      }
      if (((d = (r & e.childLanes) !== 0), Mt || d)) {
        if (((l = rt), l !== null)) {
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
              ((o.retryLane = n), Wl(e, n), Oc(l, e, n, -1));
        }
        return GX(), (l = kb(Error(z(421)))), gi(e, t, r, l);
      }
      return n.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Nv.bind(null, e)),
          (n._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (oc = cn(n.nextSibling)),
          (rc = t),
          (Ce = !0),
          (Sc = null),
          e !== null &&
            ((gc[Hc++] = Zl),
            (gc[Hc++] = Rl),
            (gc[Hc++] = An),
            (Zl = e.id),
            (Rl = e.overflow),
            (An = t)),
          (t = aX(t, l.children)),
          (t.flags |= 4096),
          t);
    }
    function Pp(e, t, c) {
      e.lanes |= t;
      var l = e.alternate;
      l !== null && (l.lanes |= t), xm(e.return, t, c);
    }
    function wb(e, t, c, l, n) {
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
    function wH(e, t, c) {
      var l = t.pendingProps,
        n = l.revealOrder,
        o = l.tail;
      if ((Nt(e, t, l.children, c), (l = ze.current), l & 2))
        (l = (l & 1) | 2), (t.flags |= 128);
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Pp(e, c, t);
            else if (e.tag === 19) Pp(e, c, t);
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
      if ((fe(ze, l), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (n) {
          case "forwards":
            for (c = t.child, n = null; c !== null; )
              (e = c.alternate),
                e !== null && Ei(e) === null && (n = c),
                (c = c.sibling);
            (c = n),
              c === null
                ? ((n = t.child), (t.child = null))
                : ((n = c.sibling), (c.sibling = null)),
              wb(t, !1, n, c, o);
            break;
          case "backwards":
            for (c = null, n = t.child, t.child = null; n !== null; ) {
              if (((e = n.alternate), e !== null && Ei(e) === null)) {
                t.child = n;
                break;
              }
              (e = n.sibling), (n.sibling = c), (c = n), (n = e);
            }
            wb(t, !0, c, null, o);
            break;
          case "together":
            wb(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function vi(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function Bl(e, t, c) {
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
    function fv(e, t, c) {
      switch (t.tag) {
        case 3:
          zH(t), Eo();
          break;
        case 5:
          iH(t);
          break;
        case 1:
          jt(t.type) && Ai(t);
          break;
        case 4:
          cX(t, t.stateNode.containerInfo);
          break;
        case 10:
          var l = t.type._context,
            n = t.memoizedProps.value;
          fe(Di, l._currentValue), (l._currentValue = n);
          break;
        case 13:
          if (((l = t.memoizedState), l !== null))
            return l.dehydrated !== null
              ? (fe(ze, ze.current & 1), (t.flags |= 128), null)
              : c & t.child.childLanes
                ? kH(e, t, c)
                : (fe(ze, ze.current & 1),
                  (e = Bl(e, t, c)),
                  e !== null ? e.sibling : null);
          fe(ze, ze.current & 1);
          break;
        case 19:
          if (((l = (c & t.childLanes) !== 0), e.flags & 128)) {
            if (l) return wH(e, t, c);
            t.flags |= 128;
          }
          if (
            ((n = t.memoizedState),
            n !== null &&
              ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
            fe(ze, ze.current),
            l)
          )
            break;
          return null;
        case 22:
        case 23:
          return (t.lanes = 0), YH(e, t, c);
      }
      return Bl(e, t, c);
    }
    var SH, Im, QH, OH;
    SH = function (e, t) {
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
    Im = function () {};
    QH = function (e, t, c, l) {
      var n = e.memoizedProps;
      if (n !== l) {
        (e = t.stateNode), wn(ll.current);
        var o = null;
        switch (c) {
          case "input":
            (n = Ub(e, n)), (l = Ub(e, l)), (o = []);
            break;
          case "select":
            (n = we({}, n, { value: void 0 })),
              (l = we({}, l, { value: void 0 })),
              (o = []);
            break;
          case "textarea":
            (n = jb(e, n)), (l = jb(e, l)), (o = []);
            break;
          default:
            typeof n.onClick != "function" &&
              typeof l.onClick == "function" &&
              (e.onclick = Qi);
        }
        Kb(c, l);
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
                (md.hasOwnProperty(i)
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
                    (md.hasOwnProperty(i)
                      ? (u != null && i === "onScroll" && Be("scroll", e),
                        o || d === u || (o = []))
                      : (o = o || []).push(i, u));
        }
        c && (o = o || []).push("style", c);
        var i = o;
        (t.updateQueue = i) && (t.flags |= 4);
      }
    };
    OH = function (e, t, c, l) {
      c !== l && (t.flags |= 4);
    };
    function _r(e, t) {
      if (!Ce)
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
    function Bt(e) {
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
    function Iv(e, t, c) {
      var l = t.pendingProps;
      switch ((Pm(t), t.tag)) {
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
          return Bt(t), null;
        case 1:
          return jt(t.type) && Oi(), Bt(t), null;
        case 3:
          return (
            (l = t.stateNode),
            Po(),
            ve(Et),
            ve(Ft),
            nX(),
            l.pendingContext &&
              ((l.context = l.pendingContext), (l.pendingContext = null)),
            (e === null || e.child === null) &&
              (Gi(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Sc !== null && (Cm(Sc), (Sc = null)))),
            Im(e, t),
            Bt(t),
            null
          );
        case 5:
          lX(t);
          var n = wn(Wd.current);
          if (((c = t.type), e !== null && t.stateNode != null))
            QH(e, t, c, l, n),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
          else {
            if (!l) {
              if (t.stateNode === null) throw Error(z(166));
              return Bt(t), null;
            }
            if (((e = wn(ll.current)), Gi(t))) {
              (l = t.stateNode), (c = t.type);
              var o = t.memoizedProps;
              switch (((l[tl] = t), (l[Id] = o), (e = (t.mode & 1) !== 0), c)) {
                case "dialog":
                  Be("cancel", l), Be("close", l);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Be("load", l);
                  break;
                case "video":
                case "audio":
                  for (n = 0; n < ld.length; n++) Be(ld[n], l);
                  break;
                case "source":
                  Be("error", l);
                  break;
                case "img":
                case "image":
                case "link":
                  Be("error", l), Be("load", l);
                  break;
                case "details":
                  Be("toggle", l);
                  break;
                case "input":
                  cp(l, o), Be("invalid", l);
                  break;
                case "select":
                  (l._wrapperState = { wasMultiple: !!o.multiple }),
                    Be("invalid", l);
                  break;
                case "textarea":
                  np(l, o), Be("invalid", l);
              }
              Kb(c, o), (n = null);
              for (var r in o)
                if (o.hasOwnProperty(r)) {
                  var d = o[r];
                  r === "children"
                    ? typeof d == "string"
                      ? l.textContent !== d &&
                        (o.suppressHydrationWarning !== !0 &&
                          xi(l.textContent, d, e),
                        (n = ["children", d]))
                      : typeof d == "number" &&
                        l.textContent !== "" + d &&
                        (o.suppressHydrationWarning !== !0 &&
                          xi(l.textContent, d, e),
                        (n = ["children", "" + d]))
                    : md.hasOwnProperty(r) &&
                      d != null &&
                      r === "onScroll" &&
                      Be("scroll", l);
                }
              switch (c) {
                case "input":
                  li(l), lp(l, o, !0);
                  break;
                case "textarea":
                  li(l), op(l);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof o.onClick == "function" && (l.onclick = Qi);
              }
              (l = n), (t.updateQueue = l), l !== null && (t.flags |= 4);
            } else {
              (r = n.nodeType === 9 ? n : n.ownerDocument),
                e === "http://www.w3.org/1999/xhtml" && (e = Xg(c)),
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
                (e[tl] = t),
                (e[Id] = l),
                SH(e, t, !1, !1),
                (t.stateNode = e);
              e: {
                switch (((r = _b(c, l)), c)) {
                  case "dialog":
                    Be("cancel", e), Be("close", e), (n = l);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    Be("load", e), (n = l);
                    break;
                  case "video":
                  case "audio":
                    for (n = 0; n < ld.length; n++) Be(ld[n], e);
                    n = l;
                    break;
                  case "source":
                    Be("error", e), (n = l);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    Be("error", e), Be("load", e), (n = l);
                    break;
                  case "details":
                    Be("toggle", e), (n = l);
                    break;
                  case "input":
                    cp(e, l), (n = Ub(e, l)), Be("invalid", e);
                    break;
                  case "option":
                    n = l;
                    break;
                  case "select":
                    (e._wrapperState = { wasMultiple: !!l.multiple }),
                      (n = we({}, l, { value: void 0 })),
                      Be("invalid", e);
                    break;
                  case "textarea":
                    np(e, l), (n = jb(e, l)), Be("invalid", e);
                    break;
                  default:
                    n = l;
                }
                Kb(c, n), (d = n);
                for (o in d)
                  if (d.hasOwnProperty(o)) {
                    var u = d[o];
                    o === "style"
                      ? pg(e, u)
                      : o === "dangerouslySetInnerHTML"
                        ? ((u = u ? u.__html : void 0), u != null && xg(e, u))
                        : o === "children"
                          ? typeof u == "string"
                            ? (c !== "textarea" || u !== "") && Xd(e, u)
                            : typeof u == "number" && Xd(e, "" + u)
                          : o !== "suppressContentEditableWarning" &&
                            o !== "suppressHydrationWarning" &&
                            o !== "autoFocus" &&
                            (md.hasOwnProperty(o)
                              ? u != null && o === "onScroll" && Be("scroll", e)
                              : u != null && Nm(e, o, u, r));
                  }
                switch (c) {
                  case "input":
                    li(e), lp(e, l, !1);
                    break;
                  case "textarea":
                    li(e), op(e);
                    break;
                  case "option":
                    l.value != null &&
                      e.setAttribute("value", "" + dn(l.value));
                    break;
                  case "select":
                    (e.multiple = !!l.multiple),
                      (o = l.value),
                      o != null
                        ? Qo(e, !!l.multiple, o, !1)
                        : l.defaultValue != null &&
                          Qo(e, !!l.multiple, l.defaultValue, !0);
                    break;
                  default:
                    typeof n.onClick == "function" && (e.onclick = Qi);
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
          return Bt(t), null;
        case 6:
          if (e && t.stateNode != null) OH(e, t, e.memoizedProps, l);
          else {
            if (typeof l != "string" && t.stateNode === null)
              throw Error(z(166));
            if (((c = wn(Wd.current)), wn(ll.current), Gi(t))) {
              if (
                ((l = t.stateNode),
                (c = t.memoizedProps),
                (l[tl] = t),
                (o = l.nodeValue !== c) && ((e = rc), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    xi(l.nodeValue, c, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      xi(l.nodeValue, c, (e.mode & 1) !== 0);
                }
              o && (t.flags |= 4);
            } else
              (l = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(l)),
                (l[tl] = t),
                (t.stateNode = l);
          }
          return Bt(t), null;
        case 13:
          if (
            (ve(ze),
            (l = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (Ce && oc !== null && t.mode & 1 && !(t.flags & 128))
              nH(), Eo(), (t.flags |= 98560), (o = !1);
            else if (((o = Gi(t)), l !== null && l.dehydrated !== null)) {
              if (e === null) {
                if (!o) throw Error(z(318));
                if (
                  ((o = t.memoizedState),
                  (o = o !== null ? o.dehydrated : null),
                  !o)
                )
                  throw Error(z(317));
                o[tl] = t;
              } else
                Eo(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4);
              Bt(t), (o = !1);
            } else Sc !== null && (Cm(Sc), (Sc = null)), (o = !0);
            if (!o) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = c), t)
            : ((l = l !== null),
              l !== (e !== null && e.memoizedState !== null) &&
                l &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || ze.current & 1 ? tt === 0 && (tt = 3) : GX())),
              t.updateQueue !== null && (t.flags |= 4),
              Bt(t),
              null);
        case 4:
          return (
            Po(),
            Im(e, t),
            e === null && Rd(t.stateNode.containerInfo),
            Bt(t),
            null
          );
        case 10:
          return $m(t.type._context), Bt(t), null;
        case 17:
          return jt(t.type) && Oi(), Bt(t), null;
        case 19:
          if ((ve(ze), (o = t.memoizedState), o === null)) return Bt(t), null;
          if (((l = (t.flags & 128) !== 0), (r = o.rendering), r === null))
            if (l) _r(o, !1);
            else {
              if (tt !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((r = Ei(e)), r !== null)) {
                    for (
                      t.flags |= 128,
                        _r(o, !1),
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
                    return fe(ze, (ze.current & 1) | 2), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null &&
                Ue() > _o &&
                ((t.flags |= 128), (l = !0), _r(o, !1), (t.lanes = 4194304));
            }
          else {
            if (!l)
              if (((e = Ei(r)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (l = !0),
                  (c = e.updateQueue),
                  c !== null && ((t.updateQueue = c), (t.flags |= 4)),
                  _r(o, !0),
                  o.tail === null &&
                    o.tailMode === "hidden" &&
                    !r.alternate &&
                    !Ce)
                )
                  return Bt(t), null;
              } else
                2 * Ue() - o.renderingStartTime > _o &&
                  c !== 1073741824 &&
                  ((t.flags |= 128), (l = !0), _r(o, !1), (t.lanes = 4194304));
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
              (o.renderingStartTime = Ue()),
              (t.sibling = null),
              (c = ze.current),
              fe(ze, l ? (c & 1) | 2 : c & 1),
              t)
            : (Bt(t), null);
        case 22:
        case 23:
          return (
            xX(),
            (l = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== l && (t.flags |= 8192),
            l && t.mode & 1
              ? nc & 1073741824 &&
                (Bt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Bt(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(z(156, t.tag));
    }
    function yv(e, t) {
      switch ((Pm(t), t.tag)) {
        case 1:
          return (
            jt(t.type) && Oi(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            Po(),
            ve(Et),
            ve(Ft),
            nX(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return lX(t), null;
        case 13:
          if (
            (ve(ze), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(z(340));
            Eo();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return ve(ze), null;
        case 4:
          return Po(), null;
        case 10:
          return $m(t.type._context), null;
        case 22:
        case 23:
          return xX(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Hi = !1,
      vt = !1,
      Wv = typeof WeakSet == "function" ? WeakSet : Set,
      O = null;
    function wo(e, t) {
      var c = e.ref;
      if (c !== null)
        if (typeof c == "function")
          try {
            c(null);
          } catch (l) {
            Ae(e, t, l);
          }
        else c.current = null;
    }
    function ym(e, t, c) {
      try {
        c();
      } catch (l) {
        Ae(e, t, l);
      }
    }
    var Kp = !1;
    function Bv(e, t) {
      if (((dm = ki), (e = Ug()), Em(e))) {
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
        um = { focusedElem: e, selectionRange: c }, ki = !1, O = t;
        O !== null;

      )
        if (
          ((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          (e.return = t), (O = e);
        else
          for (; O !== null; ) {
            t = O;
            try {
              var X = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (X !== null) {
                      var p = X.memoizedProps,
                        Z = X.memoizedState,
                        x = t.stateNode,
                        G = x.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? p : kc(t.type, p),
                          Z
                        );
                      x.__reactInternalSnapshotBeforeUpdate = G;
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
            } catch (R) {
              Ae(t, t.return, R);
            }
            if (((e = t.sibling), e !== null)) {
              (e.return = t.return), (O = e);
              break;
            }
            O = t.return;
          }
      return (X = Kp), (Kp = !1), X;
    }
    function ad(e, t, c) {
      var l = t.updateQueue;
      if (((l = l !== null ? l.lastEffect : null), l !== null)) {
        var n = (l = l.next);
        do {
          if ((n.tag & e) === e) {
            var o = n.destroy;
            (n.destroy = void 0), o !== void 0 && ym(t, c, o);
          }
          n = n.next;
        } while (n !== l);
      }
    }
    function ia(e, t) {
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
    function Wm(e) {
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
    function AH(e) {
      var t = e.alternate;
      t !== null && ((e.alternate = null), AH(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[tl],
            delete t[Id],
            delete t[sm],
            delete t[uv],
            delete t[iv])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    function LH(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function _p(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || LH(e.return)) return null;
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
    function Bm(e, t, c) {
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
              c != null || t.onclick !== null || (t.onclick = Qi));
      else if (l !== 4 && ((e = e.child), e !== null))
        for (Bm(e, t, c), e = e.sibling; e !== null; )
          Bm(e, t, c), (e = e.sibling);
    }
    function vm(e, t, c) {
      var l = e.tag;
      if (l === 5 || l === 6)
        (e = e.stateNode), t ? c.insertBefore(e, t) : c.appendChild(e);
      else if (l !== 4 && ((e = e.child), e !== null))
        for (vm(e, t, c), e = e.sibling; e !== null; )
          vm(e, t, c), (e = e.sibling);
    }
    var mt = null,
      wc = !1;
    function Ml(e, t, c) {
      for (c = c.child; c !== null; ) TH(e, t, c), (c = c.sibling);
    }
    function TH(e, t, c) {
      if (cl && typeof cl.onCommitFiberUnmount == "function")
        try {
          cl.onCommitFiberUnmount(ta, c);
        } catch {}
      switch (c.tag) {
        case 5:
          vt || wo(c, t);
        case 6:
          var l = mt,
            n = wc;
          (mt = null),
            Ml(e, t, c),
            (mt = l),
            (wc = n),
            mt !== null &&
              (wc
                ? ((e = mt),
                  (c = c.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(c)
                    : e.removeChild(c))
                : mt.removeChild(c.stateNode));
          break;
        case 18:
          mt !== null &&
            (wc
              ? ((e = mt),
                (c = c.stateNode),
                e.nodeType === 8
                  ? Vb(e.parentNode, c)
                  : e.nodeType === 1 && Vb(e, c),
                gd(e))
              : Vb(mt, c.stateNode));
          break;
        case 4:
          (l = mt),
            (n = wc),
            (mt = c.stateNode.containerInfo),
            (wc = !0),
            Ml(e, t, c),
            (mt = l),
            (wc = n);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !vt &&
            ((l = c.updateQueue),
            l !== null && ((l = l.lastEffect), l !== null))
          ) {
            n = l = l.next;
            do {
              var o = n,
                r = o.destroy;
              (o = o.tag),
                r !== void 0 && (o & 2 || o & 4) && ym(c, t, r),
                (n = n.next);
            } while (n !== l);
          }
          Ml(e, t, c);
          break;
        case 1:
          if (
            !vt &&
            (wo(c, t),
            (l = c.stateNode),
            typeof l.componentWillUnmount == "function")
          )
            try {
              (l.props = c.memoizedProps),
                (l.state = c.memoizedState),
                l.componentWillUnmount();
            } catch (d) {
              Ae(c, t, d);
            }
          Ml(e, t, c);
          break;
        case 21:
          Ml(e, t, c);
          break;
        case 22:
          c.mode & 1
            ? ((vt = (l = vt) || c.memoizedState !== null),
              Ml(e, t, c),
              (vt = l))
            : Ml(e, t, c);
          break;
        default:
          Ml(e, t, c);
      }
    }
    function qp(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var c = e.stateNode;
        c === null && (c = e.stateNode = new Wv()),
          t.forEach(function (l) {
            var n = zv.bind(null, e, l);
            c.has(l) || (c.add(l), l.then(n, n));
          });
      }
    }
    function zc(e, t) {
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
                  (mt = d.stateNode), (wc = !1);
                  break e;
                case 3:
                  (mt = d.stateNode.containerInfo), (wc = !0);
                  break e;
                case 4:
                  (mt = d.stateNode.containerInfo), (wc = !0);
                  break e;
              }
              d = d.return;
            }
            if (mt === null) throw Error(z(160));
            TH(o, r, n), (mt = null), (wc = !1);
            var u = n.alternate;
            u !== null && (u.return = null), (n.return = null);
          } catch (i) {
            Ae(n, t, i);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) DH(t, e), (t = t.sibling);
    }
    function DH(e, t) {
      var c = e.alternate,
        l = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((zc(t, e), $c(e), l & 4)) {
            try {
              ad(3, e, e.return), ia(3, e);
            } catch (p) {
              Ae(e, e.return, p);
            }
            try {
              ad(5, e, e.return);
            } catch (p) {
              Ae(e, e.return, p);
            }
          }
          break;
        case 1:
          zc(t, e), $c(e), l & 512 && c !== null && wo(c, c.return);
          break;
        case 5:
          if (
            (zc(t, e),
            $c(e),
            l & 512 && c !== null && wo(c, c.return),
            e.flags & 32)
          ) {
            var n = e.stateNode;
            try {
              Xd(n, "");
            } catch (p) {
              Ae(e, e.return, p);
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
                  bg(n, o),
                  _b(d, r);
                var i = _b(d, o);
                for (r = 0; r < u.length; r += 2) {
                  var a = u[r],
                    s = u[r + 1];
                  a === "style"
                    ? pg(n, s)
                    : a === "dangerouslySetInnerHTML"
                      ? xg(n, s)
                      : a === "children"
                        ? Xd(n, s)
                        : Nm(n, a, s, i);
                }
                switch (d) {
                  case "input":
                    Mb(n, o);
                    break;
                  case "textarea":
                    mg(n, o);
                    break;
                  case "select":
                    var b = n._wrapperState.wasMultiple;
                    n._wrapperState.wasMultiple = !!o.multiple;
                    var m = o.value;
                    m != null
                      ? Qo(n, !!o.multiple, m, !1)
                      : b !== !!o.multiple &&
                        (o.defaultValue != null
                          ? Qo(n, !!o.multiple, o.defaultValue, !0)
                          : Qo(n, !!o.multiple, o.multiple ? [] : "", !1));
                }
                n[Id] = o;
              } catch (p) {
                Ae(e, e.return, p);
              }
          }
          break;
        case 6:
          if ((zc(t, e), $c(e), l & 4)) {
            if (e.stateNode === null) throw Error(z(162));
            (n = e.stateNode), (o = e.memoizedProps);
            try {
              n.nodeValue = o;
            } catch (p) {
              Ae(e, e.return, p);
            }
          }
          break;
        case 3:
          if (
            (zc(t, e),
            $c(e),
            l & 4 && c !== null && c.memoizedState.isDehydrated)
          )
            try {
              gd(t.containerInfo);
            } catch (p) {
              Ae(e, e.return, p);
            }
          break;
        case 4:
          zc(t, e), $c(e);
          break;
        case 13:
          zc(t, e),
            $c(e),
            (n = e.child),
            n.flags & 8192 &&
              ((o = n.memoizedState !== null),
              (n.stateNode.isHidden = o),
              !o ||
                (n.alternate !== null && n.alternate.memoizedState !== null) ||
                (mX = Ue())),
            l & 4 && qp(e);
          break;
        case 22:
          if (
            ((a = c !== null && c.memoizedState !== null),
            e.mode & 1 ? ((vt = (i = vt) || a), zc(t, e), (vt = i)) : zc(t, e),
            $c(e),
            l & 8192)
          ) {
            if (
              ((i = e.memoizedState !== null),
              (e.stateNode.isHidden = i) && !a && e.mode & 1)
            )
              for (O = e, a = e.child; a !== null; ) {
                for (s = O = a; O !== null; ) {
                  switch (((b = O), (m = b.child), b.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      ad(4, b, b.return);
                      break;
                    case 1:
                      wo(b, b.return);
                      var X = b.stateNode;
                      if (typeof X.componentWillUnmount == "function") {
                        (l = b), (c = b.return);
                        try {
                          (t = l),
                            (X.props = t.memoizedProps),
                            (X.state = t.memoizedState),
                            X.componentWillUnmount();
                        } catch (p) {
                          Ae(l, c, p);
                        }
                      }
                      break;
                    case 5:
                      wo(b, b.return);
                      break;
                    case 22:
                      if (b.memoizedState !== null) {
                        eg(s);
                        continue;
                      }
                  }
                  m !== null ? ((m.return = b), (O = m)) : eg(s);
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
                          (d.style.display = Gg("display", r)));
                  } catch (p) {
                    Ae(e, e.return, p);
                  }
                }
              } else if (s.tag === 6) {
                if (a === null)
                  try {
                    s.stateNode.nodeValue = i ? "" : s.memoizedProps;
                  } catch (p) {
                    Ae(e, e.return, p);
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
          zc(t, e), $c(e), l & 4 && qp(e);
          break;
        case 21:
          break;
        default:
          zc(t, e), $c(e);
      }
    }
    function $c(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var c = e.return; c !== null; ) {
              if (LH(c)) {
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
              l.flags & 32 && (Xd(n, ""), (l.flags &= -33));
              var o = _p(e);
              vm(e, o, n);
              break;
            case 3:
            case 4:
              var r = l.stateNode.containerInfo,
                d = _p(e);
              Bm(e, d, r);
              break;
            default:
              throw Error(z(161));
          }
        } catch (u) {
          Ae(e, e.return, u);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function vv(e, t, c) {
      (O = e), UH(e, t, c);
    }
    function UH(e, t, c) {
      for (var l = (e.mode & 1) !== 0; O !== null; ) {
        var n = O,
          o = n.child;
        if (n.tag === 22 && l) {
          var r = n.memoizedState !== null || Hi;
          if (!r) {
            var d = n.alternate,
              u = (d !== null && d.memoizedState !== null) || vt;
            d = Hi;
            var i = vt;
            if (((Hi = r), (vt = u) && !i))
              for (O = n; O !== null; )
                (r = O),
                  (u = r.child),
                  r.tag === 22 && r.memoizedState !== null
                    ? tg(n)
                    : u !== null
                      ? ((u.return = r), (O = u))
                      : tg(n);
            for (; o !== null; ) (O = o), UH(o, t, c), (o = o.sibling);
            (O = n), (Hi = d), (vt = i);
          }
          $p(e, t, c);
        } else
          n.subtreeFlags & 8772 && o !== null
            ? ((o.return = n), (O = o))
            : $p(e, t, c);
      }
    }
    function $p(e) {
      for (; O !== null; ) {
        var t = O;
        if (t.flags & 8772) {
          var c = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  vt || ia(5, t);
                  break;
                case 1:
                  var l = t.stateNode;
                  if (t.flags & 4 && !vt)
                    if (c === null) l.componentDidMount();
                    else {
                      var n =
                        t.elementType === t.type
                          ? c.memoizedProps
                          : kc(t.type, c.memoizedProps);
                      l.componentDidUpdate(
                        n,
                        c.memoizedState,
                        l.__reactInternalSnapshotBeforeUpdate
                      );
                    }
                  var o = t.updateQueue;
                  o !== null && kp(t, o, l);
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
                    kp(t, r, c);
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
                        s !== null && gd(s);
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
            vt || (t.flags & 512 && Wm(t));
          } catch (b) {
            Ae(t, t.return, b);
          }
        }
        if (t === e) {
          O = null;
          break;
        }
        if (((c = t.sibling), c !== null)) {
          (c.return = t.return), (O = c);
          break;
        }
        O = t.return;
      }
    }
    function eg(e) {
      for (; O !== null; ) {
        var t = O;
        if (t === e) {
          O = null;
          break;
        }
        var c = t.sibling;
        if (c !== null) {
          (c.return = t.return), (O = c);
          break;
        }
        O = t.return;
      }
    }
    function tg(e) {
      for (; O !== null; ) {
        var t = O;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var c = t.return;
              try {
                ia(4, t);
              } catch (u) {
                Ae(t, c, u);
              }
              break;
            case 1:
              var l = t.stateNode;
              if (typeof l.componentDidMount == "function") {
                var n = t.return;
                try {
                  l.componentDidMount();
                } catch (u) {
                  Ae(t, n, u);
                }
              }
              var o = t.return;
              try {
                Wm(t);
              } catch (u) {
                Ae(t, o, u);
              }
              break;
            case 5:
              var r = t.return;
              try {
                Wm(t);
              } catch (u) {
                Ae(t, r, u);
              }
          }
        } catch (u) {
          Ae(t, t.return, u);
        }
        if (t === e) {
          O = null;
          break;
        }
        var d = t.sibling;
        if (d !== null) {
          (d.return = t.return), (O = d);
          break;
        }
        O = t.return;
      }
    }
    var Fv = Math.ceil,
      Ki = vl.ReactCurrentDispatcher,
      sX = vl.ReactCurrentOwner,
      Rc = vl.ReactCurrentBatchConfig,
      de = 0,
      rt = null,
      Ke = null,
      Xt = 0,
      nc = 0,
      So = sn(0),
      tt = 0,
      hd = null,
      Tn = 0,
      aa = 0,
      bX = 0,
      sd = null,
      Ut = null,
      mX = 0,
      _o = 1 / 0,
      gl = null,
      _i = !1,
      Fm = null,
      nn = null,
      Zi = !1,
      ql = null,
      qi = 0,
      bd = 0,
      hm = null,
      Fi = -1,
      hi = 0;
    function zt() {
      return de & 6 ? Ue() : Fi !== -1 ? Fi : (Fi = Ue());
    }
    function on(e) {
      return e.mode & 1
        ? de & 2 && Xt !== 0
          ? Xt & -Xt
          : sv.transition !== null
            ? (hi === 0 && (hi = hg()), hi)
            : ((e = me),
              e !== 0 ||
                ((e = window.event), (e = e === void 0 ? 16 : kg(e.type))),
              e)
        : 1;
    }
    function Oc(e, t, c, l) {
      if (50 < bd) throw ((bd = 0), (hm = null), Error(z(185)));
      Vd(e, c, l),
        (!(de & 2) || e !== rt) &&
          (e === rt && (!(de & 2) && (aa |= c), tt === 4 && Kl(e, Xt)),
          Pt(e, l),
          c === 1 &&
            de === 0 &&
            !(t.mode & 1) &&
            ((_o = Ue() + 500), ra && bn()));
    }
    function Pt(e, t) {
      var c = e.callbackNode;
      m5(e, t);
      var l = zi(e, e === rt ? Xt : 0);
      if (l === 0)
        c !== null && up(c), (e.callbackNode = null), (e.callbackPriority = 0);
      else if (((t = l & -l), e.callbackPriority !== t)) {
        if ((c != null && up(c), t === 1))
          e.tag === 0 ? av(cg.bind(null, e)) : tH(cg.bind(null, e)),
            rv(function () {
              !(de & 6) && bn();
            }),
            (c = null);
        else {
          switch (Vg(l)) {
            case 1:
              c = Qm;
              break;
            case 4:
              c = vg;
              break;
            case 16:
              c = Ni;
              break;
            case 536870912:
              c = Fg;
              break;
            default:
              c = Ni;
          }
          c = $H(c, MH.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = c);
      }
    }
    function MH(e, t) {
      if (((Fi = -1), (hi = 0), de & 6)) throw Error(z(327));
      var c = e.callbackNode;
      if (Do() && e.callbackNode !== c) return null;
      var l = zi(e, e === rt ? Xt : 0);
      if (l === 0) return null;
      if (l & 30 || l & e.expiredLanes || t) t = $i(e, l);
      else {
        t = l;
        var n = de;
        de |= 2;
        var o = jH();
        (rt !== e || Xt !== t) && ((gl = null), (_o = Ue() + 500), Sn(e, t));
        do
          try {
            Cv();
            break;
          } catch (d) {
            EH(e, d);
          }
        while (!0);
        qm(),
          (Ki.current = o),
          (de = n),
          Ke !== null ? (t = 0) : ((rt = null), (Xt = 0), (t = tt));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((n = cm(e)), n !== 0 && ((l = n), (t = Vm(e, n)))),
          t === 1)
        )
          throw ((c = hd), Sn(e, 0), Kl(e, l), Pt(e, Ue()), c);
        if (t === 6) Kl(e, l);
        else {
          if (
            ((n = e.current.alternate),
            !(l & 30) &&
              !hv(n) &&
              ((t = $i(e, l)),
              t === 2 && ((o = cm(e)), o !== 0 && ((l = o), (t = Vm(e, o)))),
              t === 1))
          )
            throw ((c = hd), Sn(e, 0), Kl(e, l), Pt(e, Ue()), c);
          switch (((e.finishedWork = n), (e.finishedLanes = l), t)) {
            case 0:
            case 1:
              throw Error(z(345));
            case 2:
              Nn(e, Ut, gl);
              break;
            case 3:
              if (
                (Kl(e, l),
                (l & 130023424) === l && ((t = mX + 500 - Ue()), 10 < t))
              ) {
                if (zi(e, 0) !== 0) break;
                if (((n = e.suspendedLanes), (n & l) !== l)) {
                  zt(), (e.pingedLanes |= e.suspendedLanes & n);
                  break;
                }
                e.timeoutHandle = am(Nn.bind(null, e, Ut, gl), t);
                break;
              }
              Nn(e, Ut, gl);
              break;
            case 4:
              if ((Kl(e, l), (l & 4194240) === l)) break;
              for (t = e.eventTimes, n = -1; 0 < l; ) {
                var r = 31 - Qc(l);
                (o = 1 << r), (r = t[r]), r > n && (n = r), (l &= ~o);
              }
              if (
                ((l = n),
                (l = Ue() - l),
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
                              : 1960 * Fv(l / 1960)) - l),
                10 < l)
              ) {
                e.timeoutHandle = am(Nn.bind(null, e, Ut, gl), l);
                break;
              }
              Nn(e, Ut, gl);
              break;
            case 5:
              Nn(e, Ut, gl);
              break;
            default:
              throw Error(z(329));
          }
        }
      }
      return Pt(e, Ue()), e.callbackNode === c ? MH.bind(null, e) : null;
    }
    function Vm(e, t) {
      var c = sd;
      return (
        e.current.memoizedState.isDehydrated && (Sn(e, t).flags |= 256),
        (e = $i(e, t)),
        e !== 2 && ((t = Ut), (Ut = c), t !== null && Cm(t)),
        e
      );
    }
    function Cm(e) {
      Ut === null ? (Ut = e) : Ut.push.apply(Ut, e);
    }
    function hv(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var c = t.updateQueue;
          if (c !== null && ((c = c.stores), c !== null))
            for (var l = 0; l < c.length; l++) {
              var n = c[l],
                o = n.getSnapshot;
              n = n.value;
              try {
                if (!Ac(o(), n)) return !1;
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
        t &= ~bX,
          t &= ~aa,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;

      ) {
        var c = 31 - Qc(t),
          l = 1 << c;
        (e[c] = -1), (t &= ~l);
      }
    }
    function cg(e) {
      if (de & 6) throw Error(z(327));
      Do();
      var t = zi(e, 0);
      if (!(t & 1)) return Pt(e, Ue()), null;
      var c = $i(e, t);
      if (e.tag !== 0 && c === 2) {
        var l = cm(e);
        l !== 0 && ((t = l), (c = Vm(e, l)));
      }
      if (c === 1) throw ((c = hd), Sn(e, 0), Kl(e, t), Pt(e, Ue()), c);
      if (c === 6) throw Error(z(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Nn(e, Ut, gl),
        Pt(e, Ue()),
        null
      );
    }
    function XX(e, t) {
      var c = de;
      de |= 1;
      try {
        return e(t);
      } finally {
        (de = c), de === 0 && ((_o = Ue() + 500), ra && bn());
      }
    }
    function Dn(e) {
      ql !== null && ql.tag === 0 && !(de & 6) && Do();
      var t = de;
      de |= 1;
      var c = Rc.transition,
        l = me;
      try {
        if (((Rc.transition = null), (me = 1), e)) return e();
      } finally {
        (me = l), (Rc.transition = c), (de = t), !(de & 6) && bn();
      }
    }
    function xX() {
      (nc = So.current), ve(So);
    }
    function Sn(e, t) {
      (e.finishedWork = null), (e.finishedLanes = 0);
      var c = e.timeoutHandle;
      if ((c !== -1 && ((e.timeoutHandle = -1), ov(c)), Ke !== null))
        for (c = Ke.return; c !== null; ) {
          var l = c;
          switch ((Pm(l), l.tag)) {
            case 1:
              (l = l.type.childContextTypes), l != null && Oi();
              break;
            case 3:
              Po(), ve(Et), ve(Ft), nX();
              break;
            case 5:
              lX(l);
              break;
            case 4:
              Po();
              break;
            case 13:
              ve(ze);
              break;
            case 19:
              ve(ze);
              break;
            case 10:
              $m(l.type._context);
              break;
            case 22:
            case 23:
              xX();
          }
          c = c.return;
        }
      if (
        ((rt = e),
        (Ke = e = rn(e.current, null)),
        (Xt = nc = t),
        (tt = 0),
        (hd = null),
        (bX = aa = Tn = 0),
        (Ut = sd = null),
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
    function EH(e, t) {
      do {
        var c = Ke;
        try {
          if ((qm(), (Wi.current = Pi), ji)) {
            for (var l = ke.memoizedState; l !== null; ) {
              var n = l.queue;
              n !== null && (n.pending = null), (l = l.next);
            }
            ji = !1;
          }
          if (
            ((Ln = 0),
            (ot = et = ke = null),
            (id = !1),
            (Bd = 0),
            (sX.current = null),
            c === null || c.return === null)
          ) {
            (tt = 1), (hd = t), (Ke = null);
            break;
          }
          e: {
            var o = e,
              r = c.return,
              d = c,
              u = t;
            if (
              ((t = Xt),
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
              var m = Tp(r);
              if (m !== null) {
                (m.flags &= -257),
                  Dp(m, r, d, o, t),
                  m.mode & 1 && Lp(o, i, t),
                  (t = m),
                  (u = i);
                var X = t.updateQueue;
                if (X === null) {
                  var p = new Set();
                  p.add(u), (t.updateQueue = p);
                } else X.add(u);
                break e;
              } else {
                if (!(t & 1)) {
                  Lp(o, i, t), GX();
                  break e;
                }
                u = Error(z(426));
              }
            } else if (Ce && d.mode & 1) {
              var Z = Tp(r);
              if (Z !== null) {
                !(Z.flags & 65536) && (Z.flags |= 256),
                  Dp(Z, r, d, o, t),
                  Km(Ko(u, d));
                break e;
              }
            }
            (o = u = Ko(u, d)),
              tt !== 4 && (tt = 2),
              sd === null ? (sd = [o]) : sd.push(o),
              (o = r);
            do {
              switch (o.tag) {
                case 3:
                  (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                  var x = VH(o, u, t);
                  zp(o, x);
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
                    var R = CH(o, d, t);
                    zp(o, R);
                    break e;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          KH(c);
        } catch (f) {
          (t = f), Ke === c && c !== null && (Ke = c = c.return);
          continue;
        }
        break;
      } while (!0);
    }
    function jH() {
      var e = Ki.current;
      return (Ki.current = Pi), e === null ? Pi : e;
    }
    function GX() {
      (tt === 0 || tt === 3 || tt === 2) && (tt = 4),
        rt === null || (!(Tn & 268435455) && !(aa & 268435455)) || Kl(rt, Xt);
    }
    function $i(e, t) {
      var c = de;
      de |= 2;
      var l = jH();
      (rt !== e || Xt !== t) && ((gl = null), Sn(e, t));
      do
        try {
          Vv();
          break;
        } catch (n) {
          EH(e, n);
        }
      while (!0);
      if ((qm(), (de = c), (Ki.current = l), Ke !== null)) throw Error(z(261));
      return (rt = null), (Xt = 0), tt;
    }
    function Vv() {
      for (; Ke !== null; ) PH(Ke);
    }
    function Cv() {
      for (; Ke !== null && !n5(); ) PH(Ke);
    }
    function PH(e) {
      var t = qH(e.alternate, e, nc);
      (e.memoizedProps = e.pendingProps),
        t === null ? KH(e) : (Ke = t),
        (sX.current = null);
    }
    function KH(e) {
      var t = e;
      do {
        var c = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((c = yv(c, t)), c !== null)) {
            (c.flags &= 32767), (Ke = c);
            return;
          }
          if (e !== null)
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          else {
            (tt = 6), (Ke = null);
            return;
          }
        } else if (((c = Iv(c, t, nc)), c !== null)) {
          Ke = c;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Ke = t;
          return;
        }
        Ke = t = e;
      } while (t !== null);
      tt === 0 && (tt = 5);
    }
    function Nn(e, t, c) {
      var l = me,
        n = Rc.transition;
      try {
        (Rc.transition = null), (me = 1), Jv(e, t, c, l);
      } finally {
        (Rc.transition = n), (me = l);
      }
      return null;
    }
    function Jv(e, t, c, l) {
      do Do();
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
        (X5(e, o),
        e === rt && ((Ke = rt = null), (Xt = 0)),
        (!(c.subtreeFlags & 2064) && !(c.flags & 2064)) ||
          Zi ||
          ((Zi = !0),
          $H(Ni, function () {
            return Do(), null;
          })),
        (o = (c.flags & 15990) !== 0),
        c.subtreeFlags & 15990 || o)
      ) {
        (o = Rc.transition), (Rc.transition = null);
        var r = me;
        me = 1;
        var d = de;
        (de |= 4),
          (sX.current = null),
          Bv(e, c),
          DH(c, e),
          ev(um),
          (ki = !!dm),
          (um = dm = null),
          (e.current = c),
          vv(c, e, n),
          o5(),
          (de = d),
          (me = r),
          (Rc.transition = o);
      } else e.current = c;
      if (
        (Zi && ((Zi = !1), (ql = e), (qi = n)),
        (o = e.pendingLanes),
        o === 0 && (nn = null),
        u5(c.stateNode, l),
        Pt(e, Ue()),
        t !== null)
      )
        for (l = e.onRecoverableError, c = 0; c < t.length; c++)
          (n = t[c]), l(n.value, { componentStack: n.stack, digest: n.digest });
      if (_i) throw ((_i = !1), (e = Fm), (Fm = null), e);
      return (
        qi & 1 && e.tag !== 0 && Do(),
        (o = e.pendingLanes),
        o & 1 ? (e === hm ? bd++ : ((bd = 0), (hm = e))) : (bd = 0),
        bn(),
        null
      );
    }
    function Do() {
      if (ql !== null) {
        var e = Vg(qi),
          t = Rc.transition,
          c = me;
        try {
          if (((Rc.transition = null), (me = 16 > e ? 16 : e), ql === null))
            var l = !1;
          else {
            if (((e = ql), (ql = null), (qi = 0), de & 6)) throw Error(z(331));
            var n = de;
            for (de |= 4, O = e.current; O !== null; ) {
              var o = O,
                r = o.child;
              if (O.flags & 16) {
                var d = o.deletions;
                if (d !== null) {
                  for (var u = 0; u < d.length; u++) {
                    var i = d[u];
                    for (O = i; O !== null; ) {
                      var a = O;
                      switch (a.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ad(8, a, o);
                      }
                      var s = a.child;
                      if (s !== null) (s.return = a), (O = s);
                      else
                        for (; O !== null; ) {
                          a = O;
                          var b = a.sibling,
                            m = a.return;
                          if ((AH(a), a === i)) {
                            O = null;
                            break;
                          }
                          if (b !== null) {
                            (b.return = m), (O = b);
                            break;
                          }
                          O = m;
                        }
                    }
                  }
                  var X = o.alternate;
                  if (X !== null) {
                    var p = X.child;
                    if (p !== null) {
                      X.child = null;
                      do {
                        var Z = p.sibling;
                        (p.sibling = null), (p = Z);
                      } while (p !== null);
                    }
                  }
                  O = o;
                }
              }
              if (o.subtreeFlags & 2064 && r !== null) (r.return = o), (O = r);
              else
                e: for (; O !== null; ) {
                  if (((o = O), o.flags & 2048))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ad(9, o, o.return);
                    }
                  var x = o.sibling;
                  if (x !== null) {
                    (x.return = o.return), (O = x);
                    break e;
                  }
                  O = o.return;
                }
            }
            var G = e.current;
            for (O = G; O !== null; ) {
              r = O;
              var g = r.child;
              if (r.subtreeFlags & 2064 && g !== null) (g.return = r), (O = g);
              else
                e: for (r = G; O !== null; ) {
                  if (((d = O), d.flags & 2048))
                    try {
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ia(9, d);
                      }
                    } catch (f) {
                      Ae(d, d.return, f);
                    }
                  if (d === r) {
                    O = null;
                    break e;
                  }
                  var R = d.sibling;
                  if (R !== null) {
                    (R.return = d.return), (O = R);
                    break e;
                  }
                  O = d.return;
                }
            }
            if (
              ((de = n),
              bn(),
              cl && typeof cl.onPostCommitFiberRoot == "function")
            )
              try {
                cl.onPostCommitFiberRoot(ta, e);
              } catch {}
            l = !0;
          }
          return l;
        } finally {
          (me = c), (Rc.transition = t);
        }
      }
      return !1;
    }
    function lg(e, t, c) {
      (t = Ko(c, t)),
        (t = VH(e, t, 1)),
        (e = ln(e, t, 1)),
        (t = zt()),
        e !== null && (Vd(e, 1, t), Pt(e, t));
    }
    function Ae(e, t, c) {
      if (e.tag === 3) lg(e, e, c);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            lg(t, e, c);
            break;
          } else if (t.tag === 1) {
            var l = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == "function" ||
              (typeof l.componentDidCatch == "function" &&
                (nn === null || !nn.has(l)))
            ) {
              (e = Ko(c, e)),
                (e = CH(t, e, 1)),
                (t = ln(t, e, 1)),
                (e = zt()),
                t !== null && (Vd(t, 1, e), Pt(t, e));
              break;
            }
          }
          t = t.return;
        }
    }
    function Yv(e, t, c) {
      var l = e.pingCache;
      l !== null && l.delete(t),
        (t = zt()),
        (e.pingedLanes |= e.suspendedLanes & c),
        rt === e &&
          (Xt & c) === c &&
          (tt === 4 || (tt === 3 && (Xt & 130023424) === Xt && 500 > Ue() - mX)
            ? Sn(e, 0)
            : (bX |= c)),
        Pt(e, t);
    }
    function _H(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = ri), (ri <<= 1), !(ri & 130023424) && (ri = 4194304))
          : (t = 1));
      var c = zt();
      (e = Wl(e, t)), e !== null && (Vd(e, t, c), Pt(e, c));
    }
    function Nv(e) {
      var t = e.memoizedState,
        c = 0;
      t !== null && (c = t.retryLane), _H(e, c);
    }
    function zv(e, t) {
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
      l !== null && l.delete(t), _H(e, c);
    }
    var qH;
    qH = function (e, t, c) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Et.current) Mt = !0;
        else {
          if (!(e.lanes & c) && !(t.flags & 128)) return (Mt = !1), fv(e, t, c);
          Mt = !!(e.flags & 131072);
        }
      else (Mt = !1), Ce && t.flags & 1048576 && cH(t, Ti, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var l = t.type;
          vi(e, t), (e = t.pendingProps);
          var n = Mo(t, Ft.current);
          To(t, c), (n = rX(null, t, l, e, n, c));
          var o = dX();
          return (
            (t.flags |= 1),
            typeof n == "object" &&
            n !== null &&
            typeof n.render == "function" &&
            n.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                jt(l) ? ((o = !0), Ai(t)) : (o = !1),
                (t.memoizedState =
                  n.state !== null && n.state !== void 0 ? n.state : null),
                tX(t),
                (n.updater = ua),
                (t.stateNode = n),
                (n._reactInternals = t),
                pm(t, l, e, c),
                (t = Zm(null, t, l, !0, o, c)))
              : ((t.tag = 0),
                Ce && o && jm(t),
                Nt(null, t, n, c),
                (t = t.child)),
            t
          );
        case 16:
          l = t.elementType;
          e: {
            switch (
              (vi(e, t),
              (e = t.pendingProps),
              (n = l._init),
              (l = n(l._payload)),
              (t.type = l),
              (n = t.tag = wv(l)),
              (e = kc(l, e)),
              n)
            ) {
              case 0:
                t = Hm(null, t, l, e, c);
                break e;
              case 1:
                t = Ep(null, t, l, e, c);
                break e;
              case 11:
                t = Up(null, t, l, e, c);
                break e;
              case 14:
                t = Mp(null, t, l, kc(l.type, e), c);
                break e;
            }
            throw Error(z(306, l, ""));
          }
          return t;
        case 0:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : kc(l, n)),
            Hm(e, t, l, n, c)
          );
        case 1:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : kc(l, n)),
            Ep(e, t, l, n, c)
          );
        case 3:
          e: {
            if ((zH(t), e === null)) throw Error(z(387));
            (l = t.pendingProps),
              (o = t.memoizedState),
              (n = o.element),
              uH(e, t),
              Mi(t, l, null, c);
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
                (n = Ko(Error(z(423)), t)), (t = jp(e, t, l, c, n));
                break e;
              } else if (l !== n) {
                (n = Ko(Error(z(424)), t)), (t = jp(e, t, l, c, n));
                break e;
              } else
                for (
                  oc = cn(t.stateNode.containerInfo.firstChild),
                    rc = t,
                    Ce = !0,
                    Sc = null,
                    c = rH(t, null, l, c),
                    t.child = c;
                  c;

                )
                  (c.flags = (c.flags & -3) | 4096), (c = c.sibling);
            else {
              if ((Eo(), l === n)) {
                t = Bl(e, t, c);
                break e;
              }
              Nt(e, t, l, c);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            iH(t),
            e === null && Xm(t),
            (l = t.type),
            (n = t.pendingProps),
            (o = e !== null ? e.memoizedProps : null),
            (r = n.children),
            im(l, n) ? (r = null) : o !== null && im(l, o) && (t.flags |= 32),
            NH(e, t),
            Nt(e, t, r, c),
            t.child
          );
        case 6:
          return e === null && Xm(t), null;
        case 13:
          return kH(e, t, c);
        case 4:
          return (
            cX(t, t.stateNode.containerInfo),
            (l = t.pendingProps),
            e === null ? (t.child = jo(t, null, l, c)) : Nt(e, t, l, c),
            t.child
          );
        case 11:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : kc(l, n)),
            Up(e, t, l, n, c)
          );
        case 7:
          return Nt(e, t, t.pendingProps, c), t.child;
        case 8:
          return Nt(e, t, t.pendingProps.children, c), t.child;
        case 12:
          return Nt(e, t, t.pendingProps.children, c), t.child;
        case 10:
          e: {
            if (
              ((l = t.type._context),
              (n = t.pendingProps),
              (o = t.memoizedProps),
              (r = n.value),
              fe(Di, l._currentValue),
              (l._currentValue = r),
              o !== null)
            )
              if (Ac(o.value, r)) {
                if (o.children === n.children && !Et.current) {
                  t = Bl(e, t, c);
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
                          (u = fl(-1, c & -c)), (u.tag = 2);
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
                          xm(o.return, c, t),
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
                      xm(r, c, t),
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
            Nt(e, t, n.children, c), (t = t.child);
          }
          return t;
        case 9:
          return (
            (n = t.type),
            (l = t.pendingProps.children),
            To(t, c),
            (n = fc(n)),
            (l = l(n)),
            (t.flags |= 1),
            Nt(e, t, l, c),
            t.child
          );
        case 14:
          return (
            (l = t.type),
            (n = kc(l, t.pendingProps)),
            (n = kc(l.type, n)),
            Mp(e, t, l, n, c)
          );
        case 15:
          return JH(e, t, t.type, t.pendingProps, c);
        case 17:
          return (
            (l = t.type),
            (n = t.pendingProps),
            (n = t.elementType === l ? n : kc(l, n)),
            vi(e, t),
            (t.tag = 1),
            jt(l) ? ((e = !0), Ai(t)) : (e = !1),
            To(t, c),
            hH(t, l, n),
            pm(t, l, n, c),
            Zm(null, t, l, !0, e, c)
          );
        case 19:
          return wH(e, t, c);
        case 22:
          return YH(e, t, c);
      }
      throw Error(z(156, t.tag));
    };
    function $H(e, t) {
      return Bg(e, t);
    }
    function kv(e, t, c, l) {
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
    function Zc(e, t, c, l) {
      return new kv(e, t, c, l);
    }
    function pX(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function wv(e) {
      if (typeof e == "function") return pX(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === km)) return 11;
        if (e === wm) return 14;
      }
      return 2;
    }
    function rn(e, t) {
      var c = e.alternate;
      return (
        c === null
          ? ((c = Zc(e.tag, t, e.key, e.mode)),
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
    function Vi(e, t, c, l, n, o) {
      var r = 2;
      if (((l = e), typeof e == "function")) pX(e) && (r = 1);
      else if (typeof e == "string") r = 5;
      else
        e: switch (e) {
          case Fo:
            return Qn(c.children, n, o, t);
          case zm:
            (r = 8), (n |= 8);
            break;
          case Ab:
            return (
              (e = Zc(12, c, t, n | 2)), (e.elementType = Ab), (e.lanes = o), e
            );
          case Lb:
            return (
              (e = Zc(13, c, t, n)), (e.elementType = Lb), (e.lanes = o), e
            );
          case Tb:
            return (
              (e = Zc(19, c, t, n)), (e.elementType = Tb), (e.lanes = o), e
            );
          case ig:
            return sa(c, n, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case dg:
                  r = 10;
                  break e;
                case ug:
                  r = 9;
                  break e;
                case km:
                  r = 11;
                  break e;
                case wm:
                  r = 14;
                  break e;
                case El:
                  (r = 16), (l = null);
                  break e;
              }
            throw Error(z(130, e == null ? e : typeof e, ""));
        }
      return (
        (t = Zc(r, c, t, n)),
        (t.elementType = e),
        (t.type = l),
        (t.lanes = o),
        t
      );
    }
    function Qn(e, t, c, l) {
      return (e = Zc(7, e, l, t)), (e.lanes = c), e;
    }
    function sa(e, t, c, l) {
      return (
        (e = Zc(22, e, l, t)),
        (e.elementType = ig),
        (e.lanes = c),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Sb(e, t, c) {
      return (e = Zc(6, e, null, t)), (e.lanes = c), e;
    }
    function Qb(e, t, c) {
      return (
        (t = Zc(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = c),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function Sv(e, t, c, l, n) {
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
        (this.eventTimes = fb(0)),
        (this.expirationTimes = fb(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = fb(0)),
        (this.identifierPrefix = l),
        (this.onRecoverableError = n),
        (this.mutableSourceEagerHydrationData = null);
    }
    function gX(e, t, c, l, n, o, r, d, u) {
      return (
        (e = new Sv(e, t, c, d, u)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Zc(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
          element: l,
          isDehydrated: c,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        tX(o),
        e
      );
    }
    function Qv(e, t, c) {
      var l =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: vo,
        key: l == null ? null : "" + l,
        children: e,
        containerInfo: t,
        implementation: c,
      };
    }
    function eZ(e) {
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
              if (jt(t.type)) {
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
        if (jt(c)) return eH(e, c, t);
      }
      return t;
    }
    function tZ(e, t, c, l, n, o, r, d, u) {
      return (
        (e = gX(c, l, !0, e, n, o, r, d, u)),
        (e.context = eZ(null)),
        (c = e.current),
        (l = zt()),
        (n = on(c)),
        (o = fl(l, n)),
        (o.callback = t ?? null),
        ln(c, o, n),
        (e.current.lanes = n),
        Vd(e, n, l),
        Pt(e, l),
        e
      );
    }
    function ba(e, t, c, l) {
      var n = t.current,
        o = zt(),
        r = on(n);
      return (
        (c = eZ(c)),
        t.context === null ? (t.context = c) : (t.pendingContext = c),
        (t = fl(o, r)),
        (t.payload = { element: e }),
        (l = l === void 0 ? null : l),
        l !== null && (t.callback = l),
        (e = ln(n, t, r)),
        e !== null && (Oc(e, n, r, o), yi(e, n, r)),
        r
      );
    }
    function ea(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function ng(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var c = e.retryLane;
        e.retryLane = c !== 0 && c < t ? c : t;
      }
    }
    function HX(e, t) {
      ng(e, t), (e = e.alternate) && ng(e, t);
    }
    function Ov() {
      return null;
    }
    var cZ =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            console.error(e);
          };
    function ZX(e) {
      this._internalRoot = e;
    }
    ma.prototype.render = ZX.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(z(409));
      ba(e, t, null, null);
    };
    ma.prototype.unmount = ZX.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Dn(function () {
          ba(null, e, null, null);
        }),
          (t[yl] = null);
      }
    };
    function ma(e) {
      this._internalRoot = e;
    }
    ma.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Yg();
        e = { blockedOn: null, target: e, priority: t };
        for (var c = 0; c < Pl.length && t !== 0 && t < Pl[c].priority; c++);
        Pl.splice(c, 0, e), c === 0 && zg(e);
      }
    };
    function RX(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function Xa(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
      );
    }
    function og() {}
    function Av(e, t, c, l, n) {
      if (n) {
        if (typeof l == "function") {
          var o = l;
          l = function () {
            var i = ea(r);
            o.call(i);
          };
        }
        var r = tZ(t, l, e, 0, null, !1, !1, "", og);
        return (
          (e._reactRootContainer = r),
          (e[yl] = r.current),
          Rd(e.nodeType === 8 ? e.parentNode : e),
          Dn(),
          r
        );
      }
      for (; (n = e.lastChild); ) e.removeChild(n);
      if (typeof l == "function") {
        var d = l;
        l = function () {
          var i = ea(u);
          d.call(i);
        };
      }
      var u = gX(e, 0, !1, null, null, !1, !1, "", og);
      return (
        (e._reactRootContainer = u),
        (e[yl] = u.current),
        Rd(e.nodeType === 8 ? e.parentNode : e),
        Dn(function () {
          ba(t, u, c, l);
        }),
        u
      );
    }
    function xa(e, t, c, l, n) {
      var o = c._reactRootContainer;
      if (o) {
        var r = o;
        if (typeof n == "function") {
          var d = n;
          n = function () {
            var u = ea(r);
            d.call(u);
          };
        }
        ba(t, r, e, n);
      } else r = Av(c, t, e, n, l);
      return ea(r);
    }
    Cg = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var c = cd(t.pendingLanes);
            c !== 0 &&
              (Om(t, c | 1),
              Pt(t, Ue()),
              !(de & 6) && ((_o = Ue() + 500), bn()));
          }
          break;
        case 13:
          Dn(function () {
            var l = Wl(e, 1);
            if (l !== null) {
              var n = zt();
              Oc(l, e, 1, n);
            }
          }),
            HX(e, 1);
      }
    };
    Am = function (e) {
      if (e.tag === 13) {
        var t = Wl(e, 134217728);
        if (t !== null) {
          var c = zt();
          Oc(t, e, 134217728, c);
        }
        HX(e, 134217728);
      }
    };
    Jg = function (e) {
      if (e.tag === 13) {
        var t = on(e),
          c = Wl(e, t);
        if (c !== null) {
          var l = zt();
          Oc(c, e, t, l);
        }
        HX(e, t);
      }
    };
    Yg = function () {
      return me;
    };
    Ng = function (e, t) {
      var c = me;
      try {
        return (me = e), t();
      } finally {
        me = c;
      }
    };
    $b = function (e, t, c) {
      switch (t) {
        case "input":
          if ((Mb(e, c), (t = c.name), c.type === "radio" && t != null)) {
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
                var n = oa(l);
                if (!n) throw Error(z(90));
                sg(l), Mb(l, n);
              }
            }
          }
          break;
        case "textarea":
          mg(e, c);
          break;
        case "select":
          (t = c.value), t != null && Qo(e, !!c.multiple, t, !1);
      }
    };
    Zg = XX;
    Rg = Dn;
    var Lv = { usingClientEntryPoint: !1, Events: [Jd, Jo, oa, gg, Hg, XX] },
      qr = {
        findFiberByHostInstance: zn,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom",
      },
      Tv = {
        bundleType: qr.bundleType,
        version: qr.version,
        rendererPackageName: qr.rendererPackageName,
        rendererConfig: qr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: vl.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return (e = yg(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: qr.findFiberByHostInstance || Ov,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      (($r = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !$r.isDisabled && $r.supportsFiber)
    )
      try {
        (ta = $r.inject(Tv)), (cl = $r);
      } catch {}
    var $r;
    ic.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lv;
    ic.createPortal = function (e, t) {
      var c =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!RX(t)) throw Error(z(200));
      return Qv(e, t, null, c);
    };
    ic.createRoot = function (e, t) {
      if (!RX(e)) throw Error(z(299));
      var c = !1,
        l = "",
        n = cZ;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (c = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (n = t.onRecoverableError)),
        (t = gX(e, 1, !1, null, null, c, !1, l, n)),
        (e[yl] = t.current),
        Rd(e.nodeType === 8 ? e.parentNode : e),
        new ZX(t)
      );
    };
    ic.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(z(188))
          : ((e = Object.keys(e).join(",")), Error(z(268, e)));
      return (e = yg(t)), (e = e === null ? null : e.stateNode), e;
    };
    ic.flushSync = function (e) {
      return Dn(e);
    };
    ic.hydrate = function (e, t, c) {
      if (!Xa(t)) throw Error(z(200));
      return xa(null, e, t, !0, c);
    };
    ic.hydrateRoot = function (e, t, c) {
      if (!RX(e)) throw Error(z(405));
      var l = (c != null && c.hydratedSources) || null,
        n = !1,
        o = "",
        r = cZ;
      if (
        (c != null &&
          (c.unstable_strictMode === !0 && (n = !0),
          c.identifierPrefix !== void 0 && (o = c.identifierPrefix),
          c.onRecoverableError !== void 0 && (r = c.onRecoverableError)),
        (t = tZ(t, null, e, 1, c ?? null, n, !1, o, r)),
        (e[yl] = t.current),
        Rd(e),
        l)
      )
        for (e = 0; e < l.length; e++)
          (c = l[e]),
            (n = c._getVersion),
            (n = n(c._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [c, n])
              : t.mutableSourceEagerHydrationData.push(c, n);
      return new ma(t);
    };
    ic.render = function (e, t, c) {
      if (!Xa(t)) throw Error(z(200));
      return xa(null, e, t, !1, c);
    };
    ic.unmountComponentAtNode = function (e) {
      if (!Xa(e)) throw Error(z(40));
      return e._reactRootContainer
        ? (Dn(function () {
            xa(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[yl] = null);
            });
          }),
          !0)
        : !1;
    };
    ic.unstable_batchedUpdates = XX;
    ic.unstable_renderSubtreeIntoContainer = function (e, t, c, l) {
      if (!Xa(c)) throw Error(z(200));
      if (e == null || e._reactInternals === void 0) throw Error(z(38));
      return xa(e, t, c, !1, l);
    };
    ic.version = "18.3.1-next-f1338f8080-20240426";
  });
  var er = nt((EC, oZ) => {
    "use strict";
    function nZ() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nZ);
        } catch (e) {
          console.error(e);
        }
    }
    nZ(), (oZ.exports = lZ());
  });
  var dZ = nt((fX) => {
    "use strict";
    var rZ = er();
    (fX.createRoot = rZ.createRoot), (fX.hydrateRoot = rZ.hydrateRoot);
    var jC;
  });
  var RZ = nt((pa) => {
    "use strict";
    var Ev = A(),
      jv = Symbol.for("react.element"),
      Pv = Symbol.for("react.fragment"),
      Kv = Object.prototype.hasOwnProperty,
      _v =
        Ev.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      qv = { key: !0, ref: !0, __self: !0, __source: !0 };
    function ZZ(e, t, c) {
      var l,
        n = {},
        o = null,
        r = null;
      c !== void 0 && (o = "" + c),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (r = t.ref);
      for (l in t) Kv.call(t, l) && !qv.hasOwnProperty(l) && (n[l] = t[l]);
      if (e && e.defaultProps)
        for (l in ((t = e.defaultProps), t)) n[l] === void 0 && (n[l] = t[l]);
      return {
        $$typeof: jv,
        type: e,
        key: o,
        ref: r,
        props: n,
        _owner: _v.current,
      };
    }
    pa.Fragment = Pv;
    pa.jsx = ZZ;
    pa.jsxs = ZZ;
  });
  var M = nt((gJ, fZ) => {
    "use strict";
    fZ.exports = RZ();
  });
  var yZ = nt((ga) => {
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
          X,
          p,
          Z,
          x,
          G,
          g;
        for (b = 0; b < i; b++)
          if (typeof r[b] == "string") s += r[b];
          else if (typeof r[b] == "object") {
            if (((X = r[b]), X.keys))
              for (a = d[u], m = 0; m < X.keys.length; m++) {
                if (a == null)
                  throw new Error(
                    t(
                      '[sprintf] Cannot access property "%s" of undefined value "%s"',
                      X.keys[m],
                      X.keys[m - 1]
                    )
                  );
                a = a[X.keys[m]];
              }
            else X.param_no ? (a = d[X.param_no]) : (a = d[u++]);
            if (
              (e.not_type.test(X.type) &&
                e.not_primitive.test(X.type) &&
                a instanceof Function &&
                (a = a()),
              e.numeric_arg.test(X.type) && typeof a != "number" && isNaN(a))
            )
              throw new TypeError(
                t("[sprintf] expecting number but found %T", a)
              );
            switch ((e.number.test(X.type) && (G = a >= 0), X.type)) {
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
                a = JSON.stringify(a, null, X.width ? parseInt(X.width) : 0);
                break;
              case "e":
                a = X.precision
                  ? parseFloat(a).toExponential(X.precision)
                  : parseFloat(a).toExponential();
                break;
              case "f":
                a = X.precision
                  ? parseFloat(a).toFixed(X.precision)
                  : parseFloat(a);
                break;
              case "g":
                a = X.precision
                  ? String(Number(a.toPrecision(X.precision)))
                  : parseFloat(a);
                break;
              case "o":
                a = (parseInt(a, 10) >>> 0).toString(8);
                break;
              case "s":
                (a = String(a)),
                  (a = X.precision ? a.substring(0, X.precision) : a);
                break;
              case "t":
                (a = String(!!a)),
                  (a = X.precision ? a.substring(0, X.precision) : a);
                break;
              case "T":
                (a = Object.prototype.toString
                  .call(a)
                  .slice(8, -1)
                  .toLowerCase()),
                  (a = X.precision ? a.substring(0, X.precision) : a);
                break;
              case "u":
                a = parseInt(a, 10) >>> 0;
                break;
              case "v":
                (a = a.valueOf()),
                  (a = X.precision ? a.substring(0, X.precision) : a);
                break;
              case "x":
                a = (parseInt(a, 10) >>> 0).toString(16);
                break;
              case "X":
                a = (parseInt(a, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            e.json.test(X.type)
              ? (s += a)
              : (e.number.test(X.type) && (!G || X.sign)
                  ? ((g = G ? "+" : "-"),
                    (a = a.toString().replace(e.sign, "")))
                  : (g = ""),
                (Z = X.pad_char
                  ? X.pad_char === "0"
                    ? "0"
                    : X.pad_char.charAt(1)
                  : " "),
                (x = X.width - (g + a).length),
                (p = X.width && x > 0 ? Z.repeat(x) : ""),
                (s += X.align ? g + a + p : Z === "0" ? g + p + a : p + g + a));
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
      typeof ga < "u" && ((ga.sprintf = t), (ga.vsprintf = c)),
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
  var aR = nt((iR) => {
    "use strict";
    var ar = A();
    function dh(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var uh = typeof Object.is == "function" ? Object.is : dh,
      ih = ar.useState,
      ah = ar.useEffect,
      sh = ar.useLayoutEffect,
      bh = ar.useDebugValue;
    function mh(e, t) {
      var c = t(),
        l = ih({ inst: { value: c, getSnapshot: t } }),
        n = l[0].inst,
        o = l[1];
      return (
        sh(
          function () {
            (n.value = c), (n.getSnapshot = t), mx(n) && o({ inst: n });
          },
          [e, c, t]
        ),
        ah(
          function () {
            return (
              mx(n) && o({ inst: n }),
              e(function () {
                mx(n) && o({ inst: n });
              })
            );
          },
          [e]
        ),
        bh(c),
        c
      );
    }
    function mx(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var c = t();
        return !uh(e, c);
      } catch {
        return !0;
      }
    }
    function Xh(e, t) {
      return t();
    }
    var xh =
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
        ? Xh
        : mh;
    iR.useSyncExternalStore =
      ar.useSyncExternalStore !== void 0 ? ar.useSyncExternalStore : xh;
  });
  var bR = nt((Gz, sR) => {
    "use strict";
    sR.exports = aR();
  });
  var VI = nt((FT, hI) => {
    "use strict";
    var W2 = function (t) {
      return B2(t) && !v2(t);
    };
    function B2(e) {
      return !!e && typeof e == "object";
    }
    function v2(e) {
      var t = Object.prototype.toString.call(e);
      return t === "[object RegExp]" || t === "[object Date]" || V2(e);
    }
    var F2 = typeof Symbol == "function" && Symbol.for,
      h2 = F2 ? Symbol.for("react.element") : 60103;
    function V2(e) {
      return e.$$typeof === h2;
    }
    function C2(e) {
      return Array.isArray(e) ? [] : {};
    }
    function vu(e, t) {
      return t.clone !== !1 && t.isMergeableObject(e) ? fr(C2(e), e, t) : e;
    }
    function J2(e, t, c) {
      return e.concat(t).map(function (l) {
        return vu(l, c);
      });
    }
    function Y2(e, t) {
      if (!t.customMerge) return fr;
      var c = t.customMerge(e);
      return typeof c == "function" ? c : fr;
    }
    function N2(e) {
      return Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(e).filter(function (t) {
            return Object.propertyIsEnumerable.call(e, t);
          })
        : [];
    }
    function vI(e) {
      return Object.keys(e).concat(N2(e));
    }
    function FI(e, t) {
      try {
        return t in e;
      } catch {
        return !1;
      }
    }
    function z2(e, t) {
      return (
        FI(e, t) &&
        !(
          Object.hasOwnProperty.call(e, t) &&
          Object.propertyIsEnumerable.call(e, t)
        )
      );
    }
    function k2(e, t, c) {
      var l = {};
      return (
        c.isMergeableObject(e) &&
          vI(e).forEach(function (n) {
            l[n] = vu(e[n], c);
          }),
        vI(t).forEach(function (n) {
          z2(e, n) ||
            (FI(e, n) && c.isMergeableObject(t[n])
              ? (l[n] = Y2(n, c)(e[n], t[n], c))
              : (l[n] = vu(t[n], c)));
        }),
        l
      );
    }
    function fr(e, t, c) {
      (c = c || {}),
        (c.arrayMerge = c.arrayMerge || J2),
        (c.isMergeableObject = c.isMergeableObject || W2),
        (c.cloneUnlessOtherwiseSpecified = vu);
      var l = Array.isArray(t),
        n = Array.isArray(e),
        o = l === n;
      return o ? (l ? c.arrayMerge(e, t, c) : k2(e, t, c)) : vu(t, c);
    }
    fr.all = function (t, c) {
      if (!Array.isArray(t))
        throw new Error("first argument should be an array");
      return t.reduce(function (l, n) {
        return fr(l, n, c);
      }, {});
    };
    var w2 = fr;
    hI.exports = w2;
  });
  var JI = nt((hT, CI) => {
    "use strict";
    CI.exports = function e(t, c) {
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
  function Fs(e) {
    var t = Object.create(null);
    return function (c) {
      return t[c] === void 0 && (t[c] = e(c)), t[c];
    };
  }
  var hs = vG(() => {});
  var ly = nt((xe) => {
    "use strict";
    var ut = typeof Symbol == "function" && Symbol.for,
      i0 = ut ? Symbol.for("react.element") : 60103,
      a0 = ut ? Symbol.for("react.portal") : 60106,
      Vs = ut ? Symbol.for("react.fragment") : 60107,
      Cs = ut ? Symbol.for("react.strict_mode") : 60108,
      Js = ut ? Symbol.for("react.profiler") : 60114,
      Ys = ut ? Symbol.for("react.provider") : 60109,
      Ns = ut ? Symbol.for("react.context") : 60110,
      s0 = ut ? Symbol.for("react.async_mode") : 60111,
      zs = ut ? Symbol.for("react.concurrent_mode") : 60111,
      ks = ut ? Symbol.for("react.forward_ref") : 60112,
      ws = ut ? Symbol.for("react.suspense") : 60113,
      q2 = ut ? Symbol.for("react.suspense_list") : 60120,
      Ss = ut ? Symbol.for("react.memo") : 60115,
      Qs = ut ? Symbol.for("react.lazy") : 60116,
      $2 = ut ? Symbol.for("react.block") : 60121,
      eV = ut ? Symbol.for("react.fundamental") : 60117,
      tV = ut ? Symbol.for("react.responder") : 60118,
      cV = ut ? Symbol.for("react.scope") : 60119;
    function xc(e) {
      if (typeof e == "object" && e !== null) {
        var t = e.$$typeof;
        switch (t) {
          case i0:
            switch (((e = e.type), e)) {
              case s0:
              case zs:
              case Vs:
              case Js:
              case Cs:
              case ws:
                return e;
              default:
                switch (((e = e && e.$$typeof), e)) {
                  case Ns:
                  case ks:
                  case Qs:
                  case Ss:
                  case Ys:
                    return e;
                  default:
                    return t;
                }
            }
          case a0:
            return t;
        }
      }
    }
    function cy(e) {
      return xc(e) === zs;
    }
    xe.AsyncMode = s0;
    xe.ConcurrentMode = zs;
    xe.ContextConsumer = Ns;
    xe.ContextProvider = Ys;
    xe.Element = i0;
    xe.ForwardRef = ks;
    xe.Fragment = Vs;
    xe.Lazy = Qs;
    xe.Memo = Ss;
    xe.Portal = a0;
    xe.Profiler = Js;
    xe.StrictMode = Cs;
    xe.Suspense = ws;
    xe.isAsyncMode = function (e) {
      return cy(e) || xc(e) === s0;
    };
    xe.isConcurrentMode = cy;
    xe.isContextConsumer = function (e) {
      return xc(e) === Ns;
    };
    xe.isContextProvider = function (e) {
      return xc(e) === Ys;
    };
    xe.isElement = function (e) {
      return typeof e == "object" && e !== null && e.$$typeof === i0;
    };
    xe.isForwardRef = function (e) {
      return xc(e) === ks;
    };
    xe.isFragment = function (e) {
      return xc(e) === Vs;
    };
    xe.isLazy = function (e) {
      return xc(e) === Qs;
    };
    xe.isMemo = function (e) {
      return xc(e) === Ss;
    };
    xe.isPortal = function (e) {
      return xc(e) === a0;
    };
    xe.isProfiler = function (e) {
      return xc(e) === Js;
    };
    xe.isStrictMode = function (e) {
      return xc(e) === Cs;
    };
    xe.isSuspense = function (e) {
      return xc(e) === ws;
    };
    xe.isValidElementType = function (e) {
      return (
        typeof e == "string" ||
        typeof e == "function" ||
        e === Vs ||
        e === zs ||
        e === Js ||
        e === Cs ||
        e === ws ||
        e === q2 ||
        (typeof e == "object" &&
          e !== null &&
          (e.$$typeof === Qs ||
            e.$$typeof === Ss ||
            e.$$typeof === Ys ||
            e.$$typeof === Ns ||
            e.$$typeof === ks ||
            e.$$typeof === eV ||
            e.$$typeof === tV ||
            e.$$typeof === cV ||
            e.$$typeof === $2))
      );
    };
    xe.typeOf = xc;
  });
  var oy = nt((uD, ny) => {
    "use strict";
    ny.exports = ly();
  });
  var by = nt((iD, sy) => {
    "use strict";
    var b0 = oy(),
      lV = {
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
      nV = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      oV = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      },
      iy = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      m0 = {};
    m0[b0.ForwardRef] = oV;
    m0[b0.Memo] = iy;
    function ry(e) {
      return b0.isMemo(e) ? iy : m0[e.$$typeof] || lV;
    }
    var rV = Object.defineProperty,
      dV = Object.getOwnPropertyNames,
      dy = Object.getOwnPropertySymbols,
      uV = Object.getOwnPropertyDescriptor,
      iV = Object.getPrototypeOf,
      uy = Object.prototype;
    function ay(e, t, c) {
      if (typeof t != "string") {
        if (uy) {
          var l = iV(t);
          l && l !== uy && ay(e, l, c);
        }
        var n = dV(t);
        dy && (n = n.concat(dy(t)));
        for (var o = ry(e), r = ry(t), d = 0; d < n.length; ++d) {
          var u = n[d];
          if (!nV[u] && !(c && c[u]) && !(r && r[u]) && !(o && o[u])) {
            var i = uV(t, u);
            try {
              rV(e, u, i);
            } catch {}
          }
        }
      }
      return e;
    }
    sy.exports = ay;
  });
  var AV,
    _y,
    qy = vG(() => {
      hs();
      (AV =
        /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/),
        (_y = Fs(function (e) {
          return (
            AV.test(e) ||
            (e.charCodeAt(0) === 111 &&
              e.charCodeAt(1) === 110 &&
              e.charCodeAt(2) < 91)
          );
        }));
    });
  var gW = nt((r4, pW) => {
    pW.exports = (function (e) {
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
              X = m === void 0 ? n : m,
              p = i.sanitize,
              Z = i.searchWords,
              x = i.textToHighlight;
            return o({
              chunksToHighlight: l({
                chunks: X({
                  autoEscape: a,
                  caseSensitive: b,
                  sanitize: p,
                  searchWords: Z,
                  textToHighlight: x,
                }),
              }),
              totalLength: x ? x.length : 0,
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
                    var X = Math.max(m.end, b.end);
                    s.push({ highlight: !1, start: m.start, end: X });
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
              X = i.searchWords,
              p = i.textToHighlight;
            return (
              (p = m(p)),
              X.filter(function (Z) {
                return Z;
              }).reduce(function (Z, x) {
                (x = m(x)), a && (x = d(x));
                for (
                  var G = new RegExp(x, s ? "g" : "gi"), g = void 0;
                  (g = G.exec(p));

                ) {
                  var R = g.index,
                    f = G.lastIndex;
                  f > R && Z.push({ highlight: !1, start: R, end: f }),
                    g.index === G.lastIndex && G.lastIndex++;
                }
                return Z;
              }, [])
            );
          };
        t.findChunks = n;
        var o = (t.fillInChunks = function (i) {
          var a = i.chunksToHighlight,
            s = i.totalLength,
            b = [],
            m = function (Z, x, G) {
              x - Z > 0 && b.push({ start: Z, end: x, highlight: G });
            };
          if (a.length === 0) m(0, s, !1);
          else {
            var X = 0;
            a.forEach(function (p) {
              m(X, p.start, !1), m(p.start, p.end, !0), (X = p.end);
            }),
              m(X, s, !1);
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
  var H = V(A());
  var nl = V(er()),
    Ga = V(dZ());
  function uZ(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function iZ(e) {
    var t, c;
    return uZ(e) === !1
      ? !1
      : ((t = e.constructor),
        t === void 0
          ? !0
          : ((c = t.prototype),
            !(uZ(c) === !1 || c.hasOwnProperty("isPrototypeOf") === !1)));
  }
  var tr = function () {
    return (
      (tr =
        Object.assign ||
        function (t) {
          for (var c, l = 1, n = arguments.length; l < n; l++) {
            c = arguments[l];
            for (var o in c)
              Object.prototype.hasOwnProperty.call(c, o) && (t[o] = c[o]);
          }
          return t;
        }),
      tr.apply(this, arguments)
    );
  };
  function aZ(e) {
    return e.toLowerCase();
  }
  var Dv = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g],
    Uv = /[^A-Z0-9]+/gi;
  function bZ(e, t) {
    t === void 0 && (t = {});
    for (
      var c = t.splitRegexp,
        l = c === void 0 ? Dv : c,
        n = t.stripRegexp,
        o = n === void 0 ? Uv : n,
        r = t.transform,
        d = r === void 0 ? aZ : r,
        u = t.delimiter,
        i = u === void 0 ? " " : u,
        a = sZ(sZ(e, l, "$1\0$2"), o, "\0"),
        s = 0,
        b = a.length;
      a.charAt(s) === "\0";

    )
      s++;
    for (; a.charAt(b - 1) === "\0"; ) b--;
    return a.slice(s, b).split("\0").map(d).join(i);
  }
  function sZ(e, t, c) {
    return t instanceof RegExp
      ? e.replace(t, c)
      : t.reduce(function (l, n) {
          return l.replace(n, c);
        }, e);
  }
  function mZ(e, t) {
    return t === void 0 && (t = {}), bZ(e, tr({ delimiter: "." }, t));
  }
  function XZ(e, t) {
    return t === void 0 && (t = {}), mZ(e, tr({ delimiter: "-" }, t));
  }
  var Mu = V(A());
  var xZ = V(A());
  var Nd = {
      general: {
        backends: [],
        whitelist: !1,
        synchronize: { enabled: !1, recurrence: "hourly" },
        addons: {},
      },
      apis: { "rest-api": { relations: [] } },
    },
    IX = (0, H.createContext)([Nd, () => {}]);
  function yX({ children: e, handle: t = ["general"] }) {
    let c = (0, H.useRef)(null),
      l = (0, H.useRef)(Nd),
      [n, o] = (0, H.useState)(Nd),
      [r, d] = (0, H.useState)(!1);
    l.current = n;
    let u = (0, H.useRef)((b) => {
        let m = { general: { ...Nd.general, ...b.general } };
        (m.apis = Object.fromEntries(
          Object.entries(b)
            .filter(([Z]) => Z !== "general")
            .map(([Z, x]) => [Z, { ...Nd.apis[Z], ...x }])
        )),
          o(m);
        let X = c.current;
        if (((c.current = { ...m }), X === null)) return;
        let p = Object.keys(m.general.addons).reduce(
          (Z, x) => Z || m.general.addons[x] !== X.general.addons[x]
        );
        d(p);
      }).current,
      i = (0, H.useRef)((b) => {
        let m = l.current;
        t.indexOf("general") !== -1 && (b.data.general = m.general),
          Object.entries(m.apis).forEach(([X, p]) => {
            t.indexOf(X) !== -1 && (b.data[X] = p);
          });
      }).current,
      a = (0, H.useRef)((b) => {
        let m = l.current;
        JSON.stringify(m) !== JSON.stringify(c.current) &&
          (b.preventDefault(), (b.returnValue = !0));
      }).current;
    (0, H.useEffect)(() => {
      wppb.on("fetch", u),
        wppb.join("submit", i),
        window.addEventListener("beforeunload", (b) => a(b));
    }, []),
      (0, H.useEffect)(() => {
        r && window.location.reload();
      }, []);
    let s = (b) => o({ ...n, ...b });
    return xZ.default.createElement(IX.Provider, { value: [n, s] }, e);
  }
  function mn() {
    let [{ general: e }, t] = (0, H.useContext)(IX);
    return [e, (c) => t({ general: c })];
  }
  function WX() {
    let [{ apis: e }, t] = (0, H.useContext)(IX);
    return [e, (c) => t({ apis: { ...e, ...c } })];
  }
  function GZ() {
    let [e] = WX();
    return Object.keys(e).reduce((t, c) => t.concat(e[c].relations), []);
  }
  var pZ = V(A());
  function BX() {
    let e = GZ();
    return (0, H.useMemo)(() => new Set(e.map(({ post_type: t }) => t)), [e]);
  }
  var gZ = (0, H.createContext)([]);
  function vX({ children: e }) {
    let [t, c] = (0, H.useState)([]);
    return (
      (0, H.useEffect)(() => {
        wppb.on("postTypes", c);
      }, []),
      pZ.default.createElement(gZ.Provider, { value: t }, e)
    );
  }
  function cr({ filter: e } = { filter: !1 }) {
    let t = (0, H.useContext)(gZ);
    if (e) {
      let c = BX();
      return t.filter((l) => !c.has(l));
    }
    return t;
  }
  var Cn = V(A());
  function HZ(e) {
    var t,
      c,
      l = "";
    if (typeof e == "string" || typeof e == "number") l += e;
    else if (typeof e == "object")
      if (Array.isArray(e)) {
        var n = e.length;
        for (t = 0; t < n; t++)
          e[t] && (c = HZ(e[t])) && (l && (l += " "), (l += c));
      } else for (c in e) e[c] && (l && (l += " "), (l += c));
    return l;
  }
  function Mv() {
    for (var e, t, c = 0, l = "", n = arguments.length; c < n; c++)
      (e = arguments[c]) && (t = HZ(e)) && (l && (l += " "), (l += t));
    return l;
  }
  var Ie = Mv;
  var IZ = V(M());
  var lr = (e) => (0, H.createElement)("path", e);
  var ol = (0, H.forwardRef)(({ className: e, isPressed: t, ...c }, l) => {
    let n = {
      ...c,
      "className": Ie(e, { "is-pressed": t }) || void 0,
      "aria-hidden": !0,
      "focusable": !1,
    };
    return (0, IZ.jsx)("svg", { ...n, ref: l });
  });
  ol.displayName = "SVG";
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
  var $v = V(yZ()),
    WJ = Xn(console.error);
  var FX, WZ, zd, BZ;
  FX = {
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
  WZ = ["(", "?"];
  zd = { ")": ["("], ":": ["?", "?:"] };
  BZ = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
  function hX(e) {
    for (var t = [], c = [], l, n, o, r; (l = e.match(BZ)); ) {
      for (
        n = l[0], o = e.substr(0, l.index).trim(), o && t.push(o);
        (r = c.pop());

      ) {
        if (zd[n]) {
          if (zd[n][0] === r) {
            n = zd[n][1] || n;
            break;
          }
        } else if (WZ.indexOf(r) >= 0 || FX[r] < FX[n]) {
          c.push(r);
          break;
        }
        t.push(r);
      }
      zd[n] || c.push(n), (e = e.substr(l.index + n.length));
    }
    return (e = e.trim()), e && t.push(e), t.concat(c.reverse());
  }
  var eF = {
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
  function VX(e, t) {
    var c = [],
      l,
      n,
      o,
      r,
      d,
      u;
    for (l = 0; l < e.length; l++) {
      if (((d = e[l]), (r = eF[d]), r)) {
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
  function CX(e) {
    var t = hX(e);
    return function (c) {
      return VX(t, c);
    };
  }
  function JX(e) {
    var t = CX(e);
    return function (c) {
      return +t({ n: c });
    };
  }
  var vZ = { contextDelimiter: "", onMissingKey: null };
  function tF(e) {
    var t, c, l;
    for (t = e.split(";"), c = 0; c < t.length; c++)
      if (((l = t[c].trim()), l.indexOf("plural=") === 0)) return l.substr(7);
  }
  function kd(e, t) {
    var c;
    (this.data = e), (this.pluralForms = {}), (this.options = {});
    for (c in vZ) this.options[c] = t !== void 0 && c in t ? t[c] : vZ[c];
  }
  kd.prototype.getPluralForm = function (e, t) {
    var c = this.pluralForms[e],
      l,
      n,
      o;
    return (
      c ||
        ((l = this.data[e][""]),
        (o = l["Plural-Forms"] || l["plural-forms"] || l.plural_forms),
        typeof o != "function" &&
          ((n = tF(l["Plural-Forms"] || l["plural-forms"] || l.plural_forms)),
          (o = JX(n))),
        (c = this.pluralForms[e] = o)),
      c(t)
    );
  };
  kd.prototype.dcnpgettext = function (e, t, c, l, n) {
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
  var FZ = {
      "": {
        plural_forms(e) {
          return e === 1 ? 0 : 1;
        },
      },
    },
    cF = /^i18n\.(n?gettext|has_translation)(_|$)/,
    hZ = (e, t, c) => {
      let l = new kd({}),
        n = new Set(),
        o = () => {
          n.forEach((R) => R());
        },
        r = (R) => (n.add(R), () => n.delete(R)),
        d = (R = "default") => l.data[R],
        u = (R, f = "default") => {
          (l.data[f] = { ...l.data[f], ...R }),
            (l.data[f][""] = { ...FZ[""], ...l.data[f]?.[""] }),
            delete l.pluralForms[f];
        },
        i = (R, f) => {
          u(R, f), o();
        },
        a = (R, f = "default") => {
          (l.data[f] = {
            ...l.data[f],
            ...R,
            "": { ...FZ[""], ...l.data[f]?.[""], ...R?.[""] },
          }),
            delete l.pluralForms[f],
            o();
        },
        s = (R, f) => {
          (l.data = {}), (l.pluralForms = {}), i(R, f);
        },
        b = (R = "default", f, I, y, W) => (
          l.data[R] || u(void 0, R), l.dcnpgettext(R, f, I, y, W)
        ),
        m = (R = "default") => R,
        X = (R, f) => {
          let I = b(f, void 0, R);
          return c
            ? ((I = c.applyFilters("i18n.gettext", I, R, f)),
              c.applyFilters("i18n.gettext_" + m(f), I, R, f))
            : I;
        },
        p = (R, f, I) => {
          let y = b(I, f, R);
          return c
            ? ((y = c.applyFilters("i18n.gettext_with_context", y, R, f, I)),
              c.applyFilters("i18n.gettext_with_context_" + m(I), y, R, f, I))
            : y;
        },
        Z = (R, f, I, y) => {
          let W = b(y, void 0, R, f, I);
          return c
            ? ((W = c.applyFilters("i18n.ngettext", W, R, f, I, y)),
              c.applyFilters("i18n.ngettext_" + m(y), W, R, f, I, y))
            : W;
        },
        x = (R, f, I, y, W) => {
          let B = b(W, y, R, f, I);
          return c
            ? ((B = c.applyFilters(
                "i18n.ngettext_with_context",
                B,
                R,
                f,
                I,
                y,
                W
              )),
              c.applyFilters(
                "i18n.ngettext_with_context_" + m(W),
                B,
                R,
                f,
                I,
                y,
                W
              ))
            : B;
        },
        G = () => p("ltr", "text direction") === "rtl",
        g = (R, f, I) => {
          let y = f ? f + "" + R : R,
            W = !!l.data?.[I ?? "default"]?.[y];
          return (
            c &&
              ((W = c.applyFilters("i18n.has_translation", W, R, f, I)),
              (W = c.applyFilters("i18n.has_translation_" + m(I), W, R, f, I))),
            W
          );
        };
      if ((e && i(e, t), c)) {
        let R = (f) => {
          cF.test(f) && o();
        };
        c.addAction("hookAdded", "core/i18n", R),
          c.addAction("hookRemoved", "core/i18n", R);
      }
      return {
        getLocaleData: d,
        setLocaleData: i,
        addLocaleData: a,
        resetLocaleData: s,
        subscribe: r,
        __: X,
        _x: p,
        _n: Z,
        _nx: x,
        isRTL: G,
        hasTranslation: g,
      };
    };
  function lF(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The namespace must be a non-empty string."), !1)
      : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)
        ? !0
        : (console.error(
            "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
          ),
          !1);
  }
  var Ha = lF;
  function nF(e) {
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
  var nr = nF;
  function oF(e, t) {
    return function (l, n, o, r = 10) {
      let d = e[t];
      if (!nr(l) || !Ha(n)) return;
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
  var YX = oF;
  function rF(e, t, c = !1) {
    return function (n, o) {
      let r = e[t];
      if (!nr(n) || (!c && !Ha(o))) return;
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
  var wd = rF;
  function dF(e, t) {
    return function (l, n) {
      let o = e[t];
      return typeof n < "u"
        ? l in o && o[l].handlers.some((r) => r.namespace === n)
        : l in o;
    };
  }
  var NX = dF;
  function uF(e, t, c = !1) {
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
  var zX = uF;
  function iF(e, t) {
    return function () {
      var l;
      let n = e[t];
      return (l = n.__current[n.__current.length - 1]?.name) !== null &&
        l !== void 0
        ? l
        : null;
    };
  }
  var kX = iF;
  function aF(e, t) {
    return function (l) {
      let n = e[t];
      return typeof l > "u"
        ? typeof n.__current[0] < "u"
        : n.__current[0]
          ? l === n.__current[0].name
          : !1;
    };
  }
  var wX = aF;
  function sF(e, t) {
    return function (l) {
      let n = e[t];
      if (nr(l)) return n[l] && n[l].runs ? n[l].runs : 0;
    };
  }
  var SX = sF;
  var QX = class {
    constructor() {
      (this.actions = Object.create(null)),
        (this.actions.__current = []),
        (this.filters = Object.create(null)),
        (this.filters.__current = []),
        (this.addAction = YX(this, "actions")),
        (this.addFilter = YX(this, "filters")),
        (this.removeAction = wd(this, "actions")),
        (this.removeFilter = wd(this, "filters")),
        (this.hasAction = NX(this, "actions")),
        (this.hasFilter = NX(this, "filters")),
        (this.removeAllActions = wd(this, "actions", !0)),
        (this.removeAllFilters = wd(this, "filters", !0)),
        (this.doAction = zX(this, "actions")),
        (this.applyFilters = zX(this, "filters", !0)),
        (this.currentAction = kX(this, "actions")),
        (this.currentFilter = kX(this, "filters")),
        (this.doingAction = wX(this, "actions")),
        (this.doingFilter = wX(this, "filters")),
        (this.didAction = SX(this, "actions")),
        (this.didFilter = SX(this, "filters"));
    }
  };
  function bF() {
    return new QX();
  }
  var VZ = bF;
  var OX = VZ(),
    {
      addAction: dY,
      addFilter: uY,
      removeAction: iY,
      removeFilter: aY,
      hasAction: sY,
      hasFilter: bY,
      removeAllActions: mY,
      removeAllFilters: XY,
      doAction: xY,
      applyFilters: GY,
      currentAction: pY,
      currentFilter: gY,
      doingAction: HY,
      doingFilter: ZY,
      didAction: RY,
      didFilter: fY,
      actions: IY,
      filters: yY,
    } = OX;
  var _e = hZ(void 0, void 0, OX);
  var mF = _e.getLocaleData.bind(_e),
    XF = _e.setLocaleData.bind(_e),
    xF = _e.resetLocaleData.bind(_e),
    GF = _e.subscribe.bind(_e),
    Za = _e.__.bind(_e),
    pF = _e._x.bind(_e),
    gF = _e._n.bind(_e),
    HF = _e._nx.bind(_e),
    En = _e.isRTL.bind(_e),
    ZF = _e.hasTranslation.bind(_e);
  function RF(e) {
    return typeof e != "string" || e === ""
      ? (console.error("The namespace must be a non-empty string."), !1)
      : /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)
        ? !0
        : (console.error(
            "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
          ),
          !1);
  }
  var Ra = RF;
  function fF(e) {
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
  var or = fF;
  function IF(e, t) {
    return function (l, n, o, r = 10) {
      let d = e[t];
      if (!or(l) || !Ra(n)) return;
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
  var AX = IF;
  function yF(e, t, c = !1) {
    return function (n, o) {
      let r = e[t];
      if (!or(n) || (!c && !Ra(o))) return;
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
  var Sd = yF;
  function WF(e, t) {
    return function (l, n) {
      let o = e[t];
      return typeof n < "u"
        ? l in o && o[l].handlers.some((r) => r.namespace === n)
        : l in o;
    };
  }
  var LX = WF;
  function BF(e, t, c, l) {
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
  var Qd = BF;
  function vF(e, t) {
    return function () {
      var l;
      let n = e[t];
      return (l = Array.from(n.__current).at(-1)?.name) !== null && l !== void 0
        ? l
        : null;
    };
  }
  var TX = vF;
  function FF(e, t) {
    return function (l) {
      let n = e[t];
      return typeof l > "u"
        ? n.__current.size > 0
        : Array.from(n.__current).some((o) => o.name === l);
    };
  }
  var DX = FF;
  function hF(e, t) {
    return function (l) {
      let n = e[t];
      if (or(l)) return n[l] && n[l].runs ? n[l].runs : 0;
    };
  }
  var UX = hF;
  var MX = class {
    constructor() {
      (this.actions = Object.create(null)),
        (this.actions.__current = new Set()),
        (this.filters = Object.create(null)),
        (this.filters.__current = new Set()),
        (this.addAction = AX(this, "actions")),
        (this.addFilter = AX(this, "filters")),
        (this.removeAction = Sd(this, "actions")),
        (this.removeFilter = Sd(this, "filters")),
        (this.hasAction = LX(this, "actions")),
        (this.hasFilter = LX(this, "filters")),
        (this.removeAllActions = Sd(this, "actions", !0)),
        (this.removeAllFilters = Sd(this, "filters", !0)),
        (this.doAction = Qd(this, "actions", !1, !1)),
        (this.doActionAsync = Qd(this, "actions", !1, !0)),
        (this.applyFilters = Qd(this, "filters", !0, !1)),
        (this.applyFiltersAsync = Qd(this, "filters", !0, !0)),
        (this.currentAction = TX(this, "actions")),
        (this.currentFilter = TX(this, "filters")),
        (this.doingAction = DX(this, "actions")),
        (this.doingFilter = DX(this, "filters")),
        (this.didAction = UX(this, "actions")),
        (this.didFilter = UX(this, "filters"));
    }
  };
  function VF() {
    return new MX();
  }
  var CZ = VF;
  var CF = CZ(),
    {
      addAction: nN,
      addFilter: oN,
      removeAction: rN,
      removeFilter: dN,
      hasAction: uN,
      hasFilter: iN,
      removeAllActions: aN,
      removeAllFilters: sN,
      doAction: JZ,
      doActionAsync: bN,
      applyFilters: mN,
      applyFiltersAsync: XN,
      currentAction: xN,
      currentFilter: GN,
      doingAction: pN,
      doingFilter: gN,
      didAction: HN,
      didFilter: ZN,
      actions: RN,
      filters: fN,
    } = CF;
  var YZ = Object.create(null);
  function Lc(e, t = {}) {
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
      X = `${e} is deprecated${i}${a}.${s}${b}${m}`;
    X in YZ || (JZ("deprecated", e, t, X), console.warn(X), (YZ[X] = !0));
  }
  var NZ = new WeakMap();
  function JF(e) {
    let t = NZ.get(e) || 0;
    return NZ.set(e, t + 1), t;
  }
  function YF(e, t, c) {
    return (0, H.useMemo)(() => {
      if (c) return c;
      let l = JF(e);
      return t ? `${t}-${l}` : l;
    }, [e, c, t]);
  }
  var Gt = YF;
  var EX = {};
  lb(EX, { find: () => Od });
  function NF(e) {
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
  function zZ(e) {
    return (
      e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    );
  }
  function zF(e) {
    let t = e.closest("map[name]");
    if (!t) return !1;
    let c = e.ownerDocument.querySelector('img[usemap="#' + t.name + '"]');
    return !!c && zZ(c);
  }
  function Od(e, { sequential: t = !1 } = {}) {
    let c = e.querySelectorAll(NF(t));
    return Array.from(c).filter((l) => {
      if (!zZ(l)) return !1;
      let { nodeName: n } = l;
      return n === "AREA" ? zF(l) : !0;
    });
  }
  var KX = {};
  lb(KX, {
    find: () => OF,
    findNext: () => LF,
    findPrevious: () => AF,
    isTabbableIndex: () => kZ,
  });
  function jX(e) {
    let t = e.getAttribute("tabindex");
    return t === null ? 0 : parseInt(t, 10);
  }
  function kZ(e) {
    return jX(e) !== -1;
  }
  function kF() {
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
  function wF(e, t) {
    return { element: e, index: t };
  }
  function SF(e) {
    return e.element;
  }
  function QF(e, t) {
    let c = jX(e.element),
      l = jX(t.element);
    return c === l ? e.index - t.index : c - l;
  }
  function PX(e) {
    return e.filter(kZ).map(wF).sort(QF).map(SF).reduce(kF(), []);
  }
  function OF(e) {
    return PX(Od(e));
  }
  function AF(e) {
    return PX(Od(e.ownerDocument.body))
      .reverse()
      .find(
        (t) => e.compareDocumentPosition(t) & e.DOCUMENT_POSITION_PRECEDING
      );
  }
  function LF(e) {
    return PX(Od(e.ownerDocument.body)).find(
      (t) => e.compareDocumentPosition(t) & e.DOCUMENT_POSITION_FOLLOWING
    );
  }
  function fa(e) {
    return (
      e.ownerDocument.defaultView,
      e.ownerDocument.defaultView.getComputedStyle(e)
    );
  }
  function Ad(e, t = "vertical") {
    if (e) {
      if (
        (t === "vertical" || t === "all") &&
        e.scrollHeight > e.clientHeight
      ) {
        let { overflowY: c } = fa(e);
        if (/(auto|scroll)/.test(c)) return e;
      }
      if (
        (t === "horizontal" || t === "all") &&
        e.scrollWidth > e.clientWidth
      ) {
        let { overflowX: c } = fa(e);
        if (/(auto|scroll)/.test(c)) return e;
      }
      return e.ownerDocument === e.parentNode ? e : Ad(e.parentNode, t);
    }
  }
  var Ia = { focusable: EX, tabbable: KX };
  function Ld(e, t) {
    let c = (0, H.useRef)();
    return (0, H.useCallback)((l) => {
      l ? (c.current = e(l)) : c.current && c.current();
    }, t);
  }
  function TF() {
    return Ld((e) => {
      function t(c) {
        let { key: l, shiftKey: n, target: o } = c;
        if (l !== "Tab") return;
        let r = n ? "findPrevious" : "findNext",
          d = Ia.tabbable[r](o) || null;
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
  var _X = TF;
  function ya(e = "firstElement") {
    let t = (0, H.useRef)(e),
      c = (n) => {
        n.focus({ preventScroll: !0 });
      },
      l = (0, H.useRef)();
    return (
      (0, H.useEffect)(() => {
        t.current = e;
      }, [e]),
      Ld((n) => {
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
              let r = Ia.tabbable.find(n)[0];
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
  var Wa = null;
  function DF(e) {
    let t = (0, H.useRef)(null),
      c = (0, H.useRef)(null),
      l = (0, H.useRef)(e);
    return (
      (0, H.useEffect)(() => {
        l.current = e;
      }, [e]),
      (0, H.useCallback)((n) => {
        if (n) {
          if (((t.current = n), c.current)) return;
          c.current = n.ownerDocument.activeElement;
        } else if (c.current) {
          let r = t.current?.contains(t.current?.ownerDocument.activeElement);
          if (t.current?.isConnected && !r) {
            var o;
            ((o = Wa) !== null && o !== void 0) || (Wa = c.current);
            return;
          }
          l.current
            ? l.current()
            : (c.current.isConnected ? c.current : Wa)?.focus(),
            (Wa = null);
        }
      }, [])
    );
  }
  var qX = DF;
  function Ba(e, t) {
    typeof e == "function"
      ? e(t)
      : e && e.hasOwnProperty("current") && (e.current = t);
  }
  function xn(e) {
    let t = (0, H.useRef)(),
      c = (0, H.useRef)(!1),
      l = (0, H.useRef)(!1),
      n = (0, H.useRef)([]),
      o = (0, H.useRef)(e);
    return (
      (o.current = e),
      (0, H.useLayoutEffect)(() => {
        l.current === !1 &&
          c.current === !0 &&
          e.forEach((r, d) => {
            let u = n.current[d];
            r !== u && (Ba(u, null), Ba(r, t.current));
          }),
          (n.current = e);
      }, e),
      (0, H.useLayoutEffect)(() => {
        l.current = !1;
      }),
      (0, H.useCallback)((r) => {
        Ba(t, r), (l.current = !0), (c.current = r !== null);
        let d = r ? o.current : n.current;
        for (let u of d) Ba(u, r);
      }, [])
    );
  }
  var wZ = new Map();
  function UF(e) {
    if (!e) return null;
    let t = wZ.get(e);
    return (
      t ||
      (typeof window < "u" && typeof window.matchMedia == "function"
        ? ((t = window.matchMedia(e)), wZ.set(e, t), t)
        : null)
    );
  }
  function $X(e) {
    let t = (0, H.useMemo)(() => {
      let c = UF(e);
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
    return (0, H.useSyncExternalStore)(t.subscribe, t.getValue, () => !1);
  }
  function va(e) {
    let t = (0, H.useRef)();
    return (
      (0, H.useEffect)(() => {
        t.current = e;
      }, [e]),
      t.current
    );
  }
  var MF = () => $X("(prefers-reduced-motion: reduce)"),
    Td = MF;
  var EF = Object.defineProperty,
    jF = Object.defineProperties,
    PF = Object.getOwnPropertyDescriptors,
    Fa = Object.getOwnPropertySymbols,
    QZ = Object.prototype.hasOwnProperty,
    OZ = Object.prototype.propertyIsEnumerable,
    SZ = (e, t, c) =>
      t in e
        ? EF(e, t, { enumerable: !0, configurable: !0, writable: !0, value: c })
        : (e[t] = c),
    J = (e, t) => {
      for (var c in t || (t = {})) QZ.call(t, c) && SZ(e, c, t[c]);
      if (Fa) for (var c of Fa(t)) OZ.call(t, c) && SZ(e, c, t[c]);
      return e;
    },
    w = (e, t) => jF(e, PF(t)),
    _ = (e, t) => {
      var c = {};
      for (var l in e) QZ.call(e, l) && t.indexOf(l) < 0 && (c[l] = e[l]);
      if (e != null && Fa)
        for (var l of Fa(e)) t.indexOf(l) < 0 && OZ.call(e, l) && (c[l] = e[l]);
      return c;
    };
  var KF = Object.defineProperty,
    _F = Object.defineProperties,
    qF = Object.getOwnPropertyDescriptors,
    ha = Object.getOwnPropertySymbols,
    LZ = Object.prototype.hasOwnProperty,
    TZ = Object.prototype.propertyIsEnumerable,
    AZ = (e, t, c) =>
      t in e
        ? KF(e, t, { enumerable: !0, configurable: !0, writable: !0, value: c })
        : (e[t] = c),
    te = (e, t) => {
      for (var c in t || (t = {})) LZ.call(t, c) && AZ(e, c, t[c]);
      if (ha) for (var c of ha(t)) TZ.call(t, c) && AZ(e, c, t[c]);
      return e;
    },
    ge = (e, t) => _F(e, qF(t)),
    Va = (e, t) => {
      var c = {};
      for (var l in e) LZ.call(e, l) && t.indexOf(l) < 0 && (c[l] = e[l]);
      if (e != null && ha)
        for (var l of ha(e)) t.indexOf(l) < 0 && TZ.call(e, l) && (c[l] = e[l]);
      return c;
    };
  function jn(...e) {}
  function ex(e, t) {
    if ($F(e)) {
      let c = eh(t) ? t() : t;
      return e(c);
    }
    return e;
  }
  function $F(e) {
    return typeof e == "function";
  }
  function eh(e) {
    return typeof e == "function";
  }
  function Tc(e, t) {
    return typeof Object.hasOwn == "function"
      ? Object.hasOwn(e, t)
      : Object.prototype.hasOwnProperty.call(e, t);
  }
  function He(...e) {
    return (...t) => {
      for (let c of e) typeof c == "function" && c(...t);
    };
  }
  function tx(e, t) {
    let c = te({}, e);
    for (let l of t) Tc(c, l) && delete c[l];
    return c;
  }
  function cx(e, t) {
    let c = {};
    for (let l of t) Tc(e, l) && (c[l] = e[l]);
    return c;
  }
  function Dd(e) {
    return e;
  }
  function Je(e, t) {
    if (!e)
      throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
  }
  function lx(e) {
    return Object.keys(e);
  }
  function Gn(e, ...t) {
    let c = typeof e == "function" ? e(...t) : e;
    return c == null ? !1 : !c;
  }
  function Dc(e) {
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
  var DZ = V(A(), 1);
  function Ud(e, t) {
    typeof e == "function" ? e(t) : e && (e.current = t);
  }
  function th(e) {
    return !e || !(0, DZ.isValidElement)(e)
      ? !1
      : "ref" in e.props || "ref" in e;
  }
  function UZ(e) {
    return th(e) ? J({}, e.props).ref || e.ref : null;
  }
  function MZ(e, t) {
    let c = J({}, e);
    for (let l in t) {
      if (!Tc(t, l)) continue;
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
  var hl = ch();
  function ch() {
    var e;
    return (
      typeof window < "u" &&
      !!((e = window.document) != null && e.createElement)
    );
  }
  function ue(e) {
    return e ? e.ownerDocument || e : document;
  }
  function Md(e) {
    return ue(e).defaultView || window;
  }
  function ac(e, t = !1) {
    let { activeElement: c } = ue(e);
    if (!c?.nodeName) return null;
    if (Ed(c) && c.contentDocument) return ac(c.contentDocument.body, t);
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
  function Ed(e) {
    return e.tagName === "IFRAME";
  }
  function yc(e) {
    let t = e.tagName.toLowerCase();
    return t === "button"
      ? !0
      : t === "input" && e.type
        ? lh.indexOf(e.type) !== -1
        : !1;
  }
  var lh = ["button", "color", "file", "image", "reset", "submit"];
  function jd(e) {
    if (typeof e.checkVisibility == "function") return e.checkVisibility();
    let t = e;
    return (
      t.offsetWidth > 0 || t.offsetHeight > 0 || e.getClientRects().length > 0
    );
  }
  function sc(e) {
    try {
      let t = e instanceof HTMLInputElement && e.selectionStart !== null,
        c = e.tagName === "TEXTAREA";
      return t || c || !1;
    } catch {
      return !1;
    }
  }
  function Pd(e) {
    return e.isContentEditable || sc(e);
  }
  function nx(e) {
    if (sc(e)) return e.value;
    if (e.isContentEditable) {
      let t = ue(e).createRange();
      return t.selectNodeContents(e), t.toString();
    }
    return "";
  }
  function ox(e) {
    let t = 0,
      c = 0;
    if (sc(e)) (t = e.selectionStart || 0), (c = e.selectionEnd || 0);
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
  function Ca(e) {
    if (!e) return null;
    let t = (c) => c === "auto" || c === "scroll";
    if (e.clientHeight && e.scrollHeight > e.clientHeight) {
      let { overflowY: c } = getComputedStyle(e);
      if (t(c)) return e;
    } else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
      let { overflowX: c } = getComputedStyle(e);
      if (t(c)) return e;
    }
    return Ca(e.parentElement) || document.scrollingElement || document.body;
  }
  function EZ() {
    return hl && !!navigator.maxTouchPoints;
  }
  function Ja() {
    return hl ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
  }
  function Pn() {
    return hl && Ja() && /apple/i.test(navigator.vendor);
  }
  function rx() {
    return hl && /firefox\//i.test(navigator.userAgent);
  }
  function dx() {
    return hl && navigator.platform.startsWith("Mac") && !EZ();
  }
  function Ya(e) {
    return !!(e.currentTarget && !Xe(e.currentTarget, e.target));
  }
  function ht(e) {
    return e.target === e.currentTarget;
  }
  function Kn(e, t) {
    let c = new FocusEvent("blur", t),
      l = e.dispatchEvent(c),
      n = ge(te({}, t), { bubbles: !0 });
    return e.dispatchEvent(new FocusEvent("focusout", n)), l;
  }
  function jZ(e, t, c) {
    let l = new KeyboardEvent(t, c);
    return e.dispatchEvent(l);
  }
  function ux(e, t) {
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
  function Ye(e, t, c, l = window) {
    let n = [];
    try {
      l.document.addEventListener(e, t, c);
      for (let r of Array.from(l.frames)) n.push(Ye(e, t, c, r));
    } catch {}
    return () => {
      try {
        l.document.removeEventListener(e, t, c);
      } catch {}
      for (let r of n) r();
    };
  }
  var Ne = V(A(), 1),
    nh = V(A(), 1),
    ix = J({}, nh),
    PZ = ix.useId,
    P3 = ix.useDeferredValue,
    KZ = ix.useInsertionEffect,
    ne = hl ? Ne.useLayoutEffect : Ne.useEffect;
  function za(e) {
    let t = (0, Ne.useRef)(e);
    return (
      ne(() => {
        t.current = e;
      }),
      t
    );
  }
  function j(e) {
    let t = (0, Ne.useRef)(() => {
      throw new Error("Cannot call an event handler while rendering.");
    });
    return (
      KZ
        ? KZ(() => {
            t.current = e;
          })
        : (t.current = e),
      (0, Ne.useCallback)((...c) => {
        var l;
        return (l = t.current) == null ? void 0 : l.call(t, ...c);
      }, [])
    );
  }
  function $Z(e) {
    let [t, c] = (0, Ne.useState)(null);
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
  function Fe(...e) {
    return (0, Ne.useMemo)(() => {
      if (e.some(Boolean))
        return (t) => {
          for (let c of e) Ud(c, t);
        };
    }, e);
  }
  function Wc(e) {
    if (PZ) {
      let l = PZ();
      return e || l;
    }
    let [t, c] = (0, Ne.useState)(e);
    return (
      ne(() => {
        if (e || t) return;
        let l = Math.random().toString(36).substr(2, 6);
        c(`id-${l}`);
      }, [e, t]),
      e || t
    );
  }
  function ka(e, t) {
    let c = (o) => {
        if (typeof o == "string") return o;
      },
      [l, n] = (0, Ne.useState)(() => c(t));
    return (
      ne(() => {
        let o = e && "current" in e ? e.current : e;
        n(o?.tagName.toLowerCase() || c(t));
      }, [e, t]),
      l
    );
  }
  function Vl(e, t) {
    let c = (0, Ne.useRef)(!1);
    (0, Ne.useEffect)(() => {
      if (c.current) return e();
      c.current = !0;
    }, t),
      (0, Ne.useEffect)(
        () => () => {
          c.current = !1;
        },
        []
      );
  }
  function eR() {
    return (0, Ne.useReducer)(() => [], []);
  }
  function Kt(e) {
    return j(typeof e == "function" ? e : () => e);
  }
  function ye(e, t, c = []) {
    let l = (0, Ne.useCallback)(
      (n) => (e.wrapElement && (n = e.wrapElement(n)), t(n)),
      [...c, e.wrapElement]
    );
    return w(J({}, e), { wrapElement: l });
  }
  function rr(e = !1, t) {
    let [c, l] = (0, Ne.useState)(null);
    return { portalRef: Fe(l, t), portalNode: c, domReady: !e || c };
  }
  function tR(e, t, c) {
    let l = e.onLoadedMetadataCapture,
      n = (0, Ne.useMemo)(
        () => Object.assign(() => {}, w(J({}, l), { [t]: c })),
        [l, t, c]
      );
    return [l?.[t], { onLoadedMetadataCapture: n }];
  }
  function wa() {
    return (
      (0, Ne.useEffect)(() => {
        Ye("mousemove", rh, !0),
          Ye("mousedown", Na, !0),
          Ye("mouseup", Na, !0),
          Ye("keydown", Na, !0),
          Ye("scroll", Na, !0);
      }, []),
      j(() => ax)
    );
  }
  var ax = !1,
    _Z = 0,
    qZ = 0;
  function oh(e) {
    let t = e.movementX || e.screenX - _Z,
      c = e.movementY || e.screenY - qZ;
    return (_Z = e.screenX), (qZ = e.screenY), t || c || !1;
  }
  function rh(e) {
    oh(e) && (ax = !0);
  }
  function Na() {
    ax = !1;
  }
  var wt = V(A(), 1),
    _n = V(M(), 1);
  function P(e) {
    let t = wt.forwardRef((c, l) => e(w(J({}, c), { ref: l })));
    return (t.displayName = e.displayName || e.name), t;
  }
  function Sa(e, t) {
    return wt.memo(e, t);
  }
  function q(e, t) {
    let c = t,
      { wrapElement: l, render: n } = c,
      o = _(c, ["wrapElement", "render"]),
      r = Fe(t.ref, UZ(n)),
      d;
    if (wt.isValidElement(n)) {
      let u = w(J({}, n.props), { ref: r });
      d = wt.cloneElement(n, MZ(o, u));
    } else n ? (d = n(o)) : (d = (0, _n.jsx)(e, J({}, o)));
    return l ? l(d) : d;
  }
  function ce(e) {
    let t = (c = {}) => e(c);
    return (t.displayName = e.name), t;
  }
  function qe(e = [], t = []) {
    let c = wt.createContext(void 0),
      l = wt.createContext(void 0),
      n = () => wt.useContext(c),
      o = (i = !1) => {
        let a = wt.useContext(l),
          s = n();
        return i ? a : a || s;
      },
      r = () => {
        let i = wt.useContext(l),
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
  var Kd = qe(),
    cR = Kd.useContext,
    cz = Kd.useScopedContext,
    lz = Kd.useProviderContext,
    lR = Kd.ContextProvider,
    nR = Kd.ScopedContextProvider;
  var sx = V(A(), 1),
    _d = qe([lR], [nR]),
    oR = _d.useContext,
    dz = _d.useScopedContext,
    rR = _d.useProviderContext,
    Hn = _d.ContextProvider,
    dr = _d.ScopedContextProvider,
    dR = (0, sx.createContext)(void 0),
    uR = (0, sx.createContext)(void 0);
  function ur(e, t) {
    let c = e.__unstableInternals;
    return Je(c, "Invalid store"), c[t];
  }
  function Me(e, ...t) {
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
      X = () => {
        let W = r.size,
          B = Symbol();
        r.add(B);
        let F = () => {
          r.delete(B), !r.size && o();
        };
        if (W) return F;
        let S = lx(c).map((Y) =>
            He(
              ...t.map((N) => {
                var C;
                let k = (C = N?.getState) == null ? void 0 : C.call(N);
                if (k && Tc(k, Y))
                  return he(N, [Y], (U) => {
                    I(Y, U[Y], !0);
                  });
              })
            )
          ),
          Q = [];
        for (let Y of u) Q.push(Y());
        let v = t.map(ir);
        return (o = He(...S, ...Q, ...v)), F;
      },
      p = (W, B, F = i) => (
        F.add(B),
        b.set(B, W),
        () => {
          var S;
          (S = s.get(B)) == null || S(), s.delete(B), b.delete(B), F.delete(B);
        }
      ),
      Z = (W, B) => p(W, B),
      x = (W, B) => (s.set(B, B(c, c)), p(W, B)),
      G = (W, B) => (s.set(B, B(c, l)), p(W, B, a)),
      g = (W) => Me(cx(c, W), y),
      R = (W) => Me(tx(c, W), y),
      f = () => c,
      I = (W, B, F = !1) => {
        var S;
        if (!Tc(c, W)) return;
        let Q = ex(B, c[W]);
        if (Q === c[W]) return;
        if (!F) for (let C of t) (S = C?.setState) == null || S.call(C, W, Q);
        let v = c;
        c = ge(te({}, c), { [W]: Q });
        let Y = Symbol();
        (n = Y), d.add(W);
        let N = (C, k, U) => {
          var h;
          let L = b.get(C),
            E = (pe) => (U ? U.has(pe) : pe === W);
          (!L || L.some(E)) &&
            ((h = s.get(C)) == null || h(), s.set(C, C(c, k)));
        };
        for (let C of i) N(C, v);
        queueMicrotask(() => {
          if (n !== Y) return;
          let C = c;
          for (let k of a) N(k, l, d);
          (l = C), d.clear();
        });
      },
      y = {
        getState: f,
        setState: I,
        __unstableInternals: {
          setup: m,
          init: X,
          subscribe: Z,
          sync: x,
          batch: G,
          pick: g,
          omit: R,
        },
      };
    return y;
  }
  function pt(e, ...t) {
    if (e) return ur(e, "setup")(...t);
  }
  function ir(e, ...t) {
    if (e) return ur(e, "init")(...t);
  }
  function qd(e, ...t) {
    if (e) return ur(e, "subscribe")(...t);
  }
  function he(e, ...t) {
    if (e) return ur(e, "sync")(...t);
  }
  function Zn(e, ...t) {
    if (e) return ur(e, "batch")(...t);
  }
  function Rn(e, ...t) {
    if (e) return ur(e, "omit")(...t);
  }
  function qn(...e) {
    let t = e.reduce((l, n) => {
      var o;
      let r = (o = n?.getState) == null ? void 0 : o.call(n);
      return r ? Object.assign(l, r) : l;
    }, {});
    return Me(t, ...e);
  }
  var $n = V(A(), 1),
    mR = V(bR(), 1),
    { useSyncExternalStore: Gh } = mR.default,
    ph = () => () => {};
  function oe(e, t = Dd) {
    let c = $n.useCallback((n) => (e ? qd(e, null, n) : ph()), [e]),
      l = () => {
        let n = typeof t == "string" ? t : null,
          o = typeof t == "function" ? t : null,
          r = e?.getState();
        if (o) return o(r);
        if (r && n && Tc(r, n)) return r[n];
      };
    return Gh(c, l, l);
  }
  function Ze(e, t, c, l) {
    let n = Tc(t, c) ? t[c] : void 0,
      o = l ? t[l] : void 0,
      r = za({ value: n, setValue: o });
    ne(
      () =>
        he(e, [c], (d, u) => {
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
  function _t(e, t) {
    let [c, l] = $n.useState(() => e(t));
    ne(() => ir(c), [c]);
    let n = $n.useCallback((d) => oe(c, d), [c]),
      o = $n.useMemo(() => w(J({}, c), { useState: n }), [c, n]),
      r = j(() => {
        l((d) => e(J(J({}, t), d.getState())));
      });
    return [o, r];
  }
  function gh(e, t) {
    return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
  }
  function Hh(e) {
    let t = e.map((l, n) => [n, l]),
      c = !1;
    return (
      t.sort(([l, n], [o, r]) => {
        let d = n.element,
          u = r.element;
        return d === u || !d || !u
          ? 0
          : gh(d, u)
            ? (l > o && (c = !0), -1)
            : (l < o && (c = !0), 1);
      }),
      c ? t.map(([l, n]) => n) : e
    );
  }
  function Zh(e) {
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
  function Rh(e) {
    return e?.__unstablePrivateStore;
  }
  function Qa(e = {}) {
    var t;
    e.store;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = K(e.items, c?.items, e.defaultItems, []),
      n = new Map(l.map((b) => [b.id, b])),
      o = { items: l, renderedItems: K(c?.renderedItems, []) },
      r = Rh(e.store),
      d = Me({ items: l, renderedItems: o.renderedItems }, r),
      u = Me(o, e.store),
      i = (b) => {
        let m = Hh(b);
        d.setState("renderedItems", m), u.setState("renderedItems", m);
      };
    pt(u, () => ir(d)),
      pt(d, () =>
        Zn(d, ["items"], (b) => {
          u.setState("items", b.items);
        })
      ),
      pt(d, () =>
        Zn(d, ["renderedItems"], (b) => {
          let m = !0,
            X = requestAnimationFrame(() => {
              let { renderedItems: G } = u.getState();
              b.renderedItems !== G && i(b.renderedItems);
            });
          if (typeof IntersectionObserver != "function")
            return () => cancelAnimationFrame(X);
          let p = () => {
              if (m) {
                m = !1;
                return;
              }
              cancelAnimationFrame(X),
                (X = requestAnimationFrame(() => i(b.renderedItems)));
            },
            Z = Zh(b.renderedItems),
            x = new IntersectionObserver(p, { root: Z });
          for (let G of b.renderedItems) G.element && x.observe(G.element);
          return () => {
            cancelAnimationFrame(X), x.disconnect();
          };
        })
      );
    let a = (b, m, X = !1) => {
        let p;
        return (
          m((x) => {
            let G = x.findIndex(({ id: R }) => R === b.id),
              g = x.slice();
            if (G !== -1) {
              p = x[G];
              let R = te(te({}, p), b);
              (g[G] = R), n.set(b.id, R);
            } else g.push(b), n.set(b.id, b);
            return g;
          }),
          () => {
            m((x) => {
              if (!p)
                return X && n.delete(b.id), x.filter(({ id: R }) => R !== b.id);
              let G = x.findIndex(({ id: R }) => R === b.id);
              if (G === -1) return x;
              let g = x.slice();
              return (g[G] = p), n.set(b.id, p), g;
            });
          }
        );
      },
      s = (b) => a(b, (m) => d.setState("items", m), !0);
    return ge(te({}, u), {
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
          let { items: X } = u.getState();
          (m = X.find((p) => p.id === b)), m && n.set(b, m);
        }
        return m || null;
      },
      __unstablePrivateStore: d,
    });
  }
  function XR(e, t, c) {
    return Vl(t, [c.store]), Ze(e, c, "items", "setItems"), e;
  }
  function $d(e) {
    let t = [];
    for (let c of e) t.push(...c);
    return t;
  }
  function sr(e) {
    return e.slice().reverse();
  }
  var fh = { id: null };
  function Cl(e, t) {
    return e.find((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function Ih(e, t) {
    return e.filter((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function xR(e, t) {
    return e.filter((c) => c.rowId === t);
  }
  function yh(e, t, c = !1) {
    let l = e.findIndex((n) => n.id === t);
    return [...e.slice(l + 1), ...(c ? [fh] : []), ...e.slice(0, l)];
  }
  function GR(e) {
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
  function pR(e) {
    let t = 0;
    for (let { length: c } of e) c > t && (t = c);
    return t;
  }
  function Wh(e) {
    return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
  }
  function Bh(e, t, c) {
    let l = pR(e);
    for (let n of e)
      for (let o = 0; o < l; o += 1) {
        let r = n[o];
        if (!r || (c && r.disabled)) {
          let u = o === 0 && c ? Cl(n) : n[o - 1];
          n[o] = u && t !== u.id && c ? u : Wh(u?.rowId);
        }
      }
    return e;
  }
  function vh(e) {
    let t = GR(e),
      c = pR(t),
      l = [];
    for (let n = 0; n < c; n += 1)
      for (let o of t) {
        let r = o[n];
        r && l.push(ge(te({}, r), { rowId: r.rowId ? `${n}` : void 0 }));
      }
    return l;
  }
  function gR(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = Qa(e),
      n = K(e.activeId, c?.activeId, e.defaultActiveId),
      o = ge(te({}, l.getState()), {
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
      r = Me(o, l, e.store);
    pt(r, () =>
      he(r, ["renderedItems", "activeId"], (u) => {
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
          activeId: X = b.activeId,
          focusShift: p = b.focusShift,
          focusLoop: Z = b.focusLoop,
          focusWrap: x = b.focusWrap,
          includesBaseElement: G = b.includesBaseElement,
          renderedItems: g = b.renderedItems,
          rtl: R = b.rtl,
        } = i,
        f = u === "up" || u === "down",
        I = u === "next" || u === "down",
        y = I ? R && !f : !R || f,
        W = p && !m,
        B = f ? $d(Bh(GR(g), X, W)) : g;
      if (((B = y ? sr(B) : B), (B = f ? vh(B) : B), X == null))
        return (a = Cl(B)) == null ? void 0 : a.id;
      let F = B.find((h) => h.id === X);
      if (!F) return (s = Cl(B)) == null ? void 0 : s.id;
      let S = B.some((h) => h.rowId),
        Q = B.indexOf(F),
        v = B.slice(Q + 1),
        Y = xR(v, F.rowId);
      if (m) {
        let h = Ih(Y, X),
          L = h.slice(m)[0] || h[h.length - 1];
        return L?.id;
      }
      let N = Z && (f ? Z !== "horizontal" : Z !== "vertical"),
        C = S && x && (f ? x !== "horizontal" : x !== "vertical"),
        k = I ? (!S || f) && N && G : f ? G : !1;
      if (N) {
        let h = C && !k ? B : xR(B, F.rowId),
          L = yh(h, X, k),
          E = Cl(L, X);
        return E?.id;
      }
      if (C) {
        let h = Cl(k ? Y : v, X);
        return k ? h?.id || null : h?.id;
      }
      let U = Cl(Y, X);
      return !U && k ? null : U?.id;
    };
    return ge(te(te({}, l), r), {
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
        return (u = Cl(sr(r.getState().renderedItems))) == null ? void 0 : u.id;
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
  function HR(e, t, c) {
    return (
      (e = XR(e, t, c)),
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
  function eu(e = {}) {
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
      r = Me(o, t);
    return (
      pt(r, () =>
        he(r, ["animated", "animating"], (d) => {
          d.animated || r.setState("animating", !1);
        })
      ),
      pt(r, () =>
        qd(r, ["open"], () => {
          r.getState().animated && r.setState("animating", !0);
        })
      ),
      pt(r, () =>
        he(r, ["open", "animating"], (d) => {
          r.setState("mounted", d.open || d.animating);
        })
      ),
      ge(te({}, r), {
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
  function Xx(e, t, c) {
    return (
      Vl(t, [c.store, c.disclosure]),
      Ze(e, c, "open", "setOpen"),
      Ze(e, c, "mounted", "setMounted"),
      Ze(e, c, "animated"),
      Object.assign(e, { disclosure: c.disclosure })
    );
  }
  function Oa(e = {}) {
    let [t, c] = _t(eu, e);
    return Xx(t, c, e);
  }
  function tu(e = {}) {
    return eu(e);
  }
  function xx(e, t, c) {
    return Xx(e, t, c);
  }
  function ZR(e = {}) {
    let [t, c] = _t(tu, e);
    return xx(t, c, e);
  }
  function RR(e = {}) {
    var t = e,
      { popover: c } = t,
      l = Va(t, ["popover"]);
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
      r = tu(ge(te({}, l), { store: n })),
      d = K(l.placement, o?.placement, "bottom"),
      u = ge(te({}, r.getState()), {
        placement: d,
        currentPlacement: d,
        anchorElement: K(o?.anchorElement, null),
        popoverElement: K(o?.popoverElement, null),
        arrowElement: K(o?.arrowElement, null),
        rendered: Symbol("rendered"),
      }),
      i = Me(u, r, n);
    return ge(te(te({}, r), i), {
      setAnchorElement: (a) => i.setState("anchorElement", a),
      setPopoverElement: (a) => i.setState("popoverElement", a),
      setArrowElement: (a) => i.setState("arrowElement", a),
      render: () => i.setState("rendered", Symbol("rendered")),
    });
  }
  function fR(e, t, c) {
    return Vl(t, [c.popover]), Ze(e, c, "placement"), xx(e, t, c);
  }
  var cu = qe(),
    ak = cu.useContext,
    sk = cu.useScopedContext,
    Gx = cu.useProviderContext,
    IR = cu.ContextProvider,
    yR = cu.ScopedContextProvider;
  var px = V(A(), 1),
    lu = qe([IR], [yR]),
    xk = lu.useContext,
    Gk = lu.useScopedContext,
    Aa = lu.useProviderContext,
    WR = lu.ContextProvider,
    br = lu.ScopedContextProvider,
    BR = (0, px.createContext)(void 0),
    vR = (0, px.createContext)(void 0);
  var nu = qe([WR], [br]),
    Zk = nu.useContext,
    Rk = nu.useScopedContext,
    gx = nu.useProviderContext,
    mr = nu.ContextProvider,
    fn = nu.ScopedContextProvider;
  var La = V(A(), 1),
    Bk = (0, La.createContext)(void 0),
    ou = qe([mr, Hn], [fn, dr]),
    FR = ou.useContext,
    vk = ou.useScopedContext,
    Fk = ou.useProviderContext,
    hk = ou.ContextProvider,
    Vk = ou.ScopedContextProvider,
    Ck = (0, La.createContext)(void 0),
    Jk = (0, La.createContext)(!1);
  function hR(e, t) {
    return e.find((c) => (t ? !c.disabled && c.id !== t : !c.disabled));
  }
  function rl(e, t) {
    return (t && e.item(t)) || null;
  }
  function VR(e) {
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
  function CR(e, t = !1) {
    if (sc(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
    else if (e.isContentEditable) {
      let c = ue(e).getSelection();
      c?.selectAllChildren(e), t && c?.collapseToEnd();
    }
  }
  var Hx = Symbol("FOCUS_SILENTLY");
  function JR(e) {
    (e[Hx] = !0), e.focus({ preventScroll: !0 });
  }
  function YR(e) {
    let t = e[Hx];
    return delete e[Hx], t;
  }
  function eo(e, t, c) {
    if (!t || t === c) return !1;
    let l = e.item(t.id);
    return !(!l || (c && l.element === c));
  }
  var NR = V(A(), 1),
    Ta = (0, NR.createContext)(!0);
  var Da =
    "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
  function Vh(e) {
    return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
  }
  function bc(e) {
    return !(!e.matches(Da) || !jd(e) || e.closest("[inert]"));
  }
  function Xr(e) {
    if (!bc(e) || Vh(e)) return !1;
    if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
    let t = e.form.elements.namedItem(e.name);
    if (!t || !("length" in t)) return !0;
    let c = ac(e);
    return (
      !c || c === e || !("form" in c) || c.form !== e.form || c.name !== e.name
    );
  }
  function Zx(e, t) {
    let c = Array.from(e.querySelectorAll(Da));
    t && c.unshift(e);
    let l = c.filter(bc);
    return (
      l.forEach((n, o) => {
        if (Ed(n) && n.contentDocument) {
          let r = n.contentDocument.body;
          l.splice(o, 1, ...Zx(r));
        }
      }),
      l
    );
  }
  function to(e, t, c) {
    let l = Array.from(e.querySelectorAll(Da)),
      n = l.filter(Xr);
    return (
      t && Xr(e) && n.unshift(e),
      n.forEach((o, r) => {
        if (Ed(o) && o.contentDocument) {
          let d = o.contentDocument.body,
            u = to(d, !1, c);
          n.splice(r, 1, ...u);
        }
      }),
      !n.length && c ? l : n
    );
  }
  function zR(e, t, c) {
    let [l] = to(e, t, c);
    return l || null;
  }
  function Ch(e, t, c, l) {
    let n = ac(e),
      o = Zx(e, t),
      r = o.indexOf(n),
      d = o.slice(r + 1);
    return d.find(Xr) || (c ? o.find(Xr) : null) || (l ? d[0] : null) || null;
  }
  function Ua(e, t) {
    return Ch(document.body, !1, e, t);
  }
  function Jh(e, t, c, l) {
    let n = ac(e),
      o = Zx(e, t).reverse(),
      r = o.indexOf(n),
      d = o.slice(r + 1);
    return d.find(Xr) || (c ? o.find(Xr) : null) || (l ? d[0] : null) || null;
  }
  function Rx(e, t) {
    return Jh(document.body, !1, e, t);
  }
  function kR(e) {
    for (; e && !bc(e); ) e = e.closest(Da);
    return e || null;
  }
  function ru(e) {
    let t = ac(e);
    if (!t) return !1;
    if (t === e) return !0;
    let c = t.getAttribute("aria-activedescendant");
    return c ? c === e.id : !1;
  }
  function fx(e) {
    let t = ac(e);
    if (!t) return !1;
    if (Xe(e, t)) return !0;
    let c = t.getAttribute("aria-activedescendant");
    return !c || !("id" in e)
      ? !1
      : c === e.id
        ? !0
        : !!e.querySelector(`#${CSS.escape(c)}`);
  }
  function Ma(e) {
    !fx(e) && bc(e) && e.focus();
  }
  function Yh(e) {
    var t;
    let c = (t = e.getAttribute("tabindex")) != null ? t : "";
    e.setAttribute("data-tabindex", c), e.setAttribute("tabindex", "-1");
  }
  function wR(e, t) {
    let c = to(e, t);
    for (let l of c) Yh(l);
  }
  function SR(e) {
    let t = e.querySelectorAll("[data-tabindex]"),
      c = (l) => {
        let n = l.getAttribute("data-tabindex");
        l.removeAttribute("data-tabindex"),
          n ? l.setAttribute("tabindex", n) : l.removeAttribute("tabindex");
      };
    e.hasAttribute("data-tabindex") && c(e);
    for (let l of t) c(l);
  }
  function QR(e, t) {
    "scrollIntoView" in e
      ? (e.focus({ preventScroll: !0 }),
        e.scrollIntoView(te({ block: "nearest", inline: "nearest" }, t)))
      : e.focus();
  }
  var mc = V(A(), 1),
    Nh = "div",
    OR = Pn(),
    zh = [
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
    TR = Symbol("safariFocusAncestor");
  function DR(e) {
    return e ? !!e[TR] : !1;
  }
  function AR(e, t) {
    e && (e[TR] = t);
  }
  function kh(e) {
    let { tagName: t, readOnly: c, type: l } = e;
    return (t === "TEXTAREA" && !c) || (t === "SELECT" && !c)
      ? !0
      : t === "INPUT" && !c
        ? zh.includes(l)
        : !!(
            e.isContentEditable ||
            (e.getAttribute("role") === "combobox" && e.dataset.name)
          );
  }
  function wh(e) {
    return "labels" in e ? e.labels : null;
  }
  function LR(e) {
    return e.tagName.toLowerCase() === "input" && e.type
      ? e.type === "radio" || e.type === "checkbox"
      : !1;
  }
  function Sh(e) {
    return e
      ? e === "button" ||
          e === "summary" ||
          e === "input" ||
          e === "select" ||
          e === "textarea" ||
          e === "a"
      : !0;
  }
  function Qh(e) {
    return e
      ? e === "button" || e === "input" || e === "select" || e === "textarea"
      : !0;
  }
  function Oh(e, t, c, l, n) {
    return e ? (t ? (c && !l ? -1 : void 0) : c ? n : n || 0) : n;
  }
  function Ix(e, t) {
    return j((c) => {
      e?.(c),
        !c.defaultPrevented && t && (c.stopPropagation(), c.preventDefault());
    });
  }
  var yx = !0;
  function Ah(e) {
    let t = e.target;
    t &&
      "hasAttribute" in t &&
      (t.hasAttribute("data-focus-visible") || (yx = !1));
  }
  function Lh(e) {
    e.metaKey || e.ctrlKey || e.altKey || (yx = !0);
  }
  var Uc = ce(function (t) {
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
      let u = (0, mc.useRef)(null);
      (0, mc.useEffect)(() => {
        l && (Ye("mousedown", Ah, !0), Ye("keydown", Lh, !0));
      }, [l]),
        OR &&
          (0, mc.useEffect)(() => {
            if (!l) return;
            let C = u.current;
            if (!C || !LR(C)) return;
            let k = wh(C);
            if (!k) return;
            let U = () => queueMicrotask(() => C.focus());
            for (let h of k) h.addEventListener("mouseup", U);
            return () => {
              for (let h of k) h.removeEventListener("mouseup", U);
            };
          }, [l]);
      let i = l && Dc(d),
        a = !!i && !n,
        [s, b] = (0, mc.useState)(!1);
      (0, mc.useEffect)(() => {
        l && a && s && b(!1);
      }, [l, a, s]),
        (0, mc.useEffect)(() => {
          if (!l || !s) return;
          let C = u.current;
          if (!C || typeof IntersectionObserver > "u") return;
          let k = new IntersectionObserver(() => {
            bc(C) || b(!1);
          });
          return k.observe(C), () => k.disconnect();
        }, [l, s]);
      let m = Ix(d.onKeyPressCapture, i),
        X = Ix(d.onMouseDownCapture, i),
        p = Ix(d.onClickCapture, i),
        Z = d.onMouseDown,
        x = j((C) => {
          if ((Z?.(C), C.defaultPrevented || !l)) return;
          let k = C.currentTarget;
          if (!OR || Ya(C) || (!yc(k) && !LR(k))) return;
          let U = !1,
            h = () => {
              U = !0;
            },
            L = { capture: !0, once: !0 };
          k.addEventListener("focusin", h, L);
          let E = kR(k.parentElement);
          AR(E, !0),
            gn(k, "mouseup", () => {
              k.removeEventListener("focusin", h, !0), AR(E, !1), !U && Ma(k);
            });
        }),
        G = (C, k) => {
          if ((k && (C.currentTarget = k), !l)) return;
          let U = C.currentTarget;
          U &&
            ru(U) &&
            (r?.(C),
            !C.defaultPrevented && ((U.dataset.focusVisible = "true"), b(!0)));
        },
        g = d.onKeyDownCapture,
        R = j((C) => {
          if (
            (g?.(C),
            C.defaultPrevented ||
              !l ||
              s ||
              C.metaKey ||
              C.altKey ||
              C.ctrlKey ||
              !ht(C))
          )
            return;
          let k = C.currentTarget;
          gn(k, "focusout", () => G(C, k));
        }),
        f = d.onFocusCapture,
        I = j((C) => {
          if ((f?.(C), C.defaultPrevented || !l)) return;
          if (!ht(C)) {
            b(!1);
            return;
          }
          let k = C.currentTarget,
            U = () => G(C, k);
          yx || kh(C.target) ? gn(C.target, "focusout", U) : b(!1);
        }),
        y = d.onBlur,
        W = j((C) => {
          y?.(C), l && pn(C) && b(!1);
        }),
        B = (0, mc.useContext)(Ta),
        F = j((C) => {
          l &&
            o &&
            C &&
            B &&
            queueMicrotask(() => {
              ru(C) || (bc(C) && C.focus());
            });
        }),
        S = ka(u),
        Q = l && Sh(S),
        v = l && Qh(S),
        Y = d.style,
        N = (0, mc.useMemo)(
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
            ref: Fe(u, F, d.ref),
            style: N,
            tabIndex: Oh(l, a, Q, v, d.tabIndex),
            disabled: v && a ? !0 : void 0,
            contentEditable: i ? void 0 : d.contentEditable,
            onKeyPressCapture: m,
            onClickCapture: p,
            onMouseDownCapture: X,
            onMouseDown: x,
            onKeyDownCapture: R,
            onFocusCapture: I,
            onBlur: W,
          }
        )),
        Fl(d)
      );
    }),
    _k = P(function (t) {
      let c = Uc(t);
      return q(Nh, c);
    });
  var dl = V(A(), 1),
    MR = V(M(), 1),
    Th = "div";
  function Dh(e) {
    return e.some((t) => !!t.rowId);
  }
  function Uh(e) {
    let t = e.target;
    return t && !sc(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
  }
  function Mh(e) {
    return (
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta"
    );
  }
  function UR(e, t, c) {
    return j((l) => {
      var n;
      if (
        (t?.(l),
        l.defaultPrevented ||
          l.isPropagationStopped() ||
          !ht(l) ||
          Mh(l) ||
          Uh(l))
      )
        return;
      let o = e.getState(),
        r = (n = rl(e, o.activeId)) == null ? void 0 : n.element;
      if (!r) return;
      let d = l,
        { view: u } = d,
        i = _(d, ["view"]),
        a = c?.current;
      r !== a && r.focus(),
        jZ(r, l.type, i) || l.preventDefault(),
        l.currentTarget.contains(r) && l.stopPropagation();
    });
  }
  function Eh(e) {
    return hR($d(sr(VR(e))));
  }
  function jh(e) {
    let [t, c] = (0, dl.useState)(!1),
      l = (0, dl.useCallback)(() => c(!0), []),
      n = e.useState((o) => rl(e, o.activeId));
    return (
      (0, dl.useEffect)(() => {
        let o = n?.element;
        t && o && (c(!1), o.focus({ preventScroll: !0 }));
      }, [n, t]),
      l
    );
  }
  var Wx = ce(function (t) {
      var c = t,
        {
          store: l,
          composite: n = !0,
          focusOnMove: o = n,
          moveOnKeyPress: r = !0,
        } = c,
        d = _(c, ["store", "composite", "focusOnMove", "moveOnKeyPress"]);
      let u = rR();
      (l = l || u), Je(l, !1);
      let i = (0, dl.useRef)(null),
        a = (0, dl.useRef)(null),
        s = jh(l),
        b = l.useState("moves"),
        [, m] = $Z(n ? l.setBaseElement : null);
      (0, dl.useEffect)(() => {
        var v;
        if (!l || !b || !n || !o) return;
        let { activeId: Y } = l.getState(),
          N = (v = rl(l, Y)) == null ? void 0 : v.element;
        N && QR(N);
      }, [l, b, n, o]),
        ne(() => {
          if (!l || !b || !n) return;
          let { baseElement: v, activeId: Y } = l.getState();
          if (!(Y === null) || !v) return;
          let C = a.current;
          (a.current = null),
            C && Kn(C, { relatedTarget: v }),
            ru(v) || v.focus();
        }, [l, b, n]);
      let X = l.useState("activeId"),
        p = l.useState("virtualFocus");
      ne(() => {
        var v;
        if (!l || !n || !p) return;
        let Y = a.current;
        if (((a.current = null), !Y)) return;
        let C = ((v = rl(l, X)) == null ? void 0 : v.element) || ac(Y);
        C !== Y && Kn(Y, { relatedTarget: C });
      }, [l, X, p, n]);
      let Z = UR(l, d.onKeyDownCapture, a),
        x = UR(l, d.onKeyUpCapture, a),
        G = d.onFocusCapture,
        g = j((v) => {
          if ((G?.(v), v.defaultPrevented || !l)) return;
          let { virtualFocus: Y } = l.getState();
          if (!Y) return;
          let N = v.relatedTarget,
            C = YR(v.currentTarget);
          ht(v) && C && (v.stopPropagation(), (a.current = N));
        }),
        R = d.onFocus,
        f = j((v) => {
          if ((R?.(v), v.defaultPrevented || !n || !l)) return;
          let { relatedTarget: Y } = v,
            { virtualFocus: N } = l.getState();
          N
            ? ht(v) && !eo(l, Y) && queueMicrotask(s)
            : ht(v) && l.setActiveId(null);
        }),
        I = d.onBlurCapture,
        y = j((v) => {
          var Y;
          if ((I?.(v), v.defaultPrevented || !l)) return;
          let { virtualFocus: N, activeId: C } = l.getState();
          if (!N) return;
          let k = (Y = rl(l, C)) == null ? void 0 : Y.element,
            U = v.relatedTarget,
            h = eo(l, U),
            L = a.current;
          (a.current = null),
            ht(v) && h
              ? (U === k
                  ? L && L !== U && Kn(L, v)
                  : k
                    ? Kn(k, v)
                    : L && Kn(L, v),
                v.stopPropagation())
              : !eo(l, v.target) && k && Kn(k, v);
        }),
        W = d.onKeyDown,
        B = Kt(r),
        F = j((v) => {
          var Y;
          if ((W?.(v), v.defaultPrevented || !l || !ht(v))) return;
          let {
              orientation: N,
              items: C,
              renderedItems: k,
              activeId: U,
            } = l.getState(),
            h = rl(l, U);
          if ((Y = h?.element) != null && Y.isConnected) return;
          let L = N !== "horizontal",
            E = N !== "vertical",
            pe = Dh(k);
          if (
            (v.key === "ArrowLeft" ||
              v.key === "ArrowRight" ||
              v.key === "Home" ||
              v.key === "End") &&
            sc(v.currentTarget)
          )
            return;
          let tc = {
            ArrowUp:
              (pe || L) &&
              (() => {
                if (pe) {
                  let st = C && Eh(C);
                  return st?.id;
                }
                return l?.last();
              }),
            ArrowRight: (pe || E) && l.first,
            ArrowDown: (pe || L) && l.first,
            ArrowLeft: (pe || E) && l.last,
            Home: l.first,
            End: l.last,
            PageUp: l.first,
            PageDown: l.last,
          }[v.key];
          if (tc) {
            let st = tc();
            if (st !== void 0) {
              if (!B(v)) return;
              v.preventDefault(), l.move(st);
            }
          }
        });
      d = ye(d, (v) => (0, MR.jsx)(Hn, { value: l, children: v }), [l]);
      let S = l.useState((v) => {
        var Y;
        if (l && n && v.virtualFocus)
          return (Y = rl(l, v.activeId)) == null ? void 0 : Y.id;
      });
      d = w(J({ "aria-activedescendant": S }, d), {
        ref: Fe(i, m, d.ref),
        onKeyDownCapture: Z,
        onKeyUpCapture: x,
        onFocusCapture: g,
        onFocus: f,
        onBlurCapture: y,
        onKeyDown: F,
      });
      let Q = l.useState((v) => n && (v.virtualFocus || v.activeId === null));
      return (d = Uc(J({ focusable: Q }, d))), d;
    }),
    Xw = P(function (t) {
      let c = Wx(t);
      return q(Th, c);
    });
  var In = V(A(), 1),
    Ph = "button";
  function ER(e) {
    if (!e.isTrusted) return !1;
    let t = e.currentTarget;
    return e.key === "Enter"
      ? yc(t) || t.tagName === "SUMMARY" || t.tagName === "A"
      : e.key === " "
        ? yc(t) ||
          t.tagName === "SUMMARY" ||
          t.tagName === "INPUT" ||
          t.tagName === "SELECT"
        : !1;
  }
  var Kh = Symbol("command"),
    Bx = ce(function (t) {
      var c = t,
        { clickOnEnter: l = !0, clickOnSpace: n = !0 } = c,
        o = _(c, ["clickOnEnter", "clickOnSpace"]);
      let r = (0, In.useRef)(null),
        d = ka(r),
        u = o.type,
        [i, a] = (0, In.useState)(() => !!d && yc({ tagName: d, type: u }));
      (0, In.useEffect)(() => {
        r.current && a(yc(r.current));
      }, []);
      let [s, b] = (0, In.useState)(!1),
        m = (0, In.useRef)(!1),
        X = Dc(o),
        [p, Z] = tR(o, Kh, !0),
        x = o.onKeyDown,
        G = j((f) => {
          x?.(f);
          let I = f.currentTarget;
          if (
            f.defaultPrevented ||
            p ||
            X ||
            !ht(f) ||
            sc(I) ||
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
            let S = ER(f);
            if (y) {
              if (!S) {
                f.preventDefault();
                let Q = f,
                  { view: v } = Q,
                  Y = _(Q, ["view"]),
                  N = () => ux(I, Y);
                rx() ? gn(I, "keyup", N) : queueMicrotask(N);
              }
            } else W && ((m.current = !0), S || (f.preventDefault(), b(!0)));
          }
        }),
        g = o.onKeyUp,
        R = j((f) => {
          if ((g?.(f), f.defaultPrevented || p || X || f.metaKey)) return;
          let I = n && f.key === " ";
          if (m.current && I && ((m.current = !1), !ER(f))) {
            f.preventDefault(), b(!1);
            let y = f.currentTarget,
              W = f,
              { view: B } = W,
              F = _(W, ["view"]);
            queueMicrotask(() => ux(y, F));
          }
        });
      return (
        (o = w(
          J(
            J({ "data-active": s || void 0, "type": i ? "button" : void 0 }, Z),
            o
          ),
          { ref: Fe(r, o.ref), onKeyDown: G, onKeyUp: R }
        )),
        (o = Uc(o)),
        o
      );
    }),
    yw = P(function (t) {
      let c = Bx(t);
      return q(Ph, c);
    });
  var Ea = V(A(), 1),
    _h = "div",
    du = ce(function (t) {
      var c = t,
        {
          store: l,
          shouldRegisterItem: n = !0,
          getItem: o = Dd,
          element: r,
        } = c,
        d = _(c, ["store", "shouldRegisterItem", "getItem", "element"]);
      let u = cR();
      l = l || u;
      let i = Wc(d.id),
        a = (0, Ea.useRef)(r);
      return (
        (0, Ea.useEffect)(() => {
          let s = a.current;
          if (!i || !s || !n) return;
          let b = o({ id: i, element: s });
          return l?.renderItem(b);
        }, [i, n, o, l]),
        (d = w(J({}, d), { ref: Fe(a, d.ref) })),
        Fl(d)
      );
    }),
    Cw = P(function (t) {
      let c = du(t);
      return q(_h, c);
    });
  var Jl = V(A(), 1),
    PR = V(M(), 1),
    qh = "button";
  function $h(e) {
    return Pd(e) ? !0 : e.tagName === "INPUT" && !yc(e);
  }
  function e1(e, t = !1) {
    let c = e.clientHeight,
      { top: l } = e.getBoundingClientRect(),
      n = Math.max(c * 0.875, c - 40) * 1.5,
      o = t ? c - n + l : n + l;
    return e.tagName === "HTML" ? o + e.scrollTop : o;
  }
  function t1(e, t = !1) {
    let { top: c } = e.getBoundingClientRect();
    return t ? c + e.clientHeight : c;
  }
  function jR(e, t, c, l = !1) {
    var n;
    if (!t || !c) return;
    let { renderedItems: o } = t.getState(),
      r = Ca(e);
    if (!r) return;
    let d = e1(r, l),
      u,
      i;
    for (let a = 0; a < o.length; a += 1) {
      let s = u;
      if (((u = c(a)), !u)) break;
      if (u === s) continue;
      let b = (n = rl(t, u)) == null ? void 0 : n.element;
      if (!b) continue;
      let X = t1(b, l) - d,
        p = Math.abs(X);
      if ((l && X <= 0) || (!l && X >= 0)) {
        i !== void 0 && i < p && (u = s);
        break;
      }
      i = p;
    }
    return u;
  }
  function c1(e, t) {
    return ht(e) ? !1 : eo(t, e.target);
  }
  var vx = ce(function (t) {
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
      let b = oR();
      l = l || b;
      let m = Wc(s.id),
        X = (0, Jl.useRef)(null),
        p = (0, Jl.useContext)(uR),
        Z = oe(l, (h) => {
          if (n) return n;
          if (h && p?.baseElement && p.baseElement === h.baseElement)
            return p.id;
        }),
        G = Dc(s) && !s.accessibleWhenDisabled,
        g = (0, Jl.useCallback)(
          (h) => {
            let L = w(J({}, h), { id: m || h.id, rowId: Z, disabled: !!G });
            return u ? u(L) : L;
          },
          [m, Z, G, u]
        ),
        R = s.onFocus,
        f = (0, Jl.useRef)(!1),
        I = j((h) => {
          if ((R?.(h), h.defaultPrevented || Ya(h) || !m || !l || c1(h, l)))
            return;
          let { virtualFocus: L, baseElement: E } = l.getState();
          if (
            (l.setActiveId(m),
            Pd(h.currentTarget) && CR(h.currentTarget),
            !L || !ht(h) || $h(h.currentTarget) || !E?.isConnected)
          )
            return;
          Pn() &&
            h.currentTarget.hasAttribute("data-autofocus") &&
            h.currentTarget.scrollIntoView({
              block: "nearest",
              inline: "nearest",
            }),
            (f.current = !0),
            h.relatedTarget === E || eo(l, h.relatedTarget) ? JR(E) : E.focus();
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
        F = Kt(o),
        S = Kt(r),
        Q = j((h) => {
          if ((B?.(h), h.defaultPrevented || !ht(h) || !l)) return;
          let { currentTarget: L } = h,
            E = l.getState(),
            pe = l.item(m),
            Oe = !!pe?.rowId,
            Ve = E.orientation !== "horizontal",
            Te = E.orientation !== "vertical",
            tc = () => !!(Oe || Te || !E.baseElement || !sc(E.baseElement)),
            lt = {
              ArrowUp: (Oe || Ve) && l.up,
              ArrowRight: (Oe || Te) && l.next,
              ArrowDown: (Oe || Ve) && l.down,
              ArrowLeft: (Oe || Te) && l.previous,
              Home: () => {
                if (tc())
                  return !Oe || h.ctrlKey ? l?.first() : l?.previous(-1);
              },
              End: () => {
                if (tc()) return !Oe || h.ctrlKey ? l?.last() : l?.next(-1);
              },
              PageUp: () => jR(L, l, l?.up, !0),
              PageDown: () => jR(L, l, l?.down),
            }[h.key];
          if (lt) {
            if (Pd(L)) {
              let bt = ox(L),
                Tl = Te && h.key === "ArrowLeft",
                Dl = Te && h.key === "ArrowRight",
                ee = Ve && h.key === "ArrowUp",
                De = Ve && h.key === "ArrowDown";
              if (Dl || De) {
                let { length: cc } = nx(L);
                if (bt.end !== cc) return;
              } else if ((Tl || ee) && bt.start !== 0) return;
            }
            let Gc = lt();
            if (F(h) || Gc !== void 0) {
              if (!S(h)) return;
              h.preventDefault(), l.move(Gc);
            }
          }
        }),
        v = oe(l, (h) => h?.baseElement || void 0),
        Y = (0, Jl.useMemo)(() => ({ id: m, baseElement: v }), [m, v]);
      s = ye(s, (h) => (0, PR.jsx)(dR.Provider, { value: Y, children: h }), [
        Y,
      ]);
      let N = oe(l, (h) => !!h && h.activeId === m),
        C = oe(l, (h) => {
          if (i != null) return i;
          if (h && p?.ariaSetSize && p.baseElement === h.baseElement)
            return p.ariaSetSize;
        }),
        k = oe(l, (h) => {
          if (a != null) return a;
          if (!h || !p?.ariaPosInSet || p.baseElement !== h.baseElement) return;
          let L = h.renderedItems.filter((E) => E.rowId === Z);
          return p.ariaPosInSet + L.findIndex((E) => E.id === m);
        }),
        U = oe(l, (h) => {
          var L;
          if (!h?.renderedItems.length) return !0;
          if (h.virtualFocus) return !1;
          if (d) return !0;
          if (h.activeId === null) return !1;
          let E = l?.item(h.activeId);
          return E?.disabled || !((L = E?.element) != null && L.isConnected)
            ? !0
            : h.activeId === m;
        });
      return (
        (s = w(J({ "id": m, "data-active-item": N || void 0 }, s), {
          ref: Fe(X, s.ref),
          tabIndex: U ? s.tabIndex : -1,
          onFocus: I,
          onBlurCapture: W,
          onKeyDown: Q,
        })),
        (s = Bx(s)),
        (s = du(
          w(J({ store: l }, s), {
            getItem: g,
            shouldRegisterItem: m ? s.shouldRegisterItem : !1,
          })
        )),
        Fl(w(J({}, s), { "aria-setsize": C, "aria-posinset": k }))
      );
    }),
    Fx = Sa(
      P(function (t) {
        let c = vx(t);
        return q(qh, c);
      })
    );
  var xr = V(A(), 1),
    qR = V(er(), 1),
    hx = V(M(), 1),
    l1 = "div";
  function KR(e, t) {
    let c = setTimeout(t, e);
    return () => clearTimeout(c);
  }
  function n1(e) {
    let t = requestAnimationFrame(() => {
      t = requestAnimationFrame(e);
    });
    return () => cancelAnimationFrame(t);
  }
  function _R(...e) {
    return e
      .join(", ")
      .split(", ")
      .reduce((t, c) => {
        let l = c.endsWith("ms") ? 1 : 1e3,
          n = Number.parseFloat(c || "0s") * l;
        return n > t ? n : t;
      }, 0);
  }
  function Vx(e, t, c) {
    return !c && t !== !1 && (!e || !!t);
  }
  var co = ce(function (t) {
      var c = t,
        { store: l, alwaysVisible: n } = c,
        o = _(c, ["store", "alwaysVisible"]);
      let r = Gx();
      (l = l || r), Je(l, !1);
      let d = (0, xr.useRef)(null),
        u = Wc(o.id),
        [i, a] = (0, xr.useState)(null),
        s = l.useState("open"),
        b = l.useState("mounted"),
        m = l.useState("animated"),
        X = l.useState("contentElement"),
        p = oe(l.disclosure, "contentElement");
      ne(() => {
        d.current && l?.setContentElement(d.current);
      }, [l]),
        ne(() => {
          let g;
          return (
            l?.setState("animated", (R) => ((g = R), !0)),
            () => {
              g !== void 0 && l?.setState("animated", g);
            }
          );
        }, [l]),
        ne(() => {
          if (m) {
            if (!X?.isConnected) {
              a(null);
              return;
            }
            return n1(() => {
              a(s ? "enter" : b ? "leave" : null);
            });
          }
        }, [m, X, s, b]),
        ne(() => {
          if (!l || !m || !i || !X) return;
          let g = () => l?.setState("animating", !1),
            R = () => (0, qR.flushSync)(g);
          if ((i === "leave" && s) || (i === "enter" && !s)) return;
          if (typeof m == "number") return KR(m, R);
          let {
              transitionDuration: f,
              animationDuration: I,
              transitionDelay: y,
              animationDelay: W,
            } = getComputedStyle(X),
            {
              transitionDuration: B = "0",
              animationDuration: F = "0",
              transitionDelay: S = "0",
              animationDelay: Q = "0",
            } = p ? getComputedStyle(p) : {},
            v = _R(y, W, S, Q),
            Y = _R(f, I, B, F),
            N = v + Y;
          if (!N) {
            i === "enter" && l.setState("animated", !1), g();
            return;
          }
          let C = 1e3 / 60,
            k = Math.max(N - C, 0);
          return KR(k, R);
        }, [l, m, X, p, s, i]),
        (o = ye(o, (g) => (0, hx.jsx)(br, { value: l, children: g }), [l]));
      let Z = Vx(b, o.hidden, n),
        x = o.style,
        G = (0, xr.useMemo)(
          () => (Z ? w(J({}, x), { display: "none" }) : x),
          [Z, x]
        );
      return (
        (o = w(
          J(
            {
              "id": u,
              "data-open": s || void 0,
              "data-enter": i === "enter" || void 0,
              "data-leave": i === "leave" || void 0,
              "hidden": Z,
            },
            o
          ),
          { ref: Fe(u ? l.setContentElement : null, d, o.ref), style: G }
        )),
        Fl(o)
      );
    }),
    o1 = P(function (t) {
      let c = co(t);
      return q(l1, c);
    }),
    $w = P(function (t) {
      var c = t,
        { unmountOnHide: l } = c,
        n = _(c, ["unmountOnHide"]);
      let o = Gx(),
        r = n.store || o;
      return oe(r, (u) => !l || u?.mounted) === !1
        ? null
        : (0, hx.jsx)(o1, J({}, n));
    });
  function ja(e, ...t) {
    if (!e) return !1;
    let c = e.getAttribute("data-backdrop");
    return c == null
      ? !1
      : c === "" || c === "true" || !t.length
        ? !0
        : t.some((l) => c === l);
  }
  var Cx = new WeakMap();
  function Gr(e, t, c) {
    Cx.has(e) || Cx.set(e, new Map());
    let l = Cx.get(e),
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
  function uu(e, t, c) {
    return Gr(e, t, () => {
      let n = e.getAttribute(t);
      return (
        e.setAttribute(t, c),
        () => {
          n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
        }
      );
    });
  }
  function ul(e, t, c) {
    return Gr(e, t, () => {
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
  function iu(e, t) {
    return e
      ? Gr(e, "style", () => {
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
  function $R(e, t, c) {
    return e
      ? Gr(e, t, () => {
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
  var r1 = ["SCRIPT", "STYLE"];
  function Jx(e) {
    return `__ariakit-dialog-snapshot-${e}`;
  }
  function d1(e, t) {
    let c = ue(t),
      l = Jx(e);
    if (!c.body[l]) return !0;
    do {
      if (t === c.body) return !1;
      if (t[l]) return !0;
      if (!t.parentElement) return !1;
      t = t.parentElement;
    } while (!0);
  }
  function u1(e, t, c) {
    return r1.includes(t.tagName) || !d1(e, t)
      ? !1
      : !c.some((l) => l && Xe(t, l));
  }
  function au(e, t, c, l) {
    for (let n of t) {
      if (!n?.isConnected) continue;
      let o = t.some((u) => (!u || u === n ? !1 : u.contains(n))),
        r = ue(n),
        d = n;
      for (; n.parentElement && n !== r.body; ) {
        if ((l?.(n.parentElement, d), !o))
          for (let u of n.parentElement.children) u1(e, u, t) && c(u, d);
        n = n.parentElement;
      }
    }
  }
  function ef(e, t) {
    let { body: c } = ue(t[0]),
      l = [];
    return (
      au(e, t, (o) => {
        l.push(ul(o, Jx(e), !0));
      }),
      He(ul(c, Jx(e), !0), () => {
        for (let o of l) o();
      })
    );
  }
  function pr(e = "", t = !1) {
    return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
  }
  function i1(e, t = "") {
    return He(ul(e, pr(), !0), ul(e, pr(t), !0));
  }
  function Yx(e, t = "") {
    return He(ul(e, pr("", !0), !0), ul(e, pr(t, !0), !0));
  }
  function su(e, t) {
    let c = pr(t, !0);
    if (e[c]) return !0;
    let l = pr(t);
    do {
      if (e[l]) return !0;
      if (!e.parentElement) return !1;
      e = e.parentElement;
    } while (!0);
  }
  function Nx(e, t) {
    let c = [],
      l = t.map((o) => o?.id);
    return (
      au(
        e,
        t,
        (o) => {
          ja(o, ...l) || c.unshift(i1(o, e));
        },
        (o, r) => {
          (r.hasAttribute("data-dialog") && r.id !== e) || c.unshift(Yx(o, e));
        }
      ),
      () => {
        for (let o of c) o();
      }
    );
  }
  var a1 = "div",
    s1 = [
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
    b1 = ce(function (t) {
      return t;
    }),
    Yl = P(function (t) {
      return q(a1, t);
    });
  Object.assign(
    Yl,
    s1.reduce(
      (e, t) => (
        (e[t] = P(function (l) {
          return q(t, l);
        })),
        e
      ),
      {}
    )
  );
  var gr = V(A(), 1),
    Pa = V(M(), 1);
  function tf({ store: e, backdrop: t, alwaysVisible: c, hidden: l }) {
    let n = (0, gr.useRef)(null),
      o = Oa({ disclosure: e }),
      r = oe(e, "contentElement");
    (0, gr.useEffect)(() => {
      let i = n.current,
        a = r;
      i && a && (i.style.zIndex = getComputedStyle(a).zIndex);
    }, [r]),
      ne(() => {
        let i = r?.id;
        if (!i) return;
        let a = n.current;
        if (a) return Yx(a, i);
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
    if ((0, gr.isValidElement)(t))
      return (0, Pa.jsx)(Yl, w(J({}, d), { render: t }));
    let u = typeof t != "boolean" ? t : "div";
    return (0, Pa.jsx)(Yl, w(J({}, d), { render: (0, Pa.jsx)(u, {}) }));
  }
  function cf(e, ...t) {
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
  function lf(e) {
    return uu(e, "aria-hidden", "true");
  }
  function Ka() {
    return "inert" in HTMLElement.prototype;
  }
  function zx(e, t) {
    if (!("style" in e)) return jn;
    if (Ka()) return ul(e, "inert", !0);
    let l = to(e, !0).map((n) => {
      if (t?.some((r) => r && Xe(r, n))) return jn;
      let o = Gr(
        n,
        "focus",
        () => (
          (n.focus = jn),
          () => {
            delete n.focus;
          }
        )
      );
      return He(uu(n, "tabindex", "-1"), o);
    });
    return He(
      ...l,
      lf(e),
      iu(e, { pointerEvents: "none", userSelect: "none", cursor: "default" })
    );
  }
  function nf(e, t) {
    let c = [],
      l = t.map((o) => o?.id);
    return (
      au(
        e,
        t,
        (o) => {
          ja(o, ...l) || cf(o, ...l) || c.unshift(zx(o, t));
        },
        (o) => {
          o.hasAttribute("role") &&
            (t.some((r) => r && Xe(r, o)) || c.unshift(uu(o, "role", "none")));
        }
      ),
      () => {
        for (let o of c) o();
      }
    );
  }
  var _a = V(A(), 1),
    of = V(er(), 1);
  function rf({ attribute: e, contentId: t, contentElement: c, enabled: l }) {
    let [n, o] = eR(),
      r = (0, _a.useCallback)(() => {
        if (!l || !c) return !1;
        let { body: d } = ue(c),
          u = d.getAttribute(e);
        return !u || u === t;
      }, [n, l, c, e, t]);
    return (
      (0, _a.useEffect)(() => {
        if (!l || !t || !c) return;
        let { body: d } = ue(c);
        if (r()) return d.setAttribute(e, t), () => d.removeAttribute(e);
        let u = new MutationObserver(() => (0, of.flushSync)(o));
        return u.observe(d, { attributeFilter: [e] }), () => u.disconnect();
      }, [n, l, t, c, r, e]),
      r
    );
  }
  var df = V(A(), 1);
  function m1(e) {
    let t = e.getBoundingClientRect().left;
    return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
  }
  function uf(e, t, c) {
    let l = rf({
      attribute: "data-dialog-prevent-body-scroll",
      contentElement: e,
      contentId: t,
      enabled: c,
    });
    (0, df.useEffect)(() => {
      if (!l() || !e) return;
      let n = ue(e),
        o = Md(e),
        { documentElement: r, body: d } = n,
        u = r.style.getPropertyValue("--scrollbar-width"),
        i = u ? Number.parseInt(u) : o.innerWidth - r.clientWidth,
        a = () => $R(r, "--scrollbar-width", `${i}px`),
        s = m1(r),
        b = () => iu(d, { overflow: "hidden", [s]: `${i}px` }),
        m = () => {
          var p, Z;
          let { scrollX: x, scrollY: G, visualViewport: g } = o,
            R = (p = g?.offsetLeft) != null ? p : 0,
            f = (Z = g?.offsetTop) != null ? Z : 0,
            I = iu(d, {
              position: "fixed",
              overflow: "hidden",
              top: `${-(G - Math.floor(f))}px`,
              left: `${-(x - Math.floor(R))}px`,
              right: "0",
              [s]: `${i}px`,
            });
          return () => {
            I(), o.scrollTo({ left: x, top: G, behavior: "instant" });
          };
        },
        X = Ja() && !dx();
      return He(a(), X ? m() : b());
    }, [l, e]);
  }
  var Mc = V(A(), 1),
    sf = V(M(), 1),
    af = (0, Mc.createContext)({});
  function bf(e) {
    let t = (0, Mc.useContext)(af),
      [c, l] = (0, Mc.useState)([]),
      n = (0, Mc.useCallback)(
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
        he(e, ["open", "contentElement"], (d) => {
          var u;
          if (d.open && d.contentElement)
            return (u = t.add) == null ? void 0 : u.call(t, e);
        }),
      [e, t]
    );
    let o = (0, Mc.useMemo)(() => ({ store: e, add: n }), [e, n]);
    return {
      wrapElement: (0, Mc.useCallback)(
        (d) => (0, sf.jsx)(af.Provider, { value: o, children: d }),
        [o]
      ),
      nestedDialogs: c,
    };
  }
  var qa = V(A(), 1);
  function mf(e) {
    let t = (0, qa.useRef)();
    return (
      (0, qa.useEffect)(() => {
        if (!e) {
          t.current = null;
          return;
        }
        return Ye(
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
  var $a = V(A(), 1);
  function X1(e) {
    return e.tagName === "HTML" ? !0 : Xe(ue(e).body, e);
  }
  function x1(e, t) {
    if (!e) return !1;
    if (Xe(e, t)) return !0;
    let c = t.getAttribute("aria-activedescendant");
    if (c) {
      let l = ue(e).getElementById(c);
      if (l) return Xe(e, l);
    }
    return !1;
  }
  function G1(e, t) {
    if (!("clientY" in e)) return !1;
    let c = t.getBoundingClientRect();
    return c.width === 0 || c.height === 0
      ? !1
      : c.top <= e.clientY &&
          e.clientY <= c.top + c.height &&
          c.left <= e.clientX &&
          e.clientX <= c.left + c.width;
  }
  function kx({ store: e, type: t, listener: c, capture: l, domReady: n }) {
    let o = j(c),
      r = oe(e, "open"),
      d = (0, $a.useRef)(!1);
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
      (0, $a.useEffect)(
        () =>
          r
            ? Ye(
                t,
                (i) => {
                  let { contentElement: a, disclosureElement: s } =
                      e.getState(),
                    b = i.target;
                  !a ||
                    !b ||
                    !X1(b) ||
                    Xe(a, b) ||
                    x1(s, b) ||
                    b.hasAttribute("data-focus-trap") ||
                    G1(i, a) ||
                    (d.current && !su(b, a.id)) ||
                    DR(b) ||
                    o(i);
                },
                l
              )
            : void 0,
        [r, l]
      );
  }
  function wx(e, t) {
    return typeof e == "function" ? e(t) : !!e;
  }
  function Xf(e, t, c) {
    let l = oe(e, "open"),
      n = mf(l),
      o = { store: e, domReady: c, capture: !0 };
    kx(
      w(J({}, o), {
        type: "click",
        listener: (r) => {
          let { contentElement: d } = e.getState(),
            u = n.current;
          u && jd(u) && su(u, d?.id) && wx(t, r) && e.hide();
        },
      })
    ),
      kx(
        w(J({}, o), {
          type: "focusin",
          listener: (r) => {
            let { contentElement: d } = e.getState();
            d && r.target !== ue(d) && wx(t, r) && e.hide();
          },
        })
      ),
      kx(
        w(J({}, o), {
          type: "contextmenu",
          listener: (r) => {
            wx(t, r) && e.hide();
          },
        })
      );
  }
  function xf(e, t) {
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
  var Gf = V(M(), 1),
    p1 = "div",
    Sx = ce(function (t) {
      var c = t,
        { autoFocusOnShow: l = !0 } = c,
        n = _(c, ["autoFocusOnShow"]);
      return (
        (n = ye(n, (o) => (0, Gf.jsx)(Ta.Provider, { value: l, children: o }), [
          l,
        ])),
        n
      );
    }),
    bQ = P(function (t) {
      let c = Sx(t);
      return q(p1, c);
    });
  var pf = V(A(), 1),
    Qx = (0, pf.createContext)(0);
  var gf = V(A(), 1),
    Hf = V(M(), 1);
  function Zf({ level: e, children: t }) {
    let c = (0, gf.useContext)(Qx),
      l = Math.max(Math.min(e || c + 1, 6), 1);
    return (0, Hf.jsx)(Qx.Provider, { value: l, children: t });
  }
  var g1 = "span",
    Ox = ce(function (t) {
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
    HQ = P(function (t) {
      let c = Ox(t);
      return q(g1, c);
    });
  var H1 = "span",
    Z1 = ce(function (t) {
      return (
        (t = w(
          J({ "data-focus-trap": "", "tabIndex": 0, "aria-hidden": !0 }, t),
          { style: J({ position: "fixed", top: 0, left: 0 }, t.style) }
        )),
        (t = Ox(t)),
        t
      );
    }),
    bu = P(function (t) {
      let c = Z1(t);
      return q(H1, c);
    });
  var Rf = V(A(), 1),
    Ax = (0, Rf.createContext)(null);
  var Xc = V(A(), 1),
    Lx = V(er(), 1),
    Vt = V(M(), 1),
    R1 = "div";
  function f1(e) {
    return ue(e).body;
  }
  function I1(e, t) {
    return t ? (typeof t == "function" ? t(e) : t) : ue(e).createElement("div");
  }
  function y1(e = "id") {
    return `${e ? `${e}-` : ""}${Math.random().toString(36).substr(2, 6)}`;
  }
  function yn(e) {
    queueMicrotask(() => {
      e?.focus();
    });
  }
  var Tx = ce(function (t) {
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
      let i = (0, Xc.useRef)(null),
        a = Fe(i, u.ref),
        s = (0, Xc.useContext)(Ax),
        [b, m] = (0, Xc.useState)(null),
        [X, p] = (0, Xc.useState)(null),
        Z = (0, Xc.useRef)(null),
        x = (0, Xc.useRef)(null),
        G = (0, Xc.useRef)(null),
        g = (0, Xc.useRef)(null);
      return (
        ne(() => {
          let R = i.current;
          if (!R || !d) {
            m(null);
            return;
          }
          let f = I1(R, o);
          if (!f) {
            m(null);
            return;
          }
          let I = f.isConnected;
          if (
            (I || (s || f1(R)).appendChild(f),
            f.id || (f.id = R.id ? `portal/${R.id}` : y1()),
            m(f),
            Ud(r, f),
            !I)
          )
            return () => {
              f.remove(), Ud(r, null);
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
        (0, Xc.useEffect)(() => {
          if (!b || !l) return;
          let R = 0,
            f = (I) => {
              if (!pn(I)) return;
              let y = I.type === "focusin";
              if ((cancelAnimationFrame(R), y)) return SR(b);
              R = requestAnimationFrame(() => {
                wR(b, !0);
              });
            };
          return (
            b.addEventListener("focusin", f, !0),
            b.addEventListener("focusout", f, !0),
            () => {
              cancelAnimationFrame(R),
                b.removeEventListener("focusin", f, !0),
                b.removeEventListener("focusout", f, !0);
            }
          );
        }, [b, l]),
        (u = ye(
          u,
          (R) => {
            if (
              ((R = (0, Vt.jsx)(Ax.Provider, { value: b || s, children: R })),
              !d)
            )
              return R;
            if (!b)
              return (0, Vt.jsx)("span", {
                ref: a,
                id: u.id,
                style: { position: "fixed" },
                hidden: !0,
              });
            (R = (0, Vt.jsxs)(Vt.Fragment, {
              children: [
                l &&
                  b &&
                  (0, Vt.jsx)(bu, {
                    "ref": x,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-inner-before",
                    "onFocus": (I) => {
                      pn(I, b) ? yn(Ua()) : yn(Z.current);
                    },
                  }),
                R,
                l &&
                  b &&
                  (0, Vt.jsx)(bu, {
                    "ref": G,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-inner-after",
                    "onFocus": (I) => {
                      pn(I, b) ? yn(Rx()) : yn(g.current);
                    },
                  }),
              ],
            })),
              b && (R = (0, Lx.createPortal)(R, b));
            let f = (0, Vt.jsxs)(Vt.Fragment, {
              children: [
                l &&
                  b &&
                  (0, Vt.jsx)(bu, {
                    "ref": Z,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-outer-before",
                    "onFocus": (I) => {
                      !(I.relatedTarget === g.current) && pn(I, b)
                        ? yn(x.current)
                        : yn(Rx());
                    },
                  }),
                l &&
                  (0, Vt.jsx)("span", {
                    "aria-owns": b?.id,
                    "style": { position: "fixed" },
                  }),
                l &&
                  b &&
                  (0, Vt.jsx)(bu, {
                    "ref": g,
                    "data-focus-trap": u.id,
                    "className": "__focus-trap-outer-after",
                    "onFocus": (I) => {
                      if (pn(I, b)) yn(G.current);
                      else {
                        let y = Ua();
                        if (y === x.current) {
                          requestAnimationFrame(() => {
                            var W;
                            return (W = Ua()) == null ? void 0 : W.focus();
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
              X && l && (f = (0, Lx.createPortal)(f, X)),
              (0, Vt.jsxs)(Vt.Fragment, { children: [f, R] })
            );
          },
          [b, s, d, u.id, l, X]
        )),
        (u = w(J({}, u), { ref: a })),
        u
      );
    }),
    zQ = P(function (t) {
      let c = Tx(t);
      return q(R1, c);
    });
  var dt = V(A(), 1),
    Ec = V(M(), 1),
    W1 = "div",
    ff = Pn();
  function B1(e) {
    let t = ac();
    return !t || (e && Xe(e, t)) ? !1 : !!bc(t);
  }
  function If(e, t = !1) {
    if (!e) return null;
    let c = "current" in e ? e.current : e;
    return c ? (t ? (bc(c) ? c : null) : c) : null;
  }
  var Dx = ce(function (t) {
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
        autoFocusOnShow: X = !0,
        autoFocusOnHide: p = !0,
        initialFocus: Z,
        finalFocus: x,
        unmountOnHide: G,
        unstable_treeSnapshotKey: g,
      } = c,
      R = _(c, [
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
    let f = Aa(),
      I = (0, dt.useRef)(null),
      y = ZR({
        store: l || f,
        open: n,
        setOpen(T) {
          if (T) return;
          let se = I.current;
          if (!se) return;
          let It = new Event("close", { bubbles: !1, cancelable: !0 });
          o && se.addEventListener("close", o, { once: !0 }),
            se.dispatchEvent(It),
            It.defaultPrevented && y.setOpen(!0);
        },
      }),
      { portalRef: W, domReady: B } = rr(u, R.portalRef),
      F = R.preserveTabOrder,
      S = oe(y, (T) => F && !d && T.mounted),
      Q = Wc(R.id),
      v = oe(y, "open"),
      Y = oe(y, "mounted"),
      N = oe(y, "contentElement"),
      C = Vx(Y, R.hidden, R.alwaysVisible);
    uf(N, Q, m && !C), Xf(y, s, B);
    let { wrapElement: k, nestedDialogs: U } = bf(y);
    (R = ye(R, k, [k])),
      ne(() => {
        if (!v) return;
        let T = I.current,
          se = ac(T, !0);
        se &&
          se.tagName !== "BODY" &&
          ((T && Xe(T, se)) || y.setDisclosureElement(se));
      }, [y, v]),
      ff &&
        (0, dt.useEffect)(() => {
          if (!Y) return;
          let { disclosureElement: T } = y.getState();
          if (!T || !yc(T)) return;
          let se = () => {
            let It = !1,
              be = () => {
                It = !0;
              },
              lc = { capture: !0, once: !0 };
            T.addEventListener("focusin", be, lc),
              gn(T, "mouseup", () => {
                T.removeEventListener("focusin", be, !0), !It && Ma(T);
              });
          };
          return (
            T.addEventListener("mousedown", se),
            () => {
              T.removeEventListener("mousedown", se);
            }
          );
        }, [y, Y]),
      (0, dt.useEffect)(() => {
        if (!Y || !B) return;
        let T = I.current;
        if (!T) return;
        let se = Md(T),
          It = se.visualViewport || se,
          be = () => {
            var lc, _c;
            let Ar =
              (_c = (lc = se.visualViewport) == null ? void 0 : lc.height) !=
              null
                ? _c
                : se.innerHeight;
            T.style.setProperty("--dialog-viewport-height", `${Ar}px`);
          };
        return (
          be(),
          It.addEventListener("resize", be),
          () => {
            It.removeEventListener("resize", be);
          }
        );
      }, [Y, B]),
      (0, dt.useEffect)(() => {
        if (!d || !Y || !B) return;
        let T = I.current;
        if (!(!T || T.querySelector("[data-dialog-dismiss]")))
          return xf(T, y.hide);
      }, [y, d, Y, B]),
      ne(() => {
        if (!Ka() || v || !Y || !B) return;
        let T = I.current;
        if (T) return zx(T);
      }, [v, Y, B]);
    let h = v && B;
    ne(() => {
      if (!Q || !h) return;
      let T = I.current;
      return ef(Q, [T]);
    }, [Q, h, g]);
    let L = j(b);
    ne(() => {
      if (!Q || !h) return;
      let { disclosureElement: T } = y.getState(),
        se = I.current,
        It = L() || [],
        be = [se, ...It, ...U.map((lc) => lc.getState().contentElement)];
      return d ? He(Nx(Q, be), nf(Q, be)) : Nx(Q, [T, ...be]);
    }, [Q, y, h, L, U, d, g]);
    let E = !!X,
      pe = Kt(X),
      [Oe, Ve] = (0, dt.useState)(!1);
    (0, dt.useEffect)(() => {
      if (!v || !E || !B || !N?.isConnected) return;
      let T =
          If(Z, !0) ||
          N.querySelector("[data-autofocus=true],[autofocus]") ||
          zR(N, !0, u && S) ||
          N,
        se = bc(T);
      pe(se ? T : null) &&
        (Ve(!0),
        queueMicrotask(() => {
          T.focus(),
            ff && T.scrollIntoView({ block: "nearest", inline: "nearest" });
        }));
    }, [v, E, B, N, Z, u, S, pe]);
    let Te = !!p,
      tc = Kt(p),
      [st, lt] = (0, dt.useState)(!1);
    (0, dt.useEffect)(() => {
      if (v) return lt(!0), () => lt(!1);
    }, [v]);
    let Gc = (0, dt.useCallback)(
        (T, se = !0) => {
          let { disclosureElement: It } = y.getState();
          if (B1(T)) return;
          let be = If(x) || It;
          if (be?.id) {
            let _c = ue(be),
              Ar = `[aria-activedescendant="${be.id}"]`,
              Eu = _c.querySelector(Ar);
            Eu && (be = Eu);
          }
          if (be && !bc(be)) {
            let _c = be.closest("[data-dialog]");
            if (_c?.id) {
              let Ar = ue(_c),
                Eu = `[aria-controls~="${_c.id}"]`,
                BG = Ar.querySelector(Eu);
              BG && (be = BG);
            }
          }
          let lc = be && bc(be);
          if (!lc && se) {
            requestAnimationFrame(() => Gc(T, !1));
            return;
          }
          tc(lc ? be : null) && lc && be?.focus();
        },
        [y, x, tc]
      ),
      bt = (0, dt.useRef)(!1);
    ne(() => {
      if (v || !st || !Te) return;
      let T = I.current;
      (bt.current = !0), Gc(T);
    }, [v, st, B, Te, Gc]),
      (0, dt.useEffect)(() => {
        if (!st || !Te) return;
        let T = I.current;
        return () => {
          if (bt.current) {
            bt.current = !1;
            return;
          }
          Gc(T);
        };
      }, [st, Te, Gc]);
    let Tl = Kt(a);
    (0, dt.useEffect)(
      () =>
        !B || !Y
          ? void 0
          : Ye(
              "keydown",
              (se) => {
                if (se.key !== "Escape" || se.defaultPrevented) return;
                let It = I.current;
                if (!It || su(It)) return;
                let be = se.target;
                if (!be) return;
                let { disclosureElement: lc } = y.getState();
                !!(be.tagName === "BODY" || Xe(It, be) || !lc || Xe(lc, be)) &&
                  Tl(se) &&
                  y.hide();
              },
              !0
            ),
      [y, B, Y, Tl]
    ),
      (R = ye(
        R,
        (T) => (0, Ec.jsx)(Zf, { level: d ? 1 : void 0, children: T }),
        [d]
      ));
    let Dl = R.hidden,
      ee = R.alwaysVisible;
    R = ye(
      R,
      (T) =>
        i
          ? (0, Ec.jsxs)(Ec.Fragment, {
              children: [
                (0, Ec.jsx)(tf, {
                  store: y,
                  backdrop: i,
                  hidden: Dl,
                  alwaysVisible: ee,
                }),
                T,
              ],
            })
          : T,
      [y, i, Dl, ee]
    );
    let [De, cc] = (0, dt.useState)(),
      [pl, Io] = (0, dt.useState)();
    return (
      (R = ye(
        R,
        (T) =>
          (0, Ec.jsx)(br, {
            value: y,
            children: (0, Ec.jsx)(BR.Provider, {
              value: cc,
              children: (0, Ec.jsx)(vR.Provider, { value: Io, children: T }),
            }),
          }),
        [y]
      )),
      (R = w(
        J(
          {
            "id": Q,
            "data-dialog": "",
            "role": "dialog",
            "tabIndex": r ? -1 : void 0,
            "aria-labelledby": De,
            "aria-describedby": pl,
          },
          R
        ),
        { ref: Fe(I, R.ref) }
      )),
      (R = Sx(w(J({}, R), { autoFocusOnShow: Oe }))),
      (R = co(J({ store: y }, R))),
      (R = Uc(w(J({}, R), { focusable: r }))),
      (R = Tx(w(J({ portal: u }, R), { portalRef: W, preserveTabOrder: S }))),
      R
    );
  });
  function lo(e, t = Aa) {
    return P(function (l) {
      let n = t(),
        o = l.store || n;
      return oe(o, (d) => !l.unmountOnHide || d?.mounted || !!l.open)
        ? (0, Ec.jsx)(e, J({}, l))
        : null;
    });
  }
  var uO = lo(
    P(function (t) {
      let c = Dx(t);
      return q(W1, c);
    }),
    Aa
  );
  var il = Math.min,
    St = Math.max,
    Xu = Math.round,
    xu = Math.floor,
    jc = (e) => ({ x: e, y: e }),
    v1 = { left: "right", right: "left", bottom: "top", top: "bottom" },
    F1 = { start: "end", end: "start" };
  function ts(e, t, c) {
    return St(e, il(t, c));
  }
  function Nl(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function al(e) {
    return e.split("-")[0];
  }
  function no(e) {
    return e.split("-")[1];
  }
  function cs(e) {
    return e === "x" ? "y" : "x";
  }
  function ls(e) {
    return e === "y" ? "height" : "width";
  }
  function zl(e) {
    return ["top", "bottom"].includes(al(e)) ? "y" : "x";
  }
  function ns(e) {
    return cs(zl(e));
  }
  function yf(e, t, c) {
    c === void 0 && (c = !1);
    let l = no(e),
      n = ns(e),
      o = ls(n),
      r =
        n === "x"
          ? l === (c ? "end" : "start")
            ? "right"
            : "left"
          : l === "start"
            ? "bottom"
            : "top";
    return t.reference[o] > t.floating[o] && (r = mu(r)), [r, mu(r)];
  }
  function Wf(e) {
    let t = mu(e);
    return [es(e), t, es(t)];
  }
  function es(e) {
    return e.replace(/start|end/g, (t) => F1[t]);
  }
  function h1(e, t, c) {
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
  function Bf(e, t, c, l) {
    let n = no(e),
      o = h1(al(e), c === "start", l);
    return (
      n && ((o = o.map((r) => r + "-" + n)), t && (o = o.concat(o.map(es)))), o
    );
  }
  function mu(e) {
    return e.replace(/left|right|bottom|top/g, (t) => v1[t]);
  }
  function V1(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }
  function Ux(e) {
    return typeof e != "number"
      ? V1(e)
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
  function vf(e, t, c) {
    let { reference: l, floating: n } = e,
      o = zl(t),
      r = ns(t),
      d = ls(r),
      u = al(t),
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
  var Ff = async (e, t, c) => {
    let {
        placement: l = "bottom",
        strategy: n = "absolute",
        middleware: o = [],
        platform: r,
      } = c,
      d = o.filter(Boolean),
      u = await (r.isRTL == null ? void 0 : r.isRTL(t)),
      i = await r.getElementRects({ reference: e, floating: t, strategy: n }),
      { x: a, y: s } = vf(i, l, u),
      b = l,
      m = {},
      X = 0;
    for (let p = 0; p < d.length; p++) {
      let { name: Z, fn: x } = d[p],
        {
          x: G,
          y: g,
          data: R,
          reset: f,
        } = await x({
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
        (m = { ...m, [Z]: { ...m[Z], ...R } }),
        f &&
          X <= 50 &&
          (X++,
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
            ({ x: a, y: s } = vf(i, b, u))),
          (p = -1));
    }
    return { x: a, y: s, placement: b, strategy: n, middlewareData: m };
  };
  async function os(e, t) {
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
      X = Ux(m),
      Z = d[b ? (s === "floating" ? "reference" : "floating") : s],
      x = oo(
        await o.getClippingRect({
          element:
            (c = await (o.isElement == null ? void 0 : o.isElement(Z))) ==
              null || c
              ? Z
              : Z.contextElement ||
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
      R = (await (o.isElement == null ? void 0 : o.isElement(g)))
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
      top: (x.top - f.top + X.top) / R.y,
      bottom: (f.bottom - x.bottom + X.bottom) / R.y,
      left: (x.left - f.left + X.left) / R.x,
      right: (f.right - x.right + X.right) / R.x,
    };
  }
  var hf = (e) => ({
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
      let s = Ux(a),
        b = { x: c, y: l },
        m = ns(n),
        X = ls(m),
        p = await r.getDimensions(i),
        Z = m === "y",
        x = Z ? "top" : "left",
        G = Z ? "bottom" : "right",
        g = Z ? "clientHeight" : "clientWidth",
        R = o.reference[X] + o.reference[m] - b[m] - o.floating[X],
        f = b[m] - o.reference[m],
        I = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(i)),
        y = I ? I[g] : 0;
      (!y || !(await (r.isElement == null ? void 0 : r.isElement(I)))) &&
        (y = d.floating[g] || o.floating[X]);
      let W = R / 2 - f / 2,
        B = y / 2 - p[X] / 2 - 1,
        F = il(s[x], B),
        S = il(s[G], B),
        Q = F,
        v = y - p[X] - S,
        Y = y / 2 - p[X] / 2 + W,
        N = ts(Q, Y, v),
        C =
          !u.arrow &&
          no(n) != null &&
          Y !== N &&
          o.reference[X] / 2 - (Y < Q ? F : S) - p[X] / 2 < 0,
        k = C ? (Y < Q ? Y - Q : Y - v) : 0;
      return {
        [m]: b[m] + k,
        data: {
          [m]: N,
          centerOffset: Y - N - k,
          ...(C && { alignmentOffset: k }),
        },
        reset: C,
      };
    },
  });
  var Vf = function (e) {
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
              fallbackAxisSideDirection: X = "none",
              flipAlignment: p = !0,
              ...Z
            } = Nl(e, t);
          if ((c = o.arrow) != null && c.alignmentOffset) return {};
          let x = al(n),
            G = zl(d),
            g = al(d) === d,
            R = await (u.isRTL == null ? void 0 : u.isRTL(i.floating)),
            f = b || (g || !p ? [mu(d)] : Wf(d)),
            I = X !== "none";
          !b && I && f.push(...Bf(d, p, X, R));
          let y = [d, ...f],
            W = await os(t, Z),
            B = [],
            F = ((l = o.flip) == null ? void 0 : l.overflows) || [];
          if ((a && B.push(W[x]), s)) {
            let Y = yf(n, r, R);
            B.push(W[Y[0]], W[Y[1]]);
          }
          if (
            ((F = [...F, { placement: n, overflows: B }]),
            !B.every((Y) => Y <= 0))
          ) {
            var S, Q;
            let Y = (((S = o.flip) == null ? void 0 : S.index) || 0) + 1,
              N = y[Y];
            if (N)
              return {
                data: { index: Y, overflows: F },
                reset: { placement: N },
              };
            let C =
              (Q = F.filter((k) => k.overflows[0] <= 0).sort(
                (k, U) => k.overflows[1] - U.overflows[1]
              )[0]) == null
                ? void 0
                : Q.placement;
            if (!C)
              switch (m) {
                case "bestFit": {
                  var v;
                  let k =
                    (v = F.filter((U) => {
                      if (I) {
                        let h = zl(U.placement);
                        return h === G || h === "y";
                      }
                      return !0;
                    })
                      .map((U) => [
                        U.placement,
                        U.overflows
                          .filter((h) => h > 0)
                          .reduce((h, L) => h + L, 0),
                      ])
                      .sort((U, h) => U[1] - h[1])[0]) == null
                      ? void 0
                      : v[0];
                  k && (C = k);
                  break;
                }
                case "initialPlacement":
                  C = d;
                  break;
              }
            if (n !== C) return { reset: { placement: C } };
          }
          return {};
        },
      }
    );
  };
  async function C1(e, t) {
    let { placement: c, platform: l, elements: n } = e,
      o = await (l.isRTL == null ? void 0 : l.isRTL(n.floating)),
      r = al(c),
      d = no(c),
      u = zl(c) === "y",
      i = ["left", "top"].includes(r) ? -1 : 1,
      a = o && u ? -1 : 1,
      s = Nl(t, e),
      {
        mainAxis: b,
        crossAxis: m,
        alignmentAxis: X,
      } = typeof s == "number"
        ? { mainAxis: s, crossAxis: 0, alignmentAxis: null }
        : {
            mainAxis: s.mainAxis || 0,
            crossAxis: s.crossAxis || 0,
            alignmentAxis: s.alignmentAxis,
          };
    return (
      d && typeof X == "number" && (m = d === "end" ? X * -1 : X),
      u ? { x: m * a, y: b * i } : { x: b * i, y: m * a }
    );
  }
  var Cf = function (e) {
      return (
        e === void 0 && (e = 0),
        {
          name: "offset",
          options: e,
          async fn(t) {
            var c, l;
            let { x: n, y: o, placement: r, middlewareData: d } = t,
              u = await C1(t, e);
            return r === ((c = d.offset) == null ? void 0 : c.placement) &&
              (l = d.arrow) != null &&
              l.alignmentOffset
              ? {}
              : { x: n + u.x, y: o + u.y, data: { ...u, placement: r } };
          },
        }
      );
    },
    Jf = function (e) {
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
                  fn: (Z) => {
                    let { x, y: G } = Z;
                    return { x, y: G };
                  },
                },
                ...u
              } = Nl(e, t),
              i = { x: c, y: l },
              a = await os(t, u),
              s = zl(al(n)),
              b = cs(s),
              m = i[b],
              X = i[s];
            if (o) {
              let Z = b === "y" ? "top" : "left",
                x = b === "y" ? "bottom" : "right",
                G = m + a[Z],
                g = m - a[x];
              m = ts(G, m, g);
            }
            if (r) {
              let Z = s === "y" ? "top" : "left",
                x = s === "y" ? "bottom" : "right",
                G = X + a[Z],
                g = X - a[x];
              X = ts(G, X, g);
            }
            let p = d.fn({ ...t, [b]: m, [s]: X });
            return {
              ...p,
              data: { x: p.x - c, y: p.y - l, enabled: { [b]: o, [s]: r } },
            };
          },
        }
      );
    },
    Yf = function (e) {
      return (
        e === void 0 && (e = {}),
        {
          options: e,
          fn(t) {
            let { x: c, y: l, placement: n, rects: o, middlewareData: r } = t,
              { offset: d = 0, mainAxis: u = !0, crossAxis: i = !0 } = Nl(e, t),
              a = { x: c, y: l },
              s = zl(n),
              b = cs(s),
              m = a[b],
              X = a[s],
              p = Nl(d, t),
              Z =
                typeof p == "number"
                  ? { mainAxis: p, crossAxis: 0 }
                  : { mainAxis: 0, crossAxis: 0, ...p };
            if (u) {
              let g = b === "y" ? "height" : "width",
                R = o.reference[b] - o.floating[g] + Z.mainAxis,
                f = o.reference[b] + o.reference[g] - Z.mainAxis;
              m < R ? (m = R) : m > f && (m = f);
            }
            if (i) {
              var x, G;
              let g = b === "y" ? "width" : "height",
                R = ["top", "left"].includes(al(n)),
                f =
                  o.reference[s] -
                  o.floating[g] +
                  ((R && ((x = r.offset) == null ? void 0 : x[s])) || 0) +
                  (R ? 0 : Z.crossAxis),
                I =
                  o.reference[s] +
                  o.reference[g] +
                  (R ? 0 : ((G = r.offset) == null ? void 0 : G[s]) || 0) -
                  (R ? Z.crossAxis : 0);
              X < f ? (X = f) : X > I && (X = I);
            }
            return { [b]: m, [s]: X };
          },
        }
      );
    },
    Nf = function (e) {
      return (
        e === void 0 && (e = {}),
        {
          name: "size",
          options: e,
          async fn(t) {
            var c, l;
            let { placement: n, rects: o, platform: r, elements: d } = t,
              { apply: u = () => {}, ...i } = Nl(e, t),
              a = await os(t, i),
              s = al(n),
              b = no(n),
              m = zl(n) === "y",
              { width: X, height: p } = o.floating,
              Z,
              x;
            s === "top" || s === "bottom"
              ? ((Z = s),
                (x =
                  b ===
                  ((await (r.isRTL == null ? void 0 : r.isRTL(d.floating)))
                    ? "start"
                    : "end")
                    ? "left"
                    : "right"))
              : ((x = s), (Z = b === "end" ? "top" : "bottom"));
            let G = p - a.top - a.bottom,
              g = X - a.left - a.right,
              R = il(p - a[Z], G),
              f = il(X - a[x], g),
              I = !t.middlewareData.shift,
              y = R,
              W = f;
            if (
              ((c = t.middlewareData.shift) != null && c.enabled.x && (W = g),
              (l = t.middlewareData.shift) != null && l.enabled.y && (y = G),
              I && !b)
            ) {
              let F = St(a.left, 0),
                S = St(a.right, 0),
                Q = St(a.top, 0),
                v = St(a.bottom, 0);
              m
                ? (W =
                    X - 2 * (F !== 0 || S !== 0 ? F + S : St(a.left, a.right)))
                : (y =
                    p - 2 * (Q !== 0 || v !== 0 ? Q + v : St(a.top, a.bottom)));
            }
            await u({ ...t, availableWidth: W, availableHeight: y });
            let B = await r.getDimensions(d.floating);
            return X !== B.width || p !== B.height
              ? { reset: { rects: !0 } }
              : {};
          },
        }
      );
    };
  function rs() {
    return typeof window < "u";
  }
  function ro(e) {
    return kf(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function qt(e) {
    var t;
    return (
      (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
      window
    );
  }
  function Pc(e) {
    var t;
    return (t = (kf(e) ? e.ownerDocument : e.document) || window.document) ==
      null
      ? void 0
      : t.documentElement;
  }
  function kf(e) {
    return rs() ? e instanceof Node || e instanceof qt(e).Node : !1;
  }
  function Bc(e) {
    return rs() ? e instanceof Element || e instanceof qt(e).Element : !1;
  }
  function Kc(e) {
    return rs()
      ? e instanceof HTMLElement || e instanceof qt(e).HTMLElement
      : !1;
  }
  function zf(e) {
    return !rs() || typeof ShadowRoot > "u"
      ? !1
      : e instanceof ShadowRoot || e instanceof qt(e).ShadowRoot;
  }
  function Zr(e) {
    let { overflow: t, overflowX: c, overflowY: l, display: n } = vc(e);
    return (
      /auto|scroll|overlay|hidden|clip/.test(t + l + c) &&
      !["inline", "contents"].includes(n)
    );
  }
  function wf(e) {
    return ["table", "td", "th"].includes(ro(e));
  }
  function Gu(e) {
    return [":popover-open", ":modal"].some((t) => {
      try {
        return e.matches(t);
      } catch {
        return !1;
      }
    });
  }
  function ds(e) {
    let t = us(),
      c = Bc(e) ? vc(e) : e;
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
  function Sf(e) {
    let t = kl(e);
    for (; Kc(t) && !uo(t); ) {
      if (ds(t)) return t;
      if (Gu(t)) return null;
      t = kl(t);
    }
    return null;
  }
  function us() {
    return typeof CSS > "u" || !CSS.supports
      ? !1
      : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function uo(e) {
    return ["html", "body", "#document"].includes(ro(e));
  }
  function vc(e) {
    return qt(e).getComputedStyle(e);
  }
  function pu(e) {
    return Bc(e)
      ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
      : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
  }
  function kl(e) {
    if (ro(e) === "html") return e;
    let t = e.assignedSlot || e.parentNode || (zf(e) && e.host) || Pc(e);
    return zf(t) ? t.host : t;
  }
  function Qf(e) {
    let t = kl(e);
    return uo(t)
      ? e.ownerDocument
        ? e.ownerDocument.body
        : e.body
      : Kc(t) && Zr(t)
        ? t
        : Qf(t);
  }
  function Hr(e, t, c) {
    var l;
    t === void 0 && (t = []), c === void 0 && (c = !0);
    let n = Qf(e),
      o = n === ((l = e.ownerDocument) == null ? void 0 : l.body),
      r = qt(n);
    if (o) {
      let d = is(r);
      return t.concat(
        r,
        r.visualViewport || [],
        Zr(n) ? n : [],
        d && c ? Hr(d) : []
      );
    }
    return t.concat(n, Hr(n, [], c));
  }
  function is(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
  }
  function Lf(e) {
    let t = vc(e),
      c = parseFloat(t.width) || 0,
      l = parseFloat(t.height) || 0,
      n = Kc(e),
      o = n ? e.offsetWidth : c,
      r = n ? e.offsetHeight : l,
      d = Xu(c) !== o || Xu(l) !== r;
    return d && ((c = o), (l = r)), { width: c, height: l, $: d };
  }
  function Ex(e) {
    return Bc(e) ? e : e.contextElement;
  }
  function Rr(e) {
    let t = Ex(e);
    if (!Kc(t)) return jc(1);
    let c = t.getBoundingClientRect(),
      { width: l, height: n, $: o } = Lf(t),
      r = (o ? Xu(c.width) : c.width) / l,
      d = (o ? Xu(c.height) : c.height) / n;
    return (
      (!r || !Number.isFinite(r)) && (r = 1),
      (!d || !Number.isFinite(d)) && (d = 1),
      { x: r, y: d }
    );
  }
  var J1 = jc(0);
  function Tf(e) {
    let t = qt(e);
    return !us() || !t.visualViewport
      ? J1
      : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
  }
  function Y1(e, t, c) {
    return t === void 0 && (t = !1), !c || (t && c !== qt(e)) ? !1 : t;
  }
  function io(e, t, c, l) {
    t === void 0 && (t = !1), c === void 0 && (c = !1);
    let n = e.getBoundingClientRect(),
      o = Ex(e),
      r = jc(1);
    t && (l ? Bc(l) && (r = Rr(l)) : (r = Rr(e)));
    let d = Y1(o, c, l) ? Tf(o) : jc(0),
      u = (n.left + d.x) / r.x,
      i = (n.top + d.y) / r.y,
      a = n.width / r.x,
      s = n.height / r.y;
    if (o) {
      let b = qt(o),
        m = l && Bc(l) ? qt(l) : l,
        X = b,
        p = is(X);
      for (; p && l && m !== X; ) {
        let Z = Rr(p),
          x = p.getBoundingClientRect(),
          G = vc(p),
          g = x.left + (p.clientLeft + parseFloat(G.paddingLeft)) * Z.x,
          R = x.top + (p.clientTop + parseFloat(G.paddingTop)) * Z.y;
        (u *= Z.x),
          (i *= Z.y),
          (a *= Z.x),
          (s *= Z.y),
          (u += g),
          (i += R),
          (X = qt(p)),
          (p = is(X));
      }
    }
    return oo({ width: a, height: s, x: u, y: i });
  }
  function jx(e, t) {
    let c = pu(e).scrollLeft;
    return t ? t.left + c : io(Pc(e)).left + c;
  }
  function Df(e, t, c) {
    c === void 0 && (c = !1);
    let l = e.getBoundingClientRect(),
      n = l.left + t.scrollLeft - (c ? 0 : jx(e, l)),
      o = l.top + t.scrollTop;
    return { x: n, y: o };
  }
  function N1(e) {
    let { elements: t, rect: c, offsetParent: l, strategy: n } = e,
      o = n === "fixed",
      r = Pc(l),
      d = t ? Gu(t.floating) : !1;
    if (l === r || (d && o)) return c;
    let u = { scrollLeft: 0, scrollTop: 0 },
      i = jc(1),
      a = jc(0),
      s = Kc(l);
    if (
      (s || (!s && !o)) &&
      ((ro(l) !== "body" || Zr(r)) && (u = pu(l)), Kc(l))
    ) {
      let m = io(l);
      (i = Rr(l)), (a.x = m.x + l.clientLeft), (a.y = m.y + l.clientTop);
    }
    let b = r && !s && !o ? Df(r, u, !0) : jc(0);
    return {
      width: c.width * i.x,
      height: c.height * i.y,
      x: c.x * i.x - u.scrollLeft * i.x + a.x + b.x,
      y: c.y * i.y - u.scrollTop * i.y + a.y + b.y,
    };
  }
  function z1(e) {
    return Array.from(e.getClientRects());
  }
  function k1(e) {
    let t = Pc(e),
      c = pu(e),
      l = e.ownerDocument.body,
      n = St(t.scrollWidth, t.clientWidth, l.scrollWidth, l.clientWidth),
      o = St(t.scrollHeight, t.clientHeight, l.scrollHeight, l.clientHeight),
      r = -c.scrollLeft + jx(e),
      d = -c.scrollTop;
    return (
      vc(l).direction === "rtl" && (r += St(t.clientWidth, l.clientWidth) - n),
      { width: n, height: o, x: r, y: d }
    );
  }
  function w1(e, t) {
    let c = qt(e),
      l = Pc(e),
      n = c.visualViewport,
      o = l.clientWidth,
      r = l.clientHeight,
      d = 0,
      u = 0;
    if (n) {
      (o = n.width), (r = n.height);
      let i = us();
      (!i || (i && t === "fixed")) && ((d = n.offsetLeft), (u = n.offsetTop));
    }
    return { width: o, height: r, x: d, y: u };
  }
  function S1(e, t) {
    let c = io(e, !0, t === "fixed"),
      l = c.top + e.clientTop,
      n = c.left + e.clientLeft,
      o = Kc(e) ? Rr(e) : jc(1),
      r = e.clientWidth * o.x,
      d = e.clientHeight * o.y,
      u = n * o.x,
      i = l * o.y;
    return { width: r, height: d, x: u, y: i };
  }
  function Of(e, t, c) {
    let l;
    if (t === "viewport") l = w1(e, c);
    else if (t === "document") l = k1(Pc(e));
    else if (Bc(t)) l = S1(t, c);
    else {
      let n = Tf(e);
      l = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
    }
    return oo(l);
  }
  function Uf(e, t) {
    let c = kl(e);
    return c === t || !Bc(c) || uo(c)
      ? !1
      : vc(c).position === "fixed" || Uf(c, t);
  }
  function Q1(e, t) {
    let c = t.get(e);
    if (c) return c;
    let l = Hr(e, [], !1).filter((d) => Bc(d) && ro(d) !== "body"),
      n = null,
      o = vc(e).position === "fixed",
      r = o ? kl(e) : e;
    for (; Bc(r) && !uo(r); ) {
      let d = vc(r),
        u = ds(r);
      !u && d.position === "fixed" && (n = null),
        (
          o
            ? !u && !n
            : (!u &&
                d.position === "static" &&
                !!n &&
                ["absolute", "fixed"].includes(n.position)) ||
              (Zr(r) && !u && Uf(e, r))
        )
          ? (l = l.filter((a) => a !== r))
          : (n = d),
        (r = kl(r));
    }
    return t.set(e, l), l;
  }
  function O1(e) {
    let { element: t, boundary: c, rootBoundary: l, strategy: n } = e,
      r = [
        ...(c === "clippingAncestors"
          ? Gu(t)
            ? []
            : Q1(t, this._c)
          : [].concat(c)),
        l,
      ],
      d = r[0],
      u = r.reduce(
        (i, a) => {
          let s = Of(t, a, n);
          return (
            (i.top = St(s.top, i.top)),
            (i.right = il(s.right, i.right)),
            (i.bottom = il(s.bottom, i.bottom)),
            (i.left = St(s.left, i.left)),
            i
          );
        },
        Of(t, d, n)
      );
    return {
      width: u.right - u.left,
      height: u.bottom - u.top,
      x: u.left,
      y: u.top,
    };
  }
  function A1(e) {
    let { width: t, height: c } = Lf(e);
    return { width: t, height: c };
  }
  function L1(e, t, c) {
    let l = Kc(t),
      n = Pc(t),
      o = c === "fixed",
      r = io(e, !0, o, t),
      d = { scrollLeft: 0, scrollTop: 0 },
      u = jc(0);
    if (l || (!l && !o))
      if (((ro(t) !== "body" || Zr(n)) && (d = pu(t)), l)) {
        let b = io(t, !0, o, t);
        (u.x = b.x + t.clientLeft), (u.y = b.y + t.clientTop);
      } else n && (u.x = jx(n));
    let i = n && !l && !o ? Df(n, d) : jc(0),
      a = r.left + d.scrollLeft - u.x - i.x,
      s = r.top + d.scrollTop - u.y - i.y;
    return { x: a, y: s, width: r.width, height: r.height };
  }
  function Mx(e) {
    return vc(e).position === "static";
  }
  function Af(e, t) {
    if (!Kc(e) || vc(e).position === "fixed") return null;
    if (t) return t(e);
    let c = e.offsetParent;
    return Pc(e) === c && (c = c.ownerDocument.body), c;
  }
  function Mf(e, t) {
    let c = qt(e);
    if (Gu(e)) return c;
    if (!Kc(e)) {
      let n = kl(e);
      for (; n && !uo(n); ) {
        if (Bc(n) && !Mx(n)) return n;
        n = kl(n);
      }
      return c;
    }
    let l = Af(e, t);
    for (; l && wf(l) && Mx(l); ) l = Af(l, t);
    return l && uo(l) && Mx(l) && !ds(l) ? c : l || Sf(e) || c;
  }
  var T1 = async function (e) {
    let t = this.getOffsetParent || Mf,
      c = this.getDimensions,
      l = await c(e.floating);
    return {
      reference: L1(e.reference, await t(e.floating), e.strategy),
      floating: { x: 0, y: 0, width: l.width, height: l.height },
    };
  };
  function D1(e) {
    return vc(e).direction === "rtl";
  }
  var U1 = {
    convertOffsetParentRelativeRectToViewportRelativeRect: N1,
    getDocumentElement: Pc,
    getClippingRect: O1,
    getOffsetParent: Mf,
    getElementRects: T1,
    getClientRects: z1,
    getDimensions: A1,
    getScale: Rr,
    isElement: Bc,
    isRTL: D1,
  };
  function M1(e, t) {
    let c = null,
      l,
      n = Pc(e);
    function o() {
      var d;
      clearTimeout(l), (d = c) == null || d.disconnect(), (c = null);
    }
    function r(d, u) {
      d === void 0 && (d = !1), u === void 0 && (u = 1), o();
      let { left: i, top: a, width: s, height: b } = e.getBoundingClientRect();
      if ((d || t(), !s || !b)) return;
      let m = xu(a),
        X = xu(n.clientWidth - (i + s)),
        p = xu(n.clientHeight - (a + b)),
        Z = xu(i),
        G = {
          rootMargin: -m + "px " + -X + "px " + -p + "px " + -Z + "px",
          threshold: St(0, il(1, u)) || 1,
        },
        g = !0;
      function R(f) {
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
        c = new IntersectionObserver(R, { ...G, root: n.ownerDocument });
      } catch {
        c = new IntersectionObserver(R, G);
      }
      c.observe(e);
    }
    return r(!0), o;
  }
  function Ef(e, t, c, l) {
    l === void 0 && (l = {});
    let {
        ancestorScroll: n = !0,
        ancestorResize: o = !0,
        elementResize: r = typeof ResizeObserver == "function",
        layoutShift: d = typeof IntersectionObserver == "function",
        animationFrame: u = !1,
      } = l,
      i = Ex(e),
      a = n || o ? [...(i ? Hr(i) : []), ...Hr(t)] : [];
    a.forEach((x) => {
      n && x.addEventListener("scroll", c, { passive: !0 }),
        o && x.addEventListener("resize", c);
    });
    let s = i && d ? M1(i, c) : null,
      b = -1,
      m = null;
    r &&
      ((m = new ResizeObserver((x) => {
        let [G] = x;
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
    let X,
      p = u ? io(e) : null;
    u && Z();
    function Z() {
      let x = io(e);
      p &&
        (x.x !== p.x ||
          x.y !== p.y ||
          x.width !== p.width ||
          x.height !== p.height) &&
        c(),
        (p = x),
        (X = requestAnimationFrame(Z));
    }
    return (
      c(),
      () => {
        var x;
        a.forEach((G) => {
          n && G.removeEventListener("scroll", c),
            o && G.removeEventListener("resize", c);
        }),
          s?.(),
          (x = m) == null || x.disconnect(),
          (m = null),
          u && cancelAnimationFrame(X);
      }
    );
  }
  var jf = Cf;
  var Pf = Jf,
    Kf = Vf,
    _f = Nf;
  var qf = hf;
  var $f = Yf,
    eI = (e, t, c) => {
      let l = new Map(),
        n = { platform: U1, ...c },
        o = { ...n.platform, _c: l };
      return Ff(e, t, { ...n, platform: o });
    };
  var as = V(A(), 1),
    Px = V(M(), 1),
    E1 = "div";
  function tI(e = 0, t = 0, c = 0, l = 0) {
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
  function j1(e) {
    if (!e) return tI();
    let { x: t, y: c, width: l, height: n } = e;
    return tI(t, c, l, n);
  }
  function P1(e, t) {
    return {
      contextElement: e || void 0,
      getBoundingClientRect: () => {
        let l = e,
          n = t?.(l);
        return n || !l ? j1(n) : l.getBoundingClientRect();
      },
    };
  }
  function K1(e) {
    return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
  }
  function cI(e) {
    let t = window.devicePixelRatio || 1;
    return Math.round(e * t) / t;
  }
  function _1(e, t) {
    return jf(({ placement: c }) => {
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
  function q1(e) {
    if (e.flip === !1) return;
    let t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
    return (
      Je(!t || t.every(K1), !1),
      Kf({ padding: e.overflowPadding, fallbackPlacements: t })
    );
  }
  function $1(e) {
    if (!(!e.slide && !e.overlap))
      return Pf({
        mainAxis: e.slide,
        crossAxis: e.overlap,
        padding: e.overflowPadding,
        limiter: $f(),
      });
  }
  function e2(e) {
    return _f({
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
  function t2(e, t) {
    if (e) return qf({ element: e, padding: t.arrowPadding });
  }
  var Kx = ce(function (t) {
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
          sameWidth: X = !1,
          fitViewport: p = !1,
          gutter: Z,
          arrowPadding: x = 4,
          overflowPadding: G = 8,
          getAnchorRect: g,
          updatePosition: R,
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
      let I = gx();
      (l = l || I), Je(l, !1);
      let y = l.useState("arrowElement"),
        W = l.useState("anchorElement"),
        B = l.useState("disclosureElement"),
        F = l.useState("popoverElement"),
        S = l.useState("contentElement"),
        Q = l.useState("placement"),
        v = l.useState("mounted"),
        Y = l.useState("rendered"),
        N = (0, as.useRef)(null),
        [C, k] = (0, as.useState)(!1),
        { portalRef: U, domReady: h } = rr(o, f.portalRef),
        L = j(g),
        E = j(R),
        pe = !!R;
      ne(() => {
        if (!F?.isConnected) return;
        F.style.setProperty("--popover-overflow-padding", `${G}px`);
        let Ve = P1(W, L),
          Te = async () => {
            if (!v) return;
            y || (N.current = N.current || document.createElement("div"));
            let lt = y || N.current,
              Gc = [
                _1(lt, { gutter: Z, shift: s }),
                q1({ flip: a, overflowPadding: G }),
                $1({ slide: b, shift: s, overlap: m, overflowPadding: G }),
                t2(lt, { arrowPadding: x }),
                e2({ sameWidth: X, fitViewport: p, overflowPadding: G }),
              ],
              bt = await eI(Ve, F, {
                placement: Q,
                strategy: i ? "fixed" : "absolute",
                middleware: Gc,
              });
            l?.setState("currentPlacement", bt.placement), k(!0);
            let Tl = cI(bt.x),
              Dl = cI(bt.y);
            if (
              (Object.assign(F.style, {
                top: "0",
                left: "0",
                transform: `translate3d(${Tl}px,${Dl}px,0)`,
              }),
              lt && bt.middlewareData.arrow)
            ) {
              let { x: ee, y: De } = bt.middlewareData.arrow,
                cc = bt.placement.split("-")[0],
                pl = lt.clientWidth / 2,
                Io = lt.clientHeight / 2,
                T = ee != null ? ee + pl : -pl,
                se = De != null ? De + Io : -Io;
              F.style.setProperty(
                "--popover-transform-origin",
                {
                  top: `${T}px calc(100% + ${Io}px)`,
                  bottom: `${T}px ${-Io}px`,
                  left: `calc(100% + ${pl}px) ${se}px`,
                  right: `${-pl}px ${se}px`,
                }[cc]
              ),
                Object.assign(lt.style, {
                  left: ee != null ? `${ee}px` : "",
                  top: De != null ? `${De}px` : "",
                  [cc]: "100%",
                });
            }
          },
          st = Ef(
            Ve,
            F,
            async () => {
              pe ? (await E({ updatePosition: Te }), k(!0)) : await Te();
            },
            { elementResize: typeof ResizeObserver == "function" }
          );
        return () => {
          k(!1), st();
        };
      }, [l, Y, F, y, W, F, Q, v, h, i, a, s, b, m, X, p, Z, x, G, L, pe, E]),
        ne(() => {
          if (!v || !h || !F?.isConnected || !S?.isConnected) return;
          let Ve = () => {
            F.style.zIndex = getComputedStyle(S).zIndex;
          };
          Ve();
          let Te = requestAnimationFrame(() => {
            Te = requestAnimationFrame(Ve);
          });
          return () => cancelAnimationFrame(Te);
        }, [v, h, F, S]);
      let Oe = i ? "fixed" : "absolute";
      return (
        (f = ye(
          f,
          (Ve) =>
            (0, Px.jsx)(
              "div",
              w(J({}, u), {
                style: J(
                  { position: Oe, top: 0, left: 0, width: "max-content" },
                  u?.style
                ),
                ref: l?.setPopoverElement,
                children: Ve,
              })
            ),
          [l, Oe, u]
        )),
        (f = ye(f, (Ve) => (0, Px.jsx)(fn, { value: l, children: Ve }), [l])),
        (f = w(J({ "data-placing": !C || void 0 }, f), {
          style: J({ position: "relative" }, f.style),
        })),
        (f = Dx(
          w(
            J(
              {
                store: l,
                modal: n,
                portal: o,
                preserveTabOrder: r,
                preserveTabOrderAnchor: B || W,
                autoFocusOnShow: C && d,
              },
              f
            ),
            { portalRef: U }
          )
        )),
        f
      );
    }),
    CO = lo(
      P(function (t) {
        let c = Kx(t);
        return q(E1, c);
      }),
      gx
    );
  var gu = qe([mr], [fn]),
    zO = gu.useContext,
    kO = gu.useScopedContext,
    Hu = gu.useProviderContext,
    lI = gu.ContextProvider,
    ss = gu.ScopedContextProvider;
  function nI(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = RR(
        ge(te({}, e), { placement: K(e.placement, c?.placement, "bottom") })
      ),
      n = K(e.timeout, c?.timeout, 500),
      o = ge(te({}, l.getState()), {
        timeout: n,
        showTimeout: K(e.showTimeout, c?.showTimeout),
        hideTimeout: K(e.hideTimeout, c?.hideTimeout),
        autoFocusOnShow: K(c?.autoFocusOnShow, !1),
      }),
      r = Me(o, l, e.store);
    return ge(te(te({}, l), r), {
      setAutoFocusOnShow: (d) => r.setState("autoFocusOnShow", d),
    });
  }
  function oI(e, t, c) {
    return (
      Ze(e, c, "timeout"),
      Ze(e, c, "showTimeout"),
      Ze(e, c, "hideTimeout"),
      fR(e, t, c)
    );
  }
  function bs(e) {
    return [e.clientX, e.clientY];
  }
  function _x(e, t) {
    let [c, l] = e,
      n = !1,
      o = t.length;
    for (let r = o, d = 0, u = r - 1; d < r; u = d++) {
      let [i, a] = t[d],
        [s, b] = t[u],
        [, m] = t[u === 0 ? r - 1 : u - 1] || [0, 0],
        X = (a - b) * (c - i) - (i - s) * (l - a);
      if (b < a) {
        if (l >= b && l < a) {
          if (X === 0) return !0;
          X > 0 && (l === b ? l > m && (n = !n) : (n = !n));
        }
      } else if (a < b) {
        if (l > a && l <= b) {
          if (X === 0) return !0;
          X < 0 && (l === b ? l < m && (n = !n) : (n = !n));
        }
      } else if (l === a && ((c >= s && c <= i) || (c >= i && c <= s)))
        return !0;
    }
    return n;
  }
  function c2(e, t) {
    let { top: c, right: l, bottom: n, left: o } = t,
      [r, d] = e,
      u = r < o ? "left" : r > l ? "right" : null,
      i = d < c ? "top" : d > n ? "bottom" : null;
    return [u, i];
  }
  function qx(e, t) {
    let c = e.getBoundingClientRect(),
      { top: l, right: n, bottom: o, left: r } = c,
      [d, u] = c2(t, c),
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
  var Ee = V(A(), 1),
    $x = V(M(), 1),
    l2 = "div";
  function dI(e, t, c, l) {
    return fx(t)
      ? !0
      : e
        ? !!(Xe(t, e) || (c && Xe(c, e)) || l?.some((n) => dI(e, n, c)))
        : !1;
  }
  function n2(e) {
    var t = e,
      { store: c } = t,
      l = _(t, ["store"]);
    let [n, o] = (0, Ee.useState)(!1),
      r = c.useState("mounted");
    (0, Ee.useEffect)(() => {
      r || o(!1);
    }, [r]);
    let d = l.onFocus,
      u = j((a) => {
        d?.(a), !a.defaultPrevented && o(!0);
      }),
      i = (0, Ee.useRef)(null);
    return (
      (0, Ee.useEffect)(
        () =>
          he(c, ["anchorElement"], (a) => {
            i.current = a.anchorElement;
          }),
        []
      ),
      (l = w(J({ autoFocusOnHide: n, finalFocus: i }, l), { onFocus: u })),
      l
    );
  }
  var rI = (0, Ee.createContext)(null),
    e0 = ce(function (t) {
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
      let a = Hu();
      (l = l || a), Je(l, !1);
      let s = (0, Ee.useRef)(null),
        [b, m] = (0, Ee.useState)([]),
        X = (0, Ee.useRef)(0),
        p = (0, Ee.useRef)(null),
        { portalRef: Z, domReady: x } = rr(o, i.portalRef),
        G = wa(),
        g = !!d,
        R = Kt(d),
        f = !!u,
        I = Kt(u),
        y = l.useState("open"),
        W = l.useState("mounted");
      (0, Ee.useEffect)(() => {
        if (!x || !W || (!g && !f)) return;
        let v = s.current;
        return v
          ? He(
              Ye(
                "mousemove",
                (N) => {
                  if (!l || !G()) return;
                  let {
                      anchorElement: C,
                      hideTimeout: k,
                      timeout: U,
                    } = l.getState(),
                    h = p.current,
                    [L] = N.composedPath(),
                    E = C;
                  if (dI(L, v, E, b)) {
                    (p.current = L && E && Xe(E, L) ? bs(N) : null),
                      window.clearTimeout(X.current),
                      (X.current = 0);
                    return;
                  }
                  if (!X.current) {
                    if (h) {
                      let pe = bs(N),
                        Oe = qx(v, h);
                      if (_x(pe, Oe)) {
                        if (((p.current = pe), !I(N))) return;
                        N.preventDefault(), N.stopPropagation();
                        return;
                      }
                    }
                    R(N) &&
                      (X.current = window.setTimeout(() => {
                        (X.current = 0), l?.hide();
                      }, k ?? U));
                  }
                },
                !0
              ),
              () => clearTimeout(X.current)
            )
          : void 0;
      }, [l, G, x, W, g, f, b, I, R]),
        (0, Ee.useEffect)(() => {
          if (!x || !W || !f) return;
          let v = (Y) => {
            let N = s.current;
            if (!N) return;
            let C = p.current;
            if (!C) return;
            let k = qx(N, C);
            if (_x(bs(Y), k)) {
              if (!I(Y)) return;
              Y.preventDefault(), Y.stopPropagation();
            }
          };
          return He(
            Ye("mouseenter", v, !0),
            Ye("mouseover", v, !0),
            Ye("mouseout", v, !0),
            Ye("mouseleave", v, !0)
          );
        }, [x, W, f, I]),
        (0, Ee.useEffect)(() => {
          x && (y || l?.setAutoFocusOnShow(!1));
        }, [l, x, y]);
      let B = za(y);
      (0, Ee.useEffect)(() => {
        if (x)
          return () => {
            B.current || l?.setAutoFocusOnShow(!1);
          };
      }, [l, x]);
      let F = (0, Ee.useContext)(rI);
      ne(() => {
        if (n || !o || !W || !x) return;
        let v = s.current;
        if (v) return F?.(v);
      }, [n, o, W, x]);
      let S = (0, Ee.useCallback)(
        (v) => {
          m((N) => [...N, v]);
          let Y = F?.(v);
          return () => {
            m((N) => N.filter((C) => C !== v)), Y?.();
          };
        },
        [F]
      );
      (i = ye(
        i,
        (v) =>
          (0, $x.jsx)(ss, {
            value: l,
            children: (0, $x.jsx)(rI.Provider, { value: S, children: v }),
          }),
        [l, S]
      )),
        (i = w(J({}, i), { ref: Fe(s, i.ref) })),
        (i = n2(J({ store: l }, i)));
      let Q = l.useState((v) => n || v.autoFocusOnShow);
      return (
        (i = Kx(
          w(J({ store: l, modal: n, portal: o, autoFocusOnShow: Q }, i), {
            portalRef: Z,
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
    oA = lo(
      P(function (t) {
        let c = e0(t);
        return q(l2, c);
      }),
      Hu
    );
  var ao = V(A(), 1),
    o2 = "a",
    t0 = ce(function (t) {
      var c = t,
        { store: l, showOnHover: n = !0 } = c,
        o = _(c, ["store", "showOnHover"]);
      let r = Hu();
      (l = l || r), Je(l, !1);
      let d = Dc(o),
        u = (0, ao.useRef)(0);
      (0, ao.useEffect)(() => () => window.clearTimeout(u.current), []),
        (0, ao.useEffect)(
          () =>
            Ye(
              "mouseleave",
              (x) => {
                if (!l) return;
                let { anchorElement: G } = l.getState();
                G &&
                  x.target === G &&
                  (window.clearTimeout(u.current), (u.current = 0));
              },
              !0
            ),
          [l]
        );
      let i = o.onMouseMove,
        a = Kt(n),
        s = wa(),
        b = j((Z) => {
          if (
            (i?.(Z),
            d || !l || Z.defaultPrevented || u.current || !s() || !a(Z))
          )
            return;
          let x = Z.currentTarget;
          l.setAnchorElement(x), l.setDisclosureElement(x);
          let { showTimeout: G, timeout: g } = l.getState(),
            R = () => {
              (u.current = 0),
                s() &&
                  (l?.setAnchorElement(x),
                  l?.show(),
                  queueMicrotask(() => {
                    l?.setDisclosureElement(x);
                  }));
            },
            f = G ?? g;
          f === 0 ? R() : (u.current = window.setTimeout(R, f));
        }),
        m = o.onClick,
        X = j((Z) => {
          m?.(Z), l && (window.clearTimeout(u.current), (u.current = 0));
        }),
        p = (0, ao.useCallback)(
          (Z) => {
            if (!l) return;
            let { anchorElement: x } = l.getState();
            x?.isConnected || l.setAnchorElement(Z);
          },
          [l]
        );
      return (
        (o = w(J({}, o), { ref: Fe(p, o.ref), onMouseMove: b, onClick: X })),
        (o = Uc(o)),
        o
      );
    }),
    XA = P(function (t) {
      let c = t0(t);
      return q(o2, c);
    });
  function uI(e = {}) {
    var t;
    let c = (t = e.store) == null ? void 0 : t.getState(),
      l = nI(
        ge(te({}, e), {
          placement: K(e.placement, c?.placement, "top"),
          hideTimeout: K(e.hideTimeout, c?.hideTimeout, 0),
        })
      ),
      n = ge(te({}, l.getState()), {
        type: K(e.type, c?.type, "description"),
        skipTimeout: K(e.skipTimeout, c?.skipTimeout, 300),
      }),
      o = Me(n, l, e.store);
    return te(te({}, l), o);
  }
  function iI(e, t, c) {
    return Ze(e, c, "type"), Ze(e, c, "skipTimeout"), oI(e, t, c);
  }
  function Zu(e = {}) {
    let [t, c] = _t(uI, e);
    return iI(t, c, e);
  }
  var Ru = qe([lI], [ss]),
    d2 = Ru.useContext,
    vA = Ru.useScopedContext,
    fu = Ru.useProviderContext,
    FA = Ru.ContextProvider,
    aI = Ru.ScopedContextProvider;
  var sI = V(M(), 1),
    u2 = "div",
    i2 = ce(function (t) {
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
      let a = fu();
      (l = l || a),
        Je(l, !1),
        (i = ye(i, (b) => (0, sI.jsx)(aI, { value: l, children: b }), [l]));
      let s = l.useState((b) =>
        b.type === "description" ? "tooltip" : "none"
      );
      return (
        (i = J({ role: s }, i)),
        (i = e0(
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
    ms = lo(
      P(function (t) {
        let c = i2(t);
        return q(u2, c);
      }),
      fu
    );
  var Iu = V(A(), 1),
    a2 = "div",
    so = Me({ activeStore: null });
  function bI(e) {
    return () => {
      let { activeStore: t } = so.getState();
      t === e && so.setState("activeStore", null);
    };
  }
  var s2 = ce(function (t) {
      var c = t,
        { store: l, showOnHover: n = !0 } = c,
        o = _(c, ["store", "showOnHover"]);
      let r = fu();
      (l = l || r), Je(l, !1);
      let d = (0, Iu.useRef)(!1);
      (0, Iu.useEffect)(
        () =>
          he(l, ["mounted"], (Z) => {
            Z.mounted || (d.current = !1);
          }),
        [l]
      ),
        (0, Iu.useEffect)(() => {
          if (l)
            return He(
              bI(l),
              he(l, ["mounted", "skipTimeout"], (Z) => {
                if (!l) return;
                if (Z.mounted) {
                  let { activeStore: G } = so.getState();
                  return G !== l && G?.hide(), so.setState("activeStore", l);
                }
                let x = setTimeout(bI(l), Z.skipTimeout);
                return () => clearTimeout(x);
              })
            );
        }, [l]);
      let u = o.onMouseEnter,
        i = j((Z) => {
          u?.(Z), (d.current = !0);
        }),
        a = o.onFocusVisible,
        s = j((Z) => {
          a?.(Z),
            !Z.defaultPrevented &&
              (l?.setAnchorElement(Z.currentTarget), l?.show());
        }),
        b = o.onBlur,
        m = j((Z) => {
          if ((b?.(Z), Z.defaultPrevented)) return;
          let { activeStore: x } = so.getState();
          (d.current = !1), x === l && so.setState("activeStore", null);
        }),
        X = l.useState("type"),
        p = l.useState((Z) => {
          var x;
          return (x = Z.contentElement) == null ? void 0 : x.id;
        });
      return (
        (o = w(J({ "aria-labelledby": X === "label" ? p : void 0 }, o), {
          onMouseEnter: i,
          onFocusVisible: s,
          onBlur: m,
        })),
        (o = t0(
          J(
            {
              store: l,
              showOnHover(Z) {
                if (!d.current || Gn(n, Z)) return !1;
                let { activeStore: x } = so.getState();
                return x ? (l?.show(), !1) : !0;
              },
            },
            o
          )
        )),
        o
      );
    }),
    Xs = P(function (t) {
      let c = s2(t);
      return q(a2, c);
    });
  var c0 = V(A(), 1),
    yu = qe([mr, Hn], [fn, dr]),
    mI = yu.useContext,
    eL = yu.useScopedContext,
    tL = yu.useProviderContext,
    cL = yu.ContextProvider,
    lL = yu.ScopedContextProvider,
    nL = (0, c0.createContext)(!1),
    oL = (0, c0.createContext)(null);
  function XI(e = {}) {
    var t = e,
      { composite: c, combobox: l } = t,
      n = Va(t, ["composite", "combobox"]);
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
      u = gR(
        ge(te({}, n), {
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
      i = Qa(),
      a = ge(te({}, u.getState()), {
        selectedId: K(n.selectedId, d?.selectedId, n.defaultSelectedId),
        selectOnMove: K(n.selectOnMove, d?.selectOnMove, !0),
      }),
      s = Me(a, u, r);
    pt(s, () =>
      he(s, ["moves"], () => {
        let { activeId: X, selectOnMove: p } = s.getState();
        if (!p || !X) return;
        let Z = u.item(X);
        Z && (Z.dimmed || Z.disabled || s.setState("selectedId", Z.id));
      })
    );
    let b = !0;
    pt(s, () =>
      Zn(s, ["selectedId"], (X, p) => {
        if (!b) {
          b = !0;
          return;
        }
        (c && X.selectedId === p.selectedId) ||
          s.setState("activeId", X.selectedId);
      })
    ),
      pt(s, () =>
        he(s, ["selectedId", "renderedItems"], (X) => {
          if (X.selectedId !== void 0) return;
          let { activeId: p, renderedItems: Z } = s.getState(),
            x = u.item(p);
          if (x && !x.disabled && !x.dimmed) s.setState("selectedId", x.id);
          else {
            let G = Z.find((g) => !g.disabled && !g.dimmed);
            s.setState("selectedId", G?.id);
          }
        })
      ),
      pt(s, () =>
        he(s, ["renderedItems"], (X) => {
          let p = X.renderedItems;
          if (p.length)
            return he(i, ["renderedItems"], (Z) => {
              let x = Z.renderedItems;
              x.some((g) => !g.tabId) &&
                x.forEach((g, R) => {
                  if (g.tabId) return;
                  let f = p[R];
                  f && i.renderItem(ge(te({}, g), { tabId: f.id }));
                });
            });
        })
      );
    let m = null;
    return (
      pt(s, () => {
        let X = () => {
            m = s.getState().selectedId;
          },
          p = () => {
            (b = !1), s.setState("selectedId", m);
          };
        if (c && "setSelectElement" in c)
          return He(he(c, ["value"], X), he(c, ["mounted"], p));
        if (l) return He(he(l, ["selectedValue"], X), he(l, ["mounted"], p));
      }),
      ge(te(te({}, u), s), {
        panels: i,
        setSelectedId: (X) => s.setState("selectedId", X),
        select: (X) => {
          s.setState("selectedId", X), u.move(X);
        },
      })
    );
  }
  var xI = V(A(), 1);
  function GI(e, t, c) {
    Vl(t, [c.composite, c.combobox]),
      (e = HR(e, t, c)),
      Ze(e, c, "selectedId", "setSelectedId"),
      Ze(e, c, "selectOnMove");
    let [l, n] = _t(() => e.panels, {});
    return (
      Vl(n, [e, n]),
      Object.assign(
        (0, xI.useMemo)(() => w(J({}, e), { panels: l }), [e, l]),
        { composite: c.composite, combobox: c.combobox }
      )
    );
  }
  function Wu(e = {}) {
    let t = FR(),
      c = mI() || t;
    e = w(J({}, e), {
      composite: e.composite !== void 0 ? e.composite : c,
      combobox: e.combobox !== void 0 ? e.combobox : t,
    });
    let [l, n] = _t(XI, e);
    return GI(l, n, e);
  }
  var Bu = qe([Hn], [dr]),
    m2 = Bu.useContext,
    pI = Bu.useScopedContext,
    xs = Bu.useProviderContext,
    IL = Bu.ContextProvider,
    Gs = Bu.ScopedContextProvider;
  var gI = V(A(), 1),
    l0 = V(M(), 1),
    X2 = "button",
    x2 = ce(function (t) {
      var c = t,
        { store: l, getItem: n } = c,
        o = _(c, ["store", "getItem"]),
        r;
      let d = pI();
      (l = l || d), Je(l, !1);
      let u = Wc(),
        i = o.id || u,
        a = Dc(o),
        s = (0, gI.useCallback)(
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
        X = l.panels.useState((I) => {
          var y;
          return (y = I.items.find((W) => W.tabId === i)) == null
            ? void 0
            : y.id;
        }),
        p = u ? o.shouldRegisterItem : !1,
        Z = l.useState((I) => !!i && I.activeId === i),
        x = l.useState((I) => !!i && I.selectedId === i),
        G = l.useState((I) => !!l.item(I.activeId)),
        g = Z || (x && !G),
        R = x || ((r = o.accessibleWhenDisabled) != null ? r : !0);
      if (
        (oe(l.combobox || l.composite, "virtualFocus") &&
          (o = w(J({}, o), { tabIndex: -1 })),
        (o = w(
          J(
            {
              "id": i,
              "role": "tab",
              "aria-selected": x,
              "aria-controls": X || void 0,
            },
            o
          ),
          { onClick: m }
        )),
        l.composite)
      ) {
        let I = {
          id: i,
          accessibleWhenDisabled: R,
          store: l.composite,
          shouldRegisterItem: g && p,
          rowId: o.rowId,
          render: o.render,
        };
        o = w(J({}, o), {
          render: (0, l0.jsx)(
            Fx,
            w(J({}, I), {
              render:
                l.combobox && l.composite !== l.combobox
                  ? (0, l0.jsx)(Fx, w(J({}, I), { store: l.combobox }))
                  : I.render,
            })
          ),
        });
      }
      return (
        (o = vx(
          w(J({ store: l }, o), {
            accessibleWhenDisabled: R,
            getItem: s,
            shouldRegisterItem: p,
          })
        )),
        o
      );
    }),
    ps = Sa(
      P(function (t) {
        let c = x2(t);
        return q(X2, c);
      })
    );
  var HI = V(M(), 1),
    G2 = "div",
    p2 = ce(function (t) {
      var c = t,
        { store: l } = c,
        n = _(c, ["store"]);
      let o = xs();
      (l = l || o), Je(l, !1);
      let r = l.useState((d) =>
        d.orientation === "both" ? void 0 : d.orientation
      );
      return (
        (n = ye(n, (d) => (0, HI.jsx)(Gs, { value: l, children: d }), [l])),
        l.composite && (n = J({ focusable: !1 }, n)),
        (n = J({ "role": "tablist", "aria-orientation": r }, n)),
        (n = Wx(J({ store: l }, n))),
        n
      );
    }),
    gs = P(function (t) {
      let c = p2(t);
      return q(G2, c);
    });
  var sl = V(A(), 1),
    ZI = V(M(), 1),
    g2 = "div",
    H2 = ce(function (t) {
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
      let a = xs();
      (l = l || a), Je(l, !1);
      let s = (0, sl.useRef)(null),
        b = Wc(i.id),
        m = oe(l.panels, () => {
          var W;
          return o || ((W = l?.panels.item(b)) == null ? void 0 : W.tabId);
        }),
        X = oe(l, (W) => !!m && W.selectedId === m),
        p = Oa({ open: X }),
        Z = oe(p, "mounted"),
        x = (0, sl.useRef)(new Map()),
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
      (0, sl.useEffect)(() => {
        var W, B;
        if (!d || !Z) return;
        let F = G();
        if (!F) return;
        if (d === "reset") {
          F.scroll(0, 0);
          return;
        }
        if (!m) return;
        let S = x.current.get(m);
        F.scroll((W = S?.x) != null ? W : 0, (B = S?.y) != null ? B : 0);
        let Q = () => {
          x.current.set(m, { x: F.scrollLeft, y: F.scrollTop });
        };
        return (
          F.addEventListener("scroll", Q),
          () => {
            F.removeEventListener("scroll", Q);
          }
        );
      }, [d, Z, m, G, l]);
      let [g, R] = (0, sl.useState)(!1);
      (0, sl.useEffect)(() => {
        let W = s.current;
        if (!W) return;
        let B = to(W);
        R(!!B.length);
      }, []);
      let f = (0, sl.useCallback)(
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
            Q = F({ activeId: S });
          Q && (W.preventDefault(), l.move(Q));
        });
      return (
        (i = ye(i, (W) => (0, ZI.jsx)(Gs, { value: l, children: W }), [l])),
        (i = w(
          J({ "id": b, "role": "tabpanel", "aria-labelledby": m || void 0 }, i),
          {
            children: n && !Z ? null : i.children,
            ref: Fe(s, i.ref),
            onKeyDown: y,
          }
        )),
        (i = Uc(J({ focusable: !l.composite && !g }, i))),
        (i = co(J({ store: p }, i))),
        (i = du(w(J({ store: l.panels }, i), { getItem: f }))),
        i
      );
    }),
    Hs = P(function (t) {
      let c = H2(t);
      return q(g2, c);
    });
  var fI = V(M());
  function Z2(e) {
    let { shortcut: t, className: c } = e;
    if (!t) return null;
    let l, n;
    return (
      typeof t == "string" && (l = t),
      t !== null &&
        typeof t == "object" &&
        ((l = t.display), (n = t.ariaLabel)),
      (0, fI.jsx)("span", { "className": c, "aria-label": n, "children": l })
    );
  }
  var II = Z2;
  var R2 = {
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
    Zs = (e) => {
      var t;
      return (t = R2[e]) !== null && t !== void 0 ? t : "bottom";
    };
  var bo = V(M()),
    yI = (0, H.createContext)({ isNestedInTooltip: !1 }),
    f2 = 700,
    I2 = { isNestedInTooltip: !0 };
  function y2(e, t) {
    let {
        children: c,
        className: l,
        delay: n = f2,
        hideOnClick: o = !0,
        placement: r,
        position: d,
        shortcut: u,
        text: i,
        ...a
      } = e,
      { isNestedInTooltip: s } = (0, H.useContext)(yI),
      b = Gt(WI, "tooltip"),
      m = i || u ? b : void 0,
      X = H.Children.count(c) === 1,
      p;
    r !== void 0
      ? (p = r)
      : d !== void 0 &&
        ((p = Zs(d)),
        Lc("`position` prop in wp.components.tooltip", {
          since: "6.4",
          alternative: "`placement` prop",
        })),
      (p = p || "bottom");
    let Z = Zu({ placement: p, showTimeout: n }),
      x = oe(Z, "mounted");
    if (s) return X ? (0, bo.jsx)(Yl, { ...a, render: c }) : c;
    function G(g) {
      return m &&
        x &&
        g.props["aria-describedby"] === void 0 &&
        g.props["aria-label"] !== i
        ? (0, H.cloneElement)(g, { "aria-describedby": m })
        : g;
    }
    return (0, bo.jsxs)(yI.Provider, {
      value: I2,
      children: [
        (0, bo.jsx)(Xs, {
          onClick: o ? Z.hide : void 0,
          store: Z,
          render: X ? G(c) : void 0,
          ref: t,
          children: X ? void 0 : c,
        }),
        X &&
          (i || u) &&
          (0, bo.jsxs)(ms, {
            ...a,
            className: Ie("components-tooltip", l),
            unmountOnHide: !0,
            gutter: 4,
            id: m,
            overflowPadding: 0.5,
            store: Z,
            children: [
              i,
              u &&
                (0, bo.jsx)(II, {
                  className: i ? "components-tooltip__shortcut" : "",
                  shortcut: u,
                }),
            ],
          }),
      ],
    });
  }
  var WI = (0, H.forwardRef)(y2),
    BI = WI;
  var Ay = V(VI()),
    Ly = V(JI());
  var n0 = new Set();
  function S2() {
    return globalThis.SCRIPT_DEBUG === !0;
  }
  function wl(e) {
    if (S2() && !n0.has(e)) {
      console.warn(e);
      try {
        throw Error(e);
      } catch {}
      n0.add(e);
    }
  }
  function mo(e) {
    return e != null;
  }
  function YI(e = [], t) {
    var c;
    return (c = e.find(mo)) !== null && c !== void 0 ? c : t;
  }
  var NI = { initial: void 0, fallback: "" };
  function Q2(e, t = NI) {
    let { initial: c, fallback: l } = { ...NI, ...t },
      [n, o] = (0, H.useState)(e),
      r = mo(e);
    (0, H.useEffect)(() => {
      r && n && o(void 0);
    }, [r, n]);
    let d = YI([e, n, c], l),
      u = (0, H.useCallback)(
        (i) => {
          r || o(i);
        },
        [r]
      );
    return [d, u];
  }
  var o0 = Q2;
  function O2(e, t) {
    let c = (0, H.useRef)(!1);
    (0, H.useEffect)(() => {
      if (c.current) return e();
      c.current = !0;
    }, t),
      (0, H.useEffect)(
        () => () => {
          c.current = !1;
        },
        []
      );
  }
  var Fu = O2;
  var po = V(A()),
    ku = V(A());
  var A2 = !1;
  function L2(e) {
    if (e.sheet) return e.sheet;
    for (var t = 0; t < document.styleSheets.length; t++)
      if (document.styleSheets[t].ownerNode === e)
        return document.styleSheets[t];
  }
  function T2(e) {
    var t = document.createElement("style");
    return (
      t.setAttribute("data-emotion", e.key),
      e.nonce !== void 0 && t.setAttribute("nonce", e.nonce),
      t.appendChild(document.createTextNode("")),
      t.setAttribute("data-s", ""),
      t
    );
  }
  var zI = (function () {
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
        (this.isSpeedy = c.speedy === void 0 ? !A2 : c.speedy),
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
          this._insertTag(T2(this));
        var n = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var o = L2(n);
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
  var gt = "-ms-",
    hu = "-moz-",
    ie = "-webkit-",
    Rs = "comm",
    Ir = "rule",
    yr = "decl";
  var kI = "@import";
  var fs = "@keyframes";
  var wI = "@layer";
  var SI = Math.abs,
    Xo = String.fromCharCode,
    QI = Object.assign;
  function OI(e, t) {
    return je(e, 0) ^ 45
      ? (((((((t << 2) ^ je(e, 0)) << 2) ^ je(e, 1)) << 2) ^ je(e, 2)) << 2) ^
          je(e, 3)
      : 0;
  }
  function Is(e) {
    return e.trim();
  }
  function r0(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function re(e, t, c) {
    return e.replace(t, c);
  }
  function Vu(e, t) {
    return e.indexOf(t);
  }
  function je(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function Wn(e, t, c) {
    return e.slice(t, c);
  }
  function Qt(e) {
    return e.length;
  }
  function Wr(e) {
    return e.length;
  }
  function Br(e, t) {
    return t.push(e), e;
  }
  function d0(e, t) {
    return e.map(t).join("");
  }
  var ys = 1,
    vr = 1,
    AI = 0,
    Ot = 0,
    $e = 0,
    hr = "";
  function Cu(e, t, c, l, n, o, r) {
    return {
      value: e,
      root: t,
      parent: c,
      type: l,
      props: n,
      children: o,
      line: ys,
      column: vr,
      length: r,
      return: "",
    };
  }
  function Vr(e, t) {
    return QI(
      Cu("", null, null, "", null, null, 0),
      e,
      { length: -e.length },
      t
    );
  }
  function LI() {
    return $e;
  }
  function TI() {
    return (
      ($e = Ot > 0 ? je(hr, --Ot) : 0), vr--, $e === 10 && ((vr = 1), ys--), $e
    );
  }
  function At() {
    return (
      ($e = Ot < AI ? je(hr, Ot++) : 0), vr++, $e === 10 && ((vr = 1), ys++), $e
    );
  }
  function Fc() {
    return je(hr, Ot);
  }
  function Ju() {
    return Ot;
  }
  function Cr(e, t) {
    return Wn(hr, e, t);
  }
  function Fr(e) {
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
  function Ws(e) {
    return (ys = vr = 1), (AI = Qt((hr = e))), (Ot = 0), [];
  }
  function Bs(e) {
    return (hr = ""), e;
  }
  function Jr(e) {
    return Is(Cr(Ot - 1, u0(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function DI(e) {
    for (; ($e = Fc()) && $e < 33; ) At();
    return Fr(e) > 2 || Fr($e) > 3 ? "" : " ";
  }
  function UI(e, t) {
    for (
      ;
      --t &&
      At() &&
      !($e < 48 || $e > 102 || ($e > 57 && $e < 65) || ($e > 70 && $e < 97));

    );
    return Cr(e, Ju() + (t < 6 && Fc() == 32 && At() == 32));
  }
  function u0(e) {
    for (; At(); )
      switch ($e) {
        case e:
          return Ot;
        case 34:
        case 39:
          e !== 34 && e !== 39 && u0($e);
          break;
        case 40:
          e === 41 && u0(e);
          break;
        case 92:
          At();
          break;
      }
    return Ot;
  }
  function MI(e, t) {
    for (; At() && e + $e !== 57; ) if (e + $e === 84 && Fc() === 47) break;
    return "/*" + Cr(t, Ot - 1) + "*" + Xo(e === 47 ? e : At());
  }
  function EI(e) {
    for (; !Fr(Fc()); ) At();
    return Cr(e, Ot);
  }
  function KI(e) {
    return Bs(vs("", null, null, null, [""], (e = Ws(e)), 0, [0], e));
  }
  function vs(e, t, c, l, n, o, r, d, u) {
    for (
      var i = 0,
        a = 0,
        s = r,
        b = 0,
        m = 0,
        X = 0,
        p = 1,
        Z = 1,
        x = 1,
        G = 0,
        g = "",
        R = n,
        f = o,
        I = l,
        y = g;
      Z;

    )
      switch (((X = G), (G = At()))) {
        case 40:
          if (X != 108 && je(y, s - 1) == 58) {
            Vu((y += re(Jr(G), "&", "&\f")), "&\f") != -1 && (x = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          y += Jr(G);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          y += DI(X);
          break;
        case 92:
          y += UI(Ju() - 1, 7);
          continue;
        case 47:
          switch (Fc()) {
            case 42:
            case 47:
              Br(D2(MI(At(), Ju()), t, c), u);
              break;
            default:
              y += "/";
          }
          break;
        case 123 * p:
          d[i++] = Qt(y) * x;
        case 125 * p:
        case 59:
        case 0:
          switch (G) {
            case 0:
            case 125:
              Z = 0;
            case 59 + a:
              x == -1 && (y = re(y, /\f/g, "")),
                m > 0 &&
                  Qt(y) - s &&
                  Br(
                    m > 32
                      ? PI(y + ";", l, c, s - 1)
                      : PI(re(y, " ", "") + ";", l, c, s - 2),
                    u
                  );
              break;
            case 59:
              y += ";";
            default:
              if (
                (Br((I = jI(y, t, c, i, a, n, d, g, (R = []), (f = []), s)), o),
                G === 123)
              )
                if (a === 0) vs(y, t, I, I, R, o, s, d, f);
                else
                  switch (b === 99 && je(y, 3) === 110 ? 100 : b) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      vs(
                        e,
                        I,
                        I,
                        l && Br(jI(e, I, I, 0, 0, n, d, g, n, (R = []), s), f),
                        n,
                        f,
                        s,
                        d,
                        l ? R : f
                      );
                      break;
                    default:
                      vs(y, I, I, I, [""], f, 0, d, f);
                  }
          }
          (i = a = m = 0), (p = x = 1), (g = y = ""), (s = r);
          break;
        case 58:
          (s = 1 + Qt(y)), (m = X);
        default:
          if (p < 1) {
            if (G == 123) --p;
            else if (G == 125 && p++ == 0 && TI() == 125) continue;
          }
          switch (((y += Xo(G)), G * p)) {
            case 38:
              x = a > 0 ? 1 : ((y += "\f"), -1);
              break;
            case 44:
              (d[i++] = (Qt(y) - 1) * x), (x = 1);
              break;
            case 64:
              Fc() === 45 && (y += Jr(At())),
                (b = Fc()),
                (a = s = Qt((g = y += EI(Ju())))),
                G++;
              break;
            case 45:
              X === 45 && Qt(y) == 2 && (p = 0);
          }
      }
    return o;
  }
  function jI(e, t, c, l, n, o, r, d, u, i, a) {
    for (
      var s = n - 1, b = n === 0 ? o : [""], m = Wr(b), X = 0, p = 0, Z = 0;
      X < l;
      ++X
    )
      for (var x = 0, G = Wn(e, s + 1, (s = SI((p = r[X])))), g = e; x < m; ++x)
        (g = Is(p > 0 ? b[x] + " " + G : re(G, /&\f/g, b[x]))) && (u[Z++] = g);
    return Cu(e, t, c, n === 0 ? Ir : d, u, i, a);
  }
  function D2(e, t, c) {
    return Cu(e, t, c, Rs, Xo(LI()), Wn(e, 2, -2), 0);
  }
  function PI(e, t, c, l) {
    return Cu(e, t, c, yr, Wn(e, 0, l), Wn(e, l + 1, -1), l);
  }
  function xo(e, t) {
    for (var c = "", l = Wr(e), n = 0; n < l; n++) c += t(e[n], n, e, t) || "";
    return c;
  }
  function _I(e, t, c, l) {
    switch (e.type) {
      case wI:
        if (e.children.length) break;
      case kI:
      case yr:
        return (e.return = e.return || e.value);
      case Rs:
        return "";
      case fs:
        return (e.return = e.value + "{" + xo(e.children, l) + "}");
      case Ir:
        e.value = e.props.join(",");
    }
    return Qt((c = xo(e.children, l)))
      ? (e.return = e.value + "{" + c + "}")
      : "";
  }
  function qI(e) {
    var t = Wr(e);
    return function (c, l, n, o) {
      for (var r = "", d = 0; d < t; d++) r += e[d](c, l, n, o) || "";
      return r;
    };
  }
  function $I(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  hs();
  var U2 = function (t, c, l) {
      for (
        var n = 0, o = 0;
        (n = o), (o = Fc()), n === 38 && o === 12 && (c[l] = 1), !Fr(o);

      )
        At();
      return Cr(t, Ot);
    },
    M2 = function (t, c) {
      var l = -1,
        n = 44;
      do
        switch (Fr(n)) {
          case 0:
            n === 38 && Fc() === 12 && (c[l] = 1), (t[l] += U2(Ot - 1, c, l));
            break;
          case 2:
            t[l] += Jr(n);
            break;
          case 4:
            if (n === 44) {
              (t[++l] = Fc() === 58 ? "&\f" : ""), (c[l] = t[l].length);
              break;
            }
          default:
            t[l] += Xo(n);
        }
      while ((n = At()));
      return t;
    },
    E2 = function (t, c) {
      return Bs(M2(Ws(t), c));
    },
    ey = new WeakMap(),
    j2 = function (t) {
      if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
        for (
          var c = t.value,
            l = t.parent,
            n = t.column === l.column && t.line === l.line;
          l.type !== "rule";

        )
          if (((l = l.parent), !l)) return;
        if (
          !(t.props.length === 1 && c.charCodeAt(0) !== 58 && !ey.get(l)) &&
          !n
        ) {
          ey.set(t, !0);
          for (
            var o = [], r = E2(c, o), d = l.props, u = 0, i = 0;
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
    P2 = function (t) {
      if (t.type === "decl") {
        var c = t.value;
        c.charCodeAt(0) === 108 &&
          c.charCodeAt(2) === 98 &&
          ((t.return = ""), (t.value = ""));
      }
    };
  function ty(e, t) {
    switch (OI(e, t)) {
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
        return ie + e + hu + e + gt + e + e;
      case 6828:
      case 4268:
        return ie + e + gt + e + e;
      case 6165:
        return ie + e + gt + "flex-" + e + e;
      case 5187:
        return (
          ie +
          e +
          re(e, /(\w+).+(:[^]+)/, ie + "box-$1$2" + gt + "flex-$1$2") +
          e
        );
      case 5443:
        return ie + e + gt + "flex-item-" + re(e, /flex-|-self/, "") + e;
      case 4675:
        return (
          ie +
          e +
          gt +
          "flex-line-pack" +
          re(e, /align-content|flex-|-self/, "") +
          e
        );
      case 5548:
        return ie + e + gt + re(e, "shrink", "negative") + e;
      case 5292:
        return ie + e + gt + re(e, "basis", "preferred-size") + e;
      case 6060:
        return (
          ie +
          "box-" +
          re(e, "-grow", "") +
          ie +
          e +
          gt +
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
              ie + "box-pack:$3" + gt + "flex-pack:$3"
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
        if (Qt(e) - 1 - t > 6)
          switch (je(e, t + 1)) {
            case 109:
              if (je(e, t + 4) !== 45) break;
            case 102:
              return (
                re(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  "$1" +
                    ie +
                    "$2-$3$1" +
                    hu +
                    (je(e, t + 3) == 108 ? "$3" : "$2-$3")
                ) + e
              );
            case 115:
              return ~Vu(e, "stretch")
                ? ty(re(e, "stretch", "fill-available"), t) + e
                : e;
          }
        break;
      case 4949:
        if (je(e, t + 1) !== 115) break;
      case 6444:
        switch (je(e, Qt(e) - 3 - (~Vu(e, "!important") && 10))) {
          case 107:
            return re(e, ":", ":" + ie) + e;
          case 101:
            return (
              re(
                e,
                /(.+:)([^;!]+)(;|!.+)?/,
                "$1" +
                  ie +
                  (je(e, 14) === 45 ? "inline-" : "") +
                  "box$3$1" +
                  ie +
                  "$2$3$1" +
                  gt +
                  "$2box$3"
              ) + e
            );
        }
        break;
      case 5936:
        switch (je(e, t + 11)) {
          case 114:
            return ie + e + gt + re(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
          case 108:
            return ie + e + gt + re(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
          case 45:
            return ie + e + gt + re(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
        }
        return ie + e + gt + e + e;
    }
    return e;
  }
  var K2 = function (t, c, l, n) {
      if (t.length > -1 && !t.return)
        switch (t.type) {
          case yr:
            t.return = ty(t.value, t.length);
            break;
          case fs:
            return xo([Vr(t, { value: re(t.value, "@", "@" + ie) })], n);
          case Ir:
            if (t.length)
              return d0(t.props, function (o) {
                switch (r0(o, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return xo(
                      [
                        Vr(t, {
                          props: [re(o, /:(read-\w+)/, ":" + hu + "$1")],
                        }),
                      ],
                      n
                    );
                  case "::placeholder":
                    return xo(
                      [
                        Vr(t, {
                          props: [re(o, /:(plac\w+)/, ":" + ie + "input-$1")],
                        }),
                        Vr(t, {
                          props: [re(o, /:(plac\w+)/, ":" + hu + "$1")],
                        }),
                        Vr(t, {
                          props: [re(o, /:(plac\w+)/, gt + "input-$1")],
                        }),
                      ],
                      n
                    );
                }
                return "";
              });
        }
    },
    _2 = [K2],
    Yr = function (t) {
      var c = t.key;
      if (c === "css") {
        var l = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(l, function (p) {
          var Z = p.getAttribute("data-emotion");
          Z.indexOf(" ") !== -1 &&
            (document.head.appendChild(p), p.setAttribute("data-s", ""));
        });
      }
      var n = t.stylisPlugins || _2,
        o = {},
        r,
        d = [];
      (r = t.container || document.head),
        Array.prototype.forEach.call(
          document.querySelectorAll('style[data-emotion^="' + c + ' "]'),
          function (p) {
            for (
              var Z = p.getAttribute("data-emotion").split(" "), x = 1;
              x < Z.length;
              x++
            )
              o[Z[x]] = !0;
            d.push(p);
          }
        );
      var u,
        i = [j2, P2];
      {
        var a,
          s = [
            _I,
            $I(function (p) {
              a.insert(p);
            }),
          ],
          b = qI(i.concat(n, s)),
          m = function (Z) {
            return xo(KI(Z), b);
          };
        u = function (Z, x, G, g) {
          (a = G),
            m(Z ? Z + "{" + x.styles + "}" : x.styles),
            g && (X.inserted[x.name] = !0);
        };
      }
      var X = {
        key: c,
        sheet: new zI({
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
      return X.sheet.hydrate(d), X;
    };
  function Yu() {
    return (
      (Yu = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var c = arguments[t];
              for (var l in c) ({}).hasOwnProperty.call(c, l) && (e[l] = c[l]);
            }
            return e;
          }),
      Yu.apply(null, arguments)
    );
  }
  var aV = !0;
  function Go(e, t, c) {
    var l = "";
    return (
      c.split(" ").forEach(function (n) {
        e[n] !== void 0 ? t.push(e[n] + ";") : n && (l += n + " ");
      }),
      l
    );
  }
  var Nu = function (t, c, l) {
      var n = t.key + "-" + c.name;
      (l === !1 || aV === !1) &&
        t.registered[n] === void 0 &&
        (t.registered[n] = c.styles);
    },
    Bn = function (t, c, l) {
      Nu(t, c, l);
      var n = t.key + "-" + c.name;
      if (t.inserted[c.name] === void 0) {
        var o = c;
        do t.insert(c === o ? "." + n : "", o, t.sheet, !0), (o = o.next);
        while (o !== void 0);
      }
    };
  function my(e) {
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
  var Xy = {
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
  hs();
  var sV = !1,
    bV = /[A-Z]|^ms/g,
    mV = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
    gy = function (t) {
      return t.charCodeAt(1) === 45;
    },
    xy = function (t) {
      return t != null && typeof t != "boolean";
    },
    X0 = Fs(function (e) {
      return gy(e) ? e : e.replace(bV, "-$&").toLowerCase();
    }),
    Gy = function (t, c) {
      switch (t) {
        case "animation":
        case "animationName":
          if (typeof c == "string")
            return c.replace(mV, function (l, n, o) {
              return (bl = { name: n, styles: o, next: bl }), n;
            });
      }
      return Xy[t] !== 1 && !gy(t) && typeof c == "number" && c !== 0
        ? c + "px"
        : c;
    },
    XV =
      "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function zu(e, t, c) {
    if (c == null) return "";
    var l = c;
    if (l.__emotion_styles !== void 0) return l;
    switch (typeof c) {
      case "boolean":
        return "";
      case "object": {
        var n = c;
        if (n.anim === 1)
          return (bl = { name: n.name, styles: n.styles, next: bl }), n.name;
        var o = c;
        if (o.styles !== void 0) {
          var r = o.next;
          if (r !== void 0)
            for (; r !== void 0; )
              (bl = { name: r.name, styles: r.styles, next: bl }), (r = r.next);
          var d = o.styles + ";";
          return d;
        }
        return xV(e, t, c);
      }
      case "function": {
        if (e !== void 0) {
          var u = bl,
            i = c(e);
          return (bl = u), zu(e, t, i);
        }
        break;
      }
    }
    var a = c;
    if (t == null) return a;
    var s = t[a];
    return s !== void 0 ? s : a;
  }
  function xV(e, t, c) {
    var l = "";
    if (Array.isArray(c))
      for (var n = 0; n < c.length; n++) l += zu(e, t, c[n]) + ";";
    else
      for (var o in c) {
        var r = c[o];
        if (typeof r != "object") {
          var d = r;
          t != null && t[d] !== void 0
            ? (l += o + "{" + t[d] + "}")
            : xy(d) && (l += X0(o) + ":" + Gy(o, d) + ";");
        } else {
          if (o === "NO_COMPONENT_SELECTOR" && sV) throw new Error(XV);
          if (
            Array.isArray(r) &&
            typeof r[0] == "string" &&
            (t == null || t[r[0]] === void 0)
          )
            for (var u = 0; u < r.length; u++)
              xy(r[u]) && (l += X0(o) + ":" + Gy(o, r[u]) + ";");
          else {
            var i = zu(e, t, r);
            switch (o) {
              case "animation":
              case "animationName": {
                l += X0(o) + ":" + i + ";";
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
  var py = /label:\s*([^\s;{]+)\s*(;|$)/g,
    bl;
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
    bl = void 0;
    var o = e[0];
    if (o == null || o.raw === void 0) (l = !1), (n += zu(c, t, o));
    else {
      var r = o;
      n += r[0];
    }
    for (var d = 1; d < e.length; d++)
      if (((n += zu(c, t, e[d])), l)) {
        var u = o;
        n += u[d];
      }
    py.lastIndex = 0;
    for (var i = "", a; (a = py.exec(n)) !== null; ) i += "-" + a[1];
    var s = my(n) + i;
    return { name: s, styles: n, next: bl };
  }
  var Os = V(A()),
    GV = function (t) {
      return t();
    },
    pV = Os.useInsertionEffect ? Os.useInsertionEffect : !1,
    As = pV || GV;
  var x0 = po.createContext(
      typeof HTMLElement < "u" ? Yr({ key: "css" }) : null
    ),
    G0 = x0.Provider,
    p0 = function () {
      return (0, ku.useContext)(x0);
    },
    g0 = function (t) {
      return (0, ku.forwardRef)(function (c, l) {
        var n = (0, ku.useContext)(x0);
        return t(c, n, l);
      });
    },
    H0 = po.createContext({});
  var WD = {}.hasOwnProperty;
  var Ls = V(A());
  var wD = V(by());
  function D() {
    for (var e = arguments.length, t = new Array(e), c = 0; c < e; c++)
      t[c] = arguments[c];
    return Sl(t);
  }
  function Hy(e, t) {
    if (e.inserted[t.name] === void 0) return e.insert("", t, e.sheet, !0);
  }
  function Zy(e, t, c) {
    var l = [],
      n = Go(e, l, c);
    return l.length < 2 ? c : n + t(l);
  }
  var Ry = function (t) {
      var c = Yr(t);
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
            Hy(c, {
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
          Hy(c, s);
        },
        r = function () {
          for (var u = arguments.length, i = new Array(u), a = 0; a < u; a++)
            i[a] = arguments[a];
          return Zy(c.registered, l, gV(i));
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
        getRegisteredStyles: Go.bind(null, c.registered),
        merge: Zy.bind(null, c.registered, l),
      };
    },
    gV = function e(t) {
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
  var ml = Ry({ key: "css" }),
    jD = ml.flush,
    PD = ml.hydrate,
    fy = ml.cx,
    KD = ml.merge,
    _D = ml.getRegisteredStyles,
    qD = ml.injectGlobal,
    $D = ml.keyframes,
    eU = ml.css,
    tU = ml.sheet,
    cU = ml.cache;
  var HV = (e) =>
      typeof e < "u" &&
      e !== null &&
      ["name", "styles"].every((t) => typeof e[t] < "u"),
    Lt = () => {
      let e = p0();
      return (0, H.useCallback)(
        (...c) => {
          if (e === null)
            throw new Error(
              "The `useCx` hook should be only used within a valid Emotion Cache Context"
            );
          return fy(
            ...c.map((l) => (HV(l) ? (Bn(e, l, !1), `${e.key}-${l.name}`) : l))
          );
        },
        [e]
      );
    };
  var Z0 = {
    name: "kv6lnz",
    styles: "box-sizing:border-box;*,*::before,*::after{box-sizing:inherit;}",
  };
  var ZV = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
    Ql = function (e) {
      return typeof e == "string" ? e.length > 0 : typeof e == "number";
    },
    it = function (e, t, c) {
      return (
        t === void 0 && (t = 0),
        c === void 0 && (c = Math.pow(10, t)),
        Math.round(c * e) / c + 0
      );
    },
    Vc = function (e, t, c) {
      return (
        t === void 0 && (t = 0),
        c === void 0 && (c = 1),
        e > c ? c : e > t ? e : t
      );
    },
    Vy = function (e) {
      return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
    },
    Iy = function (e) {
      return {
        r: Vc(e.r, 0, 255),
        g: Vc(e.g, 0, 255),
        b: Vc(e.b, 0, 255),
        a: Vc(e.a),
      };
    },
    R0 = function (e) {
      return { r: it(e.r), g: it(e.g), b: it(e.b), a: it(e.a, 3) };
    },
    RV = /^#([0-9a-f]{3,8})$/i,
    Ts = function (e) {
      var t = e.toString(16);
      return t.length < 2 ? "0" + t : t;
    },
    Cy = function (e) {
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
    Jy = function (e) {
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
    yy = function (e) {
      return { h: Vy(e.h), s: Vc(e.s, 0, 100), l: Vc(e.l, 0, 100), a: Vc(e.a) };
    },
    Wy = function (e) {
      return { h: it(e.h), s: it(e.s), l: it(e.l), a: it(e.a, 3) };
    },
    By = function (e) {
      return Jy(
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
    wu = function (e) {
      return {
        h: (t = Cy(e)).h,
        s:
          (n = ((200 - (c = t.s)) * (l = t.v)) / 100) > 0 && n < 200
            ? ((c * l) / 100 / (n <= 100 ? n : 200 - n)) * 100
            : 0,
        l: n / 2,
        a: t.a,
      };
      var t, c, l, n;
    },
    fV =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    IV =
      /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    yV =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    WV =
      /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
    y0 = {
      string: [
        [
          function (e) {
            var t = RV.exec(e);
            return t
              ? (e = t[1]).length <= 4
                ? {
                    r: parseInt(e[0] + e[0], 16),
                    g: parseInt(e[1] + e[1], 16),
                    b: parseInt(e[2] + e[2], 16),
                    a:
                      e.length === 4
                        ? it(parseInt(e[3] + e[3], 16) / 255, 2)
                        : 1,
                  }
                : e.length === 6 || e.length === 8
                  ? {
                      r: parseInt(e.substr(0, 2), 16),
                      g: parseInt(e.substr(2, 2), 16),
                      b: parseInt(e.substr(4, 2), 16),
                      a:
                        e.length === 8
                          ? it(parseInt(e.substr(6, 2), 16) / 255, 2)
                          : 1,
                    }
                  : null
              : null;
          },
          "hex",
        ],
        [
          function (e) {
            var t = yV.exec(e) || WV.exec(e);
            return t
              ? t[2] !== t[4] || t[4] !== t[6]
                ? null
                : Iy({
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
            var t = fV.exec(e) || IV.exec(e);
            if (!t) return null;
            var c,
              l,
              n = yy({
                h:
                  ((c = t[1]),
                  (l = t[2]),
                  l === void 0 && (l = "deg"),
                  Number(c) * (ZV[l] || 1)),
                s: Number(t[3]),
                l: Number(t[4]),
                a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
              });
            return By(n);
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
            return Ql(t) && Ql(c) && Ql(l)
              ? Iy({ r: Number(t), g: Number(c), b: Number(l), a: Number(o) })
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
            if (!Ql(t) || !Ql(c) || !Ql(l)) return null;
            var r = yy({
              h: Number(t),
              s: Number(c),
              l: Number(l),
              a: Number(o),
            });
            return By(r);
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
            if (!Ql(t) || !Ql(c) || !Ql(l)) return null;
            var r = (function (d) {
              return {
                h: Vy(d.h),
                s: Vc(d.s, 0, 100),
                v: Vc(d.v, 0, 100),
                a: Vc(d.a),
              };
            })({ h: Number(t), s: Number(c), v: Number(l), a: Number(o) });
            return Jy(r);
          },
          "hsv",
        ],
      ],
    },
    vy = function (e, t) {
      for (var c = 0; c < t.length; c++) {
        var l = t[c][0](e);
        if (l) return [l, t[c][1]];
      }
      return [null, void 0];
    },
    BV = function (e) {
      return typeof e == "string"
        ? vy(e.trim(), y0.string)
        : typeof e == "object" && e !== null
          ? vy(e, y0.object)
          : [null, void 0];
    };
  var f0 = function (e, t) {
      var c = wu(e);
      return { h: c.h, s: Vc(c.s + 100 * t, 0, 100), l: c.l, a: c.a };
    },
    I0 = function (e) {
      return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
    },
    Fy = function (e, t) {
      var c = wu(e);
      return { h: c.h, s: c.s, l: Vc(c.l + 100 * t, 0, 100), a: c.a };
    },
    W0 = (function () {
      function e(t) {
        (this.parsed = BV(t)[0]),
          (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
      }
      return (
        (e.prototype.isValid = function () {
          return this.parsed !== null;
        }),
        (e.prototype.brightness = function () {
          return it(I0(this.rgba), 2);
        }),
        (e.prototype.isDark = function () {
          return I0(this.rgba) < 0.5;
        }),
        (e.prototype.isLight = function () {
          return I0(this.rgba) >= 0.5;
        }),
        (e.prototype.toHex = function () {
          return (
            (t = R0(this.rgba)),
            (c = t.r),
            (l = t.g),
            (n = t.b),
            (r = (o = t.a) < 1 ? Ts(it(255 * o)) : ""),
            "#" + Ts(c) + Ts(l) + Ts(n) + r
          );
          var t, c, l, n, o, r;
        }),
        (e.prototype.toRgb = function () {
          return R0(this.rgba);
        }),
        (e.prototype.toRgbString = function () {
          return (
            (t = R0(this.rgba)),
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
          return Wy(wu(this.rgba));
        }),
        (e.prototype.toHslString = function () {
          return (
            (t = Wy(wu(this.rgba))),
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
            (t = Cy(this.rgba)),
            { h: it(t.h), s: it(t.s), v: it(t.v), a: it(t.a, 3) }
          );
          var t;
        }),
        (e.prototype.invert = function () {
          return hc({
            r: 255 - (t = this.rgba).r,
            g: 255 - t.g,
            b: 255 - t.b,
            a: t.a,
          });
          var t;
        }),
        (e.prototype.saturate = function (t) {
          return t === void 0 && (t = 0.1), hc(f0(this.rgba, t));
        }),
        (e.prototype.desaturate = function (t) {
          return t === void 0 && (t = 0.1), hc(f0(this.rgba, -t));
        }),
        (e.prototype.grayscale = function () {
          return hc(f0(this.rgba, -1));
        }),
        (e.prototype.lighten = function (t) {
          return t === void 0 && (t = 0.1), hc(Fy(this.rgba, t));
        }),
        (e.prototype.darken = function (t) {
          return t === void 0 && (t = 0.1), hc(Fy(this.rgba, -t));
        }),
        (e.prototype.rotate = function (t) {
          return t === void 0 && (t = 15), this.hue(this.hue() + t);
        }),
        (e.prototype.alpha = function (t) {
          return typeof t == "number"
            ? hc({ r: (c = this.rgba).r, g: c.g, b: c.b, a: t })
            : it(this.rgba.a, 3);
          var c;
        }),
        (e.prototype.hue = function (t) {
          var c = wu(this.rgba);
          return typeof t == "number"
            ? hc({ h: t, s: c.s, l: c.l, a: c.a })
            : it(c.h);
        }),
        (e.prototype.isEqual = function (t) {
          return this.toHex() === hc(t).toHex();
        }),
        e
      );
    })(),
    hc = function (e) {
      return e instanceof W0 ? e : new W0(e);
    },
    hy = [],
    Yy = function (e) {
      e.forEach(function (t) {
        hy.indexOf(t) < 0 && (t(W0, y0), hy.push(t));
      });
    };
  function Ny(e, t) {
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
        for (var X in c) {
          var p =
            ((d = a),
            (u = o[X]),
            Math.pow(d.r - u.r, 2) +
              Math.pow(d.g - u.g, 2) +
              Math.pow(d.b - u.b, 2));
          p < s && ((s = p), (b = X));
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
  var B0;
  Yy([Ny]);
  function vV() {
    if (!(typeof document > "u")) {
      if (!B0) {
        let e = document.createElement("div");
        e.setAttribute("data-g2-color-computation-node", ""),
          document.body.appendChild(e),
          (B0 = e);
      }
      return B0;
    }
  }
  function FV(e) {
    return typeof e != "string" ? !1 : hc(e).isValid();
  }
  function hV(e) {
    if (typeof e != "string") return "";
    if (FV(e)) return e;
    if (!e.includes("var(") || typeof document > "u") return "";
    let t = vV();
    if (!t) return "";
    t.style.background = e;
    let c = window?.getComputedStyle(t).background;
    return (t.style.background = ""), c || "";
  }
  var VV = Xn(hV);
  function CV(e) {
    let t = VV(e);
    return hc(t).isLight() ? "#000000" : "#ffffff";
  }
  function zy(e) {
    return CV(e) === "#000000" ? "dark" : "light";
  }
  var ky = new RegExp(/-left/g),
    wy = new RegExp(/-right/g),
    Sy = new RegExp(/Left/g),
    Qy = new RegExp(/Right/g);
  function JV(e) {
    return e === "left"
      ? "right"
      : e === "right"
        ? "left"
        : ky.test(e)
          ? e.replace(ky, "-right")
          : wy.test(e)
            ? e.replace(wy, "-left")
            : Sy.test(e)
              ? e.replace(Sy, "Right")
              : Qy.test(e)
                ? e.replace(Qy, "Left")
                : e;
  }
  var YV = (e = {}) =>
    Object.fromEntries(Object.entries(e).map(([t, c]) => [JV(t), c]));
  function Cc(e = {}, t) {
    return () =>
      t
        ? En()
          ? D(t, "", "")
          : D(e, "", "")
        : En()
          ? D(YV(e), "", "")
          : D(e, "", "");
  }
  Cc.watch = () => En();
  var Oy = {
    "default.fontFamily":
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    "default.fontSize": "13px",
    "helpText.fontSize": "12px",
    "mobileTextMinFontSize": "16px",
  };
  function Su(e) {
    var t;
    return (t = Oy[e]) !== null && t !== void 0 ? t : "";
  }
  var NV = "4px";
  function $(e) {
    if (typeof e > "u") return;
    if (!e) return "0";
    let t = typeof e == "number" ? e : Number(e);
    return (typeof window < "u" &&
      window.CSS?.supports?.("margin", e.toString())) ||
      Number.isNaN(t)
      ? e.toString()
      : `calc(${NV} * ${e})`;
  }
  var Ds = "#fff",
    Xl = {
      900: "#1e1e1e",
      800: "#2f2f2f",
      700: "#757575",
      600: "#949494",
      400: "#ccc",
      300: "#ddd",
      200: "#e0e0e0",
      100: "#f0f0f0",
    },
    zV = { yellow: "#f0b849", red: "#d94f4f", green: "#4ab866" },
    xl = {
      accent:
        "var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9))",
      accentDarker10:
        "var(--wp-components-color-accent-darker-10, var(--wp-admin-theme-color-darker-10, #2145e6))",
      accentDarker20:
        "var(--wp-components-color-accent-darker-20, var(--wp-admin-theme-color-darker-20, #183ad6))",
      accentInverted: `var(--wp-components-color-accent-inverted, ${Ds})`,
      background: `var(--wp-components-color-background, ${Ds})`,
      foreground: `var(--wp-components-color-foreground, ${Xl[900]})`,
      foregroundInverted: `var(--wp-components-color-foreground-inverted, ${Ds})`,
      gray: {
        900: `var(--wp-components-color-foreground, ${Xl[900]})`,
        800: `var(--wp-components-color-gray-800, ${Xl[800]})`,
        700: `var(--wp-components-color-gray-700, ${Xl[700]})`,
        600: `var(--wp-components-color-gray-600, ${Xl[600]})`,
        400: `var(--wp-components-color-gray-400, ${Xl[400]})`,
        300: `var(--wp-components-color-gray-300, ${Xl[300]})`,
        200: `var(--wp-components-color-gray-200, ${Xl[200]})`,
        100: `var(--wp-components-color-gray-100, ${Xl[100]})`,
      },
    },
    kV = {
      background: xl.background,
      backgroundDisabled: xl.gray[100],
      border: xl.gray[600],
      borderHover: xl.gray[700],
      borderFocus: xl.accent,
      borderDisabled: xl.gray[400],
      textDisabled: xl.gray[600],
      darkGrayPlaceholder: `color-mix(in srgb, ${xl.foreground}, transparent 38%)`,
      lightGrayPlaceholder: `color-mix(in srgb, ${xl.background}, transparent 35%)`,
    },
    Ge = Object.freeze({ gray: Xl, white: Ds, alert: zV, theme: xl, ui: kV });
  var Qu = "36px",
    wV = {
      controlPaddingX: 12,
      controlPaddingXSmall: 8,
      controlPaddingXLarge: 12 * 1.3334,
      controlBackgroundColor: Ge.white,
      controlBoxShadowFocus: `0 0 0 0.5px ${Ge.theme.accent}`,
      controlHeight: Qu,
      controlHeightXSmall: `calc( ${Qu} * 0.6 )`,
      controlHeightSmall: `calc( ${Qu} * 0.8 )`,
      controlHeightLarge: `calc( ${Qu} * 1.2 )`,
      controlHeightXLarge: `calc( ${Qu} * 1.4 )`,
    },
    ae = Object.assign({}, wV, {
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
      cardPaddingXSmall: `${$(2)}`,
      cardPaddingSmall: `${$(4)}`,
      cardPaddingMedium: `${$(4)} ${$(6)}`,
      cardPaddingLarge: `${$(6)} ${$(8)}`,
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
  var Ou = {
    name: "9amh4a",
    styles:
      "font-size:11px;font-weight:500;line-height:1.4;text-transform:uppercase",
  };
  var Ty = V(M()),
    Dy = (0, H.createContext)({}),
    Us = () => (0, H.useContext)(Dy);
  function SV({ value: e }) {
    let t = Us(),
      c = (0, H.useRef)(e);
    return (
      Fu(() => {
        (0, Ly.default)(c.current, e) &&
          c.current !== e &&
          globalThis.SCRIPT_DEBUG === !0 &&
          wl(`Please memoize your context: ${JSON.stringify(e)}`);
      }, [e]),
      (0, H.useMemo)(
        () => (0, Ay.default)(t ?? {}, e ?? {}, { isMergeableObject: iZ }),
        [t, e]
      )
    );
  }
  var QV = ({ children: e, value: t }) => {
      let c = SV({ value: t });
      return (0, Ty.jsx)(Dy.Provider, { value: c, children: e });
    },
    v0 = (0, H.memo)(QV);
  var Uy = "data-wp-component",
    My = "data-wp-c16t",
    go = "__contextSystemKey__";
  function OV(e) {
    return `components-${XZ(e)}`;
  }
  var Ms = Xn(OV);
  function ct(e, t) {
    return Ey(e, t, { forwardsRef: !0 });
  }
  function h0(e, t) {
    return Ey(e, t);
  }
  function Ey(e, t, c) {
    let l = c?.forwardsRef ? (0, H.forwardRef)(e) : e;
    typeof t > "u" &&
      globalThis.SCRIPT_DEBUG === !0 &&
      wl("contextConnect: Please provide a namespace");
    let n = l[go] || [t];
    return (
      Array.isArray(t) && (n = [...n, ...t]),
      typeof t == "string" && (n = [...n, t]),
      Object.assign(l, {
        [go]: [...new Set(n)],
        displayName: t,
        selector: `.${Ms(t)}`,
      })
    );
  }
  function F0(e) {
    if (!e) return [];
    let t = [];
    return e[go] && (t = e[go]), e.type && e.type[go] && (t = e.type[go]), t;
  }
  function Au(e, t) {
    return e
      ? typeof t == "string"
        ? F0(e).includes(t)
        : Array.isArray(t)
          ? t.some((c) => F0(e).includes(c))
          : !1
      : !1;
  }
  function jy(e) {
    return { [Uy]: e };
  }
  function Py() {
    return { [My]: !0 };
  }
  function Se(e, t) {
    let c = Us();
    typeof t > "u" &&
      globalThis.SCRIPT_DEBUG === !0 &&
      wl("useContextSystem: Please provide a namespace");
    let l = c?.[t] || {},
      n = { ...Py(), ...jy(t) },
      { _overrides: o, ...r } = l,
      d = Object.entries(r).length ? Object.assign({}, r, e) : e,
      i = Lt()(Ms(t), e.className),
      a =
        typeof d.renderChildren == "function"
          ? d.renderChildren(d)
          : d.children;
    for (let s in d) n[s] = d[s];
    for (let s in o) n[s] = o[s];
    return a !== void 0 && (n.children = a), (n.className = i), n;
  }
  var Ky = {
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
  var vn = V(A());
  qy();
  var LV = _y,
    TV = function (t) {
      return t !== "theme";
    },
    $y = function (t) {
      return typeof t == "string" && t.charCodeAt(0) > 96 ? LV : TV;
    },
    eW = function (t, c, l) {
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
    DV = !1,
    UV = function (t) {
      var c = t.cache,
        l = t.serialized,
        n = t.isStringTag;
      return (
        Nu(c, l, n),
        As(function () {
          return Bn(c, l, n);
        }),
        null
      );
    },
    Qe = function e(t, c) {
      var l = t.__emotion_real === t,
        n = (l && t.__emotion_base) || t,
        o,
        r;
      c !== void 0 && ((o = c.label), (r = c.target));
      var d = eW(t, c, l),
        u = d || $y(n),
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
        var X = g0(function (p, Z, x) {
          var G = (i && p.as) || n,
            g = "",
            R = [],
            f = p;
          if (p.theme == null) {
            f = {};
            for (var I in p) f[I] = p[I];
            f.theme = vn.useContext(H0);
          }
          typeof p.className == "string"
            ? (g = Go(Z.registered, R, p.className))
            : p.className != null && (g = p.className + " ");
          var y = Sl(s.concat(R), Z.registered, f);
          (g += Z.key + "-" + y.name), r !== void 0 && (g += " " + r);
          var W = i && d === void 0 ? $y(G) : u,
            B = {};
          for (var F in p) (i && F === "as") || (W(F) && (B[F] = p[F]));
          return (
            (B.className = g),
            x && (B.ref = x),
            vn.createElement(
              vn.Fragment,
              null,
              vn.createElement(UV, {
                cache: Z,
                serialized: y,
                isStringTag: typeof G == "string",
              }),
              vn.createElement(G, B)
            )
          );
        });
        return (
          (X.displayName =
            o !== void 0
              ? o
              : "Styled(" +
                (typeof n == "string"
                  ? n
                  : n.displayName || n.name || "Component") +
                ")"),
          (X.defaultProps = t.defaultProps),
          (X.__emotion_real = X),
          (X.__emotion_base = n),
          (X.__emotion_styles = s),
          (X.__emotion_forwardProp = d),
          Object.defineProperty(X, "toString", {
            value: function () {
              return r === void 0 && DV ? "NO_COMPONENT_SELECTOR" : "." + r;
            },
          }),
          (X.withComponent = function (p, Z) {
            return e(
              p,
              Yu({}, c, Z, { shouldForwardProp: eW(X, Z, !0) })
            ).apply(void 0, s);
          }),
          X
        );
      };
    };
  var tW = V(M()),
    MV = Qe("div", { target: "e19lxcc00" })("");
  function EV({ as: e, ...t }, c) {
    return (0, tW.jsx)(MV, { as: e, ref: c, ...t });
  }
  var jV = Object.assign((0, H.forwardRef)(EV), {
      selector: ".components-view",
    }),
    Tt = jV;
  var cW = V(M());
  function PV(e, t) {
    let { style: c, ...l } = Se(e, "VisuallyHidden");
    return (0, cW.jsx)(Tt, { ref: t, ...l, style: { ...Ky, ...(c || {}) } });
  }
  var KV = ct(PV, "VisuallyHidden"),
    Fn = KV;
  var V0 = ["40em", "52em", "64em"],
    _V = (e = {}) => {
      let { defaultIndex: t = 0 } = e;
      if (typeof t != "number")
        throw new TypeError(
          `Default breakpoint index should be a number. Got: ${t}, ${typeof t}`
        );
      if (t < 0 || t > V0.length - 1)
        throw new RangeError(
          `Default breakpoint index out of range. Theme has ${V0.length} breakpoints, got index ${t}`
        );
      let [c, l] = (0, H.useState)(t);
      return (
        (0, H.useEffect)(() => {
          let n = () =>
              V0.filter((r) =>
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
  function lW(e, t = {}) {
    let c = _V(t);
    if (!Array.isArray(e) && typeof e != "function") return e;
    let l = e || [];
    return l[c >= l.length ? l.length - 1 : c];
  }
  var nW = { name: "zjik7", styles: "display:flex" },
    oW = {
      name: "qgaee5",
      styles:
        "display:block;max-height:100%;max-width:100%;min-height:0;min-width:0",
    },
    rW = { name: "82a6rk", styles: "flex:1" },
    dW = { name: "13nosa1", styles: ">*{min-height:0;}" },
    uW = { name: "1pwxzk4", styles: ">*{min-width:0;}" };
  function qV(e) {
    let { isReversed: t, ...c } = e;
    return typeof t < "u"
      ? (Lc("Flex isReversed", {
          alternative: 'Flex direction="row-reverse" or "column-reverse"',
          since: "5.9",
        }),
        { ...c, direction: t ? "row-reverse" : "row" })
      : c;
  }
  function Nr(e) {
    let {
        align: t,
        className: c,
        direction: l = "row",
        expanded: n = !0,
        gap: o = 2,
        justify: r = "space-between",
        wrap: d = !1,
        ...u
      } = Se(qV(e), "Flex"),
      i = Array.isArray(l) ? l : [l],
      a = lW(i),
      s = typeof a == "string" && !!a.includes("column"),
      b = Lt(),
      m = (0, H.useMemo)(() => {
        let X = D(
          {
            alignItems: t ?? (s ? "normal" : "center"),
            flexDirection: a,
            flexWrap: d ? "wrap" : void 0,
            gap: $(o),
            justifyContent: r,
            height: s && n ? "100%" : void 0,
            width: !s && n ? "100%" : void 0,
          },
          "",
          ""
        );
        return b(nW, X, s ? dW : uW, c);
      }, [t, c, b, a, n, o, s, r, d]);
    return { ...u, className: m, isColumn: s };
  }
  var C0 = (0, H.createContext)({ flexItemDisplay: void 0 }),
    aW = () => (0, H.useContext)(C0);
  var J0 = V(M());
  function $V(e, t) {
    let { children: c, isColumn: l, ...n } = Nr(e);
    return (0, J0.jsx)(C0.Provider, {
      value: { flexItemDisplay: l ? "block" : void 0 },
      children: (0, J0.jsx)(Tt, { ...n, ref: t, children: c }),
    });
  }
  var e9 = ct($V, "Flex"),
    Es = e9;
  function zr(e) {
    let { className: t, display: c, isBlock: l = !1, ...n } = Se(e, "FlexItem"),
      o = {},
      r = aW().flexItemDisplay;
    o.Base = D({ display: c || r }, "", "");
    let u = Lt()(oW, o.Base, l && rW, t);
    return { ...n, className: u };
  }
  var sW = V(M());
  function t9(e, t) {
    let c = zr(e);
    return (0, sW.jsx)(Tt, { ...c, ref: t });
  }
  var c9 = ct(t9, "FlexItem"),
    kr = c9;
  function Y0(e) {
    let t = Se(e, "FlexBlock");
    return zr({ isBlock: !0, ...t });
  }
  var bW = V(M());
  function l9(e, t) {
    let c = Y0(e);
    return (0, bW.jsx)(Tt, { ...c, ref: t });
  }
  var n9 = ct(l9, "FlexBlock"),
    js = n9;
  function $t(e) {
    return typeof e < "u" && e !== null;
  }
  function mW(e) {
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
        paddingX: X,
        paddingY: p,
        ...Z
      } = Se(e, "Spacer"),
      G = Lt()(
        $t(c) && D("margin:", $(c), ";", ""),
        $t(u) && D("margin-bottom:", $(u), ";margin-top:", $(u), ";", ""),
        $t(d) && D("margin-left:", $(d), ";margin-right:", $(d), ";", ""),
        $t(r) && D("margin-top:", $(r), ";", ""),
        $t(l) && D("margin-bottom:", $(l), ";", ""),
        $t(n) && Cc({ marginLeft: $(n) })(),
        $t(o) && Cc({ marginRight: $(o) })(),
        $t(i) && D("padding:", $(i), ";", ""),
        $t(p) && D("padding-bottom:", $(p), ";padding-top:", $(p), ";", ""),
        $t(X) && D("padding-left:", $(X), ";padding-right:", $(X), ";", ""),
        $t(m) && D("padding-top:", $(m), ";", ""),
        $t(a) && D("padding-bottom:", $(a), ";", ""),
        $t(s) && Cc({ paddingLeft: $(s) })(),
        $t(b) && Cc({ paddingRight: $(b) })(),
        t
      );
    return { ...Z, className: G };
  }
  var XW = V(M());
  function o9(e, t) {
    let c = mW(e);
    return (0, XW.jsx)(Tt, { ...c, ref: t });
  }
  var r9 = ct(o9, "Spacer"),
    Ht = r9;
  function d9({ icon: e, size: t = 24, ...c }, l) {
    return (0, H.cloneElement)(e, { width: t, height: t, ...c, ref: l });
  }
  var N0 = (0, H.forwardRef)(d9);
  var z0 = V(M()),
    u9 = (0, z0.jsx)(ol, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, z0.jsx)(lr, {
        d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z",
      }),
    }),
    Lu = u9;
  var k0 = V(M()),
    i9 = (0, k0.jsx)(ol, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, k0.jsx)(lr, {
        d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z",
      }),
    }),
    w0 = i9;
  var S0 = V(M()),
    a9 = (0, S0.jsx)(ol, {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: (0, S0.jsx)(lr, {
        d: "m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z",
      }),
    }),
    Q0 = a9;
  var xW = {
    name: "hdknak",
    styles:
      "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap",
  };
  var Ps = "\u2026",
    hn = {
      auto: "auto",
      head: "head",
      middle: "middle",
      tail: "tail",
      none: "none",
    },
    b9 = { ellipsis: Ps, ellipsizeMode: hn.auto, limit: 0, numberOfLines: 0 };
  function m9(e, t, c, l) {
    if (typeof e != "string") return "";
    let n = e.length,
      o = ~~t,
      r = ~~c,
      d = mo(l) ? l : Ps;
    return (o === 0 && r === 0) || o >= n || r >= n || o + r >= n
      ? e
      : r === 0
        ? e.slice(0, o) + d
        : e.slice(0, o) + d + e.slice(n - r);
  }
  function GW(e = "", t) {
    let c = { ...b9, ...t },
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
    return n !== hn.auto ? m9(e, r, d, l) : e;
  }
  function Ks(e) {
    let {
        className: t,
        children: c,
        ellipsis: l = Ps,
        ellipsizeMode: n = hn.auto,
        limit: o = 0,
        numberOfLines: r = 0,
        ...d
      } = Se(e, "Truncate"),
      u = Lt(),
      i;
    typeof c == "string" ? (i = c) : typeof c == "number" && (i = c.toString());
    let a = i
        ? GW(i, { ellipsis: l, ellipsizeMode: n, limit: o, numberOfLines: r })
        : c,
      s = !!i && n === hn.auto,
      b = (0, H.useMemo)(
        () =>
          u(
            s && !r && xW,
            s &&
              !!r &&
              D(
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
  var U0 = {};
  lb(U0, {
    Text: () => O0,
    block: () => A0,
    destructive: () => L0,
    highlighterText: () => D0,
    muted: () => T0,
    positive: () => X9,
    upperCase: () => x9,
  });
  var O0 = D(
      "color:",
      Ge.gray[900],
      ";line-height:",
      ae.fontLineHeightBase,
      ";margin:0;text-wrap:balance;text-wrap:pretty;",
      ""
    ),
    A0 = { name: "4zleql", styles: "display:block" },
    X9 = D("color:", Ge.alert.green, ";", ""),
    L0 = D("color:", Ge.alert.red, ";", ""),
    T0 = D("color:", Ge.gray[700], ";", ""),
    D0 = D(
      "mark{background:",
      Ge.alert.yellow,
      ";border-radius:",
      ae.radiusSmall,
      ";box-shadow:0 0 0 1px rgba( 0, 0, 0, 0.05 ) inset,0 -1px 0 rgba( 0, 0, 0, 0.1 ) inset;}",
      ""
    ),
    x9 = { name: "50zrmy", styles: "text-transform:uppercase" };
  var HW = V(gW());
  var G9 = (e) => {
      let t = {};
      for (let c in e) t[c.toLowerCase()] = e[c];
      return t;
    },
    p9 = Xn(G9);
  function ZW({
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
    let X = o,
      p = (0, HW.findAll)({
        autoEscape: l,
        caseSensitive: n,
        findChunks: r,
        sanitize: a,
        searchWords: s,
        textToHighlight: X,
      }),
      Z = i,
      x = -1,
      G = "",
      g;
    return p.map((f, I) => {
      let y = X.substr(f.start, f.end - f.start);
      if (f.highlight) {
        x++;
        let W;
        typeof d == "object"
          ? n
            ? (W = d[y])
            : ((d = p9(d)), (W = d[y.toLowerCase()]))
          : (W = d);
        let B = x === +t;
        (G = `${W} ${B ? e : ""}`),
          (g = B === !0 && c !== null ? Object.assign({}, u, c) : u);
        let F = { children: y, className: G, key: I, style: g };
        return (
          typeof Z != "string" && (F.highlightIndex = x),
          (0, H.createElement)(Z, F)
        );
      }
      return (0, H.createElement)("span", {
        children: y,
        className: b,
        key: I,
        style: m,
      });
    });
  }
  var M0 = 13,
    RW = {
      body: M0,
      caption: 10,
      footnote: 11,
      largeTitle: 28,
      subheadline: 12,
      title: 20,
    },
    s4 = [1, 2, 3, 4, 5, 6].flatMap((e) => [e, e.toString()]);
  function E0(e = M0) {
    if (e in RW) return E0(RW[e]);
    if (typeof e != "number") {
      let c = parseFloat(e);
      if (Number.isNaN(c)) return e;
      e = c;
    }
    return `calc(${`(${e} / ${M0})`} * ${ae.fontSize})`;
  }
  function fW(e, t) {
    if (t) return t;
    if (!e) return;
    let c = `calc(${ae.controlHeight} + ${$(2)})`;
    switch (e) {
      case "large":
        c = `calc(${ae.controlHeightLarge} + ${$(2)})`;
        break;
      case "small":
        c = `calc(${ae.controlHeightSmall} + ${$(2)})`;
        break;
      case "xSmall":
        c = `calc(${ae.controlHeightXSmall} + ${$(2)})`;
        break;
      default:
        break;
    }
    return c;
  }
  var g9 = { name: "50zrmy", styles: "text-transform:uppercase" };
  function j0(e) {
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
        letterSpacing: X,
        lineHeight: p,
        optimizeReadabilityFor: Z,
        size: x,
        truncate: G = !1,
        upperCase: g = !1,
        variant: R,
        weight: f = ae.fontWeight,
        ...I
      } = Se(e, "Text"),
      y = l,
      W = Array.isArray(s),
      B = x === "caption";
    if (W) {
      if (typeof l != "string")
        throw new TypeError(
          "`children` of `Text` must only be `string` types when `highlightWords` is defined"
        );
      y = ZW({
        autoEscape: i,
        children: l,
        caseSensitive: a,
        searchWords: s,
        sanitize: b,
      });
    }
    let F = Lt(),
      S = (0, H.useMemo)(() => {
        let N = {},
          C = fW(t, p);
        if (
          ((N.Base = D(
            {
              color: o,
              display: u,
              fontSize: E0(x),
              fontWeight: f,
              lineHeight: C,
              letterSpacing: X,
              textAlign: c,
            },
            "",
            ""
          )),
          (N.upperCase = g9),
          (N.optimalTextColor = null),
          Z)
        ) {
          let k = zy(Z) === "dark";
          N.optimalTextColor = k
            ? D({ color: Ge.gray[900] }, "", "")
            : D({ color: Ge.white }, "", "");
        }
        return F(
          O0,
          N.Base,
          N.optimalTextColor,
          d && L0,
          !!W && D0,
          m && A0,
          B && T0,
          R && U0[R],
          g && N.upperCase,
          n
        );
      }, [t, c, n, o, F, u, m, B, d, W, X, p, Z, x, g, R, f]),
      Q;
    G === !0 && (Q = "auto"), G === !1 && (Q = "none");
    let v = { ...I, className: S, children: l, ellipsizeMode: r || Q },
      Y = Ks(v);
    return (
      !G &&
        Array.isArray(l) &&
        (y = H.Children.map(l, (N) =>
          typeof N != "object" || N === null || !("props" in N)
            ? N
            : Au(N, ["Link"])
              ? (0, H.cloneElement)(N, { size: N.props.size || "inherit" })
              : N
        )),
      { ...Y, children: G ? Y.children : y }
    );
  }
  var IW = V(M());
  function H9(e, t) {
    let c = j0(e);
    return (0, IW.jsx)(Tt, { as: "span", ...c, ref: t });
  }
  var Z9 = ct(H9, "Text"),
    P0 = Z9;
  var yW = V(M());
  var K0 = Qe("span", { target: "em5sgkm8" })({
      name: "pvvbxf",
      styles: "box-sizing:border-box;display:block",
    }),
    _0 = Qe("span", { target: "em5sgkm7" })({
      name: "jgf79h",
      styles:
        "align-items:center;align-self:stretch;box-sizing:border-box;display:flex",
    }),
    R9 = ({ disabled: e, isBorderless: t }) =>
      t ? "transparent" : e ? Ge.ui.borderDisabled : Ge.ui.border,
    q0 = Qe("div", { target: "em5sgkm6" })(
      "&&&{box-sizing:border-box;border-color:",
      R9,
      ";border-radius:inherit;border-style:solid;border-width:1px;bottom:0;left:0;margin:0;padding:0;pointer-events:none;position:absolute;right:0;top:0;",
      Cc({ paddingLeft: 2 }),
      ";}"
    ),
    WW = Qe(Es, { target: "em5sgkm5" })(
      "box-sizing:border-box;position:relative;border-radius:",
      ae.radiusSmall,
      ";padding-top:0;&:focus-within:not( :has( :is( ",
      K0,
      ", ",
      _0,
      " ):focus-within ) ){",
      q0,
      "{border-color:",
      Ge.ui.borderFocus,
      ";box-shadow:",
      ae.controlBoxShadowFocus,
      ";outline:2px solid transparent;outline-offset:-2px;}}"
    ),
    f9 = ({ disabled: e }) => {
      let t = e ? Ge.ui.backgroundDisabled : Ge.ui.background;
      return D({ backgroundColor: t }, "", "");
    },
    I9 = { name: "1d3w5wq", styles: "width:100%" },
    y9 = ({ __unstableInputWidth: e, labelPosition: t }) =>
      e
        ? t === "side"
          ? ""
          : t === "edge"
            ? D({ flex: `0 0 ${e}` }, "", "")
            : D({ width: e }, "", "")
        : I9,
    BW = Qe("div", { target: "em5sgkm4" })(
      "align-items:center;box-sizing:border-box;border-radius:inherit;display:flex;flex:1;position:relative;",
      f9,
      " ",
      y9,
      ";"
    ),
    W9 = ({ disabled: e }) =>
      e ? D({ color: Ge.ui.textDisabled }, "", "") : "",
    $0 = ({ inputSize: e }) => {
      let t = {
          "default": "13px",
          "small": "11px",
          "compact": "13px",
          "__unstable-large": "13px",
        },
        c = t[e] || t.default,
        l = "16px";
      return c
        ? D(
            "font-size:",
            l,
            ";@media ( min-width: 600px ){font-size:",
            c,
            ";}",
            ""
          )
        : "";
    },
    vW = ({ inputSize: e, __next40pxDefaultSize: t }) => {
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
    B9 = (e) => D(vW(e), "", ""),
    v9 = ({ paddingInlineStart: e, paddingInlineEnd: t }) =>
      D({ paddingInlineStart: e, paddingInlineEnd: t }, "", ""),
    F9 = ({ isDragging: e, dragCursor: t }) => {
      let c, l;
      return (
        e &&
          (c = D(
            "cursor:",
            t,
            ";user-select:none;&::-webkit-outer-spin-button,&::-webkit-inner-spin-button{-webkit-appearance:none!important;margin:0!important;}",
            ""
          )),
        e && t && (l = D("&:active{cursor:", t, ";}", "")),
        D(c, " ", l, ";", "")
      );
    },
    S4 = Qe("input", { target: "em5sgkm3" })(
      "&&&{background-color:transparent;box-sizing:border-box;border:none;box-shadow:none!important;color:",
      Ge.theme.foreground,
      ";display:block;font-family:inherit;margin:0;outline:none;width:100%;",
      F9,
      " ",
      W9,
      " ",
      $0,
      " ",
      B9,
      " ",
      v9,
      " &::-webkit-input-placeholder{line-height:normal;}}"
    ),
    h9 = Qe(P0, { target: "em5sgkm2" })(
      "&&&{",
      Ou,
      ";box-sizing:border-box;display:block;padding-top:0;padding-bottom:0;max-width:100%;z-index:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}"
    ),
    FW = (e) => (0, yW.jsx)(h9, { ...e, as: "label" }),
    hW = Qe(kr, { target: "em5sgkm1" })({
      name: "1b6uupn",
      styles: "max-width:calc( 100% - 10px )",
    }),
    V9 = ({
      variant: e = "default",
      size: t,
      __next40pxDefaultSize: c,
      isPrefix: l,
    }) => {
      let { paddingLeft: n } = vW({ inputSize: t, __next40pxDefaultSize: c }),
        o = l ? "paddingInlineStart" : "paddingInlineEnd";
      return e === "default"
        ? D({ [o]: n }, "", "")
        : D({ display: "flex", [o]: n - 4 }, "", "");
    },
    VW = Qe("div", { target: "em5sgkm0" })(V9, ";");
  var CW = V(M());
  function C9({ disabled: e = !1, isBorderless: t = !1 }) {
    return (0, CW.jsx)(q0, {
      "aria-hidden": "true",
      "className": "components-input-control__backdrop",
      "disabled": e,
      "isBorderless": t,
    });
  }
  var J9 = (0, H.memo)(C9),
    JW = J9;
  var _s = V(M());
  function eG({ children: e, hideLabelFromVision: t, htmlFor: c, ...l }) {
    return e
      ? t
        ? (0, _s.jsx)(Fn, { as: "label", htmlFor: c, children: e })
        : (0, _s.jsx)(hW, {
            children: (0, _s.jsx)(FW, { htmlFor: c, ...l, children: e }),
          })
      : null;
  }
  function qs(e) {
    let { __next36pxDefaultSize: t, __next40pxDefaultSize: c, ...l } = e;
    return { ...l, __next40pxDefaultSize: c ?? t };
  }
  var Ol = V(M());
  function Y9(e) {
    let c = `input-base-control-${Gt(YW)}`;
    return e || c;
  }
  function N9(e) {
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
  function YW(e, t) {
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
        suffix: X,
        ...p
      } = qs(Se(e, "InputBase")),
      Z = Y9(i),
      x = d || !s,
      G = (0, H.useMemo)(
        () => ({
          InputControlPrefixWrapper: { __next40pxDefaultSize: c, size: m },
          InputControlSuffixWrapper: { __next40pxDefaultSize: c, size: m },
        }),
        [c, m]
      );
    return (0, Ol.jsxs)(WW, {
      ...p,
      ...N9(u),
      className: o,
      gap: 2,
      ref: t,
      children: [
        (0, Ol.jsx)(eG, {
          className: "components-input-control__label",
          hideLabelFromVision: d,
          labelPosition: u,
          htmlFor: Z,
          children: s,
        }),
        (0, Ol.jsxs)(BW, {
          __unstableInputWidth: l,
          className: "components-input-control__container",
          disabled: r,
          hideLabel: x,
          labelPosition: u,
          children: [
            (0, Ol.jsxs)(v0, {
              value: G,
              children: [
                b &&
                  (0, Ol.jsx)(K0, {
                    className: "components-input-control__prefix",
                    children: b,
                  }),
                n,
                X &&
                  (0, Ol.jsx)(_0, {
                    className: "components-input-control__suffix",
                    children: X,
                  }),
              ],
            }),
            (0, Ol.jsx)(JW, { disabled: r, isBorderless: a }),
          ],
        }),
      ],
    });
  }
  var NW = ct(YW, "InputBase");
  function zW(e) {
    return (t) => {
      let { isComposing: c } = "nativeEvent" in t ? t.nativeEvent : t;
      c || t.keyCode === 229 || e(t);
    };
  }
  var kW = Qe("div", { target: "ej5x27r4" })(
      "font-family:",
      Su("default.fontFamily"),
      ";font-size:",
      Su("default.fontSize"),
      ";",
      Z0,
      ";"
    ),
    z9 = ({ __nextHasNoMarginBottom: e = !1 }) =>
      !e && D("margin-bottom:", $(2), ";", ""),
    wW = Qe("div", { target: "ej5x27r3" })(
      z9,
      " .components-panel__row &{margin-bottom:inherit;}"
    ),
    SW = D(Ou, ";display:block;margin-bottom:", $(2), ";padding:0;", ""),
    QW = Qe("label", { target: "ej5x27r2" })(SW, ";"),
    k9 = { name: "11yad0w", styles: "margin-bottom:revert" },
    w9 = ({ __nextHasNoMarginBottom: e = !1 }) => !e && k9,
    OW = Qe("p", { target: "ej5x27r1" })(
      "margin-top:",
      $(2),
      ";margin-bottom:0;font-size:",
      Su("helpText.fontSize"),
      ";font-style:normal;color:",
      Ge.gray[700],
      ";",
      w9,
      ";"
    ),
    AW = Qe("span", { target: "ej5x27r0" })(SW, ";");
  var Gl = V(M());
  var S9 = (e) => {
      let {
        __nextHasNoMarginBottom: t = !1,
        __associatedWPComponentName: c = "BaseControl",
        id: l,
        label: n,
        hideLabelFromVision: o = !1,
        help: r,
        className: d,
        children: u,
      } = Se(e, "BaseControl");
      return (
        t ||
          Lc(`Bottom margin styles for wp.components.${c}`, {
            since: "6.7",
            version: "7.0",
            hint: "Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.",
          }),
        (0, Gl.jsxs)(kW, {
          className: d,
          children: [
            (0, Gl.jsxs)(wW, {
              className: "components-base-control__field",
              __nextHasNoMarginBottom: t,
              children: [
                n &&
                  l &&
                  (o
                    ? (0, Gl.jsx)(Fn, { as: "label", htmlFor: l, children: n })
                    : (0, Gl.jsx)(QW, {
                        className: "components-base-control__label",
                        htmlFor: l,
                        children: n,
                      })),
                n &&
                  !l &&
                  (o
                    ? (0, Gl.jsx)(Fn, { as: "label", children: n })
                    : (0, Gl.jsx)(LW, { children: n })),
                u,
              ],
            }),
            !!r &&
              (0, Gl.jsx)(OW, {
                id: l ? l + "__help" : void 0,
                className: "components-base-control__help",
                __nextHasNoMarginBottom: t,
                children: r,
              }),
          ],
        })
      );
    },
    Q9 = (e, t) => {
      let { className: c, children: l, ...n } = e;
      return (0, Gl.jsx)(AW, {
        ref: t,
        ...n,
        className: Ie("components-base-control__label", c),
        children: l,
      });
    },
    LW = (0, H.forwardRef)(Q9),
    O9 = Object.assign(h0(S9, "BaseControl"), { VisualLabel: LW }),
    wr = O9;
  var TW = V(M());
  function A9({ icon: e, className: t, size: c = 20, style: l = {}, ...n }) {
    let o = ["dashicon", "dashicons", "dashicons-" + e, t]
        .filter(Boolean)
        .join(" "),
      d = {
        ...(c != 20
          ? { fontSize: `${c}px`, width: `${c}px`, height: `${c}px` }
          : {}),
        ...l,
      };
    return (0, TW.jsx)("span", { className: o, style: d, ...n });
  }
  var tG = A9;
  var cG = V(M());
  function L9({
    icon: e = null,
    size: t = typeof e == "string" ? 20 : 24,
    ...c
  }) {
    if (typeof e == "string")
      return (0, cG.jsx)(tG, { icon: e, size: t, ...c });
    if ((0, H.isValidElement)(e) && tG === e.type)
      return (0, H.cloneElement)(e, { ...c });
    if (typeof e == "function")
      return (0, H.createElement)(e, { size: t, ...c });
    if (e && (e.type === "svg" || e.type === ol)) {
      let l = { ...e.props, width: t, height: t, ...c };
      return (0, cG.jsx)(ol, { ...l });
    }
    return (0, H.isValidElement)(e)
      ? (0, H.cloneElement)(e, { size: t, ...c })
      : e;
  }
  var Sr = L9;
  var Ct = V(M()),
    T9 = ["onMouseDown", "onClick"];
  function D9({
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
      X = { "accessibleWhenDisabled": e, "aria-pressed": r, "description": a };
    if (d) {
      var p;
      ((p = b) !== null && p !== void 0) || (b = "small");
    }
    if (c) {
      var Z;
      ((Z = m) !== null && Z !== void 0) || (m = "primary");
    }
    if (n) {
      var x;
      ((x = m) !== null && x !== void 0) || (m = "tertiary");
    }
    if (l) {
      var G;
      ((G = m) !== null && G !== void 0) || (m = "secondary");
    }
    if (t) {
      var g;
      Lc("wp.components.Button `isDefault` prop", {
        since: "5.4",
        alternative: 'variant="secondary"',
      }),
        ((g = m) !== null && g !== void 0) || (m = "secondary");
    }
    if (o) {
      var R;
      ((R = m) !== null && R !== void 0) || (m = "link");
    }
    return { ...X, ...s, size: b, variant: m };
  }
  function U9(e, t) {
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
        label: X,
        children: p,
        size: Z = "default",
        text: x,
        variant: G,
        description: g,
        ...R
      } = D9(e),
      {
        "href": f,
        "target": I,
        "aria-checked": y,
        "aria-pressed": W,
        "aria-selected": B,
        ...F
      } = "href" in R ? R : { href: void 0, target: void 0, ...R },
      S = Gt(DW, "components-button__description"),
      Q =
        (typeof p == "string" && !!p) ||
        (Array.isArray(p) &&
          p?.[0] &&
          p[0] !== null &&
          p?.[0]?.props?.className !== "components-tooltip"),
      Y = Ie("components-button", r, {
        "is-next-40px-default-size": c,
        "is-secondary": G === "secondary",
        "is-primary": G === "primary",
        "is-small": Z === "small",
        "is-compact": Z === "compact",
        "is-tertiary": G === "tertiary",
        "is-pressed": [!0, "true", "mixed"].includes(W),
        "is-pressed-mixed": W === "mixed",
        "is-busy": n,
        "is-link": G === "link",
        "is-destructive": o,
        "has-text": !!u && (Q || x),
        "has-icon": !!u,
      }),
      N = d && !l,
      C = f !== void 0 && !d ? "a" : "button",
      k =
        C === "button"
          ? {
              "type": "button",
              "disabled": N,
              "aria-checked": y,
              "aria-pressed": W,
              "aria-selected": B,
            }
          : {},
      U = C === "a" ? { href: f, target: I } : {},
      h = {};
    if (d && l) {
      (k["aria-disabled"] = !0), (U["aria-disabled"] = !0);
      for (let st of T9)
        h[st] = (lt) => {
          lt && (lt.stopPropagation(), lt.preventDefault());
        };
    }
    let L = !N && ((s && !!X) || !!m || (!!X && !p?.length && s !== !1)),
      E = g ? S : void 0,
      pe = F["aria-describedby"] || E,
      Oe = {
        "className": Y,
        "aria-label": F["aria-label"] || X,
        "aria-describedby": pe,
        "ref": t,
      },
      Ve = (0, Ct.jsxs)(Ct.Fragment, {
        children: [
          u && i === "left" && (0, Ct.jsx)(Sr, { icon: u, size: a }),
          x && (0, Ct.jsx)(Ct.Fragment, { children: x }),
          p,
          u && i === "right" && (0, Ct.jsx)(Sr, { icon: u, size: a }),
        ],
      }),
      Te =
        C === "a"
          ? (0, Ct.jsx)("a", { ...U, ...F, ...h, ...Oe, children: Ve })
          : (0, Ct.jsx)("button", { ...k, ...F, ...h, ...Oe, children: Ve }),
      tc = L
        ? { text: p?.length && g ? g : X, shortcut: m, placement: b && Zs(b) }
        : {};
    return (0, Ct.jsxs)(Ct.Fragment, {
      children: [
        (0, Ct.jsx)(BI, { ...tc, children: Te }),
        g &&
          (0, Ct.jsx)(Fn, {
            children: (0, Ct.jsx)("span", { id: E, children: g }),
          }),
      ],
    });
  }
  var DW = (0, H.forwardRef)(U9),
    Le = DW;
  var M9 = {
      bottom: { align: "flex-end", justify: "center" },
      bottomLeft: { align: "flex-end", justify: "flex-start" },
      bottomRight: { align: "flex-end", justify: "flex-end" },
      center: { align: "center", justify: "center" },
      edge: { align: "center", justify: "space-between" },
      left: { align: "center", justify: "flex-start" },
      right: { align: "center", justify: "flex-end" },
      stretch: { align: "stretch" },
      top: { align: "flex-start", justify: "center" },
      topLeft: { align: "flex-start", justify: "flex-start" },
      topRight: { align: "flex-start", justify: "flex-end" },
    },
    E9 = {
      bottom: { justify: "flex-end", align: "center" },
      bottomLeft: { justify: "flex-end", align: "flex-start" },
      bottomRight: { justify: "flex-end", align: "flex-end" },
      center: { justify: "center", align: "center" },
      edge: { justify: "space-between", align: "center" },
      left: { justify: "center", align: "flex-start" },
      right: { justify: "center", align: "flex-end" },
      stretch: { align: "stretch" },
      top: { justify: "flex-start", align: "center" },
      topLeft: { justify: "flex-start", align: "flex-start" },
      topRight: { justify: "flex-start", align: "flex-end" },
    };
  function UW(e, t = "row") {
    if (!mo(e)) return {};
    let l = t === "column" ? E9 : M9;
    return e in l ? l[e] : { align: e };
  }
  function MW(e) {
    return typeof e == "string"
      ? [e]
      : H.Children.toArray(e).filter((t) => (0, H.isValidElement)(t));
  }
  var EW = V(M());
  function jW(e) {
    let {
        alignment: t = "edge",
        children: c,
        direction: l,
        spacing: n = 2,
        ...o
      } = Se(e, "HStack"),
      r = UW(t, l),
      i = {
        children: MW(c).map((b, m) => {
          if (Au(b, ["Spacer"])) {
            let p = b,
              Z = p.key || `hstack-${m}`;
            return (0, EW.jsx)(kr, { isBlock: !0, ...p.props }, Z);
          }
          return b;
        }),
        direction: l,
        justify: "center",
        ...r,
        ...o,
        gap: n,
      },
      { isColumn: a, ...s } = Nr(i);
    return s;
  }
  var PW = V(M());
  function j9(e, t) {
    let c = jW(e);
    return (0, PW.jsx)(Tt, { ...c, ref: t });
  }
  var P9 = ct(j9, "HStack"),
    lG = P9;
  var $s,
    K9 = new Uint8Array(16);
  function nG() {
    if (
      !$s &&
      (($s =
        typeof crypto < "u" &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !$s)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return $s(K9);
  }
  var Zt = [];
  for (let e = 0; e < 256; ++e) Zt.push((e + 256).toString(16).slice(1));
  function KW(e, t = 0) {
    return (
      Zt[e[t + 0]] +
      Zt[e[t + 1]] +
      Zt[e[t + 2]] +
      Zt[e[t + 3]] +
      "-" +
      Zt[e[t + 4]] +
      Zt[e[t + 5]] +
      "-" +
      Zt[e[t + 6]] +
      Zt[e[t + 7]] +
      "-" +
      Zt[e[t + 8]] +
      Zt[e[t + 9]] +
      "-" +
      Zt[e[t + 10]] +
      Zt[e[t + 11]] +
      Zt[e[t + 12]] +
      Zt[e[t + 13]] +
      Zt[e[t + 14]] +
      Zt[e[t + 15]]
    );
  }
  var _9 =
      typeof crypto < "u" &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
    oG = { randomUUID: _9 };
  function q9(e, t, c) {
    if (oG.randomUUID && !t && !e) return oG.randomUUID();
    e = e || {};
    let l = e.random || (e.rng || nG)();
    if (((l[6] = (l[6] & 15) | 64), (l[8] = (l[8] & 63) | 128), t)) {
      c = c || 0;
      for (let n = 0; n < 16; ++n) t[c + n] = l[n];
      return t;
    }
    return KW(l);
  }
  var eb = q9;
  var qW = V(M()),
    _W = new Set(),
    rG = new WeakMap(),
    eC = (e) => {
      if (rG.has(e)) return rG.get(e);
      let t = eb().replace(/[0-9]/g, "");
      for (; _W.has(t); ) t = eb().replace(/[0-9]/g, "");
      _W.add(t);
      let c = Yr({ container: e, key: t });
      return rG.set(e, c), c;
    };
  function tC(e) {
    let { children: t, document: c } = e;
    if (!c) return null;
    let l = eC(c.head);
    return (0, qW.jsx)(G0, { value: l, children: t });
  }
  var $W = tC;
  var eB = V(M());
  function cC(e, t) {
    let c = Se(e, "InputControlSuffixWrapper");
    return (0, eB.jsx)(VW, { ...c, ref: t });
  }
  var lC = ct(cC, "InputControlSuffixWrapper"),
    tB = lC;
  var nC = ({ disabled: e }) =>
      e ? D("color:", Ge.ui.textDisabled, ";cursor:default;", "") : "",
    oC = { name: "1lv1yo7", styles: "display:inline-flex" },
    rC = ({ variant: e }) => (e === "minimal" ? oC : ""),
    cB = Qe(NW, { target: "e1mv6sxx3" })(
      "color:",
      Ge.theme.foreground,
      ";cursor:pointer;",
      nC,
      " ",
      rC,
      ";"
    ),
    dC = ({
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
      return D(n, "", "");
    },
    dG = 18,
    uC = ({
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
      return Cc({
        paddingLeft: n,
        paddingRight: n + dG,
        ...(t ? { paddingTop: n, paddingBottom: n } : {}),
      });
    },
    iC = ({ multiple: e }) => ({ overflow: e ? "auto" : "hidden" }),
    aC = { name: "n1jncc", styles: "field-sizing:content" },
    sC = ({ variant: e }) => (e === "minimal" ? aC : ""),
    lB = Qe("select", { target: "e1mv6sxx2" })(
      "&&&{appearance:none;background:transparent;box-sizing:border-box;border:none;box-shadow:none!important;color:currentColor;cursor:inherit;display:block;font-family:inherit;margin:0;width:100%;max-width:none;white-space:nowrap;text-overflow:ellipsis;",
      $0,
      ";",
      dC,
      ";",
      uC,
      ";",
      iC,
      " ",
      sC,
      ";}"
    ),
    nB = Qe("div", { target: "e1mv6sxx1" })(
      "margin-inline-end:",
      $(-1),
      ";line-height:0;path{fill:currentColor;}"
    ),
    oB = Qe(tB, { target: "e1mv6sxx0" })(
      "position:absolute;pointer-events:none;",
      Cc({ right: 0 }),
      ";"
    );
  var tb = V(M()),
    bC = () =>
      (0, tb.jsx)(oB, {
        children: (0, tb.jsx)(nB, {
          children: (0, tb.jsx)(N0, { icon: Lu, size: dG }),
        }),
      }),
    rB = bC;
  var Ho = V(M());
  function mC(e) {
    let c = `inspector-select-control-${Gt(dB)}`;
    return e || c;
  }
  function XC({ options: e }) {
    return e.map(({ id: t, label: c, value: l, ...n }, o) => {
      let r = t || `${c}-${l}-${o}`;
      return (0, Ho.jsx)("option", { value: l, ...n, children: c }, r);
    });
  }
  function xC(e, t) {
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
        children: X,
        prefix: p,
        suffix: Z,
        variant: x = "default",
        __next40pxDefaultSize: G = !1,
        __nextHasNoMarginBottom: g = !1,
        ...R
      } = qs(e),
      f = mC(r),
      I = n ? `${f}__help` : void 0;
    if (!a?.length && !X) return null;
    let y = (B) => {
        if (e.multiple) {
          let S = Array.from(B.target.options)
            .filter(({ selected: Q }) => Q)
            .map(({ value: Q }) => Q);
          e.onChange?.(S, { event: B });
          return;
        }
        e.onChange?.(B.target.value, { event: B });
      },
      W = Ie("components-select-control", c);
    return (0, Ho.jsx)(wr, {
      help: n,
      id: f,
      __nextHasNoMarginBottom: g,
      __associatedWPComponentName: "SelectControl",
      children: (0, Ho.jsx)(cB, {
        className: W,
        disabled: l,
        hideLabelFromVision: o,
        id: f,
        isBorderless: x === "minimal",
        label: d,
        size: s,
        suffix: Z || (!u && (0, Ho.jsx)(rB, {})),
        prefix: p,
        labelPosition: m,
        __unstableInputWidth: x === "minimal" ? "auto" : void 0,
        variant: x,
        __next40pxDefaultSize: G,
        children: (0, Ho.jsx)(lB, {
          ...R,
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
          "variant": x,
          "children": X || (0, Ho.jsx)(XC, { options: a }),
        }),
      }),
    });
  }
  var dB = (0, H.forwardRef)(xC),
    Dt = dB;
  var GC = new Set(["alert", "status", "log", "marquee", "timer"]),
    uB = [];
  function iB(e) {
    let t = Array.from(document.body.children),
      c = [];
    uB.push(c);
    for (let l of t)
      l !== e && pC(l) && (l.setAttribute("aria-hidden", "true"), c.push(l));
  }
  function pC(e) {
    let t = e.getAttribute("role");
    return !(
      e.tagName === "SCRIPT" ||
      e.hasAttribute("hidden") ||
      e.hasAttribute("aria-hidden") ||
      e.hasAttribute("aria-live") ||
      (t && GC.has(t))
    );
  }
  function aB() {
    let e = uB.pop();
    if (e) for (let t of e) t.removeAttribute("aria-hidden");
  }
  var HC = ae.transitionDuration,
    ZC = Number.parseInt(ae.transitionDuration),
    RC = "components-modal__disappear-animation";
  function sB() {
    let e = (0, H.useRef)(),
      [t, c] = (0, H.useState)(!1),
      l = Td(),
      n = (0, H.useCallback)(
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
                    s.animationName === RC && a();
                  }),
                    r.addEventListener("animationend", d),
                    c(!0);
                }),
              i = () =>
                new Promise((a) => {
                  setTimeout(() => a(), ZC * 1.2);
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
      frameStyle: { "--modal-frame-animation-duration": `${HC}` },
      closeModal: n,
    };
  }
  var Rt = V(M()),
    bB = (0, H.createContext)(new Set()),
    Tu = new Map();
  function fC(e, t) {
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
        style: X,
        overlayClassName: p,
        className: Z,
        contentLabel: x,
        onKeyDown: G,
        isFullScreen: g = !1,
        size: R,
        headerActions: f = null,
        __experimentalHideHeader: I = !1,
      } = e,
      y = (0, H.useRef)(),
      W = Gt(mB),
      B = n ? `components-modal-header-${W}` : i.labelledby,
      F = ya(o === "firstContentElement" ? "firstElement" : o),
      S = _X(),
      Q = qX(),
      v = (0, H.useRef)(null),
      Y = (0, H.useRef)(null),
      [N, C] = (0, H.useState)(!1),
      [k, U] = (0, H.useState)(!1),
      h;
    g || R === "fill" ? (h = "is-full-screen") : R && (h = `has-size-${R}`);
    let L = (0, H.useCallback)(() => {
      if (!v.current) return;
      let ee = Ad(v.current);
      v.current === ee ? U(!0) : U(!1);
    }, [v]);
    (0, H.useEffect)(() => (iB(y.current), () => aB()), []);
    let E = (0, H.useRef)();
    (0, H.useEffect)(() => {
      E.current = a;
    }, [a]);
    let pe = (0, H.useContext)(bB),
      [Oe] = (0, H.useState)(() => new Set());
    (0, H.useEffect)(() => {
      pe.add(E);
      for (let ee of pe) ee !== E && ee.current?.();
      return () => {
        for (let ee of Oe) ee.current?.();
        pe.delete(E);
      };
    }, [pe, Oe]),
      (0, H.useEffect)(() => {
        var ee;
        let De = c,
          cc = 1 + ((ee = Tu.get(De)) !== null && ee !== void 0 ? ee : 0);
        return (
          Tu.set(De, cc),
          document.body.classList.add(c),
          () => {
            let pl = Tu.get(De) - 1;
            pl === 0
              ? (document.body.classList.remove(De), Tu.delete(De))
              : Tu.set(De, pl);
          }
        );
      }, [c]);
    let {
      closeModal: Ve,
      frameRef: Te,
      frameStyle: tc,
      overlayClassname: st,
    } = sB();
    (0, H.useLayoutEffect)(() => {
      if (!window.ResizeObserver || !Y.current) return;
      let ee = new ResizeObserver(L);
      return (
        ee.observe(Y.current),
        L(),
        () => {
          ee.disconnect();
        }
      );
    }, [L, Y]);
    function lt(ee) {
      r &&
        (ee.code === "Escape" || ee.key === "Escape") &&
        !ee.defaultPrevented &&
        (ee.preventDefault(), Ve().then(() => a(ee)));
    }
    let Gc = (0, H.useCallback)(
        (ee) => {
          var De;
          let cc =
            (De = ee?.currentTarget?.scrollTop) !== null && De !== void 0
              ? De
              : -1;
          !N && cc > 0 ? C(!0) : N && cc <= 0 && C(!1);
        },
        [N]
      ),
      bt = null,
      Tl = {
        onPointerDown: (ee) => {
          ee.target === ee.currentTarget &&
            ((bt = ee.target), ee.preventDefault());
        },
        onPointerUp: ({ target: ee, button: De }) => {
          let cc = ee === bt;
          (bt = null), De === 0 && cc && Ve().then(() => a());
        },
      },
      Dl = (0, Rt.jsx)("div", {
        ref: xn([y, t]),
        className: Ie("components-modal__screen-overlay", st, p),
        onKeyDown: zW(lt),
        ...(d ? Tl : {}),
        children: (0, Rt.jsx)($W, {
          document,
          children: (0, Rt.jsx)("div", {
            "className": Ie("components-modal__frame", h, Z),
            "style": { ...tc, ...X },
            "ref": xn([Te, S, Q, o !== "firstContentElement" ? F : null]),
            "role": l,
            "aria-label": x,
            "aria-labelledby": x ? void 0 : B,
            "aria-describedby": i.describedby,
            "tabIndex": -1,
            "onKeyDown": G,
            "children": (0, Rt.jsxs)("div", {
              "className": Ie("components-modal__content", {
                "hide-header": I,
                "is-scrollable": k,
                "has-scrolled-content": N,
              }),
              "role": "document",
              "onScroll": Gc,
              "ref": v,
              "aria-label": k ? Za("Scrollable section") : void 0,
              "tabIndex": k ? 0 : void 0,
              "children": [
                !I &&
                  (0, Rt.jsxs)("div", {
                    className: "components-modal__header",
                    children: [
                      (0, Rt.jsxs)("div", {
                        className: "components-modal__header-heading-container",
                        children: [
                          s &&
                            (0, Rt.jsx)("span", {
                              "className": "components-modal__icon-container",
                              "aria-hidden": !0,
                              "children": s,
                            }),
                          n &&
                            (0, Rt.jsx)("h1", {
                              id: B,
                              className: "components-modal__header-heading",
                              children: n,
                            }),
                        ],
                      }),
                      f,
                      u &&
                        (0, Rt.jsxs)(Rt.Fragment, {
                          children: [
                            (0, Rt.jsx)(Ht, { marginBottom: 0, marginLeft: 3 }),
                            (0, Rt.jsx)(Le, {
                              size: "small",
                              onClick: (ee) => Ve().then(() => a(ee)),
                              icon: Q0,
                              label: b || Za("Close"),
                            }),
                          ],
                        }),
                    ],
                  }),
                (0, Rt.jsx)("div", {
                  ref: xn([Y, o === "firstContentElement" ? F : null]),
                  children: m,
                }),
              ],
            }),
          }),
        }),
      });
    return (0, nl.createPortal)(
      (0, Rt.jsx)(bB.Provider, { value: Oe, children: Dl }),
      document.body
    );
  }
  var mB = (0, H.forwardRef)(fC),
    uG = mB;
  var Qr = V(M()),
    IC = () => {};
  function yC(e, t) {
    let {
        className: c,
        checked: l,
        id: n,
        disabled: o,
        onChange: r = IC,
        ...d
      } = e,
      u = Ie("components-form-toggle", c, {
        "is-checked": l,
        "is-disabled": o,
      });
    return (0, Qr.jsxs)("span", {
      className: u,
      children: [
        (0, Qr.jsx)("input", {
          className: "components-form-toggle__input",
          id: n,
          type: "checkbox",
          checked: l,
          onChange: r,
          disabled: o,
          ...d,
          ref: t,
        }),
        (0, Qr.jsx)("span", { className: "components-form-toggle__track" }),
        (0, Qr.jsx)("span", { className: "components-form-toggle__thumb" }),
      ],
    });
  }
  var WC = (0, H.forwardRef)(yC),
    XB = WC;
  var Al = V(M()),
    BC = () => {};
  function vC(e, t) {
    let {
        buttonProps: c = {},
        children: l,
        className: n,
        icon: o,
        initialOpen: r,
        onToggle: d = BC,
        opened: u,
        title: i,
        scrollAfterOpen: a = !0,
      } = e,
      [s, b] = o0(u, { initial: r === void 0 ? !0 : r, fallback: !1 }),
      m = (0, H.useRef)(null),
      X = Td() ? "auto" : "smooth",
      p = (G) => {
        G.preventDefault();
        let g = !s;
        b(g), d(g);
      },
      Z = (0, H.useRef)();
    (Z.current = a),
      Fu(() => {
        s &&
          Z.current &&
          m.current?.scrollIntoView &&
          m.current.scrollIntoView({
            inline: "nearest",
            block: "nearest",
            behavior: X,
          });
      }, [s, X]);
    let x = Ie("components-panel__body", n, { "is-opened": s });
    return (0, Al.jsxs)("div", {
      className: x,
      ref: xn([m, t]),
      children: [
        (0, Al.jsx)(FC, { icon: o, isOpened: !!s, onClick: p, title: i, ...c }),
        typeof l == "function" ? l({ opened: !!s }) : s && l,
      ],
    });
  }
  var FC = (0, H.forwardRef)(({ isOpened: e, icon: t, title: c, ...l }, n) =>
      c
        ? (0, Al.jsx)("h2", {
            className: "components-panel__body-title",
            children: (0, Al.jsxs)(Le, {
              "className": "components-panel__body-toggle",
              "aria-expanded": e,
              "ref": n,
              ...l,
              "children": [
                (0, Al.jsx)("span", {
                  "aria-hidden": "true",
                  "children": (0, Al.jsx)(Sr, {
                    className: "components-panel__arrow",
                    icon: e ? w0 : Lu,
                  }),
                }),
                c,
                t &&
                  (0, Al.jsx)(Sr, {
                    icon: t,
                    className: "components-panel__icon",
                    size: 20,
                  }),
              ],
            }),
          })
        : null
    ),
    hC = (0, H.forwardRef)(vC),
    iG = hC;
  var xB = V(M());
  function VC({ className: e, children: t }, c) {
    return (0, xB.jsx)("div", {
      className: Ie("components-panel__row", e),
      ref: c,
      children: t,
    });
  }
  var CC = (0, H.forwardRef)(VC),
    aG = CC;
  var Zo = V(M()),
    GB = (e) => {
      if (!(typeof e > "u" || e === null))
        return e.match(/^tab-panel-[0-9]*-(.*)/)?.[1];
    },
    JC = (
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
      let i = Gt(pB, "tab-panel"),
        a = (0, H.useCallback)(
          (Z) => {
            if (!(typeof Z > "u")) return `${i}-${Z}`;
          },
          [i]
        ),
        s = Wu({
          setSelectedId: (Z) => {
            if (typeof Z > "u" || Z === null) return;
            let x = c.find((g) => a(g.name) === Z);
            if (x?.disabled || x === X) return;
            let G = GB(Z);
            typeof G > "u" || d?.(G);
          },
          orientation: o,
          selectOnMove: l,
          defaultSelectedId: a(n),
          rtl: En(),
        }),
        b = GB(oe(s, "selectedId")),
        m = (0, H.useCallback)(
          (Z) => {
            s.setState("selectedId", a(Z));
          },
          [a, s]
        ),
        X = c.find(({ name: Z }) => Z === b),
        p = va(b);
      return (
        (0, H.useEffect)(() => {
          p !== b && b === n && b && d?.(b);
        }, [b, n, d, p]),
        (0, H.useLayoutEffect)(() => {
          if (X) return;
          let Z = c.find((x) => x.name === n);
          if (!(n && !Z))
            if (Z && !Z.disabled) m(Z.name);
            else {
              let x = c.find((G) => !G.disabled);
              x && m(x.name);
            }
        }, [c, X, n, i, m]),
        (0, H.useEffect)(() => {
          if (!X?.disabled) return;
          let Z = c.find((x) => !x.disabled);
          Z && m(Z.name);
        }, [c, X?.disabled, m, i]),
        (0, Zo.jsxs)("div", {
          className: e,
          ref: u,
          children: [
            (0, Zo.jsx)(gs, {
              store: s,
              className: "components-tab-panel__tabs",
              children: c.map((Z) =>
                (0, Zo.jsx)(
                  ps,
                  {
                    "id": a(Z.name),
                    "className": Ie(
                      "components-tab-panel__tabs-item",
                      Z.className,
                      { [r]: Z.name === b }
                    ),
                    "disabled": Z.disabled,
                    "aria-controls": `${a(Z.name)}-view`,
                    "render": (0, Zo.jsx)(Le, {
                      __next40pxDefaultSize: !0,
                      icon: Z.icon,
                      label: Z.icon && Z.title,
                      showTooltip: !!Z.icon,
                    }),
                    "children": !Z.icon && Z.title,
                  },
                  Z.name
                )
              ),
            }),
            X &&
              (0, Zo.jsx)(Hs, {
                id: `${a(X.name)}-view`,
                store: s,
                tabId: a(X.name),
                className: "components-tab-panel__tab-content",
                children: t(X),
              }),
          ],
        })
      );
    },
    pB = (0, H.forwardRef)(JC),
    Du = pB;
  var sG = V(M());
  function YC(e, t) {
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
      m = Gt(gB, "inspector-text-control", u),
      X = (p) => a(p.target.value);
    return (0, sG.jsx)(wr, {
      __nextHasNoMarginBottom: c,
      __associatedWPComponentName: "TextControl",
      label: n,
      hideLabelFromVision: o,
      id: m,
      help: d,
      className: i,
      children: (0, sG.jsx)("input", {
        "className": Ie("components-text-control__input", {
          "is-next-40px-default-size": l,
        }),
        "type": s,
        "id": m,
        "value": r,
        "onChange": X,
        "aria-describedby": d ? m + "__help" : void 0,
        "ref": t,
        ...b,
      }),
    });
  }
  var gB = (0, H.forwardRef)(YC),
    Pe = gB;
  var Ro = V(M());
  function NC(
    {
      __nextHasNoMarginBottom: e,
      label: t,
      checked: c,
      help: l,
      className: n,
      onChange: o,
      disabled: r,
    },
    d
  ) {
    function u(p) {
      o(p.target.checked);
    }
    let a = `inspector-toggle-control-${Gt(HB)}`,
      b = Lt()(
        "components-toggle-control",
        n,
        !e && D({ marginBottom: $(3) }, "", "")
      );
    e ||
      Lc("Bottom margin styles for wp.components.ToggleControl", {
        since: "6.7",
        version: "7.0",
        hint: "Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.",
      });
    let m, X;
    return (
      l &&
        (typeof l == "function" ? c !== void 0 && (X = l(c)) : (X = l),
        X && (m = a + "__help")),
      (0, Ro.jsx)(wr, {
        id: a,
        help:
          X &&
          (0, Ro.jsx)("span", {
            className: "components-toggle-control__help",
            children: X,
          }),
        className: b,
        __nextHasNoMarginBottom: !0,
        children: (0, Ro.jsxs)(lG, {
          justify: "flex-start",
          spacing: 2,
          children: [
            (0, Ro.jsx)(XB, {
              "id": a,
              "checked": c,
              "onChange": u,
              "aria-describedby": m,
              "disabled": r,
              "ref": d,
            }),
            (0, Ro.jsx)(js, {
              as: "label",
              htmlFor: a,
              className: Ie("components-toggle-control__label", {
                "is-disabled": r,
              }),
              children: t,
            }),
          ],
        }),
      })
    );
  }
  var HB = (0, H.forwardRef)(NC),
    bG = HB;
  var Jc = V(A());
  var zC = ({ onClick: e }) => {
    let [t, c] = (0, H.useState)(!1);
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
  function kC({ name: e, focus: t, setFocus: c, copy: l }) {
    return Jc.default.createElement(
      "div",
      {
        style: { position: "relative", padding: "0px 24px 0px 10px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
      },
      Jc.default.createElement("span", null, e),
      t && Jc.default.createElement(zC, { onClick: l })
    );
  }
  function mG({ relations: e, setRelations: t, Relation: c }) {
    let l = wp.i18n.__,
      n = cr({ filter: !0 }),
      [o, r] = (0, H.useState)(e[0]?.name || "add"),
      [d, u] = (0, H.useState)(null),
      i = e
        .map(
          ({
            backend: m,
            endpoint: X,
            post_type: p,
            foreign_key: Z = "id",
            fields: x = [],
            ...G
          }) => ({
            ...G,
            name: p,
            title: p,
            post_type: p,
            backend: m,
            endpoint: X,
            foreign_key: Z,
            fields: x,
            icon: n.length
              ? Jc.default.createElement(kC, {
                  name: p,
                  focus: d === p,
                  setFocus: (g) => u(g ? p : null),
                  copy: () => b(p),
                })
              : null,
          })
        )
        .concat([{ title: l("Add relation", "posts-bridge"), name: "add" }]),
      a = (m, X) => {
        m === -1 && (m = e.length);
        let p = e
          .slice(0, m)
          .concat([X])
          .concat(e.slice(m + 1, e.length));
        p.forEach((Z) => {
          delete Z.name, delete Z.title, delete Z.icon;
        }),
          t(p),
          r(p[m].post_type);
      },
      s = ({ post_type: m }) => {
        let X = e.findIndex((Z) => Z.post_type === m),
          p = e.slice(0, X).concat(e.slice(X + 1));
        t(p), r(p[X - 1]?.post_type || "add");
      },
      b = (m) => {
        let X = e.findIndex((x) => x.post_type === m),
          p = e[X],
          Z = { ...p, fields: JSON.parse(JSON.stringify(p.fields || [])) };
        t(e.concat(Z)), r(Z.post_type);
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
        l("Posts remote relations", "posts-bridge")
      ),
      Jc.default.createElement(
        Du,
        { tabs: i, onSelect: r, initialTabName: o },
        (m) =>
          Jc.default.createElement(c, {
            data: m,
            remove: s,
            update: (X) =>
              a(
                e.findIndex(({ post_type: p }) => p === m.post_type),
                X
              ),
          })
      )
    );
  }
  var Ll = V(A());
  var at = V(A());
  var Or = V(A());
  var We = V(A());
  var XG = {
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
  function xG({ fields: e, setFields: t, done: c }) {
    let l = wp.i18n.__,
      n = (0, H.useMemo)(
        () =>
          Object.keys(XG).map(
            (a) =>
              e.find(({ name: b }) => b === a) || {
                name: a,
                value: null,
                index: null,
              }
          ),
        [e]
      ),
      o = (0, H.useMemo)(() => {
        let a = e.filter(({ name: s }) => !Object.hasOwnProperty.call(XG, s));
        return a.length ? a : [{ name: "", foreign: "", index: e.length }];
      }, [e]),
      r = (a, s, b) => {
        let m;
        s >= e.length
          ? (m = e.concat({ name: "", foreign: "", index: s, [a]: b }))
          : (m = e.map(
              (X, p) => (
                s === p &&
                  ((X[a] = b), a === "name" && X.foreign !== b && (X.name = b)),
                { ...X }
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
    return We.default.createElement(
      We.default.Fragment,
      null,
      We.default.createElement(
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
      We.default.createElement(
        "table",
        { style: { width: "100%", minWidth: "500px" } },
        We.default.createElement(
          "tbody",
          null,
          n.map(({ name: a, foreign: s, index: b }) =>
            We.default.createElement(
              "tr",
              { key: a },
              We.default.createElement(
                "td",
                null,
                We.default.createElement("b", null, XG[a])
              ),
              We.default.createElement(
                "td",
                null,
                We.default.createElement(Pe, {
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
      We.default.createElement(Ht, { paddingY: "calc(3px)" }),
      We.default.createElement(
        "div",
        { style: { display: "flex" } },
        We.default.createElement(
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
        We.default.createElement(
          Le,
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
      We.default.createElement(
        "table",
        { style: { width: "100%", minWidth: "500px" } },
        We.default.createElement(
          "tbody",
          null,
          o.map(({ foreign: a, name: s, index: b }) =>
            We.default.createElement(
              "tr",
              { key: b },
              We.default.createElement(
                "td",
                null,
                We.default.createElement(Pe, {
                  placeholder: l("Custom field name", "posts-bridge"),
                  value: s,
                  onChange: (m) => r("name", b, m),
                  __nextHasNoMarginBottom: !0,
                })
              ),
              We.default.createElement(
                "td",
                null,
                We.default.createElement(Pe, {
                  placeholder: l("Foreign field name", "posts-bridge"),
                  value: a,
                  onChange: (m) => r("foreign", b, m),
                  __nextHasNoMarginBottom: !0,
                })
              ),
              We.default.createElement(
                "td",
                { style: { borderLeft: "1rem solid transparent" } },
                We.default.createElement(
                  Le,
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
      We.default.createElement(Ht, { paddingY: "calc(3px)" }),
      We.default.createElement(
        Le,
        { variant: "primary", onClick: () => c(), style: { height: "32px" } },
        l("Done", "posts-bridge")
      )
    );
  }
  function GG({ fields: e, setFields: t }) {
    let c = wp.i18n.__,
      [l, n] = (0, H.useState)(!1),
      o = (r) => {
        r.forEach((d) => {
          delete d.index;
        }),
          t(r);
      };
    return Or.default.createElement(
      Or.default.Fragment,
      null,
      Or.default.createElement(
        Le,
        {
          variant: "secondary",
          onClick: () => n(!0),
          style: { width: "130px", justifyContent: "center", height: "32px" },
        },
        c("Remote fields", "posts-bridge")
      ),
      l &&
        Or.default.createElement(
          uG,
          {
            title: c("Remote fields", "posts-bridge"),
            onRequestClose: () => n(!1),
          },
          Or.default.createElement(xG, {
            fields: e.map((r, d) => ({ ...r, index: d })),
            setFields: o,
            done: () => n(!1),
          })
        )
    );
  }
  var ec = V(A());
  function Uu({ add: e, schema: t, children: c = () => {} }) {
    let l = wp.i18n.__,
      [{ backends: n }] = mn(),
      o = [{ label: "", value: "" }].concat(
        n.map(({ name: g }) => ({ label: g, value: g }))
      ),
      r = cr({ filter: !0 }),
      d = [{ label: "", value: "" }].concat(
        r.map((g) => ({ label: g, value: g }))
      ),
      [u, i] = (0, H.useState)(""),
      [a, s] = (0, H.useState)(""),
      [b, m] = (0, H.useState)(""),
      [X, p] = (0, H.useState)({}),
      Z = (0, H.useMemo)(() =>
        t.filter((g) => !["post_type", "backend", "foreign_key"].includes(g))
      ),
      x = () => {
        e({ ...X, post_type: u, backend: a, foreigh_key: b, fields: [] }),
          i(""),
          s(""),
          m(""),
          p({});
      },
      G = (0, H.useMemo)(
        () =>
          !(
            u &&
            (a || !t.includes("backend")) &&
            (b || !t.includes("foreign_key")) &&
            Z.reduce((g, R) => g && X[R], !0)
          ),
        [u, a, b, X, Z]
      );
    return ec.default.createElement(
      "div",
      {
        style: {
          padding: "calc(24px) calc(32px)",
          width: "calc(100% - 64px)",
          backgroundColor: "rgb(245, 245, 245)",
        },
      },
      ec.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        ec.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          ec.default.createElement(Dt, {
            label: l("Post type", "posts-bridge"),
            value: u,
            onChange: i,
            options: d,
            __nextHasNoMarginBottom: !0,
          })
        ),
        t.includes("backend") &&
          ec.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ec.default.createElement(Dt, {
              label: l("Backend", "posts-bridge"),
              value: a,
              onChange: s,
              options: o,
              __nextHasNoMarginBottom: !0,
            })
          ),
        t.includes("foreign_key") &&
          ec.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ec.default.createElement(Pe, {
              label: l("Foreign key", "posts-bridge"),
              value: b,
              onChange: m,
              __nextHasNoMarginBottom: !0,
            })
          ),
        c({ data: X, update: (g) => p(g) })
      ),
      ec.default.createElement(Ht, { paddingY: "calc(8px)" }),
      ec.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        ec.default.createElement(
          "div",
          null,
          ec.default.createElement(
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
          ec.default.createElement(
            Le,
            {
              variant: "primary",
              onClick: () => x(),
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
  function pG({ fullMode: e, postType: t }) {
    let [c, l] = (0, H.useState)(!1),
      [n, o] = (0, H.useState)(!1);
    return {
      loading: c,
      error: n,
      sync: () => {
        l(!0);
        let d = new URLSearchParams();
        d.set("_ajax_nonce", postsBridgeAjaxSync.nonce),
          d.set("action", postsBridgeAjaxSync.action),
          d.set("mode", e ? "full" : "light"),
          t && d.set("post_type", t),
          fetch(postsBridgeAjaxSync.url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: d.toString(),
          })
            .catch(() => o(!0))
            .finally(() => l(!1));
      },
    };
  }
  function gG({
    data: e,
    update: t,
    remove: c,
    schema: l = ["post_type", "backend", "foreign_key"],
    template: n = ({ add: r, schema: d }) =>
      at.default.createElement(Uu, { add: r, schema: d }),
    children: o = () => {},
  }) {
    if (e.name === "add") return n({ add: t, schema: l });
    let r = wp.i18n.__,
      [d, u] = (0, H.useState)(!1),
      [{ backends: i }] = mn(),
      a = [{ label: "", value: "" }].concat(
        i.map(({ name: Z }) => ({ label: Z, value: Z }))
      ),
      s = cr({ filter: !0 }),
      b = [{ label: "", value: "" }].concat(
        s
          .filter((Z) => Z !== e.post_type)
          .map((Z) => ({ label: Z, value: Z }))
          .concat([{ label: e.post_type, value: e.post_type }])
      ),
      {
        loading: m,
        error: X,
        sync: p,
      } = pG({ fullMode: d, postType: e.post_type });
    return (
      (0, at.useEffect)(() => {
        if (!m)
          return () => {
            u(!1);
          };
      }, [m]),
      at.default.createElement(
        "div",
        {
          style: {
            padding: "calc(24px) calc(32px)",
            width: "calc(100% - 64px)",
            backgroundColor: "rgb(245, 245, 245)",
          },
        },
        at.default.createElement(
          "div",
          { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
          at.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            at.default.createElement(Dt, {
              label: r("Post type", "posts-bridge"),
              value: e.post_type,
              onChange: (Z) => t({ ...e, post_type: Z }),
              options: b,
              __nextHasNoMarginBottom: !0,
            })
          ),
          l.includes("backend") &&
            at.default.createElement(
              "div",
              { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
              at.default.createElement(Dt, {
                label: r("Backend", "posts-bridge"),
                value: e.backend,
                onChange: (Z) => t({ ...e, backend: Z }),
                options: a,
                __nextHasNoMarginBottom: !0,
              })
            ),
          l.includes("foreign_key") &&
            at.default.createElement(
              "div",
              { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
              at.default.createElement(Pe, {
                label: r("Foreign key", "posts-bridge"),
                value: e.foreign_key,
                onChange: (Z) => t({ ...e, foreign_key: Z }),
                __nextHasNoMarginBottom: !0,
              })
            ),
          o({ data: e, update: t })
        ),
        at.default.createElement(Ht, { paddingY: "calc(8px)" }),
        at.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1em",
              flexWrap: "wrap",
            },
          },
          at.default.createElement(GG, {
            fields: e.fields || [],
            setFields: (Z) => t({ ...e, fields: Z }),
          }),
          at.default.createElement(
            Le,
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
          ),
          at.default.createElement(
            Le,
            {
              variant: "primary",
              isBusy: m,
              disabled: X,
              isDestructive: X,
              onClick: p,
              style: {
                width: "130px",
                justifyContent: "center",
                height: "32px",
              },
              __next40pxDefaultSize: !0,
            },
            r("Syncrhonize", "posts-bridge")
          ),
          at.default.createElement(bG, {
            label: r("Run a full synchronization", "posts-bridge"),
            checked: d,
            onChange: () => u(!d),
            __nextHasNoMarginBottom: !0,
          })
        )
      )
    );
  }
  var Vn = V(A());
  function fo() {
    let [{ "odoo-api": e = { databases: [], relations: [] } }, t] = WX();
    return [e, (l) => t({ "odoo-api": l })];
  }
  function HG({ add: e, schema: t }) {
    let c = wp.i18n.__,
      [{ databases: l }] = fo(),
      n = [{ label: "", value: "" }].concat(
        l.map(({ name: o }) => ({ label: o, value: o }))
      );
    return Vn.default.createElement(
      Uu,
      { add: e, schema: t },
      ({ data: o, update: r }) =>
        Vn.default.createElement(
          Vn.default.Fragment,
          null,
          Vn.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Vn.default.createElement(Dt, {
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
            Vn.default.createElement(Pe, {
              label: c("Model", "posts-bridge"),
              value: o.model || "",
              onChange: (d) => r({ ...o, model: d }),
              __nextHasNoMarginBottom: !0,
            })
          )
        )
    );
  }
  function ZG({ data: e, update: t, remove: c }) {
    let l = wp.i18n.__,
      [{ databases: n }] = fo(),
      o = [{ label: "", value: "" }].concat(
        n.map(({ name: r }) => ({ label: r, value: r }))
      );
    return Ll.default.createElement(
      gG,
      {
        data: e,
        update: t,
        remove: c,
        template: ({ add: r, schema: d }) =>
          Ll.default.createElement(HG, { add: r, schema: d }),
        schema: ["post_type", "database", "model"],
      },
      ({ data: r, update: d }) =>
        Ll.default.createElement(
          Ll.default.Fragment,
          null,
          Ll.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Ll.default.createElement(Pe, {
              label: l("Model", "posts-bridge"),
              value: r.model,
              onChange: (u) => d({ ...r, model: u }),
              __nextHasNoMarginBottom: !0,
            })
          ),
          Ll.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            Ll.default.createElement(Dt, {
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
  var Yc = V(A());
  var ft = V(A());
  var Jt = V(A());
  function RG({ add: e, databases: t }) {
    let c = wp.i18n.__,
      [{ backends: l }] = mn(),
      n = [{ label: "", value: "" }].concat(
        l.map(({ name: g }) => ({ label: g, value: g }))
      ),
      o = (0, H.useMemo)(() => new Set(t.map(({ name: g }) => g)), [t]),
      [r, d] = (0, H.useState)(""),
      [u, i] = (0, H.useState)(""),
      [a, s] = (0, H.useState)(!1),
      [b, m] = (0, H.useState)(""),
      [X, p] = (0, H.useState)(""),
      Z = (g) => {
        s(o.has(g.trim())), d(g);
      },
      x = () => {
        e({ name: r.trim(), backend: u, user: b, password: X }),
          d(""),
          i(""),
          m(""),
          p(""),
          s(!1);
      },
      G = !(r && u && b && X && !a);
    return Jt.default.createElement(
      "div",
      {
        style: {
          padding: "calc(24px) calc(32px)",
          width: "calc(100% - 64px)",
          backgroundColor: "rgb(245, 245, 245)",
        },
      },
      Jt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        Jt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Jt.default.createElement(Pe, {
            label: c("Name", "forms-bridge"),
            help: a ? c("This name is already in use", "forms-bridge") : "",
            value: r,
            onChange: Z,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Jt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Jt.default.createElement(Dt, {
            label: c("Backend", "forms-bridge"),
            value: u,
            onChange: i,
            options: n,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Jt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Jt.default.createElement(Pe, {
            label: c("User", "forms-bridge"),
            value: b,
            onChange: m,
            __nextHasNoMarginBottom: !0,
          })
        ),
        Jt.default.createElement(
          "div",
          { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
          Jt.default.createElement(Pe, {
            label: c("Password", "forms-bridge"),
            value: X,
            onChange: p,
            __nextHasNoMarginBottom: !0,
          })
        )
      ),
      Jt.default.createElement(Ht, { paddingY: "calc(8px)" }),
      Jt.default.createElement(
        "div",
        { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
        Jt.default.createElement(
          "div",
          null,
          Jt.default.createElement(
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
          Jt.default.createElement(
            Le,
            {
              variant: "primary",
              onClick: () => x(),
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
  function fG({ data: e, update: t, remove: c, databases: l }) {
    if (e.name === "add")
      return ft.default.createElement(RG, { add: t, databases: l });
    let n = wp.i18n.__,
      [{ backends: o }] = mn(),
      r = [{ label: "", value: "" }].concat(
        o.map(({ name: p }) => ({ label: p, value: p }))
      ),
      [d, u] = (0, H.useState)(e.name),
      i = (0, H.useRef)(e.name),
      a = (0, H.useMemo)(() => new Set(l.map(({ name: p }) => p)), [l]),
      [s, b] = (0, H.useState)(!1),
      m = (p) => {
        b(p !== i.current && a.has(p.trim())), u(p);
      },
      X = (0, H.useRef)();
    return (
      (0, H.useEffect)(() => {
        clearTimeout(X.current),
          !(!d || s) &&
            (X.current = setTimeout(() => {
              a.has(d.trim()) || t({ ...e, name: d.trim() });
            }, 500));
      }, [d]),
      (0, H.useEffect)(() => u(e.name), [e.name]),
      ft.default.createElement(
        "div",
        {
          style: {
            padding: "calc(24px) calc(32px)",
            width: "calc(100% - 64px)",
            backgroundColor: "rgb(245, 245, 245)",
          },
        },
        ft.default.createElement(
          "div",
          { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
          ft.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ft.default.createElement(Pe, {
              label: n("Name", "forms-bridge"),
              help: s ? n("This name is already in use", "forms-bridge") : "",
              value: d,
              onChange: m,
              onFocus: () => (focus = !0),
              onBlur: () => (focus = !1),
              __nextHasNoMarginBottom: !0,
            })
          ),
          ft.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ft.default.createElement(Dt, {
              label: n("Backend", "forms-bridge"),
              value: e.backend,
              onChange: (p) => t({ ...e, backend: p }),
              options: r,
              __nextHasNoMarginBottom: !0,
            })
          ),
          ft.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ft.default.createElement(Pe, {
              label: n("User", "forms-bridge"),
              value: e.user,
              onChange: (p) => t({ ...e, user: p }),
              __nextHasNoMarginBottom: !0,
            })
          ),
          ft.default.createElement(
            "div",
            { style: { flex: 1, minWidth: "150px", maxWidth: "250px" } },
            ft.default.createElement(Pe, {
              label: n("Password", "forms-bridge"),
              value: e.password,
              onChange: (p) => t({ ...e, password: p }),
              __nextHasNoMarginBottom: !0,
            })
          )
        ),
        ft.default.createElement(Ht, { paddingY: "calc(8px)" }),
        ft.default.createElement(
          "div",
          { style: { display: "flex", gap: "1em", flexWrap: "wrap" } },
          ft.default.createElement(
            "div",
            null,
            ft.default.createElement(
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
            ft.default.createElement(
              Le,
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
  var wC = ({ onClick: e }) => {
    let [t, c] = (0, H.useState)(!1);
    return Yc.default.createElement(
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
      Yc.default.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff",
      }),
      Yc.default.createElement("path", {
        d: "M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195",
        stroke: t ? "#3858e9" : "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "#ffffff00",
      })
    );
  };
  function SC({ name: e, focus: t, setFocus: c, copy: l }) {
    return Yc.default.createElement(
      "div",
      {
        style: { position: "relative", padding: "0px 24px 0px 10px" },
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
      },
      Yc.default.createElement("span", null, e),
      t && Yc.default.createElement(wC, { onClick: l })
    );
  }
  function IG({ databases: e, setDatabases: t }) {
    let c = wp.i18n.__,
      [l, n] = (0, H.useState)(e[0]?.name || "add"),
      [o, r] = (0, H.useState)(null),
      d = e
        .map(({ name: s, user: b, password: m, backend: X }) => ({
          name: s,
          title: s,
          user: b,
          password: m,
          backend: X,
          icon: Yc.default.createElement(SC, {
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
        m.forEach((X) => {
          delete X.title, delete X.icon;
        }),
          t(m),
          n(m[s].name);
      },
      i = ({ name: s }) => {
        let b = e.findIndex((X) => X.name === s),
          m = e.slice(0, b).concat(e.slice(b + 1));
        t(m), n(m[b - 1]?.name || "add");
      },
      a = (s) => {
        let b = e.findIndex((Z) => Z.name === s),
          X = { ...e[b] },
          p = !1;
        p ||
          ((X.name += "-copy"),
          (p = e.find((Z) => Z.name === X.name) === void 0)),
          t(e.concat(X)),
          n(X.name);
      };
    return Yc.default.createElement(
      "div",
      { style: { width: "100%" } },
      Yc.default.createElement(
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
      Yc.default.createElement(
        Du,
        { tabs: d, onSelect: n, initialTabName: l },
        (s) =>
          Yc.default.createElement(fG, {
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
  function yG() {
    let e = wp.i18n.__,
      [{ databases: t, relations: c }, l] = fo(),
      n = (o) => l({ databases: t, relations: c, ...o });
    return Cn.default.createElement(
      Cn.default.Fragment,
      null,
      Cn.default.createElement(
        aG,
        null,
        Cn.default.createElement(mG, {
          relations: c,
          setRelations: (o) => n({ relations: o }),
          Relation: ZG,
        })
      ),
      Cn.default.createElement(Ht, { paddingY: "calc(8px)" }),
      Cn.default.createElement(
        iG,
        { title: e("Databases", "posts-bridge"), initialOpen: t.length === 0 },
        Cn.default.createElement(IG, {
          databases: t,
          setDatabases: (o) => n({ databases: o }),
        })
      )
    );
  }
  var ZB =
    "iVBORw0KGgoAAAANSUhEUgAAAfQAAADCCAMAAACIXMC8AAAAw3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPxnio7gV8CMQ5pE6gYdvwYbKbQ9ifNhw2GczvfrSo8OQkmyFc01ZzBIlUrNhIKjDUaQwQOXhMI1n54Ul8hSbJF9q9kjznxcmBGbqe1mpM8o7GuhSvjrl1E8zL2jro8wqmHE5AUMg+bfgly13L+wn7BCfaVOomvbP/ti0zs2e4eJTkYGY2bxBrgvSdysQIPFDiJn08Bl8DSzgfyb00T6AHWBWXL3mP+ZAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TS0WqHSwo4pChOtlFRRxrFYpQodQKrTqYXPoFTRqSFBdHwbXg4Mdi1cHFWVcHV0EQ/ABxdnBSdJES/5cUWsR4cNyPd/ced+8AoVllqtkTB1TNMjLJhJjLr4rBV4QwgDACGJKYqc+l0yl4jq97+Ph6F+NZ3uf+HP1KwWSATySOM92wiDeIZzYtnfM+cYSVJYX4nHjCoAsSP3JddvmNc8lhgWdGjGxmnjhCLJa6WO5iVjZU4mniqKJqlC/kXFY4b3FWq3XWvid/YaigrSxzneYokljEEtIQIaOOCqqwEKNVI8VEhvYTHv4Rx58ml0yuChg5FlCDCsnxg//B727N4tSkmxRKAIEX2/4YA4K7QKth29/Htt06AfzPwJXW8deawOwn6Y2OFj0CwtvAxXVHk/eAyx1g+EmXDMmR/DSFYhF4P6NvygODt0Dfmttbex+nD0CWukrdAAeHwHiJstc93t3b3du/Z9r9/QBKVnKW9KmKxgAADXhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6OWY2MjM1MDUtZDFiMy00MjFkLWE0ODYtYmY3ZTZiYjU2MTUyIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmYyY2M3ZGUwLTZjNjAtNGIwYi05ZjYwLTljYjcwN2E2M2IyZSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmE2N2EyNDQyLTYyYTYtNDhhZi05NDYzLWI1MTk4NDZlZGY2OSIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTczNDE4ODgyMjI0NjQ1NyIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjM0IgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNDoxMjoxNFQxNjowNzowMCswMTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQ6MTI6MTRUMTY6MDc6MDArMDE6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTljZTE1Zi1jZDE3LTRkOGItYjVjOC00NDFhYjc1ZDQzNjQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDI0LTEyLTE0VDE2OjA3OjAyKzAxOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pn2O54UAAAHLUExURTEAAEdwTIiIiImGiIiIiIiIiI17hop8hYeHh5aHlriguIiIiIeHh4iIiIiIiIiIiIeHh4eHh4iIiIeHh4eHh4iIiIiIiIiIiIeHh4eHh4iIiIeHh4iIiIeHh4eHh4eHh4iIiIeHh4eHh4iIiIiIiJtWiIiIiIiIiIeHh4iIiIeHh4eHh4iIiIiIiImJiZxWiZxUi4iIiIiIiJ1YiIeHh5xXiJxWiZxXiZtWiJxXiZxXiYiIiJtWiJxWiZtXiYeHh5tWiJtXiYeHh5xWiJxXiJtWiJtWiJxXiZxWiJxWiJxXiYiIiJxWiZtXiIeHh5xWiZxXiJxWiJxWiJxWiZxWiYiIiJxWif///4iIiJxXiYqKivn4+f39/fv7+42NjdbW1pCQkPDw8JaWlqysrOnp6f7+/rGxsaGhoZ2dncHBwbm5uZOTk8/Pz6ioqLy8vPPz85qamsTExKSkpOzs7MfHx9/f39zc3OXl5ePj47W1tZ9bjPb29szMzKRlk7F6otCuxp1YiqFfj9nZ2ahsmMWdusqlwL+Ts9S2zLWCp+bU4e/j7K1zndLS0vjz99m+0fLq8MrKyunZ5eze6PXu893F1uLO3buLrriHq+DK2s+wIikAAAABdFJOUwBA5thmAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gMDg8HArn/GasAAAXOSURBVHja7d1BdqRIDIRhPV2K+99s3qxmMd02mQplCPhj7SI69QFdLlMQQQghhBBCCCGEEEIIIYQQQgghhBBCCHlx8t8whq+JJ+4fNUf9i+awf9Ic9A+ao/5JdNQ/aA466OQT6KiDTr5gDjroBHQCOgGdgE5AJ6AT0AnoBHQCOgGdgE5AJ6CDDjrooINOQCegE9AJ6AR0Avp7c/0vBssz6K49Z9QOe/2Q04fu36YhQl8rdS3WKt7mnr+lAz3XW02LdYs3uOe9iNG3Wk2LHSAuZc+VyNA3S12LnUGucs/VSND3W02LHUMuYM+dlNErrabFDiIvquduSuilUtdiR5lX2DNLg9ibURZbTYudRb6tnrVsopdbTYudZr7HntXsoGe91WHeoH5d59WzL82tDnI5+6XJGPNsbzXt4PPM19jTgn7iXDKn9oj5gno60A/9D9LZO9D8tno60I+9b+jsHWh+Uz0d6AffLXb2DjS/pZ4O9KO/I3T2DjS/oZ4O9MO/GXb2DjT/VT1fg56mk9pA88tunsdaTSe1eeY/q6cF3fHZn6/Wgn6ZzfNc68APmhXmW7uJ9OKw8kiysVV9JVwv+q5dCf3QL9knW2vmDbUl9NL+sjsGzclS19r6OX9Ez4u34aqnia2lqN4Lr72qWLr7wuJi9eY9O82xX3tXXlMv7UKTqws+QF9XFyxiHT3bW3Wv0W/iNljXjqNZghRdU9oHJlXXXAmxpq5awBr6idZGLaG67KInFbr4OpTTreV9RLaz7Vm1nTKEJ6oF9DOtxR8+oq68kFmBLr+29Hhrn7lsW9KL1++qS3/jvIueh1r3f1Jae8r8Lrr4A8Uyuri00VyzOfF3k+6pD0OP1um/H/3WmUP+96Jb6OdaO80VG9R/9bSCvl1aQte3ru8a+p1tg6jjaoyh6AF6/dYCv6J3XO31O/rJ1lbz8jY7bifxMPTonX6e7PWhxy56tMw/Ha0qn5PoEZ2HugW9pRT0u4d6z/hjJvrhxYJ+AD0eiN50C8AHoUfz9L+DHjvo0Tv/Wehdix2Ifr0PPUCfi56g/4wT30GPl6HnUPT8Enq6drZnoEfvHGahB+igvwI9voMeoIN+5hdF0EEHndM76LyR49076KCDzidy3/0Y9l1/cIkvoQfo/RfOgH5zu545gN6Mfn0H/YFXznzhwsiR6FwN60T/4NWwo77sYPnP1fVlB+PZ/ezXmizfcOk95t70DZcXfZetdfr5SPT3f1U5HK1r+0XHvjYOPSzjb5j+rU169rWikN7cdHMGT+vEO1HID/VhNxrqnP69DXoWe/ZQr91SzHLI9d5dKky1ZST15sTzT8sxl1V0333kLLcJTekg0oJ+e2uexZ5Dn3ZD4Og75hZW4FnsKXXLrb8l6Nk5fOFisx/90plfbYPQHHLZOXxZr3D3EanPe5xH29BSh256nIfmwT2rT+7RLEA5/ewbvqm2XV36tKZUjCHD0ar5d7ZtZB9sdQs7D+MrTyFjTqurVm228vqeJzBmA3q2lLoW26B2+8W7D9gtTSGjoTW3X+1ZbA397+yFZ2lntskVpt/SalpsWf1PeNdVMN94VGrlZSdaSyeJjsUq1P8zvBZ/vjCIrcS0VletCH0xlkHEvNaYZ96n7hiEZ/rVd+DnzbvUJ87BNfyB6HHevGkOlumHCT1imrplEJbxCz5JtZjr1S2DiLmtMdBcrW4ZRExujYHmWnXLIMLRqvqbuMdcqW4ZhGX8sqtfTOY6dcckwjJ+4fV1JnORumUQ8YzWGEeuYbcMIp7SGgPN6+qWQYSjdXfC88yL7JZBxLNaYx55ST0MkwhHadP9amzk++yWQYSjtTzggeZb7OGYRDy1NeaRr7NrOj1TMI1+HvkSu7LUMgTX6KeJ33dXd3qmYBr9PPLf3btKLTNwTX4Y+I/y3Z2eGZgmPw3cH8vqXTP/NjUhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQggh5NH5BzHSChHioKm4AAAAAElFTkSuQmCC";
  function WG() {
    let [e, t] = (0, H.useState)(null),
      c = (0, H.useRef)((l) => {
        t(
          l === "odoo-api"
            ? document.getElementById(l).querySelector(".root")
            : null
        );
      }).current;
    return (
      (0, H.useEffect)(() => {
        wppb.on("tab", c);
      }, []),
      (0, H.useEffect)(() => {
        if (!e) return;
        let l = document.querySelector("#odoo-api .addon-logo");
        l &&
          (l.setAttribute("src", "data:image/png;base64," + ZB),
          (l.style.width = "70px"));
      }, [e]),
      Mu.default.createElement(
        yX,
        { handle: ["odoo-api"] },
        Mu.default.createElement(
          vX,
          null,
          Mu.default.createElement(
            "div",
            null,
            e && (0, nl.createPortal)(Mu.default.createElement(yG, null), e)
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
      (0, Ga.createRoot)(c).render(React.createElement(WG, null));
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
