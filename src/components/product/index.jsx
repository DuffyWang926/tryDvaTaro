import Taro, { Component , useState, useEffect} from '@tarojs/taro'
import {  AtInput} from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default function Product (props){
  const { data = [], columnType, url} = props

  let widthStyle = ''
  if(columnType === 3){
    widthStyle = '30%'
  }else if(columnType === 2){
    widthStyle = '48%'
  }

  const onProdcutClick=(v) =>{
    Taro.navigateTo({
      url:`${url}?type=${v.indexType}&&id=${v.id}`
    })
  }
  
  return (
    <View className='productList'>
      {
        data.map((v,i) =>{
          return <View 
                    className='product' 
                    style={{width:widthStyle}} 
                    key={i + 'product'}
                    onclick={e => onProdcutClick(v)}
                  >
                  <View className='productView'>
                    <Image className='productImg' src={v.imgSrc} />
                  </View>
                  <View className='productCon'>
                    <View className='title'>
                      {v.title}
                    </View>
                    <View className='detailCon'>
                      <View className='detailType'>
                        { v.isSelf == 1 &&
                          <Text className='own'>自营</Text> 
                        }
                        { v.isCoupon == 1 &&
                          <Text className='discount'>可领券</Text> 
                        }
                      </View>
                      <View className='point'>
                        积分{ v.point }
                      </View>
                    </View>
                    <View className='priceCon'>
                      <Text className='price'>
                        {v.price}
                      </Text>
                      <Text className='oldPrice'>
                        {v.oldPrice}
                      </Text>
                      <View className='addWrapper'>
                        <Text className='add'>
                          +
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
        })
      }
    </View>
    
  )
  
}

