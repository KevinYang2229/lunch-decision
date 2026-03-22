import * as userRepository from '../repositories/user.repository.js';

/**
 * 取得使用者 ID
 * @param {string} name 使用者姓名
 * @returns {Promise<number>} 使用者 ID
 * @throws {Error} 如果找不到使用者
 */
export const getUserIdByName = async (name) => {
  if (!name) throw new Error('Username is required');

  const user = await userRepository.findUserByName(name);
  if (!user) {
    throw new Error(`找不到名為 "${name}" 的使用者`);
  }

  return user.id;
};
