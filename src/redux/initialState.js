import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableTitle: defaultTitle,
  currentStyles: defaultStyles
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
