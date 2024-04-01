import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import './styles/reset.css';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import SignupEmail from './pages/SignupEmail';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Setting from './pages/Setting';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/chat" element={<Chat />} />
          <Route path="/setting" element={<Setting position="설정" />} />
          <Route
            path="/setting/post"
            element={<Setting position="글 관리" />}
          />
          <Route
            path="/setting/category"
            element={<Setting position="카테고리 관리" />}
          />
          <Route
            path="/setting/info"
            element={<Setting position="개인정보 수정" />}
          />
          <Route
            path="/setting/blog"
            element={<Setting position="블로그 편집" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/email" element={<SignupEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
