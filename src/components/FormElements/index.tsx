"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectGroupThree from "@/components/FormElements/SelectGroup/SelectGroupThree";

const FormElements = () => {
  return (
    <>
      <Breadcrumb pageName="FormElements" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
              {/* <!-- titre de service --> */}
              <div
                  className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                      <h3 className="font-medium text-dark dark:text-white">
                          Titre de service
                      </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                      <div>

                          <input
                              type="text"
                              placeholder="Ajouter un Titre"
                              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                      </div>

                  </div>
              </div>


              {/* <!-- image de service --> */}
              <div
                  className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                      <h3 className="font-medium text-dark dark:text-white">
                          Image de service
                      </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                          <input
                              type="file"
                              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          />
                      </div>

                  </div>
              </div>
              {/* <!-- prix de service --> */}

              <div
                  className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                      <h3 className="font-medium text-dark dark:text-white">
                          Prix de service
                      </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                      <div>

                          <input
                              type="text"
                              placeholder="Ajouter une description de vos prix"
                              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                      </div>

                  </div>
              </div>
          </div>

          <div className="flex flex-col gap-9">
              {/* <!-- Description de service --> */}
              <div
                  className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                      <h3 className="font-medium text-dark dark:text-white">
                          Description de service
                      </h3>
                  </div>
                  <div className="flex flex-col gap-6 p-6.5">
                      <div>

                <textarea
                    rows={6}
                    placeholder="Ajouter une description de votre service"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>


          {/* <!-- Catégories --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
Séléctionner les catégories de votre service
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupThree />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
