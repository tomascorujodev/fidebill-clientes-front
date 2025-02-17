const backendurl = "http://localhost:5019/";
// const backendurl = "https://fidebill-cqbradhucreue7bv.canadacentral-01.azurewebsites.net/";

export async function GET(url, data){
    const objString = '?' + new URLSearchParams(data).toString();
    return await fetch(backendurl + url + objString, {
        method: 'GET',
        mode: 'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem(window.location.pathname.slice(1))}`
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