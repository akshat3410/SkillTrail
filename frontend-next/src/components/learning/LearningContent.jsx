import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import { YouTubeCard } from './YouTubeCard'

/**
 * LearningContent - Renders node learning content
 * 
 * Parses content string and renders:
 * - Paragraphs
 * - Code blocks (```language ... ```)
 * - Inline code (`code`)
 * - Headers
 * - Lists
 * - YouTube video cards (enhanced display)
 */
export function LearningContent({ content }) {
  if (!content) return null
  
  // Parse content into blocks
  const blocks = parseContent(content)
  
  return (
    <div className="learning-content">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

/**
 * Parse content string into typed blocks
 */
function parseContent(content) {
  const blocks = []
  const lines = content.split('\n')
  let currentBlock = null
  let inCodeBlock = false
  let codeLanguage = ''
  let codeContent = []
  let inVideoSection = false
  let videoItems = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push({
          type: 'code',
          language: codeLanguage || 'text',
          content: codeContent.join('\n')
        })
        codeContent = []
        inCodeBlock = false
        codeLanguage = ''
      } else {
        // Start code block
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
      }
      continue
    }
    
    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }
    
    // Detect video resources section header
    if (line.includes('Video Resources') && (line.includes('🎬') || line.includes('###'))) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      inVideoSection = true
      videoItems = []
      continue
    }
    
    // Parse video links in video section
    if (inVideoSection) {
      // Empty line - check if we should end the section
      if (!line.trim()) {
        continue // Skip empty lines in video section, don't end yet
      }
      
      // New non-video section header ends video section
      if (line.startsWith('#') && !line.includes('Video')) {
        if (videoItems.length > 0) {
          blocks.push({ type: 'video-section', videos: videoItems })
          videoItems = []
        }
        inVideoSection = false
        // Fall through to process this line normally
      } else {
        // Try to parse as video link
        // Format: 1. **[Title](url)** – Channel (duration)
        const videoPattern = /^\d+[\.\)]\s*\*{0,2}\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\*{0,2}\s*[–\-—]\s*(.+)$/
        const videoMatch = line.match(videoPattern)
        
        if (videoMatch) {
          const restPart = videoMatch[3]
          // Parse channel and optional duration
          const durationMatch = restPart.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
          
          videoItems.push({
            title: videoMatch[1].trim(),
            url: videoMatch[2].trim(),
            channel: durationMatch ? durationMatch[1].trim() : restPart.trim(),
            duration: durationMatch ? durationMatch[2].trim() : null
          })
          continue
        }
        
        // Also try without number prefix: **[Title](url)** – Channel
        const altPattern = /\*{0,2}\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\*{0,2}\s*[–\-—]\s*(.+)/
        const altMatch = line.match(altPattern)
        
        if (altMatch) {
          const restPart = altMatch[3]
          const durationMatch = restPart.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
          
          videoItems.push({
            title: altMatch[1].trim(),
            url: altMatch[2].trim(),
            channel: durationMatch ? durationMatch[1].trim() : restPart.trim(),
            duration: durationMatch ? durationMatch[2].trim() : null
          })
          continue
        }
        
        // If we're in video section but line doesn't match, might be end
        if (line.trim() && !line.match(/^\d+[\.\)]/)) {
          // Non-numbered line that isn't a video - end section
          if (videoItems.length > 0) {
            blocks.push({ type: 'video-section', videos: videoItems })
            videoItems = []
          }
          inVideoSection = false
          // Fall through to process this line normally
        } else {
          continue // Skip unparseable numbered lines
        }
      }
    }
    
    // Empty line
    if (!line.trim()) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }
    
    // Header
    if (line.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({ type: 'h3', content: line.slice(4) })
      currentBlock = null
      continue
    }
    
    if (line.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({ type: 'h2', content: line.slice(3) })
      currentBlock = null
      continue
    }
    
    // List item
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentBlock && currentBlock.type !== 'list') {
        blocks.push(currentBlock)
        currentBlock = { type: 'list', items: [] }
      }
      if (!currentBlock) {
        currentBlock = { type: 'list', items: [] }
      }
      currentBlock.items.push(line.slice(2))
      continue
    }
    
    // Numbered list (but not video links)
    if (/^\d+\.\s/.test(line) && !inVideoSection) {
      if (currentBlock && currentBlock.type !== 'numbered-list') {
        blocks.push(currentBlock)
        currentBlock = { type: 'numbered-list', items: [] }
      }
      if (!currentBlock) {
        currentBlock = { type: 'numbered-list', items: [] }
      }
      currentBlock.items.push(line.replace(/^\d+\.\s/, ''))
      continue
    }
    
    // Regular paragraph
    if (!currentBlock || currentBlock.type !== 'paragraph') {
      if (currentBlock) blocks.push(currentBlock)
      currentBlock = { type: 'paragraph', content: line }
    } else {
      currentBlock.content += ' ' + line
    }
  }
  
  // Push final blocks
  if (currentBlock) blocks.push(currentBlock)
  if (inCodeBlock && codeContent.length > 0) {
    console.warn('Unclosed code block detected in content - pushing partial code block')
    blocks.push({
      type: 'code',
      language: codeLanguage || 'text',
      content: codeContent.join('\n')
    })
  }
  if (videoItems.length > 0) {
    blocks.push({ type: 'video-section', videos: videoItems })
  }
  
  return blocks
}

/**
 * Render inline elements (bold, italic, inline code, links)
 */
function renderInline(text) {
  if (!text) return null
  
  // First handle links: [text](url)
  const linkParts = text.split(/(\[[^\]]+\]\([^)]+\))/)
  
  return linkParts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return (
        <a 
          key={i} 
          href={linkMatch[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#0066cc',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(0, 102, 204, 0.3)'
          }}
        >
          {linkMatch[1]}
        </a>
      )
    }
    
    // Then handle inline code
    const codeParts = part.split(/(`[^`]+`)/)
    
    return codeParts.map((cp, j) => {
      if (cp.startsWith('`') && cp.endsWith('`')) {
        return (
          <code key={`${i}-${j}`} style={{
            fontFamily: 'var(--st-font-body)',
            fontSize: '0.9em',
            padding: '2px 6px',
            background: 'rgba(42, 42, 42, 0.08)',
            borderRadius: '3px',
            color: '#c7254e'
          }}>
            {cp.slice(1, -1)}
          </code>
        )
      }
      
      // Bold
      const boldParts = cp.split(/(\*\*[^*]+\*\*)/)
      return boldParts.map((bp, k) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${i}-${j}-${k}`}>{bp.slice(2, -2)}</strong>
        }
        return bp
      })
    })
  })
}

/**
 * Render a single block
 */
function renderBlock(block, index) {
  switch (block.type) {
    case 'code':
      return (
        <CodeBlock
          key={index}
          code={block.content}
          language={block.language}
        />
      )
    
    case 'video-section':
      return (
        <div 
          key={index}
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0.5) 100%)',
            border: '1px solid rgba(255, 0, 0, 0.1)',
            borderRadius: '12px'
          }}
        >
          <h3 style={{
            fontFamily: 'var(--st-font-display)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--st-ink)',
            margin: '0 0 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span role="img" aria-label="video">🎬</span>
            Video Resources
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {block.videos.map((video, i) => (
              <YouTubeCard key={i} {...video} />
            ))}
          </div>
        </div>
      )
    
    case 'h2':
      return (
        <h2 key={index} style={{
          fontFamily: 'var(--st-font-display)',
          fontSize: '1.4rem',
          fontWeight: 600,
          color: 'var(--st-ink)',
          margin: '2.5rem 0 1.25rem'
        }}>
          {block.content}
        </h2>
      )
    
    case 'h3':
      return (
        <h3 key={index} style={{
          fontFamily: 'var(--st-font-display)',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--st-ink)',
          margin: '2rem 0 1rem'
        }}>
          {block.content}
        </h3>
      )
    
    case 'list':
      return (
        <ul key={index} style={{
          fontFamily: 'var(--st-font-serif)',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: 'var(--st-ink)',
          paddingLeft: '1.5rem',
          margin: '0 0 1.5rem 0'
        }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.625rem' }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
    
    case 'numbered-list':
      return (
        <ol key={index} style={{
          fontFamily: 'var(--st-font-serif)',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: 'var(--st-ink)',
          paddingLeft: '1.5rem',
          margin: '0 0 1.5rem 0'
        }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.625rem' }}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
    
    case 'paragraph':
    default:
      return (
        <p key={index} style={{
          fontFamily: 'var(--st-font-serif)',
          fontSize: '1.0625rem',
          lineHeight: 1.85,
          color: 'var(--st-ink)',
          margin: '0 0 1.5rem 0'
        }}>
          {renderInline(block.content)}
        </p>
      )
  }
}

LearningContent.propTypes = {
  content: PropTypes.string
}

export default LearningContent

