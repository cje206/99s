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
`;

const ImgStyle = styled.img`
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 0 10px;
`;

const TextStyle = styled.span`
  display: inline-block;
  line-height: 50px;
  height: 50px;
  vertical-align: top;
`;

export default function SingupBtn({ text, method }: Props) {
  return (
    <BoxStyle>
      <Link to={`/signup/${method}`}>
        <ImgStyle src={`/images/signup-${method}.png`} alt={text} />
        <TextStyle>{text}</TextStyle>
      </Link>
    </BoxStyle>
  );
}
