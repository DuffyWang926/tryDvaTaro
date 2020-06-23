import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'


const namespace = 'global'

const mapStateToProps = (state) => {
  console.log( state, 'global state')
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getNavData: (query) => {
      dispatch({
        type: `${namespace}/getCommandAction`,
        payload: query,
      });
    }
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { 
    this.props.getNavData && this.props.getNavData({})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
