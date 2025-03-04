import React from "react";

interface StatCardProps {
  title: string;
  subtitle: string;
  value?: number | string;
  icons?: string[];
}

const StatCard: React.FC<StatCardProps> = ({ title, subtitle, value, icons }) => {
  return (
    <div className="bg-white shadow-md shadow-gray-400 p-4 rounded-lg flex-1 m-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      {icons ? (
        <div className="flex gap-2 mt-4">
          {icons.map((icon, index) => (
            <span
              key={index}
              className={`w-10 h-10 flex items-center justify-center  rounded-md border-2 ${
                icon === "L"
                  ? "border-red-600 text-red-500"
                  : icon === "R"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {icon.toUpperCase()}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-yellow-400 text-xl font-bold mt-4">{value}</p>
      )}
    </div>
  );
};

export default StatCard;