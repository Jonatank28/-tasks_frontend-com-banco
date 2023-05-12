import { FaEllipsisH, FaTrashAlt } from 'react-icons/fa'
import { TbSquareRounded } from 'react-icons/tb'
import { useState, useContext, useEffect } from 'react'
import { TasksContext } from '@/context/tasksContext'
import api from '../../../services/api'
import Modal from '../Modal'
import MenuOptionsCard from '../MenuOptions'
import FormEditTask from '../FormEditTask'

const Card = ({ key, title, description, task }) => {
    const { getDataTasks, tags, prioritys } = useContext(TasksContext)
    const [isFavorite, setIsFavorite] = useState(!task.favorite)
    const [isTag, setIsTag] = useState(task.tagID)
    const [clickTag, setClickTag] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [clickPriority, setClickPriority] = useState(false)
    const [menuIsOpenOption, setMenuIsOpenOption] = useState(false)
    const [modalOpenEdit, setModalOpenEdit] = useState(false)
    const [modalOpenView, setModalOpenView] = useState(false)

    //! Atualiza o status de favorito da task / Função que envia para o context
    async function handleClickFavorite() {
        console.log('clicou')
        setIsFavorite(!isFavorite)
        let farovite = isFavorite == true ? 1 : 0
        let id = task.taskID
        await api.put(`/tasks/favorite/${id}`, {
            taskID: task.taskID,
            favorite: farovite,
        })
        getDataTasks()
    }

    //! Abre o menu de tags
    function handleClickTag() {
        setClickTag(!clickTag)
    }

    // //! Atualiza o status de tag da task / Função que envia para o context
    async function handleConfirmTagSelect(tagID) {
        await api.post('/tag', { taskID: task.taskID, tagID: tagID })
        getDataTasks()
        setIsTag(tagID)
    }

    async function handleClickPriority() {
        setClickPriority(!clickPriority)
    }

    //! Atualiza o status de prioridade da task / Função que envia para o context
    async function handlePrioritySelected(id) {
        await api.post('/priority', {
            taskID: task.taskID,
            priorityID: id,
        })
        getDataTasks()
    }

    //! Fecha o menu correspondente ao click fora
    const handleClickOutside = (e) => {
        if (e.target.closest('.relative')) return
        setClickTag(false)
        setClickPriority(false)
        setMenuIsOpenOption(false)
    }
    //! Chama a função que fecha, quando clicar fora / função acima (handleClickOutside)
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    //! Função que deleta a task
    async function handleDeleteTask() {
        await api.delete(`/tasks/${task.taskID}`)
        setModalDelete(false)
        getDataTasks()
    }

    //! Abre o menu de opções do card
    function handleOpenMenu() {
        setMenuIsOpenOption(!menuIsOpenOption)
    }

    //! Abre o modal de edição
    function handleModalEdit() {
        setModalOpenEdit(true)
        setMenuIsOpenOption(false)
    }

    //! Abre o modal de delete
    function handleModalDelete() {
        setModalDelete(true)
        setMenuIsOpenOption(false)
    }

    //! Abre o modal de visualização
    function handleModalView() {
        setModalOpenView(true)
        setMenuIsOpenOption(false)
    }

    return (
        <div
            className={`w-[310px] bg-primary rounded-xl p-4 flex flex-col
                
            `}
            // ${finished == 1 ? 'opacity-50' : ''}
            key={key}
        >
            <div>
                {/* Header */}
                <div className="flex justify-between">
                    <h2 className="text-primary text-lg font-semibold">
                        {title}
                    </h2>
                    {/* Abre menu */}
                    <div className="relative">
                        <FaEllipsisH
                            className="rotate-90 cursor-pointer"
                            onClick={handleOpenMenu}
                        />
                        {/* Menu */}
                        {menuIsOpenOption && (
                            <MenuOptionsCard
                                Delete={handleModalDelete}
                                update={handleModalEdit}
                                view={handleModalView}
                            />
                        )}
                        {/* ----------------------- */}
                        {/*! Modal de opções do card (Update e view) */}
                        {/* ----------------------- */}
                        {/* Modal de view */}
                        {modalOpenView && (
                            <Modal
                                isOpen={modalOpenView}
                                onClose={() => setModalOpenView(false)}
                                title="Visualizar tarefa"
                            >
                                <p>{description}</p>
                            </Modal>
                        )}
                        {/* Modal de update */}
                        {modalOpenEdit && (
                            <Modal
                                isOpen={modalOpenEdit}
                                onClose={() => setModalOpenEdit(false)}
                                title="Editar tarefa"
                            >
                                <FormEditTask
                                    task={task}
                                    setModalOpenEdit={setModalOpenEdit}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
                {/* Content */}
                <div className="mt-4">
                    <p className="text-secondary text-sm mt-2">{description}</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mt-4">
                        {/* Tag */}
                        <div onClick={handleClickTag} className="relative">
                            {/* Abre se clicar na tag */}
                            {tags && clickTag && (
                                <div className="absolute top-4 bg-primary py-1 flex flex-col rounded-lg">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag.tagID}
                                            onClick={() =>
                                                handleConfirmTagSelect(
                                                    tag.tagID
                                                )
                                            }
                                            className="p-1 hover:bg-secundary cursor-pointer flex items-center gap-2 rounded-lg"
                                        >
                                            <TbSquareRounded
                                                className={`h-4 w-4 rotate-45 cursor-pointer
                                    ${
                                        tag.tagID == 2
                                            ? 'pessoal'
                                            : tag.tagID == 3
                                            ? 'trabalho'
                                            : tag.tagID == 4
                                            ? 'lazer'
                                            : tag.tagID == 5
                                            ? 'outros'
                                            : ''
                                    }
                                `}
                                            />
                                            <span className="text-sm">
                                                {tag.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <TbSquareRounded
                                className={`h-4 w-4 rotate-45 cursor-pointer
                                    ${
                                        isTag == 2
                                            ? 'pessoal'
                                            : isTag == 3
                                            ? 'trabalho'
                                            : isTag == 4
                                            ? 'lazer'
                                            : isTag == 5
                                            ? 'outros'
                                            : ''
                                    }
                                `}
                                onClick={handleClickTag}
                            />
                        </div>
                        <div className="flex gap-3 items-center relative">
                            {/* Priority */}
                            <div
                                className={`cursor-pointer`}
                                onClick={handleClickPriority}
                            >
                                <div className="absolute top-6 bg-primary py-1 flex flex-col justify-center items-center w-[40px] gap-1 rounded-lg">
                                    {clickPriority && (
                                        <>
                                            {prioritys.map((priority) => (
                                                <div
                                                    key={priority.priorityID}
                                                    className={`rounded-md text-xs w-full text-center ${
                                                        priority.priorityID == 1
                                                            ? 'border border-green-500 hover:bg-green-500 hover:text-white'
                                                            : priority.priorityID ==
                                                              2
                                                            ? 'border border-yellow-500 hover:bg-yellow-500 hover:text-white'
                                                            : 'border border-red-500 hover:bg-red-500 hover:text-white'
                                                    }`}
                                                >
                                                    <span
                                                        className="text-center"
                                                        onClick={() =>
                                                            handlePrioritySelected(
                                                                priority.priorityID
                                                            )
                                                        }
                                                    >
                                                        {priority.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>

                                <span
                                    className={`h-3 w-3 p-[2px] rounded-md text-xs ${
                                        task.priorityID == 1
                                            ? 'bg-green-500'
                                            : task.priorityID == 2
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    {prioritys &&
                                        prioritys.map((priority) => {
                                            if (
                                                priority.priorityID ==
                                                task.priorityID
                                            ) {
                                                return priority.name
                                            }
                                        })}
                                </span>
                            </div>
                            {/* Favorite */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`h-4 w-4 cursor-pointer text-yellow-500 active:animate-ping
                                    ${
                                        task.favorite == 1
                                            ? 'fill-yellow-500'
                                            : ''
                                    }
                                `}
                                onClick={handleClickFavorite}
                            >
                                <path d="M10 1 L12.31 6.53 L18 7.64 L14.36 12.24 L15.47 18 L10 15.73 L4.53 18 L5.64 12.24 L2 7.64 L7.69 6.53 L10 1 Z"></path>
                            </svg>
                            {/* Delete */}
                            <FaTrashAlt
                                className="h-3 w-3 text-red-500 cursor-pointer"
                                onClick={handleModalDelete}
                            />
                            {modalDelete && (
                                <Modal
                                    isOpen={modalDelete}
                                    onClose={() => setModalDelete(false)}
                                    onSubmitModal={handleDeleteTask}
                                    title="Deseja excluir a tarefa?"
                                    DivClass="flex justify-between items-center"
                                    btn1Class="btn btn-primary"
                                    btn1Text="Cancelar"
                                    btn2Class="btn btn-danger-outline"
                                    btn2Text="Excluir"
                                    btnControl
                                >
                                    <p className="pb-4">
                                        Tem certesa que deseja delelar a tarefa:{' '}
                                        {task.title}
                                    </p>
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
