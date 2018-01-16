import { ADD_POINT } from '../constants';

export const addPoint = (newPoint) => {
    return {
        type: ADD_POINT,
        point: newPoint
    }
};
