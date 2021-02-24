import React from "react";

import LaunchCard from "../LaunchCard";

const Chooser = ({ data, selection, onSelected }) => {
  return (
    <div>
      {data.map((launch) => (
        <LaunchCard
          selectable
          key={launch.id}
          selected={Boolean(selection[launch.id])}
          onSelected={onSelected}
          {...launch}
        />
      ))}
    </div>
  );
};

export default Chooser;
