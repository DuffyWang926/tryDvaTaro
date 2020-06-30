import './index.scss'
import Taro from '@tarojs/taro'

export default function Loading (props){
  
  const { list = [] } = props
  let flag = false

  list.map(( v,i) =>{
    if(v){
      flag = true
    }
  })
  if(flag){
    Taro.showLoading({
      title: '加载中',
    })
  }else{
    Taro.hideLoading()
  }
  
  
  return (
    <View className='loading'>
    </View>
  )
  
}
