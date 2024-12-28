import { Link } from "@/i18n/routing";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AnnounceCard = ({ announce }: { announce: Anounce }) => {
  return (
    <Card className="announce-card">
      <CardHeader>
        <CardTitle>{announce.title}</CardTitle>
        <CardDescription>{announce.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/announes/${announce.id}`} className="see-details-link">
          See Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AnnounceCard;
