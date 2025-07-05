import ContentHeader from "../../admin/component/ContentHeader";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContentHeader page="trips" />
      {children}
    </>
  );
}

export default layout;
