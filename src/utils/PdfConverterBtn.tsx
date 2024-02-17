import React, { ReactNode } from 'react'
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import { Html, renderHtml } from 'react-pdf-html'
import { dateConverterNumeric } from './utility'
import { renderToStaticMarkup } from 'react-dom/server'

const styles = StyleSheet.create({
  letterPage: {
    flexDirection: 'column',
    gap: '1cm',
    lineHeight: 1.5,
    backgroundColor: '#fff',
    padding: '2.54cm',
    fontSize: '12pt',
  },
  content: {
    fontSize: 16,
  },
  no: {
    alignSelf: 'flex-end',
  },
  bold: {
    fontWeight: 'bold',
  },
  subject: {
    flexDirection: 'row',
    gap: '5px',
  },
  body: {
    marginTop: '.25cm',
  },
})

interface PDFData {
  no: string
  date: string
  name: string
  designation: string
  subject: string
  description: string
  children?: ReactNode
}

const PdfConverterBtn: React.FC<PDFData> = ({ children, ...props }) => {
  return (
    <PDFDownloadLink
      document={<MyDocument {...props} />}
      fileName='converted.pdf'>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : children
      }
    </PDFDownloadLink>
  )
}

const MyDocument: React.FC<PDFData> = ({
  no,
  date,
  designation,
  name,
  subject,
  description,
}) => {
  const html = renderToStaticMarkup(
    <div className='letter_preview'>
      <p className='self-end'>
        req/comp no/{dateConverterNumeric(new Date().toDateString())}
      </p>

      <div className='flex flex-col capitalize'>
        <strong>To</strong>

        <strong>{name}</strong>
        <strong>{designation}</strong>
      </div>

      <p className='flex gap-2'>
        <strong>Subject:</strong>
        <span>{subject}</span>
      </p>

      <div className='text-justify'>
        <p>
          <strong className=''>Dear Sir/{"Ma'am"},</strong>
        </p>
        <div
          className='mt-[.25cm] desc'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  )

  return (
    <Document>
      <Page size='A4' style={styles.letterPage}>
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}

export default PdfConverterBtn