import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { ChevronDown } from 'lucide-react'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [playerCount, setPlayerCount] = useState(0)
  const [isServerOnline, setIsServerOnline] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false)
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!siteConfig.api.serverCode || siteConfig.api.serverCode === 'replaceme') {
        console.warn('No server code configured. Please set your CFX.re server code in site.config.json')
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
        return
      }

      try {
        const response = await fetch(
          `${siteConfig.api.cfxApiUrl}${siteConfig.api.serverCode}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          }
        )
        
        if (response.ok) {
          const data = await response.json()
          if (data.Data && Array.isArray(data.Data.players)) {
            const playerCount = data.Data.players.length
            setPlayerCount(playerCount)
            setIsServerOnline(true)
            
            if (data.Data.sv_maxclients) {
              siteConfig.server.maxPlayers = data.Data.sv_maxclients
            }
          } else {
            throw new Error('Invalid response format')
          }
        } else {
          throw new Error('Failed to fetch server data')
        }
      } catch (error) {
        console.warn('Failed to fetch player data:', error)
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
      }
    }

    fetchPlayerData()
    const interval = setInterval(fetchPlayerData, siteConfig.api.refreshInterval)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    if (!isLoading) {
      const tl = gsap.timeline()

      tl.from(characterRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out'
      })
      .from(contentRef.current?.querySelectorAll('.hero-text') || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4')
      .from(statsRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.2')

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (characterRef.current) {
            gsap.set(characterRef.current, {
              y: self.progress * 50,
              opacity: 1 - self.progress * 0.3
            })
          }
        }
      })
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="loading-screen-street">
        <div className="text-center">
          <h1 className="font-stencil text-6xl md:text-8xl text-gang-gold mb-8 text-shadow-brutal uppercase">
            {siteConfig.server?.name || 'NightCity RP'}
          </h1>
          <div className="w-64 h-2 bg-street-concrete mx-auto mb-4 overflow-hidden">
            <div 
              className="h-full bg-gang-gold transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-street-dust font-street uppercase tracking-wider text-sm">
            {siteConfig.ui?.hero?.loadingText || 'Loading...'} {loadingProgress}%
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-street-black"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-street-gradient opacity-80" />
          <div className="absolute inset-0 bg-concrete-texture opacity-20" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: `url('${siteConfig.images?.hero?.background || '/images/hero-bg.jpg'}')`,
              filter: 'contrast(1.2) saturate(0.8)'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-street-black via-transparent to-street-black/50" />
        </div>

        <div className="container-street relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
            
            <div ref={contentRef} className="text-center lg:text-left">
              <div className="hero-text mb-4">
                <span className="inline-block px-4 py-1 bg-gang-gold text-street-black font-stencil uppercase text-sm tracking-wider shadow-brutal-sm transform rotate-[-2deg]">
                  {siteConfig.server?.tagline || 'Where Stories Come Alive'}
                </span>
              </div>
              
              <h1 className="hero-text font-stencil text-5xl md:text-7xl lg:text-8xl text-street-white uppercase mb-6 text-shadow-brutal leading-[0.9]">
                {siteConfig.server?.name?.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'text-gang-gold' : ''}>
                    {word}{' '}
                  </span>
                )) || <span>NightCity <span className="text-gang-gold">Roleplay</span></span>}
              </h1>
              
              <p className="hero-text text-street-dust text-lg md:text-xl mb-8 font-body">
                {siteConfig.server?.description || 'Experience the most immersive GTA V roleplay server'}
              </p>

              <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href={`fivem://connect/${siteConfig.api.serverCode}`}
                  className="btn-brutal group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-street-black rounded-full animate-pulse" />
                    {siteConfig.ui?.common?.playNow || 'PLAY NOW'}
                  </span>
                </a>
                
                <a 
                  href={siteConfig.social?.discord || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal-outline"
                >
                  {siteConfig.ui?.common?.discord || 'DISCORD'}
                </a>
              </div>
            </div>

            <div ref={characterRef} className="relative hidden lg:block">
              <div className="relative">
                <img 
                  src={siteConfig.images?.hero?.character || '/images/character.png'}
                  alt="Character"
                  className="w-full h-auto max-w-md mx-auto filter contrast-125 drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.8))' }}
                />
                <div className="absolute -top-8 -right-8 font-tag text-spray-pink text-4xl transform rotate-12 opacity-60">
                  {siteConfig.ui?.hero?.graffiti || 'WANTED'}
                </div>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="mt-8 max-w-2xl mx-auto">
            <div className="card-street px-6 py-4">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-stamp text-street-dust text-xs uppercase tracking-wider mb-1">{siteConfig.ui?.hero?.statusLabels?.status || 'Status'}</div>
                  <div className={`font-stencil text-2xl uppercase ${isServerOnline ? 'text-gang-green' : 'text-gang-red'}`}>
                    {isServerOnline ? (siteConfig.ui?.hero?.statusLabels?.online || 'ONLINE') : (siteConfig.ui?.hero?.statusLabels?.offline || 'OFFLINE')}
                  </div>
                </div>
                <div>
                  <div className="font-stamp text-street-dust text-xs uppercase tracking-wider mb-1">{siteConfig.ui?.hero?.statusLabels?.players || 'Players'}</div>
                  <div className="font-stencil text-2xl text-gang-gold">
                    {playerCount}/{siteConfig.server.maxPlayers}
                  </div>
                </div>
                <div>
                  <div className="font-stamp text-street-dust text-xs uppercase tracking-wider mb-1">{siteConfig.ui?.hero?.statusLabels?.server || 'Server'}</div>
                  <div className="font-stencil text-2xl text-street-white uppercase">
                    {siteConfig.server?.ip || 'LOCAL'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gang-gold" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-street-black transform -skew-y-2 origin-bottom-left" />
    </div>
  )
}