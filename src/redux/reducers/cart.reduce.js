export function cartReducer(state=[], action) {
    switch (action.type) {
        case "ADD_TO_CARD":
            return [...state, action.payload]
            
            case "REMOVE_FROM_CARD":
            return state.filter(item=>item.id !== action.payload)
        
            case "REMOVE_ALL":
      return []
        default:return state
            
    }
}