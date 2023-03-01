import Vue from "vue";
import VueRouter from "vue-router";
import Hashtag from "../views/Hashtag.vue";
import Instagram from "../views/Instagram.vue";
import Product from "../views/Product.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/ig",
    name: "instagram",
    component: Instagram
  },
  {
    path: "/hashtag",
    name: "hashtag",
    component: Hashtag
  },
  {
    path: "/product",
    name: "product",
    component: Product
  },
  {
    path: "/noimages",
    name: "noimages",
    component: () => import(/* webpackChunkName: "terms" */ "../views/NoImages.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import(/* webpackChunkName: "terms" */ "../views/Terms.vue")
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import(/* webpackChunkName: "privacy" */ "../views/Privacy.vue")
  },
  {
    path: "/return",
    name: "return",
    component: () => import(/* webpackChunkName: "return" */ "../views/Return.vue")
  },
  {
    path: "/admin/products",
    name: "productexplorer",
    component: () => import(/* webpackChunkName: "productexplorer" */ "../views/admin/ProductExplorer.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/tweets",
    name: "tweetlauncher",
    component: () => import(/* webpackChunkName: "tweetlauncher" */ "../views/admin/TweetLauncher.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/mockups",
    name: "Mockups",
    component: () => import(/* webpackChunkName: "tweetlauncher" */ "../views/admin/Mockups.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import(/* webpackChunkName: "tweetlauncher" */ "../views/admin/Main.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/orders",
    name: "orders",
    component: () => import(/* webpackChunkName: "orders" */ "../views/admin/Orders.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/components",
    name: "components",
    component: () => import(/* webpackChunkName: "components" */ "../views/Components.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.jwtToken == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
      return;
    }
  }
  next();
});

export default router;
