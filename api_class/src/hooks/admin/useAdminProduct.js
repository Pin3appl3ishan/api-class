import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "../../services/admin/productService";
import { useState } from "react";

export const useAdminProduct = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  
  const query = useQuery({
    queryKey: ["admin_product", pageNumber, pageSize, search], // key to re-run function
    queryFn: () => {
      return getAllProductService({
        page: pageNumber,
        limit: pageSize,
        search: search
      });
    },
    keepPreviousData: true, // cache old data
  });

  const products = useQuery.data?.data || []
  const pagination = query.data?.data?.pagination || {
    page: 1,

  }
  return {
    ...query,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canPreviousPage,
    canNextPage,
    pageSize,
    setPageSize,
    search, 
    setSearch
  }
};
