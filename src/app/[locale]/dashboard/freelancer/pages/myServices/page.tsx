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
<<<<<<< HEAD
            <Breadcrumb pageName="Dashboard" />
=======
            <Breadcrumb pageName="Mes Services " />
>>>>>>> b985b85e3af25b1cbba2cd6ca06003361d1877d5
            <MyServices services={services} />
        </div>
    );
};

export default Dashboard;
