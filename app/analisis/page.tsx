import AnalisisView from './AnalisisView'

// Se renderiza por petición para leer ?para= en el servidor (así el nombre
// y el video vienen ya en el HTML, sin parpadeo y con vista previa correcta).
export const dynamic = 'force-dynamic'

export default async function AnalisisPage({
  searchParams,
}: {
  searchParams: Promise<{ para?: string }>
}) {
  const { para } = await searchParams
  return <AnalisisView para={para} />
}
