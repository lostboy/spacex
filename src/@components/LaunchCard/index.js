import React from "react";

// MUI
import { StyledCard } from "./styles";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const LaunchCard = ({
  id,
  mission_name,
  launch_date_local,
  rocket: { rocket_name },
  onSelected = () => {},
  selected = false,
  selectable = false,
}) => {
  return (
    <StyledCard as={Card} variant="outlined">
      {selectable && (
        <Checkbox
          checked={selected}
          onChange={(e) => onSelected(id)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      )}

      <Grid className="content" container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={5}>
          <Typography>
            <strong>{mission_name}</strong>
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">
            Launch date: {new Date(launch_date_local).toUTCString()}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2">Rocket name: {rocket_name}</Typography>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default LaunchCard;
