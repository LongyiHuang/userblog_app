import React from 'react';
import { connect } from 'dva';


function IndexPage() {
  return (
    <div>Home page</div>
  );
}



export default connect()(IndexPage);
