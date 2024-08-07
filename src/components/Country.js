import React, { useEffect,useState } from 'react'
import {Link} from "react-router-dom"
import leftlight from "../images/left-light.svg"
import leftdark from "../images/left-dark.svg"
const Country = ({e2,e4}) => {
    const [name,setName]=useState("")
    const [country,setCountry]=useState("")
    const [firstCurrency,setFirstCurrency]=useState("")
    const [firstNativeName,setFirstNativeName]=useState("")
    const [firstLanguage,setFirstLanguage]=useState("")
    const [borderData,setBorderData]=useState([])
    function a(){
        const link=window.location.href
        setName(link.split("?")[1].replace("name=","").replaceAll("%20"," ").toLowerCase())
    }
    async function fetcher(){
        const res=await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const data=await res.json()
        setCountry(data)
    }
    useEffect(()=>{
        a()
        if(name){
            fetcher()
        }
        
    },[name])
    useEffect(()=>{
        if(country){
            const firstcurrency=country && Object.values(country[0].currencies) 
            setFirstCurrency(firstcurrency[0].name)

            const nativename=country && Object.values(country[0].name.nativeName)
            setFirstNativeName(nativename[0].common)

            const language=country && Object.values(country[0].languages)
            setFirstLanguage(language)

            setBorderData(country[0].borders)
            }
    },[country])

    useEffect(()=>{
        if(e4){
            // console.log(e4)
        }
    },[e4])
  return (
    <>
        {country && 
            <div className={`${e2?"mainbody-dark":"mainbody-light"} w-full  country`}  >
                <div className="pl-5 pt-10 pb-10">
                        <Link to="/"><div className={`${e2 ? "button-dark":"button-light"} text-sm flex shadow  rounded w-32 justify-center py-1`}><img src={e2?leftlight:leftdark} alt="" className="pr-2" style={{width:25+"px"}} />Back</div></Link>
                </div>
                <div className="flex md:justify-center md:gap-20 flex-col md:flex-row  px-5">
                        <div className="flex justify-start md:items-center ">
                            <img src={country[0].flags.svg} alt="" className=" max-w-sm lg:max-w-xl md:max-w-sm md:h-56 lg:h-full  h-full  max-h-80 " style={{objectFit:"cover"}}/>
                        </div>
                        <div className={`${e2?"text-white":"text-black"} text-sm md:text-md flex flex-col w-full text-container max-w-lg  gap-5 pt-5`}>
                            <h1 className="text-2xl md:text-3xl font-semibold">{country[0].name.common}</h1>
                            <div className="flex gap-10">
                                <div className="flex flex-col gap-2 ">
                                    <h4>Native Name:<span>{firstNativeName}</span></h4>
                                    <h4>Population:<span>{country[0].population}</span></h4>
                                    <h4>Region:<span>{country[0].region}</span></h4>
                                    <h4>Sub Region: <span>{country[0].subregion}</span></h4>
                                    <h4>Capital:<span>{country[0].capital[0]}</span></h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4>Top Level Domain: <span>{country[0].tld}</span></h4>
                                    <h4>Currencies: <span>{firstCurrency}</span></h4>
                                    <h4>Language:<span>{firstLanguage}</span></h4>
                                </div>
                            </div>
                            <div className="">
                                <h2>Border Countries</h2>
                                <div className="bordercountries flex flex-wrap  gap-3 my-5">
                                    {borderData && e4 &&
                                        e4.map((x)=>{
                                            return borderData.map((y)=>{
                                                console.log(x.cca3,y)
                                                if(x.cca3==y){
                                                    return <Link to={`/Country?name=${x.name.common}`} onClick={()=>{setName(x.name.common)}}>
                                                        <button className={`${e2?"button-dark":"button-light"} w-32 px-5 py-1`}>{x.name.common}</button>
                                                    </Link>
                                                }
                                    })})}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        }

    </>
  )
}

export default Country