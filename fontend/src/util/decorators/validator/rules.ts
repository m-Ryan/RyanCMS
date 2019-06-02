import { defineMetadata } from './validate';

// 1.定义常量名
const NAME = Symbol('name');
const EMAIL = Symbol('email');
const PHONE = Symbol('phone');
const PASSWORD = Symbol('password');
const EQUAL = Symbol('equal');
const NOT_EMPTY = Symbol('NOT_EMPTY');

// 2.定义装饰器
export function name(label: string = '用户名') {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(NAME, { index, label }, propertyKey, target);
  };
}
export function email(label: string = '邮箱') {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(EMAIL, { index, label }, propertyKey, target);
  };
}

export function phone(label: string = '手机号码') {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(PHONE, { index, label }, propertyKey, target);
  };
}

export function password(label: string = '密码') {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(PASSWORD, { index, label }, propertyKey, target);
  };
}

/**
 * 检测数组或字符串不为空
 * @param label
 */
export function notEmpty(label: string) {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(NOT_EMPTY, { index, label }, propertyKey, target);
  };
}
/**
 * 检测两个数是否相等，传一个string[]
 * @param label
 */
export function equal(label: string) {
  return function(target: any, propertyKey: string, index: number) {
    defineMetadata(EQUAL, { index, label }, propertyKey, target);
  };
}

// 3.定义检验方法
export const checkName = (val: string) =>
  !!(val && (val.length > 1 && val.length < 9));
export const checkEmail = (val: string) =>
  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
export const checkPhone = (val: string) => /^\d{11}$/.test(val);
export const checkPassword = (val: string) => /^\w{6,36}$/.test(val);
export const checkEqual = (val: string[]) => val[0] === val[1];
export const checkNotEmpty = (val: string | Array<any>) =>
  Array.isArray(val) ? !!val.length : !!val;

// 4.定义规则
export const rules = [
  {
    type: NAME,
    checkValue: checkName,
    message: '必须在2-8位',
  },
  {
    type: EMAIL,
    checkValue: checkEmail,
    message: '格式不对',
  },
  {
    type: PHONE,
    checkValue: checkPhone,
    message: '格式不对',
  },
  {
    type: PASSWORD,
    checkValue: checkPassword,
    message: '格式不对',
  },
  {
    type: EQUAL,
    checkValue: checkEqual,
    message: '不相同',
  },
  {
    type: NOT_EMPTY,
    checkValue: checkNotEmpty,
    message: '不能为空',
  },
];
