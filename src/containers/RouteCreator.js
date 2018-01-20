import { connect } from 'react-redux';

import RouteCreator from '../components/routeCreator/routeCreator';

// const mapStateToProps = null;
const mapStateToProps = ({ points }) => {
    return { points };
};

const mapDispatchToProps = null;

// export class RouteCreator for test;
// export { RouteCreator };

//export default RouteCreator;
export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator);
