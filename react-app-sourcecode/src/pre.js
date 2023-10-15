import React,{useState,useEffect} from "react";

function Pred(){
    const [data,setData]= useState([{}]);
    useEffect(() => { // Use parentheses instead of curly braces here
        fetch("/members")
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);

    return(
        <div>
{(typeof data !== 'undefined' && typeof data.members !== 'undefined') ? (
    data.members.map((member, i) => (
        <p key={i}>{member}</p>
    ))
) : (
    <p>Loading...</p>
)}
        </div>
    )
}

export default Pred