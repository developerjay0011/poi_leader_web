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
        {/* <View>
          <Text style={styles.no}>
            {dateConverterNumeric(new Date(date).toDateString())}
          </Text>
        </View>

        <View>
          <Text style={styles.bold}>To</Text>
          <Text style={styles.bold}>{name}</Text>
          <Text style={styles.bold}>{designation}</Text>
        </View>

        <View style={styles.subject}>
          <Text style={styles.bold}>Subject:</Text>

          <Text>{subject}</Text>
        </View>

        <View>
          <Text style={styles.bold}>Dear Sir/{"Ma'am"}:</Text>
          <Text style={{ fontSize: '12pt' }}>
            <Html>{description}</Html>
          </Text>
        </View> */}
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}

export default PdfConverterBtn

{
  /* <div className='letter_preview'>
              <p className='self-end'>
                req/comp no/{dateConverterNumeric(new Date().toDateString())}
              </p>

              <div className='flex flex-col capitalize'>
                <strong>To</strong>
                {to && (
                  <>
                    <strong>{to.name}</strong>
                    <strong>{to.designation}</strong>
                  </>
                )}
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
                  className='mt-[.25cm]'
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>

              <div className='self-end'>
                <strong className='block'>Your Sincerely,</strong>
                {signature.length > 0 && (
                  <Image
                    src={signature}
                    width={1000}
                    height={1000}
                    alt='signature'
                    className='w-full h-[4cm] object-contain'
                  />
                )}
                <p>{userDetails?.fullName}</p>
              </div>

              {attachments !== 0 && (
                <p className='mt-auto text-center'>{attachments} attachments</p>
              )}
            </div> */
}
