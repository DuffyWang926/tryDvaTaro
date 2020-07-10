import request from '@/utils/request';
import { 
          getShopListApiUrl, 
          
        } from '@/url/index'

export async function getShopListApi(payload) {
  return request({
    url:getShopListApiUrl,
    data:payload,
    method:'post'
  });
}




