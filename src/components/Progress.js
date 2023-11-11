function Progress({index,questionSize,points,maxPoints,answer}) {
    return (
        <header className="progress">
            <progress max={questionSize} value={index + Number(answer !== null)}></progress>
            <p>
                Question <strong>{index + 1}</strong>/{questionSize}
            </p>

            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    )
}

export default Progress
