import {
  APPLY_STYLES,
  CHANGE_STYLES, CHANGE_TABLE_NAME,
  CHANGE_TEXT, OPENED_DATE,
  TABLE_RESIZE,
} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: value(state, field, action),
      };

    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, 'dataState', action),
      };

    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      };

    case APPLY_STYLES:
      val = {...state['stylesState'] || {}};
      action.data.ids.forEach((id) => {
        val[id] = {...val[id], ...action.data.value};
      });

      return {
        ...state,
        stylesState: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      };

    case CHANGE_TABLE_NAME:
      return {
        ...state,
        tableTitle: action.data
      };

    case OPENED_DATE:
      return {
        ...state,
        openedDate: new Date()
      };

    default:
      return state;
  }
}

function value(state, field, action) {
  const val = {...state[field] || {}};
  val[action.data.id] = action.data.value;
  return val;
}
