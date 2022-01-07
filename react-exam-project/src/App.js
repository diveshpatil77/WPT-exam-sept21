import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const stdname = "Divesh";
  const stdid = "024";

  const [valid, setValid] = useState(false);
  const [msg, setMsg] = useState("");

  const [list, setList] = useState([]);

  const inputMsgFun = (e) => {
    setMsg(e.target.value);
  };

  const send = async () => {
    // console.log(msg);

    // const url = "http://localhost:6000/addMessages";
    // const msgData = { msg: msg };
    // await axios.post(url, msgData);

    if (msg == "") {
      setValid(true);
      return;
    }
    setList([...list, msg]);
    setMsg("");
  };

  const getMsg = async () => {
    const url = "http://localhost:6000/getMessages";
    const list = await axios.get(url);

    const newlist = [list.data];
    setList(...newlist);
  };

  useEffect(() => getMsg(), []);
  return (
    <div className="container-fluid ">
      <div className="row bg-black text-light ">
        <div className="col d-flex">
          <h1>MyChatApp </h1>
          <span className=" d-flex align-items-end ">
            <h6>
              by {stdname}
              {stdid}
            </h6>
          </span>
        </div>
      </div>

      <div className="m-2 fs-4   ">
        <input
          className={
            msg == "" && valid
              ? "m-2 w-75 border border-danger rounded-3"
              : "m-2 w-75 rounded-3 "
          }
          type="text"
          placeholder="Lets chat here..."
          value={msg}
          onChange={inputMsgFun}
        />
        <input
          className="m-1 rounded-3 "
          type="button"
          value=" SEND"
          onClick={send}
        />
      </div>

      <div>
        {list.map((item, index) => (
          <div>
            <h5
              key={index}
              className="alert-secondary p-1 ps-2 m-2 border-1 border-dark rounded-3"
            >
              {item}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
