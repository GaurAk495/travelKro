import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

async function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="pagination flex items-center justify-center my-7 gap-3">
      {currentPage <= 1 ? (
        <Button
          className="bg-blue-500 text-white py-2 text-center w-24 rounded-2xl"
          disabled
        >
          Previous
        </Button>
      ) : (
        <Link
          href={`/trips?page=${currentPage - 1}`}
          className="bg-blue-500 text-white py-2 text-center w-24 rounded-2xl"
        >
          Previous
        </Link>
      )}
      <span className="mx-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage >= totalPages ? (
        <Button
          className="bg-blue-500 text-white py-2 text-center w-24 rounded-2xl"
          disabled
        >
          Next
        </Button>
      ) : (
        <Link
          className="bg-blue-500 text-white py-2 text-center w-24 rounded-2xl"
          href={`/trips?page=${currentPage + 1}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
