import React from "react";

interface ModalProps {
    visible: boolean;
    title: string;
    onCancel: () => void;
    onOk: () => void;
    children: React.ReactNode;
}
export const Modal:React.FC<ModalProps> = (props: ModalProps) => {
    const { visible, onCancel, children } = props;
    return (
        <div onClick={(e)=>{
            if(e.target === e.currentTarget) {
                onCancel();
            }
        }} hidden={!visible} className="h-full w-full absolute top-0 left-0 backdrop-blur-sm backdrop-opacity-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="h-[85%] w-[70%] p-5 bg-white rounded-md border-2 ml-56 relative overflow-scroll">
                <div className="absolute right-4 top-2 cursor-pointer" onClick={()=>onCancel()}>X</div>
                {children}
            </div>
        </div>
    );
}