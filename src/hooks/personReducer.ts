export interface State {
    name: string;
    phone: string;
    street: string;
    city: string;
  }
  
export const initialState: State = {
    name:'',
    phone:'',
    street:'',
    city:''
}

type Action = 
 {type:'SET_NAME'; payload:string} 
| {type:'SET_PHONE'; payload:string} 
| {type:'SET_STREET'; payload:string} 
| {type:'SET_CITY'; payload:string} 
| {type:'RESET'}

export default function personReducer(state: State, action:Action): State {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload}
            
        case 'SET_PHONE':
            return {...state, phone: action.payload}
        
        case 'SET_STREET':
            return {...state, street: action.payload}
        
        case 'SET_CITY':
            return {...state, city: action.payload}
        
        case 'RESET':
            return initialState
    
        default:
            return state
    }
}