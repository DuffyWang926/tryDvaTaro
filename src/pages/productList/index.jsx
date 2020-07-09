import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import Product from '@/components/product'

const namespace = 'productList'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListData: (query) => {
      dispatch({
        type: `${namespace}/getProductListData`,
        payload: query,
      });
    },
    
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class ProductList extends Component {

  componentWillMount () { 
    const { type, id} = this.$router.params
    let query = {
      limit: 10,
      orderBy: "sales",
      otherId: +id,
      page: 1,
      searchKey: "",
      sortType: "desc",
      type:+type
    }
    this.props.getProductListData && this.props.getProductListData(query)
  }

  componentDidMount () { 
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '产品列表'
  }

  render () {
    const { productList } = this.props
    let productListComProps = {
      data:productList,
      columnType:2
    }
    return (
      <View className='productListPage'>
        <Product {...productListComProps} />
      </View>
    )
  }
}
