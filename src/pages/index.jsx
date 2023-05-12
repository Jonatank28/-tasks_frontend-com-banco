import Content from '@/components/Content'
import Sidebar from '@/components/Sidebar'
import ToggleThemes from '@/layout/ThemeToggle'

const index = () => {
    return (
        <main>
            <ToggleThemes className="fixed top-5 right-5" />
            <div
                className="bg-primary h-screen w-screen grid gap-5
                "
                style={{
                    gridTemplateColumns: '250px auto',
                    gridTemplateAreas: '"sidebar content"',
                }}
            >
                <Sidebar />
                <Content />
            </div>
        </main>
    )
}

export default index
