import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'


import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import FormCom from '@/components/formCom'


const namespace = 'global'

const mapStateToProps = (state) => {
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
    
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  onRegistClick(){
    console.log('register')
  }

  

  getVerifyCode(){
    console.log('getVerifyCode')
  }

  onSubmit(){
    console.log('onPropsSubmit')
  }

  render () {
    const tabList = [{ title: '验证码登录' }, { title: '密码登录' }]
    const formComProps = {
      data:[
        {
          comType:'input',
          inputType:'text',
          name:'phoneNum',
          placeholder:'请输入手机号码',
          type:'phone',
          rules:{
            required:true,
            message:'dd'
          },
        },
        {
          comType:'input',
          inputType:'text',
          name:'phoneNum',
          placeholder:'请输入验证码',
          type:'auto',
          endData:{
            endType:'btn',
            endTxt:'获取验证码',
            endColor:'orange',
            method:this.getVerifyCode

          }
        }
      ],
      onPropsSubmit:this.onSubmit,
      leftBtnTxt:'登录',
      

    }
    return (
      <View className='logIn page'>
        <Header />
        <Text className='register' onClick={this.onRegistClick}> 注册</Text>
        <View className='logInCon'>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='logInConPane'  >
                <FormCom {...formComProps}/>
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
