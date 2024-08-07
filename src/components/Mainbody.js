import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import lightmagglass from "../images/lightmagglass.svg"
import darkmagglass from "../images/darkmagglass.svg"

const Mainbody = ({setE1,e2,setE4}) => {
    const [data,setData]=useState([])
    const [filter1,setFilter1]=useState("")
    const [filter2,setFilter2]=useState("")
    setE1(document.querySelector(".mainbody"))
    
    async function fetcher(){
        const res=await fetch("https://restcountries.com/v3.1/all")
        const resj=await res.json()
        setData(resj) 
    }
    useEffect(()=>{
        fetcher()
    },[])
    useEffect(()=>{
        if(data){
            setE4(data)
            
        }
    },[data])
  return (
    <>
        <div className={`${e2 ? "mainbody-dark":"mainbody-light"}`} style={{minHeight:90+"vh"}}>
            <div className={`${e2 ? "filter-dark" : "filter-light"} flex filter gap-8 lg:gap-0 filter-dark flex-col lg:flex-row px-5 py-10 justify-between text-white  h-44 lg:h-20 `}>
                <div className="flex  relative w-full outline-none">
                    {e2 ? <img src={lightmagglass} alt="" className="absolute  left-10" style={{width:15+"px"}} /> : <img src={darkmagglass} alt="" className="absolute  left-10" style={{width:15+"px"}} />}
                    <input type="text" onChange={(e)=>{setFilter2(e.target.value)}} className="w-full outline-none rounded-md lg:w-1/2 px-20 py-3 lg:py-6" placeholder="search for a country" />
                </div>
                
                <select name="" id="" onChange={(e)=>{setFilter1(e.target.value)}} 
                className="w-1/2 outline-none rounded-md lg:w-1/4 px-5 py-3 lg:py-6">
                    <option value=""  disabled selected>Filter in region</option>

                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="">Nothing</option>
                </select>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 px-10 pt-10">
                {data.map((eachcountry)=>{
                    let eachcontinent=eachcountry.continents[0]
                    let eachcountryname=eachcountry.name.common.toLowerCase().replaceAll(" ","")
                    
                    if((filter1==="" || eachcontinent==filter1 || eachcontinent.slice(6,eachcontinent.length)==filter1)&&(filter2==""||eachcountryname.includes(filter2))){
                        return <Link to={`/Country?name=${eachcountry.name.common}`} >
                        <div className="flex justify-center w-full">
                        <div className="w-72 rounded-md overflow-hidden shadow-lg">
                            <img src={eachcountry.flags.svg} className="w-full h-40 " alt="" />
                            <div className={`${e2 ? "eachcountry-dark":"eachcountry-light"} relative text-white px-10 lg:px-5 pt-10 eachcountry h-44 `}>
                                    <h1 className="absolute top-0 text-2xl font-semibold" style={{top:10+"%"}}>{eachcountry.name.common}</h1>
                                <p className="absolute top-0" style={{top:38+"%"}}>Population:<span>{eachcountry.population}</span></p>
                                <p className="absolute top-0" style={{top:52+"%"}}>Region:<span>{eachcountry.region}</span></p>
                                <p className="absolute top-0" style={{top:66+"%"}}>Capital:<span>{eachcountry.capital}</span></p>
                            </div>
                        </div>
                        </div>
                        </Link>
                    }
                })}
            </div>
        </div>
    </>
  )
}

export default Mainbody