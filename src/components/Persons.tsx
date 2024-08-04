import { useQuery } from "@apollo/client";
import { PersonCompProps } from "../types/person";
import { useState } from "react";
import Person from "./Person";
import { FIND_PERSON } from "../graphql/queries";


export default function Persons({persons,onEdit}:PersonCompProps) {
  const [nameToSearch, setNameToSearch] = useState<string | null>(null)

  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch
  })

  if(nameToSearch && result.data) {
    return (
      <Person
       person={result.data.findPerson}
       onClose={() => setNameToSearch(null)}
      />
    )

  }
  return (
    <div className="px-5 py-1.5 rounded-md border shadow-sm bg-gray-100">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Persons Overview</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {persons.map(p => (
                    <tr key={p.name}>
                          <td className="p-2"> 
                            <p className="text-sm font-semibold leading-6 text-gray-900">{p.name}</p>
                          </td> 
                          <td className="p-2">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{p.phone}</p>
                          </td>
                        <td className="flex p-2 justify-center gap-x-3 items-center">
                        <button
                          className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                          leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                          onClick={() => setNameToSearch(p.name)}>
                            show address
                          </button>
                          <button 
                          className="flex transition duration-150 ease-in-out hover:scale-1.5 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold
                          leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                          onClick={()=>onEdit(p)}>Edit</button>
                        </td>
                      
                    </tr>
                ))}
          </tbody>
        </table>  
    </div>
  )
}
