import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();

  var style = {
    color:
      router.asPath.split("/")[1] === href.split("/")[1]
        ? "white"
        : "rgba(255,255,255,.5)"
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a className="link" href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
