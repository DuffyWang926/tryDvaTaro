import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text , Image, Swiper} from '@tarojs/components'

import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import Search from '@/components/search'
import ProductListCom from '@/components/productListCom'
import msgSvg from '@/assets/images/svg/msg.svg'

const namespace = 'home'
const namespaceGlobal = 'global'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    ...state[namespaceGlobal],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getBannerList: (query) => {
      dispatch({
        type: `${namespace}/getBannerList`,
        payload: query,
      });
    },
    getLiveList: (query) => {
      dispatch({
        type: `${namespace}/getLiveList`,
        payload: query,
      });
    },
    addCartsData: (query) => {
      dispatch({
        type: `${namespaceGlobal}/addCartsData`,
        payload: query,
      });
    },
    updateGlobalData: (query) => {
      dispatch({
        type: `${namespaceGlobal}/updateGlobalData`,
        payload: query,
      });
    },
    
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends PureComponent {

  constructor () {
    super(...arguments)
    this.state = {

    }
  }

  componentWillMount () {
    this.props.getBannerList && this.props.getBannerList({})
    this.props.getLiveList && this.props.getLiveList()
    try {
      const res = Taro.getSystemInfoSync()
      let query = {
        windowWidth:res.windowWidth,
        windowHeight:res.windowHeight,
        navHeight:res.statusBarHeight,
        navTop:res.safeArea && res.safeArea.top
      }
      this.props.updateGlobalData && this.props.updateGlobalData(query)

    } catch (e) {
      // Do something when catch error
    }
    
    let test = () =>{

    }
    // test()
   }

  componentDidMount () {   
  }

  shouldComponentUpdate(nextProps, nextState){
    const { cartSum } = this.props
    const nextSum = nextProps.cartSum
    if(nextSum !== cartSum){
      Taro.setTabBarBadge({
        index: 2,
        text: '' + nextSum 
      })
    }
    

  }

  componentWillUnmount () { }

  componentDidShow () { 
    

  }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  onSearchInputClick = () =>{
    Taro.navigateTo({
      url:'/pages/search/index'
    })
  }

  onMsgClick  = () =>{
    Taro.navigateTo({
      url:'/pages/message/index'
    })
  }

  onBannerClick = (v) =>{
    Taro.navigateTo({
      url:`/pages/productList/index?type=${v.indexType}&&id=${v.id}`
    })
  }

  onActivityClick = (v) =>{
    Taro.navigateTo({
      url:`/pages/productList/index?type=${v.indexType}&&id=${v.id}`
    })
  }

  changeCart =(val) =>{
    this.props.addCartsData && this.props.addCartsData(val)
  }

  


  render () {
    const { 
            bannerList = [], 
            activityList = [], 
            typeList = [], 
            liveList = [] , 
            cartSum,
            windowWidth,
            windowHeight,
          } = this.props
    const searchProps = {
      placeholder:'圣诞节礼物',
      isShow:false,
      method:this.onSearchInputClick,
    }
    let homeLiveList = []
    if( liveList.length > 2){
      homeLiveList.push(liveList[0])
      homeLiveList.push(liveList[1])
      homeLiveList.push(liveList[2])
    }
    const liveListProps = {
      name:'荐康客直播间',
      url:'',
      products:homeLiveList,
      isLive:true

    }
    let cartSumLeft = windowWidth/2 + windowWidth/4 -40+ 'px'
    let cartSumTop = windowHeight-9 + 'px'

    let cartSumStyle ={
      left:cartSumLeft,
      top:cartSumTop
    }
    return (
      <View 
        className='index page'
      >
        <Header />
         <View className='backgound'></View>
        <View 
          className='indexTop'
        >
          <View
            className='indexSearch'
          >
            <Search 
              { ...searchProps}
            />
          </View>
          <View
            className='indexMsg'
            onClick = { this.onMsgClick }
          >
            <Image
              src = {msgSvg}
            />
          </View>
        </View>
        <View className='banner'>
            <Swiper
              className='test-h'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay
            >
              {
                bannerList.map((v,i) =>{
                 return <SwiperItem 
                            className='swiperItem' key={i + 'banner'} 
                            onClick={ e => this.onBannerClick(v)}
                        >
                              <Image src={v.img} />
                            </SwiperItem>
                  
                })
              }
            </Swiper>
          </View>
        <View className='activity'>
          {
            activityList.map((v,i) =>{
              return <Image 
                        src = {v.img}
                        onClick = { e => this.onActivityClick(v)}
                        key = {i + 'image'}
                      /> 
            })
          }
        </View>
        {/* <ProductListCom {...liveListProps} key= 'liveListProps' /> */}
        {
          typeList.map((v,i) =>{
            return <ProductListCom {...v} key={i + 'productListCom'} method={this.changeCart}/>
          })
        }

      </View>
    )
  }
}
