import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MyServices from "@/components/MyServices";
import { fetchServicesByFreelancerId } from "@/data-access/service";
import { auth } from "@/lib/auth";

const Dashboard = async () => {
    // Authenticate and get the session
    const session = await auth();

    // Fetch services for the authenticated freelancer
    const freelancerId = Number(session?.user?.id);
    const services = await fetchServicesByFreelancerId(freelancerId);

    return (
        <div className="mx-auto w-full max-w-[970px]">
            <Breadcrumb pageName="Mes Services " />
            <MyServices services={services} />
        </div>
    );
};

export default Dashboard;
