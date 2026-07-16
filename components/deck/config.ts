import type { ComponentType } from 'react'
import type { SlideProps } from '@/components/deck/Beat'
import S1Portada from '@/components/deck/slides/S1Portada'
import S2Problema from '@/components/deck/slides/S2Problema'
import S3Realidad from '@/components/deck/slides/S3Realidad'
import S4Contraste from '@/components/deck/slides/S4Contraste'
import S5PorQueMeta from '@/components/deck/slides/S5PorQueMeta'
import S6Servicio from '@/components/deck/slides/S6Servicio'
import S7Proceso from '@/components/deck/slides/S7Proceso'
import S8Cierre from '@/components/deck/slides/S8Cierre'

/** Número tal como se lee en pantalla (en un video no hay nada que clicar). */
export const WA_DISPLAY = '+52 55 3434 7955'

export interface Slide {
  id: string
  /** Rótulo corto para el guion */
  label: string
  /** Cuántos beats tiene: cada uno se revela con → */
  steps: number
  Component: ComponentType<SlideProps>
  /** Guion del presentador — tecla S. [→] marca dónde avanzar. */
  notes: string
}

export const SLIDES: Slide[] = [
  {
    id: 'portada',
    label: 'Portada',
    steps: 1,
    Component: S1Portada,
    notes:
      'Hola, gracias por darme estos minutos. Te voy a mostrar algo muy concreto: cómo tu negocio puede empezar a recibir clientes todos los días, de forma predecible, usando Facebook e Instagram. Y cuando digo "el sistema probado" no hablo de mí — hablo de Meta Ads, la herramienta con la que millones de negocios consiguen clientes cada día. Lo que hago yo es armártelo y ponerlo a funcionar. En los próximos minutos te explico el problema que casi todos tienen, por qué pasa, y cómo lo resolvemos.',
  },
  {
    id: 'problema',
    label: 'El problema',
    steps: 4,
    Component: S2Problema,
    notes:
      'Empecemos por lo incómodo. La mayoría de los negocios crecen a punta de recomendaciones, y el boca a boca es buenísimo, pero no lo controlas: un mes te va increíble y el siguiente está muerto. [→] Y lo que se suele hacer para arreglarlo tampoco funciona. Publicar en redes ya casi no sirve, porque el alcance orgánico cayó por debajo del 2%: de cada 100 seguidores, apenas 2 ven tu publicación. [→] Los volantes son dinero que se va sin que sepas si sirvió de algo. [→] El problema de fondo no es falta de esfuerzo: es que no hay un sistema. Estás improvisando cada mes.',
  },
  {
    id: 'realidad',
    label: 'La realidad',
    steps: 4,
    Component: S3Realidad,
    notes:
      'Y mientras tanto, ¿dónde está tu cliente? En el teléfono. La persona promedio pasa más de dos horas y media al día en redes sociales, todos los días. [→] Hay 4.9 mil millones de usuarios activos, más de la mitad del planeta. [→] Y el 95% entra desde el celular. Tu cliente ideal está ahí ahora mismo, deslizando el dedo. La pregunta es simple: ¿te está viendo a ti, o a tu competencia? [→] Como decía Bill Gates, el negocio que no está en internet, simplemente no existe.',
  },
  {
    id: 'contraste',
    label: 'Viejo vs. nuevo',
    steps: 2,
    Component: S4Contraste,
    notes:
      'Pongámoslo lado a lado. A la izquierda, lo que ya no funciona: volantes que terminan en la basura, publicaciones sin estrategia y esperar a que la suerte te traiga clientes. [→] A la derecha, lo que sí: un sistema de anuncios en Meta que pone tu negocio frente a miles de personas segmentadas, esas personas llegan directo a tu WhatsApp, y tú sabes cuántos contactos estás recibiendo. La diferencia entre una columna y la otra no es el esfuerzo. Es tener un sistema en lugar de cruzar los dedos.',
  },
  {
    id: 'por-que-meta',
    label: 'Por qué Meta',
    steps: 4,
    Component: S5PorQueMeta,
    notes:
      '¿Y por qué Meta y no otra cosa? Cuatro razones. Primera: alcance dirigido. No le hablas a todo el mundo, le hablas a quien tiene más probabilidad de comprarte, según su zona, su edad, sus intereses y su comportamiento. [→] Segunda: los interesados van directo a tu WhatsApp, te escriben en el momento exacto en que están interesados, que es cuando la gente compra. [→] Tercera: todo es medible. Sabes cuánto invertiste y cuántas personas te contactaron; nada de adivinar. [→] Y cuarta: funciona solo. La campaña corre 24/7, incluso mientras duermes.',
  },
  {
    id: 'servicio',
    label: 'El servicio',
    steps: 5,
    Component: S6Servicio,
    notes:
      '¿Y qué hago yo exactamente? Todo lo técnico, para que tú no toques nada. Me encargo de la configuración completa, desde la cuenta hasta el lanzamiento de la campaña. [→] Diseño de 3 a 5 imágenes profesionales pensadas para frenar el scroll. [→] Escribo el copy: textos que le hablan directo a lo que tu cliente necesita. [→] Armo la segmentación para que tu presupuesto no se desperdicie en gente que nunca te va a comprar. [→] Y no lo dejo ahí: reviso y ajusto la campaña constantemente para sacarle el máximo a cada peso invertido. Tú pones el negocio y me cuentas a quién quieres llegar; yo pongo el sistema.',
  },
  {
    id: 'proceso',
    label: 'El proceso',
    steps: 7,
    Component: S7Proceso,
    notes:
      'Y arrancar es más fácil de lo que parece: son 6 pasos, y casi todos son míos. Te mando una solicitud de Business Manager por el sistema oficial de Facebook. [→] Tú la aceptas con un clic, y eso me da un acceso limitado — nunca veo tus contraseñas ni tus datos personales, y me lo puedes quitar cuando quieras. [→] Me pasas las fotos o videos que ya tengas. [→] Yo creo los anuncios, [→] la campaña se activa en Facebook e Instagram, [→] y empiezan a llegarte mensajes por WhatsApp. [→] De que apruebas a que la campaña está corriendo: 24 a 48 horas.',
  },
  {
    id: 'cierre',
    label: 'Cierre',
    steps: 3,
    Component: S8Cierre,
    notes:
      'Así que la pregunta es simple: ¿cuántos clientes más vas a dejar que se lleve tu competencia? [→] Si te interesa, escríbeme por WhatsApp con dos palabras: "Quiero Probar". Te respondo enseguida con los siguientes pasos y lo armamos hoy mismo. [→] Y te voy a ser honesto sobre por qué te conviene entrar ahora: estoy tomando solamente 3 clientes este mes, porque quiero darle a cada campaña el 100% de mi atención y conseguir resultados que valga la pena presumir. Eso significa que vas a tener a alguien que necesita que tu campaña funcione tanto como tú.',
  },
]

export const TOTAL_BEATS = SLIDES.reduce((n, s) => n + s.steps, 0)
export const BEATS_BEFORE = SLIDES.map((_, i) =>
  SLIDES.slice(0, i).reduce((n, s) => n + s.steps, 0)
)
