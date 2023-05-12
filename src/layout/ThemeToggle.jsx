import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FaSun, FaMoon } from 'react-icons/fa'

const ToggleThemes = ({ className, ...props }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    function handleClickTheme() {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div>
            <button
                style={{ zIndex: '99999' }}
                onClick={handleClickTheme}
                className={className}
                {...props}
            >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    )
}

export default ToggleThemes
