// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
import WorldMap from './Components/WorldMap.tsx'
import BucketList from './Components/BucketList.tsx'
import Minesweeper from './Components/Minesweeper/Minesweeper.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Router>
    <Routes>
      <Route path='/' element={ <App /> } />
      <Route path='/worldmap' element={ <WorldMap /> } />
      <Route path='/bucketlist' element={ <BucketList /> } />
      <Route path='/minesweeper' element={ <Minesweeper /> } />
    </Routes>
  </Router>
  // </StrictMode>,
)
