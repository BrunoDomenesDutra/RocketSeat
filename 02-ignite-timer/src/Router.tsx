import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout/DefaultLayout'
import { History } from './pages/History/History'
import { Home } from './pages/Home/Home'



export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}> {/*As rotas passadas abaixo entraram no Outlet do arquivo DefaultLayout*/}
                <Route path="/" element={<Home />} />
                <Route path='/history' element={<History />} />
            </Route>
        </Routes>
    )
}