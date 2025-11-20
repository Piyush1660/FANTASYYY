import { Link } from 'react-router-dom'
import siteConfig from '../../config/site.config.json'
import { MapPin, Users, Zap } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="relative bg-street-black pt-16 pb-8 overflow-hidden">
      {/* Barbed wire pattern top border */}
      <div className="absolute top-0 left-0 right-0 h-4" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 L5 4 L10 8 L15 4 L20 8 L25 4 L30 8 L35 4 L40 8' stroke='%23D4AF37' stroke-width='2' fill='none'/%3E%3Ccircle cx='5' cy='4' r='2' fill='%23D4AF37'/%3E%3Ccircle cx='15' cy='4' r='2' fill='%23D4AF37'/%3E%3Ccircle cx='25' cy='4' r='2' fill='%23D4AF37'/%3E%3Ccircle cx='35' cy='4' r='2' fill='%23D4AF37'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center'
      }} />

      {/* Concrete wall texture */}
      <div className="absolute inset-0 bg-concrete-texture opacity-5" />

      {/* Graffiti decorations */}
      <div className="absolute top-8 left-8 font-tag text-spray-pink text-6xl transform -rotate-12 opacity-10">
        {siteConfig.ui?.footer?.graffitiTop || 'RESPECT'}
      </div>
      <div className="absolute bottom-8 right-8 font-tag text-spray-blue text-5xl transform rotate-6 opacity-10">
        {siteConfig.ui?.footer?.graffitiBottom || 'THE STREETS'}
      </div>

      <div className="container-street relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gang-gold flex items-center justify-center shadow-brutal-sm">
                <span className="font-stencil text-xl text-street-black">
                  {siteConfig.server.logo?.type === 'text' ? siteConfig.server.logo.content : 'NC'}
                </span>
              </div>
              <div>
                <h3 className="font-stencil text-2xl text-street-white uppercase">
                  {siteConfig.server.shortName || 'NCRP'}
                </h3>
                <p className="font-stamp text-xs text-gang-gold uppercase tracking-wider">
                  {siteConfig.server.slogan || 'Street Life'}
                </p>
              </div>
            </div>
            <p className="text-street-dust font-body text-sm leading-relaxed mb-4">
              {siteConfig.server.description}
            </p>
            {/* Established badge */}
            <div className="inline-block px-3 py-1 bg-street-concrete border-2 border-street-metal">
              <span className="font-stamp text-xs text-street-dust uppercase">
                {siteConfig.ui?.footer?.establishedPrefix || 'EST.'} {siteConfig.server.stats?.established || '2024'}
              </span>
            </div>
          </div>

          {/* Quick Links - Street signs style */}
          <div>
            <h3 className="font-stencil text-xl text-gang-gold uppercase mb-4">
              <span className="border-b-2 border-gang-gold pb-1">{siteConfig.ui?.footer?.sections?.navigation || 'Navigation'}</span>
            </h3>
            <ul className="space-y-3">
              {['Features', 'Jobs', 'Rules', 'Team', 'Gallery'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="group flex items-center gap-2 text-street-dust hover:text-gang-gold transition-colors"
                  >
                    <span className="w-2 h-2 bg-street-metal group-hover:bg-gang-gold transition-colors" />
                    <span className="font-body uppercase text-sm tracking-wider">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server Stats - LED display style */}
          <div>
            <h3 className="font-stencil text-xl text-gang-gold uppercase mb-4">
              <span className="border-b-2 border-gang-gold pb-1">{siteConfig.ui?.footer?.sections?.serverStats || 'Server Stats'}</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-gang-green" />
                <div>
                  <p className="font-stamp text-xs text-street-dust uppercase">{siteConfig.ui?.footer?.statsLabels?.players || 'Players'}</p>
                  <p className="font-stencil text-lg text-gang-green">
                    {siteConfig.server.stats?.totalPlayers || '15,000+'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gang-gold" />
                <div>
                  <p className="font-stamp text-xs text-street-dust uppercase">{siteConfig.ui?.footer?.statsLabels?.activeGangs || 'Active Gangs'}</p>
                  <p className="font-stencil text-lg text-gang-gold">
                    {siteConfig.server.stats?.activeGangs || '12'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-gang-orange" />
                <div>
                  <p className="font-stamp text-xs text-street-dust uppercase">{siteConfig.ui?.footer?.statsLabels?.businesses || 'Businesses'}</p>
                  <p className="font-stencil text-lg text-gang-orange">
                    {siteConfig.server.stats?.businesses || '45+'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links - Graffiti style */}
          <div>
            <h3 className="font-stencil text-xl text-gang-gold uppercase mb-4">
              <span className="border-b-2 border-gang-gold pb-1">{siteConfig.ui?.footer?.sections?.connect || 'Connect'}</span>
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Discord */}
              <a
                href={siteConfig.social?.discord || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-street-concrete border-2 border-street-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center"
                aria-label="Discord"
              >
                <svg className="w-6 h-6 text-street-dust group-hover:text-gang-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>

              {/* Twitter */}
              {siteConfig.social?.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-street-concrete border-2 border-street-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6 text-street-dust group-hover:text-gang-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
              )}

              {/* YouTube */}
              {siteConfig.social?.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-street-concrete border-2 border-street-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-street-dust group-hover:text-gang-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Server IP Display */}
            <div className="card-street p-4 bg-street-asphalt">
              <p className="font-stamp text-xs text-gang-gold uppercase tracking-wider mb-2">
                {siteConfig.ui?.footer?.serverConnection || 'Server Connection'}
              </p>
              <p className="font-stencil text-lg text-street-white">
                {siteConfig.server.ip}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-gang-green rounded-full animate-pulse" />
                <span className="font-stamp text-xs text-gang-green uppercase">{siteConfig.ui?.footer?.onlineStatus || 'Online'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with geometric pattern */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-street-metal" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-street-black">
              <div className="w-8 h-8 bg-gang-gold transform rotate-45" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="font-stamp text-xs text-street-dust uppercase tracking-wider">
              © {siteConfig.legal?.copyrightYear || new Date().getFullYear()} {siteConfig.server.name}
            </p>
            <p className="font-stamp text-xs text-street-metal mt-1">
              {siteConfig.ui?.footer?.disclaimer || siteConfig.footer?.disclaimer || 'Not affiliated with Rockstar Games'}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-stamp text-xs uppercase tracking-wider text-street-dust hover:text-gang-gold transition-colors">
              {siteConfig.ui?.common?.privacy || 'Privacy'}
            </Link>
            <span className="text-street-metal">•</span>
            <Link to="/terms" className="font-stamp text-xs uppercase tracking-wider text-street-dust hover:text-gang-gold transition-colors">
              {siteConfig.ui?.common?.terms || 'Terms'}
            </Link>
            <span className="text-street-metal">•</span>
            <Link to="/cookies" className="font-stamp text-xs uppercase tracking-wider text-street-dust hover:text-gang-gold transition-colors">
              {siteConfig.ui?.common?.cookies || 'Cookies'}
            </Link>
          </div>

          {/* Spray paint signature */}
          <div className="font-tag text-spray-yellow text-2xl transform rotate-3 opacity-50">
            {siteConfig.server.shortName || 'NCRP'}
          </div>
        </div>

        {/* Swisser Branding - Street Style */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-street-metal/30">
          <div className="flex flex-col items-center gap-2">
            {/* Created by tag */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gang-gold opacity-50" />
              <span className="font-stamp text-xs text-street-dust uppercase tracking-wider">
                Crafted by
              </span>
              <div className="h-px w-12 bg-gang-gold opacity-50" />
            </div>
            
            {/* Swisser branding - brutal style */}
            <a 
              href="https://swisser.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="relative">
                {/* Main text */}
                <span className="font-stencil text-3xl text-gang-gold uppercase tracking-wider hover:text-gang-orange transition-colors">
                  SWISSER
                </span>
                {/* .dev extension */}
                <span className="font-stamp text-xs text-spray-pink absolute -bottom-1 -right-6 transform rotate-[-8deg]">
                  .DEV
                </span>
              </div>
              
              {/* Hover effect - underline */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gang-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            
            {/* Tagline */}
            <p className="font-stamp text-xs text-street-metal uppercase tracking-wider mt-1">
              Street Code • Brutal Design
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}