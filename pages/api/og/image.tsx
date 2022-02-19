import chromium from 'chrome-aws-lambda'
import { GetServerSideProps } from 'next'
import puppeteer from 'puppeteer-core'
import { ParsedUrlQuery } from 'querystring'
import '../../component/ogTemplate'
import {htmlStyle} from '../../component/ogTemplate'
import type { NextApiRequest, NextApiResponse } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const Image = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1200, height: 675},
    executablePath: isDev ? "/home/murasame/test/test-nextjs-ogimage/node_modules/puppeteer/.local-chromium/linux-961656/chrome-linux/chrome" : await chromium.executablePath,
    headless: chromium.headless,
  })
  const page = await browser.newPage()
  await page.setContent(htmlStyle , { waitUntil: "domcontentloaded" })
  const buffer = await page.screenshot({ type: "png" })

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=31536000')
  res.end(buffer)
  } catch (e){

  }
}

export default Image