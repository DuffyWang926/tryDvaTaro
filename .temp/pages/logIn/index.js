import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.scss';

import { connect } from "@tarojs/redux-h5";
import Header from "../../components/header/index";

const namespace = 'global';

const mapStateToProps = state => {
  console.log(state, 'global state');
  return {
    ...state[namespace]

  };
};

const mapDispatchToProps = dispatch => {
  return {

    getUserData: query => {
      dispatch({
        type: `${namespace}/getUserData`,
        payload: query
      });
    },
    getUserDataAction: query => {
      dispatch({
        type: `${namespace}/getUserDataAction`,
        payload: query
      });
    }
  };
};


export default @connect(mapStateToProps, mapDispatchToProps)
class Index extends Taro.Component {

  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.getUserData && this.props.getUserData({ id: '11' });
    // this.props.getUserDataAction && this.props.getUserDataAction({id:'11'})
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '首页'
  };

  render() {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }];
    return <View className="logIn page">
        <Header />
        <Text className="register"> 注册</Text>
        <View className="logInCon">
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">标签页二的内容</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">标签页三的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
        
      </View>;
  }
}