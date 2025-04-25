import TalkForm from "../components/organisms/TalkForm";
import MainLayout from "../components/templates/MainLayout";
import { useParams, useNavigate  } from "@tanstack/react-router"

import { useTalkCrudStore } from "../store/useTalkCrudStore";
import { useEffect } from "react";

function TalkEditPage() {
  const {id} = useParams({ from: '/talk/edit/$id'})

  const navigate = useNavigate();
  const {
    title,
    topic,
    duration,
    objective,
    presenters,
    fetchUpdate,
    scheduled_at,
    resetTalkForm,
    fetchEdit,
  } = useTalkCrudStore((state) => state);

  // 🧱 On reconstruit un objet talk ici
  const talk = {
    title,
    topic,
    duration,
    objective,
    scheduled_at,
    presenters,
  };

  useEffect(() => {
    resetTalkForm(); // reset propre
  }, []);

  useEffect(() => {
    const loadTalkData = async () => {
      await fetchEdit(id); // Chargement des données
    };
    loadTalkData();
  }, [id]);

  const handleUpdate = async () => {
    await fetchUpdate(id);
    navigate({ to: "/" })

  };

  return (
    <MainLayout>
      <TalkForm
        mode="edit"
        initialTalk={talk}
        onSubmit={() => handleUpdate(talk.id)}
      />
    </MainLayout>
  );
}

export default TalkEditPage;
