import { 
    getProductListApi, 
   
} from '@/api/index';
import { confirmData } from '@/utils'
import { PorductListModel } from '@/model'

export default {
    namespace: 'productList',
    state: {
        productList:[]
    },
    effects: {
        *getProductListData({ payload }, { call, put , select}) {
          const res = yield call(getProductListApi, payload)
          let data = res.data || {}
          const { products = [] } = data 
          confirmData(PorductListModel,data)
          let productList = []
          products.map((v,i) =>{
                v.imgSrc = v.masterImg,
                v.title = v.name,
                v.point = v.minPoints,
                v.price = v.minNowPrice,
                v.oldPrice  = v.minOldPrice
                productList.push(v)
            })
          yield put({
                    type:'updateHomeData',
                    payload:{
                        productList,
                    }
                })

            
        },
    },
    reducers: {
        updateHomeData(state, action) {
            

        return { ...state, ...action.payload};
        },
        
    },

};