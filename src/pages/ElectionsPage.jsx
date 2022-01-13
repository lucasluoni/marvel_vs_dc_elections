import React, {useState, useEffect} from 'react'

import {
  apiGetCitiesData, 
  apiGetCandidatesData, 
  apiGetElectionsData,
} from '../services/apiService'

import Header from '../components/containers/Header'
import Main from '../components/containers/Main'
import Select from '../components/containers/Select'
import Election from '../components/containers/Election'
import Candidates from '../components/containers/Candidates'
import Loading from './../components/Laoding'

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

const loadingStyles = css({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  justifyContent: 'center',
  height: '100vh',
  overflow: 'hidden'
})
const errorStyles = css({
  display: 'block',
  width: '25vw',
  margin: '65px auto 0',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#FCA7A7'
})
const errorBody = css({
backgroundColor: 'var(--white-background)',
height: '100vh',
overflow: 'hidden'
})

export default function ElectionsPage() {
  // define os estados iniciais do app
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [initialData, setInitialData] = useState([])
  const [selectedCity, setSelectedCity] = useState({})
  const [candidatesData, setCandidatesData] = useState([])
  const [electionsData, setElectionsData] = useState([])
  const [selectedCityElection, setSelectedCityElection] = useState([])

  useEffect(() => {
    // recebe os dados do back end
    async function getAllData() {
      try {
      const [backendCities, candidatesData] = 
        await Promise.all([apiGetCitiesData(), apiGetCandidatesData()])
        
        setInitialData(backendCities)
        setSelectedCity(backendCities[0])
        setCandidatesData(candidatesData)
        
        const electionsData = await apiGetElectionsData()
        setElectionsData(electionsData)        
        setLoading(false)
      } catch (error) {
        setError(error.message)
      }        
    }
    getAllData()
  }, [])

  useEffect(() => {
        // monta os dados da tela inicial (Asgard) 
        function showInitialCityElections () {
          const asgardCityId = `a27c86ce-d99a-4f4f-8cbb-37302754734e`
          const initialElection = electionsData.filter(election => election.cityId === asgardCityId)
          setSelectedCityElection(initialElection)
        }        
        showInitialCityElections()
  }, [electionsData])

  // gera os dados para os candidatos de acordo à cidade selecionada
  selectedCityElection.map((election) => {
    const candidate = candidatesData.filter(candidate => candidate.id === election.candidateId)
    const [name] = candidate
    election.userName = name.username   
    election.name = name.name
  })

  // o valor do evento capturado (parametro) já vem cercado na funcao 'handleSelectChange' do componente
  function handleChange(newCityId) {
    initialData.map(election => {
      if (newCityId === election.id) {
        setSelectedCity(election)
      }
    })
    setSelectedCityElection(electionsData.filter(election => election.cityId === newCityId)) 
  }  

  // as options que vão popular o select das cidades
  const options = initialData.map(({ id, name }) => ({ id, description: name }))
  
  const {presence} = selectedCity

  let appJsx = (
    <span css={loadingStyles}>
      <Loading />
    </span>
  )

  if (error) {
    appJsx = (
      <span css={errorBody}>
        <span css={errorStyles}>
          {error}
        </span>
      </span>
    )
  }

  if (!loading) {
    appJsx = (
      <>
        <div className='bg-gray-100'>
          <Header>
            Marvel vs DC Elections
          </Header>
          <Main>
            <>

              <Select
                label='Escolha a cidade:'
                value={selectedCity.id}
                onChange={handleChange}
              >
                {/* o children 'options' do select é o array com 
                id e nome das cidades (do map de initialData)  */}
                {options}
              </Select>

              <Election>{selectedCity}</Election>

              {/* o children de Candidates é o array de objetos -> selectedCityElection */}
              <Candidates presence={presence}>{selectedCityElection}</Candidates>

            </>
          </Main>
        </div>
      </>
    )
  }

  return (
    <>{appJsx}</>
  )
    
}