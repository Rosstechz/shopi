import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link href={href} className="hover:text-slate-800 hover:scale-105 transition font-light hover:underline text-lg">
      {label}
    </Link>
  );
};

export default NavLink;
