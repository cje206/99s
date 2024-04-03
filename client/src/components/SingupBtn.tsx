import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  text: string;
  method: string;
}

const BoxStyle = styled.div`
  width: 100%;
  border: 2px solid #fbc02d;
  border-radius: 50px;
  img {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 0 10px;
  }
  span {
    display: inline-block;
    line-height: 50px;
    height: 50px;
    vertical-align: top;
  }
`;

export default function SingupBtn({ text, method }: Props) {
  return (
    <Link to={`/signup/${method}`} className="signupBtn">
      <BoxStyle>
        <img src={`/images/signup-${method}.png`} alt={text} />
        <span>{text}</span>
      </BoxStyle>
    </Link>
  );
}
