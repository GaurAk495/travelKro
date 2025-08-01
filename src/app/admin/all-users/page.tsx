import ContentHeader from "../component/ContentHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MdDeleteOutline, MdOutlineAdminPanelSettings } from "react-icons/md";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { formatReadableDate } from "@/utils/formatDate";
import { getAllUsers } from "@/action/alluser";

export interface User {
  $id: string;
  name: string;
  email: string;
  date_joined: string;
  role: "user" | "admin";
  image_url: string;
  itinerary_created: number;
}

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; offset?: number; limit?: number }>;
}) {
  const searchQueryParams = await searchParams;
  const res = await getAllUsers({ searchParams: searchQueryParams });
  if (!res) return;

  return (
    <>
      <ContentHeader page="all-users" />
      <div className="px-4 sm:px-8 my-8">
        <Table className="shadow rounded-4xl ">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead className="text-zinc-600">Name</TableHead>
              <TableHead className="text-zinc-600">Email Address</TableHead>
              <TableHead className="text-zinc-600">Date Joined</TableHead>
              <TableHead className="text-zinc-600">Iteniary Created</TableHead>
              <TableHead className="text-zinc-600">Role</TableHead>
              <TableHead> . </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-zinc-700">
            {res?.users?.map((user, i: number) => (
              <TableRow
                key={user.$id}
                className={cn(i % 2 === 1 ? "bg-white" : "bg-gray-50")}
              >
                <TableCell className="font-medium flex items-center gap-2">
                  <div className="rounded-full w-8 h-8 overflow-hidden">
                    <Image
                      src={user.image_url}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <span>{user.name}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatReadableDate(user.date_joined)}</TableCell>
                <TableCell className="text-center">
                  {/* {user.itinerary_created} */}
                </TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <Badge
                      variant="secondary"
                      className="bg-zinc-100 text-zinc-700 pointer-events-none"
                    >
                      User
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-green-200 text-green-700 pointer-events-none"
                    >
                      <MdOutlineAdminPanelSettings />
                      Admin
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <MdDeleteOutline />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default page;
