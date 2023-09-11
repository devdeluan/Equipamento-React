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
                        <tr className="linhaTabela">
                            <td className='id'>{props.id}</td>
                            <td className='modelo'>{props.modelo}</td>
                            <td className='fabricante'>{props.fabricante}</td>
                            <td className='data'>{props.data}</td>
                            <td className='consumo'>{props.consumo}(kWh)</td>
                            <td className='valor'>R$ {props.valor}</td>
                            <input
                                type="checkbox"
                                // checked={selectedRows.includes(equip.id)}
                                // onChange={() => toggleRow   Selection(equip.id)}   
                                                />
                        </tr>
                    </tbody>
        </>
    )
} 	
