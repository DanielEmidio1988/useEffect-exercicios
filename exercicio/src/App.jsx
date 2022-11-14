import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
      if(tarefas.length>0){
      const listaStringTarefa = JSON.stringify(tarefas)
      localStorage.setItem("tarefas",listaStringTarefa)
    }
    },[tarefas])

  useEffect(() => {

    const novaVariavel = JSON.parse(localStorage.getItem("tarefas"))
      if(novaVariavel !== null){
        setTarefa(novaVariavel)
      }   
  },[])

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }

  const criaTarefa = (e) => {
    const copiaTarefas = [...tarefas]
    const novaTarefa = {
      id: Date.now(),
      texto: inputValue,
      completa: false,
      }
    copiaTarefas.push(novaTarefa)
    setTarefa(copiaTarefas)
    setInputValue("")
    
  }

  const selectTarefa = (id) => {
    const novaTarefaListada = tarefas.map((item)=>{
      if(id === item.id){
        const novaTarefa ={
          ...item,
          completa: !item.completa
        } 
        return novaTarefa
      }else{
        return item
      }

    })
    setTarefa(novaTarefaListada)
  }

  const onChangeFilter = (event) => {
      setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} id="inputValue" texto="inputValue" onChange={onChangeInput} placeholder="Insira a Tarefa"/>
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
