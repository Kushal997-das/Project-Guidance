import { memo } from "react";

const Info = memo(({ message }) => {

    return (
        <section className="mt-28">
            <p className="text-center">{message}</p>
        </section>
    )

})

export default Info;