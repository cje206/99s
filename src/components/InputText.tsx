import { Info } from '../types';

interface Props {
  text: string;
  data: string;
  setValue: (val: string) => void;
  placeholder?: string;
  type?: string;
}
export default function InputText({
  text,
  data,
  type,
  placeholder,
  setValue,
}: Props) {
  return (
    <div>
      <label>{text}</label>
      <input
        type={type || 'text'}
        placeholder={placeholder || text}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
