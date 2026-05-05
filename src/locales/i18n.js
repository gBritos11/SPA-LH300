import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from './es.json'
import en from './en.json'

i18n
    // 1. LanguageDetector: detecta el idioma del navegador
    .use(LanguageDetector)
    // 2. initReactI18next: conecta i18next con React
    .use(initReactI18next)
    .init({
        // Los dos diccionarios que creamos
        resources: {
            es: { translation: es },
            en: { translation: en }
        },

        // Si no detecta ningún idioma conocido, usa español
        fallbackLng: 'es',

        detection: {
            // Busca el idioma en este orden:
            // 1ro: localStorage (si el usuario ya eligió antes)
            // 2do: idioma del navegador
            order: ['localStorage', 'navigator'],
            // Guarda la elección del usuario en localStorage
            caches: ['localStorage'],
            // Nombre de la clave en localStorage
            lookupLocalStorage: 'idioma'
        },

        interpolation: {
            // React ya previene XSS, no necesitamos que i18next lo haga
            escapeValue: false
        }
    })

export default i18n