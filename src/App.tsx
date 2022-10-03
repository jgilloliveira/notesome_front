import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { loadSession } from './connections/session.connection';
import { RootRoutes } from './routes/root.routes';

function App() {
  
  loadSession()
  
  return (
    <div className="App">
      <BrowserRouter>
        <RootRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
