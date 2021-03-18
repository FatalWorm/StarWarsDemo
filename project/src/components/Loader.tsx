import React, {Fragment} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import Styled from "styled-components";

const LoaderWrapper = Styled.div`
    position: absolute; 
    left:0;
    right:0;
    top: 48px;
    bottom: 0;
    margin: 0;
    wight: auto; 
    height: auto; 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
`;

export const Loader = (): JSX.Element => {

    return (
        <Fragment>
            <LoaderWrapper>
                <Icon path={mdiLoading}
                      title="User Profile"
                      size={2}
                      horizontal
                      vertical
                      rotate={90}
                      spin={0.75}
                />
            </LoaderWrapper>
        </Fragment>
    );
};
