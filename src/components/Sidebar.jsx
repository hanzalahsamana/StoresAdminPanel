import Link from "next/link";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-gray-800 text-white w-[250px] h-[calc(100vh-50px)] space-y-6 py-7 px-2 absolute inset-y-0 top-[50px] left-0 transform ${
        !isOpen ? "translate-x-0" : "-translate-x-full"
      } transition duration-200 ease-in-out z-10 `}
    >
      <Link href="#" className="text-white text-2xl font-semibold block px-4">
        MyApp
      </Link>
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href={"/Products"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Products
        </Link>
        <Link
          href={"/orders"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Orders
        </Link>
        <Link
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Reports
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
