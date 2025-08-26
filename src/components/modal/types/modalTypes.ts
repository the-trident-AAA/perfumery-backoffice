export interface InfoModal {
  name: string;
  // matadata
  entity?: string; // id entity
  elements?: any[];
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
  editPerfumeTypeModal: SectionModal;
  editScentModal: SectionModal;
  deleteBrandModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  deleteScentModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  newHomeBannerModal: SectionModal;
  selectablePerfumesModal: SectionModal;
  editHomeBannerModal: SectionModal;
  detailsHomeBannerModal: SectionModal;
  deleteHomeBannerModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  deletePerfumeTypeModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  detailsUserModal: SectionModal;
  detailsOrderModal: SectionModal;
  editOrderModal: SectionModal;
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
  editPerfumeTypeModal: {
    name: "editPerfumeTypeModal",
    title: "Edición de Tipo de Perfume",
  },
  editScentModal: {
    name: "editScentModal",
    title: "Edición del Aroma",
  },
  deleteBrandModal: {
    name: "deleteBrandModal",
    title: "Eliminación de Marca",
    message: "¿Está seguro de que desea eliminar esta Marca?",
    warningMessage:
      "Esta acción provocará la eliminación permanente de la Marca.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  deleteScentModal: {
    name: "deleteScentModal",
    title: "Eliminación del Aroma",
    message: "¿Está seguro de que desea eliminar este Aroma?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del aroma.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  newHomeBannerModal: {
    name: "newHomeBannerModal",
    title: "Formulario de Creación de Banner de Página Principal",
  },
  selectablePerfumesModal: {
    name: "selectablePerfumesModal",
    title: "Seleccione los Perfumes",
  },
  editHomeBannerModal: {
    name: "editHomeBannerModal",
    title: "Formulario de Edición de Banner de Página Principal",
  },
  detailsHomeBannerModal: {
    name: "detailsHomeBannerModal",
    title: "Detalles del Banner de Página Principal",
  },
  deleteHomeBannerModal: {
    name: "deleteHomeBannerModal",
    title: "Eliminación de Banner de la Página Principal",
    message:
      "¿Está seguro de que desea eliminar el Banner de la Página Principal?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del Banner de la Página Principal.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  deletePerfumeTypeModal: {
    name: "deletePerfumeTypeModal",
    title: "Eliminación de Tipo de Perfume",
    message: "¿Está seguro de que desea eliminar este tipo de perfume?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del Tipo de Perfume.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  detailsUserModal: {
    name: "detailsUserModal",
    title: "Detalles del Usuario",
  },
  detailsOrderModal: {
    name: "detailsOrderModal",
    title: "Detalles del Pedido",
  },
  editOrderModal: {
    name: "editOrderModal",
    title: "Formulario de Edición de Orden",
  },
};
