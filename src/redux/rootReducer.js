import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let data;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      data = state[field] || {};
      data[action.data.id] = action.data.value;
      return {
        ...state,
        [field]: data,
      };

    case CHANGE_TEXT:
      data = state['dataState'] || {};
      data[action.data.id] = action.data.value;
      return {
        ...state,
        currentText: action.data.value,
        dataState: data,
      };

    default:
      return state;
  }
}
