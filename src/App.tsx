import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import MainPageImgSlide from './components/MainPageImgSlide';
import { slides } from './ImgData';
import './styles/reset.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/main"
            element={<MainPageImgSlide slides={slides} />}
          ></Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
