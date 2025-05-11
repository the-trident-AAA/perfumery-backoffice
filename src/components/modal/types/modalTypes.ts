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
  detailsPerfumeModal: SectionModal;
  detelePerfumeModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  editProfileModal: SectionModal;
  changePasswordModal: SectionModal;
  newBrandModal: SectionModal;
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
  detailsPerfumeModal: {
    name: "detailsPerfumeModal",
    title: "Detalles del Perfume",
  },
  detelePerfumeModal: {
    name: "detelePerfumeModal",
    title: "Eliminación de Perfume",
    message: "¿Está seguro de que desea eliminar el Perfume?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del Perfume.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  editProfileModal: {
    name: "editProfileModal",
    title: "Edición de Perfil",
  },
  changePasswordModal: {
    name: "changePasswordModal",
    title: "Cambio de Contraseña",
  },
  newBrandModal: {
    name: "newBrandModal",
    title: "Formulario de Creación de Marca",
  },
};
