function StartScreen({size,dispatch}) {


    function handleOnStartQuiz(){

        dispatch({
          type:"startQuiz",
        })
      
      }

    return (
        <div className="start">
            <h2>Welcome to the React Quiz</h2>
            <h3>{size} quiz to test your react knowledge</h3>
            <button onClick={handleOnStartQuiz} className="btn btn-ui">Let's Start</button>
        </div>
    )
}

export default StartScreen
