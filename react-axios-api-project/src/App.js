import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CreateStaff from './components/staff/CreateStaff';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateStaff/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App