import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text , Image, Swiper} from '@tarojs/components'

import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import Search from '@/components/search'
import ProductListCom from '@/components/productListCom'
import msgSvg from '@/assets/images/svg/msg.svg'

const namespace = 'home'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
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
    }
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
    let test = () =>{

    }
    // test()
   }

  componentDidMount () {   
  }

  componentWillUnmount () { }

  componentDidShow () { }

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

  


  render () {
    const { bannerList = [], activityList = [], typeList = [], liveList = [] } = this.props
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
    console.log(this.state,'state')
    const liveListProps = {
      name:'荐康客直播间',
      url:'',
      products:homeLiveList,
      isLive:true

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
            return <ProductListCom {...v} key={i + 'productListCom'} />
          })
        }

      </View>
    )
  }
}
