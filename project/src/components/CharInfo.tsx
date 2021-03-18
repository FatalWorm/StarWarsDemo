import React, {Fragment, HTMLAttributes, useEffect, useState} from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, Typography, Grid, Box,
} from "@material-ui/core";
import {Char} from "../models/Char";
import CharRepository from "../repository/CharRepository";
import {Loader} from "./Loader";
import {mdiAlertCircleOutline, mdiEarth} from "@mdi/js";
import Icon from "@mdi/react";
import {WorldActionResult} from "../models/ActionResult/WorldActionResult";

const personRepository = new CharRepository();

export interface ICharInfoProps extends HTMLAttributes<HTMLDivElement> {
    char: Char,
    handleClose: () => void;
}

export const CharInfo = (props: ICharInfoProps): JSX.Element => {
    const {char, handleClose} = props;
    const [validMessage, setValidMessage] = useState("");
    const [world, setWorld] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        const actionResult: WorldActionResult = await personRepository
            .getWorld(char.homeWorld);

        if (actionResult.isSuccess) {
            setWorld(actionResult.result);
            setValidMessage("");
        } else {
            setWorld(null);
            setValidMessage(actionResult.error.message);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        isLoading
            ? <Loader/>
            : <Fragment>
                <DialogTitle id="alert-dialog-title">{char.name}</DialogTitle>
                <DialogContent dividers>
                    {
                        !world
                            ? <Grid container justify="center" alignItems="center">
                                <Box>
                                    <Icon path={mdiAlertCircleOutline} color={"red"} size={1}/>
                                </Box>
                                <Box marginLeft={2}>
                                    <Typography>Failed to display data.</Typography>
                                    <Typography>{`Error: ${validMessage}`}</Typography>
                                </Box>
                            </Grid>
                            : <Grid container justify="flex-start">
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Box>
                                            <Icon path={mdiEarth} color={"black"} size={1}/>
                                        </Box>
                                        <Box marginLeft={1}>
                                            <Typography variant="h6">{world.name}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box marginLeft={2}>
                                        <Typography variant="body1">
                                            Population: {world.population}
                                        </Typography>
                                        <Typography variant="body1">
                                            Terrain: {world.terrain}
                                        </Typography>
                                        <Typography variant="body1">
                                            Surface water: {world.surfaceWater}
                                        </Typography>
                                        <Typography variant="body1">
                                            Orbital period: {world.periods.orbital}
                                        </Typography>
                                        <Typography variant="body1">
                                            Rotation period: {world.periods.rotation}
                                        </Typography>
                                        <Typography variant="body1">
                                            Diameter: {world.diameter}
                                        </Typography>
                                        <Typography variant="body1">
                                            Gravity: {world.gravity}
                                        </Typography>
                                        <Typography variant="body1">
                                            Climate: {world.climate}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Fragment>
    );
};
