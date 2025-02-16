import CardBranch from "../components/CardBranch";

export default function Beneficios() {
    return (
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", 
            gap: "20px",
            width: "100%", 
            maxWidth: "600px", // Ajustar el ancho máximo para 2 columnas
            margin: "0 auto", // Centrar el grid en la pantalla
            justifyContent: "center",
        }}>
            <CardBranch />
            <CardBranch />
            <CardBranch />
            <CardBranch />
            <CardBranch />
        </div>
    );
}
