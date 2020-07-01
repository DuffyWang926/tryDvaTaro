import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text , Image, Swiper} from '@tarojs/components'

import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import Search from '@/components/search'
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
    this.props.getBannerList && this.props.getBannerList()
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

  onBannerClick = () =>{
    console.log('onBannerClick')
  }


  render () {
    const searchProps = {
      placeholder:'圣诞节礼物',
      isShow:false,
      method:this.onSearchInputClick,
    }
    return (
      <View 
        className='index page'
      >
        <Header />
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
              <SwiperItem onClick={this.onBannerClick}>
                <View className='demo-text-1'>1</View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-2'>2</View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-3'>3</View>
              </SwiperItem>
            </Swiper>
          </View>
        


      </View>
    )
  }
}
