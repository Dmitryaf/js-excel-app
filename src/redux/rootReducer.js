import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let colsData;
  switch (action.type) {
    case TABLE_RESIZE:
      colsData = state.colState || {};
      colsData[action.data.id] = action.data.value;
      return {
        ...state,
        colState: colsData,
      };

    default:
      return state;
  }
}
