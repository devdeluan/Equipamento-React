import CardEquipamento from "../../components/CardEquip";
import api from "../../utils/api";
import { useEffect, useState } from "react"
import './style.css'


export default Equipamento;    

function Equipamento() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [equip, setEquip] = useState<any[]>([])



    // Função para excluir as linhas selecionadas
    function excluirLinhasSelecionadas() {
  
      // Após a exclusão bem-sucedida, atualize o estado listaBuscaFiltrado
      const equipamentosAtualizados = listaBuscaFiltrado.filter(
        (equip: any) => !selectedRows.includes(equip.id)
      );
  
      setlistaBuscaFiltrado(equipamentosAtualizados);
      setSelectedRows([]); // Limpa a seleção após a exclusão
    }
  

  // Função para alternar a seleção de uma linha com base no ID
  function toggleRowSelection(id: string) {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }



  //state filtros com os filtros definidos
  const [filtros, setFiltros] = useState<string[]>(
    [
      "ID",
      "MODELO",
      "FABRICANTE",
      'DATA',
      "CONSUMO",
      'VALOR'
    ]);
    
  const [select, setSelect] = useState<string>(""); // state que contém a opção de filtro selecionado pelo usuário

  const [filtroDigitado, setfiltroDigitado] = useState<string>("");

  const [listaBuscaFiltrado, setlistaBuscaFiltrado] = useState<any[]>(equip);

  useEffect(() => {
    document.title = "Lista de Equipamentos"

    listarEquipamentos()

  }, [])

  function buscarPor(event: any) {
    event.preventDefault();
    
    let equipFiltrados = [];

    if (select == 'ID') {
        equipFiltrados = equip.filter((eq: any) => eq.id.toString().includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'MODELO') {
      equipFiltrados = equip.filter((eq: any) => eq.modelo.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'FABRICANTE') {
      equipFiltrados = equip.filter((eq: any) => eq.fabricante.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'DATA') {
      equipFiltrados = equip.filter((eq: any) => eq.data.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'CONSUMO') {
      equipFiltrados = equip.filter((eq: any) => eq.consumo.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'VALOR') {
      equipFiltrados = equip.filter((eq: any) => eq.valor.includes(filtroDigitado.toLocaleUpperCase()))
    }

    if (equipFiltrados.length === 0) {
      alert("Nenhum resultado encontrado!!")
    }
 
    else {
      setlistaBuscaFiltrado(equipFiltrados)
    }
  }


  function retornoEquipGeral(event: any) {
    if (event.target.value === "") {
      setlistaBuscaFiltrado(equip)
    }
    setfiltroDigitado(event.target.value)
  }

  function listarEquipamentos() {
    api.get('users').then((resposta: any) => {
      console.log(resposta.data);
      setEquip(resposta.data)
    })
  }

  function alternarCoresTabela() {
    let linhas = document.getElementsByTagName("tr"); // Obtém todas as linhas da tabela
  
    for (let i = 0; i < linhas.length; i++) {
      if (i % 2 === 0) { // Se o índice da linha for par
        linhas[i].style.backgroundColor = "#dceee8 "; // Define a cor de fundo como branco
      } else { // Se o índice da linha for ímpar
        linhas[i].style.backgroundColor = "#01b574"; // Define a cor de fundo como verde
      }
  
      // Verifica se a linha possui a classe "tabelaEquip"
      if (linhas[i].classList.contains("tabelaEquip")) {
        linhas[i].style.backgroundColor = "white"; // usa a cor desejada
      }
    }
  }
  
  // Exemplo de uso:
  alternarCoresTabela();
  
// Função para excluir um equipamento com base no ID
function excluirEquipamento(id: string) {

  // Após a exclusão bem-sucedida, atualize o estado listaBuscaFiltrado
  const equipamentosAtualizados = listaBuscaFiltrado.filter(
    (equip: any) => equip.id !== id
  );

  setlistaBuscaFiltrado(equipamentosAtualizados);
}

  return (
    <>
      <main>
        
        <section className="equipamentos">
          
          <div className="painelEqpm">

            <form method="post" onSubmit={buscarPor}>

            <select defaultValue={"DEFAULT"} name="" id="cad_select_skill" onChange={(e) => setSelect(e.target.value)}>
              <option selected value="DEFAULT" disabled>Selecione</option>
              {
                filtros.map((equip: any, index: number) => {
                  return <option key={index} value={equip}>{equip}</option>
                })
              }
            </select>

            <input className="buscarInput"
             type="search" 
             placeholder="Buscar por filtros ..." 
             onChange={retornoEquipGeral}
             />
            <button type="submit">Buscar</button>

             </form>

            <div className="menu2Bbtn">
              <a
                className="btnNovoEqpm"
                href="../CadastramentoDeEquipamentos/index.html"
              >
                <button>+ Novo Equipamento</button>
              </a>
              <a className="btnEditar" href="">
                <button>Editar</button>
              </a>
              <a className="btnExcluir" href="">
              <button>Excluir</button>
              </a>
            </div>
            <table className="tabelaEqpm">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Fabricante</th>
                  <th scope="col">Data</th>
                  <th scope="col">Consumo</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className= 'tabelaEquip'>
                  {
                    listaBuscaFiltrado.length === 0 ?
                      equip.map((equip: any, index: number) => {
                        return <td  key={index}>

                            <CardEquipamento

                              id={equip.id}
                              modelo={equip.modelo}
                              fabricante={equip.fabricante}
                              data={equip.data}
                              consumo={equip.consumo}
                              valor={equip.valor}
                              
                              

                            />



                          </td>
            }) : listaBuscaFiltrado.map((equip: any, index: number) => {
                            return <td  key={index}>

                              <CardEquipamento

                                id={equip.id}
                                modelo={equip.modelo}
                                fabricante={equip.fabricante}
                                data={equip.data}
                                consumo={equip.consumo}
                                valor={equip.valor}

                              />
                            </td>

                          })
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}

