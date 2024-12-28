// TODO: Please add the UI + Code To get the public profile of the freelancers - Portfolio

//  this code was just to set ou on the trail
type Freelancer = {
    id : number,
    name: string,
    title: string,
    description: string,
    avatar: string
}
const getFreelancerById = async(id: number) => ({
    id: id,
    name: 'John Doe',
    title: 'Full Stack Developer',
    description: 'John is a full stack developer with 10 years of experience',
    avatar: 'https://randomuser.me/api/portraits'
})

async function Page({params: {freelancerId}}: {params: {freelancerId: string }}) {
    const freelancer = await getFreelancerById(+freelancerId);
    return (
        <div>
            {JSON.stringify(freelancer)}
        </div>
    );
}

export default Page;