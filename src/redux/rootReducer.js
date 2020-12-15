import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let resizeData;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      resizeData = state[field] || {};
      resizeData[action.data.id] = action.data.value;
      return {
        ...state,
        [field]: resizeData,
      };

    default:
      return state;
  }
}
