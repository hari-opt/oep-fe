import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./index.css";

function NewsAndNotifications() {
  const jwt = Cookies.get("jwt");

  const [newsAndNoti, setNewsAndNoti] = useState();
  const fetchNewsAndNotifications = async () => {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const res = await fetch(
      "https://oep-backend-node.herokuapp.com/news-notifications",
      options
    );
    if (res.ok === true) {
      const data = await res.json();
      setNewsAndNoti(data.newsNotifications);
    }
  };

  useEffect(() => {
    fetchNewsAndNotifications();
  }, []);

  return (
    <div className="news-noti-container">
      <>
        {newsAndNoti ? (
          <ul className="news-ul">
            {newsAndNoti.map((each) => (
              <li key={each.id} className="news-li">
                <a href={each.link} className="news-a">
                  {each.news}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </>
    </div>
  );
}

export default NewsAndNotifications;
