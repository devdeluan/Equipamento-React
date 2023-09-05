import '../style.css'

export default function CardEquipamento(props:any){

    function parseListaEquipamento () {
        if (typeof props.id === 'string') {
            return JSON.parse(props.id)
        } else {
            return props.id
        }
    }

    
    return(
        <>
                    <tbody>
                        <tr className="linhaImpar">
                            <td>{props.id}</td>
                            <td>{props.modelo}</td>
                            <td>{props.fabricante}</td>
                            <td>{props.data}</td>
                            <td>{props.consumo}(kWh)</td>
                            <td>R$ {props.valor}</td>
                            

                        </tr>

                        <tr className="linhaPar">
                            <td>{props.id}</td>
                            <td>{props.modelo}</td>
                            <td>{props.fabricante}</td>
                            <td>{props.data}</td>
                            <td>{props.consumo}(kWh)</td>
                            <td>R$ {props.valor}</td>

                        </tr>
                    </tbody>
        </>
    )
} 	
