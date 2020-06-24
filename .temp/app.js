import Taro, { Component } from "@tarojs/taro-h5";

import './app.scss';

/* 因为dva配置 */
import { Provider } from "@tarojs/redux-h5";
import dva from './utils/dva';
import models from './models/index';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


import Nerv from 'nervjs';
import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

class App extends Component {
  state = {
    __tabs: {
      list: [{
        pagePath: "/pages/index/index",
        text: '首页'
        // iconPath: './images/tab/home.png',
        // selectedIconPath: './images/tab/home-active.png',
      }, {
        pagePath: "/pages/shopping/index",
        text: '分类'
        // iconPath: './images/tab/cart.png',
        // selectedIconPath: './images/tab/cart-active.png',
      }, {
        pagePath: "/pages/trolley/index",
        text: '购物车'
        // iconPath: './images/tab/user.png',
        // selectedIconPath: './images/tab/user-active.png',
      }, {
        pagePath: "/pages/user/index",
        text: '我的'
        // iconPath: './images/tab/user.png',
        // selectedIconPath: './images/tab/user-active.png',
      }],
      mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };


  config = {
    pages: ["/pages/index/index", "/pages/shopping/index", "/pages/trolley/index", "/pages/user/index", "/pages/logIn/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: { list: [{ pagePath: "/pages/index/index", text: '首页' }, { pagePath: "/pages/shopping/index", text: '分类' }, { pagePath: "/pages/trolley/index", text: '购物车' }, { pagePath: "/pages/user/index", text: '我的' }], mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };

  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
          
        <TabbarContainer>
          
        <TabbarPanel>
          
                <Router mode={"hash"} history={_taroHistory} routes={[{
            path: '/pages/index/index',
            componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
            isIndex: true
          }, {
            path: '/pages/shopping/index',
            componentLoader: () => import( /* webpackChunkName: "shopping_index" */'./pages/shopping/index'),
            isIndex: false
          }, {
            path: '/pages/trolley/index',
            componentLoader: () => import( /* webpackChunkName: "trolley_index" */'./pages/trolley/index'),
            isIndex: false
          }, {
            path: '/pages/user/index',
            componentLoader: () => import( /* webpackChunkName: "user_index" */'./pages/user/index'),
            isIndex: false
          }, {
            path: '/pages/logIn/index',
            componentLoader: () => import( /* webpackChunkName: "logIn_index" */'./pages/logIn/index'),
            isIndex: false
          }]} tabBar={this.state.__tabs} customRoutes={{}} />
                
        </TabbarPanel>
        <Tabbar conf={this.state.__tabs} homePage="pages/index/index" />
        </TabbarContainer>
        </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}

Nerv.render(<App />, document.getElementById('app'));