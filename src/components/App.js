import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import NextButton from "./NextButton";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Question from "./Question";
import "./../index.css";
import { useEffect, useReducer } from "react";
import Progress from "./Progress";

const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "start" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index:state.index + 1,
        answer:null,
      }
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer ,points } = state;

  const questionSize = questions.length;


  const maxPossiblePoints = questions.reduce((prev,cur) => prev + cur.points , 0)


  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        // console.log(res);

        if (res.status === 200) {
          const data = await res.json();
          // console.log(data);

          dispatch({
            type: "dataReceived",
            payload: data,
          });
        }
      } catch (e) {
        dispatch({
          type: "dataError",
        });
      }
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen size={questionSize} dispatch={dispatch} />
        )}
        {status === "start" && (

          <>
          <Progress index={index} questionSize={questionSize} points={points} maxPoints={maxPossiblePoints} answer={answer}/>

          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />

          <NextButton dispatch={dispatch} answer={answer}/>

          

         </>



        )}
      </Main>
    </div>
  );
}
