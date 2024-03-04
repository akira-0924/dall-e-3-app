import React, { ReactNode } from "react";

const FeatureLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="text-gray-600 body-font font-semibold">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-10 text-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default FeatureLayout;
