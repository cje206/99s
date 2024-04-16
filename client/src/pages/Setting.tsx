import { useEffect, useState } from 'react';
import { MainPcHeader, SettingHeader } from '../components/Headers';
import {
  PcSetMenu,
  SetBlog,
  SetCategory,
  SetHome,
  SetInfo,
  SetMenu,
  SetPost,
} from '../components/Settings';
import '../styles/_utils.scss';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Setting({ position }: { position: string }) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1160);

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1160);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="wrap setting">
      {innerWidth >= 1160 ? (
        <MainPcHeader />
      ) : (
        <SettingHeader>{position}</SettingHeader>
      )}
      <div className="settingPc">
        {isLargeScreen && (
          <div className="sideMenuPc">
            <PcSetMenu />
          </div>
        )}
        <div className="body block">
          {position === '설정' && <SetHome />}
          {position === '글 관리' && <SetPost />}
          {position === '카테고리 관리' && <SetCategory />}
          {position === '개인정보 수정' && <SetInfo />}
          {position === '블로그 편집' && <SetBlog />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
