import {usePathname, useRouter} from "@/i18n/routing";
import {useSearchParams} from "next/navigation";

export const useCustomRequestParams = (requestParam: string) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    return (param: any) => {
        const prevQuery = searchParams.entries();
        const query = Object.fromEntries(prevQuery);
        router.push({pathname, query: {...query, [requestParam]: param}})
    }
}

export const useClearRequestParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    return () => {
        router.push({pathname})
    }
}