import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles';

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}

/*
Esse é o componente onde será exibido todas as nossas 'pages' que serão passadas ao 'Outlet' seguindo
as definições de rotas que estão descritas no Router.tsx
*/