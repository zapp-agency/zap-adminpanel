import Pagination from '@/components/ui/Pagination/Pagination';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/pagination')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 10; // Example: Adjust based on your data

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Page changed to: ${page}`); // Debugging
  };

  return (
    <div className="App">
      <h1 className="my-4 text-center text-2xl">Pagination Example</h1>
      <p className="text-center">Current Page: {currentPage}</p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
