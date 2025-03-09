import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableCan from "../../components/TableCan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCompany, UpdateCompany } from "../../../util/mutations/bettingCompany";
import { fetchCompanies } from "../../../util/queries/BettingCompanies";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CompaniesRow from "./CompaniesRow";
import Loarder from "../../components/Loarder";
import { API_DOMAIN_images } from "../../../util/apiConfig";

const BettingCompany = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get("authToken");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { mutate: addCompany, isPending: isAdding } = useMutation({
    mutationKey: ["addingCompany"],
    mutationFn: (formData: FormData) => createCompany(formData, token || ""),
    onSuccess: () => {
      toast.success("Betting Company added successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      formik.resetForm();
      setPreviewImage(null);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add company");
    },
  });

  const { mutate: updateCompany, isPending: isUpdating } = useMutation({
    mutationKey: ["updatingCompany"],
    mutationFn: (formData: FormData) => UpdateCompany(formData,editingId, token || ""),
    onSuccess: () => {
      toast.success("Betting Company updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      formik.resetForm();
      setPreviewImage(null);
      setIsEditing(false);
      setEditingId(null);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update company");
    },
  });

  const { data: companies, isLoading: isFetching, refetch } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(token || ""),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      logo: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      logo: Yup.mixed()
        .nullable()
        .test("fileType", "Invalid file type. Allowed: png, jpg", (file: any) =>
          file ? ["image/png", "image/jpeg"].includes(file.type) : true
        ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.logo) formData.append("logo", values.logo);
      
      if (isEditing && editingId) {
        formData.append("id", editingId.toString());
        updateCompany(formData);
      } else {
        addCompany(formData);
      }
    },
  });

  const handleEdit = (company: any) => {
    setIsEditing(true);
    setEditingId(company.id);
    formik.setValues({
      title: company.title,
      logo: null,
    });
    setPreviewImage(company.logo ? `${API_DOMAIN_images}${company.logo}` : null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    formik.resetForm();
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Betting Companies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bg-white shadow-md shadow-gray-500 rounded-md p-4">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-lg">Title</label>
              <input
                type="text"
                className="py-4 bg-gray-200 rounded-md px-2"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="logo" className="text-lg">Logo</label>
              <input
                type="file"
                className="py-4 bg-gray-200 rounded-md px-2"
                name="logo"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  formik.setFieldValue("logo", file);

                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {formik.touched.logo && formik.errors.logo && (
                <p className="text-red-500 text-sm">{formik.errors.logo}</p>
              )}
            </div>

            {previewImage && (
              <div className="mt-4">
                <label className="text-lg">Preview</label>
                <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-md mt-2" />
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="py-4 px-2 bg-[#bc2b2b] w-full rounded-md text-white"
                disabled={isAdding || isUpdating}
              >
                {isEditing ? (isUpdating ? "Updating..." : "Update Company") : (isAdding ? "Adding..." : "Add Company")}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-4 px-2 bg-gray-500 w-full rounded-md text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="px-4">
          {isFetching ? (
            <Loarder />
          ) : (
            <TableCan
              headerTr={["Company", "Action"]}
              dataTr={companies?.data}
              TrName={(props) => (
                <CompaniesRow {...props} onEdit={handleEdit} />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BettingCompany;