import {
  createMenu as createMenuDB,
  getMenuByDate as getMenuDB,
} from '../repositories/menu.repository.js';

export const addMenu = async (menuData) => {
  // 可以加驗證，例如同一天不能重複同菜單
  const existing = await getMenuDB(menuData.date);
  if (existing.find((m) => m.name === menuData.name)) {
    throw new Error('菜單已存在');
  }
  return createMenuDB(menuData);
};

export const getTodayMenu = async () => {
  const today = new Date().toISOString().split('T')[0];
  return getMenuDB(today);
};
