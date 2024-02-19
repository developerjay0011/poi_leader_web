import crypto from 'crypto'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { body } = req

    const id = crypto.randomBytes(8).toString()

    const data = { name: 'gaurav' }

    NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error(err)
  }
}
