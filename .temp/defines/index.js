import { Record } from 'immutable';

// /**
//  * api配置信息
//  */
// export class ApiCfg {
//   path: ''; // api路径
//   method: string = 'post'; // 请求方式
//   types: any; // 响应的数据模型
//   subtype?: any; // 响应的数据子模型
//   auth?: boolean = true; // 是否需要授权
//   headers?: any = {}; // 额外请求头
// }

/**
 * 接口响应，最外层统一格式
 */

const IResponseDataDefault = {
  code: 0,
  msg: '操作成功',
  data: null
};

export class ResponseData extends Record(IResponseDataDefault) {}