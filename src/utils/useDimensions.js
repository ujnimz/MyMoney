import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const headerHeight = (windowHeight / 100) * 10;
export const summaryHeight = (windowHeight / 100) * 40;
export const modalHeight = (windowHeight / 100) * 50 - 115;
export const pieSize = (windowHeight / 100) * 25;
