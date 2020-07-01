import Taro, { Component , useState, useEffect} from '@tarojs/taro'
import {  AtInput} from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { isPhone } from '@/utils/validateData'
import { countTime } from '@/utils/confirmData'
const initialState = {
  comType:'',
  name:'',
  placeholder:'',
  rules:{
    required:false
  },
  value:'',
  time: 59
}
export default function FormItem (props){
  const [state, setState] = useState(initialState);
  const [isTip, setTip] = useState(false);
  const [isEndBtn, setIsEndBtn] = useState(false);
  const { 
          comType, 
          name,
          formValue,
          title, 
          placeholder, 
          type, 
          rules = {}, 
          comSubType , 
          index, 
          endData = {},
          connectIndex,
          data
        } = props
  const { required, message } = rules 
  const { endType,  endTxt,  endColor } = endData

  useEffect(() =>{
    let res = { ...state, value: formValue}
    setState(res)

  },[ formValue])

  let endColorStyle = 'globalBtn endBtn'
  if( endColor === 'orange'){
    endColorStyle += ' btnOrange'
  }
  
  function validateData(){
    const { value } = state
    let isTip = false
    

    switch(type){
      case 'phone':
        isTip = !isPhone(value)
        break;
      case 'password':
        if(!value){
          isTip = true
        }
        break;
      case 'confirmPasswword':
        if(!value){
          isTip = true
        }else{
          if(connectIndex){
            let lastValue = data[connectIndex].formValue
            if(lastValue !== value){
              isTip = true
            }
          }
        }
        break;
      case 'auto':
        if(!value){
          isTip = true
        }
        break;
      default:
        break;
    }
    
    setTip(isTip)
    return isTip
  }

  
   function handleChange (value) {
    setState({
      ...state,
      value
    })
  }

  function handleBlur(value){
    const { getItemData } = props
    let isValid = false

    if(required){
      isValid = !validateData(value)
    }else{
      isValid = true
    }
    getItemData && getItemData(value, index, isValid)
  }

  function  handleEndClick () {
    const { handleEndClick } = props
    handleEndClick && handleEndClick(index)
    if(endType == 'btn'){
      if(connectIndex){
        let lastValue = data[connectIndex].formValue
        if( lastValue ){
          setIsEndBtn(true)
          let cb = () =>{
            setIsEndBtn(false)
            setState({...state,time:59})
          }
            countTime(countNum,cb,1)
        }
      }
    }
  }
  
  let num = state.time
  function countNum(){
    num = num -1
    setState({...state,time:num})
    return num
  }

  
  return (
    <View className='formItem'>
      { required ? 
          <Text className='requiredText'>*</Text>
      : <Text className='requiredText'></Text>
      }
      <View className='inputCon'>
        { comType == 'input' && 
          <View className='inputItem'>
            { title && <Text>{title}</Text>}
            <AtInput 
              name='value' 
              type={comSubType} 
              placeholder={ placeholder }
              value={state.value} 
              onChange={(e) => handleChange(e)}
              onBlur = {(e) => handleBlur(e)}
              border={true}
              className='inputStyle'
            />
          </View >
        }
        {
          isTip ? 
          <View className='tipDiv'>
            { message }
          </View>
          :
          <View className='tipDiv'>
            {' '}
          </View>
        }
        

      </View>
      
      { endType &&
        <View className='end'>
          {
            endType == 'btn' &&
            <View>
              { isEndBtn ? 
                <Button 
                  className={endColorStyle}
                >
                  {state.time}s重新发送
                </Button>
                :
                <Button 
                  className={endColorStyle}
                  onClick={() => handleEndClick()}
                >
                  {endTxt}
                </Button>
              }

            </View>
            
          }
        </View>
      }
     
        
    </View>
  )
  
}

