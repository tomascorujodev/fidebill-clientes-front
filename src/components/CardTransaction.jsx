export default function CardBranch({titulo, imagen, puntos}) {

    return (
        <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 className="card-title">{titulo}</h5>
                <p>{puntos}</p>
                <a href="#" className="btn btn-primary">Ver Consumo</a>
        </div>
      </div>
    );
}
