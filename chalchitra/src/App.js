import logo from './logo.svg';
import './App.css';
import VideoGallery from './Components/VideoGallery';
import { Route, Routes } from 'react-router';
import Video from './Components/Video';
import PrivateVideoGallery from './Components/PrivateVideoGallery';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<VideoGallery />} />
        <Route path='/video/:id' element={<Video />} />
        <Route path='/private/:pvt' element={<PrivateVideoGallery />} />
      </Routes>
    </div>
  );
}

export default App;
