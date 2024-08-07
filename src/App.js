import react, { useEffect, useState } from "react" 
import Header from "../src/components/Header.js" 
import Mainbody from "../src/components/Mainbody.js"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Country from "./components/Country.js"
function App() {
  const [e1,setE1]=useState("")
  const [e2,setE2]=useState("")
  const [e3,setE3]=useState("")
  const [e4,setE4]=useState(()=>{
    const savedData=localStorage.getItem("data")
    return savedData? JSON.parse(savedData):""
  })
  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(e4))
  },[e4])
  
  return (
    <>
      <Router>
        <Header e1={e1} setE2={setE2}/>
        <Routes>
          <Route path="/" element={<Mainbody setE1={setE1} e2={e2} setE4={setE4} />}/>
          <Route path="/Country" element={<Country e2={e2} e4={e4}/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
