import { useState, useEffect } from 'react'
import styles from './LanguageToggle.module.css'

// Drapeau Français SVG officiel
function FlagFR() {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 3 2"
      aria-hidden="true"
      style={{ borderRadius: '2px', display: 'block', boxShadow: '0 0 1px rgba(0,0,0,0.4)', flexShrink: 0 }}
    >
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  )
}

// Drapeau Anglais / Royaume-Uni (Union Jack) SVG officiel
function FlagEN() {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 60 30"
      aria-hidden="true"
      style={{ borderRadius: '2px', display: 'block', boxShadow: '0 0 1px rgba(0,0,0,0.4)', flexShrink: 0 }}
    >
      <clipPath id="uj-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#uj-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function LanguageToggle({ light = false }) {
  const [currentLang, setCurrentLang] = useState('fr')

  useEffect(() => {
    // Vérifier la langue sauvegardée dans le cookie ou localStorage
    const saved =
      localStorage.getItem('site_language') ||
      (document.cookie.includes('googtrans=/fr/en') ? 'en' : 'fr')
    setCurrentLang(saved)

    // Neutraliser la barre et le décalage Google Translate
    function cleanGoogleTranslateBar() {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px'
      }
      if (document.body.style.position === 'relative') {
        document.body.style.position = 'static'
      }
      const banners = document.querySelectorAll(
        '.goog-te-banner-frame, iframe.skiptranslate, iframe.goog-te-banner-frame, [id=":1.container"], [id=":2.container"]'
      )
      banners.forEach((el) => {
        el.style.setProperty('display', 'none', 'important')
        el.style.setProperty('visibility', 'hidden', 'important')
        el.style.setProperty('height', '0px', 'important')
      })
    }

    cleanGoogleTranslateBar()

    // Observateur pour neutraliser instantanément la bannière injectée au-dessus de la nav
    const observer = new MutationObserver(() => {
      cleanGoogleTranslateBar()
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: false,
    })

    // S'assurer que l'élément Google Translate est initialisé s'il ne l'est pas encore
    if (window.googleTranslateElementInit && !document.querySelector('.goog-te-combo')) {
      try {
        window.googleTranslateElementInit()
      } catch (e) {
        // En attente du script
      }
    }

    return () => observer.disconnect()
  }, [])

  function switchLanguage(targetLang) {
    if (targetLang === currentLang) return
    setCurrentLang(targetLang)
    localStorage.setItem('site_language', targetLang)

    // Configuration des cookies Google Translate
    const host = window.location.hostname
    if (targetLang === 'en') {
      document.cookie = `googtrans=/fr/en; path=/; domain=${host}`
      document.cookie = 'googtrans=/fr/en; path=/'
    } else {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host}`
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    }

    function triggerSelect() {
      const select = document.querySelector('.goog-te-combo')
      if (select) {
        select.value = targetLang
        select.dispatchEvent(new Event('change'))
        return true
      }
      return false
    }

    if (!triggerSelect()) {
      let attempts = 0
      const poll = setInterval(() => {
        attempts++
        if (triggerSelect() || attempts >= 25) {
          clearInterval(poll)
          if (attempts >= 25 && !document.querySelector('.goog-te-combo')) {
            window.location.reload()
          }
        }
      }, 40)
    }
  }

  return (
    <>
      {/* Conteneur caché requis par Google Translate */}
      <div id="google_translate_hidden_element" style={{ display: 'none' }} aria-hidden="true" />

      <div
        className={`${styles.toggleWrapper} ${light ? styles.lightWrapper : ''}`}
        role="group"
        aria-label="Sélection de la langue"
      >
        <button
          type="button"
          onClick={() => switchLanguage('fr')}
          className={`${styles.langBtn} ${
            currentLang === 'fr' ? (light ? styles.lightActive : styles.active) : ''
          }`}
          aria-label="Passer en Français"
          title="Français"
        >
          <FlagFR />
          <span>FR</span>
        </button>

        <button
          type="button"
          onClick={() => switchLanguage('en')}
          className={`${styles.langBtn} ${
            currentLang === 'en' ? (light ? styles.lightActive : styles.active) : ''
          }`}
          aria-label="Switch to English"
          title="English"
        >
          <FlagEN />
          <span>EN</span>
        </button>
      </div>
    </>
  )
}
