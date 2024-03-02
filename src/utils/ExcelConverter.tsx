import React, { ReactNode } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface Props {
  jsonData: unknown[] // Your JSON data array,
  className: string
  children: ReactNode
  onClick?: () => void
  id?: string
}

export const DownloadExcelButton: React.FC<Props> = ({
  jsonData,
  className,
  children,
  onClick,
  id,
}) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    saveAs(excelBlob, 'data.xlsx')
    onClick && onClick()
  }

  return (
    <button
      type='button'
      onClick={handleDownload} id={id ? id : ''}
      className='rounded-full bg-orange-500 text-orange-50 py-3 self-end px-8 capitalize font-medium flex items-center gap-2 hover:bg-orange-600 transition-all'>
      {children}
    </button>
  )
}