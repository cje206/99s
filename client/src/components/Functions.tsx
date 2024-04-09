export const getColor = (
  setfunc: (colors: any) => void,
  type: number,
  color?: string,
  background?: string
) => {
  switch (type) {
    case 1:
      setfunc({
        background: '#333',
        color: '#fff',
      });
      break;
    case 2:
      setfunc({
        background: '#fbc02d',
        color: '#f6f7f9',
      });
      break;
    case 3:
      setfunc({
        background: '#11804b',
        color: '#f6f7f9',
      });
      break;
    case 4:
      setfunc({
        background: '#352e91',
        color: '#f6f7f9',
      });
      break;
    case 5:
      setfunc({ background, color });
      break;

    default:
      break;
  }
};
