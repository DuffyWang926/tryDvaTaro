import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane } from 'taro-ui'

import { connect } from '@tarojs/redux'
import ProductListCom from '@/components/productListCom'


const namespace = 'shopping'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getShopList: (query) => {
      dispatch({
        type: `${namespace}/getShopList`,
        payload: query,
      });
    }
    
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current:0

    }
  }

  componentWillMount () { }

  componentDidMount () { 
    this.props.getShopList && this.props.getShopList()
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const { shopTabTitleList = [], shopProductList = [] } = this.props
    return (
      <View className='shopping'>
        <AtTabs
          current={this.state.current}
          scroll
          height='100%'
          tabDirection='vertical'
          tabList={shopTabTitleList}
          onClick={this.handleClick.bind(this)}>
            { shopProductList.map((v,i) =>{
              return <AtTabsPane tabDirection='vertical' current={this.state.current} key={i+'AtTabsPane' }index={0}>
                        {
                          v.map((val,key) =>{
                            return <ProductListCom {...val} key= {key + 'shopProductList'} />
                          })
                        }
                    </AtTabsPane>
            })}
          
        </AtTabs>
      </View>
    )
  }
}
