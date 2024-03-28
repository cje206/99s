import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  func?: (a?: any) => any;
}

const BoxStyle = styled.button`
  width: 100%;
  border-radius: 50px;
  text-align: center;
  background-color: #fbc02d;
`;
export default function BtnLarge({ text }: Props) {
  return <BoxStyle>{text}</BoxStyle>;
}
