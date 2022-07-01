import { Automations, Dashboard, Settings } from './views'
import { connectWebsocket } from './app/websocket'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './components'

const App = () => {
    useEffect(() => {
        connectWebsocket()
    }, [])

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='automations' element={<Automations />} />
                <Route path='settings' element={<Settings />} />
            </Routes>
        </>
    )
}

export default App
