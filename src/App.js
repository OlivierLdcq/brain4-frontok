import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import "./App.css";
import Title from "./Components/Title/Title";
import LinkForm from "./Components/LinkForm/LinkForm";
import UserPanel from "./Components/UserPanel/UserPanel";
import Display from "./Components/Display/Display";
import Warper1 from "./Components/Warper1/Warper1";
import Warper2 from "./Components/Warper2/Warper2";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";

const App = () => {
  //<--> Route <-->
  const [route, setRoute] = useState("signin");
  const changeRoute = (route) => {
    console.log(route);
    switch (route) {
      case "home":
        setRoute(route);
        setIsUserLoggedIn(true);
        setNavList(["signout", "register"]);
        break;
      case "signin":
        setRoute(route);
        setIsUserLoggedIn(false);
        setNavList(["register"]);
        break;
      case "register":
        setRoute(route);
        setIsUserLoggedIn(false);
        setNavList(["signin"]);
        break;
      case "signout":
        setRoute("signin");
        setIsUserLoggedIn(false);
        setNavList(["register"]);
        setUser({});
        setBox({});
        break;

      default:
        break;
    }
  };
  //<-->User Logged In ?<-->
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const updateIsUserLoggedIn = (bool) => {
    setIsUserLoggedIn(bool);
  };

  //<--> NavLinks <-->
  const [navList, setNavList] = useState(["register"]);

  //<--> Input url  <-->
  const [input, setInput] = useState(
    "https://cdn.wegow.com/media/artists/john-mayer/john-mayer-1492985123.1.jpg"
  );
  const inputChanged = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  //<--> Submit image url  <-->
  const [url, setUrl] = useState(
    "https://cdn.wegow.com/media/artists/john-mayer/john-mayer-1492985123.1.jpg"
  );
  //<--> Window state is getting updated when window is resized // doesnt really work
  const [windowWidth, setWindowWidth] = useState("");
  const handleWindowResize = (size) => {
    setWindowWidth(size.innerWidth);
    // imageSubmit();
  };
  window.addEventListener("resize", handleWindowResize);

  const transposeBox = (data) => {
    const Image = document.getElementById("Image");
    const width = Image.width;
    const height = Image.height;
    const leftCol = width * data.left_col;
    const topRow = height * data.top_row;
    const rightCol = width - width * data.right_col;
    const bottomRow = height - height * data.bottom_row;
    console.log(leftCol, topRow, rightCol, bottomRow);
    return { leftCol, topRow, rightCol, bottomRow };
  };

  const imageSubmit = () => {
    console.log("imageSub");
    resetBox();
    fetch("https://frozen-sands-03548.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        updateUser(data);
        console.log(data);
      })
      .catch((err) => console.log("error"));

    fetch("https://frozen-sands-03548.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: input }),
    })
      .then((responseApi) => responseApi.json())
      .then((response) => {
        console.log(response);
        const data =
          response.outputs[0].data.regions[0].region_info.bounding_box;
        console.log(data);
        setBox(transposeBox(data));
        setBoxVisibility(true);
      })
      .catch((err) => {
        resetBox();
        setBoxVisibility(false);
      });
    setUrl(input);
  };

  //<-->Getting Box data <-->
  const [box, setBox] = useState({
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  });
  const [boxVisibility, setBoxVisibility] = useState(true);
  const resetBox = () => {
    setBox({ leftCol: 0, topRow: 0, rightCol: 0, bottomRow: 0 });
  };
  useEffect(() => {
    console.log(box);
  });

  //<-->Logged User <-->
  const [user, setUser] = useState({
    name: "Olivier",
    email: "",
    id: 0,
    count: 0,
  });
  const updateUser = (user) => {
    setUser(user);
  };
  useEffect(() => {
    console.log("this is your loged user : ", user);
  }, [user]);
  return (
    <div className="App pdark min-vh-100 text-light">
      <Navigation
        navList={navList}
        isUserLoggedIn={isUserLoggedIn}
        route={route}
        changeRoute={changeRoute}
      />
      <div className="container">
        {route === "home" ? (
          <div>
            {" "}
            <Title />
            <UserPanel user={user} />
            <Warper1>
              <div>
                <LinkForm
                  input={input}
                  inputChanged={inputChanged}
                  imageSubmit={imageSubmit}
                />
                {boxVisibility ? <Display url={url} box={box} /> : undefined}
              </div>
            </Warper1>
          </div>
        ) : route === "signin" ? (
          <Warper2>
            <SignIn
              changeRoute={changeRoute}
              route={route}
              updateUser={updateUser}
            />
          </Warper2>
        ) : route === "register" ? (
          <Warper2>
            <Register
              changeRoute={changeRoute}
              route={route}
              updateUser={updateUser}
            />
          </Warper2>
        ) : undefined}
      </div>
    </div>
  );
};

export default App;
