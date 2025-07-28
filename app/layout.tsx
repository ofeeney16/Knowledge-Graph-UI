import { Metadata } from 'next'
import ThemeRegistry from './ThemeRegistry'
import './global.css'
import { fetch_kg_schema } from '@/utils/initialize'
import React from 'react'
import Head from 'next/head'

export async function generateMetadata(): Promise<Metadata> {
 
  // fetch data
  const {header} = await fetch_kg_schema()
  // optionally access and extend (rather than replace) parent metadata
  const metadata: Metadata = {
    title: header.icon.faviconTitle || header.title,
    description: 'Search for subnetworks within the KEA3 GRN by entering one or two kinases. The background GRN contains 42,322 signed and directed kinase-kinase regulatory relationships between 20,659 source and target human kinases and phosphosites.',
    icons: {
      icon: header.icon.favicon
    },
    openGraph: {
      title: 'KEA-KG',
      description: 'Search for subnetworks within the KEA3 GRN by entering one or two kinases. The background GRN contains 42,322 signed and directed kinase-kinase regulatory relationships between 20,659 source and target human kinases and phosphosites.',
      url: 'https://chea-kg.maayanlab.cloud/',
      siteName: 'KEA-KG',
      images: [
        {
          url:'https://chea-kg.maayanlab.cloud/hgrnchear_logo.png',
          width: 1024,
          height: 998
        }
      ],
      locale:'en_US',
      type: 'website'
    }

  }
  return metadata
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const schema = await fetch_kg_schema()
  return (
    <html lang="en">
        <body>
          <ThemeRegistry options={{ key: 'mui' }} theme={schema.ui_theme || "cfde_theme"}>
            {children}
          </ThemeRegistry>
        </body>
    </html>
  )
}
