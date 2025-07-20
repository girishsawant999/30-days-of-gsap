import React from "react";
import BackButton from "./BackButton";
import ReloadButton from "./ReloadButton";

const PageWrapper = ({
  children,
  onReload,
}: {
  children: React.ReactNode;
  onReload?: () => void;
}) => {
  return (
    <section className="grid md:grid-cols-2 gap-5  md:gap-10 relative place-items-stretch w-full  min-h-dvh p-5 md:p-10  overflow-x-hidden">
      <div className="flex items-center gap-3 md:fixed top-10 left-10 z-10">
        <BackButton />
        {onReload && <ReloadButton onReload={onReload} />}{" "}
      </div>
      {children}
    </section>
  );
};

export default PageWrapper;
