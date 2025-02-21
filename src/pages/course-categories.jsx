import {httpInterceptedService} from "@core/http-serviece";
import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useState} from "react";
import CategoryList from "../features/categories/components/category-list.jsx";
import {t} from "i18next";
import Modal from "../components/modal.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import AddOrUpdateCategories from "../features/categories/components/add-or-update-categories.jsx";
import {useCategoryContext} from "../features/categories/components/category-context.jsx";

const CourseCategories = () => {
    const data = useLoaderData();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [showAddCategory, setShowAddCategory] = useState(false);
    const {category} = useCategoryContext();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const deleteCategory = categoryId => {
        setSelectedCategory(categoryId);
        setShowDeleteModal(true);
    }
    const handleDeleteCategory = async () => {
        setShowDeleteModal(false);
        const response = httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`);
        toast.promise(
            response, {
                pending: t('toastNotification.deletePending'),
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        return t('toastNotification.success')
                    }
                },
                error: {
                    render({data}) {
                        return t('categoryList.' + data.response.data.code)
                    }
                }
            }, {
                position: toast.POSITION.BOTTOM_LEFT
            }
        )
    }
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className='d-flex align-items-center justify-content-between mb-5'>
                        <a className='btn btn-primary fw-bolder mt-n1' href='#' onClick={() => setShowAddCategory(true)}
                           data-direction={localStorage.getItem('language') === 'fa' ? 'rtl' : 'ltr'}>
                            <i className='fas fa-plus ms-2'></i>
                            {t('coursesLayout.addNewCategories')}
                        </a>
                    </div>
                    {
                        (showAddCategory || category) && <AddOrUpdateCategories setShowAddCategory={setShowAddCategory}/>
                    }
                    <Suspense fallback={<p className='text-info'>{t('loaderString.loading')}</p>}>
                        <Await resolve={data}>
                            {(loadedCategories) => <CategoryList deleteCategory={deleteCategory}
                                                                 categories={loadedCategories}/>}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Modal isOpen={showDeleteModal} open={setShowDeleteModal} title="حذف"
                   body='آیا از حذف این دسته مطمعن هستید ؟'>
                <button type='button' className='btn btn-secondary fw-bolder' onClick={() => setShowDeleteModal(false)}>
                    انصراف
                </button>
                <button type='button' className='btn btn-primary fw-bolder' onClick={handleDeleteCategory}>
                    حذف
                </button>
            </Modal>
        </>
    )
}



export async function categoriesLoader ({request}){
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/CourseCategory/sieve';
    url += `?page=${page}&pageSize=${pageSize}`;
    const response = await httpInterceptedService.get(url);
    return response.data;
}

export default CourseCategories;