import { 
    getBannerListApi,
    getLiveListApi
   
} from '@/api/index';
import { confirmData } from '@/utils'
import { HomeDataModel, HomeLiveModel } from '@/model'

export default {
    namespace: 'home',
    state: {
        bannerList:[],
        activityList:[],
        typeList:[],
        liveList:[]
        
    },
    effects: {
        *getBannerList({ payload }, { call, put , select}) {
          const res = yield call(getBannerListApi, payload)
          let data = res.data || {}
          const { activitys = [], carouses = [], floors = [] } = data 

          let floorssEnd = []
          floors.map((val,key) =>{
              Array.isArray(val.products) && val.products.map((v,i) =>{
                v.imgSrc = v.masterImg,
                v.title = v.name,
                v.point = v.minPoints,
                v.price = v.minNowPrice,
                v.oldPrice  = v.minOldPrice
              })
              floorssEnd.push(val)
          })
          confirmData(HomeDataModel,data)
          yield put({
                    type:'updateHomeData',
                    payload:{
                        bannerList:carouses,
                        activityList:activitys,
                        typeList:floorssEnd
                    }
                })
        },
        *getLiveList({ payload }, { call, put , select}) {
            const res = yield call(getLiveListApi, payload)
            let data = res.data || []
            confirmData(HomeLiveModel,res)
            yield put({
                type:'updateHomeData',
                payload:{
                    liveList:data
                }
            })
        }
        
    },
    reducers: {
        updateHomeData(state, action) {
            return { ...state, ...action.payload};
        },
        
    },

};