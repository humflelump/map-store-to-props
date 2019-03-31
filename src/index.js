

const bind = (actionCreators, dispatch) => {
    const obj = {};
    for (const key of Object.keys(actionCreators)) {
        obj[key] = (...params) => dispatch(actionCreators[key](...params));
    }
    return obj;
}

const enhance = (connect) => {
    let _state_;
    const getState = () => _state_;
    return (mapStore, mapState, mapDispatch, ...params ) => {
        const newMapState = (state, ownProps) => {
            _state_ = state;
            return mapState ? mapState(state, ownProps) : {};
        }
        const newMapDispatch = (dispatch, ownProps) => {
            let result;
            if (!mapDispatch) {
                result = {};
            } else if (typeof mapDispatch === 'object') {
                result = bind(mapDispatch, dispatch);
            } else {
                result = mapDispatch(dispatch, ownProps);
            }
            return {
                ...result,
                ...mapStore(dispatch, getState, ownProps),
            };
        }
        return connect(mapState, mapDispatch, ...params);
    }
}

export const withStore = enhance;
export default enhance;