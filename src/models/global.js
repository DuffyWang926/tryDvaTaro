export default {
    namespace: 'global',
    state: {
        Networking:['a'],
        Servers:[],
        Storage:[]
    },
    effects: {
      *getUserata({ payload }, { call, put }) {
        
      },
    },
    reducers: {
        getCommandAction(state, action) {
        const { Networking, Servers, Storage} = action.payload ;
        return { ...state, Networking, Servers, Storage};
        }
    },

};