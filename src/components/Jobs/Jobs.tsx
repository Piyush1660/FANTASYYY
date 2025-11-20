import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import { Briefcase, Shield, Users, DollarSign, Car, Building, Heart, Wrench } from 'lucide-react'
import siteConfig from '../../config/site.config.json'

const categoryIcons: Record<string, React.ReactNode> = {
  emergency: <Shield className="w-4 h-4" />,
  civilian: <Users className="w-4 h-4" />,
  criminal: <Car className="w-4 h-4" />,
  business: <DollarSign className="w-4 h-4" />,
  government: <Building className="w-4 h-4" />,
  medical: <Heart className="w-4 h-4" />,
  mechanic: <Wrench className="w-4 h-4" />
}

export const Jobs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const filteredJobs = selectedCategory === 'all' 
    ? siteConfig.jobs.list 
    : siteConfig.jobs.list.filter(job => job.category === selectedCategory)

  const getSalarySymbol = (salary: number) => {
    const thresholds = siteConfig.ui?.jobs?.salaryThresholds || {
      medium: 200,
      high: 350,
      veryHigh: 450
    }
    const symbols = siteConfig.ui?.jobs?.salarySymbols || {
      low: '$',
      medium: '$$',
      high: '$$$',
      veryHigh: '$$$$'
    }
    
    if (salary >= thresholds.veryHigh) return symbols.veryHigh
    if (salary >= thresholds.high) return symbols.high
    if (salary >= thresholds.medium) return symbols.medium
    return symbols.low
  }

  const getSalaryRange = () => {
    if (filteredJobs.length === 0) return '$'
    
    const salaries = filteredJobs.map(job => job.salary || 0).filter(s => s > 0)
    if (salaries.length === 0) return '$'
    
    const min = Math.min(...salaries)
    const max = Math.max(...salaries)
    
    if (min === max) {
      return getSalarySymbol(min)
    }
    return `${getSalarySymbol(min)} - ${getSalarySymbol(max)}`
  }

  const categoriesWithJobs = siteConfig.jobs.categories.map(category => ({
    ...category,
    jobCount: siteConfig.jobs.list.filter(job => job.category === category.id).length
  })).filter(cat => cat.jobCount > 0)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="jobs" className="section-padding relative bg-street-black">
      <div className="absolute inset-0 bg-chain-link opacity-5" />
      
      <div className="container-street relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-gang-purple text-street-white font-stamp uppercase text-xs tracking-wider mb-4 transform rotate-[-1deg]">
            {siteConfig.ui?.jobs?.sectionTag || 'Career Opportunities'}
          </span>
          <h2 className="font-stencil text-4xl md:text-6xl text-street-white uppercase text-shadow-brutal mb-4">
            {siteConfig.ui?.jobs?.title || 'Choose Your'} <span className="gradient-gold">{siteConfig.ui?.jobs?.titleAccent || 'Path'}</span>
          </h2>
          <div className="w-24 h-1 bg-gang-purple mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-street-asphalt border-2 border-street-black shadow-brutal p-4">
              <h3 className="font-stencil text-gang-gold text-xl uppercase mb-4 text-center">
                {siteConfig.ui?.jobs?.categoriesTitle || 'Categories'}
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full px-4 py-3 text-left font-street uppercase text-sm tracking-wide transition-colors duration-200 ${
                    selectedCategory === 'all' 
                      ? 'bg-gang-gold text-street-black shadow-brutal-sm' 
                      : 'bg-street-concrete text-street-dust hover:bg-street-metal hover:text-street-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4" />
                      <span>{siteConfig.ui?.jobs?.allJobsLabel || 'All Jobs'}</span>
                    </div>
                    <span className="text-xs">
                      ({siteConfig.jobs.list.length})
                    </span>
                  </div>
                </button>
                
                {categoriesWithJobs.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full px-4 py-3 text-left font-street uppercase text-sm tracking-wide transition-colors duration-200 ${
                      selectedCategory === category.id 
                        ? 'bg-gang-gold text-street-black shadow-brutal-sm' 
                        : 'bg-street-concrete text-street-dust hover:bg-street-metal hover:text-street-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {categoryIcons[category.id] || <Briefcase className="w-4 h-4" />}
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs">
                        ({category.jobCount})
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2 border-street-black">
                <div className="mb-3">
                  <p className="font-stamp text-street-dust text-xs uppercase">
                    {siteConfig.ui?.jobs?.totalJobsLabel || 'Total Jobs'}
                  </p>
                  <p className="font-stencil text-2xl text-gang-gold">
                    {filteredJobs.length}
                  </p>
                </div>
                <div>
                  <p className="font-stamp text-street-dust text-xs uppercase">
                    {siteConfig.ui?.jobs?.salaryRangeLabel || 'Salary Range'}
                  </p>
                  <p className="font-stencil text-2xl text-gang-green">
                    {getSalaryRange()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => {
                  const category = siteConfig.jobs.categories.find(c => c.id === job.category)
                  const isLegal = ['emergency', 'government', 'medical'].includes(job.category)
                  
                  return (
                    <div
                      key={job.id}
                      className="group"
                    >
                      <div className="h-full bg-street-asphalt border-2 border-street-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-3 py-1 ${
                          isLegal ? 'bg-gang-green' : 'bg-gang-red'
                        } transform rotate-2`}>
                          <span className="font-stamp text-street-black text-xs uppercase">
                            {category?.name}
                          </span>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 ${
                              isLegal ? 'bg-gang-green' : 'bg-gang-orange'
                            } bg-opacity-20 flex items-center justify-center`}>
                              {categoryIcons[job.category] || <Briefcase className="w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-stencil text-2xl text-street-white uppercase">
                                {job.name}
                              </h3>
                            </div>
                          </div>

                          <p className="text-street-dust font-body text-sm mb-4">
                            {job.description}
                          </p>

                          {job.requirements && job.requirements.length > 0 && (
                            <div className="space-y-1 mb-4">
                              {job.requirements.slice(0, 2).map((req, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-street-dust">
                                  <div className="w-1 h-1 bg-gang-gold" />
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {job.salary && (
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-stamp text-xs text-street-dust uppercase">
                                {siteConfig.ui?.jobs?.salaryPrefix || 'Starting'}
                              </span>
                              <span className="font-stencil text-xl text-gang-green">
                                {getSalarySymbol(job.salary)}
                              </span>
                            </div>
                          )}

                          <button className="w-full btn-brutal-outline text-xs group-hover:bg-gang-gold group-hover:text-street-black">
                            {siteConfig.ui?.jobs?.applyButtonText || 'APPLY NOW'}
                          </button>
                        </div>
                        
                        <div className="absolute inset-0 bg-concrete-texture opacity-5 pointer-events-none" />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-street-dust font-body">
                  No jobs found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-street-asphalt transform skew-y-1 origin-bottom-right">
        <div className="absolute top-4 right-8 font-tag text-spray-pink text-2xl transform rotate-[-5deg] opacity-30">
          {siteConfig.ui?.jobs?.graffitiText || 'FOLLOW THE RULES'}
        </div>
      </div>
    </section>
  )
}