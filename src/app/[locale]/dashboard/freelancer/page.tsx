import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProfileBox from "@/components/ProfileBox";
import { fetchFreelancerById } from "@/data-access/freelancer";
import {auth} from "@/lib/auth";


const Profile = async () => {
    const session = await auth();
    const freelancer = await fetchFreelancerById(Number(session?.user?.id));
    return (
            <div className="mx-auto w-full max-w-[970px]">
                <Breadcrumb pageName="Profile" />
                <ProfileBox freelancer={freelancer} />
            </div>
    );
};

export default Profile;

