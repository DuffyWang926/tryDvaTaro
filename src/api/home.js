import request from '@/utils/request';
import { 
          getBannerListUrl, 
          
        } from '@/url/index'

export async function getBannerListApi(payload) {
  return request({
    url:getBannerListUrl,
    data:payload,
    method:'post'
  });
}



