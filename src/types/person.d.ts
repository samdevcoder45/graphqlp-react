interface AddressProps {
    street:string 
    city:string
  }
  export interface PersonProps {
    id:string
    name:string 
    phone:string
    address:AddressProps
  }

  export interface PersonCompProps {
      persons:PersonProps[],
      onEdit:(val:PersonProps)=>void
  }

  export interface PersonCompProp {
    person:PersonProps,
    onClose:()=>void
  }
  