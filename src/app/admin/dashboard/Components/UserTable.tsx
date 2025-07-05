import { fetchItninearyCount } from "@/action/tripActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

async function UserTable({ dataObj }: { dataObj: statsData[] }) {
  const users = dataObj[0].users;
  const userData = users?.map((user) => ({
    name: user.name as string,
    image: user.prefs.image_url as string,
    id: user.$id as string,
  }));
  if (!userData) return;
  const usersStats = await fetchItninearyCount(userData);
  return (
    <div className="px-4 sm:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="p-10 bg-white border-2 rounded-xl">
        <h3 className="text-3xl">Latest Users Signup</h3>
        <Separator className="my-4 border" />
        <Table className="bg-white rounded-3xl">
          <TableCaption>A list of your Recent SignUps.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Itineary Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersStats &&
              usersStats.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium flex items-center gap-4">
                    <div className="rounded-full w-10    h-10   overflow-hidden">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span className="text-lg text-zinc-700 ">{user.name}</span>
                  </TableCell>
                  <TableCell className="text-center border">
                    {" "}
                    {user.itineraryCount}{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default UserTable;
