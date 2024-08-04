
import { PersonCompProp } from '../types/person'

export default function Person({person, onClose}:PersonCompProp) {
  return (
    <div>
        <h2>{person?.name}</h2>
        <div>
            {person.address.street} {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={onClose}>close</button>
    </div>
  )
}
