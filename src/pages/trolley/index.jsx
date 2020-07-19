import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'
import Product from '@/components/product'


const namespace = 'global'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getUserDataAction: (query) => {
      dispatch({
        type: `${namespace}/getUserDataAction`,
        payload: query,
      });
    }
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { 
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const { cartList = [] } = this.props
    
    return (
      <View className='trolley'>
          {/* {
          cartList.map((v,i) =>{
            return <View className='trolleyItem'>
                    <Product data={cartList} showType={2} />
                  </View>
          })
        } */}
        <View className='trolleyItem'>
          <Product data={cartList} showType={2} />
        </View>
      </View>
    )
  }
}
