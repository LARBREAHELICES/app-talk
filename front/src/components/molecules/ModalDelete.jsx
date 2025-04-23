import { useState } from "react";
// pour des imports évitant les ../
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";

export default function DeleteExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="danger"
      >
        Supprimer
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-2">Supprimer cet élément ?</h2>
        <p className="mb-4">Cette action est irréversible.</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </>
  )
}
