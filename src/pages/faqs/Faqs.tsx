import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableCan from "../../components/TableCan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFaq, UpdateFaqs } from "../../../util/mutations/faqs";
import { fetchFaqs } from "../../../util/queries/Faqs";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import FaqsRow from "./FaqsRow";
import Loarder from "../../components/Loarder";
import FilterTab from "../../components/FilterTab";

const faqTypes = ["ranking", "subscription", "tip"] as const;
type FaqType = typeof faqTypes[number];

const Faqs = () => {
    const queryClient = useQueryClient();
    const token = Cookies.get("authToken");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<FaqType | "tip">("tip");

    const { mutate: addFaq, isPending: isAdding } = useMutation({
        mutationKey: ["addingFaq"],
        mutationFn: (data: any) => createFaq(data, token || ""),
        onSuccess: () => {
            toast.success("FAQ added successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            formik.resetForm();
            refetch();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to add FAQ");
        },
    });

    const { mutate: updateFaqMutation, isPending: isUpdating } = useMutation({
        mutationKey: ["updatingFaq"],
        mutationFn: (data: any) => UpdateFaqs(data, editingId, token || ""),
        onSuccess: () => {
            toast.success("FAQ updated successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            formik.resetForm();
            setIsEditing(false);
            setEditingId(null);
            refetch();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update FAQ");
        },
    });

    const { data: faqs, isLoading: isFetching, refetch } = useQuery({
        queryKey: ["faqs"],
        queryFn: () => fetchFaqs(token || ""),
    });

    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
            type: "ranking" as FaqType,
        },
        validationSchema: Yup.object({
            question: Yup.string().required("Question is required"),
            answer: Yup.string().required("Answer is required"),
            type: Yup.string()
                .oneOf(faqTypes, "Invalid FAQ type")
                .required("Type is required"),
        }),
        onSubmit: (values) => {
            if (isEditing && editingId) {
                updateFaqMutation(values);
            } else {
                addFaq(values);
            }
        },
    });

    const handleEdit = (faq: any) => {
        setIsEditing(true);
        setEditingId(faq.id);
        formik.setValues({
            question: faq.question,
            answer: faq.answer,
            type: faq.type,
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingId(null);
        formik.resetForm();
    };

    const tabs = [
        { name: "Tip", value: "tip" },
        { name: "Subscription", value: "subscription" },
        { name: "Ranking", value: "ranking" },
    ];

    const handleFilter = (value: string) => {
        setSelectedFilter(value as FaqType | "all");
    };

    // Filtered FAQs based on selected type
    const filteredFaqs = selectedFilter === "all"
        ? faqs?.data
        : faqs?.data?.filter((faq: any) => faq.type === selectedFilter);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">FAQs Management</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="bg-white shadow-md shadow-gray-500 rounded-md p-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="question" className="text-lg">Question</label>
                            <input
                                type="text"
                                className="py-4 bg-gray-200 rounded-md px-2"
                                name="question"
                                value={formik.values.question}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.question && formik.errors.question && (
                                <p className="text-red-500 text-sm">{formik.errors.question}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 mt-4">
                            <label htmlFor="answer" className="text-lg">Answer</label>
                            <textarea
                                className="py-4 bg-gray-200 rounded-md px-2 min-h-[100px]"
                                name="answer"
                                value={formik.values.answer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.answer && formik.errors.answer && (
                                <p className="text-red-500 text-sm">{formik.errors.answer}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 mt-4">
                            <label htmlFor="type" className="text-lg">Type</label>
                            <select
                                className="py-4 bg-gray-200 rounded-md px-2"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {faqTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.type && formik.errors.type && (
                                <p className="text-red-500 text-sm">{formik.errors.type}</p>
                            )}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="py-4 px-2 bg-[#bc2b2b] w-full rounded-md text-white"
                                disabled={isAdding || isUpdating}
                            >
                                {isEditing ? (isUpdating ? "Updating..." : "Update FAQ") : (isAdding ? "Adding..." : "Add FAQ")}
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

                <div className="bg-white rounded-md shadow-md shadow-gray-400 lg:p-4 flex flex-col gap-6 h-fit">
                    <FilterTab
                        tabs={tabs}
                        handleValue={handleFilter}
                        activeTab={tabs[0].name}
                    />
                    {isFetching ? (
                        <Loarder />
                    ) : (
                        <TableCan
                            headerTr={["Question", "Answer", "Action"]}
                            dataTr={filteredFaqs}
                            TrName={(props) => (
                                <FaqsRow {...props} onEdit={handleEdit} />
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
