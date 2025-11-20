import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import * as LucideIcons from 'lucide-react'

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll('.feature-card')
    
    if (cards && cards.length > 0) {
      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        },
        once: true,
        start: 'top 85%'
      })
    }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.features-title', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    })
  })

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<{ size?: number; className?: string }>
    return Icon || LucideIcons.Box
  }

  return (
    <section ref={sectionRef} id="features" className="section-padding relative bg-street-asphalt">
      <div className="absolute top-0 left-0 right-0 h-32 bg-street-black transform -skew-y-2 origin-top-right -mt-16" />
      <div className="absolute inset-0 bg-concrete-texture opacity-10" />
      
      <div className="container-street relative z-10 pt-16">
        <div className="text-center mb-12">
          <div className="features-title">
            <span className="inline-block px-4 py-1 bg-gang-red text-street-white font-stamp uppercase text-xs tracking-wider mb-4 transform rotate-1">
              {siteConfig.ui?.features?.sectionTag || 'Why Choose Us'}
            </span>
            <h2 className="font-stencil text-4xl md:text-6xl text-street-white uppercase text-shadow-brutal mb-4">
              {siteConfig.ui?.features?.title || 'Server'} <span className="text-gang-gold">{siteConfig.ui?.features?.titleAccent || 'Features'}</span>
            </h2>
            <div className="w-24 h-1 bg-gang-gold mx-auto" />
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.features.map((feature: any, index: number) => {
            const IconComponent = getIcon(feature.icon)
            
            return (
              <div 
                key={index} 
                className="feature-card group"
              >
                <div className="card-street h-full relative overflow-visible">
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gang-gold flex items-center justify-center shadow-brutal-sm transform rotate-12 z-10">
                    <span className="font-stencil text-2xl text-street-black">{index + 1}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-street-black flex items-center justify-center shadow-brutal-sm group-hover:bg-gang-gold transition-colors duration-200">
                      <IconComponent className="w-8 h-8 text-gang-gold group-hover:text-street-black transition-colors duration-200" />
                    </div>
                  </div>
                  
                  <h3 className="font-stencil text-2xl text-street-white uppercase mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-street-dust font-body leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gang-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="police-tape px-8 py-3 text-sm font-stencil shadow-brutal">
              {siteConfig.ui?.features?.highlight || `${siteConfig.server.maxPlayers}+ SLOT SERVER • CUSTOM SCRIPTS • 24/7 UPTIME`}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path 
            d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" 
            fill="#0A0A0A"
            opacity="0.5"
          />
          <path 
            d="M0,60 C360,90 720,30 1440,60 L1440,100 L0,100 Z" 
            fill="#0A0A0A"
          />
        </svg>
      </div>
    </section>
  )
}