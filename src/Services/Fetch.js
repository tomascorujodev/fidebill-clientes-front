const backendurl = "http://localhost:5019/";
//const backendurl = "https://fidebill-clientes-back-ckbub4ayfpcgfpa3.canadaeast-01.azurewebsites.net/";

export async function GET(url, data){
    const objString = '?' + new URLSearchParams(data).toString();
    return await fetch(backendurl + url + objString, {
        method: 'GET',
        mode: 'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem(window.location.pathname.split('/').filter(Boolean)[0])}`
        }
    })
    .then((res) => res)
    .catch((err)=>console.log(err));
}

export async function POST(url, data){
    return await fetch (backendurl + url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(window.location.pathname.slice(1))}`
        },
        body: JSON.stringify(data)
        })
        .then((res)=>res)
        .catch((err)=> console.log(err))
}

export async function PATCH(url, data){
    return await fetch (backendurl + url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(window.location.pathname.slice(1))}`
        },
        body: JSON.stringify(data)
        })
        .then((res)=>res)
        .catch((err)=> console.log(err))
}