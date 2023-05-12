import Card from '@/components/Card'
import { useEffect, useState, useContext } from 'react'
import { TasksContext } from '@/context/tasksContext'

const Content = () => {
    const { tasks } = useContext(TasksContext)

    return (
        <section
            className="bg-secundary flex flex-wrap content-start gap-4 p-2"
            style={{
                gridArea: 'content',
            }}
        >
            {tasks.map((task) => (
                <Card
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
