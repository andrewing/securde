import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import subpaths from './paths';

const SubpageContainer = ({path}) => {
  const subpages = subpaths.map(subpath => (
    <Route
      key={subpath.key}
      path={`${path}${subpath.path}`}
      render={subpath.component}
      {...subpaths}
    />
  ));

  return (
    <>
      <Switch>{subpages}</Switch>
    </>
  );
};

SubpageContainer.propTypes = {
  path: PropTypes.string.isRequired,
};

export default SubpageContainer;
