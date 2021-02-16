import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import {
  ShowView, ShowImage, ShowText, ShowContent,
} from './StyledComponents';

const Show = (props) => {
  const {
    title, img, synopsis, year, expireDate,
  } = props;
  return (
    <ShowView>
      <ShowImage
        source={{ uri: img }}
      />
      <ShowContent>
        <ShowText>{decode(title)}</ShowText>
        <ShowText>{decode(synopsis)}</ShowText>
        <ShowText>
          Year:
          {year}

          {expireDate && `Expire date: ${expireDate}`}
        </ShowText>
      </ShowContent>
    </ShowView>
  );
};
Show.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  expireDate: PropTypes.string,
};

Show.defaultProps = {
  expireDate: '',
};
export default Show;
