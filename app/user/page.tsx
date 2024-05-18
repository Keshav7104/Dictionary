"use client";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/components/Context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

function page() {
  const params = useSearchParams();
  const route = useRouter();
  const queryUser = params.get("user");
  const [User, __] = useUser();

  useEffect(() => {
    if (User.length === 0 || User !== queryUser) {
      toast.error("User Not Found please login again");
      // route.push("/login");
    } else {
      toast.success(`Hi ${User}...`);
    }
  }, [User, queryUser, route]);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 "
                href="#"
              >
                <ListIcon className="h-4 w-4" />
                My Words
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                href="#"
              >
                <PlusIcon className="h-4 w-4" />
                Add New Word
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                href="#"
              >
                <PlusIcon className="h-4 w-4" />
                Add New Meaning
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">My Words</h1>
            <Link className="ml-auto btn btn-primary" href="#">
              Add New Word
            </Link>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead>Example</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Serendipity</TableCell>
                  <TableCell>A happy accident or pleasant surprise</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ephemeral</TableCell>
                  <TableCell>Lasting for a very short time</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quixotic</TableCell>
                  <TableCell>Extremely idealistic and impractical</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Melancholic</TableCell>
                  <TableCell>
                    Characterized by sadness, gloom, and depression
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;


function DeleteIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function ListIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function PlusIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
