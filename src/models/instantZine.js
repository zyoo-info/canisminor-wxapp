import request from '../utils/request';
import DataCash from '../utils/dataCash';

const Cash = new DataCash('instantzine');

export default {
  namespace: 'instantzine',
  state: [],
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      let data;
      const local = Cash.get();
      if (local) {
        data = local;
      } else {
        const raw = yield call(() => request(`https://canisminor.cc/v2/instantzine`));
        data = raw.data;
        Cash.set(data);
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
};