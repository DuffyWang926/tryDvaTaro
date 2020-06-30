import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane,  } from 'taro-ui'
import './index.scss'
import { isPhone } from '@/utils/validateData'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import FormCom from '@/components/formCom'
import Message from '@/components/message'
import Loading from '@/components/loading'
import { validationTips } from '@/assets/constants/formValidation'


const namespace = 'global'

const mapStateToProps = (state) => {
  let loadingList = state.loading.effects;
  return {
    ...state[namespace],
    loadingList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVerifyCode: (query) => {
      dispatch({
        type: `${namespace}/getVerifyCode`,
        payload: query,
      });
    },
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
    },
    updateGlobalData: (query) => {
      dispatch({
        type: `${namespace}/updateGlobalData`,
        payload: query,
      });
    },
    
    
    
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class LogIn extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      isAuthorize:true

    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount () { 
    Taro.getSetting({
      success: res => {
        let isAuthorize = true;
        if( res.authSetting){
          isAuthorize = res.authSetting['scope.userInfo']
        }
        this.setState({
          isAuthorize
        })
      }
    })
  }

  componentDidMount () { 
    
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  onRegistClick(){
    console.log('register')
    Taro.navigateTo({
      url: `/pages/register/index`,
    })
  }

  

  getVerifyCode = (phone) =>{
    if(isPhone(phone)){
      this.props.getVerifyCode && this.props.getVerifyCode({phone})
    }else{
      Taro.showToast({
        title: '请输入手机号码',
        icon: 'none',
        mask: true,
      });
    }
  }

  onSubmit = (val) =>{
    const { isAuthorize } = this.state
    
    if(isAuthorize){
      this.getUserInfo(val)
      if(val.phone){
        val.memberNum = ''
      }else{
        val.phone = ''
      }
      this.props.updateGlobalData && this.props.updateGlobalData(val)
    }else{
      Taro.showToast({
        title: '请授权',
        icon: 'none',
        mask: true,
      });
    }
  }

  getUserInfo = (val) =>{
    let jsCode = ''
    Taro.login({
      success: res => {
        if (res.code) {
          jsCode = res.code
          this.getUserCode(jsCode, val)
        }else{
          Taro.showToast({
            title: '登录失败!',
            icon: 'none',
            mask: true,
          });
        }
      }
    })
  }

  getUserCode = (jsCode, val) =>{
    let iv = ''
    let encryptedData = ''
    Taro.getUserInfo({
      complete: res => {
        iv = res.iv;
        encryptedData = res.encryptedData
        let query = {
          iv,
          jsCode,
          encryptedData,
          params:val
        }
        // let query = {
        //   iv:'BqEaWOYGPi20IALue7ViAw==',
        //   jsCode:'011oROZZ0UcNvU1mhx001qye001oROZ4',
        //   encryptedData:'cGR8zNn2HsjUgBUe/3OVJ/0JGloyVla8V7Xt5nDuEJILbRflVSs+pn6wWY82vBS7CSivIJWEqjIB1kJXKsvINmb0LA+ncLiaGIxzwUmZ+1iWyodXrsJo+MPc+i4MVIJ7BbXv3rWdhsla2uhEpO20on8/VM1k31100WoFUeRY8Ql1iw5lgDmsYlpYkaRWs1JoKaxvKOle2cr6i9Kl83WKltd/7VZfkfR9KuGFvrg8QGuKxp6L+pQCKXotAqt7L/s1UAXxjkr7lOmnzCpDDFh68dVZdsh5k6Or7nn6NkFm15PcuIclOwbLHVsEXn+oimCoqbzmQCvGmzlWlZUm3PCOb1AxmISJ3qF8tuEDx6N3FVzvP91l4CgLd7fK9RPbIv4R3ZH4Lkxvai1TLtHeUZdQeqLnx7CRGp4ta9ET88InJbfJjwH2FnNHIcDgVFKQIt9qTUQEMEVQmdykEvDbsRCrSnmgIsD0/u85hlbMO8wXvH0X/UK0OMKpwRxRfK5jyN+HuonBXrqpGL6IfGRCkr3P7g=='
        // }
        this.props.getUserData && this.props.getUserData(query)
      }
    })
  }

  handleMessageConfirm = () =>{
    this.props.updateGlobalData && this.props.updateGlobalData()
  }

  render () {
    const { isAuthorize } = this.state
    const { isMessage, message, loadingList } = this.props
    const tabList = [{ title: '验证码登录' }, { title: '密码登录' }]
    const formComProps = {
      key:'formComProps1',
      data:[
        {
          comType:'input',
          comSubType:'text',
          name:'phone',
          placeholder:'请输入手机号码',
          type:'phone',
          rules:{
            required:true,
            message:validationTips.phoneTip
          },
        },
        {
          comType:'input',
          comSubType:'text',
          name:'vcode',
          placeholder:'请输入验证码',
          type:'auto',
          rules:{
            required:true,
            message:validationTips.codeTip
          },
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
    const formComPropsTwo = {
      key:'formComPropsTwo',
      data:[
        {
          comType:'input',
          comSubType:'text',
          name:'memberNum',
          placeholder:'请输入会员卡号',
          type:'phone',
          rules:{
            required:true,
            message:validationTips.phoneTip
          },
        },
        {
          comType:'input',
          comSubType:'password',
          name:'password',
          placeholder:'请输入密码',
          type:'passwword',
          rules:{
            required:true,
            message:validationTips.passwwordTip
          }
        }
      ],
      onPropsSubmit:this.onSubmit,
      leftBtnTxt:'登录',
    }
    const MessageProps ={
      isMessage, 
      message,
      handleConfirm:this.handleMessageConfirm
    }

    let list = []
    list.push(loadingList['global/getUserData'])
    const loadingProps = {
      list
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
            <View className='logInConPane'  >
                <FormCom {...formComPropsTwo} />
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      
        {
          !isAuthorize && 
          <button
            className='authorizeBtn globalBtn' 
            onClick = { this.onAuthorize}
            open-type="getUserInfo"
          >
            用户请授权
          </button>
        }
        <Message { ...MessageProps } />
        <Loading { ...loadingProps} />
        {/* <open-data type="groupName" open-gid="xxxxxx"></open-data>
<open-data type="userAvatarUrl"></open-data>
<open-data type="userGender" lang="zh_CN"></open-data> */}

      </View>
    )
  }
}
