import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import './styles/reset.css';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import SignupEmail from './pages/SignupEmail';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Setting from './pages/Setting';
import SearchResult from './pages/SearchResult';
import BlogHome from './pages/BlogHome';
import Content from './pages/Content';

import BlogEditor from './components/BlogEditor';
// import QuillEditor from './components/QuillEditor';

import QuillEditor from './components/QuillEditor';
import Editor from './components/ReadQuill';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
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
          <Route path="/search" element={<SearchResult />} />
          <Route path="/blog/:id" element={<BlogHome />} />
          <Route path="/blog/:id/:postId" element={<Content />} />

          {/* <Route path="/comments/:postId" element={<Comment />} /> */}
          <Route
            path="/blog/write"
            element={
              <QuillEditor
                placeholder={'내용을 입력해주세요'}
                value={undefined}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
