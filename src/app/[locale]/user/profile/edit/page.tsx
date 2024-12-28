import ClientProfile, {type Client} from "@/app/[locale]/user/_components/profile" 
import { auth } from "@/lib/auth"

const EditProfilePage = async() => {
    const session = await auth()
    if(!session?.user)
        return
    const client: Client = {
        id: parseInt(session?.user.id as string),
        image: session?.user.image as string,
        name: session?.user.name as string
    }
    return (
        <ClientProfile client={client} mode='EDIT' />
    )
}

export default EditProfilePage