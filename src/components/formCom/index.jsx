import Taro, { Component , useState, render} from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import FormItem from '../formItem'
import _ from 'lodash'

const initialState = {
  dataInit:[]
}
export default function FormCom (props){
  const { data = [], message, onPropsSubmit, leftBtnTxt, isReset} = props
  
  let dataInitTemp = _.cloneDeep(data)
  const [dataInit, setDataInit] = useState(dataInitTemp);
  function onSubmit (event) {
    let isSubmit = true
    dataInit.map((v,i) =>{
      if(v.rules){
        if(!v.isValid){
          isSubmit = false
        }
      }
    })
    if(isSubmit){
      onPropsSubmit && onPropsSubmit()

    }else{
      Taro.showToast({
        title:  message || '请按规则填写必填项',
        icon: 'none',
        mask: true,
      });

    }
    

  }
  function onReset (event) {
    
    let temp = []
    dataInit.map((v,i) =>{
      v.formValue = ''
      temp.push(v)
    })

    setDataInit(temp)

  }
  function getItemData (val, key, isValid){
    dataInit[key].formValue = val
    dataInit[key].isValid = isValid
  }
  function handleEndClick ( key){
    const { endData = {} } = data[key]
    const { method } = endData
    method && method()
  }
  


  
  return (
    <View className='taroForm'>
      <AtForm
        onSubmit={ () => onSubmit()}
        onReset={ () => onReset()}
      >
        <View className='itemList'>
          {
            dataInit.map((v,i) =>{
              return <FormItem 
                        { ...v} 
                        key={i + 'formItem'} 
                        index={i} 
                        getItemData={ getItemData } 
                        handleEndClick = { handleEndClick }
                      />
            })
          }
        </View>
        
        <View className='formBtm'>
          <Button
            formType='submit' 
            onClick = { () => onSubmit()}
            className='formBtn globalBtn '
          >{leftBtnTxt}</Button>
          { isReset &&
            <Button 
              formType='reset' 
              onClick = { () => onReset()}
              className='formBtn globalBtn'
            >重置</Button>
          }
          

        </View>
        
      </AtForm>
    </View>
  )
  
}



