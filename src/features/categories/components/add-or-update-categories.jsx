import {useForm} from "react-hook-form";
import {httpInterceptedService} from "@core/http-serviece";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useCategoryContext} from "./category-context.jsx";
import {useEffect} from "react";

const AddOrUpdateCategories = ({setShowAddCategory}) => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const {category, setCategory} = useCategoryContext();
    useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('id', category.id);
        }
    }, [category])
    const onClose = () => {
        setShowAddCategory(false);
        setCategory(null);
    }
    const onSubmit = (data) => {
        setShowAddCategory(false);
        const response = httpInterceptedService.post('/CourseCategory/', data);
        toast.promise(
            response, {
                pending: {
                    render() {
                        if (category) {
                            return t('toastNotification.updatePending')
                        } else {
                            return t('toastNotification.deletePending');
                        }
                    }
                },
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        if (category) {
                            setCategory(null)
                        }
                        return t('toastNotification.success')
                    }
                },
                error: {
                    render({data}) {
                        if (data.response.status === 400) {
                            return t('categoryList.' + data.response.data.code)
                        } else {
                            return 'خطا در اجرای عملیات'
                        }
                    }
                }
            }, {
                position: toast.POSITION.BOTTOM_LEFT
            }
        )
    }
    return (
        <div className="card">
            <div className="card-body">
                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-label">نام</label>
                        <input
                            className={`form-control form-control-lg ${
                                errors.name && "is-invalid"
                            }`}
                            {...register("name", {required: true})}
                        />
                        {errors.name && errors.name.type === "required" && (
                            <p className="text-danger small fw-bolder mt-1">
                                نام الزامی است
                            </p>
                        )}
                    </div>
                    <div className="text-start mt-3">
                        <button
                            type="button"
                            className="btn btn-lg btn-secondary ms-2"
                            onClick={onClose}
                        >
                            بستن
                        </button>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary ms-2"
                        >
                            ثبت تغییرات
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddOrUpdateCategories;