import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import conf from "./imgs/confused.png";
import sad from "./imgs/sad.png";
import smile from "./imgs/smile.png";

export default function Quiz() {
  const [index, SetIndex] = useState(0);
  const [qn, SetQn] = useState(data[index]);
  const [lock, SetLock] = useState(false);
  const [score, SetScore] = useState(0);
  const [result, Setresult] = useState(false);
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  useEffect(() => {
    SetQn(data[index]);
  }, [index]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (qn.ans === ans) {
        e.target.classList.add("correctAns");
        SetScore(score + 1);
      } else {
        e.target.classList.add("wrongAns");
        setTimeout(() => {
          option_array[qn.ans - 1].current.classList.add("correctAns");
        }, 200);
      }
      SetLock(true);
    }
  };
  const next = async () => {
    if (lock) {
      if (index === data.length - 1) {
        Setresult(true);
        return;
      }
      SetIndex(index + 1);
      SetLock(false);
      option_array.map((option) => {
        option.current.classList.remove("correctAns");
        option.current.classList.remove("wrongAns");
      });
    }
  };
  const restart = () => {
    SetIndex(0);
    SetScore(0);
    SetLock(false);
    Setresult(false);
  };
  return (
    <div className="container">
      <div className="Q-box">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <p>
            You Gave <strong> {score}</strong> right out of {data.length + " "}
            <img
              src={
                (score / data.length) * 100 >= 80
                  ? smile
                  : (score / data.length) * 100 >= 50
                  ? conf
                  : sad
              }
              alt=""
              width={"25px"}
            />
          </p>
        ) : (
          <div>
            <h2>
              {index + 1}. {qn.question}
            </h2>
            <ul>
              <li ref={option1} onClick={(e) => checkAns(e, 1)}>
                {qn.option1}
              </li>
              <li ref={option2} onClick={(e) => checkAns(e, 2)}>
                {qn.option2}
              </li>
              <li ref={option3} onClick={(e) => checkAns(e, 3)}>
                {qn.option3}
              </li>
              <li ref={option4} onClick={(e) => checkAns(e, 4)}>
                {qn.option4}
              </li>
            </ul>
          </div>
        )}
        {!result ? (
          <button onClick={next}>Next</button>
        ) : (
          <button onClick={restart}>Reset</button>
        )}
        {!result && (
          <div className="index">
            {index + 1} of {data.length} Qns
          </div>
        )}
      </div>
    </div>
  );
}
