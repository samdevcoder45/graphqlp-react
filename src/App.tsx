
import { useQuery } from '@apollo/client'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './graphql/queries'
import { useReducer, useState } from 'react'
import Notify from './components/Notify'
import { PersonProps } from './types/person'
import personReducer, { initialState } from './hooks/personReducer'


function App() {
  const [errorMessage,setErrorMessage] = useState<string | null>(null)
  const [isEditing,setEditing] = useState(false)
  const [editingPerson, setEditingPerson] = useState<PersonProps | null>(null)

  const getInitialState=() => {
    if(isEditing && editingPerson){
      return {
        id: editingPerson.id,
        name:editingPerson.name,
        phone: editingPerson.phone,
        street: editingPerson.address.street,
        city: editingPerson.address.city
      }
    } else {
      return initialState
    }
  }
  const [state,dispatch] = useReducer(personReducer, getInitialState())
  const result = useQuery(ALL_PERSONS)

  const notify=(message:string)=>{
    setErrorMessage(message)
    setTimeout(()=>{
       setErrorMessage(null)
    },3000)
  }

  const handleEditChange = (person:PersonProps ) => {
    setEditingPerson(person)
    setEditing(true)

    dispatch({type:'SET_NAME', payload: person.name})
    dispatch({type:'SET_PHONE', payload: person.phone})
    dispatch({type:'SET_STREET', payload: person.address.street })
    dispatch({type:'SET_CITY', payload: person.address.city})
  }

  const handleEditCancel = () => {
    setEditing(false)
    setEditingPerson(null)
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  return (
    <>
     <div>
      <Notify errorMessage={errorMessage}/>
       <Persons 
       persons={result.data.allPersons}
       onEdit={handleEditChange}
       />
       <PersonForm 
        // key={editingPerson ? editingPerson.id :'new'}
         setError={notify} 
         isEditing={isEditing}
         editingPerson={editingPerson!}
         setEditing={setEditing}
         onEditCancel={handleEditCancel}
         state={state}
         dispatch={dispatch}
         />
     </div>
    </>
  )
}

export default App
