import { useEffect, useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, smoothScrollTo } from '../../lib/gsap-config'
import { Home, Briefcase, Shield, Users, Image, ScrollText } from 'lucide-react'
import siteConfig from '../../config/site.config.json'
import { BottomNavigation } from './BottomNavigation'

const navItems = [
  { id: 'home', label: 'Home', href: '#home', icon: <Home className="w-5 h-5" /> },
  { id: 'features', label: 'Features', href: '#features', icon: <Shield className="w-5 h-5" /> },
  { id: 'jobs', label: 'Jobs', href: '#jobs', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'rules', label: 'Rules', href: '#rules', icon: <ScrollText className="w-5 h-5" /> },
  { id: 'team', label: 'Team', href: '#team', icon: <Users className="w-5 h-5" /> },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: <Image className="w-5 h-5" /> }
]

export const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Return mobile navigation for mobile devices
  if (isMobile) {
    return <BottomNavigation />
  }

  // Desktop navigation continues below
  return <DesktopNavigation />
}

const DesktopNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef<HTMLElement>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initial check on mount
  useEffect(() => {
    // Ensure home is active on initial load when at top
    if (window.scrollY < 100) {
      setActiveSection('home')
    }
  }, [])


  // Setup scroll-triggered active states
  useGSAP(() => {
    // Home section special handling
    ScrollTrigger.create({
      id: 'nav-home',
      trigger: '#home',
      start: 'top top',
      end: 'bottom top+=80',
      onEnter: () => setActiveSection('home'),
      onEnterBack: () => setActiveSection('home'),
      onLeaveBack: () => setActiveSection('home')
    })
    
    // Setup scroll-triggered active states with unique IDs
    navItems.forEach((item) => {
      if (item.id !== 'home') {
        ScrollTrigger.create({
          id: `nav-${item.id}`,
          trigger: `#${item.id}`,
          start: 'top top+=80',  // Account for fixed navbar height
          end: 'bottom top+=80',
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id)
        })
      }
    })
    
    // Refresh and sort triggers after creation
    ScrollTrigger.refresh()
    ScrollTrigger.sort()

    // Cleanup function
    return () => {
      navItems.forEach((item) => {
        const trigger = ScrollTrigger.getById(`nav-${item.id}`)
        if (trigger) trigger.kill()
      })
    }
  })


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      smoothScrollTo(target, -80) // -80px offset for fixed navigation
    }
  }

  return (
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-street-black/95 border-b-4 border-gang-gold shadow-street' 
            : 'bg-street-black/80 border-b-2 border-street-concrete'
        }`}
        style={{ position: 'fixed', zIndex: 100 }}
      >
        {/* Police tape decoration */}
        {isScrolled && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gang-gold opacity-80" />
        )}
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 opacity-100 animate-fade-in">
              {siteConfig.server.logo.type === 'text' ? (
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gang-gold flex items-center justify-center shadow-brutal-sm transform rotate-[-2deg]">
                    <span className="font-stencil text-xl md:text-2xl text-street-black transform rotate-[2deg]">
                      {siteConfig.server.logo.content}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-street-black -z-10 transform translate-x-1 translate-y-1" />
                </div>
              ) : (
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-gang-gold overflow-hidden shadow-brutal-sm">
                    <img 
                      src={siteConfig.server.logo.content} 
                      alt="Server Logo" 
                      className="w-full h-full object-cover filter grayscale contrast-125"
                    />
                  </div>
                </div>
              )}
              <span className="font-stencil text-2xl md:text-3xl text-street-white uppercase tracking-wider">
                <span className="hidden sm:inline text-shadow-brutal">{siteConfig.server.name}</span>
                <span className="sm:hidden text-shadow-brutal">
                  {siteConfig.server.name.split(' ').map(word => word[0]).join('')}
                </span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-0">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-street font-semibold uppercase tracking-wide transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'text-gang-gold' 
                      : 'text-street-dust hover:text-street-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active indicator - brutal underline */}
                  {activeSection === item.id && (
                    <>
                      <div className="absolute bottom-0 left-2 right-2 h-1 bg-gang-gold" />
                      <div className="absolute bottom-[-2px] left-3 right-1 h-1 bg-street-black" />
                    </>
                  )}
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 transition-all duration-200 ${
                    activeSection !== item.id && 'hover:bg-street-concrete/30'
                  }`} />
                </a>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="flex items-center gap-3 opacity-100 animate-fade-in">
              <a 
                href={`fivem://connect/${siteConfig.api.serverCode}`}
                className="btn-brutal text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-street-black rounded-full flicker" />
                  CONNECT
                </span>
              </a>
              <a 
                href={siteConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal-outline text-sm"
              >
                DISCORD
              </a>
            </div>

          </div>
        </div>

        {/* Bottom decoration - chain link pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-street-metal opacity-20" />
      </nav>
  )
}