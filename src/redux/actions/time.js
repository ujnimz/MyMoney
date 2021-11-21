import {GET_CURRENT_TIME, GET_NEXT_TIME, GET_PREVIOUS_TIME} from './types';

import {
  getThisYear,
  getThisMonthIndex,
  getNextMonthYear,
  getPrevMonthYear,
} from '_utils/useDateTime';

// GET_CURRENT_TIME
export const getCurrentTime = () => {
  const curYear = getThisYear();
  const curMonthIndex = getThisMonthIndex();
  return {
    type: GET_CURRENT_TIME,
    payload: {curYear, curMonthIndex},
  };
};

// GET_NEXT_TIME
export const getNextTime = (monthIndex, year) => {
  const next = getNextMonthYear(monthIndex, year);
  const curYear = next.year;
  const curMonthIndex = next.monthIndex;
  return {
    type: GET_NEXT_TIME,
    payload: {curYear, curMonthIndex},
  };
};

// GET_PREVIOUS_TIME
export const getPreviousTime = (monthIndex, year) => {
  const prev = getPrevMonthYear(monthIndex, year);
  const curYear = prev.year;
  const curMonthIndex = prev.monthIndex;
  return {
    type: GET_PREVIOUS_TIME,
    payload: {curYear, curMonthIndex},
  };
};
