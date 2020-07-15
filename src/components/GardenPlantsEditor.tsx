import React, { ReactElement } from "react";
import RGL, { ItemCallback } from "react-grid-layout";
import { Planting, useModifyPlantingMutation } from "../generated/graphql";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface Props {
  width: number;
  height: number;
  plantings: Planting[];
  gardenID: string;
  refetch: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    planting: {
      background: theme.palette.primary.light,
    },
    dragable: {
      background: theme.palette.primary.main,
    },
  })
);

export default function GardenPlantsEditor({
  plantings,
  width,
  height,
  gardenID,
  refetch,
}: Props): ReactElement {
  const classes = useStyles();

  const [modifyPlanting] = useModifyPlantingMutation();

  const onLayoutChange = (layout: RGL.Layout[]) => {
    layout.forEach((item) => {
      plantings.forEach((planting) => {
        if (
          item.i === planting.id &&
          (item.x !== planting.xPosition ||
            item.y !== planting.yPosition ||
            item.w !== planting.width ||
            item.h !== planting.height)
        ) {
          modifyPlanting({
            variables: {
              gardenID,
              plantingID: item.i,
              xPosition: item.x,
              yPosition: item.y,
              width: item.w,
              height: item.h,
            },
          }).then(() => refetch());
        }
      });
    });
  };

  const onDrag: ItemCallback = (
    layout,
    oldLayoutItem,
    layoutItem,
    placeholder
  ) => {
    const maxY = (layoutItem.y + 1 + layoutItem.h) * 10;
    const diff = height - maxY;
    if (maxY > height) {
      layoutItem.y = (height - layoutItem.h * 10) / 10;
      placeholder.y = layoutItem.y;
    }
  };

  const onResize: ItemCallback = (
    layout,
    oldLayoutItem,
    layoutItem,
    placeholder
  ) => {
    const maxY = (layoutItem.y + 1 + layoutItem.h) * 10;
    const diff = height - maxY;
    if (maxY > height) {
      layoutItem.h = (height - layoutItem.y * 10) / 10;
      placeholder.h = layoutItem.h;
    }
  };
  return (
    <RGL
      width={width}
      autoSize={false}
      cols={width}
      rowHeight={1}
      compactType={null}
      onLayoutChange={(l) => onLayoutChange(l)}
      preventCollision
      onResize={onResize}
      onDrag={onDrag}
    >
      {plantings.map((planting) => {
        return (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            border={1}
            borderRadius={4}
            borderColor='secondary.main'
            className={classes.planting}
            key={planting.id}
            data-grid={{
              x: planting.xPosition,
              y: planting.yPosition,
              w: planting.width,
              h: planting.height,
            }}
          >
            <Typography variant='h5' align='center'>
              {planting.icon}
            </Typography>
          </Box>
        );
      })}
    </RGL>
  );
}
