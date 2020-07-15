import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@material-ui/core";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";

export function CreatorLinks({}) {
  return (
    <Box display='flex' justifyContent='center'>
      <Box>
        <Typography variant='body2' color='textSecondary' align='center'>
          Created by Bertrand MAUPIN
        </Typography>
        <Box maxWidth='xs' display='flex' justifyContent='center'>
          <IconButton
            size='small'
            href='https://github.com/MAUPIN-Bertrand'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Tooltip title='Github profile' aria-label='Github profile'>
              <GitHubIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            size='small'
            href='https://www.linkedin.com/in/bertrand-maupin-0a69343b/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Tooltip title='LinkedIn profile' aria-label='LinkedIn profile'>
              <ListItemIcon>
                <LinkedInIcon />
              </ListItemIcon>
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
