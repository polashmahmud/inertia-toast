import { reactive as l, createApp as u, h as f } from "vue";
import { Toaster as m, toast as a } from "vue-sonner";
import { router as c, usePage as d } from "@inertiajs/vue3";
function h() {
  var o, i, e, p;
  const t = (o = window == null ? void 0 : window.Inertia) == null ? void 0 : o.page;
  let n = ((i = t == null ? void 0 : t.props) == null ? void 0 : i.toastConfig) || {};
  if (!n || Object.keys(n).length === 0) {
    const s = document.getElementById("app");
    if ((e = s == null ? void 0 : s.dataset) != null && e.page)
      try {
        const r = JSON.parse(s.dataset.page);
        n = ((p = r == null ? void 0 : r.props) == null ? void 0 : p.toastConfig) || {};
      } catch {
      }
  }
  return n;
}
function y(t) {
  if (document.getElementById("inertia-toast-container")) return;
  const n = document.createElement("div");
  n.id = "inertia-toast-container", document.body.appendChild(n);
  const o = l({
    position: t.position || "bottom-right",
    closeButton: t.closeButton ?? !0,
    expand: t.expand ?? !1,
    theme: t.theme || "system",
    richColors: t.richColors ?? !0
  }), i = (e) => {
    !e || typeof e != "object" || (e.position && (o.position = e.position), typeof e.closeButton == "boolean" && (o.closeButton = e.closeButton), typeof e.expand == "boolean" && (o.expand = e.expand), e.theme && (o.theme = e.theme), typeof e.richColors == "boolean" && (o.richColors = e.richColors));
  };
  return u({
    render: () => f(m, o)
  }).mount("#inertia-toast-container"), { props: o, applyConfig: i };
}
function C(t) {
  c.on("finish", () => {
    var o;
    const n = (o = d().props) == null ? void 0 : o.toastConfig;
    t(n);
  });
}
function b() {
  c.on("finish", () => {
    const t = d().props.notification;
    if (t != null && t.body && (t != null && t.type)) {
      const n = t.description ? { description: t.description } : {};
      (a[t.type] || a)(
        String(t.body),
        n
      );
    }
  });
}
const g = {
  install(t) {
    const n = h(), o = y(n);
    o && C(o.applyConfig), b();
  }
};
export {
  g as default
};
