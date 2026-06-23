type HeaderType = {
    title: string
}

const HeaderOrderComponent = (dataValue: HeaderType) => {
    return (
        <section id="center">
            <div className="hero-order">
                <h1>{dataValue.title}</h1>
            </div>
        </section>
    )
}

export default HeaderOrderComponent