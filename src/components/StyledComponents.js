import styled from 'styled-components/native/dist/styled-components.native.esm';

import {
  TextInput, View, TouchableOpacity, Text, Image,
} from 'react-native';

export const StyledInput = styled(TextInput)`
  width: 100%;
  height: 55px;
  border-radius: 30px !important;
  background:white;
  border: 1px solid rgba(246, 0, 28, .3) !important;
  margin: 15px 0 25px;
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  color: black;
  padding: 15px;
  display: flex;
`;
export const StyledView = styled(View)`
 width:100%;
 padding:25px;
 background:black;
 align-items: center;
 justify-content: center;
 flex:1;
`;

export const StyledButton = styled(TouchableOpacity)`
  border-radius: 35px !important;
  display:flex;
  justify-content:center;
  padding:25px;
  background:#e50914;
  width: ${(props) => props.buttonWidth || '100%'};
  border: none;
  margin: 25px 0;
  color: #fff;
`;

export const WhiteText = styled(Text)`
    color:white;
    font-size: 23px;
    text-align:center;
`;

export const Title = styled(Text)`
  text-align: center;
  font-size: 50px;
  font-weight: 400;
  color:white;
`;

export const ButtonWrapper = styled(View)`
 display:flex;
 flex-direction:row; 
 justify-content:space-between;
`;

export const ShowView = styled(View)`
    display:flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #505050;
    color:white;
    align-items: center;
    width:100%;
    margin:5px 0;
`;
export const ShowImage = styled(Image)`
    height:500px;
    width:100%;
`;
export const ShowText = styled(Text)`
    color:white;
    font-size: 23px;
    text-align:left;
    margin-top:15px;
`;
export const ShowContent = styled(View)`
   padding:15px;
`;
