import { getAnnounceById } from "@/data-access/public-announes";

const Page = async ({ params }: { params: { announceId: string } }) => {
  const announce = await getAnnounceById(parseInt(params.announceId));
  return (
    <div>
      <h1>{announce.title}</h1>
      <p>{announce.description}</p>
    </div>
  );
};

export default Page;
