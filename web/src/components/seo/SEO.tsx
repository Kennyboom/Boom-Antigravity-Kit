import { Helmet } from 'react-helmet-async'
import { SITE_URL, DEFAULT_IMAGE, SITE_NAME } from './seo-config'

export interface SEOProps {
  title: string
  description: string
  pathname?: string
  image?: string
  noindex?: boolean
}

export function SEO({ 
  title, 
  description, 
  pathname = '', 
  image = DEFAULT_IMAGE,
  noindex = false,
}: SEOProps) {
  const fullTitle = title === SITE_NAME 
    ? title 
    : `${title} - ${SITE_NAME}`
  
  const canonicalUrl = `${SITE_URL}${pathname}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional Meta */}
      <meta name="author" content="Anthropic" />
      <meta name="keywords" content="AI, coding assistant, agents, Cursor, Claude, GitHub Copilot, development workflow, orchestration" />
    </Helmet>
  )
}
