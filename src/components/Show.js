import React from "react";
import { ShowView, ShowImage, ShowText, ShowContent } from "./StyledComponents";
import {decode} from 'html-entities';
class Show extends React.Component {

    render(){
        const { title, img, synopsis, year } = this.props;
        return(
            <ShowView>
                <ShowImage
                    source={{uri:img}}
                />
                <ShowContent>
                    <ShowText>{decode(title)}</ShowText>
                    <ShowText>{decode(synopsis)}</ShowText>
                    <ShowText>Year: {year}</ShowText>
                </ShowContent>
            </ShowView>
        )
    }
}


export default Show;