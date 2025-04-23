export default function MainLayout({ children, sidebar }) {
  return (
    <div className="flex flex-row">
      <main className="basis-1/3 ml-8 mt-6 " >{children}</main>
      <aside className="basis-2/3 ml-8 mr-8 mt-6" >{sidebar}</aside>
    </div>
  );
}