import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'

function App() {

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
    </Routes>
)
}

export default App
