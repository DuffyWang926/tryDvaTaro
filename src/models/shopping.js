import { 
    getShopListApi, 
   
} from '@/api/index';
import { confirmData } from '@/utils'
import { ShoppingListModel } from '@/model'

export default {
    namespace: 'shopping',
    state: {
        shopTabList:[],
        shopTabTitleList:[],
        shopProductList:[]
    },
    effects: {
        *getShopList({ payload }, { call, put , select}) {
            const res = yield call(getShopListApi, payload)
            let data = res.data || {}
            const { levelACategoriesList = [], levelBCategoriesList = [] } = data 
            confirmData(ShoppingListModel,data)
            let shopTabList = []
            let shopTabTitleList = []
            let shopProductList = []
            Array.isArray(levelACategoriesList) && levelACategoriesList.map((v,i) =>{
                shopTabTitleList.push({title:v.name})
                shopTabList.push({
                    id:v.id,
                    name:v.name
                })
                let children= []
                Array.isArray(levelBCategoriesList) && levelBCategoriesList.map((val,key) =>{
                    if(val.subId === v.id){
                        let products = []
                        Array.isArray(val.productList) && val.productList.map((str,num) =>{
                            products.push({
                                imgSrc: str.masterImg,
                                title: str.name,
                                point: str.minPoints,
                                price: str.minNowPrice,
                                oldPrice: str.minOldPrice,
                                id:str.id
                            })
                        })
                        if(products.length > 0){
                            children.push(
                                {
                                    id:val.id,
                                    name:val.name,
                                    url:'',
                                    products,
                                    showType:1
                                }
                            )
                        }
                        
                    }
                })
                shopProductList.push( children )
            })
            
        
            
        
            yield put({
                        type:'updateHomeData',
                        payload:{
                            shopTabList,
                            shopTabTitleList,
                            shopProductList
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