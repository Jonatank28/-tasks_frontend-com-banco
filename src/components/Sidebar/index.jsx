import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Modal from '../Modal'

const Sidebar = () => {
    const [newTask, setNewTask] = useState(false)

    function handleNewTask() {
        setNewTask(true)
    }

    const initialValues = {
        taskName: '',
        taskDescription: '',
        priority: '1',
        tag: '1',
    }

    const validationSchema = Yup.object({
        taskName: Yup.string().required('O nome da tarefa é obrigatório.'),
        taskDescription: Yup.string().required(
            'A descrição da tarefa é obrigatória.'
        ),
        priority: Yup.string().required(
            'A prioridade da tarefa é obrigatória.'
        ),
    })

    const onSubmit = (values, { setSubmitting }) => {
        const newValues = {
            ...values,
            dateCreation: new Date(),
        }
        if (newValues) {
            setSubmitting(true)
            setTimeout(() => {
                setSubmitting(false)
                setNewTask(false)
            }, 200)
        }
        console.log(newValues)
    }

    return (
        <div
            className="bg-secondary flex flex-col justify-between items-center p-2"
            style={{ gridArea: 'sidebar' }}
        >
            <div>
                <h1 className="text-2xl font-bold">SideBar</h1>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleNewTask}>
                    Nova Tarefa
                </button>
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
                                            htmlFor="taskName"
                                            className="font-medium text-lg"
                                        >
                                            Nome da Tarefa
                                        </label>
                                        <Field
                                            type="text"
                                            id="taskName"
                                            name="taskName"
                                            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                        />
                                        <ErrorMessage
                                            name="taskName"
                                            component="div"
                                            className="text-red-600 text-sm mt-1"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="taskDescription"
                                            className="font-medium text-lg"
                                        >
                                            Descrição da Tarefa
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="taskDescription"
                                            name="taskDescription"
                                            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                        />
                                        <ErrorMessage
                                            name="taskDescription"
                                            component="div"
                                            className="text-red-600 text-sm mt-1"
                                        />
                                    </div>

                                    <div className="flex justify-between gap-4 ">
                                        <div className="mb-3 w-full">
                                            <label
                                                htmlFor="priority"
                                                className=" font-medium text-lg"
                                            >
                                                Prioridade
                                            </label>
                                            <Field
                                                as="select"
                                                id="priority"
                                                name="priority"
                                                className="mt-1 block w-full rounded-md p-2"
                                            >
                                                <option value="1">Baixa</option>
                                                <option value="2">Média</option>
                                                <option value="3">Alta</option>
                                            </Field>
                                            <ErrorMessage
                                                name="tag"
                                                component="div"
                                                className="text-red-600 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-3 w-full">
                                            <label
                                                htmlFor="tag"
                                                className=" font-medium text-lg"
                                            >
                                                Tag
                                            </label>
                                            <Field
                                                as="select"
                                                id="tag"
                                                name="tag"
                                                className="mt-1 block w-full rounded-md p-2"
                                            >
                                                <option value="1">
                                                    Sem tag
                                                </option>
                                                <option value="2">
                                                    Pessoal
                                                </option>
                                                <option value="3">
                                                    Trabalho
                                                </option>
                                                <option value="4">Lazer</option>
                                                <option value="5">
                                                    Outros
                                                </option>
                                            </Field>
                                            <ErrorMessage
                                                name="tag"
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
            </div>
        </div>
    )
}

export default Sidebar
