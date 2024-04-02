import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import './styles/reset.css';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import SignupEmail from './pages/SignupEmail';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SearchResult from './pages/SearchResult';
import BlogHome from './pages/BlogHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/chat" element={<Chat />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/email" element={<SignupEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/blog/:id" element={<BlogHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
