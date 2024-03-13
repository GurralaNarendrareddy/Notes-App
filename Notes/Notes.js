import './Notes.css';
import {useEffect, useState} from 'react';

export const Notes=()=>{
    let [title,setTitle]=useState("");
    let [desc,setDesc]=useState("");
    let [data,setData]=useState([]);
    let titleIp=(e)=>{
        setTitle(e.target.value)
    }
    let descIp=(e)=>{
        setDesc(e.target.value)
    }
    let deleteBtn=(id)=>{
        console.log("deleted"+id)
        fetch(`http://localhost:3111/deleteNote/${id}`, {
            method: 'DELETE'
        })
        .then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }
    let save=()=>{
        let date=new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        fetch("http://localhost:3111/addNote", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            desc: desc,
            date: formattedDate
        })
        }).then((res) => {
            console.log(res);
            setTitle("");
            setDesc("");
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(()=>{
        fetch("http://localhost:3111/", {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    },[title])
    return(
        <div>
            <h1>Notes App</h1>
            <div className="notes-app-container">
                <div className="title-desc-container">
                    <div className="title-desc">
                        <input type="text" placeholder="Title" value={title} onChange={titleIp}></input>
                        <textarea  placeholder="Description" value={desc} onChange={descIp}></textarea>
                        <button onClick={save}>SAVE</button>
                    </div>
                </div>
                
            </div>
            <div className='res-container' >
                {data.map(ele =>
                        <div className='res-cont' key={ele.id}>
                            <div className='result'>
                                <div className='title-date'>
                                    <p><b>TITLE :</b>{ele.title}</p>
                                    <p>{ele.date}</p>
                                </div>
                                
                                <p><b>Desc :</b>{ele.desc}</p>
                                
                            </div>
                            <button className='delete-btn' onClick={()=>{deleteBtn(ele.id)}}>DELETE</button>
                        </div>
                )}
            </div>
        </div>
    )
}