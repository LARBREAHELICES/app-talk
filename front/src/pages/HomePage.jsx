import TalkForm from "../components/organisms/TalkForm";
import SidebarWithRecentTalks from "../components/organisms/SidebarWithRecentTalks";
import MainLayout from "../components/templates/MainLayout";
import { useEffect } from "react";
import { useTalkCrudStore } from "../store/useTalkCrudStore";

function HomePage() {
  const { resetTalkForm, fetchSave } = useTalkCrudStore((state) => state);
  useEffect(() => {
    resetTalkForm(); // clean le formulaire si on arrive depuis /edit
  }, []);

  const handleSubmit = async () => {
    await fetchSave(); // POST dans le store
  };

  return (
    <MainLayout sidebar={<SidebarWithRecentTalks />}>
      <TalkForm mode="create" onSubmit={handleSubmit} />
    </MainLayout>
  );
}

export default HomePage;
