import { useState } from 'react';
import styled from 'styled-components';
const BoxStyle = styled.button<{ btncolor: string }>`
  border: 2px solid #d9dbdf;
  padding: 0;
  border-radius: 50px;
  display: flex;
  .btnText {
    display: inline-block;
    width: 20px;
    line-height: 20px;
    background: #7e7f81;
    color: #7e7f81;
    border-radius: 50%;
    margin: 2px;
    font-size: 10px;
    &.off {
      background: transparent;
      margin-left: 5px;
      text-align: center;
      text-indent: -8px;
    }
    &.on {
      color: transparent;
      text-indent: 6px;
    }
  }
  &.active {
    .on {
      color: #7e7f81;
      background: transparent;
    }
    .off {
      color: transparent;
      background: ${(props) => props.btncolor};
    }
  }
`;
export function ToggleBtn({
  active,
  btncolor,
}: {
  active: boolean;
  btncolor?: string;
}) {
  const OnStyle = () => {
    return (
      <BoxStyle className="active" btncolor={btncolor || '#fbc20d'}>
        <span className="btnText on">ON</span>
        <span className="btnText off">OFF</span>
      </BoxStyle>
    );
  };
  const OffStyle = () => {
    return (
      <BoxStyle btncolor={btncolor || '#fbc20d'}>
        <span className="btnText on">ON</span>
        <span className="btnText off">OFF</span>
      </BoxStyle>
    );
  };
  if (active) {
    return <OnStyle />;
  } else {
    return <OffStyle />;
  }
}
