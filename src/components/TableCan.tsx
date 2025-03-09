import React from "react";

interface TableCanProps {
  headerTr: string[];
  dataTr: any[];
  TrName: React.ComponentType<any>;
  headerAlign?: string;
  trNameProps?: Record<string, any>;
}

const TableCan: React.FC<TableCanProps> = ({ 
  headerTr, 
  dataTr, 
  TrName, 
  headerAlign = "center",
  trNameProps = {} 
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm shadow-gray-400">
      <div className="overflow-auto specific-scroll rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#FFDADA] text-black capitalize">
            <tr>
              {headerTr.map((item, index) => (
                <th
                  key={index}
                  className={`p-4 text-${headerAlign} capitalize`}
                >
                  <div className="flex items-center gap-2 text-nowrap">
                    {index === 0 && (
                      <input
                        type="checkbox"
                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                      checked:bg-pink-600 checked:border-pink-600 focus:ring-2 focus:ring-pink-500 
                      relative flex items-center justify-center 
                      checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold 
                      checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                      />
                    )}
                    {item}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTr && dataTr.length > 0 ? (
              dataTr.map((data, index) => (
                <TrName key={index} displayData={data} index={index} {...trNameProps} />
              ))
            ) : (
              <tr>
                <td colSpan={headerTr.length} className="text-center py-4 px-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCan;