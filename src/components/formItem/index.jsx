import Taro, { Component , useState, useEffect} from '@tarojs/taro'
import {  AtInput} from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { isPhone,} from '@/utils/validateData'
const initialState = {
  comType:'input',
  name:'phoneNum',
  placeholder:'请输入手机号码',
  rules:{
    required:true
  },
  value:'',
}
export default function FormItem (props){
  const [state, setState] = useState(initialState);
  const [isTip, setTip] = useState(false);
  const { 
          comType, 
          name,
          formValue,
          title, 
          placeholder, 
          type, 
          rules = {}, 
          inputType , 
          index, 
          endData = {}, 
          
        } = props
  const { required, message } = rules
  const { endType,  endTxt,  endColor } = endData

  useEffect(() =>{
    setState({
      value:formValue
    })

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
      default:
        break;
    }
    setTip(isTip)
    return isTip
  }

  
   function handleChange (value) {
    setState({
      value
    })
  }

  function handleBlur(value){
    const { getItemData } = props

    if(required){
      let isValid = !validateData(value)
      getItemData && getItemData(value, index, isValid)
    } 
    


  }

  function handleEndClick () {
    const { handleEndClick } = props
    handleEndClick && handleEndClick(index)
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
              type={inputType} 
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
  )
  
}

