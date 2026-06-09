const PHONE = '5534347955'

const wa = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`

export const WA = {
  hero:     wa('Hola Aureum Studio, quiero agendar una consulta gratuita 👋'),
  benefits: wa('Hola, vi sus resultados y quiero saber cómo pueden ayudar a mi negocio a crecer 📈'),
  leads:    wa('Hola, me interesa el servicio de Generación de Leads de Aureum Studio 👋'),
  meta:     wa('Hola, me interesa el servicio de Meta Ads de Aureum Studio 👋'),
  web:      wa('Hola, me interesa el servicio de Desarrollo Web de Aureum Studio 👋'),
  ai:       wa('Hola, me interesa la Automatización con IA de Aureum Studio 👋'),
  process:  wa('Hola Aureum Studio, me interesó su proceso de trabajo. Quiero empezar 🚀'),
  contact:  wa('Hola Aureum Studio, quiero agendar una consulta gratuita 👋'),
  floating: wa('Hola Aureum Studio 👋 Quiero información sobre sus servicios'),
  navbar:   wa('Hola Aureum Studio, quiero una consulta gratuita 👋'),
}
