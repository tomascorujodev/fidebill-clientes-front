export default function CardBranch({titulo, imagen, puntos}) {

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="/assets/LOGOSD400px.png" className="card-img-top fixed" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p>{puntos}</p>
                <a href="#" className="btn btn-primary">Ver beneficios</a>
            </div>
        </div>
    );
}
