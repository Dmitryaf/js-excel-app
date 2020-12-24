import {
  APPLY_STYLES,
  CHANGE_STYLES, CHANGE_TABLE_NAME,
  CHANGE_TEXT, OPENED_DATE,
  TABLE_RESIZE,
} from '@/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  };
}

export function applyStyles(data) {
  return {
    type: APPLY_STYLES,
    data
  };
}

export function changeTableTitle(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data
  };
}

export function getOpenedDate(data) {
  return {
    type: OPENED_DATE
  };
}
