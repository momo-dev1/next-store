import Link from "next/link";
import Image from "next/image";
import { fetchJson } from "../lib/api";
import { useQuery } from "react-query";
import { useSignOut } from "../hooks/sign-out";
const Navbar = () => {
  const signOut = useSignOut();
  const query = useQuery(
    "user",
    async () => {
      try {
        return await fetchJson("http://localhost:3000/api/user");
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, // ms time to make a new req not auto
    }
  );
  const user = query.data;

  return (
    <div className="bg-gray-100 shadow-md ">
      <nav className="flex items-center justify-between h-12 p-4 mx-auto max-w-7xl">
        <Link href="/">
          <a className="text-2xl font-extrabold">Next Shop</a>
        </Link>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center gap-2 pr-4">
                <div className="flex items-center p-1 border-2 border-gray-500 rounded-full">
                  <Image
                    width={20}
                    height={20}
                    src="https://pics.freeicons.io/uploads/icons/png/19339625881548233621-512.png"
                  ></Image>
                </div>

                <h3 className="text-lg font-semibold">{user.name}</h3>
              </div>
              <p
                onClick={signOut}
                className="px-2 py-1 text-white bg-indigo-600 rounded-md"
              >
                Sign Out
              </p>
            </div>
          ) : (
            <Link href="/sign-in">
              <a className="px-2 py-1 text-white bg-indigo-600 rounded-md">
                Sign In
              </a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
