import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { TasksProvider } from '@/context/tasksContext'

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <TasksProvider>
                <Component {...pageProps} />
            </TasksProvider>
        </ThemeProvider>
    )
}
