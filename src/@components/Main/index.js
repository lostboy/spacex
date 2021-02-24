import React from "react";

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

const Main = (props) => {
  // Hooks
  const init_load = React.useRef();
  const main_ref = React.useRef();
  const [selection, setSelection] = React.useState({});
  const [show_selection, setShowSelection] = React.useState(false);
  const [loadLaunches, { data }] = useLaunchesData(main_ref);

  React.useEffect(() => {
    if (!init_load.current) {
      init_load.current = true;

      loadLaunches();
    }
  }, [loadLaunches]);

  return (
    <StyledMain as={Container} ref={main_ref} onScroll={(e) => loadLaunches()}>
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
            data={data}
            selection={selection}
            onSelected={(id) => {
              if (selection[id]) setSelection({ ...selection, [id]: null });
              else setSelection({ ...selection, [id]: data.find((item) => item.id === id) });
            }}
          />
        )}
      </main>
    </StyledMain>
  );
};

export default Main;
