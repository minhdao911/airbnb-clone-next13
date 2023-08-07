import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/client-only";
import Navbar from "../components/navbar";

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
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
