import Taro, { Component , useState} from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import './index.scss'
// import { useState, useEffect } from 'react'

const initialState = {
  value:''
}
export default function FormCom (props){
  
  

  const [state, setState] = useState(initialState);
  const [count, setCount] = useState(0);

   function handleChange (value) {
    console.log(value,'handleChange value')
    console.log(state,'handleChange')
    setState({
      value
    })
  }

  function onSubmit (event) {
    console.log(state.value,'onSubmit')
  }
  function onReset (event) {
    setState({
      value:''
    })
    console.log(state,'onReset')

  }

  
  return (
    <View className='taroForm'>
      <Text onClick={() => handleChange(3)}>Reset {state.value}</Text>
      <AtForm
        onSubmit={ () => onSubmit()}
        onReset={ () => onReset()}
      >
        <AtInput 
          name='value' 
          title='文本' 
          type='text' 
          placeholder='单行文本' 
          value={state.value} 
          onChange={(e) => handleChange(e)} 
        />
        <AtButton formType='submit'>提交</AtButton>
        <AtButton formType='reset' onClick = { () => onReset()}>重置</AtButton>
      </AtForm>
    </View>
  )
  
}

