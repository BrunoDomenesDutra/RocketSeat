import { HeaderContainer } from './styles';
import {Timer, Scroll} from 'phosphor-react'

import logoigniter from '../../assets/img/logo-igniter.svg'
import { NavLink } from 'react-router-dom';


export function Header() {
    return (
        <HeaderContainer>
            <img src={logoigniter} alt='logo'/>
            <nav>
                <NavLink to="/" title='Timer'>
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title='Historico'>
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}