import request from '@/utils/request';
import { 
          getBannerListUrl,
          getLiveListUrl
          
        } from '@/url/index'

export async function getBannerListApi(payload) {
  return request({
    url:getBannerListUrl,
    data:payload,
    method:'post'
  });
}

export async function getLiveListApi(payload) {
  return request({
    url:getLiveListUrl,
    data:payload,
    method:'post'
  });
}




