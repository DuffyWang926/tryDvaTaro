import request from '@/utils/request';
import { 
          getUserUrl, 
          verifyCodeUrl, 
          logInDataUrl,
          getMemberLogInUrl,
          getRegisterUrl,
          getHotListUrl
        } from '@/url/index'

export async function getUserDataApi(payload) {
  return request({
    url:getUserUrl,
    data:payload,
    method:'post'
  });
}

export async function getVerifyCodeData(payload) {
  return request({
    url:verifyCodeUrl,
    data:payload,
    method:'post'
  });
}

export async function getLogInData(payload) {
  return request({
    url:logInDataUrl,
    data:payload,
    method:'post'
  });
}

export async function getMemberLogInData(payload) {
  return request({
    url:getMemberLogInUrl,
    data:payload,
    method:'post'
  });
}

export async function getRegisterData(payload) {
  return request({
    url:getRegisterUrl,
    data:payload,
    method:'post'
  });
}

export async function getHotListData(payload) {
  return request({
    url:getHotListUrl,
    data:payload,
    method:'post'
  });
}


