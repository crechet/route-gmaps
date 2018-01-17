import _ from 'lodash';
import { ADD_POINT } from '../constants';

const defaultState = ['a', 'b', 'c'];

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADD_POINT:
            return _.concat(state, action.point);

        default:
            return state;
    }
}
