// import { useQuery } from "@tanstack/react-query";
// import { API_DOMAIN } from "../../util/apiConfig";
// import Cookies from "js-cookie";



// // const CompanyOptions = companies
// //   ? companies.map((company: Company) => ({
// //       value: company.id,
// //       label: company.name,
// //     }))
// //   : [];

// interface FilterOption {
//   id: string;
//   label: string;
//   type: "range" | "checkbox";
//   min?: number;
//   max?: number;
//   options?: { id: string; label: string }[];
// }

// export const filterOptions: FilterOption[] = [
//   {
//     id: "odds",
//     label: "Odds",
//     type: "range",
//     min: 0,
//     max: 1000,
//   },
//   {
//     id: "bettingCompany",
//     label: "Betting Company",
//     type: "checkbox",
//     options: CompanyOptions, // ✅ Now correctly waits for data
//   },
//   {
//     id: "winRate",
//     label: "Win Rate",
//     type: "range",
//     min: 0,
//     max: 100,
//   },
//   {
//     id: "category",
//     label: "Category",
//     type: "checkbox",
//     options: [
//       { id: "football", label: "Football" },
//       { id: "basketball", label: "Basketball" },
//       { id: "tennis", label: "Tennis" },
//       { id: "hockey", label: "Hockey" },
//     ],
//   },
// ];
