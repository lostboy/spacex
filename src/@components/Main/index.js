import React, { useCallback, useState, useRef, useEffect } from "react";

// MUI
import { StyledMain } from "./styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// Data
import useLaunchesData from "./@data/useLaunchesData";

// Components
import Chooser from "../Chooser";
import Selection from "../Selection";

const Main = () => {
  // Hooks
  const mainRef = useRef();
  const [selection, setSelection] = useState({});
  const [show_selection, setShowSelection] = useState(false);
  const [launches, { loadMore }] = useLaunchesData();

  const handleScroll = useCallback(() => {
    if (mainRef.current.scrollHeight - mainRef.current.scrollTop === window.innerHeight) {
      loadMore();
    }
  }, [mainRef, loadMore]);

  return (
    <StyledMain as={Container} ref={mainRef} onScroll={handleScroll}>
      <header>
        <Typography variant="h2">SpaceX Launches</Typography>

        <FormControlLabel
          control={
            <Switch
              checked={show_selection}
              onChange={(e) => setShowSelection(!show_selection)}
              name="view_toggle"
              inputProps={{ "aria-label": "Show Selection" }}
            />
          }
          label="Show slection"
        />
      </header>
      <main>
        {show_selection ? (
          <Selection selection={selection} />
        ) : (
          <Chooser
            data={launches}
            selection={selection}
            onSelected={(id) => {
              if (selection[id]) setSelection({ ...selection, [id]: null });
              else setSelection({ ...selection, [id]: launches.find((item) => item.id === id) });
            }}
          />
        )}
      </main>
    </StyledMain>
  );
};

export default Main;
