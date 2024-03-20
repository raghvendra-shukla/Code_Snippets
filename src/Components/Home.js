import React from 'react'
import Card from './Card'
import {useState,useEffect} from 'react';

function Home() {
    const [Data, setData] = useState([]);
    const fetchdata = async () => {
        let url = `http://localhost:5000/getsnippets`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setData(parsedData);
      };
      useEffect(() => {
        fetchdata();
      }, []);
  return (
    <div><Card data={Data}/></div>
  )
}

export default Home