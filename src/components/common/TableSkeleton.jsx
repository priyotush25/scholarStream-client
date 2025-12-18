import React from "react";

const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
      <table className="table w-full">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(cols)].map((_, i) => (
              <th key={i} className="py-4 px-6">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {[...Array(cols)].map((_, colIndex) => (
                <td key={colIndex} className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {/* Optional Circle Skeleton for first col (like details page) */}
                    {colIndex === 0 && (
                      <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full shrink-0"></div>
                    )}
                    <div className="space-y-2 w-full">
                      <div
                        className={`h-4 bg-gray-200 animate-pulse rounded ${
                          colIndex === 0 ? "w-32" : "w-24"
                        }`}
                      ></div>
                      {colIndex === 0 && (
                        <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                      )}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
