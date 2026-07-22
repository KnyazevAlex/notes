import Sidebar from "@/(components)/Sidebar";
import verifySession from "@/(server-components)/sessions/verifySession";
import Createnotes from "@/(components)/Createnotes";
import Header from "@/(components)/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
})
 {

  const user  = await verifySession()


  return (
    <div className="flex h-screen w-screen overflow-auto ">
        <Sidebar></Sidebar>
      <Createnotes />
      
      <div className="flex flex-col flex-1 h-full overflow-auto ">
        <Header 
        username={user.name}
        />
        <main className="h-screen p-8 bg-[#1E293B] justify-center items-center overflow-y-auto  ">
          {children}
        </main>
      </div>
    </div>
  );
}