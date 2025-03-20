const Carousel = () => {
    return (

      <div className="w-full max-w-3xl mx-auto p-0 mt-0">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/assets/SliceDESK1.jpg" className="d-block w-100 h-56 object-cover" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/assets/SliceDESK2.jpg" className="d-block w-100 h-56 object-cover" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/assets/SliceDESK3.jpg" className="d-block w-100 h-56 object-cover" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    )
  }
  
  export default Carousel;
  
  

