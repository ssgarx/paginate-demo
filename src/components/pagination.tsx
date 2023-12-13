import React, { useMemo } from "react"
import { getNumberOfPages, joinClassNames, range } from "../utils/index"
type PaginationProps = {
  pageSize: number
  totalCount: number
  currentPageIndex: number
  showFooterText?: boolean
  onChangePage: (pageIndex: number) => void
}

const Pagination = ({
  pageSize,
  totalCount = 0,
  currentPageIndex = 0,
  showFooterText,
  onChangePage,
}: PaginationProps) => {
  const numPages = getNumberOfPages(totalCount, pageSize)
  const isLesserDisabled = currentPageIndex === 0 || totalCount === 0
  const isGreaterDisabled =
    currentPageIndex === numPages - 1 || totalCount === 0

  const handlePrevious = React.useCallback(
    () => onChangePage(currentPageIndex - 1),
    [currentPageIndex, onChangePage]
  )

  const handleNext = React.useCallback(
    () => onChangePage(currentPageIndex + 1),
    [currentPageIndex, onChangePage]
  )

  const handlePageChange = React.useCallback(
    (page: number) => onChangePage(page),
    [onChangePage]
  )

  const handleFirstPage = React.useCallback(
    () => onChangePage(0),
    [onChangePage]
  )

  const handleLastPage = React.useCallback(
    () => onChangePage(numPages - 1),
    [numPages, onChangePage]
  )

  const siblingCount = 1
  const DOTS = "..."
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPageIndex + 2*DOTS
    const totalPageNumbers = siblingCount + 6

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [0..numPages-1]
    */
    if (totalPageNumbers >= numPages) {
      return range(0, numPages - 1)
    }

    const leftSiblingIndex = Math.max(currentPageIndex - siblingCount, 0)
    const rightSiblingIndex = Math.min(
      currentPageIndex + siblingCount,
      numPages - 1
    )

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 1
    const shouldShowRightDots = rightSiblingIndex < numPages - 3

    const firstPageIndex = 0
    const lastPageIndex = numPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(0, leftItemCount - 1)

      return [...leftRange, DOTS, lastPageIndex]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(numPages - rightItemCount, lastPageIndex)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages, siblingCount, currentPageIndex])

  if (numPages == 1) return
  return (
    <div
      className={joinClassNames(
        " items-center p-2 ",
        showFooterText ? "justify-between" : "justify-end"
      )}
    >
      {showFooterText && (
        <p className="text-gray-500 text-xs text-center">
          Showing {currentPageIndex * pageSize + 1} to{" "}
          {Math.min(pageSize * (currentPageIndex + 1), totalCount)} of{" "}
          {totalCount} results.
        </p>
      )}
      <div className="flex items-center text-gray-400 justify-center space-x-4">
        <button
          className="disabled:cursor-not-allowed "
          onClick={handleFirstPage}
          disabled={currentPageIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="disabled:cursor-not-allowed "
          disabled={isLesserDisabled}
          onClick={handlePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {paginationRange.map((page: any) => {
          if (page == DOTS) {
            return DOTS
          }
          return (
            <button key={page} onClick={() => handlePageChange(page)}>
              <span
                className={`${
                  page == currentPageIndex
                    ? " font-bold text-gray-100 "
                    : " font-medium   "
                }`}
              >
                {page + 1}
              </span>
            </button>
          )
        })}
        <button
          className="disabled:cursor-not-allowed "
          disabled={isGreaterDisabled}
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPageIndex === numPages - 1}
          className="disabled:cursor-not-allowed "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
