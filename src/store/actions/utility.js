const updateState = (state,updates) => {
    return {
        ...state,
        ...updates
    }
}
export default updateState