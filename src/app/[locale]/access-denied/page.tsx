"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "@/i18n/routing";


function Page() {
    const router = useRouter();
    return (
        <section className={"w-full min-h-screen flex items-center justify-center"}>
            <div className={"rounded-3xl shadow p-12 flex items-center justify-center flex-col gap-6"}>
                <Image src={"/images/gifs/access-denied.gif"} alt={"Access Denied"} width={200} height={200}/>
                <h1 className={"text-red-500 font-extrabold text-3xl uppercase"}>Access Denied</h1>
                <p className={"secondary-text text-justify w-96"}>
                    You tried to access a page that you dont have permission to view. This might be because you&quot;re not logged in, your account lacks the necessary privileges, or the page has restricted access. Please check your credentials or contact support if you believe this is an error.
                </p>
                <Button onClick={() => router.back()} variant={"destructive"} className={"py-2 px-6 self-end"}> Return</Button>
            </div>
        </section>
    );
}

export default Page;