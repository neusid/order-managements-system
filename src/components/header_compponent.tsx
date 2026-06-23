type HeaderType = {
    title: string
}

const HeaderComponent = (dataValue: HeaderType) => {
    return (
        <section id="center">
            <div className="hero">
                <h1>{dataValue.title}</h1>
            </div>
        </section>
    )
}

export default HeaderComponent