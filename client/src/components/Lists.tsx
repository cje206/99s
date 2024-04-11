import styled from 'styled-components';

const ArrBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .title {
    line-height: 50px;
    font-weight: 700;
  }
  .ico-arrR {
    width: 24px;
    height: 50px;
    background: url('/images/ico-arrR.png') no-repeat center/contain;
  }
`;
export function ArrList({ children }: { children: string }) {
  return (
    <ArrBox>
      <div className="title">{children}</div>
      <div className="ico-arrR"></div>
    </ArrBox>
  );
}
