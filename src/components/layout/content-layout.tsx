'use client'

import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

interface IProps{
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode
}
export function ContentLayout({title, children, onClick}:IProps){
    return (
        <div className="px-5 lg:px-10">
            <div className="flex justify-between my-3">
                <h2 className=" text-xl lg:text-4xl font-bold">{title}</h2>
                <Button onClick={onClick} className="bg-purple-800 hover:bg-purple-600">Create</Button>
            </div>
            <div className="mt-10">{children}</div>
        </div>
    )
}