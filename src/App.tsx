import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from './routes/root.routes';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <BrowserRouter>
        <RootRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
