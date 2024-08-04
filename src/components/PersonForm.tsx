import {  useMutation } from "@apollo/client"
import React from "react"
import { ALL_PERSONS, CREATE_PERSON, EDIT_NUMBER } from "../graphql/queries"
import { PersonProps } from "../types/person"
import { State } from "../hooks/personReducer"



export default function PersonForm({setError,isEditing,editingPerson,setEditing,onEditCancel, state, dispatch}:{
    setError:(val:string)=>void,
    isEditing:boolean,
    setEditing:(val:boolean)=>void, 
    editingPerson:PersonProps,
    onEditCancel:()=>void,
    state: State,
    dispatch: React.SetStateAction<any>
    }) {

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries:[{query: ALL_PERSONS}],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            setError(messages)
        }
    })

    const [changeNumber] = useMutation(EDIT_NUMBER, {
        refetchQueries:[{query:ALL_PERSONS}],
        onError:(error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            setError(messages)
        }
    })

    const submit= async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const {name,phone, city,street} = state
        
        if(isEditing){
            await changeNumber({variables: {id:editingPerson.id,name,phone,street,city}})
            setEditing(false)
        }else {

            await createPerson({variables: {name,phone,street,city} })
        }

        dispatch({type:'RESET'})
    }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{isEditing ? 'Edit' : 'Create New' }</h2>
        <form onSubmit={submit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-start text-sm font-medium leading-6 text-gray-900">Name</label>
                <input 
                    type="text" 
                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={state.name} 
                    onChange={(e) => dispatch({type:'SET_NAME', payload: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-start text-sm font-medium text-gray-900 leading-6">Phone</label>
                <input 
                    type="text" 
                    className="block w-full rounded-md border-0 py-1.5 px-1
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={state.phone} 
                    onChange={(e) => dispatch({type:'SET_PHONE', payload: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="street" className="block text-start text-sm font-medium text-gray-900 leading-6">Street</label>
                <input 
                    type="text" 
                    className="block w-full rounded-md border-0 py-1.5 px-1
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={state.street}
                    onChange={(e) => dispatch({type:'SET_STREET', payload: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="city" className="block text-start text-sm font-medium text-gray-900 leading-6">City</label>
                <input 
                    type="text" 
                    className="block w-full rounded-md border-0 py-1.5 px-1
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={state.city}
                    onChange={(e) => dispatch({type:'SET_CITY', payload: e.target.value})}
                />
            </div>
            <div>
               <button 
               type="submit" 
               className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold
               leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{ isEditing ? 'Update' :'Save'}</button>
            </div>
            {isEditing && 
            <button 
            type="button" 
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold
               leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={onEditCancel}>
                Cancel
            </button>
            }
        </form>
    </div>
  )
}


