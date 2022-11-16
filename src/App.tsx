import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { loadSession } from './connections/session.connection';
import { CategoriesProvider } from './context/categories.context';
import { RootRoutes } from './routes/root.routes';

function App() {
  
  loadSession()
  
  return (
    <div className="App">
      <CategoriesProvider>
        <BrowserRouter>
          <RootRoutes/>
        </BrowserRouter>
      </CategoriesProvider>
    </div>
  )
}

export default App
