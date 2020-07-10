import Taro, { Component , useState, render} from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import FormItem from '../formItem'

export default function FormCom (props){
  const { data = [], message, onPropsSubmit, leftBtnTxt, isReset} = props
  
  const [dataInit = [], setDataInit] = useState(data);
  function onSubmit (event) {
    let isSubmit = true
    let propsResult = {}
    
    dataInit.map((v,i) =>{
      if(v.rules){
        if(!v.isValid){
          isSubmit = false
        }
      }
    })
    if(isSubmit){
      dataInit.map((v,i) =>{
        propsResult[v.name] = v.formValue
      })
      onPropsSubmit && onPropsSubmit(propsResult)
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
    const { endData = {}, connectIndex } = data[key]
    const { method } = endData
    let phone = dataInit[connectIndex].formValue
    method && method(phone)
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
                        data = {dataInit}
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



