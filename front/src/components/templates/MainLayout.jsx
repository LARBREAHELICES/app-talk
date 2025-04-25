export default function MainLayout({ children, sidebar, className }) {

  if(sidebar)
    return (
      <div className="flex flex-row">
        <main className="basis-1/3 ml-8 mt-6 ">{children}</main>
        <aside className="basis-2/3 ml-8 mr-8 mt-6">{sidebar}</aside>
      </div>
    )

  return (
    <div className="ml-12 mt-6 mr-12 mb-12">
      <main >{children}</main>
    </div>
  )
}
