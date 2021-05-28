import React from 'react';
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
        <Spinner animation="grow" variant="dark" />
        <Spinner className="mx-3" animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
    </>
  );
};

export default Loader;