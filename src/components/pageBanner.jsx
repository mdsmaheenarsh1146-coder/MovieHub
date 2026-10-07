function PageBanner({ title, description, image }) {
    return (
        <section
            className="page-banner"
            style={{
                backgroundImage: `url(${image})`
            }}
        >
            <div className="banner-content">

                <h1>{title}</h1>

                <p>{description}</p>

            </div>
        </section>
    );
}

export default PageBanner;