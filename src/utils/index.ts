import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export const rem2px = (rem: number) => {
  const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 20;
  return Math.round(rem * fontSize);
};

export const resetRootFont = () => {
  const docWidth = document.body.clientWidth;
  const font = (20 * docWidth) / 750;
  document.documentElement.style.fontSize = `${font}px`;
};

export const randomStr = (length: number) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length - 1; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

function createTransform(transformKey: (val: string) => string) {
  function transformObject(value: any, depth = -1): any {
    if (depth === 0 || value == null || typeof value !== 'object' || value instanceof FormData) {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(item => transformObject(item, depth - 1));
    }

    const objectRes = {} as { [key: string]: any };
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in value) {
      objectRes[transformKey(key)] = transformObject(value[key], depth - 1);
    }
    return objectRes;
  }
  return transformObject;
}

export const deepCamel = createTransform(camelCase);

export const deepSnake = createTransform(snakeCase);

export const mergeCssModuleList = (classNameList: any[]) => classNameList.filter(v => !!v).join(' ');
