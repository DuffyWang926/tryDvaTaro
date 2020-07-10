import Taro, { Component , useState, useEffect} from '@tarojs/taro'
import {  AtInput} from 'taro-ui'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'
import Product from '@/components/product'
import Living from '@/assets/images/svg/living.svg'
import Ready from '@/assets/images/svg/ready.svg'
import End from '@/assets/images/svg/end.svg'

const initialState = {
 
}
export default function ProductListCom (props){
  const [state, setState] = useState(initialState);
  const { name, otherId, products = [], isLive, showType, method} = props
  let columnType = 3
  if(otherId !== 3){
    columnType = 2
  }

  const productProps = {
    data:products,
    columnType,
    showType,
    method
  }
  let roomSrc = ''
  let roomTitle = ''
  if( isLive ){
    Array.isArray(products) && products.map((v,i) =>{
      if(v.status == 101){
        v.roomSrc = Living
        v.roomTitle='直播中'
      }else if(v.status == 102){
        v.roomTitle='即将开播'
        v.roomSrc = Ready
      }else if(v.status == 103){
        v.roomTitle='已结束'
        v.roomSrc = End
      }else if(v.status == 107){
        v.roomTitle='已过期'
      }


    })

  }
  

  const onLiveClick = (v) =>{
    let roomId = v.id
    let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 }))
    // wx.navigateTo({
    //     url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
    // })
  }
  let listTopStyle = ''
  let isMore = true
  
  if(showType == 1){
    
    listTopStyle = {
      background:'#fff',
      borderBottom:'1px solid #333'
    }
    isMore = false
  }



  return (
    <View className='productListCom'>
      <View className='listTop' style={listTopStyle}>
        <Text className='title'>{ name }</Text>
        {
          isMore && <Text className='more'>更多 {'>'}</Text>
        }
        
      </View>

      { isLive ?
        <View className='listLive'>
          { Array.isArray(products) && products.map((v,i) =>{
            return <View className='liveRoom' key={i + 'liveRoom'} onClick={e => onLiveClick(e)}>
                      <View className='roomType'>
                        <Image className='typeImg' src={v.roomSrc}/>
                        <Text className='typeTitle'>{v.roomTitle}</Text>
                      </View>
                      <View className='roomCon'>
                        <Image src={v.picUrl} />
                      </View>
                    </View>
          })}
        </View>
      :
      <Product {...productProps}  />

      }
      
      
       
    </View>
  )
  
}

