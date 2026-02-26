import PropTypes from 'prop-types'

/**
 * YouTubeCard - Beautiful video link card
 * 
 * Displays YouTube videos with:
 * - Thumbnail preview (generated from video ID)
 * - Play button overlay
 * - Title and channel name
 * - Duration badge
 */
export function YouTubeCard({ url, title, channel, duration }) {
  // Extract video ID from YouTube URL
  const videoId = extractVideoId(url)
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
        e.currentTarget.style.borderColor = '#ff0000'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        width: '120px',
        height: '68px',
        borderRadius: '6px',
        overflow: 'hidden',
        background: '#1a1a1a'
      }}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ff0000, #cc0000)'
          }}>
            <PlayIcon size={24} />
          </div>
        )}
        
        {/* Play button overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease'
        }}>
          <PlayIcon size={14} />
        </div>

        {/* Duration badge */}
        {duration && (
          <span style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            padding: '2px 4px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            borderRadius: '3px'
          }}>
            {duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h4 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#1a1a1a',
          margin: 0,
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {title}
        </h4>
        
        {channel && (
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            color: '#666',
            margin: '4px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <YouTubeIcon size={12} />
            {channel}
          </p>
        )}
      </div>
    </a>
  )
}

// Extract video ID from various YouTube URL formats
function extractVideoId(url) {
  if (!url) return null
  
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  
  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]
  
  // youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/embed\/([^?]+)/)
  if (embedMatch) return embedMatch[1]
  
  return null
}

// Play icon SVG
function PlayIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// YouTube icon SVG
function YouTubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#ff0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

YouTubeCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channel: PropTypes.string,
  duration: PropTypes.string
}

/**
 * VideoResourcesSection - Container for multiple video cards
 */
export function VideoResourcesSection({ videos }) {
  if (!videos || videos.length === 0) return null

  return (
    <div style={{
      marginTop: '1.5rem',
      padding: '1.25rem',
      background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0.5) 100%)',
      border: '1px solid rgba(255, 0, 0, 0.1)',
      borderRadius: '12px'
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1a1a1a',
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
        {videos.map((video, index) => (
          <YouTubeCard key={index} {...video} />
        ))}
      </div>
    </div>
  )
}

VideoResourcesSection.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    channel: PropTypes.string,
    duration: PropTypes.string
  }))
}

export default YouTubeCard
