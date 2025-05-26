"use client";
import { Pagination } from "@/types/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { User } from "@/types/users";
import { getUsersList } from "@/services/users";
import useUsersFilters from "../filters/hooks/use-user-filters";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } = useUsersFilters(
    { setPagination: setClientPagination }
  );

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getUsersList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar los users");

        const users = res.response;
        setUsers(users);

        setPagination({ ...clientPagination, total: users.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchUsers = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    users,
    loadingData,
    error,
    pagination,
    filters,
    fetchUsers,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
