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
                    <input type="checkbox"/>
                        <tr className="linhaTabela">
                            {/* <td><input type="checkbox"/></td> */}
                            <td className='id'>{props.id}</td>
                            <td className='modelo'>{props.modelo}</td>
                            <td className='fabricante'>{props.fabricante}</td>
                            <td className='data'>{props.data}</td>
                            <td className='consumo'>{props.consumo}(kWh)</td>
                            <td className='valor'>R$ {props.valor}</td>

                        </tr>
                    </tbody>
        </>
    )
} 	
