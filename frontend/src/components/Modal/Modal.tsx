import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'

export enum GenericModalButtonTypes {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

export interface GenericModalButtonProps {
    onClick: () => void
    className?: string
    label?: string
    type?: GenericModalButtonTypes
}

export interface GenericModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    buttons?: GenericModalButtonProps[]
}

export default function GenericModal({isOpen, onClose, title, children, buttons}: GenericModalProps) {
    let [open, setOpen] = useState(isOpen)

    function closeModal() {
        setOpen(false)
    }

    function openModal() {
        setOpen(true)
    }

    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {children}
                                    </div>

                                    <div className="mt-4 flex flex-row justify-end space-x-4">
                                        {buttons && buttons.map(button => (
                                            <>
                                                {button.type === GenericModalButtonTypes.SECONDARY &&
                                                    <button
                                                        key={button.label}
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={button.onClick}
                                                    >
                                                        {button.label}
                                                    </button>
                                                }
                                                {button.type === GenericModalButtonTypes.PRIMARY &&
                                                    <button
                                                        key={button.label}
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={button.onClick}
                                                    >
                                                        {button.label}
                                                    </button>
                                                }
                                            </>
                                        ))}

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}