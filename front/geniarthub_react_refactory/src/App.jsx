import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ArtBoard from './components/ArtBoard'
import ArtBoardDetail from './components/ArtBoardDetail'
import ArtBoardDetailEdit from './components/ArtBoardDetailEdit'
import ArtBoardDetailDelete from './components/ArtBoardDetailDelete'
import ArtBoardDetailEditDelete from './components/ArtBoardDetailEditDelete'
import ArtBoardDetailEditDeleteConfirm from './components/ArtBoardDetailEditDeleteConfirm'

function App() {
  return (
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artboards" element={<ArtBoard />} />
        <Route path="/artboards/:id" element={<ArtBoardDetail />} />
        <Route path="/artboards/:id/edit" element={<ArtBoardDetailEdit />} />
        <Route path="/artboards/:id/delete" element={<ArtBoardDetailDelete />} />
        <Route path="/artboards/:id/edit/delete" element={<ArtBoardDetailEditDelete />} />
        <Route path="/artboards/:id/edit/delete/confirm" element={<ArtBoardDetailEditDeleteConfirm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App