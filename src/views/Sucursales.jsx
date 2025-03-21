import CardBranch from "../components/CardBranch";
import { useLocales } from "../contexts/LocalesContext";

export default function Sucursales({setIsLoggedIn}) {
    const locales = useLocales();
    return (
        <>
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", 
            gap: "20px",
            width: "100%", 
            maxWidth: "600px",
            margin: "0 auto",
            justifyContent: "center",
            justifyItems: "center"
        }}>
        {
            locales &&
            locales.map(local => (
                <CardBranch key={local.direccionLocal} titulo={local.direccionLocal} idUsuarioEmpresa={local.idUsuarioEmpresa}/>
            ))
        }        
        </div>
        </>
    );
}
