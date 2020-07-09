import request from '@/utils/request';
import { 
          getProductListApiUrl, 
          
        } from '@/url/index'

export async function getProductListApi(payload) {
  return request({
    url:getProductListApiUrl,
    data:payload,
    method:'post'
  });
}



