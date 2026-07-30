/*
 * @Author: {zhengzhuang}
 * @Date: 2026-07-30 10:11:05
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2026-07-30 10:20:16
 * @Description:
 */
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
