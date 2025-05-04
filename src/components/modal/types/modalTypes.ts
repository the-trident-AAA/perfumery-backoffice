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
}

export const modalTypes: ModalTypes = {
  newPerfumeModal: {
    name: "newPerfumeModal",
    title: "Formulario de Perfume",
  },
};
