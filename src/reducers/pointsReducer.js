import _ from 'lodash';
import { ADD_POINT } from '../constants';

export default (state = ['a', 'b', 'c'], action) => {
    switch (action.type) {
        case ADD_POINT:
            return _.concat(state, action.point);

        default:
            return state;
    }
}
