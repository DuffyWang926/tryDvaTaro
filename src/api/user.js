import request from '@/utils/request';
import {logInUrl} from '@/url/index'
import _ from 'lodash';

export async function logInData(payload) {
  let params = payload.params || {}
  return request({
    url:logInUrl,
    params:params,
    method:'get'
  });
 
}
