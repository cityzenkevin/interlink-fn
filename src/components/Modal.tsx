//@ts-nocheck
import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useClickOutside } from "../hooks/useClickOutside";
import { useAppSelector } from "../redux/hook";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: any) => void;
  title: string;
  children: React.ReactNode;
  styles?: string;
}
export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  styles,
}: Props) {
  const modalRef = React.useRef();

  const { loading } = useAppSelector((state) => state.api);

  useClickOutside(() => {
    onClose();
  }, modalRef);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        {/* ... Modal backdrop ... */}
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50"
              aria-hidden="true"
              onClick={onClose}
            />
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
                <div
                  ref={modalRef}
                  className={
                    `w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ` +
                    styles
                  }
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg   flex justify-center font-medium leading-6 text-gray-900"
                  >
                    <span className=""> {title} </span>
                    <div
                      className="ml-auto hover:cursor-pointer"
                      onClick={onClose}
                    >
                      <XMarkIcon className="w-6 text-red-500" />
                    </div>
                  </Dialog.Title>
                  <hr className="mt-2" />
                  <div className="mt-2">{children}</div>

                  <div className="mt-4 flex">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className={`
                        ${
                          loading
                            ? "bg-gray-400 hover:bg-gray-300"
                            : "bg-primary hover:bg-primaryHover  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        }
                        inline-flex ml-auto justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
                         text-white `}
                      onClick={onSubmit}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
