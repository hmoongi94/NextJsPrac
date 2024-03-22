import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer'

export async function POST(req:NextRequest) {
      const formData = await req.formData()
      const question = formData.get('file')
      console.log(question)

  }