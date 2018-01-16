import { connect } from 'react-redux';

import RouteCreator from '../components/routeCreator/routeCreator';

const mapStateToProps = ({ points }) => {
    return { points };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator);
