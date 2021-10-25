import { useRouter } from "next/router";

import Link from "next/link";

function ActiveLink({ children, href }) {
  const router = useRouter();

  var style = {
    color:
      router.asPath.split("/")[1] === href.split("/")[1]
        ? "white"
        : "rgba(255,255,255,.5)"
  };

  return (
    <Link href={href} passHref={true}>
      <a className="link" style={style}>
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink;
