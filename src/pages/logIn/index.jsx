import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import FormCom from '@/components/formCom'


const namespace = 'global'

const mapStateToProps = (state) => {
  console.log( state, 'global state')
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

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount () { }

  componentDidMount () { 
    this.props.getUserData && this.props.getUserData({id:'11'})
    // this.props.getUserDataAction && this.props.getUserDataAction({id:'11'})
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const tabList = [{ title: '验证码登录' }, { title: '密码登录' }]
    const taroFormProps = {
      data:[
        {
          type:'input',
          name:'phoneNum',
          placeholder:'请输入手机号码'
        }
      ]

    }
    return (
      <View className='logIn page'>
        <Header />
        <Text className='register'> 注册</Text>
        <View className='logInCon'>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='logInConPane'  >
                <FormCom />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
        
      </View>
    )
  }
}
