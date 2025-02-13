import { useState } from "react"

export default function CardBranch (){
    return (
        <>
        <div className="card" style={{ width: "18rem" }}>
            <img src="/assets/LOGOSD.ico" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Direccion Local</h5>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </>
    )
}