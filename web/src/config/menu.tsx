/**
 * @author lijianfeng
 * @description 菜单配置
 */

import Home from "../views/home";
import Components from "../views/components";
import About from "../views/about";
import ChangeLog from "../views/changelog";

const menus = [
  {
    name: "主页",
    path: "/",
    icon: <span className="material-icons">home</span>,
    component: Home,
  },
  {
    name: "开始使用",
    path: "/start",
    icon: <span className="material-icons">start</span>,
  },
  {
    name: "组件",
    path: "/components",
    icon: <span className="material-icons">components</span>,
    component: Components,
  },
  {
    name: "关于",
    path: "/about",
    icon: <span className="material-icons">about</span>,
    component: About,
  },
  {
    name: "更新日志",
    path: "/changelog",
    icon: <span className="material-icons">changelog</span>,
    component: ChangeLog,
  },
];

export default menus;
