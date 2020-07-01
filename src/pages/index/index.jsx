import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import Search from '@/components/search'


const namespace = 'global'

const mapStateToProps = (state) => {
  // console.log( state, 'global state')
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getUserData: (query) => {
      dispatch({
        type: `${namespace}/getUserData`,
        payload: query,
      });
    },
    getUserDataAction: (query) => {
      dispatch({
        type: `${namespace}/getUserDataAction`,
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

  componentWillMount () { }

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
    debugger
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
        <Search 
          { ...searchProps}
        />


      </View>
    )
  }
}
