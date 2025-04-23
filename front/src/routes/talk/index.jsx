import { createFileRoute } from '@tanstack/react-router'
import TableTalk from '../../pages/TalksListPage'

export const Route = createFileRoute('/talk/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TableTalk />
}
