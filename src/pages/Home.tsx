import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";

interface Props {}

function Color() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='primary.main' color='primary.contrastText' p={2}>
          primary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='secondary.main' color='secondary.contrastText' p={2}>
          secondary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='error.main' color='error.contrastText' p={2}>
          error.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='warning.main' color='warning.contrastText' p={2}>
          warning.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='info.main' color='info.contrastText' p={2}>
          info.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='success.main' color='success.contrastText' p={2}>
          success.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='text.primary' color='background.paper' p={2}>
          text.primary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='text.secondary' color='background.paper' p={2}>
          text.secondary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor='text.disabled' color='background.paper' p={2}>
          text.disabled
        </Box>
      </Grid>
    </Grid>
  );
}

export default function Home(): ReactElement {
  return (
    <Container component='main'>
      <Typography variant='h4'>Super Potager</Typography>
      <p>
        This website is a sample allowing you to plan gardens with plants
        zoning. You must create an account before using it. Data collected is
        not used for any commercial purpose.
      </p>
    </Container>
  );
}
