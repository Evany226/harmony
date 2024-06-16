import Image from "next/image"
import {noto} from "@/app/ui/fonts";

export default function SideNav () {
    return (
        <aside className="flex-col h-full w-20 fixed top-0 left-0 bg-zinc-900">
            <section className="flex flex-col items-center w-full justify-center mt-2 -b">
                <h1 className={`${noto.className} text-gray-300 text-sm font-semibold`}>Harmony</h1>
                <Image
                    src="/harmony-logo.png"
                    className="border-b border-zinc-600"
                    width={60}
                    height={60}
                    alt="harmony=logo"
                />
            </section>

            <section className="flex flex-col h-full w-full items-center mt-2">
                <Image
                    src="/harmony-logo.png"
                    width={60}
                    height={60}
                    alt="harmony=logo"
                />
                <Image
                    src="/harmony-logo.png"
                    width={60}
                    height={60}
                    alt="harmony=logo"
                />
                <Image
                    src="/harmony-logo.png"
                    width={60}
                    height={60}
                    alt="harmony=logo"
                />
            </section>
        </aside>
    )
}