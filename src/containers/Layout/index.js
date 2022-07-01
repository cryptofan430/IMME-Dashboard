import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import Navbar from './Navbar';

const Layout = () => {

  return (
    <div >
      <Navbar />
    </div>
  );
};

export default Layout;

// export default withRouter(connect((state) => ({
//   sidebar: state.sidebar,
// }))(Layout));
