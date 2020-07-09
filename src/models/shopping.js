import { 
    getShopListApi, 
   
} from '@/api/index';
import { confirmData } from '@/utils'
import { PorductListModel } from '@/model'

export default {
    namespace: 'shopping',
    state: {
        shopList:[]
    },
    effects: {
        *getShopList({ payload }, { call, put , select}) {
          const res = yield call(getShopListApi, payload)
        //   let data = res.data || {}
        //   const { products = [] } = data 
        //   confirmData(PorductListModel,data)
        //   let productList = []
        //   products.map((v,i) =>{
        //         v.imgSrc = v.masterImg,
        //         v.title = v.name,
        //         v.point = v.minPoints,
        //         v.price = v.minNowPrice,
        //         v.oldPrice  = v.minOldPrice
        //         productList.push(v)
        //     })
        //   yield put({
        //             type:'updateHomeData',
        //             payload:{
        //                 productList,
        //             }
        //         })

            
        },
    },
    reducers: {
        updateHomeData(state, action) {
            

        return { ...state, ...action.payload};
        },
        
    },

};