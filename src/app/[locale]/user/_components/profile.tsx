import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
export type Client = {
    id: number;
    name: string;
    image: string
}

const onSubmit = () => {}
const ClientProfile = ({client, mode} : {client: Client, mode: "READ-ONLY" | "EDIT"}) => {
 return (
    <form>
        { client.image && <Image alt={"Avatar"} src={client.image} width={300} height={300}/>}
        <Input type="text" disabled={mode === "READ-ONLY"} value={client.name} />
    {
        mode === "EDIT" && <Button type="submit">save profile </Button>
    }
    </form>
 )
}

export default ClientProfile
