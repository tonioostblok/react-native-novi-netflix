import React from "react";
import { StyledView, WhiteText, StyledButton, ButtonWrapper } from "../../components/StyledComponents";
import { getUserId } from "../../utils/AsyncStorageMethods";
import {ScrollView } from "react-native";
import Show from "../../components/Show";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 10,
            paginatedShows: false,
            fetchDeleted: false
        };
    }

    componentDidMount() {
        getUserId().then((val) => {
            if(val === null){
                this.props.navigation.navigate("Login")
            }
        })
    }

    changePage(goBack = false) {
        const {
            fetchDeletedShows,
            fetchActualShows,
            user,
        } = this.props;
        const { page, perPage, fetchDeleted } = this.state;
        let newPage = page + 1;
        if (goBack) {
            newPage = (page <= 1) ? 1 : page - 1;
        }
        this.setState({
            page: newPage,
        });
        const offset = (newPage - 1) * perPage;
        if (fetchDeleted) {
            fetchDeletedShows(offset, perPage, user.country);
        } else {
            fetchActualShows(offset, perPage, user.country);
        }
    }

    handleButtonClick(val){
        const { fetchActualShows, fetchDeletedShows } = this.props;
        if(val === "deleted"){
            fetchDeletedShows();
            this.setState({
                fetchDeleted:true,
            })
        }else{
            fetchActualShows();
        }
    }

    render(){
        const { shows } = this.props;
        return(
            <StyledView>
                <ButtonWrapper>
                    <StyledButton
                        buttonWidth={"49%"}
                        onPress={() => this.handleButtonClick()}
                    >
                        <WhiteText>
                            New shows
                        </WhiteText>
                    </StyledButton>
                    <StyledButton
                        buttonWidth={"49%"}
                        onPress={() => this.handleButtonClick("deleted")}
                    >
                        <WhiteText>
                            Expiring shows
                        </WhiteText>
                    </StyledButton>
                </ButtonWrapper>


                {shows.length > 0 &&
                <ScrollView>
                    {shows.map((val) => {
                        return(
                            <Show
                                img={val.img}
                                title={val.title}
                                synopsis={val.synopsis}
                                year={val.year}
                            />
                        )
                    })}
                    <StyledButton onPress={() => this.changePage(true)}>
                        <WhiteText>
                            Previous page
                        </WhiteText>
                    </StyledButton>
                    <StyledButton onPress={() => this.changePage()}>
                        <WhiteText>
                            Next page
                        </WhiteText>
                    </StyledButton>
                </ScrollView>
                }
            </StyledView>
        )
    }
}


export default Home;