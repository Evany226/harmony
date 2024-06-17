import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import {PlusCircleIcon} from '@heroicons/react/24/solid'


export default function SideNav () {
    return (
        <ScrollArea className="flex-col h-full w-[5.5rem] fixed top-0 left-0 bg-zinc-900">
            <section className="flex flex-col items-center w-full justify-center mt-2 -b">
                <h1 className="text-gray-300 text-sm font-semibold">Harmony</h1>
                <Image
                    src="/logo-past.png"
                    className="border-b border-zinc-600"
                    width={60}
                    height={60}
                    alt="Logo"
                />
            </section>

            <section className="flex flex-col h-full w-full items-center mt-2">
                <Image
                    src="/harmony-logo.png"
                    width={60}
                    height={60}
                    alt="Logo"
                />

                <PlusCircleIcon className="w-16 text-zinc-700 hover:text-zinc-600 cursor-pointer"/>

            </section>
        </ScrollArea>
    )
}