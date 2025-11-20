import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { Shield, Crown, Wrench, Users } from 'lucide-react'

export const Team = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll('.mugshot-card')
    
    if (cards && cards.length > 0) {
      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            scale: 0.8,
            opacity: 0,
            rotation: () => Math.random() * 10 - 5,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
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
        gsap.from('.team-title', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    })

    gsap.to('.fingerprint-bg', {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      ease: 'none'
    })
  })

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('owner')) return Crown
    if (role.toLowerCase().includes('admin')) return Shield
    if (role.toLowerCase().includes('dev')) return Wrench
    return Users
  }

  const getBadgeColor = (role: string) => {
    if (role.toLowerCase().includes('owner')) return 'bg-gang-gold text-street-black'
    if (role.toLowerCase().includes('admin')) return 'bg-gang-red text-street-white'
    if (role.toLowerCase().includes('dev')) return 'bg-gang-purple text-street-white'
    return 'bg-gang-green text-street-white'
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-gang-green' : 'bg-gang-red'
  }

  return (
    <section ref={sectionRef} id="team" className="section-padding relative bg-street-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-street-asphalt -mt-1" />
      <div 
        className="fingerprint-bg absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 5c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="absolute top-20 left-0 right-0 h-8 police-tape transform -rotate-1 opacity-30" />
      <div className="absolute bottom-20 left-0 right-0 h-8 police-tape transform rotate-1 opacity-30" />

      <div className="container-street relative z-10">
        <div className="text-center mb-16">
          <div className="team-title">
            <span className="inline-block px-4 py-1 bg-gang-purple text-street-white font-stamp uppercase text-xs tracking-wider mb-4 transform rotate-2">
              {siteConfig.ui?.team?.sectionTag || 'CLASSIFIED'}
            </span>
            <h2 className="font-stencil text-4xl md:text-6xl text-street-white uppercase text-shadow-brutal mb-4">
              {siteConfig.ui?.team?.title || 'The'} <span className="text-gang-gold">{siteConfig.ui?.team?.titleAccent || 'Crew'}</span>
            </h2>
            <p className="text-street-dust font-body max-w-2xl mx-auto">
              {siteConfig.ui?.team?.subtitle || 'The ones who keep the streets in check. Know their faces, respect their authority.'}
            </p>
            <div className="w-24 h-1 bg-gang-gold mx-auto mt-4" />
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {siteConfig.team.map((member: any, index: number) => {
            const Icon = getRoleIcon(member.role)
            
            return (
              <div 
                key={member.id} 
                className="mugshot-card group"
                style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
              >
                <div className="relative">
                  <div className="bg-street-concrete border-4 border-street-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]">
                    <div className="bg-street-black px-4 py-2 border-b-2 border-street-metal">
                      <div className="flex justify-between items-center">
                        <span className="font-stamp text-xs text-street-dust">{siteConfig.ui?.team?.casePrefix || 'CASE #'}{String(index + 1).padStart(4, '0')}</span>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status || 'active')} animate-pulse`} />
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-b from-street-metal/20 to-street-black/40 p-4">
                      <div className="absolute left-0 top-0 bottom-0 w-4 opacity-20">
                        <div className="h-full" style={{
                          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #fff 10px, #fff 11px)`
                        }} />
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-4 opacity-20">
                        <div className="h-full" style={{
                          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #fff 10px, #fff 11px)`
                        }} />
                      </div>

                      <div className="relative w-32 h-32 mx-auto">
                        <img 
                          src={member.avatar || siteConfig.images?.defaults?.teamAvatar || '/images/team/default.jpg'}
                          alt={member.name}
                          className="w-full h-full object-cover filter grayscale contrast-125 opacity-90"
                          style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.9)' }}
                        />
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)`
                        }} />
                      </div>
                    </div>

                    <div className="bg-street-black px-4 py-3 border-t-2 border-street-metal">
                      <h3 className="font-stencil text-xl text-street-white uppercase mb-1">
                        {member.name}
                      </h3>
                      
                      <div className={`inline-flex items-center gap-2 px-3 py-1 ${getBadgeColor(member.role)} font-stamp text-xs uppercase tracking-wider mb-2`}>
                        <Icon className="w-3 h-3" />
                        <span>{member.role}</span>
                      </div>

                      <div className="font-stamp text-xs text-street-dust mb-2">
                        <span className="text-gang-gold">{siteConfig.ui?.team?.aliasPrefix || 'ALIAS:'}</span> @{member.discord}
                      </div>

                      <div className="border-t border-street-metal pt-2 mt-2">
                        <p className="font-body text-xs text-street-dust leading-relaxed">
                          {member.description}
                        </p>
                      </div>
                    </div>

                    {member.badge && (
                      <div className="absolute -top-4 -right-4 px-3 py-1 bg-gang-gold text-street-black font-stamp uppercase text-xs tracking-wider transform rotate-12 shadow-brutal-sm">
                        {member.badge}
                      </div>
                    )}

                    {index === 0 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none">
                        <div className="px-4 py-2 border-4 border-gang-red/50 text-gang-red/50 font-stamp text-3xl uppercase tracking-wider">
                          {siteConfig.ui?.team?.topBrassStamp || 'TOP BRASS'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="card-street px-8 py-6 text-center">
              <h3 className="font-stencil text-2xl text-gang-gold uppercase mb-2">
                {siteConfig.ui?.team?.joinTitle || 'Join The Crew'}
              </h3>
              <p className="text-street-dust font-body mb-4">
                {siteConfig.ui?.team?.joinSubtitle || 'Think you got what it takes to run with us?'}
              </p>
              <a 
                href={siteConfig.social?.discord || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal inline-block"
              >
                {siteConfig.ui?.team?.joinButton || 'APPLY ON DISCORD'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-street-concrete">
        <div className="absolute bottom-8 left-0 right-0 h-12 police-tape transform -rotate-2" />
      </div>
    </section>
  )
}