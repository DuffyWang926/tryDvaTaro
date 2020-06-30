import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtModal } from 'taro-ui'


export default function Message (props){
  const { 
          isMessage, 
          title = '提示', 
          cancelText = '取消', 
          confirmText = '确认',
          message = '',
          showCancel = false

        } = props

  function handleCancel(){
    props.handleCancel && props.handleCancel()
  }

  function handleConfirm(){
    props.handleConfirm && props.handleConfirm()
  }
  if( isMessage ){
    Taro.showModal({
      title: title,
      content: message,
      showCancel,
      success: function (res) {
        if (res.confirm) {
          handleConfirm()
        } else if (res.cancel) {
          handleCancel()
        }
      }
    })
  }
  
  
  return (
    <View className='message'>
    </View>
  )
  
}
