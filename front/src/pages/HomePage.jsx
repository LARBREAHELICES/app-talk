import TalkForm from "../components/organisms/TalkForm";
import SidebarWithRecentTalks from "../components/organisms/SidebarWithRecentTalks";
import MainLayout from "../components/templates/MainLayout";

function HomePage() {
  return (
    <MainLayout sidebar={<SidebarWithRecentTalks />}>
      <TalkForm />
    </MainLayout>
  )
}

export default HomePage
