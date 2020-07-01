import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'
import Header from '@/components/header'
import Search from '@/components/search'


const namespace = 'global'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    updateGlobalData: (query) => {
      dispatch({
        type: `${namespace}/updateGlobalData`,
        payload: query,
      });
    },
    getHotList: (query) => {
      dispatch({
        type: `${namespace}/getHotList`,
        payload: query,
      });
    }
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends PureComponent {

  constructor () {
    super(...arguments)
    this.state = {
     

    }
  }

  componentWillMount () { 
    this.props.getHotList && this.props.getHotList()
  }

  componentDidMount () {   
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '搜索'
  }


  getInputValue = (val) =>{
    console.log(val,'getInputValue')
  }

  getInputEndValue = (val) =>{
    console.log(val,'getInputEndValue')
    const { historyList } = this.props
    if(!historyList.includes(val)){
      historyList.push(val)
    }
    this.props.updateGlobalData && this.props.updateGlobalData(historyList)
  }
  

  render () {
    const { historyList, hotList } = this.props

    const searchProps = {
      placeholder:'商品关键字或编号',
      isShow:true,
      historyList,
      hotList,
      getInputValue:this.getInputValue,
      getInputEndValue:this.getInputEndValue

    }
    return (
      <View 
        className='search page'
      >
        <Header />
        <Search 
          { ...searchProps}
        />


      </View>
    )
  }
}
