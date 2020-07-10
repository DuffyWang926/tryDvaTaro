import { 
    getUserDataApi, 
    getVerifyCodeData, 
    getLogInData, 
    getMemberLogInData,
    getRegisterData,
    getHotListData
} from '@/api/index';
import { confirmData, cloneDeep } from '@/utils'
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
        nikename:'',
        historyList:[],
        hotList:[],
        cartList:[],
        cartSum:0
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
        *getRegister({ payload }, { call, put }) {
            const res = yield call(getRegisterData, payload)
        },
        *getUserData({ payload }, { call, put , select}) {
          const res = yield call(getUserDataApi, payload)
          const { params } = payload
          const { is_succ } = res
        //   let phone = ''
        //   let memberNum = ''
        //   let vcode = ''
        //   let password = ''
        //   let nikename = ''

        //   yield select( state =>{
        //     phone = state.global && state.global.phone
        //     memberNum = state.memberNum && state.global.memberNum
        //     vcode = state.memberNum && state.global.vcode
        //     password = state.memberNum && state.global.password
        //     nikename = state.nikename && state.global.nikename

        //   })

        const { phone, memberNum, vcode, password, nikename} = params
          

          if(is_succ){
        //   if(true){
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
            if(nikename){
                params.phone = phone
                params.password = password
                params.nikename = nikename
                params.vcode = vcode

                yield put({
                    type:'getRegister',
                    payload:params
                })


            }else if(phone){
                params.phone = phone
                params.vcode = vcode
                yield put({
                    type:'getLogIn',
                    payload:params
                })
            }else if(memberNum){
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
        *getHotList({ payload }, { call, put }) {
            const res = yield call(getHotListData, payload)
            let  hotList = res.data && res.data.hotSearchs
            yield put({
                type:'updateGlobalData',
                payload:{hotList}
            })
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
        },
        addCartsData(state, action) {
            let { cartList = []} = state
            let data = action.payload
            let isAdd = true
            cartList.map((v,i) =>{
                if(v.id == data.id){
                    isAdd = false,
                    v.cartNum++
                }

            })
            if(isAdd){
                data.cartNum = 1
                cartList.push(data)
            }
            let cartSum = cartList.length
            let cartListTemp = cloneDeep(cartList)

            return { ...state, cartList:cartListTemp, cartSum};
        }
    },

};