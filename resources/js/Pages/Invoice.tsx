import React from "react";

const Invoice: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg border border-gray-200 p-8 mt-10">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-indigo-700">Invoice</h1>
        <p className="text-sm text-gray-600">Shopping Mall</p>
      </div>

      {/* Customer Details */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">TO: Ricky Merritt</h2>
        <p className="text-sm text-gray-500">4279 Joes Road</p>
        <p className="text-sm text-gray-500">New York (NY), 12207</p>
        <p className="text-sm text-gray-500">518-421-6499</p>
      </div>

      {/* Invoice Table */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100 text-gray-700 text-left">
              <th className="p-3 border border-gray-300">Description</th>
              <th className="p-3 border border-gray-300 text-center">Qty</th>
              <th className="p-3 border border-gray-300 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((_, i) => (
              <tr key={i} className="text-gray-600">
                <td className="p-3 border border-gray-300">#0{i + 1} Items Description</td>
                <td className="p-3 border border-gray-300 text-center">1</td>
                <td className="p-3 border border-gray-300 text-right">$0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="mt-6 flex justify-between text-gray-700 font-medium">
        <p>Sub Total</p>
        <p>$0.00</p>
      </div>
      <div className="mt-2 flex justify-between text-gray-700 font-medium">
        <p>Tax</p>
        <p>$0.00</p>
      </div>
      <div className="mt-2 flex justify-between text-indigo-700 font-bold">
        <p>Total</p>
        <p>$0.00</p>
      </div>

      {/* Terms Section */}
      <div className="mt-8 text-sm text-gray-500">
        <p className="font-semibold">Terms and Conditions Apply</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, vestibulum.</p>
      </div>
    </div>
  );
};

export default Invoice;
