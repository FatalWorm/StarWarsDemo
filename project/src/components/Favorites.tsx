import React, {useEffect, useState} from "react";
import {useAppContext} from "../models/Contexts/AppContext";
import CharRepository from "../repository/CharRepository";
import {Grid, Box, Typography} from "@material-ui/core";
import {Char} from "../models/Char";
import {Loader} from "./Loader";
import {CharCard} from "./CharCard";
import {FavoritesActionResult} from "../models/ActionResult/FavoritesActionResult";
import Icon from "@mdi/react";
import {mdiAlertCircleOutline} from "@mdi/js";

const personRepository = new CharRepository();

export const Favorites = (): JSX.Element => {
    const {charSelectedList} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const loadData = async () => {
        const actionResult: FavoritesActionResult = await personRepository.getFavorites();
        if (actionResult.isSuccess)
            charSelectedList.set(actionResult.result);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        isLoading
            ? <Loader/>
            : <Box>
                <Grid container spacing={2} justify="center" alignItems="center">
                    {
                        charSelectedList.value.length <= 0
                            ? <Grid item>
                                <Grid container justify="center" alignItems="center">
                                    <Box>
                                        <Icon path={mdiAlertCircleOutline} color={"grey"} size={1} vertical/>
                                    </Box>
                                    <Box marginLeft={2}>
                                        <Typography variant={"body1"} color="textSecondary">No data</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            : charSelectedList.value.map((char: Char, index: number) => (
                                <Grid item key={`character-${index}`}>
                                    <Grid container justify="center">
                                        <CharCard char={char}/>
                                    </Grid>
                                </Grid>
                            ))
                    }
                </Grid>
            </Box>
    );
};
