import { useEffect, useState, useContext } from 'react'
import { TasksContext } from '@/context/tasksContext'
import Card1 from '@/components/Card/Card1'
import Card2 from '@/components/Card/Card2'

const Content = () => {
    const { tasks } = useContext(TasksContext)

    return (
        <section
            // className="bg-secundary flex flex-wrap content-start gap-4 p-2"
            className="bg-secundary gap-4 p-2 grid grid-cols-4 content-start"
            style={{
                gridArea: 'content',
            }}
        >
            {tasks.map((task) => (
                <Card2
                    key={task.taskID}
                    title={task.title}
                    description={task.description}
                    task={task}
                />
            ))}
        </section>
    )
}

export default Content
