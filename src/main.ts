import { LoginPage } from "./app/pages/login/login.page.ts";
import { MRouter } from "./base/m-router.ts";
import { demoPage } from "./demo/demo-page.ts";
// import { demoPage } from "./demo/demo-page.ts";
// import { demoListItem } from "./demo/listItem.ts";

const app = document.getElementById("app") as HTMLDivElement;

// const demoChildRoutes = [
//   {
//     path: "/demo/item1",
//     component: demoListItem(app),
//   },
//   {
//     path: "/demo/item2",
//     component: demoListItem(app),
//   },
// ];
new MRouter(app, [
  { path: "/login", name: "login", component: () => new LoginPage() },
  // {
  //   path: "/",
  //   name: "home",
  //   component: () => demoListItem(app),
  //   childRoutes: demoChildRoutes,
  // },
  {
    path: "/demo2",
    name: "demo2",
    component: () => demoPage(app),
    // childRoutes: demoChildRoutes,
  },
  // {
  //   path: "/demo/{teste}",
  //   name: "demo",
  //   component: () => demoPage(app),
  //   childRoutes: demoChildRoutes,
  // },
]).route();
