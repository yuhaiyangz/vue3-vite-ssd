"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
var serverRenderer = require("vue/server-renderer");
var vueRouter = require("vue-router");
var path = require("path");
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<!--[-->`);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/" }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`home`);
      } else {
        return [
          vue.createTextVNode("home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` | `);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/test" }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`test`);
      } else {
        return [
          vue.createTextVNode("test")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` | `);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/about" }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`about`);
      } else {
        return [
          vue.createTextVNode("about")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` default `);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const pages = { "./../views/ssd/about.vue": () => Promise.resolve().then(function() {
  return about;
}), "./../views/ssd/home.vue": () => Promise.resolve().then(function() {
  return home;
}) };
console.log(pages);
const routesSSD = Object.keys(pages).map((path2) => {
  const name = path2.match(/\.\/views\/ssd(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === "/home" ? "/" : name,
    component: pages[path2]
  };
});
console.log(routesSSD);
const routesNotSSD = [
  {
    path: "/test",
    name: "test",
    meta: {
      title: "\u6D4B\u8BD5",
      keepAlive: true
    },
    component: () => Promise.resolve().then(function() {
      return test$1;
    })
  }
];
const routes = routesSSD.concat(routesNotSSD);
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory(),
    routes
  });
}
function createApp() {
  const app = vue.createSSRApp(App);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
async function render(url, manifest) {
  const { app, router } = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = path.basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    vue.ref("222");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}> about&quot;/about&quot; </div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ssd/about.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var about = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const a = vue.ref("222");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}> home&quot;/about&quot;${serverRenderer.ssrInterpolate(a.value)}</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ssd/home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var home = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}> weqwe&quot;/qeqwe&quot; </div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var test = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var test$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": test
}, Symbol.toStringTag, { value: "Module" }));
exports.render = render;
