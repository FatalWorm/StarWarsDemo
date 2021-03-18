import React, {Fragment} from "react";
import {
    Card,
    CardActionArea,
    Typography,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Dialog,
    makeStyles
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
    mdiCardsHeart,
    mdiHeartOutline
} from "@mdi/js";
import {useAppContext} from "../models/Contexts/AppContext";
import FavoritesRepository from "../repository/FavoritesRepository";
import {ICharCardProps} from "../models/Props/ICharCardProps";
import {CharInfo} from "./CharInfo";

const useStyles = makeStyles({
    media: {
        height: "15rem",
    },
});

const favoritesRepository = new FavoritesRepository();

export const CharCard = (props: ICharCardProps): JSX.Element => {
    const {char} = props;
    const classes = useStyles();
    const {charList, charSelectedList} = useAppContext();
    const [open, setOpen] = React.useState(false);

    const onSelect = (): void => {
        char.isFavorite = !char.isFavorite;
        if (char.isFavorite) {
            const temp = charSelectedList.value;
            temp.push(char);
            charSelectedList.set(temp);
            favoritesRepository.add(char.name);
        } else {
            const temp = charSelectedList.value.filter(q => {
                if (q.name !== char.name)
                    return q;
            });
            charSelectedList.set(temp);
            favoritesRepository.remove(char.name);
        }
        charList.set(charList.value.map(q => q.name === char.name ? char : q));
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Card>
                <CardActionArea>
                    <CardMedia className={classes.media}
                               image={char.imageUrl}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {char.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleClickOpen}>
                        Learn More
                    </Button>
                    <Button size="small" color="primary" onClick={onSelect}>
                        <Icon path={char.isFavorite ? mdiCardsHeart : mdiHeartOutline}
                              color={char.isFavorite ? "red" : "black"}
                              size={1}
                        />
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <CharInfo char={char} handleClose={handleClose}/>
            </Dialog>
        </Fragment>
    );
};
