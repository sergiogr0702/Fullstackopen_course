import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(filterChange(e.target.value))
    }

    const style = {
        marginBottom: '10px',
    }

    return (
        <div style={style}>
            filter <input
                type="text"
                name="filter"
                onChange={handleChange}
            />
        </div>
    )
}

export default Filter