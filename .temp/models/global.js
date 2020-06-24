import { logInData } from "../api/index";
import { confirmData } from "../utils/index";
import { logInModel } from "../model/index";

export default {
  namespace: 'global',
  state: {
    Networking: ['a'],
    Servers: [],
    Storage: []
  },
  effects: {
    *getUserData({ payload }, { call, put }) {

      const res = yield call(logInData, payload);
      confirmData(logInModel, res);
    }
  },
  reducers: {
    getUserDataAction(state, action) {
      const { Networking, Servers, Storage } = action.payload;
      return { ...state, Networking, Servers, Storage };
    }
  }

};