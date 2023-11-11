function NextButton({dispatch,answer}) {

    const hasAnswered = answer !== null
    return (
        <div>
{
    hasAnswered && <button onClick={() => dispatch({
        type:'nextQuestion'
    })} className="btn btn-ui" >Next</button>
}
            
            
        </div>
    )
}

export default NextButton
