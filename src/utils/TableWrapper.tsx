import { FC, useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { DownloadExcelButton } from './ExcelConverter'
import { FaFileExcel } from 'react-icons/fa'
import { GenerateId } from './utility'
import { FaPlus } from "react-icons/fa";
import Link from 'next/link'
export const sliceData = (data: any, page: any, rowsPerPage: any) => {
  var setdata = data as any
  var setindexdata = [] as any
  for (let i = 0; i < setdata?.length; i++) {
    var set = setdata[i]
    setindexdata.push({ ...set, sr: i + 1 })
  }
  return Array.isArray(setindexdata) ? setindexdata?.slice((page - 1) * rowsPerPage, page * rowsPerPage) : []
};
export const searchFilterFunction = (text: string, listdata: any, key: string, { curPageNo, filterDataCount }) => {
  if (text) {
    const newData = listdata?.filter(
      function (item: any) {
        const itemData = item?.[key] ? item?.[key].toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    )
    return { filterlist: sliceData(newData, curPageNo, filterDataCount), mainlist: newData }
  } else {
    return { filterlist: sliceData(listdata, curPageNo, filterDataCount), mainlist: listdata }
  }
}
interface TableWrapperProps {
  heading: string
  children: JSX.Element
  addBtnClickFn: any
  addBtnTitle: string
  totalCount: number
  subTotalCount?: number // applicable to some components like parliamentary constituency and assembly constituency
  filterDataCount: number
  changeFilterFn: (val: number) => void
  changePageNo: (val: number) => void
  curPageNo: number
  curDataCount: number
  searchFilterFn: (str: string) => void
  addedFilters?: JSX.Element
  searchFilters?: JSX.Element[]
  moreBtns?: JSX.Element[]
  jsonDataToDownload?: unknown[] | null
  conditionalData?: { jsx: JSX.Element }
  fixedBtnsAtTopRight?: JSX.Element[]
}
const SortFilterKey = GenerateId()
export const TableWrapper: FC<TableWrapperProps> = ({ children, heading, addBtnClickFn, addBtnTitle, totalCount, filterDataCount, changeFilterFn, changePageNo, curPageNo, addedFilters, searchFilterFn, moreBtns, searchFilters, subTotalCount, jsonDataToDownload, conditionalData, fixedBtnsAtTopRight, }) => {
  const searchRef = useRef<HTMLInputElement>(null)
  const paginationBtnsJSX: JSX.Element[] = []
  const [searchFilter, setSearchFilter] = useState('');
  let totalPages = subTotalCount ? Math.ceil(subTotalCount / filterDataCount) : Math.ceil(totalCount / filterDataCount)
  if (!subTotalCount)
    totalPages = totalCount <= filterDataCount ? 0 : totalPages
  else totalPages = subTotalCount <= filterDataCount ? 0 : totalPages
  for (let i = 0; i < totalPages; i++) {
    paginationBtnsJSX.push(
      <button
        key={i}
        value={i + 1}
        onClick={(e) => changePageNo(+(e.target as HTMLButtonElement).value)}
        className={`py-2 px-4 text-gray-800 border-l border-r border-gray-200 ${curPageNo === i + 1 ? 'bg-cyan-400 border-none text-white' : ''
          }`}>
        {i + 1}
      </button>
    )
  }
  useEffect(() => {
    if (totalPages < curPageNo) {
      changePageNo(1)
    }
  }, [curPageNo, totalPages])


  return (
    <>
      <div className='flex justify-between flex-col w-full relative min-h-[410px]   overflow-auto main_scrollbar '>

        <div className='gap-5 w-full'>

          <div className='overflow-hidden flex flex-col flex-1 self-start px-5 border-b py-3 after:h-1/2 after:w-[3px] after:bg-orange-600 
            after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%]
             after:left-0 relative'>

            <div className='flex items-center justify-between gap-3'>
              <h2 className="flex items-center text-[22px] font-semibold capitalize">
                {heading}
              </h2>
              <div className='flex gap-5'>
                {moreBtns}

                {jsonDataToDownload && (
                  <DownloadExcelButton disabled={jsonDataToDownload?.length == 0} jsonData={jsonDataToDownload}>
                    <FaFileExcel className='text-1xl' />
                    <span className=''>
                      download in excel
                    </span>
                  </DownloadExcelButton>
                )}

                {(typeof addBtnClickFn == "function" && typeof addBtnClickFn != "string") && (
                  <button
                    type='button'
                    onClick={addBtnClickFn}
                    className="flex items-center gap-2 flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium"
                  // className='rounded-full bg-orange-500 ml-5 text-orange-50 py-3 self-end px-8 capitalize font-medium flex items-center gap-2 hover:bg-orange-600 transition-all'
                  >
                    <FaPlus className='text-1xl' /> {addBtnTitle}
                  </button>
                )}
                {(typeof addBtnClickFn != "function" && typeof addBtnClickFn == "string" && addBtnClickFn?.length > 0) && (
                  <Link href={addBtnClickFn}>
                    <button
                      type='button'
                      className="flex items-center gap-2 flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium"
                    >
                      <FaPlus className='text-1xl' /> {addBtnTitle}
                    </button>
                  </Link>
                )}
              </div>
            </div>
            {fixedBtnsAtTopRight && (
              <div
                id='hideFixedBtn'
                className='fixed z-[200] top-[120px] right-[63px] flex items-center gap-3 bg-white p-3 shadow-md rounded'>
                {fixedBtnsAtTopRight}
              </div>
            )}
          </div>

          <div id='filterBox' className='flex justify-between mt-5 items-end  px-5 '>
            <section className='flex flex-col gap-3'>
              {conditionalData && conditionalData.jsx}

              <h2 className='text-lg font-semibold'>Filters</h2>
              <div className='flex items-center gap-3'>
                <label htmlFor='filter' className='flex items-center gap-2'>
                  <span>Sort by</span>
                  <select
                    id='filter'
                    key={SortFilterKey}
                    value={filterDataCount}
                    className='py-1 px-3 text-md outline-none border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer'
                    onChange={(e) => changeFilterFn(+e.target.value.toLowerCase())}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value={totalCount && totalCount.toString()}>All</option>
                  </select>
                </label>

                {/* EXTRA FILTERS that are not common */}
                {addedFilters}
              </div>
            </section>

            <section className='flex flex-col gap-5'>
              {/* FILTERS */}
              <div className='flex items-center gap-3 justify-end'>
                {/* SEARCH FILTER */}
                {searchFilters}
                <label className='relative'>
                  <input
                    type='search'
                    ref={searchRef}
                    onChange={(e) => { setSearchFilter(e.target.value.toLowerCase()); searchFilterFn(e.target.value.toLowerCase()) }}
                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none focus:bg-gray-50 focus:border-gray-400 transition-all placeholder:capitalize'
                    placeholder={`Search ${heading.split(' ').at(-1)}`}
                  />
                  <button style={{ display: !searchFilter ? "flex" : "none" }} className='absolute top-[8px] right-2'>
                    <FiSearch className='stroke-gray-400' />
                  </button>
                </label>
              </div>
            </section>
          </div>

          {/* CONTENT */}
          <div className='w-full relative px-5'>
            {children}
          </div>

        </div>

        {/* Bottom nav */}
        <section className='flex justify-between items-start mt-5 px-5 pb-5'>
          <p className='text-gray-500'>{totalCount} entries found</p>

          {/* PAGINATION */}
          {totalPages > 0 && (
            <>
              <nav className='flex items-center overflow-hidden border-gray-300 border rounded-md'>
                {curPageNo !== 1 && (
                  <button
                    onClick={() => {
                      changePageNo(curPageNo - 1)
                    }}
                    className='py-2 px-3 hover:bg-slate-100 transition'>
                    Previous
                  </button>
                )}
                {curPageNo > filterDataCount && (
                  <button
                    onClick={() => {
                      changePageNo(curPageNo - filterDataCount)
                    }}
                    className={`py-2 px-4 border-l border-r border-gray-200 hover:bg-orange-500 hover:text-cyan-50`}>
                    - {filterDataCount}
                  </button>
                )}
                <button
                  className={`py-2 px-4 border-l border-r border-gray-200 bg-orange-500 text-cyan-50`}>
                  {curPageNo}
                </button>
                {curPageNo < totalPages - filterDataCount && (
                  <button
                    onClick={() => {
                      changePageNo(curPageNo + filterDataCount)
                    }}
                    className={`py-2 px-4 border-l border-r border-gray-200 hover:bg-cyan-500 hover:text-cyan-50`}>
                    + {filterDataCount}
                  </button>
                )}
                {curPageNo !== totalPages && (
                  <button
                    onClick={() => {
                      changePageNo(curPageNo + 1)
                    }}
                    className='py-2 px-3 hover:bg-slate-100 transition-all'>
                    Next
                  </button>
                )}
              </nav>
            </>
          )}
        </section>
      </div>
    </>
  )
}
