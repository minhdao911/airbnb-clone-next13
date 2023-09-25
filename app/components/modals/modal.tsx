"use client";

import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel?: string;
  secondaryLabel?: string;
  secondaryAction?: () => void;
  onClose: () => void;
  onSubmit?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryLabel,
  secondaryAction,
  onClose,
  onSubmit,
}: ModalProps) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit && onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  return isOpen ? (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center z-50">
      <div
        className="fixed left-0 right-0 top-0 bottom-0 bg-neutral-800/60"
        onClick={handleClose}
      />
      <div className="md:w-4/6 lg:w-3/6 xl:w-2/5 h-full md:h-auto lg:h-auto">
        {/* CONTENT */}
        <div
          className={`translate duration-300 h-full ${
            show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="translate w-full h-full md:h-auto lg:h-auto bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="relative flex items-center justify-center p-6 border-b-[1px]">
              <button
                className="absolute left-9 p-1 hover:opacity-70 transition"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <p className="text-lg font-semibold">{title}</p>
            </div>
            {/* BODY */}
            <div className="p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="p-6 pt-0 flex-auto">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryLabel && secondaryAction && (
                  <Button
                    type="outline"
                    label={secondaryLabel}
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                  />
                )}
                {actionLabel && (
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
