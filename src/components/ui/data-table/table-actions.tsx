'use client'

import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
interface IProps{
    handleEdit?: ()=>void;
    handleDelete?: ()=>void;
}

export function TableAction({handleDelete, handleEdit}: IProps){
    return <div className="flex gap-2 justify-center">
        <button onClick={handleEdit} className="border border-green-500 p-2 rounded-lg">  
            <FiEdit className=" text-green-500" size={16} />
        </button>
        <button onClick={handleDelete} className="border border-red-500 p-2 rounded-lg">  
            <AiFillDelete className=" text-red-500"  size={16} />
        </button>
        
    </div>
}