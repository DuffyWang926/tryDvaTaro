import { 
    getUserDataApi, 
    getVerifyCodeData, 
    getLogInData, 
    getMemberLogInData
} from '@/api/index';
import { confirmData } from '@/utils'
import { UserDataModel} from '@/model'

export default {
    namespace: 'global',
    state: {
        openId:'',
        unionId:'',
        isMessage:false,
        message:'',
        phone:'',
        vcode:'',
        memberNum:'',
        password:'',
    },
    effects: {
        
        *getVerifyCode({ payload }, { call, put }) {
            const res = yield call(getVerifyCodeData, payload)
        },
        *getLogIn({ payload }, { call, put }) {
            const res = yield call(getLogInData, payload)
        },
        *getMemberLogIn({ payload }, { call, put }) {
            const res = yield call(getMemberLogInData, payload)
        },
        *getUserData({ payload }, { call, put , select}) {
          const res = yield call(getUserDataApi, payload)
          const { is_succ } = res
          let phone = ''
          let memberNum = ''
          let vcode = ''
          let password = ''

          yield select( state =>{
            phone = state.global && state.global.phone
            memberNum = state.memberNum && state.global.memberNum
            vcode = state.memberNum && state.global.vcode
            password = state.memberNum && state.global.password
          })

          if(is_succ){
            confirmData(UserDataModel,res)
            const { openId, unionId }  = res
            yield put({
                type:'getUserDataAction',
                payload:res
            })
            let params = {
                openId, 
                unionId
            }
            if(phone){
                params.phone = phone
                params.vcode = vcode
                yield put({
                    type:'getLogIn',
                    payload:params
                })
            }else{
                params.memberNum = memberNum
                params.password = password
                yield put({
                    type:'getMemberLogIn',
                    payload:params
                })
            }

          }else{
            let message = '请先注册'
            yield put({
                type:'showModalAction',
                payload:{message}
            })
          }
        },
    },
    reducers: {
        getUserDataAction(state, action) {
            const { openId, unionId} = action.payload;
        return { ...state, openId, unionId};
        },
        showModalAction(state, action) {
            const { message } = action.payload
        return { ...state, isMessage:true, message};
        },
        updateGlobalData(state, action) {
            return { ...state, ...action.payload};
        }
    },

};