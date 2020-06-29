import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'


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

  componentWillMount () { }

  componentDidMount () { 
    // this.props.getUserData && this.props.getUserData({id:'11'})
    
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
