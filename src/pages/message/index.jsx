import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text , Image} from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import Header from '@/components/header'

const namespace = 'global'

const mapStateToProps = (state) => {
  return {
    ...state[namespace],
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};
@connect(mapStateToProps, mapDispatchToProps)

export default class Index extends PureComponent {

  constructor () {
    super(...arguments)
    this.state = {

    }
  }

  componentWillMount () { }

  componentDidMount () {   
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '消息'
  }

  render () {
    
    return (
      <View 
        className='message page'
      >
        <Header />
        <View 
          className='indexTop'
        >
          暂无内容
        </View>
        


      </View>
    )
  }
}
