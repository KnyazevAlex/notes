import Sidebar from "@/(components)/Sidebar";
import Createnotes from "@/(components)/Createnotes";
import Header from "@/(components)/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-auto ">

      <Createnotes />
      
      <div className="flex flex-col flex-1 h-full overflow-auto ">
        <Header />
        <main className="h-screen p-8 bg-[#1E293B] justify-center items-center overflow-y-auto  ">
          {children}
        </main>
      </div>
    </div>
  );
}