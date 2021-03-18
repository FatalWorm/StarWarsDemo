import React, {useEffect, useMemo, useState} from "react";
import {useAppContext} from "../models/Contexts/AppContext";
import {Char} from "../models/Char";
import CharRepository from "../repository/CharRepository";
import {Grid, Box, Button, ButtonGroup, Typography} from "@material-ui/core";
import {Loader} from "./Loader";
import {CharCard} from "./CharCard";
import {StorageRepository} from "../repository/StorageRepostiory";
import Icon from "@mdi/react";
import {mdiAlertCircleOutline} from "@mdi/js";

const personRepository = new CharRepository();
const storageRepository = new StorageRepository();

export const Main = (): JSX.Element => {
    const pageCount = 13;
    const {charList} = useAppContext();
    const [page, setPage] = useState(storageRepository.getPage());
    const [isLoading, setIsLoading] = useState(true);
    const loadData = async () => {
        const data = await personRepository.getCharsByPage(page);
        charList.set(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [page]);

    const changePage = (value: number) => {
        setPage(value);
        storageRepository.setPage(value);
    };

    const pagination = useMemo(() => {
        const items: JSX.Element[] = [];

        for (let i = 1; i < pageCount; i++) {
            items.push(<Button key={`page-button--${i}`} onClick={() => changePage(i)}>{i}</Button>);
        }

        return (
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {items}
            </ButtonGroup>
        );
    }, [pageCount]);

    return (
        isLoading
            ? <Loader/>
            : <Box>
                <Box>
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            {pagination}
                        </Grid>
                    </Grid>
                </Box>
                <Box marginTop={1}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="caption" color={"textSecondary"}>
                                {`Page ${page}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box marginTop={2}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        {
                            charList.value.length < 1
                                ? <Grid item>
                                    <Grid container justify="center" alignItems="center">
                                        <Box>
                                            <Icon path={mdiAlertCircleOutline} color={"grey"} size={1} vertical/>
                                        </Box>
                                        <Box marginLeft={2}>
                                            <Typography variant={"body1"} color="textSecondary">No data</Typography>
                                            {
                                                page > 9
                                                    ? <Typography variant={"body1"} color="textSecondary">Is demo page</Typography>
                                                    : null
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                                : charList.value.map((char: Char, index: number) => {
                                    return (
                                        <Grid item key={`char--${index}`}>
                                            <Grid container justify="center">
                                                <CharCard key={`char-card--${index}`} char={char}/>
                                            </Grid>
                                        </Grid>
                                    );
                                })
                        }
                    </Grid>
                </Box>
            </Box>
    );
};
