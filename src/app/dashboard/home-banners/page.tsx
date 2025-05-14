import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeleteHomeBannerModalContainer from "@/sections/home-banners/delete/delete-home-banner-modal-conainer";
import HomeBannerDetailsModalContainer from "@/sections/home-banners/details/home-banner-details-modal-container";
import EditHomeBannerModalContainer from "@/sections/home-banners/form/edit/edit-home-banner-modal-container";
import NewHomeBannerFormContainer from "@/sections/home-banners/form/new/new-home-banner-form-container";
import HomeBannersContainer from "@/sections/home-banners/home-banners-container";
import { getHomeBannersList } from "@/services/home-banners";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function HomeBannersPage({ searchParams }: Props) {
  const res = await getHomeBannersList(await searchParams);

  if (!res.response || res.error)
    throw new Error("Error fetching home banners");
  return (
    <>
      <HomeBannersContainer homeBanners={res.response} />
      <Modal
        formPath={modalTypes.newHomeBannerModal.name}
        title={modalTypes.newHomeBannerModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
        <NewHomeBannerFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editHomeBannerModal.name}
        title={modalTypes.editHomeBannerModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
        <EditHomeBannerModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.detailsHomeBannerModal.name}
        title={modalTypes.detailsHomeBannerModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
        <HomeBannerDetailsModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.deleteHomeBannerModal.name}
        maxWidth="max-w-xl"
      >
        <DeleteHomeBannerModalContainer />
      </Modal>
    </>
  );
}
