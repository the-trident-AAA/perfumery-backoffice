export interface InfoModal {
  name: string;
  // matadata
  entity?: string; // id entity
  actionInsert?: (element: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
}
export interface SectionModal {
  name: string;
  title?: string;
}
export interface ModalTypes {
  newPerfumeModal: SectionModal;
  editPerfumeModal: SectionModal;
}

export const modalTypes: ModalTypes = {
  newPerfumeModal: {
    name: "newPerfumeModal",
    title: "Formulario de Creación de Perfume",
  },
  editPerfumeModal: {
    name: "editPerfumeModal",
    title: "Formulario de Edición de Perfume",
  },
};
