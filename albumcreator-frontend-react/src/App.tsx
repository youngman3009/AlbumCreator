import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import AlbumDetail from './pages/AlbumDetail/AlbumDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums/:albumId" element={<AlbumDetail />} /> 
    </Routes>
)
}

export default App
