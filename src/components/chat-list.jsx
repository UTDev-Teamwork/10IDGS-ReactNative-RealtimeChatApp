import "./usernamelist.css"
import { Link } from "react-router-dom";


export const ChatList = ({ tab, setTab, myname, privateChats }) => {
  return (
    <>
      {[...privateChats.keys()].map((name, index) => (
        name !== myname &&
        <Link to={`contacts/${name}`}>
          <li
          onClick={() => {
            setTab(name);
          }}
          key={index}
        >
          <img src={`https://picsum.photos/seed/${name}/100/100`} alt={name} className="img-profile" />
          {name}
        </li>
        </Link>
      ))}
    </>
  );
}
