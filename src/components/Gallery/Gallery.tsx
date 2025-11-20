import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { Camera, X, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react'

export const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === 'all' 
    ? siteConfig.gallery.images 
    : siteConfig.gallery.images.filter((img: any) => img.category === selectedCategory)

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('.polaroid-card')
    
    if (cards && cards.length > 0) {
      cards.forEach((card) => {
        gsap.set(card, {
          rotation: Math.random() * 10 - 5,
        })
      })

      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.5)'
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
        gsap.from('.gallery-title', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    })

    gsap.from('.category-tab', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.category-tabs',
        start: 'top 85%',
        once: true
      }
    })
  })

  const getCurrentDate = () => {
    const date = new Date()
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handlePrevious = () => {
    if (selectedImage === null) return
    const prevIndex = selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1
    setSelectedImage(prevIndex)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const nextIndex = selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(nextIndex)
  }

  return (
    <>
      <section ref={sectionRef} id="gallery" className="section-padding relative bg-street-concrete overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-street-black to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23888'/%3E%3Cg opacity='0.1'%3E%3Ccircle cx='25' cy='25' r='2' fill='%23000'/%3E%3Ccircle cx='75' cy='25' r='2' fill='%23000'/%3E%3Ccircle cx='25' cy='75' r='2' fill='%23000'/%3E%3Ccircle cx='75' cy='75' r='2' fill='%23000'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-street relative z-10">
          <div className="text-center mb-12">
            <div className="gallery-title">
              <span className="inline-block px-4 py-1 bg-gang-orange text-street-black font-stamp uppercase text-xs tracking-wider mb-4 transform -rotate-2">
                {siteConfig.ui?.gallery?.sectionTag || 'EVIDENCE'}
              </span>
              <h2 className="font-stencil text-4xl md:text-6xl text-street-white uppercase text-shadow-brutal mb-4">
                {siteConfig.ui?.gallery?.title || 'Evidence'} <span className="text-gang-gold">{siteConfig.ui?.gallery?.titleAccent || 'Locker'}</span>
              </h2>
              <p className="text-street-dust font-body max-w-2xl mx-auto">
                {siteConfig.ui?.gallery?.subtitle || 'Photographic evidence from the streets. Handle with care.'}
              </p>
              <div className="w-24 h-1 bg-gang-gold mx-auto mt-4" />
            </div>
          </div>

          <div className="category-tabs flex flex-wrap justify-center gap-4 mb-12">
            {siteConfig.gallery.categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-tab relative px-6 py-3 font-stamp uppercase text-sm tracking-wider transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gang-gold text-street-black shadow-brutal transform translate-y-[-4px]'
                    : 'bg-street-asphalt text-street-dust border-2 border-street-metal hover:bg-street-metal'
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 30%, 100% 100%, 0 100%)'
                }}
              >
                <FolderOpen className="inline-block w-4 h-4 mr-2" />
                {category.name}
                {category.id !== 'all' && (
                  <span className="ml-2 text-xs opacity-60">
                    ({siteConfig.gallery.images.filter((img: any) => img.category === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {filteredImages.map((image: any, index: number) => (
              <div
                key={image.id}
                className="polaroid-card group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div 
                  className="relative bg-street-cream p-3 pb-16 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]"
                  style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
                >
                  <div className="absolute -top-2 left-8 w-12 h-6 bg-yellow-200/80 transform -rotate-12 shadow-sm" />
                  <div className="relative overflow-hidden bg-street-black">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 object-cover filter contrast-110 saturate-75"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-street-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                      <Camera className="w-5 h-5 text-street-cream" />
                    </div>

                    {image.featured && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gang-red text-street-white font-stamp text-xs uppercase tracking-wider transform rotate-12">
                        {siteConfig.ui?.gallery?.featuredBadge || 'HOT'}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-tag text-street-black text-sm mb-1">
                      {image.title}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-stamp text-xs text-street-black/60">
                        {siteConfig.ui?.gallery?.evidencePrefix || 'EVIDENCE #'}{String(image.id).padStart(3, '0')}
                      </span>
                      <span className="font-stamp text-xs text-street-black/60">
                        {getCurrentDate()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="btn-brutal-outline group">
              <span className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5" />
                {siteConfig.ui?.gallery?.loadMore || 'LOAD MORE EVIDENCE'}
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-street-black" />
      </section>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-street-black/95"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="absolute left-4 p-3 text-street-dust hover:text-gang-gold transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 p-3 text-street-dust hover:text-gang-gold transition-colors"
          >
            <ChevronRight size={32} />
          </button>

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 text-street-dust hover:text-gang-red transition-colors"
          >
            <X size={24} />
          </button>

          <div 
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-street-cream p-4 pb-20 shadow-brutal-lg">
              <img 
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-auto"
              />
              <div className="mt-4">
                <h3 className="font-tag text-2xl text-street-black mb-2">
                  {filteredImages[selectedImage].title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="font-stamp text-street-black/60">
                    {siteConfig.ui?.gallery?.evidencePrefix || 'EVIDENCE #'}{String(filteredImages[selectedImage].id).padStart(3, '0')}
                  </span>
                  <span className="font-stamp text-gang-gold">
                    {selectedImage + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}