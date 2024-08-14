import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}
