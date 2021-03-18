import React, {ChangeEvent, useState} from "react";
import {AppBar, Tabs, Tab, Container, makeStyles} from "@material-ui/core";
import {Main} from "../components/Main";
import {Favorites} from "../components/Favorites";
import {StorageRepository} from "../repository/StorageRepostiory";
import {TabContainer} from "../components/TabContainer";
import {TabProps} from "../models/Props/ITabProps";

const storageRepository = new StorageRepository();
const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const App = (): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = useState(storageRepository.getTab());

    const handleChange = (event: ChangeEvent, value: number) => {
        setValue(value);
        storageRepository.setTab(value);
    };

    return (
        <Container fixed maxWidth="lg">
            <AppBar position="sticky" className={classes.appBar}>
                <Tabs value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                >
                    <Tab label="Main" {...TabProps(0)} />
                    <Tab label="Favorites" {...TabProps(1)} />
                </Tabs>
            </AppBar>
            <TabContainer value={value} index={0}>
                <Main/>
            </TabContainer>
            <TabContainer value={value} index={1}>
                <Favorites/>
            </TabContainer>
        </Container>
    );
};

export default App;
