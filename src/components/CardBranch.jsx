export default function CardBranch({titulo, imagen, descripcion}) {

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="/assets/LOGOSD400px.png" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p>{descripcion}</p>
                <a href="#" className="btn btn-primary">Ver beneficios</a>
            </div>
        </div>
    );
}
