import { useRef } from 'react'
import siteConfig from '../../config/site.config.json'
import { AlertTriangle, Shield, Users, MapPin, Zap } from 'lucide-react'

export const Rules = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'combat': return <AlertTriangle className="w-4 h-4" />
      case 'roleplay': return <Users className="w-4 h-4" />
      case 'zones': return <MapPin className="w-4 h-4" />
      case 'general': return <Shield className="w-4 h-4" />
      case 'special': return <Zap className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'border-gang-red'
      case 'medium': return 'border-gang-orange'
      case 'low': return 'border-gang-green'
      default: return 'border-street-metal'
    }
  }

  const getSeverityDotColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-gang-red animate-pulse'
      case 'medium': return 'bg-gang-orange'
      case 'low': return 'bg-gang-green'
      default: return 'bg-street-metal'
    }
  }

  const rulesByCategory = siteConfig.rules.reduce((acc: any, rule: any) => {
    if (!acc[rule.category]) {
      acc[rule.category] = []
    }
    acc[rule.category].push(rule)
    return acc
  }, {})

  Object.keys(rulesByCategory).forEach(category => {
    rulesByCategory[category] = rulesByCategory[category].map((rule: any, index: number) => ({
      ...rule,
      categoryNumber: index + 1
    }))
  })

  const categoryNames: Record<string, string> = {
    combat: 'Combat Rules',
    roleplay: 'Roleplay Rules',
    zones: 'Zone Rules',
    general: 'General Rules',
    special: 'Special Rules'
  }

  const categoryOrder = ['combat', 'roleplay', 'general', 'zones', 'special']

  return (
    <section ref={sectionRef} id="rules" className="section-padding relative bg-street-asphalt overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-street-black transform -skew-y-2 origin-top-left -mt-16" />
      <div className="absolute inset-0 bg-concrete-texture opacity-10" />

      <div className="container-street relative z-10 pt-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-gang-red text-street-white font-stamp uppercase text-xs tracking-wider mb-4 transform -rotate-1">
            {siteConfig.ui?.rules?.sectionTag || 'MANDATORY'}
          </span>
          <h2 className="font-stencil text-4xl md:text-6xl text-street-white uppercase text-shadow-brutal mb-4">
            {siteConfig.ui?.rules?.title || 'Know The'} <span className="text-gang-gold">{siteConfig.ui?.rules?.titleAccent || 'Rules'}</span>
          </h2>
          <p className="text-street-dust font-body max-w-2xl mx-auto">
            {siteConfig.ui?.rules?.subtitle || 'Break these and face the consequences. We run a tight ship here.'}
          </p>
          <div className="w-24 h-1 bg-gang-gold mx-auto mt-4" />
        </div>

        <div className="max-w-6xl mx-auto">
          {categoryOrder.map((category) => {
            const rules = rulesByCategory[category]
            
            if (!rules || rules.length === 0) return null
            
            return (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-street-metal" />
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="font-stamp text-gang-gold uppercase tracking-wider text-sm px-2">
                      {categoryNames[category] || category}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-street-metal" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {rules.map((rule: any) => (
                    <div 
                      key={rule.id} 
                      className={`bg-street-concrete border-l-4 ${getSeverityColor(rule.severity)} p-4 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-street-black flex items-center justify-center shadow-brutal-sm flex-shrink-0">
                          <span className="font-stencil text-sm text-gang-gold">
                            {rule.categoryNumber}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-stencil text-lg text-street-white uppercase mb-1">
                            {rule.title}
                          </h3>
                          <p className="text-street-dust font-body text-sm leading-relaxed">
                            {rule.description}
                          </p>
                          
                          <div className="mt-2 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSeverityDotColor(rule.severity)}`} />
                            <span className="font-stamp text-xs uppercase text-street-dust">
                              {siteConfig.ui?.rules?.severityLabels?.[rule.severity as keyof typeof siteConfig.ui.rules.severityLabels] || `${rule.severity} priority`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block px-6 py-3 bg-street-black border-2 border-gang-gold shadow-brutal">
            <span className="font-stencil text-gang-gold uppercase">
              {siteConfig.ui?.rules?.footer || 'Play Fair or Get Banned'}
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 font-tag text-spray-yellow text-2xl transform rotate-[-8deg] opacity-20">
          {siteConfig.ui?.rules?.graffiti || 'RESPECT THE CODE'}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-street-black transform skew-y-1 origin-bottom-left" />
    </section>
  )
}