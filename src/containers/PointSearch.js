import { connect } from 'react-redux';
import { addPoint } from '../actions/pointsActions';

import PointSearch from '../components/points/pointSearch/pointSearch';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        addPoint: (newPoint) => {
            dispatch(addPoint(newPoint));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PointSearch);
