import React from "react";
import { useAdminProduct } from "../../hooks/admin/useAdminProduct";

export const ProductTable = () => {
  const {
    data,
    error,
    isPending,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canPreviousPage,
    canNextPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct();

  if (error) return <>{error.message}</>;
  if (isPending) return <>Loading...</>;

  const handlePrev = () => {
    if (canPreviousPage) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canPreviousPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = (e) => {
    setPageNumber(1);
    setSearch(e.target.value);
  };

  return (
    <div>
      ProductTable
      <div>
        <label>Show</label>
        <select
          value={pagination.limit}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <label>Search</label>
        <input onChange={handleSearch} value={search}></input>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination control */}
      <div className="mt-4 flex items-center justify-between">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          Back
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPage}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}></button>
      </div>
    </div>
  );
};
