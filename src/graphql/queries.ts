import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
   query {
      allPersons {
      name
      phone
      id  
      address{
      street,
      city
      }
    }
   }
`


export const FIND_PERSON = gql `
  query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch){
     name,
     phone,
     id,
     address {
     street,
     city
     }
  }
  
  }
`

export const CREATE_PERSON = gql`
   mutation createPerson($name:String!, $street: String!, $city: String!, $phone: String) {
     addPerson(
     name: $name,
     street: $street,
     city: $city,
     phone: $phone
     ) {
      name
      phone
      id
      address {
        street
        city
      }
     }
   }
`

export const EDIT_NUMBER = gql `
 mutation changeNumber($id: String!, $name: String!,$phone: String!,$street: String!, $city: String!) {
    editNumber(
    id: $id,
    name: $name,
     phone: $phone, 
     street: $street, 
     city: $city) {
        name
        phone
        address {
        street
        city
     }
    }
 }
`