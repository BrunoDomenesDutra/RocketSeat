import { useState } from 'react'
import { defaultTheme } from './styles/themes/default'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { Transactions } from './pages/Transactions/Transactions'


export function App() {

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />


            <Transactions />
        </ThemeProvider>
    )
}


