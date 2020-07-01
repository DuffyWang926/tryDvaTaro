import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text, Input, Icon } from '@tarojs/components'
import { AtButton, AtInput  } from 'taro-ui'
import './index.scss'
import { debounce } from '@/utils/confirmData'

let timeoutId  = null
export default function Search (props){
  const { 
          placeholder, 
          isShow, 
          method, 
          historyList = [],
          hotList = [],
          getInputValue,
          getInputEndValue
        } = props
  const [ flag, setFlag ] = useState(false)
  const [ value, setValue ] = useState('')
  const [ historyListFlag, sethistoryListFlag ] = useState(true)
  let that = this
  
  const onInputClick = () =>{
     if(!isShow){
      method && method()
     }
  }

  const onHistoryDelete = () =>{
    sethistoryListFlag(false)
  }
  
  const onInputChange = (val) =>{
    setValue(val)
    timeoutId = debounce(timeoutId,getInputValue,that,500,[val])
  }

  const onBtnClick = (val) =>{
    setValue(val)
    getInputValue && getInputValue(val)
  } 

  const onSearchEndClick = () =>{
    getInputEndValue && getInputEndValue(value)

  }

  
  return (
    <View className='search page'  >
      <View className='searchItem' onClick = {onInputClick}>
        <View className='searchIcon'>
          <Icon 
            size='16' 
            type='search' 
          />
        </View>
        <AtInput 
          placeholder={placeholder}
          search={true}
          onChange = {onInputChange}
          value={value}
        />
        {
          isShow &&
          <View 
            className='searchEnd'
            onClick = {onSearchEndClick}
          >
            搜索
          </View>
        }
        
        
      </View>
      { isShow && 
        <View 
          className='searchList'  
        >
          { historyList.length > 0 && 
            <View>
              { historyListFlag &&
                <View className='history' >
                  <View className='historyTop' >
                    <View>
                      搜索历史
                    </View>
                    <View>
                      <Icon size='16' type='clear'  onClick={onHistoryDelete} />
                    </View>
                  </View>
                  <View className='historyList'>
                    {
                      historyList.map((v,i) =>{
                        return <AtButton 
                                  key = {'history' + i}
                                  onClick={(e) => onBtnClick(v)}
                                >{v}</AtButton>
                      })
                    }
                  </View>
                </View>
              }
              
            </View>
          }
          {
            hotList.length > 0 && 
            <View className='hot'>
              <View className='hotTop'> 
                热门搜索
              </View>
              <View className='hotList'>
                {
                  hotList.map((v,i) =>{
                    return <AtButton 
                              key = {'hot' + i}
                              onClick={(e) => onBtnClick(v.name)}
                            >{v.name}</AtButton>
                  })
                }
              </View>
            </View>
          }
        </View>
      }
      
      
      

    </View>
  )
  
}
