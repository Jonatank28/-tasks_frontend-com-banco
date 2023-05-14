import { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Modal from '../Modal'
import api from '../../../services/api'
import { TasksContext } from '@/context/tasksContext'
import { AiOutlinePlus } from 'react-icons/ai'

const Sidebar = () => {
    const { getDataTasks } = useContext(TasksContext)
    const [newTask, setNewTask] = useState(false)

    function handleNewTask() {
        setNewTask(true)
    }

    const initialValues = {
        title: '',
        description: '',
        priorityID: '1',
        tagID: '1',
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('O nome da tarefa é obrigatório.'),
        description: Yup.string().required(
            'A descrição da tarefa é obrigatória.'
        ),
        priorityID: Yup.string().required(
            'A prioridade da tarefa é obrigatória.'
        ),
    })

    //!  Função para enviar os dados do formulário para a API para criar uma nova tarefa
    const onSubmit = (data, { setSubmitting }) => {
        api.post('/tasks', data)
            .then((response) => {
                if (data) {
                    setSubmitting(true)
                    setNewTask(false)
                    getDataTasks()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //! Função para criar uma nova tarefa ao pressionar Ctrl + /
    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === '/') {
                if (event.ctrlKey) {
                    handleNewTask()
                }
            }
        }
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return (
        <>
            <div
                className=" flex bg-secundary flex-col justify-between items-center pb-2"
                style={{ gridArea: 'sidebar' }}
            >
                <div className="flex gap-2 items-center bg-secundary">
                    <img
                        src="https://github.com/Jonatank28.png"
                        alt="Foto de perfil"
                        className="h-10 w-10 rounded-full"
                    />
                    <h1 className="text-1xl font-bold">Bem vindo Jonatan</h1>
                </div>
                <div
                    className="w-[90%] btn btn-primary cursor-pointer flex items-center justify-center gap-2"
                    onClick={handleNewTask}
                >
                    <AiOutlinePlus />
                    <span>Nova Tarefa / Ctr + /</span>
                </div>
            </div>
            {newTask && (
                <Modal
                    isOpen={newTask}
                    onClose={() => setNewTask(false)}
                    title="Nova Tarefa"
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="font-medium text-lg"
                                    >
                                        Nome da Tarefa
                                    </label>
                                    <Field
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="font-medium text-lg"
                                    >
                                        Descrição da Tarefa
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </div>

                                <div className="flex justify-between gap-4 ">
                                    <div className="mb-3 w-full">
                                        <label
                                            htmlFor="priorityID"
                                            className=" font-medium text-lg"
                                        >
                                            Prioridade
                                        </label>
                                        <Field
                                            as="select"
                                            id="priorityID"
                                            name="priorityID"
                                            className="mt-1 block w-full rounded-md p-2"
                                        >
                                            <option value="1">Baixa</option>
                                            <option value="2">Média</option>
                                            <option value="3">Alta</option>
                                        </Field>
                                        <ErrorMessage
                                            name="priorityID"
                                            component="div"
                                            className="text-red-600 text-sm mt-1"
                                        />
                                    </div>

                                    <div className="mb-3 w-full">
                                        <label
                                            htmlFor="tagID"
                                            className=" font-medium text-lg"
                                        >
                                            Tag
                                        </label>
                                        <Field
                                            as="select"
                                            id="tagID"
                                            name="tagID"
                                            className="mt-1 block w-full rounded-md p-2"
                                        >
                                            <option value="1">Sem tag</option>
                                            <option value="2">Pessoal</option>
                                            <option value="3">Trabalho</option>
                                            <option value="4">Lazer</option>
                                            <option value="5">Outros</option>
                                        </Field>
                                        <ErrorMessage
                                            name="tagID"
                                            component="div"
                                            className="text-red-600 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        className="btn btn-danger-outline"
                                        onClick={() => setNewTask(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? 'Salvando...'
                                            : 'Salvar'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}
        </>
    )
}

export default Sidebar
