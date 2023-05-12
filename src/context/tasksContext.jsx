import { createContext, useEffect, useState } from 'react'
import api from '../../services/api'

const TasksContext = createContext({})

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState([])
    const [prioritys, setPrioritys] = useState([])

    // //! Busca os dados da API, todas as tasks
    const getDataTasks = async () => {
        await api.get('/tasks').then((response) => {
            setTasks(response.data)
        })
    }

    //! Busca os dados da API, todas as tags
    const getDataTags = async () => {
        await api.get('/tag').then((response) => {
            setTags(response.data)
        })
    }

    //! Busca os dados da API, todas as prioridades
    const getDataPioritys = async () => {
        await api.get('/priority').then((response) => {
            setPrioritys(response.data)
        })
    }

    //! Exucuta a função de busca dos dados da API
    useEffect(() => {
        getDataTasks()
        getDataTags()
        getDataPioritys()
    }, [])

    //! Dados que envio para os componentes
    const values = {
        tasks,
        setTasks,
        getDataTasks,
        tags,
        prioritys,
    }

    return (
        <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
    )
}

export { TasksContext, TasksProvider }
