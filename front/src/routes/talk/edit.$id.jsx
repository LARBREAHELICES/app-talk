import { createFileRoute, useParams } from '@tanstack/react-router'
import TalkEditPage from '../../pages/TalkEditPage'

export const Route = createFileRoute('/talk/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <TalkEditPage  />
  )
}
