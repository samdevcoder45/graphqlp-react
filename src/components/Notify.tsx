export default function Notify({errorMessage}:{errorMessage:any}) {
    if(!errorMessage){
        return null
    }
  return (
    <div style={{color:'red'}}>{errorMessage}</div>
  )
}
