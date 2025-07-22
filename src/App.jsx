import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from './views/Contact'
import AddContact from './views/AddContact'
import EditContact from './views/EditContact'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Contact />} />
          <Route path='/AddContact' element={<AddContact />} />
          <Route path='/EditContact/:contactID' element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
