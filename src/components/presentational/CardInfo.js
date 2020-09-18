import React from 'react';
import PropTypes from 'prop-types';
import * as S from './Card.styles';

const CardInfo = ({ demo, github }) => (
  <S.CardInfo>
    <div>
      <i className="fas fa-external-link-alt cardI" data-link={demo} />
    </div>
    <div>
      <i className="fab fa-github cardI" data-link={github} />
    </div>
  </S.CardInfo>
);

CardInfo.defaultProps = {
  demo: 'https://www.google.com',
  github: 'https://www.google.com',
};

CardInfo.propTypes = {
  demo: PropTypes.string,
  github: PropTypes.string,
};

export default CardInfo;
