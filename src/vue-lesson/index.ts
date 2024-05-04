import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentTextOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';
import { IModuleType } from '@/router/types';

const modules = import.meta.glob<IModuleType>('./**/App.vue', { eager: true });

console.log('vue-lesson', modules);

const children: RouteRecordRaw[] = Object.keys(modules).map((key) => {
  const router = {
    path: key,
    name: key.slice(2),
    meta: {
      title: key.slice(2, -8),
    },
    component: () => import(key),
  };
  return router;
}, []);

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/vue3.0',
    name: 'vue3-lesson',
    component: Layout,
    meta: {
      title: 'vue 3.0 教程',
      icon: renderIcon(DocumentTextOutline),
      sort: 1,
    },
    children,
  },
];

export default routes;
