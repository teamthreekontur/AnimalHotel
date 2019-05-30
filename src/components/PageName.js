import React, {Component, Fragment} from "react";
import footprint1 from '../images/footprint.png';
import footprint2 from '../images/footprint1.png';

const PageName = props => {
  return (
      <div className='main__page-name'>
          {props.name}
          <img className='page-name__footprint1 footprint' src={footprint1}/>
          <img className='page-name__footprint2 footprint' src={footprint2}/>
      </div>
  );
};

export default PageName;