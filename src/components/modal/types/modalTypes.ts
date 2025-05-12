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
  newScentModal: SectionModal;
  newPerfumeTypeModal: SectionModal;
  newOfferModal: SectionModal;
  editOfferModal: SectionModal;
  detailsOfferModal: SectionModal;
  deleteOfferModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  previewImageModal: SectionModal;
  editBrandModal: SectionModal;
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
  newScentModal: {
    name: "newScentModal",
    title: "Formulario de Creación de Aromas",
  },
  newPerfumeTypeModal: {
    name: "newPerfumeTypeModal",
    title: "Formulario de Creación de Tipos de Pefume",
  },
  newOfferModal: {
    name: "newOfferModal",
    title: "Formulario de Creación de Ofertas",
  },

  editOfferModal: {
    name: "editOfferModal",
    title: "Formulario de Edición de Oferta",
  },
  detailsOfferModal: {
    name: "detailsOfferModal",
    title: "Detalles de la Oferta",
  },
  deleteOfferModal: {
    name: "deleteOfferModal",
    title: "Eliminación de Oferta",
    message: "¿Está seguro de que desea eliminar la Oferta?",
    warningMessage:
      "Esta acción provocará la eliminación permanente de la Oferta.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  previewImageModal: {
    name: "previewImageModal",
    title: "Previsualización de Imagen",
  },
  editBrandModal: {
    name: "editBrandModal",
    title: "Edición de Marcas",
  },
};
