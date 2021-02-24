import React from "react";

import LaunchCard from "../LaunchCard";

const Selection = ({ selection }) => {
  return (
    <div>
      {Object.values(selection).map((launch) => (
        <LaunchCard key={launch.id} {...launch} />
      ))}
    </div>
  );
};

export default Selection;
