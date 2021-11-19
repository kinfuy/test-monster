import { SeniorSetting } from './../source/type//storeType';
export const elementConfig: SeniorSetting = {
  user: {
    ruleType: 'placeholder',
    placeholderValue: '用户,账户,登陆名,账号',
    elementValue: undefined,
  },
  password: {
    ruleType: 'placeholder',
    placeholderValue: '密码',
    elementValue: undefined,
  },
  loginBtn: {
    ruleType: 'element',
    placeholderValue: undefined,
    elementValue: '.login-btn',
  },
  validate: {
    ruleType: 'placeholder',
    placeholderValue: '验证码',
    elementValue: undefined,
  },
};
