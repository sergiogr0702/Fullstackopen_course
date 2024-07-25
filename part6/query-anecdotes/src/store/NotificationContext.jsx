import PropTypes from 'prop-types'
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const NotificationContextProvider = ({children}) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch ]}>
            {children}
        </NotificationContext.Provider>
    )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default NotificationContext