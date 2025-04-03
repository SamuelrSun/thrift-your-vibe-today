
import { Link } from 'react-router-dom';

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

const NavLinks = ({ isMobile = false, closeMenu }: NavLinksProps) => {
  const handleClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const commonLinks = [
    { path: "/search", label: "Search" },
    { path: "/explore", label: "Explore" },
    { path: "/likes", label: "Likes" },
    { path: "/sell", label: "Sell" },
    { path: "/about", label: "About" }
  ];

  return (
    <>
      {commonLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={
            isMobile
              ? "font-medium px-3 py-2 hover:bg-thrift-lightgray rounded-md"
              : "font-medium hover:text-thrift-sage transition-colors"
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
