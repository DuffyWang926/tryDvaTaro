import { 
    getBannerListApi, 
   
} from '@/api/index';
import { confirmData } from '@/utils'
import { UserDataModel} from '@/model'

export default {
    namespace: 'home',
    state: {
        
    },
    effects: {
        *getBannerList({ payload }, { call, put , select}) {
          const res = yield call(getBannerListApi, payload)
          
            let message = '请先注册'
            yield put({
                type:'showModalAction',
                payload:{message}
            })
        },
    },
    reducers: {
        getUserDataAction(state, action) {
            const { openId, unionId} = action.payload;
        return { ...state, openId, unionId};
        },
        
    },

};