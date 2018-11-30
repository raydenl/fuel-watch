import React from 'react';
import { connect } from 'react-redux';
export function connectWithStore(store, WrappedComponent, mapStateToProps, mapDispatchToProps = null) {
    let ConnectedWrappedComponent = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
    return function (props) {
        return React.createElement(ConnectedWrappedComponent, Object.assign({}, props, { store: store }));
    };
}
//# sourceMappingURL=helpers.js.map