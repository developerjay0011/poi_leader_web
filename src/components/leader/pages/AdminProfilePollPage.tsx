'use client'
import { FC, useState } from 'react'
import { ManagePollsForm } from '../forms/PollsForm'
import { PollsTable } from '@/components/posts/polls/PollsTable'
import { AnimatePresence } from 'framer-motion'
import { dateTimeConverter } from '@/utils/utility'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'
import { cusSelector } from '@/redux_store/cusHooks'

export const AdminProfilePollsPage: FC = () => {
  const [showAddPollForm, setShowAddPollForm] = useState(false)
  const { poll } = cusSelector((state) => state.poll);
  const [searchFilter, setSearchFilter] = useState('');
  const [curPageNo, setCurPageNo] = useState(1)
  const [filterDataCount, setFilterAmount] = useState(5)
  const changeFilterData = (str: string) => setSearchFilter(str)
  const changeCurPageNo = (page: number) => setCurPageNo(page)
  const changeFilterCount = (val: number) => {
    setFilterAmount(val)
    setCurPageNo(1)
  }
  return (
    <>
      <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start m-5'>
        <TableWrapper
          heading='Manage Polls'
          addBtnTitle='add Poll'
          addBtnClickFn={() => setShowAddPollForm(true)}
          curDataCount={1}
          totalCount={searchFilterFunction(searchFilter, poll, "title", { curPageNo, filterDataCount })?.mainlist?.length}
          changeFilterFn={changeFilterCount}
          filterDataCount={filterDataCount}
          changePageNo={changeCurPageNo}
          curPageNo={curPageNo}
          searchFilterFn={changeFilterData}
          jsonDataToDownload={null}
        >
          <PollsTable
            polls={searchFilterFunction(searchFilter, poll, "title", { curPageNo, filterDataCount })?.filterlist}
          />
        </TableWrapper>
      </div>

      <AnimatePresence>
        {showAddPollForm && (
          <ManagePollsForm
            onClose={() => setShowAddPollForm(false)}
            submitting={false}
            heading='create poll'
            expiresAt={dateTimeConverter(new Date().toString(), 4)}
            publishDate={dateTimeConverter(new Date().toString(), 0)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const genId = () => {
  let count = 0
  return () => {
    return (++count).toString()
  }
}

const idGen1 = genId()
const idGen2 = genId()
