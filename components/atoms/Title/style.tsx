import styled from 'styled-components';
import { titleWhite } from 'utils';

export const Title = styled.h1`
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: ${titleWhite};
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 25px;
  font-weight: 900;
  line-height: 30.8px;
  text-decoration: none;
  word-wrap: break-word;

  @media screen and (max-width: 620px) {
    font-size: 23px;
  }

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
