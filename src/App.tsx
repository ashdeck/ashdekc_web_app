// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/Routes'
import { PopupContextProvider } from './context/hooks/usePopUp'
import AuthProvider from './context/hooks/Auth'

function App() {
    return (
    <PopupContextProvider>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </PopupContextProvider>)
}

export default App
