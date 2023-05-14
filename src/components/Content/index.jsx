import { useEffect, useState, useContext } from 'react'
import { TasksContext } from '@/context/tasksContext'
import Card1 from '@/components/TaskCard/Card1'
import Card2 from '@/components/TaskCard/Card2'
import InfoCard from '../InfoCard'
import BtnFilter from '../Defaults/BtnFilter'

const Content = () => {
    const { data } = useContext(TasksContext)
    return (
        <main
            className="bg-secundary"
            style={{
                gridArea: 'content',
            }}
        >
            {/* Cards com informações sobre as tarefas */}
            <section class="p-2 grid grid-cols-[100px,1fr,1fr,1fr] gap-4 content-start">
                <BtnFilter />
                <InfoCard title="Total de tarefas" content={data?.count} />
                <InfoCard title="Total em aberto" content={data?.countOpen} />
                <InfoCard
                    title="Total finalizadas"
                    content={data?.countFinished}
                />
            </section>

            {/* Cards das tarefas */}
            <section className="gap-4 p-2 grid grid-cols-4 content-start">
                {data &&
                    data?.tasks?.map((task) => (
                        <Card2
                            key={task.taskID}
                            title={task.title}
                            description={task.description}
                            task={task}
                        />
                    ))}
            </section>
        </main>
    )
}

export default Content
