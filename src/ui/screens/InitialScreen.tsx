import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'
import { NavigationProp } from '../../navigationTypes'

export const InitialScreen = (props: {navigation: NavigationProp<'Init'>}) => {
    const name = useSelector((state: RootState) => state.identity.name)
    name === ''
        ? props.navigation.replace('Welcome')
        : props.navigation.replace('Home')
    return null
}
