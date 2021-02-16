import React from "react";
import { StyledView, WhiteText, StyledButton, ButtonWrapper } from "../../components/StyledComponents";
import { getUserId, signOut } from "../../utils/AsyncStorageMethods";
import {ScrollView } from "react-native";
import Show from "../../components/Show";
import { loginChange } from "../../store/authentication";

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
        const { user, getMe, navigation } = this.props;
        getUserId().then((val) => {
            if(val === null){
                navigation.navigate("Login")
            }
            if(user.username === "" && val !== null){
                getMe(val)
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
        const { fetchActualShows, fetchDeletedShows, user } = this.props;
        if(val === "deleted"){
            fetchDeletedShows(0, 10, user.country);
            this.setState({
                fetchDeleted:true,
            })
        }else{
            fetchActualShows(0, 10, user.country);
        }
    }

    signUserOut(){
        const { navigation } = this.props;
        signOut().then(() => {
            navigation.navigate("Login")
            loginChange({
                "username":"",
                "password":"",
                "country":""
            })
        })
    }

    render(){
        const { shows } = this.props;
        return(
            <StyledView>
                <StyledButton>
                    <WhiteText
                        onPress={() => this.signUserOut()}
                    >
                        Sign out
                    </WhiteText>
                </StyledButton>
                <ButtonWrapper>
                    <StyledButton
                        buttonWidth={"49%"}
                        onPress={() => this.handleButtonClick()}
                    >
                        <WhiteText>
                            New
                        </WhiteText>
                    </StyledButton>
                    <StyledButton
                        buttonWidth={"49%"}
                        onPress={() => this.handleButtonClick("deleted")}
                    >
                        <WhiteText>
                            Expiring
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
                    <ButtonWrapper>
                        <StyledButton
                            buttonWidth={"49%"}
                            onPress={() => this.changePage(true)}
                        >
                            <WhiteText>
                                Previous
                            </WhiteText>
                        </StyledButton>
                        <StyledButton
                            buttonWidth={"49%"}
                            onPress={() => this.changePage()}
                        >
                            <WhiteText>
                                Next
                            </WhiteText>
                        </StyledButton>
                    </ButtonWrapper>
                </ScrollView>
                }
            </StyledView>
        )
    }
}


export default Home;