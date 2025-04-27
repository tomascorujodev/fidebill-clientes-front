import CardBranch from "../components/CardBranch";
import { useLocales } from "../contexts/LocalesContext";

export default function Sucursales() {
    let locales = useLocales();
    return (
        <>
        <div style={{ 
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: "96%", 
            marginInline: "2%"
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
