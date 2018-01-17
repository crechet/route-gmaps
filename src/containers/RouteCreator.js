import { connect } from 'react-redux';

import RouteCreator from '../components/routeCreator/routeCreator';

const mapStateToProps = ({ points }) => {
    return { points };
};

const mapDispatchToProps = null;

// export class RouteCreator for test;
// export { RouteCreator };

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator);
