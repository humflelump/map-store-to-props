A simple package for enhancing [react-redux](https://github.com/reduxjs/react-redux) which allows you to access the redux store.

# Installation
```
npm install --save map-store-to-props
```

# What it does
It allows you to access state when dispatching actions without passing any unneccessary props into the component (and triggering over-rendering).


# Usage
```
import withStore from 'map-store-to-props';
import { connect } from 'react-redux';

const TextField = ({setText, text}) => {
  return <input
    onChange={e => setText(e.target.value)}
    value={text}
  />
}

const mapStateToProps = state => ({
  text: state.Module.text,
});

const mapDispatchToProps = dispatch => ({

});

const mapStoreToProps = (dispatch, getState) => ({
  setText: (str) => {
    const toUpper = getState().Settings.makeUpperCase;
    dispatch({
      type: 'set_TEXT',
      text: toUpper ? str.toUpperCase() : str
    });
  },
});

export default withStore(connect)(
  mapStoreToProps, mapStateToProps, mapDispatchToProps
)(TextField);
```

