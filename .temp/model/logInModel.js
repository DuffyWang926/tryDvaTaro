/**
 * 接口响应，最外层统一格式
 */
export const logInModel = [{
  name: 'id',
  type: 'String'
}, {
  name: 'data',
  type: 'Object',
  childen: [{
    name: 'data',
    type: 'Object'

  }]
}, {
  name: 'data',
  type: 'Object'
}];