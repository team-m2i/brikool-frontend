// page.tsx
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SettingBoxes from "@/components/SettingBoxes";
import { auth } from "@/lib/auth";
import { fetchFreelancerById } from "@/data-access/freelancer";

const Settings = async () => {
    const session = await auth();
    const freelancer = await fetchFreelancerById(Number(session?.user?.id));

    return (
        <div className="mx-auto w-full max-w-[1080px]">
            <Breadcrumb pageName="Settings" />
            <SettingBoxes freelancer={freelancer} />
        </div>
    );
};

export default Settings;
