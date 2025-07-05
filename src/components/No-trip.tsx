function Notrip() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <svg
        width="64"
        height="64"
        fill="none"
        viewBox="0 0 24 24"
        className="mb-4 text-gray-400"
      >
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-7V7a1 1 0 1 1 2 0v6a1 1 0 0 1-2 0Zm1 4a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 17Z"
        />
      </svg>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        No Trips Found
      </h2>
      <p className="text-gray-500 mb-4">
        You haven&apos;t created any trips yet. Start planning your next
        adventure!
      </p>
    </div>
  );
}

export default Notrip;
