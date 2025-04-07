
import { Link, useLocation } from 'react-router-dom';

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

const NavLinks = ({ isMobile = false, closeMenu }: NavLinksProps) => {
  const location = useLocation();

  const handleClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const commonLinks = [
    { path: "/search", label: "Search" },
    { path: "/likes", label: "Likes" },
    { path: "/sell", label: "Sell" },
  ];

  return (
    <>
      {commonLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={
            isMobile
              ? `font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md ${location.pathname === link.path ? 'font-bold' : 'font-normal'}`
              : `hover:text-thrift-sage transition-colors ${location.pathname === link.path ? 'font-bold' : 'font-normal'}`
          }
          onClick={handleClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
