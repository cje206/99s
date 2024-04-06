import { SettingHeader } from '../components/Headers';
import {
  SetBlog,
  SetCategory,
  SetHome,
  SetInfo,
  SetPost,
} from '../components/Settings';

export default function Setting({ position }: { position: string }) {
  return (
    <div className="wrap">
      <SettingHeader>{position}</SettingHeader>
      <div className="body">
        {position === '설정' && <SetHome />}
        {position === '글 관리' && <SetPost />}
        {position === '카테고리 관리' && <SetCategory />}
        {position === '개인정보 수정' && <SetInfo />}
        {position === '블로그 편집' && <SetBlog />}
      </div>
    </div>
  );
}
