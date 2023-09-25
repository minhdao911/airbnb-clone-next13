import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "../../components/client-only";
import LanguageModal from "../../components/modals/language-modal";
import Navbar from "../../components/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <Navbar currentUser={currentUser} />
        <LanguageModal />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
