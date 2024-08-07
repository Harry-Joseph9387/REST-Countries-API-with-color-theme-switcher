import React,{useState,useEffect} from 'react'
import lightmoon from "../images/lightmoon.svg"
import darkmoon from "../images/darkmoon.svg"
const Header = ({e1,setE2}) => {
  const [dark,setDark]=useState(true)
  const themeChange=()=>{
    if(dark===false){
      setDark(true)
      setE2(true)
    }
    else{
      setDark(false)
      setE2(false)
    }
    
    // const eheader=document.querySelector(".header")
    // const efilter=e1.querySelector(".filter")
    // const eeachcountry=e1.querySelectorAll(".eachcountry")

    



    // efilter.classList.toggle("filter-dark")
    // efilter.classList.toggle("filter-light")

    // e1.classList.toggle("mainbody-dark")
    // e1.classList.toggle("mainbody-light")

    // eheader.classList.toggle("header-dark")
    // eheader.classList.toggle("header-white")
  }
  useEffect(
    ()=>{setE2(dark)}
,[])
  return (
    <>
        <div className={`${dark ? "header-dark":"header-light"} header shadow-lg h-16 flex items-center font-semibold  justify-between px-10`}>
            <h4 className="">Where in the world?</h4>
            <div className="">
                <button onClick={()=>{themeChange()}} className="text-sm flex items-center">
                  {dark ? <img src={lightmoon} alt="" style={{width:20+"px"}} /> :<img src={darkmoon} alt="" style={{width:20+"px"}} /> }{dark ?"DarkMode" :"LightMode"}</button>
            </div>
        </div>
    </>
  )
}

export default Header