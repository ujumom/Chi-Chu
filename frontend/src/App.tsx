import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';

import Landing from './pages/Landing';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import PlanDetail from './pages/PlanDetail';
import PlanTip from './pages/PlanTip';
import PlanTipPost from './pages/PlanTipPost';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/result" element={<SearchResult />} />
          <Route path="/search/result/:id" element={<PlanDetail />} />
          <Route path="/tip" element={<PlanTip />} />
          <Route path="/tip/:id" element={<PlanTipPost />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
