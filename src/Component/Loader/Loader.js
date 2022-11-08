import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader(props) {
  return (
    <div>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#ec4608"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
