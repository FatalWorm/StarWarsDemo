import React, {HTMLAttributes} from "react";
import {Box} from "@material-ui/core";

export interface ITabPanelProps extends HTMLAttributes<HTMLDivElement> {
    value: number;
    index: number;
}

export const TabContainer = (props: ITabPanelProps): JSX.Element => {
    const {children, value, index, ...other} = props;

    return (
        <Box id={`tab-panel-id--${index}`}
             role="tab-panel"
             hidden={value !== index}
             aria-labelledby={`simple-tab-index--${index}`}
             {...other}
        >
            {
                value === index && (
                    <Box marginTop={2} marginBottom={2}>
                        {children}
                    </Box>
                )
            }
        </Box>
    );
};