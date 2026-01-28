import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Viewuser from './components/Viewuser'
import Adduser from './components/Adduser'


function App() {


  return (
  <>

<Router>
  <Routes>
    <Route path='/' element={<Viewuser/>}></Route>
    <Route path='/Add' element={<Adduser/>}></Route>
   
    
  </Routes>
</Router>



  </> 
  
  )
}

export default App
