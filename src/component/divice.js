import React, { useState, useEffect } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  MdLibraryAdd,
  MdLibraryAddCheck,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import Item from "./Item";

export default function Divice() {
  // lsdata() function help to fetch localStorage data
  const lsdata = () => {
    let note = localStorage.getItem("notes");
    if (note === null) {
      localStorage.setItem("notes", JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem("notes"));
  };

  // all useStates
  const [mynote, setMynote] = useState(lsdata());
  const [savbox, setsavbox] = useState({ display: "block" });
  const [txtbox, settxtbox] = useState({ display: "none" });
  const [adbtn, setadbtn] = useState({ display: "none" });
  const [srhbtn, setsrhbtn] = useState({ display: "block" });
  const [bgclrbox, setbgclrbox] = useState({ display: "none" });
  const [maincolr, setmaincolr] = useState({ backgroundColor: "#997549" });
  const [editbox, setEditbox] = useState({ display: "none" });
  const [backbox, setBackbox] = useState({ display: "none" });
  const [editid, setEditid] = useState(null);
  const [searchbox, setSearchbox] = useState({ display: "none" });

  // background colour objects
  const btnonj = [
    {
      name: "Brown",
      color: "#997549",
    },
    {
      name: "Coral",
      color: "#FF7F50",
    },
    {
      name: "Blue",
      color: "#6495ED",
    },
    {
      name: "Green",
      color: "#20B2AA",
    },
    {
      name: "Grey",
      color: "#778899",
    },
    {
      name: "Pink",
      color: "#FF69B4",
    },
  ];

  const chanbg = (n) => {
    setmaincolr({ backgroundColor: `${n}` });
  };
  const clrplate = () => {
    let bgbox = document.getElementById("boxbgclr");
    setbgclrbox({ display: bgbox.style.display === "none" ? "block" : "none" });
  };
  // add note function
  const addnote = () => {
    if (
      document.getElementById("texarrSm").value.length !== 0 &&
      document.getElementById("texarrLg").value.length !== 0
    ) {
      let texarrSm = document.getElementById("texarrSm");
      let texarrLg = document.getElementById("texarrLg");
      let obj = {
        title: texarrSm.value,
        descr: texarrLg.value,
      };
      setMynote([...mynote, obj]);
      document.getElementById("texarrSm").value = "";
      document.getElementById("texarrLg").value = "";
      setsavbox({ display: "block" });
      settxtbox({ display: "none" });
      setadbtn({ display: "none" });
      setsrhbtn({ display: "block" });
      setBackbox({ display: "none" });
    } else {
      alert("Please enter your notes");
    }
  };

  // show edit box function
  const showeditbox = (n) => {
    let edititle = document.getElementById("EtexarrSm");
    let edidescr = document.getElementById("EtexarrLg");
    let data = JSON.parse(localStorage.getItem("notes"));
    edititle.value = data[n].title;
    edidescr.value = data[n].descr;
    setsavbox({ display: "none" });
    settxtbox({ display: "none" });
    setEditbox({ display: "block" });
    setsrhbtn({ display: "none" });
    setEditid(n);
  };
  //edit note function
  const editnote = () => {
    let edititle = document.getElementById("EtexarrSm");
    let edidescr = document.getElementById("EtexarrLg");
    let obj = {
      title: edititle.value,
      descr: edidescr.value,
    };
    mynote.splice(editid, 1, obj);
    setMynote([...mynote]);
    setsavbox({ display: "block" });
    settxtbox({ display: "none" });
    setEditbox({ display: "none" });
    setsrhbtn({ display: "block" });
  };
  //delete note function
  const delt = (n) => {
    let filtnote = mynote.filter((elem, ind) => {
      return ind !== n;
    });
    setMynote(filtnote);
  };

  // useEffect help store data at localstorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(mynote));
  }, [mynote]);

  return (
    <div className="mainbox" id="mainbox" style={maincolr}>
      <div className="hed-sec" id="hed-sec">
        <h4>Magic Note</h4>
        <FaPaintBrush
          id="bgclr"
          style={{ color: "white", fontSize: "1.2rem" }}
          onClick={() => clrplate()}
        />
        <div className="img-box">
          <HiMenuAlt3
            onClick={() => {
              alert(
                "This website use your computer localstorage for store your notes data. This website create for educational purpuse."
              );
            }}
            style={{ color: "white", fontSize: "1.8rem" }}
          />
        </div>

        <div id="boxbgclr" style={bgclrbox}>
          {btnonj.map((btnclr, j) => {
            return (
              <button
                key={j}
                style={{ backgroundColor: btnclr.color }}
                onClick={() => {
                  chanbg(btnclr.color);
                }}
              ></button>
            );
          })}
        </div>
      </div>
      {/* save note section----- */}
      <div id="savnote" style={savbox}>
        {mynote.length < 1 ? (
          <h3 style={savbox}>Please Enter Your Note!</h3>
        ) : (
          mynote.map((elem, i) => {
            // console.log(i)
            return (
              <div className="" key={i}>
                <Item
                  title={elem.title}
                  descr={elem.descr}
                  edit={showeditbox}
                  bgclr={maincolr}
                  delt={delt}
                  delkey={i}
                  id={i}
                />
              </div>
            );
          })
        )}
      </div>
      {/* write text section--- */}
      <div id="textbox" style={txtbox}>
        <textarea
          name=""
          id="texarrSm"
          placeholder="Enter your note title"
        ></textarea>
        <textarea
          name=""
          id="texarrLg"
          placeholder="Enter your note description"
        ></textarea>
      </div>
      {/* edit textbox----- */}
      <div id="textbox" style={editbox}>
        <textarea
          name=""
          id="EtexarrSm"
          placeholder="Enter your note title"
        ></textarea>
        <textarea
          name=""
          id="EtexarrLg"
          placeholder="Enter your note description"
        ></textarea>
      </div>
      {/* search section----- */}
      <input
        type="text"
        name=""
        id="seachInput"
        onChange={(e) => {
          const titledata = document.getElementsByClassName("item");
          Array.from(titledata).forEach((elem) => {
            const title = elem.getElementsByTagName("h4")[0].innerHTML;
            console.log(title);
            if (title.includes(e.target.value)) {
              elem.classList.remove("dnone");
            } else {
              elem.classList.add("dnone");
            }
          });
        }}
        style={searchbox}
      />
      {/* footer section----- */}
      <div className="fot-sec" id="fot-sec">
        <div
          className="back-box"
          onClick={() => {
            setsavbox({ display: "block" });
            settxtbox({ display: "none" });
            setadbtn({ display: "none" });
            setsrhbtn({ display: "block" });
            setBackbox({ display: "none" });
          }}
          style={backbox}
        >
          <MdOutlineKeyboardBackspace
            style={{ color: "white", fontSize: "1.8rem" }}
          />
        </div>
        <div className="add-box" onClick={addnote} style={adbtn}>
          <MdLibraryAdd style={{ color: "white", fontSize: "1.8rem" }} />
        </div>
        <div
          className="edit-box"
          onClick={() => {
            editnote();
          }}
          style={editbox}
        >
          <MdLibraryAddCheck style={{ color: "white", fontSize: "1.8rem" }} />
        </div>
        <div className="search-box" style={srhbtn}>
          <AiOutlineFileSearch
            style={{ color: "white", fontSize: "1.7rem" }}
            onClick={() => {
              document.getElementById("seachInput").style.display === "block"
                ? setSearchbox({ display: "none" })
                : setSearchbox({ display: "block" });
            }}
          />
        </div>
        <div
          className="create-box"
          style={srhbtn}
          onClick={() => {
            setsavbox({ display: "none" });
            settxtbox({ display: "block" });
            setadbtn({ display: "block" });
            setsrhbtn({ display: "none" });
            setBackbox({ display: "block" });
          }}
        >
          <SlNote style={{ color: "white", fontSize: "1.5rem" }} />
        </div>
      </div>
    </div>
  );
}
